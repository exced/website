import React from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { AnaglyphEffect } from 'three/examples/jsm/effects/AnaglyphEffect';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useThemeContext from '@theme/hooks/useThemeContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

function Scene() {
  const { isDarkTheme } = useThemeContext();
  const ref = React.useRef();
  const [scene, setScene] = React.useState();
  const [nameTextureLight, setNameTextureLight] = React.useState();
  const [nameTextureDark, setNameTextureDark] = React.useState();
  const [nameMaterial, setNameMaterial] = React.useState();
  const [glitchPass, setGlitchPass] = React.useState();

  // Scene
  React.useEffect(() => {
    let camera, scene, renderer, composer;
    let object, light;

    let glitchPass;

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight - 220);
      composer.setSize(window.innerWidth, window.innerHeight - 220);
    }

    function init() {
      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight - 220);
      // renderer.setClearColor(0x1e2125);
      ref.current.appendChild(renderer.domElement);

      camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      camera.position.z = 400;

      scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x000000, 1, 1000);
      scene.background = new THREE.Color(0x1e2125);

      object = new THREE.Object3D();
      scene.add(object);

      // load name textures
      const loader = new THREE.TextureLoader();
      const _nameTextureLight = loader.load('/img/profile/name_light.png');
      const _nameTextureDark = loader.load('/img/profile/name_dark.png');
      setNameTextureLight(_nameTextureLight);
      setNameTextureDark(_nameTextureDark);
      const _nameMaterial = new THREE.MeshBasicMaterial({
        map: isDarkTheme ? _nameTextureDark : _nameTextureLight,
        transparent: true,
      });
      setNameMaterial(_nameMaterial);
      const nameGeometry = new THREE.PlaneGeometry(300, 140);
      const nameMesh = new THREE.Mesh(nameGeometry, _nameMaterial);
      nameMesh.position.set(0, 0, 0);
      scene.add(nameMesh);

      // postprocessing

      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));

      glitchPass = new GlitchPass();
      setGlitchPass(glitchPass);
      composer.addPass(glitchPass);
    }

    function animate() {
      requestAnimationFrame(animate);

      object.rotation.x += 0.005;
      object.rotation.y += 0.01;

      composer.render();
    }

    if (ref.current) {
      init();
      animate();
      setScene(scene);
      window.addEventListener('resize', onWindowResize, false);
    }

    return () => {
      if (ref.current) {
        window.removeEventListener('resize', onWindowResize, false);
      }
    };
  }, [ref]);

  // Light/Dark mode
  React.useEffect(() => {
    if (scene) {
      scene.background = new THREE.Color(isDarkTheme ? 0x1e2125 : 0xffffff);
    }
    if (nameMaterial && nameTextureLight && nameTextureDark) {
      if (isDarkTheme) {
        nameMaterial.map = nameTextureDark;
        nameTextureLight.dispose();
      } else {
        nameMaterial.map = nameTextureLight;
        nameTextureDark.dispose();
      }
    }
  }, [scene, isDarkTheme]);

  function goWild() {
    if (glitchPass) {
      glitchPass.goWild = true;
    }
  }

  function goCalm() {
    if (glitchPass) {
      glitchPass.goWild = false;
    }
  }

  return (
    <div
      style={{ marginBottom: '-10px' }}
      ref={ref}
      onTouchStart={goWild}
      onTouchEnd={goCalm}
      onMouseDown={goWild}
      onMouseUp={goCalm}
    />
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  return (
    <Layout
      title={siteConfig.title}
      description="Thomas Barras personal website"
    >
      <Scene />
    </Layout>
  );
}

export default Home;
