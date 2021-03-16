import * as THREE from "three";
export default function firstScene() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry();
  const points = [];
  points.push(new THREE.Vector3(-10, 0, 0));
  points.push(new THREE.Vector3(0, 10, 0));
  points.push(new THREE.Vector3(10, 0, 0));
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
  const cube = new THREE.Mesh(geometry, material);
  const line = new THREE.Line(lineGeometry, lineMaterial);
  scene.add(cube);
  scene.add(line);

  camera.position.z = 5;

  const animate = function () {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  };

  animate();
}
