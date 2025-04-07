import { useControls } from "leva";
import { groundConstants } from "../constants";
// import { Grid } from "@react-three/drei";

export const Plane = () => {
  const { altitude } = useControls("Ground", groundConstants);

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

  return (
    <mesh
      receiveShadow
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -altitude, 0]}
    >
      <planeGeometry args={[1e4, 1e4]} />
      <meshStandardMaterial color="#FFFFFF" />
    </mesh>
  );
};
