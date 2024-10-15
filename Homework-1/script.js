import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("scene").appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial({ 
    color: 0xffffff, 
    wireframe: true
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.z = 3;

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let previousTime = performance.now();

function animate(currentTime) {
    requestAnimationFrame(animate);
    const deltaTime = (currentTime - previousTime) / 1000;
    previousTime = currentTime;
    sphere.rotation.y += deltaTime * Math.PI * 0.1;
    renderer.render(scene, camera);
}

animate(previousTime);