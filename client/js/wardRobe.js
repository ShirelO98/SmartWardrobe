window.onload = () => {
    initial();
    document.getElementById("items-button").onclick = changeButtonState;
    document.getElementById("looks-button").onclick = changeButtonState;
    document.getElementById("navbarDropdownMenuLink").onclick = dropDownSideNav;
    document.getElementById("sidebarToggle").onclick = closeOpenSideNav;
};


function initial() {
    initialItems();
    initDropDown();
}

function initialItems() {
    let button = document.getElementById('items-button');
    let span = button.querySelector('span');
    button.style.backgroundColor = 'black';
    span.style.color = 'white';
}

function initDropDown() {
    let wardrobeNames =  ["Ran's wardrobe", "Adar's wardrobe"];
    for (let i = 0; i < wardrobeNames.length; i++) {
        addToDropdown(wardrobeNames[i]);
    }
}

function changeButtonState(event) {
    let itemBut = document.getElementById("items-button");
    let itemSpan = itemBut.querySelector('span');
    let lookBut = document.getElementById("looks-button");
    let lookSpan = lookBut.querySelector('span');

    if (event.currentTarget === itemBut) {
        itemBut.style.backgroundColor = 'black';
        itemSpan.style.color = 'white';
        lookBut.style.backgroundColor = 'white';
        lookSpan.style.color = 'black';
    } else if (event.currentTarget === lookBut) {
        lookBut.style.backgroundColor = 'black';
        lookSpan.style.color = 'white';
        itemBut.style.backgroundColor = 'white';
        itemSpan.style.color = 'black';
    }
}