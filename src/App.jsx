
import {
  Workflow,
  PanelLeft,
  Folder,
  Code2,
  Terminal,
  Monitor,
} from "lucide-react";

const placeholderClass =
  "flex flex-1 items-center justify-center rounded-lg border border-dashed border-[#34373c] bg-[#131518] text-[#858b95]";

function App() {
  return (
    <div className="min-h-screen bg-[#111315] text-[#e5e7eb]">
      {/* Workspace header — Member 2 */}
      <header className="flex h-14 items-center gap-3 border-b border-[#292c30] bg-[#181a1d] px-4">
        <Workflow size={20} className="text-[#9aa7b7]" />
        <div>
          <p className="text-sm font-semibold">Scalable ROS</p>
          <p className="text-[11px] text-[#858b95]">Workspace</p>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-56px)]">
        {/* Sidebar container — Member 2 */}
        <aside className="w-[62px] shrink-0 border-r border-[#292c30] bg-[#181a1d] p-2">
          <div
            className={`${placeholderClass} min-h-[calc(100vh-88px)]`}
            title="Sidebar placeholder"
          >
            <div className="text-center">
              <PanelLeft size={20} className="mx-auto mb-2" />
              <span className="text-[10px] [writing-mode:vertical-rl]">
                Sidebar · M2
              </span>
            </div>
          </div>
        </aside>

        {/* Main workspace — your responsibility */}
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
            <section className="flex min-h-[220px] flex-col overflow-hidden rounded-lg border border-[#292c30] bg-[#181a1d]">
              <div className="flex h-10 shrink-0 items-center gap-2 border-b border-[#292c30] px-3">
                <Folder size={15} className="text-[#9aa7b7]" />
                <span className="text-xs font-medium uppercase tracking-wider text-[#b5bdc8]">
                  File Explorer
                </span>
              </div>
              <div className="m-3 flex flex-1">
                <div className={placeholderClass}>
                  <div className="text-center">
                    <Folder size={24} className="mx-auto mb-2" />
                    <p className="text-sm">File Explorer</p>
                    <p className="mt-1 text-xs">Member 2</p>
                  </div>
                </div>
              </div>
            </section>

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
          <section className="mt-3 flex min-h-[190px] flex-col overflow-hidden rounded-lg border border-[#292c30] bg-[#181a1d]">
            <div className="flex h-10 shrink-0 items-center gap-2 border-b border-[#292c30] px-3">
              <Terminal size={15} className="text-[#9aa7b7]" />
              <span className="text-xs font-medium uppercase tracking-wider text-[#b5bdc8]">
                Terminal
              </span>
            </div>
            <div className="m-3 flex flex-1">
              <div className={placeholderClass}>
                <div className="text-center">
                  <Terminal size={26} className="mx-auto mb-2" />
                  <p className="text-sm">Terminal Container</p>
                  <p className="mt-1 text-xs">Member 4</p>
                </div>
              </div>
            </div>
          </section>

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

          <p className="px-1 pb-1 pt-3 text-[11px] text-[#666e78]">
            UI scaffold only · Components will be developed independently
          </p>
        </main>
      </div>
    </div>
  );
}

export default App;
