document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    // Email validation pattern
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // Real-time email validation
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('input', function() {
        const errorElement = document.getElementById('emailError');
        if (!emailPattern.test(this.value.trim())) {
            errorElement.style.display = 'block';
        } else {
            errorElement.style.display = 'none';
        }
    });

    // Handle form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = document.getElementById('password').value.trim();
        let isValid = true;

        // Validate email
        if (!emailPattern.test(email)) {
            document.getElementById('emailError').style.display = 'block';
            isValid = false;
        }

        // Validate password
        if (!password) {
            document.getElementById('passwordError').style.display = 'block';
            isValid = false;
        }

        if (isValid) {
            // Get registered users from localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Find user with matching email and password
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // Show success message
                document.getElementById('successMessage').style.display = 'block';
                document.getElementById('loginError').style.display = 'none';

                // Store login status
                localStorage.setItem('currentUser', JSON.stringify(user));

                // Reset form
                loginForm.reset();
            } else {
                document.getElementById('loginError').style.display = 'block';
            }
        }
    });
});
