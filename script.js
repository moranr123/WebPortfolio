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
revealOnScroll(); // Initial check

// Sample projects data
const projects = [
    {
        title: 'Project 1',
        description: 'A responsive web application built with HTML, CSS, and JavaScript.',
        image: 'https://via.placeholder.com/400x300',
        github: '#',
        live: '#'
    },
    {
        title: 'Project 2',
        description: 'An interactive dashboard with dark mode support.',
        image: 'https://via.placeholder.com/400x300',
        github: '#',
        live: '#'
    },
    // Add more projects as needed
];

// Render projects
const projectsGrid = document.querySelector('.projects-grid');
projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card reveal';
    projectCard.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="project-img" loading="lazy">
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-links">
                <a href="${project.github}" class="project-link" target="_blank">
                    <i class="fab fa-github"></i> GitHub
                </a>
                <a href="${project.live}" class="project-link" target="_blank">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
            </div>
        </div>
    `;
    projectsGrid.appendChild(projectCard);
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    console.log('Form submitted:', formData);
    // Reset form
    contactForm.reset();
    alert('Message sent successfully!');
});
