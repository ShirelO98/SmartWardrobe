window.onload = () => {
  initialItems();
  document.getElementById("items-button").onclick = changeButtonState;
  document.getElementById("looks-button").onclick = changeButtonState;
  document.getElementById("navbarDropdownMenuLink").onclick = dropDownSideNav;
  document.getElementById("sidebarToggle").onclick = closeOpenSideNav;
  let itemTypeBtn = document.getElementsByClassName("items-type");
  console.log(itemTypeBtn.length);
  for (let i = 0; i < itemTypeBtn.length; i++) {
    itemTypeBtn[i].addEventListener("click", ItemTypeSelectorBtn);
  }
};

function initialItems() {
  let button = document.getElementById("items-button");
  let span = button.querySelector("span");
  button.style.backgroundColor = "black";
  span.style.color = "white";
}

function changeButtonState(event) {
  let itemBut = document.getElementById("items-button");
  let itemSpan = itemBut.querySelector("span");
  let lookBut = document.getElementById("looks-button");
  let lookSpan = lookBut.querySelector("span");

  if (event.currentTarget === itemBut) {
    itemBut.style.backgroundColor = "black";
    itemSpan.style.color = "white";
    lookBut.style.backgroundColor = "white";
    lookSpan.style.color = "black";
  } else if (event.currentTarget === lookBut) {
    lookBut.style.backgroundColor = "black";
    lookSpan.style.color = "white";
    itemBut.style.backgroundColor = "white";
    itemSpan.style.color = "black";
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
