//function.js
var move = false;
var jumpy = false;
var celerite = 0;
var accel = false;
var prev_state;
var centi   = 0 ;
var secon   = 0 ;
var minu    = 0 ;
var scores = [];
var move = false;
var jumpy = false;
var celerite = 0;
var accel = false;
var prev_state;
var playAudio = false;



// controls
function moveForward(obj, objGeometry, speed){
	// play("assets/audio/vroom2.mp3");
	obj.position.z += Math.sin(objGeometry.rotation.y + Math.PI/2)*speed;
	obj.position.x -= Math.cos(objGeometry.rotation.y + Math.PI/2)*speed
}

function moveBack(obj, objGeometry, speed){
	obj.position.z -= Math.sin(objGeometry.rotation.y + Math.PI/2)*speed;
	obj.position.x += Math.cos(objGeometry.rotation.y + Math.PI/2)*speed
}

function moveLeft(obj, speed){
	obj.position.x -= speed;
}

function moveRight(obj, speed){
	obj.position.x += speed;
}

function jump(obj){
	obj.velocity.y = 0;
	obj.velocity.y += 20;

	if(obj.position.y >1){
		jumpy = false;
	}
	if(obj.position.y <1){
		jumpy = false;
	}
}

function angle(obj, rotation){
	if ( rotation === "right"){
		obj.rotation.y -= 0.03;
	}
	if ( rotation === "left"){
		obj.rotation.y += 0.03;
	}
}

function celeration(obj, objGeometry, speed,dir){
	if (dir == "forward") {	

//augmente la vitesse 
		if (accel == true ) {
			celerite += 0.07;
			if (celerite >= 1) {
				celerite = 1;
			};
		}


//reduit la vitesse
		if (accel == false ) {
			celerite -= 0.09;
			if (celerite <= 0) {
				celerite = 0;
			};
		};
	
		currentSpeed = celerite * speed;		
		moveForward(obj, objGeometry, currentSpeed);
	};

	if (dir == "back" ) {		
//augmente la vitesse de recule
		if (accel == true) {
			celerite -= 0.007;
			if (celerite <= -1) {
				celerite = -1;
			};
		};
//reduit la vitesse
		if (accel == false) {
			celerite += 0.004;
			if (celerite <= 0) {
				celerite = 0;
			};
		};		
		currentSpeed = celerite * speed;
		moveBack(obj, objGeometry, currentSpeed);
	};
}

function leapJump(obj, controller){
	if(controller.frame().valid && controller.frame().gestures.length > 0){
		controller.frame().gestures.forEach(function(gesture){
			switch (gesture.type){
			case "keyTap":
			jump(obj);
			break;
			}
		});
	}	
}

function leapControls(controller, obj, objGeometry, handPositon){
	if (handPositon[2] < 0) {
		accel = true;
		if ( playAudio === false){
			playMotor();
			playAudio = true;
		}


		if(celerite <= 0 ){
			celeration(obj, objGeometry, 10, "forward");
			prev_state = "forward";
		}

	}
	else{
		playAudio = false;
		stopMotor();
	}

	if (handPositon[2] > -1200 && handPositon[2] < 1200 ) {
	
		if (prev_state == "forward") {
			//vitesse
			celeration(obj, objGeometry, 0.5, "forward");
		}
		


		if (prev_state == "back") {
			celeration(obj, objGeometry, 0.3, "back");
		};
		
	};
	if (handPositon[2] > 350){
		accel = false;
		
		if (celerite == 0) {
			celeration(obj, objGeometry, 0.8, "back");
			prev_state = "back";

		};
	};

	if (handPositon[0] > 1100){
		angle(objGeometry, "right");
	};
	if (handPositon[0] < 200 ){
		angle(objGeometry, "left");
	};
	if (jumpy === true){
		leapJump(obj, controller);
	}

}

function controls(controller, obj, objGeometry){ // ajouter les objets a la fonction au fur et a mesure pour eviter de creer a chaque fois un event listener raison de perf
		
	    
		if(controller.pressed("Z")  ){
			if ( playAudio === false){
				playMotor();
				playAudio = true;
			}
			
			moveForward(obj, objGeometry, 0.4);
		}
		else{
			playAudio = false;
			stopMotor();
		}

		
		if(controller.pressed("S") ){
			moveBack(obj, objGeometry, 0.4);
		}
		
		if(controller.pressed("Q") ){
			angle(objGeometry,'left');
		}
		if(controller.pressed("D") ){
			angle(objGeometry,'right');
		}
		if(controller.pressed("space")&& jumpy === true){			
			jump(obj);
		}
		// if(evt.keyCode == 40){
		// 	moveBack(obj, objGeometry, 0.004);	
		// }			
		// if(evt.keyCode == 37){
		// 	objGeometry.rotation.y+=0.0001;
		// }
		// if(evt.keyCode == 39){
		// 	objGeometry.rotation.y-=0.0001;
		// }
		// if(evt.keyCode == 32 && jumpy === true){			
		// 	jump(obj);
		// }


}
//  instruction
function handRight(hand){
	//vers la droite
	if (hand.position.x < 10){
		moveRight(hand, 0.3);
	}else{
		hand.position.x = -3;
	}
};

