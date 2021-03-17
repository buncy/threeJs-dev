import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Scene
const scene = new THREE.Scene();
const canvas = document.querySelector(".webGL");
// Object
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
group.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
group.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
group.add(cube3);

//mesh position set (x,y,z)
cube1.position.set(-1.2, 0, 0);
cube2.position.set(0, 0, 0);
cube3.position.set(1.2, 0, 0);
// mesh.rotation.reorder("YXZ");
// mesh.rotation.set(0.2, -0.5, 0.4);

//Axes helpers
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 4;
camera.lookAt(group.position);
scene.add(camera);
//Controls
const controls = new OrbitControls(camera, canvas);
// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas.webGL"),
});
renderer.setSize(sizes.width, sizes.height);
//renderer.render(scene, camera);
//clock
const clock = new THREE.Clock();
const timeElapsed = clock.getElapsedTime();
//animation
// gsap.to(cube1.position, { duration: 1, delay: 1, x: -2 });
// gsap.to(cube1.position, { duration: 1, delay: 2, x: 0 });
const tick = () => {
  //cube1.rotation.z += -0.01;
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
