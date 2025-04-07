import {
  XRHitTest,
  DefaultXRGaze,
  createXRStore,
  useXRInputSourceStateContext,
  XRSpace,
} from "@react-three/xr";
import { Matrix4 } from "three";

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

export const createCustomXrStore = () =>
  createXRStore({
    domOverlay: true,
    hitTest: true,
    anchors: true,
    layers: false,
    meshDetection: true,
    planeDetection: true,

    controller: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const state = useXRInputSourceStateContext();

      return (
        <>
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
