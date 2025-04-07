import { useControls } from "leva";
import { type RefObject, type FC, useState } from "react";
import { Mesh } from "three";
import { boxConstants } from "../constants";

interface BoxProps {
  ref: RefObject<Mesh | null>;
}

export const Box: FC<BoxProps> = ({ ref }) => {
  const [wireframe, setWireframe] = useState(false);
  const { color, dimensions } = useControls("Box", boxConstants);

  return (
    <mesh
      castShadow
      ref={ref}
      onDoubleClick={() => setWireframe((s) => !s)}
    >
      <boxGeometry args={[dimensions.x, dimensions.y, dimensions.z]} />
      <meshPhongMaterial
        color={color}
        wireframe={wireframe}
      />
    </mesh>
  );
};
