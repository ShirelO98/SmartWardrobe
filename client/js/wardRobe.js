window.onload = () => {
  initSideNav();
  initWardrobe();
};

function initWardrobe() {
  initialItemsAndType();
  initDropDown();
  createItemsCards();
  let plisItemsButton = document.querySelector(".plus-item-button");
  plisItemsButton.addEventListener("click", createItemForm);
  let itemsButton = document.getElementById("items-button");
  itemsButton.addEventListener("click", changeButtonState);
  let looksButton = document.getElementById("looks-button");
  looksButton.addEventListener("click", changeButtonState);
  let itemTypeBtn = document.getElementsByClassName("items-type");
  for (let i = 0; i < itemTypeBtn.length; i++) {
    itemTypeBtn[i].addEventListener("click", ItemTypeSelectorBtn);
  }
  let layoutBtn = document.getElementById("layout-button");
  layoutBtn.addEventListener("click", layoutDisplayBtn);
}

function initialItemsAndType() {
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
    document.getElementById("wardRobe").setAttribute("class", "active");
    document.getElementById("looks").setAttribute("class", "inactive");
    const tableSection = document.getElementById("itemsTable");
    tableSection.style.display = "none";
    let breadCrumbs = document.getElementsByClassName("breadcrumb")[0];
    const crumbs = breadCrumbs.getElementsByTagName("li");
    lastCrumb = crumbs[crumbs.length - 1];
    lastCrumb.textContent = "Items";
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
    document.getElementById("wardRobe").setAttribute("class", "inactive");
    document.getElementById("looks").setAttribute("class", "active");
    const tableSection = document.getElementById("itemsTable");
    tableSection.style.display = "none";
    let breadCrumbs = document.getElementsByClassName("breadcrumb")[0];
    const crumbs = breadCrumbs.getElementsByTagName("li");
    lastCrumb = crumbs[crumbs.length - 1];
    lastCrumb.textContent = "Looks";
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

function createItemForm() {
  const wardRobeSection = document.getElementById("wardRobe");
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  const formContainer = document.createElement("div");
  formContainer.className = "form-container";
  const closeButton = document.createElement("button");
  closeButton.className = "close-button";
  closeButton.innerHTML = "&times;";
  closeButton.onclick = function () {
    wardRobeSection.removeChild(overlay);
  };
  formContainer.appendChild(closeButton);

  const form = document.createElement("form");
  form.id = "multiStepForm";
  form.enctype = "multipart/form-data"; // Allows file uploads
  formContainer.appendChild(form);

  const progressBar = document.createElement("div");
  progressBar.className = "progress";
  const progressBarInner = document.createElement("div");
  progressBarInner.className = "progress-bar";
  progressBarInner.role = "progressbar";
  progressBarInner.style.width = "33%";
  progressBarInner.ariaValuenow = "33";
  progressBarInner.ariaValuemax = "100";
  progressBar.appendChild(progressBarInner);
  formContainer.appendChild(progressBar);

  const steps = [
    { inputs: ["Name", "Color", "Collection"] },
    { inputs: ["Style", "Season", "Price"] },
    { inputs: ["Material", "Brand", "Size"] },
  ];

  steps.forEach((step, index) => {
    const formStep = document.createElement("div");
    formStep.className = "form-step";
    if (index !== 0) formStep.style.display = "none";

    step.inputs.forEach((inputName) => {
      const formGroup = document.createElement("div");
      formGroup.className = "form-group";
      const label = document.createElement("label");
      label.textContent =
        inputName.charAt(0).toUpperCase() + inputName.slice(1);
      const input = document.createElement("input");
      input.type = "text";
      input.className = "form-control";
      input.name = inputName;
      formGroup.appendChild(label);
      formGroup.appendChild(input);
      formStep.appendChild(formGroup);
    });

    form.appendChild(formStep);
  });

  const navButtons = document.createElement("div");
  navButtons.className = "nav-buttons";
  const backButton = document.createElement("button");
  backButton.type = "button";
  backButton.className = "btn btn-secondary";
  backButton.textContent = "Back";
  backButton.onclick = function () {
    navigateSteps(-1);
  };
  backButton.style.display = "none";
  const nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.className = "btn btn-primary";
  nextButton.textContent = "Next";
  nextButton.onclick = function () {
    if (currentStep === steps.length - 1) {
      submitForm();
    } else {
      navigateSteps(1);
    }
  };
  navButtons.appendChild(backButton);
  navButtons.appendChild(nextButton);
  formContainer.appendChild(navButtons);
  overlay.appendChild(formContainer);
  wardRobeSection.appendChild(overlay);

  let currentStep = 0;

  function navigateSteps(direction) {
    const steps = document.querySelectorAll(".form-step");
    steps[currentStep].style.display = "none";
    currentStep += direction;
    steps[currentStep].style.display = "block";
    progressBarInner.style.width = `${
      ((currentStep + 1) / steps.length) * 100
    }%`;
    progressBarInner.ariaValuenow = `${
      ((currentStep + 1) / steps.length) * 100
    }`;
    backButton.style.display = currentStep === 0 ? "none" : "inline-block";
    nextButton.textContent =
      currentStep === steps.length - 1 ? "Submit" : "Next";
    if (currentStep === steps.length - 1) {
      const fileInputGroup = document.createElement("div");
      fileInputGroup.className = "input-group mb-3";
      const fileLabel = document.createElement("label");
      fileLabel.className = "input-group-text";
      fileLabel.textContent = "Upload";
      fileInputGroup.appendChild(fileLabel);
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.className = "form-control";
      fileInput.id = "inputGroupFile01";
      fileInputGroup.appendChild(fileInput);
      form.appendChild(fileInputGroup);
    } else {
      const fileInputGroup = form.querySelector(".input-group.mb-3");
      if (fileInputGroup) {
        form.removeChild(fileInputGroup);
      }
    }
  }

  function submitForm() {
    setTimeout(() => {
      const notification = document.createElement("div");
      notification.className = "alert alert-success mt-3";
      notification.textContent = "Item successfully added!";
      formContainer.insertBefore(notification, navButtons);
      setTimeout(() => {
        form.reset();
        wardRobeSection.removeChild(overlay);
      }, 2000);
    }, 1000);
  }
}

function createItemsCards() {
  const wardRobeSection = document.getElementById("wardRobe");
  for (let i = 1; i <= 3; i++) {
    const itemCard = createItemCard(`images/items/pants/${i}.png`, `Item ${i}`);
    wardRobeSection.appendChild(itemCard);
  }

  for (let i = 1; i <= 4; i++) {
    const itemCard = createItemCard(`images/items/shoes/${i}.png`, `Item ${i}`);
    wardRobeSection.appendChild(itemCard);
  }

  for (let i = 1; i <= 4; i++) {
    const itemCard = createItemCard(
      `images/items/t-shirt/${i}.png`,
      `Item ${i}`
    );
    wardRobeSection.appendChild(itemCard);
  }
}

function createItemCard(imageSrc, altText) {
  const itemCard = document.createElement("div");
  itemCard.className = "item-card-fully";

  const ellipseSpan = document.createElement("span");
  ellipseSpan.className = "elipse-item";
  itemCard.appendChild(ellipseSpan);

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

function layoutDisplayBtn(event) {
  let button = document.getElementById("layout-button");
  button.textContent = "grid_view";
}
