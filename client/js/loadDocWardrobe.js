window.onload = () => {
    document.getElementById("navbarDropdownMenuLink").onclick = dropDownSideNav;
    document.getElementById("sidebarToggle").onclick = closeOpenSideNav;
    document.querySelector('.plus-wardrobe-button').onclick = createWardrobeForm;
    createWardrobeCard("Ran's wardrobe", 64, 87, 90);
    createWardrobeCard("Adar's wardrobe", 44, 17, 87); 
};

