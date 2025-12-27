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
const winnersListContainer = document.getElementById('winners-list-container');
const mainDrawPanel = document.getElementById('main-draw-panel');
const winnersList = document.getElementById('winners-list');
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

// Recovery Modal Elements
const recoveryModal = document.getElementById('recovery-modal');
const resumeSessionBtn = document.getElementById('resume-session-btn');
const downloadSessionBtn = document.getElementById('download-session-btn');
const discardSessionBtn = document.getElementById('discard-session-btn');

// State
let participants = [];
let pendingParticipants = []; 
let prizes = [];
let currentPrizeIndex = 0;
let rollingInterval = null;
let activeDataSource = 'custom';
let isSoundOn = true;
const themes = [ { id: 'candy', name: '糖果王國', colors: ['#ff69b4', '#87ceeb'] }, { id: 'forest', name: '森林夥伴', colors: ['#228b22', '#ff7f50'] }, { id: 'izakaya', name: '居酒屋', colors: ['#e53e3e', '#ffab00'] }, { id: 'sakura', name: '櫻花', colors: ['#db2777', '#fdf2f8'] }, { id: 'midnight', name: '午夜', colors: ['#38bdf8', '#0f172a'] } ];
const buttonPhrases = [ '獎落誰家？就是你家！', '帶回就是福氣', '抽中就是緣分', '好運滾滾來', '表單一定要填' ];

const init = () => {
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

    // Other settings
    soundToggleBtn.addEventListener('click', toggleSound);
    simpleDrawToggle.addEventListener('change', handleSimpleDrawToggle);
    
    // 多人/分次抽取開關監聽
    batchDrawToggle.addEventListener('change', (e) => {
        const isEnabled = e.target.checked;
        batchSettingsContainer.classList.toggle('hidden', !isEnabled);
        localStorage.setItem('batchDrawEnabled', isEnabled);
    });

    filterDuplicatesToggle.addEventListener('change', (e) => {
        localStorage.setItem('filterDuplicates', e.target.checked);
    });

    // Duplicate Modal Actions
    dupDeleteAllBtn.addEventListener('click', () => handleDuplicateAction('deleteAll'));
    dupKeepOneBtn.addEventListener('click', () => handleDuplicateAction('keepOne'));
    dupCancelBtn.addEventListener('click', () => {
        duplicatesModal.classList.add('hidden');
        loadButton.disabled = false;
        updateStatus('載入已取消。');
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

    // 恢復模式設定狀態
    const savedSimpleMode = localStorage.getItem('simpleDrawMode') === 'true';
    simpleDrawToggle.checked = savedSimpleMode;
    if (savedSimpleMode) tabPrizeBtn.classList.add('hidden');

    const savedBatchEnabled = localStorage.getItem('batchDrawEnabled') === 'true';
    batchDrawToggle.checked = savedBatchEnabled;
    batchSettingsContainer.classList.toggle('hidden', !savedBatchEnabled);

    const savedFilter = localStorage.getItem('filterDuplicates') === 'true';
    filterDuplicatesToggle.checked = savedFilter;

    // Check for existing session
    const savedSession = localStorage.getItem('lottery_session');
    if (savedSession) {
        recoveryModal.classList.remove('hidden');
    }

    window.addEventListener('resize', () => { if (document.getElementById('finished-prize-name')) { adjustPrizeNameFontSize(); } });
};

// --- VISUAL CUSTOMIZATION FUNCTIONS ---
const handleImageUpload = (event, storageKey) => {
    const file = event.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert('圖片太大囉！請上傳小於 2MB 的圖片。'); return; }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        localStorage.setItem(storageKey, e.target.result);
        loadVisuals();
    };
    reader.readAsDataURL(file);
};

const loadVisuals = () => {
    const customLogo = localStorage.getItem('customLogo');
    if (customLogo) {
        logoImg.src = customLogo;
        logoImg.style.visibility = 'visible';
    } else {
        logoImg.src = "../Aliang.png";
    }

    const customBg = localStorage.getItem('customBg');
    if (customBg) {
        appBgOverlay.style.backgroundImage = `url(${customBg})`;
        appBgOverlay.style.opacity = '1';
    } else {
        appBgOverlay.style.backgroundImage = 'none';
        appBgOverlay.style.opacity = '0';
    }
};

