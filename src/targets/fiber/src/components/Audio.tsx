import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { AudioLoader, Audio, AudioListener } from "three";

export const AudioComponent = () => {
  const { camera } = useThree();

  useEffect(() => {
    const listener = new AudioListener();
    camera.add(listener);
    const sound = new Audio(listener);
    const audioLoader = new AudioLoader();
    audioLoader.load("/amen.wav", (buffer) => {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.3);

      const handleClick = () => {
        sound.play();
      };
      window.addEventListener("click", handleClick);
    });
  }, []);

  return null;
};
