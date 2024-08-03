window.onload = () => {
  initClients();
  initUserDetails();
  initSideNav();
};

async function initClients() {
  try {
    const jsonString = localStorage.getItem("UserData");
    const dataObject = JSON.parse(jsonString);
    const userId = dataObject.UserID;

    const response = await fetch(`http://localhost:8081/stylist/${userId}`);
    const clients = await response.json();
    localStorage.setItem('clients', JSON.stringify(clients));

    const container = document.getElementById('my-clients');
    container.innerHTML = '';
    
    clients.forEach(client => {
      const cardHtml = `
        <div class="card" style="width: 18rem;">
          <img src="${client.client_image}" class="card-img-top" alt="${client.f_name} ${client.l_name}">
          <div class="card-body">
            <h4 class="card-title">${client.f_name} ${client.l_name}</h4>
            <h6 class="card-title"><b>Message:</b></h6>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <a href="#" class="card-link wardrobe-link" data-client-id="${client.id}" data-client-name="${client.f_name} ${client.l_name}">My wardrobes</a>
            </li>
            <li class="list-group-item">
              <a href="#" class="card-link">Tasks</a>
            </li>
          </ul>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', cardHtml);
    });
    initializeDropdown();
    const wardrobeLinks = document.querySelectorAll('.wardrobe-link');
    wardrobeLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const clientId = event.target.getAttribute('data-client-id');
        const clientName = event.target.getAttribute('data-client-name');

        localStorage.setItem('CurrentClientId', clientId);
        localStorage.setItem('currentClientName', clientName);
        window.location.href = 'stylist-myWardrobe.html'; 
      });
    });

  } catch (error) {
    console.error("Failed to fetch clients:", error);
  }
}

function initUserDetails() {
  const jsonString = localStorage.getItem("UserData");
  const dataObject = JSON.parse(jsonString);
  const userImg = document.getElementById("userImg_Name");
  const userName = document.getElementById("userName");
  userImg.src = dataObject.userImgUrl;
  userName.innerText = `${dataObject.userFirstName} ${dataObject.userLastName}`;
}

function addToDropdownSta(clientName, clientId) {
  const wardrobeInAccordion = document.getElementById("wardrobe-in-accordion");
  const dropdownItem = document.createElement("a");
  dropdownItem.classList.add("dropdown-item");
  dropdownItem.addEventListener('click', (event) => {
    localStorage.setItem('CurrentClientId', clientId);
    localStorage.setItem('currentClientName', clientName);
    window.location.href = "stylist-myWardrobe.html";
  });
  const closetImg = document.createElement("img");
  closetImg.src = "images/closet.png";
  closetImg.alt = "";
  closetImg.classList.add("closet_img");
  const wardrobeText = document.createTextNode(`${clientName}`);
  dropdownItem.appendChild(closetImg);
  dropdownItem.appendChild(wardrobeText);
  wardrobeInAccordion.appendChild(dropdownItem);
}

function initializeDropdown() {
  const clients = JSON.parse(localStorage.getItem('clients'));
  if (!clients) {
    console.error("No clients data found in local storage.");
    return;
  }
  const wardrobeInAccordion = document.getElementById("wardrobe-in-accordion");
  wardrobeInAccordion.innerHTML = ''; 
  clients.forEach(client => {
    addToDropdownSta(`${client.f_name} ${client.l_name}`, client.id);
  });
}