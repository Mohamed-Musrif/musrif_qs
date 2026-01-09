/* ===== CSS Variables ===== */
:root {
    --primary-dark: #0d1b2a;
    --primary-blue: #1b263b;
    --secondary-blue: #415a77;
    --accent-blue: #778da9;
    --light-blue: #e0e1dd;
    --construction-orange: #f97316;
    --construction-gold: #d4af37;
    --success-green: #10b981;
    --text-light: #f8f9fa;
    --text-dark: #212529;
    --shadow: rgba(0, 0, 0, 0.1);
    --transition: all 0.3s ease;
}

/* ===== Base Styles ===== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Open Sans', sans-serif;
    line-height: 1.6;
    color: var(--text-dark);
    background-color: var(--text-light);
    overflow-x: hidden;
}

h1, h2, h3, h4 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--primary-dark);
}

h1 {
    font-size: 2.5rem;
    line-height: 1.2;
}

h2 {
    font-size: 2rem;
    position: relative;
    display: inline-block;
    margin-bottom: 2.5rem;
}

h2:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background-color: var(--construction-orange);
}

p {
    margin-bottom: 1rem;
}

.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    
    padding: 0 5rem;
}

section {
    padding: 2.5rem 0;
}

.section-title {
    text-align: center;
    margin-bottom: 3rem;
}

.section-title h2:after {
    left: 50%;
    transform: translateX(-50%);
}

/* ===== Navigation ===== */
header {
    background-color: rgba(13, 27, 42, 0.95);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: var(--transition);
}

.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem 1.5rem;
}

/* ===== Professional QS Logo with Construction Elements ===== */
.logo {
    font-family: 'Montserrat', sans-serif;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    position: relative;
}

.logo .qs-container {
    position: relative;
    width: 50px;
    height: 50px;
}

.logo .qs-badge {
    background: linear-gradient(135deg, var(--construction-orange) 0%, #e55d00 100%);
    color: var(--text-light);
    width: 100%;
    height: 100%;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    font-weight: 800;
    position: relative;
    z-index: 2;
    box-shadow: 0 6px 15px rgba(249, 115, 22, 0.3);
    border: 2px solid rgba(255, 255, 255, 0.15);
    transition: var(--transition);
    overflow: hidden;
}

.logo .qs-badge:before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
        to bottom right,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0.05) 50%,
        transparent 50%,
        transparent 100%
    );
    transform: rotate(45deg);
}

.logo .qs-badge:after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    pointer-events: none;
}

/* Construction elements around QS badge */
.logo .construction-ring {
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border: 2px solid var(--construction-gold);
    border-radius: 12px;
    opacity: 0.7;
    z-index: 1;
    animation: rotate-ring 20s linear infinite;
}

.logo .construction-ring:before,
.logo .construction-ring:after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    background: var(--construction-gold);
    border-radius: 50%;
}

.logo .construction-ring:before {
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
}

.logo .construction-ring:after {
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
}

/* Ruler element */
.logo .ruler-element {
    position: absolute;
    top: 50%;
    right: -8px;
    width: 25px;
    height: 4px;
    background: var(--construction-gold);
    transform: translateY(-50%) rotate(45deg);
    border-radius: 2px;
    z-index: 3;
    opacity: 0.8;
}

.logo .ruler-element:before,
.logo .ruler-element:after {
    content: '';
    position: absolute;
    width: 3px;
    height: 10px;
    background: var(--construction-gold);
    top: 50%;
    transform: translateY(-50%);
}

.logo .ruler-element:before {
    left: 4px;
}

.logo .ruler-element:after {
    right: 4px;
}

/* Hammer element */
.logo .hammer-element {
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 4px;
    background: var(--construction-orange);
    border-radius: 2px;
    z-index: 3;
    opacity: 0.8;
}

.logo .hammer-element:before {
    content: '';
    position: absolute;
    width: 8px;
    height: 12px;
    background: var(--construction-orange);
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
}

/* Text styling */
.logo .logo-text {
    display: flex;
    flex-direction: column;
    line-height: 1.1;
    padding-left: 0.5rem;
}

.logo .name {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--text-light);
    letter-spacing: 0.8px;
    white-space: nowrap;
}

.logo .title-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.2rem;
}

.logo .title-line {
    width: 20px;
    height: 2px;
    background: var(--construction-orange);
    border-radius: 1px;
}

