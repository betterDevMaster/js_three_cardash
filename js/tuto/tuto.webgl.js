(function(ctx){
	var webgl = {

		initWebgl : function(){
			this.scene = new THREE.Scene();
			
			this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 100000 );
			this.camera.position.set(0,0,30)
			this.camera.lookAt(this.scene.position);  
			
			this.light2 = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
			this.scene.add( this.light2 );
			this.light = new THREE.SpotLight( 0xffffff ); // soft white light
			this.light.position.set(0,500,0);
			this.scene.add( this.light );

			this.directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
      			this.directionalLight.position.set( -2, 1.2, -10 ).normalize();
      			this.scene.add( this.directionalLight );

      			this.pointLight = new THREE.PointLight( 0xffffff, 2 );
			this.pointLight.position.set( 0, 0, 0 );
			this.scene.add( this.pointLight );
			
			this.renderer = new THREE.WebGLRenderer();
			this.renderer.setSize( window.innerWidth, window.innerHeight -0.5 );
		
			document.body.style.margin = 0;
			document.body.style.overflow = 'hidden';
			document.body.appendChild( this.renderer.domElement );
			
			debugTool(this, app);
		
			consol(app, "==================== COMPONENTS ===================");
			consol(app, "webgl :: ok")
				
		},
	}
	var self = webgl;
	ctx.webgl =  webgl;
	


})(app)