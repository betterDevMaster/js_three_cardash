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
			obst1Tbl : null,
			init : function(){
				this.obst1Tbl=[];
				this.road1 = new Road(20,1,600,  0,0,-100,  0,0,0,"../assets/road/road-texture.png");
				this.road1.init(app.webgl.scene, app.physic.world);
				//1st road

			},
			destroy : function(){
				if (this.road1 != null &&   this.obst1Tbl !=null){
					
					app.webgl.scene.remove(
						this.road1.mesh
					);
					app.physic.world.remove(
						this.road1.body
					);	
						
					this.road1 = null;
					
						
				}
				
				
				
			}
		}
			
	}
	var self =map;
	ctx.map = map;
})(app);