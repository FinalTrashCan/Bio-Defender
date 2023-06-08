/*****************************
 * This Javascript file saves the informations of the towers
 * Also spawns the projectiles, moves them, and detects hits
 *****************************/

let tower1 = {
    "id": 0,
    "name": "Disinfectant Spray",
    "image": "./img/desinfectantspray.png",
    "description": "Sprays fast with all its might, killing every enemy in sight, so please don't be afraid, because it is cheap in every way. It can hit up to six enemys!",
    "cost": 65,
    "sellFor": Math.floor(65*0.7),
    "width": 50,
    "range": 130,
    "attack_speed": 0.7,
    "alreadyShot": false,
    "damage": 0.5,
    "pierce": 6,
    "parasite_detection": false,
    "projectile_image": "./img/water.png",
    "projectile_distance_to_tower": 60,
    "projectile_speed": 0,
    "projectile_duration": 0.35,
    "projectile_width": 60,
    "projectile_height": 60,
    "projectile_type": "normal",
    "enemyList": [],
    "first": {"distance": -1},
    "count": 1,
    "upgradeIndexTop": 0,
    "upgradeIndexBottom": 3,
}

let tower2 = {
    "id": 1,
    "name": "Doctor",
    "image": "./img/doctor.png",
    "description": "This Doctor can throw with syringes and clear infections right inside the body. Does a lot of damage, but shoots slowly.",
    "cost": 75,
    "sellFor": Math.floor(75*0.7),
    "width": 65,
    "range": 400,
    "attack_speed": 3,
    "alreadyShot": false,
    "damage": 3,
    "pierce": 2,
    "parasite_detection": false,
    "projectile_image": "./img/syringe.png",
    "projectile_distance_to_tower": 20,
    "projectile_speed": 29,
    "projectile_duration": 0.4,
    "projectile_width": 28,
    "projectile_height": 44,
    "projectile_type": "normal",
    "enemyList": [],
    "first": {"distance": -1},
    "count": 1,
    "upgradeIndexTop": 0,
    "upgradeIndexBottom": 3,
}
let tower3 = {
    "id": 2,
    "name": "Explosive Cell",
    "image": "./img/explosionCell.png",
    "description": "This cell shoots low damage bullets at a very fast rate. If an enemy gets killed by one of these bullets, they will explode.",
    "cost": 40,
    "sellFor": Math.floor(40*0.7),
    "width": 45,
    "range": 220,
    "attack_speed": 0.3,
    "alreadyShot": false,
    "damage": 0.1,
    "pierce": 1,
    "parasite_detection": false,
    "projectile_image": "./img/blood.png",
    "projectile_distance_to_tower": 5,
    "projectile_speed": 20,
    "projectile_duration": 5,
    "projectile_width": 5,
    "projectile_height": 15,
    "projectile_type": "enemyExplosive",
    "enemyList": [],
    "first": {"distance": -1},
    "count": 1,
    "upgradeIndexTop": 0,
    "upgradeIndexBottom": 3,
}


/** TODO: Find more towers and write them down */

let towerInfo = [
    tower1, tower2, tower3
]

let shopTowerObjects = []

for (let i = 0; i < towerInfo.length; i++) {
    let tower = {
        "mouseOver": false,
        "placing": false,
        "image": towerInfo[i].image,
        "width": towerInfo[i].width,
        "range": towerInfo[i].range,
    }
    shopTowerObjects.push(tower)
}

/** Initialize XP Variable */
if(!localStorage['BioDefender-XP']){
    let xp = []
    for (let i = 0; i < towerInfo.length; i++) {
        xp.push(0)
    }
    localStorage['BioDefender-XP'] = JSON.stringify(xp);
}
let xp = JSON.parse(localStorage['BioDefender-XP'])


let towerShop = document.getElementById('towerShop')
let towerShopContainer = document.getElementById('towerShopContainer')

loadTowerShopInfo()

function loadTowerShopInfo(){
    let ergStr = ""

    for (let i = 0; i < towerInfo.length; i++) {
        ergStr += `
        <div>
            <img src="${towerInfo[i].image}" onmouseenter="mouseOver(${i}, true)" onmouseleave="mouseOver(${i}, false)" alt="Not initialized">
            <p class="showOnHover">${towerInfo[i].cost} $</p>
        </div>`
    }

    try{
        towerShop.innerHTML = ergStr;
    }
    catch{
        console.log('No shop element on mapselect.html')
    }
}

function mouseOver(i, isOver){
    shopTowerObjects[i].mouseOver = isOver;
}


/*************
 * Checks if a tower has an enemy in range and if it's attack cooldown is currently down
 * If that is true, then it calls the function spawnProjectiles and provides it with the index of the tower
 *************/
function detectIfProjectileWillBeSpawned(){
    //iterates through all towers
    for (let i = 0; i < towers.length; i++) {
        if(document.getElementById('tower' + (i+1)).style.display != "none"){
            towers[i].count++
            //check if attack cooldown is reached
            if(towers[i].count > towers[i].attack_speed * gameSpeed * (24 / gameSpeed)){
                towers[i].alreadyShot = false;
            }
            //success: shoot
            if(!towers[i].alreadyShot && towers[i].first.distance != -1){
                towers[i].count = 1
                spawnProjectile(i) 
            } 
        }
    }
}

