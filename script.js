// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 300);
});

// Dark mode toggle
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');

// Apply the current theme
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeToggleIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' 
        ? 'light' 
        : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleIcon(newTheme);
});

function updateThemeToggleIcon(theme) {
    const icon = themeToggle.querySelector('i');
    const label = themeToggle.querySelector('.theme-label');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    label.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Scroll reveal animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);

// Initial check with a small delay to ensure DOM is ready
setTimeout(() => {
    revealOnScroll();
}, 100);

// Projects data
const projects = [
    {
        title: 'Pawsafety App',
        description: 'A comprehensive pet management system featuring both a React Native mobile app and React-based Superadmin Web Dashboard. The app includes features like pet registration with QR codes, lost pet reporting with location tracking, stray animal reporting, and a community pet list. The web dashboard provides role-based access for different administrators.',
        image: 'assets/Pawsafety.png',
        techStack: ['React Native', 'React.js', 'Firebase', 'Expo', 'Tailwind CSS', 'Cloud Functions'],
        githubLink: 'https://github.com/moranr123/Pawsafety',
        demoNote: 'Demo will be available upon completion',
        status: 'In Development'
    },
    {
        title: 'Netflix Clone',
        description: 'A responsive Netflix-style UI built with modern front-end tools. Implements browsing, responsive layout, and media showcase components to mimic the Netflix experience.',
        image: 'assets/Netflix-clone.png',
        techStack: ['HTML5', 'CSS3', 'JavaScript', 'React', 'TMDB API'],
        github: 'https://github.com/moranr123/netflix-clone',
        live: 'https://netflix-clone-chi-seven-56.vercel.app'
    },
    {
        title: 'Job Application Tracker',
        description: 'A modern, responsive web application built with React to help users track and manage job applications efficiently. Features complete CRUD operations, real-time search and filtering by status, color-coded status system, localStorage data persistence, CSV export functionality, and mobile-first responsive design. Includes comprehensive form validation and error handling.',
        image: 'assets/JobApplicationTracker.png',
        github: 'https://github.com/moranr123/Job-Application-Tracker',
        live: 'https://job-tracker-ronald.vercel.app/'
    },
    {
        title: 'Budget Tracker',
        description: 'A comprehensive budget tracking application that helps users manage their finances effectively. Features include expense tracking, income management, real-time balance updates, and data visualization.',
        image: 'assets/BudgetTracker.png',
        github: 'https://github.com/moranr123/Budget-Tracker',
        live: 'https://moranr123.github.io/Budget-Tracker/'
    },
    {
        title: 'Smart Quiz App',
        description: 'A modern, responsive quiz application offering an engaging learning experience across multiple subjects. Features include 4 subject categories (English, Math, Science, History), real-time feedback with audio and visual cues, progress tracking, and glassmorphism UI design.',
        image: 'assets/QuizApp.png',
        github: 'https://github.com/moranr123/QuizApp',
        live: 'https://moranr123.github.io/QuizApp/'
    },
    {
        title: 'Enhanced Weather App',
        description: 'A modern, responsive weather application with advanced features including automatic location detection, geolocation support, unit conversion (Celsius/Fahrenheit), 5-day forecast, and enhanced weather details. Features glassmorphism design with smooth animations and comprehensive error handling.',
        image: 'assets/WeatherApp.png',
        github: 'https://github.com/moranr123/Weather-App',
        live: 'https://moranr123.github.io/Weather-App/'
    }
    // More projects can be added here
];

// Render projects
document.addEventListener('DOMContentLoaded', () => {
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
        // Clear existing content
        projectsGrid.innerHTML = '';
        
        // Add projects from the array
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card reveal';
            projectCard.innerHTML = `
                <img src="${project.image}" alt="${project.title}" class="project-img" loading="lazy">
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    ${project.status ? `<div class="project-status">${project.status}</div>` : ''}
                    ${project.demoNote ? `<div class="project-demo-note">${project.demoNote}</div>` : ''}
                    <div class="project-links">
                        ${project.githubLink ? 
                          `<a href="${project.githubLink}" class="project-link" target="_blank">
                              <i class="fab fa-github"></i> GitHub
                           </a>` :
                          `<a href="${project.github}" class="project-link" target="_blank">
                              <i class="fab fa-github"></i> GitHub
                           </a>`
                        }
                                ${(!project.status && project.live) ? 
                                  `<a href="${project.live}" class="project-link live-demo" target="_blank">
                                        <i class="fas fa-external-link-alt"></i> Live Demo
                                    </a>` : ''
                                }
                    </div>
                </div>
            `;
            projectsGrid.appendChild(projectCard);
        });

        // Trigger reveal animation for new elements
        setTimeout(() => {
            revealOnScroll();
        }, 200);
    }
});

// Additional initialization to ensure all reveal elements are visible
window.addEventListener('load', () => {
    setTimeout(() => {
        revealOnScroll();
    }, 300);
});

// Scroll indicator functionality
const scrollIndicator = document.querySelector('.scroll-indicator');
const scrollIcon = document.getElementById('scrollIcon');
const scrollIconInner = document.getElementById('scrollIconInner');
const scrollText = document.getElementById('scrollText');

if (scrollIndicator) {
    // Check if we're at the bottom of the page
    const isAtBottom = () => {
        return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;
    };

    // Update scroll indicator based on position
    const updateScrollIndicator = () => {
        if (isAtBottom()) {
            scrollIndicator.classList.add('at-bottom');
            scrollIconInner.className = 'fas fa-chevron-up';
            scrollText.textContent = 'Scroll to top';
        } else {
            scrollIndicator.classList.remove('at-bottom');
            scrollIconInner.className = 'fas fa-chevron-down';
            scrollText.textContent = 'Scroll to explore';
        }

        // Hide when scrolled down (but not at bottom)
        if (window.scrollY > 100 && !isAtBottom()) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }
    };

    // Handle scroll indicator click
    scrollIcon.addEventListener('click', () => {
        if (isAtBottom()) {
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // Scroll to next section (about)
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });

    // Update on scroll
    window.addEventListener('scroll', updateScrollIndicator);
    
    // Initial check
    updateScrollIndicator();
}

// Contact form handling with EmailJS
const contactForm = document.querySelector('.contact-form');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoading = submitBtn.querySelector('.btn-loading');

// Initialize EmailJS (uncomment when you have your keys)
// emailjs.init("YOUR_PUBLIC_KEY");

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
    submitBtn.disabled = true;
    
    try {
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // Method 1: EmailJS (uncomment when you have your keys)
        /*
        const response = await emailjs.send(
            'YOUR_SERVICE_ID',
            'YOUR_TEMPLATE_ID',
            {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
                to_name: 'Ronald Moran Jr'
            }
        );
        */
        
        // Method 2: Formspree (easier setup - just change the form action)
        // For now, we'll simulate a successful submission
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
        
        // Success
        showNotification('Message sent successfully!', 'success');
        contactForm.reset();
        
    } catch (error) {
        console.error('Email send failed:', error);
        showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        // Reset button state
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    }
});

// Notification function
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}
