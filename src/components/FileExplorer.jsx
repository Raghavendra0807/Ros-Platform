import React, { useState, useRef, useEffect } from 'react';
import { 
  Folder, 
  File, 
  ChevronRight, 
  Plus, 
  MoreVertical, 
  FilePlus, 
  FolderPlus, 
  RefreshCw, 
  Minimize2,
  Check,
  X,
  Trash2
} from 'lucide-react';

const initialTreeData = [
  {
    id: 'root-ws',
    name: 'ros2_ws',
    type: 'folder',
    isOpen: true,
    children: [
      {
        id: 'folder-src',
        name: 'src',
        type: 'folder',
        isOpen: true,
        children: []
      },
      {
        id: 'folder-build',
        name: 'build',
        type: 'folder',
        isOpen: false,
        children: []
      },
      {
        id: 'folder-install',
        name: 'install',
        type: 'folder',
        isOpen: false,
        children: []
      },
      {
        id: 'folder-log',
        name: 'log',
        type: 'folder',
        isOpen: false,
        children: []
      },
      { id: 'file-package', name: 'package.xml', type: 'file' },
      { id: 'file-cmakelists', name: 'CMakeLists.txt', type: 'file' },
      { id: 'file-readme', name: 'README.md', type: 'file' }
    ]
  }
];

