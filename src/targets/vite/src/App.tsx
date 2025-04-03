import {
  Canvas,
  // useThree
} from "@react-three/fiber";
import { SelectHTMLAttributes, Suspense, useState } from "react";

import {
  createXRStore,
  DefaultXRController,
  DefaultXRGaze,
  // DefaultXRHand,
  IfInSessionMode,
  useXRInputSourceStateContext,
  XR,
  XRDomOverlay,
  XRHitTest,
  XRSpace,
} from "@react-three/xr";
// import * as THREE from "three";
import { Items } from "./components/Items";
import { HitTest } from "./components/HitTest";
import { Matrix4 } from "three";
import { Duck } from "./components/models/Duck";
import { House } from "./components/models/House";
import { Corrigan } from "./components/models/Corrigan";

export let hitTestMatrices: Partial<Record<XRHandedness, Matrix4 | undefined>> =
  {};

export function onResults(
  handedness: XRHandedness,
  results: Array<XRHitTestResult>,
  getWorldMatrix: (target: Matrix4, hit: XRHitTestResult) => void
) {
  if (results && results.length > 0 && results[0]) {
    hitTestMatrices[handedness] ??= new Matrix4();
    getWorldMatrix(hitTestMatrices[handedness], results[0]);
  }
}

// const XRScreenController = () => {
//   const { gl, scene, camera } = useThree();

//   useEffect(() => {
//     const onTouch = (event: TouchEvent) => {
//       event.preventDefault();
//       const raycaster = new THREE.Raycaster();
//       const touch = event.touches[0];

//       const x = (touch.clientX / window.innerWidth) * 2 - 1;
//       const y = -(touch.clientY / window.innerHeight) * 2 + 1;
//       const coords = new THREE.Vector2(x, y);

//       raycaster.setFromCamera(coords, camera);
//       const intersects = raycaster.intersectObjects(scene.children);

//       if (intersects.length) {
//         console.log("Tapped object:", intersects[0].object);
//       }
//     };

//     window.addEventListener("touchstart", onTouch);
//     return () => window.removeEventListener("touchstart", onTouch);
//   }, [scene, camera]);

//   return null;
// };

const xrStore = createXRStore({
  domOverlay: true,
  hitTest: true,
  anchors: true,
  layers: false,
  meshDetection: true,
  planeDetection: true,

  // hand: () => {
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   const state = useXRInputSourceStateContext();

  //   return (
  //     <>
  //       <DefaultXRHand />
  //       <XRSpace space={state.inputSource.targetRaySpace}>
  //         <XRHitTest
  //           onResults={onResults.bind(null, state.inputSource.handedness)}
  //         />
  //       </XRSpace>
  //     </>
  //   );
  // },

  controller: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const state = useXRInputSourceStateContext();

    // const isMobile = state.inputSource.targetRayMode === "screen";

    // if (isMobile) {
    //   return <XRScreenController />;
    // }

    return (
      <>
        <DefaultXRController />
        <DefaultXRGaze />
        <XRSpace space={state.inputSource.targetRaySpace}>
          <XRHitTest
            onResults={onResults.bind(null, state.inputSource.handedness)}
          />
        </XRSpace>
      </>
    );
  },
});

const options = [
  {
    name: "House",
    component: House,
  },
  {
    name: "Duck",
    component: Duck,
  },
  {
    name: "Corrigan",
    component: Corrigan,
  },
];

export function App() {
  const [componentIndex, setComponentIndex] = useState(0);

  const selectOnChange: SelectHTMLAttributes<HTMLSelectElement>["onChange"] = (
    e
  ) => {
    setComponentIndex(e.target.selectedIndex);
    console.log(e);
    console.log(e.target.value);
    console.log(e.target.selectedIndex);
  };

  const Component = options[componentIndex].component;

  return (
    <>
      <select
        onChange={selectOnChange}
        value={componentIndex}
      >
        {options.map(({ name }, i) => (
          <option
            key={i}
            value={i}
          >
            {name}
          </option>
        ))}
      </select>
      <button onClick={() => xrStore.enterAR()}>Enter AR</button>

      <Canvas>
        <XR store={xrStore}>
          <directionalLight position={[1, 2, 1]} />
          <ambientLight />

          <IfInSessionMode allow={"immersive-ar"}>
            <HitTest />
            <Items Component={Component} />

            <XRDomOverlay>
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
