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
      },
      altitude: {
        value: state.altitude,
        onChange: state.setAltitude,
      },
    }),
  });

  // const colors = useMemo(() => getColors(state.count), [state.count]);
  // const positions = getPositions(
  //   state.altitude,
  //   state.spread,
  //   state.rotation,
  //   state.count
  // );

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
