// === Three.js & Cannon.js দিয়ে 3D গেম তৈরি === //

// Scene, Camera & Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("gameCanvas") });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Physics Engine (Cannon.js)
const world = new CANNON.World();
world.gravity.set(0, -9.8, 0);  // নিচের দিকে গ্রাভিটি

// Player (Stickman)
const playerMaterial = new THREE.MeshBasicMaterial({ color: "blue" });
const playerGeometry = new THREE.SphereGeometry(1, 32, 32);
const player = new THREE.Mesh(playerGeometry, playerMaterial);
scene.add(player);

const playerBody = new CANNON.Body({
    mass: 1,
    shape: new CANNON.Sphere(1),
    position: new CANNON.Vec3(0, 5, 0)
});
world.addBody(playerBody);

// Obstacles (Spikes & Walls)
const obstacleMaterial = new THREE.MeshBasicMaterial({ color: "red" });
const obstacleGeometry = new THREE.BoxGeometry(2, 2, 2);
const obstacles = [];

function createObstacle(x, y, z) {
    const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
    obstacle.position.set(x, y, z);
    scene.add(obstacle);
    obstacles.push(obstacle);

    const obstacleBody = new CANNON.Body({
        mass: 0,  // Static object
        shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
        position: new CANNON.Vec3(x, y, z)
    });
    world.addBody(obstacleBody);
}

// Obstacles তৈরি করা
createObstacle(0, 2, -5);
createObstacle(3, 2, -10);
createObstacle(-3, 2, -15);

// Player Movement
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        playerBody.position.x -= 1;
    } else if (event.key === "ArrowRight") {
        playerBody.position.x += 1;
    }
});

// Game Loop (Animation)
function animate() {
    requestAnimationFrame(animate);

    world.step(1 / 60);
    player.position.copy(playerBody.position);

    // Player and obstacle collision detection
    obstacles.forEach(obstacle => {
        if (player.position.distanceTo(obstacle.position) < 1.5) {
            console.log("Game Over!");  // Player Hits an Obstacle
        }
    });

    renderer.render(scene, camera);
}
animate();