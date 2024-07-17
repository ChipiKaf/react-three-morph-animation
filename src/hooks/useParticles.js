import { useState, useRef, useEffect, useMemo } from "react";
import * as THREE from 'three';

const useParticles = (model, bufferGeometry) => {
  const positions = useRef([]);
  const geometry = useRef(null)
  const [maxCount, setMaxCount] = useState(0);

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

      bufferGeometry.current.setAttribute('position', positions.current[1])
      bufferGeometry.current.setAttribute('aPositionTarget', positions.current[3])
      setMaxCount(newMaxCount);
      console.log(newMaxCount);
    }
  }, [model]);

  return useMemo(
    () => ({
      positions,
      maxCount,
    }),
    [positions, maxCount]
  );
};

export default useParticles;
