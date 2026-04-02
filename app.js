// PSC PrepMaster - Main Application Logic
(function() {
    'use strict';

    // ===== STATE =====
    const state = {
        currentView: 'dashboard',
        currentChapter: null,
        currentTest: null,
        testInProgress: false,
        testAnswers: {},
        testTimeLeft: 0,
        testTimer: null,
        chapterTabs: {},
        progress: JSON.parse(localStorage.getItem('psc_progress') || '{}')
    };

    // ===== DOM =====
    const mainContent = document.getElementById('main-content');
    const sidebarNav = document.getElementById('sidebar-nav');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const toast = document.getElementById('toast');

    // ===== PUBLIC API (Expose Early) =====
    window.PSC = {
        openChapter, startTest, submitTest, selectAnswer,
        reviewTest, goBack, setTab, showToast, toggleAnswer
    };

    // ===== INIT =====
    function init() {
        if (!sidebarNav || !mainContent) {
            console.error('Critical UI elements missing! Sidebar/Main content not found.');
            return;
        }
        bindNavigation();
        bindSidebarToggle();
        renderDashboard();
        console.log('PSC PrepMaster Initialized Successfully.');
    }

    function bindSidebarToggle() {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }

    function bindNavigation() {
        sidebarNav.querySelectorAll('.nav-item').forEach(btn => {
            btn.addEventListener('click', () => {
                if (state.testInProgress) {
                    // Safety check removed to ensure compatibility/reliability in all environments
                    clearInterval(state.testTimer);
                    state.testInProgress = false;
                }
                sidebarNav.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const view = btn.dataset.view;
                if (view === 'chapter') {
                    state.currentChapter = parseInt(btn.dataset.chapter);
                    renderChapter(state.currentChapter);
                } else if (view === 'dashboard') {
                    renderDashboard();
                } else if (view === 'all-tests') {
                    renderAllTests();
                } else if (view === 'progress') {
                    renderProgress();
                }
                sidebar.classList.add('collapsed');
            });
        });
    }

    // ===== DASHBOARD =====
    function renderDashboard() {
        state.currentView = 'dashboard';
        const totalTests = MOCK_TESTS.length;
        const completedTests = Object.keys(state.progress).filter(k => k.startsWith('test_')).length;
        const totalQ = MOCK_TESTS.reduce((s, t) => s + t.questions.length, 0);

        mainContent.innerHTML = `
        <div class="dashboard">
            <div class="dashboard-hero">
                <h1>🎯 PSC Deputy Manager (IT) Prep</h1>
                <p class="hero-sub">Complete Study Material & Mock Test System</p>
                <div class="hero-stats">
                    <div class="stat-card">
                        <div class="stat-number">8</div>
                        <div class="stat-label">Chapters</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${totalQ}</div>
                        <div class="stat-label">MCQs</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${totalTests}</div>
                        <div class="stat-label">Mock Tests</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${completedTests}</div>
                        <div class="stat-label">Completed</div>
                    </div>
                </div>
            </div>
            <h2 class="section-title">📚 Chapters</h2>
            <div class="chapter-grid">
                ${CHAPTERS.map((ch, i) => `
                <div class="chapter-card" data-chapter="${i}" style="--accent:${ch.color}">
                    <div class="chapter-card-header">
                        <span class="chapter-icon">${ch.icon}</span>
                        <span class="chapter-marks">${ch.marks} marks</span>
                    </div>
                    <h3 class="chapter-title">${ch.title}</h3>
                    <p class="chapter-topics">${ch.topics}</p>
                    <div class="chapter-card-footer">
                        <button type="button" class="btn btn-primary btn-sm" onclick="window.PSC.openChapter(${i})">Study Now →</button>
                        <span class="test-count">${MOCK_TESTS.filter(t=>t.chapterIndex===i).length} Tests</span>
                    </div>
                </div>`).join('')}
            </div>
        </div>`;
    }

    // ===== CHAPTER VIEW =====
    function renderChapter(idx) {
        state.currentView = 'chapter';
        state.currentChapter = idx;
        const ch = CHAPTERS[idx];
        const activeTab = state.chapterTabs[idx] || 'overview';
        const chTests = MOCK_TESTS.filter(t => t.chapterIndex === idx);

        mainContent.innerHTML = `
        <div class="chapter-view">
            <div class="chapter-header" style="--accent:${ch.color}">
                <div class="chapter-header-top">
                    <button class="btn btn-ghost" onclick="window.PSC.goBack()">← Back</button>
                    <span class="chapter-badge">${ch.marks} Marks</span>
                </div>
                <h1>${ch.icon} ${ch.title}</h1>
                <p>${ch.topics}</p>
            </div>
            <div class="chapter-tabs">
                <button class="tab-btn ${activeTab==='overview'?'active':''}" onclick="window.PSC.setTab(${idx},'overview')">📋 Overview</button>
                <button class="tab-btn ${activeTab==='theory'?'active':''}" onclick="window.PSC.setTab(${idx},'theory')">📖 Theory</button>
                <button class="tab-btn ${activeTab==='formulas'?'active':''}" onclick="window.PSC.setTab(${idx},'formulas')">📐 Formulas</button>
                <button class="tab-btn ${activeTab==='diagrams'?'active':''}" onclick="window.PSC.setTab(${idx},'diagrams')">📊 Diagrams</button>
                <button class="tab-btn ${activeTab==='examples'?'active':''}" onclick="window.PSC.setTab(${idx},'examples')">💡 Examples</button>
                <button class="tab-btn ${activeTab==='practice'?'active':''}" onclick="window.PSC.setTab(${idx},'practice')">✏️ Practice</button>
                <button class="tab-btn ${activeTab==='tests'?'active':''}" onclick="window.PSC.setTab(${idx},'tests')">📝 Tests</button>
                <button class="tab-btn ${activeTab==='tips'?'active':''}" onclick="window.PSC.setTab(${idx},'tips')">🎯 Tips</button>
            </div>
            <div class="chapter-content" id="chapter-tab-content">
                ${renderTabContent(ch, activeTab, chTests)}
            </div>
        </div>`;
    }

    function renderTabContent(ch, tab, chTests) {
        switch(tab) {
            case 'overview': return renderOverview(ch);
            case 'theory': return ch.theory;
            case 'formulas': return ch.formulas;
            case 'diagrams': return ch.diagrams;
            case 'examples': return renderExamples(ch);
            case 'practice': return renderPractice(ch);
            case 'tests': return renderChapterTests(chTests);
            case 'tips': return renderTips(ch);
            default: return '';
        }
    }

    function renderOverview(ch) {
        return `
        <div class="overview-section">
            <div class="info-card">
                <h3>📌 Importance</h3>
                <p>${ch.overview.importance}</p>
            </div>
            <div class="info-card">
                <h3>📊 Weightage</h3>
                <p class="weightage-text">${ch.overview.weightage}</p>
            </div>
            <div class="info-card">
                <h3>🎯 Key Focus Areas</h3>
                <ul>${ch.overview.focusAreas.map(f=>`<li>${f}</li>`).join('')}</ul>
            </div>
        </div>`;
    }

    function renderExamples(ch) {
        return `<h3><span class="section-icon">💡</span> Solved Examples</h3>
        <div class="examples-list">
            ${ch.examples.map((ex, i) => `
            <div class="example-card">
                <div class="example-header" onclick="this.parentElement.classList.toggle('open')">
                    <span class="example-num">Example ${i+1}</span>
                    <span class="example-title">${ex.title}</span>
                    <span class="example-toggle">▼</span>
                </div>
                <div class="example-body">
                    <div class="question-block"><strong>Q:</strong> ${ex.question}</div>
                    <div class="solution-block"><strong>Solution:</strong><pre>${ex.solution}</pre></div>
                </div>
            </div>`).join('')}
        </div>`;
    }

    function renderPractice(ch) {
        // Support both old format (string[]) and new format ({question, answer}[])
        const questions = ch.practiceQuestions;
        const hasAnswers = questions.length > 0 && typeof questions[0] === 'object';

        return `<h3><span class="section-icon">✏️</span> Practice Questions</h3>
        <p class="practice-subtitle">Click on any question to reveal the answer</p>
        <div class="practice-list">
            ${questions.map((item, i) => {
                const qText = hasAnswers ? item.question : item;
                const aText = hasAnswers ? item.answer : null;
                return `
                <div class="practice-item" id="pq-${i}">
                    <div class="practice-question-row" onclick="window.PSC.toggleAnswer(${i})">
                        <span class="practice-num">Q${i+1}.</span>
                        <span class="practice-text">${qText}</span>
                        <span class="practice-toggle-icon">${aText ? '▶' : ''}</span>
                    </div>
                    ${aText ? `
                    <div class="practice-answer" id="pa-${i}">
                        <div class="practice-answer-label">📝 Answer:</div>
                        <div class="practice-answer-content">${aText}</div>
                    </div>` : ''}
                </div>`;
            }).join('')}
        </div>`;
    }

    function toggleAnswer(idx) {
        const item = document.getElementById('pq-' + idx);
        if (item) item.classList.toggle('open');
    }

    function renderChapterTests(tests) {
        return `<h3><span class="section-icon">📝</span> Chapter Mock Tests</h3>
        <div class="test-list">
            ${tests.map(t => {
                const result = state.progress['test_' + t.id];
                return `
                <div class="test-card ${result ? 'completed' : ''}">
                    <div class="test-info">
                        <h4>${t.title}</h4>
                        <p>${t.questions.length} Questions · ${t.duration} min</p>
                        ${result ? `<p class="test-score">Score: ${result.score}/${result.total} (${Math.round(result.score/result.total*100)}%)</p>` : ''}
                    </div>
                    <button class="btn btn-primary" onclick="window.PSC.startTest(${t.id})">${result ? 'Retake' : 'Start'} Test</button>
                </div>`;
            }).join('')}
        </div>`;
    }

    function renderTips(ch) {
        return `
        <div class="tips-section">
            <div class="info-card tips-card">
                <h3>🎯 Exam Tips</h3>
                <ul>${ch.examTips.map(t=>`<li>${t}</li>`).join('')}</ul>
            </div>
            <div class="info-card mistakes-card">
                <h3>⚠️ Common Mistakes</h3>
                <ul>${ch.commonMistakes.map(m=>`<li>${m}</li>`).join('')}</ul>
            </div>
            <div class="info-card memory-card">
                <h3>🧠 Memory Tricks</h3>
                <ul>${ch.memoryTricks.map(m=>`<li>${m}</li>`).join('')}</ul>
            </div>
        </div>`;
    }

    // ===== ALL TESTS VIEW =====
    function renderAllTests() {
        state.currentView = 'all-tests';
        const byChapter = CHAPTERS.map((ch, i) => ({
            chapter: ch,
            tests: MOCK_TESTS.filter(t => t.chapterIndex === i)
        }));

        mainContent.innerHTML = `
        <div class="all-tests-view">
            <h1>📝 All Mock Tests</h1>
            <p class="view-desc">${MOCK_TESTS.length} tests · ${MOCK_TESTS.reduce((s,t)=>s+t.questions.length,0)} total MCQs</p>
            ${byChapter.map(({chapter, tests}) => `
            <div class="test-section">
                <h2>${chapter.icon} ${chapter.title}</h2>
                <div class="test-list">
                    ${tests.map(t => {
                        const result = state.progress['test_' + t.id];
                        return `
                        <div class="test-card ${result?'completed':''}">
                            <div class="test-info">
                                <h4>${t.title}</h4>
                                <p>${t.questions.length} Qs · ${t.duration} min</p>
                                ${result?`<p class="test-score">${result.score}/${result.total} (${Math.round(result.score/result.total*100)}%)</p>`:''}
                            </div>
                            <button class="btn btn-primary btn-sm" onclick="window.PSC.startTest(${t.id})">${result?'Retake':'Start'}</button>
                        </div>`;
                    }).join('')}
                </div>
            </div>`).join('')}
        </div>`;
    }

    // ===== TEST ENGINE =====
    function startTest(testId) {
        const test = MOCK_TESTS[testId];
        if (!test) return;
        state.currentTest = test;
        state.testAnswers = {};
        state.testInProgress = true;
        state.testTimeLeft = test.duration * 60;
        state.currentView = 'test';

        renderTestUI();
        startTimer();
    }

    function renderTestUI() {
        const test = state.currentTest;
        const answered = Object.keys(state.testAnswers).length;
        const total = test.questions.length;

        mainContent.innerHTML = `
        <div class="test-view">
            <div class="test-header-bar">
                <div class="test-header-left">
                    <h2>${test.title}</h2>
                    <span class="test-progress-text">${answered}/${total} answered</span>
                </div>
                <div class="test-header-right">
                    <div class="test-timer" id="test-timer">${formatTime(state.testTimeLeft)}</div>
                </div>
            </div>
            <div class="test-progress-track">
                <div class="test-progress-fill" style="width:${(answered/total*100)}%"></div>
            </div>
            <div class="test-body">
                <div class="test-questions" id="test-questions">
                    ${test.questions.map((q, i) => `
                    <div class="test-question-card" id="question-${i}">
                        <div class="tq-header">
                            <div class="tq-header-left">
                                <span class="tq-num">Q${i+1}</span>
                                <span class="tq-topic">${q.topic}</span>
                            </div>
                            <span class="tq-difficulty ${q.difficulty}">${q.difficulty}</span>
                        </div>
                        <p class="tq-text">${q.q}</p>
                        <div class="tq-options">
                            ${q.options.map((opt, j) => `
                            <div class="tq-option" id="opt-${i}-${j}" onclick="window.PSC.selectAnswer(${i},${j})">
                                <span class="tq-option-letter">${String.fromCharCode(65+j)}</span>
                                <span class="tq-option-text">${opt}</span>
                                <span class="tq-option-check"></span>
                            </div>`).join('')}
                        </div>
                    </div>`).join('')}
                    <div class="test-bottom-actions">
                        <button type="button" class="btn btn-accent btn-lg btn-submit-test" onclick="window.PSC.submitTest()">
                            ✅ Complete & Submit Test
                        </button>
                        <p class="test-bottom-note">Make sure to review all questions before submitting!</p>
                    </div>
                </div>
                <div class="test-sidebar-panel">
                    <div class="test-sidebar-sticky">
                        <div class="test-nav-card">
                            <h4>📋 Question Navigator</h4>
                            <div class="q-navigator" id="q-navigator">
                                ${test.questions.map((_,i) => `
                                <button class="q-nav-btn" id="qnav-${i}" onclick="document.getElementById('question-${i}').scrollIntoView({behavior:'smooth',block:'center'})">${i+1}</button>`).join('')}
                            </div>
                            <div class="test-legend">
                                <span class="legend-item"><span class="dot answered"></span> Answered</span>
                                <span class="legend-item"><span class="dot unanswered"></span> Unanswered</span>
                            </div>
                        </div>
                        <button type="button" class="btn btn-accent btn-block btn-submit-test" onclick="window.PSC.submitTest()">
                            ✅ Submit Test
                        </button>
                    </div>
                </div>
            </div>
        </div>`;
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    function selectAnswer(qIdx, optIdx) {
        const test = state.currentTest;
        // Remove previous selection
        test.questions[qIdx].options.forEach((_, j) => {
            document.getElementById(`opt-${qIdx}-${j}`).classList.remove('selected');
        });
        // Set new selection
        document.getElementById(`opt-${qIdx}-${optIdx}`).classList.add('selected');
        state.testAnswers[qIdx] = optIdx;
        // Update navigator
        document.getElementById(`qnav-${qIdx}`).classList.add('answered');
        // Update progress count
        const answered = Object.keys(state.testAnswers).length;
        const total = test.questions.length;
        const progressText = document.querySelector('.test-progress-text');
        if (progressText) progressText.textContent = `${answered}/${total} answered`;
        const progressFill = document.querySelector('.test-progress-fill');
        if (progressFill) progressFill.style.width = `${(answered/total*100)}%`;
    }

    function startTimer() {
        clearInterval(state.testTimer);
        state.testTimer = setInterval(() => {
            state.testTimeLeft--;
            const el = document.getElementById('test-timer');
            if (el) el.textContent = formatTime(state.testTimeLeft);
            if (state.testTimeLeft <= 0) {
                clearInterval(state.testTimer);
                submitTest(true);
            }
            if (state.testTimeLeft <= 300 && el) el.classList.add('warning');
            if (state.testTimeLeft <= 60 && el) { el.classList.remove('warning'); el.classList.add('danger'); }
        }, 1000);
    }

    function formatTime(s) {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
    }

    function submitTest(autoSubmit) {
        // Validation: Simplified logic for broad compatibility
        if (state.testInProgress === false && !autoSubmit) return;
        
        clearInterval(state.testTimer);
        state.testInProgress = false;

        const test = state.currentTest;
        if (!test) {
            console.error('No active test found during submission!');
            return;
        }

        let score = 0;
        test.questions.forEach((q, i) => {
            if (state.testAnswers[i] === q.correct) score++;
        });

        // Save result to local storage for persistence
        state.progress['test_' + test.id] = {
            score, total: test.questions.length,
            date: new Date().toISOString(),
            answers: {...state.testAnswers}
        };
        localStorage.setItem('psc_progress', JSON.stringify(state.progress));

        // Direct transition to the advanced review page
        reviewTest(test.id);
        
        // Visual confirmation
        showToast('Test evaluation complete!');
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    function renderTestResult(test, score) {
        const total = test.questions.length;
        const pct = Math.round(score / total * 100);
        const wrong = total - score - (total - Object.keys(state.testAnswers).length);
        const skipped = total - Object.keys(state.testAnswers).length;
        const grade = pct >= 80 ? '🏆 Excellent!' : pct >= 60 ? '👍 Good Job' : pct >= 40 ? '📖 Needs Practice' : '⚠️ Review Required';
        const gradeColor = pct >= 80 ? 'var(--accent-emerald)' : pct >= 60 ? 'var(--primary-light)' : pct >= 40 ? 'var(--accent-amber)' : 'var(--accent-rose)';

        mainContent.innerHTML = `
        <div class="test-result">
            <div class="result-card">
                <h1>${grade}</h1>
                <div class="result-score-ring" style="--pct:${pct};--ring-color:${gradeColor}">
                    <div class="result-score-inner">
                        <span class="result-pct">${pct}%</span>
                        <span class="result-fraction">${score}/${total}</span>
                    </div>
                </div>
                <div class="result-breakdown">
                    <div class="rb-item correct"><span class="rb-num">${score}</span><span class="rb-label">Correct</span></div>
                    <div class="rb-item wrong"><span class="rb-num">${wrong < 0 ? 0 : wrong}</span><span class="rb-label">Wrong</span></div>
                    <div class="rb-item skipped"><span class="rb-num">${skipped}</span><span class="rb-label">Skipped</span></div>
                </div>
                <div class="result-actions">
                    <button class="btn btn-primary btn-lg" onclick="window.PSC.reviewTest(${test.id})">📋 Review Answers</button>
                    <button class="btn btn-ghost btn-lg" onclick="window.PSC.startTest(${test.id})">🔄 Retake Test</button>
                    <button class="btn btn-ghost" onclick="window.PSC.goBack()">← Back to Chapter</button>
                </div>
            </div>
        </div>`;
    }

    function reviewTest(testId) {
        const test = MOCK_TESTS[testId];
        const result = state.progress['test_' + testId];
        if (!test || !result) return;
        state.currentView = 'test-review';

        const pct = Math.round(result.score / result.total * 100);
        const skipped = result.total - Object.keys(result.answers).length;
        const wrong = result.total - result.score - skipped;
        const grade = pct >= 80 ? '🏆 Excellent!' : pct >= 60 ? '👍 Good Job' : pct >= 40 ? '📖 Needs Practice' : '⚠️ Review Required';
        const gradeColor = pct >= 80 ? 'var(--accent-emerald)' : pct >= 60 ? 'var(--primary-light)' : pct >= 40 ? 'var(--accent-amber)' : 'var(--accent-rose)';

        mainContent.innerHTML = `
        <div class="test-review">
            <div class="review-header-bar">
                <button class="btn btn-ghost" onclick="window.PSC.goBack()">← Back</button>
                <div class="review-header-info">
                    <h2>${test.title} — Analysis</h2>
                    <p>Submitted on ${new Date(result.date).toLocaleString()}</p>
                </div>
            </div>

            <div class="review-summary-card">
                <div class="r-summary-left">
                    <div class="r-score-circle" style="--pct:${pct};--color:${gradeColor}">
                        <span class="r-score-val">${pct}%</span>
                        <span class="r-score-label">Final Score</span>
                    </div>
                </div>
                <div class="r-summary-right">
                    <h1 style="color:${gradeColor}">${grade}</h1>
                    <div class="r-stat-grid">
                        <div class="r-stat-box">
                            <span class="r-stat-num">${result.score}</span>
                            <span class="r-stat-label">Correct</span>
                        </div>
                        <div class="r-stat-box">
                            <span class="r-stat-num">${wrong}</span>
                            <span class="r-stat-label">Incorrect</span>
                        </div>
                        <div class="r-stat-box">
                            <span class="r-stat-num">${skipped}</span>
                            <span class="r-stat-label">Skipped</span>
                        </div>
                    </div>
                    <div class="r-actions">
                        <button class="btn btn-primary" onclick="window.PSC.startTest(${testId})">🔄 Retake Test</button>
                    </div>
                </div>
            </div>

            <div class="review-questions">
                <h3 class="section-title">Detailed Question Review</h3>
                ${test.questions.map((q, i) => {
                    const userAns = result.answers[i];
                    const isCorrect = userAns === q.correct;
                    const isUnanswered = userAns === undefined;
                    return `
                    <div class="review-question-card ${isCorrect ? 'correct' : isUnanswered ? 'skipped' : 'wrong'}" id="rq-${i}">
                        <div class="rq-header">
                            <div class="rq-header-left">
                                <span class="rq-num">Question ${i + 1}</span>
                                <span class="rq-topic">${q.topic}</span>
                            </div>
                            <div class="rq-header-right">
                                <span class="rq-status">
                                    ${isCorrect ? '✅ Well Done!' : isUnanswered ? '⬜ Not Answered' : '❌ Incorrect'}
                                </span>
                                <span class="tq-difficulty ${q.difficulty}">${q.difficulty}</span>
                            </div>
                        </div>
                        <p class="rq-text">${q.q}</p>
                        <div class="rq-options">
                            ${q.options.map((opt, j) => {
                                let cls = '';
                                let mark = '';
                                if (j === q.correct) {
                                    cls = 'correct-answer';
                                    mark = '<span class="rq-mark-badge pos">Correct Answer</span>';
                                } else if (j === userAns) {
                                    cls = 'wrong-answer';
                                    mark = '<span class="rq-mark-badge neg">Your Choice</span>';
                                }
                                return `
                                <div class="rq-option ${cls}">
                                    <span class="tq-option-letter">${String.fromCharCode(65 + j)}</span>
                                    <span class="tq-option-text">${opt}</span>
                                    ${mark}
                                </div>`;
                            }).join('')}
                        </div>
                        <div class="rq-explanation">
                            <div class="rq-exp-header">
                                <span class="rq-exp-icon">💡</span>
                                <h4>Educational Explanation</h4>
                            </div>
                            <div class="rq-exp-body">
                                ${q.explanation}
                            </div>
                        </div>
                    </div>`;
                }).join('')}
            </div>
        </div>`;
    }

    // ===== PROGRESS VIEW =====
    function renderProgress() {
        state.currentView = 'progress';
        const testResults = Object.entries(state.progress)
            .filter(([k]) => k.startsWith('test_'))
            .map(([k, v]) => {
                const id = parseInt(k.replace('test_', ''));
                return { ...v, test: MOCK_TESTS[id], id };
            })
            .filter(r => r.test)
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        const totalTests = MOCK_TESTS.length;
        const completed = testResults.length;
        const avgScore = completed > 0 ? Math.round(testResults.reduce((s, r) => s + r.score / r.total * 100, 0) / completed) : 0;

        // Per-chapter analysis
        const chapterStats = CHAPTERS.map((ch, i) => {
            const chResults = testResults.filter(r => r.test.chapterIndex === i);
            const chTests = MOCK_TESTS.filter(t => t.chapterIndex === i).length;
            const avg = chResults.length > 0
                ? Math.round(chResults.reduce((s,r) => s + r.score/r.total*100, 0) / chResults.length)
                : 0;
            return { chapter: ch, completed: chResults.length, total: chTests, avg };
        });

        mainContent.innerHTML = `
        <div class="progress-view">
            <h1>📊 My Progress</h1>
            <div class="progress-stats-row">
                <div class="stat-card"><div class="stat-number">${completed}/${totalTests}</div><div class="stat-label">Tests Done</div></div>
                <div class="stat-card"><div class="stat-number">${avgScore}%</div><div class="stat-label">Avg Score</div></div>
                <div class="stat-card"><div class="stat-number">${Math.round(completed/totalTests*100)}%</div><div class="stat-label">Completion</div></div>
            </div>
            <h2>Chapter-wise Performance</h2>
            <div class="chapter-progress-grid">
                ${chapterStats.map(cs => `
                <div class="ch-progress-card">
                    <h4>${cs.chapter.icon} ${cs.chapter.title}</h4>
                    <div class="ch-progress-bar"><div class="ch-progress-fill" style="width:${cs.avg}%;background:${cs.chapter.color}"></div></div>
                    <p>${cs.completed}/${cs.total} tests · ${cs.avg}% avg</p>
                </div>`).join('')}
            </div>
            <h2>Recent Results</h2>
            ${testResults.length === 0 ? '<p class="empty-state">No tests completed yet. Start a mock test to track your progress!</p>' : `
            <div class="results-list">
                ${testResults.slice(0, 20).map(r => `
                <div class="result-item">
                    <div class="result-info">
                        <h4>${r.test.title}</h4>
                        <p>${new Date(r.date).toLocaleDateString()}</p>
                    </div>
                    <div class="result-score-mini ${r.score/r.total>=0.6?'pass':'fail'}">${Math.round(r.score/r.total*100)}%</div>
                    <button class="btn btn-ghost btn-sm" onclick="window.PSC.reviewTest(${r.id})">Review</button>
                </div>`).join('')}
            </div>`}
            <div class="progress-actions">
                <button type="button" class="btn btn-danger" onclick="localStorage.removeItem('psc_progress');location.reload();">🗑️ Reset Progress</button>
            </div>
        </div>`;
    }

    // ===== HELPERS =====
    function goBack() {
        if (state.currentView === 'test' || state.currentView === 'test-review') {
            if (state.currentChapter !== null) renderChapter(state.currentChapter);
            else renderAllTests();
        } else {
            renderDashboard();
        }
    }

    function setTab(chIdx, tab) {
        state.chapterTabs[chIdx] = tab;
        renderChapter(chIdx);
    }

    function openChapter(idx) {
        state.currentChapter = idx;
        sidebarNav.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        const navBtn = document.getElementById('nav-ch' + (idx + 1));
        if (navBtn) navBtn.classList.add('active');
        renderChapter(idx);
    }

    function showToast(msg) {
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
