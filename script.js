const uploadBox = document.querySelector(".upload-box"),
  previewImg = uploadBox.querySelector("img"),
  widthInput = document.querySelector(".width input"),
  heightInput = document.querySelector(".height input"),
  ratioInput = document.querySelector(".ratio input"),
  downloadBtn = document.querySelector(".download-btn"),
  qualityInput = document.querySelector(".quality input"),
  fileInput = uploadBox.querySelector("input");

let ogImageRatio;

function loadFile(e) {
  const file = e.target.files[0];
  if (!file) return;
  previewImg.src = URL.createObjectURL(file);
  previewImg.addEventListener("load", () => {
    widthInput.value = previewImg.naturalWidth;
    heightInput.value = previewImg.naturalHeight;
    ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
    document.querySelector(".wrapper").classList.add("active");
  });
}

widthInput.addEventListener("input", () => {
  const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
  heightInput.value = Math.round(height);
});

heightInput.addEventListener("input", () => {
  const width = ratioInput.checked ? heightInput.value / ogImageRatio : widthInput.value;
  widthInput.value = Math.round(width);
});

const resizeAndDownload = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const a = document.createElement("a");

  const imgQuality = qualityInput.checked ? 0.7 : 1.0;

  canvas.width = widthInput.value;
  canvas.height = heightInput.value;

  ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
  a.href = canvas.toDataURL("image/jpeg", imgQuality);
  a.download = new Date().getTime();
  a.click();
}

fileInput.addEventListener("change", loadFile);
uploadBox.addEventListener("click", () => fileInput.click());
downloadBtn.addEventListener("click", resizeAndDownload);
