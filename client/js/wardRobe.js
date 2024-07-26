window.onload = () => {
  initSideNav();
  initWardrobe();
};

function initWardrobe() {
  console.log("GET/Wardrobes/:id/Items ");
  fetchItems();
  initialItems();
  initDropDown();
  let itemsButton = document.getElementById("items-button");
  itemsButton.addEventListener("click", changeButtonState);
  let looksButton = document.getElementById("looks-button");
  looksButton.addEventListener("click", changeButtonState);
  let layoutBtn = document.getElementById("layout-button");
  layoutBtn.addEventListener("click", layoutDisplayBtn);
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
    const wardrobeCode = 29; // fix it
    const response = await fetch(`http://localhost:8081/items/${wardrobeCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch items");
    }

    const items = await response.json();
    console.log("Items:", items);
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

// fix it
function initDropDown() {
  let wardrobeNames = ["Ran's wardrobe", "Adar's wardrobe"];
  for (let i = 0; i < wardrobeNames.length; i++) {
    addToDropdown(wardrobeNames[i]);
  }
}

function getUniqueItemTypes(items) {
  const itemTypeSet = new Set();
  
  items.forEach(item => {
    if (item.item_type) {
      itemTypeSet.add(item.item_type);
    }
  });
  return Array.from(itemTypeSet);
}

function createItemTypeButtons(types) {
  const typesSection = document.getElementById("types-of-items");
  const existingButtons = typesSection.querySelectorAll(".items-type");
  existingButtons.forEach(button => button.remove());
  const addButton = document.createElement("button");
  addButton.className = "empty-button";
  const addSpan = document.createElement("span");
  addSpan.className = "material-symbols-outlined plus-item-type";
  addSpan.textContent = "add_circle";
  addButton.appendChild(addSpan);
  typesSection.appendChild(addButton);
  const allButton = document.createElement("button");
  allButton.className = "empty-button items-type";
  const allSpan = document.createElement("span");
  allSpan.textContent = "All";
  allButton.appendChild(allSpan);
  typesSection.appendChild(allButton);

  types.forEach(type => {
    const button = document.createElement("button");
    button.className = "empty-button items-type";
    const span = document.createElement("span");
    span.textContent = type;
    button.appendChild(span);
    typesSection.appendChild(button);
  });

  let itemTypeBtn = document.getElementsByClassName("items-type");
  for (let i = 0; i < itemTypeBtn.length; i++) {
    if (itemTypeBtn[i].querySelector("span").textContent.trim() === "All") {
      itemTypeBtn[i].style.backgroundColor = "black";
      itemTypeBtn[i].style.color = "white";
      itemTypeBtn[i].querySelector("span").style.color = "white";
    }
    itemTypeBtn[i].addEventListener("click", ItemTypeSelectorBtn);
  }
}

async function handleFilterButtonClick(filterValue) {
  try {
    const wardrobeCode = 29; // יש לשים את הקוד המתאים
    const response = await fetch(`http://localhost:8081/items/${wardrobeCode}/${filterValue}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

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

function changeButtonState(event) {
  let itemBut = document.getElementById("items-button");
  let itemSpan = itemBut.querySelector("span");
  let lookBut = document.getElementById("looks-button");
  let lookSpan = lookBut.querySelector("span");

  if (event.currentTarget === itemBut) {
    document.getElementById("looks").style.display = "none";
    document.getElementById("wardRobe").style.display = "flex";
    const tableSection = document.getElementById("itemsTable");
    tableSection.style.display = "none";
    let breadCrumbs = document.getElementsByClassName("breadcrumb")[0];
    const crumbs = breadCrumbs.getElementsByTagName("li");
    lastCrumb = crumbs[crumbs.length - 1];
    lastCrumb.textContent = "Items";
    let button = document.getElementById("layout-button");
    button.textContent = "list";
    itemBut.style.backgroundColor = "black";
    itemSpan.style.color = "white";
    lookBut.style.backgroundColor = "white";
    lookSpan.style.color = "black";
  } else if (event.currentTarget === lookBut) {
    lookBut.style.backgroundColor = "black";
    lookSpan.style.color = "white";
    itemBut.style.backgroundColor = "white";
    itemSpan.style.color = "black";
    document.getElementById("wardRobe").style.display = "none";
    document.getElementById("looks").style.display = "flex";
    const tableSection = document.getElementById("itemsTable");
    tableSection.style.display = "none";
    let breadCrumbs = document.getElementsByClassName("breadcrumb")[0];
    const crumbs = breadCrumbs.getElementsByTagName("li");
    lastCrumb = crumbs[crumbs.length - 1];
    lastCrumb.textContent = "Looks";
    let button = document.getElementById("layout-button");
    button.textContent = "";
  }
}

function layoutDisplayBtn(event) {
  let state = document.getElementById("layout-button").textContent.trim();
  if (state === "list") {
    let button = document.getElementById("layout-button");
    button.textContent = "grid_view";
    const tableSection = document.getElementById("itemsTable");
    tableSection.style.display = "flex";
    document.getElementById("wardRobe").style.display = "none";
    document.getElementById("looks").style.display = "none";
  } else if (state !== "list") {
    let button = document.getElementById("layout-button");
    button.textContent = "list";
    const tableSection = document.getElementById("itemsTable");
    tableSection.style.display = "none";
    document.getElementById("wardRobe").style.display = "flex";
  }
}

async function ItemTypeSelectorBtn(event) {
  let itemTypeBtn = document.getElementsByClassName("items-type");
  for (let i = 0; i < itemTypeBtn.length; i++) {
    itemTypeBtn[i].style.backgroundColor = "white";
    itemTypeBtn[i].style.color = "black";
    let parentBtn = itemTypeBtn[i];
    let span = parentBtn.querySelector("span");
    span.style.color = "black";
  }
  
  let currentBtn = event.currentTarget;
  currentBtn.style.backgroundColor = "black";
  let span = currentBtn.querySelector("span");
  span.style.color = "white";

  if (span.textContent.trim() === "Shirt") {
    await handleFilterButtonClick(1);
  }
  else if (span.textContent.trim() === "Pants") {
    await handleFilterButtonClick(2);
  }
  else if (span.textContent.trim() === "Shoes") {
    await handleFilterButtonClick(3);
  }
  else if (span.textContent.trim() === "All") {
    await fetchItems();
  }
}


function createItemsCards(items) {
  const wardRobeSection = document.getElementById("wardRobe");
  const addItemCard = wardRobeSection.querySelector(".item-card-empty");
  wardRobeSection.innerHTML = '';
  if (addItemCard) {
    wardRobeSection.appendChild(addItemCard); 
  }

  items.forEach(item => {
    const itemCard = createItemCard(item.item_img, item.item_name, item.item_status);
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


// looks
// function createLooksCards() {
//   console.log("GET/Wardrobes/:id/Looks ");
//   const looksSection = document.getElementById("looks");

//   const tShirts = [];
//   for (let i = 1; i <= 4; i++) {
//     tShirts.push({ src: `images/items/t-shirt/${i}.png`, alt: `T-Shirt ${i}` });
//   }
//   const pants = [];
//   for (let i = 1; i <= 3; i++) {
//     pants.push({ src: `images/items/pants/${i}.png`, alt: `Pants ${i}` });
//   }
//   const shoes = [];
//   for (let i = 1; i <= 4; i++) {
//     shoes.push({ src: `images/items/shoes/${i}.png`, alt: `Shoes ${i}` });
//   }

//   tShirts.forEach((tShirt) => {
//     pants.forEach((pant) => {
//       shoes.forEach((shoe) => {
//         const lookCard = createLookCard(tShirt, pant, shoe);
//         looksSection.appendChild(lookCard);
//       });
//     });
//   });
// }

// function createLookCard(tShirt, pant, shoe) {
//   const lookCard = document.createElement("div");
//   lookCard.className = "item-card-fully-looks";

//   const ellipseSpan = document.createElement("span");
//   ellipseSpan.className = "elipse-item-looks";
//   lookCard.appendChild(ellipseSpan);

//   const editButton = document.createElement("button");
//   editButton.className = "empty-button";
//   const editSpan = document.createElement("span");
//   editSpan.className = "material-symbols-outlined edit-look-wardrobe";
//   editSpan.textContent = "edit";
//   editButton.appendChild(editSpan);
//   lookCard.appendChild(editButton);

//   const ul = document.createElement("ul");
//   ul.className = "list-unstyled";

//   const li1 = document.createElement("li");
//   const li2 = document.createElement("li");
//   const li3 = document.createElement("li");

//   const imgTShirt = createItemImage(tShirt.src, tShirt.alt);
//   const imgPants = createItemImage(pant.src, pant.alt);
//   const imgShoes = createItemImage(shoe.src, shoe.alt);

//   li1.appendChild(imgTShirt);
//   li2.appendChild(imgPants);
//   li3.appendChild(imgShoes);

//   ul.appendChild(li1);
//   ul.appendChild(li2);
//   ul.appendChild(li3);

//   lookCard.appendChild(ul);

//   return lookCard;
// }

function createItemImage(src, alt) {
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  return img;
}
