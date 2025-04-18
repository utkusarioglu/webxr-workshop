import { Canvas } from "@react-three/fiber";
// import { SoftShadows } from "@react-three/drei";
import "./App.css";
import { BoxScene } from "./components/BoxScene";
import { Leva } from "leva";
import * as THREE from "three";
// import { useScore } from "./hooks/useScore";

// const MUSIC_LIST = ["3-notes", "bach", "test", "debussy", "aa"];

// function App_() {
//   const music = useScore(`/music/${MUSIC_LIST[0]}.musicxml`);
//   return (
//     <div
//       className="aa"
//       dangerouslySetInnerHTML={{ __html: music }}
//     />
//   );
// }

function App() {
  return (
    <>
      <Leva
        collapsed
        flat
      />
      <Canvas
        camera={{ position: [0, 7, 7] }}
        shadows
        // gl={{ alpha: false, antialias: true }}
        gl={{
          antialias: true,
          shadowMapEnabled: true,
          shadowMapType: THREE.PCFSoftShadowMap,
        }}
        // dpr={[1, 2]} // optional: allows high DPI rendering
        // gl={{ physicallyCorrectLights: true }}
        // onCreated={({ gl }) => {
        //   gl.shadowMap.enabled = true;
        //   gl.shadowMap.type = THREE.PCFSoftShadowMap; // or THREE.VSMShadowMap or THREE.PCFShadowMap
        // }}
      >
        {/* <SoftShadows
          size={20}
          samples={16}
          focus={0.5}
        /> */}
        <BoxScene />
      </Canvas>
    </>
  );
}

export default App;
