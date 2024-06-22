window.onload = () => {
    const dropDownButton = document.getElementById("navbarDropdownMenuLink");
    dropDownButton.addEventListener("click", dropDownSideNav);
  };
  
  function dropDownSideNav(event) {
    event.preventDefault(); // Prevent default behavior of <a> tag
    const Messages = document.getElementById("Messages_");
    const dropdownContent = document.querySelector(".dropdown-menu-side");
  
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
      Messages.style.marginTop = "25px";
    } else {
      dropdownContent.style.display = "block";
      Messages.style.marginTop = "200px";
      Messages.style.paddingBottom = "0px";
    }
  }
  document.addEventListener('DOMContentLoaded', function() {
    var sidebar = document.getElementById('sidebar');
    var toggleButton = document.getElementById('sidebarToggle');
  
    toggleButton.addEventListener('click', function() {
        sidebar.classList.toggle('show');
        if (sidebar.classList.contains('show')) {
            sidebar.classList.remove('hidden');
        } else {
            sidebar.classList.add('hidden');
        }
    });
  });
  
  
  