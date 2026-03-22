"use client";

import * as THREE from 'three'
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, PivotControls } from "@react-three/drei";
import { useControls, folder } from "leva";
import FlightHelmet from "@/components/FlightHelmet";
import Light from "@/components/Light";
import { useState } from 'react';

export default function Home() {
  const [isDragging, setIsDragging] = useState(false);

  const { mode, exposure, scale, enabled, files } = useControls({
    toneMapping: folder({
      mode: {
        value: THREE.ReinhardToneMapping as THREE.ToneMapping,
        options: {
          None: THREE.NoToneMapping,
          Linear: THREE.LinearToneMapping, // Default
          Reinhard: THREE.ReinhardToneMapping,
          Cineon: THREE.CineonToneMapping,
          ACESFilmic: THREE.ACESFilmicToneMapping,
        },
      },
      exposure: {
        value: 3,
        min: 0,
        max: 10,
      },
    }),
    pivotControls: folder({
      enabled: {
        value: false,
      },
      scale: {
        value: 0.6,
        min: 0,
        max: 1,
        step: 0.1,
      },
    }),
    environment: folder({
      files: {
        value: "environmentMaps/Deathstar_Hanger_4k.hdr",
        options: {
          "Crashed Star Destroyer": "environmentMaps/CrashedStarDestroyer_4k.hdr",
          "Death Star Hangar": "environmentMaps/Deathstar_Hanger_4k.hdr",
          "Death Star Tractor Beam": "environmentMaps/DeathStar_TractorBeam_4k.hdr",
          "Jabba's Throne Room": "environmentMaps/JabbaTHroneRoom_4k.hdr",
          "Maz's Castle": "environmentMaps/MazCastle_4k.hdr",
          "Mos Eisley Cantina": "environmentMaps/MosEisleyCanteen_4k.hdr",
          "Rebel Base": "environmentMaps/RebelBase_4k.hdr",
        },
      },
    }),
  });

  return (
    <div className="h-screen w-full">
      <Canvas
        shadows
        camera={{ position: [0, 0.25, 0.75], near: 0.1, far: 1000 }}
        gl={{ toneMapping: mode, toneMappingExposure: exposure }}
      >
        <OrbitControls enabled={!isDragging} />
        <Environment files={files} background />
        <Light />
        <PivotControls enabled={enabled} scale={scale} onDragStart={() => setIsDragging(true)} onDragEnd={() => setIsDragging(false)}>
          <FlightHelmet />
        </PivotControls>
      </Canvas>
    </div>
  );
}
