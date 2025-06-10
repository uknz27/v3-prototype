# Red Hat OpenShift AI (RHOAI) v3 Frontend Prototype

## Overview
This prototype implements key user interface components for Red Hat OpenShift AI v3, focusing on the AI Engineer (AIE) persona's journey through the 'Discover/Ideate' and early 'Prototype/Build' stages. The primary goal is to streamline the initial experience and provide a clear "golden path" for AI Engineers.

## Key Features

### 1. RHOAI UI v3 Gallery (Entry Point)
- Modern landing page with Use-Case Gallery
- Real-world GenAI application templates
- Integrated QuickStart wizard with video guidance
- Streamlined workspace setup flow

### 2. Dev Sandbox Wizard
Multi-step guided flow for environment provisioning:
- Project Setup with Golden-Path templates
- Model Selection interface with MCP Hub integration
- Data Connection management
- Sandbox deployment and GPU quota assignment

## Technology Stack
- **Frontend Framework**: React
- **Design System**: Material UI (MUI)
- **Build Tools**: Vite
- **Package Manager**: npm/yarn

## Project Structure
```
src/
├── components/         # Reusable UI components
│   ├── Gallery/       # Use-case gallery components
│   ├── Wizard/        # Multi-step wizard components
│   └── Layout/        # Common layout components
├── pages/             # Main application pages
├── services/          # API and service integrations
└── assets/           # Static assets and resources
```

## Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation
1. Clone the repository
```bash
git clone [repository-url]
cd rhoai-v3-prototype
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

## Design Principles
- Clean, modern interface
- Minimized cognitive load
- Guided user progression
- Focus on speed and efficiency
- "It works!" in minutes approach

## Contributing
This is a prototype project. Please refer to the contribution guidelines for development standards and processes.

## License
[License information to be added] 