.logo .title {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--construction-gold);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    white-space: nowrap;
}

/* Hover effects */
.logo:hover .qs-badge {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(249, 115, 22, 0.4);
}

.logo:hover .construction-ring {
    animation-duration: 10s;
}

.logo:hover .ruler-element,
.logo:hover .hammer-element {
    opacity: 1;
}

/* Animations */
@keyframes rotate-ring {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

/* ===== Mobile Responsive Adjustments ===== */
@media (max-width: 992px) {
    .logo .name {
        font-size: 1.2rem;
        letter-spacing: 0.6px;
    }
    
    .logo .title {
        font-size: 0.75rem;
        letter-spacing: 1.2px;
    }
    
    .logo .qs-container {
        width: 45px;
        height: 45px;
    }
    
    .logo .qs-badge {
        font-size: 1.4rem;
    }
}

@media (max-width: 768px) {
    .logo .name {
        font-size: 1.1rem;
    }
    
    .logo .title {
        font-size: 0.7rem;
        letter-spacing: 1px;
    }
    
    .logo .title-container {
        gap: 0.3rem;
    }
    
    .logo .qs-container {
        width: 40px;
        height: 40px;
    }
    
    .logo .qs-badge {
        font-size: 1.2rem;
        border-radius: 8px;
    }
    
    .logo .construction-ring {
        top: -4px;
        left: -4px;
        right: -4px;
        bottom: -4px;
        border-width: 1.5px;
    }
    
    .logo .ruler-element {
        width: 20px;
        height: 3px;
        right: -6px;
    }
    
    .logo .hammer-element {
        width: 16px;
        height: 3px;
        bottom: -6px;
    }
}

@media (max-width: 576px) {
    .logo .logo-text {
        display: none;
    }
    
    .logo .qs-container {
        width: 45px;
        height: 45px;
    }
    
    .logo .qs-badge {
        font-size: 1.3rem;
    }
    
    .logo {
        gap: 0;
    }
}

@media (max-width: 380px) {
    .logo .qs-container {
        width: 40px;
        height: 40px;
    }
    
    .logo .qs-badge {
        font-size: 1.2rem;
    }
}

.nav-links {
    display: flex;
    list-style: none;
}

.nav-links li {
    margin-left: 2rem;
}

.nav-links a {
    color: var(--text-light);
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;
    transition: var(--transition);
    padding: 0.5rem 0;
    position: relative;
}

.nav-links a:hover {
    color: var(--construction-orange);
}

.nav-links a:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--construction-orange);
    transition: width 0.3s ease;
}

.nav-links a:hover:after {
    width: 100%;
}

.mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    color: var(--text-light);
    font-size: 1.5rem;
    cursor: pointer;
}

/* ===== Hero Section ===== */
.hero {
    background: linear-gradient(rgba(13, 27, 42, 0.85), rgba(13, 27, 42, 0.9)), url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80');
    background-size: cover;
    background-position: center;
    color: var(--text-light);
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    padding-top: 80px;
}

.hero .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
    padding-right: -40px; /* Added right padding */
}

.hero-content {
    flex: 1;
    min-width: 300px;
    max-width: 600px;
    padding-right: 20px; /* Added right padding */
}

.hero h1 {
    color: var(--text-light);
    font-size: 3rem;
    margin-bottom: 0.5rem;
}

.hero .title {
    color: var(--construction-gold);
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    font-weight: 600;
}

.qualifications {
    margin: 1.5rem 0;
}

.qual-item {
    display: flex;
    align-items: center;
    margin-bottom: 0.8rem;
    font-size: 1.1rem;
}

.qual-item i {
    color: var(--construction-gold);
    margin-right: 1rem;
    font-size: 1.2rem;
}

.specialization {
    font-size: 1.1rem;
    line-height: 1.6;
    margin: 1.5rem 0;
}

.ecommerce-section {
    background: rgba(255, 255, 255, 0.1);
    padding: 1.5rem;
    border-radius: 8px;
    margin: 2rem 0;
    border-left: 4px solid var(--construction-orange);
}

.ecommerce-section h3 {
    color: var(--construction-gold);
    font-size: 1.3rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
}

.ecommerce-section h3 i {
    margin-right: 0.8rem;
}

.ecommerce-list {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
}

.ecommerce-item {
    display: flex;
    align-items: center;
    font-size: 1rem;
}

