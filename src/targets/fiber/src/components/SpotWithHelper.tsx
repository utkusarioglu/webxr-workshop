import { SpotLight } from "@react-three/drei";
import { useHelper } from "@react-three/drei";
import { type FC, useRef } from "react";
import { Object3D, Object3DEventMap, SpotLightHelper } from "three";

type SpotWithHelperProps = Parameters<typeof SpotLight>[0];

export const SpotWithHelper: FC<SpotWithHelperProps> = (props) => {
  const spotRef = useRef<Object3D<Object3DEventMap>>(null);
  // @ts-expect-error ref type null issue
  const helper = useHelper(spotRef, SpotLightHelper, "red");
  return (
    <spotLight
      ref={spotRef}
      {...props}
    />
  );
};
