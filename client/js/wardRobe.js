window.onload = () => {
    document.getElementById("items-button").onclick = changeButtonState;
    document.getElementById("looks-button").onclick = changeButtonState;
    document.getElementById("navbarDropdownMenuLink").onclick = dropDownSideNav;
    document.getElementById("sidebarToggle").onclick = closeOpenSideNav;
};


function changeButtonState(event) {
    const button = event.currentTarget;
    const span = button.querySelector('span');
    
    if(button.style.backgroundColor === 'black') {
        button.style.backgroundColor = 'white';
        span.style.color = 'black';
    }
    else {
        button.style.backgroundColor = 'black';
        span.style.color = 'white';
    }
}