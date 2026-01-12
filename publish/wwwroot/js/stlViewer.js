window.stlViewer = (function () {
    let scene, camera, renderer, controls;

    function init(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            console.warn("stlViewer: canvas not found:", canvasId);
            return;
        }

        const width = canvas.clientWidth || canvas.parentElement.clientWidth || 600;
        const height = canvas.clientHeight || 400;

        // Scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf3f4f6); // tailwind-ish gray-100

        // Camera
        camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(80, 60, 80);

        // Renderer
        renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
        renderer.setSize(width, height);

        // Light
        const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8);
        hemi.position.set(0, 200, 0);
        scene.add(hemi);

        light = new THREE.DirectionalLight(0xffffff, 0.8);
        light.position.set(100, 100, 100);
        scene.add(light);

        // Ground grid (optional)
        const grid = new THREE.GridHelper(200, 20, 0xcccccc, 0xe5e7eb);
        scene.add(grid);

        // Simple orbit controls-like behavior
        // (لو حبيت تستخدم OrbitControls الحقيقية ممكن تضيفها لاحقًا)
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("wheel", onMouseWheel);

        animate();
    }

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    function onMouseMove(e) {
        if (!currentMesh) return;

        if (e.buttons === 1) {
            const deltaMove = {
                x: e.offsetX - previousMousePosition.x,
                y: e.offsetY - previousMousePosition.y
            };

            const deltaRotationQuaternion = new THREE.Quaternion()
                .setFromEuler(new THREE.Euler(
                    toRadians(deltaMove.y * 0.5),
                    toRadians(deltaMove.x * 0.5),
                    0,
                    "XYZ"
                ));

            currentMesh.quaternion.multiplyQuaternions(deltaRotationQuaternion, currentMesh.quaternion);
        }

        previousMousePosition = {
            x: e.offsetX,
            y: e.offsetY
        };
    }

    function onMouseWheel(e) {
        if (!camera) return;

        const delta = e.deltaY > 0 ? 1.1 : 0.9;
        camera.position.multiplyScalar(delta);
    }

    function toRadians(angle) {
        return angle * (Math.PI / 180);
    }

    function loadModel(url) {
        if (!scene) {
            console.warn("stlViewer: scene is not initialized. Call init first.");
            return;
        }

        const loader = new THREE.STLLoader();

        loader.load(
            url,
            function (geometry) {
                // Remove previous mesh
                if (currentMesh) {
                    scene.remove(currentMesh);
                    currentMesh.geometry.dispose();
                    if (currentMesh.material) {
                        currentMesh.material.dispose();
                    }
                }

                const material = new THREE.MeshPhongMaterial({
                    color: 0x2563eb,
                    specular: 0x111111,
                    shininess: 30
                });

                currentMesh = new THREE.Mesh(geometry, material);

                // Center + scale to a reasonable size
                geometry.computeBoundingBox();
                const bbox = geometry.boundingBox;
                const size = new THREE.Vector3();
                bbox.getSize(size);

                const maxDim = Math.max(size.x, size.y, size.z) || 1;
                const desiredSize = 40; // mm-ish in our world units
                const scale = desiredSize / maxDim;

                currentMesh.scale.set(scale, scale, scale);

                // move to origin
                const center = new THREE.Vector3();
                bbox.getCenter(center);
                currentMesh.position.sub(center.multiplyScalar(scale));

                scene.add(currentMesh);
            },
            undefined,
            function (error) {
                console.error("stlViewer: error loading", url, error);
            }
        );
    }

    function animate() {
        requestAnimationFrame(animate);
        if (renderer && scene && camera) {
            renderer.render(scene, camera);
        }
    }

    return {
        init,
        loadModel
    };
})();