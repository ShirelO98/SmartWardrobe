window.onload = () => {
    document.querySelector('.plus-wardrobe-button').onclick = createWardrobeForm;
    document.getElementById("navbarDropdownMenuLink").onclick = dropDownSideNav;
    document.getElementById("sidebarToggle").onclick = closeOpenSideNav;
    createWardrobeCard("Ran's wardrobe", 64, 87, 90);
    createWardrobeCard("Adar's wardrobe", 44, 17, 87); 
};
