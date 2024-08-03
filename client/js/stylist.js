window.onload = () => {
  initClients();
  initUserDetails();
  initSideNav();
};

async function initClients() {
  try {
    const jsonString = localStorage.getItem("UserData");
    const dataObject = JSON.parse(jsonString);
    const userId = dataObject.UserID;
    const response = await fetch(`http://localhost:8081/stylist/${userId}`);
    console.log(response);
    const clients = await response.json();
    console.log(clients);
    clients.forEach((client) => {
      initWardrobesOfClients(client.id, client.f_name, client.l_name);
    });
  } catch (error) {
    console.error("Failed to fetch clients:", error);
  }
}
const initWardrobesOfClients = async (userId, userFirstName, userLastName) => {
  const res = await fetch(`http://localhost:8081/wardrobe/all/${userId}`);
  const wardrobes = await res.json();
  console.log(wardrobes);
  localStorage.setItem("wardrobesOfUser", JSON.stringify(wardrobes));
  wardrobes.forEach((wardrobe) => {
    createWardrobeCardStylist(
      wardrobe.wardrobe_name,
      wardrobe.items,
      wardrobe.looks,
      wardrobe.readytowear,
      wardrobe.wardrobe_code,
      userFirstName,
      userLastName
    );
  });
};

function initUserDetails() {
  const jsonString = localStorage.getItem("UserData");
  const dataObject = JSON.parse(jsonString);
  const userImg = document.getElementById("userImg_Name");
  const userName = document.getElementById("userName");
  userImg.src = dataObject.userImgUrl;
  userName.innerText = `${dataObject.userFirstName} ${dataObject.userLastName}`;
}
function createWardrobeCardStylist(
  wardrobeName,
  clothesNumber,
  outfitsNumber,
  readyToWearPercentage,
  wardrobeCode,
  userFirstName,
  userLastName
) {
  const wardrobeCard = document.createElement("div");
  wardrobeCard.classList.add("wardrobe-card", "wardrobe-card-fully");
  const buttonWardrobeTitle = document.createElement("button");
  buttonWardrobeTitle.classList.add("empty-button");
  const buttonUserName = document.createElement("button");
  buttonUserName.classList.add("empty-button");
  const userNameHeader = document.createElement("h3");
  userNameHeader.classList.add("wardrobe-name");
  userNameHeader.textContent = `${userFirstName} ${userLastName}`;
  const nameHeader = document.createElement("h3");
  nameHeader.classList.add("wardrobe-name");
  nameHeader.textContent = wardrobeName;
  buttonUserName.appendChild(userNameHeader);
  buttonWardrobeTitle.appendChild(nameHeader);
  const clothesNumberHeader = createHeader(`Items - ${clothesNumber}`, [
    "clothes-number",
    "cards-write",
  ]);
  const outfitsNumberHeader = createHeader(`Looks - ${outfitsNumber}`, [
    "outfits-number",
    "cards-write",
  ]);
  const readyToWearHeader = document.createElement("h5");
  readyToWearHeader.classList.add("ready-to-wear");
  readyToWearHeader.textContent = "Ready to wear ";
  const readyToWearSpan = document.createElement("span");
  readyToWearSpan.classList.add("ready-to-wear-dont-bold", "ready-to-wear");
  readyToWearSpan.textContent = readyToWearPercentage + "%";
  readyToWearHeader.appendChild(readyToWearSpan);
  wardrobeCard.appendChild(buttonUserName);
  wardrobeCard.appendChild(buttonWardrobeTitle);
  wardrobeCard.appendChild(clothesNumberHeader);
  wardrobeCard.appendChild(outfitsNumberHeader);
  wardrobeCard.appendChild(readyToWearHeader);
  const myWardRobesSection = document.getElementById("my-wardRobes");
  myWardRobesSection.appendChild(wardrobeCard);
  buttonWardrobeTitle.addEventListener("click", function (event) {
    const wardrobeCode1 = JSON.stringify(wardrobeCode);
    localStorage.setItem("currentWardrobeCode", wardrobeCode1);
    localStorage.setItem("currentWardrobeName", wardrobeName);
    const cursorStyle = getComputedStyle(event.target).cursor;
    if (cursorStyle === "pointer") {
      window.location.href = "wardrobe.html";
    }
  });
  addToDropdown(wardrobeName, wardrobeCode);
}
function createButton(className, text) {
  const button = document.createElement("button");
  button.classList.add("empty-button");
  const span = document.createElement("span");
  span.classList.add("material-symbols-outlined", className);
  span.textContent = text;
  button.appendChild(span);
  return button;
}

function createHeader(text, classNames) {
  const header = document.createElement("h5");
  classNames.forEach((className) => header.classList.add(className));
  header.textContent = text;
  return header;
}
function addToDropdown(wardrobeName, wardrobeCode) {
  console.log("added to drop down");
  const wardrobeInAccordion = document.getElementById("wardrobe-in-accordion");
  const dropdownItem = document.createElement("a");
  dropdownItem.classList.add("dropdown-item");
  dropdownItem.addEventListener("click", function (event) {
    console.log("hi");
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
  console.log("added to drop down");
}
