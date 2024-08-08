window.onload = () => {
    initSideNav();
    initMyWardrobe();
    setupWeatherForm();
    if (localStorage.getItem("messageShown") !== "true") {
        initMsgFromStylist();
    }
};

async function initMsgFromStylist() {
    let userData = localStorage.getItem("UserData");
    if (!userData) {
        console.error("No user data found in localStorage");
        return;
    }

    userData = JSON.parse(userData);
    let msg = userData.messegeFromStylist;
    let lookId = userData.selectedLook;
    let wardrobeCode = userData.wardrobeCode;

    if (!msg || !lookId || !wardrobeCode) {
        console.error("Missing message, lookId, or wardrobeCode in userData");
        return;
    }

    const modal = document.createElement("div");
    modal.className = "modal";
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    const title = document.createElement("h2");
    title.textContent = "You have a message from your stylist!";
    modalHeader.appendChild(title);
    modalContent.appendChild(modalHeader);
    const closeButton = document.createElement("span");
    closeButton.className = "close-button";
    closeButton.textContent = "×";
    closeButton.addEventListener("click", () => {
        modal.remove();
    });
    modalHeader.appendChild(closeButton);
    const messageElement = document.createElement("div");
    messageElement.className = "stylist-message";
    messageElement.textContent = msg;
    modalContent.appendChild(messageElement);
    const lookElement = document.createElement("div");
    lookElement.className = "stylist-look";
    modalContent.appendChild(lookElement);
    try {
        const response = await fetch(`https://smartwardrobe-server.onrender.com/looks/${wardrobeCode}/${lookId}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch look: ${response.statusText}`);
        }

        const lookData = await response.json();
        const { item_img_1, item_img_2, item_img_3 } = lookData;

        [item_img_1, item_img_2, item_img_3].forEach(imageUrl => {
            if (imageUrl) {
                const img = document.createElement("img");
                img.src = imageUrl;
                img.alt = "Look Image";
                img.className = "look-image";
                lookElement.appendChild(img);
            }
        });

    } catch (error) {
        lookElement.textContent = "Failed to load look";
    }
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    localStorage.setItem("messageShown", "true");
}