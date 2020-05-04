// tuto.js

// parametter of game
var speedZ = 0.001;
var speedX = 0.001;
var speed = 40;


var levl1 = {
    init : function(){
      //init loader
      levl1.loaderTexture = new THREE.TextureLoader();
      var urlPrefix = "assets/skybox/";
      var urls = [ urlPrefix + "velcor_ft.jpg", urlPrefix + "velcor_bk.jpg",
                   urlPrefix + "velcor_up.jpg", urlPrefix + "velcor_dn.jpg",
                   urlPrefix + "velcor_rt.jpg", urlPrefix + "velcor_lf.jpg" ];
      var materialArray=[];
      for ( var i =0; i< urls.length; i++){ 
          levl1.loaderTexture.load(urls[i], function(image){
              levl1.materials = new THREE.MeshBasicMaterial({map:image, side: THREE.BackSide});
              materialArray.push(levl1.materials);

              levl1.materials2 = new THREE.MeshFaceMaterial(materialArray);
              levl1.skybox = new THREE.Mesh(levl1.skyGeometry, levl1.materials2);
              levl1.skybox.format = THREE.RGBFormat;
              levl1.scene.add(levl1.skybox);

          });        
      }

      levl1.loaderTexture.load("assets/road/road-texture.png", function(image){
        //init road
          levl1.roadPackage1 = [];
          levl1.roadPackage1Body = [];

          levl1.roadPackage2 = [];
          levl1.roadPackage2Body = [];

          levl1.roadPackage3 = [];
          levl1.roadPackage3Body = [];

          levl1.roadPackage4 = [];
          levl1.roadPackage4Body = [];


          initRoad(levl1,levl1.roadPackage1,levl1.roadPackage1Body, 30, 50, 0, 0, 250, 15, 0.5, 25, 3, image);//obj, width, depht, x,y,z, xhit, yhit, zhit, nb
          initRoad(levl1,levl1.roadPackage2,levl1.roadPackage2Body, 30, 20, 0, 2, 220, 15, 0.5, 10, 2, image);
          initRoad(levl1,levl1.roadPackage3,levl1.roadPackage3Body, 30, 200, 85.5, -100, 112.5, 15, 0.5, 100, 5, image);
          initRoad(levl1,levl1.roadPackage4,levl1.roadPackage4Body, 30, 30, 200, -100, -100, 15, 0.5, 15, 2, image);

          initPos(levl1.roadPackage1[1], 0, -100, 150);
          initPos(levl1.roadPackage1[2], 0, -60, -456.5);
          initPos(levl1.roadPackage2[1], 0, -60, -480.5);
          initPos(levl1.roadPackage3[1], 200, -100, 29);
          initPos(levl1.roadPackage3[2], 200, -60, -250);
          initPos(levl1.roadPackage3[3], 114.5, -60, -445);
          initPos(levl1.roadPackage3[4], 0, -100, -570);
          initPos(levl1.roadPackage4[1], 200, -60, -380);
          levl1.roadPackage2[0].rotation.x = 0.3;
          levl1.roadPackage2[1].rotation.x = 0.3;
          levl1.roadPackage3[0].rotation.y = 1.55;
          levl1.roadPackage3[3].rotation.y = 1.55;


          levl1.materialr = new THREE.MeshBasicMaterial( { map : image } );
          levl1.road = new THREE.Mesh( levl1.roadGeometry, levl1.materialr );
          
      });
      levl1.loaderTexture.load("assets/obstacle/logo.jpg", function(image){
          // intit obstacles
          initObstacle(6,6, levl1 , -4,4,-4, image );// nbtype1, nbtype2, obj, x, y, z ,
          
          // init obstacle position
          initPos(levl1.obstacleTbl1[0], 70, -95 , 123.5);// obj, x, y, z
          initPos(levl1.obstacleTbl1[1], 120, -95 , 113);
          initPos(levl1.obstacleTbl1[2], 95, -95 , 102);
          initPos(levl1.obstacleTbl1[3], 200, -95 , 20);
          initPos(levl1.obstacleTbl1[4], 200, -55 , -295);
          initPos(levl1.obstacleTbl1[5], 120, -55 , -445);

          initPos(levl1.obstacleTbl2[0], 208, -98  , 75);
          initPos(levl1.obstacleTbl2[1], 193, -98  , 75);
          initPos(levl1.obstacleTbl2[2], 208, -58  , -250);
          initPos(levl1.obstacleTbl2[3], 193, -58  , -250);
          initPos(levl1.obstacleTbl2[4], 70, -58  , -453);
          initPos(levl1.obstacleTbl2[5], 160, -58  , -437);

          levl1.obstacleTbl1[0].rotation.y = 1.55;
          levl1.obstacleTbl1[1].rotation.y = 1.55;
          levl1.obstacleTbl1[2].rotation.y = 1.55;
          levl1.obstacleTbl2[4].rotation.y = 1.55;
          levl1.obstacleTbl2[5].rotation.y = 1.55;

      });


      levl1.loaderBinary = new THREE.BinaryLoader().load('models/VeyronNoUv_bin.js', function(geometry){
        initCar(levl1, geometry);
        initPos(levl1.car, 0, 4  , 250);
        setBodyPos(levl1.car, levl1.carBody); // set the Body pos at geometypos
        detectCollide(levl1.carBody ); //return event when car collide object
        levl1.car.scale.x = levl1.car.scale.y = levl1.car.scale.z = 0.02;
        levl1.car.rotation.y = 3.15;
        chrono(levl1.car);
      }); 

      //init controller
      // levl1.controller = new Leap.Controller();
      // levl1.controller.use('screenPosition');
      // levl1.controller.connect();
      levl1.keyboard = new THREEx.KeyboardState();

      // init webgl environment
      levl1.scene = new THREE.Scene();
      levl1.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 2000 );
      levl1.camera.lookAt(levl1.scene.position);  

      levl1.renderer = new THREE.WebGLRenderer();
      levl1.renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( levl1.renderer.domElement );

      

      // init skybox
      levl1.skyGeometry = new THREE.BoxGeometry(1900,1900,1900,1,1,1,null,true);

      // init lighting
      levl1.light = new THREE.SpotLight( 0xffffff ); // soft white light
      levl1.light.position.set(0,500,0);
      levl1.directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
      levl1.directionalLight.position.set( 2, 1.2, 10 ).normalize();
      levl1.scene.add( levl1.directionalLight );

      levl1.directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
      levl1.directionalLight.position.set( -2, 1.2, -10 ).normalize();
      levl1.scene.add( levl1.directionalLight );

      levl1.pointLight = new THREE.PointLight( 0xffaa00, 2 );
      levl1.pointLight.position.set( 0, 0, 0 );
      levl1.scene.add( levl1.pointLight );

      // init physic environement
      levl1.world = new CANNON.World;
      levl1.world.broadphase = new CANNON.NaiveBroadphase();
      levl1.world.gravity.set(0, -50, 0);
      

      //init scnene and world
      levl1.scene.add( levl1.light ,levl1.camera);
      // levl1.controls = new THREE.OrbitControls( levl1.camera, levl1.renderer.domElement );//debugcamera
      

      //init scrore we need to save the storage!!!
      
      if (localStorage.length>0){
        scores += localStorage.getItem("listeScores");
      }

      

  },


  update : function(){
      levl1.req = requestAnimationFrame( levl1.update );
      levl1.world.step(1/60);
      
      if (levl1.car !== undefined){

          controls(levl1.keyboard, levl1.carBody, levl1.car );
          fly(levl1.carBody, -90);// 0bj, zpos
          // levl1.leapHands = levl1.controller.lastFrame.hands; // on recupere les info du leap motion   
          // levl1.leapHands.forEach(function(hand){
          //   var handPos = hand.screenPosition();
          //   leapControls(levl1.controller,levl1.carBody, levl1.car, handPos);// obj, objGeometry, hand

          // });
          
          //update pos for body
          syncBodyPos(levl1.car, levl1.carBody);//syncronize body with geometry
          
          //camera

          syncCamera(levl1.camera, levl1.car, 6);//camera , objs, zoom

          orientCar(levl1.car, levl1.carBody, levl1.roadPackage1[0]);
          respawn(levl1.carBody);
          getScore(levl1.car);

         
          
      }
      if (levl1.obstacleTbl1 !== undefined && levl1.obstacleTbl2 !== undefined){
        for ( var i=0; i< levl1.obstacleTbl1.length; i++){
          setBodyPos(levl1.obstacleTbl1[i], levl1.obstacleTblBody[i]);
          setBodyPos(levl1.obstacleTbl2[i], levl1.obstacleTblBody2[i]);
          syncBodyPos(levl1.obstacleTbl1[i], levl1.obstacleTblBody[i]);
          syncBodyPos(levl1.obstacleTbl2[i], levl1.obstacleTblBody2[i]);
          levl1.obstacleTblBody[i].quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),levl1.obstacleTbl1[i].rotation.x);
          levl1.obstacleTblBody2[i].quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),levl1.obstacleTbl2[i].rotation.x);
        }
      }

      if (levl1.roadPackage1 !== undefined){
          for ( var i=0; i< levl1.roadPackage1.length; i++){
              setBodyPos(levl1.roadPackage1[i], levl1.roadPackage1Body[i]);
              syncBodyPos(levl1.roadPackage1[i], levl1.roadPackage1Body[i]);
          }
          for ( var i=0; i< levl1.roadPackage2.length; i++){
              setBodyPos(levl1.roadPackage2[i], levl1.roadPackage2Body[i]);
              syncBodyPos(levl1.roadPackage2[i], levl1.roadPackage2Body[i] );
              levl1.roadPackage2Body[i].quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),levl1.roadPackage2[i].rotation.x);
          }
          for ( var i=0; i< levl1.roadPackage3.length; i++){
              setBodyPos(levl1.roadPackage3[i], levl1.roadPackage3Body[i]);
              syncBodyPos(levl1.roadPackage3[i], levl1.roadPackage3Body[i] );
              levl1.roadPackage3Body[i].quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0),levl1.roadPackage3[i].rotation.y);
          }
          for ( var i=0; i< levl1.roadPackage4.length; i++){
              setBodyPos(levl1.roadPackage4[i], levl1.roadPackage4Body[i]);
              syncBodyPos(levl1.roadPackage4[i], levl1.roadPackage4Body[i] );
              levl1.roadPackage4Body[i].quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0),levl1.roadPackage4[i].rotation.y);              
              movingPasrel(levl1.roadPackage4[1]);
          }
      }
      levl1.renderer.render( levl1.scene, levl1.camera );    
  }
}
