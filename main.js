// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const contactForm = document.getElementById('contactForm');
const currentYear = document.getElementById('currentYear');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    setCurrentYear();
    setupFormValidation();
    setupSmoothScrolling();
    setupParallaxEffect();
    initBuildingConstruction(); // Changed from init3DTool
    setupAnimations();
});

// Mobile Navigation Toggle
function initMobileMenu() {
    if (!mobileMenuBtn || !navLinks) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Set current year in footer
function setCurrentYear() {
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
}

// Form submission handler
function setupFormValidation() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !subject || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message, Aliyar! I will get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
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
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax effect on scroll
function setupParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Sticky header effect
        const header = document.querySelector('header');
        if (!header) return;
        
        if (scrolled > 100) {
            header.style.backgroundColor = 'rgba(13, 27, 42, 0.98)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(13, 27, 42, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Building Construction Animation with Three.js
function initBuildingConstruction() {
    const container = document.getElementById('tool-container');
    if (!container) return;
    
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.error('Three.js is not loaded. Cannot initialize building animation.');
        return;
    }
    
    // Create scene with construction site background
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0d1b2a); // Dark navy background
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(5, 8, 12);
    camera.lookAt(0, 4, 0);
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xf97316, 1.2);
    directionalLight.position.set(10, 20, 5);
    scene.add(directionalLight);
    
    // Create construction site ground
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x2d3748,
        roughness: 0.8
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    scene.add(ground);
    
    // Add construction site grid
    const gridHelper = new THREE.GridHelper(20, 20, 0x888888, 0x444444);
    gridHelper.position.y = -0.49;
    scene.add(gridHelper);
    
    // Create building foundation
    const foundationGeometry = new THREE.BoxGeometry(3, 0.5, 3);
    const foundationMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x4a5568,
        roughness: 0.9
    });
    const foundation = new THREE.Mesh(foundationGeometry, foundationMaterial);
    foundation.position.y = 0;
    scene.add(foundation);
    
    // Create building floors (will be animated)
    const floors = [];
    const floorColors = [
        0xf97316, // Construction orange - ground floor
        0xd4af37, // Gold - first floor
        0x2d3748, // Charcoal - second floor
        0x0d1b2a, // Navy - third floor
        0xf97316  // Orange - top floor
    ];
    
    // Create crane
    const craneGroup = new THREE.Group();
    
    // Crane base
    const craneBaseGeometry = new THREE.BoxGeometry(0.5, 1, 0.5);
    const craneBaseMaterial = new THREE.MeshStandardMaterial({ color: 0x718096 });
    const craneBase = new THREE.Mesh(craneBaseGeometry, craneBaseMaterial);
    craneBase.position.set(-4, 0.5, -2);
    craneGroup.add(craneBase);
    
    // Crane tower
    const craneTowerGeometry = new THREE.BoxGeometry(0.3, 12, 0.3);
    const craneTowerMaterial = new THREE.MeshStandardMaterial({ color: 0x4a5568 });
    const craneTower = new THREE.Mesh(craneTowerGeometry, craneTowerMaterial);
    craneTower.position.set(-4, 6, -2);
    craneGroup.add(craneTower);
    
    // Crane arm
    const craneArmGeometry = new THREE.BoxGeometry(8, 0.2, 0.2);
    const craneArmMaterial = new THREE.MeshStandardMaterial({ color: 0xf97316 });
    const craneArm = new THREE.Mesh(craneArmGeometry, craneArmMaterial);
    craneArm.position.set(0, 11.8, -2);
    craneGroup.add(craneArm);
    
    // Crane hook
    const craneHookGeometry = new THREE.ConeGeometry(0.1, 0.3, 8);
    const craneHookMaterial = new THREE.MeshStandardMaterial({ color: 0xd4af37 });
    const craneHook = new THREE.Mesh(craneHookGeometry, craneHookMaterial);
    craneHook.position.set(2, 10.5, -2);
    craneHook.rotation.x = Math.PI;
    craneGroup.add(craneHook);
    
    scene.add(craneGroup);
    
    // Construction materials pile
    const materialsGroup = new THREE.Group();
    
    // Create construction materials (bricks, beams, etc.)
    const materialPositions = [
        { x: 3, y: 0.3, z: 2 },
        { x: 4, y: 0.6, z: 1 },
        { x: 3.5, y: 0.9, z: 0 }
    ];
    
    materialPositions.forEach((pos, i) => {
        const materialGeometry = new THREE.BoxGeometry(0.5, 0.2, 0.3);
        const materialMaterial = new THREE.MeshStandardMaterial({ 
            color: i === 0 ? 0xf97316 : (i === 1 ? 0xd4af37 : 0x2d3748)
        });
        const material = new THREE.Mesh(materialGeometry, materialMaterial);
        material.position.set(pos.x, pos.y, pos.z);
        material.rotation.y = Math.random() * Math.PI;
        materialsGroup.add(material);
    });
    
    scene.add(materialsGroup);
    
    // Animation variables
    let currentFloor = 0;
    let animationTime = 0;
    let buildingComplete = false;
    const totalFloors = 5;
    const floorHeight = 1.2;
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const container = document.getElementById('tool-container');
        if (!container || !camera || !renderer) return;
        
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        animationTime += 0.02;
        
        // Rotate crane arm slowly
        craneArm.rotation.y = Math.sin(animationTime * 0.5) * 0.3;
        
        // Move crane hook up and down
        craneHook.position.y = 10.5 + Math.sin(animationTime * 1.5) * 2;
        craneHook.position.x = 2 + Math.cos(animationTime * 0.7) * 1;
        
        // Rotate materials slightly
        materialsGroup.rotation.y += 0.005;
        
        // Building construction animation
        if (!buildingComplete) {
            // Every 3 seconds, add a new floor
            const floorIndex = Math.floor(animationTime / 3);
            
            if (floorIndex > currentFloor && currentFloor < totalFloors) {
                currentFloor = floorIndex;
                
                // Create new floor
                const floorGeometry = new THREE.BoxGeometry(3, floorHeight, 3);
                const floorMaterial = new THREE.MeshStandardMaterial({ 
                    color: floorColors[currentFloor - 1],
                    roughness: 0.8,
                    transparent: true,
                    opacity: 0
                });
                const floor = new THREE.Mesh(floorGeometry, floorMaterial);
                floor.position.y = (currentFloor - 1) * floorHeight + 0.5;
                floor.userData.growTime = animationTime;
                floors.push(floor);
                scene.add(floor);
                
                // Add construction effect (wireframe)
                const edges = new THREE.EdgesGeometry(floorGeometry);
                const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ 
                    color: 0xffffff,
                    linewidth: 2
                }));
                floor.add(line);
            }
            
            // Animate floor construction (grow effect)
            floors.forEach((floor, index) => {
                const elapsed = animationTime - floor.userData.growTime;
                if (elapsed < 1) {
                    // Grow animation
                    floor.scale.y = elapsed;
                    floor.material.opacity = elapsed;
                } else {
                    // Finished growing
                    floor.scale.y = 1;
                    floor.material.opacity = 1;
                    
                    // Check if building is complete
                    if (index === totalFloors - 1 && elapsed > 2) {
                        buildingComplete = true;
                        // Add completion effect (pulse)
                        floor.material.emissive = new THREE.Color(0xd4af37);
                        floor.material.emissiveIntensity = 0.3;
                    }
                }
            });
            
            // Check if all floors are built
            if (currentFloor >= totalFloors && floors.length === totalFloors) {
                // All floors are built
                if (animationTime - floors[floors.length - 1].userData.growTime > 3) {
                    buildingComplete = true;
                }
            }
        } else {
            // Building complete - gentle pulse effect
            floors.forEach((floor, index) => {
                const pulse = Math.sin(animationTime * 2 + index) * 0.1 + 0.9;
                floor.scale.set(1, pulse, 1);
            });
        }
        
        // Slow camera rotation
        camera.position.x = 5 * Math.cos(animationTime * 0.05);
        camera.position.z = 12 * Math.sin(animationTime * 0.05);
        camera.lookAt(0, 8, 0);
        
        if (renderer && scene && camera) {
            renderer.render(scene, camera);
        }
    }
    
    // Start animation
    animate();
}

// Setup animations
function setupAnimations() {
    // Add animation classes to elements on page load
    document.body.classList.add('page-transition');
    
    // Add animation delay to skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
    
    // Add animation delay to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
        card.classList.add('fade-in');
    });
    
    // Add building construction progress indicator
    const toolContainer = document.getElementById('tool-container');
    if (toolContainer) {
        const progressIndicator = document.createElement('div');
        progressIndicator.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 0;
            right: 0;
            text-align: center;
            color: var(--construction-gold);
            font-size: 14px;
            font-weight: bold;
            z-index: 10;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
        `;
        progressIndicator.id = 'construction-progress';
        progressIndicator.innerHTML = '🏗️ Building Construction Simulation';
        toolContainer.appendChild(progressIndicator);
    }
}

// Handle window resize with debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener('resize', debounce(function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && navLinks) {
        navLinks.classList.remove('active');
        if (mobileMenuBtn) {
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
}, 250));
