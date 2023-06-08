/*****************************
 * This Javascript file is used to save all the upgrade information
 * Also used to buy and apply the upgrades
 *****************************/
if(!localStorage['BioDefender_UpgradesUnlocked']){
    let upgradesUnlocked = []
    for (let i = 0; i < 3; i++) {
        let array = []
        for (let j = 0; j < 6; j++) {
            array.push(false)
        }  
        upgradesUnlocked.push(array)
    }
    localStorage['BioDefender_UpgradesUnlocked'] = JSON.stringify(upgradesUnlocked);
}
let upgradesUnlocked = JSON.parse(localStorage['BioDefender_UpgradesUnlocked']);

let unlockButton = document.getElementById('unlockButton');

let upgrade1 = [
    {
        "name": "Better pumps",
        "description": "Gives the spray insane pump powers so it can hit enemys from further away.",
        "cost": 70,
        "range": 40,
        "projectile_distance_to_tower": 8,
        "xpToUnlock": 30,
        "unlocked": upgradesUnlocked[0][0]
    },
    {
        "name": "Faster pumps",
        "description": "Increases the speed of the spray. Also makes the 'fog' bigger.",
        "cost": 390,
        "attack_speed": 0.2,
        "projectile_duration": 0.15,
        "projectile_width": 18,
        "projectile_height": 18,
        "xpToUnlock": 180,
        "unlocked": upgradesUnlocked[0][1]
    },
    {
        "name": "Sani-tizing Mist",
        "description": "All enemys that get hit will have less speed for a few seconds. Also increases the width of the 'fog' even more.",
        "cost": 1740,
        "projectile_duration": 0.2,
        "projectile_width": 25,
        "projectile_height": 25,
        "projectile_type": "slow",
        "xpToUnlock": 1300,
        "unlocked": upgradesUnlocked[0][2]
    },
    {
        "name": "Stronger stimula",
        "description": "Researcher all over the world spent a lot of time working on this... with this stimula the spray does one damage now!",
        "cost": 150,
        "damage": 0.5,
        "xpToUnlock": 60,
        "unlocked": upgradesUnlocked[0][3]
    },
    {
        "name": "Soaking stimula",
        "description": "The spray is sticky and now stays on the enemys, causing it to do damage over time. (poison)",
        "cost": 720,
        "projectile_type": "poison",
        "xpToUnlock": 300,
        "unlocked": upgradesUnlocked[0][4]
    },
    {
        "name": "MEGA stimula",
        "description": "Increases the damage massively",
        "cost": 1200,
        "damage": 7,
        "xpToUnlock": 1600,
        "unlocked": upgradesUnlocked[0][5]
    }
]
let upgrade2 = [
    {
        "name": "Faster Reload",
        "description": "Gives the doctor a ticket for the gym so that he can strengthen his arms.",
        "cost": 85,
        "attack_speed": 0.4,
        "projectile_duration": 0.3,
        "xpToUnlock": 140,
        "unlocked": upgradesUnlocked[1][0]
    },
    {
        "name": "Mashine Gun Arms",
        "description": "This doctor spent a lot of time in the gym. Shoots way faster at the cost of losing some damage.",
        "cost": 355,
        "attack_speed": 1.7,
        "projectile_duration": 0.15,
        "projectile_width": 1,
        "projectile_height": 2,
        "damage": -1,
        "xpToUnlock": 420,
        "unlocked": upgradesUnlocked[1][1]
    },
    {
        "name": "Battery Fire",
        "description": "Shoots EVEN faster! (Sorry, I kind of ran out of ideas for this one)",
        "cost": 400,
        "attack_speed": 0.4,
        "xpToUnlock": 480,
        "unlocked": upgradesUnlocked[1][2]
    },
    {
        "name": "Glasses",
        "description": "Doctor gains better eyesight. Increases the range.",
        "cost": 60,
        "range": 100,
        "projectile_speed": 10,
        "xpToUnlock": 110,
        "unlocked": upgradesUnlocked[1][3]
    },
    {
        "name": "Sharper Syringe",
        "description": "Throws with sharpened syringe, which increases the damage.",
        "cost": 200,
        "damage": 2,
        "xpToUnlock": 420,
        "unlocked": upgradesUnlocked[1][4]
    },
    {
        "name": "Shot on the nerves",
        "description": "Doctor shoots with such accuracy that he hits exactly where it hurts. Stuns the enemys in place for a short time.",
        "cost": 730,
        "projectile_type": "stun",
        "projectile_speed": 30,
        "damage": 4,
        "xpToUnlock": 1300,
        "unlocked": upgradesUnlocked[1][5]
    }
]
let upgrade3 = [
    {
        "name": "Good con-nected",
        "description": "Gains more range and projectile speed.",
        "cost": 50,
        "range": 100,
        "projectile_speed": 20,
        "xpToUnlock": 90,
        "unlocked": upgradesUnlocked[2][0]
    },
    {
        "name": "Double damage",
        "description": "This cell won the lottery, which made them super rich. Increases the damage but loses attack speed slightly.",
        "cost": 320,
        "attack_speed": -0.05,
        "damage": 0.1,
        "xpToUnlock": 280,
        "unlocked": upgradesUnlocked[2][1]
    },
    {
        "name": "Dooms-day",
        "description": "Shots will explode on every attack. The only downside is, that this makes the cell lose a lot of attack speed.",
        "cost": 850,
        "damage": 0.5,
        "attack_speed": -0.5,
        "projectile_type": "explosive",
        "xpToUnlock": 1200,
        "unlocked": upgradesUnlocked[2][2]
    },
    {
        "name": "Button Masher",
        "description": "This cell will gain a bit of speed in the thumb.",
        "cost": 160,
        "attack_speed": 0.05,
        "xpToUnlock": 170,
        "unlocked": upgradesUnlocked[2][3]
    },
    {
        "name": "World Record Pace",
        "description": "Shoots ten times per second!",
        "cost": 370,
        "attack_speed": 0.15,
        "xpToUnlock": 390,
        "unlocked": upgradesUnlocked[2][4]
    },
    {
        "name": "World Record Holder",
        "description": "Increases the attack speed slightly and increases the damage, projectile speed and the hitbox of the projectile",
        "cost": 690,
        "damage": 0.2,
        "projectile_speed": 15,
        "projectile_width": 10,
        "projectile_height": 15,
        "xpToUnlock": 900,
        "unlocked": upgradesUnlocked[2][5]
    }
]

