// WebGL context
var canvas;
var gl;

// var programBlueBorders;
var programGreyCorridors;
var programGreenBlock;
var programBluePacman;
var programDashedRectangle;
var programRedGhost;
var programBlueGhost;
var programCircles;

// Define distance of two adjacent dots 
var unit = 0.16;

// global variables for score and time
let score = 0;
let time = 60;
let totalDots = 59;
let dotsEaten = 0;
let isGameOver = false;
var isGhost = false;

let gameStart = false;
let gamePaused = false;
let myReq // Cancel an animation frame request


// Four Vertices for grey square
var verticesGreyCorridors = [
    vec2( -0.8, -0.8 ),
    vec2( -0.8, 0.8 ),
    vec2( 0.8, 0.8 ),
    vec2( 0.8, -0.8 ),
];

// Four vertices for green blocks (4 large ones)
var verticesGreenBlock1 = [
    vec2( -0.65, -0.35 ),
    vec2( -0.65, -0.65 ),
    vec2( -0.085, -0.65 ),
    vec2( -0.085, -0.35 ),
];

var verticesGreenBlock2 = [
    vec2( 0.65, -0.35 ),
    vec2( 0.65, -0.65 ),
    vec2( 0.085, -0.65 ),
    vec2( 0.085, -0.35 ),
];

var verticesGreenBlock3 = [
    vec2( -0.085, 0.35 ),
    vec2( -0.085, 0.65 ),
    vec2( -0.65, 0.65 ),
    vec2( -0.65, 0.35 ),
];

var verticesGreenBlock4 = [
    vec2( 0.65, 0.35 ),
    vec2( 0.65, 0.65 ),
    vec2( 0.085, 0.65 ),
    vec2( 0.085, 0.35 ),
];

// Two vertices for green blocks (2 small ones)
var verticesGreenBlock5 = [
    vec2( -0.65, -0.19 ),
    vec2( -0.65, 0.19 ),
    vec2( -0.45, 0.19 ),
    vec2( -0.45, -0.19 ),
];

var verticesGreenBlock6 = [
    vec2( 0.65, 0.19 ),
    vec2( 0.65, -0.19 ),
    vec2( 0.45, -0.19 ),
    vec2( 0.45, 0.19 ),
];

// Blue triangle pacman
var verticesBluePacman = [
    vec2( -0.05, -0.77 ), // bottom left 
    vec2( 0.05, -0.77 ), // bottom right
    vec2( 0.0, -0.67 ) // top 
];


// Vertices for each side of the dashed rectangle
var verticesDashedRectangle = [
    vec2( -0.085, -0.19 ), vec2( -0.05, -0.19 ), //  bottom 
    vec2( -0.02, -0.19 ), vec2( 0.01, -0.19 ), 
    vec2( 0.085, -0.19 ), vec2( 0.05, -0.19 ), 

    vec2( 0.085, -0.19 ), vec2( 0.085, -0.14 ),
    vec2( 0.085, -0.1 ), vec2( 0.085, -0.06 ), // right 
    vec2( 0.085, 0.02 ), vec2( 0.085, -0.02 ), 
    vec2( 0.085, 0.06 ), vec2( 0.085, 0.09 ), 
    vec2( 0.085, 0.12 ), vec2( 0.085, 0.15 ), 
    vec2( 0.085, 0.18 ), vec2( 0.085, 0.19 ), 


    vec2( -0.085, 0.19 ), vec2( -0.05, 0.19 ), // top 
    vec2( 0.02, 0.19 ), vec2( -0.01, 0.19 ), 
    vec2( 0.085, 0.19 ), vec2( 0.05, 0.19  ),

    vec2( -0.085, -0.19 ), vec2( -0.085, -0.14 ), // left
    vec2( -0.085, -0.1 ), vec2( -0.085, -0.06 ), 
    vec2( -0.085, 0.02 ), vec2( -0.085, -0.02 ), 
    vec2( -0.085, 0.06 ), vec2( -0.085, 0.09 ), 
    vec2( -0.085, 0.12 ), vec2( -0.085, 0.15 ), 
    vec2( -0.085, 0.18 ), vec2( -0.085, 0.19 ), 
];

