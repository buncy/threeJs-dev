import "./style.css";
import * as THREE from "three";

// Scene
const scene = new THREE.Scene();

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
//camera.lookAt(mesh.position);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas.webGL"),
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
