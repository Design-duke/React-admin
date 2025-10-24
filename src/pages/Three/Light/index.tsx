import { useEffect, useRef } from "react";
import * as THREE from "three";
// @ts-expect-error three类型错误
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";

const Light = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    // 添加场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // 添加相机
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 50, 0);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);

    // 添加渲染器
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    // 添加控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.addEventListener("change", () => {});

    const gui = new GUI();

    // 添加辅助轴
    {
      const planeSize = 60;
      const loader = new THREE.TextureLoader();
      const texture = loader.load(
        "https://threejs.org/manual/examples/resources/images/checker.png"
      );
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.magFilter = THREE.NearestFilter;
      texture.colorSpace = THREE.SRGBColorSpace;
      const repeats = planeSize / 2;
      texture.repeat.set(repeats, repeats);

      const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
      const planeMat = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(planeGeo, planeMat);
      mesh.rotation.x = Math.PI * -0.5;
      scene.add(mesh);
    }

    // 添加正方体
    {
      const cubeSize = 10;
      // 加载纹理
      const textureLoader = new THREE.TextureLoader();
      const textures = [
        textureLoader.load("http://gips2.baidu.com/it/u=2687682002,935161719&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024"),
        textureLoader.load("http://gips1.baidu.com/it/u=1746086795,2510875842&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024"),
        textureLoader.load("http://gips3.baidu.com/it/u=3419425165,837936650&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024"),
        textureLoader.load("http://gips2.baidu.com/it/u=3944689179,983354166&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024"),
        textureLoader.load("http://gips1.baidu.com/it/u=2205169440,1005663887&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024"),
        textureLoader.load("http://gips2.baidu.com/it/u=4231193786,3187314859&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024"),
      ];
      const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      const materials = textures.map(texture => new THREE.MeshBasicMaterial({ map: texture }));
      const mesh = new THREE.Mesh(cubeGeo, materials);
      mesh.position.set(cubeSize + 1, 20, 0);
      scene.add(mesh);
    }

    // 添加球体
    {
      const sphereRadius = 3;
      const sphereWidthDivisions = 32;
      const sphereHeightDivisions = 16;
      const sphereGeo = new THREE.SphereGeometry(
        sphereRadius,
        sphereWidthDivisions,
        sphereHeightDivisions
      );
      const sphereMat = new THREE.MeshPhongMaterial({ color: "#CA8" });
      const mesh = new THREE.Mesh(sphereGeo, sphereMat);
      mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
      scene.add(mesh);
    }

    class ColorGUIHelper<T, K extends keyof T> {
      object: T;
      prop: K;
      constructor(object: T, prop: K) {
        this.object = object;
        this.prop = prop;
      }
      get value() {
        const propValue = this.object[this.prop];
        if (propValue instanceof THREE.Color) {
          return `#${propValue.getHexString()}`;
        }
        return "";
      }

      set value(hexString: string) {
        const propValue = this.object[this.prop];
        if (propValue instanceof THREE.Color) {
          propValue.set(hexString);
        }
      }
    }

    // 添加点光源
    {
      const color = 0xffffff;
      const intensity = 1;
      const light = new THREE.AmbientLight(color, intensity);
      scene.add(light);
      gui.addColor(new ColorGUIHelper(light, "color"), "value").name("color");
      gui.add(light, "intensity", 0, 5, 0.01);
    }

    // 添加平行光
    function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }

      return needResize;
    }

    function render() {
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
    return () => {
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      controls.dispose();
      scene.clear();
      gui.destroy();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    ></div>
  );
};

export default Light;
