const apiKey = "AZdyxotLQsQpDwCJY52rHMDX";

document
  .getElementById("imageUpload")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("image_file", file);

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

          const resultContainer = document.getElementById("resultContainer");
        
          resultContainer.innerHTML = "";

          const resultImage = document.createElement("img");
          resultImage.id = "resultImage";
          resultImage.src = imageUrl;
          resultContainer.appendChild(resultImage);
        })
        .catch((error) => {
          console.error("Background removal failed:", error);
        });
    }
  });

document.getElementById("removeButton").addEventListener("click", function () {
  document.getElementById("imageUpload").click();
});

document.getElementById("imageUpload").addEventListener("change", function () {
  document.getElementById("removeButton").disabled = false;
});


