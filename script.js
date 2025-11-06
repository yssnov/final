// ========================================
// TASK 6: Dark/Light Mode with Local Storage
// ========================================

function initTheme() {
  // Check localStorage for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  const themeToggle = document.getElementById('theme-toggle');
  
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeToggle) themeToggle.textContent = '☀️';
  } else {
    document.body.classList.remove('dark-mode');
    if (themeToggle) themeToggle.textContent = '🌙';
  }
}

function toggleTheme() {
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  
  body.classList.toggle('dark-mode');
  
  // Save preference to localStorage
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    if (themeToggle) themeToggle.textContent = '☀️';
  } else {
    localStorage.setItem('theme', 'light');
    if (themeToggle) themeToggle.textContent = '🌙';
  }
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', initTheme);

// Add event listener for theme toggle button
const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', toggleTheme);
}

// ========================================
// MOBILE NAVIGATION TOGGLE
// ========================================

function toggleMobileMenu() {
  const nav = document.querySelector('.navigation');
  nav.classList.toggle('active');
}

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', toggleMobileMenu);
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.navigation a').forEach(link => {
  link.addEventListener('click', () => {
    const nav = document.querySelector('.navigation');
    if (nav.classList.contains('active')) {
      nav.classList.remove('active');
    }
  });
});

// ========================================
// TASK 5: Display Current Date and Time
// ========================================
// Author: Chingiz

function updateDateTime() {
  const now = new Date();
  
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  };
  
  const formattedDate = now.toLocaleString('en-US', options);
  
  const dateTimeElement = document.getElementById('current-datetime');
  if (dateTimeElement) {
    dateTimeElement.textContent = formattedDate;
  }
}

if (document.getElementById('current-datetime')) {
  updateDateTime();
  setInterval(updateDateTime, 1000);
}

// ========================================
// TASK 4: Change Background Color
// ========================================
// Author: Chingiz

function changeBackgroundColor() {
  const isDarkMode = document.body.classList.contains('dark-mode');
  
  const lightColors = [
    '#f5f5f0', // original beige
    '#e8f4f8', // light blue
    '#fff5e6', // light orange
    '#f0e6ff', // light purple
    '#e6ffe6', // light green
    '#ffe6f0', // light pink
    '#fff9e6'  // light yellow
  ];
  
  const darkColors = [
    '#1a1a1a', // original dark
    '#1a1f2e', // dark blue
    '#2e1f1a', // dark brown
    '#1f1a2e', // dark purple
    '#1a2e1a', // dark green
    '#2e1a1f', // dark red
    '#2e2a1a'  // dark yellow
  ];
  
  const colors = isDarkMode ? darkColors : lightColors;
  
  const currentBg = document.body.style.backgroundColor || getComputedStyle(document.body).backgroundColor;
  let newColor;
  
  do {
    newColor = colors[Math.floor(Math.random() * colors.length)];
  } while (newColor === currentBg);
  
  document.body.style.backgroundColor = newColor;
  document.body.style.transition = 'background-color 0.5s ease';
}

const bgButton = document.getElementById('bg-color-btn');
if (bgButton) {
  bgButton.addEventListener('click', changeBackgroundColor);
}

// ========================================
// TASK 1: Form Validation (Reservation Form)
// ========================================
// Author: Sultan

