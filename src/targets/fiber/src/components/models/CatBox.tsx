import type { FC } from "react";
import type { ModelComponentProps } from "../BoxScene";
import { useTexture } from "@react-three/drei";

export const CatBox: FC<ModelComponentProps> = ({ position, scale, ref }) => {
  const cat = [
    useTexture("/cat/1.jpg"),
    useTexture("/cat/2.jpg"),
    useTexture("/cat/3.jpg"),
    useTexture("/cat/4.jpg"),
    useTexture("/cat/5.jpg"),
    useTexture("/cat/6.jpg"),
  ];

  return (
    <mesh
      castShadow
      position={position}
      scale={scale}
      ref={ref}
    >
      <boxGeometry />
      {Array(6)
        .fill(null)
        .map((_, i) => (
          <meshStandardMaterial
            key={i}
            attach={`material-${i}`}
            map={cat[i]}
          />
        ))}
    </mesh>
  );
};
