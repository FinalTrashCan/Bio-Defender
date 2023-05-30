/*****************************
 * This Javascript file calls the gameloop function
 *****************************/
let surface = document.getElementById('surface')
let enemy_container = document.getElementById('enemy-container')
let tower_container = document.getElementById('tower-container')
let range_container = document.getElementById('range-container')
let upgradeBox_container = document.getElementById('upgradeBox-container')
let projectile_container = document.getElementById('projectile-container')
let damage_indicater_container = document.getElementById('damage-indicater-container')
let upgradeInfoBox_container = document.getElementById('upgradeInfo-container')

let cash_display = document.getElementById('cash')
let live_display = document.getElementById('lives')

let towerRange = document.getElementById('tower-preview-range')
let tower = document.getElementById('tower')

let towerHeight = 50;
let towerWidth = 50;

surface.style.display = "block"
let surface_scale

let trackWidth = 40;

let track = [
    {"x": 0, "y": 180},
    {"x": 535, "y": 100},
    {"x": 535, "y": 15},
    {"x": 345, "y": 15},
    {"x": 345, "y": 465},
    {"x": 165, "y": 465},
    {"x": 165, "y": 300},
    {"x": 690, "y": 300},
    {"x": 690, "y": 120},
    {"x": 825, "y": 120},
    {"x": 825, "y": 410},
    {"x": 485, "y": 410},
    {"x": 485, "y": 580}
]

let towers = []
let ranges = []

let enemys = []

let selectedTower = {"index": -1}

/****************
 * GAME CONFIG
 ****************/
if(!localStorage['BioDefender_mapAndDifficulty']){
    let mapInfo = {
        "map": "Lungs",
        "difficulty": "medium",
        "cash": 200,
        "lives": 100
    }
    localStorage['BioDefender_mapAndDifficulty'] = JSON.stringify(mapInfo)
}
let mapInfo = JSON.parse(localStorage['BioDefender_mapAndDifficulty'])

/** MAP INFO**/
if(mapInfo.map ==  "Lungs"){
    surface.style.backgroundImage = "url('./img/lungsMap.png')"
    trackWidth = 30;
    track = [
        {"x": 470, "y": -40},
        {"x": 455, "y": 130},
        {"x": 450, "y": 137},
        {"x": 440, "y": 145},
        {"x": 366, "y": 188},
        {"x": 290, "y": 170},
        {"x": 273, "y": 172},
        {"x": 282, "y": 130},
        {"x": 273, "y": 172},
        {"x": 290, "y": 170},
        {"x": 350, "y": 182},
        {"x": 355, "y": 189},
        {"x": 347, "y": 198},
        {"x": 342, "y": 210},
        {"x": 301, "y": 265},
        {"x": 297, "y": 420},
        {"x": 301, "y": 265},
        {"x": 347, "y": 198},
        {"x": 455, "y": 133},
        {"x": 520, "y": 185},
        {"x": 590, "y": 212},
        {"x": 650, "y": 208},
        {"x": 680, "y": 230},
        {"x": 650, "y": 208},
        {"x": 590, "y": 212},
        {"x": 695, "y": 330},
        {"x": 710, "y": 380},
        {"x": 695, "y": 330},
        {"x": 590, "y": 212},
        {"x": 520, "y": 185},
        {"x": 455, "y": 133},
        {"x": 470, "y": -40},
    ]
}
else if(mapInfo.map == "Stomach"){
    surface.style.backgroundImage = "url('./img/stomachMap.jpg')"
    track = [
        {"x": 420, "y": -40},
        {"x": 450, "y": 40},
        {"x": 470, "y": 70},
        {"x": 500, "y": 100},
        {"x": 550, "y": 145},
        {"x": 700, "y": 230},
        {"x": 701, "y": 237},
        {"x": 706, "y": 245},
        {"x": 715, "y": 260},
        {"x": 717, "y": 290},
        {"x": 712, "y": 305},
        {"x": 704, "y": 320},
        {"x": 689, "y": 322},
        {"x": 670, "y": 318},
        {"x": 563, "y": 296},
        {"x": 550, "y": 300},
        {"x": 542, "y": 310},
        {"x": 537, "y": 328},
        {"x": 500, "y": 442},
        {"x": 489, "y": 448},
        {"x": 487, "y": 453},
        {"x": 482, "y": 458},
        {"x": 470, "y": 461},
        {"x": 430, "y": 457},
        {"x": 397, "y": 452},
        {"x": 300, "y": 400},
        {"x": 257, "y": 385},
        {"x": 220, "y": 386},
        {"x": 170, "y": 393},
        {"x": 130, "y": 405},
        {"x": 100, "y": 418},
        {"x": 70, "y": 460},
        {"x": 60, "y": 520},
    ]
}
else if(mapInfo.map == "Colon"){
    surface.style.backgroundImage = "url(./img/colonMap.jpg)"
    track = [
        {"x": 200, "y": 250},
        {"x": 200, "y": 80},

    ]
}

