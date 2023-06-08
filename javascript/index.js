function loadMapSelect(){
    // Make animations

    window.open('./mapSelect.html', target = "_self");
}

let surface = document.getElementById('surface')
window.onresize = resizeSurface

resizeSurface()
function resizeSurface(){
    // resize the surface if the window size of the website changes
    surface_scale = (window.innerWidth / surface.clientWidth)
    surface.style.transform = `scale(${surface_scale})`;
}

let randomInterval = 14000;

selectIdleAnimation()

function selectIdleAnimation(){
    let random = Math.floor(Math.random() * 2 + 1)
    if(random == 1) playIdleAnimation1()
    else playIdleAnimation2() 
    setTimeout(selectIdleAnimation, randomInterval)
}

function playIdleAnimation1(){
    randomInterval = Math.floor(Math.random() * 8000) + 16000
    let animation = anime({
        targets: '#backGroundAssetContainer .enemy',
        duration: 1000,
        delay: 1500,
        top: 310,
        easing: 'easeInOutQuad'
    })
    
    let animation2 = anime({
        targets: '#backGroundAssetContainer .angryDoctor',
        delay: 4500,
        duration: 900,
        rotate: '-40deg',
        left: 860,
        easing: 'easeInOutQuad'
    })
    setTimeout(()=> {
        let animation3 = anime({
            targets: '#backGroundAssetContainer .angryDoctor',
            delay: 2000,
            duration: 900,
            rotate: '-20deg',
            left: 1000,
            easing: 'easeInOutQuad'
        })
    }, 5400)
    
    let animation4 = anime({
        targets: '#backGroundAssetContainer .syringe',
        delay: 9000,
        duration: 2000,
        left: -90,
        easing: 'linear',
        complete: () => {
            document.getElementById('syringe').style.left = '1100px'
        }
    })
    
    setTimeout(()=> {
        let animation5 = anime({
            targets: '#backGroundAssetContainer .enemy',
            duration: 1000,
            delay: 100,
            top: 360,
            easing: 'easeInOutQuad'
        })
    }, 10000)
}

function playIdleAnimation2(){
    randomInterval = Math.floor(Math.random() * 8000) + 8000
    let animation = anime({
        targets: '#backGroundAssetContainer .enemy',
        duration: 1000,
        delay: 1500,
        top: 310,
        easing: 'easeInOutQuad'
    })

    let animation2 = anime({
        targets: '#backGroundAssetContainer .desinfectant',
        delay: 4200,
        duration: 900,
        rotate: '40deg',
        left: 20,
        easing: 'easeInOutQuad',
        complete: () => {
            document.getElementById('water').style.display = "block"
        }
    })

    setTimeout(() => {
        document.getElementById('water').style.display = "none"
    }, 5400)
    
    setTimeout(() => {
        let animation2 = anime({
            targets: '#backGroundAssetContainer .desinfectant',
            delay: 100,
            duration: 900,
            rotate: '20deg',
            left: -100,
            easing: 'easeInOutQuad',
        })
    }, 5800)

    setTimeout(()=> {
        let animation3 = anime({
            targets: '#backGroundAssetContainer .enemy',
            duration: 1000,
            delay: 100,
            top: 360,
            easing: 'easeInOutQuad'
        })
    }, 5100)
}
