import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

// Create scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Add lights
const ambientLight = new THREE.AmbientLight( 0x404040 );
scene.add( ambientLight );

const light1 = new THREE.PointLight( 0xffffff, 200, 1000 );
light1.position.set( 5, 0, 6 );
scene.add( light1 );

const light2 = new THREE.PointLight( 0xffffff, 200, 1000 );
light2.position.set( -5, 0, 6 );
scene.add( light2 );

const light3 = new THREE.PointLight( 0xffffff, 100, 3000 );
light3.position.set( 8, 0, 3 );
scene.add( light3 );

const light4 = new THREE.PointLight( 0xffffff, 100, 3000 );
light4.position.set( -8, 0, 3 );
scene.add( light4 );

const blueLight1 = new THREE.PointLight( 0x3399FF, 400, 2000 );
blueLight1.position.set( 5, 0, -5 );
scene.add( blueLight1 );

const blueLight2 = new THREE.PointLight( 0x3366cc, 400, 2000 );
blueLight2.position.set( -5, 0, -5 );
scene.add( blueLight2 ); 

// Create renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x000000, 0 );
document.body.appendChild( renderer.domElement );

// Append the renderer to a section in the HTML file
const section = document.getElementById( "hero-model" );
section.appendChild( renderer.domElement );

// glTF loader
const loader = new GLTFLoader();

// DRACO loader for compressed geometry
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/' );
dracoLoader.setDecoderConfig( { type: 'js' } );
loader.setDRACOLoader( dracoLoader );

let model;

// glTF loader
loader.load('models/wavetag.glb', function ( gltf ) {
	
		model = gltf.scene;
		model.rotation.x = Math.PI / 2;
		scene.add( model );

	},
	// loading progress
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// loading error message
	function ( error ) {

		console.log( 'An error happened' );

	}
);

// Set camera position
camera.position.z = 7;

// Add rotation animation
function animate() {
	requestAnimationFrame( animate );

    model.rotation.z += -0.005;

	renderer.render( scene, camera );
}
animate();