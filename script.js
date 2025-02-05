document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let userType = document.getElementById("userType").value;
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    let message = document.getElementById("message");

    // Fixed credentials
    const studentUsername = "student";
    const studentPassword = "student123";

    const facultyUsername = "faculty";
    const facultyPassword = "faculty123";

    const hodUsername = "hod";
    const hodPassword = "hod123";

    const aoUsername = "ao";
    const aoPassword = "ao123";


    if (userType === "student" && username === studentUsername && password === studentPassword) {
        message.style.color = "green";
        message.textContent = "Student login successful! Redirecting...";

        // Store login details in local storage
        localStorage.setItem("loggedInUser", JSON.stringify({ userType, username }));

        setTimeout(() => window.location.href = "student-dashboard.html", 1500);
    } 
    else if (userType === "faculty" && username === facultyUsername && password === facultyPassword) {
        message.style.color = "green";
        message.textContent = "Faculty login successful! Redirecting...";

        // Store login details in local storage
        localStorage.setItem("loggedInUser", JSON.stringify({ userType, username }));

        setTimeout(() => window.location.href = "faculty.html", 1500);
    } 
    else if (userType === "hod" && username === hodUsername && password === hodPassword) {
        message.style.color = "green";
        message.textContent = "Faculty login successful! Redirecting...";

        // Store login details in local storage
        localStorage.setItem("loggedInUser", JSON.stringify({ userType, username }));

        setTimeout(() => window.location.href = "hod.html", 1500);
    } 
    else if (userType === "ao" && username === aoUsername && password === aoPassword) {
        message.style.color = "green";
        message.textContent = "Faculty login successful! Redirecting...";

        // Store login details in local storage
        localStorage.setItem("loggedInUser", JSON.stringify({ userType, username }));

        setTimeout(() => window.location.href = "ao.html", 1500);
    } 
    
    else {
        message.style.color = "red";
        message.textContent = "Invalid username or password!";
    }
});
