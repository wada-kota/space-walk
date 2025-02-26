import { useRef, useEffect } from "react";

import * as THREE from "three";

import * as styles from "./index.styles";

export const SpaceBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // シーン、カメラ、レンダラーをセットアップ
    const scene = new THREE.Scene();

    // 黒背景を設定
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    camera.position.z = 5;

    // アニメーションループ
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // ウィンドウ変更時にサイズを維持する処理
    const onWindowResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // カメラのアスペクト比を更新
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      // レンダラーのサイズを更新
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", onWindowResize);

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} css={styles.base} />;
};
