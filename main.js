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
    initContinuousBuildingAnimation(); // Continuous animation
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

// Continuous Building Construction Animation
function initContinuousBuildingAnimation() {
    const container = document.getElementById('tool-container');
    if (!container) return;
    
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.error('Three.js is not loaded. Cannot initialize building animation.');
        return;
    }
    
    // Make container larger for 1/3 screen
    const screenWidth = window.innerWidth;
    const containerSize = Math.min(screenWidth * 0.33, 400); // 1/3 of screen or max 400px
    container.style.width = containerSize + 'px';
    container.style.height = containerSize + 'px';
    
    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0d1b2a);
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(8, 7, 12);
    camera.lookAt(0, 5, 0);
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(containerSize, containerSize);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xf97316, 1.2);
    directionalLight.position.set(10, 15, 10);
    scene.add(directionalLight);
    
    // Create ground
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x2d3748,
        roughness: 0.9
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    scene.add(ground);
    
    // Add grid
    const gridHelper = new THREE.GridHelper(20, 20, 0x4a5568, 0x2d3748);
    gridHelper.position.y = -0.49;
    scene.add(gridHelper);
    
    // Building foundation
    const foundationGeometry = new THREE.BoxGeometry(4, 0.5, 4);
    const foundationMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x4a5568
    });
    const foundation = new THREE.Mesh(foundationGeometry, foundationMaterial);
    foundation.position.y = 0;
    scene.add(foundation);
    
    // Simple crane
    const craneGroup = new THREE.Group();
    
    const craneBase = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 1.5, 0.5),
        new THREE.MeshStandardMaterial({ color: 0x718096 })
    );
    craneBase.position.set(-6, 0.75, -3);
    craneGroup.add(craneBase);
    
    const craneArm = new THREE.Mesh(
        new THREE.BoxGeometry(10, 0.15, 0.15),
        new THREE.MeshStandardMaterial({ color: 0xf97316 })
    );
    craneArm.position.set(-1, 6, -3);
    craneGroup.add(craneArm);
    
    const craneHook = new THREE.Mesh(
        new THREE.ConeGeometry(0.2, 0.5, 8),
        new THREE.MeshStandardMaterial({ color: 0xd4af37 })
    );
    craneHook.position.set(3, 4, -3);
    craneHook.rotation.x = Math.PI;
    craneGroup.add(craneHook);
    
    scene.add(craneGroup);
    
    // Building parameters
    const buildingWidth = 4;
    const buildingDepth = 4;
    const floorHeight = 1;
    const totalFloors = 5;
    const floors = [];
    const floorColors = [
        0xf97316, // Orange
        0xd4af37, // Gold
        0x2d3748, // Charcoal
        0x0d1b2a, // Navy
        0xf97316  // Orange (top)
    ];
    
    // Animation variables
    let animationTime = 0;
    let currentCycle = 0;
    let floorsBuilt = 0;
    let buildingState = 'constructing'; // constructing, complete, resetting
    
    // Create all floors initially (hidden)
    for (let i = 0; i < totalFloors; i++) {
        const floorGeometry = new THREE.BoxGeometry(buildingWidth, floorHeight, buildingDepth);
        const floorMaterial = new THREE.MeshStandardMaterial({ 
            color: floorColors[i],
            transparent: true,
            opacity: 0
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.position.y = i * floorHeight + 0.5;
        floor.scale.y = 0.1;
        floor.userData.index = i;
        floors.push(floor);
        scene.add(floor);
        
        // Add construction lines
        const edges = new THREE.EdgesGeometry(floorGeometry);
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ 
            color: 0xffffff
        }));
        floor.add(line);
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const container = document.getElementById('tool-container');
        if (!container || !camera || !renderer) return;
        
        const screenWidth = window.innerWidth;
        const containerSize = Math.min(screenWidth * 0.33, 400);
        container.style.width = containerSize + 'px';
        container.style.height = containerSize + 'px';
        
        renderer.setSize(containerSize, containerSize);
        camera.aspect = 1;
        camera.updateProjectionMatrix();
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        animationTime += 0.016; // ~60fps
        const cycleTime = animationTime % 8; // 8-second cycle
        
        // Camera movement (continuous slow rotation)
        camera.position.x = 8 * Math.cos(animationTime * 0.1);
        camera.position.z = 12 * Math.sin(animationTime * 0.1);
        camera.lookAt(0, 6, 0);
        
        // Crane movement
        craneArm.rotation.y = Math.sin(animationTime * 1.5) * 0.4;
        craneHook.position.x = 3 + Math.cos(animationTime * 2) * 2;
        craneHook.position.y = 4 + Math.sin(animationTime * 3) * 1.5;
        
        // Building construction cycle
        if (cycleTime < 6) {
            // Construction phase (6 seconds)
            buildingState = 'constructing';
            const constructionProgress = cycleTime / 6; // 0 to 1
            
            // Determine which floor should be visible
            const targetFloor = Math.floor(constructionProgress * totalFloors);
            
            // Update floors
            floors.forEach((floor, index) => {
                if (index <= targetFloor) {
                    // This floor should be (partially) visible
                    const floorProgress = (constructionProgress - (index / totalFloors)) * totalFloors;
                    
                    if (floorProgress >= 0 && floorProgress <= 0.8) {
                        // Grow animation
                        const growProgress = Math.min(floorProgress * 1.25, 1);
                        floor.scale.y = 0.1 + (growProgress * 0.9);
                        floor.material.opacity = growProgress;
                    } else if (floorProgress > 0.8) {
                        // Fully grown
                        floor.scale.y = 1;
                        floor.material.opacity = 1;
                    }
                } else {
                    // Floor not built yet
                    floor.scale.y = 0.1;
                    floor.material.opacity = 0;
                }
                
                // Gentle pulse for completed floors
                if (index <= targetFloor - 1) {
                    const pulse = Math.sin(animationTime * 2 + index) * 0.05 + 1;
                    floor.scale.set(pulse, pulse, pulse);
                }
            });
            
            floorsBuilt = targetFloor + 1;
            
        } else {
            // Completion phase (2 seconds) - building complete, gentle pulse
            buildingState = 'complete';
            const completeProgress = (cycleTime - 6) / 2;
            
            // All floors visible and pulsing
            floors.forEach((floor, index) => {
                floor.scale.y = 1;
                floor.material.opacity = 1;
                
                // Pulsing effect
                const pulse = Math.sin(animationTime * 3 + index) * 0.1 + 1;
                floor.scale.set(pulse, pulse, pulse);
                
                // Glow effect on top floor
                if (index === totalFloors - 1) {
                    floor.material.emissive = new THREE.Color(0xd4af37);
                    floor.material.emissiveIntensity = 0.2 + Math.sin(animationTime * 4) * 0.1;
                }
            });
            
            // Reset after completion phase
            if (completeProgress >= 0.95) {
                // Reset for next cycle
                floorsBuilt = 0;
                currentCycle++;
            }
        }
        
        // Render the scene
        renderer.render(scene, camera);
    }
    
    // Start animation
    animate();
    
    // Add animation label
    const animationLabel = document.createElement('div');
    animationLabel.style.cssText = `
        position: absolute;
        bottom: 15px;
        left: 0;
        right: 0;
        text-align: center;
        color: #d4af37;
        font-size: 14px;
        font-weight: bold;
        z-index: 10;
        font-family: 'Montserrat', sans-serif;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
        letter-spacing: 1px;
    `;
    animationLabel.innerHTML = '🏗️ Continuous Construction';
    container.appendChild(animationLabel);
}

// Setup animations
function setupAnimations() {
    document.body.classList.add('page-transition');
    
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
        card.classList.add('fade-in');
    });
}

// Handle window resize
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
    if (window.innerWidth > 768 && navLinks) {
        navLinks.classList.remove('active');
        if (mobileMenuBtn) {
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
}, 250));
