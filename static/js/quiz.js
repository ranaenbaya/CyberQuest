// CyberQuest — quiz.js

let currentQuestion = 0;
let userAnswers = {};
let answered = false;

function updateQuizUI() {
    const q = quizData[currentQuestion];
    const total = quizData.length;

    document.getElementById('quiz-counter').textContent = `QUESTION ${currentQuestion + 1} / ${total}`;
    document.getElementById('quiz-progress-fill').style.width = `${((currentQuestion) / total) * 100}%`;
    document.getElementById('question-number').textContent = `Q${currentQuestion + 1}`;
    document.getElementById('question-text').textContent = q.question;

    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';

    ['A', 'B', 'C', 'D'].forEach(key => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `<span class="option-key">${key}</span><span>${q.options[key]}</span>`;
        btn.onclick = () => selectAnswer(key);
        btn.dataset.key = key;
        grid.appendChild(btn);
    });

    document.getElementById('answer-feedback').classList.add('hidden');
    document.getElementById('next-question-btn').classList.add('hidden');
    answered = false;
}

function selectAnswer(selectedKey) {
    if (answered) return;
    answered = true;
    userAnswers[currentQuestion] = selectedKey;

    const q = quizData[currentQuestion];
    const isCorrect = selectedKey === q.correct;
    const options = document.querySelectorAll('.option-btn');

    options.forEach(btn => {
        btn.disabled = true;
        const key = btn.dataset.key;
        if (key === q.correct) btn.classList.add('correct');
        else if (key === selectedKey && !isCorrect) btn.classList.add('wrong');
    });

    const feedback = document.getElementById('answer-feedback');
    feedback.className = `answer-feedback ${isCorrect ? 'correct-fb' : 'wrong-fb'}`;
    feedback.innerHTML = isCorrect
        ? `✅ <strong>Correct!</strong> ${q.explanation}`
        : `❌ <strong>Incorrect.</strong> The correct answer was <strong>${q.correct}: ${q.options[q.correct]}</strong>. ${q.explanation}`;
    feedback.classList.remove('hidden');

    const nextBtn = document.getElementById('next-question-btn');
    nextBtn.classList.remove('hidden');
    nextBtn.textContent = currentQuestion < quizData.length - 1 ? 'NEXT ▶' : 'SEE RESULTS ▶';
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        updateQuizUI();
    } else {
        submitQuiz();
    }
}

async function submitQuiz() {
    document.getElementById('quiz-screen').classList.add('hidden');

    try {
        const res = await fetch(`/api/quiz/submit/${stageId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answers: userAnswers })
        });
        const data = await res.json();
        showResults(data);
    } catch {
        showResults({
            score: 0, correct: 0, total: quizData.length,
            passed: false, results: []
        });
    }
}

function showResults(data) {
    const screen = document.getElementById('results-screen');
    screen.classList.remove('hidden');

    const passed = data.passed;
    const score  = data.score;

    document.getElementById('results-icon').textContent  = passed ? '🏆' : '💀';
    document.getElementById('results-title').textContent = passed ? 'STAGE COMPLETE!' : 'MISSION FAILED';
    document.getElementById('score-number').textContent  = `${score}%`;

    const scoreNum = document.getElementById('score-number');
    scoreNum.style.color = passed ? 'var(--green)' : score >= 60 ? 'var(--orange)' : 'var(--red)';

    document.getElementById('results-message').textContent = passed
        ? `Outstanding! You scored ${data.correct}/${data.total} and passed the stage. The next stage is now unlocked.`
        : `You scored ${data.correct}/${data.total}. You need 80% to pass. Review the lesson and try again!`;

    setTimeout(() => {
        const fill = document.getElementById('score-bar-fill');
        fill.style.width = `${score}%`;
        fill.style.background = passed ? 'var(--green)' : score >= 60 ? 'var(--orange)' : 'var(--red)';
        fill.style.boxShadow = passed ? '0 0 10px var(--green-glow)' : '0 0 10px var(--red-glow)';
    }, 100);

    const breakdown = document.getElementById('results-breakdown');
    breakdown.innerHTML = '';
    (data.results || []).forEach((r, i) => {
        const item = document.createElement('div');
        item.className = `breakdown-item ${r.is_correct ? 'correct-item' : 'wrong-item'}`;
        item.innerHTML = `
            <div class="breakdown-icon">${r.is_correct ? '✅' : '❌'}</div>
            <div>
                <div class="breakdown-q">Q${i+1}: ${r.question}</div>
                ${!r.is_correct ? `<div class="breakdown-exp">Correct: ${r.correct_option}</div>` : ''}
                <div class="breakdown-exp">${r.explanation}</div>
            </div>
        `;
        breakdown.appendChild(item);
    });

    if (passed) {
        document.getElementById('retry-btn').style.display = 'none';
        // Show next stage button if applicable
        // (would need next stage ID from server - simplified here)
    }
}

function retryQuiz() {
    currentQuestion = 0;
    userAnswers = {};
    answered = false;
    document.getElementById('results-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    updateQuizUI();
}

document.addEventListener('DOMContentLoaded', updateQuizUI);
