const BASE_URL = "https://golden-whispering-show.glitch.me";

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const image = document.getElementById("item-image").value;
  const title = document.getElementById("item-title").value;
  const price = document.getElementById("item-price").value;

  const h1Element = document.getElementById("formFilled");
  if (image && title && price) {
    fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify({
        image: image,
        title: title,
        price: price,
      }),
      headers: { "Content-type": "application/json; charset=utf-8" },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function () {
        h1Element.textContent = " Your data has been successfully uploaded";
      })
      .catch((error) => console.error("Error:", error));
  } else {
    h1Element.textContent = "Try again";
  }
});

document.getElementById("go-to-basket").addEventListener("click", () => {
  location.href = "./index.html";
});