// --- SESSION RECOVERY FUNCTIONS ---
const saveSession = () => {
    const sessionData = {
        participants,
        prizes,
        currentPrizeIndex,
        simpleDrawMode: simpleDrawToggle.checked,
        batchDrawEnabled: batchDrawToggle.checked,
        title: mainTitle.textContent
    };
    localStorage.setItem('lottery_session', JSON.stringify(sessionData));
};

const loadSession = () => {
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
        mainTitle.textContent = data.title;
        document.title = data.title;
        
        recoveryModal.classList.add('hidden');
        switchToLotteryView();
        updateWinnersList();
        updateStatus('進度已恢復。');
    } catch (e) {
        console.error("恢復進度失敗:", e);
        clearSession();
    }
};

const clearSession = () => {
    localStorage.removeItem('lottery_session');
    recoveryModal.classList.add('hidden');
};

const exportCurrentSessionToCsv = () => {
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
};

// --- LIST TEMPLATE FUNCTIONS ---
const getListTemplates = () => JSON.parse(localStorage.getItem('listTemplates') || '{}');
const saveListTemplates = (templates) => localStorage.setItem('listTemplates', JSON.stringify(templates));
const saveListTemplate = () => { const name = listTemplateNameInput.value.trim(); const listContent = customListInput.value.trim(); if (!name || !listContent) { alert('範本名稱和名單內容都不能為空！'); return; } const templates = getListTemplates(); templates[name] = listContent; saveListTemplates(templates); listTemplateNameInput.value = ''; renderSavedListTemplates(); };
const loadListTemplate = (name) => { const templates = getListTemplates(); const listContent = templates[name]; if (listContent) { customListInput.value = listContent; } };
const deleteListTemplate = (name) => { const templates = getListTemplates(); delete templates[name]; saveListTemplates(templates); renderSavedListTemplates(); };
const renderSavedListTemplates = () => { const templates = getListTemplates(); listTemplateButtonsContainer.innerHTML = ''; for (const name in templates) { const container = document.createElement('div'); container.className = 'custom-template flex items-center rounded-lg'; container.style.backgroundColor = 'var(--secondary-color)'; const button = document.createElement('button'); button.textContent = name; button.className = 'px-4 py-2 text-sm'; button.addEventListener('click', () => loadListTemplate(name)); const deleteBtn = document.createElement('button'); deleteBtn.textContent = '✕'; deleteBtn.className = 'px-2 py-2 text-sm'; deleteBtn.style.color = 'var(--danger-color)'; deleteBtn.addEventListener('click', (e) => { e.stopPropagation(); deleteListTemplate(name); }); container.appendChild(button); container.appendChild(deleteBtn); listTemplateButtonsContainer.appendChild(container); } };

// --- EXCLUDE TEMPLATE FUNCTIONS ---
const getExcludeTemplates = () => JSON.parse(localStorage.getItem('excludeTemplates') || '{}');
const saveExcludeTemplates = (templates) => localStorage.setItem('excludeTemplates', JSON.stringify(templates));
const saveExcludeTemplate = () => { const name = excludeTemplateNameInput.value.trim(); const listContent = excludeListInput.value.trim(); if (!name || !listContent) { alert('範本名稱和排除名單都不能為空！'); return; } const templates = getExcludeTemplates(); templates[name] = listContent; saveExcludeTemplates(templates); excludeTemplateNameInput.value = ''; renderSavedExcludeTemplates(); };
const loadExcludeTemplate = (name) => { const templates = getExcludeTemplates(); const listContent = templates[name]; if (listContent) { excludeListInput.value = listContent; } };
const deleteExcludeTemplate = (name) => { const templates = getExcludeTemplates(); delete templates[name]; saveExcludeTemplates(templates); renderSavedExcludeTemplates(); };
const renderSavedExcludeTemplates = () => { const templates = getExcludeTemplates(); excludeTemplateButtonsContainer.innerHTML = ''; for (const name in templates) { const container = document.createElement('div'); container.className = 'custom-template flex items-center rounded-lg'; container.style.backgroundColor = 'var(--secondary-color)'; const button = document.createElement('button'); button.textContent = name; button.className = 'px-4 py-2 text-sm'; button.addEventListener('click', () => loadExcludeTemplate(name)); const deleteBtn = document.createElement('button'); deleteBtn.textContent = '✕'; deleteBtn.className = 'px-2 py-2 text-sm'; deleteBtn.style.color = 'var(--danger-color)'; deleteBtn.addEventListener('click', (e) => { e.stopPropagation(); deleteExcludeTemplate(name); }); container.appendChild(button); container.appendChild(deleteBtn); excludeTemplateButtonsContainer.appendChild(container); } };

