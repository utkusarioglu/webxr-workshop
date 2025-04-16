import { useControls } from "leva";
import { FC } from "react";
// import { groundConstants } from "../constants";
// import { Grid } from "@react-three/drei";

const components: Record<string, FC> = {
  Circle: () => <circleGeometry args={[200, 100]} />,
  Square: () => <planeGeometry args={[1e4, 1e4]} />,
};

export const Plane = () => {
  const { altitude, shape } = useControls("Ground", {
    shape: {
      options: ["Square", "Circle"],
      value: "Circle",
    },
    altitude: {
      value: 3,
      min: 0,
      max: 10,
      steps: 0.1,
    },
  });

  // return (
  //   <Grid
  //     infiniteGrid
  //     sectionColor={"white"}
  //     sectionThickness={1.5}
  //     position={[0, -altitude, 0]}
  //     cellSize={0.5}
  //     cellThickness={0.6}
  //     fadeDistance={100}
  //   />
  // );

  const Component = components[shape];

  return (
    <mesh
      receiveShadow
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -altitude, 0]}
    >
      <Component />
      <meshStandardMaterial color="#FFFFFF" />
    </mesh>
  );
};
