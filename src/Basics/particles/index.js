import "../../style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

export default function particles() {
  /**
   * Base
   */
  // Debug
  const gui = new dat.GUI();

  // Canvas
  const canvas = document.querySelector("canvas.webGL");

  // Scene
  const scene = new THREE.Scene();

  /**
   * Textures
   */
  const textureLoader = new THREE.TextureLoader();
  const particlesTextures = textureLoader.load("./textures/particles/9.png");

  //Particles

  //geometry
  const particlesGeometry = new THREE.BufferGeometry();
  const count = 50000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let index = 0; index < count * 3; index++) {
    positions[index] = (Math.random() - 0.5) * 10;
    colors[index] = (Math.random() - 0.5) * 10;
  }
  particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );
  //material
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    sizeAttenuation: true,
    transparent: true,
    alphaMap: particlesTextures,
    // alphaTest: 0.001,
    // depthTest: false,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  });

  //points
  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  /**
   * Sizes
   */
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  /**
   * Camera
   */
  // Base camera
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.z = 3;
  scene.add(camera);

  // Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /**
   * Animate
   */
  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    //Update particles
    // particles.rotation.y = elapsedTime * 0.2;

    for (let index = 0; index < count; index++) {
      const i3 = index * 3;
      const x = particlesGeometry.attributes.position.array[i3];
      particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(
        elapsedTime + x
      );
    }
    particlesGeometry.attributes.position.needsUpdate = true;

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();
}
