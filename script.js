const apiKey = "AZdyxotLQsQpDwCJY52rHMDX";

document.addEventListener("DOMContentLoaded", () => {
  const imageUpload = document.getElementById("imageUpload");
  const removeButton = document.getElementById("removeButton");
  const resultContainer = document.getElementById("resultContainer");
  let processing = false;

  // Function to handle image upload and background removal
  imageUpload.addEventListener("change", function (event) {
    if (processing) {
      return; // Do not allow upload while processing
    }

    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image_file", file);

      processing = true; // Set processing flag

      fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: {
          "X-Api-Key": apiKey,
        },
        body: formData,
      })
        .then((response) => response.blob())
        .then((blob) => {
          const imageUrl = URL.createObjectURL(blob);

          resultContainer.innerHTML = "";

          const resultImage = document.createElement("img");
          resultImage.id = "resultImage";
          resultImage.src = imageUrl;
          resultContainer.appendChild(resultImage);

          processing = false; // Reset processing flag
        })
        .catch((error) => {
          console.error("Background removal failed:", error);
          processing = false; // Reset processing flag on error
        });
    }
  });

  // Function to handle "Remove Background" button click
  removeButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default behavior (opening upload dialog)
    imageUpload.click();
  });

  // Enable remove button after image is uploaded and processed
  imageUpload.addEventListener("change", function () {
    if (!processing) {
      removeButton.disabled = false;
    }
  });
});
