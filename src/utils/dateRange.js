function getDateRange(range, year, month) {
  const now = new Date();
  let from = new Date(now);
  let to = new Date(now);

  if (range) {
    switch (range) {
      case "day": from.setDate(now.getDate() - 1); break;
      case "week": from.setDate(now.getDate() - 7); break;
      case "month": from.setMonth(now.getMonth() - 1); break;
      case "year": from.setFullYear(now.getFullYear() - 1); break;
      default: return { from: null, to: null };
    }
  } else if (year) {
    const y = parseInt(year);
    const m = month ? parseInt(month) : null;
    if (m) {
      from = new Date(y, m - 1, 1);
      to = new Date(y, m, 0);
    } else {
      from = new Date(y, 0, 1);
      to = new Date(y, 11, 31);
    }
  } else {
    return { from: null, to: null };
  }

  from.setHours(0, 0, 0, 0);
  to.setHours(23, 59, 59, 999);
  return { from, to };
}

function fillMissingDates(rows, range, year, month) {
    const { from, to } = getDateRange(range, year, month); 

    if (!from || !to) return rows; 

    const result = {};
    let current = new Date(from);
    
    while (current <= to) {
        const dayString = current.toISOString().substring(0, 10); 
        result[dayString] = { day: dayString, plays: 0 };
        current.setDate(current.getDate() + 1); 
    }
    
    rows.forEach(row => {
        if (result[row.day]) result[row.day] = row;
    });

    return Object.values(result).sort((a, b) => (a.day > b.day ? 1 : -1));
}

module.exports = { getDateRange, fillMissingDates };