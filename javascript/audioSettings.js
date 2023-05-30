/*****************************
 * This Javascript file is used to change audio settings and save the settings globally
 * Also used to open and close the settingsMenu and tower overlay
 *****************************/
let settingsMenu = document.getElementById('wrapper')
let innerSettingsMenu = document.getElementById('settingsMenu')
let towerOverlay = document.getElementById('towerOverlay')

/** Initialize Audio Variable **/
if(!localStorage['BioDefender-Audio']){
    let audio = {
        "background": 100,
        "sfx": 100
    }

    localStorage['BioDefender-Audio'] = JSON.stringify(audio);
}

/** Initialize Box Variables */
let savedAudio = JSON.parse(localStorage['BioDefender-Audio'])

let backgroundSlider = document.getElementById('backgroundSlide')
let SFXSlider = document.getElementById('SFXSlide')
let backgroundValueDisplay = document.getElementById('backgroundValueDisplay')
let SFXValueDisplay = document.getElementById('SFXValueDisplay')

let backgroundSlideValue = savedAudio.background;
let SFXSlideValue = savedAudio.sfx;

backgroundSlider.value = savedAudio.background
SFXSlider.value = savedAudio.sfx

backgroundValueDisplay.innerHTML = `${backgroundSlideValue}%`
SFXValueDisplay.innerHTML = `${SFXSlideValue}%`

/** Initialize Tower Overlay Boxes */
let allTowerBox = document.getElementById('towerGrid')
let towerNameBox = document.getElementById('towerName')
let towerXPBox = document.getElementById('towerXP')
let upgradeRowBox1 = document.getElementById('upgrades1')
let upgradeRowBox2 = document.getElementById('upgrades2')
let descriptionBox = document.getElementById('upgradeDescription')


/**** React to audio slider value changes ****/
backgroundSlider.oninput = function(){
    backgroundSlideValue = backgroundSlider.value
    backgroundValueDisplay.innerHTML = `${backgroundSlideValue}%`
    updateAudioToLocalStorage()

    //backgroundaudio.volume = backgroundSlideValue/100    // -- doesnt exist yet
}

SFXSlider.oninput = function(){
    SFXSlideValue = SFXSlider.value
    SFXValueDisplay.innerHTML = `${SFXSlideValue}%`
    updateAudioToLocalStorage()
    
    //updateSFXAudios()         //Function, because there are more than one sfx audio
}

function updateAudioToLocalStorage(){
    let audio = {
        "background": backgroundSlideValue,
        "sfx": SFXSlideValue
    }

    localStorage['BioDefender-Audio'] = JSON.stringify(audio);
}


/*** Open and close settings overlays ****/
let paused = false;
let closeable = true;
function openSettingsMenu(){
    if(closeable){          // check if animation is playing
        closeable = false;

        settingsMenu.style.display = "flex"
        settingsMenu.style.animation = "1s fadeIn"
        innerSettingsMenu.style.animation = "1s scaleUp"

        setTimeout(() => {
            closeable = true;
            innerSettingsMenu.style.animation = "Placeholder"
            settingsMenu.style.animation = "Placeholder"
        }, 1010);

        paused = true;
    }
}

function closeSettingsMenu(){
    if(closeable){
        closeable = false

        settingsMenu.style.animation = "1s reverse fadeIn"
        innerSettingsMenu.style.animation = "1s reverse scaleUp"

        setTimeout(() => {
            closeable = true;
            settingsMenu.style.display = "none"
            settingsMenu.style.animation = "Placeholder"
            innerSettingsMenu.style.animation = "Placeholder"
            paused = false;
        }, 990);
    }
}

/*** Open and close tower overlay ****/
let towerOverlayOpened = false;
let towerOverlayAnimationPlaying = false
function openTowerOverlay(){    
    if(!towerOverlayAnimationPlaying){
        loadTowerInfo(0)
        towerOverlay.style.animation = ""
        towerOverlayAnimationPlaying = true
        setTimeout(() => {
            towerOverlay.style.animation = "0.8s slideFromTop"
            towerOverlay.style.display = "grid"
        }, 50);
        setTimeout(() => {
            towerOverlay.style.animation = ""
            towerOverlayOpened = true
            towerOverlayAnimationPlaying = false
        }, 800);
    }
}

