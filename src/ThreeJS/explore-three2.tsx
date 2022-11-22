import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

export function ExploreThree2() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 创建坐标轴
    const axes = new THREE.AxesHelper(500)
    // 创建场景
    const scene = new THREE.Scene()

    // 创建物体
    const geometry = new THREE.SphereGeometry(30, 100, 100)
    const geometry2 = new THREE.SphereGeometry(30, 100, 100)
    // 创建材质
    const material = new THREE.MeshLambertMaterial({ color: 0x0000ff })
    // 创建mesh
    const model = new THREE.Mesh(geometry, material)
    const model2 = new THREE.Mesh(geometry2, material)
    model.translateX(30)
    model.translateY(30)
    model.translateZ(30)

    model2.translateX(100);
    model2.translateY(100);
    model2.translateZ(30);

    // 环境光
    const ambientLight = new THREE.AmbientLight(0x444444)
    // 点光源
    const pointLight = new THREE.PointLight(0xffffff)
    pointLight.position.set(100, 200, 500)

    // 将坐标轴添加进场景
    scene.add(axes)
    // 将mesh添加到场景
    scene.add(model)
    scene.add(model2)
    // 将环境光添加到场景
    scene.add(ambientLight)
    // 将点光源添加到场景
    scene.add(pointLight)

    var width = window.innerWidth //窗口宽度
    var height = window.innerHeight
    var k = width / height //窗口宽高比
    var s = 200

    // 投影相机
    const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
    // 设置相机位置
    camera.position.set(200, 300, 200)
    // 设置相机方向(指向的场景对象)
    camera.lookAt(scene.position)

    // 渲染器拍摄
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(width, height)
    renderer.setClearColor(0xb9d3ff, 1)

    renderer.render(scene, camera)

    // 添加轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.addEventListener("change", () => renderer.render(scene, camera))

    ref?.current?.appendChild(renderer.domElement)
  }, [])

  return <div className="hello-three" ref={ref}></div>
}
