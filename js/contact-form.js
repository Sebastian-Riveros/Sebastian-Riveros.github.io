// Formspree integration for contact form
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Use a different Formspree endpoint
        contactForm.setAttribute('action', 'https://formspree.io/f/mbjnkzgj');
        contactForm.setAttribute('method', 'POST');
        
        // Add event listener for form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validate form fields
            if (name === '' || email === '' || subject === '' || message === '') {
                showFormAlert('Por favor, completa todos los campos', 'error');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormAlert('Por favor, ingresa un email válido', 'error');
                return;
            }
            
            // Prepare form data
            const formData = new FormData(contactForm);
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            // Send form data to Formspree
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Error en el envío del formulario');
            })
            .then(data => {
                // Show success message
                showFormAlert('¡Mensaje enviado con éxito! Te contactaré pronto.', 'success');
                contactForm.reset();
                
                // Reset button state
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                
                console.log('Form submitted successfully:', data);
            })
            .catch(error => {
                // Show error message
                showFormAlert('Hubo un problema al enviar el mensaje. Por favor, intenta nuevamente.', 'error');
                
                // Reset button state
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                
                console.error('Error:', error);
            });
        });
    }
    
    // Function to show form alerts
    function showFormAlert(message, type) {
        // Remove existing alerts
        const existingAlert = document.querySelector('.form-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create new alert
        const alert = document.createElement('div');
        alert.className = `form-alert ${type}`;
        alert.textContent = message;
        
        // Insert alert after submit button
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.insertAdjacentElement('afterend', alert);
        
        // Remove alert after 5 seconds
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
});
