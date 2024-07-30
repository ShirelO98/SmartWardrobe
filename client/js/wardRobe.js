window.onload = () => {
  initSideNav();
  initWardrobe();
};

function initWardrobe() {
  updateBreadCrumbsinnerText();
  fetchItems();
  initialItems();
  fetchAndInitWardrobeDropdown();
  initUserDate();
  let itemsButton = document.getElementById("items-button");
  itemsButton.addEventListener("click", changeButtonState);
  let looksButton = document.getElementById("looks-button");
  looksButton.addEventListener("click", changeButtonState);
  let layoutBtn = document.getElementById("layout-button");
  layoutBtn.addEventListener("click", layoutDisplayBtn);
  fetchAllLooks();
}

async function fetchItems() {
  try {
    const wardrobeCode = getCurrentWardrobe();
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
    localStorage.setItem("itemsOfCurrentWardrobe", JSON.stringify(items));
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
  const addSpan = document.createElement("span");
  addSpan.className = "material-symbols-outlined plus-item-type";
  addSpan.textContent = "add_circle";
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
    const wardrobeCode = getCurrentWardrobe();
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
    clearTable();
    loadListItemsByFilter(items);

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
    loadListItems();
  } else if (state !== "list") {
    let button = document.getElementById("layout-button");
    button.textContent = "list";
    const tableSection = document.getElementById("itemsTable");
    tableSection.style.display = "none";
    document.getElementById("wardRobe").style.display = "flex";
    clearTable();
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
    clearTable();
    loadListItems();
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
    const itemCard = createItemCard(item.item_img, item.item_name, item.item_status, item.id);
    wardRobeSection.appendChild(itemCard);
  });
}

function createItemCard(imageSrc, altText, itemStatus, item_id) {
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
  editButton.dataset.id = item_id;
  const editSpan = document.createElement("span");
  editSpan.className = "material-symbols-outlined edit-item-wardrobe";
  editSpan.textContent = "edit";
  editButton.appendChild(editSpan);
  itemCard.appendChild(editButton);

  editButton.addEventListener('click', function () {
    editStatusItem(editButton.dataset.id, itemCard);
  });

  const deleteButton = document.createElement("button");
  deleteButton.className = "empty-button";
  deleteButton.dataset.id = item_id;
  const deleteSpan = document.createElement("span");
  deleteSpan.className = "material-symbols-outlined delete-icon-wardrobe";
  deleteSpan.textContent = "delete";
  deleteButton.appendChild(deleteSpan);
  itemCard.appendChild(deleteButton);

  deleteButton.addEventListener('click', function () {
    deleteItem(deleteButton.dataset.id, itemCard);
  });

  const img = document.createElement("img");
  img.src = imageSrc;
  img.alt = altText;
  itemCard.appendChild(img);

  return itemCard;
}


