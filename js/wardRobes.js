function createWardrobeForm() {
    const div = document.createElement('div');
    div.className = 'wardrobe-card-empty';
    const form = document.createElement('form');
    form.action = '#';
    form.id = 'form-toAdd-wardrobe';
    const label = document.createElement('label');
    label.textContent = 'Wardrobe Name';
    const inputText = document.createElement('input');
    inputText.type = 'text';
    inputText.maxLength = 20;
    inputText.className = 'form-control';
    inputText.setAttribute('aria-label', 'Sizing example input');
    inputText.setAttribute('aria-describedby', 'inputGroup-sizing-default');
    const inputButton = document.createElement('input');
    inputButton.className = 'btn btn-primary';
    inputButton.type = 'button';
    inputButton.value = 'Add Wardrobe';

    label.appendChild(inputText);
    label.appendChild(inputButton);
    form.appendChild(label);
    div.appendChild(form);
    const section = document.getElementById('my-wardRobes');
    section.appendChild(div);

    inputButton.addEventListener('click', function () {
        const wardrobeName = inputText.value;
        section.removeChild(div);
        createWardrobeCard(wardrobeName, 0, 0, 0);
    });
}

// Function to create a new wardrobe card
function createWardrobeCard(wardrobeName, clothesNumber, outfitsNumber, readyToWearPercentage) {
    const wardrobeCard = document.createElement('div');
    wardrobeCard.classList.add('wardrobe-card', 'wardrobe-card-fully');
    const addButton = createButton('add-item', 'add');
    const deleteButton = createButton('delete-item', 'delete');
    const editButton = createButton('edit-item', 'edit');
    wardrobeCard.appendChild(addButton);
    wardrobeCard.appendChild(deleteButton);
    wardrobeCard.appendChild(editButton);
    const nameHeader = document.createElement('h3');
    nameHeader.classList.add('wordrobe-name');
    nameHeader.textContent = wardrobeName;
    const clothesNumberHeader = createHeader('Clothes - ' + clothesNumber, ['Clothes-number', 'cards-write']);
    const outfitsNumberHeader = createHeader('Outfits - ' + outfitsNumber, ['Outfits-number', 'cards-write']);
    const readyToWearHeader = document.createElement('h5');
    readyToWearHeader.classList.add('ready-to-wear');
    readyToWearHeader.textContent = 'Ready to wear ';
    const readyToWearSpan = document.createElement('span');
    readyToWearSpan.classList.add('ready-to-wear-dont-bold', 'ready-to-wear');
    readyToWearSpan.textContent = readyToWearPercentage + '%';
    readyToWearHeader.appendChild(readyToWearSpan);
    wardrobeCard.appendChild(nameHeader);
    wardrobeCard.appendChild(clothesNumberHeader);
    wardrobeCard.appendChild(outfitsNumberHeader);
    wardrobeCard.appendChild(readyToWearHeader);
    const myWardRobesSection = document.getElementById('my-wardRobes');
    myWardRobesSection.appendChild(wardrobeCard);

    deleteButton.addEventListener('click', function () {
        wardrobeCard.remove();
    });

    editButton.addEventListener('click', function () {
        const currentName = nameHeader.textContent.trim();
        const inputContainer = document.createElement('div');
        inputContainer.classList.add('edit-input-container');
        
        // Create an input field with a maximum length of 25 characters
        const inputField = document.createElement('input');
        inputField.className = 'form-control ed';
        inputField.type = 'text';
        inputField.maxLength = 25; 
        inputField.value = currentName;
        inputContainer.appendChild(inputField);
        const saveButton = document.createElement('button');
        saveButton.className = 'btn btn-primary';
        saveButton.textContent = 'Save';
        saveButton.addEventListener('click', function () {
            const newName = inputField.value.trim();
            nameHeader.textContent = newName;
            inputContainer.replaceWith(nameHeader);
        });
        
        inputContainer.appendChild(saveButton);
        nameHeader.replaceWith(inputContainer);
        inputField.focus();
        inputField.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                saveButton.click();
            }
        });
        inputField.addEventListener('blur', function () {
            saveButton.click();
        });
    });
    
}

function createButton(className, text) {
    const button = document.createElement('button');
    button.classList.add('empty-button');
    const span = document.createElement('span');
    span.classList.add('material-symbols-outlined', className);
    span.textContent = text;
    button.appendChild(span);
    return button;
}

function createHeader(text, classNames) {
    const header = document.createElement('h5');
    classNames.forEach(className => header.classList.add(className));
    header.textContent = text;
    return header;
}