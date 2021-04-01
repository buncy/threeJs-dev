import "../../style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
// import mat1 from "../../../static/textures/matcaps/6.png";
// import mat2 from "../../../static/textures/matcaps/6.png";
// import font from "../../../static/font/helvetiker_regular.typeface.json";
export default () => {
  /**
   * Base
   */
  // Debug
  const gui = new dat.GUI();

  // Canvas
  const canvas = document.querySelector("canvas.webGL");

  // Scene
  const scene = new THREE.Scene();

  //Axis helper
  // const axisHelper = new THREE.AxesHelper();
  // scene.add(axisHelper);

  /**
   * Textures
   */
  const textureLoader = new THREE.TextureLoader();
  const matcapTextures = textureLoader.load("./textures/matcaps/6.png");
  const donutMatcapTextures = textureLoader.load("./textures/matcaps/5.png");
  // const matcapTextures = textureLoader.load(mat1);
  // const donutMatcapTextures = textureLoader.load(mat2);

  //Fonts

  const fontLoader = new THREE.FontLoader();
  fontLoader.load("./font/helvetiker_regular.typeface.json", (font) => {
    // fontLoader.load(font, (font) => {
    const textGeometry = new THREE.TextGeometry("karthik", {
      font: font,
      size: 0.5,
      height: 0.2,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 2,
    });
    // textGeometry.computeBoundingBox();
    // textGeometry.translate(
    //   -textGeometry.boundingBox.max.x * 0.5,
    //   -textGeometry.boundingBox.max.y * 0.5,
    //   -textGeometry.boundingBox.max.z * 0.5
    // );
    // textGeometry.computeBoundingBox();

    textGeometry.center();

    const textMaterial = new THREE.MeshMatcapMaterial({
      matcap: matcapTextures,
    });
    const text = new THREE.Mesh(textGeometry, textMaterial);
    scene.add(text);

    const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
    const donutMaterial = new THREE.MeshMatcapMaterial({
      matcap: donutMatcapTextures,
    });

    for (let index = 0; index < 600; index++) {
      const donut = new THREE.Mesh(donutGeometry, donutMaterial);
      donut.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      donut.rotation.x = Math.random() * Math.PI;
      donut.rotation.y = Math.random() * Math.PI;
      const scale = Math.random();

      donut.scale.set(scale, scale, scale);
      scene.add(donut);
    }
  });

  /**
   * Object
   */
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
  );

  //scene.add(cube);
  //cube.position.x = -3;
  /**
   * Sizes
   */
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

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
  camera.position.x = 1;
  camera.position.y = 1;
  camera.position.z = 2;
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
   * Animate
   */
  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();
};
