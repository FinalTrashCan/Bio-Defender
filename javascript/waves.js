/*****************************
 * This Javascript file is used to save and spawn in the waves.
 * If one wave is beaten, the next one will spawn in.
 *****************************/
let currentWave = 0;
let enemyNumber = 0;

let wave1 = [
    {"delay": 0, "delayCount": 1, "amountCount": 0, "count": 1, "amount": 5, "frequency": 1.2, "speed": 7, "health": 1, "cash": 1, "looseLives": 1, "out": false, "first": true}
]
let wave2 = [
    {"delay": 0, "delayCount": 1, "amountCount": 0, "count": 1, "amount": 5, "frequency": 1, "speed": 7, "health": 1, "cash": 1, "looseLives": 1, "out": false, "first": true},
    {"delay": 6, "delayCount": 1, "amountCount": 0, "count": 1, "amount": 7, "frequency": 0.6, "speed": 7, "health": 1, "cash": 1, "looseLives": 1, "out": false}
]
let wave3 = [
    {"delay": 0, "delayCount": 1, "amountCount": 0, "count": 1, "amount": 10, "frequency": 1, "speed": 4, "health": 1, "cash": 1, "looseLives": 1, "out": false, "first": true},
    {"delay": 3, "delayCount": 1, "amountCount": 0, "count": 1, "amount": 7, "frequency": 1, "speed": 5, "health": 1, "cash": 1, "looseLives": 1, "out": false},
    {"delay": 7, "delayCount": 1, "amountCount": 0, "count": 1, "amount": 6, "frequency": 1, "speed": 7, "health": 1, "cash": 1, "looseLives": 1, "out": false}
]
let wave4 = [
    {"delay": 0, "delayCount": 1, "amountCount": 0, "count": 1, "amount": 8, "frequency": 0.8, "speed": 5, "health": 2, "cash": 2, "looseLives": 2, "out": false, "first": true},
    {"delay": 0, "delayCount": 1, "amountCount": 0, "count": 1, "amount": 10, "frequency": 1, "speed": 7, "health": 1, "cash": 1, "looseLives": 1, "out": false}
]
let wave5 = [
    {"delay": 0, "delayCount": 1, "amountCount": 0, "count": 1, "amount": 5, "frequency": 2, "speed": 6, "health": 3, "cash": 3, "looseLives": 3, "out": false, "first": true},
    {"delay": 5, "delayCount": 1, "amountCount": 0, "count": 1, "amount": 15, "frequency": 0.3, "speed": 12, "health": 0.2, "cash": 1, "looseLives": 1, "out": false},
]
let wave6 = [
    {"delay": 0, "delayCount": 1, "amountCount": 0, "count": 1, "amount": 7, "frequency": 1.5, "speed": 6, "health": 5, "cash": 5, "looseLives": 5, "out": false, "first": true},
]
let wave7 = [
    {"delay": 0, "delayCount": 1, "amountCount": 0, "count": 1, "amount": 1, "frequency": 1, "speed": 2, "health": 15, "cash": 1, "looseLives": 15, "out": false, "first": true},
    {"delay": 2, "delayCount": 1, "amountCount": 0, "count": 1, "amount": 12, "frequency": 0.8, "speed": 7, "health": 1, "cash": 1, "looseLives": 1, "out": false},
]
let wave8 = [
    {"delay": 0, "delayCount": 1, "amountCount": 0, "count": 1, "amount": 10, "frequency": 0.4, "speed": 3, "health": 1, "cash": 1, "looseLives": 1, "out": false, "first": true},
    {"delay": 4, "delayCount": 1, "amountCount": 0, "count": 1, "amount": 10, "frequency": 0.4, "speed": 5, "health": 1.5, "cash": 2, "looseLives": 2, "out": false},
    {"delay": 8, "delayCount": 1, "amountCount": 0, "count": 1, "amount": 10, "frequency": 0.4, "speed": 7, "health": 2, "cash": 2, "looseLives": 2, "out": false},
    {"delay": 12, "delayCount": 1, "amountCount": 0, "count": 1, "amount": 10, "frequency": 0.4, "speed": 9, "health": 2.5, "cash": 3, "looseLives": 3, "out": false},
]
let wave9 = [
    {"delay": 0, "delayCount": 1, "amountCount": 0, "count": 1, "amount": 5, "frequency": 4, "speed": 3, "health": 7, "cash": 7, "looseLives": 7, "out": false, "first": true},
    {"delay": 0, "delayCount": 1, "amountCount": 0, "count": 1, "amount": 80, "frequency": 0.2, "speed": 5, "health": 1, "cash": 1, "looseLives": 1, "out": false},
    {"delay": 6, "delayCount": 1, "amountCount": 0, "count": 1, "amount": 3, "frequency": 3, "speed": 2, "health": 8, "cash": 8, "looseLives": 8, "out": false},
]
let wave10 = [
    {"delay": 0, "delayCount": 1, "amountCount": 0, "count": 1, "amount": 10, "frequency": 0.6, "speed": 5, "health": 10, "cash": 20, "looseLives": 10, "out": false, "first": true},
]

