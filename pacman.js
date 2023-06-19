// WebGL context
var canvas;
var gl;

// var programBlueBorders;
var programGreyCorridors;
var programGreenBlock;

// Four Vertices for grey square
var verticesGreyCorridors = [
    vec2( -0.8, -0.8 ),
    vec2( -0.8, 0.8 ),
    vec2( 0.8, 0.8 ),
    vec2( 0.8, -0.8 ),
];

// Four vertices for a green block
var verticesGreenBlock = [
    vec2( -0.6, -0.01 ),
    vec2( -0.6, 0.6 ),
    vec2( 0.01, 0.6 ),
    vec2( 0.01, -0.01 ),
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

    programGreyCorridors = initShaders( gl, "vertex-shader", "fragment-shader-grey-corridors" )
    programGreenBlock = initShaders( gl, "vertex-shader", "fragment-shader-green-blocks" )

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

// Render TRIANGLE_FAN
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
    var bufferIdGreen = createBuffers(verticesGreenBlock)
    createVertexArrayObjects(bufferIdGreen, programGreenBlock)
    renderTriangleFan(verticesGreenBlock, programGreenBlock)
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