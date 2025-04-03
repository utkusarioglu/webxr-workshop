import { useXRHitTest } from "@react-three/xr";

import { Reticle } from "./Reticle";
import { onResults } from "../App";

const HitTestHandheld = () => {
  useXRHitTest(onResults.bind(null, "none"), "viewer");

  return <Reticle handedness="none" />;
};

export { HitTestHandheld };
