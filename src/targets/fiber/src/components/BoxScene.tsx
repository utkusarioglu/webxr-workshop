import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import { Mesh } from "three";
import { Box } from "./Box";
import { Lights } from "./Lights";
import { sceneConstants } from "../constants";
import { Plane } from "./Plane";
import { Helpers } from "./Helpers";

export const BoxScene = () => {
  const boxRef = useRef<Mesh>(null);
  const box = useControls("Box", sceneConstants.boxTranslation);

  useFrame(() => {
    if (boxRef.current) {
      boxRef.current.rotation.x += box.speedX;
      boxRef.current.rotation.y += box.speedY;
      boxRef.current.rotation.z += box.speedZ;
    }
  });

  return (
    <>
      <OrbitControls />
      <Lights />
      <Helpers />

      <Box ref={boxRef} />
      <Plane />
    </>
  );
};
