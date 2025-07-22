/**
 * Barrierefreie Menü-Navigation
 * WCAG 2.1 AA konforme Tastaturnavigation und Screen Reader Support
 * 
 * @author Nachrichtenportal Team
 * @version 1.0.0
 */

(function() {
    'use strict';

    // Globale Variablen für Menü-Management
    let currentMenuItem = null;
    let currentSubmenu = null;
    let currentSubmenuItem = null;

    // DOM-Elemente
    let mainMenu, menuItems, submenus, toggleButtons;

    /**
     * Initialisiert die Menü-Navigation
     */
    function initNavigation() {
        mainMenu = document.querySelector('.nav-level-1');
        if (!mainMenu) return;

        menuItems = mainMenu.querySelectorAll('[role="menuitem"]');
        submenus = mainMenu.querySelectorAll('[role="menu"]');
        toggleButtons = mainMenu.querySelectorAll('.submenu-toggle');

        setupInitialState();
        setupEventListeners();
        setupScreenReaderSupport();
    }

    /**
     * Setzt den initialen Zustand der Menüs
     */
    function setupInitialState() {
        // Alle Untermenüs initial verstecken
        submenus.forEach(submenu => {
            submenu.style.display = 'none';
        });
    }

    /**
     * Richtet alle Event Listener ein
     */
    function setupEventListeners() {
        setupSubmenuLinkFocus();
        setupToggleButtons();
        setupMainMenuNavigation();
        setupSubmenuNavigation();
        setupMouseInteractions();
        setupGlobalEventListeners();
    }

    /**
     * Untermenü-Links sichtbar machen wenn fokussiert
     */
    function setupSubmenuLinkFocus() {
        const submenuLinks = mainMenu.querySelectorAll('.nav-level-2 a');
        submenuLinks.forEach(link => {
            link.addEventListener('focus', function() {
                const submenu = this.closest('.nav-level-2');
                if (submenu) {
                    closeAllSubmenus();
                    submenu.style.display = 'block';
                    
                    const submenuId = submenu.id;
                    const toggleButton = document.querySelector(`[aria-controls="${submenuId}"]`);
                    if (toggleButton) {
                        toggleButton.setAttribute('aria-expanded', 'true');
                    }
                }
            });
        });
    }

    /**
     * Toggle-Buttons Event Listener
     */
    function setupToggleButtons() {
        toggleButtons.forEach(button => {
            // Klick-Event
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleSubmenu(this);
            });
            
            // Tastaturnavigation
            button.addEventListener('keydown', function(e) {
                handleToggleButtonKeydown(e, this);
            });
        });
    }

    /**
     * Behandelt Tastatureingaben für Toggle-Buttons
     */
    function handleToggleButtonKeydown(e, button) {
        switch(e.key) {
            case 'Enter':
            case ' ':
                e.preventDefault();
                e.stopPropagation();
                toggleSubmenu(button);
                break;
            case 'ArrowDown':
                e.preventDefault();
                const submenuId = button.getAttribute('aria-controls');
                const submenu = document.getElementById(submenuId);
                if (submenu) {
                    const firstSubmenuItem = submenu.querySelector('[role="menuitem"]');
                    if (firstSubmenuItem) {
                        firstSubmenuItem.focus();
                    }
                }
                break;
        }
    }

    /**
     * Hauptmenü-Navigation
     */
    function setupMainMenuNavigation() {
        mainMenu.addEventListener('keydown', function(e) {
            const target = e.target;
            
            if (!target.hasAttribute('role') || target.getAttribute('role') !== 'menuitem') {
                return;
            }
            
            switch(e.key) {
                case 'ArrowRight':
                    e.preventDefault();
                    navigateNextMenuItem(target);
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    navigatePreviousMenuItem(target);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    const toggleButton = target.parentElement.querySelector('.submenu-toggle');
                    if (toggleButton) {
                        toggleButton.focus();
                    }
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    if (currentSubmenu && currentSubmenuItem) {
                        closeSubmenu();
                        target.focus();
                    }
                    break;
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    target.click();
                    break;
                case 'Escape':
                    e.preventDefault();
                    closeAllSubmenus();
                    break;
            }
        });
    }

    /**
     * Untermenü-Navigation
     */
    function setupSubmenuNavigation() {
        submenus.forEach(submenu => {
            submenu.addEventListener('keydown', function(e) {
                const target = e.target;
                
                if (!target.hasAttribute('role') || target.getAttribute('role') !== 'menuitem') {
                    return;
                }
                
                switch(e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        navigateNextSubmenuItem(target);
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        navigatePreviousSubmenuItem(target);
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        closeSubmenu();
                        const parentMenuItem = getParentMenuItem(submenu);
                        if (parentMenuItem) {
                            parentMenuItem.focus();
                        }
                        break;
                    case 'Enter':
                    case ' ':
                        e.preventDefault();
                        target.click();
                        break;
                    case 'Escape':
                        e.preventDefault();
                        closeSubmenu();
                        const parentItem = getParentMenuItem(submenu);
                        if (parentItem) {
                            parentItem.focus();
                        }
                        break;
                }
            });
        });
    }

    /**
     * Maus-Interaktionen für bessere UX
     */
    function setupMouseInteractions() {
        menuItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const toggleButton = this.parentElement.querySelector('.submenu-toggle');
                if (toggleButton) {
                    openSubmenu(toggleButton);
                }
            });
        });
    }

    /**
     * Globale Event Listener
     */
    function setupGlobalEventListeners() {
        // Schließen der Untermenüs beim Verlassen
        mainMenu.addEventListener('mouseleave', function() {
            closeAllSubmenus();
        });
        
        // Fokus-Management für bessere Barrierefreiheit
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.main-nav')) {
                closeAllSubmenus();
            }
        });
    }

    /**
     * Screen Reader Unterstützung
     */
    function setupScreenReaderSupport() {
        menuItems.forEach(item => {
            item.addEventListener('focus', function() {
                const text = this.textContent;
                announceToScreenReader(`${text} Menüpunkt fokussiert`);
            });
        });
        
        toggleButtons.forEach(button => {
            button.addEventListener('focus', function() {
                const text = this.previousElementSibling.textContent;
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                announceToScreenReader(`${text} Untermenü-Toggle, ${isExpanded ? 'geöffnet' : 'geschlossen'}`);
            });
        });
    }

    // Navigation Hilfsfunktionen
    function navigateNextMenuItem(currentItem) {
        const nextItem = currentItem.parentElement.parentElement.nextElementSibling?.querySelector('[role="menuitem"]');
        if (nextItem) {
            nextItem.focus();
        }
    }
    
    function navigatePreviousMenuItem(currentItem) {
        const prevItem = currentItem.parentElement.parentElement.previousElementSibling?.querySelector('[role="menuitem"]');
        if (prevItem) {
            prevItem.focus();
        }
    }
    
    function navigateNextSubmenuItem(currentItem) {
        const nextItem = currentItem.nextElementSibling?.querySelector('[role="menuitem"]');
        if (nextItem) {
            nextItem.focus();
        }
    }
    
    function navigatePreviousSubmenuItem(currentItem) {
        const prevItem = currentItem.previousElementSibling?.querySelector('[role="menuitem"]');
        if (prevItem) {
            prevItem.focus();
        }
    }

    // Menü-Management Funktionen
    function toggleSubmenu(toggleButton) {
        const submenuId = toggleButton.getAttribute('aria-controls');
        const submenu = document.getElementById(submenuId);
        const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
        
        if (isExpanded) {
            closeSubmenu();
        } else {
            openSubmenu(toggleButton);
        }
    }

    function openSubmenu(toggleButton) {
        const submenuId = toggleButton.getAttribute('aria-controls');
        const submenu = document.getElementById(submenuId);
        if (submenu) {
            closeAllSubmenus();
            submenu.style.display = 'block';
            toggleButton.setAttribute('aria-expanded', 'true');
            currentSubmenu = submenu;
            
            const firstSubmenuItem = submenu.querySelector('[role="menuitem"]');
            if (firstSubmenuItem) {
                firstSubmenuItem.focus();
                currentSubmenuItem = firstSubmenuItem;
            }
        }
    }
    
    function closeSubmenu() {
        if (currentSubmenu) {
            currentSubmenu.style.display = 'none';
            const toggleButton = getParentToggleButton(currentSubmenu);
            if (toggleButton) {
                toggleButton.setAttribute('aria-expanded', 'false');
            }
            currentSubmenu = null;
            currentSubmenuItem = null;
        }
    }
    
    function closeAllSubmenus() {
        submenus.forEach(submenu => {
            submenu.style.display = 'none';
        });
        toggleButtons.forEach(button => {
            button.setAttribute('aria-expanded', 'false');
        });
        currentSubmenu = null;
        currentSubmenuItem = null;
    }
    
    function getParentMenuItem(submenu) {
        const submenuId = submenu.id;
        return document.querySelector(`[aria-controls="${submenuId}"]`);
    }
    
    function getParentToggleButton(submenu) {
        const submenuId = submenu.id;
        return document.querySelector(`.submenu-toggle[aria-controls="${submenuId}"]`);
    }

    /**
     * Screen Reader Ankündigungen
     */
    function announceToScreenReader(message) {
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

    // Public API
    window.NavigationManager = {
        init: initNavigation,
        closeAllSubmenus: closeAllSubmenus,
        announceToScreenReader: announceToScreenReader
    };

    // Initialisierung wenn DOM geladen ist
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavigation);
    } else {
        initNavigation();
    }

})(); 