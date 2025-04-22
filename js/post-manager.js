/**
 * Post Manager
 * Manages blog posts and their presentation in the grid or task list
 */

const PostManager = {
    /**
     * Configuration for the post manager
     */
    config: {
        postsDirectory: 'posts/',
        postIndex: 'posts/index.json',
        gridSelector: '.dot-grid',
        taskListSelector: '.task-list'
    },

    /**
     * Posts data
     */
    posts: [],
    connections: [],
    
    /**
     * Initialize the post manager
     */
    init: async function() {
        try {
            // Load post index
            const response = await fetch(this.config.postIndex);
            const data = await response.json();
            
            this.posts = data.posts || [];
            this.connections = data.connections || [];
            
            // Render posts
            this.renderGridPosts();
            this.renderTaskPosts();
            this.drawConnections();
        } catch (error) {
            console.error('Failed to initialize post manager:', error);
        }
    },
    
    /**
     * Render posts in the grid
     */
    renderGridPosts: function() {
        const gridContainer = document.querySelector(this.config.gridSelector);
        
        // Filter grid posts
        const gridPosts = this.posts.filter(post => post.type === 'grid');
        
        gridPosts.forEach(post => {
            // Create post element
            const postElement = document.createElement('a');
            postElement.href = post.url || `#post-${post.id}`;
            postElement.className = 'grid-post';
            postElement.dataset.postId = post.id;
            postElement.style.gridColumnStart = post.position.x;
            postElement.style.gridColumnEnd = post.position.x + post.size.width;
            postElement.style.gridRowStart = post.position.y;
            postElement.style.gridRowEnd = post.position.y + post.size.height;
            
            // Apply custom styles
            if (post.styles) {
                postElement.style.fontFamily = post.styles.font || 'inherit';
                postElement.style.color = post.styles.color || 'inherit';
                postElement.style.fontSize = post.styles.fontSize || 'inherit';
                postElement.style.fontWeight = post.styles.fontWeight || 'inherit';
                postElement.style.backgroundColor = post.styles.backgroundColor || 'transparent';
                postElement.style.padding = post.styles.padding || '0';
                postElement.style.zIndex = '1'; // Ensure posts are above the dots
            }
            
            // Set content
            postElement.textContent = post.title;
            
            // Add click event to show full post content
            postElement.addEventListener('click', (e) => {
                if (post.showContent !== false) {
                    e.preventDefault();
                    this.showPostContent(post);
                }
            });
            
            // Add to grid
            gridContainer.appendChild(postElement);
        });
    },
    
    /**
     * Render posts in the task list
     */
    renderTaskPosts: function() {
        const taskContainer = document.querySelector(this.config.taskListSelector);
        
        // Clear existing task items
        taskContainer.innerHTML = '';
        
        // Filter task posts
        const taskPosts = this.posts.filter(post => post.type === 'task');
        
        taskPosts.forEach(post => {
            // Create task item
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';
            taskItem.dataset.postId = post.id;
            
            // Create circle
            const circle = document.createElement('div');
            circle.className = 'circle';
            
            // Create task content
            const taskLink = document.createElement('a');
            taskLink.href = post.url || `#post-${post.id}`;
            taskLink.className = 'task-line';
            
            // Apply custom styles
            if (post.styles) {
                taskLink.style.fontFamily = post.styles.font || 'inherit';
                taskLink.style.color = post.styles.color || 'inherit';
                taskLink.style.fontSize = post.styles.fontSize || 'inherit';
                taskLink.style.fontWeight = post.styles.fontWeight || 'inherit';
                circle.style.borderColor = post.styles.circleColor || '#ccc';
            }
            
            // Set text content
            taskLink.textContent = post.title;
            
            // Add click event to show full post content
            taskLink.addEventListener('click', (e) => {
                if (post.showContent !== false) {
                    e.preventDefault();
                    this.showPostContent(post);
                }
            });
            
            // Assemble task item
            taskItem.appendChild(circle);
            taskItem.appendChild(taskLink);
            
            // Add to task list
            taskContainer.appendChild(taskItem);
        });
    },
    
    /**
     * Draw connections between posts
     */
    drawConnections: function() {
        // Get grid container for positioning reference
        const gridContainer = document.querySelector(this.config.gridSelector);
        const gridRect = gridContainer.getBoundingClientRect();
        
        // Create SVG overlay if it doesn't exist
        let svg = document.querySelector('.connections-overlay');
        if (!svg) {
            svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.classList.add('connections-overlay');
            svg.style.position = 'absolute';
            svg.style.top = '0';
            svg.style.left = '0';
            svg.style.width = '100%';
            svg.style.height = '100%';
            svg.style.pointerEvents = 'none';
            svg.style.zIndex = '0';
            gridContainer.appendChild(svg);
        }
        
        // Clear existing connections
        svg.innerHTML = '';
        
        // Calculate grid cell size
        const cellWidth = gridRect.width / 30; // Assuming 30 columns
        const cellHeight = gridRect.height / 30; // Assuming 30 rows
        
        // Draw each connection
        this.connections.forEach(connection => {
            // Find start and end post elements
            const startPost = document.querySelector(`.grid-post[data-post-id="${connection.from}"]`);
            const endPost = document.querySelector(`.grid-post[data-post-id="${connection.to}"]`);
            
            if (!startPost || !endPost) return;
            
            // Get post positions
            const startRect = startPost.getBoundingClientRect();
            const endRect = endPost.getBoundingClientRect();
            
            // Calculate start and end points relative to the grid
            const startX = (startRect.left + startRect.width/2) - gridRect.left;
            const startY = (startRect.top + startRect.height/2) - gridRect.top;
            const endX = (endRect.left + endRect.width/2) - gridRect.left;
            const endY = (endRect.top + endRect.height/2) - gridRect.top;
            
            // Create line element
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', startX);
            line.setAttribute('y1', startY);
            line.setAttribute('x2', endX);
            line.setAttribute('y2', endY);
            line.setAttribute('stroke', connection.color || '#888');
            line.setAttribute('stroke-width', connection.width || 2);
            
            // Add dashed style if specified
            if (connection.dashed) {
                line.setAttribute('stroke-dasharray', connection.dashed);
            }
            
            // Add line to SVG
            svg.appendChild(line);
        });
    },
    
    /**
     * Show full post content in a modal
     * @param {Object} post - Post data
     */
    showPostContent: async function(post) {
        try {
            // Fetch post content
            const response = await fetch(`${this.config.postsDirectory}${post.file}`);
            const postContent = await response.text();
            
            // Create modal if it doesn't exist
            let modal = document.querySelector('.post-modal');
            if (!modal) {
                modal = document.createElement('div');
                modal.className = 'post-modal';
                document.body.appendChild(modal);
                
                // Add modal styles
                const style = document.createElement('style');
                style.textContent = `
                    .post-modal {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.7);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 100;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }
                    
                    .post-modal.active {
                        opacity: 1;
                    }
                    
                    .post-content {
                        background-color: white;
                        padding: 2rem;
                        border-radius: 8px;
                        max-width: 800px;
                        width: 90%;
                        max-height: 80vh;
                        overflow-y: auto;
                        position: relative;
                    }
                    
                    .post-close {
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        font-size: 24px;
                        background: none;
                        border: none;
                        cursor: pointer;
                    }
                `;
                document.head.appendChild(style);
            }
            
            // Create modal content
            modal.innerHTML = `
                <div class="post-content">
                    <button class="post-close">&times;</button>
                    <h2>${post.title}</h2>
                    <div class="post-markdown">
                        ${this.convertMarkdownToHtml(postContent)}
                    </div>
                </div>
            `;
            
            // Show modal
            modal.classList.add('active');
            
            // Add close functionality
            const closeButton = modal.querySelector('.post-close');
            closeButton.addEventListener('click', () => {
                modal.classList.remove('active');
                setTimeout(() => modal.style.display = 'none', 300);
            });
            
            // Close when clicking outside content
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    setTimeout(() => modal.style.display = 'none', 300);
                }
            });
            
            // Show modal
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('active'), 10);
            
        } catch (error) {
            console.error('Failed to load post content:', error);
        }
    },
    
    /**
     * Simple markdown to HTML converter
     * @param {string} markdown - Markdown content
     * @return {string} HTML content
     */
    convertMarkdownToHtml: function(markdown) {
        // Very basic implementation - in a real project, use a proper markdown library
        let html = markdown;
        
        // Headers
        html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
        html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
        html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
        
        // Bold and italic
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Links
        html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
        
        // Lists
        html = html.replace(/^\* (.*$)/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/gms, '<ul>$1</ul>');
        
        // Paragraphs - split by new lines
        html = html.split(/\n\s*\n/).map(p => {
            if (
                !p.trim().startsWith('<h') && 
                !p.trim().startsWith('<ul') &&
                p.trim() !== ''
            ) {
                return `<p>${p}</p>`;
            }
            return p;
        }).join('\n');
        
        return html;
    }
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    PostManager.init();
});
