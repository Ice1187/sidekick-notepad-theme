# blog
My new blog

---

# SIDEKICK Template

This web design is inspired by [Sidekick Notepad from Cortex Brand](https://www.sidekicknotepad.com/).

A clean, modular implementation of the SIDEKICK notebook template with a dot grid and task list.

## Project Structure

```
sidekick-template/
│
├── index.html              # Main HTML document
│
├── css/                    # CSS styles folder
│   ├── reset.css           # CSS reset and base styles
│   └── styles.css          # Main application styles
│
├── js/                     # JavaScript folder
│   ├── grid.js             # Dot grid functionality
│   ├── tasks.js            # Task list functionality
│   └── main.js             # Main application logic
│
├── themes/                 # Optional: additional theme files
│   ├── dark.css            # Example dark theme
│   └── blue.css            # Example blue theme
│
└── README.md               # Project documentation
```

## Features

- Clean, modular code structure
- Responsive design
- Customizable dot grid
- Configurable task list
- Theme support
- Mobile-friendly

## Customization

### Modifying the Grid

The dot grid can be customized by updating the Grid configuration in `js/grid.js`:

```javascript
Grid.updateConfig({
    rows: 25,              // Number of rows
    columns: 25,           // Number of columns
    dotSize: 3,            // Size of dots in pixels
    dotColor: '#aaa'       // Color of dots
});
```

### Modifying the Task List

The task list can be customized by updating the Tasks configuration in `js/tasks.js`:

```javascript
Tasks.updateConfig({
    count: 15,              // Number of task items
    circleSize: 24,         // Size of circles in pixels
    circleColor: '#bbb',    // Border color of circles
    lineColor: '#ccc'       // Border color of task lines
});
```

### Adding Themes

1. Create a new CSS file in the `themes` folder
2. Add theme-specific styles
3. Apply the theme using the `setTheme()` function:

```javascript
setTheme('dark');  // Applies theme-dark class to body
```

## Getting Started

1. Clone or download this repository
2. Open `index.html` in your browser
3. Customize as needed

## Browser Support

This template supports all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge
