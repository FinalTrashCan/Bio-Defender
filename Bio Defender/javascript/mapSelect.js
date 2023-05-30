/***************************
 * This JS File is used to pass variables to the game.html page (for example: change map)      (TODO)
 ***************************/

let surface = document.getElementById('surface')
window.onresize = resizeSurface

resizeSurface()
function resizeSurface(){
    // resize the surface if the window size of the website changes
    surface_scale = (window.innerWidth / surface.clientWidth)
    surface.style.transform = `scale(${surface_scale})`;
}

/***** React to key presses ****/
document.onkeyup = keyup_detected;

function keyup_detected(e){
    if (!e){
        e = window.event; //Internet Explorer
    }
    if (e.keyCode == 27 && !towerOverlayOpened && !mapPreviewOverlayOpened){ // ESC Key
        if(settingsMenu.style.display == "flex"){
            closeSettingsMenu()
        }
        else{
            openSettingsMenu()
        }
    }
    else if(e.keyCode == 27 && mapPreviewOverlayOpened){
        closeMapPreviewOverlay()
    }
    else if(e.keyCode == 27 && towerOverlayOpened){
        closeTowerOverlay()
    }
}


/*** change map and Difficulty */
if(!localStorage['BioDefender_mapAndDifficulty']){
    let mapInfo = {
        "map": "lungs",
        "difficulty": "medium",
        "cash": 200,
        "lives": 100
    }
    localStorage['BioDefender_mapAndDifficulty'] = JSON.stringify(mapInfo)
}
let mapInfo = JSON.parse(localStorage['BioDefender_mapAndDifficulty'])


let mapPreview = document.getElementById('mapPreview')
let mapName = document.getElementById('mapName')
let mapMoney = document.getElementById('mapMoney')
let mapLives = document.getElementById('mapLives')

let mapPreviewOverlayOpened = false
let mapPreviewGrid = document.getElementById('mapPreviewGrid')

function openMapPreviewOverlay(){
    mapPreviewOverlayOpened = true
    let animation = anime({
        targets: '#mapPreviewGrid',
        scale: 1,
        duration: 800,
        delay: 800,
        easing: 'easeInOutQuad',
    })
}

function closeMapPreviewOverlay(){
    mapPreviewOverlayOpened = false 
    let animation = anime({
        targets: '#mapPreviewGrid',
        scale: 0,
        duration: 800,
        easing: 'easeInOutQuad',
    }) 
    let animation2 = anime({
        targets: '#buttonsAndMapsContainer',
        translateX: 0,
        scale: 1,
        bottom: 0,
        duration: 1000,
        delay: 600,
        easing: 'easeInOutQuad',
    })
}


function changeMap(map){
    openMapPreviewOverlay();
    mapInfo.map = map
    mapName.innerHTML = map
    if(map == "Lungs"){
        mapPreview.src = "./img/lungsMap.png"
    }
    else if(map == "Stomach"){
        mapPreview.src = "./img/stomachMap.jpg"
    }
    else if(map == "Colon"){
        mapPreview.src = "./img/colonMap.jpg"
    }
    else{
        mapPreview.src = "./img/MapTest.jpg"
    }
    localStorage['BioDefender_mapAndDifficulty'] = JSON.stringify(mapInfo)
}

function changeDifficulty(difficulty){
    mapInfo.difficulty = difficulty
    if(difficulty == "easy"){
        mapInfo.cash = 300
        mapInfo.lives = 150
    }
    else if(difficulty == "medium"){
        mapInfo.cash = 200
        mapInfo.lives = 100
    }
    else{
        mapInfo.cash = 100
        mapInfo.lives = 50
    }
    mapMoney.innerHTML = mapInfo.cash + " $"
    mapLives.innerHTML = mapInfo.lives
    localStorage['BioDefender_mapAndDifficulty'] = JSON.stringify(mapInfo)
}


function openGame(){
    //apply animations

    window.open('./game.html', '_self')
}

function animateMapPreview(target){
    if(target == "Lungs"){
        let animation = anime({
            targets: '#buttonsAndMapsContainer',
            translateX: 250,
            scale: 1.9,
            bottom: -20,
            duration: 1000,
            easing: 'easeInOutQuad',
        })
    }
    else if(target == "Stomach"){
        let animation = anime({
            targets: '#buttonsAndMapsContainer',
            translateX: 250,
            scale: 1.9,
            bottom: 200,
            duration: 1000,
            easing: 'easeInOutQuad',
        })
    }
    else if(target == "Colon"){
        let animation = anime({
            targets: '#buttonsAndMapsContainer',
            translateX: 250,
            scale: 1.9,
            bottom: 247,
            duration: 1000,
            easing: 'easeInOutQuad',
        })
    }
}
