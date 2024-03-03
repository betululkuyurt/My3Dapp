//
// Author: Betül Ülkü Yurt


import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';

// Create the Three.js scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Enable shadow maps
document.body.appendChild(renderer.domElement);
const textureLoader = new THREE.TextureLoader();

// Load background texture
const backgroundTexture = textureLoader.load('three.js/examples/textures/cube/MilkyWay/dark-s_pz.jpg', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
});

scene.background = backgroundTexture;

// Ground (floor) with texture
const groundGeometry = new THREE.BoxGeometry(14, 0.1, 14);
const groundTexture = textureLoader.load('three.js/examples/textures/waternormals.jpg');
const groundMaterial = new THREE.MeshBasicMaterial({ map: groundTexture });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.position.x = 0;
ground.position.y = -2.5;
ground.position.z = 0;
ground.receiveShadow = true;
scene.add(ground);

// Load 3D models (tree, stormtrooper, elf, WaltHead)
const objLoader = new OBJLoader();
const colladaLoader = new ColladaLoader();

// Tree
objLoader.load('three.js/examples/models/obj/tree.obj', function (object) {
    const tree = new THREE.Group();
    tree.position.y = -0.3;
    tree.position.x = -5;
    tree.position.z = -5;
    tree.add(object);
    scene.add(tree);
    sculptures.push(tree);
});

// Stormtrooper
colladaLoader.load('three.js/examples/models/collada/stormtrooper/stormtrooper.dae', function (collada) {
    const stormtrooper = new THREE.Group();
    stormtrooper.scale.set(0.2, 0.2, 0.2);
    stormtrooper.position.y = -0.3;
    stormtrooper.position.x = 5;
    stormtrooper.position.z = 5;
    stormtrooper.add(collada.scene);
    scene.add(stormtrooper);
    sculptures.push(stormtrooper);
});

// Elf
colladaLoader.load('three.js/examples/models/collada/elf/elf.dae', function (collada) {
    const elf = new THREE.Group();
    elf.scale.set(0.2, 0.2, 0.2);
    elf.position.y = -0.3;
    elf.position.x = 5;
    elf.position.z = -5;
    elf.add(collada.scene);
    scene.add(elf);
    sculptures.push(elf);
});

// WaltHead
objLoader.load('three.js/examples/models/obj/walt/WaltHead.obj', function (object) {
    const head = new THREE.Group();
    head.scale.set(0.01, 0.01, 0.01);
    head.position.y = -0.3;
    head.position.x = -5;
    head.position.z = 5;
    head.add(object);
    scene.add(head);
    sculptures.push(head);
});

// Walls
const wallGeometry = new THREE.BoxGeometry(14, 5, 0.1);
const wallMaterial = new THREE.MeshBasicMaterial({ color: 0x8A2BE2 });

// Back Wall
const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
backWall.position.z = -7;
backWall.castShadow = true;
scene.add(backWall);

// Right Wall
const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
rightWall.position.x = 7;
rightWall.rotation.y = Math.PI / 2;
rightWall.castShadow = true;
scene.add(rightWall);

// Left Wall
const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
leftWall.position.x = -7;
leftWall.rotation.y = -Math.PI / 2;
leftWall.castShadow = true;
scene.add(leftWall);

// Mirror Walls (using Reflector)
const mirrorGeometry = new THREE.PlaneGeometry(14, 5);
const reflector = new Reflector(mirrorGeometry, {
    clipBias: 0.003,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
    color: 0x777777,
});

reflector.position.y = 0; 
reflector.position.z = -6.93; 
reflector.rotation.x = 0;
scene.add(reflector);

const mirrorGeometry2 = new THREE.PlaneGeometry(14, 5);
const reflector2 = new Reflector(mirrorGeometry2, {
    clipBias: 0.003,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
    color: 0x777777,
});

reflector2.position.y = 0; 
reflector2.position.z = 0; 
reflector2.position.x = -6.93; 
reflector2.rotation.y = Math.PI / 2;
scene.add(reflector2);

const mirrorGeometry3 = new THREE.PlaneGeometry(14, 5);
const reflector3 = new Reflector(mirrorGeometry3, {
    clipBias: 0.003,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
    color: 0x777777,
});

reflector3.position.y = 0; 
reflector3.position.z = 0; 
reflector3.position.x = 6.93; 
reflector3.rotation.y = -Math.PI / 2;
scene.add(reflector3);

// Tables
const tableGeometry = new THREE.BoxGeometry(1, 2, 1);
const containerTexture = textureLoader.load('metalic.jpeg');
const tableMaterial = new THREE.MeshBasicMaterial({ map: containerTexture });

// Place a table at each corner
const cornerTablePositions = [
    { x: -5, z: -5 },
    { x: 5, z: -5 },
    { x: -5, z: 5 },
    { x: 5, z: 5 },
];

for (const position of cornerTablePositions) {
    const table = new THREE.Mesh(tableGeometry, tableMaterial);
    table.position.set(position.x, -1.5, position.z);
    table.castShadow = true;
    scene.add(table);
}

// Sphere
const sphereGeometry = new THREE.SphereGeometry(1, 50, 50);
const sphereMaterial = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 1.0 },
        color: { value: new THREE.Color(0x0000ff) },
    },
    vertexShader: `
        varying vec3 vPosition;
        void main() {
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        varying vec3 vPosition;
        uniform float time;
        uniform vec3 color;
        float rand(vec2 co){
            return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
        }
        void main() {
            float amp = 1.6;
            float w = 1.5;
            float angle = atan(1.0 - vPosition.y, 1.0 - vPosition.x) * rand(vec2(vPosition.x, vPosition.y));
            float wave = amp * tan(w * time + angle);
            gl_FragColor = vec4(color / wave, 1.0 / wave);
        }
    `,
});

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, 3, 0);
sphere.castShadow = true;
scene.add(sphere);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 15, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// Set initial camera position
camera.position.z = 5;
camera.position.y = 0;
camera.position.x = 3;

// Create OrbitControls for camera manipulation
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI; // Allow rotation below the horizon
controls.minPolarAngle = 0; // Allow rotation above the zenith
controls.maxAzimuthAngle = Infinity; // Allow full horizontal rotation
controls.minAzimuthAngle = -Infinity; // Allow full horizontal rotation

// Array to store sculptures (3D models)
const sculptures = [];

// Animation function
function animate() {
    // Update time uniform for sphere shader
    sphereMaterial.uniforms.time.value += 0.05;

    // Rotate each sculpture
    sculptures.forEach((sculpture) => {
        sculpture.rotation.y += 0.03; // Adjust the rotation speed as needed
    });

    // Render the scene
    renderer.render(scene, camera);

    // Call animate again recursively
    requestAnimationFrame(animate);
}

// Start the animation loop
animate();