function deleteItem(item_id, itemCard) {
  fetch(`http://localhost:8081/items/${item_id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Item deleted:', data);
      itemCard.remove();
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}


function editStatusItem(item_id, itemCard) {
  const ellipseSpan = itemCard.querySelector('.elipse-item');
  const newStatus = confirm('Click OK for change status of item or Cancel for close this window');

  fetch(`http://localhost:8081/items/${item_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (newStatus === true) {
        if (ellipseSpan.style.backgroundColor === 'red') {
          ellipseSpan.style.backgroundColor = 'aquamarine';
        }
        else {
          ellipseSpan.style.backgroundColor = 'red';
        }
      }
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

async function fetchAllLooks() {
  try {
    const wardrobeCode = getCurrentWardrobe();
    const response = await fetch(`http://localhost:8081/looks/${wardrobeCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch looks");
    }

    const looks = await response.json();
    localStorage.setItem("looksOfCurrentWardrobe", JSON.stringify(looks));
    renderLooksCards(looks);

  } catch (error) {
    console.error("Failed to fetch looks:", error.message);
    alert("Failed to fetch looks: " + error.message);
  }
}


function renderLooksCards() {
  const looksSection = document.getElementById("looks");
  looksSection.innerHTML = '';
  const looks = JSON.parse(localStorage.getItem("looksOfCurrentWardrobe")) || [];
  looks.forEach((look) => {
    const tShirtImage = { src: look.item_img_1, alt: "Item 1" };
    const pantImage = { src: look.item_img_2, alt: "Item 2" };
    const shoeImage = { src: look.item_img_3, alt: "Item 3" };
    const lookCard = createLookCard(tShirtImage, pantImage, shoeImage, look.look_id, look.look_status);
    looksSection.appendChild(lookCard);
  });
}

function createLookCard(tShirtImage, pantImage, shoeImage, lookId, lookStatus) {
  const lookCard = document.createElement("div");
  lookCard.className = "item-card-fully-looks";

  const ellipseSpan = document.createElement("span");
  ellipseSpan.className = "elipse-item-looks";

  if (lookStatus === 0) {
    ellipseSpan.style.backgroundColor = "red";
  }
  lookCard.appendChild(ellipseSpan);

  const editButton = document.createElement("button");
  editButton.className = "empty-button";
  const editSpan = document.createElement("span");
  editSpan.className = "material-symbols-outlined edit-look-wardrobe";
  editSpan.textContent = "edit";
  editButton.appendChild(editSpan);
  lookCard.appendChild(editButton);

  const ul = document.createElement("ul");
  ul.className = "list-unstyled";

  const li1 = document.createElement("li");
  const li2 = document.createElement("li");
  const li3 = document.createElement("li");

  const imgTShirt = createItemImage(tShirtImage.src, tShirtImage.alt);
  const imgPants = createItemImage(pantImage.src, pantImage.alt);
  const imgShoes = createItemImage(shoeImage.src, shoeImage.alt);

  li1.appendChild(imgTShirt);
  li2.appendChild(imgPants);
  li3.appendChild(imgShoes);

  ul.appendChild(li1);
  ul.appendChild(li2);
  ul.appendChild(li3);

  lookCard.appendChild(ul);

  lookCard.dataset.lookId = lookId;
  lookCard.dataset.lookStatus = lookStatus;

  return lookCard;
}


function loadListItems() {
  const items = JSON.parse(localStorage.getItem("itemsOfCurrentWardrobe")) || [];
  const table = document.getElementById("itemsTable");

  items.forEach(item => {
    const itemRow = document.createElement("tr");
    const statusText = item.item_status == 1 ? "Available" : "Not Available";
    itemRow.innerHTML = `
      <td>${item.item_name}</td>
      <td>${item.item_type}</td>
      <td>${item.item_season}</td>
      <td>${statusText}</td>
    `;
    table.querySelector('tbody').appendChild(itemRow);
  });
}

function loadListItemsByFilter(items) {
  clearTable();
  const table = document.getElementById("itemsTable");
  items.forEach(item => {
    const itemRow = document.createElement("tr");
    const statusText = item.item_status == 1 ? "Available" : "Not Available";
    itemRow.innerHTML = `
      <td>${item.item_name}</td>
      <td>${item.item_type}</td>
      <td>${item.item_season}</td>
      <td>${statusText}</td>
    `;
    table.querySelector('tbody').appendChild(itemRow);
  });
}

function clearTable() {
  const table = document.getElementById("itemsTable");
  const tbody = table.querySelector('tbody');
  tbody.innerHTML = '';
}

function createItemImage(src, alt) {
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  return img;
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

const updateBreadCrumbsinnerText = () => {
  const currentWardrobeName = localStorage.getItem("currentWardrobeName");
  const wardrobeName = document.getElementById("breadcrumbWardrobeName");
  wardrobeName.innerText = currentWardrobeName;
}

function initUserDate() {
  const jsonString = localStorage.getItem("UserData");
  const dataObject = JSON.parse(jsonString);
  const userImg = document.getElementById("userImg_Name");
  const userName = document.getElementById("userName");
  userImg.src = dataObject.userImgUrl;
  userName.innerText = `${dataObject.userFirstName} ${dataObject.userLastName}`;
}
