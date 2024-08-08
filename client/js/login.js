window.onload = () => {
  const loginButton = document.getElementById("loginButton");
  loginButton.addEventListener("click", loginUser);
};

async function loginUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  try {
    const response = await fetch("https://smartwardrobe-server.onrender.com/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to login");
    }
    const userData = await response.json();
    const userDataString = JSON.stringify(userData);
    localStorage.setItem("UserData", userDataString);
    if (userData.user_type === 1) {
      window.location.href = "./index.html";
    } else if (userData.user_type === 2) {
      window.location.href = "./stylist.html"; 
    } else {
      alert("Unknown user type!");
    }
  } catch (error) {
    alert("Login failed: " + error.message);
  }
}
