// DOM Elements
const mainTitle = document.getElementById('main-title');
const settingsSection = document.getElementById('settings-section');
const lotterySection = document.getElementById('lottery-section');
const sheetUrlInput = document.getElementById('sheet-url');
const sheetNameInput = document.getElementById('sheet-name');
const columnLetterInput = document.getElementById('column-letter');
const csvUrlInput = document.getElementById('csv-url-input');
const csvColumnLetterInput = document.getElementById('csv-column-letter');
const customListInput = document.getElementById('custom-list');
const prizesContainer = document.getElementById('prizes-container');
const addPrizeBtn = document.getElementById('add-prize-btn');
const clearPrizesBtn = document.getElementById('clear-prizes-btn');
const templateNameInput = document.getElementById('template-name-input');
const saveTemplateBtn = document.getElementById('save-template-btn');
const templateButtonsContainer = document.getElementById('template-buttons-container');
const themeSelector = document.getElementById('theme-selector');
const loadButton = document.getElementById('load-button');
const drawButton = document.getElementById('draw-button');
const exportCsvBtn = document.getElementById('export-csv-btn');
const statusMessage = document.getElementById('status-message');
const participantLabel = document.getElementById('participant-label');
const participantCountSpan = document.getElementById('participant-count');
const currentPrizeDisplay = document.getElementById('current-prize-display');
const winnerDisplay = document.getElementById('winner-display');
const winnersList = document.getElementById('winners-list');
const currentPrizeShort = document.getElementById('current-prize-short');
const currentPrizeProgress = document.getElementById('current-prize-progress');
const awardedProgress = document.getElementById('awarded-progress');
const prizeProgressList = document.getElementById('prize-progress-list');
const singleDrawCount = document.getElementById('single-draw-count');
const bonusOpenBtn = document.getElementById('bonus-open-btn');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const soundToggleBtn = document.getElementById('sound-toggle-btn');
const resetBtn = document.getElementById('reset-btn');
const tabCloudBtn = document.getElementById('tab-cloud');
const tabCustomBtn = document.getElementById('tab-custom');
const tabCsvBtn = document.getElementById('tab-csv');
const tabExcludeBtn = document.getElementById('tab-exclude');
const tabContentCloud = document.getElementById('tab-content-cloud');
const tabContentCustom = document.getElementById('tab-content-custom');
const tabContentCsv = document.getElementById('tab-content-csv');
const tabContentExclude = document.getElementById('tab-content-exclude');

// Title Tab Elements
const titleInput = document.getElementById('title-input');
const titleTemplateNameInput = document.getElementById('title-template-name-input');
const saveTitleTemplateBtn = document.getElementById('save-title-template-btn');
const titleTemplateButtonsContainer = document.getElementById('title-template-buttons-container');

// List Tab Elements
const listTemplateNameInput = document.getElementById('list-template-name-input');
const saveListTemplateBtn = document.getElementById('save-list-template-btn');
const listTemplateButtonsContainer = document.getElementById('list-template-buttons-container');

// Exclude Tab Elements
const excludeListInput = document.getElementById('exclude-list');
const excludeTemplateNameInput = document.getElementById('exclude-template-name-input');
const saveExcludeTemplateBtn = document.getElementById('save-exclude-template-btn');
const excludeTemplateButtonsContainer = document.getElementById('exclude-template-buttons-container');

// Environment Tabs
const tabModeBtn = document.getElementById('tab-mode');
const tabTitleBtn = document.getElementById('tab-title');
const tabPrizeBtn = document.getElementById('tab-prize');
const tabThemeBtn = document.getElementById('tab-theme');
const tabVisualBtn = document.getElementById('tab-visual');
const tabSoundBtn = document.getElementById('tab-sound');
const tabEffectBtn = document.getElementById('tab-effect');
const tabContentMode = document.getElementById('tab-content-mode');
const tabContentTitle = document.getElementById('tab-content-title');
const tabContentPrize = document.getElementById('tab-content-prize');
const tabContentTheme = document.getElementById('tab-content-theme');
const tabContentVisual = document.getElementById('tab-content-visual');
const tabContentSound = document.getElementById('tab-content-sound');
const tabContentEffect = document.getElementById('tab-content-effect');

// Visual Customization Elements
const logoImg = document.getElementById('logo-img');
const logoUpload = document.getElementById('logo-upload');
const bgUpload = document.getElementById('bg-upload');
const resetLogoBtn = document.getElementById('reset-logo-btn');
const resetBgBtn = document.getElementById('reset-bg-btn');
const appBgOverlay = document.getElementById('app-bg-overlay');

// Mode Settings Toggle
const simpleDrawToggle = document.getElementById('simple-draw-toggle');
const batchDrawToggle = document.getElementById('batch-draw-toggle');
const filterDuplicatesToggle = document.getElementById('filter-duplicates-toggle');
const sortWinnersToggle = document.getElementById('sort-winners-toggle');
const sortWinnersBtn = document.getElementById('sort-winners-btn');

// Batch Drawing Elements
const batchSizeInput = document.getElementById('batch-size-input');
const batchSettingsContainer = document.getElementById('batch-settings');

const rollingSound = document.getElementById('rolling-sound');
const winnerSound = document.getElementById('winner-sound');
const winnerEffectSelect = document.getElementById('winner-effect-select');

// Duplicates Modal Elements
const duplicatesModal = document.getElementById('duplicates-modal');
const duplicatesList = document.getElementById('duplicates-list');
const dupDeleteAllBtn = document.getElementById('dup-delete-all-btn');
const dupKeepOneBtn = document.getElementById('dup-keep-one-btn');
const dupCancelBtn = document.getElementById('dup-cancel-btn');

// Column Selection Modal Elements
const columnSelectionModal = document.getElementById('column-selection-modal');
const columnSelectionContainer = document.getElementById('column-selection-container');
const confirmColumnSelectionBtn = document.getElementById('confirm-column-selection-btn');
const cancelColumnSelectionBtn = document.getElementById('cancel-column-selection-btn');

// Recovery Modal Elements
const recoveryModal = document.getElementById('recovery-modal');
const resumeSessionBtn = document.getElementById('resume-session-btn');
const downloadSessionBtn = document.getElementById('download-session-btn');
const discardSessionBtn = document.getElementById('discard-session-btn');

// Bonus Prize Elements
const bonusModal = document.getElementById('bonus-modal');
const bonusPrizeName = document.getElementById('bonus-prize-name');
const bonusPrizeQuantity = document.getElementById('bonus-prize-quantity');
const bonusRemainingCount = document.getElementById('bonus-remaining-count');
const confirmBonusBtn = document.getElementById('confirm-bonus-btn');
const cancelBonusBtn = document.getElementById('cancel-bonus-btn');

// State
let participants = [];
let pendingParticipants = []; 
let pendingLoadedData = null; // Temp storage for loaded data awaiting column selection
let prizes = [];
let currentPrizeIndex = 0;
let rollingInterval = null;
let activeDataSource = 'custom';
let isSoundOn = true;
const themes = [ { id: 'candy', name: '糖果王國', colors: ['#ff69b4', '#87ceeb'] }, { id: 'forest', name: '森林夥伴', colors: ['#228b22', '#ff7f50'] }, { id: 'izakaya', name: '居酒屋', colors: ['#e53e3e', '#ffab00'] }, { id: 'sakura', name: '櫻花', colors: ['#db2777', '#fdf2f8'] }, { id: 'midnight', name: '午夜', colors: ['#38bdf8', '#0f172a'] } ];

