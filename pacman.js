// WebGL context
var canvas;
var gl;

// var programBlueBorders;
var programGreyCorridors;
var programGreenBlock;
var programBluePacman;
var programDashedRectangle;

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
    vec2( -0.5, 0.2 ),
    vec2( -0.5, -0.2 ),
];

var verticesGreenBlock6 = [
    vec2( 0.65, 0.2 ),
    vec2( 0.65, -0.2 ),
    vec2( 0.5, -0.2 ),
    vec2( 0.5, 0.2),
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

// Helper function to render TRIANGLE_FAN
function renderTriangleFan(vertices, program) {
    gl.useProgram( program )
    gl.drawArrays( gl.TRIANGLE_FAN, 0, vertices.length )
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


}

window.onload = setup


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