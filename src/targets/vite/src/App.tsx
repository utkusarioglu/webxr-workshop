import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { IfInSessionMode, XR, XRDomOverlay } from "@react-three/xr";
import { ModelSelector } from "./components/ComponentSelector";
import { Items } from "./components/Items";
import { HitTest } from "./components/HitTest";
import { models } from "./components/models";
// import { Reticle } from "./components/Reticle";
import { createCustomXrStore } from "./xr-store";

const xrStore = createCustomXrStore();

export function App() {
  const [modelIndex, setModelIndex] = useState(0);

  const Component = models[modelIndex].component;

  return (
    <>
      <ModelSelector
        onChange={(e) => setModelIndex(e.target.selectedIndex)}
        index={modelIndex}
      />
      <button onClick={() => xrStore.enterAR()}>Enter AR</button>

      <Canvas>
        <XR store={xrStore}>
          {/* <directionalLight position={[1, 2, 1]} /> */}
          <ambientLight />

          <IfInSessionMode allow={"immersive-ar"}>
            <HitTest />
            <Items Component={Component} />

            <XRDomOverlay>
              <button
                onClick={() => setModelIndex((i) => (i + 1) % models.length)}
              >
                Next
              </button>
              {/* <ModelSelector
                onChange={(e) => setModelIndex(e.target.selectedIndex)}
                index={modelIndex}
              /> */}
              <button onClick={() => xrStore.getState().session?.end()}>
                Exit AR
              </button>
            </XRDomOverlay>
          </IfInSessionMode>

          <IfInSessionMode deny={"immersive-ar"}>
            <Suspense fallback={null}>
              <Component scale={2} />
            </Suspense>
          </IfInSessionMode>
        </XR>
      </Canvas>
    </>
  );
}
