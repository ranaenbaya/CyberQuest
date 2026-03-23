// CyberQuest — stages.js

async function loadStages() {
    try {
        const res = await fetch('/api/stages');
        const stages = await res.json();

        const hackingList = document.getElementById('hacking-stages');
        const defenceList = document.getElementById('defence-stages');

        const hacking = stages.filter(s => s.type === 'hacking').sort((a,b) => a.order - b.order);
        const defence = stages.filter(s => s.type === 'defence').sort((a,b) => a.order - b.order);

        hacking.forEach(s => hackingList.appendChild(createStageCard(s)));
        defence.forEach(s => defenceList.appendChild(createStageCard(s)));
    } catch (e) {
        console.error('Failed to load stages:', e);
    }
}

function createStageCard(stage) {
    const card = document.createElement('div');
    const typeClass = stage.type === 'hacking' ? 'hacking-card' : 'defence-card';
    const stateClass = stage.completed ? 'completed' : stage.unlocked ? 'unlocked' : 'locked';

    let statusIcon, statusLabel;
    if (stage.completed) { statusIcon = '✅'; statusLabel = 'COMPLETED'; }
    else if (stage.unlocked) { statusIcon = '🔓'; statusLabel = 'PLAY'; }
    else { statusIcon = '🔒'; statusLabel = 'LOCKED'; }

    card.className = `stage-card pixel-card ${typeClass} ${stateClass}`;
    card.innerHTML = `
        <div class="stage-card-header">
            <div class="stage-number">STAGE ${stage.order}</div>
            <div class="stage-status">${statusIcon}</div>
        </div>
        <div class="stage-card-title">${stage.title}</div>
        <div class="stage-card-desc">${stage.description}</div>
        <div class="stage-card-footer">
            <div class="stage-enter-btn">▶ ${statusLabel}</div>
            ${stage.completed ? `<div class="completed-score">BEST: ${stage.score || '??'}%</div>` : ''}
        </div>
    `;

    if (stage.unlocked) {
        card.addEventListener('click', () => {
            window.location.href = `/lesson/${stage.id}`;
        });
    }

    return card;
}

document.addEventListener('DOMContentLoaded', loadStages);