function validateReservationForm(event) {
  event.preventDefault();
  
  // Clear previous errors
  const errorElements = document.querySelectorAll('.error-message');
  errorElements.forEach(el => el.remove());
  
  // Reset border colors
  document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(el => {
    el.style.borderColor = '';
  });
  
  let isValid = true;
  
  // Get form fields
  const name = document.getElementById('guest-name');
  const email = document.getElementById('guest-email');
  const phone = document.getElementById('guest-phone');
  const partySize = document.getElementById('party-size');
  const date = document.getElementById('reservation-date');
  const time = document.getElementById('reservation-time');
  
  // Validate Name
  if (!name || !name.value.trim() || name.value.trim().length < 2) {
    if (name) showError(name, 'Name must be at least 2 characters long');
    isValid = false;
  }
  
  // Validate Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !email.value.trim() || !emailRegex.test(email.value)) {
    if (email) showError(email, 'Please enter a valid email address');
    isValid = false;
  }
  
  // Validate Phone
  if (phone) {
    const phoneDigits = phone.value.replace(/\D/g, '');
    if (!phoneDigits || phoneDigits.length < 10) {
      showError(phone, 'Phone number must be at least 10 digits');
      isValid = false;
    }
  }
  
  // Validate Party Size
  if (partySize && !partySize.value) {
    showError(partySize, 'Please select party size');
    isValid = false;
  }
  
  // Validate Date
  if (date) {
    if (!date.value) {
      showError(date, 'Please select a date');
      isValid = false;
    } else {
      const selectedDate = new Date(date.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        showError(date, 'Date cannot be in the past');
        isValid = false;
      }
    }
  }
  
  // Validate Time
  if (time && !time.value) {
    showError(time, 'Please select a time');
    isValid = false;
  }
  
  if (isValid) {
    alert('✓ Reservation submitted successfully! We will contact you shortly to confirm.');
    event.target.reset();
  }
  
  return false;
}

function showError(inputElement, message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.setAttribute('role', 'alert');
  errorDiv.textContent = message;
  
  inputElement.style.borderColor = '#d32f2f';
  inputElement.parentElement.appendChild(errorDiv);
  
  inputElement.addEventListener('input', function() {
    inputElement.style.borderColor = '';
    const error = inputElement.parentElement.querySelector('.error-message');
    if (error) error.remove();
  }, { once: true });
}

// Add event listener for reservation form
const reservationForms = document.querySelectorAll('form.contact-form');
reservationForms.forEach(form => {
  // Check if this is the reservation form (has guest-name field)
  if (form.querySelector('#guest-name')) {
    form.addEventListener('submit', validateReservationForm);
  }
});

// ========================================
// CONTACT FORM VALIDATION
// ========================================

function validateContactForm(event) {
  event.preventDefault();
  
  // Clear previous errors
  const errorElements = document.querySelectorAll('.error-message');
  errorElements.forEach(el => el.remove());
  
  document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(el => {
    el.style.borderColor = '';
  });
  
  let isValid = true;
  
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const subject = document.getElementById('subject');
  const message = document.getElementById('message');
  
  // Validate Name
  if (!name || !name.value.trim() || name.value.trim().length < 2) {
    if (name) showError(name, 'Name must be at least 2 characters long');
    isValid = false;
  }
  
  // Validate Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !email.value.trim() || !emailRegex.test(email.value)) {
    if (email) showError(email, 'Please enter a valid email address');
    isValid = false;
  }
  
  // Validate Subject
  if (subject && !subject.value) {
    showError(subject, 'Please select a subject');
    isValid = false;
  }
  
  // Validate Message
  if (!message || !message.value.trim() || message.value.trim().length < 10) {
    if (message) showError(message, 'Message must be at least 10 characters long');
    isValid = false;
  }
  
  if (isValid) {
    alert('✓ Message sent successfully! We will get back to you soon.');
    event.target.reset();
  }
  
  return false;
}

// Add event listener for contact form
const contactForms = document.querySelectorAll('form.contact-form');
contactForms.forEach(form => {
  // Check if this is the contact form (has name field, not guest-name)
  if (form.querySelector('#name') && !form.querySelector('#guest-name')) {
    form.addEventListener('submit', validateContactForm);
  }
});

// ========================================
// TASK 2: Accordion for FAQs
// ========================================
// Author: Kaisar

function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    const icon = item.querySelector('.accordion-icon');
    
    if (!header || !content) return;
    
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all accordion items
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherContent = otherItem.querySelector('.accordion-content');
        if (otherContent) otherContent.style.maxHeight = null;
      });
      
      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
    
    // Add keyboard support
    header.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
    
    // Make header focusable
    header.setAttribute('tabindex', '0');
    header.setAttribute('role', 'button');
    header.setAttribute('aria-expanded', 'false');
  });
}

