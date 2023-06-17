// WebGL context
var canvas;
var gl;

var program;
var vBuffer;

// Four Vertices for canvas square
var vertices = [
	vec2( -0.5, -0.5 ),
	vec2(  -0.5, 0.5 ),
	vec2(  0.5, 0.5 ),
	vec2( 0.5, -0.5 ),
];

window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { 
        alert( "WebGL isn't available" ); 
    }
    
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 0.5, 0.5, 0.5, 1.0 );

    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );

    // Load data into GPU
	// Creating the vertex buffer
	vBuffer = gl.createBuffer();

	// Binding the vertex buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );   

	// Associate out shader variables with our data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );   
    
	render();
}


function render() {
	// Clearing the buffer and drawing the square
	gl.clear( gl.COLOR_BUFFER_BIT ); 
	// gl.drawArrays( gl.TRIANGLES_FAN, 0, 4 );

}