// Vertices for red ghost and blue ghost
var verticesRedGhost = [
    vec2( -0.05, 0.05 ),
    vec2( -0.05, 0.15 ),
    vec2( 0.05, 0.15 ),
    vec2( 0.05, 0.05 ),
];

var verticesBlueGhost = [
    vec2( -0.05, -0.15 ),
    vec2( -0.05, -0.05 ),
    vec2( 0.05, -0.05 ),
    vec2( 0.05, -0.15 ),
];

// Vertices for circles on corridors
var circleVertices = {
    left: createVerticalCircleVertices(10, -0.72, -0.73),
    right: createVerticalCircleVertices(10, -0.72, 0.73),
    topMid: createVerticalCircleVertices(4, 0.23, 0.0),
    bottomMid: createVerticalCircleVertices(3, -0.58, 0.0),
    centerLeft1: createVerticalCircleVertices(2, -0.09, -0.35),
    centerLeft2: createVerticalCircleVertices(2, -0.09, -0.18),
    centerRight1: createVerticalCircleVertices(2, -0.09, 0.18),
    centerRight2: createVerticalCircleVertices(2, -0.09, 0.36),
    topLeft: createHorizontalCircleVertices(3, -0.55, 0.72),
    topRight: createHorizontalCircleVertices(3, 0.18, 0.72),
    midLeft: createHorizontalCircleVertices(3, -0.58, 0.26),
    midRight: createHorizontalCircleVertices(3, 0.18, 0.26),
    midLeft2: createHorizontalCircleVertices(3, -0.58, -0.26),
    midRight2: createHorizontalCircleVertices(3, 0.18, -0.26),
    bottomLeft: createHorizontalCircleVertices(3, -0.58, -0.72),
    bottomRight: createHorizontalCircleVertices(3, 0.18, -0.72)
}

function initializeContext() {

    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { 
        alert( "WebGL isn't available" ); 
    }

    gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 0.5, 0.5, 0.5, 1.0 ); // grey background color

    // Enable depth test
    // gl.enable(gl.DEPTH_TEST);

    // logMessage("WebGL initialized.");

}

// Setup
async function setup() {
    // Initialize the context.
    initializeContext()

    // Load shaders (from html) and initialize attribute buffers
    programGreyCorridors = initShaders( gl, "vertex-shader", "fragment-shader-grey-corridors" )
    programGreenBlock = initShaders( gl, "vertex-shader", "fragment-shader-green-blocks" )
    programBluePacman = initShaders( gl, "vertex-shader", "fragment-shader-blue-pacman")
    programDashedRectangle = initShaders( gl, "vertex-shader", "fragment-shader-dashed-rectangle" )
    programRedGhost = initShaders( gl, "vertex-shader", "fragment-shader-red-ghost" )
    programBlueGhost = initShaders( gl, "vertex-shader", "fragment-shader-blue-ghost" )
    programCircles = initShaders( gl, "vertex-shader", "fragment-shader-circle" )

    // Draw!
    render()

    // Create and initialize score and timer elements
    initializeScoreAndTimer()

    // Countdown timer
    startCountdown()
}

// Create vertex buffer data.
function createBuffers(vertices) {
    // Load data into GPU
	// Creating the vertex buffer
    var bufferId = gl.createBuffer()
    // Binding the vertex buffer
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId )
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW )

    // logMessage("Created buffers.")

    return bufferId
}

// Create Vertex Array Objects
function createVertexArrayObjects(bufferId, program) {
    // Associate out shader variables with our data buffer
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId )
    gl.useProgram( program )
    var vPosition = gl.getAttribLocation( program, "vPosition" )
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 )
    gl.enableVertexAttribArray( vPosition )

    // logMessage("Created VAOs.")
}

