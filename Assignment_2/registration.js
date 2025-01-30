// Create modal HTML elements for copyable username
const modal = document.createElement('div');
modal.innerHTML = `
    <div id="usernameModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background-color: rgba(0,0,0,0.5); z-index: 1000;">
        <div style="position: relative; top: 50%; left: 50%; transform: translate(-50%, -50%); 
            background-color: white; padding: 20px; border-radius: 5px; width: 300px; text-align: center;">
            <h3>Registration Successful!</h3>
            <p>Your username is:</p>
            <div style="display: flex; justify-content: center; gap: 10px; margin: 15px 0;">
                <input type="text" id="usernameDisplay" readonly style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                <button onclick="copyUsername()" style="padding: 8px 15px; background-color: #4CAF50; color: white; 
                    border: none; border-radius: 4px; cursor: pointer;">Copy</button>
            </div>
            <p id="copyMessage" style="color: green; display: none; margin: 10px 0;">Username copied!</p>
            <p style="margin: 15px 0;">Please save this username for logging in.</p>
            <button onclick="closeModal()" style="padding: 8px 20px; background-color: #4CAF50; color: white; 
                border: none; border-radius: 4px; cursor: pointer;">Continue to Login</button>
        </div>
    </div>
`;
document.body.appendChild(modal);

// Function to copy username to clipboard
function copyUsername() {
    const usernameDisplay = document.getElementById('usernameDisplay');
    usernameDisplay.select();
    document.execCommand('copy');
    
    // Show copy confirmation
    const copyMessage = document.getElementById('copyMessage');
    copyMessage.style.display = 'block';
    setTimeout(() => {
        copyMessage.style.display = 'none';
    }, 2000);
}

// Function to close modal and redirect
function closeModal() {
    document.getElementById('usernameModal').style.display = 'none';
    window.location.href = 'login.html';
}

function validateAndSubmit(event) {
    event.preventDefault();
    
    // Reset error messages
    const errorElements = document.getElementsByClassName('error');
    for (let element of errorElements) {
        element.textContent = '';
    }

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const hobby = document.getElementById('hobby').value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;

    // Validation
    let isValid = true;

    // Name validation
    if (!/^[a-zA-Z\s]{2,30}$/.test(name)) {
        document.getElementById('nameError').textContent = 'Please enter a valid name (2-30 characters, letters only)';
        isValid = false;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    }

    // Phone validation
    if (!/^\d{10}$/.test(phone)) {
        document.getElementById('phoneError').textContent = 'Please enter a valid 10-digit phone number';
        isValid = false;
    }

    // Address validation
    if (address.trim().length < 5) {
        document.getElementById('addressError').textContent = 'Please enter a valid address (minimum 5 characters)';
        isValid = false;
    }

    // City validation
    if (!/^[a-zA-Z\s]{2,30}$/.test(city)) {
        document.getElementById('cityError').textContent = 'Please enter a valid city name';
        isValid = false;
    }

    // Hobby validation
    if (!hobby) {
        document.getElementById('hobbyError').textContent = 'Please select a hobby';
        isValid = false;
    }

    // Gender validation
    if (!gender) {
        document.getElementById('genderError').textContent = 'Please select a gender';
        isValid = false;
    }

    if (isValid) {
        // Generate random username
        const randomUsername = 'user_' + Math.random().toString(36).substring(2, 8);
        
        // Create user data object
        const userData = {
            name,
            email,
            phone,
            address,
            city,
            hobby,
            gender,
            username: randomUsername
        };

        // Store in localStorage
        localStorage.setItem('userData', JSON.stringify(userData));

        // Show success alert with copyable username
        alert('Sign up successful!');
        
        // Display modal with copyable username
        const modal = document.getElementById('usernameModal');
        const usernameDisplay = document.getElementById('usernameDisplay');
        usernameDisplay.value = randomUsername;
        modal.style.display = 'block';
    }
}

// Simulate AJAX POST request
function simulateAjaxPost(userData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ status: 'success', message: 'Data stored successfully' });
        }, 1000);
    });
}