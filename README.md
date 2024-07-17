# Particles Morphing Demo

This project creates a particle morphing animation using React, Three.js, and `@react-three/fiber`. The particles morph between different shapes such as a face, sphere, and text based on user controls.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [License](#license)

## Demo

[Link to live demo]()

## Features

- Particle morphing between different shapes
- Dynamic control of particle colors
- Customizable particle properties

## Installation

1. Clone the repository:

      ```git clone https://github.com/your-username/particles-morphing-demo.git
      cd particles-morphing-demo```

2. Install dependencies:

      ```npm install```

## Usage

1. Start the development server:

      ```npm run dev```

2. Open your browser and navigate to `http://localhost:5146` to see the particle morphing demo in action.

## Scripts

- `dev`: Starts the development server.
- `build`: Builds the project for production.

## Project Structure

      .
      ├── node_modules
      ├── public
      │   └── ... (static assets)
      ├── src
      │   ├── hooks
      │   │   ├── useParticles.js
      │   ├── shaders
      │   │   ├── particles
      │   │   │   ├── fragment.glsl
      │   │   │   └── vertex.glsl
      │   ├── Experience.jsx
      │   ├── index.html
      │   ├── index.jsx
      │   ├── style.css
      ├── .gitignore
      ├── package-lock.json
      ├── package.json
      ├── README.md
      └── vite.config.js

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Three.js**: A JavaScript 3D library.
- **@react-three/fiber**: React renderer for Three.js.
- **@react-three/drei**: Useful helpers for `@react-three/fiber`.
- **Leva**: A GUI for React to control parameters.
- **Vite**: A build tool that aims to provide a faster and leaner development experience.

## License

This project is licensed under the MIT License.
