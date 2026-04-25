const upload = document.getElementById("upload");
const gallery = document.getElementById("gallery");

let baseImage = null;

const tintImages = [
  "tints/royalblue.png"
];

// Upload
upload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  baseImage = new Image();

  baseImage.onload = () => {
    console.log("Image loaded");
  };

  baseImage.src = URL.createObjectURL(file);
});

// Generate
function generateCollage() {
  if (!baseImage || !baseImage.complete) {
    alert("Upload an image first");
    return;
  }

  gallery.innerHTML = "";

  tintImages.forEach((tintSrc) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const tint = new Image();

    tint.src = tintSrc;

    tint.onload = () => {
      canvas.width = baseImage.width;
      canvas.height = baseImage.height;

      ctx.drawImage(baseImage, 0, 0);

      ctx.globalCompositeOperation = "overlay";
      ctx.drawImage(tint, 0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "source-over";

      const div = document.createElement("div");
      div.className = "preview";

      div.appendChild(canvas);

      const label = document.createElement("div");
      label.className = "label";
      label.textContent = "Royal Blue";

      div.appendChild(label);

      div.onclick = () => downloadCanvas(canvas);

      gallery.appendChild(div);
    };
  });
}

// Download
function downloadCanvas(canvas) {
  const link = document.createElement("a");
  link.download = "js-tintifier.png";
  link.href = canvas.toDataURL();
  link.click();
}
