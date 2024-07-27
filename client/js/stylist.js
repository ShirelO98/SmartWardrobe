window.onload = () => {
  initSideNav();
  initWardrobe();
};

function initWardrobe() {
  fetchItems();
  /* initialItems();*/
  fetchAndInitWardrobeDropdown();
  createLooksCards();
  let addItemBttable = document.getElementsByClassName(
    "plus-item-button-table"
  )[0];
  addItemBttable.onclick = () => {
    let button = document.getElementById("layout-button");
    button.textContent = "list";
    const tableSection = document.getElementById("itemsTable");
    tableSection.style.display = "none";
    document.getElementById("wardRobe").style.display = "flex";
  };
}

async function fetchItems() {
  try {
    const wardrobeCode = getCurrentWardrobe();
    const response = await fetch(
      `http://localhost:8081/items/${wardrobeCode}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch items");
    }

    const items = await response.json();
    createItemsCards(items);
    const itemTypes = getUniqueItemTypes(items);
    createItemTypeButtons(itemTypes);
  } catch (error) {
    console.error("Failed to fetch items:", error.message);
    alert("Failed to fetch items: " + error.message);
  }
}

function initialItems() {
  let button = document.getElementById("items-button");
  let span = button.querySelector("span");
  button.style.backgroundColor = "black";
  span.style.color = "white";
  document.querySelectorAll(".items-type span").forEach((item) => {
    if (item.textContent.trim() === "All") {
      allButton = item.parentElement;
      allButton.style.backgroundColor = "black";
      item.style.color = "white";
    }
  });
}

function getUniqueItemTypes(items) {
  const itemTypeSet = new Set();

  items.forEach((item) => {
    if (item.item_type) {
      itemTypeSet.add(item.item_type);
    }
  });
  return Array.from(itemTypeSet);
}

async function (filterValue) {
  try {
    const wardrobeCode = getCurrentWardrobe();
    const response = await fetch(
      `http://localhost:8081/items/${wardrobeCode}/${filterValue}`
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch items");
    }

    const items = await response.json();
    createItemsCards(items);
  } catch (error) {
    console.error("Failed to fetch items:", error.message);
    alert("Failed to fetch items: " + error.message);
  }
}

function createItemsCards(items) {
  const wardRobeSection = document.getElementById("wardRobe");
  const addItemCard = wardRobeSection.querySelector(".item-card-empty");
  wardRobeSection.innerHTML = "";
  if (addItemCard) {
    wardRobeSection.appendChild(addItemCard);
  }

  items.forEach((item) => {
    const itemCard = createItemCard(
      item.item_img,
      item.item_name,
      item.item_status
    );
    wardRobeSection.appendChild(itemCard);
  });
}

function createItemCard(imageSrc, altText, itemStatus) {
  const itemCard = document.createElement("div");
  itemCard.className = "item-card-fully";

  const ellipseSpan = document.createElement("span");
  ellipseSpan.className = "elipse-item";
  itemCard.appendChild(ellipseSpan);

  if (itemStatus === 0) {
    ellipseSpan.style.backgroundColor = "red";
  }

  const editButton = document.createElement("button");
  editButton.className = "empty-button";
  const editSpan = document.createElement("span");
  editSpan.className = "material-symbols-outlined edit-item-wardrobe";
  editSpan.textContent = "edit";
  editButton.appendChild(editSpan);
  itemCard.appendChild(editButton);

  const img = document.createElement("img");
  img.src = imageSrc;
  img.alt = altText;
  itemCard.appendChild(img);

  return itemCard;
}

function getCurrentWardrobe() {
  const currWardrobe = localStorage.getItem("currentWardrobeCode");
  return currWardrobe;
}

function addToDropdown(wardrobeName, wardrobeCode) {
  const wardrobeInAccordion = document.getElementById("wardrobe-in-accordion");
  const dropdownItem = document.createElement("a");
  dropdownItem.classList.add("dropdown-item");
  dropdownItem.addEventListener("click", function (event) {
    const wardrobeCode1 = JSON.stringify(wardrobeCode);
    localStorage.setItem("currentWardrobeCode", wardrobeCode1);

    window.location.href = "wardrobe.html";
  });
  const closetImg = document.createElement("img");
  closetImg.src = "images/closet.png";
  closetImg.alt = "";
  closetImg.classList.add("closet_img");
  const wardrobeText = document.createTextNode(`${wardrobeName}`);
  dropdownItem.appendChild(closetImg);
  dropdownItem.appendChild(wardrobeText);
  wardrobeInAccordion.appendChild(dropdownItem);
}

function fetchAndInitWardrobeDropdown() {
  const wardrobesJson = localStorage.getItem("wardrobesOfUser");
  if (wardrobesJson) {
    const wardrobes = JSON.parse(wardrobesJson);
    wardrobes.forEach((wardrobe) => {
      addToDropdown(wardrobe.wardrobe_name, wardrobe.wardrobe_code);
    });
  } else {
    console.error("No wardrobes found in local storage.");
  }
}
