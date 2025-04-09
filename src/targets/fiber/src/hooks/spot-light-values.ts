import { useState } from "react";
import { folder, useControls } from "leva";
// import { CustomSpotLightProps } from "../components/Lights";

// const n = (index: number, name: string) => `${name} ${index}`;

export const getColors = (count: number) => {
  switch (count) {
    case 1:
      return ["#FFFFFF"];

    case 2:
      return ["#112233", "#EEDDCC"];

    case 3:
      return ["#FF0000", "#00FF00", "#0000FF"];

    // case 7:
    //   return [
    //     "#e81416",
    //     "#ffa500",
    //     "#faeb36",
    //     "#79c314",
    //     "#487de7",
    //     "#4b369d",
    //     "#70369d",
    //   ];

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
    // throw new Error(`Illegal color count: ${count}`);
  }
};

export const getPosition = (
  altitude: number,
  spread: number,
  rotation: number,
  count: number,
  index: number
) => {
  return [
    spread * Math.cos((2 * Math.PI * index) / count + rotation),
    altitude,
    spread * Math.sin((2 * Math.PI * index) / count + rotation),
  ] as [number, number, number];
};

// function useLightValues() {
//   const [angle, setAngle] = useState(0.45);
//   const [meta, setMeta] = useControls("Lights", () => ({
//     spread: {
//       value: 0,
//       min: 0,
//       max: 30,
//       step: 1,
//     },
//     count: {
//       options: [0, 1, 3, 7],
//       value: 3,
//     },
//     showHelper: true,
//     angle: {
//       value: angle,
//       onChange: setAngle,
//     },
//     penumbra: 1,
//     // position: [meta.spread, 10, 0],
//     intensity: 100,
//     // color: "#FFF000",
//   }));

// const [lights, _setLights] = useControls("Lights", () => {
//   const values: Record<string, any> = {};
//   for (let i = 0; i < meta.count; i++) {
//     values[`Spot ${i}`] = folder({
//       [n(i, "showHelper")]: true,
//       [n(i, "angle")]: 0.4,
//       [n(i, "penumbra")]: 1,
//       [n(i, "position")]: [meta.spread, 10, 0] as [number, number, number],
//       [n(i, "intensity")]: 100,
//       [n(i, "color")]: getColors(meta.count)[i],
//     });
//   }
//   // Array(meta.count)
//   //   .fill(null)
//   //   .forEach((_, i) => {
//   //     values[`Spot ${i}`] = {
//   //       [n(i, "showHelper")]: true,
//   //       [n(i, "angle")]: 0.4,
//   //       [n(i, "penumbra")]: 1,
//   //       [n(i, "position")]: [meta.spread, 10, 0] as [number, number, number],
//   //       [n(i, "intensity")]: 100,
//   //       [n(i, "color")]: getColors(meta.count)[i],
//   //     };
//   //   });
//   return values;
//   // return {
//   //   "Spot 1": folder({
//   //     showHelper: true,
//   //     angle: 0.4,
//   //     penumbra: 1,
//   //     position: [meta.spread, 10, 0] as [number, number, number],
//   //     intensity: 100,
//   //     color: "#FFF000",
//   //   }),
//   //   "Spot 2": folder({
//   //     showHelper: true,
//   //     angle: 0.4,
//   //     penumbra: 1,
//   //     position: [0, 10, meta.spread] as [number, number, number],
//   //     intensity: 100,
//   //     color: "#000FFF",
//   //   }),
//   // };
// });

// console.log(lights);

//   return meta;
//   // return [
//   //   {
//   //     showHelper: true,
//   //     angle: 0.4,
//   //     penumbra: 1,
//   //     position: [meta.spread, 10, 0] as [number, number, number],
//   //     intensity: 100,
//   //     color: "#FFF000",
//   //   },
//   // ];
// }

// export function useSpotLight(meta: any) {
//   return {
//     showHelper: true,
//     angle: 0.4,
//     penumbra: 1,
//     position: [meta.spread, 10, 0] as [number, number, number],
//     intensity: 100,
//     color: "#FFF000",
//   };
// }
