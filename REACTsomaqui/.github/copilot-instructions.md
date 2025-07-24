<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# SomAqui.cat React Migration Project

This is a React TypeScript project migrated from an HTML/CSS/JS application. SomAqui.cat is a community emergency platform that connects people who need help with those who can provide it.

## Project Context
- **Original**: HTML/CSS/JS application with multiple pages
- **Migration to**: React TypeScript with Vite build tool
- **Key Features**: Emergency help requests, volunteer registration, interactive maps, user authentication

## Component Architecture
- Use functional components with React hooks
- Implement React Router for navigation between pages
- Use Leaflet for interactive maps integration
- Maintain existing CSS styles where possible

## Key Requirements
- Preserve all existing functionality from HTML version
- Maintain responsive design for mobile and desktop
- Keep accessibility features (aria-labels, semantic HTML)
- Implement proper TypeScript typing for all components
- Use modular CSS or CSS modules for styling

## Pages to Migrate
- Home page with slider and sections
- FormularioAyuda (Help Request Form) with interactive map
- Ayudar (Volunteer Registration)
- Contacto (Contact Form)
- Equipo (Team page)
- Login/Registration modals

## External Dependencies
- React Router DOM for navigation
- Leaflet for maps functionality
- FontAwesome for icons
- Original CSS files for styling consistency

## State Management
- Use React Context or props for user authentication state
- Implement form state management with controlled components
- Handle map state and geolocation functionality

Please follow React best practices and maintain the existing design and UX patterns from the original application.