let upgrades = [
    upgrade1, upgrade2, upgrade3
]

let selectedUpgrade = upgrades[0][0]


function buyUpgrade(towerIndex, shopTowerIndex, upgradeIndex, row) {
    if (!upgradesUnlocked[shopTowerIndex][upgradeIndex]) {
        console.log('Not unlocked!')
        errorMessage.innerHTML = 'Upgrade is not unlocked!'
        showError()
        return;
    }
    if (cash - upgrades[shopTowerIndex][upgradeIndex].cost < 0) {
        console.log('Not enough money!')
        errorMessage.innerHTML = 'Not enough money!'
        showError()
        return;
    }
    let upgrade = upgrades[shopTowerIndex][upgradeIndex]
    let rangeHitbox = document.getElementById('range' + (towerIndex + 1))
    let sellForElement = document.getElementById('sellFor' + (towerIndex + 1))

    cash -= upgrade.cost
    towers[towerIndex].cost += upgrade.cost
    towers[towerIndex].sellFor = Math.floor(towers[towerIndex].cost * 0.7)
    sellForElement.innerHTML = formatNumberToString(towers[towerIndex].sellFor) + " $"

    if (upgrade.range != undefined) {
        towers[towerIndex].range += upgrade.range;
        rangeHitbox.style.width = towers[towerIndex].range + "px"
        rangeHitbox.style.height = towers[towerIndex].range + "px"
        rangeHitbox.style.top = (parseFloat(rangeHitbox.style.top) - upgrade.range / 2) + "px"
        rangeHitbox.style.left = (parseFloat(rangeHitbox.style.left) - upgrade.range / 2) + "px"
    }
    if (upgrade.attack_speed != undefined) {
        towers[towerIndex].attack_speed -= upgrade.attack_speed
    }
    if (upgrade.damage != undefined) {
        towers[towerIndex].damage += upgrade.damage
    }
    if (upgrade.pierce != undefined) {
        towers[towerIndex].pierce += upgrade.pierce
    }
    if (upgrade.projectile_image != undefined) {
        towers[towerIndex].projectile_image = upgrade.projectile_image
    }
    if (upgrade.projectile_distance_to_tower != undefined) {
        towers[towerIndex].projectile_distance_to_tower += upgrade.projectile_distance_to_tower
    }
    if (upgrade.projectile_speed != undefined) {
        towers[towerIndex].projectile_speed += upgrade.projectile_speed
    }
    if (upgrade.projectile_duration != undefined) {
        towers[towerIndex].projectile_duration += upgrade.projectile_duration
    }
    if (upgrade.projectile_width != undefined) {
        towers[towerIndex].projectile_width += upgrade.projectile_width
    }
    if (upgrade.projectile_height != undefined) {
        towers[towerIndex].projectile_height += upgrade.projectile_height
    }
    if (upgrade.projectile_type != undefined) {
        towers[towerIndex].projectile_type = upgrade.projectile_type
    }
    if (upgrade.parasite_detection != undefined) {
        towers[towerIndex].parasite_detection = true
    }

    updateCashDisplay()
    updateUpgradeDisplay(towerIndex, shopTowerIndex, row)
}