// --- TITLE TEMPLATE FUNCTIONS ---
const getTitleTemplates = () => JSON.parse(localStorage.getItem('titleTemplates') || '{}');
const saveTitleTemplates = (templates) => localStorage.setItem('titleTemplates', JSON.stringify(templates));
const saveTitleTemplate = () => { const name = titleTemplateNameInput.value.trim(); const title = titleInput.value.trim(); if (!name || !title) { alert('範本名稱和活動標題都不能為空！'); return; } const templates = getTitleTemplates(); templates[name] = title; saveTitleTemplates(templates); titleTemplateNameInput.value = ''; renderSavedTitleTemplates(); };
const loadTitleTemplate = (name) => { const templates = getTitleTemplates(); const title = templates[name]; if (title) { titleInput.value = title; titleInput.dispatchEvent(new Event('input')); } };
const deleteTitleTemplate = (name) => { const templates = getTitleTemplates(); delete templates[name]; saveTitleTemplates(templates); renderSavedTitleTemplates(); };
const renderSavedTitleTemplates = () => { const templates = getTitleTemplates(); titleTemplateButtonsContainer.innerHTML = ''; for (const name in templates) { const container = document.createElement('div'); container.className = 'custom-template flex items-center rounded-lg'; container.style.backgroundColor = 'var(--secondary-color)'; const button = document.createElement('button'); button.textContent = name; button.className = 'px-4 py-2 text-sm'; button.addEventListener('click', () => loadTitleTemplate(name)); const deleteBtn = document.createElement('button'); deleteBtn.textContent = '✕'; deleteBtn.className = 'px-2 py-2 text-sm'; deleteBtn.style.color = 'var(--danger-color)'; deleteBtn.addEventListener('click', (e) => { e.stopPropagation(); deleteTitleTemplate(name); }); container.appendChild(button); container.appendChild(deleteBtn); titleTemplateButtonsContainer.appendChild(container); } };

// --- PRIZE TEMPLATE FUNCTIONS ---
const getPrizeTemplates = () => JSON.parse(localStorage.getItem('prizeTemplates') || '{}');
const savePrizeTemplates = (templates) => localStorage.setItem('prizeTemplates', JSON.stringify(templates));
const savePrizeTemplate = () => { const name = templateNameInput.value.trim(); if (!name) { alert('請為您的獎項範本命名！'); return; } const prizeRows = prizesContainer.querySelectorAll('.prize-row'); const currentPrizes = Array.from(prizeRows).map(row => ({ name: row.querySelector('.prize-name').value, quantity: row.querySelector('.prize-quantity').value })); if (currentPrizes.length === 0) { alert('沒有可儲存的獎項！'); return; } const templates = getPrizeTemplates(); templates[name] = currentPrizes; savePrizeTemplates(templates); templateNameInput.value = ''; renderSavedTemplates(); };
const loadPrizeTemplate = (name) => { const templates = getPrizeTemplates(); const template = templates[name]; if (template) { clearPrizes(); template.forEach(prize => addPrizeRow(prize.name, prize.quantity)); } };
const deletePrizeTemplate = (name) => { const templates = getPrizeTemplates(); delete templates[name]; savePrizeTemplates(templates); renderSavedTemplates(); };
const renderSavedTemplates = () => { const templates = getPrizeTemplates(); templateButtonsContainer.innerHTML = ''; for (const name in templates) { const container = document.createElement('div'); container.className = 'custom-template flex items-center rounded-lg'; container.style.backgroundColor = 'var(--secondary-color)'; const button = document.createElement('button'); button.textContent = name; button.className = 'px-4 py-2 text-sm'; button.addEventListener('click', () => loadPrizeTemplate(name)); const deleteBtn = document.createElement('button'); deleteBtn.textContent = '✕'; deleteBtn.className = 'px-2 py-2 text-sm'; deleteBtn.style.color = 'var(--danger-color)'; deleteBtn.addEventListener('click', (e) => { e.stopPropagation(); deletePrizeTemplate(name); }); container.appendChild(button); container.appendChild(deleteBtn); templateButtonsContainer.appendChild(container); } };

