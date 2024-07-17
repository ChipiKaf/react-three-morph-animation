import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        camera={ {
            fov: 35,
            near: 0.1,
            far: 200,
            position: [ 0, 0, 8 * 2 ]
        } }
        gl={ { antialias: true, pixelRatio: Math.min(window.devicePixelRatio, 2) } }
    >
        <Experience />
    </Canvas>
)