
import {
  Workflow,
  PanelLeft,
  Folder,
  Code2,
  Monitor,
} from "lucide-react";
import TerminalPanel from './components/Terminal';

import Sidebar from "./components/Sidebar";
import WorkspaceHeader from "./components/WorkspaceHeader";
import FileExplorer from "./components/FileExplorer";

const placeholderClass =
  "flex flex-1 items-center justify-center rounded-lg border border-dashed border-[#34373c] bg-[#131518] text-[#858b95]";

function App() {
  return (
    <div className="min-h-screen bg-[#111315] text-[#e5e7eb]">
      {/* Workspace header — Member 2 */}
<WorkspaceHeader />
      <div className="flex min-h-[calc(100vh-56px)]">
        {/* Sidebar container — Member 2 */}
        {/* Sidebar container — Member 2 */}
<Sidebar />
        
        <main className="min-w-0 flex-1 p-3 sm:p-4">
          {/* Workspace toolbar/header area — Member 2 */}
          <div className="mb-3 flex min-h-[54px] items-center justify-between rounded-lg border border-[#292c30] bg-[#181a1d] px-4 py-3">
            <div>
              <p className="text-sm font-medium">
                ROS Development Workspace
              </p>
              <p className="mt-1 text-xs text-[#858b95]">
                Workspace layout
              </p>
            </div>
            <span className="rounded-md border border-[#34373c] px-2.5 py-1 text-xs text-[#858b95]">
              UI scaffold
            </span>
          </div>

          {/* File explorer + editor row */}
          <div className="grid min-h-[360px] grid-cols-1 gap-3 lg:grid-cols-[230px_minmax(0,1fr)]">
            {/* File explorer container — Member 2 */}
<FileExplorer />

            {/* Code editor container — Member 3 */}
            <section className="flex min-h-[300px] min-w-0 flex-col overflow-hidden rounded-lg border border-[#292c30] bg-[#181a1d]">
              <div className="flex h-10 shrink-0 items-center gap-2 border-b border-[#292c30] px-3">
                <Code2 size={15} className="text-[#9aa7b7]" />
                <span className="text-xs font-medium uppercase tracking-wider text-[#b5bdc8]">
                  Code Editor
                </span>
              </div>
              <div className="m-3 flex flex-1">
                <div className={placeholderClass}>
                  <div className="text-center">
                    <Code2 size={30} className="mx-auto mb-3" />
                    <p className="text-sm">Code Editor Container</p>
                    <p className="mt-1 text-xs">Member 3</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Terminal container — Member 4 */}
          <TerminalPanel />

          {/* Screen sharing container — Member 5 */}
          <section className="mt-3 flex min-h-[220px] flex-col overflow-hidden rounded-lg border border-[#292c30] bg-[#181a1d]">
            <div className="flex h-10 shrink-0 items-center gap-2 border-b border-[#292c30] px-3">
              <Monitor size={15} className="text-[#9aa7b7]" />
              <span className="text-xs font-medium uppercase tracking-wider text-[#b5bdc8]">
                Remote Desktop / Screen Sharing
              </span>
            </div>
            <div className="m-3 flex flex-1">
              <div className={placeholderClass}>
                <div className="text-center">
                  <Monitor size={30} className="mx-auto mb-3" />
                  <p className="text-sm">Screen Sharing Container</p>
                  <p className="mt-1 text-xs">Member 5</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
