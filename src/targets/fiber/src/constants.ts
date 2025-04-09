export const groundConstants = {
  altitude: {
    value: 3,
    min: 0,
    max: 10,
    steps: 0.1,
  },
};

export const boxConstants = {
  color: "#FFFFFF",
  dimensions: {
    x: 3,
    y: 3,
    z: 3,
  },
};

export const sceneConstants = {
  boxTranslation: {
    speedX: {
      value: 5e-3,
      max: 1,
      min: 0,
      step: 1e-3,
    },
    speedY: {
      value: 0,
      max: 1,
      min: 0,
      step: 1e-3,
    },
    speedZ: {
      value: 5e-3,
      max: 1,
      min: 0,
      step: 1e-3,
    },
  },
  helpers: {
    grid: false,
    gizmo: false,
    axes: false,
  },
  // light: {
  // spot1: {
  //   spot1Helper: false,
  //   spot1ConeAngle: 0.45,
  //   spot1Penumbra: {
  //     value: 1,
  //     min: 0,
  //     max: 1,
  //     step: 0.1,
  //   },
  //   spot1Position: {
  //     value: {
  //       x: 0,
  //       y: 10,
  //       z: 0,
  //     },
  //   },
  //   spot1Intensity: {
  //     value: 100,
  //     min: 0,
  //     max: 100,
  //   },
  //   spot1Color: "#e24f4f",
  // },
  // spot2: {
  //   spot2Helper: false,
  //   spot2ConeAngle: 0.45,
  //   spot2Penumbra: {
  //     value: 1,
  //     min: 0,
  //     max: 1,
  //     step: 0.1,
  //   },
  //   spot2Position: {
  //     value: {
  //       x: -1,
  //       y: 5,
  //       z: 7,
  //     },
  //   },
  //   spot2Intensity: {
  //     value: 0,
  //     min: 0,
  //     max: 100,
  //   },
  //   spot2Color: "#0000ff",
  // },
  // ambient: {
  //   ambientIntensity: {
  //     value: 0,
  //     min: 0,
  //     max: 1,
  //     step: 1e-2,
  //   },
  //   ambientColor: "#FFFFFF",
  // },
  // },
};
