import "../../style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default () => {
  //Textures
  const textureLoader = new THREE.TextureLoader();

  const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
  const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
  const doorAmbientOcclusionTexture = textureLoader.load(
    "/textures/door/ambientOcclusion.jpg"
  );
  const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
  const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
  const doorMetalnessTexture = textureLoader.load(
    "/textures/door/metalness.jpg"
  );
  const doorRoughnessTexture = textureLoader.load(
    "/textures/door/roughness.jpg"
  );

  const matCapTexture = textureLoader.load("/textures/matcaps/1.png");
  const gradientTexture = textureLoader.load(
    "../../../static/textures/gradients/3.jpg"
  );

  //Base

  //Canvas
  const canvas = document.querySelector("canvas.webGL");

  //Scene
  const scene = new THREE.Scene();

  //Objects
  const material = new THREE.MeshBasicMaterial();

  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    material
  );
  sphere.position.x = -1.5;

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(), material);

  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    material
  );
  torus.position.x = 1.5;

  scene.add(sphere, plane, torus);
  //Sizes
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
    canvas: canvas,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  window.addEventListener("resize", () => {
    //update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    //update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    //update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  //Animate

  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    //Update objects

    sphere.rotation.y = 0.1 * elapsedTime;
    plane.rotation.y = 0.1 * elapsedTime;
    torus.rotation.y = 0.1 * elapsedTime;

    sphere.rotation.x = 0.1 * elapsedTime;
    plane.rotation.x = 0.1 * elapsedTime;
    torus.rotation.x = 0.1 * elapsedTime;

    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  };
  tick();
};
