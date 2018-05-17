const canvases = document.querySelectorAll('.string')
let thickness = 17.5

canvases.forEach(canvas => {
    let ctx = canvas.getContext('2d')
    ctx.filStyle = 'black'
    ctx.lineWidth = thickness
    ctx.beginPath()
    ctx.moveTo(-300, 75)
    ctx.lineTo(300, 70)
    ctx.stroke()
    thickness-= 0.5
    
    canvas.addEventListener('mouseleave', playSound)
})

function playSound(e) {
    console.log(this.dataset.chord)
    const audio = document.querySelector(`audio[data-chord="${this.dataset.chord}"]`)
    audio.volume = 0.2
    audio.currentTime = 0
    audio.play()
}

const picks = document.querySelectorAll('.picks>*')
const backdrops = document.querySelectorAll('.backdrop>*')

backdrops.forEach(backdrop => {
    backdrop.addEventListener('click', handleBackClick)
})

picks.forEach(pick => {
    pick.addEventListener('click', handleCursorClick)
})

function handleCursorClick(e) {
    console.log(e.target.src)
    document.body.style.cursor = `url('${e.target.src}'), auto`
}

function handleBackClick(e) {
    console.log(e.target)
    document.body.style.backgroundImage = `url('${e.target.src}'), auto`
}