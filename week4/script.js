import * as THREE from 'three';

const scene = new THREE.Scene();

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);




const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshPhongMaterial({
    color: 0x00ff00, 
    shininess: 100,   
    specular: 0xffffff 
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.x = -4; 
scene.add(cube);


const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshPhongMaterial({
    color: 0x0000ff, 
    shininess: 100,    
    specular: 0xffffff 
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.x = 4;
scene.add(sphere);


const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
const cylinderMaterial = new THREE.MeshPhongMaterial({
    color: 0xff0000, 
    shininess: 100,  
    specular: 0xffffff 
});
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinder.position.y = -5; 
scene.add(cylinder);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.z = 10;


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("scene").appendChild(renderer.domElement);
camera.lookAt(sphere.position)

window.addEventListener("resize", (event)=>{
    camera.aspect=renderer.domElement.width/ renderer.domElement.height;
    renderer.setSize(renderer.setSize.width/ renderer.setSize.height);
    
    camera.updateProjectionMatrix

})
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'b':
            camera.lookAt(cube.position); 
            break;
            case 's':
                camera.lookAt(sphere.position); 
                break;
                case 'c':
                    camera.lookAt(cylinder.position); 
                    break;
    }
    camera.updateProjectionMatrix();
});


function animate() {
    requestAnimationFrame(animate);
    camera.fov +=1;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
}
animate();