import { OrbitControls, shaderMaterial } from "@react-three/drei";
import vertexShader from "./shaders/particles/vertex.glsl";
import fragmentShader from "./shaders/particles/fragment.glsl";
import * as THREE from "three";
import { useControls, buttonGroup } from "leva";
import { extend, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import useParticles from "./hooks/useParticles";

const PIXEL_RATIO = Math.min(window.devicePixelRatio, 2);

const ParticlesMaterial = shaderMaterial(
  {
    uSize: 0.2,
    uResolution: new THREE.Vector2(
      window.innerWidth * PIXEL_RATIO,
      window.innerHeight * PIXEL_RATIO
    ),
    uProgress: 0
  },
  vertexShader,
  fragmentShader
  // { transparent: true, blending: THREE.NormalBlending }
);

extend({ ParticlesMaterial });
const Experience = () => {
  const particlesMaterial = useRef();
  const bufferGeometry = useRef();
  const model = useLoader(GLTFLoader, "./models.glb", (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("./draco/");
    loader.setDRACOLoader(dracoLoader);
  });
  const { morph } = useParticles(model, bufferGeometry)

  const { gl } = useThree();

  const { clearColor, uProgress, particleIndex } = useControls({
    clearColor: "#160920",
    uProgress: {
        value: 0, 
        min: 0,   
        max: 1,   
        step: 0.001
      },
      "Morph": buttonGroup({
        "Face": () => { morph(1, particlesMaterial.current) },
        "Sphere": () => { morph(2, particlesMaterial.current) },
        "Text": () => { morph(3, particlesMaterial.current) },

      })
  });


  useEffect(() => {
    console.log(particleIndex)
  }, [particleIndex])

  // Initialize
  useEffect(() => {
    gl.setClearColor("#160920");
    const handleResize = () => {
        particlesMaterial.current.uniforms.uResolution.value.set(
          window.innerWidth * PIXEL_RATIO,
          window.innerHeight * PIXEL_RATIO
        );
      };
  
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
}, []);


  // Change color control
  useEffect(() => {
    gl.setClearColor(clearColor);
  }, [clearColor]);

  // uProgress control
    useEffect(() => {
        if (particlesMaterial.current) {
            console.log(uProgress)
            particlesMaterial.current.uniforms.uProgress.value = uProgress
        }
    }, [uProgress])  


  return (
    <>
      <OrbitControls makeDefault />
      <points>
        <bufferGeometry ref={bufferGeometry} />
        <particlesMaterial
          ref={particlesMaterial}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
};

export default Experience;