function init() {
    // Main Actions
    loadButton.addEventListener('click', handleLoadData);
    drawButton.addEventListener('click', handleDrawWinner);
    resetBtn.addEventListener('click', () => {
        if (confirm('您確定要重置活動嗎？這將會清除目前的進度與所有名單。')) {
            resetApp();
        }
    });
    
    // Modals & Links
    exportCsvBtn.addEventListener('click', exportResultsToCsv);

    // List Setup Tabs
    tabCustomBtn.addEventListener('click', () => switchTab('custom'));
    tabCloudBtn.addEventListener('click', () => switchTab('cloud'));
    tabCsvBtn.addEventListener('click', () => switchTab('csv'));
    tabExcludeBtn.addEventListener('click', () => switchTab('exclude'));
    saveListTemplateBtn.addEventListener('click', saveListTemplate);
    saveExcludeTemplateBtn.addEventListener('click', saveExcludeTemplate);
    
    // Environment Tabs
    tabModeBtn.addEventListener('click', () => switchEnvTab('mode'));
    tabTitleBtn.addEventListener('click', () => switchEnvTab('title'));
    tabPrizeBtn.addEventListener('click', () => switchEnvTab('prize'));
    tabThemeBtn.addEventListener('click', () => switchEnvTab('theme'));
    tabVisualBtn.addEventListener('click', () => switchEnvTab('visual'));
    tabSoundBtn.addEventListener('click', () => switchEnvTab('sound'));
    tabEffectBtn.addEventListener('click', () => switchEnvTab('effect'));

    // Visual Customization Actions
    logoUpload.addEventListener('change', (e) => handleImageUpload(e, 'customLogo'));
    bgUpload.addEventListener('change', (e) => handleImageUpload(e, 'customBg'));
    resetLogoBtn.addEventListener('click', () => { 
        localStorage.removeItem('customLogo'); 
        logoUpload.value = "";
        loadVisuals(); 
    });
    resetBgBtn.addEventListener('click', () => { 
        localStorage.removeItem('customBg'); 
        bgUpload.value = "";
        loadVisuals(); 
    });

    // Title Setup
    titleInput.addEventListener('input', (e) => {
        const newTitle = e.target.value.trim();
        mainTitle.textContent = newTitle || 'ㄚ亮笑長的抽抽樂';
        document.title = newTitle || 'ㄚ亮笑長的抽抽樂';
    });
    saveTitleTemplateBtn.addEventListener('click', saveTitleTemplate);

    // Prize Setup
    addPrizeBtn.addEventListener('click', () => addPrizeRow());
    saveTemplateBtn.addEventListener('click', savePrizeTemplate);
    clearPrizesBtn.addEventListener('click', clearPrizes);

    // Bonus Prize Actions (Hidden trigger on participant count)
    const openBonusModal = () => {
        bonusRemainingCount.textContent = participants.length;
        bonusPrizeName.value = '';
        bonusPrizeQuantity.value = 1;
        bonusModal.classList.remove('hidden');
    };
    participantCountSpan.addEventListener('click', openBonusModal);
    bonusOpenBtn.addEventListener('click', openBonusModal);
    cancelBonusBtn.addEventListener('click', () => {
        bonusModal.classList.add('hidden');
    });
    confirmBonusBtn.addEventListener('click', handleAddBonusPrize);

    // Other settings
    soundToggleBtn.addEventListener('click', toggleSound);
    fullscreenBtn.addEventListener('click', () => {
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen();
    });
    document.addEventListener('keydown', (event) => {
        const target = event.target;
        if (event.code !== 'Space' || !target || target.closest('button, input, textarea, select, [contenteditable="true"]')) return;
        if (lotterySection.classList.contains('hidden') || !bonusModal.classList.contains('hidden') || !drawButton.offsetParent) return;
        event.preventDefault();
        if (!drawButton.disabled) drawButton.click();
    });
    simpleDrawToggle.addEventListener('change', handleSimpleDrawToggle);
    
    // Batch drawing toggle
    batchDrawToggle.addEventListener('change', (e) => {
        const isEnabled = e.target.checked;
        batchSettingsContainer.classList.toggle('hidden', !isEnabled);
        singleDrawCount.classList.toggle('hidden', isEnabled);
        localStorage.setItem('batchDrawEnabled', isEnabled);
    });

    filterDuplicatesToggle.addEventListener('change', (e) => {
        localStorage.setItem('filterDuplicates', e.target.checked);
    });

    // Sort Winners Toggle
    sortWinnersToggle.addEventListener('change', (e) => {
        localStorage.setItem('sortWinnersEnabled', e.target.checked);
        updateWinnersList(true); // Refresh list to show/hide button
    });
    
    // Manual Sort Button
    sortWinnersBtn.addEventListener('click', () => {
        updateWinnersList(true); // Force sort
    });


    // Duplicate Modal Actions
    dupDeleteAllBtn.addEventListener('click', () => handleDuplicateAction('deleteAll'));
    dupKeepOneBtn.addEventListener('click', () => handleDuplicateAction('keepOne'));
    dupCancelBtn.addEventListener('click', () => {
        duplicatesModal.classList.add('hidden');
        loadButton.disabled = false;
        updateStatus('載入已取消。');
    });

    // Column Selection Modal Actions
    confirmColumnSelectionBtn.addEventListener('click', handleColumnSelectionConfirmed);
    cancelColumnSelectionBtn.addEventListener('click', () => {
        columnSelectionModal.classList.add('hidden');
        loadButton.disabled = false;
        updateStatus('載入已取消。');
        pendingLoadedData = null;
    });

    // Recovery Modal Actions
    resumeSessionBtn.addEventListener('click', loadSession);
    downloadSessionBtn.addEventListener('click', exportCurrentSessionToCsv);
    discardSessionBtn.addEventListener('click', clearSession);

    // Initial Load
    addPrizeRow('三獎', 3);
    addPrizeRow('二獎', 2);
    addPrizeRow('頭獎', 1);

    setupThemes();
    loadTheme();
    loadVisuals();
    renderSavedTemplates();
    renderSavedTitleTemplates();
    renderSavedListTemplates();
    renderSavedExcludeTemplates();
    switchTab(activeDataSource);
    switchEnvTab('mode');
    handleUrlParams();

    // Restore mode settings
    const savedSimpleMode = localStorage.getItem('simpleDrawMode') === 'true';
    simpleDrawToggle.checked = savedSimpleMode;
    if (savedSimpleMode) tabPrizeBtn.classList.add('hidden');

    const savedBatchEnabled = localStorage.getItem('batchDrawEnabled') === 'true';
    batchDrawToggle.checked = savedBatchEnabled;
    batchSettingsContainer.classList.toggle('hidden', !savedBatchEnabled);
    singleDrawCount.classList.toggle('hidden', savedBatchEnabled);

    const savedFilter = localStorage.getItem('filterDuplicates') === 'true';
    filterDuplicatesToggle.checked = savedFilter;

    const savedSort = localStorage.getItem('sortWinnersEnabled') === 'true';
    sortWinnersToggle.checked = savedSort;

    // Check for existing session
    const savedSession = localStorage.getItem('lottery_session');
    if (savedSession) {
        recoveryModal.classList.remove('hidden');
    }

    window.addEventListener('resize', () => { if (document.getElementById('finished-prize-name')) { adjustPrizeNameFontSize(); } });
};

function handleAddBonusPrize() {
    const name = bonusPrizeName.value.trim();
    const quantity = parseInt(bonusPrizeQuantity.value, 10);

    if (!name) {
        alert('請輸入獎項名稱！');
        return;
    }
    if (isNaN(quantity) || quantity <= 0) {
        alert('請輸入有效的數量！');
        return;
    }
    if (quantity > participants.length) {
        alert(`剩餘人數不足！目前僅剩 ${participants.length} 人。`);
        return;
    }

    const newPrize = { name, quantity, winners: [] };
    prizes.push(newPrize);
    
    // Check if we need to reset the completed state
    // If the button says "Reset" or "Finished", we need to wake it up
    // updatePrizeDisplay will handle finding the next available prize (which is this new one)
    updatePrizeDisplay();
    saveSession();
    bonusModal.classList.add('hidden');
    
    // Explicitly update status to show something happened
    updateStatus(`已加碼：${name} (${quantity}名)`);
}

