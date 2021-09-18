import * as dat from 'dat.gui'
import { playHitSound, scene, world } from './base'
import { createBox, createSphere, objectsToUpdate } from './utils'
/**
    * Debug
    */
export const gui = new dat.GUI()
export const debugObject = {}
debugObject.createSphere = () => {

    createSphere(
        Math.random() * 0.5,
        {
            x: (Math.random() - 0.5) * 3,
            y: 3,
            z: (Math.random() - 0.5) * 3
        }
    )
}
debugObject.createBox = () => {

    createBox(
        Math.random() * 0.5,
        {
            x: (Math.random() - 0.5) * 3,
            y: 3,
            z: (Math.random() - 0.5) * 3
        }
    )
}

debugObject.reset = () => {

    for (const object of objectsToUpdate) {

        //Remove body 
        object.body.removeEventListener("collide", playHitSound)
        world.remove(object.body)

        //remove mesh
        scene.remove(object.mesh)

    }

}
gui.add(debugObject, "createSphere")
gui.add(debugObject, "createBox")
gui.add(debugObject, "reset")