/** game modification */
let gameSpeed = 24;
let startingCash = mapInfo.cash;
let startingLives = mapInfo.lives;


let enemySpeedModifier = 1;
let enemyHealthModifier = 1;

if(mapInfo.difficulty == "easy"){
    enemySpeedModifier = 0.66;
    enemyHealthModifier = 0.85;
}
else if(mapInfo.difficulty == "hard"){
    enemySpeedModifier = 1.33;
    enemyHealthModifier = 1.15;
}



/************************************
 * EVENT LISTENER
 * **********************************/
document.onkeydown = keydown_detected;
document.onkeyup = keyup_detected;

function keydown_detected(e){
    if (!e){
        e = window.event; //Internet Explorer
    }
    if (e.keyCode == 37 || e.keyCode == 65){ // leftArrow 65
        
    }
}
function keyup_detected(e){
    if (!e){
        e = window.event; //Internet Explorer
    }
    if (e.keyCode == 27 && !towerOverlayOpened){ // ESC Key
        //opens and closes the settings Menu (Pausemenu)
        if(settingsMenu.style.display == "flex"){
            closeSettingsMenu()
        }
        else{
            openSettingsMenu()
        }
    }
    if(e.keyCode == 32){ // SPACE BAR
        if(!nextWaveSpawnable){
            //change the gamespeed
            if(gameSpeed == 24){
                gameSpeed = 40;
            }
            else{
                gameSpeed = 24;
            }
        }
        else{
            loadNextWave();
        }
    }
    if(e.keyCode == 8){  // BACKSPACE
        if(selectedTower.index != -1){
            sellTower(selectedTower.index)
            selectedTower.index = -1
        }
    }
}

/*
if(!Document.fullscreenElement){
    openSettingsMenu()
}*/

let mousePressed = false;

document.onmousedown = function(e){
    mousePressed = true;
}
document.onmouseup = function(e){
    mousePressed = false;
}

window.addEventListener('mousemove', (event) => {
    mousePos = { x: event.clientX, y: event.clientY }
    //console.log(`(${mousePos.x}, ${mousePos.y})`)
})

window.onresize = resizeSurface

resizeSurface()
function resizeSurface(){
    // resize the surface if the window size of the website changes
    surface_scale = (window.innerWidth / surface.clientWidth)
    surface.style.transform = `scale(${surface_scale})`;
}


/**************
 * GAME LOOP
 *************/
let cash = startingCash;
let lives = startingLives;
updateCashDisplay();
updateLiveDisplay();
let placing = false;
let currentTowerIndex = 1;

let count = 0;
let projectileCount = 0;

gameLoop()

function gameLoop(){
    if(!paused){            // Check if the game is paused
        count++;

        detectPlaceAttempt()
        
        if(enemys.length > 0){
            updateEnemysInRange()
            moveEnemys()
            detectIfProjectileWillBeSpawned()
        }
    }
    
    setTimeout(gameLoop, 1000/gameSpeed)
}

