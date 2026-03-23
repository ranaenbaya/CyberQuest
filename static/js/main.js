// CyberQuest — main.js
// Shared utilities across all pages

async function handleLogout() {
    await fetch('/api/logout', { method: 'POST' });
    window.location.href = '/';
}

function showError(elementId, message) {
    const el = document.getElementById(elementId);
    if (el) {
        el.textContent = message;
        el.classList.remove('hidden');
    }
}

function hideError(elementId) {
    const el = document.getElementById(elementId);
    if (el) el.classList.add('hidden');
}

// Keyboard enter to submit
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const activeForm = document.querySelector('.auth-form:not(.hidden)');
        if (activeForm) {
            const btn = activeForm.querySelector('.pixel-btn');
            if (btn) btn.click();
        }
    }
});