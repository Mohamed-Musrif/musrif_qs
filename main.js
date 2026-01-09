// DOM Elements
const contactForm = document.getElementById('contactForm');
const constructionAnimation = document.getElementById('construction-animation');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initBurjKhalifaAnimation();
    setupFormValidation();
    setupSmoothScrolling();
    setCurrentYear();
});

// Set current year in footer
function setCurrentYear() {
    const yearElement = document.querySelector('.portfolio-footer p');
    if (yearElement) {
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', new Date().getFullYear());
    }
}

// Form submission handler
function setupFormValidation() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const subject = this.querySelectorAll('input[type="text"]')[1].value.trim();
        const message = this.querySelector('textarea').value.trim();
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showAlert('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showAlert('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showAlert('Thank you for your message! I will get back to you soon.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Show alert message
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
    `;
    
    alertDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Burj Khalifa Style 3D Animation
function initBurjKhalifaAnimation() {
    if (!constructionAnimation || typeof THREE === 'undefined') {
        return;
    }
    
    const container = constructionAnimation;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(15, 20, 25);
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xf97316, 1);
    directionalLight.position.set(20, 30, 20);
    scene.add(directionalLight);
    
    // Create ground
    const groundGeometry = new THREE.PlaneGeometry(40, 40);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x2d3748,
        roughness: 0.8
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);
    
    // Create building foundation
    const foundationGeometry = new THREE.CylinderGeometry(4, 4, 1, 16);
    const foundationMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x4a5568,
        roughness: 0.9
    });
    const foundation = new THREE.Mesh(foundationGeometry, foundationMaterial);
    foundation.position.y = 0.5;
    scene.add(foundation);
    
    // Create building sections
    const sections = [];
    const totalSections = 6;
    const baseRadius = 3;
    const topRadius = 1;
    const totalHeight = 25;
    
    for (let i = 0; i < totalSections; i++) {
        const sectionHeight = totalHeight / totalSections;
        const radius = baseRadius * (1 - i / totalSections * 0.6);
        const nextRadius = baseRadius * (1 - (i + 1) / totalSections * 0.6);
        
        const geometry = new THREE.CylinderGeometry(nextRadius, radius, sectionHeight, 12);
        const material = new THREE.MeshStandardMaterial({ 
            color: i % 2 === 0 ? 0x1e293b : 0x334155,
            metalness: 0.3,
            roughness: 0.7
        });
        
        const section = new THREE.Mesh(geometry, material);
        section.position.y = i * sectionHeight + 1;
        section.userData = { index: i };
        sections.push(section);
        scene.add(section);
        
        // Add edges
        const edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ 
            color: 0xd4af37,
            linewidth: 1
        }));
        section.add(line);
    }
    
    // Add cranes
    const cranes = [];
    for (let i = 0; i < 2; i++) {
        const craneGroup = new THREE.Group();
        
        // Crane base
        const base = new THREE.Mesh(
            new THREE.CylinderGeometry(0.3, 0.4, 1.5, 8),
            new THREE.MeshStandardMaterial({ color: 0x64748b })
        );
        craneGroup.add(base);
        
        // Crane tower
        const tower = new THREE.Mesh(
            new THREE.BoxGeometry(0.15, 20, 0.15),
            new THREE.MeshStandardMaterial({ color: 0x475569 })
        );
        tower.position.y = 10;
        craneGroup.add(tower);
        
        // Crane arm
        const arm = new THREE.Mesh(
            new THREE.BoxGeometry(6 + i * 2, 0.1, 0.1),
            new THREE.MeshStandardMaterial({ color: 0xf97316 })
        );
        arm.position.set(3 + i, 19, 0);
        craneGroup.add(arm);
        
        craneGroup.position.set(-8 + i * 16, 0, -5);
        craneGroup.userData = { speed: 1 + i * 0.5 };
        cranes.push(craneGroup);
        scene.add(craneGroup);
    }
    
    // Animation variables
    let time = 0;
    let constructionPhase = 0;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;
        
        // Camera rotation
        camera.position.x = 20 * Math.cos(time * 0.1);
        camera.position.z = 20 * Math.sin(time * 0.1);
        camera.lookAt(0, 10, 0);
        
        // Animate building construction
        constructionPhase = (Math.sin(time * 0.3) + 1) / 2;
        
        sections.forEach((section, index) => {
            const progress = constructionPhase - (index / sections.length);
            
            if (progress > 0) {
                const visibleProgress = Math.min(progress * sections.length, 1);
                section.scale.y = 0.1 + visibleProgress * 0.9;
                section.material.opacity = 0.3 + visibleProgress * 0.7;
                section.material.transparent = true;
                
                // Gentle pulse
                const pulse = Math.sin(time * 2 + index) * 0.05 + 1;
                section.scale.x = pulse;
                section.scale.z = pulse;
            }
        });
        
        // Animate cranes
        cranes.forEach((crane, index) => {
            crane.children[2].rotation.y = Math.sin(time * crane.userData.speed) * 0.3;
        });
        
        renderer.render(scene, camera);
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (!container || !camera || !renderer) return;
        
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    });
    
    // Start animation
    animate();
}

// Add CSS for alerts
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
