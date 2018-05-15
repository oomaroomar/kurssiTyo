let canvases = document.querySelectorAll('.string')
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
    console.log(e.fromElement.dataset)
}