if (document.querySelector('.accordion-item')) {
  initAccordion();
}

// ========================================
// TASK 3: Popup Subscription Form
// ========================================
// Author: Kaisar

function openPopup() {
  const popup = document.getElementById('subscription-popup');
  if (popup) {
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Focus on email input for accessibility
    const emailInput = document.getElementById('popup-email');
    if (emailInput) {
      setTimeout(() => emailInput.focus(), 100);
    }
  }
}

function closePopup() {
  const popup = document.getElementById('subscription-popup');
  if (popup) {
    popup.style.display = 'none';
    document.body.style.overflow = '';
  }
}

function handleSubscription(event) {
  event.preventDefault();
  
  const emailInput = document.getElementById('popup-email');
  if (!emailInput) return;
  
  const email = emailInput.value.trim();
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    alert('⚠ Please enter a valid email address');
    emailInput.focus();
    return;
  }
  
  // Store subscription in localStorage (optional)
  const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
  if (!subscriptions.includes(email)) {
    subscriptions.push(email);
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
  }
  
  alert('✓ Thank you for subscribing! You will receive our newsletter soon.');
  emailInput.value = '';
  closePopup();
}

// Add event listeners for popup
const subscribeBtn = document.getElementById('subscribe-btn');
const closeBtn = document.getElementById('close-popup');
const popupOverlay = document.getElementById('subscription-popup');
const popupForm = document.getElementById('subscription-form');

if (subscribeBtn) {
  subscribeBtn.addEventListener('click', openPopup);
}

if (closeBtn) {
  closeBtn.addEventListener('click', closePopup);
}

if (popupOverlay) {
  popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) {
      closePopup();
    }
  });
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popupOverlay.style.display === 'flex') {
      closePopup();
    }
  });
}

if (popupForm) {
  popupForm.addEventListener('submit', handleSubscription);
}

// ========================================
// IMAGE LAZY LOADING & OPTIMIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // Add loading="lazy" to all images for better performance
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
  });
});

// ========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========================================
// FORM FIELD ENHANCEMENTS
// ========================================

// Auto-format phone numbers
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
  input.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
      if (value.length <= 3) {
        value = `(${value}`;
      } else if (value.length <= 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
      } else {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
      }
    }
    e.target.value = value;
  });
});

// Set minimum date for reservation date picker
const dateInput = document.getElementById('reservation-date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================

// Add aria-labels to buttons without text
document.querySelectorAll('button').forEach(button => {
  if (!button.textContent.trim() && !button.getAttribute('aria-label')) {
    const id = button.id || button.className;
    button.setAttribute('aria-label', `Button: ${id}`);
  }
});

// Announce dynamic content changes for screen readers
function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  document.body.appendChild(announcement);
  
  setTimeout(() => announcement.remove(), 1000);
}

// ========================================
// PERFORMANCE MONITORING
// ========================================

