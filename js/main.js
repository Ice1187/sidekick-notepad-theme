/**
 * Main application entry point
 * Initializes all modules and sets up event listeners
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize grid with a smaller number of dots for better performance
    Grid.init('.dot-grid');
    
    // Initialize post manager (which will handle the tasks too)
    PostManager.init();
    
    // Date display
    displayCurrentDate();
});

/**
 * Display current date in the date box
 */
function displayCurrentDate() {
    const dateLabel = document.querySelector('.date-space');
    if (dateLabel) {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateLabel.textContent = now.toLocaleDateString(undefined, options);
    }
}

/**
 * Theme Management
 * Function to change theme colors
 * @param {string} theme - Theme name ('default', 'dark', 'blue', etc.)
 */
function setTheme(theme) {
    // Remove any existing theme classes
    document.body.className = '';
    
    // Add the new theme class
    if (theme && theme !== 'default') {
        document.body.classList.add(`theme-${theme}`);
    }
    
    // Save preference in localStorage
    localStorage.setItem('sidekick-theme', theme);
}

// Load saved theme from localStorage
const savedTheme = localStorage.getItem('sidekick-theme');
if (savedTheme) {
    setTheme(savedTheme);
}
