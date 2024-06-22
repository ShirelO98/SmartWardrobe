function dropDownSideNav(event) {
  event.preventDefault(); // Prevent default behavior of <a> tag
  const Messages = document.getElementById("Messages_");
  const dropdownContent = document.querySelector(".dropdown-menu-side");

  if (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none";
  } else {
    dropdownContent.style.display = "block";
    Messages.style.paddingBottom = "0px";
  }
}

document.addEventListener('DOMContentLoaded', function () {
  let sidebar = document.getElementById('sidebar');
  let toggleButton = document.getElementById('sidebarToggle');
  toggleButton.style.background = 'none'; 
  toggleButton.style.color = 'white'; 

  toggleButton.addEventListener('click', function () {
    sidebar.classList.toggle('show');
    if (sidebar.classList.contains('show')) {
      sidebar.classList.remove('hidden');
      toggleButton.style.color = 'white';
    } else {
      sidebar.classList.add('hidden');
      toggleButton.style.color = 'black';
    }
  });
});


