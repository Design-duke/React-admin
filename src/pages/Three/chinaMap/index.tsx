import { useEffect, useRef } from "react";
import * as THREE from "three";
// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// @ts-ignore
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";
import * as d3 from "d3-geo";
import { GeoJSONData } from "./types/index";

/**
 * 3D中国地图组件
 * 使用Three.js和D3.js结合，渲染一个可交互的3D中国地图
 * 包含省份填充、轮廓线、光照、相机控制等功能
 */
const ChinaMap3D = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 添加场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // 创建透视相机
    const camera = new THREE.PerspectiveCamera(
      60, // 视野角度
      window.innerWidth / window.innerHeight, // 宽高比
      0.1, // 近裁剪面
      1000 // 远裁剪面
    );
    camera.position.set(0, 0, 4); // 相机位置：从下方略上方观察地图

    // 创建WebGL渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // 高清适配
    mount.appendChild(renderer.domElement); // 将渲染器的canvas添加到DOM

    // 添加轨道控制器，支持鼠标拖拽、缩放、旋转
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // 启用阻尼效果，让控制更平滑
    controls.addEventListener("change", () => {});

    // 添加平行光，模拟太阳光
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.copy(
      camera.position.clone().add(new THREE.Vector3(2, 2, 1))
    );
    scene.add(light);
    // 环境光，提供基础照明
    scene.add(new THREE.AmbientLight(0x404040));

    // 添加坐标轴辅助线（红-X, 绿-Y, 蓝-Z），用于调试空间位置
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // 地图投影设置
    // 使用D3的墨卡托投影，将经纬度转换为平面坐标
    const projection = d3
      .geoMercator()
      .center([105, 35]) // 中国地理中心
      .scale(80) // 缩放比例
      .translate([0, 0]); // 投影中心点

    // 创建CSS2D渲染器，用于添加标签
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(mount.clientWidth, mount.clientHeight);
    labelRenderer.domElement.style.position = "absolute";
    labelRenderer.domElement.style.top = "0px";
    labelRenderer.domElement.style.pointerEvents = "none";
    document.body.appendChild(labelRenderer.domElement);

    //  加载地图数据
    fetch(
      "https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=100000_full"
    )
      .then((res) => res.json())
      .then((data: GeoJSONData) => {
        console.log(data); // 调试用：查看地图数据结构

        // 遍历每个省份/行政区
        data.features.forEach((feature) => {
          const { name, center, adcode } = feature.properties;
          const { type, coordinates } = feature.geometry;

          // Polygon => [rings]；MultiPolygon => [[rings], [rings]...]
          const polygons = type === "Polygon" ? [coordinates] : coordinates;

          // 为每个省份创建一个 Group
          const provinceGroup = new THREE.Group();
          provinceGroup.name = name;

          polygons.forEach((rings) => {
            if (!rings.length) return;

            //  1. 创建一个 Shape（外轮廓）
            const shape = new THREE.Shape();
            const outer = rings[0];
            // lng是经度，lat是纬度
            (outer as [number, number][]).forEach(([lng, lat], i) => {
              const projected = projection([lng, lat]);
              if (projected) {
                const [x, y] = projected;
                if (i === 0) shape.moveTo(x, -y);
                else shape.lineTo(x, -y);
              }
            });

            //  2. 处理孔洞（holes）
            for (let j = 1; j < rings.length; j++) {
              const holeCoords = rings[j];
              const holePath = new THREE.Path();
              (holeCoords as [number, number][]).forEach(([lng, lat], k) => {
                const projected = projection([lng, lat]);
                if (projected) {
                  const [x, y] = projected;
                  if (k === 0) holePath.moveTo(x, -y);
                  else holePath.lineTo(x, -y);
                }
              });
              shape.holes.push(holePath);
            }

            //  3. 创建 Mesh
            const extrudeSettings: THREE.ExtrudeGeometryOptions = {
              depth: 4,
              bevelEnabled: false,
            };
            const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
            const material = new THREE.MeshPhongMaterial({ color: 0x4096ff });
            const mesh = new THREE.Mesh(geometry, material);

            mesh.scale.set(0.05, 0.05, 0.05);

            provinceGroup.add(mesh);

            //  4. 创建边界线
            const linePoints = (outer as [number, number][])
              .map(([lng, lat]) => {
                const projected = projection([lng, lat]);
                if (projected) {
                  const [x, y] = projected;
                  return new THREE.Vector3(x * 0.05, -y * 0.05, 0); // 底部
                }
                return undefined;
              })
              .filter(Boolean) as THREE.Vector3[];

            const lineGeometry = new THREE.BufferGeometry().setFromPoints(
              linePoints
            );

            // 创建边界线材料，使用稍微透明的颜色并开启透明度
            const lineMaterial = new THREE.LineBasicMaterial({
              color: 0xffffff, // 可以选择其他颜色
              transparent: true,
              opacity: 0.8,
              depthTest: true, // 确保深度测试开启
            });

            // 创建边界线几何体
            const line = new THREE.Line(lineGeometry, lineMaterial);
            line.position.z += 0.2;

            // 设置较高的renderOrder值，使得线条在渲染时位于大多数对象之上
            line.renderOrder = 2;

            provinceGroup.add(line); // 将边界线添加到省份组中
          });

          scene.add(provinceGroup);

          // 添加城市名称
          if (adcode === 100000 || !center) return;

          // 经纬度转坐标
          const [lng, lat] = center;
          const projected = projection([lng, lat]);
          if (projected) {
            const [x, y] = projected;
            const labelPos = new THREE.Vector3(x * 0.05, -y * 0.05, 0);

            // 创建 HTML 元素
            const div = document.createElement("div");
            div.className = "province-label";
            div.textContent = name;
            div.style.color = "white";
            div.style.fontSize = "12px";
            div.style.padding = "2px 4px";
            div.style.borderRadius = "4px";

            // 转换成 3D 标签对象
            const label = new CSS2DObject(div);
            label.position.copy(labelPos);
            scene.add(label);
          }
        });
      })
      .catch((err) => console.error("地图数据加载失败:", err));

    // 动画循环
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // 更新控制器
      renderer.render(scene, camera); // 渲染场景
      labelRenderer.render(scene, camera);
    };
    animate();

    // 清理函数
    return () => {
      // 组件卸载时清理资源
      mount.removeChild(renderer.domElement);
      renderer.dispose(); // 释放WebGL资源
      scene.clear(); // 清空场景

      // 移除所有动态创建的标签
      if (
        labelRenderer.domElement &&
        document.body.contains(labelRenderer.domElement)
      ) {
        document.body.removeChild(labelRenderer.domElement);
      }
      document.querySelectorAll(".province-label").forEach((el) => el.remove());
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "100vw", height: "100vh" }}
      className="relative h-full w-full overflow-hidden bg-[#000]"
    />
  );
};

export default ChinaMap3D;
