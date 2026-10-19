# Implementation Guide — Scalable ROS

## 1. Purpose

This document defines the implementation plan, component responsibilities, coding conventions and collaboration workflow for the Scalable ROS project.

The immediate target is the frontend UI prototype due on **27 October 2026**.

The team must deliver a unified React application containing the Directory / File Explorer, Code Editor, Terminal and Screen Sharing / Remote Desktop panels.

All four panels are placeholders for this milestone. No backend or live ROS functionality is required.

## 2. Scope of the Current Milestone

### Required

- A working React application using Vite.
- A consistent workspace layout.
- An application sidebar.
- A workspace header.
- Four distinct placeholder panels:
  - File Explorer / Directory
  - Code Editor
  - Terminal
  - Screen Sharing / Remote Desktop
- A consistent visual theme.
- Reusable React components.
- Integration of all components into one application.
- Responsive layout and basic UI testing.
- A repository that all team members can work on.

### Not required

- Backend implementation.
- Login or authentication logic.
- Actual terminal execution.
- Real file-system operations.
- Code execution or saving.
- Remote desktop connections.
- Screen-sharing infrastructure.
- ROS 2 or Gazebo execution.
- Docker containers.
- Kubernetes or AWS deployment.

Do not spend time implementing these future features before the current UI milestone is complete.

## 3. Proposed Application Layout

The workspace should be organized as follows:

```text
┌───────────────────────────────────────────────────────────────┐
│ Application Header: Logo | Workspace | Status | Controls      │
├──────────┬────────────────────────────────────────────────────┤
│          │                                                    │
│          │  Code Editor             Remote Desktop            │
│ Sidebar  │                                                    │
│          │                                                    │
│          ├────────────────────────────────────────────────────┤
│          │                                                    │
│          │  Terminal                                          │
│          │                                                    │
└──────────┴────────────────────────────────────────────────────┘
```

The File Explorer may be placed between the sidebar and editor, or integrated into the editor region, depending on the final design.

### Layout requirements

- The application header should remain visually distinct from the workspace.
- The sidebar should provide clear navigation.
- The file explorer should display a representative directory tree.
- The editor should occupy sufficient space for future coding.
- The remote desktop should have a clearly visible viewing area.
- The terminal should have a dedicated panel with a header and placeholder content.
- Panel boundaries should be clearly visible.
- The layout should use available screen space efficiently.
- Empty containers should have meaningful labels and placeholder messages.
- The interface should remain usable at typical laptop and presentation screen sizes.

Resizable panels are desirable if time permits, but are not a mandatory requirement for the initial milestone.

## 4. Component Architecture

Use a modular component structure.

```text
src/
├── components/
│   ├── Sidebar.jsx
│   ├── WorkspaceHeader.jsx
│   ├── FileExplorer.jsx
│   ├── CodeEditor.jsx
│   ├── Terminal.jsx
│   └── RemoteDesktop.jsx
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

### 4.1 App.jsx

**Responsibility:** Assemble the application.

It should:

- Render the application header and sidebar.
- Arrange the file explorer, editor, remote desktop and terminal.
- Define the overall panel layout.
- Import and render individual components.
- Avoid containing all component markup and styling in one large file.

### 4.2 Sidebar.jsx

**Responsibility:** Provide application navigation.

It may contain:

- Home
- Workspace
- Learn
- Documentation
- Settings, if needed

Navigation can remain visual-only if routing is outside the current scope.

### 4.3 WorkspaceHeader.jsx

**Responsibility:** Display workspace-level information and controls.

It may contain:

- Project logo and name.
- Workspace name.
- Illustrative status indicator.
- Placeholder workspace controls.
- User avatar or profile area.

Any displayed workspace status must be understood as mock data until a backend exists.

### 4.4 FileExplorer.jsx

**Responsibility:** Provide the Directory / File Explorer placeholder.

For the current milestone:

- Display a panel heading.
- Show a representative folder and file tree.
- Use icons to distinguish folders and files.
- Include empty or sample workspace content.
- Maintain consistent indentation and spacing.

Actual filesystem access, file creation, renaming and deletion are out of scope.

### 4.5 CodeEditor.jsx

**Responsibility:** Provide the Code Editor placeholder.

For the current milestone:

- Display a panel heading or editor tab.
- Provide a large, visually clear editor area.
- Show an appropriate empty-state message.
- Optionally show a non-functional example filename.
- Reserve space for future editor controls.

A functional editor library is not required for this milestone.

### 4.6 Terminal.jsx

**Responsibility:** Provide the Terminal placeholder.

For the current milestone:

- Display a terminal header.
- Provide a large terminal area.
- Show an empty-state message or illustrative prompt.
- Reserve space for future terminal output.
- Match the application's overall theme.

Do not implement command execution or simulate a real shell.

### 4.7 RemoteDesktop.jsx

**Responsibility:** Provide the Screen Sharing / Remote Desktop placeholder.

For the current milestone:

- Display a panel heading.
- Provide a large viewing area.
- Show a message indicating where the remote desktop will appear.
- Optionally include visual-only fullscreen or panel controls.

Actual screen sharing, desktop streaming and Gazebo rendering are out of scope.

## 5. Styling Guidelines

Use a consistent design system across components.

### Suggested visual direction

- Dark navy or charcoal background.
- Slightly lighter panel backgrounds.
- Subtle borders between panels.
- Blue or purple accent colors.
- Consistent typography.
- Clear visual hierarchy.
- Simple, recognizable icons.
- Consistent spacing, padding and border radius.

### CSS guidelines

- Use reusable CSS classes.
- Prefer CSS Grid and Flexbox for the main layout.
- Use CSS variables for shared colors and spacing.
- Avoid duplicating the same styles across multiple files.
- Avoid excessive fixed widths that break on smaller screens.
- Ensure text and icons have sufficient contrast.

Example CSS variables:

```css
:root {
  --app-bg: #0b1220;
  --panel-bg: #111c2d;
  --panel-border: #263449;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --accent: #647cff;
}
```

These colors are initial suggestions. The team may adjust them to match the approved design.

## 6. Team Task Division

Assign one owner to each component or shared responsibility.

| Role | Responsibility | Main files |
|---|---|---|
| Integrator / UI lead | Overall layout and component integration | `App.jsx`, `App.css` |
| Frontend contributor 1 | File explorer | `FileExplorer.jsx` |
| Frontend contributor 2 | Terminal | `Terminal.jsx` |
| Frontend contributor 3 | Code editor | `CodeEditor.jsx` |
| Frontend contributor 4, if available | Remote desktop panel | `RemoteDesktop.jsx` |
| Shared responsibility | Header, sidebar, global styling and review | `WorkspaceHeader.jsx`, `Sidebar.jsx`, `index.css` |

For a smaller team, combine responsibilities as needed.

The integrator should define the overall layout and component interfaces early. Component contributors should work independently and avoid editing the same files without coordination.

## 7. Component Interface Convention

Each component should be a separate React module and export its component as the default export.

Example:

```jsx
function FileExplorer() {
  return (
    <section className="file-explorer panel">
      <header className="panel-header">
        File Explorer
      </header>

      <div className="panel-content">
        File explorer will appear here
      </div>
    </section>
  );
}