// --- CORE LOGIC FUNCTIONS ---
const playTenseMusic = () => { if (!isSoundOn) return; rollingSound.currentTime = 0; const playPromise = rollingSound.play(); if (playPromise !== undefined) { playPromise.catch(error => console.error("Error playing rolling sound:", error)); } };
const stopTenseMusic = () => { rollingSound.pause(); rollingSound.currentTime = 0; };
const playWinnerSound = () => { if (!isSoundOn) return; winnerSound.currentTime = 0; const playPromise = winnerSound.play(); if (playPromise !== undefined) { playPromise.catch(error => console.error("Error playing winner sound:", error)); } };
const toggleSound = () => { isSoundOn = !isSoundOn; soundToggleBtn.textContent = isSoundOn ? '🔊' : '🔇'; if(!isSoundOn) { stopTenseMusic(); } };
const switchTab = (tabName) => {
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
};
const switchEnvTab = (tabName) => { const tabs = { mode: { btn: tabModeBtn, content: tabContentMode }, title: { btn: tabTitleBtn, content: tabContentTitle }, prize: { btn: tabPrizeBtn, content: tabContentPrize }, theme: { btn: tabThemeBtn, content: tabContentTheme }, visual: { btn: tabVisualBtn, content: tabContentVisual }, sound: { btn: tabSoundBtn, content: tabContentSound }, effect: { btn: tabEffectBtn, content: tabContentEffect } }; Object.values(tabs).forEach(tab => { tab.btn.classList.remove('active'); tab.content.classList.add('hidden'); }); tabs[tabName].btn.classList.add('active'); tabs[tabName].content.classList.remove('hidden'); };
const handleSimpleDrawToggle = (e) => { const isEnabled = e.target.checked; if (isEnabled) { tabPrizeBtn.classList.add('hidden'); if (tabPrizeBtn.classList.contains('active')) { switchEnvTab('mode'); } } else { tabPrizeBtn.classList.remove('hidden'); } localStorage.setItem('simpleDrawMode', isEnabled); };
const addPrizeRow = (name = '', quantity = 1) => { const row = document.createElement('div'); row.className = 'prize-row flex items-center gap-2'; row.innerHTML = ` <input type="text" class="prize-name form-input w-full p-2 rounded" value="${name}" placeholder="獎項名稱"> <input type="number" class="prize-quantity form-input w-24 p-2 rounded" value="${quantity}" min="1" placeholder="數量"> <button class="remove-prize-btn btn-secondary px-3 py-2 rounded" style="color: var(--danger-color);">✕</button> `; prizesContainer.appendChild(row); row.querySelector('.remove-prize-btn').addEventListener('click', () => row.remove()); };
const clearPrizes = () => { prizesContainer.innerHTML = ''; };
const handleUrlParams = () => { const params = new URLSearchParams(window.location.search); if (params.has('sheetUrl') && params.has('sheetName') && params.has('column')) { sheetUrlInput.value = params.get('sheetUrl'); sheetNameInput.value = params.get('sheetName'); columnLetterInput.value = params.get('column'); handleLoadData(); } };
const readAndValidatePrizes = () => { prizes = []; const isSimpleMode = simpleDrawToggle.checked; if (isSimpleMode) { return true; } const prizeRows = prizesContainer.querySelectorAll('.prize-row'); if (prizeRows.length === 0) { return true; } let totalPrizeQuantity = 0; for (const row of prizeRows) { const name = row.querySelector('.prize-name').value.trim(); const quantity = parseInt(row.querySelector('.prize-quantity').value, 10); if (!name) { updateStatus('獎項名稱不可為空！', true); return false; } if (isNaN(quantity) || quantity < 1) { updateStatus(`獎項「${name}」的數量必須是正整數！`, true); return false; } prizes.push({ name, quantity, winners: [] }); totalPrizeQuantity += quantity; } if (participants.length > 0 && totalPrizeQuantity > participants.length) { updateStatus(`警告：獎項總數 (${totalPrizeQuantity}) 大於參與人數 (${participants.length})！`, true); } return true; };

