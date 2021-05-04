const CUBE_LENGTH = 25;

var nodes = [];
var wallGeometries = [];
var objects = [];
var searchObjects = [];
var grid, walls, mouse, keyboard;
var start, finish;
var pathMesh, searchMesh;

let scene, camera, renderer;
let raycaster, threeMouse, controls;
let directionalLight;
let intersects;

var recoursesLouded = false;
var isRunning = false;

var mobileMaxZoom = 8000, desktopMaxZoom = 5500;

function prepareThreeScene()
{
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x29282C);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 50000);
    camera.position.set(-0.9036 * window.innerWidth + 3037 , -0.6972 * window.innerWidth + 2016, -423);

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio(window.devicePixelRatio);
    onWindowResize();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xf2e5bf, 1.2);
    scene.add(ambientLight);

    directionalLight = new THREE.PointLight(0xffffff, 0.3);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.far = 2000;
    scene.add(directionalLight);

    //const helper = new THREE.CameraHelper(directionalLight.shadow.camera);
    //scene.add(helper);   

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI / 2; //-- Limit camera rotation to ground --//
    controls.minDistance = 100;
    currentState == "mobile" ? controls.maxDistance = mobileMaxZoom : controls.maxDistance = desktopMaxZoom;
    controls.enablePan = false;

    raycaster = new THREE.Raycaster();
    threeMouse = new THREE.Vector2();
}

function setLightAndCameraPositions()
{
    directionalLight.position.set((grid.height * CUBE_LENGTH) / 2 - CUBE_LENGTH / 2, 800 + grid.width + grid.height, -(grid.width * CUBE_LENGTH) / 2 + CUBE_LENGTH / 2);
    controls.target.set((grid.height * CUBE_LENGTH) / 2 - CUBE_LENGTH / 2, 0, -(grid.width * CUBE_LENGTH) / 2 + CUBE_LENGTH / 2);
    camera.lookAt(controls.target);
}

function initializeObjects()
{
    grid = new Grid();
    start = new StartNode();
    finish = new FinishNode();
    walls = new Walls();
    mouse = new Mouse();
    keyboard = new Keyboard();
    searchMesh = new SearchMesh();
    pathMesh = new Path();
}

function Init()
{
    prepareThreeScene();
    initializeObjects();
    setLightAndCameraPositions();

    setTimeout(() => {
        Animate();
        document.getElementsByClassName("loaded")[0].style.display = "block";
        document.getElementsByClassName("loader")[0].remove();
    }, 500);
}

function Animate()
{
    requestAnimationFrame(Animate);
    renderer.render(scene, camera);
}

Init();
