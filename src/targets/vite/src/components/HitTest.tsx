import { useXR } from "@react-three/xr";

import { HitTestHandheld } from "./HitTestHandheld";
import { HitTestHeadset } from "./HitTestHeadset";

export const HitTest = () => {
  const isHandheld = useXR(
    (xr) => xr.session?.interactionMode === "screen-space"
  );
  return isHandheld ? <HitTestHandheld /> : <HitTestHeadset />;
};