const handleLoadData = async () => {
    loadButton.disabled = true;
    updateStatus('正在處理名單...');
    if (activeDataSource === 'cloud') {
        await loadFromCloud();
    } else if (activeDataSource === 'csv') {
        await loadFromPublishedCsv();
    } else {
        loadFromCustomInput();
    }
};

const finalizeDataLoading = (rawList) => {
    // --- 第一階段：執行排除名單過濾 ---
    const excludeRaw = excludeListInput.value;
    const excludeNamesArr = excludeRaw.split(/[,，\n]+/).map(name => name.trim()).filter(name => name.length > 0);
    const excludeNames = new Set(excludeNamesArr);
    
    const filteredList = rawList.filter(name => !excludeNames.has(name));
    pendingParticipants = filteredList;
    
    if (filterDuplicatesToggle.checked) {
        const counts = {};
        pendingParticipants.forEach(name => { counts[name] = (counts[name] || 0) + 1; });
        const duplicates = Object.entries(counts).filter(([name, count]) => count > 1);
        if (duplicates.length > 0) { showDuplicatesModal(duplicates); return; }
    }

    participants = [...pendingParticipants];
    if (participants.length > 0 && readAndValidatePrizes()) {
        updateStatus(`成功載入 ${participants.length} 位參與者！` + (excludeNames.size ? ` (已排除 ${rawList.length - filteredList.length} 人)` : ''), false);
        switchToLotteryView();
    } else {
        if (participants.length === 0) updateStatus(`載入的名單中沒有有效的名字。`, true);
        loadButton.disabled = false;
    }
};

const showDuplicatesModal = (duplicates) => {
    duplicatesList.innerHTML = '';
    duplicates.forEach(([name, count]) => {
        const item = document.createElement('div');
        item.className = 'duplicate-item';
        item.innerHTML = `<span>${name}</span><span class="duplicate-count">${count} 次</span>`;
        duplicatesList.appendChild(item);
    });
    duplicatesModal.classList.remove('hidden');
};

const handleDuplicateAction = (action) => {
    const counts = {};
    pendingParticipants.forEach(name => { counts[name] = (counts[name] || 0) + 1; });
    const duplicateNames = new Set(Object.entries(counts).filter(([name, count]) => count > 1).map(([name, count]) => name));

    if (action === 'deleteAll') { participants = pendingParticipants.filter(name => !duplicateNames.has(name)); } 
    else if (action === 'keepOne') { participants = [...new Set(pendingParticipants)]; }

    duplicatesModal.classList.add('hidden');
    if (participants.length > 0 && readAndValidatePrizes()) {
        updateStatus(`處理完畢！最終載入 ${participants.length} 位參與者。`, false);
        switchToLotteryView();
    } else {
        updateStatus(`名單處理後已無有效人名。`, true);
        loadButton.disabled = false;
    }
};

const loadFromCustomInput = () => { 
    const rawList = customListInput.value.split(/[,，\n]+/).map(name => name.trim()).filter(name => name.length > 0);
    finalizeDataLoading(rawList);
};

