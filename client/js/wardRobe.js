window.onload = () => {
  initial();
  document.getElementById("navbarDropdownMenuLink").onclick = dropDownSideNav;
  document.getElementById("sidebarToggle").onclick = closeOpenSideNav;
};

function initial() {
  initialItems();
  initDropDown();
  let itemsButton = document.getElementById("items-button");
  itemsButton.addEventListener("click", changeButtonState);
  let looksButton = document.getElementById("looks-button");
  looksButton.addEventListener("click", changeButtonState);
  let itemTypeBtn = document.getElementsByClassName("items-type");
  for (let i = 0; i < itemTypeBtn.length; i++) {
    itemTypeBtn[i].addEventListener("click", ItemTypeSelectorBtn);
  }
}

function initialItems() {
  let button = document.getElementById("items-button");
  let span = button.querySelector("span");
  button.style.backgroundColor = "black";
  span.style.color = "white";
}

function initDropDown() {
  let wardrobeNames = ["Ran's wardrobe", "Adar's wardrobe"];
  for (let i = 0; i < wardrobeNames.length; i++) {
    addToDropdown(wardrobeNames[i]);
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
  }
}

function ItemTypeSelectorBtn(event) {
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
  let parentBtn = currentBtn;
  let span = parentBtn.querySelector("span");
  span.style.color = "white";
}