function handLeft(hand){
	//vers la gauche
	if (hand.position.x > -10){
		moveLeft(hand, 0.3);
	}else{
		hand.position.x = 3;
	}
};

function handForward(hand, handGeometry){
	// vers l'avant
	if (hand.position.z > 230){
		hand.position.z -=0.3;
	}
	else{
		hand.position.z =240;
	}
};

function handJump(hand){
	// event tappe 
	if ( hand.position.y > -6 && hand.position.y < 6){
		hand.position.y += 0.1;
	}else{
		hand.position.y = 3;
	}
};

function showHand(obj, hand, handGeometry){
	if( obj.position.z < 251 && obj.position.z > 248){
		handForward(hand, handGeometry);
	}
	if( obj.position.z < 248 && obj.position.z > 200){
		initPos(hand, -3,4,170);
		tuto.hand.rotation.x = 1.5;
		hand.visible = false;
	}
	if ( obj.position.z < 190 && obj.position.z > 150) {
		hand.visible = true;
		handRight(hand);
		
	}
	if (obj.position.z < 120 && obj.position.z > 40 ){
		initPos(hand, 3,4,20);
		hand.visible = false;
	}
	if ( obj.position.z < 40 && obj.position.z > -40 ){
		hand.visible = true;		
		handLeft(hand);
	}
	if (obj.position.z < -40 && obj.position.z > -190){
		initPos(hand, 0,4,-210);
		hand.rotation.x = 0.4;
		hand.visible = false;
	}
	if ( obj.position.z < -190 ){
		hand.visible = true;		
		handJump(hand);
	}
	if (obj.position.z < -207){
		hand.visible = false;
	}
}

// geometry
function initPos(obj, xa, ya, za){
	obj.position.x = xa;
	obj.position.y = ya;
	obj.position.z = za;
}

function makeObstacle(obj,w,h,d,x,y,z, image){
	obj.obstacleGeometry = new THREE.BoxGeometry( w, h, d );
	obj.obstacleMaterial = new THREE.MeshBasicMaterial( {  map : image } );
	obj.obstacle = new THREE.Mesh( obj.obstacleGeometry, obj.obstacleMaterial );
	obj.obstacle.position.set(0,0,0).add(new THREE.Vector3(x,y,z));
	
	return obj.obstacle;
}

// physic
function detectCollide(obj){
	obj.addEventListener("collide",function(e){
        var contact = e.contact;
        if (e.contact){
          jumpy = true;
        }
    });
}

function initCar(obj, geometry){
	  obj.carShape = new CANNON.Box(new CANNON.Vec3(1.4,1,2.2));
      obj.carBody = new CANNON.Body({mass:50});
      obj.carBody.addShape(obj.carShape);
      obj.carBody.fixedRotation = true;
      obj.carBody.updateMassProperties();
      obj.world.add(obj.carBody);
      obj.materialc = new THREE.MeshPhongMaterial( { color: 0x050505,  shininess : 50 } ),
      obj.car = new THREE.Mesh( geometry, obj.materialc );
      obj.scene.add(obj.car);
}


function makeObstacleBody(obj,x,y,z){
	obj.obstacleShape = new CANNON.Box(new CANNON.Vec3(x,y,z));
	obj.obstacleBody = new CANNON.Body({mass:0});
	obj.obstacleBody.addShape(obj.obstacleShape);
	obj.obstacleBody.fixedRotation = true;
	obj.obstacleBody.updateMassProperties();
	obj.world.add(obj.obstacleBody);

	return obj.obstacleBody;
}

function makeRoadBody(obj,x,y,z){
	obj.roadShape = new CANNON.Box(new CANNON.Vec3(x,y,z));
    obj.roadBody = new CANNON.Body({mass:0});
    obj.roadBody.addShape(obj.roadShape);

    obj.roadBody.updateMassProperties();
    obj.world.add(obj.roadBody);
    return obj.roadBody;
}
function makeRoad(obj,w,h,d,x,y,z, image){
	obj.roadGeometry = new THREE.BoxGeometry( w, h, d );
	obj.roadMaterial = new THREE.MeshBasicMaterial( {  map : image } );
	obj.road = new THREE.Mesh( obj.roadGeometry, obj.roadMaterial );
	obj.road.position.set(0,0,0).add(new THREE.Vector3(x,y,z));
	
	return obj.road;
}

