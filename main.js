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
    initBurjKhalifaAnimation();
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
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const subject = this.querySelectorAll('input[type="text"]')[1].value.trim();
        const message = this.querySelector('textarea').value.trim();
        
        if (!name || !email || !subject || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
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

// Burj Khalifa Style Continuous Building Animation
function initBurjKhalifaAnimation() {
    const container = document.getElementById('tool-container');
    if (!container) return;
    
    if (typeof THREE === 'undefined') {
        console.error('Three.js is not loaded.');
        return;
    }
    
    // Make container responsive
    const containerSize = Math.min(window.innerWidth * 0.4, 400);
    container.style.width = containerSize + 'px';
    container.style.height = containerSize + 'px';
    
    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0d1b2a);
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(12, 15, 18);
    camera.lookAt(0, 20, 0);
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(containerSize, containerSize);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xf97316, 1.5);
    directionalLight.position.set(15, 30, 15);
    scene.add(directionalLight);
    
    // Create sky background
    const skyGeometry = new THREE.SphereGeometry(100, 32, 32);
    const skyMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x0d1b2a,
        side: THREE.BackSide
    });
    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    scene.add(sky);
    
    // Add some stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 500;
    const starsPositions = new Float32Array(starsCount * 3);
    
    for (let i = 0; i < starsCount * 3; i += 3) {
        starsPositions[i] = (Math.random() - 0.5) * 200;
        starsPositions[i + 1] = (Math.random() - 0.5) * 200;
        starsPositions[i + 2] = (Math.random() - 0.5) * 200;
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
    const starsMaterial = new THREE.PointsMaterial({ 
        color: 0xffffff,
        size: 0.5,
        transparent: true,
        opacity: 0.8
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
    
    // Create ground
    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1a2a3a,
        roughness: 0.8
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1;
    scene.add(ground);
    
    // Create Burj Khalifa foundation
    const foundationGeometry = new THREE.CylinderGeometry(4, 4, 1, 32);
    const foundationMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x4a5568,
        roughness: 0.9
    });
    const foundation = new THREE.Mesh(foundationGeometry, foundationMaterial);
    foundation.position.y = 0.5;
    scene.add(foundation);
    
    // Building parameters
    const totalSections = 8;
    const baseRadius = 3.5;
    const topRadius = 0.8;
    const totalHeight = 35;
    const sections = [];
    const sectionColors = [
        0x4a5568, 0x2d3748, 0x0d1b2a, 0x1a2a3a,
        0xf97316, 0xd4af37, 0x2d3748, 0x0d1b2a
    ];
    
    // Create construction cranes
    const cranes = [];
    const cranePositions = [
        { x: -8, z: -5 },
        { x: 6, z: -7 },
        { x: -5, z: 6 }
    ];
    
    cranePositions.forEach((pos, index) => {
        const craneGroup = new THREE.Group();
        
        // Crane base
        const craneBase = new THREE.Mesh(
            new THREE.CylinderGeometry(0.3, 0.5, 2, 8),
            new THREE.MeshStandardMaterial({ color: 0x718096 })
        );
        craneBase.position.set(pos.x, 1, pos.z);
        craneGroup.add(craneBase);
        
        // Crane tower
        const craneTower = new THREE.Mesh(
            new THREE.BoxGeometry(0.2, 25, 0.2),
            new THREE.MeshStandardMaterial({ color: 0x4a5568 })
        );
        craneTower.position.set(pos.x, 12.5, pos.z);
        craneGroup.add(craneTower);
        
        // Crane arm
        const craneArmLength = 8 + index * 2;
        const craneArm = new THREE.Mesh(
            new THREE.BoxGeometry(craneArmLength, 0.1, 0.1),
            new THREE.MeshStandardMaterial({ color: 0xf97316 })
        );
        craneArm.position.set(pos.x + craneArmLength/2 - 2, 24, pos.z);
        craneGroup.add(craneArm);
        
        craneGroup.userData = {
            basePos: { x: pos.x, z: pos.z },
            armLength: craneArmLength,
            speed: 0.5 + index * 0.2
        };
        
        cranes.push(craneGroup);
        scene.add(craneGroup);
    });
    
    // Create building sections
    for (let i = 0; i < totalSections; i++) {
        const sectionHeight = totalHeight / totalSections;
        const radiusRatio = i / totalSections;
        const radius = baseRadius * (1 - radiusRatio * 0.7) + topRadius * (radiusRatio * 0.3);
        const nextRadius = baseRadius * (1 - (i + 1) / totalSections * 0.7) + topRadius * ((i + 1) / totalSections * 0.3);
        
        const sectionGeometry = new THREE.CylinderGeometry(
            nextRadius,
            radius,
            sectionHeight,
            16
        );
        
        const sectionMaterial = new THREE.MeshStandardMaterial({ 
            color: sectionColors[i],
            transparent: true,
            opacity: 0
        });
        
        const section = new THREE.Mesh(sectionGeometry, sectionMaterial);
        section.position.y = i * sectionHeight + 1;
        section.scale.y = 0.1;
        section.userData = {
            index: i,
            targetHeight: sectionHeight
        };
        
        sections.push(section);
        scene.add(section);
        
        // Add construction grid
        const edges = new THREE.EdgesGeometry(sectionGeometry);
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ 
            color: 0xffffff,
            linewidth: 1
        }));
        section.add(line);
    }
    
    // Add spire at the top
    const spireGeometry = new THREE.CylinderGeometry(0.3, 0.5, 8, 8);
    const spireMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xd4af37,
        emissive: 0xd4af37,
        emissiveIntensity: 0.3
    });
    const spire = new THREE.Mesh(spireGeometry, spireMaterial);
    spire.position.y = totalHeight + 1 + 4;
    spire.visible = false;
    scene.add(spire);
    
    // Animation variables
    let animationTime = 0;
    const totalCycleTime = 12;
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (!container || !camera || !renderer) return;
        
        const newSize = Math.min(window.innerWidth * 0.4, 400);
        container.style.width = newSize + 'px';
        container.style.height = newSize + 'px';
        
        renderer.setSize(newSize, newSize);
        camera.aspect = 1;
        camera.updateProjectionMatrix();
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        animationTime += 0.016;
        const cycleTime = animationTime % totalCycleTime;
        const progress = cycleTime / totalCycleTime;
        
        // Smooth camera rotation
        const cameraRadius = 25;
        const cameraHeight = 20 + Math.sin(animationTime * 0.05) * 5;
        camera.position.x = cameraRadius * Math.cos(animationTime * 0.1);
        camera.position.z = cameraRadius * Math.sin(animationTime * 0.1);
        camera.position.y = cameraHeight;
        camera.lookAt(0, 15, 0);
        
        // Animate cranes
        cranes.forEach((crane, index) => {
            const data = crane.userData;
            const arm = crane.children[2];
            arm.rotation.y = Math.sin(animationTime * data.speed) * 0.5;
        });
        
        // Rotate stars slowly
        stars.rotation.y += 0.0005;
        
        // Building construction animation
        if (cycleTime < 10) {
            const constructionProgress = cycleTime / 10;
            const targetSection = Math.floor(constructionProgress * totalSections);
            
            sections.forEach((section, index) => {
                if (index <= targetSection) {
                    const sectionProgress = (constructionProgress - (index / totalSections)) * totalSections;
                    
                    if (sectionProgress >= 0 && sectionProgress <= 0.7) {
                        const growProgress = Math.min(sectionProgress * 1.428, 1);
                        section.scale.y = 0.1 + (growProgress * 0.9);
                        section.material.opacity = growProgress * 0.9;
                        
                        const pulse = Math.sin(animationTime * 3) * 0.05 + 1;
                        section.scale.x = pulse;
                        section.scale.z = pulse;
                    } else if (sectionProgress > 0.7 && sectionProgress <= 0.9) {
                        section.scale.y = 1;
                        section.material.opacity = 0.9 + (sectionProgress - 0.7) * 0.5;
                    } else if (sectionProgress > 0.9) {
                        section.scale.y = 1;
                        section.material.opacity = 1;
                        const glow = Math.sin(animationTime * 2 + index) * 0.05 + 0.95;
                        section.scale.set(glow, 1, glow);
                    }
                } else {
                    section.scale.y = 0.1;
                    section.material.opacity = 0;
                }
            });
            
            if (targetSection >= totalSections - 1 && constructionProgress > 0.95) {
                spire.visible = true;
                const spireProgress = (constructionProgress - 0.95) * 20;
                spire.scale.y = Math.min(spireProgress, 1);
                spire.material.emissiveIntensity = 0.3 + Math.sin(animationTime * 3) * 0.2;
            } else {
                spire.visible = false;
            }
        } else {
            const celebrationProgress = (cycleTime - 10) / 2;
            
            sections.forEach((section, index) => {
                section.scale.y = 1;
                section.material.opacity = 1;
                
                const pulseSpeed = 3 + index * 0.5;
                const pulse = Math.sin(animationTime * pulseSpeed + index) * 0.1 + 1;
                section.scale.set(pulse, 1, pulse);
                
                if (celebrationProgress > 0.5) {
                    const hueShift = Math.sin(animationTime * 2 + index) * 0.1;
                    section.material.color.offsetHSL(hueShift, 0, 0);
                }
            });
            
            spire.visible = true;
            spire.scale.y = 1;
            spire.material.emissiveIntensity = 0.5 + Math.sin(animationTime * 5) * 0.3;
        }
        
        renderer.render(scene, camera);
    }
    
    // Start animation
    animate();
    
 
   
  
}



