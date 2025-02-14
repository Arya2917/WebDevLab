document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    
    // Validation patterns
    const patterns = {
        name: /^[A-Za-z\s]{2,}$/,
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        mobile: /^[0-9]{10}$/
    };

    // Real-time validation for text inputs
    ['name', 'email', 'mobile'].forEach(fieldId => {
        const field = document.getElementById(fieldId);
        field.addEventListener('input', () => {
            validateField(field, patterns[fieldId]);
        });
    });

    // Validation function
    function validateField(field, pattern) {
        const value = field.value.trim();
        const errorElement = document.getElementById(`${field.id}Error`);
        
        if (pattern) {
            if (!pattern.test(value)) {
                errorElement.style.display = 'block';
                return false;
            }
        } else if (!value) {
            errorElement.style.display = 'block';
            return false;
        }
        
        errorElement.style.display = 'none';
        return true;
    }

    // Mobile number validation - allow only numbers
    document.getElementById('mobile').addEventListener('keypress', (e) => {
        if (!/^\d$/.test(e.key)) {
            e.preventDefault();
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Validate text fields
        ['name', 'email', 'mobile'].forEach(fieldId => {
            isValid = validateField(document.getElementById(fieldId), patterns[fieldId]) && isValid;
        });

        // Validate password
        const password = document.getElementById('password').value;
        if (password.length < 8) {
            document.getElementById('passwordError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('passwordError').style.display = 'none';
        }

        // Validate gender
        const gender = form.querySelector('input[name="gender"]:checked');
        if (!gender) {
            document.getElementById('genderError').style.display = 'block';
            isValid = false;
        }

        // Validate city
        const city = document.getElementById('city');
        if (!city.value) {
            document.getElementById('cityError').style.display = 'block';
            isValid = false;
        }

        if (isValid) {
            // Collect form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                mobile: document.getElementById('mobile').value.trim(),
                email: document.getElementById('email').value.trim(),
                password: document.getElementById('password').value.trim(),
                gender: gender.value,
                hobbies: Array.from(form.querySelectorAll('input[name="hobbies"]:checked'))
                    .map(hobby => hobby.value),
                city: city.value
            };

            // Get existing users or initialize empty array
            let users = JSON.parse(localStorage.getItem('users')) || [];

            // Check if email already exists
            if (users.some(user => user.email === formData.email)) {
                alert('Email already registered. Please use a different email.');
                return;
            }

            // Add new user
            users.push(formData);

            // Save to localStorage
            localStorage.setItem('users', JSON.stringify(users));

            // Show success message
            document.getElementById('successMessage').style.display = 'block';

            // Reset form
            form.reset();

            // Redirect to login page after successful registration
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }
    });
});