import { Html } from "@react-three/drei";
import { useScore } from "../../hooks/useScore";

export const Score = () => {
  const WIDTH = 200;
  const HEIGHT = 150;
  const musicSvg = useScore("/music/example.musicxml.yaml", {
    width: WIDTH,
    height: HEIGHT,
  });

  return (
    <mesh castShadow>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial />
      <Html
        center
        transform
        // occlude
        distanceFactor={5}
        style={{
          textAlign: "center",
          userSelect: "none",
        }}
      >
        <h1>Hi</h1>
        <h2>meow🐈</h2>
        <div style={{ height: 30 }} />
        <div
          style={{ width: WIDTH, height: HEIGHT }}
          dangerouslySetInnerHTML={{ __html: musicSvg }}
        />
      </Html>
    </mesh>
  );
};
