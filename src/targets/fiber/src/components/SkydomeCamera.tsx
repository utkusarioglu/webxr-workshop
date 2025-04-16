import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export const SkydomeCamera = () => {
  const { camera } = useThree();

  useEffect(() => {
    camera.layers.enable(1);
  }, [camera]);

  return null;
};
