window.onload = () => {
    document.getElementById("navbarDropdownMenuLink").onclick = dropDownSideNav;
    document.getElementById("sidebarToggle").onclick = closeOpenSideNav;
    document.querySelector('.plus-wardrobe-button').onclick = createWardrobeForm;
    init();
};