function initRoad(obj, tbl, tblBody, width, depht, x,y,z, xhit,yhit,zhit, nb, image){ 


	for( var i = 0; i < nb; i++ ){

		tbl[i] = makeRoad(obj, width, 1 , depht, x,y,z, image);
		tblBody[i] = makeRoadBody(obj,  xhit, yhit, zhit);
		obj.scene.add(tbl[i]);
	}
}

function initObstacle(nb1,nb2, obj, x,y,z, image){	
	obj.obstacleTblBody = [];
	obj.obstacleTblBody2 = [];
	obj.obstacleTbl1 = [];
	obj.obstacleTbl2 = [];
	for ( var i = 0; i < nb1; i++){		
		obj.obstacleTbl1[i]= makeObstacle(obj,9,10,5, x,y,z, image); // obj, width, height, deph, x, y, z
		obj.obstacleTblBody[i]= makeObstacleBody(obj, 5, 6 ,2.5);
		obj.scene.add(obj.obstacleTbl1[i]);
	}
	for ( var i = 0; i < nb2; i++){		
		obj.obstacleTbl2[i]= makeObstacle(obj,15,2,5, x,y,z, image); // obj, width, height, deph, x, y, z
		obj.obstacleTblBody2[i]= makeObstacleBody(obj, 10, 1 ,2.5);
		obj.scene.add(obj.obstacleTbl2[i]);
	}
}

function setBodyPos(obj, objBody){
	objBody.position.x = obj.position.x; 
	objBody.position.y = obj.position.y; 
	objBody.position.z = obj.position.z;
}

function syncBodyPos(obj, objBody){
	obj.position.copy(objBody.position);
}

//camera
function syncCamera(camera, obj, zoom){

	var relativeCameraOffset = new THREE.Vector3(0,50,-250);
	var cameraOffset = relativeCameraOffset.applyMatrix4( obj.matrixWorld );

	camera.position.x = cameraOffset.x;
	camera.position.y = cameraOffset.y;
	camera.position.z = cameraOffset.z;
	camera.lookAt( obj.position );
}

// levl 1

function orientCar(car, carBody, road){
	if(road.position.z-15> car.position.z && car.position.z > 210){
		car.rotation.x += 0.01;
		if (car.rotation.x>0.3){
			car.rotation.x=0.3;
			moveBack(carBody, car, 0.01);

		}
	}
	if(road.position.z-18< car.position.z || car.position.z && car.position.z < 210){
		car.rotation.x -= 0.01;
		if (car.rotation.x<0){
			car.rotation.x=0;
		}
	}	
}

function movingPasrel(obj){
     
	if( obj.position.z <= -420 && move == false){
		move = true;
	}
	if(obj.position.z >= -375 && move == true){
		move = false;
	}

	if(move == false){
		obj.position.z -= 0.15;
	}
	if(move == true){
		obj.position.z += 0.15;
	}

}

function fly(obj, pos){
	if( obj.position.z < pos && obj.position.z > pos-50 && obj.position.y < 5){
		obj.velocity.y+=1.4;
	}

	
}
// init audio
function playMotor(){
	var audio = document.getElementById('audio');
	audio.play();
}
function stopMotor(){
	var audio = document.getElementById('audio');
	audio.pause();
	audio.currentTime=0;
}
function respawn(obj){
	if ( obj.position.y< -200){
		initPos(obj, 0, 4, 250);
	}
}

//scores
function getScore(obj){
	if(obj.position.z < -580  && obj.position.z > -580.6){
		// window.cancelAnimationFrame( levl1.req );
		clearTimeout(compte);
		console.log(timer);
		localStorage.setItem("listeScores", timer);
		scores += localStorage.getItem("listeScores", timer) +" | ";
		localStorage.setItem("listeScores", scores );


	}

}

	


function chrono(obj){
    centi++; 
    if (centi>9){
      centi=0;
      secon++
    } 
    if (secon>59){
      secon=0;minu++
    } 
    timer = minu + ":"+secon +":"+centi;
    document.getElementById("timer").innerHTML = timer;
    compte = setTimeout('chrono()',100);
}

function rasee(){ //fonction qui remet les compteurs à 0
	clearTimeout(compte) //arrête la fonction chrono()
	centi=0;
	secon=0;
	minu=0;
	document.forsec.secc.value=" "+centi
	document.forsec.seca.value=" "+secon
	document.forsec.secb.value=" "+minu
}

function initState(obj){
	obj.init();
	obj.update();
}