function detectPlaceAttempt(){
    // iterate through all possible towers
    for (let i = 0; i < shopTowerObjects.length; i++) {
        //move the towerpreview to mouseposition
        if(shopTowerObjects[i].mouseOver && mousePressed || shopTowerObjects[i].placing && mousePressed){
            let newTowerInfo = towerInfo[i]
            shopTowerObjects[i].placing = true;

            tower.style.display = "block";
            tower.style.backgroundImage = `url('${shopTowerObjects[i].image}')`
            tower.style.width = newTowerInfo.width + "px"
            tower.style.height = newTowerInfo.width + "px"
            tower.style.top = (mousePos.y/surface_scale - newTowerInfo.width/2) + "px"
            tower.style.left = (mousePos.x/surface_scale - newTowerInfo.width/2) + "px"
    
            towerRange.style.width = newTowerInfo.range + "px"
            towerRange.style.height = newTowerInfo.range + "px"
            towerRange.style.display = "block";
            towerRange.style.top = (mousePos.y/surface_scale - newTowerInfo.range/2) + "px"
            towerRange.style.left = (mousePos.x/surface_scale - newTowerInfo.range/2) + "px"
    
            //indicates if the current position is valid or not
            if(checkIfSpotIsValid()){
                towerRange.style.backgroundColor = "rgba(0, 0, 0, 0.4)"
            }
            else{
                towerRange.style.backgroundColor = "rgba(232, 34, 34, 0.4)"
            }
        }
        // position chosen
        else if(shopTowerObjects[i].placing){
            //check if position is valid
            if(checkIfSpotIsValid()){
                //check if player has enough money
                if(cash - towerInfo[i].cost >= 0){
                    cash -= towerInfo[i].cost
                    updateCashDisplay()

                    //tower preview invisible
                    tower.style.display = "none"
                    towerRange.style.display = "none"
                    //add tower and its range to surface
                    tower_container.innerHTML += `<div class="tower" id="tower${currentTowerIndex}" onclick="showRangeAndUpgradeBox(${currentTowerIndex})"></div>`
                    range_container.innerHTML += `<div class="range" id="range${currentTowerIndex}"></div>`
                    
                    let newTowerInfo = {
                        "id": 0,
                        "name": towerInfo[i].name,
                        "image": towerInfo[i].image,
                        "description": towerInfo[i].description,
                        "cost": towerInfo[i].cost,
                        "sellFor": Math.floor(towerInfo[i].cost*0.7),
                        "width": towerInfo[i].width,
                        "range": towerInfo[i].range,
                        "attack_speed": towerInfo[i].attack_speed,
                        "alreadyShot": towerInfo[i].alreadyShot,
                        "damage": towerInfo[i].damage,
                        "pierce": towerInfo[i].pierece,
                        "parasite_detection": towerInfo[i].parasite_detection,
                        "projectile_image": towerInfo[i].projectile_image,
                        "projectile_distance_to_tower": towerInfo[i].projectile_distance_to_tower,
                        "projectile_speed": towerInfo[i].projectile_speed,
                        "projectile_duration": towerInfo[i].projectile_duration,
                        "projectile_width": towerInfo[i].projectile_width,
                        "projectile_height": towerInfo[i].projectile_height,
                        "projectile_type": towerInfo[i].projectile_type,
                        "enemyList": [],
                        "first": {"distance": -1},
                        "count": 1,
                        "upgradeIndexTop": 0,
                        "upgradeIndexBottom": 3,
                    }

                    upgradeBox_container.innerHTML += `
                    <div class="upgradeBox" id="upgradeBox${currentTowerIndex}">
                        <div class="x-button" onclick="showRangeAndUpgradeBox(${currentTowerIndex})"></div>
                        <p class="towerName">${newTowerInfo.name}</p>
                        <div class="buyUpgradeGrid">
                            <div class="buyUpgrade" id="topUpgrade${currentTowerIndex}" onclick="buyUpgrade(${currentTowerIndex-1}, ${i}, 0, 'top')">
                                <h2>${upgrades[i][0].name}</h2>
                                <p>${formatNumberToString(upgrades[i][0].cost)} $</p>
                            </div>
                            <div class="buyUpgrade" id="bottomUpgrade${currentTowerIndex}" onclick="buyUpgrade(${currentTowerIndex-1}, ${i}, 3, 'bottom')">
                                <h2>${upgrades[i][3].name}</h2>
                                <p>${formatNumberToString(upgrades[i][3].cost)} $</p>
                            </div>
                        </div>
                        <p class="infoButton" onclick="requestUpgradeInfo(${currentTowerIndex-1}, ${i})">i</p>
                        <p class="sellAmount" id="sellFor${currentTowerIndex}">${formatNumberToString(newTowerInfo.sellFor)} $</p>
                        <p class="sellButton" onclick="sellTower(${currentTowerIndex})">SELL</p>
                    </div>`

                    upgradeInfoBox_container.innerHTML += `
                    <div class="upgradeInfoGrid" id="upgradeInfoBox${currentTowerIndex}">
                        <p id="topUpgradeInfo${currentTowerIndex}">${upgrades[i][0].description}</p>
                        <p id="bottomUpgradeInfo${currentTowerIndex}">${upgrades[i][3].description}</p>
                    </div>`
    
                    //modify tower
                    let newTower = document.getElementById(`tower${currentTowerIndex}`)
                    newTower.style.width = newTowerInfo.width + "px"
                    newTower.style.height = newTowerInfo.width + "px"
                    newTower.style.backgroundImage = `url('${newTowerInfo.image}')`
                    newTower.style.top = (mousePos.y/surface_scale - newTowerInfo.width/2) + "px"
                    newTower.style.left = (mousePos.x/surface_scale - newTowerInfo.width/2) + "px"
    
                    //modify range
                    let newRange = document.getElementById(`range${currentTowerIndex}`)
                    newRange.style.width = newTowerInfo.range + "px"
                    newRange.style.height = newTowerInfo.range + "px"
                    newRange.style.top = (mousePos.y/surface_scale - newTowerInfo.range/2) + "px"
                    newRange.style.left = (mousePos.x/surface_scale - newTowerInfo.range/2) + "px"


    
                    //save tower and range info
                    currentTowerIndex++;
                    towers.push(newTowerInfo)
                    ranges.push(newRange)
    
                    //reset the placing variable
                    shopTowerObjects[i].placing =  false;
                }
                //not enough money
                else{
                    //tower preview invisible
                    tower.style.display = "none"
                    towerRange.style.display = "none"

                    shopTowerObjects[i].placing = false;
                    console.log('cannot purchase')
                }
                
            }
            //position invalid
            else{
                //tower preview invisible
                tower.style.display = "none"
                towerRange.style.display = "none"

                shopTowerObjects[i].placing =  false;
                console.log('invalid position')
            }
        }
    }
}

