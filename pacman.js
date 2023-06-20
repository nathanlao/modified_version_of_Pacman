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
    vec2( -0.65, -0.2 ),
    vec2( -0.65, 0.2 ),
    vec2( -0.45, 0.2 ),
    vec2( -0.45, -0.2 ),
];

var verticesGreenBlock6 = [
    vec2( 0.65, 0.2 ),
    vec2( 0.65, -0.2 ),
    vec2( 0.45, -0.2 ),
    vec2( 0.45, 0.2),
];

// Blue triangle pacman
var verticesBluePacman = [
    vec2( -0.05, -0.77 ), // bottom left 
    vec2( 0.05, -0.77 ), // bottom right
    vec2( 0.0, -0.67 ) // top 
];


// Vertices for each side of the dashed rectangle
var verticesDashedRectangle = [
    vec2( -0.085, -0.2 ), vec2( -0.05, -0.2 ), //  bottom 
    vec2( -0.02, -0.2 ), vec2( 0.01, -0.2  ), 
    vec2( 0.085, -0.2 ), vec2( 0.05, -0.2  ), 

    vec2( 0.085, -0.19 ), vec2( 0.085, -0.14 ),
    vec2( 0.085, -0.1 ), vec2( 0.085, -0.06 ), // right 
    vec2( 0.085, 0.02 ), vec2( 0.085, -0.02 ), 
    vec2( 0.085, 0.06 ), vec2( 0.085, 0.09 ), 
    vec2( 0.085, 0.12 ), vec2( 0.085, 0.15 ), 
    vec2( 0.085, 0.18 ), vec2( 0.085, 0.2 ), 


    vec2( -0.085, 0.2 ), vec2( -0.05, 0.2 ), // top 
    vec2( 0.02, 0.2 ), vec2( -0.01, 0.2 ), 
    vec2( 0.085, 0.2 ), vec2( 0.05, 0.2  ),

    vec2( -0.085, -0.19 ), vec2( -0.085, -0.14 ), // left
    vec2( -0.085, -0.1 ), vec2( -0.085, -0.06 ), 
    vec2( -0.085, 0.02 ), vec2( -0.085, -0.02 ), 
    vec2( -0.085, 0.06 ), vec2( -0.085, 0.09 ), 
    vec2( -0.085, 0.12 ), vec2( -0.085, 0.15 ), 
    vec2( -0.085, 0.18 ), vec2( -0.085, 0.2 ), 
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
var leftCircleVertices = createVerticalCircleVertices(10, -0.72, 0.16, -0.73)
var rightCircleVertices = createVerticalCircleVertices(10, -0.72, 0.16, 0.73)
var topMidCircleVertices = createVerticalCircleVertices(4, 0.26, 0.15, 0.0)
var bottomMidCircleVertices = createVerticalCircleVertices(3, -0.6, 0.16, 0.0)

var centerLeftCircleVertices1 = createVerticalCircleVertices(2, -0.09, 0.16, -0.39)
var centerLeftCircleVertices2 = createVerticalCircleVertices(2, -0.09, 0.16, -0.23)
var centerRightCircleVertices1 = createVerticalCircleVertices(2, -0.09, 0.16, 0.37)
var centerRightCircleVertices2 = createVerticalCircleVertices(2, -0.09, 0.16, 0.2)

var topLeftCircleVertices = createHorizontalCircleVertices(3, -0.55, 0.16, 0.72)
var topRightCircleVertices = createHorizontalCircleVertices(3, 0.2, 0.16, 0.72)
var midLeftCircleVertices = createHorizontalCircleVertices(3, -0.55, 0.16, 0.26)
var midRightCircleVertices = createHorizontalCircleVertices(3, 0.2, 0.16, 0.26)
var midLeftCircleVertices2 = createHorizontalCircleVertices(3, -0.55, 0.16, -0.26)
var midRightCircleVertices2 = createHorizontalCircleVertices(3, 0.2, 0.16, -0.26)
var bottomLeftCircleVertices = createHorizontalCircleVertices(3, -0.55, 0.16, -0.72)
var bottomRightCircleVertices = createHorizontalCircleVertices(3, 0.2, 0.16, -0.72)

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

    logMessage("WebGL initialized.");

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
}

