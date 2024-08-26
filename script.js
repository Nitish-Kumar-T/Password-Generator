let passwordHistory = [];

function generatePassword() {
    const length = document.getElementById('length').value;
    const useUppercase = document.getElementById('uppercase').checked;
    const useLowercase = document.getElementById('lowercase').checked;
    const useNumbers = document.getElementById('numbers').checked;
    const useSymbols = document.getElementById('symbols').checked;
    const excludeSimilar = document.getElementById('exclude-similar').checked;
    const avoidAmbiguous = document.getElementById('avoid-ambiguous').checked;

    let chars = '';
    if (useUppercase) chars += 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    if (useLowercase) chars += 'abcdefghijkmnpqrstuvwxyz';
    if (useNumbers) chars += '23456789';
    if (useSymbols) chars += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    if (excludeSimilar) {
        chars = chars.replace(/[ilLI|`1oO0]/g, '');
    }
    
    if (avoidAmbiguous) {
        chars = chars.replace(/[{}[\]()/\\'"~,;.<>]/g, '');
    }

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
    addToHistory(password);
}

function updateStrengthMeter(password) {
    const strength = calculatePasswordStrength(password);
    const meter = document.getElementById('strength');
    const strengthText = document.getElementById('strength-text');
    meter.value = strength;

    if (strength < 50) {
        meter.style.accentColor = '#ff4d4d';
        strengthText.textContent = 'Weak';
        strengthText.style.color = '#ff4d4d';
    } else if (strength < 80) {
        meter.style.accentColor = '#ffd700';
        strengthText.textContent = 'Moderate';
        strengthText.style.color = '#ffd700';
    } else {
        meter.style.accentColor = '#4CAF50';
        strengthText.textContent = 'Strong';
        strengthText.style.color = '#4CAF50';
    }
}

function calculatePasswordStrength(password) {
    let strength = 0;
    const length = password.length;
    

    strength += Math.min(length * 4, 25);
    

    if (password.match(/[a-z]/)) strength += 10;
    

    if (password.match(/[A-Z]/)) strength += 15;
    

    if (password.match(/\d/)) strength += 10;
    
    if (password.match(/[^a-zA-Z\d]/)) strength += 15;
    
    if (password.match(/[a-z]/) && password.match(/[A-Z]/) && password.match(/\d/) && password.match(/[^a-zA-Z\d]/)) {
        strength += 15;
    }
    
    const repeats = (password.match(/(.)\1/g) || []).length;
    strength -= repeats * 2;

    return Math.max(0, Math.min(strength, 100));
}

function copyPassword() {
    const passwordField = document.getElementById('password');
    passwordField.select();
    document.execCommand('copy');
    alert('Password copied to clipboard!');
}

function togglePasswordVisibility() {
    const passwordField = document.getElementById('password');
    const toggleBtn = document.getElementById('show-hide-btn');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleBtn.textContent = 'Hide';
    } else {
        passwordField.type = 'password';
        toggleBtn.textContent = 'Show';
    }
}

function addToHistory(password) {
    passwordHistory.unshift(password);
    if (passwordHistory.length > 5) {
        passwordHistory.pop();
    }
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('password-history');
    historyList.innerHTML = '';
    passwordHistory.forEach((pass, index) => {
        const li = document.createElement('li');
        li.textContent = pass;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteFromHistory(index);
        li.appendChild(deleteBtn);
        historyList.appendChild(li);
    });
}

function deleteFromHistory(index) {
    passwordHistory.splice(index, 1);
    updateHistoryDisplay();
}

function updateLengthValue() {
    document.getElementById('length-value').textContent = document.getElementById('length').value;
}

function checkPasswordStrength() {
    const password = document.getElementById('check-password').value;
    const strength = calculatePasswordStrength(password);
    const resultDiv = document.getElementById('strength-result');
    
    let strengthText, color;
    if (strength < 50) {
        strengthText = 'Weak';
        color = '#ff4d4d';
    } else if (strength < 80) {
        strengthText = 'Moderate';
        color = '#ffd700';
    } else {
        strengthText = 'Strong';
        color = '#4CAF50';
    }
    
    resultDiv.innerHTML = `Password Strength: <span style="color: ${color};">${strengthText}</span> (${strength}/100)`;
}

function switchTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
}


document.addEventListener('DOMContentLoaded', (event) => {
    generatePassword();
    document.getElementById('length').addEventListener('input', updateLengthValue);
    updateLengthValue();
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
});