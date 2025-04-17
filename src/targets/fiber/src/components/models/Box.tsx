import { useControls } from "leva";
import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { boxConstants } from "../../constants";
import type { ModelComponentProps } from "../BoxScene";
import { PositionalAudio } from "@react-three/drei";
import type { PositionalAudio as PositionalAudioType } from "three";

export const Box: FC<ModelComponentProps> = ({ ref, position, scale }) => {
  const audioRef = useRef<PositionalAudioType>(null);
  const [wireframe, setWireframe] = useState(false);
  const { color, dimensions } = useControls("Box", boxConstants);

  // useEffect(() => {
  //   if (audioRef.current) {
  //     audioRef.current.play();
  //   }
  // }, []);

  const meshOnClick = () => {
    audioRef.current?.play();
  };

  return (
    <mesh
      onClick={meshOnClick}
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
      <PositionalAudio
        ref={audioRef}
        url="/amen.wav"
        distance={1}
        loop
        // autoplay={true}
      />
    </mesh>
  );
};
