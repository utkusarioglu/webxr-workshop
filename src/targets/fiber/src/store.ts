import { create } from "zustand";

type Position = [number, number, number];

interface SpotState {
  key: string;
  index: number;
  count: number;
  showHelper: boolean;
  color: string;
  penumbra: number;
  angle: number;
  intensity: number;
  position: [number, number, number];
}

const getColors = (count: number) => {
  switch (count) {
    case 1:
      return ["#FFFFFF"];

    case 2:
      return ["#00FFFF", "#EEDDCC"];

    case 3:
      return ["#FF0000", "#00FF00", "#0000FF"];

    default:
      return [
        "#e81416",
        "#ffa500",
        "#faeb36",
        "#79c314",
        "#487de7",
        "#4b369d",
        "#70369d",
      ];
  }
};

const getPosition = (
  state: LightMetaState,
  altitude: number,
  spread: number,
  // rotation: number,
  count: number,
  index: number
) => {
  if (count < 2) {
    return [0, altitude, 0] as Position;
  }
  return [
    spread * Math.cos((2 * Math.PI * index) / count + state.rotation),
    altitude,
    spread * Math.sin((2 * Math.PI * index) / count + state.rotation),
  ] as Position;
};

function createSpotState(
  state: LightMetaState,
  count: number,
  index: number
): SpotState {
  return {
    key: `Spot ${index + 1} of ${count}`,
    index,
    count,
    showHelper: state.showHelper,
    color: getColors(count)[index],
    penumbra: 1,
    angle: 0.45,
    intensity: 255,
    position: getPosition(state, 10, 4, count, index),
  };
}

// interface SpotStateVerbs {
//   setSpotShowHelper: (showHelper: boolean) => void;
//   setSpotColor: (color: string) => void;
//   setSpotPenumbra: (penumbra: number) => void;
//   setSpotAngle: (angle: number) => void;
//   setSpotIntensity: (intensity: number) => void;
//   setSpotPosition: (position: [number, number, number]) => void;
// }

function setSpotProperty(
  state: LightMetaState,
  index: keyof LightMetaState["spots"],
  property: keyof SpotState,
  value: unknown
) {
  const spots = [...state.spots];
  // @ts-expect-error inexact type
  spots[index][property] = value;

  return {
    ...state,
    spots,
  };
}

interface LightMetaState {
  count: number;
  showHelper: boolean;
  rotation: number;
  spread: number;
  altitude: number;
  spots: SpotState[];

  setCount: (count: number) => void;
  setShowHelper: (show: boolean) => void;
  setRotation: (rotation: number) => void;
  setSpread: (spread: number) => void;
  setAltitude: (altitude: number) => void;

  setSpotShowHelper: (index: number) => (showHelper: boolean) => void;
  setSpotColor: (index: number) => (color: string) => void;
  setSpotPenumbra: (index: number) => (penumbra: number) => void;
  setSpotAngle: (index: number) => (angle: number) => void;
  setSpotIntensity: (index: number) => (intensity: number) => void;
  setSpotPosition: (index: number) => (position: Position) => void;
}

export const useLightMetaStore = create<LightMetaState>()((set) => ({
  count: 3,
  showHelper: false,
  rotation: 0,
  spread: 4,
  altitude: 10,
  spots: [],

  setCount: (count) =>
    set((state) => {
      return {
        count,
        spots: Array(count)
          .fill(null)
          .map((_, index) => createSpotState(state, count, index)),
      };
    }),
  setShowHelper: (showHelper) => set(() => ({ showHelper })),
  setRotation: (rotation) => set(() => ({ rotation })),
  setSpread: (spread) => set(() => ({ spread })),
  setAltitude: (altitude) => set(() => ({ altitude })),

  setSpotShowHelper: (index) => (value) =>
    set((state) => setSpotProperty(state, index, "showHelper", value)),

  // setSpotColor: (index, color) =>
  //   set((state) => {
  //     state.spots[index].color = color;
  //     return state;
  //   }),
  setSpotColor: (index) => (value) =>
    set((state) => setSpotProperty(state, index, "color", value)),

  // setSpotPenumbra: (index, penumbra) =>
  //   set((state) => {
  //     state.spots[index].penumbra = penumbra;
  //     return state;
  //   }),
  setSpotPenumbra: (index) => (value) =>
    set((state) => setSpotProperty(state, index, "penumbra", value)),

  // setSpotAngle: (index, angle) =>
  //   set((state) => {
  //     state.spots[index].angle = angle;
  //     return state;
  //   }),
  setSpotAngle: (index) => (value) =>
    set((state) => setSpotProperty(state, index, "angle", value)),

  // setSpotIntensity: (index, intensity) =>
  //   set((state) => {
  //     state.spots[index].intensity = intensity;
  //     return state;
  //   }),
  setSpotIntensity: (index) => (value) =>
    set((state) => setSpotProperty(state, index, "intensity", value)),

  // setSpotPosition: (index, position) =>
  //   set((state) => {
  //     state.spots[index].position = position;
  //     return state;
  //   }),
  setSpotPosition: (index) => (value) =>
    set((state) => setSpotProperty(state, index, "position", value)),
}));