// Create vertex buffer data.
function createBuffers(vertices) {
    // Load data into GPU
	// Creating the vertex buffer
    var bufferId = gl.createBuffer()
    // Binding the vertex buffer
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId )
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW )

    logMessage("Created buffers.")

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

    logMessage("Created VAOs.")
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
    for (let i = 0; i < leftCircleVertices.length; i++) {
        var bufferIdCircle = createBuffers(leftCircleVertices[i]);
        createVertexArrayObjects(bufferIdCircle, programCircles);
        renderTriangleFan(leftCircleVertices[i], programCircles);
    }

    for (let i = 0; i < rightCircleVertices.length; i++) {
        var bufferIdCircle = createBuffers(rightCircleVertices[i]);
        createVertexArrayObjects(bufferIdCircle, programCircles);
        renderTriangleFan(rightCircleVertices[i], programCircles);
    }

    for (let i = 0; i < topMidCircleVertices.length; i++) {
        var bufferIdCircle = createBuffers(topMidCircleVertices[i]);
        createVertexArrayObjects(bufferIdCircle, programCircles);
        renderTriangleFan(topMidCircleVertices[i], programCircles);
    }

    for (let i = 0; i < bottomMidCircleVertices.length; i++) {
        var bufferIdCircle = createBuffers(bottomMidCircleVertices[i]);
        createVertexArrayObjects(bufferIdCircle, programCircles);
        renderTriangleFan(bottomMidCircleVertices[i], programCircles);
    }

    for (let i = 0; i < centerLeftCircleVertices1.length; i++) {
        var bufferIdCircle = createBuffers(centerLeftCircleVertices1[i]);
        createVertexArrayObjects(bufferIdCircle, programCircles);
        renderTriangleFan(centerLeftCircleVertices1[i], programCircles);
    }

    for (let i = 0; i < centerLeftCircleVertices2.length; i++) {
        var bufferIdCircle = createBuffers(centerLeftCircleVertices2[i]);
        createVertexArrayObjects(bufferIdCircle, programCircles);
        renderTriangleFan(centerLeftCircleVertices2[i], programCircles);
    }

    for (let i = 0; i < centerRightCircleVertices1.length; i++) {
        var bufferIdCircle = createBuffers(centerRightCircleVertices1[i]);
        createVertexArrayObjects(bufferIdCircle, programCircles);
        renderTriangleFan(centerRightCircleVertices1[i], programCircles);
    }

    for (let i = 0; i < centerRightCircleVertices2.length; i++) {
        var bufferIdCircle = createBuffers(centerRightCircleVertices2[i]);
        createVertexArrayObjects(bufferIdCircle, programCircles);
        renderTriangleFan(centerRightCircleVertices2[i], programCircles);
    }

    for (let i = 0; i < topLeftCircleVertices.length; i++) {
        var bufferIdCircle = createBuffers(topLeftCircleVertices[i]);
        createVertexArrayObjects(bufferIdCircle, programCircles);
        renderTriangleFan(topLeftCircleVertices[i], programCircles);
    }
    
    for (let i = 0; i < topRightCircleVertices.length; i++) {
        var bufferIdCircle = createBuffers(topRightCircleVertices[i]);
        createVertexArrayObjects(bufferIdCircle, programCircles);
        renderTriangleFan(topRightCircleVertices[i], programCircles);
    }

    for (let i = 0; i < midLeftCircleVertices.length; i++) {
        var bufferIdCircle = createBuffers(midLeftCircleVertices[i]);
        createVertexArrayObjects(bufferIdCircle, programCircles);
        renderTriangleFan(midLeftCircleVertices[i], programCircles);
    }

    for (let i = 0; i < midRightCircleVertices.length; i++) {
        var bufferIdCircle = createBuffers(midRightCircleVertices[i]);
        createVertexArrayObjects(bufferIdCircle, programCircles);
        renderTriangleFan(midRightCircleVertices[i], programCircles);
    }
    
    for (let i = 0; i < midLeftCircleVertices2.length; i++) {
        var bufferIdCircle = createBuffers(midLeftCircleVertices2[i]);
        createVertexArrayObjects(bufferIdCircle, programCircles);
        renderTriangleFan(midLeftCircleVertices2[i], programCircles);
    }

    for (let i = 0; i < midRightCircleVertices2.length; i++) {
        var bufferIdCircle = createBuffers(midRightCircleVertices2[i]);
        createVertexArrayObjects(bufferIdCircle, programCircles);
        renderTriangleFan(midRightCircleVertices2[i], programCircles);
    }

    for (let i = 0; i < bottomLeftCircleVertices.length; i++) {
        var bufferIdCircle = createBuffers(bottomLeftCircleVertices[i]);
        createVertexArrayObjects(bufferIdCircle, programCircles);
        renderTriangleFan(bottomLeftCircleVertices[i], programCircles);
    }

    for (let i = 0; i < bottomRightCircleVertices.length; i++) {
        var bufferIdCircle = createBuffers(bottomRightCircleVertices[i]);
        createVertexArrayObjects(bufferIdCircle, programCircles);
        renderTriangleFan(bottomRightCircleVertices[i], programCircles);
    }
    
}

window.onload = setup

// Helper function to render TRIANGLE_FAN
function renderTriangleFan(vertices, program) {
    gl.useProgram( program )
    gl.drawArrays( gl.TRIANGLE_FAN, 0, vertices.length )
}

// Helper function to create vertices for vertical circles
function createVerticalCircleVertices(circleNum, startX, interval, yCoord) {
    var circleVertices = []
    var circleRadius = 0.025
    // Creating vertices for all circles
    for (let i = 0; i < circleNum; i++) {
        var centerY = startX + i * interval // Center coordinates for each circle
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
function createHorizontalCircleVertices(circleNum, startX, interval, yCoord) {
    var circleVertices = []
    var circleRadius = 0.025
    // Creating vertices for all circles
    for (let i = 0; i < circleNum; i++) {
        var centerX = startX + i * interval // Center coordinates for each circle
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