function updateUpgradeDisplay(towerIndex, shopTowerIndex, row){
    if(row == "top"){
        let upgradeBox = document.getElementById('topUpgrade' + (towerIndex+1))
        towers[towerIndex].upgradeIndexTop++
        if(towers[towerIndex].upgradeIndexTop < 3 && towers[towerIndex].upgradeIndexBottom < 5){
            upgradeBox.outerHTML = `<div class="buyUpgrade" id="topUpgrade${towerIndex+1}" onclick="buyUpgrade(${towerIndex}, ${shopTowerIndex}, ${towers[towerIndex].upgradeIndexTop}, 'top')"></div>`
            upgradeBox = document.getElementById('topUpgrade' + (towerIndex+1))
            upgradeBox.innerHTML = `<h2>${upgrades[shopTowerIndex][towers[towerIndex].upgradeIndexTop].name}</h2><p>${formatNumberToString(upgrades[shopTowerIndex][towers[towerIndex].upgradeIndexTop].cost)} $</p>`    
            if(towers[towerIndex].upgradeIndexTop > 1 && towers[towerIndex].upgradeIndexBottom == 4){
                upgradeBox = document.getElementById('bottomUpgrade' + (towerIndex+1))
                upgradeBox.outerHTML = `<div class="buyUpgrade" id="bottomUpgrade${towerIndex+1}"><h2>MAX UPGRADE BOUGHT</h2></div>`
            }
        }
        else{
            upgradeBox.outerHTML = `<div class="buyUpgrade" id="topUpgrade${towerIndex+1}"><h2>MAX UPGRADE BOUGHT</h2></div>`
        }
    }
    else{
        let upgradeBox = document.getElementById('bottomUpgrade' + (towerIndex+1))
        towers[towerIndex].upgradeIndexBottom++
        if(towers[towerIndex].upgradeIndexBottom < 6 && towers[towerIndex].upgradeIndexTop < 2){
            upgradeBox.outerHTML = `<div class="buyUpgrade" id="bottomUpgrade${towerIndex+1}" onclick="buyUpgrade(${towerIndex}, ${shopTowerIndex}, ${towers[towerIndex].upgradeIndexBottom}, 'bottom')"></div>`
            upgradeBox = document.getElementById('bottomUpgrade' + (towerIndex+1))
            upgradeBox.innerHTML = `<h2>${upgrades[shopTowerIndex][towers[towerIndex].upgradeIndexBottom].name}</h2><p>${formatNumberToString(upgrades[shopTowerIndex][towers[towerIndex].upgradeIndexBottom].cost)} $</p>`    
            if(towers[towerIndex].upgradeIndexBottom > 4 && towers[towerIndex].upgradeIndexTop == 1){
                upgradeBox = document.getElementById('topUpgrade' + (towerIndex+1))
                upgradeBox.outerHTML = `<div class="buyUpgrade" id="topUpgrade${towerIndex+1}"><h2>MAX UPGRADE BOUGHT</h2></div>`
            }
        }
        else{
            upgradeBox.outerHTML = `<div class="buyUpgrade" id="bottomUpgrade${towerIndex+1}"><h2>MAX UPGRADE BOUGHT</h2></div>`
        }
    }
}

