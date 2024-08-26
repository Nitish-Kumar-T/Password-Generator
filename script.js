function generatePassword() {
    const length = document.getElementById('length').value;
    const useUppercase = document.getElementById('uppercase').checked;
    const useLowercase = document.getElementById('lowercase').checked;
    const useNumbers = document.getElementById('numbers').checked;
    const useSymbols = document.getElementById('symbols').checked;

    let chars = '';
    if (useUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) chars += '0123456789';
    if (useSymbols) chars += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (chars === '') {
        alert('Please select at least one character type.');
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    document.getElementById('password').value = password;
    updateStrengthMeter(password);
}

function updateStrengthMeter(password) {
    const strength = calculatePasswordStrength(password);
    const meter = document.getElementById('strength');
    meter.value = strength;

    if (strength < 50) {
        meter.style.accentColor = '#ff4d4d';
    } else if (strength < 80) {
        meter.style.accentColor = '#ffd700';
    } else {
        meter.style.accentColor = '#4CAF50';
    }
}

function calculatePasswordStrength(password) {
    let strength = 0;
    if (password.length >= 12) strength += 25;
    if (password.match(/[a-z]+/)) strength += 10;
    if (password.match(/[A-Z]+/)) strength += 20;
    if (password.match(/[0-9]+/)) strength += 20;
    if (password.match(/[$@#&!]+/)) strength += 25;

    return Math.min(strength, 100);
}

function copyPassword() {
    const passwordField = document.getElementById('password');
    passwordField.select();
    document.execCommand('copy');
    alert('Password copied to clipboard!');
}

document.addEventListener('DOMContentLoaded', (event) => {
    generatePassword();
});