/******************
 * Checks if the current position of the tower preview is valid
 * Returns false if the tower collides with the track or another tower
 ******************/
function checkIfSpotIsValid(){

    //check if position collides with another tower
    for (let i = 0; i < towers.length; i++) {
        let current = document.getElementById('tower' + (i+1))

        if(isColliding(current, tower, -15)){
            return false;
        }
    }

    let towerX = parseFloat(tower.style.left)
    let towerY = parseFloat(tower.style.top)

    // Check for collisions with track
    for (let i = 0; i < track.length - 1; i++) {
        let dx = track[i+1].x - track[i].x;
        let dy = track[i+1].y - track[i].y;
        let distance = Math.abs(dy * towerX - dx * towerY + track[i+1].x * track[i].y - track[i+1].y * track[i].x) / Math.sqrt(dx*dx + dy*dy);
        
        if (distance <= trackWidth && Math.min(track[i].x, track[i+1].x) - towerWidth <= towerX && towerX <= Math.max(track[i].x, track[i+1].x) + towerWidth && Math.min(track[i].y, track[i+1].y) - towerWidth <= towerY && towerY <= Math.max(track[i].y, track[i+1].y) + towerWidth) {
            return false;
        }
    }
    
    return true;
}

/*********
 * Shows the range of the given tower
 *********/
function showRangeAndUpgradeBox(index){
    //make range of last selected Tower invisible
    if(selectedTower.index != -1 && selectedTower.index != index){
        document.getElementById('range' + selectedTower.index).style.opacity = 0
        
        let animation = anime({
            targets: '#upgradeBox' + selectedTower.index,
            translateX: '100%',
            duration: 300,
            easing: 'easeInOutQuad'
        })

        let animation2 = anime({
            targets: '#upgradeInfoBox' + selectedTower.index,
            translateX: '100%',
            duration: 300,
            easing: 'easeInOutQuad'
        })
    }

    //make requested range visible
    if(selectedTower.index != index){
        let range = document.getElementById('range' + index)
        range.style.opacity = 1

        let animation = anime({
            targets: '#upgradeBox' + index,
            translateX: 0,
            duration: 300,
            easing: 'easeInOutQuad'
        })

        selectedTower.index = index
    }
    //if clicked on the selectedTower -> make range invisible
    else if(selectedTower.index != -1){
        document.getElementById('range' + selectedTower.index).style.opacity = 0
        
        let animation = anime({
            targets: '#upgradeBox' + index,
            translateX: '100%',
            duration: 300,
            easing: 'easeInOutQuad'
        })

        let animation2 = anime({
            targets: '#upgradeInfoBox' + index,
            translateX: '100%',
            duration: 300,
            easing: 'easeInOutQuad'
        })

        selectedTower.index = -1
    }
}

