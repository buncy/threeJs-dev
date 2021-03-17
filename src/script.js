import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

// Debug code start
const gui = new dat.GUI();

// Scene
const scene = new THREE.Scene();
const canvas = document.querySelector(".webGL");
// Object
// const geometry = new THREE.BufferGeometry();
// const count = 5000;
// const positionArray = new Float32Array(count * 3 * 3);
// for (let index = 0; index < count * 3 * 3; index++) {
//   positionArray[index] = (Math.random() - 0.5) * 4;
// }
// const positionsAttribute = new THREE.BufferAttribute(positionArray, 3);
// geometry.setAttribute("position", positionsAttribute);
// const material = new THREE.MeshBasicMaterial({
//   color: 0xff0000,
//   wireframe: true,
// });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);
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

//debug
gui.add(cube1.position, "y").min(-3).max(3).step(0.01).name("cube 1 elivation");

//mesh position set (x,y,z)
cube1.position.set(-1.2, 0, 0);
cube2.position.set(0, 0, 0);
cube3.position.set(1.2, 0, 0);
// mesh.rotation.reorder("YXZ");

//Axes helpers
const axesHelper = new THREE.AxesHelper(5);
//scene.add(axesHelper);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 4;
// camera.lookAt(group.position);
scene.add(camera);
//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas.webGL"),
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//renderer.render(scene, camera);

window.addEventListener("resize", () => {
  //update size
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  //update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  //update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  const fullscreen =
    document.fullscreenElement || document.webkitFullscreenElement;
  if (!fullscreen) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});
//clock
const clock = new THREE.Clock();
const timeElapsed = clock.getElapsedTime();
//animation
// gsap.to(cube1.position, { duration: 1, delay: 1, x: -2 });
// gsap.to(cube1.position, { duration: 1, delay: 2, x: 0 });
const tick = () => {
  //cube1.rotation.z += -0.01;
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
