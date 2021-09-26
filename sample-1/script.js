const canvas = document.getElementById('my-canvas');
const width = canvas.clientWidth;
const height = canvas.clientHeight;

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: canvas
});
renderer.setSize(width, height);

const camera = new THREE.PerspectiveCamera(
  75,
  width / height
);
camera.position.z = 2;

const scene = new THREE.Scene({
  antialias: true
});

const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: '#ff0000'
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

renderer.setAnimationLoop(time => {
  mesh.rotation.y = time * 0.001;
  renderer.render(scene, camera);
});
