// TerraPulse — globe scene
// Original implementation; reference repo used only as a guide for:
//   (1) lat/lon -> Vector3 mapping on a unit sphere
//   (2) Raycaster-based hover/pick of marker meshes
// Everything visual (materials, shaders, marker design, atmosphere, motion) is original.

(function () {
  const EARTH_RADIUS = 5;
  const MARKER_ALT = 0.04;

  // --- public API ----------------------------------------------------------
  const TerraGlobe = {
    init,
    setHoverCallback(fn) { hoverCb = fn; },
    setSelectCallback(fn) { selectCb = fn; },
    focusOn,
    setSelected,
    setAmbientSpin(on) { ambientSpin = !!on; },
    isInteracting: () => pointerDown,
    // Spatial entry — drives camera push-in, globe depth recession,
    // pillar appearance, and marker dimming. Pass cityId to enter, null to exit.
    setEntering,
  };
  window.TerraGlobe = TerraGlobe;

  // --- state ---------------------------------------------------------------
  let scene, camera, renderer, globe, atmosphere, stars;
  let raycaster, mouse = new THREE.Vector2(-2, -2);
  let cities = [];
  let cityGroup;
  let hoverCb = () => {}, selectCb = () => {};
  let hoveredId = null;
  let selectedId = null;
  let ambientSpin = true;
  let targetRotation = { x: 0.18, y: 0 };
  let pointerDown = false;
  let pointerMoved = false;
  let dragStart = null;
  let lastPointer = null;
  let dragVelocityY = 0;
  let container;
  // Spatial entry state
  let enteringId = null;          // city id currently being entered (null = idle)
  let enterT = 0;                 // 0..1 — progress of entry transition
  let pillarMesh = null;          // shader pillar of light, child of cityGroup
  let pillarRingMesh = null;      // glowing ring at pillar base on the globe
  let pillarStartTime = 0;
  const ENTER_MS = 1500;          // pillar growth + camera push-in
  // Camera framing
  const CAM_IDLE_Z = 15;
  const CAM_ENTRY_Z = 11.5;
  const CAM_IDLE_TILT = 0.6;
  const CAM_ENTRY_TILT = 1.1;
  let cameraTargetZ = CAM_IDLE_Z;
  let cameraTargetTilt = CAM_IDLE_TILT;
  let globeTargetZ = 0;

  // --- math (mirrors reference convention so picking is consistent) -------
  function latLonToVec3(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
       radius * Math.cos(phi),
       radius * Math.sin(phi) * Math.sin(theta)
    );
  }

  // --- init ----------------------------------------------------------------
  function init(opts) {
    container = opts.container;
    const cityData = opts.cities;

    scene = new THREE.Scene();

    const w = container.clientWidth;
    const h = container.clientHeight;
    camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 1000);
    camera.position.set(0, 0.6, 15);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    raycaster = new THREE.Raycaster();
    raycaster.params.Points = { threshold: 0.1 };

    buildLights();
    buildGlobe();
    buildAtmosphere();
    buildStars();
    buildCities(cityData);

    bindEvents();
    animate();
    window.addEventListener('resize', onResize);
  }

  function buildLights() {
    scene.add(new THREE.AmbientLight(0x8fb3d8, 0.45));
    const sun = new THREE.DirectionalLight(0xfff4e0, 1.4);
    sun.position.set(7, 5, 8);
    scene.add(sun);
    const rim = new THREE.DirectionalLight(0xd9874f, 0.55);
    rim.position.set(-9, -2, -3);
    scene.add(rim);
  }

  function buildGlobe() {
    const geometry = new THREE.SphereGeometry(EARTH_RADIUS, 96, 96);
    const loader = new THREE.TextureLoader();
    const blueMarble = loader.load('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg');
    const topo       = loader.load('https://unpkg.com/three-globe/example/img/earth-topology.png');

    // True NASA blue marble — oceans naturally blue, land green/ochre.
    // Topology is used as a bump map for relief; emissive adds a warm
    // ember tint on land mass at night-side rim.
    const material = new THREE.MeshPhongMaterial({
      map: blueMarble,
      bumpMap: topo,
      bumpScale: 0.08,
      specularMap: topo,
      specular: new THREE.Color('#3a5a82'),
      shininess: 8,
      emissive: new THREE.Color('#06182a'),
      emissiveIntensity: 0.4,
    });

    globe = new THREE.Mesh(geometry, material);
    globe.rotation.set(targetRotation.x, -Math.PI / 2, 0);
    scene.add(globe);

    // Subtle great-circle grid — longitude / latitude lines for premium feel.
    const gridGeom = new THREE.BufferGeometry();
    const gridPts = [];
    // longitude meridians every 30°
    for (let lo = -180; lo < 180; lo += 30) {
      for (let la = -89; la <= 89; la += 2) {
        const p1 = latLonToVec3(la, lo, EARTH_RADIUS * 1.001);
        const p2 = latLonToVec3(la + 2, lo, EARTH_RADIUS * 1.001);
        gridPts.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
      }
    }
    // latitude parallels every 30°
    for (let la = -60; la <= 60; la += 30) {
      for (let lo = -180; lo < 180; lo += 2) {
        const p1 = latLonToVec3(la, lo, EARTH_RADIUS * 1.001);
        const p2 = latLonToVec3(la, lo + 2, EARTH_RADIUS * 1.001);
        gridPts.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
      }
    }
    gridGeom.setAttribute('position', new THREE.Float32BufferAttribute(gridPts, 3));
    const grid = new THREE.LineSegments(
      gridGeom,
      new THREE.LineBasicMaterial({ color: 0x9ec5f0, transparent: true, opacity: 0.13 })
    );
    globe.add(grid);

    // City layer rotates with the globe.
    cityGroup = new THREE.Group();
    globe.add(cityGroup);
  }

  function buildAtmosphere() {
    // Custom shader for a fresnel rim glow — sky blue, classic earth atmosphere.
    const geom = new THREE.SphereGeometry(EARTH_RADIUS * 1.18, 64, 64);
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        glowColor: { value: new THREE.Color('#6cb6ff') },
        intensity: { value: 0.7 }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vView;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vView = normalize(-mv.xyz);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vView;
        uniform vec3 glowColor;
        uniform float intensity;
        void main() {
          float f = pow(1.0 - abs(dot(vNormal, vView)), 2.2);
          gl_FragColor = vec4(glowColor, f * intensity);
        }`
    });
    atmosphere = new THREE.Mesh(geom, mat);
    scene.add(atmosphere);

    // Inner thin atmosphere line — adds a crisp edge to the planet.
    const inner = new THREE.Mesh(
      new THREE.SphereGeometry(EARTH_RADIUS * 1.012, 64, 64),
      new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { glowColor: { value: new THREE.Color('#a0d4ff') } },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vView;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vView = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vView;
          uniform vec3 glowColor;
          void main() {
            float f = pow(1.0 - abs(dot(vNormal, vView)), 6.0);
            gl_FragColor = vec4(glowColor, f * 0.55);
          }`
      })
    );
    scene.add(inner);
  }

  function makeCircleTexture() {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0.0, 'rgba(255,255,255,1)');
    g.addColorStop(0.4, 'rgba(255,255,255,0.55)');
    g.addColorStop(1.0, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }

  function buildStars() {
    // A small, sparse field of soft round stars. The earth is the hero;
    // the background should be calm.
    const sprite = makeCircleTexture();

    const sGeom = new THREE.BufferGeometry();
    const sVerts = [];
    const sScales = [];
    for (let i = 0; i < 420; i++) {
      const r = 90 + Math.random() * 250;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      sVerts.push(
        r * Math.sin(p) * Math.cos(t),
        r * Math.sin(p) * Math.sin(t),
        r * Math.cos(p)
      );
      sScales.push(0.6 + Math.random() * 1.6);
    }
    sGeom.setAttribute('position', new THREE.Float32BufferAttribute(sVerts, 3));
    stars = new THREE.Points(sGeom, new THREE.PointsMaterial({
      color: 0xfbf3e0,
      size: 1.6,
      map: sprite,
      alphaMap: sprite,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    }));
    scene.add(stars);
  }

  // --- markers -------------------------------------------------------------
  function buildCities(cityData) {
    cities = [];
    cityData.forEach((c) => {
      const [lat, lon] = c.coordinates;
      const pos = latLonToVec3(lat, lon, EARTH_RADIUS + MARKER_ALT);
      const group = new THREE.Group();
      group.position.copy(pos);
      group.lookAt(pos.clone().multiplyScalar(2));

      // Tiny ember dot — the anchor on the globe surface. The HTML pin
      // layer above handles all the dramatic visuals.
      const dotGeo = new THREE.SphereGeometry(0.04, 14, 14);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0xffd99a });
      const dot = new THREE.Mesh(dotGeo, dotMat);

      // Outer halo ring (faint at rest, glows on hover/select)
      const ringGeo = new THREE.RingGeometry(0.06, 0.10, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xffd99a, transparent: true, opacity: 0.35, side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);

      // Invisible larger hitbox for raycaster
      const hitGeo = new THREE.SphereGeometry(0.14, 8, 8);
      const hit = new THREE.Mesh(hitGeo, new THREE.MeshBasicMaterial({
        color: 0xffffff, transparent: true, opacity: 0, depthWrite: false
      }));
      hit.userData.cityId = c.id;

      group.add(ring, dot, hit);
      cityGroup.add(group);

      cities.push({
        id: c.id, name: c.cityName, lat, lon,
        group, ring, dot, hit,
        worldPos: new THREE.Vector3()
      });
    });
  }

  // --- interaction ---------------------------------------------------------
  function bindEvents() {
    const dom = renderer.domElement;
    dom.style.touchAction = 'none';

    dom.addEventListener('pointermove', (e) => {
      const rect = dom.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (pointerDown && lastPointer) {
        const dx = e.clientX - lastPointer.x;
        const dy = e.clientY - lastPointer.y;
        if (Math.abs(dx) + Math.abs(dy) > 3) pointerMoved = true;
        targetRotation.y += dx * 0.005;
        targetRotation.x = Math.max(-0.7, Math.min(0.7, targetRotation.x + dy * 0.003));
        dragVelocityY = dx * 0.0005;
      }
      lastPointer = { x: e.clientX, y: e.clientY };
    });

    dom.addEventListener('pointerdown', (e) => {
      pointerDown = true;
      pointerMoved = false;
      dragStart = { x: e.clientX, y: e.clientY };
      lastPointer = { x: e.clientX, y: e.clientY };
      dom.setPointerCapture(e.pointerId);
    });

    dom.addEventListener('pointerup', (e) => {
      pointerDown = false;
      try { dom.releasePointerCapture(e.pointerId); } catch (_) {}
      if (!pointerMoved) {
        // True click (no drag) — see if we hit a marker
        const hit = pickCity();
        if (hit) {
          selectCb(hit.id);
        } else {
          selectCb(null); // background click clears
        }
      }
    });

    dom.addEventListener('pointerleave', () => {
      pointerDown = false;
      if (hoveredId !== null) {
        hoveredId = null;
        hoverCb(null);
      }
    });

    dom.addEventListener('wheel', (e) => {
      const z = camera.position.length();
      const target = Math.max(8, Math.min(20, z + e.deltaY * 0.01));
      const dir = camera.position.clone().normalize();
      camera.position.copy(dir.multiplyScalar(target));
      e.preventDefault();
    }, { passive: false });
  }

  function pickCity() {
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(cities.map((c) => c.hit), false);
    if (hits.length === 0) return null;
    const id = hits[0].object.userData.cityId;
    return cities.find((c) => c.id === id);
  }

  function onResize() {
    if (!container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  // --- external commands ---------------------------------------------------
  function focusOn(cityId) {
    const c = cities.find((x) => x.id === cityId);
    if (!c) return;
    // Center the city — the full-screen tab covers the globe, so position
    // doesn't matter visually, but keeping it centered means a smooth state
    // when the tab is closed.
    const phi = (90 - c.lat) * (Math.PI / 180);
    const theta = (c.lon + 180) * (Math.PI / 180);
    const desiredY = -theta - Math.PI / 2;
    const desiredX = Math.max(-0.35, Math.min(0.35, (Math.PI / 2 - phi) * 0.5));
    while (desiredY - targetRotation.y > Math.PI) targetRotation.y += Math.PI * 2;
    while (desiredY - targetRotation.y < -Math.PI) targetRotation.y -= Math.PI * 2;
    targetRotation.y = desiredY;
    targetRotation.x = desiredX;
  }

  function setSelected(cityId) {
    selectedId = cityId;
  }

  // --- spatial entry -------------------------------------------------------
  // Build a vertical light pillar at a city's surface. It's parented to the
  // city's marker group so it follows the globe's rotation; growth is driven
  // by a shader uniform we lerp in the animate loop.
  function buildPillarForCity(c) {
    if (pillarMesh) destroyPillar();
    const cyl = new THREE.CylinderGeometry(0.045, 0.075, 1.0, 24, 1, true);
    // Move base to origin and grow upward along +Y (local up = outward from globe).
    cyl.translate(0, 0.5, 0);
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uGrow: { value: 0 },     // 0..1 height factor
        uIntensity: { value: 1 },
        uColor: { value: new THREE.Color(0xffd99a) },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vY;
        uniform float uGrow;
        void main() {
          vUv = uv;
          vY = position.y;
          vec3 p = position;
          p.y *= uGrow * 3.2; // pillar height ~3.2 units when fully grown
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }`,
      fragmentShader: `
        varying vec2 vUv;
        varying float vY;
        uniform float uTime;
        uniform float uIntensity;
        uniform vec3 uColor;
        // hash noise
        float hash(float n){ return fract(sin(n)*43758.5453); }
        void main() {
          float edge = pow(1.0 - abs(vUv.x - 0.5) * 2.0, 1.4);
          // energy flow: upward-traveling brightness ripples
          float flow = sin((vUv.y - uTime * 0.6) * 16.0) * 0.5 + 0.5;
          float spark = hash(floor(vUv.y * 30.0 + uTime * 6.0)) * 0.35;
          float fade = smoothstep(1.0, 0.1, vUv.y); // brighter at base, fades up
          float a = edge * (0.55 + flow * 0.35 + spark) * fade * uIntensity;
          gl_FragColor = vec4(uColor * (1.0 + flow * 0.4), a);
        }`
    });
    const pillar = new THREE.Mesh(cyl, mat);
    // Orient so cylinder local +Y is outward from globe surface.
    // The city group's local frame already has +Z facing outward (from lookAt),
    // so we rotate the pillar so its +Y maps to the group's +Z.
    pillar.rotation.x = -Math.PI / 2;
    c.group.add(pillar);
    pillarMesh = pillar;

    // Base ring on the globe surface
    const ringGeo = new THREE.RingGeometry(0.10, 0.18, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffd99a,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    c.group.add(ring);
    pillarRingMesh = ring;
  }

  function destroyPillar() {
    if (pillarMesh) {
      pillarMesh.parent && pillarMesh.parent.remove(pillarMesh);
      pillarMesh.geometry.dispose();
      pillarMesh.material.dispose();
      pillarMesh = null;
    }
    if (pillarRingMesh) {
      pillarRingMesh.parent && pillarRingMesh.parent.remove(pillarRingMesh);
      pillarRingMesh.geometry.dispose();
      pillarRingMesh.material.dispose();
      pillarRingMesh = null;
    }
  }

  function setEntering(cityId) {
    if (cityId) {
      enteringId = cityId;
      pillarStartTime = performance.now();
      cameraTargetZ = CAM_ENTRY_Z;
      cameraTargetTilt = CAM_ENTRY_TILT;
      globeTargetZ = -1.4;
      const c = cities.find((x) => x.id === cityId);
      if (c) {
        // No rotation lock-on — the pillar simply grows where the city is
        // right now. Globe rotation continues to be controlled by the user.
        buildPillarForCity(c);
      }
    } else {
      enteringId = null;
      cameraTargetZ = CAM_IDLE_Z;
      cameraTargetTilt = CAM_IDLE_TILT;
      globeTargetZ = 0;
      // Hold the pillar for a short collapse window before disposing.
      const ref = pillarMesh;
      const ringRef = pillarRingMesh;
      setTimeout(() => {
        if (pillarMesh === ref) destroyPillar();
        else if (ref) {
          ref.parent && ref.parent.remove(ref);
          ref.geometry.dispose(); ref.material.dispose();
        }
        if (ringRef && pillarRingMesh !== ringRef) {
          ringRef.parent && ringRef.parent.remove(ringRef);
          ringRef.geometry.dispose(); ringRef.material.dispose();
        }
      }, 700);
    }
  }

  // --- frame loop ----------------------------------------------------------
  function animate() {
    requestAnimationFrame(animate);

    // Hover detection (skip while dragging — pointer position is stale anyway)
    if (!pointerDown) {
      const pick = pickCity();
      const id = pick ? pick.id : null;
      if (id !== hoveredId) {
        hoveredId = id;
        renderer.domElement.style.cursor = id ? 'pointer' : 'grab';
        hoverCb(id);
      }
    }

    // Smooth globe rotation (paused while entering)
    if (ambientSpin && !pointerDown && hoveredId === null && selectedId === null && !enteringId) {
      targetRotation.y += 0.0008;
    }

    // Camera + globe depth lerp for spatial entry. We lerp toward an
    // explicit (x=0, y=tilt, z=zoom) target only while entering — outside
    // of that, the wheel-zoom controlled camera position is preserved.
    if (enteringId || enterT > 0.01) {
      camera.position.x += (0 - camera.position.x) * 0.06;
      camera.position.y += (cameraTargetTilt - camera.position.y) * 0.06;
      camera.position.z += (cameraTargetZ - camera.position.z) * 0.06;
    }
    // Globe recession (subtle Z push-back so the pillar reads as foreground)
    globe.position.z += (globeTargetZ - globe.position.z) * 0.06;
    if (atmosphere) atmosphere.position.z = globe.position.z;

    // Drive entry progress 0..1 and pillar uniforms
    if (enteringId) {
      enterT = Math.min(1, (performance.now() - pillarStartTime) / ENTER_MS);
    } else {
      enterT = Math.max(0, enterT - 0.04);
    }
    if (pillarMesh) {
      // ease-out cubic for growth
      const g = enteringId ? 1 - Math.pow(1 - enterT, 3) : enterT * enterT;
      pillarMesh.material.uniforms.uGrow.value = g;
      pillarMesh.material.uniforms.uTime.value = performance.now() * 0.001;
      pillarMesh.material.uniforms.uIntensity.value = 0.4 + g * 1.4;
    }
    if (pillarRingMesh) {
      const g = enteringId ? 1 - Math.pow(1 - enterT, 3) : enterT * enterT;
      pillarRingMesh.material.opacity = 0.85 * g;
      pillarRingMesh.scale.setScalar(1 + g * 0.6 + Math.sin(performance.now() * 0.003) * 0.06);
    }
    if (!pointerDown && Math.abs(dragVelocityY) > 0.00001) {
      targetRotation.y += dragVelocityY;
      dragVelocityY *= 0.94;
    }
    // Lerp the rendered rotation toward target
    const baseY = -Math.PI / 2;
    const currentY = globe.rotation.y - baseY;
    const dy = targetRotation.y - currentY;
    globe.rotation.y += dy * 0.08;
    globe.rotation.x += (targetRotation.x - globe.rotation.x) * 0.08;

    // Animate markers
    const t = performance.now() * 0.001;
    // Non-selected dim factor during spatial entry
    const dimOthers = enteringId ? (1 - 0.85 * enterT) : 1;
    cities.forEach((c) => {
      c.group.getWorldPosition(c.worldPos);
      const isHover = c.id === hoveredId;
      const isSel = c.id === selectedId;
      const isEntering = c.id === enteringId;

      // Pulse ring opacity
      const pulse = 0.4 + Math.sin(t * 1.4 + c.lat) * 0.15;
      c.ring.material.opacity = isSel ? 0.95 : (isHover ? 0.9 : pulse * 0.5);
      const ringScale = isSel ? 2.2 : (isHover ? 1.7 : 1);
      c.ring.scale.setScalar(ringScale + Math.sin(t * 2 + c.lat) * 0.08);

      // Dot
      c.dot.scale.setScalar(isSel ? 1.6 : (isHover ? 1.4 : 1));
      c.dot.material.color.setHex(isSel ? 0xfff4dc : 0xffd99a);

      // Hide markers facing away from camera
      const camDir = camera.position.clone().normalize();
      const face = c.worldPos.clone().normalize().dot(camDir);
      const visibility = THREE.MathUtils.clamp((face + 0.15) * 3, 0, 1);
      c.group.visible = visibility > 0.01;
      const dim = isEntering ? 1 : dimOthers;
      c.ring.material.opacity *= visibility * dim;
      c.dot.material.opacity = visibility * dim;
      c.dot.material.transparent = true;
    });

    // Globe material morph during entry (semi-transparent + emissive bump)
    if (globe && globe.material) {
      const m = globe.material;
      const targetOpacity = enteringId ? 0.78 : 1;
      m.transparent = true;
      m.opacity += (targetOpacity - m.opacity) * 0.06;
      const targetEmissive = enteringId ? 0.75 : 0.4;
      m.emissiveIntensity += (targetEmissive - m.emissiveIntensity) * 0.06;
    }

    // Atmosphere gentle pulse
    if (atmosphere) {
      atmosphere.material.uniforms.intensity.value = 0.65 + Math.sin(t * 0.4) * 0.08;
    }

    // Stars: imperceptibly slow drift + subtle twinkle
    if (stars) {
      stars.rotation.y += 0.00004;
      stars.material.opacity = 0.5 + Math.sin(t * 0.5) * 0.08;
    }

    renderer.render(scene, camera);
  }

  // --- helper: project pillar top to screen px (for tab transform-origin) ---
  TerraGlobe.projectPillarTop = function (cityId, altitude) {
    const c = cities.find((x) => x.id === cityId);
    if (!c) return null;
    const out = latLonToVec3(c.lat, c.lon, EARTH_RADIUS + (altitude || 3.2));
    // Convert from globe-local to world space
    const world = out.applyMatrix4(globe.matrixWorld);
    const v = world.clone().project(camera);
    const rect = renderer.domElement.getBoundingClientRect();
    return {
      x: rect.left + (v.x * 0.5 + 0.5) * rect.width,
      y: rect.top + (-v.y * 0.5 + 0.5) * rect.height,
    };
  };

  // --- helper: project a city to screen px for HTML overlay ----------------
  TerraGlobe.projectCity = function (cityId) {
    const c = cities.find((x) => x.id === cityId);
    if (!c) return null;
    c.group.getWorldPosition(c.worldPos);
    const v = c.worldPos.clone().project(camera);
    const rect = renderer.domElement.getBoundingClientRect();
    const camDir = camera.position.clone().normalize();
    const face = c.worldPos.clone().normalize().dot(camDir);
    if (face < -0.1) return null;
    return {
      x: rect.left + (v.x * 0.5 + 0.5) * rect.width,
      y: rect.top + (-v.y * 0.5 + 0.5) * rect.height,
      depth: face
    };
  };
})();
