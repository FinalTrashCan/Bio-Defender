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
    {"delay": 0, "delayCount": 1, "amountCount": 0, "count": 1, "amount": 10, "frequency": 0.6, "speed": 5, "health": 10, "cash": 20, "looseLives": 10, "out": false, "first": true},
]

let waves = [
    wave1, wave2, wave3
]


if(!localStorage['BioDefender_autoPlay']){
    localStorage['BioDefender_autoPlay'] = JSON.stringify(false)
}
let autoPlay = JSON.parse(localStorage['BioDefender_autoPlay'])
let nextWaveSpawnable = true

function loadNextWave(){
    if(currentWave != waves.length){
        nextWaveSpawnable = false
        spawnEnemys(waves[currentWave])
        currentWave++;
    }
    else{
        //Win
        console.log('win')
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
