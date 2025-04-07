import type { FC, RefObject } from "react";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import { Mesh, Object3D, Object3DEventMap, SpotLightHelper } from "three";
import {
  OrbitControls,
  GizmoHelper,
  GizmoViewport,
  GizmoViewcube,
  useHelper,
  SpotLight,
} from "@react-three/drei";
import { folder, useControls } from "leva";

interface BlueBoxProps {
  ref: RefObject<Mesh | null>;
}

const BlueBox: FC<BlueBoxProps> = ({ ref }) => {
  const [wireframe, setWireframe] = useState(false);
  const { color } = useControls("Box", { color: "#e24f4f" });
  return (
    <mesh
      ref={ref}
      onDoubleClick={() => setWireframe((s) => !s)}
    >
      <boxGeometry args={[2, 3, 4]} />
      <meshPhongMaterial
        color={color}
        wireframe={wireframe}
      />
    </mesh>
  );
};

// const speed = 0.005;

const boxSceneControlsInitial = {
  box: {
    speedX: {
      value: 0,
      max: 1,
      min: 0,
      step: 1e-3,
    },
    speedY: {
      value: 0,
      max: 1,
      min: 0,
      step: 1e-3,
    },
    speedZ: {
      value: 1e-2,
      max: 1,
      min: 0,
      step: 1e-3,
    },
  },
  helpers: {
    grid: false,
    gizmo: true,
    axes: false,
  },
  light: {
    spot: {
      spotHelper: false,
      spotConeAngle: Math.PI / 9,
      spotPenumbra: {
        value: 1,
        min: 0,
        max: 1,
        step: 0.1,
      },
      spotPosition: {
        value: {
          x: 1,
          y: 5,
          z: 4,
        },
      },
      spotIntensity: {
        value: 100,
        min: 0,
        max: 100,
      },
      spotColor: "#FFFFFF",
    },
    ambient: {
      ambientIntensity: {
        value: 0.2,
        min: 0,
        max: 1,
        step: 1e-2,
      },
      ambientColor: "#FFFFFF",
    },
  },
};

type SpotWithHelperProps = Parameters<typeof SpotLight>[0];

const SpotWithHelper: FC<SpotWithHelperProps> = (props) => {
  const spotRef = useRef<Object3D<Object3DEventMap>>(null);
  // @ts-expect-error ref type null issue
  const helper = useHelper(spotRef, SpotLightHelper, "red");
  return (
    <spotLight
      ref={spotRef}
      {...props}
      // penumbra={light.spotPenumbra}
      // angle={light.spotConeAngle}
      // intensity={light.spotIntensity}
      // color={light.spotColor}
      // position={[
      //   light.spotPosition.x,
      //   light.spotPosition.y,
      //   light.spotPosition.z,
      // ]}
    />
  );
};

const Lights = () => {
  const light = useControls("Light", {
    Spot: folder(boxSceneControlsInitial.light.spot),
    Ambient: folder(boxSceneControlsInitial.light.ambient),
  });

  return (
    <>
      <ambientLight
        color={light.ambientColor}
        intensity={light.ambientIntensity}
      />
      {light.spotHelper ? (
        <SpotWithHelper
          penumbra={light.spotPenumbra}
          angle={light.spotConeAngle}
          intensity={light.spotIntensity}
          color={light.spotColor}
          position={[
            light.spotPosition.x,
            light.spotPosition.y,
            light.spotPosition.z,
          ]}
        />
      ) : (
        <spotLight
          penumbra={light.spotPenumbra}
          angle={light.spotConeAngle}
          intensity={light.spotIntensity}
          color={light.spotColor}
          position={[
            light.spotPosition.x,
            light.spotPosition.y,
            light.spotPosition.z,
          ]}
        />
      )}
    </>
  );
};

const BoxScene = () => {
  const boxRef = useRef<Mesh>(null);
  const box = useControls("Box", boxSceneControlsInitial.box);
  const helpers = useControls("Helpers", boxSceneControlsInitial.helpers);

  useFrame(() => {
    if (boxRef.current) {
      boxRef.current.rotation.x += box.speedX;
      boxRef.current.rotation.y += box.speedY;
      boxRef.current.rotation.z += box.speedZ;
    }
  });

  return (
    <>
      <BlueBox ref={boxRef} />

      {helpers.gizmo ? (
        <GizmoHelper>
          <GizmoViewcube />
          <GizmoViewport />
        </GizmoHelper>
      ) : null}
      {helpers.axes ? <axesHelper args={[10]} /> : null}
      {helpers.grid ? <gridHelper /> : null}

      <OrbitControls />
      <Lights />
    </>
  );
};

function App() {
  return (
    <Canvas camera={{ position: [5, 5, 5] }}>
      <BoxScene />
    </Canvas>
  );
}

export default App;
