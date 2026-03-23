// CyberQuest — auth.js

function switchTab(tab) {
    document.getElementById('form-login').classList.toggle('hidden', tab !== 'login');
    document.getElementById('form-signup').classList.toggle('hidden', tab !== 'signup');
    document.getElementById('tab-login').classList.toggle('active', tab === 'login');
    document.getElementById('tab-signup').classList.toggle('active', tab === 'signup');
    hideError('login-error');
    hideError('signup-error');
}

async function handleLogin() {
    hideError('login-error');
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    if (!username || !password) {
        showError('login-error', 'Please fill in all fields.');
        return;
    }

    const btn = document.querySelector('#form-login .pixel-btn');
    btn.textContent = '▶ LOGGING IN...';
    btn.disabled = true;

    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();

        if (data.success) {
            btn.textContent = '▶ ACCESS GRANTED';
            window.location.href = data.redirect;
        } else {
            showError('login-error', data.error || 'Login failed.');
            btn.innerHTML = '<span>▶ ENTER</span>';
            btn.disabled = false;
        }
    } catch {
        showError('login-error', 'Connection error. Please try again.');
        btn.innerHTML = '<span>▶ ENTER</span>';
        btn.disabled = false;
    }
}

async function handleSignup() {
    hideError('signup-error');
    const username = document.getElementById('signup-username').value.trim();
    const email    = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const confirm  = document.getElementById('signup-confirm').value;

    if (!username || !email || !password || !confirm) {
        showError('signup-error', 'Please fill in all fields.');
        return;
    }
    if (password !== confirm) {
        showError('signup-error', 'Passwords do not match.');
        return;
    }
    if (password.length < 8) {
        showError('signup-error', 'Password must be at least 8 characters.');
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('signup-error', 'Please enter a valid email address.');
        return;
    }

    const btn = document.querySelector('#form-signup .pixel-btn');
    btn.textContent = '▶ CREATING...';
    btn.disabled = true;

    try {
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        const data = await res.json();

        if (data.success) {
            btn.textContent = '▶ ACCOUNT CREATED!';
            window.location.href = data.redirect;
        } else {
            showError('signup-error', data.error || 'Registration failed.');
            btn.innerHTML = '<span>▶ CREATE ACCOUNT</span>';
            btn.disabled = false;
        }
    } catch {
        showError('signup-error', 'Connection error. Please try again.');
        btn.innerHTML = '<span>▶ CREATE ACCOUNT</span>';
        btn.disabled = false;
    }
}
