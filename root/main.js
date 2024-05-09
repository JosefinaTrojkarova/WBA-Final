import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin.js";

// Create scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Add lights
const light1 = new THREE.PointLight(0xffffff, 200, 1000);
light1.position.set(5, 0, -1);

const light2 = new THREE.PointLight(0xffffff, 200, 1000);
light2.position.set(-5, 0, -1);

const light3 = new THREE.PointLight(0xffffff, 100, 3000);
light3.position.set(8, 0, -4);

const light4 = new THREE.PointLight(0xffffff, 100, 3000);
light4.position.set(-8, 0, -4);

const blueLight1 = new THREE.PointLight(0x3399FF, 400, 2000);
blueLight1.position.set(5, 0, -12);

const blueLight2 = new THREE.PointLight(0x3366cc, 400, 2000);
blueLight2.position.set(-5, 0, -12);

camera.add(light1);
camera.add(light2);
camera.add(light3);
camera.add(light4);
camera.add(blueLight1);
camera.add(blueLight2);

scene.add(camera);

// Create renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
document.body.appendChild(renderer.domElement);

// Append the renderer to a section in the HTML file
const section = document.getElementById("hero-model");
section.appendChild(renderer.domElement);

// Create controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = false;
camera.position.z = 7;
controls.update();

let animationRunning = false;
gsap.registerPlugin(MotionPathPlugin)

function startAnimation() {
	let currentX = camera.position.x;
	let currentZ = camera.position.z;
	let currentY = camera.position.y;

	// Calculate the current distance from the center
	let currentDistance = Math.sqrt(currentX * currentX + currentZ * currentZ);

	// Calculate the scaling factor to maintain a distance of 7 units from the center
	let scaleFactor = 7 / currentDistance;

	// Calculate the new x and z positions to maintain the distance of 7 from the center
	let newX = currentX * scaleFactor;
	let newZ = currentZ * scaleFactor;

	if (!animationRunning) {
		animationRunning = true;
		gsap.to(camera.position, {
			duration: 3,
			motionPath: {
				path: [
					{ x: currentX, y: currentY, z: currentZ },
					{ x: currentX + (newX - currentX) / 2, y: currentY, z: currentZ + (newZ - currentZ) / 2 },
					{ x: newX, y: currentY / 2, z: newZ },
					{ x: newX, y: 0, z: newZ }],
				type: "cubic"
			},
			ease: "power2.inOut",
			onComplete: () => {
				if (animationRunning) {
					startAnimation();
				}
			}
		});
	}
}

function stopAnimation() {
	animationRunning = false;
	gsap.killTweensOf(camera.position); // Stop the animation
}

let modelRotationZ = -0.003;

// Listen for console commands
let animationStartTimeout;
let isCountingDown = false;

controls.addEventListener('start', function () {
	stopAnimation();
	if (isCountingDown) {
		clearTimeout(animationStartTimeout);
		isCountingDown = false;
	}
});

controls.addEventListener('end', function () {
	if (!isCountingDown) {
		isCountingDown = true;
		animationStartTimeout = setTimeout(startAnimation, 1000);
		modelRotationZ = -0.003;
	}
});


// glTF loader 1
const loader = new GLTFLoader();

// DRACO loader for compressed geometry
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
dracoLoader.setDecoderConfig({ type: 'js' });
loader.setDRACOLoader(dracoLoader);

let model;

// glTF loader 2
loader.load('wavetag.glb', function (gltf) {

	model = gltf.scene;
	model.rotation.x = Math.PI / 2;
	scene.add(model);

},
	// loading progress
	function (xhr) {

		console.log((xhr.loaded / xhr.total * 100) + '% loaded');

	},
	// loading error message
	function (error) {

		console.log('An error happened');

	}
);

// Animation loop
function animate() {
	requestAnimationFrame(animate);

	controls.enableDamping = true;
	controls.update();

	model.rotation.z += modelRotationZ;

	renderer.render(scene, camera);
}

animate();
