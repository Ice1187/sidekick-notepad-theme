/**
 * Main application entry point
 * Initializes all modules and sets up event listeners
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize grid
    Grid.init('.dot-grid');
    
    // Initialize tasks
    Tasks.init('.task-list');
    
    // Example of how to update grid configuration
    // Grid.updateConfig({
    //     rows: 25,
    //     columns: 25,
    //     dotSize: 3,
    //     dotColor: '#aaa'
    // });
    
    // Example of how to update tasks configuration
    // Tasks.updateConfig({
    //     count: 15,
    //     circleSize: 24,
    //     circleColor: '#bbb',
    //     lineColor: '#ccc'
    // });
});

/**
 * Theme Management
 * Example function to change theme colors
 * @param {string} theme - Theme name ('default', 'dark', 'blue', etc.)
 */
function setTheme(theme) {
    // Remove any existing theme classes
    document.body.className = '';
    
    // Add the new theme class
    if (theme && theme !== 'default') {
        document.body.classList.add(`theme-${theme}`);
    }
    
    // Save preference in localStorage (optional)
    localStorage.setItem('sidekick-theme', theme);
}

/**
 * Example of exporting notebook data
 * Could be extended to save to JSON/CSV/etc.
 */
function exportNotebook() {
    const notebookData = {
        date: new Date().toISOString(),
        tasks: [],
        notes: []
        // Add more fields as needed
    };
    
    // Example of collecting task data
    document.querySelectorAll('.task-item').forEach((item, index) => {
        notebookData.tasks.push({
            id: index,
            completed: item.classList.contains('completed'),
            text: item.querySelector('.task-text')?.textContent || ''
        });
    });
    
    console.log('Notebook data:', notebookData);
    return notebookData;
    
    // In a real application, you might:
    // - Save to localStorage
    // - Send to a server
    // - Generate a download file
}

// Load saved theme from localStorage (example)
const savedTheme = localStorage.getItem('sidekick-theme');
if (savedTheme) {
    setTheme(savedTheme);
}
