// this for global debug msg
function consol(obj, msg){

	if (obj.config.debug === true)console.log(msg);
}

function debugTool(obj, obj2){
	
	if (obj2.config.debug === true){
		consol(obj2, "============= DEBUG MODE ACTIVE ============")
		obj.stats = new Stats();
		obj.stats.setMode( 0 ); // 0: fps, 1: ms, 2: mb

		// align top-left
		obj.stats.domElement.style.position = 'absolute';
		obj.stats.domElement.style.left = '0px';
		obj.stats.domElement.style.top = '0px';

		document.body.appendChild( obj.stats.domElement );
		consol(obj2, "stats :: active")

		obj.trident = new THREE.AxisHelper(5);
		obj.scene.add(obj.trident);

		obj.orbit = new THREE.OrbitControls( obj.camera, obj.renderer.domElement );
		//controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
		obj.orbit.enableDamping = true;
		obj.orbit.dampingFactor = 0.25;
		obj.orbit.enableZoom = true;
		consol(obj2, "orbitControl :: active")
	
	}
}


// sync position of geometry and body
function initPos(obj, objBody){

	objBody.position = obj.position;
	
	

}

// sync camera pos
function syncCamera(camera, obj, x,y,zoom){

	var relativeCameraOffset = new THREE.Vector3(x,y,zoom);
	var cameraOffset = relativeCameraOffset.applyMatrix4( obj.matrixWorld );

	camera.position.x = cameraOffset.x;
	camera.position.y = cameraOffset.y;
	camera.position.z = cameraOffset.z;
	camera.lookAt( obj.position );
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}