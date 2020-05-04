//app.js
(function(ctx){
	var app = {
		config : { debug : true},
		init : function(){
			this.webgl.initWebgl();
			this.physic.initPhysic();
			this.map.init();
			this.player.init();
			this.gameEngine.initGameEngine();
			consol(this, "app :: ok");	
			return this;
		},
		start : function(){
			consol(this, "============== app :: started =================");
			
				self.update();
			
		},
		update : function(){
			self.req = requestAnimationFrame(self.update);
			//------------------------- with debug-----------------
			
			if (self.config.debug === true){
				self.webgl.stats.begin();
				self.physic.world.step(1/60);
				if(self.player.mesh != undefined){

					self.gameEngine.animate();
				}
				self.webgl.stats.end();
				
			}
			//------------------------- without debug-----------------

			else{
				self.physic.world.step(1/60);
				if(self.player.mesh != undefined){
					self.gameEngine.animate();
				}
				

			}
			self.webgl.renderer.render(self.webgl.scene, self.webgl.camera);
			
		},
	}
	var self = app;
	ctx.app = app;	
})(window);


