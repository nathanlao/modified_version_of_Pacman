// WebGL context
var canvas;
var gl;

var programBlueBorders;
var programGreyCorridors;
var vBufferBorders;
var vBufferCorridors;

function initializeContext() {

    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { 
        alert( "WebGL isn't available" ); 
    }

    gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 0.5, 0.5, 0.5, 1.0 ); // grey

    logMessage("WebGL initialized.");

}

async function setup() {
    // Initialize the context.
    initializeContext();

    // Create data for pacman
    canvasPacman();

    // Create vertex buffer data.
    createBuffers();

    // Load shaders (from html) and initialize attribute buffers
    programBlueBorders = initShaders( gl, "vertex-shader", "fragment-shader-blue-borders" );
    programGreyCorridors = initShaders( gl, "vertex-shader", "fragment-shader-grey-corridors" );

    // Create vertex array objects
    createVertexArrayObjects();

    // Draw!
    render();
};

window.onload = setup;

var positionsBlue = [];
var positionsGrey = [];

function canvasPacman() {
    // Four Vertices for blue borders
    var verticesBlueBorders = [
        vec2( -0.8, -0.8 ),
        vec2( -0.8, 0.8 ),
        vec2( 0.8, 0.8 ),
        vec2( 0.8, -0.8 ),
    ];

    // Four Vertices for grey square
    var verticesGreyCorridors = [
        vec2( -0.75, -0.75 ),
        vec2( -0.75, 0.75 ),
        vec2( 0.75, 0.75 ),
        vec2( 0.75, -0.75 ),
    ];

    // flatten
    positionsBlue = flatten(verticesBlueBorders);
    positionsGrey = flatten(verticesGreyCorridors);
}

function createBuffers() {
    // Load data into GPU
	// Creating the vertex buffer
	vBufferBorders = gl.createBuffer();
    // Binding the vertex buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, vBufferBorders);
	gl.bufferData( gl.ARRAY_BUFFER,  new Float32Array(positionsBlue), gl.STATIC_DRAW );   

    // Load data into GPU for grey square
    vBufferCorridors = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferCorridors);
    gl.bufferData( gl.ARRAY_BUFFER,  new Float32Array(positionsGrey), gl.STATIC_DRAW ); 

    logMessage("Created buffers.");
}

function createVertexArrayObjects() { 
    // Associate out shader variables with our data buffer
    // For blue borders
    gl.useProgram( programBlueBorders );
	var vPositionBlue = gl.getAttribLocation( programBlueBorders, "vPosition" );
    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferBorders);
	gl.vertexAttribPointer( vPositionBlue, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPositionBlue );
    
    // For grey square
    gl.useProgram( programGreyCorridors );
    var vPositionGrey = gl.getAttribLocation( programGreyCorridors, "vPosition" );
    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferCorridors);
    gl.vertexAttribPointer( vPositionGrey, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPositionGrey );
    
    logMessage("Created VAOs.");
}


function render() {
	// Clearing the buffer
	gl.clear( gl.COLOR_BUFFER_BIT ); 

    // Blue borders
    gl.useProgram( programBlueBorders );
    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferBorders);
	gl.drawArrays( gl.LINE_LOOP, 0, 4 ); // line loop for border

    // Draw grey square
    gl.useProgram( programGreyCorridors );
    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferCorridors);
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
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