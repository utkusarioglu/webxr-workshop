import { GizmoHelper, GizmoViewcube, GizmoViewport } from "@react-three/drei";
import { useControls } from "leva";
import { sceneConstants } from "../constants";

export const Helpers = () => {
  const helpers = useControls("Helpers", sceneConstants.helpers);

  return (
    <>
      {helpers.gizmo ? (
        <GizmoHelper>
          <GizmoViewcube />
          <GizmoViewport />
        </GizmoHelper>
      ) : null}
      {helpers.axes ? <axesHelper args={[10]} /> : null}
      {helpers.grid ? <gridHelper /> : null}
    </>
  );
};
