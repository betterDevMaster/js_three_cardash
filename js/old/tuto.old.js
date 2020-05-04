// tuto.js

// parametter of game
var speedZ = 0.001;
var speedX = 0.001;
var speed = 40;


var tuto = {
    init : function(){
      //init loader
      tuto.loaderTexture = new THREE.TextureLoader();
      var urlPrefix = "assets/skybox/";
      var urls = [ urlPrefix + "velcor_ft.jpg", urlPrefix + "velcor_bk.jpg",
                   urlPrefix + "velcor_up.jpg", urlPrefix + "velcor_dn.jpg",
                   urlPrefix + "velcor_rt.jpg", urlPrefix + "velcor_lf.jpg" ];
      var materialArray=[];
      for ( var i =0; i< urls.length; i++){ 
          tuto.loaderTexture.load(urls[i], function(image){
              tuto.materials = new THREE.MeshBasicMaterial({map:image, side: THREE.BackSide});
       
              materialArray.push(tuto.materials);

              tuto.materials2 = new THREE.MeshFaceMaterial(materialArray);
              tuto.skybox = new THREE.Mesh(tuto.skyGeometry, tuto.materials2);
              tuto.skybox.format = THREE.RGBFormat;
              tuto.scene.add(tuto.skybox);

          });        
      }

      tuto.loaderTexture.load("assets/road/road-texture.png", function(image){
          tuto.roadPackage1 = [];
          tuto.roadPackage1Body = [];
          initRoad(tuto,tuto.roadPackage1,tuto.roadPackage1Body, 15,500, 0,0,0, 7.5,0.01,250, 2, image);//obj, width, depht, x,y,z, xhit, yhit, zhit, nb
          tuto.materialr = new THREE.MeshBasicMaterial( { map : image } );
          tuto.road = new THREE.Mesh( tuto.roadGeometry, tuto.materialr );
      });
      tuto.loaderTexture.load("assets/obstacle/logo.jpg", function(image){
          // intit obstacles
          initObstacle(2,1, tuto , -4,4,-4, image );// nbtype1, nb type1, obj, x, y, z ,
          
          // init obstacle position
          initPos(tuto.obstacleTbl1[0], -3, 4 ,150);// obj, x, y, z
          initPos(tuto.obstacleTbl1[1], 3, 4 , 0);
          initPos(tuto.obstacleTbl2[0], 0, 1 , -220);

          setBodyPos(tuto.obstacleTbl1[0], tuto.obstacleTblBody[0]);
          setBodyPos(tuto.obstacleTbl1[1], tuto.obstacleTblBody[1]);
          setBodyPos(tuto.obstacleTbl2[0], tuto.obstacleTblBody2[0]);
      });

      tuto.loaderJson = new THREE.JSONLoader();

      tuto.loaderJson.load("models/hand.json", function(geometry, materials){
            material = new THREE.MeshFaceMaterial(materials);
              tuto.hand = new THREE.Mesh( geometry, material);
              tuto.hand.scale = 0.001
              tuto.hand.rotation.x = 0.5;
              tuto.hand.rotation.y = 3;
              initPos(tuto.hand, -3,3,240)//-3,4,170
              tuto.hand.visible = true;
              tuto.scene.add(tuto.hand);     
      });

      tuto.loaderBinary = new THREE.BinaryLoader().load('models/VeyronNoUv_bin.js', function(geometry){
        initCar(tuto, geometry);
        initPos(tuto.car, 0, 4, 250);
        setBodyPos(tuto.car, tuto.carBody); // set the Body pos at geometypos
        detectCollide(tuto.carBody ); //return event when car collide object
        tuto.car.scale.x = tuto.car.scale.y = tuto.car.scale.z = 0.02;
        tuto.car.rotation.y = 3.15;
      }); 

      //init controller
      // tuto.controller = new Leap.Controller();
      // tuto.controller.use('screenPosition');
      // tuto.controller.connect();
      tuto.keyboard = new THREEx.KeyboardState();

      // init webgl environment
      tuto.scene = new THREE.Scene();
      tuto.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

      tuto.renderer = new THREE.WebGLRenderer();
      tuto.renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( tuto.renderer.domElement );

      // init skybox
      tuto.skyGeometry = new THREE.BoxGeometry(1000,1000,1000,1,1,1,null,true);

      // init lighting
      tuto.light = new THREE.SpotLight( 0xffffff ); // soft white light
      tuto.light.position.set(0,500,0);
      tuto.directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
      tuto.directionalLight.position.set( 2, 1.2, 10 ).normalize();
      tuto.scene.add( tuto.directionalLight );

      tuto.directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
      tuto.directionalLight.position.set( -2, 1.2, -10 ).normalize();
      tuto.scene.add( tuto.directionalLight );

      tuto.pointLight = new THREE.PointLight( 0xffaa00, 2 );
      tuto.pointLight.position.set( 0, 0, 0 );
      tuto.scene.add( tuto.pointLight );

      // init physic environement
      tuto.world = new CANNON.World;
      tuto.world.broadphase = new CANNON.NaiveBroadphase();
      tuto.world.gravity.set(0, -50, 0);

      // init camera position
      initPos(tuto.camera, 0, 4 , 260);// obj, x, y, z

      //init scnene and world
      tuto.scene.add( tuto.light);
      // tuto.controls = new THREE.OrbitControls( tuto.camera, tuto.renderer.domElement );//debugcamera
    },

  update : function(){
      requestAnimationFrame( tuto.update );
      

      tuto.world.step(1/60);
      
      if (tuto.car !== undefined){
          controls(tuto.keyboard, tuto.carBody, tuto.car );
          // tuto.leapHands = tuto.controller.lastFrame.hands; // on recupere les info du leap motion   
          // tuto.leapHands.forEach(function(hand){
          //   var handPos = hand.screenPosition();
          //   leapControls(tuto.controller, tuto.carBody, tuto.car, handPos);// obj, objGeometry, hand
          // });
          
          //update pos for body
          syncBodyPos(tuto.car, tuto.carBody); //syncronize body with geometry
          
          //camera
          syncCamera(tuto.camera, tuto.car, 6);//camera , objs, zoom
          if (tuto.hand !== undefined) { // when hand is ready
              showHand(tuto.carBody, tuto.hand);
          }
          respawn(tuto.carBody);
      }
      if(tuto.obstacleTbl2 && tuto.obstacleTbl1 !== undefined  )
      {
        syncBodyPos(tuto.obstacleTbl1[0], tuto.obstacleTblBody[0]);
        syncBodyPos(tuto.obstacleTbl1[1], tuto.obstacleTblBody[1]);
        syncBodyPos(tuto.obstacleTbl2[0], tuto.obstacleTblBody2[0]);   
      }
      if (tuto.road !== undefined){
          for ( var i=0; i< tuto.roadPackage1.length; i++){
              setBodyPos(tuto.roadPackage1[i], tuto.roadPackage1Body[i]);
              syncBodyPos(tuto.roadPackage1[i], tuto.roadPackage1Body[i] );
          }
      }      
      tuto.renderer.render( tuto.scene, tuto.camera );    
  }
}
