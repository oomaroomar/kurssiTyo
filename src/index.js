const canvases = document.querySelectorAll('.string')
const audios = document.querySelectorAll('audio')
const theCanvas = canvases[0]
const theAudio = audios[0]
let thickness = 17.5

canvases.forEach((canvas, i) => {
    // let ctx = canvas.getContext('2d')
    // ctx.filStyle = 'black'
    // ctx.lineWidth = thickness
    // ctx.beginPath()
    // ctx.moveTo(-300, 75)
    // ctx.lineTo(300, 70)
    // ctx.stroke()
    // thickness-= 0.5
    
    canvasMake(canvas, audios[i])()
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
    console.log(e.target.src)
    document.body.style.backgroundImage = `url('${e.target.src}')`
}

//i dont understand code under this comment
function canvasMake(testCanvas, testAudio) {
    let ctx, source, context, analyser, bufferLength, dataArray, bars = 100, barX, barY, width = 2, height = 2, up

    context = new AudioContext()
    analyser = context.createAnalyser()

    source = context.createMediaElementSource(testAudio)
    source.connect(analyser)
    analyser.connect(context.destination)
    bufferLength = analyser.frequencyBinCount
    dataArray = new Uint8Array(bufferLength)
    ctx = testCanvas.getContext('2d')

    function draw() {
        ctx.clearRect(0, 0, testCanvas.width, testCanvas.height)
        
        analyser.getByteTimeDomainData(dataArray)
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 5
        ctx.beginPath()
        let sliceWidth = testCanvas.width*1.0/bufferLength
        let x = 0
        for(let i = 0; i<bufferLength; i++) {
            let v = dataArray[i]/128.0
            let y = v*testCanvas.height/2
            if(i === 0) {
                ctx.moveTo(x, y)
            } else {
                ctx.lineTo(x, y)
            }
            x += sliceWidth
        }
        ctx.lineTo(testCanvas.width, testCanvas.height/2)
        ctx.stroke()
        window.requestAnimationFrame(draw)
    }

    return draw
}