export default function FileExplorer() {
  const [treeData, setTreeData] = useState(initialTreeData);
  const [selectedId, setSelectedId] = useState('root-ws');
  const [selectedFolderId, setSelectedFolderId] = useState('root-ws');
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  
  // State for creating a new file or folder inline
  const [creatingItem, setCreatingItem] = useState(null); // { type: 'file' | 'folder', parentId: string }
  const [itemName, setItemName] = useState('');
  const inputRef = useRef(null);

  const plusMenuRef = useRef(null);
  const moreMenuRef = useRef(null);

  useEffect(() => {
    if (creatingItem && inputRef.current) {
      inputRef.current.focus();
    }
  }, [creatingItem]);

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (plusMenuRef.current && !plusMenuRef.current.contains(event.target)) {
        setShowPlusMenu(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setShowMoreMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Recursive toggle folder
  const toggleFolder = (id) => {
    const updateNodes = (nodes) => {
      return nodes.map((node) => {
        if (node.id === id) {
          return { ...node, isOpen: !node.isOpen };
        }
        if (node.children) {
          return { ...node, children: updateNodes(node.children) };
        }
        return node;
      });
    };
    setTreeData((prev) => updateNodes(prev));
  };

  // Collapse all folders
  const handleCollapseAll = () => {
    const collapseNodes = (nodes) => {
      return nodes.map((node) => {
        if (node.type === 'folder') {
          return {
            ...node,
            isOpen: false,
            children: node.children ? collapseNodes(node.children) : []
          };
        }
        return node;
      });
    };
    setTreeData((prev) => collapseNodes(prev));
    setShowMoreMenu(false);
  };

  // Reset/Refresh
  const handleRefresh = () => {
    setTreeData(initialTreeData);
    setCreatingItem(null);
    setItemName('');
    setShowMoreMenu(false);
  };

  // Start creation of file or folder
  const startCreate = (type) => {
    const targetFolder = selectedFolderId || 'root-ws';
    // ensure parent folder is open
    const openParent = (nodes) => {
      return nodes.map((node) => {
        if (node.id === targetFolder) {
          return { ...node, isOpen: true };
        }
        if (node.children) {
          return { ...node, children: openParent(node.children) };
        }
        return node;
      });
    };
    setTreeData((prev) => openParent(prev));
    setCreatingItem({ type, parentId: targetFolder });
    setItemName('');
    setShowPlusMenu(false);
  };

  // Save the new file or folder
  const handleSaveItem = () => {
    const trimmed = itemName.trim();
    if (!trimmed || !creatingItem) {
      setCreatingItem(null);
      setItemName('');
      return;
    }

    const newItem = {
      id: `${creatingItem.type}-${Date.now()}`,
      name: trimmed,
      type: creatingItem.type,
      ...(creatingItem.type === 'folder' ? { isOpen: true, children: [] } : {})
    };

    const addRecursively = (nodes) => {
      return nodes.map((node) => {
        if (node.id === creatingItem.parentId) {
          return {
            ...node,
            isOpen: true,
            children: [...(node.children || []), newItem]
          };
        }
        if (node.children) {
          return {
            ...node,
            children: addRecursively(node.children)
          };
        }
        return node;
      });
    };

    setTreeData((prev) => addRecursively(prev));
    setSelectedId(newItem.id);
    if (creatingItem.type === 'folder') {
      setSelectedFolderId(newItem.id);
    }
    setCreatingItem(null);
    setItemName('');
  };

  const handleCancelCreate = () => {
    setCreatingItem(null);
    setItemName('');
  };

  // Delete item by id
  const handleDeleteItem = (id, e) => {
    e.stopPropagation();
    const removeRecursively = (nodes) => {
      return nodes
        .filter((node) => node.id !== id)
        .map((node) => {
          if (node.children) {
            return { ...node, children: removeRecursively(node.children) };
          }
          return node;
        });
    };

    setTreeData((prev) => removeRecursively(prev));
    if (selectedId === id) {
      setSelectedId(null);
    }
    if (selectedFolderId === id) {
      setSelectedFolderId('root-ws');
    }
  };

  // Recursive Tree Rendering
  const renderTree = (nodes, level = 0) => {
    return nodes.map((node) => {
      const isSelected = selectedId === node.id;

      if (node.type === 'folder') {
        const isCreatingHere = creatingItem && creatingItem.parentId === node.id;

        return (
          <div key={node.id} className="mb-0.5 select-none">
            <div
              onClick={() => {
                setSelectedId(node.id);
                setSelectedFolderId(node.id);
                toggleFolder(node.id);
              }}
              className={`group flex items-center justify-between py-1 px-2 rounded cursor-pointer transition-colors ${
                isSelected ? 'bg-indigo-600/30 text-white' : 'hover:bg-slate-800 text-slate-300'
              }`}
              style={{ paddingLeft: `${Math.max(level * 14, 8)}px` }}
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <ChevronRight
                  size={14}
                  className={`text-slate-500 transition-transform shrink-0 ${
                    node.isOpen ? 'rotate-90' : ''
                  }`}
                />
                <Folder size={14} className="text-blue-400 fill-blue-400/20 shrink-0" />
                <span className="truncate text-xs font-medium">{node.name}</span>
              </div>

              {node.id !== 'root-ws' && (
                <button
                  onClick={(e) => handleDeleteItem(node.id, e)}
                  title="Delete folder"
                  className="opacity-0 group-hover:opacity-100 hover:text-rose-400 text-slate-500 p-0.5 rounded transition-opacity shrink-0"
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>

            {node.isOpen && (
              <div className="border-l border-slate-800 ml-3">
                {/* Inline Creation Input for this folder */}
                {isCreatingHere && (
                  <div
                    className="flex items-center gap-1 py-1 px-2 bg-slate-800/80 rounded my-1 border border-indigo-500/50"
                    style={{ paddingLeft: `${Math.max((level + 1) * 14, 12)}px` }}
                  >
                    {creatingItem.type === 'folder' ? (
                      <Folder size={14} className="text-blue-400 shrink-0" />
                    ) : (
                      <File size={14} className="text-slate-400 shrink-0" />
                    )}
                    <input
                      ref={inputRef}
                      type="text"
                      value={itemName}
                      placeholder={creatingItem.type === 'folder' ? 'folder_name' : 'filename.ext'}
                      onChange={(e) => setItemName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveItem();
                        if (e.key === 'Escape') handleCancelCreate();
                      }}
                      className="bg-transparent border-none text-xs text-white focus:outline-none w-full min-w-0"
                    />
                    <button
                      onClick={handleSaveItem}
                      className="text-emerald-400 hover:text-emerald-300 p-0.5"
                      title="Save"
                    >
                      <Check size={13} />
                    </button>
                    <button
                      onClick={handleCancelCreate}
                      className="text-rose-400 hover:text-rose-300 p-0.5"
                      title="Cancel"
                    >
                      <X size={13} />
                    </button>
                  </div>
                )}

                {node.children && node.children.length > 0
                  ? renderTree(node.children, level + 1)
                  : !isCreatingHere && (
                      <div
                        className="py-1 text-[11px] text-slate-500 italic"
                        style={{ paddingLeft: `${Math.max((level + 1) * 14, 16)}px` }}
                      >
                        (empty)
                      </div>
                    )}
              </div>
            )}
          </div>
        );
      }

      // File Node
      return (
        <div
          key={node.id}
          onClick={() => setSelectedId(node.id)}
          className={`group flex items-center justify-between py-1 px-2 rounded cursor-pointer transition-colors select-none ${
            isSelected ? 'bg-indigo-600/30 text-white' : 'hover:bg-slate-800 text-slate-400'
          }`}
          style={{ paddingLeft: `${Math.max(level * 14 + 18, 22)}px` }}
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <File size={14} className="text-slate-500 shrink-0" />
            <span className="truncate text-xs">{node.name}</span>
          </div>

          <button
            onClick={(e) => handleDeleteItem(node.id, e)}
            title="Delete file"
            className="opacity-0 group-hover:opacity-100 hover:text-rose-400 text-slate-500 p-0.5 rounded transition-opacity shrink-0"
          >
            <Trash2 size={13} />
          </button>
        </div>
      );
    });
  };

  return (
    <div className="w-full h-full bg-[#0F172A] rounded-lg border border-slate-800 flex flex-col shrink-0">
      {/* Panel Header */}
      <div className="p-3 border-b border-slate-800 flex items-center justify-between text-sm font-medium">
        <div className="flex items-center gap-2 text-indigo-300">
          <Folder size={16} /> File Explorer
        </div>

        {/* Action Buttons & Dropdowns */}
        <div className="flex items-center gap-1.5 text-slate-400">
          {/* Plus Menu */}
          <div className="relative" ref={plusMenuRef}>
            <button
              onClick={() => {
                setShowPlusMenu(!showPlusMenu);
                setShowMoreMenu(false);
              }}
              title="New File / Folder"
              className="p-1 rounded hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Plus size={16} />
            </button>

            {showPlusMenu && (
              <div className="absolute right-0 mt-1 w-36 bg-[#1E293B] border border-slate-700 rounded-md shadow-xl py-1 z-50 text-xs">
                <button
                  onClick={() => startCreate('file')}
                  className="w-full px-3 py-1.5 flex items-center gap-2 text-slate-300 hover:bg-slate-700 hover:text-white text-left"
                >
                  <FilePlus size={14} className="text-emerald-400" /> New File
                </button>
                <button
                  onClick={() => startCreate('folder')}
                  className="w-full px-3 py-1.5 flex items-center gap-2 text-slate-300 hover:bg-slate-700 hover:text-white text-left"
                >
                  <FolderPlus size={14} className="text-blue-400" /> New Folder
                </button>
              </div>
            )}
          </div>

          {/* More Menu */}
          <div className="relative" ref={moreMenuRef}>
            <button
              onClick={() => {
                setShowMoreMenu(!showMoreMenu);
                setShowPlusMenu(false);
              }}
              title="More Actions"
              className="p-1 rounded hover:bg-slate-800 hover:text-white transition-colors"
            >
              <MoreVertical size={16} />
            </button>

            {showMoreMenu && (
              <div className="absolute right-0 mt-1 w-40 bg-[#1E293B] border border-slate-700 rounded-md shadow-xl py-1 z-50 text-xs">
                <button
                  onClick={handleRefresh}
                  className="w-full px-3 py-1.5 flex items-center gap-2 text-slate-300 hover:bg-slate-700 hover:text-white text-left"
                >
                  <RefreshCw size={14} /> Refresh Explorer
                </button>
                <button
                  onClick={handleCollapseAll}
                  className="w-full px-3 py-1.5 flex items-center gap-2 text-slate-300 hover:bg-slate-700 hover:text-white text-left"
                >
                  <Minimize2 size={14} /> Collapse All
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* File Tree */}
      <div className="flex-1 p-2 overflow-y-auto">
        {renderTree(treeData)}
      </div>
    </div>
  );
}