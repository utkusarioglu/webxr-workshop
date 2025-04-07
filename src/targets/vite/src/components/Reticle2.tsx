import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useXR } from "@react-three/xr";

function Reticle() {
  const reticleRef = useRef();
  const textRef = useRef();
  const [height, setHeight] = useState(0);

  const { player } = useXR(); // Get user position in WebXR

  useFrame(() => {
    if (reticleRef.current) {
      // Position reticle 2m in front of user
      reticleRef.current.position
        .set(0, 0, -2)
        .applyMatrix4(player.matrixWorld);

      // Get height from ground (Y position)
      const reticleHeight = reticleRef.current.position.y;
      setHeight(reticleHeight.toFixed(2));

      // Update text texture
      updateTextTexture(textRef.current, reticleHeight.toFixed(2));
    }
  });

  return (
    <group>
      {/* Reticle Circle */}
      <mesh ref={reticleRef}>
        <ringGeometry args={[0.01, 0.02, 32]} />
        <meshBasicMaterial color="white" />
      </mesh>

      {/* Height Display (Using CanvasTexture) */}
      <mesh
        position={[0, 0.1, -2]}
        ref={textRef}
      >
        <planeGeometry args={[0.2, 0.05]} />
        <meshBasicMaterial transparent />
      </mesh>
    </group>
  );
}

// Function to create & update text texture
function updateTextTexture(mesh, text) {
  if (!mesh) return;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 256;
  canvas.height = 64;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.font = "bold 32px Arial";
  ctx.textAlign = "center";
  ctx.fillText(`${text}m`, canvas.width / 2, canvas.height / 2 + 10);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  mesh.material.map = texture;
  mesh.material.needsUpdate = true;
}
