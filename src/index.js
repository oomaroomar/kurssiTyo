const canvases = document.querySelectorAll('.string')
const audios = document.querySelectorAll('audio')


canvases.forEach((canvas, i) => {
    const maker = canvasMake(canvas, audios[i])
    //canvasMake(canvas, audios[i])()
    maker.draw()
    maker.cancel()
    canvas.addEventListener('mouseleave', e => {
        const audio = document.querySelector(`audio[data-chord="${e.target.dataset.chord}"]`)
        audio.volume = 0.5
        if(audio.currentTime == 0)  maker.draw()
        audio.currentTime = 0.1
        audio.play()
    })
    audios[i].addEventListener('ended', () => {
        maker.cancel()
    })

})

function playSound(e) {
    const audio = document.querySelector(`audio[data-chord="${this.dataset.chord}"]`)
    audio.volume = 0.5
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
    let ctx, source, context, analyser, bufferLength, dataArray, bars = 100, barX, barY, width = 2, height = 2, up, animationFrame
    context = new AudioContext()
    analyser = context.createAnalyser()

    source = context.createMediaElementSource(testAudio)
    source.connect(analyser)
    analyser.connect(context.destination)
    bufferLength = analyser.frequencyBinCount
    dataArray = new Uint8Array(bufferLength)
    ctx = testCanvas.getContext('2d')

    function cancel() {
        testAudio.currentTime = 0
        window.cancelAnimationFrame(animationFrame)
        ctx.beginPath()
        ctx.moveTo(0,testCanvas.height/2)
        ctx.lineTo(testCanvas.width, testCanvas.height/2)
        ctx.stroke()
    }

    function draw() {
        console.log('test')
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
        animationFrame = window.requestAnimationFrame(draw)
    }

    return {
        draw: () => {
            draw()
        },
        cancel: () => {
            cancel()
        }
    }
}