// Log performance metrics
window.addEventListener('load', () => {
  if ('performance' in window) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page load time: ${pageLoadTime}ms`);
  }
});

// ========================================
// ERROR HANDLING
// ========================================

window.addEventListener('error', (e) => {
  console.error('An error occurred:', e.message);
});

// Handle image loading errors
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    this.style.display = 'none';
    console.warn(`Failed to load image: ${this.src}`);
  });
});

console.log('✓ All scripts loaded successfully');
console.log('✓ Theme:', localStorage.getItem('theme') || 'light');
console.log('✓ Restaurant website ready!');

// ========================================
// TASK 0: jQuery Setup and Ready Function
// ========================================
$(document).ready(function() {
    console.log("jQuery is ready!");
    
    // Initialize all jQuery features
    initSearch();
    initAutocomplete();
    initSearchHighlighting();
    initScrollProgress();
    initAnimatedCounter();
    initLoadingSpinner();
    initNotificationSystem();
    initCopyToClipboard();
    initLazyLoading();
});

// ========================================
// PART 1: jQuery Search
// ========================================

// TASK 1: Real-time Search and Live Filter
function initSearch() {
    // Add search bar HTML dynamically to menu page
    if ($('#menu-header').length) {
        $('#menu-header').after(`
            <div class="search-container" style="max-width: 600px; margin: 20px auto; padding: 0 20px;">
                <input type="text" id="menu-search" placeholder="Search menu items..." 
                       style="width: 100%; padding: 12px; border: 2px solid var(--border-color); 
                              border-radius: 8px; font-size: 1rem; background: var(--card-bg); 
                              color: var(--text-color);">
                <p id="search-results" style="text-align: center; margin-top: 10px; color: var(--nav-color);"></p>
            </div>
        `);
    }
    
    // Real-time filtering
    $('#menu-search').on('keyup', function() {
        const searchTerm = $(this).val().toLowerCase();
        let visibleCount = 0;
        
        $('.menu-item').filter(function() {
            const text = $(this).text().toLowerCase();
            const matches = text.indexOf(searchTerm) > -1;
            $(this).toggle(matches);
            if (matches) visibleCount++;
            return !matches;
        });
        
        // Update results count
        if (searchTerm.length > 0) {
            $('#search-results').text(`Found ${visibleCount} item(s)`);
        } else {
            $('#search-results').text('');
        }
    });
}

// TASK 2: Autocomplete Search Suggestions
function initAutocomplete() {
    // Create autocomplete for reservation page
    if ($('#booking-header').length) {
        $('#booking-header').after(`
            <div class="autocomplete-container" style="max-width: 600px; margin: 20px auto; padding: 0 20px; position: relative;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold; color: var(--nav-color);">
                    Search Location or Event Type:
                </label>
                <input type="text" id="autocomplete-search" placeholder="Type to see suggestions..." 
                       style="width: 100%; padding: 12px; border: 2px solid var(--border-color); 
                              border-radius: 8px; font-size: 1rem; background: var(--card-bg); 
                              color: var(--text-color);">
                <ul id="autocomplete-suggestions" style="position: absolute; width: 100%; background: var(--card-bg); 
                    border: 2px solid var(--border-color); border-top: none; border-radius: 0 0 8px 8px; 
                    list-style: none; padding: 0; margin: 0; max-height: 200px; overflow-y: auto; 
                    display: none; z-index: 1000; box-shadow: 0 4px 8px var(--shadow);"></ul>
            </div>
        `);
    }
    
    const suggestions = [
        'Birthday Party', 'Anniversary Dinner', 'Business Meeting', 
        'Wedding Reception', 'Date Night', 'Family Gathering',
        'Private Dining Room', 'Outdoor Terrace', 'Main Dining Hall',
        'Romantic Corner', 'Bar Area', 'VIP Section'
    ];
    
    $('#autocomplete-search').on('keyup', function() {
        const input = $(this).val().toLowerCase();
        const $suggestionsList = $('#autocomplete-suggestions');
        
        if (input.length === 0) {
            $suggestionsList.hide().empty();
            return;
        }
        
        const filtered = suggestions.filter(item => 
            item.toLowerCase().includes(input)
        );
        
        if (filtered.length > 0) {
            $suggestionsList.empty().show();
            filtered.forEach(item => {
                $suggestionsList.append(`
                    <li style="padding: 10px; cursor: pointer; border-bottom: 1px solid var(--border-color);"
                        class="autocomplete-item">${item}</li>
                `);
            });
        } else {
            $suggestionsList.hide().empty();
        }
    });
    
    // Click on suggestion
    $(document).on('click', '.autocomplete-item', function() {
        $('#autocomplete-search').val($(this).text());
        $('#autocomplete-suggestions').hide().empty();
    });
    
    // Close suggestions when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.autocomplete-container').length) {
            $('#autocomplete-suggestions').hide().empty();
        }
    });
}

// TASK 3: Search Highlighting
function initSearchHighlighting() {
    // Add highlight search to About page (FAQ section)
    if ($('.accordion').length) {
        $('.accordion').before(`
            <div class="highlight-search" style="max-width: 800px; margin: 20px auto; padding: 0 20px;">
                <input type="text" id="highlight-search" placeholder="Search and highlight in FAQs..." 
                       style="width: 100%; padding: 12px; border: 2px solid var(--border-color); 
                              border-radius: 8px; font-size: 1rem; background: var(--card-bg); 
                              color: var(--text-color);">
                <button id="clear-highlight" style="margin-top: 10px; padding: 8px 16px; 
                        background: var(--button-bg); color: var(--footer-text); border: none; 
                        border-radius: 5px; cursor: pointer; font-weight: bold;">Clear Highlights</button>
            </div>
        `);
    }
    
    // Store original content
    let originalContent = {};
    
    $('#highlight-search').on('keyup', function() {
        const searchTerm = $(this).val().trim();
        
        // Clear previous highlights
        $('.accordion-content p').each(function(index) {
            if (originalContent[index]) {
                $(this).html(originalContent[index]);
            } else {
                originalContent[index] = $(this).html();
            }
        });
        
        if (searchTerm.length > 0) {
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            
            $('.accordion-content p').each(function() {
                const text = $(this).html();
                const highlighted = text.replace(regex, 
                    '<span style="background-color: #ffeb3b; color: #000; padding: 2px 4px; border-radius: 3px; font-weight: bold;">$1</span>'
                );
                $(this).html(highlighted);
            });
        }
    });
    
    $('#clear-highlight').on('click', function() {
        $('#highlight-search').val('');
        $('.accordion-content p').each(function(index) {
            if (originalContent[index]) {
                $(this).html(originalContent[index]);
            }
        });
    });
}

// ========================================
// PART 2: UX Engagement Elements
// ========================================

// TASK 4: Colorful Scroll Progress Bar
function initScrollProgress() {
    // Add progress bar to body
    $('body').prepend(`
        <div id="scroll-progress" style="position: fixed; top: 0; left: 0; height: 4px; 
             background: linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff); 
             width: 0%; z-index: 9999; transition: width 0.1s ease; 
             box-shadow: 0 2px 10px rgba(255, 107, 107, 0.5);"></div>
    `);
    
    $(window).on('scroll', function() {
        const windowHeight = $(window).height();
        const documentHeight = $(document).height();
        const scrollTop = $(window).scrollTop();
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        $('#scroll-progress').css('width', scrollPercent + '%');
    });
}

// TASK 5: Animated Number Counter
function initAnimatedCounter() {
    // Add stats section to home page
    if ($('#top-banner').length) {
        $('#top-banner').after(`
            <section class="stats-section" style="background: var(--section-bg); padding: 40px 20px; 
                     text-align: center; margin: 20px 0;">
                <h2 style="color: var(--logo-color); margin-bottom: 30px;">Our Achievements</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
                     gap: 30px; max-width: 1000px; margin: 0 auto;">
                    <div class="stat-item">
                        <div class="counter" data-target="1500" style="font-size: 3rem; font-weight: bold; 
                             color: var(--button-bg); margin-bottom: 10px;">0</div>
                        <p style="font-size: 1.1rem; color: var(--text-color);">Happy Customers</p>
                    </div>
                    <div class="stat-item">
                        <div class="counter" data-target="50" style="font-size: 3rem; font-weight: bold; 
                             color: var(--button-bg); margin-bottom: 10px;">0</div>
                        <p style="font-size: 1.1rem; color: var(--text-color);">Menu Items</p>
                    </div>
                    <div class="stat-item">
                        <div class="counter" data-target="6" style="font-size: 3rem; font-weight: bold; 
                             color: var(--button-bg); margin-bottom: 10px;">0</div>
                        <p style="font-size: 1.1rem; color: var(--text-color);">Years Experience</p>
                    </div>
                    <div class="stat-item">
                        <div class="counter" data-target="25" style="font-size: 3rem; font-weight: bold; 
                             color: var(--button-bg); margin-bottom: 10px;">0</div>
                        <p style="font-size: 1.1rem; color: var(--text-color);">Expert Chefs</p>
                    </div>
                </div>
            </section>
        `);
    }
    
    let counterAnimated = false;
    
    function animateCounters() {
        if (counterAnimated) return;
        
        const statsSection = $('.stats-section');
        if (statsSection.length === 0) return;
        
        const sectionTop = statsSection.offset().top;
        const sectionHeight = statsSection.outerHeight();
        const windowHeight = $(window).height();
        const scrollTop = $(window).scrollTop();
        
        if (scrollTop + windowHeight > sectionTop + (sectionHeight / 2)) {
            counterAnimated = true;
            
            $('.counter').each(function() {
                const $this = $(this);
                const target = parseInt($this.data('target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(function() {
                    current += increment;
                    if (current >= target) {
                        $this.text(target + '+');
                        clearInterval(timer);
                    } else {
                        $this.text(Math.floor(current));
                    }
                }, 16);
            });
        }
    }
    
    $(window).on('scroll', animateCounters);
    animateCounters(); // Check on load
}

// TASK 6: Loading Spinner on Submit
function initLoadingSpinner() {
    // Add to all submit buttons
    $('form').on('submit', function(e) {
        const $form = $(this);
        const $submitBtn = $form.find('button[type="submit"], .submit-btn');
        
        if ($submitBtn.hasClass('loading')) return;
        
        // Prevent default temporarily
        e.preventDefault();
        
        // Store original text
        const originalText = $submitBtn.html();
        
        // Add loading state
        $submitBtn.addClass('loading')
                  .prop('disabled', true)
                  .html(`
                      <span style="display: inline-flex; align-items: center; gap: 10px;">
                          <span class="spinner" style="width: 16px; height: 16px; border: 3px solid rgba(255,255,255,0.3); 
                                border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite;"></span>
                          Please wait...
                      </span>
                  `);
        
        // Add CSS animation for spinner
        if (!$('#spinner-styles').length) {
            $('head').append(`
                <style id="spinner-styles">
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                </style>
            `);
        }
        
        // Simulate server call
        setTimeout(function() {
            $submitBtn.removeClass('loading')
                     .prop('disabled', false)
                     .html(originalText);
            
            // Show success notification
            showNotification('✓ Form submitted successfully!', 'success');
            
            // Reset form
            $form[0].reset();
        }, 2000);
    });
}

// ========================================
// PART 3: Improve Web App Functionality
// ========================================

// TASK 7: Notification System
function initNotificationSystem() {
    // Add notification container
    $('body').append(`
        <div id="notification-container" style="position: fixed; top: 80px; right: 20px; 
             z-index: 10000; display: flex; flex-direction: column; gap: 10px;"></div>
    `);
}

function showNotification(message, type = 'info') {
    const colors = {
        success: '#4caf50',
        error: '#f44336',
        info: '#2196f3',
        warning: '#ff9800'
    };
    
    const $notification = $(`
        <div class="notification" style="background: ${colors[type]}; color: white; padding: 15px 20px; 
             border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); min-width: 250px; 
             max-width: 350px; opacity: 0; transform: translateX(400px); transition: all 0.3s ease; 
             cursor: pointer; font-weight: 500;">
            ${message}
        </div>
    `);
    
    $('#notification-container').append($notification);
    
    // Animate in
    setTimeout(() => {
        $notification.css({
            opacity: 1,
            transform: 'translateX(0)'
        });
    }, 10);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        $notification.css({
            opacity: 0,
            transform: 'translateX(400px)'
        });
        setTimeout(() => $notification.remove(), 300);
    }, 3000);
    
    // Remove on click
    $notification.on('click', function() {
        $(this).css({
            opacity: 0,
            transform: 'translateX(400px)'
        });
        setTimeout(() => $(this).remove(), 300);
    });
}

// TASK 8: Copy to Clipboard
function initCopyToClipboard() {
    // Add copy buttons to contact info
    if ($('.contact-info').length) {
        $('.info-box').each(function() {
            const $box = $(this);
            const text = $box.find('p').text().trim();
            
            if (text && (text.includes('555') || text.includes('@') || text.includes('Street'))) {
                $box.css('position', 'relative');
                $box.append(`
                    <button class="copy-btn" data-copy="${text}" style="position: absolute; top: 10px; 
                            right: 10px; background: var(--button-bg); color: white; border: none; 
                            padding: 6px 12px; border-radius: 5px; cursor: pointer; font-size: 0.9rem; 
                            transition: all 0.3s;">
                        📋 Copy
                    </button>
                `);
            }
        });
    }
    
    // Add to address in footer
    $('footer p').each(function() {
        const $p = $(this);
        if ($p.text().includes('Address:')) {
            const address = '123 Divine Street, Heaven\'s Gate City';
            $p.css('position', 'relative').append(`
                <button class="copy-btn" data-copy="${address}" style="margin-left: 10px; 
                        background: var(--button-bg); color: white; border: none; 
                        padding: 4px 10px; border-radius: 4px; cursor: pointer; font-size: 0.85rem;">
                    📋 Copy
                </button>
            `);
        }
    });
    
    // Copy functionality
    $(document).on('click', '.copy-btn', function() {
        const $btn = $(this);
        const textToCopy = $btn.data('copy');
        
        // Create temporary input
        const $temp = $('<textarea>');
        $('body').append($temp);
        $temp.val(textToCopy).select();
        document.execCommand('copy');
        $temp.remove();
        
        // Change button appearance
        const originalHTML = $btn.html();
        $btn.html('✓ Copied!').css('background', '#4caf50');
        
        // Show tooltip
        showNotification('📋 Copied to clipboard!', 'success');
        
        // Reset after 2 seconds
        setTimeout(() => {
            $btn.html(originalHTML).css('background', '');
        }, 2000);
    });
}

// TASK 9: Image Lazy Loading
function initLazyLoading() {
    // Find all images and add lazy loading
    $('img').each(function() {
        const $img = $(this);
        const src = $img.attr('src');
        
        if (src && !$img.hasClass('lazy-loaded')) {
            // Store original src
            $img.attr('data-src', src);
            // Replace with placeholder
            $img.attr('src', 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"%3E%3Crect fill="%23ddd" width="800" height="400"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ELoading...%3C/text%3E%3C/svg%3E');
            $img.addClass('lazy');
        }
    });
    
    function loadVisibleImages() {
        $('.lazy').each(function() {
            const $img = $(this);
            const windowHeight = $(window).height();
            const scrollTop = $(window).scrollTop();
            const imgTop = $img.offset().top;
            
            // Load if image is in viewport or close to it (200px threshold)
            if (imgTop < scrollTop + windowHeight + 200) {
                const src = $img.attr('data-src');
                
                // Create new image to preload
                const newImg = new Image();
                newImg.onload = function() {
                    $img.attr('src', src)
                        .removeClass('lazy')
                        .addClass('lazy-loaded')
                        .css({
                            opacity: 0,
                            transition: 'opacity 0.5s ease'
                        });
                    
                    setTimeout(() => $img.css('opacity', 1), 10);
                };
                newImg.src = src;
            }
        });
    }
    
    // Load images on scroll
    $(window).on('scroll', loadVisibleImages);
    // Load images on page load
    loadVisibleImages();
}

// Test notifications on page load
$(document).ready(function() {
    setTimeout(() => {
        showNotification('Welcome to God loves the Trinity! 🍽️', 'success');
    }, 1000);
});