const loadFromCloud = async () => {
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
        const columnIndex = columnLetter.charCodeAt(0) - 'A'.charCodeAt(0);
        const rawList = csvText.split('\n').slice(1).map(row => {
            const columns = row.split(',').map(cell => cell.trim().replace(/^"|"$/g, ''));
            return columns[columnIndex] || null;
        }).filter(name => name && name.length > 0);
        if (rawList.length > 0) { finalizeDataLoading(rawList); } 
        else { updateStatus(`在 ${columnLetter} 欄找不到任何資料，請確認工作表與欄位名稱。`, true); loadButton.disabled = false; }
    } catch (error) {
        console.error('讀取共用連結時發生錯誤:', error);
        updateStatus('讀取失敗！請檢查網址是否正確，以及網路連線。', true);
        loadButton.disabled = false;
    }
};

const loadFromPublishedCsv = async () => {
    const url = csvUrlInput.value.trim();
    if (!url) { updateStatus('請輸入「發布到網路」的 CSV 網址！', true); loadButton.disabled = false; return; }
    if (!url.includes('/pub?gid=') || !url.includes('output=csv')) { updateStatus('網址格式錯誤！請確認是「發布到網路」並選擇 CSV 格式的網址。', true); loadButton.disabled = false; return; }
    const columnLetter = csvColumnLetterInput.value.trim().toUpperCase();
    const columnIndex = columnLetter.charCodeAt(0) - 'A'.charCodeAt(0);
    updateStatus(`正在從發布的連結讀取名單 (${columnLetter}欄)...`);
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`網路回應錯誤: ${response.statusText}`);
        const csvText = await response.text();
        const rawList = csvText.split('\n').map(row => {
            const columns = row.split(',');
            return columns[columnIndex] ? columns[columnIndex].trim().replace(/^"|"$/g, '') : null;
        }).filter(name => name && name.length > 0);
        if (rawList.length > 0) { finalizeDataLoading(rawList); } 
        else { updateStatus(`在指定的 CSV 網址 (${columnLetter}欄) 中找不到任何資料。`, true); loadButton.disabled = false; }
    } catch (error) {
        console.error('讀取發布的 CSV 時發生錯誤:', error);
        updateStatus('讀取失敗！請檢查網址是否正確，以及網路連線。', true);
        loadButton.disabled = false;
    }
};

const handleDrawWinner = () => {
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

    const currentPrize = prizes[currentPrizeIndex];
    if (!currentPrize) return;

    // 計算批次抽取人數
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
                winnerDisplay.style.fontSize = "4rem";
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
                winnerDisplay.style.fontSize = "4rem";
            } else {
                winnerDisplay.innerHTML = `<div class="text-2xl mb-2">恭喜得獎者：</div><div class="flex flex-wrap justify-center gap-2 text-xl">${winnersThisBatch.map(name => `<span class="px-3 py-1 rounded bg-white/20">${name}</span>`).join('')}</div>`;
                winnerDisplay.style.fontSize = "1.5rem";
            }

            if (selectedEffect === 'spotlight') { winnerDisplay.classList.add('effect-spotlight'); } 
            else { winnerDisplay.classList.add('winner-reveal'); }
            
            playWinnerSound();
            launchConfetti();
            updateParticipantCount();
            updateWinnersList();
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
};

const setupThemes = () => {
    const themeContainer = document.getElementById('theme-selector');
    themeContainer.innerHTML = '';
    themes.forEach(theme => {
        const button = document.createElement('button');
        button.className = 'theme-button';
        button.title = theme.name;
        button.dataset.theme = theme.id;
        button.style.background = `linear-gradient(45deg, ${theme.colors[0]}, ${theme.colors[1]})`;
        button.addEventListener('click', () => { applyTheme(theme.id); });
        themeContainer.appendChild(button);
    });
};

const applyTheme = (themeId) => {
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    if (themeId !== 'izakaya') { document.body.classList.add(`theme-${themeId}`); }
    localStorage.setItem('lotteryTheme', themeId);
    document.querySelectorAll('.theme-button').forEach(btn => { btn.classList.toggle('active', btn.dataset.theme === themeId); });
};

