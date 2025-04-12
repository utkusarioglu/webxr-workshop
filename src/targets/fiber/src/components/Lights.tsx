import { CustomSpotLight } from "./CustomSpotLight";
import { folder, useControls } from "leva";
import { useLightMetaStore } from "../store";
export const Lights = () => {
  const state = useLightMetaStore();

  useControls("Lights", {
    Meta: folder({
      count: {
        value: state.count,
        min: 0,
        max: 7,
        step: 1,

        onChange: state.setCount,
      },
      showHelper: {
        value: state.showHelper,
        onChange: state.setShowHelper,
      },
      rotation: {
        value: state.rotation,
        onChange: state.setRotation,
      },
      spread: {
        value: state.spread,
        onChange: state.setSpread,
        min: 0,
        max: 20,
        steps: 0.5,
      },
      altitude: {
        value: state.altitude,
        onChange: state.setAltitude,
        min: 0,
        max: 20,
        steps: 0.5,
      },
      angle: {
        value: state.angle,
        onChange: state.setAngle,
        min: 0,
        max: 1,
        steps: 1e-2,
      },
    }),
  });

  return (
    <>
      {state.spots.map((spot) => (
        <CustomSpotLight
          key={spot.key}
          index={spot.index}
          position={spot.position}
          // index,
          showHelper={spot.showHelper}
          penumbra={spot.penumbra}
          angle={spot.angle}
          intensity={spot.intensity}
          color={spot.color}
          // {...props}
        />
      ))}
    </>
  );
};
