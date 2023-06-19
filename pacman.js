// WebGL context
var canvas;
var gl;

var program;
var vBuffer;

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

    // TODO: delete commented code
    // Set event listeners
    // setEventListeners(canvas);

    // Create data for grey canvas square
    grayCorridors();

    // Create vertex buffer data.
    createBuffers();

    // TODO: delete commented code
    // Load shader files
    // await loadShaders();

    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );

    // TODO: delete commented code
    // Compile the shaders
    // compileShaders();

    // Create vertex array objects
    createVertexArrayObjects();

    // Draw!
    render();
};

window.onload = setup;

var positions = [];

function grayCorridors() {
    // Four Vertices for canvas square
    var vertices = [
        vec2( -0.5, -0.5 ),
        vec2(  -0.5, 0.5 ),
        vec2(  0.5, 0.5 ),
        vec2( 0.5, -0.5 ),
    ];

    // flatten
    positions = flatten(vertices);
}

function createBuffers() {
    // Load data into GPU
	// Creating the vertex buffer
	vBuffer = gl.createBuffer();

    // Binding the vertex buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
	gl.bufferData( gl.ARRAY_BUFFER,  new Float32Array(positions), gl.STATIC_DRAW );   

    logMessage("Created buffers.");
}

function createVertexArrayObjects() { 
    // Associate out shader variables with our data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );   

    logMessage("Created VAOs.");
}


function render() {
	// Clearing the buffer and drawing the square
	gl.clear( gl.COLOR_BUFFER_BIT ); 
	// gl.drawArrays( gl.TRIANGLES_FAN, 0, 4 );
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