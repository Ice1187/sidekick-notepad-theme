/**
 * Grid Module
 * Creates and manages the dot grid
 */

const Grid = {
    /**
     * Configuration for the grid
     */
    config: {
        rows: 30,
        columns: 30,
        dotSize: 2,
        dotColor: '#ccc'
    },

    /**
     * Initialize the grid
     * @param {string} selector - CSS selector for grid container
     */
    init: function(selector) {
        this.container = document.querySelector(selector);
        if (!this.container) {
            console.error('Grid container not found:', selector);
            return;
        }
        
        this.createDots();
    },

    /**
     * Create dots within the grid
     */
    createDots: function() {
        const totalDots = this.config.rows * this.config.columns;
        
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            this.container.appendChild(dot);
        }
    },

    /**
     * Change grid configuration
     * @param {Object} newConfig - New configuration options
     */
    updateConfig: function(newConfig) {
        // Update configuration
        this.config = { ...this.config, ...newConfig };
        
        // Clear and recreate grid
        this.container.innerHTML = '';
        
        // Update CSS grid template
        this.container.style.gridTemplateColumns = `repeat(${this.config.columns}, 1fr)`;
        this.container.style.gridTemplateRows = `repeat(${this.config.rows}, 1fr)`;
        
        // Update dot appearance via CSS custom property
        document.documentElement.style.setProperty('--dot-size', `${this.config.dotSize}px`);
        document.documentElement.style.setProperty('--dot-color', this.config.dotColor);
        
        // Recreate dots
        this.createDots();
    }
};
