import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap } from "gsap";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 10, 30);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const grassMaterial = new THREE.MeshBasicMaterial({ color: "green" });
const roadMaterial = new THREE.MeshBasicMaterial({ color: "gray" });
const skyBlueBuildingMaterial = new THREE.MeshBasicMaterial({ color: "#87CEEB" });

const groundGrass = new THREE.Mesh(
  new THREE.PlaneGeometry(40, 40),
  grassMaterial
);
groundGrass.rotation.x = -Math.PI / 2;
scene.add(groundGrass);

const roadVertical = new THREE.Mesh(new THREE.PlaneGeometry(5, 40), roadMaterial);
roadVertical.rotation.x = -Math.PI / 2;
roadVertical.position.set(0, 0.01, 0);
scene.add(roadVertical);

const roadBottomHorizontal = new THREE.Mesh(new THREE.PlaneGeometry(18, 5), roadMaterial);
roadBottomHorizontal.rotation.x = -Math.PI / 2;
roadBottomHorizontal.position.set(-11, 0.01, -6);
scene.add(roadBottomHorizontal);

const roadAboveNewBuilding = new THREE.Mesh(new THREE.PlaneGeometry(18, 5), roadMaterial);
roadAboveNewBuilding.rotation.x = -Math.PI / 2;
roadAboveNewBuilding.position.set(11, 0.10, -6);
scene.add(roadAboveNewBuilding);

function createBuilding(x, z, width, height, depth, rotationY = 0) {
  const building = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, depth),
    skyBlueBuildingMaterial
  );
  building.position.set(x, height / 2, z);
  building.rotation.y = rotationY;
  scene.add(building);
  return building;
}

const topBuilding = createBuilding(-5.5, 14, 6, 3, 7);
addLabel(topBuilding, "301");

const middleBuilding = createBuilding(-5.5, 2, 6, 3, 7);
addLabel(middleBuilding, "302");

const bottomBuilding = createBuilding(-5.5, -14, 6, 3, 7);
addLabel(bottomBuilding, "303");

const additionalBuilding = createBuilding(11, 6, 8, 3, 15, Math.PI / 6);
addLabel(additionalBuilding, "801");

function addLabel(building, text) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = "70px Arial";
  context.fillStyle = "black";
  context.fillText(text, 50, 50);  

  const texture = new THREE.CanvasTexture(canvas);
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(spriteMaterial);
  
  sprite.scale.set(2, 1, 1); 
  sprite.position.set(0, 2, 0); 
  building.add(sprite); 
}

const sphereMaterial = new THREE.MeshBasicMaterial({ color: "red" });
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  sphereMaterial
);
sphere.position.set(0, 0.5, 0);
scene.add(sphere);

gsap.to(sphere.position, {
    duration: 20,
    repeat: -1,
    ease: "linear",
    keyframes: [
      { x: 0, z: 15 },           
      { x: -5.5, z: 15 },        
      { x: 0, z: 12 },           
      { x: 0, z: 2 },            
      { x: -5.5, z: 2 },         
      { x: 0, z: 2 },            
      { x: 0, z: -15 },          
      { x: -5.5, z: -15 },       
      { x: 0, z: -12 },                 
      { x: 0, z: 0 },            
    ],
  });

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
