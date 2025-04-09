import { Reducer, useMemo, useReducer } from "react";
import { CustomSpotLight } from "./CustomSpotLight";
import { folder, useControls } from "leva";
import { getColors, getPosition } from "../hooks/spot-light-values";

interface LightMetaState {
  count: number;
  showHelper: boolean;
  rotation: number;
  spread: number;
  altitude: number;
}

const LIGHT_META_INITIAL_STATE: LightMetaState = {
  count: 3,
  showHelper: false,
  rotation: 0,
  spread: 4,
  altitude: 10,
};

type Actions =
  | ActionType<"count">
  | ActionType<"showHelper">
  | ActionType<"rotation">
  | ActionType<"spread">
  | ActionType<"altitude">;

type ActionType<T> = T extends keyof LightMetaState
  ? {
      type: T;
      payload: LightMetaState[T];
    }
  : never;

const lightMetaReducer: Reducer<LightMetaState, Actions> = (
  state,
  { type, payload }
) => {
  switch (type) {
    case "count":
      return {
        ...state,
        count: payload,
      };
    case "showHelper":
      return {
        ...state,
        showHelper: payload,
      };
    case "rotation":
      return {
        ...state,
        rotation: payload,
      };
    case "spread":
      return {
        ...state,
        spread: payload,
      };
    case "altitude":
      return {
        ...state,
        altitude: payload,
      };
    default:
      return state;
  }
};

export const Lights = () => {
  const [state, dispatch] = useReducer(
    lightMetaReducer,
    LIGHT_META_INITIAL_STATE
  );

  useControls("Light", {
    Meta: folder({
      count: {
        value: state.count,
        min: 0,
        max: 7,
        step: 1,
        onChange: (payload) => dispatch({ type: "count", payload }),
      },
      showHelper: {
        value: state.showHelper,
        onChange: (payload) => dispatch({ type: "showHelper", payload }),
      },
      rotation: {
        value: state.rotation,
        onChange: (payload) => dispatch({ type: "rotation", payload }),
      },
      spread: {
        value: state.spread,
        onChange: (payload) => dispatch({ type: "spread", payload }),
      },
      altitude: {
        value: state.altitude,
        onChange: (payload) => dispatch({ type: "altitude", payload }),
      },
    }),
  });

  const colors = useMemo(() => getColors(state.count), [state.count]);
  // const positions = useMemo(() => getPosition)

  return (
    <>
      {Array(state.count)
        .fill(null)
        .map((_, i) => (
          <CustomSpotLight
            key={colors[i]}
            index={i}
            position={getPosition(
              state.altitude,
              state.spread,
              state.rotation,
              state.count,
              i
            )}
            // index,
            showHelper={state.showHelper}
            penumbra={1}
            angle={0.45}
            intensity={255}
            color={colors[i]}
            // {...props}
          />
        ))}
    </>
  );
};
