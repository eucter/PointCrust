var canvas;
var gl;

   var colors = new Array();
   var verts = new Array();
console.log(verts);

var min_x,max_x,min_y,max_y,min_z,max_z;



function bbox()
{






}


var numPoints;
window.onload = function init() {


    radius = 1.0;
    

   var radius = 1;
	for(var theta=0; theta<=2*3.14; theta+=0.1) {
	  colors.push(theta/(2*3.14), 0.3, 1-(theta/(2*3.14)));
	  verts.push(radius*Math.cos(theta),radius*Math.sin(theta));
	  
	}
	numPoints = colors.length / 3;
    
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    var aR = canvas.width/canvas.height;
    var fov = 3.14/3;
    var near = 0.1;
    var far = 100;
    var f = 1.0 / Math.tan(fov / 2);
    var rangeInv = 1 / (near - far);
    //gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );


	// look up the locations for the inputs to our shaders.
	var u_matLoc = gl.getUniformLocation(program, "u_matrix");
	var colorLoc = gl.getAttribLocation(program, "a_color");
	var vertLoc = gl.getAttribLocation(program, "a_vertex");

	// Set the matrix to some that makes 1 unit 1 pixel.
	gl.uniformMatrix4fv(u_matLoc, false, [
	   1/aR, 0,                          0,   0,
    0,               1/aR,                          0,   0,
    0,               0,   1,  0,
    0,               0,  0,   1
	]);
	var colorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

	var vertBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);

	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(colorLoc);
	gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);
	gl.vertexAttribPointer(vertLoc, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vertLoc);
    


    render();
}






function render() {
    

	
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
    gl.drawArrays( gl.POINTS, 0, numPoints);



	
   //setTimeout(render,500);
}