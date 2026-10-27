import React from 'react';
import { Bell, Square } from 'lucide-react';

export default function WorkspaceHeader() {
  return (
    <header className="h-16 w-full border-b border-slate-800 bg-[#0F172A] flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-semibold text-white">ROS Cloud Lab</h1>
        
        <div className="flex items-center gap-3 bg-[#1E293B] px-4 py-1.5 rounded-md border border-slate-700">
          <span className="text-sm text-slate-400">Workspace: demo-workspace</span>
          <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Running
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 text-sm text-slate-300 border border-slate-600 hover:bg-slate-800 px-4 py-1.5 rounded-md transition-colors">
          <Square size={14} className="text-rose-400 fill-rose-400/20" />
          Stop Workspace
        </button>
       
      </div>
    </header>
  );
}