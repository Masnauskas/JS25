const BASE_URL = "https://golden-whispering-show.glitch.me";

let dataArray = [];
let dataArray2 = [];

async function getItemsData(url) {
  try {
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function drawItemsfromURL(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      dataArray = await getItemsData(url);
      console.log(dataArray);
      drawItems(dataArray);
    }
  } catch (error) {
    console.error(error);
  }
}
function drawItems(dataArray) {
  const mainContainer = document.getElementById("main-container");
  mainContainer.innerHTML = "";
  const itemGrid = document.getElementById("main-container");

  dataArray.forEach((dataItem) => {
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("item-container");
    itemContainer.id = dataItem.id;

    const itemImage = document.createElement("img");
    itemImage.src = dataItem.image;
    itemImage.classList.add("item-image");

    const itemInformationBox = document.createElement("div");
    itemInformationBox.classList.add("item-information-box");
    const itemName = document.createElement("p");
    itemName.textContent = dataItem.title;
    itemName.classList.add("item-name");

    const itemPrice = document.createElement("p");
    itemPrice.textContent = "\u20AC " + dataItem.price;
    itemPrice.classList.add("item-price");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.id = dataItem.id;

    deleteButton.addEventListener("click", (event) => {
      deleteItems(BASE_URL + "/" + dataItem.id);
    });

    itemInformationBox.append(itemName, itemPrice, deleteButton);

    itemContainer.append(itemImage, itemInformationBox);
    itemGrid.append(itemContainer);
  });
}

async function deleteItems(url) {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      console.log("Produktas istrintas");
      dataArray2 = await getItemsData(BASE_URL);
      console.log(dataArray2);
      drawItems(dataArray2);
    }
  } catch (error) {
    console.error(error);
    console.log("ne");
  }
}

document.getElementById("go-to-submit").addEventListener("click", () => {
  location.href = "./add.html";
});

drawItemsfromURL(BASE_URL);
