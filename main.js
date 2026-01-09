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
    initFastBuildingAnimation(); // Fast 4-second animation
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

// Fast 4-Second Building Construction Animation
function initFastBuildingAnimation() {
    const container = document.getElementById('tool-container');
    if (!container) return;
    
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.error('Three.js is not loaded. Cannot initialize building animation.');
        return;
    }
    
    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0d1b2a);
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(6, 5, 8);
    camera.lookAt(0, 3, 0);
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(250, 250);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xf97316, 1);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);
    
    // Create ground
    const groundGeometry = new THREE.PlaneGeometry(15, 15);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x2d3748,
        roughness: 0.9
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    scene.add(ground);
    
    // Add grid
    const gridHelper = new THREE.GridHelper(15, 15, 0x4a5568, 0x2d3748);
    gridHelper.position.y = -0.49;
    scene.add(gridHelper);
    
    // Building foundation
    const foundationGeometry = new THREE.BoxGeometry(3, 0.4, 3);
    const foundationMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x4a5568
    });
    const foundation = new THREE.Mesh(foundationGeometry, foundationMaterial);
    foundation.position.y = 0;
    scene.add(foundation);
    
    // Simple crane
    const craneGroup = new THREE.Group();
    
    const craneBase = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 1, 0.4),
        new THREE.MeshStandardMaterial({ color: 0x718096 })
    );
    craneBase.position.set(-4, 0.5, -2);
    craneGroup.add(craneBase);
    
    const craneArm = new THREE.Mesh(
        new THREE.BoxGeometry(6, 0.1, 0.1),
        new THREE.MeshStandardMaterial({ color: 0xf97316 })
    );
    craneArm.position.set(-1, 4, -2);
    craneGroup.add(craneArm);
    
    scene.add(craneGroup);
    
    // Animation variables
    let animationTime = 0;
    let currentFloor = 0;
    let buildingComplete = false;
    const totalAnimationTime = 4;
    const totalFloors = 4;
    const floorHeight = 0.8;
    const floors = [];
    const floorColors = [0xf97316, 0xd4af37, 0x2d3748, 0x0d1b2a];
    
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
        
        animationTime += 0.016;
        const progress = Math.min(animationTime / totalAnimationTime, 1);
        
        // Camera movement
        camera.position.x = 6 * Math.cos(progress * Math.PI * 0.5);
        camera.position.z = 8 * Math.sin(progress * Math.PI * 0.5);
        camera.lookAt(0, 3, 0);
        
        // Crane movement
        craneArm.rotation.y = Math.sin(progress * Math.PI * 4) * 0.3;
        
        // Building construction
        if (!buildingComplete) {
            const targetFloor = Math.floor(progress * totalFloors);
            
            while (currentFloor < targetFloor && currentFloor < totalFloors) {
                currentFloor++;
                
                const floorGeometry = new THREE.BoxGeometry(3, floorHeight, 3);
                const floorMaterial = new THREE.MeshStandardMaterial({ 
                    color: floorColors[currentFloor - 1],
                    transparent: true,
                    opacity: 0
                });
                const floor = new THREE.Mesh(floorGeometry, floorMaterial);
                floor.position.y = (currentFloor - 1) * floorHeight + 0.4;
                floor.scale.y = 0.1;
                floors.push(floor);
                scene.add(floor);
                
                const edges = new THREE.EdgesGeometry(floorGeometry);
                const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ 
                    color: 0xffffff
                }));
                floor.add(line);
            }
            
            floors.forEach((floor, index) => {
                const floorProgress = (progress - (index / totalFloors)) * totalFloors;
                
                if (floorProgress >= 0 && floorProgress <= 0.5) {
                    const growProgress = Math.min(floorProgress * 2, 1);
                    floor.scale.y = 0.1 + (growProgress * 0.9);
                    floor.material.opacity = growProgress;
                } else if (floorProgress > 0.5) {
                    floor.scale.y = 1;
                    floor.material.opacity = 1;
                }
                
                if (progress >= 0.9 && index === floors.length - 1) {
                    const pulse = Math.sin(animationTime * 5) * 0.05 + 1;
                    floor.scale.set(pulse, pulse, pulse);
                }
            });
            
            if (progress >= 0.9 && currentFloor >= totalFloors) {
                buildingComplete = true;
            }
        }
        
        renderer.render(scene, camera);
    }
    
    // Start animation
    animate();
    
    // Add label
    const progressText = document.createElement('div');
    progressText.style.cssText = `
        position: absolute;
        bottom: 10px;
        left: 0;
        right: 0;
        text-align: center;
        color: #d4af37;
        font-size: 11px;
        font-weight: bold;
        z-index: 10;
        font-family: 'Montserrat', sans-serif;
    `;
    progressText.innerHTML = '🏗️ Building Construction';
    container.appendChild(progressText);
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
