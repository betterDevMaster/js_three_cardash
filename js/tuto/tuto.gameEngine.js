(function(ctx){

	var speed = 0;
	var gameEngine = {
		lvl:  1,
		timer:0,
		initGameEngine : function(){
			if (localStorage.length>0){
				this.chrono.timerTbl += localStorage.getItem("Time");
			}
			consol(app, "gameEngine :: ok");
			document.addEventListener('keydown',self.keyboard.keydown, false);
			document.addEventListener('keyup',self.keyboard.keyup, false);

			
			this.init();
			
		},
		init : function(){

			this.chrono.init();
			if(this.lvl === 1 ){
				app.map.patern1.init();
			}
			this.feedbacks.init();
			
		},
		
		finish : function(){
			cancelAnimationFrame(app.req);
			
			console.log(this.chrono.timer)
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
				}
			},
			control : function(){
				this.sound_forward = document.getElementById('audio');
				this.sound_break = document.getElementById('audio2');
				this.sound_stoped = document.getElementById('audio3');
				
				if (this.forward === true){
					this.sound_forward.play();
					this.sound_break.pause();
					this.sound_stoped.pause();
					speed++;
					app.player.mesh.position.z += Math.sin(app.player.mesh.rotation.y + Math.PI/2)*speed/app.player.speedAcceleration;
					app.player.mesh.position.x -= Math.cos(app.player.mesh.rotation.y + Math.PI/2)*speed/app.player.speedAcceleration;				
				}
				else if(this.forward === false &&  this.back === false){
					this.sound_forward.pause();
					
					this.sound_stoped.play();

					if(speed > 0 ){

						speed--;
						app.player.mesh.position.z += Math.sin(app.player.mesh.rotation.y + Math.PI/2)*speed/app.player.engineSlow;
						app.player.mesh.position.x -= Math.cos(app.player.mesh.rotation.y + Math.PI/2)*speed/app.player.engineSlow;	
					}

					if(speed < 0 ){
						
												speed++;
						app.player.mesh.position.z += Math.sin(app.player.mesh.rotation.y + Math.PI/2)*speed/app.player.speedAcceleration;
						app.player.mesh.position.x -= Math.cos(app.player.mesh.rotation.y + Math.PI/2)*speed/app.player.speedAcceleration;
					}
					
				}
				if ( this.back === true && speed>0){
					this.sound_break.play();
					this.sound_forward.pause();
					this.sound_stoped.pause();
					

					speed -= app.player.break;
					app.player.mesh.position.z += Math.sin(app.player.mesh.rotation.y + Math.PI/2)*speed/app.player.speedAcceleration
					app.player.mesh.position.x -= Math.cos(app.player.mesh.rotation.y + Math.PI/2)*speed/app.player.speedAcceleration

					

				}
				if ( this.back === true && speed <=0){
					this.sound_break.pause();
					speed--;
					app.player.mesh.position.z += Math.sin(app.player.mesh.rotation.y + Math.PI/2)*speed/app.player.speedAcceleration;
					app.player.mesh.position.x -= Math.cos(app.player.mesh.rotation.y + Math.PI/2)*speed/app.player.speedAcceleration;
					
				}
			
				if ( this.left === true){
					app.player.mesh.rotation.y +=speed/app.player.angle;
				}
				if ( this.right === true){
					app.player.mesh.rotation.y -=speed/app.player.angle;
				}

				if ( speed >=app.player.speedMax ){

					speed = app.player.speedMax;
				}
				else if (speed <=-app.player.speedMax ){
					speed = -app.player.speedMax;
				}
				
				if(this.jump === true && app.player.jumpReady === true ){
				

					
					app.player.jumping = true;
					app.player.jumpReady = false;

					
					
				}
				if(  app.player.jumpReady === false && app.player.jumping === true){

						app.player.body.position.y +=0.6;
						app.webgl.camera.position.y +=0.6;
						setTimeout(function(){
							app.player.jumping = false;
						}, 500)
						
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

		feedbacks : {
			init : function(){
				this.feedbacks = document.createElement("div");
				this.feedbacks.setAttribute('id',"feedbacks")
				this.feedbacks.style.opacity = "0";
				this.feedbacks.style.position = 'absolute';
				this.feedbacks.style.width = window.innerWidth/2+"px";
				this.feedbacks.style.height =  window.innerHeight/15 +"px";
				this.feedbacks.style.top =  0+ 'px';
				this.feedbacks.style.left = 25 + '%';
				document.body.appendChild(this.feedbacks);
			},
			help : function(msg){
				this.feedbacks.style.opacity ="1";
				this.feedbacks.innerHTML = "<p class='help'>"+msg+"</p>";
			},
			
		},
		//gameloop

		animate : function(){
			// console.log(app.player.mesh.position)
			self.switchPatern();
			initPos(app.player.mesh, app.player.body);
			syncCamera(app.webgl.camera, app.player.mesh, 0,1.2,-3)
			self.keyboard.control();
			app.player.respawn();

			if(self.lvl ===1){
				self.win.lvl1();
			}


			self.timer ++;
			if (app.map.patern1.road1.mesh !=undefined){
				initPos(app.map.patern1.road1.mesh, app.map.patern1.road1.body);

			}


			if ( self.timer <500){
				this.feedbacks.help("Hi you want to be The Pilot ... ok no Problem you are here to learn");
			}
			if( self.timer>500 &&self.timer <=2000){
				self.timer = 1800;
				this.feedbacks.help("First you can press Z,Q,S,D for move...");
				if (this.keyboard.left === true || this.keyboard.right === true || this.keyboard.forward === true || this.keyboard.back === true){
						self.timer = 2002;
				}
				
				
					
				
			}
			if (self.timer >2001 && self.timer <=2400){
				self.timer = 2300;
				this.feedbacks.help("Nice!!!! you well done now do a jump with your car what?? here we are in the game the developper is drunking... press SPACE for jump...");
				if (this.keyboard.jump === true){
						self.timer = 2401;
				}
				
			}
			if (self.timer >2400 && self.timer <=3200){
				this.feedbacks.help("look on the right there are your song player you could change track soon... after you have you timer you need to ending race to validate this timer after go in menu for look yours scores ....");	
			}
			if (self.timer >3200 && self.timer <=3500){
				self.timer = 3400;
				this.feedbacks.help("if you fall during the race you will recive a penality... do your first fall for test dont worry you can't die this is a game ...");
				if (app.player.mesh.position.y<-199){
						self.timer = 3501;
				}	
			}
			if (self.timer >3500 && self.timer <=3800){
				self.timer = 3700;
				this.feedbacks.help("Nice you are ready for the race... go at the end of this road for finnish  this tutorial ");
				if(app.player.mesh.position.z < -395){

					document.location = "app.html";
				}
			}
			
			
		},
		
		
	}
	var self = gameEngine;
	ctx.gameEngine = gameEngine;
})(app);