const loadTheme = () => { const savedTheme = localStorage.getItem('lotteryTheme') || 'candy'; applyTheme(savedTheme); };
const updateStatus = (message, isError = false) => { statusMessage.textContent = message; statusMessage.style.color = isError ? 'var(--danger-color)' : 'var(--accent-color)'; };

const switchToLotteryView = () => {
    settingsSection.classList.add('hidden');
    lotterySection.classList.remove('hidden');
    resetBtn.classList.remove('hidden');
    const isSimpleMode = simpleDrawToggle.checked;
    if (isSimpleMode) {
        if (prizes.length === 0) { prizes = [{ name: '抽出名單', quantity: participants.length, winners: [] }]; }
        participantLabel.textContent = '未中籤人數';
    } else {
        participantLabel.textContent = '剩餘摸彩人數';
    }
    updateParticipantCount(); updatePrizeDisplay(); saveSession();
};

const adjustPrizeNameFontSize = () => {
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
};

const updatePrizeDisplay = () => {
    const isSimpleMode = simpleDrawToggle.checked;
    const allPrizesDrawn = prizes.every(p => p.winners.length >= p.quantity);
    if (allPrizesDrawn) {
        if (isSimpleMode) { currentPrizeDisplay.textContent = '所有人都已抽出！'; drawButton.textContent = '結束'; } 
        else { currentPrizeDisplay.textContent = '所有項目已抽完！'; drawButton.textContent = '抽獎結束'; }
        drawButton.disabled = false; exportCsvBtn.classList.remove('hidden'); updateWinnersList(); return;
    }
    const currentPrize = prizes[currentPrizeIndex];
    if (isSimpleMode) { currentPrizeDisplay.textContent = '幸運的你'; } 
    else {
        const progress = `${currentPrize.winners.length} / ${currentPrize.quantity}`;
        currentPrizeDisplay.textContent = `正在抽取: ${currentPrize.name} (${progress})`;
    }
    if (currentPrize.winners.length >= currentPrize.quantity) {
        const nextPrize = prizes.find((p, index) => index > currentPrizeIndex && p.winners.length < p.quantity);
        drawButton.textContent = nextPrize ? `繼續抽「${nextPrize.name}」` : '抽獎結束';
    } else {
        if (isSimpleMode) { drawButton.textContent = '抽籤'; } 
        else {
            if (winnerDisplay.textContent.includes('準備補抽')) { drawButton.textContent = '開始補抽'; } 
            else { drawButton.textContent = buttonPhrases[Math.floor(Math.random() * buttonPhrases.length)]; }
        }
    }
};

const updateParticipantCount = () => { participantCountSpan.textContent = participants.length; };

const handleRedraw = (prizeIndex, winnerIndex) => {
    const prize = prizes[prizeIndex];
    if (!prize) return;
    const winnerToRedraw = prize.winners.splice(winnerIndex, 1)[0];
    if (!winnerToRedraw) return;
    participants.push(winnerToRedraw.name);
    currentPrizeIndex = prizeIndex;
    drawButton.disabled = false;
    winnerDisplay.textContent = '準備補抽！';
    winnerDisplay.style.fontSize = "4rem";
    exportCsvBtn.classList.add('hidden');
    updateParticipantCount(); updateWinnersList(); updatePrizeDisplay(); saveSession();
};

