window.onload = () => {
  initSideNav();
  initWardrobe();
};

function initWardrobe() {
  initialItemsAndType();
  initDropDown();
  let plisItemsButton = document.querySelector('.plus-item-button');
  plisItemsButton.addEventListener("click", createItemForm);
  let itemsButton = document.getElementById("items-button");
  itemsButton.addEventListener("click", changeButtonState);
  let looksButton = document.getElementById("looks-button");
  looksButton.addEventListener("click", changeButtonState);
  let itemTypeBtn = document.getElementsByClassName("items-type");
  for (let i = 0; i < itemTypeBtn.length; i++) {
    itemTypeBtn[i].addEventListener("click", ItemTypeSelectorBtn);
  }
}

function initialItemsAndType() {
  let button = document.getElementById("items-button");
  let span = button.querySelector("span");
  button.style.backgroundColor = "black";
  span.style.color = "white";
  document.querySelectorAll('.items-type span').forEach(item => {
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

function createItemForm() {
  const wardRobeSection = document.getElementById('wardRobe');
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  const formContainer = document.createElement('div');
  formContainer.className = 'form-container';
  const closeButton = document.createElement('button');
  closeButton.className = 'close-button';
  closeButton.innerHTML = '&times;';
  closeButton.onclick = function () {
      wardRobeSection.removeChild(overlay);
  };
  formContainer.appendChild(closeButton);

  const form = document.createElement('form');
  form.id = 'multiStepForm';
  formContainer.appendChild(form);
  const progressBar = document.createElement('div');
  progressBar.className = 'progress';
  const progressBarInner = document.createElement('div');
  progressBarInner.className = 'progress-bar';
  progressBarInner.role = 'progressbar';
  progressBarInner.style.width = '33%';
  progressBarInner.ariaValuenow = '33';
  progressBarInner.ariaValuemax = '100';
  progressBar.appendChild(progressBarInner);
  formContainer.appendChild(progressBar);

  const steps = [
      { inputs: ['Name', 'color', 'collection'] },
      { inputs: ['style', 'season', 'price'] },
      { inputs: ['material', 'brand', 'size'] }
  ];

  steps.forEach((step, index) => {
      const formStep = document.createElement('div');
      formStep.className = 'form-step';
      if (index !== 0) formStep.style.display = 'none';

      step.inputs.forEach(inputName => {
          const formGroup = document.createElement('div');
          formGroup.className = 'form-group';
          const label = document.createElement('label');
          label.textContent = inputName.charAt(0).toUpperCase() + inputName.slice(1);
          const input = document.createElement('input');
          input.type = 'text';
          input.className = 'form-control';
          input.name = inputName;
          formGroup.appendChild(label);
          formGroup.appendChild(input);
          formStep.appendChild(formGroup);
      });

      form.appendChild(formStep);
  });
  const navButtons = document.createElement('div');
  navButtons.className = 'nav-buttons';
  const backButton = document.createElement('button');
  backButton.type = 'button';
  backButton.className = 'btn btn-secondary';
  backButton.textContent = 'Back';
  backButton.onclick = function () { navigateSteps(-1); };
  backButton.style.display = 'none';
  const nextButton = document.createElement('button');
  nextButton.type = 'button';
  nextButton.className = 'btn btn-primary';
  nextButton.textContent = 'Next';
  nextButton.onclick = function () { navigateSteps(1); };
  navButtons.appendChild(backButton);
  navButtons.appendChild(nextButton);
  formContainer.appendChild(navButtons);
  overlay.appendChild(formContainer);
  wardRobeSection.appendChild(overlay);
  let currentStep = 0;
  function navigateSteps(direction) {
      const steps = document.querySelectorAll('.form-step');
      steps[currentStep].style.display = 'none';
      currentStep += direction;
      steps[currentStep].style.display = 'block';
      progressBarInner.style.width = `${(currentStep + 1) / steps.length * 100}%`;
      progressBarInner.ariaValuenow = `${(currentStep + 1) / steps.length * 100}`;
      backButton.style.display = currentStep === 0 ? 'none' : 'inline-block';
      nextButton.textContent = currentStep === steps.length - 1 ? 'Submit' : 'Next';
  }
}