.ecommerce-item i {
    color: var(--success-green);
    margin-right: 0.8rem;
    font-size: 0.9rem;
}

.cta-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-top: 2rem;
}

.btn {
    display: inline-block;
    padding: 1rem 2.5rem;
    background-color: var(--construction-orange);
    color: white;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 600;
    font-size: 1.1rem;
    transition: var(--transition);
    border: 2px solid var(--construction-orange);
    cursor: pointer;
    text-align: center;
}

.btn:hover {
    background-color: transparent;
    color: var(--construction-orange);
    transform: translateY(-3px);
}

.btn-outline {
    background-color: transparent;
    color: var(--text-light);
    border-color: var(--text-light);
}

.btn-outline:hover {
    background-color: var(--text-light);
    color: var(--primary-dark);
}

.download-btn {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    margin-top: 0.5rem;
}

/* ===== 3D Animation Container - UPDATED ===== */
#tool-container {
    flex: 0 0 500px; /* Increased from 380px */
    width: 100px; /* Increased from 380px */
    height: 600px; /* Increased from 380px */
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7);
    border: 4px solid var(--construction-gold);
    background: linear-gradient(135deg, rgba(13, 27, 42, 0.9) 0%, rgba(27, 38, 59, 0.8) 100%);
    position: relative;
    margin-right: -100px;
    margin-bottom: 40px;
}


#tool-container canvas {
    width: 100% !important;
    height: 100% !important;
    display: block;
}

/* Add overlay text for construction stages */
.construction-overlay {
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 100;
    pointer-events: none;
}

.stage-indicator {
    display: inline-block;
    background: rgba(13, 27, 42, 0.85);
    color: var(--construction-gold);
    padding: 8px 20px;
    border-radius: 25px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 1.1rem;
    border: 2px solid var(--construction-gold);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(5px);
}

/* Hide the animation label */
#tool-container div[style*="Burj Khalifa"] {
    display: none;
}

/* ===== About Section ===== */
.about {
    background-color: var(--light-blue);
}

.about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
}

.about-text h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.highlight-box {
    background-color: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 5px 15px var(--shadow);
    margin-top: 1.5rem;
    border-left: 4px solid var(--construction-orange);
}

.about-education h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
}

.education-item {
    background-color: white;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    box-shadow: 0 5px 15px var(--shadow);
}

.education-item h4 {
    color: var(--construction-orange);
    margin-bottom: 0.5rem;
}

/* ===== Skills Section ===== */
.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
}

.skill-card {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 5px 15px var(--shadow);
    transition: var(--transition);
    text-align: center;
}

.skill-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.skill-icon {
    font-size: 2.5rem;
    color: var(--construction-orange);
    margin-bottom: 1.5rem;
}

.skill-card h3 {
    margin-bottom: 1rem;
}

.software-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.8rem;
    margin-top: 1.5rem;
}

.software-badge {
    background-color: var(--light-blue);
    color: var(--primary-dark);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    transition: var(--transition);
}

.software-badge:hover {
    background-color: var(--construction-orange);
    color: white;
}

/* ===== Projects Section ===== */
.projects {
    background-color: var(--light-blue);
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2.5rem;
}

.project-card {
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 5px 15px var(--shadow);
    transition: var(--transition);
}

.project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.project-img {
    height: 200px;
    background-color: var(--secondary-blue);
    position: relative;
}

.project-content {
    padding: 1.5rem;
}

.project-content h3 {
    margin-bottom: 0.8rem;
}

.project-role {
    color: var(--construction-orange);
    font-weight: 600;
    margin-bottom: 1rem;
    display: block;
}

.responsibilities {
    list-style-type: none;
    margin-top: 1rem;
}

.responsibilities li {
    margin-bottom: 0.5rem;
    padding-left: 1.5rem;
    position: relative;
}

.responsibilities li:before {
    content: '▸';
    position: absolute;
    left: 0;
    color: var(--construction-orange);
}

/* ===== Certifications Section ===== */
.certifications-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
}

.cert-card {
    background-color: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 5px 15px var(--shadow);
    transition: var(--transition);
    border-top: 3px solid var(--construction-gold);
}

.cert-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.cert-card h3 {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
}

