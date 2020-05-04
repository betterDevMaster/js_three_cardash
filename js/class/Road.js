function Road(w, h, d, x, y, z, rx, ry, rz,  assets, move, rotation){
	this.w = w || 1;
	this.h= h || 1;
	this.d = d ||1;
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
	this.rx = rx || 0;
	this.ry = ry || 0;
	this.rz = rz || 0;
	this.move = move || null;
 	this.rotation = rotation || null;
	this.assets = assets;

}
Road.prototype.init = function(scene, world) {
		var self = this;
		this.loader = new THREE.TextureLoader();
		this.loader.load(this.assets, function ( image ) {
			self.geometry = new THREE.BoxGeometry( self.w, self.h, self.d )
			self.material = new THREE.MeshBasicMaterial({map:image});
     			
     			self.mesh = new THREE.Mesh(self.geometry, self.material);
     			self.mesh.position.set(self.x,self.y,self.z);
     			self.mesh.rotation.set(self.rx,self.ry,self.rz);
     			image.wrapS = THREE.RepeatWrapping;
     			image.wrapT = THREE.RepeatWrapping;
     			image.repeat.set( 1, 10 );
     			
     			
 			
 			self.shape = new CANNON.Box(new CANNON.Vec3(self.w/2,self.h/2, self.d/2));

			self.body = new CANNON.Body({ mass: 0, type : CANNON.Body.KINEMATIC  });

			self.body.addShape(self.shape);
			
			self.body.position= self.mesh.position;

			
			//rotation clip
			if (self.rotation === "X"){
				self.body.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),self.mesh.rotation.x)
			}
			if (self.rotation === "Y"){
				self.body.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0),self.mesh.rotation.y)
			}
			if (self.rotation === "Z"){
				self.body.quaternion.setFromAxisAngle(new CANNON.Vec3(0,0,1),self.mesh.rotation.z)
			}



			
			
			
			
			
			
			
			
			
			

			
			
			// self.body.updateMassProperties();
			

			world.add(self.body);
 			scene.add(self.mesh);
 					
			},
			// Function called when download progresses
			function ( xhr ) {
				console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
			},
			// Function called when download errors
			function ( xhr ) {
				console.log( 'An error happened' );
			}
		);
			
};
