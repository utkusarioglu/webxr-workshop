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

function getAdditiveColors(n: number) {
  if (n < 2) {
    return [[0, 0, 1]];
  }
  return Array(n)
    .fill(360 / n)
    .map((v, i) => [v * i, 1, 0.5]);
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function hslToRgb(h: number, s: number, l: number) {
  const c = (1 - Math.abs(2 * l - 1)) * s; // Chroma
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) [r, g, b] = [c, x, 0];
  else if (60 <= h && h < 120) [r, g, b] = [x, c, 0];
  else if (120 <= h && h < 180) [r, g, b] = [0, c, x];
  else if (180 <= h && h < 240) [r, g, b] = [0, x, c];
  else if (240 <= h && h < 300) [r, g, b] = [x, 0, c];
  else if (300 <= h && h < 360) [r, g, b] = [c, 0, x];

  // Convert to [0,255] and return
  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ];
}

const getColors = (count: number) => {
  const hsl = getAdditiveColors(count);
  const rgb = hsl.map(([h, s, l]) => hslToRgb(h, s, l));
  const hex = rgb.map(([r, g, b]) => rgbToHex(r, g, b));
  return hex;
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
  angle: number;
  spots: SpotState[];

  setCount: (count: number) => void;
  setShowHelper: (show: boolean) => void;
  setRotation: (rotation: number) => void;
  setSpread: (spread: number) => void;
  setAltitude: (altitude: number) => void;
  setAngle: (angle: number) => void;

  setSpotShowHelper: (index: number) => (showHelper: boolean) => void;
  setSpotColor: (index: number) => (color: string) => void;
  setSpotPenumbra: (index: number) => (penumbra: number) => void;
  setSpotAngle: (index: number) => (angle: number) => void;
  setSpotIntensity: (index: number) => (intensity: number) => void;
  setSpotPosition: (index: number) => (position: Position) => void;
}

export const useLightMetaStore = create<LightMetaState>()((set) => ({
  count: 1,
  showHelper: false,
  rotation: 0,
  spread: 4,
  altitude: 10,
  angle: 0.45,
  spots: [],

  setCount: (count) =>
    set((state) => {
      return {
        count,
        // you need spread here
        spots: Array(count)
          .fill(null)
          .map((_, index) => createSpotState(state, count, index)),
      };
    }),
  setShowHelper: (showHelper) => set(() => ({ showHelper })),
  setRotation: (rotation) =>
    set((state) => {
      const spots = [...state.spots];
      spots.forEach((spot, index) => {
        spot.position = getPosition(
          state,
          state.altitude,
          state.spread,
          state.count,
          index
        );
      });
      return {
        rotation,
        spots,
      };
    }),
  setSpread: (spread) =>
    set((state) => {
      const spots = state.spots;
      spots.forEach((spot, index) => {
        spot.position = getPosition(
          state,
          state.altitude,
          state.spread,
          state.count,
          index
        );
      });
      return {
        spread,
        spots,
      };
    }),
  setAltitude: (altitude) =>
    set((state) => {
      const spots = [...state.spots];
      spots.forEach((spot, index) => {
        spot.position = getPosition(
          state,
          state.altitude,
          state.spread,
          state.count,
          index
        );
      });
      return {
        altitude,
        spots,
      };
    }),
  setAngle: (angle) =>
    set((state) => {
      const spots = [...state.spots];
      spots.forEach((spot) => {
        spot.angle = angle;
      });
      return {
        spots,
      };
    }),

  setSpotShowHelper: (index) => (value) =>
    set((state) => setSpotProperty(state, index, "showHelper", value)),

  setSpotColor: (index) => (value) =>
    set((state) => setSpotProperty(state, index, "color", value)),

  setSpotPenumbra: (index) => (value) =>
    set((state) => setSpotProperty(state, index, "penumbra", value)),

  setSpotAngle: (index) => (value) =>
    set((state) => setSpotProperty(state, index, "angle", value)),

  setSpotIntensity: (index) => (value) =>
    set((state) => setSpotProperty(state, index, "intensity", value)),

  setSpotPosition: (index) => (value) =>
    set((state) => setSpotProperty(state, index, "position", value)),
}));