// --- VISUAL CUSTOMIZATION FUNCTIONS ---
function handleImageUpload(event, storageKey) {
    const file = event.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert('圖片太大囉！請上傳小於 2MB 的圖片。'); return; }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        localStorage.setItem(storageKey, e.target.result);
        loadVisuals();
    };
    reader.readAsDataURL(file);
}

function loadVisuals() {
    const customLogo = localStorage.getItem('customLogo');
    if (customLogo) {
        logoImg.src = customLogo;
        logoImg.style.visibility = 'visible';
    } else {
        logoImg.src = "Logo.png";
    }

    const customBg = localStorage.getItem('customBg');
    if (customBg) {
        appBgOverlay.style.backgroundImage = `url(${customBg})`;
        appBgOverlay.style.opacity = '1';
    } else {
        appBgOverlay.style.backgroundImage = 'none';
        appBgOverlay.style.opacity = '0';
    }
}

// --- SESSION RECOVERY FUNCTIONS ---
function saveSession() {
    const sessionData = {
        participants,
        prizes,
        currentPrizeIndex,
        simpleDrawMode: simpleDrawToggle.checked,
        batchDrawEnabled: batchDrawToggle.checked,
        sortWinnersEnabled: sortWinnersToggle.checked,
        title: mainTitle.textContent
    };
    localStorage.setItem('lottery_session', JSON.stringify(sessionData));
}

function loadSession() {
    const savedSession = localStorage.getItem('lottery_session');
    if (!savedSession) return;
    try {
        const data = JSON.parse(savedSession);
        participants = data.participants;
        prizes = data.prizes;
        currentPrizeIndex = data.currentPrizeIndex;
        simpleDrawToggle.checked = data.simpleDrawMode;
        batchDrawToggle.checked = data.batchDrawEnabled || false;
        batchSettingsContainer.classList.toggle('hidden', !batchDrawToggle.checked);
        singleDrawCount.classList.toggle('hidden', batchDrawToggle.checked);
        
        // Restore sort setting from session if available, else fallback to localStorage
        if (data.sortWinnersEnabled !== undefined) {
            sortWinnersToggle.checked = data.sortWinnersEnabled;
        } else {
            sortWinnersToggle.checked = localStorage.getItem('sortWinnersEnabled') === 'true';
        }

        mainTitle.textContent = data.title;
        document.title = data.title;
        
        recoveryModal.classList.add('hidden');
        switchToLotteryView();
        // Force sort on session load if enabled to ensure consistent state
        updateWinnersList(sortWinnersToggle.checked); 
        updateStatus('進度已恢復。');
    } catch (e) {
        console.error("恢復進度失敗:", e);
        clearSession();
    }
}

function clearSession() {
    localStorage.removeItem('lottery_session');
    recoveryModal.classList.add('hidden');
}

