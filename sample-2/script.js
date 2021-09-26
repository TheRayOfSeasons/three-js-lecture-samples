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

const mousePosition = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
window.addEventListener('mousemove', event => {
  mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
  mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mousePosition, camera);
});
const intersectPoint = new THREE.Vector3();
const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 1);

renderer.setAnimationLoop(time => {
  raycaster.ray.intersectPlane(plane, intersectPoint);
  mesh.rotation.y = time * 0.001;
  mesh.position.copy(intersectPoint);
  renderer.render(scene, camera);
});
