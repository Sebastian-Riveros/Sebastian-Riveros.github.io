// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('header');
    const contactForm = document.getElementById('contactForm');
    
    // Función para alternar el menú móvil
    function toggleMenu() {
        navMenu.classList.toggle('active');
        
        // Animar las barras del botón hamburguesa
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
    // Evento para el botón de navegación móvil
    navToggle.addEventListener('click', toggleMenu);
    
    // Cerrar el menú al hacer clic en un enlace (en móvil)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Cambiar estilo de la navegación al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Desplazamiento suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animación de entrada para elementos al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.project-card, .skill-item, .about-image, .about-text');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Aplicar estilos iniciales para animación
    const elementsToAnimate = document.querySelectorAll('.project-card, .skill-item, .about-image, .about-text');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Ejecutar animación al cargar y al hacer scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Validación del formulario de contacto
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validación básica
            if (name === '' || email === '' || subject === '' || message === '') {
                showFormAlert('Por favor, completa todos los campos', 'error');
                return;
            }
            
            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormAlert('Por favor, ingresa un email válido', 'error');
                return;
            }
            
            // Simulación de envío exitoso (en un sitio real, aquí iría el código para enviar el formulario)
            showFormAlert('¡Mensaje enviado con éxito! Te contactaré pronto.', 'success');
            contactForm.reset();
        });
    }
    
    // Función para mostrar alertas en el formulario
    function showFormAlert(message, type) {
        // Eliminar alerta anterior si existe
        const existingAlert = document.querySelector('.form-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Crear nueva alerta
        const alert = document.createElement('div');
        alert.className = `form-alert ${type}`;
        alert.textContent = message;
        
        // Insertar alerta después del botón de envío
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.insertAdjacentElement('afterend', alert);
        
        // Eliminar alerta después de 5 segundos
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
    
    // Crear estilos para las alertas del formulario
    const formAlertStyles = document.createElement('style');
    formAlertStyles.textContent = `
        .form-alert {
            margin-top: 15px;
            padding: 10px 15px;
            border-radius: 5px;
            font-size: 0.9rem;
        }
        .form-alert.success {
            background-color: rgba(0, 201, 167, 0.2);
            color: #00c9a7;
            border: 1px solid #00c9a7;
        }
        .form-alert.error {
            background-color: rgba(255, 91, 91, 0.2);
            color: #ff5b5b;
            border: 1px solid #ff5b5b;
        }
    `;
    document.head.appendChild(formAlertStyles);
    
    // Contador de habilidades animado
    const skillLevels = document.querySelectorAll('.skill-level');
    let animated = false;
    
    function animateSkills() {
        if (animated) return;
        
        const skillsSection = document.getElementById('skills');
        const skillsSectionPosition = skillsSection.getBoundingClientRect().top;
        
        if (skillsSectionPosition < window.innerHeight - 100) {
            skillLevels.forEach(level => {
                const width = level.style.width;
                level.style.width = '0';
                
                setTimeout(() => {
                    level.style.transition = 'width 1s ease-in-out';
                    level.style.width = width;
                }, 200);
            });
            
            animated = true;
        }
    }
    
    window.addEventListener('scroll', animateSkills);
    
    // Inicializar tooltips para los íconos de habilidades
    const skillIcons = document.querySelectorAll('.skill-icon');
    skillIcons.forEach(icon => {
        icon.setAttribute('title', icon.nextElementSibling.querySelector('h4').textContent);
    });
    
    // Detectar cuando se carga la página completamente
    window.addEventListener('load', function() {
        // Ocultar cualquier indicador de carga si existiera
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
        
        // Añadir clase para animar la entrada de la sección hero
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('animate-in');
        }
    });
    
    // Añadir estilos para la animación de entrada del hero
    const heroStyles = document.createElement('style');
    heroStyles.textContent = `
        .hero-content {
            opacity: 0;
            transform: translateY(30px);
        }
        .hero-content.animate-in {
            animation: fadeInUp 1s forwards;
        }
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(heroStyles);
});
