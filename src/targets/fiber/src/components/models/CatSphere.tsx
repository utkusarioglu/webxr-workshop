import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import type { FC } from "react";
import type { ModelComponentProps } from "../BoxScene";

export const CatSphere: FC<ModelComponentProps> = ({
  position,
  scale,
  ref,
}) => {
  const cat1 = useLoader(TextureLoader, "/cat/1.jpg");

  return (
    <mesh
      castShadow
      ref={ref}
      position={position}
      scale={scale}
    >
      <sphereGeometry args={[1, 200, 200]} />
      <meshStandardMaterial map={cat1} />
    </mesh>
  );
};
