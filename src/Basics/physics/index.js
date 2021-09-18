import '../../style.css'
import * as gui from "./debug"
import { objectsToUpdate } from './utils'
import { clock, camera, controls, renderer, scene, world } from './base'
gui


let oldElapsedTime = 0


export default function () {


    const tick = () => {
        const elapsedTime = clock.getElapsedTime()
        const deltaTime = elapsedTime - oldElapsedTime
        oldElapsedTime = elapsedTime

        //update physics world 
        world.step(1 / 60, deltaTime, 3)

        for (const object of objectsToUpdate) {

            object.mesh.position.copy(object.body.position)
            object.mesh.quaternion.copy(object.body.quaternion)

        }


        // Update controls
        controls.update()

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }

    tick()
}