export default FileExplorer;
```

The same general pattern should be followed for the other placeholder panels.

Use consistent class naming and avoid placing the entire application's CSS inside individual components.

## 8. Git and GitHub Workflow

The `main` branch is the shared, integrated version of the application.

Contributors should not normally commit directly to `main`.

### Step 1: Update main

```bash
git switch main
git pull origin main
```

### Step 2: Create a feature branch

Examples:

```bash
git switch -c feature/workspace-layout
```

```bash
git switch -c feature/file-explorer
```

```bash
git switch -c feature/terminal-panel
```

Use a branch name that matches your assigned task.

### Step 3: Implement the component

Edit only your assigned component and any additional files agreed upon with the team.

Run the application locally:

```bash
npm run dev
```

### Step 4: Commit the changes

```bash
git add src/components/FileExplorer.jsx
git commit -m "Build file explorer placeholder UI"
```

Replace the example filename and commit message with your actual changes.

### Step 5: Push the branch

```bash
git push -u origin feature/file-explorer
```

### Step 6: Open a pull request

On GitHub:

1. Open the repository.
2. Create a pull request from your feature branch into `main`.
3. Describe the changes.
4. Request a review from the integrator or another teammate.
5. Merge after review and integration checks.

### Step 7: Update your local branch

After the pull request has been merged:

```bash
git switch main
git pull origin main
```

Before starting another task, create a new feature branch from the updated main branch.

## 9. Merge Conflict Prevention

- Assign clear ownership of files.
- Avoid editing `App.jsx` unless you are the designated integrator or have coordinated the change.
- Keep components self-contained.
- Agree on class names and panel interfaces before integration.
- Pull the latest `main` before starting a new feature.
- Do not commit generated dependencies such as `node_modules`.
- Do not overwrite another contributor's work to resolve a conflict without reviewing the changes.
- Test the integrated application after merging.

The integrator is responsible for resolving layout-level conflicts and ensuring that all components work together.

## 10. Testing and Acceptance Criteria

The UI milestone is considered complete when:

- [ ] The project installs successfully using `npm install`.
- [ ] The development server starts using `npm run dev`.
- [ ] The application loads without major console errors.
- [ ] The sidebar and workspace header render correctly.
- [ ] The Directory / File Explorer panel is visible.
- [ ] The Code Editor panel is visible.
- [ ] The Terminal panel is visible.
- [ ] The Screen Sharing / Remote Desktop panel is visible.
- [ ] Panel headings and placeholder messages are clear.
- [ ] The design is visually consistent.
- [ ] The layout is usable on the target presentation screen.
- [ ] All approved component branches are integrated into `main`.
- [ ] The README and implementation documentation are included.

## 11. Future Integration Plan

After the UI milestone, the placeholder components can be connected to real services.

Potential integration sequence:

1. Define backend APIs and workspace lifecycle states.
2. Build a Docker image containing the required ROS development environment.
3. Add workspace creation and management through the backend.
4. Integrate a browser-based editor.
5. Integrate terminal access.
6. Integrate remote desktop access.
7. Add persistent storage.
8. Deploy and manage workspaces through Kubernetes and AWS EKS.
9. Implement resource limits, inactivity cleanup, security and scaling.

These tasks are future work and should not delay the current frontend milestone.

## 12. Definition of Done

A contributor's task is complete when:

- The assigned component has been implemented.
- The component follows the agreed design and naming conventions.
- The application runs locally.
- The code has been committed to the contributor's feature branch.
- The branch has been pushed to GitHub.
- A pull request has been reviewed and merged.
- The integrated application still runs correctly.

The overall milestone is complete when the four primary workspace panels and the supporting layout form one cohesive React UI, ready for future backend integration.