function closeTowerOverlay(){
    if(!towerOverlayAnimationPlaying){
        towerOverlay.style.animation = ""
        towerOverlayAnimationPlaying = true
        setTimeout(() => {
            towerOverlay.style.animation = "0.8s reverse slideFromTop"
        }, 50);
        setTimeout(() => {
            towerOverlay.style.animation = ""
            towerOverlay.style.display = "none"
            towerOverlayOpened = false
            towerOverlayAnimationPlaying = false
        }, 800);
    }
}


loadAllTowerInfo()
function loadAllTowerInfo(){
    let string = ""
    for (let i = 0; i < towerInfo.length; i++) {
        string += `<div class="towerPreview" onclick="loadTowerInfo(${i})"><img src="${towerInfo[i].image}"></div>`
    }
    loadTowerInfo(0)
    allTowerBox.innerHTML = string;
}

function loadTowerInfo(index){
    towerNameBox.innerHTML = towerInfo[index].name
    towerXPBox.innerHTML = xp[index] + " XP"
    descriptionBox.innerHTML = towerInfo[index].description
    let string = ""
    for (let i = 0; i < 3; i++) {
        let unlockedClass = " unlocked"
        if(checkIfUpgradeUnlockable(index, i) == 1){
            unlockedClass = "unlockable"
        }
        else if(checkIfUpgradeUnlockable(index, i) == -1){
            unlockedClass = "notUnlockable"
        }
        string += `<div class="upgrade ${unlockedClass}" onclick="loadUpgradeinfo(${index},${i});selectUpgrade(${index},${i})"><p>${formatNumberToString(upgrades[index][i].xpToUnlock)} XP</p></div>`
        if(i < 2){
            string += `<div class="path-Arrow"></div>`
        }
    }
    upgradeRowBox1.innerHTML = string
    
    string = ""
    for (let i = 3; i < 6; i++) {
        let unlockedClass = " unlocked"
        if(checkIfUpgradeUnlockable(index, i) == 1){
            unlockedClass = "unlockable"
        }
        else if(checkIfUpgradeUnlockable(index, i) == -1){
            unlockedClass = "notUnlockable"
        }
        string += `<div class="upgrade ${unlockedClass}" onclick="loadUpgradeinfo(${index},${i});selectUpgrade(${index},${i})"><p>${formatNumberToString(upgrades[index][i].xpToUnlock)} XP</p></div>`
        if(i < 5){
            string += `<div class="path-Arrow"></div>`
        }
    }
    upgradeRowBox2.innerHTML = string
}

function loadUpgradeinfo(index, i){
    descriptionBox.innerHTML = upgrades[index][i].description
}

function checkIfUpgradeUnlockable(shopTowerIndex, upgradeIndex){
    if(upgradesUnlocked[shopTowerIndex][upgradeIndex]){
        return 0;
    }
    if(upgradeIndex == 0 || upgradeIndex == 3){
        if(xp[shopTowerIndex] >= upgrades[shopTowerIndex][upgradeIndex].xpToUnlock){
            return 1;
        }
        else{
            return -1;
        }
    }
    if(upgradesUnlocked[shopTowerIndex][upgradeIndex-1]){
        if(xp[shopTowerIndex] >= upgrades[shopTowerIndex][upgradeIndex].xpToUnlock){
            return 1;
        }
        else{
            return -1;
        }
    }
    return -1;
}

/**
 * Returns the given number as a formated cash string (xxx.xxx.xxx)
 * @param {number} amount 
 * @returns formated string
 */
function formatNumberToString(amount){
    let string = amount
    if(amount >= 1000000){         //Million
        let thousands = Math.floor(amount%1000000/1000)
        let hundreds = amount % 1000
        if(thousands < 10){
            thousands = `00${thousands}`
        }
        else if(thousands < 100){
            thousands = `0${thousands}`
        }
        if(hundreds < 10){
            hundreds = `00${hundreds}`
        }
        else if(hundreds < 100){
            hundreds = `0${hundreds}`
        }
        string = `${Math.floor(amount/1000000)}.${thousands}.${hundreds}`
    }
    else if(amount >= 1000){    //Thousnad
        hundreds = amount%1000
        if(hundreds < 10){
            hundreds = `00${hundreds}`
        }
        else if(hundreds < 100){
            hundreds = `0${hundreds}`
        }
        string = `${Math.floor(amount/1000)}.${hundreds}`
    }
    return string;
}
