import { useEffect, useRef } from "react";
import type { AmbientLight } from "three";

export const SkydomeLight = () => {
  const ref = useRef<AmbientLight>(null);

  useEffect(() => {
    ref.current?.layers.set(1);
  }, []);

  return (
    <ambientLight
      ref={ref}
      layers={[1]}
      intensity={0.5}
    />
  );
};