.cert-provider {
    color: var(--construction-orange);
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.cert-date {
    color: var(--accent-blue);
    font-size: 0.9rem;
}

/* ===== Contact Section ===== */
.contact {
    background-color: var(--primary-dark);
    color: var(--text-light);
}

.contact h2, .contact h3 {
    color: var(--text-light);
}

.contact h2:after {
    background-color: var(--construction-gold);
}

.contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
}

.contact-info {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.contact-item {
    display: flex;
    align-items: flex-start;
    gap: 1.2rem;
    
}

.contact-icon {
    background-color: rgba(255, 255, 255, 0.1);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    color: var(--construction-gold);
    flex-shrink: 0;
}

.contact-text h4 {
    color: var(--construction-orange);
    margin-bottom: 0.3rem;
}

.contact-text a {
    color: var(--text-light);
    text-decoration: none;
    transition: var(--transition);
}

.contact-text a:hover {
    color: var(--construction-gold);
}

.social-links {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
}

.social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: var(--text-light);
    font-size: 1.2rem;
    transition: var(--transition);
}

.social-link:hover {
    background-color: var(--construction-orange);
    transform: translateY(-3px);
}

.contact-form {
    background-color: rgba(255, 255, 255, 0.05);
    padding: 2rem;
    border-radius: 8px;
}

.contact-form h3 {
    margin-bottom: 1.5rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
    color: var(--text-light);
    font-family: 'Open Sans', sans-serif;
    font-size: 1rem;
}

.form-group textarea {
    min-height: 150px;
    resize: vertical;
}

.contact-form .btn {
    width: 100%;
}

/* ===== Footer ===== */
footer {
    background-color: var(--primary-blue);
    color: var(--text-light);
    text-align: center;
    padding: 2rem 0;
    font-size: 0.9rem;
}

/* ===== Animations ===== */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    animation: fadeIn 1s ease-out;
}

/* ===== Responsive Design ===== */
@media (max-width: 1200px) {
    .hero .container {
        flex-direction: column;
        text-align: center;
        padding-right: 1.5rem; /* Reset padding for mobile */
    }
    
    .hero-content {
        max-width: 800px;
        padding-right: 0; /* Reset padding for mobile */
    }
    
    #tool-container {
        margin-right: 0; /* Reset margin for mobile */
        margin-top: 2rem;
        width: 350px;
        height: 350px;
        flex: 0 0 350px;
    }
}

@media (max-width: 992px) {
    .about-content,
    .contact-content {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    
    .hero h1 {
        font-size: 2.5rem;
    }
    
    .hero .title {
        font-size: 1.5rem;
    }
    
    .qual-item {
        justify-content: center;
    }
    
    .ecommerce-item {
        justify-content: center;
    }
    
    #tool-container {
        width: 320px;
        height: 320px;
        flex: 0 0 320px;
    }
}

@media (max-width: 768px) {
    section {
        padding: 4rem 0;
    }

    .nav-links {
        position: fixed;
        top: 70px;
        left: 0;
        width: 100%;
        background-color: var(--primary-dark);
        flex-direction: column;
        align-items: center;
        padding: 2rem 0;
        clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
        transition: clip-path 0.4s ease;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }

    .nav-links.active {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }

    .nav-links li {
        margin: 1rem 0;
    }

    .mobile-menu-btn {
        display: block;
    }

    #tool-container {
        width: 300px;
        height: 300px;
        flex: 0 0 300px;
    }
    
    .cta-buttons {
        justify-content: center;
    }
}

@media (max-width: 576px) {
    h1 {
        font-size: 2.2rem;
    }
    
    h2 {
        font-size: 1.8rem;
    }
    
    .hero h1 {
        font-size: 2.2rem;
    }
    
    .cta-buttons {
        flex-direction: column;
        align-items: center;
    }
    
    .btn {
        width: 100%;
        max-width: 250px;
    }
    
    .skills-grid,
    .projects-grid,
    .certifications-grid {
        grid-template-columns: 1fr;
    }
    
    #tool-container {
        width: 280px;
        height: 280px;
        flex: 0 0 280px;
    }
}

@media (max-width: 480px) {
    #tool-container {
        width: 260px;
        height: 260px;
        flex: 0 0 260px;
    }
    
    .container {
        padding: 0 6rem;
        padding-top: 50px;
    }
    
    .hero-content {
        padding: 0 1rem;
    }
    
    .contact-form {
        padding: 1.5rem;
    }
}

@media (max-width: 380px) {
    #tool-container {
        width: 240px;
        height: 240px;
        flex: 0 0 240px;
    }
}

