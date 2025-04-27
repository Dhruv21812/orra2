// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("currentYear").textContent = new Date().getFullYear()

  // Mobile menu toggle
  const menuToggle = document.getElementById("menuToggle")
  const navLinks = document.getElementById("navLinks")

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active")
      menuToggle.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking a link
  const mobileLinks = document.querySelectorAll(".nav-links .nav-link")
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active")
        menuToggle.classList.remove("active")
      }
    })
  })

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Floating discount visibility
  const floatingDiscount = document.getElementById("floatingDiscount")
  if (floatingDiscount) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 800) {
        floatingDiscount.style.opacity = "0"
        floatingDiscount.style.visibility = "hidden"
      } else {
        floatingDiscount.style.opacity = "1"
        floatingDiscount.style.visibility = "visible"
      }
    })
  }

  // Animated Scissor Element
  const animatedScissor = document.getElementById("animatedScissor")
  if (animatedScissor) {
    // Make the scissor clickable to scroll to booking section
    animatedScissor.addEventListener("click", () => {
      const bookingSection = document.getElementById("booking")
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: "smooth" })
      } else {
        // If on gallery page, redirect to index.html#booking
        window.location.href = "index.html#booking"
      }
    })

    // Add some random movement to the scissor animation
    let isAnimating = false

    animatedScissor.addEventListener("mouseover", () => {
      if (!isAnimating) {
        isAnimating = true

        // Add a small jump animation
        animatedScissor.style.animation = "none"
        setTimeout(() => {
          animatedScissor.style.animation = "scissorJump 0.5s ease-in-out"
        }, 10)

        // Reset after animation completes
        setTimeout(() => {
          animatedScissor.style.animation = "scissorFloat 10s ease-in-out infinite"
          isAnimating = false
        }, 500)
      }
    })
  }

  // Intersection Observer for fade-in sections
  const sections = document.querySelectorAll(".section-fade-in")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    },
    { threshold: 0.1 },
  )

  sections.forEach((section) => {
    observer.observe(section)
  })

  // Booking form submission
  const bookingForm = document.getElementById("bookingForm")
  const bookingConfirmation = document.getElementById("bookingConfirmation")

  if (bookingForm && bookingConfirmation) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // In a real application, you would send the form data to a server here
      console.log("Form submitted")

      // Show confirmation message
      bookingForm.style.display = "none"
      bookingConfirmation.style.display = "block"

      // Reset form after 3 seconds and hide confirmation
      setTimeout(() => {
        bookingForm.reset()
        bookingForm.style.display = "block"
        bookingConfirmation.style.display = "none"
      }, 3000)
    })
  }

  // Testimonial slider - Fixed for better compatibility
  const testimonialSlider = document.getElementById("testimonialSlider")
  const prevButton = document.getElementById("prevTestimonial")
  const nextButton = document.getElementById("nextTestimonial")
  const indicators = document.querySelectorAll(".indicator")

  if (testimonialSlider && prevButton && nextButton) {
    let currentSlide = 0
    const testimonials = testimonialSlider.querySelectorAll(".testimonial")
    const totalSlides = testimonials.length

    // Initialize slider
    updateSlider()

    // Previous button click
    prevButton.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
      updateSlider()
    })

    // Next button click
    nextButton.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % totalSlides
      updateSlider()
    })

    // Indicator clicks
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        currentSlide = index
        updateSlider()
      })
    })

    // Update slider position
    function updateSlider() {
      // Use transform for better performance
      testimonialSlider.style.transform = `translateX(-${currentSlide * 100}%)`

      // Update indicators
      indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
          indicator.classList.add("active")
        } else {
          indicator.classList.remove("active")
        }
      })

      // Add aria-current to the current testimonial for accessibility
      testimonials.forEach((testimonial, index) => {
        if (index === currentSlide) {
          testimonial.setAttribute("aria-current", "true")
        } else {
          testimonial.removeAttribute("aria-current")
        }
      })
    }

    // Auto-advance testimonials every 5 seconds
    const autoAdvance = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides
      updateSlider()
    }, 5000)

    // Pause auto-advance when user interacts with controls
    ;[prevButton, nextButton, ...indicators].forEach((control) => {
      control.addEventListener("click", () => {
        clearInterval(autoAdvance)
      })
    })

    // Add keyboard navigation for testimonials
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
        updateSlider()
        clearInterval(autoAdvance)
      } else if (e.key === "ArrowRight") {
        currentSlide = (currentSlide + 1) % totalSlides
        updateSlider()
        clearInterval(autoAdvance)
      }
    })

    // Add touch support for testimonials
    let touchStartX = 0
    let touchEndX = 0

    testimonialSlider.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX
      },
      { passive: true },
    )

    testimonialSlider.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX
        handleSwipe()
      },
      { passive: true },
    )

    function handleSwipe() {
      const swipeThreshold = 50
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left, go to next slide
        currentSlide = (currentSlide + 1) % totalSlides
        updateSlider()
        clearInterval(autoAdvance)
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right, go to previous slide
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
        updateSlider()
        clearInterval(autoAdvance)
      }
    }
  }

  // Add scissor jump animation keyframes dynamically
  const styleSheet = document.createElement("style")
  styleSheet.textContent = `
    @keyframes scissorJump {
      0% { transform: translateY(0); }
      50% { transform: translateY(-20px) rotate(15deg); }
      100% { transform: translateY(0); }
    }
  `
  document.head.appendChild(styleSheet)
})
