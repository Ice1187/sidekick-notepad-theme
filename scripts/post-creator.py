#!/usr/bin/env python3
"""
Post Creator Script for Sidekick Blog
Creates new posts and updates the post index
"""

import os
import json
import argparse
from datetime import datetime

# Default settings
DEFAULT_POSTS_DIR = "../posts"
DEFAULT_INDEX_FILE = "../posts/index.json"

# Available handwritten fonts
AVAILABLE_FONTS = [
    "'Indie Flower', cursive",
    "'Caveat', cursive", 
    "'Shadows Into Light', cursive",
    "'Architects Daughter', cursive",
    "'Kalam', cursive",
    "'Satisfy', cursive",
    "'Homemade Apple', cursive"
]

# Available colors
AVAILABLE_COLORS = [
    "#2a6496",  # blue
    "#217844",  # green
    "#9c27b0",  # purple
    "#e91e63",  # pink
    "#f44336",  # red
    "#ff9800",  # orange
    "#795548"   # brown
]

def load_post_index(index_file):
    """Load the post index JSON file"""
    try:
        with open(index_file, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        # Create a new index if it doesn't exist
        return {"posts": [], "connections": []}

def save_post_index(index_data, index_file):
    """Save the post index JSON file"""
    with open(index_file, 'w') as f:
        json.dump(index_data, f, indent=2)

def create_post_file(posts_dir, filename, title, content):
    """Create a new markdown post file"""
    post_path = os.path.join(posts_dir, filename)
    
    # Create the posts directory if it doesn't exist
    os.makedirs(posts_dir, exist_ok=True)
    
    # Generate default content if none provided
    if not content:
        content = f"""# {title}

Created on {datetime.now().strftime('%Y-%m-%d')}

Write your post content here...
"""
    
    with open(post_path, 'w') as f:
        f.write(content)
    
    return post_path

def generate_post_id(index_data):
    """Generate a unique post ID"""
    if not index_data["posts"]:
        return "post1"
    
    # Find the highest post number
    highest_num = 0
    for post in index_data["posts"]:
        if post["id"].startswith("post"):
            try:
                num = int(post["id"][4:])
                highest_num = max(highest_num, num)
            except ValueError:
                pass
    
    return f"post{highest_num + 1}"

def generate_task_id(index_data):
    """Generate a unique task ID"""
    if not index_data["posts"]:
        return "task1"
    
    # Find the highest task number
    highest_num = 0
    for post in index_data["posts"]:
        if post["id"].startswith("task"):
            try:
                num = int(post["id"][4:])
                highest_num = max(highest_num, num)
            except ValueError:
                pass
    
    return f"task{highest_num + 1}"

def add_grid_post(args, index_data):
    """Add a new grid post to the index"""
    # Generate filename if not provided
    filename = args.filename or f"{args.title.lower().replace(' ', '-')}.md"
    
    # Create post file
    create_post_file(args.posts_dir, filename, args.title, args.content)
    
    # Generate post ID
    post_id = generate_post_id(index_data)
    
    # Add post to index
    new_post = {
        "id": post_id,
        "title": args.title,
        "type": "grid",
        "file": filename,
        "position": {
            "x": args.x,
            "y": args.y
        },
        "size": {
            "width": args.width,
            "height": args.height
        },
        "styles": {
            "font": args.font,
            "color": args.color,
            "fontSize": f"{args.font_size}rem",
            "padding": "5px"
        }
    }
    
    # Add URL if provided
    if args.url:
        new_post["url"] = args.url
    
    index_data["posts"].append(new_post)
    
    return post_id, new_post

def add_task_post(args, index_data):
    """Add a new task post to the index"""
    # Generate filename if not provided
    filename = args.filename or f"{args.title.lower().replace(' ', '-')}.md"
    
    # Create post file
    create_post_file(args.posts_dir, filename, args.title, args.content)
    
    # Generate post ID
    post_id = generate_task_id(index_data)
    
    # Add post to index
    new_post = {
        "id": post_id,
        "title": args.title,
        "type": "task",
        "file": filename,
        "styles": {
            "font": args.font,
            "color": "#333",
            "circleColor": args.color
        }
    }
    
    # Add URL if provided
    if args.url:
        new_post["url"] = args.url
    
    index_data["posts"].append(new_post)
    
    return post_id, new_post

def add_connection(args, index_data):
    """Add a connection between two posts"""
    from_post = args.from_post
    to_post = args.to_post
    
    # Verify posts exist
    post_ids = [post["id"] for post in index_data["posts"]]
    if from_post not in post_ids:
        print(f"Error: Post '{from_post}' not found")
        return False
    
    if to_post not in post_ids:
        print(f"Error: Post '{to_post}' not found")
        return False
    
    # Create connection
    new_connection = {
        "from": from_post,
        "to": to_post,
        "color": args.color,
        "width": args.width
    }
    
    # Add dashed style if specified
    if args.dashed:
        new_connection["dashed"] = args.dashed
    
    # Check for duplicate connections
    for conn in index_data["connections"]:
        if conn["from"] == from_post and conn["to"] == to_post:
            print(f"Connection between '{from_post}' and '{to_post}' already exists")
            return False
    
    index_data["connections"].append(new_connection)
    return True

def list_posts(index_data):
    """List all posts in the index"""
    print("\nGrid Posts:")
    print("-" * 60)
    for post in index_data["posts"]:
        if post["type"] == "grid":
            print(f"{post['id']}: {post['title']} (Position: {post['position']['x']}, {post['position']['y']})")
    
    print("\nTask Posts:")
    print("-" * 60)
    for post in index_data["posts"]:
        if post["type"] == "task":
            print(f"{post['id']}: {post['title']}")
    
    print("\nConnections:")
    print("-" * 60)
    for conn in index_data["connections"]:
        print(f"{conn['from']} → {conn['to']} (Color: {conn.get('color', 'default')})")

def list_fonts():
    """List available handwritten fonts"""
    print("\nAvailable Fonts:")
    print("-" * 60)
    for i, font in enumerate(AVAILABLE_FONTS, 1):
        print(f"{i}. {font}")

def list_colors():
    """List available colors"""
    print("\nAvailable Colors:")
    print("-" * 60)
    for i, color in enumerate(AVAILABLE_COLORS, 1):
        print(f"{i}. {color}")

def main():
    parser = argparse.ArgumentParser(description="Sidekick Blog Post Creator")
    parser.add_argument("--posts-dir", default=DEFAULT_POSTS_DIR, help="Directory for posts")
    parser.add_argument("--index-file", default=DEFAULT_INDEX_FILE, help="Path to index.json")
    
    subparsers = parser.add_subparsers(dest="command", help="Command")
    
    # Grid post command
    grid_parser = subparsers.add_parser("grid", help="Add a grid post")
    grid_parser.add_argument("title", help="Post title")
    grid_parser.add_argument("--filename", help="Markdown filename (optional)")
    grid_parser.add_argument("--url", help="External URL (optional)")
    grid_parser.add_argument("--x", type=int, required=True, help="Grid X position")
    grid_parser.add_argument("--y", type=int, required=True, help="Grid Y position")
    grid_parser.add_argument("--width", type=int, default=10, help="Grid width in dots")
    grid_parser.add_argument("--height", type=int, default=2, help="Grid height in dots")
    grid_parser.add_argument("--font", default=AVAILABLE_FONTS[0], help="Font family")
    grid_parser.add_argument("--color", default=AVAILABLE_COLORS[0], help="Text color")
    grid_parser.add_argument("--font-size", type=float, default=1.0, help="Font size in rem")
    grid_parser.add_argument("--content", help="Initial post content")
    
    # Task post command
    task_parser = subparsers.add_parser("task", help="Add a task post")
    task_parser.add_argument("title", help="Task title")
    task_parser.add_argument("--filename", help="Markdown filename (optional)")
    task_parser.add_argument("--url", help="External URL (optional)")
    task_parser.add_argument("--font", default=AVAILABLE_FONTS[0], help="Font family")
    task_parser.add_argument("--color", default=AVAILABLE_COLORS[0], help="Circle color")
    task_parser.add_argument("--content", help="Initial post content")
    
    # Connection command
    conn_parser = subparsers.add_parser("connect", help="Add a connection between posts")
    conn_parser.add_argument("from_post", help="Source post ID")
    conn_parser.add_argument("to_post", help="Target post ID")
    conn_parser.add_argument("--color", default="#6c757d", help="Line color")
    conn_parser.add_argument("--width", type=int, default=2, help="Line width")
    conn_parser.add_argument("--dashed", help="Dash pattern (e.g., '5,5')")
    
    # List command
    list_parser = subparsers.add_parser("list", help="List posts and connections")
    
    # Font list command
    fonts_parser = subparsers.add_parser("fonts", help="List available fonts")
    
    # Color list command
    colors_parser = subparsers.add_parser("colors", help="List available colors")
    
    args = parser.parse_args()
    
    # Handle commands
    if args.command == "list":
        index_data = load_post_index(args.index_file)
        list_posts(index_data)
    elif args.command == "fonts":
        list_fonts()
    elif args.command == "colors":
        list_colors()
    elif args.command in ["grid", "task", "connect"]:
        index_data = load_post_index(args.index_file)
        
        if args.command == "grid":
            post_id, new_post = add_grid_post(args, index_data)
            save_post_index(index_data, args.index_file)
            print(f"Added grid post '{post_id}': {new_post['title']}")
        elif args.command == "task":
            post_id, new_post = add_task_post(args, index_data)
            save_post_index(index_data, args.index_file)
            print(f"Added task post '{post_id}': {new_post['title']}")
        elif args.command == "connect":
            if add_connection(args, index_data):
                save_post_index(index_data, args.index_file)
                print(f"Added connection from '{args.from_post}' to '{args.to_post}'")
    else:
        parser.print_help()
        

if __name__ == "__main__":
    main()
