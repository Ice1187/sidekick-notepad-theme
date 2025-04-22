/**
 * Tasks Module
 * Creates and manages the task list
 */

const Tasks = {
    /**
     * Configuration for tasks
     */
    config: {
        count: 20,
        circleSize: 20,
        circleColor: '#ccc',
        lineColor: '#ddd'
    },

    /**
     * Initialize the tasks
     * @param {string} selector - CSS selector for task container
     */
    init: function(selector) {
        this.container = document.querySelector(selector);
        if (!this.container) {
            console.error('Task container not found:', selector);
            return;
        }
        
        this.createTasks();
    },

    /**
     * Create task items
     */
    createTasks: function() {
        for (let i = 0; i < this.config.count; i++) {
            const taskItem = document.createElement('div');
            taskItem.classList.add('task-item');
            
            const circle = document.createElement('div');
            circle.classList.add('circle');
            
            const taskLine = document.createElement('div');
            taskLine.classList.add('task-line');
            
            taskItem.appendChild(circle);
            taskItem.appendChild(taskLine);
            
            this.container.appendChild(taskItem);
        }
    },

    /**
     * Change task configuration
     * @param {Object} newConfig - New configuration options
     */
    updateConfig: function(newConfig) {
        // Update configuration
        this.config = { ...this.config, ...newConfig };
        
        // Clear and recreate tasks
        this.container.innerHTML = '';
        
        // Update circle and line appearance via CSS custom properties
        document.documentElement.style.setProperty('--circle-size', `${this.config.circleSize}px`);
        document.documentElement.style.setProperty('--circle-color', this.config.circleColor);
        document.documentElement.style.setProperty('--line-color', this.config.lineColor);
        
        // Recreate tasks
        this.createTasks();
    }
};
