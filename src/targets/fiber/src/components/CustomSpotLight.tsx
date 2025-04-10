import { FC } from "react";
import { SpotWithHelper } from "./SpotWithHelper";
import { folder, useControls } from "leva";
import { useLightMetaStore } from "../store";

export type CustomSpotLightProps = {
  index: number;
  showHelper: boolean;
  position: [number, number, number];
  color: string;
  penumbra: number;
  angle: number;
  intensity: number;
};

export const CustomSpotLight: FC<CustomSpotLightProps> = ({
  index,
  // showHelper,
  // angle,
  // color,
}) => {
  const state = useLightMetaStore();
  // const spot = useLightMetaStore((state) => state.spots[index]);
  const spot = state.spots[index];

  useControls("Lights", {
    [spot.key]: folder(
      {
        showHelper: {
          value: spot.showHelper,
          onChange: state.setSpotShowHelper(index),
        },
        color: {
          value: spot.color,
          onChange: state.setSpotColor(index),
        },
        penumbra: {
          value: spot.penumbra,
          onChange: state.setSpotPenumbra(index),
          min: -2,
          max: 2,
          step: 0.1,
        },
        angle: {
          value: spot.angle,
          onChange: state.setSpotAngle(index),
        },
        intensity: {
          value: spot.intensity,
          onChange: state.setSpotIntensity(index),
          min: 0,
          max: 255,
          step: 1,
        },
        position: {
          value: spot.position,
          onChange: state.setSpotPosition(index),
          min: 0,
          max: 20,
          step: 0.5,
        },
      },
      { collapsed: true }
    ),
  });

  return (
    <>
      {spot.showHelper ? (
        <SpotWithHelper
          castShadow
          penumbra={spot.penumbra}
          angle={spot.angle}
          intensity={spot.intensity}
          color={spot.color}
          position={spot.position}
        />
      ) : (
        <spotLight
          castShadow
          penumbra={spot.penumbra}
          angle={spot.angle}
          intensity={spot.intensity}
          color={spot.color}
          position={spot.position}
        />
      )}
    </>
  );
};
