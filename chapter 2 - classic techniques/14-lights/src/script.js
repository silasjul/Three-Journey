import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
// Ambient light
// const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
// scene.add(ambientLight)

// Hemisphere light
// const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 1.5)
// scene.add(hemisphereLight)

// Directional light
// const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
// directionalLight.position.set(1, 1, 1)
// scene.add(directionalLight)

// Point light
// const pointLight = new THREE.PointLight(0xffffff, 50, 10, 2)
// pointLight.position.set(2, 3, 4)
// scene.add(pointLight)

// Rect Area light
// const rectAreaLight = new THREE.RectAreaLight(0xffffff, 1, 1, 1)
// rectAreaLight.position.set(-1.5, 0, 1.5)
// rectAreaLight.lookAt(new THREE.Vector3())
// scene.add(rectAreaLight)

// Spot light
// const spotLight = new THREE.SpotLight(0xffffff, 5, 20, Math.PI * 0.3, 0.5, 1.5)
// spotLight.position.set(0, 3, 0)
// spotLight.target.position.x = -1.5
// scene.add(spotLight, spotLight.target)

// const spotLightHelper = new THREE.SpotLightHelper(spotLight)
// scene.add(spotLightHelper)

// const spotLightFolder = gui.addFolder('Spot Light')
// spotLightFolder.addColor(spotLight, 'color')
// spotLightFolder.add(spotLight, 'intensity').min(0).max(20).step(0.1)
// spotLightFolder.add(spotLight, 'distance').min(0).max(50).step(0.1)
// spotLightFolder.add(spotLight, 'angle').min(0).max(Math.PI / 2).step(0.01)
// spotLightFolder.add(spotLight, 'penumbra').min(0).max(1).step(0.01)
// spotLightFolder.add(spotLight, 'decay').min(0).max(5).step(0.1)
// spotLightFolder.add(spotLight.position, 'x').min(-5).max(5).step(0.1).name('position x')
// spotLightFolder.add(spotLight.position, 'y').min(-5).max(5).step(0.1).name('position y')
// spotLightFolder.add(spotLight.position, 'z').min(-5).max(5).step(0.1).name('position z')
// spotLightFolder.add(spotLight.target.position, 'x').min(-5).max(5).step(0.1).name('target x')
// spotLightFolder.add(spotLight.target.position, 'y').min(-5).max(5).step(0.1).name('target y')
// spotLightFolder.add(spotLight.target.position, 'z').min(-5).max(5).step(0.1).name('target z')

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Update helper
    spotLightHelper.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()