const updateWinnersList = () => {
    const isSimpleMode = simpleDrawToggle.checked;
    const hasAnyWinners = prizes.some(p => p.winners.length > 0);
    const allPrizesDrawn = prizes.every(p => p.winners.length >= p.quantity);
    if (hasAnyWinners) { winnersListContainer.classList.remove('hidden'); mainDrawPanel.classList.remove('md:w-full'); mainDrawPanel.classList.add('md:w-[70%]'); } 
    else { return; }
    winnersList.innerHTML = '';
    const createWinnerTag = (winner, prizeIndex, winnerIndex) => {
        const winnerTagContainer = document.createElement('div');
        winnerTagContainer.className = 'winner-tag px-2 py-1 rounded-md flex items-center justify-between';
        const winnerNameSpan = document.createElement('span');
        winnerNameSpan.textContent = winner.name;
        winnerNameSpan.className = 'truncate cursor-pointer';
        winnerNameSpan.addEventListener('click', () => {
            winner.claimed = !winner.claimed;
            winnerTagContainer.classList.toggle('claimed', winner.claimed);
            saveSession();
        });
        if (winner.claimed) { winnerTagContainer.classList.add('claimed'); }
        winnerTagContainer.appendChild(winnerNameSpan);
        if (allPrizesDrawn && !isSimpleMode) {
            const redrawBtn = document.createElement('button');
            redrawBtn.className = 'redraw-btn'; redrawBtn.innerHTML = '⟲'; redrawBtn.title = '棄權補抽';
            redrawBtn.addEventListener('click', (e) => { e.stopPropagation(); handleRedraw(prizeIndex, winnerIndex); });
            winnerTagContainer.appendChild(redrawBtn);
        }
        return winnerTagContainer;
    };
    if (isSimpleMode) {
        document.getElementById('winners-list-title').textContent = '已抽出名單';
        const winnerNames = document.createElement('div');
        winnerNames.className = 'grid grid-cols-2 gap-x-4 gap-y-2 mt-2 text-base';
        prizes[0].winners.forEach((winner, index) => { winnerNames.appendChild(createWinnerTag(winner, 0, index)); });
        winnersList.appendChild(winnerNames);
    } else {
        document.getElementById('winners-list-title').textContent = '🎉 得獎名單 🎉';
        prizes.forEach((prize, prizeIndex) => {
            if (prize.winners.length > 0) {
                const prizeContainer = document.createElement('div');
                prizeContainer.innerHTML = `<h4 class="font-bold text-lg" style="color: var(--accent-color);">${prize.name} (${prize.winners.length}/${prize.quantity})</h4>`;
                const winnerNames = document.createElement('div');
                winnerNames.className = 'grid grid-cols-2 gap-x-4 gap-y-2 mt-2 text-base';
                prize.winners.forEach((winner, winnerIndex) => { winnerNames.appendChild(createWinnerTag(winner, prizeIndex, winnerIndex)); });
                prizeContainer.appendChild(winnerNames);
                winnersList.appendChild(prizeContainer);
            }
        });
    }
};

const exportResultsToCsv = () => {
    const isSimpleMode = simpleDrawToggle.checked;
    // 修正標頭：增加「領取獎項」
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
};

const resetApp = () => {
    settingsSection.classList.remove('hidden'); lotterySection.classList.add('hidden'); resetBtn.classList.add('hidden');
    participants = []; prizes = []; currentPrizeIndex = 0;
    winnerDisplay.textContent = '準備開始！'; winnerDisplay.classList.remove('winner-reveal');
    winnerDisplay.style.fontSize = "4rem";
    winnersList.innerHTML = ''; winnersListContainer.classList.add('hidden');
    mainDrawPanel.classList.remove('md:w-[70%]'); mainDrawPanel.classList.add('md:w-full');
    exportCsvBtn.classList.add('hidden'); participantCountSpan.textContent = '0';
    currentPrizeDisplay.textContent = ''; mainTitle.textContent = titleInput.value.trim() || 'ㄚ亮笑長的抽抽樂';
    participantLabel.textContent = '剩餘摸彩人數'; drawButton.textContent = '開始摸彩'; drawButton.disabled = false;
    sheetUrlInput.value = ''; sheetNameInput.value = '工作表1'; columnLetterInput.value = 'A';
    csvUrlInput.value = ''; csvColumnLetterInput.value = 'A'; customListInput.value = ''; excludeListInput.value = '';
    prizesContainer.innerHTML = ''; addPrizeRow('三獎', 3); addPrizeRow('二獎', 2); addPrizeRow('頭獎', 1);
    loadButton.disabled = false; updateStatus(''); switchTab('custom'); clearSession();
};

const launchConfetti = () => {
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
};

init();