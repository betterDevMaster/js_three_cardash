(function(ctx){

	var gameEngine = {
		timer : 300,
		defaultSpeedMax : app.player.speedMax,
		speed : 0,
		lvl:  1,
		initGameEngine : function(){
			if (localStorage.length>0){
				this.chrono.timerTbl += localStorage.getItem("Time");
			}
			consol(app, "gameEngine :: ok");
			document.addEventListener('keydown',self.keyboard.keydown, false);
			document.addEventListener('keyup',self.keyboard.keyup, false);


			this.init();
			this.starter.init(self.timer);
			
		},
		init : function(){

			
			if(this.lvl === 1 ){
				app.map.patern1.init();
				
			}
			
		},
		starter :{
			launch : false,
			init : function(timer){
				var timer = timer || 1500;
				var starter = document.createElement('div');
				starter.id ='starter';
				document.body.appendChild(starter);
				
			},
			start: function(timer, callback){
				var timer = timer || 1500;
				var starter = document.getElementById('starter');
				if(starter !== null){

					starter.innerHTML = timer;
				}
				
				if(timer < 0){
					if(starter !== null){

						starter.remove();
						self.starter.launch = true;
					}
					else{
						if(self.starter.launch === true){
							self.chrono.init();
							
							self.starter.launch = false;
						}

						callback.control();
					}

				}
			}
		},
	
		
		finish : function(){
			cancelAnimationFrame(app.req);
			localStorage.setItem("Time", this.chrono.timer );
			this.chrono.timerTbl += localStorage.getItem('Time') +"|";
			localStorage.setItem("Time", this.chrono.timerTbl );
			
			document.location ='finish.html';
			
		},
		chrono : {
			timerTbl:[],
			centi : 0,
			secon : 0,
			minu : 0,
			init:function(){
				this.centi++; 
				
				if (this.centi>9){
					this.centi=0;
					this.secon++
				} 
				if (this.secon>59){
					this.secon=0;this.minu++
				} 
				this.timer = this.minu + ":"+this.secon +":"+this.centi;
				document.getElementById("timer").innerHTML = this.timer;
				this.compte = setTimeout('app.gameEngine.chrono.init()',100);
			},
			stop : function(){
			
				clearTimeout(self.chrono.compte) //arrête la fonction chrono()
				
			},
			reset : function(){
			//fonction qui remet les compteurs à 0
				clearTimeout(self.chrono.compte) //arrête la fonction chrono()
				this.centi=0;
				this.secon=0;
				this.minu=0;
				this.timer = this.minu + ":"+this.secon +":"+this.centi;
				document.getElementById("timer").innerHTML = this.timer;
			}
		},
	
		keyboard: {
			speed:{},
			jump: false,
			left:false,
			right : false,
			forward : false,
			back : false,
			boost : false,


			keydown : function(event){
				
				switch(event.keyCode){
					case 83 : self.keyboard.back = true;
					break;
					case 90 : self.keyboard.forward = true;
					break;
					case 32 : self.keyboard.jump = true;
					event.preventDefault();	
					break;
					case 81 : self.keyboard.left = true;
					break;
					case 68 : self.keyboard.right = true;
					break;
					case 16 : self.keyboard.boost = true;
					break;
				}
			},
			keyup : function(event){
				switch(event.keyCode){
					case 83 : self.keyboard.back = false;
					break;
					case 90 : self.keyboard.forward = false;
					break;
					case 81 : self.keyboard.left = false;
					break;
					case 68 : self.keyboard.right = false;
					break;
					case 32 : self.keyboard.jump = false ;
					break;
					case 16 : self.keyboard.boost = false;
					break;
				}
			},
			control : function(){
		
				var sound_forward = document.getElementById('audio');
				var sound_break = document.getElementById('audio2');
				var sound_stoped = document.getElementById('audio3');
				
				if (this.forward === true){
					sound_forward.play();
					sound_break.pause();
					sound_stoped.pause();
					self.speed++;
					app.player.mesh.position.z += Math.sin(app.player.mesh.rotation.y + Math.PI/2)*self.speed/app.player.speedAcceleration;
					app.player.mesh.position.x -= Math.cos(app.player.mesh.rotation.y + Math.PI/2)*self.speed/app.player.speedAcceleration;				
				}
				else if(this.forward === false &&  this.back === false){
					sound_forward.pause();

					sound_stoped.play();

					if(self.speed > 0 ){

						self.speed--;
						app.player.mesh.position.z += Math.sin(app.player.mesh.rotation.y + Math.PI/2)*self.speed/app.player.engineSlow;
						app.player.mesh.position.x -= Math.cos(app.player.mesh.rotation.y + Math.PI/2)*self.speed/app.player.engineSlow;	
					}

					if(self.speed < 0 ){
						
						self.speed++;
						app.player.mesh.position.z += Math.sin(app.player.mesh.rotation.y + Math.PI/2)*self.speed/app.player.speedAcceleration;
						app.player.mesh.position.x -= Math.cos(app.player.mesh.rotation.y + Math.PI/2)*self.speed/app.player.speedAcceleration;
					}
					
				}
				if ( this.back === true && self.speed>0){
					sound_break.play();
					sound_forward.pause();
					sound_stoped.pause();
					

					self.speed -= app.player.break;
					app.player.mesh.position.z += Math.sin(app.player.mesh.rotation.y + Math.PI/2)*self.speed/app.player.speedAcceleration
					app.player.mesh.position.x -= Math.cos(app.player.mesh.rotation.y + Math.PI/2)*self.speed/app.player.speedAcceleration

					

				}
				if ( this.back === true && self.speed <=0){
					sound_break.pause();
					self.speed--;
					app.player.mesh.position.z += Math.sin(app.player.mesh.rotation.y + Math.PI/2)*self.speed/app.player.speedAcceleration;
					app.player.mesh.position.x -= Math.cos(app.player.mesh.rotation.y + Math.PI/2)*self.speed/app.player.speedAcceleration;
					
				}
			
				if ( (this.left === true && self.speed >0)  || (this.left === true && self.speed <0)){
					app.player.mesh.rotation.y +=150/app.player.angle;
				}
				if ( (this.right === true && self.speed >0) || (this.right === true && self.speed <0)){
					app.player.mesh.rotation.y -=150/app.player.angle;
				}

				if ( self.speed >=app.player.speedMax ){

					self.speed = app.player.speedMax;
				}
				else if (self.speed <=-app.player.speedMax ){
					self.speed = -app.player.speedMax;
				}
				if(this.boost === true){
					
					app.player.speedMax = app.player.boost;
		
					

				}
				else{
					app.player.speedMax = self.defaultSpeedMax;
			

				
				}
				if(this.jump === true && app.player.jumpReady === true ){
				

					
					app.player.jumping = true;
					app.player.jumpReady = false;

					
					
				}
				if(  app.player.jumpReady === false && app.player.jumping === true){

						app.player.body.position.y +=0.7;
						app.webgl.camera.position.y +=0.7;
						setTimeout(function(){
							app.player.jumping = false;
						}, 500)
						
				}


				//collide deceleration
				for(var i=0; i<app.map.patern1.obst1Tbl.length; i++){
					if(self.collider(app.player.body, app.map.patern1.obst1Tbl[i].body)){
						self.speed -= 7
					};
				}
			}
			
		},
		win : {
			lvl1:function(){
				if(app.player.mesh.position.x<-71 && app.player.mesh.position.x>-87 && app.player.mesh.position.z<-1670){
					self.lvl=2;
				}
			}
		},
		switchPatern : function(){
		
			if(this.lvl === 2 ){
				
				app.map.patern1.destroy();
				self.chrono.stop();
				self.finish();
				this.lvl=-1;
				
			}
			
			
		},
		collider : function(bodyA, bodyB){
			
			for(var i=0; i<app.physic.world.contacts.length; i++){
				var c = app.physic.world.contacts[i];
				if((c.bi === bodyA && c.bj === bodyB) || (c.bi === bodyB && c.bj === bodyA)){
					consol(app,  ' COLLIDE :: DETECT ' + bodyA + 'AND' + bodyB );
					return true;
				}
			}
			    
		},
		//gameloop

		animate : function(){
			// console.log(app.player.mesh.position)
			self.switchPatern();
			initPos(app.player.mesh, app.player.body);
			syncCamera(app.webgl.camera, app.player.mesh, 0,1.2,-3);

		
			self.starter.start(self.timer, self.keyboard);

			
			app.player.respawn();

			if(self.lvl ===1){
				app.player.fly(-660);
				app.map.patern1.move(app.map.patern1.road9)
				self.win.lvl1();
				
			}
			self.timer--;			
		},
		
		
	}
	var self = gameEngine;
	ctx.gameEngine = gameEngine;
})(app);