import { useXRInputSourceEvent } from "@react-three/xr";
import { useState } from "react";
import type { FC } from "react";

import { Quaternion, Vector3 } from "three";
import { hitTestMatrices } from "../xr-store";

const vectorHelper = new Vector3();

interface ItemsProps {
  // TODO any
  Component: FC<any>;
}

export const Items: FC<ItemsProps> = ({ Component }) => {
  const [items, setItems] = useState<
    Array<{ position: Vector3; quaternion: Quaternion }>
  >([]);

  useXRInputSourceEvent(
    "all",
    "select",
    (e) => {
      const matrix = hitTestMatrices[e.inputSource.handedness];
      if (matrix) {
        const position = new Vector3();
        const quaternion = new Quaternion();

        matrix.decompose(position, quaternion, vectorHelper);
        setItems((i) => [...i, { position, quaternion }]);
      }
    },

    []
  );

  return items.map((item, index) => (
    <Component
      key={index}
      position={item.position}
      quaternion={item.quaternion}
      scale={0.2}
    />
  ));
};
