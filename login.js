/**
 * Flipkart Clone - Login Page Logic (login.js)
 * Clean, separated JavaScript for login form submission and OTP validation
 */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const input = loginForm.querySelector('input[type="text"]');
            const val = input ? input.value.trim() : '';

            if (val) {
                alert(`OTP sent successfully to ${val}! Redirecting to your Flipkart account...`);
                window.location.href = './afterlogin.html';
            } else {
                alert('Please enter a valid Email / Mobile number');
            }
        });
    }
});
