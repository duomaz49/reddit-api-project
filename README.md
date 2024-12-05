# Reddit Minimal

Project is a minimal Reddit client that uses the Reddit API from:
https://github.com/reddit-archive/reddit/wiki/JSON to fetch posts and display them in a list. 
The project is built using Vite, React, Typ Redux Toolkit, Reactstrap and Boostrap CSS.

#### How to run the project
Clone the project and run the following commands in the project directory:
```sh
npm install
npm run dev
```

#### Features
- Subreddit Selection: Browse posts by selecting subreddits from the navigation bar.
- Dynamic Loading: Fetches subreddit posts in real-time upon selection.
- Post Carousel: View posts in a carousel layout for smooth and responsive navigation.
- Error Handling: Displays user-friendly messages when an error occurs (e.g., API rate limits or empty subreddits).
- Responsive Design: Ensures an optimal experience across various devices.
- Loading Spinner: Provides visual feedback while loading posts.

#### Tech Stack
- React: Core framework for building the user interface.
- Vite: A fast build tool and development server for modern web projects.
- Redux Toolkit: State management for storing and managing subreddit and post data.
- TypeScript: Ensures strong typing and maintainable code.
- Reactstrap & Bootstrap: Provides responsive and modern styling.
- React Icons: Offers lightweight and scalable icons.

#### Usage
- Run the app: Open http://localhost:3000 in your browser.
- Select a Subreddit: Use the navigation bar to select a subreddit category.
- View Posts: Posts will be displayed in the carousel on the homepage.
- Error Handling: If no subreddit is selected or there are issues with loading, appropriate messages will guide the user.