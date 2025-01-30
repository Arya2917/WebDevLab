function handleLogin(event) {
    event.preventDefault();

    // Reset error messages
    const errorElements = document.getElementsByClassName('error');
    for (let element of errorElements) {
        element.textContent = '';
    }

    // Get form values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Get stored user data
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
        alert('No user data found. Please register first.');
        window.location.href = 'registration.html';
        return false;
    }

    // Validate username
    if (username !== userData.username) {
        document.getElementById('usernameError').textContent = 'Invalid username';
        return false;
    }

    // In a real application, you would hash the password and compare with stored hash
    // For this example, we'll just check if password is not empty
    if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters';
        return false;
    }

    // Show success message
    alert('Login successful!');

    // Display user information
    displayUserInfo(userData);

    return false;
}

function displayUserInfo(userData) {
    // Create and style a new div for user information
    const userInfoDiv = document.createElement('div');
    userInfoDiv.style.marginTop = '20px';
    userInfoDiv.style.padding = '20px';
    userInfoDiv.style.border = '1px solid #ccc';
    userInfoDiv.style.borderRadius = '5px';

    // Create HTML for user information
    userInfoDiv.innerHTML = `
        <h3>User Information</h3>
        <p><strong>Name:</strong> ${userData.name}</p>
        <p><strong>Email:</strong> ${userData.email}</p>
        <p><strong>Phone:</strong> ${userData.phone}</p>
        <p><strong>Address:</strong> ${userData.address}</p>
        <p><strong>City:</strong> ${userData.city}</p>
        <p><strong>Hobby:</strong> ${userData.hobby}</p>
        <p><strong>Gender:</strong> ${userData.gender}</p>
        <p><strong>Username:</strong> ${userData.username}</p>
    `;

    // Add the user info div to the page
    document.querySelector('.container').appendChild(userInfoDiv);
}