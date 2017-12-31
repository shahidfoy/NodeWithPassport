// Initial Setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

var divWidth = document.getElementById('mainDisplay').clientWidth
canvas.width = innerWidth
canvas.height = 400

// Variables
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#3D0B0F', '#5E1117', '#77151D', '#7F161F', '#AD2E39']

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = 400

    init()
})

// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

// Objects
function Particle(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.05
    /*
    this.distanceFromCenter = {
        x: randomIntFromRange(50, 120),
        y: randomIntFromRange(50, 120)
    }
    */
    this.distanceFromCenter = randomIntFromRange(50, 180)

    this.update = function() {
        const lastPoint = {
            x: this.x,
            y: this.y
        }
        // Move points over time
        this.radians += this.velocity
        this.x = x + Math.cos(this.radians) * this.distanceFromCenter
        this.y = y + Math.sin(this.radians) * this.distanceFromCenter
        this.draw(lastPoint)
    }

    this.draw = function(lastPoint) {
        c.beginPath()
        c.strokeStyle = this.color
        c.lineWidth = this.radius
        c.moveTo(lastPoint.x, lastPoint.y)
        c.lineTo(this.x, this.y)
        c.stroke()
        c.closePath()
    }
}



// Implementation
let particles
function init() {
    particles = []

    for (let i = 0; i < 120; i++) {
        var color = randomColor(colors)
        const radius = (Math.random() * 2) + 1
        particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, color))
    }
    console.log(particles)
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    // c.clearRect(0, 0, canvas.width, canvas.height)
    c.fillStyle = 'rgba(255, 255, 255, 0.05)';
    c.fillRect(0, 0, canvas.width, canvas.height)

    particles.forEach(particle => {
        particle.update();
    });
}

init()
animate()

