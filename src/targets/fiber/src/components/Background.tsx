import { useTexture } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { SRGBColorSpace, TextureLoader } from "three";
import type { Mesh } from "three";
import { BackSide } from "three";
// import { Color } from "three";

export const Background = () => {
  const { scene } = useThree();
  const texture = useTexture("/star-map.jpg");
  texture.colorSpace = SRGBColorSpace;

  scene.background = texture;

  return null;
};

export const Skydome = () => {
  const ref = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, "/star-map.jpg");
  texture.colorSpace = SRGBColorSpace;

  useEffect(() => {
    ref.current?.layers.set(1);
  }, []);

  return (
    <mesh
      ref={ref}
      scale={[-1, 1, 1]}
    >
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial
        color="#555555"
        map={texture}
        side={BackSide}
      />
    </mesh>
  );
};
