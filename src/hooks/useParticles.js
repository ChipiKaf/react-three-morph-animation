import { useState, useRef, useEffect, useMemo } from "react";
import * as THREE from 'three';
import gsap from 'gsap'

const useParticles = (model, bufferGeometry) => {
  const positions = useRef([]);
  const index = useRef(0);
  const [maxCount, setMaxCount] = useState(0);

  const morph = (newIndex, material) => {
    // update attributes
    bufferGeometry.current.attributes.position = positions.current[index.current]
    bufferGeometry.current.attributes.aPositionTarget = positions.current[newIndex]

    // animate progress
    gsap.fromTo(
      material.uniforms.uProgress, { value: 0 }, { value: 1, duration: 3, ease: 'linear' }
    )

    // save index

    index.current = newIndex
  }

  useEffect(() => {
    if (model?.scene?.children) {
        const childrenPositions = model.scene.children
        .map((child) => child.geometry?.attributes?.position)
        .filter(Boolean);

      const newMaxCount = childrenPositions.reduce((max, position) => {
        return position.count > max ? position.count : max;
      }, 0);

      const updatedPositions = childrenPositions.map((position) => {
        const originalArray = position.array;
        const newArray = new Float32Array(newMaxCount * 3);

        for (let i = 0; i < newMaxCount; i++) {
          const i3 = i * 3;
          if (i3 < originalArray.length) {
            newArray[i3] = originalArray[i3];
            newArray[i3 + 1] = originalArray[i3 + 1];
            newArray[i3 + 2] = originalArray[i3 + 2];
          } else {
            const randomIndex = Math.floor(position.count * Math.random()) * 3
            newArray[i3] = originalArray[randomIndex + 0];
            newArray[i3 + 1] = originalArray[randomIndex + 1];
            newArray[i3 + 2] = originalArray[randomIndex + 2];
          }
        }

        return new THREE.Float32BufferAttribute(newArray, 3);
      });

      positions.current = updatedPositions;

      const sizesArray = new Float32Array(newMaxCount)

      for (let i = 0; i < newMaxCount; i++){
        sizesArray[i] = Math.random();
      }

      bufferGeometry.current.setAttribute('position', positions.current[index.current])
      bufferGeometry.current.setAttribute('aPositionTarget', positions.current[3])
      bufferGeometry.current.setAttribute('aSize', new THREE.BufferAttribute(sizesArray, 1))

      setMaxCount(newMaxCount);
      console.log(newMaxCount);
    }
  }, [model]);

  return useMemo(
    () => ({
      maxCount,
      morph,
      positions,
    }),
    [positions, maxCount, morph]
  );
};

export default useParticles;