/*************
 * Spawns the projectile of the tower, calculates to angle that it has to fly
 * and calls the function moveProjectiles and detectHits
 */
function spawnProjectile(i){
    towers[i].alreadyShot = true;
    projectileCount++;
    projectile_container.innerHTML += `<div class="projectile" id="projectile${projectileCount}"><img src="${towers[i].projectile_image}" style="transform: rotate(90deg); height: 100%"></div>`
    let projectile = document.getElementById('projectile' + projectileCount)
    let towerHitbox = document.getElementById('tower' + (i+1))
    let towerTop = parseInt(towerHitbox.style.top)
    let towerLeft = parseInt(towerHitbox.style.left)
    let angle = Math.atan2(towers[i].first.y + 20 - towerTop - towerHeight / 2, towers[i].first.x + 20 - towerLeft - towerWidth / 2) * 180 / Math.PI
    projectile.style.transform = `rotate(${angle}deg)`
    towerHitbox.style.transform = `rotate(${angle + 90}deg)`
    let deltaX = Math.cos(angle * Math.PI / 180) * towers[i].projectile_distance_to_tower
    let deltaY = Math.sin(angle * Math.PI / 180) * towers[i].projectile_distance_to_tower
    projectile.style.top = (towerTop + towerHeight / 2 + deltaY - towers[i].projectile_height/2) + "px"
    projectile.style.left = (towerLeft + towerHeight / 2 + deltaX - towers[i].projectile_width/2) + "px"
    projectile.style.width = towers[i].projectile_width + "px"
    projectile.style.height = towers[i].projectile_height + "px"
    let projectileJson = {
        "towerId": towers[i].id,
        "expired": false,
        "duration": towers[i].projectile_duration,
        "speed": towers[i].projectile_speed,
        "angle": (angle * Math.PI / 180),
        "pierce": towers[i].pierce,
        "hits": [],
        "damage": towers[i].damage,
        "count": 1,
        "type": towers[i].projectile_type
    }
    moveProjectile(projectileCount, projectileJson)
    detectHits(projectileCount, projectileJson)
}

function moveProjectile(i, projectile){
    if(!paused && enemys.length > 0){
        projectile.count += 1
        if(projectile.count > projectile.duration * gameSpeed * (24/gameSpeed)){
            projectile.expired = true;
        }
        let projectileHitBox = document.getElementById('projectile' + i)
        if(!projectile.expired){
            let top = parseInt(projectileHitBox.style.top)
            let left = parseInt(projectileHitBox.style.left)
            let deltaX = Math.cos(projectile.angle) * projectile.speed
            let deltaY = Math.sin(projectile.angle) * projectile.speed
            projectileHitBox.style.top = (top + deltaY) + "px"
            projectileHitBox.style.left = (left + deltaX) + "px"
            setTimeout(() => {
                moveProjectile(i, projectile)
            }, 1000/gameSpeed);
        }
        else{
            projectileHitBox.style.display = "none"
        }
    }
    else if(enemys.length > 0){
        setTimeout(() => {
            moveProjectile(i, projectile)
        }, 1000/gameSpeed);
    }
    else{
        let projectileHitBox = document.getElementById('projectile' + i)
        projectileHitBox.style.display = "none"
    }
}

let damageIndicaterCount = 0;
let indicaterString = ""
function detectHits(i, projectile){
    let projectileHitbox = document.getElementById('projectile' + i)
    if(projectileHitbox.style.display != "none"){
        for (let i = 0; i < enemys.length; i++) {
            let enemy = document.getElementById('enemy' + i)
            if(isColliding(projectileHitbox, enemy) && isNotContained(projectile.hits, enemy)){
                projectile.hits.push(enemy)
                hitEnemy(projectile, i)
            }
            if(projectile.hits.length >= projectile.pierce){
                projectileHitbox.style.display = "none"
                return;
            }
        }
        setTimeout(() => {
            detectHits(i, projectile)
        }, 1000/gameSpeed);
    }
}