function selectUpgrade(shopTowerIndex, upgradeIndex){
    if(xp[shopTowerIndex] >= upgrades[shopTowerIndex][upgradeIndex].xpToUnlock){
        if(upgradeIndex != 0 && upgradeIndex != 3 && !upgrades[shopTowerIndex][upgradeIndex].unlocked){
            if(upgrades[shopTowerIndex][upgradeIndex-1].unlocked){
                unlockButton.style.display = "block"
                unlockButton.outerHTML = `<p id="unlockButton" onclick="unlockUpgrade(${shopTowerIndex}, ${upgradeIndex})">Unlock</p>` 
            }
            else{
                unlockButton.style.display = "none"
            }
        }
        else if(upgradeIndex == 0 && !upgrades[shopTowerIndex][upgradeIndex].unlocked || upgradeIndex == 3 && !upgrades[shopTowerIndex][upgradeIndex].unlocked){
            unlockButton.style.display = "block"
            unlockButton.outerHTML = `<p id="unlockButton" onclick="unlockUpgrade(${shopTowerIndex}, ${upgradeIndex})">Unlock</p>` 
        }
        else{
            unlockButton.style.display = "none"
        }
    }
    else{
        unlockButton.style.display = "none"
    }
    
    unlockButton = document.getElementById('unlockButton')
}

function unlockUpgrade(shopTowerIndex, upgradeIndex){
    if(xp[shopTowerIndex] >= upgrades[shopTowerIndex][upgradeIndex].xpToUnlock && !upgradesUnlocked[shopTowerIndex][upgradeIndex]){
        upgradesUnlocked[shopTowerIndex][upgradeIndex] = true;
        upgrades[shopTowerIndex][upgradeIndex].unlocked = true;
        xp[shopTowerIndex] -= upgrades[shopTowerIndex][upgradeIndex].xpToUnlock;
        towerXPBox.innerHTML = formatNumberToString(xp[shopTowerIndex]) + " XP"
        localStorage['BioDefender_UpgradesUnlocked'] = JSON.stringify(upgradesUnlocked)
        localStorage['BioDefender-XP'] = JSON.stringify(xp)
        unlockButton.style.display = "none"
        loadTowerInfo(shopTowerIndex)
    }
}

function requestUpgradeInfo(towerIndex, shopTowerIndex){
    let info = document.getElementById('topUpgradeInfo' + (towerIndex+1))
    info.innerHTML = upgrades[shopTowerIndex][towers[towerIndex].upgradeIndexTop].description;
   
    info = document.getElementById('bottomUpgradeInfo' + (towerIndex+1))
    info.innerHTML = upgrades[shopTowerIndex][towers[towerIndex].upgradeIndexBottom].description;
    

    console.log('diggi')

    let animation = anime({
        targets: '#upgradeInfoBox' + (towerIndex+1),
        translateX: '-93%',
        duration: 300,
        easing: 'easeInOutQuad'
    })
}