function exportCurrentSessionToCsv() {
    const savedSession = localStorage.getItem('lottery_session');
    if (!savedSession) return;
    
    const data = JSON.parse(savedSession);
    const sParticipants = data.participants || [];
    const sPrizes = data.prizes || [];
    const sTitle = data.title || "抽獎活動";
    
    let totalWinnersCount = 0;
    sPrizes.forEach(p => totalWinnersCount += (p.winners ? p.winners.length : 0));
    const totalPeople = sParticipants.length + totalWinnersCount;

    let csvContent = '\uFEFF"抽獎進度報表","' + sTitle + '"\n';
    csvContent += '"摸彩總人數",' + totalPeople + '\n';
    csvContent += '"已中獎人數",' + totalWinnersCount + '\n';
    csvContent += '"未中獎人數",' + sParticipants.length + '\n\n';

    csvContent += '"獎項","得獎人姓名","是否已領獎"\n';
    sPrizes.forEach(prize => {
        if (prize.winners) {
            prize.winners.forEach(winner => {
                const prizeName = prize.name.replace(/"/g, '""');
                const winnerName = winner.name.replace(/"/g, '""');
                const claimed = winner.claimed ? "是" : "否";
                csvContent += `"${prizeName}","${winnerName}","${claimed}"\n`;
            });
        }
    });

    csvContent += '\n"未抽獎人員名單"\n';
    sParticipants.forEach(name => {
        csvContent += `"${name.replace(/"/g, '""')}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    const today = new Date();
    const fileName = `進度備份-${sTitle}-${today.getFullYear()}${String(today.getMonth()+1).padStart(2,'0')}${String(today.getDate()).padStart(2,'0')}.csv`;
    link.setAttribute("download", fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// --- TEMPLATE FUNCTIONS ---
const getListTemplates = () => JSON.parse(localStorage.getItem('listTemplates') || '{}');
const saveListTemplates = (templates) => localStorage.setItem('listTemplates', JSON.stringify(templates));
function saveListTemplate() { const name = listTemplateNameInput.value.trim(); const listContent = customListInput.value.trim(); if (!name || !listContent) { alert('範本名稱和名單內容都不能為空！'); return; } const templates = getListTemplates(); templates[name] = listContent; saveListTemplates(templates); listTemplateNameInput.value = ''; renderSavedListTemplates(); }
function loadListTemplate(name) { const templates = getListTemplates(); const listContent = templates[name]; if (listContent) { customListInput.value = listContent; } }
function deleteListTemplate(name) { const templates = getListTemplates(); delete templates[name]; saveListTemplates(templates); renderSavedListTemplates(); }
function renderSavedListTemplates() { const templates = getListTemplates(); listTemplateButtonsContainer.innerHTML = ''; for (const name in templates) { const container = document.createElement('div'); container.className = 'custom-template flex items-center rounded-lg'; container.style.backgroundColor = 'var(--secondary-color)'; const button = document.createElement('button'); button.textContent = name; button.className = 'px-4 py-2 text-sm'; button.addEventListener('click', () => loadListTemplate(name)); const deleteBtn = document.createElement('button'); deleteBtn.textContent = '✕'; deleteBtn.className = 'px-2 py-2 text-sm'; deleteBtn.style.color = 'var(--danger-color)'; deleteBtn.addEventListener('click', (e) => { e.stopPropagation(); deleteListTemplate(name); }); container.appendChild(button); container.appendChild(deleteBtn); listTemplateButtonsContainer.appendChild(container); } }

const getExcludeTemplates = () => JSON.parse(localStorage.getItem('excludeTemplates') || '{}');
const saveExcludeTemplates = (templates) => localStorage.setItem('excludeTemplates', JSON.stringify(templates));
function saveExcludeTemplate() { const name = excludeTemplateNameInput.value.trim(); const listContent = excludeListInput.value.trim(); if (!name || !listContent) { alert('範本名稱和排除名單都不能為空！'); return; } const templates = getExcludeTemplates(); templates[name] = listContent; saveExcludeTemplates(templates); excludeTemplateNameInput.value = ''; renderSavedExcludeTemplates(); } 
function loadExcludeTemplate(name) { const templates = getExcludeTemplates(); const listContent = templates[name]; if (listContent) { excludeListInput.value = listContent; } }
function deleteExcludeTemplate(name) { const templates = getExcludeTemplates(); delete templates[name]; saveExcludeTemplates(templates); renderSavedExcludeTemplates(); }
function renderSavedExcludeTemplates() { const templates = getExcludeTemplates(); excludeTemplateButtonsContainer.innerHTML = ''; for (const name in templates) { const container = document.createElement('div'); container.className = 'custom-template flex items-center rounded-lg'; container.style.backgroundColor = 'var(--secondary-color)'; const button = document.createElement('button'); button.textContent = name; button.className = 'px-4 py-2 text-sm'; button.addEventListener('click', () => loadExcludeTemplate(name)); const deleteBtn = document.createElement('button'); deleteBtn.textContent = '✕'; deleteBtn.className = 'px-2 py-2 text-sm'; deleteBtn.style.color = 'var(--danger-color)'; deleteBtn.addEventListener('click', (e) => { e.stopPropagation(); deleteExcludeTemplate(name); }); container.appendChild(button); container.appendChild(deleteBtn); excludeTemplateButtonsContainer.appendChild(container); } }

const getTitleTemplates = () => JSON.parse(localStorage.getItem('titleTemplates') || '{}');
const saveTitleTemplates = (templates) => localStorage.setItem('titleTemplates', JSON.stringify(templates));
function saveTitleTemplate() { const name = titleTemplateNameInput.value.trim(); const title = titleInput.value.trim(); if (!name || !title) { alert('範本名稱和活動標題都不能為空！'); return; } const templates = getTitleTemplates(); templates[name] = title; saveTitleTemplates(templates); titleTemplateNameInput.value = ''; renderSavedTitleTemplates(); }
function loadTitleTemplate(name) { const templates = getTitleTemplates(); const title = templates[name]; if (title) { titleInput.value = title; titleInput.dispatchEvent(new Event('input')); } }
function deleteTitleTemplate(name) { const templates = getTitleTemplates(); delete templates[name]; saveTitleTemplates(templates); renderSavedTitleTemplates(); }
function renderSavedTitleTemplates() { const templates = getTitleTemplates(); titleTemplateButtonsContainer.innerHTML = ''; for (const name in templates) { const container = document.createElement('div'); container.className = 'custom-template flex items-center rounded-lg'; container.style.backgroundColor = 'var(--secondary-color)'; const button = document.createElement('button'); button.textContent = name; button.className = 'px-4 py-2 text-sm'; button.addEventListener('click', () => loadTitleTemplate(name)); const deleteBtn = document.createElement('button'); deleteBtn.textContent = '✕'; deleteBtn.className = 'px-2 py-2 text-sm'; deleteBtn.style.color = 'var(--danger-color)'; deleteBtn.addEventListener('click', (e) => { e.stopPropagation(); deleteTitleTemplate(name); }); container.appendChild(button); container.appendChild(deleteBtn); titleTemplateButtonsContainer.appendChild(container); } }

const getPrizeTemplates = () => JSON.parse(localStorage.getItem('prizeTemplates') || '{}');
const savePrizeTemplates = (templates) => localStorage.setItem('prizeTemplates', JSON.stringify(templates));
function savePrizeTemplate() { const name = templateNameInput.value.trim(); if (!name) { alert('請為您的獎項範本命名！'); return; } const prizeRows = prizesContainer.querySelectorAll('.prize-row'); const currentPrizes = Array.from(prizeRows).map(row => ({ name: row.querySelector('.prize-name').value, quantity: row.querySelector('.prize-quantity').value })); if (currentPrizes.length === 0) { alert('沒有可儲存的獎項！'); return; } const templates = getPrizeTemplates(); templates[name] = currentPrizes; savePrizeTemplates(templates); templateNameInput.value = ''; renderSavedTemplates(); }
function loadPrizeTemplate(name) { const templates = getPrizeTemplates(); const template = templates[name]; if (template) { clearPrizes(); template.forEach(prize => addPrizeRow(prize.name, prize.quantity)); } }
function deletePrizeTemplate(name) { const templates = getPrizeTemplates(); delete templates[name]; savePrizeTemplates(templates); renderSavedTemplates(); }
function renderSavedTemplates() { const templates = getPrizeTemplates(); templateButtonsContainer.innerHTML = ''; for (const name in templates) { const container = document.createElement('div'); container.className = 'custom-template flex items-center rounded-lg'; container.style.backgroundColor = 'var(--secondary-color)'; const button = document.createElement('button'); button.textContent = name; button.className = 'px-4 py-2 text-sm'; button.addEventListener('click', () => loadPrizeTemplate(name)); const deleteBtn = document.createElement('button'); deleteBtn.textContent = '✕'; deleteBtn.className = 'px-2 py-2 text-sm'; deleteBtn.style.color = 'var(--danger-color)'; deleteBtn.addEventListener('click', (e) => { e.stopPropagation(); deletePrizeTemplate(name); }); container.appendChild(button); container.appendChild(deleteBtn); templateButtonsContainer.appendChild(container); } }

// --- CORE LOGIC FUNCTIONS ---
const playTenseMusic = () => { if (!isSoundOn) return; rollingSound.currentTime = 0; const playPromise = rollingSound.play(); if (playPromise !== undefined) { playPromise.catch(error => console.error("Error playing rolling sound:", error)); } };
const stopTenseMusic = () => { rollingSound.pause(); rollingSound.currentTime = 0; };
const playWinnerSound = () => { if (!isSoundOn) return; winnerSound.currentTime = 0; const playPromise = winnerSound.play(); if (playPromise !== undefined) { playPromise.catch(error => console.error("Error playing winner sound:", error)); } };
const toggleSound = () => { isSoundOn = !isSoundOn; soundToggleBtn.textContent = isSoundOn ? '🔊' : '🔇'; if(!isSoundOn) { stopTenseMusic(); } };
function switchTab(tabName) {
    activeDataSource = tabName;
    const tabs = {
        custom: { btn: tabCustomBtn, content: tabContentCustom },
        cloud: { btn: tabCloudBtn, content: tabContentCloud },
        csv: { btn: tabCsvBtn, content: tabContentCsv },
        exclude: { btn: tabExcludeBtn, content: tabContentExclude }
    };
    Object.values(tabs).forEach(tab => {
        tab.btn.classList.remove('active');
        tab.content.classList.add('hidden');
    });
    tabs[tabName].btn.classList.add('active');
    tabs[tabName].content.classList.remove('hidden');
}
function switchEnvTab(tabName) { const tabs = { mode: { btn: tabModeBtn, content: tabContentMode }, title: { btn: tabTitleBtn, content: tabContentTitle }, prize: { btn: tabPrizeBtn, content: tabContentPrize }, theme: { btn: tabThemeBtn, content: tabContentTheme }, visual: { btn: tabVisualBtn, content: tabContentVisual }, sound: { btn: tabSoundBtn, content: tabContentSound }, effect: { btn: tabEffectBtn, content: tabContentEffect } }; Object.values(tabs).forEach(tab => { tab.btn.classList.remove('active'); tab.content.classList.add('hidden'); }); tabs[tabName].btn.classList.add('active'); tabs[tabName].content.classList.remove('hidden'); } 
function handleSimpleDrawToggle(e) { const isEnabled = e.target.checked; if (isEnabled) { tabPrizeBtn.classList.add('hidden'); if (tabPrizeBtn.classList.contains('active')) { switchEnvTab('mode'); } } else { tabPrizeBtn.classList.remove('hidden'); } localStorage.setItem('simpleDrawMode', isEnabled); } 
function addPrizeRow(name = '', quantity = 1) { const row = document.createElement('div'); row.className = 'prize-row flex items-center gap-2'; row.innerHTML = ` <input type="text" class="prize-name form-input w-full p-2 rounded" value="${name}" placeholder="獎項名稱"> <input type="number" class="prize-quantity form-input w-24 p-2 rounded" value="${quantity}" min="1" placeholder="數量"> <button class="remove-prize-btn btn-secondary px-3 py-2 rounded" style="color: var(--danger-color);">✕</button> `; prizesContainer.appendChild(row); row.querySelector('.remove-prize-btn').addEventListener('click', () => row.remove()); }
const clearPrizes = () => { prizesContainer.innerHTML = ''; };
function handleUrlParams() { const params = new URLSearchParams(window.location.search); if (params.has('sheetUrl') && params.has('sheetName') && params.has('column')) { sheetUrlInput.value = params.get('sheetUrl'); sheetNameInput.value = params.get('sheetName'); columnLetterInput.value = params.get('column'); handleLoadData(); } }
function readAndValidatePrizes() { prizes = []; const isSimpleMode = simpleDrawToggle.checked; if (isSimpleMode) { return true; } const prizeRows = prizesContainer.querySelectorAll('.prize-row'); if (prizeRows.length === 0) { return true; } let totalPrizeQuantity = 0; for (const row of prizeRows) { const name = row.querySelector('.prize-name').value.trim(); const quantity = parseInt(row.querySelector('.prize-quantity').value, 10); if (!name) { updateStatus('獎項名稱不可為空！', true); return false; } if (isNaN(quantity) || quantity < 1) { updateStatus(`獎項「${name}」的數量必須是正整數！`, true); return false; } prizes.push({ name, quantity, winners: [] }); totalPrizeQuantity += quantity; } if (participants.length > 0 && totalPrizeQuantity > participants.length) { updateStatus(`警告：獎項總數 (${totalPrizeQuantity}) 大於參與人數 (${participants.length})！`, true); } return true; }

async function handleLoadData() {
    loadButton.disabled = true;
    updateStatus('正在處理名單...');
    if (activeDataSource === 'cloud') {
        await loadFromCloud();
    } else if (activeDataSource === 'csv') {
        await loadFromPublishedCsv();
    } else {
        loadFromCustomInput();
    }
}

function showColumnSelectionModal(headers, nameColIndex) {
    columnSelectionContainer.innerHTML = '';
    const checkboxIdPrefix = activeDataSource === 'cloud' ? 'cloud-smart-filter' : 'csv-smart-filter';
    const smartFilterEnabled = document.getElementById(checkboxIdPrefix) ? document.getElementById(checkboxIdPrefix).checked : true;

    if (!smartFilterEnabled) {
        handleColumnSelectionConfirmed([]); 
        return;
    }

    const keywords = /phone|mobile|tel|cell|手機|電話|email|mail|信箱|id|編號|學號|工號|身分證|uid/i;

    let hasOptions = false;
    headers.forEach((header, index) => {
        if (index === nameColIndex) return; 

        hasOptions = true;
        const wrapper = document.createElement('div');
        wrapper.className = 'flex items-center p-2 rounded hover:bg-white/10';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `col-select-${index}`;
        checkbox.value = index;
        checkbox.className = 'form-checkbox h-5 w-5 text-red-500 rounded focus:ring-0';
        
        if (keywords.test(header)) {
            checkbox.checked = true;
        }

        const label = document.createElement('label');
        label.htmlFor = `col-select-${index}`;
        label.className = 'ml-3 cursor-pointer select-none flex-grow text-lg';
        label.textContent = header || `(無標題 - 第${index+1}欄)`;

        wrapper.appendChild(checkbox);
        wrapper.appendChild(label);
        columnSelectionContainer.appendChild(wrapper);
    });

    if (!hasOptions) {
        handleColumnSelectionConfirmed([]);
        return;
    }

    columnSelectionModal.classList.remove('hidden');
}

function handleColumnSelectionConfirmed(preSelectedIndices = null) {
    let selectedIndices = [];
    
    if (Array.isArray(preSelectedIndices)) {
        selectedIndices = preSelectedIndices;
    } else {
        const checkboxes = columnSelectionContainer.querySelectorAll('input[type="checkbox"]:checked');
        checkboxes.forEach(cb => selectedIndices.push(parseInt(cb.value)));
        columnSelectionModal.classList.add('hidden');
    }

    if (!pendingLoadedData) return;

    const { rows, nameColIndex } = pendingLoadedData;
    
    const rawList = rows.map((row, index) => {
        if (index === 0) return null; // Skip header

        const name = row[nameColIndex];
        if (!name) return null;

        const smartValues = selectedIndices.map(idx => row[idx] ? row[idx].trim().replace(/\D/g, '') : '').filter(v => v !== '');
        return { name, smartValues, originalRow: row };
    }).filter(item => item !== null);

    finalizeDataLoading(rawList);
    pendingLoadedData = null; // Clean up
}

function parseCSV(text) {
    const rows = [];
    let currentRow = [];
    let currentCell = '';
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const nextChar = text[i + 1];
        if (inQuotes) {
            if (char === '"' && nextChar === '"') { currentCell += '"'; i++; }
            else if (char === '"') { inQuotes = false; }
            else { currentCell += char; }
        } else {
            if (char === '"') { inQuotes = true; }
            else if (char === ',') { currentRow.push(currentCell.trim()); currentCell = ''; }
            else if (char === '\n' || char === '\r') {
                if (currentCell || currentRow.length > 0) { currentRow.push(currentCell.trim()); rows.push(currentRow); }
                currentRow = []; currentCell = '';
                if (char === '\r' && nextChar === '\n') i++;
            } else { currentCell += char; }
        }
    }
    if (currentCell || currentRow.length > 0) { currentRow.push(currentCell.trim()); rows.push(currentRow); }
    return rows;
}

async function loadFromCloud() {
    const sheetUrl = sheetUrlInput.value.trim();
    const sheetName = sheetNameInput.value.trim();
    const columnLetter = columnLetterInput.value.trim().toUpperCase();
    if (!sheetUrl) { updateStatus('請輸入 Google 試算表「共用」網址！', true); loadButton.disabled = false; return; }
    const sheetIdMatch = sheetUrl.match(/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (!sheetIdMatch || !sheetIdMatch[1]) { updateStatus('無法從「共用」網址中解析出試算表 ID，請確認網址是否正確。', true); loadButton.disabled = false; return; }
    const sheetId = sheetIdMatch[1];
    updateStatus('正在從雲端讀取名單...');
    try {
        const timestamp = new Date().getTime();
        const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}&_=${timestamp}`;
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(csvUrl)}`;
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error(`網路回應錯誤: ${response.statusText}`);
        const csvText = await response.text();
        
        const rows = parseCSV(csvText);
        if (rows.length === 0) throw new Error("CSV 資料為空");

        const headers = rows[0]; 
        const nameColIndex = columnLetter.charCodeAt(0) - 'A'.charCodeAt(0);
        
        pendingLoadedData = { rows, nameColIndex };
        showColumnSelectionModal(headers, nameColIndex);

    } catch (error) {
        console.error('讀取共用連結時發生錯誤:', error);
        updateStatus('讀取失敗！請檢查網址是否正確，以及網路連線。', true);
        loadButton.disabled = false;
    }
}

async function loadFromPublishedCsv() {
    const url = csvUrlInput.value.trim();
    if (!url) { updateStatus('請輸入「發布到網路」的 CSV 網址！', true); loadButton.disabled = false; return; }
    if (!url.includes('/pub?gid=') || !url.includes('output=csv')) { updateStatus('網址格式錯誤！請確認是「發布到網路」並選擇 CSV 格式的網址。', true); loadButton.disabled = false; return; }
    const columnLetter = csvColumnLetterInput.value.trim().toUpperCase();
    const nameColIndex = columnLetter.charCodeAt(0) - 'A'.charCodeAt(0);
    updateStatus(`正在從發布的連結讀取名單 (${columnLetter}欄)...`);
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`網路回應錯誤: ${response.statusText}`);
        const csvText = await response.text();
        
        const rows = parseCSV(csvText);
        if (rows.length === 0) throw new Error("CSV 資料為空");
        
        const headers = rows[0];
        
        pendingLoadedData = { rows, nameColIndex };
        showColumnSelectionModal(headers, nameColIndex);

    } catch (error) {
        console.error('讀取發布的 CSV 時發生錯誤:', error);
        updateStatus('讀取失敗！請檢查網址是否正確，以及網路連線。', true);
        loadButton.disabled = false;
    }
}

function finalizeDataLoading(rawList) {
    const excludeRaw = excludeListInput.value;
    const excludeNamesArr = excludeRaw.split(/[,，\n]+/ ).map(name => name.trim()).filter(name => name.length > 0);
    const excludeNames = new Set(excludeNamesArr);
    
    let activeList = rawList.filter(item => !excludeNames.has(item.name));

    const nameGroups = {};
    activeList.forEach(item => {
        if (!nameGroups[item.name]) nameGroups[item.name] = [];
        nameGroups[item.name].push(item);
    });

    const processedList = [];

    Object.keys(nameGroups).forEach(name => {
        const group = nameGroups[name];
        const clusters = []; 

        group.forEach(item => {
            let matchedClusterIndex = -1;
            
            for (let i = 0; i < clusters.length; i++) {
                const cluster = clusters[i];
                const representative = cluster[0];
                
                const hasIntersection = item.smartValues.some(v => v && representative.smartValues.includes(v));
                const bothEmpty = item.smartValues.length === 0 && representative.smartValues.length === 0;

                if (hasIntersection || bothEmpty) {
                    matchedClusterIndex = i;
                    break; 
                }
            }

            if (matchedClusterIndex !== -1) {
                clusters[matchedClusterIndex].push(item);
            } else {
                clusters.push([item]);
            }
        });

        clusters.forEach((cluster, index) => {
            const uniqueKey = `${name}_${index}`;
            let bestSuffix = '';
            const allValues = new Set(cluster.flatMap(i => i.smartValues));
            for (const v of allValues) {
                if (v.includes('@')) { bestSuffix = v.split('@')[0]; break; }
            }
            if (!bestSuffix) {
                for (const v of allValues) {
                    if (/\d{4,}/.test(v)) { bestSuffix = v.slice(-4); break; }
                }
            }
            if (!bestSuffix && allValues.size > 0) bestSuffix = [...allValues][0];

            cluster.forEach(item => {
                item.uniqueKey = uniqueKey;
                item.displaySuffix = bestSuffix;
                processedList.push(item);
            });
        });
    });

    pendingParticipants = processedList;
    
    if (filterDuplicatesToggle.checked) {
        const counts = {};
        pendingParticipants.forEach(item => { counts[item.uniqueKey] = (counts[item.uniqueKey] || 0) + 1; });
        
        const duplicateKeys = new Set(Object.entries(counts).filter(([k, v]) => v > 1).map(([k]) => k));
        
        if (duplicateKeys.size > 0) {
            const duplicatesToDisplay = [];
            duplicateKeys.forEach(key => {
                const item = pendingParticipants.find(i => i.uniqueKey === key);
                const displayName = item.displaySuffix ? `${item.name} (${item.displaySuffix})` : item.name;
                duplicatesToDisplay.push([displayName, counts[key]]);
            });
            showDuplicatesModal(duplicatesToDisplay); 
            return;
        }
    }

    resolveNameCollisionsAndSetParticipants(pendingParticipants);
}

function resolveNameCollisionsAndSetParticipants(objList) {
    const nameGroups = {};
    objList.forEach(item => {
        if (!nameGroups[item.name]) nameGroups[item.name] = [];
        if (!nameGroups[item.name].some(existing => existing.uniqueKey === item.uniqueKey)) {
             nameGroups[item.name].push(item);
        }
    });
    
    const finalNames = [];
    
    Object.values(nameGroups).forEach(group => {
        if (group.length === 1) {
            finalNames.push(group[0].name);
        } else {
            group.forEach((item, index) => {
                let newName = item.name;
                if (item.displaySuffix) {
                    newName = `${item.name} (${item.displaySuffix})`;
                } else {
                    newName = `${item.name} (${index + 1})`;
                }
                finalNames.push(newName);
            });
        }
    });

    participants = finalNames;

    const excludeRaw = excludeListInput.value;
    const excludeNamesArr = excludeRaw.split(/[,，\n]+/ ).map(name => name.trim()).filter(name => name.length > 0);
    
    if (participants.length > 0 && readAndValidatePrizes()) {
        updateStatus(`成功載入 ${participants.length} 位參與者！` + (excludeNamesArr.length ? ` (已排除名單上的 ${excludeNamesArr.length} 人)` : ''), false);
        switchToLotteryView();
    } else {
        if (participants.length === 0) updateStatus(`載入的名單中沒有有效的名字。`, true);
        loadButton.disabled = false;
    }
}

function loadFromCustomInput() { 
    const rawStrings = customListInput.value.split(/[,，\n]+/ ).map(name => name.trim()).filter(name => name.length > 0);
    
    // 如果「過濾重複姓名」開關是關閉的，則允許名單內有重複人名（視作多個抽獎機會）
    if (!filterDuplicatesToggle.checked) {
        const excludeRaw = excludeListInput.value;
        const excludeNames = new Set(excludeRaw.split(/[,，\n]+/ ).map(name => name.trim()).filter(name => name.length > 0));
        
        participants = rawStrings.filter(name => !excludeNames.has(name));
        
        if (participants.length > 0 && readAndValidatePrizes()) {
            updateStatus(`成功載入 ${participants.length} 個抽獎名標！`, false);
            switchToLotteryView();
        } else {
            if (participants.length === 0) updateStatus(`載入的名單中沒有有效的名字。`, true);
            loadButton.disabled = false;
        }
        return;
    }

    const rawList = rawStrings.map(name => ({ name, uniqueKey: name, smartValues: [] }));
    finalizeDataLoading(rawList);
}

function showDuplicatesModal(duplicates) {
    duplicatesList.innerHTML = '';
    duplicates.forEach(([name, count]) => {
        const item = document.createElement('div');
        item.className = 'duplicate-item';
        item.innerHTML = `<span>${name}</span><span class="duplicate-count">${count} 次</span>`;
        duplicatesList.appendChild(item);
    });
    duplicatesModal.classList.remove('hidden');
}

function handleDuplicateAction(action) {
    const counts = {};
    pendingParticipants.forEach(item => { counts[item.uniqueKey] = (counts[item.uniqueKey] || 0) + 1; });
    
    let finalObjList = [];

    if (action === 'deleteAll') { 
        finalObjList = pendingParticipants.filter(item => counts[item.uniqueKey] === 1); 
    } else if (action === 'keepOne') { 
        const seenKeys = new Set();
        pendingParticipants.forEach(item => {
            if (!seenKeys.has(item.uniqueKey)) {
                seenKeys.add(item.uniqueKey);
                finalObjList.push(item);
            }
        });
    }

    duplicatesModal.classList.add('hidden');
    resolveNameCollisionsAndSetParticipants(finalObjList);
}

function handleDrawWinner() {
    if (drawButton.textContent === '重置' || drawButton.textContent === '結束') {
        if (confirm('您確定要結束本次活動並重置嗎？')) { resetApp(); }
        return;
    }
    if (drawButton.textContent === '抽獎結束') {
        winnerDisplay.textContent = '再接再厲';
        currentPrizeDisplay.textContent = '感謝參與！';
        drawButton.textContent = '重置';
        return;
    }

    while (currentPrizeIndex < prizes.length && prizes[currentPrizeIndex].winners.length >= prizes[currentPrizeIndex].quantity) {
        currentPrizeIndex++;
    }
    const currentPrize = prizes[currentPrizeIndex];
    if (!currentPrize) return;
    updatePrizeDisplay();

    let batchSize = batchDrawToggle.checked ? (parseInt(batchSizeInput.value, 10) || 1) : 1;
    const remainingInPrize = currentPrize.quantity - currentPrize.winners.length;
    if (batchSize > remainingInPrize) batchSize = remainingInPrize;
    if (batchSize > participants.length) batchSize = participants.length;

    if (batchSize <= 0) {
        currentPrizeIndex++;
        updatePrizeDisplay();
        if (currentPrizeIndex < prizes.length) {
            setTimeout(() => { 
                winnerDisplay.textContent = '準備開始！'; 
                winnerDisplay.style.fontSize = '';
            }, 2000);
        }
        return;
    }

    drawButton.disabled = true;
    playTenseMusic();
    rollingInterval = setInterval(() => {
        winnerDisplay.textContent = participants[Math.floor(Math.random() * participants.length)];
    }, 80);

    setTimeout(() => {
        clearInterval(rollingInterval);
        stopTenseMusic();
        
        const winnersThisBatch = [];
        for (let i = 0; i < batchSize; i++) {
            const winnerIndex = Math.floor(Math.random() * participants.length);
            const winnerName = participants.splice(winnerIndex, 1)[0];
            winnersThisBatch.push(winnerName);
            currentPrize.winners.push({ name: winnerName, claimed: false });
        }

        const selectedEffect = winnerEffectSelect.value;
        const revealWinners = () => {
            if (batchSize === 1) {
                winnerDisplay.textContent = winnersThisBatch[0];
                winnerDisplay.style.fontSize = '';
            } else {
                winnerDisplay.innerHTML = `<div class="text-2xl mb-2">恭喜得獎者：</div><div class="flex flex-wrap justify-center gap-2 text-xl">${winnersThisBatch.map(name => `<span class="px-3 py-1 rounded bg-white/20">${name}</span>`).join('')}</div>`;
                winnerDisplay.style.fontSize = "1.5rem";
            }

            if (selectedEffect === 'spotlight') { winnerDisplay.classList.add('effect-spotlight'); } 
            else { winnerDisplay.classList.add('winner-reveal'); }
            
            playWinnerSound();
            launchConfetti();
            updateParticipantCount();
            updateWinnersList(true);
            updatePrizeDisplay();
            drawButton.disabled = false;
            saveSession();
        };

        if (selectedEffect === 'marquee') {
            winnerDisplay.textContent = winnersThisBatch.join(', ');
            winnerDisplay.classList.add('effect-marquee');
            setTimeout(revealWinners, 1200);
        } else {
            revealWinners();
        }
    }, 4000);
}

function setupThemes() {
    themeSelector.innerHTML = '';
    themes.forEach(theme => {
        const button = document.createElement('button');
        button.className = 'theme-button';
        button.title = theme.name;
        button.dataset.theme = theme.id;
        button.style.background = `linear-gradient(45deg, ${theme.colors[0]}, ${theme.colors[1]})`;
        button.addEventListener('click', () => { applyTheme(theme.id); });
        themeSelector.appendChild(button);
    });
}

function applyTheme(themeId) {
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    if (themeId !== 'izakaya') { document.body.classList.add(`theme-${themeId}`); }
    localStorage.setItem('lotteryTheme', themeId);
    document.querySelectorAll('.theme-button').forEach(btn => { btn.classList.toggle('active', btn.dataset.theme === themeId); });
}

function loadTheme() { const savedTheme = localStorage.getItem('lotteryTheme') || 'candy'; applyTheme(savedTheme); }
function updateStatus(message, isError = false) { statusMessage.textContent = message; statusMessage.style.color = isError ? 'var(--danger-color)' : 'var(--accent-color)'; }

function switchToLotteryView() {
    settingsSection.classList.add('hidden');
    lotterySection.classList.remove('hidden');
    resetBtn.classList.remove('hidden');
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    window.scrollTo(0, 0);
    requestAnimationFrame(() => window.scrollTo(0, 0));
    const isSimpleMode = simpleDrawToggle.checked;
    if (isSimpleMode) {
        if (prizes.length === 0) { prizes = [{ name: '抽出名單', quantity: participants.length, winners: [] }]; }
        participantLabel.textContent = '未中籤人數';
    } else {
        participantLabel.textContent = '剩餘摸彩人數';
    }
    updateParticipantCount(); updatePrizeDisplay(); saveSession();
}

function adjustPrizeNameFontSize() {
    const nameElement = document.getElementById('finished-prize-name');
    if (!nameElement) return;
    const container = winnerDisplay;
    let fontSize = 4;
    const minFontSize = 1;
    const step = 0.2;
    nameElement.style.fontSize = `${fontSize}rem`;
    while (nameElement.scrollWidth > container.clientWidth * 0.95 && fontSize > minFontSize) {
        fontSize -= step;
        nameElement.style.fontSize = `${fontSize}rem`;
    }
}

function updatePrizeDisplay() {
    const isSimpleMode = simpleDrawToggle.checked;
    const allPrizesDrawn = prizes.every(p => p.winners.length >= p.quantity);
    if (allPrizesDrawn) {
        if (isSimpleMode) { currentPrizeDisplay.textContent = '所有人都已抽出！'; drawButton.textContent = '結束'; } 
        else { currentPrizeDisplay.textContent = '所有項目已抽完！'; drawButton.textContent = '抽獎結束'; }
        drawButton.disabled = false; exportCsvBtn.classList.remove('hidden'); updateWinnersList(); updateDashboardStats(); return;
    }
    const currentPrize = prizes[currentPrizeIndex];
    if (isSimpleMode) { currentPrizeDisplay.textContent = '幸運的你'; } 
    else {
        const progress = `${currentPrize.winners.length} / ${currentPrize.quantity}`;
        currentPrizeDisplay.textContent = `正在抽取: ${currentPrize.name} (${progress})`;
    }
    if (currentPrize.winners.length >= currentPrize.quantity) {
        const nextPrize = prizes.find((p, index) => index > currentPrizeIndex && p.winners.length < p.quantity);
        if (nextPrize) currentPrizeDisplay.textContent = `下一輪：${nextPrize.name} (0 / ${nextPrize.quantity})`;
        drawButton.textContent = nextPrize ? `繼續抽「${nextPrize.name}」` : '抽獎結束';
    } else {
        if (isSimpleMode) { drawButton.textContent = '抽籤'; } 
        else {
            if (winnerDisplay.textContent.includes('準備補抽')) { drawButton.textContent = '開始補抽'; } 
            else { drawButton.textContent = '開始摸彩 (Space)'; }
        }
    }
    updateDashboardStats();
}

function updateParticipantCount() { participantCountSpan.textContent = participants.length; updateDashboardStats(); }

function updateDashboardStats() {
    const awarded = prizes.reduce((sum, prize) => sum + prize.winners.length, 0);
    const total = prizes.reduce((sum, prize) => sum + prize.quantity, 0);
    const activePrize = prizes.find(prize => prize.winners.length < prize.quantity);
    currentPrizeShort.textContent = activePrize ? activePrize.name : (total ? '全部抽完' : '準備開獎');
    currentPrizeProgress.textContent = activePrize ? `剩餘額度：${activePrize.quantity - activePrize.winners.length} / ${activePrize.quantity} 位` : (total ? '所有獎項已抽出' : '等待開始');
    awardedProgress.textContent = `${awarded} / ${total} 份`;
    prizeProgressList.replaceChildren();
    prizes.forEach(prize => {
        const item = document.createElement('div');
        item.className = 'prize-progress-item';
        const row = document.createElement('div');
        const label = document.createElement('span');
        const count = document.createElement('strong');
        const track = document.createElement('div');
        const fill = document.createElement('span');
        label.textContent = prize.name;
        count.textContent = `${prize.winners.length}/${prize.quantity} 已抽出`;
        track.className = 'progress-track';
        fill.style.width = `${Math.min(100, prize.winners.length / prize.quantity * 100)}%`;
        row.append(label, count);
        track.appendChild(fill);
        item.append(row, track);
        prizeProgressList.appendChild(item);
    });
}

function handleDonate(prizeIndex, winnerIndex) {
    const prize = prizes[prizeIndex];
    if (!prize) return;
    const winnerToDonate = prize.winners.splice(winnerIndex, 1)[0];
    if (!winnerToDonate) return;
    
    // 將捐出的人放回抽獎池
    participants.push(winnerToDonate.name);
    currentPrizeIndex = prizeIndex;
    
    // 重置抽獎狀態，引導重新抽取
    drawButton.disabled = false;
    winnerDisplay.textContent = '準備補抽！';
    winnerDisplay.style.fontSize = '';
    
    // 清除匯出按鈕（因為名單已變動）
    exportCsvBtn.classList.add('hidden');
    
    updateParticipantCount(); 
    updateWinnersList(true); 
    updatePrizeDisplay(); 
    saveSession();
    updateStatus(`已將「${winnerToDonate.name}」捐出的獎項放回抽獎池。`);
}

function handleRedraw(prizeIndex, winnerIndex) {
    handleDonate(prizeIndex, winnerIndex);
}

function updateWinnersList(forceSort = false) {
    const isSimpleMode = simpleDrawToggle.checked;
    const hasAnyWinners = prizes.some(p => p.winners.length > 0);
    const allPrizesDrawn = prizes.every(p => p.winners.length >= p.quantity);
    
    // Toggle Sort Button Visibility
    const isSortEnabled = sortWinnersToggle.checked;
    if (isSortEnabled && !isSimpleMode && hasAnyWinners) {
        sortWinnersBtn.classList.remove('hidden');
    } else {
        sortWinnersBtn.classList.add('hidden');
    }

    if (!hasAnyWinners) return;
    
    winnersList.innerHTML = '';
    
    const createWinnerTag = (winner, prizeIndex, winnerIndex) => {
        const winnerTagContainer = document.createElement('div');
        winnerTagContainer.className = 'winner-tag px-2 py-1 rounded-md flex items-center justify-between';
        const winnerNameSpan = document.createElement('button');
        winnerNameSpan.type = 'button';
        winnerNameSpan.textContent = winner.name;
        winnerNameSpan.className = 'winner-name-button';
        winnerNameSpan.title = '切換領獎狀態';
        winnerNameSpan.addEventListener('click', () => {
            winner.claimed = !winner.claimed;
            winnerTagContainer.classList.toggle('claimed', winner.claimed);
            saveSession();
        });
        if (winner.claimed) { winnerTagContainer.classList.add('claimed'); }
        winnerTagContainer.appendChild(winnerNameSpan);

        // 新增：捐出按鈕（🎁），不論是否領取都可捐出
        const donateBtn = document.createElement('button');
        donateBtn.className = 'donate-btn';
        donateBtn.innerHTML = '🎁';
        donateBtn.title = '捐出獎項（重新抽獎）';
        donateBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm(`確定要將「${winner.name}」的獎項捐出並重新抽獎嗎？`)) {
                handleDonate(prizeIndex, winnerIndex);
            }
        });
        winnerTagContainer.appendChild(donateBtn);

        return winnerTagContainer;
    };

    if (isSimpleMode) {
        document.getElementById('winners-list-title').textContent = '已抽出名單';
        const winnerNames = document.createElement('div');
        winnerNames.className = 'grid grid-cols-2 gap-x-4 gap-y-2 mt-2 text-base';
        prizes[0].winners.forEach((winner, index) => { winnerNames.appendChild(createWinnerTag(winner, 0, index)); });
        winnersList.appendChild(winnerNames);
    } else {
        document.getElementById('winners-list-title').textContent = '🏆 得獎榮譽榜';
        prizes.forEach((prize, prizeIndex) => {
            if (prize.winners.length > 0) {
                const prizeContainer = document.createElement('div');
                prizeContainer.innerHTML = `<h4 class="font-bold text-lg" style="color: var(--accent-color);">${prize.name} (${prize.winners.length}/${prize.quantity})</h4>`;
                const winnerNames = document.createElement('div');
                winnerNames.className = 'grid grid-cols-2 gap-x-4 gap-y-2 mt-2 text-base';
                
                let displayWinners = prize.winners.map((w, idx) => ({ ...w, originalIndex: idx }));
                
                // Sorting Logic: Only sort if enabled and (forced or triggered by auto-update context)
                if (isSortEnabled && (forceSort === true)) {
                     displayWinners.sort((a, b) => {
                        if (a.claimed === b.claimed) {
                            return a.originalIndex - b.originalIndex; // Keep original order if status same
                        }
                        return a.claimed ? 1 : -1; // Unclaimed (false) comes first
                    });
                }

                displayWinners.forEach((winner) => { 
                    // Pass original index for redraw logic to work correctly
                    // Fix: Update the REAL data source using originalIndex, not the temporary display copy
                    const winnerTag = createWinnerTag(winner, prizeIndex, winner.originalIndex);
                    
                    // Override the name button listener to update the correct data reference
                    const nameButton = winnerTag.querySelector('.winner-name-button');
                    // Remove old listener by cloning node (cleanest way without named function)
                    const newNameButton = nameButton.cloneNode(true);
                    winnerTag.replaceChild(newNameButton, nameButton);
                    
                    newNameButton.addEventListener('click', () => {
                        // Access the ORIGINAL data source
                        const actualWinner = prizes[prizeIndex].winners[winner.originalIndex];
                        actualWinner.claimed = !actualWinner.claimed;
                        
                        winnerTag.classList.toggle('claimed', actualWinner.claimed);
                        saveSession();
                    });

                    winnerNames.appendChild(winnerTag); 
                });
                
                prizeContainer.appendChild(winnerNames);
                winnersList.appendChild(prizeContainer);
            }
        });
    }
}

function exportResultsToCsv() {
    const isSimpleMode = simpleDrawToggle.checked;
    let csvContent = isSimpleMode ? '\uFEFF"抽出順序","姓名","是否領取"\n' : '\uFEFF"獎項","得獎人","領取獎項"\n';
    
    prizes.forEach(prize => {
        prize.winners.forEach((winner, index) => {
            const winnerEscaped = `"${winner.name.replace(/"/g, '""')}"`;
            const claimedText = winner.claimed ? "是" : "否";
            
            if (isSimpleMode) {
                csvContent += `${index + 1},${winnerEscaped},"${claimedText}"\n`;
            } else {
                const prizeNameEscaped = `"${prize.name.replace(/"/g, '""')}"`;
                csvContent += `${prizeNameEscaped},${winnerEscaped},"${claimedText}"\n`;
            }
        });
    });
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    const today = new Date();
    const fileName = `得獎名單-${today.getFullYear()}${String(today.getMonth()+1).padStart(2,'0')}${String(today.getDate()).padStart(2,'0')}.csv`;
    link.setAttribute("download", fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function resetApp() {
    settingsSection.classList.remove('hidden'); lotterySection.classList.add('hidden'); resetBtn.classList.add('hidden');
    window.scrollTo(0, 0);
    participants = []; prizes = []; currentPrizeIndex = 0;
    winnerDisplay.textContent = '準備開始！'; winnerDisplay.classList.remove('winner-reveal');
    winnerDisplay.style.fontSize = '';
    winnersList.innerHTML = '<p class="empty-winners">幸運得主將在這裡登場</p>';
    exportCsvBtn.classList.add('hidden'); participantCountSpan.textContent = '0';
    currentPrizeDisplay.textContent = ''; mainTitle.textContent = titleInput.value.trim() || 'ㄚ亮笑長的抽抽樂';
    participantLabel.textContent = '剩餘摸彩人數'; drawButton.textContent = '開始摸彩'; drawButton.disabled = false;
    sheetUrlInput.value = ''; sheetNameInput.value = '工作表1'; columnLetterInput.value = 'A';
    csvUrlInput.value = ''; csvColumnLetterInput.value = 'A'; customListInput.value = ''; excludeListInput.value = '';
    prizesContainer.innerHTML = ''; addPrizeRow('三獎', 3); addPrizeRow('二獎', 2); addPrizeRow('頭獎', 1);
    loadButton.disabled = false; updateStatus(''); switchTab('custom'); clearSession(); updateDashboardStats();
}

function launchConfetti() {
    const duration = 2 * 1000; const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    function randomInRange(min, max) { return Math.random() * (max - min) + min; }
    const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
}

// Initialize the app
init();
