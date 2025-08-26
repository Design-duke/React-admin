import * as THREE from "three";

export const addMarkers = ({
  scene,
  projection,
  markers,
}: {
  scene: THREE.Scene;
  projection: any;
  markers: any[];
}) => {
  markers.forEach((item) => {
    const projected = projection(item.coords);
    if (projected) {
      const [x, y] = projected;

      // 创建一个简单的几何体作为标记
      const geometry = new THREE.SphereGeometry(0.05, 32, 32); // 球体
      const material = new THREE.MeshBasicMaterial({ color: item.color });
      const sphere = new THREE.Mesh(geometry, material);

      // 设置位置
      sphere.position.set(x * 0.05, -y * 0.05, 0.1); // 提升一点高度避免被其他物体遮挡

      scene.add(sphere);
    }
  });
};