function hitEnemy(projectile, i){
    enemys[i].health -= projectile.damage
    damage_indicater_container.innerHTML += `<p id="indicater${damageIndicaterCount}">${projectile.damage}</p>`
    let indicater = document.getElementById(`indicater${damageIndicaterCount}`)
    indicater.style.left = (enemys[i].x + 2) + "px"
    let indicaterJson = {
        "id": damageIndicaterCount,
        "y": enemys[i].y + 22,
        "countWithoutFade": 1,
        "countWithFade": 1,
        "expired": false
    }
    animateIndicator(indicaterJson)
    damageIndicaterCount++;
    if (enemys[i].health <= 0) {
        let enemy = document.getElementById('enemy' + i)
        enemy.style.display = "none"
        cash += enemys[i].giveCash
        xp[projectile.towerId] += enemys[i].looseLives
        localStorage['BioDefender-XP'] = JSON.stringify(xp)
        updateCashDisplay()
        if(projectile.type == "enemyExplosive"){
            explosion_container.innerHTML += `<img src="./img/explosion.gif" class="explosion" id="explosion${explosionCount}" alt="Explosion">`
            let explosion = document.getElementById('explosion' + explosionCount)
            explosion.style.top = (enemys[i].y - 40) + "px"
            explosion.style.left = (enemys[i].x - 40) + "px"
            explosionCount++;
            explode(explosionCount, 1, [])
        }
    }

    if(projectile.type == "slow"){
        let speed = enemys[i].speed
        enemys[i].speed *= 0.75
        resetSlowing(speed, i, 1)
    }
    else if(projectile.type == "poison"){
        applyPoison(i, 1, 0)
    }
    else if(projectile.type == "stun"){
        let speed = enemys[i].speed
        enemys[i].speed = 0
        stunEnemy(i, 1, 1.5, speed)
    }
    else if(projectile.type == "explosive"){
        explosion_container.innerHTML += `<img src="./img/explosion.gif" class="explosion" id="explosion${explosionCount}" alt="Explosion">`
        let explosion = document.getElementById('explosion' + explosionCount)
        explosion.style.top = (enemys[i].y - 40) + "px"
        explosion.style.left = (enemys[i].x - 40) + "px"
        explosionCount++;
        explode(explosionCount, 1, [])
    }
}

function resetSlowing(resetTo, i, count){
    count++
    if(enemys.length >= i){
        if(count > 3 * gameSpeed * (24/gameSpeed)){
            enemys[i].speed = resetTo
        }
        else{
            setTimeout(() => {
                resetSlowing(resetTo, i, count)
            }, 1000/gameSpeed);
        }
    }
}
function applyPoison(i, count, amount){
    count++
    let enemy = document.getElementById('enemy' + i)
    if(enemys.length >= i && enemy.style.display != "none"){
        if(count > gameSpeed * (24/gameSpeed)){
            count = 1
            amount++
            enemys[i].health -= 0.35
            damage_indicater_container.innerHTML += `<p id="indicater${damageIndicaterCount}">0.35</p>`
            let indicater = document.getElementById(`indicater${damageIndicaterCount}`)
            indicater.style.left = (enemys[i].x + 2) + "px"
            let indicaterJson = {
                "id": damageIndicaterCount,
                "y": enemys[i].y + 22,
                "countWithoutFade": 1,
                "countWithFade": 1,
                "expired": false
            }
            animateIndicator(indicaterJson)
            damageIndicaterCount++;
            if (enemys[i].health <= 0) {
                enemy.style.display = "none"
                cash += enemys[i].giveCash
                updateCashDisplay()
            }
        }
        if(amount <= 3){
            setTimeout(() => {
                applyPoison(i, count, amount)
            }, 1000/gameSpeed);
        }
    }
}
function stunEnemy(i, count, amount, speed){
    count++;
    if(count > gameSpeed * amount * (24/gameSpeed)){
        enemys[i].speed = speed;
    }
    else{
        setTimeout(() => {
            stunEnemy(i, count, amount, speed)
        }, 1000 / gameSpeed)
    }
}
function explode(index, count, hitArray){
    if(count > 0.5 * gameSpeed * (24/gameSpeed)){
        document.getElementById('explosion' + (index-1)).style.display = "none"
    }
    else{
        count++
        explosion = document.getElementById('explosion' + (index-1))
        for (let i = 0; i < enemys.length; i++) {
            enemy = document.getElementById('enemy' + i)
            if(isColliding(explosion, enemy) && isNotContained(hitArray, enemy)){
                let projectile = {
                    "damage": 5,
                    "type": "normal"
                }
                hitArray.push(enemy)
                hitEnemy(projectile, i)
            }
        }
        setTimeout(() => {
            explode(index, count, hitArray)
        }, 1000 / gameSpeed)
    }
}

function animateIndicator(indicater){
    if(!indicater.expired){
        let indicaterHitBox = document.getElementById('indicater' + indicater.id)
        if(indicater.countWithoutFade > 0.2 * gameSpeed * (24/gameSpeed)){
            indicater.countWithFade++;
            indicaterHitBox.style.opacity = 1/(indicater.countWithFade * 0.5)
        }
       
        indicater.countWithoutFade++;
        indicater.y -= 1.8
        indicaterHitBox.style.top = indicater.y + "px"

        if(indicater.countWithFade > 0.6 * gameSpeed * (24/gameSpeed)){
            indicater.expired = true;
            indicaterHitBox.style.display = "none"
        }

        setTimeout(() => {
            animateIndicator(indicater)
        }, 1000/gameSpeed);
    }
}


function sellTower(index){
    cash += towers[index-1].sellFor
    updateCashDisplay()
    document.getElementById('tower'+index).style.display = "none"
    document.getElementById('range'+index).style.display = "none"
    document.getElementById('upgradeBox'+index).style.display = "none"
    document.getElementById('upgradeInfoBox'+index).style.display = "none"
}