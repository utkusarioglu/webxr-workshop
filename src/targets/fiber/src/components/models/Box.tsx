import { useControls } from "leva";
import { useState } from "react";
import type { FC } from "react";
import { boxConstants } from "../../constants";
import type { ModelComponentProps } from "../BoxScene";

export const Box: FC<ModelComponentProps> = ({ ref, position, scale }) => {
  const [wireframe, setWireframe] = useState(false);
  const { color, dimensions } = useControls("Box", boxConstants);

  return (
    <mesh
      castShadow
      position={position}
      scale={scale}
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