let waves = [
    wave1, wave2, wave3, wave4, wave5, wave6, wave7, wave8, wave9, wave10
]


if(!localStorage['BioDefender_autoPlay']){
    localStorage['BioDefender_autoPlay'] = JSON.stringify(false)
}
let autoPlay = JSON.parse(localStorage['BioDefender_autoPlay'])
let nextWaveSpawnable = true

function loadNextWave(){
    if(currentWave < waves.length){
        nextWaveSpawnable = false
        spawnEnemys(waves[currentWave])
        currentWave++;
    }
    else{
        //Freeplay
        spawnEnemys(getRandomWave())
        currentWave++;
    }
}

function spawnEnemys(wave){
    if(!paused){
        let stillGoing = false;
        if (wave[0].first) {
            nextWavePending(wave)
            wave[0].first = false;
        }
        for (let i = 0; i < wave.length; i++) {
            if(!wave[i].out){
                if (wave[i].delayCount >= wave[i].delay * gameSpeed * (24 / gameSpeed)) {
                    if (wave[i].count >= wave[i].frequency * gameSpeed * (24 / gameSpeed)) {
                        wave[i].count = 1;
                        wave[i].amountCount++
                        let newEnemy = {
                            "currentIndex": 0,
                            "speed": wave[i].speed * enemySpeedModifier,
                            "x": track[0].x,
                            "y": track[0].y,
                            "id": enemyNumber,
                            "distance": 0,
                            "health": wave[i].health * enemyHealthModifier,
                            "giveCash": wave[i].cash,
                            "looseLives": wave[i].looseLives
                        }
                        enemys.push(newEnemy)
                        enemy_container.innerHTML += `<div id="enemy${enemyNumber}" class="enemy"></div>`
                        enemyNumber++;
                        if (wave[i].amountCount >= wave[i].amount) {
                            wave[i].out = true
                        }
                    }
                    else {
                        wave[i].count++
                    }
                }
                else {
                    wave[i].delayCount++;
                }
                if (!wave[i].out) {
                    stillGoing = true;
                }
            }
        }
        if (stillGoing) {
            setTimeout(() => {
                spawnEnemys(wave)
            }, 1000 / gameSpeed);
        }
    }
    else{
        setTimeout(() => {
            spawnEnemys(wave)
        }, 1000 / gameSpeed);
    }
}

function nextWavePending(wave){
    let out = true;
    let dead = true;
    for (let i = 0; i < wave.length; i++) {
        if(wave[i].out == false){
            out = false
        } 
    }
    for (let i = 0; i < enemys.length; i++) {
        enemy = document.getElementById('enemy' + i)
        if(enemy.style.display != "none"){
            dead = false
        }
    }

    if(!out || !dead){
        setTimeout(() => {
            nextWavePending(wave)
        }, 1000/2);
    }
    else{
        enemy_container.innerHTML = ""
        enemys = []
        enemyNumber = 0;
        
        cash += (50 + currentWave*2)
        updateCashDisplay()

        console.log("Wave end")
        if(autoPlay){
            loadNextWave()
        }
        else{
            nextWaveSpawnable = true;
        }
    }
}

function getRandomWave(){
    let amountOfJSONS = Math.floor(Math.random() * 5 + 1)
    let wave = []

    for (let i = 0; i < amountOfJSONS; i++) {
        let amount = Math.floor(Math.random() * 12 + 1)
        let frequency = Math.floor(Math.random() * 30 + 1) / 10
        let speed = Math.floor(Math.random() * 5) + Math.floor(currentWave/10)
        let lives = Math.floor(Math.random() * 5) + Math.floor(currentWave/5)
        let delay = Math.floor(Math.random() * 3 + i);
        let JSON;

        if(i == 0){ 
            JSON = {"delay": 0, "delayCount": 1, "amountCount": 0, "count": 1, "amount": amount, "frequency": frequency, "speed": speed, "health": lives, "cash": Math.floor(lives), "looseLives": Math.floor(lives), "out": false, "first": true}
        }
        else{
            JSON = {"delay": delay, "delayCount": 1, "amountCount": 0, "count": 1, "amount": amount, "frequency": frequency, "speed": speed, "health": lives, "cash": Math.floor(lives), "looseLives": Math.floor(lives), "out": false}
        }
        wave.push(JSON)
    }

    return wave;
}
