async function initMyWardrobe() {
  try {
    const jsonString = localStorage.getItem("UserData");
    const dataObject = JSON.parse(jsonString);
    const userId = dataObject.UserID;
    const userImg = document.getElementById("userImg_Name");
    const userName = document.getElementById("userName");
    userImg.src = dataObject.userImgUrl;
    userName.innerText = `${dataObject.userFirstName} ${dataObject.userLastName}`;
    const response = await fetch(
      `https://smartwardrobe-server.onrender.com/wardrobe/all/${userId}`
    );
    const wardrobes = await response.json();
    localStorage.setItem("wardrobesOfUser", JSON.stringify(wardrobes));
    wardrobes.forEach((wardrobe) => {
      createWardrobeCard(
        wardrobe.wardrobe_name,
        wardrobe.items,
        wardrobe.looks,
        wardrobe.readytowear,
        wardrobe.wardrobe_code
      );
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Failed to Fetch Wardrobes',
      text: error.message,
    });
  }
  document.querySelector(".plus-wardrobe-button").onclick = createWardrobeForm;
}

function createWardrobeForm() {
  const div = document.createElement("div");
  div.className = "wardrobe-card-empty";
  const form = document.createElement("form");
  form.action = "#";
  form.id = "form-toAdd-wardrobe";
  const label = document.createElement("label");
  label.textContent = "Wardrobe Name";
  const inputText = document.createElement("input");
  inputText.type = "text";
  inputText.maxLength = 18;
  inputText.className = "form-control";
  inputText.setAttribute("aria-label", "Sizing example input");
  inputText.setAttribute("aria-describedby", "inputGroup-sizing-default");
  const inputButton = document.createElement("input");
  inputButton.className = "btn btn-primary";
  inputButton.type = "button";
  inputButton.value = "Add Wardrobe";
  label.appendChild(inputText);
  label.appendChild(inputButton);
  form.appendChild(label);
  div.appendChild(form);
  const section = document.getElementById("my-wardRobes");
  section.appendChild(div);
  inputButton.addEventListener("click", async function () {
    const wardrobeNewName = inputText.value;
    section.removeChild(div);
    const jsonString = localStorage.getItem("UserData");
    const dataObject = JSON.parse(jsonString);
    console.log("Parsed Object:", dataObject);
    const UserId = dataObject.UserID;
    console.log(UserId);
    try {
      const response = await fetch(`https://smartwardrobe-server.onrender.com/wardrobe/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wardrobeName: wardrobeNewName,
          userId: UserId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add wardrobe");
      }
      const data = await response.json();
      const wardrobeCode = data.wardrobeCode;
      createWardrobeCard(wardrobeNewName, 0, 0, 0, wardrobeCode);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Addition Failed',
        text: 'Failed to add wardrobe: ' + error.message,
      });
    }
  });
}

function createWardrobeCard(
  wardrobeName,
  clothesNumber,
  outfitsNumber,
  readyToWearPercentage,
  wardrobeCode
) {
  const wardrobeCard = document.createElement("div");
  wardrobeCard.classList.add("wardrobe-card", "wardrobe-card-fully");
  const addButton = createButton("add-item", "add");
  const deleteButton = createButton("delete-item", "delete");
  const editButton = createButton("edit-item", "edit");
  wardrobeCard.appendChild(addButton);
  wardrobeCard.appendChild(deleteButton);
  wardrobeCard.appendChild(editButton);
  const buttonWardrobeTitle = document.createElement("button");
  buttonWardrobeTitle.classList.add("empty-button");
  const nameHeader = document.createElement("h3");
  nameHeader.classList.add("wardrobe-name");
  nameHeader.textContent = wardrobeName;
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
  wardrobeCard.appendChild(buttonWardrobeTitle);
  wardrobeCard.appendChild(clothesNumberHeader);
  wardrobeCard.appendChild(outfitsNumberHeader);
  wardrobeCard.appendChild(readyToWearHeader);
  const myWardRobesSection = document.getElementById("my-wardRobes");
  myWardRobesSection.appendChild(wardrobeCard);
  addToDropdown(wardrobeName, wardrobeCode);
  deleteButton.addEventListener("click", async function () {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this wardrobe?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });
  
    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://smartwardrobe-server.onrender.com/wardrobe/${wardrobeCode}`,
          {
            method: "DELETE",
          }
        );
  
        if (!response.ok) {
          throw new Error("Failed to delete wardrobe");
        }
  
        wardrobeCard.remove();
        removeFromDropdown(wardrobeName);
  
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The wardrobe has been deleted.',
        });
  
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Delete Wardrobe',
          text: error.message,
        });
      }
    }
  });

  let isEditing = false;
  editButton.addEventListener("click", function () {
    if (isEditing) return;
    isEditing = true;
    const currentName = nameHeader.textContent.trim();
    const inputContainer = document.createElement("div");
    inputContainer.classList.add("edit-input-container");

    const inputField = document.createElement("input");
    inputField.className = "form-control ed";
    inputField.type = "text";
    inputField.maxLength = 18;
    inputField.value = currentName;
    inputContainer.appendChild(inputField);

    const saveButton = document.createElement("button");
    saveButton.className = "btn btn-primary";
    saveButton.textContent = "Save";

    saveButton.addEventListener("click", async function (event) {
      event.stopPropagation();
      event.preventDefault();

      const newName = inputField.value.trim();
      try {
        const response = await fetch(
          `https://smartwardrobe-server.onrender.com/wardrobe/${wardrobeCode}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ wardrobeName: newName }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update wardrobe");
        }
        nameHeader.textContent = newName;
        updateDropdown(wardrobeName, newName);
        wardrobeName = newName;
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'Failed to update wardrobe: ' + error.message,
        });
      } finally {
        inputContainer.replaceWith(nameHeader);
        isEditing = false;
      }
    });

    inputContainer.appendChild(saveButton);
    nameHeader.replaceWith(inputContainer);
    inputField.focus();

    inputField.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        saveButton.click();
      }
    });

    inputField.addEventListener("blur", function () {
      if (inputField.value.trim() !== currentName) {
        saveButton.click();
      } else {
        inputContainer.replaceWith(nameHeader);
        isEditing = false;
      }
    });
  });

  buttonWardrobeTitle.addEventListener("click", function (event) {
    const wardrobeCode1 = JSON.stringify(wardrobeCode);
    localStorage.setItem("currentWardrobeCode", wardrobeCode1);
    localStorage.setItem("currentWardrobeName", wardrobeName);

    const cursorStyle = getComputedStyle(event.target).cursor;
    if (cursorStyle === "pointer" && !isEditing) {
      window.location.href = "wardrobe.html";
    }
  });
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

function removeFromDropdown(wardrobeName) {
  const wardrobeInAccordion = document.getElementById("wardrobe-in-accordion");
  const dropdownItems = wardrobeInAccordion.querySelectorAll(".dropdown-item");

  dropdownItems.forEach((item) => {
    const itemText = item.textContent.trim();
    if (itemText === wardrobeName) {
      item.remove();
    }
  });
}

function updateDropdown(oldName, newName) {
  const wardrobeInAccordion = document.getElementById("wardrobe-in-accordion");
  const dropdownItems = wardrobeInAccordion.querySelectorAll(".dropdown-item");

  dropdownItems.forEach((item) => {
    const itemText = item.textContent.trim();
    if (itemText === oldName) {
      item.childNodes[1].textContent = newName;
    }
  });
}
