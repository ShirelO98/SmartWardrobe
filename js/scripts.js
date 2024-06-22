window.onload = () => {
    // document.querySelector('.plus-wardrobe-button').onclick = createWardrobeForm;
    createWardrobeCard("Ran's wardrobe", 64, 87, 90);
    createWardrobeCard("Adar's wardrobe", 44, 17, 87);
};

// function createWardrobeForm() {
//     const container = document.getElementById('my-wardRobes');

//     // Create the form element
//     const form = document.createElement('form');
//     form.id = 'wardrobeForm';

//     // Create input element for the wardrobe name
//     const nameLabel = document.createElement('label');
//     nameLabel.setAttribute('for', 'wardrobeName');
//     nameLabel.textContent = 'Enter wardrobe name:';
//     form.appendChild(nameLabel);

//     const nameInput = document.createElement('input');
//     nameInput.type = 'text';
//     nameInput.id = 'wardrobeName';
//     nameInput.name = 'wardrobeName';
//     form.appendChild(nameInput);

//     // Create submit button
//     const submitButton = document.createElement('button');
//     submitButton.type = 'submit';
//     submitButton.textContent = 'Add Wardrobe';
//     form.appendChild(submitButton);

//     // Append the form to the container
//     container.appendChild(form);

//     // Add event listener for form submission
//     form.onsubmit = addWardrobe;
// }


// function addWardrobe(event) {

//     event.preventDefault(); // Prevent form submission
//     const wardrobeName = document.getElementById('wardrobeName').value;

//     const newWardrobe = document.createElement('div');
//     newWardrobe.classList.add('wardrobe-card-fully',);
//     newWardrobe.textContent = wardrobeName;

//     document.body.appendChild(newWardrobe); // Add the new wardrobe to the body (you can change this as needed)

//     // Remove the form after adding the wardrobe
//     const form = document.getElementById('wardrobeForm');
//     form.remove();
// }

// Function to create a new wardrobe card
function createWardrobeCard(wardrobeName, clothesNumber, outfitsNumber, readyToWearPercentage) {
    const wardrobeCard = document.createElement('div');
    wardrobeCard.classList.add('wardrobe-card', 'wardrobe-card-fully');

    // Create the buttons for add, delete, and edit
    const addButton = createButton('add-item', 'add');
    const deleteButton = createButton('delete-item', 'delete');
    const editButton = createButton('edit-item', 'edit');

    // Append buttons to the wardrobe card
    wardrobeCard.appendChild(addButton);
    wardrobeCard.appendChild(deleteButton);
    wardrobeCard.appendChild(editButton);

    // Create h3 element for wardrobe name
    const nameHeader = document.createElement('h3');
    nameHeader.classList.add('wordrobe-name');
    nameHeader.textContent = wardrobeName;

    // Create h5 elements for clothes number and outfits number
    const clothesNumberHeader = createHeader('Clothes - ' + clothesNumber, ['Clothes-number', 'cards-write']);
    const outfitsNumberHeader = createHeader('Outfits - ' + outfitsNumber, ['Outfits-number', 'cards-write']);

    // Create h5 element for ready to wear
    const readyToWearHeader = document.createElement('h5');
    readyToWearHeader.classList.add('ready-to-wear');
    readyToWearHeader.textContent = 'Ready to wear ';

    const readyToWearSpan = document.createElement('span');
    readyToWearSpan.classList.add('ready-to-wear-dont-bold', 'ready-to-wear');
    readyToWearSpan.textContent = readyToWearPercentage + '%';
    readyToWearHeader.appendChild(readyToWearSpan);

    // Append headers to the wardrobe card
    wardrobeCard.appendChild(nameHeader);
    wardrobeCard.appendChild(clothesNumberHeader);
    wardrobeCard.appendChild(outfitsNumberHeader);
    wardrobeCard.appendChild(readyToWearHeader);

    // Append the wardrobe card to the section
    const myWardRobesSection = document.getElementById('my-wardRobes');
    myWardRobesSection.appendChild(wardrobeCard);
}

// Function to create a button element
function createButton(className, text) {
    const button = document.createElement('button');
    button.classList.add('empty-button');
    const span = document.createElement('span');
    span.classList.add('material-symbols-outlined', className);
    span.textContent = text;
    button.appendChild(span);
    return button;
}

// Function to create a header element
function createHeader(text, classNames) {
    const header = document.createElement('h5');
    classNames.forEach(className => header.classList.add(className));
    header.textContent = text;
    return header;
}

