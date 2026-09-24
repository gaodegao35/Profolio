"use client";
import { useEffect, useRef, useState } from "react";
import { Brain, Ear, Hand, Heart } from "lucide-react";
import type { ProjectId } from "@/lib/projects";
const hotspots = [
  { id: "brain" as const, label: "A mind for clarity", icon: Brain },
  { id: "ears" as const, label: "Listening beyond words", icon: Ear },
  { id: "heart" as const, label: "A heart for learning", icon: Heart },
  { id: "hands" as const, label: "Learning, hands-on", icon: Hand },
];
export default function Portrait({
  hovered,
  onHover,
  onSelect,
  reset,
}: {
  hovered: ProjectId | null;
  onHover: (id: ProjectId | null) => void;
  onSelect: (id: ProjectId) => void;
  reset: number;
}) {
  const host = useRef<HTMLDivElement>(null);
  const labels = useRef<Partial<Record<ProjectId, HTMLButtonElement | null>>>(
    {},
  );
  const callbacks = useRef({ onHover, onSelect, hovered });
  const resetRef = useRef(reset);
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    callbacks.current = { onHover, onSelect, hovered };
  }, [onHover, onSelect, hovered]);
  useEffect(() => {
    resetRef.current = reset;
  }, [reset]);
  useEffect(() => {
    let cancelled = false;
    let dispose: (() => void) | undefined;
    import("three")
      .then((THREE) => {
        if (cancelled || !host.current) return;
        const container = host.current;
        let renderer: InstanceType<typeof THREE.WebGLRenderer>;
        try {
          renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "low-power",
          });
        } catch {
          setStatus("fallback");
          return;
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.25;
        container.insertBefore(renderer.domElement, container.firstChild);
        renderer.domElement.setAttribute("aria-hidden", "true");
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-4, 4, 3.1, -3.1, 0.1, 100);
        camera.position.set(0, 1.1, 12);
        camera.lookAt(0, 0, 0);
        scene.add(new THREE.HemisphereLight(0xf1f6ff, 0x6c83b0, 3));
        const key = new THREE.DirectionalLight(0xffffff, 4.5);
        key.position.set(-4, 6, 7);
        key.castShadow = true;
        key.shadow.mapSize.set(1024, 1024);
        key.shadow.camera.left = -4;
        key.shadow.camera.right = 4;
        key.shadow.camera.top = 5;
        key.shadow.camera.bottom = -4;
        key.shadow.normalBias = 0.035;
        scene.add(key);
        const rim = new THREE.DirectionalLight(0xb8d0ff, 3);
        rim.position.set(4, 3, -3);
        scene.add(rim);
        const figure = new THREE.Group();
        scene.add(figure);
        const skin = new THREE.MeshPhysicalMaterial({
          color: 0xc1d4ed,
          roughness: 0.42,
          metalness: 0.05,
          clearcoat: 0.28,
        });
        const shirt = new THREE.MeshPhysicalMaterial({
          color: 0x648bd3,
          roughness: 0.5,
          clearcoat: 0.15,
        });
        const dark = new THREE.MeshStandardMaterial({
          color: 0x273e67,
          roughness: 0.72,
        });
        const hair = new THREE.MeshStandardMaterial({
          color: 0x1c2d4a,
          roughness: 0.55,
        });
        const sole = new THREE.MeshStandardMaterial({
          color: 0xe2e9f4,
          roughness: 0.7,
        });
        const eye = new THREE.MeshStandardMaterial({
          color: 0x263853,
          roughness: 0.35,
        });
        const meshes: InstanceType<typeof THREE.Mesh>[] = [];
        function ellipsoid(
          parent: InstanceType<typeof THREE.Group>,
          material: InstanceType<typeof THREE.MeshStandardMaterial>,
          position: number[],
          scale: number[],
          part?: ProjectId,
        ) {
          const m = new THREE.Mesh(
            new THREE.SphereGeometry(1, 40, 32),
            material,
          );
          m.position.set(position[0], position[1], position[2]);
          m.scale.set(scale[0], scale[1], scale[2]);
          m.castShadow = true;
          m.receiveShadow = true;
          if (part) m.userData.part = part;
          parent.add(m);
          meshes.push(m);
          return m;
        }
        function limb(
          a: [number, number, number],
          b: [number, number, number],
          radius: number,
          material: InstanceType<typeof THREE.MeshStandardMaterial>,
          part?: ProjectId,
        ) {
          const start = new THREE.Vector3(...a),
            end = new THREE.Vector3(...b),
            delta = end.clone().sub(start);
          const m = new THREE.Mesh(
            new THREE.CapsuleGeometry(
              radius,
              Math.max(0.01, delta.length() - radius * 2),
              8,
              24,
            ),
            material,
          );
          m.position.copy(start.add(end).multiplyScalar(0.5));
          m.quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            delta.normalize(),
          );
          m.castShadow = true;
          m.receiveShadow = true;
          if (part) m.userData.part = part;
          figure.add(m);
          meshes.push(m);
          return m;
        }
        // Self-contained stylized stand-in; replace the figure with a personal GLB later.
        ellipsoid(figure, shirt, [0, 0.1, 0], [0.65, 0.87, 0.36], "heart");
        ellipsoid(figure, shirt, [0, -0.5, 0], [0.61, 0.32, 0.35], "heart");
        limb([-0.32, -0.65, 0], [-0.4, -1.82, 0.07], 0.245, dark);
        limb([0.32, -0.65, 0], [0.42, -1.82, -0.02], 0.245, dark);
        ellipsoid(figure, sole, [-0.4, -1.98, 0.19], [0.29, 0.17, 0.46]);
        ellipsoid(figure, sole, [0.43, -1.98, 0.15], [0.29, 0.17, 0.46]);
        ellipsoid(figure, shirt, [-0.4, -1.92, 0.21], [0.255, 0.15, 0.39]);
        ellipsoid(figure, shirt, [0.43, -1.92, 0.17], [0.255, 0.15, 0.39]);
        limb([0, 0.8, 0], [0, 1.2, 0], 0.22, skin);
        ellipsoid(figure, skin, [0, 1.6, 0.03], [0.55, 0.66, 0.46], "brain");
        ellipsoid(
          figure,
          skin,
          [-0.55, 1.57, 0.02],
          [0.125, 0.2, 0.13],
          "ears",
        );
        ellipsoid(figure, skin, [0.55, 1.57, 0.02], [0.125, 0.2, 0.13], "ears");
        ellipsoid(
          figure,
          shirt,
          [-0.57, 1.57, 0.075],
          [0.045, 0.095, 0.07],
          "ears",
        );
        ellipsoid(
          figure,
          shirt,
          [0.57, 1.57, 0.075],
          [0.045, 0.095, 0.07],
          "ears",
        );
        ellipsoid(figure, hair, [0, 1.93, -0.07], [0.56, 0.38, 0.44], "brain");
        const fringe = ellipsoid(
          figure,
          hair,
          [-0.21, 2.02, 0.23],
          [0.4, 0.21, 0.3],
          "brain",
        );
        fringe.rotation.z = -0.25;
        ellipsoid(figure, hair, [0.28, 1.97, 0.16], [0.29, 0.22, 0.3], "brain");
        ellipsoid(figure, skin, [0, 1.49, 0.47], [0.095, 0.13, 0.09], "brain");
        for (const x of [-0.2, 0.2]) {
          ellipsoid(figure, eye, [x, 1.66, 0.455], [0.037, 0.052, 0.022]);
          const brow = ellipsoid(
            figure,
            hair,
            [x, 1.79, 0.428],
            [0.088, 0.017, 0.018],
          );
          brow.rotation.z = x < 0 ? 0.06 : -0.06;
        }
        const smileCurve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(-0.1, 1.32, 0.433),
          new THREE.Vector3(0, 1.26, 0.47),
          new THREE.Vector3(0.1, 1.32, 0.433),
        );
        figure.add(
          new THREE.Mesh(
            new THREE.TubeGeometry(smileCurve, 16, 0.012, 8, false),
            eye,
          ),
        );
        limb([-0.57, 0.64, 0], [-0.89, -0.08, 0.03], 0.23, shirt);
        limb([-0.89, -0.08, 0.03], [-1.05, -0.59, 0.2], 0.16, shirt);
        limb([0.57, 0.64, 0], [0.92, 0.02, 0.05], 0.23, shirt);
        limb([0.92, 0.02, 0.05], [1.09, 0.48, 0.15], 0.16, shirt);
        function hand(x: number, y: number, z: number, raised: boolean) {
          const g = new THREE.Group();
          g.position.set(x, y, z);
          g.rotation.z = raised ? -0.16 : 0.16;
          figure.add(g);
          ellipsoid(g, skin, [0, 0, 0], [0.145, 0.195, 0.08], "hands");
          for (let i = 0; i < 4; i++) {
            const len = [0.18, 0.25, 0.23, 0.17][i];
            ellipsoid(
              g,
              skin,
              [(i - 1.5) * 0.065, (raised ? 1 : -1) * (0.15 + len / 2), 0],
              [0.038, len / 2 + 0.05, 0.047],
              "hands",
            );
          }
          const thumb = ellipsoid(
            g,
            skin,
            [raised ? -0.16 : 0.16, raised ? 0.035 : -0.03, 0.015],
            [0.06, 0.12, 0.05],
            "hands",
          );
          thumb.rotation.z = raised ? -0.5 : 0.5;
        }
        hand(-1.08, -0.76, 0.23, false);
        hand(1.1, 0.73, 0.17, true);
        ellipsoid(figure, shirt, [-0.89, -0.08, 0.03], [0.18, 0.2, 0.18]);
        ellipsoid(figure, shirt, [0.92, 0.02, 0.05], [0.18, 0.2, 0.18]);
        const heartMat = new THREE.MeshPhysicalMaterial({
          color: 0xe0a9b7,
          roughness: 0.35,
          clearcoat: 0.6,
        });
        const heartShape = new THREE.Shape();
        heartShape.moveTo(0, -0.12);
        heartShape.bezierCurveTo(-0.3, 0.06, -0.13, 0.23, 0, 0.1);
        heartShape.bezierCurveTo(0.13, 0.23, 0.3, 0.06, 0, -0.12);
        const heartMesh = new THREE.Mesh(
          new THREE.ExtrudeGeometry(heartShape, {
            depth: 0.025,
            bevelEnabled: true,
            bevelSize: 0.015,
            bevelThickness: 0.015,
            bevelSegments: 3,
            steps: 1,
          }),
          heartMat,
        );
        heartMesh.position.set(0.22, 0.4, 0.335);
        heartMesh.userData.part = "heart";
        figure.add(heartMesh);
        meshes.push(heartMesh);
        const ground = new THREE.Mesh(
          new THREE.CircleGeometry(2.4, 80),
          new THREE.ShadowMaterial({ opacity: 0.14 }),
        );
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -2.15;
        ground.receiveShadow = true;
        scene.add(ground);
        const platform = new THREE.Mesh(
          new THREE.CylinderGeometry(1.58, 1.63, 0.09, 80),
          new THREE.MeshStandardMaterial({ color: 0xd9e3f3, roughness: 0.85 }),
        );
        platform.position.y = -2.2;
        platform.receiveShadow = true;
        scene.add(platform);
        const anchors: Record<ProjectId, InstanceType<typeof THREE.Vector3>> = {
          brain: new THREE.Vector3(-0.25, 2.17, 0.25),
          ears: new THREE.Vector3(0.59, 1.56, 0.13),
          heart: new THREE.Vector3(0.22, 0.4, 0.42),
          hands: new THREE.Vector3(-1.1, -0.8, 0.24),
        };
        const raycaster = new THREE.Raycaster(),
          pointer = new THREE.Vector2(10, 10);
        let targetX = 0,
          targetY = -0.14,
          lastReset = resetRef.current,
          frame = 0,
          visible = true;
        const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
        const resize = () => {
          const { width, height } = container.getBoundingClientRect();
          if (!width || !height) return;
          renderer.setSize(width, height);
          const aspect = width / height;
          camera.left = -3.08 * aspect;
          camera.right = 3.08 * aspect;
          camera.updateProjectionMatrix();
        };
        const observer = new ResizeObserver(resize);
        observer.observe(container);
        resize();
        const hit = (e: PointerEvent) => {
          const r = container.getBoundingClientRect();
          pointer.set(
            ((e.clientX - r.left) / r.width) * 2 - 1,
            (-(e.clientY - r.top) / r.height) * 2 + 1,
          );
          raycaster.setFromCamera(pointer, camera);
          return raycaster
            .intersectObjects(meshes)
            .find((h) => h.object.userData.part)?.object.userData.part as
            | ProjectId
            | undefined;
        };
        const move = (e: PointerEvent) => {
          if (e.pointerType === "touch") return;
          const id = hit(e);
          callbacks.current.onHover(id ?? null);
          renderer.domElement.style.cursor = id ? "pointer" : "default";
          targetY = pointer.x * 0.2 - 0.14;
          targetX = -pointer.y * 0.055;
        };
        const leave = () => {
          callbacks.current.onHover(null);
          targetY = -0.14;
          targetX = 0;
        };
        const click = (e: PointerEvent) => {
          const id = hit(e);
          if (id) callbacks.current.onSelect(id);
        };
        renderer.domElement.addEventListener("pointermove", move);
        renderer.domElement.addEventListener("pointerleave", leave);
        renderer.domElement.addEventListener("pointerup", click);
        const visibility = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
        });
        visibility.observe(container);
        const v = new THREE.Vector3();
        const render = () => {
          frame = requestAnimationFrame(render);
          if (!visible || document.hidden) return;
          if (lastReset !== resetRef.current) {
            targetX = 0;
            targetY = -0.14;
            lastReset = resetRef.current;
          }
          figure.rotation.y = THREE.MathUtils.lerp(
            figure.rotation.y,
            motion.matches ? -0.14 : targetY,
            0.06,
          );
          figure.rotation.x = THREE.MathUtils.lerp(
            figure.rotation.x,
            motion.matches ? 0 : targetX,
            0.06,
          );
          figure.updateMatrixWorld();
          for (const item of hotspots) {
            const element = labels.current[item.id];
            if (element) {
              v.copy(anchors[item.id]);
              figure.localToWorld(v);
              v.project(camera);
              const projectedX = (v.x * 0.5 + 0.5) * container.clientWidth;
              const leftLabel = item.id === "brain" || item.id === "hands";
              const minX = leftLabel ? element.offsetWidth + 1 : 15;
              const maxX = leftLabel
                ? container.clientWidth - 15
                : container.clientWidth - element.offsetWidth - 1;
              element.style.left = `${THREE.MathUtils.clamp(projectedX, minX, maxX)}px`;
              element.style.top = `${(-v.y * 0.5 + 0.5) * container.clientHeight}px`;
            }
          }
          heartMat.emissive.set(
            callbacks.current.hovered === "heart" ? 0x5d1f35 : 0x000000,
          );
          renderer.render(scene, camera);
        };
        setStatus("ready");
        render();
        dispose = () => {
          cancelAnimationFrame(frame);
          observer.disconnect();
          visibility.disconnect();
          renderer.domElement.removeEventListener("pointermove", move);
          renderer.domElement.removeEventListener("pointerleave", leave);
          renderer.domElement.removeEventListener("pointerup", click);
          scene.traverse((o) => {
            if (o instanceof THREE.Mesh) {
              o.geometry.dispose();
              const mats = Array.isArray(o.material)
                ? o.material
                : [o.material];
              mats.forEach((m) => m.dispose());
            }
          });
          renderer.dispose();
          renderer.domElement.remove();
        };
      })
      .catch(() => {
        if (!cancelled) setStatus("fallback");
      });
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);
  return (
    <div
      ref={host}
      className={`portrait-canvas portrait-${status}`}
      aria-label="Interactive stylized 3D portrait of Gaode"
    >
      {status === "loading" && (
        <span className="model-status">Sculpting a little introduction…</span>
      )}
      {status === "fallback" && (
        <div className="model-fallback">
          <strong>A portrait in four projects.</strong>
          <p>Explore my work with the buttons below.</p>
        </div>
      )}
      {hotspots.map(({ id, label, icon: Icon }) => (
        <button
          ref={(el) => {
            labels.current[id] = el;
          }}
          key={id}
          className={`hotspot hotspot-${id} ${hovered === id ? "is-active" : ""}`}
          onPointerEnter={() => onHover(id)}
          onPointerLeave={() => onHover(null)}
          onFocus={() => onHover(id)}
          onBlur={() => onHover(null)}
          onClick={() => onSelect(id)}
          aria-label={`Explore ${id}: ${label}`}
        >
          <span className="hotspot-dot" />
          <span className="hotspot-label">
            <Icon size={17} strokeWidth={1.5} />
            {label}
            <span className="hotspot-plus">+</span>
          </span>
        </button>
      ))}
    </div>
  );
}