/* ===== Professional Experience Project Styles ===== */
.professional-project {
    grid-column: 1 / -1;
    background: white;
    border-radius: 12px;
    padding: 2.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    margin-bottom: 3rem;
    border-top: 4px solid var(--construction-orange);
}

.project-header {
    margin-bottom: 1.5rem;
    border-bottom: 2px solid var(--light-blue);
    padding-bottom: 1.5rem;
}

.project-header h3 {
    color: var(--primary-dark);
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
}

.commercial-summary {
    display: grid;
    flex-wrap: wrap;
    gap: 0.2rem;
    margin-top: 1rem;
    font-size: 0.95rem;
    color: var(--secondary-blue);
}

.commercial-summary div {
    background: var(--light-blue);
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border-left: 3px solid var(--construction-gold);
}

.project-role {
    color: var(--construction-orange);
    font-weight: 600;
    font-size: 1.1rem;
    display: block;
}

.project-description {
    background: rgba(249, 115, 22, 0.05);
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    border-left: 4px solid var(--construction-gold);
}

.project-description p {
    margin-bottom: 0;
    line-height: 1.6;
    color: var(--text-dark);
}

.project-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
}

@media (max-width: 992px) {
    .project-details {
        grid-template-columns: 1fr;
    }
}

.detail-column {
    background: var(--light-blue);
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.detail-section h4 {
    color: var(--construction-orange);
    font-size: 1.2rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.detail-section ul {
    list-style: none;
    padding-left: 0;
}

.detail-section li {
    margin-bottom: 0.8rem;
    padding-left: 1.5rem;
    position: relative;
    color: var(--text-dark);
    line-height: 1.5;
}

.detail-section li:before {
    content: '';
    position: absolute;
    left: 0;
    color: var(--success-green);
}

.detail-section li i {
    position: absolute;
    left: 0;
    top: 0.2rem;
    color: var(--success-green);
    font-size: 0.9rem;
}

.project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--light-blue);
}

.project-tag {
    background: var(--light-blue);
    color: var(--primary-dark);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    border: 1px solid rgba(0, 0, 0, 0.1);
    transition: var(--transition);
}

.project-tag:hover {
    background: var(--construction-orange);
    color: white;
    transform: translateY(-2px);
}

/* Update existing projects grid for consistency */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2.5rem;
}

.project-card.academic {
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 5px 15px var(--shadow);
    transition: var(--transition);
    height: 100%;
    display: flex;
    flex-direction: column;
}

.project-card.academic:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.project-card.academic .project-img {
    height: 180px;
    background-color: var(--secondary-blue);
    position: relative;
}

.project-card.academic .project-content {
    padding: 1.5rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.project-card.academic h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: var(--primary-dark);
}

.project-card.academic .project-role {
    color: var(--construction-orange);
    font-weight: 600;
    margin-bottom: 0.8rem;
    font-size: 0.9rem;
}

.project-card.academic p {
    margin-bottom: 1rem;
    color: var(--text-dark);
    flex-grow: 1;
}

.project-card.academic .responsibilities {
    list-style: none;
    padding-left: 0;
    margin-top: 1rem;
}

.project-card.academic .responsibilities li {
    margin-bottom: 0.5rem;
    padding-left: 1.2rem;
    position: relative;
    font-size: 0.9rem;
    color: var(--text-dark);
}

.project-card.academic .responsibilities li:before {
    content: '▸';
    position: absolute;
    left: 0;
    color: var(--construction-orange);
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .professional-project {
        padding: 1.5rem;
    }
    
    .project-header h3 {
        font-size: 1.5rem;
    }
    
    .commercial-summary {
        flex-direction: column;
        gap: 0.8rem;
    }
    
    .detail-section h4 {
        font-size: 1.1rem;
    }
    
    .detail-section li {
        font-size: 0.9rem;
    }
    
    .project-tag {
        font-size: 0.8rem;
        padding: 0.4rem 0.8rem;
    }
}

@media (max-width: 576px) {
    .projects-grid {
        grid-template-columns: 1fr;
    }
    
    .professional-project {
        padding: 1.2rem;
    }
}

.ats-keywords {
    position: absolute;
    left: -9999px;
    top: -9999px;
    height: 0;
    overflow: hidden;
    color: transparent;
    user-select: none;
}

