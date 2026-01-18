export function renderCover({
  image,
  artist,
  album,
  size = "normal"
}) {
  const placeholder = "https://www.beatstars.com/assets/img/placeholders/playlist-placeholder.svg";
  const hasImage = Boolean(image);

  return `
    <div class="cover-wrapper ${size}" data-artist="${artist}" data-album="${album}">
      <img src="${image || placeholder}" class="cover-img" />

      ${
        !hasImage
          ? `
            <div class="cover-overlay">
              <span>＋ Add cover</span>
              <input type="file" accept="image/*" />
            </div>
          `
          : ""
      }
    </div>
  `;
}

export function initCoverUploads() {
  document.querySelectorAll(".cover-wrapper input[type=file]").forEach(input => {
    input.addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const wrapper = e.target.closest(".cover-wrapper");
      const artist = wrapper.dataset.artist;
      const album = wrapper.dataset.album;

      const form = new FormData();
      form.append("artist", artist);
      form.append("album", album);
      form.append("cover", file);

      wrapper.classList.add("uploading");

      const res = await fetch("/api/album-cover", {
        method: "POST",
        body: form
      });

      const data = await res.json();

      if (data.image) {
        wrapper.innerHTML = `
          <img src="${data.image}" class="cover-img" />
        `;
      }

      wrapper.classList.remove("uploading");
    });
  });
}