/************
 * Moves the enemys along the track
 ************/
function moveEnemys(){
    // iterate through all enemys
    for (let i = 0; i < enemys.length; i++) {
        let enemy = document.getElementById('enemy' + i)
        if(enemy.style.display != "none"){
            let angle = Math.atan2(track[enemys[i].currentIndex].y - enemys[i].y, track[enemys[i].currentIndex].x - enemys[i].x);

            enemys[i].x += Math.cos(angle) * enemys[i].speed
            enemys[i].y += Math.sin(angle) * enemys[i].speed

            //check if enemy has reached the next point of the track
            if (Math.abs(enemys[i].x - track[enemys[i].currentIndex].x) <= enemys[i].speed && 
                Math.abs(enemys[i].y - track[enemys[i].currentIndex].y) <= enemys[i].speed) {
                enemys[i].currentIndex++;
            }

            //enemy leaks
            if(enemys[i].currentIndex == track.length){
                enemy.style.display = "none"
                lives -= enemys[i].looseLives
                updateLiveDisplay()
                if(lives <= 0){
                    lives = 0;
                    console.log('Lost!')
                }
            }

            //increase distance to determine which enemy is the furthest
            enemys[i].distance += enemys[i].speed

            //apply changes
            enemy.style.left = enemys[i].x + "px"
            enemy.style.top = enemys[i].y + "px"
        }
    } 
}


/**
 * Checks which enemys are in a towers range. Also checks which enemy in range is the furthest on the track.
 */

function updateEnemysInRange(){
    //iterate through all towers
    for (let i = 0; i < towers.length; i++) {
        let current = document.getElementById('range' + (i+1))
        let list = []
        //check if enemys are in range
        for (let j = 0; j < enemys.length; j++) {
            let enemy = document.getElementById('enemy' + j)
           
            if(isColliding(enemy, current, -20)){
                list.push(enemys[j])
            }
        }
        towers[i].enemyList = list;

        //check whick enemy in range is the furthest
        let first = {"distance": -1};
        for (let j = 0; j < towers[i].enemyList.length; j++) {
             if(towers[i].enemyList[j].distance > first.distance){
                first = towers[i].enemyList[j]
             }
        }
        towers[i].first = first
    }
}


function updateCashDisplay(){
    let string = formatNumberToString(cash) + " $"
    cash_display.innerHTML = string
}
function updateLiveDisplay(){
    live_display.innerHTML = lives
}


/**
 * Checks intersection between two html elements
 * @param {HTMLElement} div1 - Reference to first html element 
 * @param {HTMLElement} div2 - Reference to second html element
 * @param {number} tolerance - Integer to change accuracy of collission (0: default, negative number: detect later, positive number: detect earlier) 
 * @returns {boolean} - true or false depending on collision
 */
function isColliding(div1, div2, tolerance = 0) {

    let d1OffsetTop = div1.offsetTop;
    let d1OffsetLeft = div1.offsetLeft; 
    let d1Height = div1.clientHeight;
    let d1Width = div1.clientWidth;
    let d1Top = d1OffsetTop + d1Height;
    let d1Left = d1OffsetLeft + d1Width;

    let d2OffsetTop = div2.offsetTop;
    let d2OffsetLeft = div2.offsetLeft; 
    let d2Height = div2.clientHeight;
    let d2Width = div2.clientWidth;
    let d2Top = d2OffsetTop + d2Height;
    let d2Left = d2OffsetLeft + d2Width;

    let distanceTop = d2OffsetTop - d1Top;
    let distanceBottom = d1OffsetTop - d2Top;
    let distanceLeft = d2OffsetLeft - d1Left;
    let distanceRight = d1OffsetLeft - d2Left;

    return !(tolerance < distanceTop || tolerance < distanceBottom || tolerance < distanceLeft || tolerance < distanceRight);
};

function isNotContained(array, element){
    for (let i = 0; i < array.length; i++) {
        if(array[i] == element){
            return false;
        }
    }
    return true;
}