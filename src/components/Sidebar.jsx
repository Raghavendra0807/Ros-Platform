import React from 'react';
import { Bot, Home, FolderKanban, BookOpen, FileText } from 'lucide-react';

// Helper component for individual menu items
function SidebarItem({ icon, label, active }) {
  return (
    <div className={`flex flex-col items-center gap-1 cursor-pointer w-full py-3 border-l-2 transition-colors ${
      active 
        ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10' 
        : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-800'
    }`}>
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-20 h-full border-r border-slate-800 bg-[#0F172A] flex flex-col items-center py-4 gap-6 shrink-0">
      <div className="text-indigo-500 mb-2">
        <Bot size={32} />
      </div>
      <nav className="flex flex-col gap-4 w-full">
        <SidebarItem icon={<Home size={24} />} label="Home" />
        <SidebarItem icon={<FolderKanban size={24} />} label="Workspace" active={true} />
        <SidebarItem icon={<BookOpen size={24} />} label="Learn" />
        <SidebarItem icon={<FileText size={24} />} label="Docs" />
      </nav>
    </aside>
  );
}