// Render
function render() {
    // Clearing the buffer
	gl.clear( gl.COLOR_BUFFER_BIT)

    // Grey Corridors
    var bufferIdGrey = createBuffers(verticesGreyCorridors)
    createVertexArrayObjects(bufferIdGrey, programGreyCorridors)
    renderTriangleFan(verticesGreyCorridors, programGreyCorridors)

    // Green Obstacles
    var bufferIdGreen1 = createBuffers(verticesGreenBlock1)
    var bufferIdGreen2 = createBuffers(verticesGreenBlock2)
    var bufferIdGreen3 = createBuffers(verticesGreenBlock3)
    var bufferIdGreen4 = createBuffers(verticesGreenBlock4)
    var bufferIdGreen5 = createBuffers(verticesGreenBlock5)
    var bufferIdGreen6 = createBuffers(verticesGreenBlock6)
    
    createVertexArrayObjects(bufferIdGreen1, programGreenBlock)
    renderTriangleFan(verticesGreenBlock1, programGreenBlock)
    createVertexArrayObjects(bufferIdGreen2, programGreenBlock)
    renderTriangleFan(verticesGreenBlock2, programGreenBlock)
    createVertexArrayObjects(bufferIdGreen3, programGreenBlock)
    renderTriangleFan(verticesGreenBlock3, programGreenBlock)
    createVertexArrayObjects(bufferIdGreen4, programGreenBlock)
    renderTriangleFan(verticesGreenBlock4, programGreenBlock)
    createVertexArrayObjects(bufferIdGreen5, programGreenBlock)
    renderTriangleFan(verticesGreenBlock5, programGreenBlock)
    createVertexArrayObjects(bufferIdGreen6, programGreenBlock)
    renderTriangleFan(verticesGreenBlock6, programGreenBlock)

    // Blue Pacman
    var bufferIdBluePacman = createBuffers(verticesBluePacman)
    createVertexArrayObjects(bufferIdBluePacman, programBluePacman)
    gl.drawArrays(gl.TRIANGLES, 0, verticesBluePacman.length)

    // Dashed Rectangle
    var bufferIdDashedRectangle = createBuffers(verticesDashedRectangle)
    createVertexArrayObjects(bufferIdDashedRectangle, programDashedRectangle)
    gl.drawArrays(gl.LINES, 0, verticesDashedRectangle.length)

    // Red Ghost
    var bufferIdRedGhost = createBuffers(verticesRedGhost)
    createVertexArrayObjects(bufferIdRedGhost, programRedGhost)
    renderTriangleFan(verticesRedGhost, programRedGhost)

    // Blue Ghost
    var bufferIdBlueGhost = createBuffers(verticesBlueGhost)
    createVertexArrayObjects(bufferIdBlueGhost, programBlueGhost)
    renderTriangleFan(verticesBlueGhost, programBlueGhost)

    // Circles
    for (let key in circleVertices) {
        drawCircles(key);
    }

    if (!isGameOver && gameStart) { 
        moveGhost();
    }
        
    myReq = requestAnimationFrame(render)
}

window.onload = setup

// Define Pacman/ghosts' initial position
var pacmanPosition = {
    x: 0.0,
    y: -0.77
}

var redGhostPosition = { 
    x: 0.0, 
    y: 0.05,
}

var blueGhostPosition = { 
    x: 0.0, 
    y: -0.15,
}

// Define ghosts' initial direction
var directions = ['up', 'down', 'left', 'right']
var redGhostDirection = "up"
var blueGhostDirection = "up"

