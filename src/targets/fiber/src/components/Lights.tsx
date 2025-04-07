import { useControls, folder } from "leva";
import { sceneConstants } from "../constants";
import { SpotWithHelper } from "./SpotWithHelper";
import { SpotLight } from "@react-three/drei";
import { FC } from "react";

type CustomSpotLightProps = Parameters<typeof SpotLight>[0] & {
  showHelper: boolean;
};

const CustomSpotLight: FC<CustomSpotLightProps> = ({
  showHelper,
  position,
  color,
  penumbra,
  angle,
  intensity,
}) => {
  return (
    <>
      {showHelper ? (
        <SpotWithHelper
          castShadow
          penumbra={penumbra}
          angle={angle}
          intensity={intensity}
          color={color}
          position={position}
        />
      ) : (
        <spotLight
          castShadow
          penumbra={penumbra}
          angle={angle}
          intensity={intensity}
          color={color}
          position={position}
        />
      )}
    </>
  );
};

export const Lights = () => {
  const light = useControls("Light", {
    Spot1: folder(sceneConstants.light.spot1),
    Spot2: folder(sceneConstants.light.spot2),
    Ambient: folder(sceneConstants.light.ambient),
  });

  return (
    <>
      <ambientLight
        color={light.ambientColor}
        intensity={light.ambientIntensity}
      />
      <CustomSpotLight
        showHelper={light.spot1Helper}
        castShadow
        penumbra={light.spot1Penumbra}
        angle={light.spot1ConeAngle}
        intensity={light.spot1Intensity}
        color={light.spot1Color}
        position={[
          light.spot1Position.x,
          light.spot1Position.y,
          light.spot1Position.z,
        ]}
      />
      <CustomSpotLight
        showHelper={light.spot2Helper}
        castShadow
        penumbra={light.spot2Penumbra}
        angle={light.spot2ConeAngle}
        intensity={light.spot2Intensity}
        color={light.spot2Color}
        position={[
          light.spot2Position.x,
          light.spot2Position.y,
          light.spot2Position.z,
        ]}
      />
    </>
  );
};
