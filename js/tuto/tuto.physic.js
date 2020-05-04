(function(ctx){
	var physic = {

		initPhysic : function(){
			consol(app, "physic :: ok");
			this.world = new CANNON.World(),
			this.world.broadphase = new CANNON.NaiveBroadphase();
			this.world.broadphase.useBoundingBoxes = true;	
			this.world.gravity.set(0,-50,0);
		},
	}
	var self = physic;
	ctx.physic = physic;
})(app)