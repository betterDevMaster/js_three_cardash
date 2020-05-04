(function(ctx){
	var map = {
		init : function(){
			consol(app,"map :: ok");
			this.skyBox.init();
			// now we init patern in game engine for statemanager
			// this.patern1.init();

			// this.patern2.init();
			// this.patern3.init();
		},
		skyBox : {
			assets : ['velcor_ft.jpg','velcor_bk.jpg',//right left
				  'velcor_up.jpg','velcor_dn.jpg',// up down
				  'velcor_rt.jpg', 'velcor_lf.jpg'],//bk ft
			material : [],
			geometry :  new THREE.BoxGeometry(10000,10000,10000),
			loader : new THREE.TextureLoader(),
			init : function(){
				this.loader.setPath( '../assets/skybox/' );
				for(var i =0; i<this.assets.length; i++){
					this.materials = new THREE.MeshBasicMaterial({map:this.loader.load( this.assets[i] ), side: THREE.BackSide})
					this.material.push(this.materials);
					this.materialFinal = new THREE.MeshFaceMaterial(this.material);
				}
				
				this.mesh = new THREE.Mesh(this.geometry, this.materialFinal);
				app.webgl.scene.add(this.mesh);
				consol(app,"map > skybox :: ok");	
			}		
		},
		patern1:{
			
			road1 : null,
			road2 : null,
			road3: null,
			road4 : null,
			road5 : null,
			road6 : null,
			road7: null,
			road8 : null,
			road9 : null,
			road10 : null,
			road11 : null,
			road12 : null,
			obst1Tbl : null,
			obst2Tbl : null,
			init : function(){
				this.obst1Tbl=[];
				this.road1 = new Road(20,1,250,  0,0,0,  0,0,0,"../assets/road/road-texture.png");
				this.road2 = new Road(20,1,50  ,0,0,-100, 0.3,0,0, "../assets/road/road-texture.png",null,"X");
				this.road3 = new Road(20,1,100  ,0,-100,-250, 0,0,0,"../assets/road/road-texture.png");
				this.road4 = new Road(20,1,100  ,0,-100,-380, 0,0,0,"../assets/road/road-texture.png");
				this.road5 = new Road(20,1,350  ,165,-100,-443, 0,1.59,0,"../assets/road/road-texture.png",null,"Y");
				this.road6 = new Road(20,1,150  ,350,-100,-511.5, 0,0,0,"../assets/road/road-texture.png");
				this.road7 = new Road(20,1,50  ,350,-100,-640, 0,0,0,"../assets/road/road-texture.png");
				this.road8 = new Road(20,1,350  ,350,0,-920, 0,0,0,"../assets/road/road-texture.png");
				this.road9 = new Road(20,1,50  ,350,0,-1120, 0,0,0, "../assets/road/road-texture.png", true);
				this.road10 = new Road(20,1,50  ,350,0,-1250, 0,0,0,"../assets/road/road-texture.png");
				this.road11 = new Road(20,1,350 ,180,0,-1300, 0,1.59,0,"../assets/road/road-texture.png",null,"Y");
				this.road12 = new Road(20,1,350 ,-80,-100,-1500, 0,0,0,"../assets/road/road-texture.png");


				

				this.road1.init(app.webgl.scene, app.physic.world);
				this.road2.init(app.webgl.scene, app.physic.world);
				this.road3.init(app.webgl.scene, app.physic.world);
				this.road4.init(app.webgl.scene, app.physic.world);
				this.road5.init(app.webgl.scene, app.physic.world);
				this.road6.init(app.webgl.scene, app.physic.world);
				this.road7.init(app.webgl.scene, app.physic.world);
				this.road8.init(app.webgl.scene, app.physic.world);
				this.road9.init(app.webgl.scene, app.physic.world);
				this.road10.init(app.webgl.scene, app.physic.world);
				this.road11.init(app.webgl.scene, app.physic.world);
				this.road12.init(app.webgl.scene, app.physic.world);

				//1st road
				for(var i =0; i<55; i++){
					var inter = -50 + i*20;
					if(i<6){
						
						var x_alea =  getRandomInt(-10,10)
						this.obst1Tbl[i] = new Obst(10,40,5  ,x_alea,3,-inter, 0,0,0,"../assets/obstacle/obst.jpg");
						
						this.obst1Tbl[i].init(app.webgl.scene, app.physic.world);
					}
					if(i===6){
						this.obst1Tbl[i] = new Obst(20,5,5  ,0,-100,-inter-200, 0,0,0,"../assets/obstacle/obst.jpg");
						
						this.obst1Tbl[i].init(app.webgl.scene, app.physic.world);
					}
					if(i>6 && i<21){
						var x_alea =  getRandomInt(-10,10)
						this.obst1Tbl[i] = new Obst(10,40,5  ,inter,-97,x_alea- 445, 0,1.5,0,"../assets/obstacle/obst.jpg",'Y');
						
						this.obst1Tbl[i].init(app.webgl.scene, app.physic.world);
					}
					if(i===21){
						this.obst1Tbl[i] = new Obst(20,5,5  ,350,-100,-inter-120, 0,0,0,"../assets/obstacle/obst.jpg");
						
						this.obst1Tbl[i].init(app.webgl.scene, app.physic.world);
					}
					if(i>21 && i<30){
						var x_alea =  getRandomInt(-10,10)
						this.obst1Tbl[i] = new Obst(10,40,5  ,x_alea+350,0,-inter-400, 0,0,0,"../assets/obstacle/obst.jpg");
						
						this.obst1Tbl[i].init(app.webgl.scene, app.physic.world);
						

					}
					if(i===30){
						this.obst1Tbl[i] = new Obst(20,5,5  ,350,0,-inter-450, 0,0,0,"../assets/obstacle/obst.jpg");
						
						this.obst1Tbl[i].init(app.webgl.scene, app.physic.world);
					}
					if(i>30 && i<45){
						var x_alea =  getRandomInt(-10,10)
						this.obst1Tbl[i] = new Obst(10,40,5  ,inter-500,3,x_alea-1300, 0,1.5,0,"../assets/obstacle/obst.jpg",'Y');
						
						this.obst1Tbl[i].init(app.webgl.scene, app.physic.world);
						

					}
					if(i>=45 && i<55){
						var x_alea =  getRandomInt(-10,10)
						this.obst1Tbl[i] = new Obst(10,40,5  ,x_alea-80,-97,-inter-500, 0,0,0,"../assets/obstacle/obst.jpg");
						
						this.obst1Tbl[i].init(app.webgl.scene, app.physic.world);
					}
					
				}
				
			},
			move : function(Road){
				
				
				
				if( Road.mesh.position.z <= -1200 && Road.move == false){
					
					Road.move = true;
				}
				if(Road.mesh.position.z >= -1120 && Road.move == true){
					Road.move = false;
					
				}

				if(Road.move == false){
					Road.mesh.position.z -= 0.5;
				}
				if(Road.move == true){
					Road.mesh.position.z += 0.5;
				}
				
			},
			destroy : function(){
				if (this.road1 != null &&   this.obst1Tbl !=null){
					
					app.webgl.scene.remove(
						this.road1.mesh, 
						this.road2.mesh,
						this.road3.mesh, 
						this.road4.mesh,
						this.road5.mesh, 
						this.road6.mesh,
						this.road7.mesh, 
						this.road8.mesh,
						this.road9.mesh, 
						this.road10.mesh,
						this.road11.mesh, 
						this.road12.mesh
					);
					app.physic.world.remove(
						this.road1.body, 
						this.road2.body,
						this.road3.body, 
						this.road4.body,
						this.road5.body, 
						this.road6.body,
						this.road7.body, 
						this.road8.body,
						this.road9.body, 
						this.road10.body,
						this.road11.body, 
						this.road12.body
					);	
					
					for (var i =0; i<this.obst1Tbl.length; i++){
						
						app.webgl.scene.remove(this.obst1Tbl[i].mesh);
						app.physic.world.remove(this.obst1Tbl[i].body);
					}		
						
					this.road1 = null;
					this.road2 = null;
					this.road3 = null;
					this.road4 = null;
					this.road5 = null;
					this.road6 = null;
					this.road7 = null;
					this.road8 = null;
					this.road9 = null;
					this.road10 = null;
					this.road11= null;
					this.road12 = null;
					this.obst1Tbl = null;	
						
				}
				
				
				
			}
		}
			
	}
	var self =map;
	ctx.map = map;
})(app);