(function(ctx){
	var player ={
		init : function(){
			this.loadCar();
			consol(app, "player :: ok");
		},
		assets: "../models/nismo.json",
		engineSlow : 300,
		speedAcceleration : 300,
		break : 3,
		angle : 5000,
		speedMax:200,
		boost : 800,
		moving : false,
		loadCar : function(){

			this.loader = new THREE.JSONLoader();
			this.loader.load( this.assets, function(geometry, material){
				
				self.material = new THREE.MeshFaceMaterial(material);
				self.mesh = new THREE.Mesh( geometry, self.material );
				self.mesh.position.set(0,5,100 );
				// self.mesh.position.set(-80,-100,-1500 );
				self.mesh.rotation.y +=3.1 ;
				
				self.shape = new CANNON.Box(new CANNON.Vec3(1,0.5,2));
				self.body = new CANNON.Body({ mass: 10, });
				self.body.position.z = self.mesh.position.z;
				self.body.addShape(self.shape);
				self.body.updateMassProperties();
				self.body.fixedRotation = true;
				

				self.body.linearDamping = 0.6;
			
				app.physic.world.add(self.body);
				app.webgl.scene.add(self.mesh);
				self.body.addEventListener("collide", self.jump, false);
		
				
			});
		},
		jump : function(evt){
			if(evt ){
				
				self.jumpReady = true;
				self.jumping = false;
				self.flying = false;
				
			}
			
		},
		fly : function(pos){
			
			if( this.mesh.position.z < pos && this.mesh.position.z > pos-50  && this.jumpReady === true){
				
				this.flying = true;
			}
			if (this.flying && this.mesh.position.y < 8){
				this.body.velocity.y+=4.4;
				this.jumpReady = false;
				setTimeout(function(){
					self.flying = false;
				},1500)
			}

		},
		respawn : function(){
			if ( this.mesh.position.y < -200 ){
				this.mesh.position.set(0,20,100 );
				app.gameEngine.speed = 0;
			}
		},
	
		
	}
	ctx.player = player;
	var self = player;
})(app);