(() => {
  const dialog = document.getElementById("playableDialog");
  const dialogFrame = document.getElementById("dialogFrame");
  const dialogImage = document.getElementById("dialogImage");
  const thumbs = Array.from(document.querySelectorAll(".playable-thumb"));
  const thumbImages = Array.from(document.querySelectorAll(".playable-thumb img"));
  const stillImages = Array.from(document.querySelectorAll(".playable-still"));

  const openPlayable = (btn) => {
    const url = btn.dataset.url;
    if (!dialog || !dialogFrame || !dialogImage || !url) return;
    dialogImage.style.display = "none";
    dialogImage.src = "";
    dialogFrame.style.display = "block";
    dialogFrame.src = url;
    dialog.showModal();
  };

  const openScreenshot = (img) => {
    const src = img.currentSrc || img.src;
    if (!dialog || !dialogFrame || !dialogImage || !src) return;
    dialogFrame.style.display = "none";
    dialogFrame.src = "about:blank";
    dialogImage.src = src;
    dialogImage.style.display = "block";
    dialog.showModal();
  };

  thumbs.forEach((btn) => {
    btn.addEventListener("click", () => {
      openPlayable(btn);
    });
  });

  thumbImages.forEach((img) => {
    img.addEventListener("error", () => {
      const fallback = img.dataset.fallback;
      if (fallback && img.src.indexOf(fallback) === -1) {
        img.src = fallback;
      }
    });
  });

  stillImages.forEach((img) => {
    img.addEventListener("error", () => {
      img.style.display = "none";
    });
    img.addEventListener("click", () => {
      openScreenshot(img);
    });
  });

  if (dialog) {
    dialog.addEventListener("close", () => {
      if (dialogFrame) {
        dialogFrame.src = "about:blank";
      }
      if (dialogImage) {
        dialogImage.src = "";
        dialogImage.style.display = "none";
      }
      if (dialogFrame) {
        dialogFrame.style.display = "block";
      }
    });
  }
})();
