import { useEffect, useRef } from "react";
import * as THREE from "three";
// @ts-expect-error three类型错误
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

const Galaxy = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  class AxisGridHelper {
    grid: THREE.GridHelper;
    axes: THREE.AxesHelper;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _visible: any;
    constructor(node: THREE.Object3D<THREE.Object3DEventMap>, units = 10) {
      const axes = new THREE.AxesHelper();
      axes.material.depthTest = false;
      axes.renderOrder = 2; // 在网格渲染之后再渲染
      node.add(axes);

      const grid = new THREE.GridHelper(units, units);
      grid.material.depthTest = false;
      grid.renderOrder = 1;
      node.add(grid);

      this.grid = grid;
      this.axes = axes;
      this.visible = false;
    }
    get visible() {
      return this._visible;
    }
    set visible(v) {
      this._visible = v;
      this.grid.visible = v;
      this.axes.visible = v;
    }
  }

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

    // 添加坐标轴
    const axes = new THREE.AxesHelper(500);
    scene.add(axes);

    // 添加灯光
    const light = new THREE.PointLight(0xffffff, 500);
    scene.add(light);

    // 添加平行光
    // const light = new THREE.DirectionalLight(0xffffff, 0.5);
    // light.position.set(-1, 2, 4);
    // scene.add(light);

    // 添加物体
    // const geometry = new THREE.BoxGeometry(5, 5, 5);
    // const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    // 要更新旋转角度的对象数组
    const objects: THREE.Object3D<THREE.Object3DEventMap>[] = [];

    // 添加空场景 太阳系
    const solarSystem = new THREE.Object3D();
    scene.add(solarSystem);
    objects.push(solarSystem);
    // 一球多用
    const radius = 1;
    const widthSegments = 6;
    const heightSegments = 6;

    // 几何形状 定义物体的形状（顶点、面、法线等）。
    const sphereGeometry = new THREE.SphereGeometry(
      radius,
      widthSegments,
      heightSegments
    );

    // 定义外观  定义物体表面的颜色、纹理、光泽度、光照反应等。
    const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    sunMesh.scale.set(5, 5, 5);
    solarSystem.add(sunMesh);
    objects.push(sunMesh);

    // 添加空场景 地球轨道
    const earthOrbit = new THREE.Object3D();
    earthOrbit.position.x = 10;
    solarSystem.add(earthOrbit);
    objects.push(earthOrbit);

    // 添加地球
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0x2233ff,
      emissive: 0x112244,
    });
    const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
    earthOrbit.add(earthMesh);

    // 添加月球
    const moonOrbit = new THREE.Object3D();
    moonOrbit.position.x = 2;
    earthOrbit.add(moonOrbit);

    const moonMaterial = new THREE.MeshPhongMaterial({
      color: 0x888888,
      emissive: 0x222222,
    });
    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
    moonMesh.scale.set(0.5, 0.5, 0.5);
    moonOrbit.add(moonMesh);
    objects.push(moonMesh);

    const gui = new GUI();
    function makeAxisGrid(
      node: THREE.Object3D<THREE.Object3DEventMap>,
      label: string,
      units?: number
    ) {
      const helper = new AxisGridHelper(node, units);
      gui.add(helper, "visible").name(label);
    }

    makeAxisGrid(solarSystem, "solarSystem", 25);
    makeAxisGrid(sunMesh, "sunMesh");
    makeAxisGrid(earthOrbit, "earthOrbit");
    makeAxisGrid(earthMesh, "earthMesh");
    makeAxisGrid(moonOrbit, "moonOrbit");
    makeAxisGrid(moonMesh, "moonMesh");

    const animate = (time: number) => {
      time *= 0.0005;
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
      camera.updateProjectionMatrix();
      objects.forEach((obj) => {
        obj.rotation.y = time;
      });
    };
    animate(1);

    // 处理窗口大小变化 ---
    const handleResize = () => {
      // 更新相机
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      controls.dispose();
      scene.clear();
      gui.destroy();
      window.removeEventListener("resize", handleResize);
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

export default Galaxy;
