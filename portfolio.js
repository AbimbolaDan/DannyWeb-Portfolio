"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('#nav_section');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelectorAll('#navigation-links a');
    const themeCheckbox = document.querySelector('.checkbox');
    const bodyElement = document.body;

    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 10);
        if (header.classList.contains('open')) {
            header.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    if (navToggle) {
        navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = header.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            header.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    if (localStorage.getItem('theme') === 'dark') {
        bodyElement.classList.add('dark-theme');
        if (themeCheckbox) themeCheckbox.checked = true;
    }

    if (themeCheckbox) {
        themeCheckbox.addEventListener('change', () => {
            if (themeCheckbox.checked) {
                bodyElement.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                bodyElement.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    const skillObserverOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px" 
    };

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                skillObserver.unobserve(entry.target);
            }
        });
    }, skillObserverOptions);

    document.querySelectorAll('.skill-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
        skillObserver.observe(card);
    });
});