function moveGhost() {
    isGhost = true
    var speed = 0.01;
    var randomDir = Math.floor(Math.random() * directions.length)

    switch (redGhostDirection) {
        case 'up':
            if (redGhostPosition.y + speed > 0.73 || redGhostPosition.y + speed > 0.26) {
                redGhostDirection = directions[randomDir]
            } else {
                if (canMove(redGhostPosition.x, redGhostPosition.y)) {
                    redGhostPosition.y += speed
                }
            }
            break
        case 'down':
            if (redGhostPosition.y - speed < -0.73) {
                redGhostDirection = directions[randomDir]
            } else {
                if (canMove(redGhostPosition.x, redGhostPosition.y)) {
                    redGhostPosition.y -= speed
                }
            }
            break
        case 'left':
            if (redGhostPosition.x - speed < -0.73) {
                redGhostDirection = directions[randomDir]
            } else {
                if (canMove(redGhostPosition.x, redGhostPosition.y)) {
                    redGhostPosition.x -= speed
                }
            }
            break
        case 'right':
            if (redGhostPosition.x + speed > 0.73) {
                redGhostDirection = directions[randomDir]
            } else {
                if (canMove(redGhostPosition.x, redGhostPosition.y)) {
                    redGhostPosition.x += speed
                }
            }
            break
    }

    switch (blueGhostDirection) {
        case 'up':
            if (blueGhostPosition.y + speed > 0.73 || blueGhostPosition.y + speed > 0.26) {
                blueGhostDirection = directions[randomDir]
            } else {
                blueGhostPosition.y += speed
            }
            break
        case 'down':
            if (blueGhostPosition.y - speed < -0.73) {
                blueGhostDirection = directions[randomDir]
            } else {
                blueGhostPosition.y -= speed
            }
            break
        case 'left':
            if (blueGhostPosition.x - speed < -0.73) {
                blueGhostDirection = directions[randomDir]
            } else {
                blueGhostPosition.x -= speed
            }
            break
        case 'right':
            if (blueGhostPosition.x + speed > 0.73 || blueGhostPosition.x + speed > 0) {
                blueGhostDirection = directions[randomDir]
            } else {
                blueGhostPosition.x += speed
            }
            break
    }

    updateGhostVertices()
    handleCollision()
}

// Key press event listener
window.addEventListener("keydown", function(event) {

    isGhost = false

    switch(event.key) {
        case "ArrowUp":
            if (canMove(pacmanPosition.x, pacmanPosition.y + 0.16) && gameStart && !gamePaused) {
                pacmanPosition.y += 0.16
            }
            break
        case "ArrowDown":
            if (canMove(pacmanPosition.x, pacmanPosition.y - 0.16) && gameStart && !gamePaused) {
                pacmanPosition.y -= 0.16
            }
            break
        case "ArrowLeft":
            if (canMove(pacmanPosition.x - 0.18, pacmanPosition.y) && gameStart && !gamePaused) {
                pacmanPosition.x -= 0.18
            }
            break
        case "ArrowRight":
            if (canMove(pacmanPosition.x + 0.18, pacmanPosition.y) && gameStart && !gamePaused) {
                pacmanPosition.x += 0.18
            }
            break
        case "s":
            gameStart = true
            break
        case "p":
            if (gameStart) { 
                gamePaused = true
                cancelAnimationFrame(myReq)
            }
            break
        case "r":
            if (gameStart) { 
                gamePaused = false
                requestAnimationFrame(render)
            }
            break

    }

    // Stop the game if all dots are eaten!!
    if (isGameOver) { 
        return;
    }
    
    // Update the Pacman's vertices after the position change
    updatePacmanVertices()
})

function updatePacmanVertices() {
    verticesBluePacman = [
        vec2( pacmanPosition.x - 0.05, pacmanPosition.y ), // bottom left 
        vec2( pacmanPosition.x + 0.05, pacmanPosition.y ), // bottom right
        vec2( pacmanPosition.x, pacmanPosition.y + 0.1 ) // top 
    ];

    for (let key in circleVertices) {
        removeCircle(key)
    }
}

function updateGhostVertices() {
    verticesRedGhost = [
        vec2( redGhostPosition.x - 0.05, redGhostPosition.y - 0.05 ),
        vec2( redGhostPosition.x - 0.05, redGhostPosition.y + 0.05 ),
        vec2( redGhostPosition.x + 0.05, redGhostPosition.y + 0.05 ),
        vec2( redGhostPosition.x + 0.05, redGhostPosition.y - 0.05 ),
    ];

    verticesBlueGhost = [
        vec2( blueGhostPosition.x - 0.05, blueGhostPosition.y - 0.05 ),
        vec2( blueGhostPosition.x - 0.05, blueGhostPosition.y + 0.05 ),
        vec2( blueGhostPosition.x + 0.05, blueGhostPosition.y + 0.05 ),
        vec2( blueGhostPosition.x + 0.05, blueGhostPosition.y - 0.05),
    ];
}

