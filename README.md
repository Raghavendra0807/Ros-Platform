# Scalable ROS — Cloud-Based Robotics Learning Platform

## 1. Overview

Scalable ROS is a cloud-based platform designed to make Robot Operating System (ROS) development more accessible to students and developers through a browser-based workspace.

The long-term goal is to provide a preconfigured robotics development environment where users can write code, execute ROS commands, access a remote desktop, and work with robotics simulations without manually setting up the complete environment on their local computers.

The platform is intended to support scalable, isolated workspaces for multiple users.

## 2. Current Development Milestone

**Milestone: Frontend UI prototype — 27 October 2026**

The current milestone focuses exclusively on the frontend user interface.

The deliverable is a polished React.js workspace containing four primary panels:

- **Directory / File Explorer:** A container for displaying the workspace's file and folder structure.
- **Code Editor:** A container for the future browser-based coding interface.
- **Terminal:** A container for the future command-line interface.
- **Screen Sharing / Remote Desktop:** A container for the future remote Linux desktop and robotics simulation interface.

At this stage, these panels are UI placeholders. They do not need to connect to a real terminal, editor, remote desktop, ROS environment, or backend.

The immediate goal is to establish a clean, modular, responsive interface that can be integrated with backend services in later development phases.

## 3. Project Objectives

- Build an intuitive browser-based robotics workspace.
- Organize development tools into a unified interface.
- Provide a modular frontend that supports parallel team development.
- Establish a foundation for future ROS 2 and Gazebo integration.
- Prepare the architecture for future containerized workspaces.
- Support the eventual deployment of isolated and scalable user environments.

## 4. Planned Technology Stack

### Current milestone

| Technology | Purpose |
|---|---|
| React.js | Component-based frontend development |
| Vite | Frontend development server and build tooling |
| JavaScript / JSX | UI implementation |
| CSS | Layout, styling, responsive design and panel appearance |
| Git | Version control |
| GitHub | Shared repository and team collaboration |

### Planned future architecture

| Technology | Intended purpose |
|---|---|
| Node.js | Server-side JavaScript runtime |
| NestJS | Backend control plane and API |
| Docker | Packaging ROS development environments |
| ROS 2 | Robotics development framework |
| Gazebo | Robotics simulation |
| Kubernetes | Container orchestration and workspace management |
| AWS EKS | Managed Kubernetes infrastructure |
| AWS EC2 | Cloud compute capacity |
| AWS EFS | Persistent workspace storage |
| Karpenter | Cloud compute provisioning and scaling |
| WebSockets | Real-time communication where required |
| JWT | Authentication mechanism |
| noVNC / code-server | Potential solutions for remote desktop and browser-based code editing |

The future technologies are planned components, not implemented features of the current UI prototype. Specific integrations and versions will be decided during implementation.

## 5. Workspace Layout

The primary workspace will contain the following regions:

1. **Application Sidebar**
   - Navigation and workspace access.
2. **Directory / File Explorer**
   - Dedicated panel for workspace files and folders.
3. **Code Editor**
   - Dedicated area for code editing.
4. **Screen Sharing / Remote Desktop**
   - Dedicated area for the remote desktop or simulation.
5. **Terminal**
   - Dedicated area for command-line interaction.
6. **Workspace Header**
   - Workspace name, status indicator and relevant workspace controls.

The layout should use a consistent dark theme, clear panel boundaries, readable typography, appropriate spacing and responsive sizing.

The panels should be designed so that real functionality can be integrated later without redesigning the entire interface.

## 6. Repository Structure

The initial frontend repository is expected to follow this structure:

```text
ros-cloud-lab/
├── public/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── WorkspaceHeader.jsx
│   │   ├── FileExplorer.jsx
│   │   ├── CodeEditor.jsx
│   │   ├── Terminal.jsx
│   │   └── RemoteDesktop.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── IMPLEMENTATION.md
```

This is the proposed structure. The team may adjust it when necessary, provided that component responsibilities remain clear.

## 7. Getting Started

### Prerequisites

Install:

- Git
- Node.js and npm
- A code editor such as Visual Studio Code

### Installation

Clone the repository:

```bash
git clone <REPOSITORY_URL>
cd ros-cloud-lab
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed by Vite in your browser.

Replace `<REPOSITORY_URL>` with the actual GitHub repository URL.

## 8. Team Collaboration

The project will use Git and GitHub for collaborative development.

- `main` will contain the integrated, reviewed version of the project.
- Each contributor will work on a dedicated feature branch.
- Changes will be committed and pushed to GitHub.
- Pull requests will be used to review and merge contributions.
- Contributors should pull the latest changes before beginning new work.
- Component ownership and shared-file changes should be coordinated to minimize merge conflicts.

Refer to `IMPLEMENTATION.md` for the development workflow and component responsibilities.

## 9. Development Roadmap

### Phase 1 — Frontend UI prototype

- Establish the React application.
- Build the workspace layout.
- Create the four primary placeholder panels.
- Add the sidebar and workspace header.
- Ensure the UI is consistent and responsive.
- Integrate all components into a single working interface.

### Phase 2 — Workspace environment

- Build and test a containerized ROS development environment.
- Configure the required Linux and ROS dependencies.
- Test terminal and simulation processes.

### Phase 3 — Backend integration

- Develop workspace-management APIs.
- Connect the frontend to workspace lifecycle operations.
- Integrate remote terminal, editor and desktop access.

### Phase 4 — Cloud deployment

- Deploy the services to the planned cloud infrastructure.
- Configure persistent storage and workspace isolation.
- Introduce resource provisioning, cleanup and scaling.

### Phase 5 — Reliability and optimization

- Improve security and failure handling.
- Test concurrent users.
- Optimize resource usage and operating costs.

## 10. Current Scope and Limitations

The initial deliverable is a frontend prototype.

The following are not required for the current milestone:

- Backend APIs
- Authentication implementation
- Actual terminal execution
- Real file-system access
- Functional code editing and saving
- Remote desktop streaming
- ROS 2 execution
- Gazebo simulation
- Docker-based workspace provisioning
- Kubernetes or AWS deployment

These features belong to later development phases.

## 11. Contribution Guidelines

Before contributing:

1. Read `README.md` and `IMPLEMENTATION.md`.
2. Understand your assigned component.
3. Create a feature branch.
4. Implement and test your changes.
5. Commit changes with descriptive messages.
6. Push the branch and open a pull request.
7. Merge only after reviewing integration and checking that the application runs.

Keep components modular, avoid unnecessary dependencies, and coordinate changes to shared layout and stylesheet files.

## 12. Project Vision

The long-term vision is to provide an accessible, browser-based ROS development platform that combines coding, terminal interaction, remote desktop access and robotics simulation in one environment.

The current frontend prototype establishes the user interface on which that platform will be built.
