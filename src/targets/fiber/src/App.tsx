import { Canvas } from "@react-three/fiber";
import "./App.css";
import { BoxScene } from "./components/BoxScene";
import { Leva } from "leva";

function App() {
  return (
    <>
      <Leva
        collapsed
        flat
      />
      <Canvas
        camera={{ position: [7, 7, 7] }}
        shadows
      >
        <BoxScene />
      </Canvas>
    </>
  );
}

export default App;
