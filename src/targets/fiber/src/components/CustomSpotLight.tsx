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

const SPOT_COMMON_PROPS = {
  "shadow-mapSize-width": 2048,
  "shadow-mapSize-height": 2048,
  // "shadow-camera-near": 1,
  // "shadow-camera-far": 50,
  // "shadow-camera-top": 10,
  // "shadow-camera-bottom": -10,
  // "shadow-camera-left": -10,
  // "shadow-camera-right": 10,
  // "shadow-normalBias": 1,
  // "shadow-bias": -0.0005,
};

export const CustomSpotLight: FC<CustomSpotLightProps> = ({ index }) => {
  const state = useLightMetaStore();
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
          min: -1e-2,
          max: 1,
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

  const spotProps = {
    castShadow: true,
    penumbra: spot.penumbra,
    angle: spot.angle,
    intensity: spot.intensity,
    color: spot.color,
    position: spot.position,
    ...SPOT_COMMON_PROPS,
  };

  return (
    <>
      {spot.showHelper || state.showHelper ? (
        <SpotWithHelper {...spotProps} />
      ) : (
        <spotLight {...spotProps} />
      )}
    </>
  );
};
