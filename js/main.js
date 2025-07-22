/**
 * Haupt-JavaScript für das Nachrichtenportal
 * Allgemeine Funktionalitäten und Utilities
 * 
 * @author Nachrichtenportal Team
 * @version 1.0.0
 */

(function() {
    'use strict';

    /**
     * Haupt-Initialisierungsfunktion
     */
    function init() {
        setupSearchFunctionality();
        setupContactForm();
        setupSkipLinks();
        setupPerformanceOptimizations();
        console.log('Nachrichtenportal erfolgreich initialisiert');
    }

    /**
     * Suchfunktionalität
     */
    function setupSearchFunctionality() {
        const searchForm = document.querySelector('.search-form');
        const searchInput = document.getElementById('search-input');
        
        if (searchForm && searchInput) {
            searchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const query = searchInput.value.trim();
                
                if (query.length > 0) {
                    performSearch(query);
                } else {
                    announceToScreenReader('Bitte geben Sie einen Suchbegriff ein');
                }
            });
            
            // Live-Suche (optional)
            searchInput.addEventListener('input', function() {
                const query = this.value.trim();
                if (query.length >= 3) {
                    // Hier könnte eine Live-Suche implementiert werden
                    console.log('Live-Suche für:', query);
                }
            });
        }
    }

    /**
     * Kontaktformular-Funktionalität
     */
    function setupContactForm() {
        const contactForm = document.querySelector('.contact-form form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (validateContactForm(this)) {
                    submitContactForm(this);
                }
            });
            
            // Real-time Validierung
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    validateField(this);
                });
            });
        }
    }

    /**
     * Skip-Links für Barrierefreiheit
     */
    function setupSkipLinks() {
        const skipLinks = document.querySelectorAll('.skip-link');
        
        skipLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    e.preventDefault();
                    target.focus();
                    target.scrollIntoView({ behavior: 'smooth' });
                    announceToScreenReader('Zum Hauptinhalt gesprungen');
                }
            });
        });
    }

    /**
     * Performance-Optimierungen
     */
    function setupPerformanceOptimizations() {
        // Lazy Loading für Bilder
        const images = document.querySelectorAll('img[data-src]');
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
        
        // Service Worker Registrierung (falls vorhanden)
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('Service Worker registriert:', registration);
                    })
                    .catch(error => {
                        console.log('Service Worker Registrierung fehlgeschlagen:', error);
                    });
            });
        }
    }

    /**
     * Suchfunktion ausführen
     */
    function performSearch(query) {
        // Hier würde die eigentliche Suchlogik implementiert
        console.log('Suche ausgeführt für:', query);
        announceToScreenReader(`Suche nach "${query}" wird ausgeführt`);
        
        // Beispiel für eine einfache Suche
        const searchResults = document.querySelectorAll('.news-item');
        let foundItems = 0;
        
        searchResults.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(query.toLowerCase())) {
                item.style.display = 'block';
                foundItems++;
            } else {
                item.style.display = 'none';
            }
        });
        
        announceToScreenReader(`${foundItems} Ergebnisse gefunden`);
    }

    /**
     * Kontaktformular validieren
     */
    function validateContactForm(form) {
        const name = form.querySelector('#name');
        const email = form.querySelector('#email');
        const message = form.querySelector('#message');
        
        let isValid = true;
        
        // Name validieren
        if (!name.value.trim()) {
            showFieldError(name, 'Name ist erforderlich');
            isValid = false;
        } else {
            clearFieldError(name);
        }
        
        // E-Mail validieren
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRegex.test(email.value)) {
            showFieldError(email, 'Gültige E-Mail-Adresse erforderlich');
            isValid = false;
        } else {
            clearFieldError(email);
        }
        
        // Nachricht validieren
        if (!message.value.trim() || message.value.length < 10) {
            showFieldError(message, 'Nachricht muss mindestens 10 Zeichen lang sein');
            isValid = false;
        } else {
            clearFieldError(message);
        }
        
        return isValid;
    }

    /**
     * Einzelnes Feld validieren
     */
    function validateField(field) {
        const value = field.value.trim();
        
        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (value && !emailRegex.test(value)) {
                    showFieldError(field, 'Gültige E-Mail-Adresse erforderlich');
                } else {
                    clearFieldError(field);
                }
                break;
                
            case 'text':
                if (field.id === 'name' && !value) {
                    showFieldError(field, 'Name ist erforderlich');
                } else {
                    clearFieldError(field);
                }
                break;
                
            default:
                if (field.tagName === 'TEXTAREA' && value && value.length < 10) {
                    showFieldError(field, 'Nachricht muss mindestens 10 Zeichen lang sein');
                } else {
                    clearFieldError(field);
                }
        }
    }

    /**
     * Feldfehler anzeigen
     */
    function showFieldError(field, message) {
        clearFieldError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.setAttribute('role', 'alert');
        
        field.parentNode.appendChild(errorDiv);
        field.setAttribute('aria-invalid', 'true');
        field.setAttribute('aria-describedby', errorDiv.id || 'error');
    }

    /**
     * Feldfehler entfernen
     */
    function clearFieldError(field) {
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
        field.removeAttribute('aria-invalid');
        field.removeAttribute('aria-describedby');
    }

    /**
     * Kontaktformular absenden
     */
    function submitContactForm(form) {
        const formData = new FormData(form);
        
        // Hier würde die eigentliche Formular-Verarbeitung implementiert
        console.log('Kontaktformular abgesendet:', Object.fromEntries(formData));
        
        announceToScreenReader('Kontaktformular erfolgreich abgesendet');
        
        // Formular zurücksetzen
        form.reset();
        
        // Erfolgsmeldung anzeigen
        showSuccessMessage('Ihre Nachricht wurde erfolgreich gesendet. Vielen Dank!');
    }

    /**
     * Erfolgsmeldung anzeigen
     */
    function showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.setAttribute('role', 'alert');
        successDiv.setAttribute('aria-live', 'polite');
        
        const contactForm = document.querySelector('.contact-form');
        contactForm.insertBefore(successDiv, contactForm.firstChild);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    /**
     * Screen Reader Ankündigung
     */
    function announceToScreenReader(message) {
        if (window.NavigationManager && window.NavigationManager.announceToScreenReader) {
            window.NavigationManager.announceToScreenReader(message);
        } else {
            // Fallback für Screen Reader Ankündigungen
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'visually-hidden';
            announcement.textContent = message;
            document.body.appendChild(announcement);
            
            setTimeout(() => {
                if (document.body.contains(announcement)) {
                    document.body.removeChild(announcement);
                }
            }, 1000);
        }
    }

    // Public API
    window.MainApp = {
        init: init,
        performSearch: performSearch,
        validateContactForm: validateContactForm,
        announceToScreenReader: announceToScreenReader
    };

    // Initialisierung
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})(); 