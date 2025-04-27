// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    const mobileLinks = document.querySelectorAll('.nav-links .nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Floating discount visibility
    const floatingDiscount = document.getElementById('floatingDiscount');
    if (floatingDiscount) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 800) {
                floatingDiscount.style.opacity = '0';
                floatingDiscount.style.visibility = 'hidden';
            } else {
                floatingDiscount.style.opacity = '1';
                floatingDiscount.style.visibility = 'visible';
            }
        });
    }
    
    // Intersection Observer for fade-in sections
    const sections = document.querySelectorAll('.section-fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Booking form submission
    const bookingForm = document.getElementById('bookingForm');
    const bookingConfirmation = document.getElementById('bookingConfirmation');
    
    if (bookingForm && bookingConfirmation) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, you would send the form data to a server here
            console.log('Form submitted');
            
            // Show confirmation message
            bookingForm.style.display = 'none';
            bookingConfirmation.style.display = 'block';
            
            // Reset form after 3 seconds and hide confirmation
            setTimeout(() => {
                bookingForm.reset();
                bookingForm.style.display = 'block';
                bookingConfirmation.style.display = 'none';
            }, 3000);
        });
    }
    
    // Testimonial slider
    const testimonialSlider = document.getElementById('testimonialSlider');
    const prevButton = document.getElementById('prevTestimonial');
    const nextButton = document.getElementById('nextTestimonial');
    
    if (testimonialSlider && prevButton && nextButton) {
        let currentSlide = 0;
        const testimonials = testimonialSlider.querySelectorAll('.testimonial');
        const totalSlides = testimonials.length;
        
        // Initialize slider
        updateSlider();
        
        // Previous button click
        prevButton.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        });
        
        // Next button click
        nextButton.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        });
        
        // Update slider position
        function updateSlider() {
            testimonialSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        // Auto-advance testimonials every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }, 5000);
    }
});