// Helper function to check if Pacman can move to the desired position
function canMove(x, y) {
    // Must be inside the grey corridors
    if (x < -0.8 || x > 0.8 || y < -0.8 || y > 0.8) {
        return false;
    }
    
    // Must be outside any of the green obstacles
    if ((x > -0.65 && x < -0.085) && (y > -0.65 && y < -0.35)) {
        return false;
    }
    if ((x > 0.085 && x < 0.65) && (y > -0.65 && y < -0.35)) {
        return false;
    }
    if ((x > -0.65 && x < -0.085) && (y > 0.35 && y < 0.65)) {
        return false;
    }
    if ((x > 0.085 && x < 0.65) && (y > 0.35 && y < 0.65)) {
        return false;
    }
    if ((x > -0.65 && x < -0.45) && (y > -0.27 && y < 0.19)) {
        return false;
    }
    if ((x > 0.45 && x < 0.65) && (y > -0.19 && y < 0.19)) {
        return false;
    }
    
    // Pacman must be outside the dashed rectangle
    if (!isGhost) { 
        if ((x > -0.085 && x < 0.085) && (y > -0.19 && y < 0.19)) {
            return false;
        }
    }

    return true;
}

// Helper function to render TRIANGLE_FAN
function renderTriangleFan(vertices, program) {
    gl.useProgram( program )
    gl.drawArrays( gl.TRIANGLE_FAN, 0, vertices.length )
}

// Helper function to draw circles
function drawCircles(circleName) {
    for (let i = 0; i < circleVertices[circleName].length; i++) {
        var bufferIdCircle = createBuffers(circleVertices[circleName][i]);
        createVertexArrayObjects(bufferIdCircle, programCircles);
        renderTriangleFan(circleVertices[circleName][i], programCircles);
    }
}

// Helper function to create vertices for vertical circles
function createVerticalCircleVertices(circleNum, startX, yCoord) {
    var circleVertices = []
    var circleRadius = 0.025
    // Creating vertices for all circles
    for (let i = 0; i < circleNum; i++) {
        var centerY = startX + i * unit // Center coordinates for each circle
        var circle = [];
        for (let theta = 0; theta <= 2 * Math.PI; theta += Math.PI / 20) {
            var x = yCoord + circleRadius * Math.cos(theta); // x = cx + r * cos(theta)
            var y = centerY + circleRadius * Math.sin(theta); // y = cy + r * sin(theta)
            circle.push(vec2(x, y));
        }
        circleVertices.push(circle)
    }
    return circleVertices
}

// Helper function to create vertices for horizontal circles
function createHorizontalCircleVertices(circleNum, startX, yCoord) {
    var circleVertices = []
    var circleRadius = 0.025
    // Creating vertices for all circles
    for (let i = 0; i < circleNum; i++) {
        var centerX = startX + i * 0.2 // Center coordinates for each circle
        var circle = [];
        for (let theta = 0; theta <= 2 * Math.PI; theta += Math.PI / 20) {
            var x = centerX + circleRadius * Math.cos(theta); // x = cx + r * cos(theta)
            var y = yCoord + circleRadius * Math.sin(theta); // y = cy + r * sin(theta)
            circle.push(vec2(x, y));
        }
        circleVertices.push(circle)
    }
    return circleVertices
}

