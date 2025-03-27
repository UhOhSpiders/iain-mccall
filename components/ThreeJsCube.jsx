"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import * as CANNON from "cannon-es";

export default function ThreeJsCube() {
  const mountRef = useRef(null);
  const [selectedBody, setSelectedBody] = useState(null);
  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  let jointBody, jointConstraint;

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    camera.position.y = 2;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0x404040, 20);
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xff00dd, 5);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    const world = new CANNON.World();
    world.gravity.set(0, -9.82, 0);

    const floorSize = 50;
    const floorGeometry = new THREE.PlaneGeometry(floorSize, floorSize);
    const floorMaterial = new THREE.MeshPhongMaterial({
      visible: false,
      side: THREE.DoubleSide,
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    const floorShape = new CANNON.Box(
      new CANNON.Vec3(floorSize / 2, 0.1, floorSize / 2)
    );
    const floorBody = new CANNON.Body({
      mass: 0,
      shape: floorShape,
      position: new CANNON.Vec3(0, -1, 0),
    });
    world.addBody(floorBody);

    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    const cubeColors = [
      "#4B0082",
      "#300060",
      "#8b0078",
      "#191970",
      "#320060",
    ];
    const createRandomCube = (position) => {
      let dimensions = {
        x: getRandomInt(5) + 1,
        y: getRandomInt(5) + 1,
        z: getRandomInt(5) + 1,
      };
      let color = cubeColors[getRandomInt(cubeColors.length)];
      const geometry = new THREE.BoxGeometry(
        dimensions.x,
        dimensions.y,
        dimensions.z
      );
      const material = new THREE.MeshPhongMaterial({ color });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(position);
      mesh.rotateX(getRandomInt(180))
      scene.add(mesh);

      const shape = new CANNON.Box(
        new CANNON.Vec3(dimensions.x / 2, dimensions.y / 2, dimensions.z / 2)
      );
      const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(position.x, position.y, position.z),
        shape,
      });
      body.quaternion.set(mesh.quaternion.x,mesh.quaternion.y,mesh.quaternion.z,mesh.quaternion.w)
      world.addBody(body);

      return { mesh, body };
    };

    const cubes = [
      createRandomCube(new THREE.Vector3(0, 8, 0)),
      createRandomCube(new THREE.Vector3(1.5, 9, 0)),
      createRandomCube(new THREE.Vector3(-1.5, 10, 0)),
    ];

    jointBody = new CANNON.Body({ mass: 0 });
    world.addBody(jointBody);

    const onMouseDown = (event) => {
      console.log("nav clicked")
      cubes.push(createRandomCube(new THREE.Vector3(getRandomInt(4), 15, getRandomInt(7)-5)));
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cubes.map((c) => c.mesh));

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object;
        const clickedCube = cubes.find((c) => c.mesh === clickedMesh);
        if (clickedCube) {
          setSelectedBody(clickedCube.body);
          addMouseConstraint(intersects[0].point, clickedCube.body);
        }
      }
    };

    // Create a joint constraint when clicking a cube
    const addMouseConstraint = (point, body) => {
      // Convert clicked point to local body position
      const pivot = new CANNON.Vec3(
        point.x - body.position.x,
        point.y - body.position.y,
        point.z - body.position.z
      );

      // Create a constraint between the joint body and the clicked body
      jointConstraint = new CANNON.PointToPointConstraint(
        jointBody,
        new CANNON.Vec3(0, 0, 0),
        body,
        pivot
      );
      world.addConstraint(jointConstraint);
    };

    // Update joint position as mouse moves
    const onMouseMove = (event) => {
      if (jointConstraint) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        const intersection = new THREE.Vector3();

        if (raycaster.ray.intersectPlane(plane, intersection)) {
          jointBody.position.set(
            intersection.x,
            intersection.y,
            intersection.z
          );
        }
      }
    };

    // Remove joint on mouse up
    const onMouseUp = () => {
      if (jointConstraint) {
        world.removeConstraint(jointConstraint);
        jointConstraint = null;
        setSelectedBody(null);
      }
    };

    // Animation loop
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const deltaTime = clock.getDelta();
      world.step(1 / 60, deltaTime);

      cubes.forEach(({ mesh, body }) => {
        mesh.position.copy(body.position);
        mesh.quaternion.copy(body.quaternion);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Event listeners
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("resize", handleResize);

    function handleResize() {
      camera.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
    }

    // Cleanup
    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", handleResize);

      cubes.forEach(({ mesh, body }) => {
        scene.remove(mesh);
        world.removeBody(body);
        mesh.geometry.dispose();
        mesh.material.dispose();
      });

      scene.remove(floor);
      world.removeBody(floorBody);
      floorGeometry.dispose();
      floorMaterial.dispose();

      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
