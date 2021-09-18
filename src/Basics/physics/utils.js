import { defaultMaterial, environmentMapTexture, playHitSound, scene, world } from "./base"
import * as THREE from 'three'
import CANNON, { Vec3 } from "cannon"

export const objectsToUpdate = []
export const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
export const sphereMaterial = new THREE.MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture
})

export const createSphere = (radius, position) => {

    const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
    mesh.scale.set(radius, radius, radius)
    mesh.castShadow = true
    mesh.position.copy(position)
    scene.add(mesh)

    //cannon.js body 
    const shape = new CANNON.Sphere(radius)
    const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0, 3, 0),
        shape,
        material: defaultMaterial
    })
    body.position.copy(position)
    body.addEventListener("collide", playHitSound)
    world.addBody(body)

    //save in objects to update 
    objectsToUpdate.push({
        mesh,
        body
    })

}

/***
 * boxes
*/

export const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
export const boxMaterial = new THREE.MeshStandardMaterial({
    color: 0xffff00,
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture
})


export const createBox = (length, position) => {

    const mesh = new THREE.Mesh(boxGeometry, boxMaterial)
    mesh.scale.set(length, length, length)
    mesh.castShadow = true
    mesh.position.copy(position)
    scene.add(mesh)

    //cannon.js body 
    const shape = new CANNON.Box(new Vec3(length / 2, length / 2, length / 2))
    const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0, 3, 0),
        shape,
        material: defaultMaterial
    })
    body.position.copy(position)
    body.addEventListener("collide", playHitSound)
    world.addBody(body)

    //save in objects to update 
    objectsToUpdate.push({
        mesh,
        body
    })

}