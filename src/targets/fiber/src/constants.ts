// export const groundConstants = {
//   altitude: {
//     value: 3,
//     min: 0,
//     max: 10,
//     steps: 0.1,
//   },
// };

export const boxConstants = {
  color: "#FFFFFF",
  dimensions: {
    value: {
      x: 3,
      y: 3,
      z: 3,
    },
    min: 1e-2,
    max: 10,
  },
};

export const sceneConstants = {
  model: {
    model: {
      options: ["Score", "Box", "House", "Cat Sphere", "Cat Box"],
      value: "Score",
    },
    scale: {
      value: 1,
      min: 0.1,
      max: 5,
      step: 0.5,
    },
    position: {
      value: [0, 0, 0] as [number, number, number],
      min: -10,
      max: 10,
      step: 0.1,
    },
    "Angular Speed": {
      value: [0, 0, 0] as [number, number, number],
      min: -1,
      max: 1,
      step: 1e-2,
    },
  },
  helpers: {
    grid: false,
    gizmo: false,
    axes: false,
  },
};
