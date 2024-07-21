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
    form.enctype = "multipart/form-data";
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
  
        if (inputName === "Collection") {
          const select = document.createElement("select");
          select.className = "form-control select-arrow"; // Add the 'select-arrow' class here
          select.name = inputName;
  
          const options = ["shirt", "pants", "shoes"];
          options.forEach((option) => {
            const optionElement = document.createElement("option");
            optionElement.value = option;
            optionElement.textContent = option.charAt(0).toUpperCase() + option.slice(1);
            select.appendChild(optionElement);
          });
  
          formGroup.appendChild(label);
          formGroup.appendChild(select);
        } else {
          const input = document.createElement("input");
          input.type = "text";
          input.className = "form-control";
          input.name = inputName;
  
          formGroup.appendChild(label);
          formGroup.appendChild(input);
        }
  
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
        console.log("POST/user/wardrobes/:id/items")
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
  