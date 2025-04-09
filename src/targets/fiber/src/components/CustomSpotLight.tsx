import { FC } from "react";
import { SpotWithHelper } from "./SpotWithHelper";
import { folder, useControls } from "leva";

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
  showHelper,
  penumbra,
  angle,
  intensity,
  color,
  position,
}) => {
  const light = useControls("Lights", {
    [`Spot ${index + 1}`]: folder(
      {
        showHelper,
        color,
        penumbra: {
          value: penumbra,
          min: -2,
          max: 2,
          step: 0.1,
        },
        angle,
        intensity: {
          value: intensity,
          min: 0,
          max: 255,
          step: 1,
        },
        position: {
          value: position,
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
      {showHelper ? (
        <SpotWithHelper
          castShadow
          penumbra={light.penumbra}
          angle={light.angle}
          intensity={light.intensity}
          color={light.color}
          position={light.position}
        />
      ) : (
        <spotLight
          castShadow
          penumbra={light.penumbra}
          angle={light.angle}
          intensity={light.intensity}
          color={light.color}
          position={light.position}
        />
      )}
    </>
  );
};
