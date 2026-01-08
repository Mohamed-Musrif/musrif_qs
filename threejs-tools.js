// Three.js 3D Construction Tools Animation

let scene, camera, renderer, cube;

function init3DTool() {
    const container = document.getElementById('tool-container');
    if (!container) return;
    
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.error('Three.js is not loaded. Cannot initialize 3D tool.');
        return;
    }
    
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xf97316, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Create construction tool (simplified cube with materials)
    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const materials = [
        new THREE.MeshStandardMaterial({ color: 0x2d3748 }), // charcoal
        new THREE.MeshStandardMaterial({ color: 0xf97316 }), // orange
        new THREE.MeshStandardMaterial({ color: 0x0d1b2a }), // navy
        new THREE.MeshStandardMaterial({ color: 0xd4af37 }), // gold
        new THREE.MeshStandardMaterial({ color: 0x2d3748 }), // charcoal
        new THREE.MeshStandardMaterial({ color: 0xf97316 }), // orange
    ];
    cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);
    
    // Add wireframe for construction look
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
    cube.add(line);
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Start animation
    animate();
}

function onWindowResize() {
    const container = document.getElementById('tool-container');
    if (!container || !camera || !renderer) return;
    
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the cube
    if (cube) {
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.01;
    }
    
    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

// Initialize 3D tool when page loads
window.addEventListener('load', init3DTool);

// Pause animation when page is not visible (to save resources)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animation or reduce frame rate
        if (cube) {
            cube.rotation.x += 0.001; // Slow down
            cube.rotation.y += 0.002;
        }
    }
});

// Clean up Three.js resources when navigating away (if using SPA)
window.addEventListener('beforeunload', function() {
    if (renderer) {
        renderer.dispose();
    }
});

// Export for module usage
export { init3DTool, animate, onWindowResize };