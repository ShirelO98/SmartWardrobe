window.onload = () => {
  const loginButton = document.getElementById("loginButton");
  loginButton.addEventListener("click", loginUser);
};

async function loginUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  try {
    const response = await fetch("http://localhost:8081/user/login", {
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
    localStorage.setItem('userId', userData.user_id)
    if (userData.user_type === 1) {
      window.location.href = './index.html';
    } else if (userData.user_type === '2') {
      window.location.href = '#'; // Add the path to the stylist page
    } else {
      alert("Unknown user type!");
    }

  } catch (error) {
    console.error("Login failed:", error.message);
    alert("Login failed: " + error.message);
  }
}
