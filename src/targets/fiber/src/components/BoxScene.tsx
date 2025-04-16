import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import type { FC, RefObject } from "react";
import { Mesh } from "three";
import { Lights } from "./Lights";
import { sceneConstants } from "../constants";
import { Plane } from "./Plane";
import { Helpers } from "./Helpers";

import { Box } from "./models/Box";
import { House } from "./models/House";
import { CatSphere } from "./models/CatSphere";
import { CatBox } from "./models/CatBox";
import { Vector3 } from "three";
import { Background, Skydome } from "./Background";
import { SkydomeLight } from "./SkydomeLight";
import { SkydomeCamera } from "./SkydomeCamera";

interface RegisteredModel {
  // TODO: any
  model: FC<ModelComponentProps>;
  initial: {
    scale: Vector3;
    position: Vector3;
  };
}

const models: Record<string, RegisteredModel> = {
  "Cat Sphere": {
    model: CatSphere,
    initial: {
      scale: new Vector3(3, 3, 3),
      position: new Vector3(0, 0, 0),
    },
  },
  "Cat Box": {
    model: CatBox,
    initial: {
      scale: new Vector3(3, 3, 3),
      position: new Vector3(0, 0, 0),
    },
  },
  Box: {
    model: Box,
    initial: {
      scale: new Vector3(1, 1, 1),
      position: new Vector3(0, 0, 0),
    },
  },
  House: {
    model: House,
    initial: {
      scale: new Vector3(3, 3, 3),
      position: new Vector3(0, -3, 0),
    },
  },
};

export const BoxScene = () => {
  const selectedRef = useRef<Mesh>(null);
  const model = useControls("Model", sceneConstants.model);

  useFrame(() => {
    if (selectedRef.current) {
      selectedRef.current.rotation.x += model["Angular Speed"][0];
      selectedRef.current.rotation.y += model["Angular Speed"][1];
      selectedRef.current.rotation.z += model["Angular Speed"][2];
    }
  });

  const selected = models[model.model];

  return (
    <>
      {/* <Background /> */}

      <Skydome />
      {/* <SkydomeLight /> */}
      <selected.model
        ref={selectedRef}
        scale={selected.initial.scale}
        position={selected.initial.position}
      />
      <Plane />
      <Lights />
      <Helpers />
      <OrbitControls
        minDistance={2}
        maxDistance={200}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        // onChange={() => console.log("change")}
      />
      <SkydomeCamera />
    </>
  );
};
export type ModelComponentProps = {
  ref: RefObject<Mesh | null>;
} & Pick<Mesh, "scale" | "position">;