// Helper function to check if a circle is inside Pac-Man's hitbox
function isColliding(circle, pacmanVertices) {
    let pacmanMinX = Math.min(pacmanVertices[0][0], pacmanVertices[1][0], pacmanVertices[2][0])
    let pacmanMaxX = Math.max(pacmanVertices[0][0], pacmanVertices[1][0], pacmanVertices[2][0])
    let pacmanMinY = Math.min(pacmanVertices[0][1], pacmanVertices[1][1], pacmanVertices[2][1])
    let pacmanMaxY = Math.max(pacmanVertices[0][1], pacmanVertices[1][1], pacmanVertices[2][1])

    return circle[0] >= pacmanMinX && circle[0] <= pacmanMaxX && circle[1] >= pacmanMinY && circle[1] <= pacmanMaxY
}

// Helper funtion to remove the circle after got eaten and update the score
function removeCircle(circleName) {
    // Iterate over each circle's vertices
    for (let i = 0; i < circleVertices[circleName].length; i++) {
        for (let j = 0; j < circleVertices[circleName][i].length; j++) {
            if (isColliding(circleVertices[circleName][i][j], verticesBluePacman)) {
                // Remove this circle from the array
                circleVertices[circleName].splice(i, 1)
                increaseScore()
                break
            }
        }
    }
}

function initializeScoreAndTimer() {
    // Create score element
    let scoreEl = document.createElement("div")
    scoreEl.id = "score"
    scoreEl.style.position = 'absolute'
    scoreEl.style.top = '140px'
    scoreEl.style.left = '440px'
    scoreEl.style.fontSize = '30px'
    scoreEl.style.color = '#efefef'
    document.body.appendChild(scoreEl)
    updateScore(0)

    // Create timer element
    let timerEl = document.createElement("div")
    timerEl.id = "timer"
    timerEl.style.position = 'absolute'
    timerEl.style.top = '140px'
    timerEl.style.left = '70px'
    timerEl.style.fontSize = '30px'
    timerEl.style.color = '#efefef'
    document.body.appendChild(timerEl)
    updateTimer(time)
}

function updateScore(newScore) {
    score = newScore
    document.getElementById("score").textContent = score
}

function updateTimer(newTime) {
    if (isGameOver) { 
        return;
    }
    time = newTime
    document.getElementById("timer").textContent = time
}

function startCountdown() {
    let timerId = setInterval(() => {
        if (gameStart && !gamePaused) { 
            time--
            updateTimer(time)
        }
    
        if (time <= 0) {
            isGameOver = true
            clearInterval(timerId)
        }
    }, 1000)
}

function increaseScore() {
    score += 100
    dotsEaten++
    updateScore(score)
    if (dotsEaten === totalDots) {
        isGameOver = true
        endGame()
    }
}

function endGame() { 
    score += time * 100
    updateScore(score)
}

// Helper function to check collision between ghost and pacman
function checkGhostsAndPacmanCollision(pacmanPosition, ghostPosition) {
    const threshold = 0.1
    const distance = Math.sqrt(
        Math.pow(pacmanPosition.x - ghostPosition.x, 2) + 
        Math.pow(pacmanPosition.y - ghostPosition.y, 2)
    )

    return distance < threshold;
}

// Helper function to update score and reset ghost's position
function handleCollision() {
    if (checkGhostsAndPacmanCollision(pacmanPosition, redGhostPosition)) {
        // Reset ghost positions
        redGhostPosition = { x: 0.0, y: 0.05 }
        redGhostDirection = "up"
        score -= 500
        updateScore(score)
    } else if (checkGhostsAndPacmanCollision(pacmanPosition, blueGhostPosition)) {

        blueGhostPosition = { x: 0.0, y: -0.15 }
        blueGhostDirection = "up"
        score -= 500
        updateScore(score)
    }

    if (score >= 0) {
        // Revive Pacman where it was caught
        pacmanPosition = { x: pacmanPosition.x, y: pacmanPosition.y }
    } else {
        // Game over
        isGameOver = true
        console.log("Game Over")
    }
}

// Logging
function logMessage(message) {
    console.log(`[msg]: ${message}\n`);
}

function logError(message) {
    console.log(`[err]: ${message}\n`);
}

function logObject(obj) {
    let message = JSON.stringify(obj, null, 2);
    console.log(`[obj]:\n${message}\n\n`);
}