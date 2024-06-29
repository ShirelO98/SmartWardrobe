function initSideNav() {
  document.getElementById("navbarDropdownMenuLink").onclick = dropDownSideNav;
  document.getElementById("sidebarToggle").onclick = closeOpenSideNav;
}


function dropDownSideNav() {
  const dropdownContent = document.querySelector(".dropdown-menu-side");
  if (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none";
  } else {
    dropdownContent.style.display = "block";
  }
}


function closeOpenSideNav() {
  let sidebar = document.getElementById('sidebar');
  let toggleButton = document.getElementById('sidebarToggle');
  sidebar.classList.toggle('show');
  toggleButton.style.background = 'none';
  toggleButton.style.color = 'white';


  if (sidebar.classList.contains('show')) {
    sidebar.classList.remove('hidden');
    toggleButton.style.color = 'white';
    document.getElementsByTagName('main')[0].style.marginLeft = '330px';
    document.querySelector('.header-container').style.marginLeft = '330px';
  } else {
    sidebar.classList.add('hidden');
    toggleButton.style.color = 'black';
    document.querySelector('.header-container').style.marginLeft = '0px';
    document.getElementsByTagName('main')[0].style.marginLeft = '0px';
  }
}
