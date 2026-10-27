/**
 * Terminal.jsx
 *
 * Milestone: Frontend UI Prototype (27 October 2026)
 * Assigned contributor: Terminal panel — Member 4
 *
 * Purpose:
 *   Renders an interactive Terminal placeholder for the Scalable ROS Platform workspace.
 *   Accepts keyboard input locally (React state only).
 *   No shell execution, no WebSocket, no backend connection.
 *   Styled after VS Code Dark Modern / Windows Terminal.
 *
 * Functional boundary:
 *   - Typed text is displayed immediately after the prompt.
 *   - Enter preserves the submitted line and opens a fresh prompt.
 *   - No command output is generated or fabricated.
 *   - Backend integration (ttyd / xterm.js) belongs to a future sprint.
 *
 * Integration note for the integrator (App.jsx owner):
 *   1. import TerminalPanel from './components/Terminal';
 *   2. Replace the "Terminal container — Member 4" <section> block with:
 *      <TerminalPanel />
 */

import { useState, useRef } from 'react';
import {
  SquareTerminal,
  ChevronDown,
  Plus,
  SplitSquareHorizontal,
  Trash2,
  MoreHorizontal,
  Maximize2,
  X,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   Design tokens — VS Code Dark Modern palette.
   Tailwind CSS is NOT required; all values are plain CSS strings.
───────────────────────────────────────────────────────────────────────────── */
const T = {
  cardBg:      '#181818',   /* outer panel surface — VS Code editor bg      */
  viewportBg:  '#181818',   /* terminal viewport — same depth as panel      */
  tabBarBg:    '#1E1E1E',   /* tab strip — one step lighter                 */
  borderOuter: '#2B2B2B',   /* panel / header border                        */
  borderInner: '#2B2B2B',   /* inner dividers, badge outlines               */
  textPrimary: '#CCCCCC',   /* VS Code default foreground                   */
  textSec:     '#9D9D9D',   /* secondary labels, icon tint                  */
  textMuted:   '#858585',   /* muted / disabled text                        */
  focusBlue:   '#0078D4',   /* VS Code blue — toolbar focus ring            */
  statusAmber: '#CCA700',   /* VS Code warning yellow — UI Preview dot      */
  promptGreen: '#4EC994',   /* subdued bash user@host green                 */
  promptCyan:  '#9CDCFE',   /* VS Code variable cyan — cwd path             */
  caretCol:    '#CCCCCC',   /* neutral cursor — matches primary text        */
  /* Cascadia Code/Mono first (VS Code / Windows Terminal default);
     degrades cleanly to Consolas on machines without those fonts installed. */
  mono: "'Cascadia Code', 'Cascadia Mono', Consolas, 'Courier New', monospace",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Style map — React inline style objects.
───────────────────────────────────────────────────────────────────────────── */
const S = {

  /* ── Outer panel card ── */
  section: {
    marginTop:       '12px',
    display:         'flex',
    flexDirection:   'column',
    overflow:        'hidden',
    borderRadius:    '8px',
    border:          `1px solid ${T.borderOuter}`,
    backgroundColor: T.cardBg,
    minHeight:       '240px',
    flex:            '1 1 auto',
  },

  /* ── Outer panel header bar (40 px) ── */
  outerHeader: {
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'space-between',
    height:          '40px',
    flexShrink:      0,
    borderBottom:    `1px solid ${T.borderOuter}`,
    padding:         '0 12px',
    gap:             '8px',
  },
  outerHeaderLeft: {
    display:    'flex',
    alignItems: 'center',
    gap:        '7px',
    overflow:   'hidden',
  },
  outerHeaderTitle: {
    fontFamily:    T.mono,
    fontSize:      '11px',
    fontWeight:    700,
    letterSpacing: '0.09em',
    textTransform: 'uppercase',
    color:         T.textSec,
    whiteSpace:    'nowrap',
  },
  outerHeaderRight: {
    display:    'flex',
    alignItems: 'center',
    gap:        '8px',
    flexShrink: 0,
  },

  /* UI Preview badge */
  uiBadge: {
    display:         'inline-flex',
    alignItems:      'center',
    gap:             '5px',
    height:          '20px',
    padding:         '0 8px',
    borderRadius:    '4px',
    border:          `1px solid ${T.borderInner}`,
    backgroundColor: T.viewportBg,
    fontSize:        '10px',
    color:           T.textMuted,
    letterSpacing:   '0.03em',
    whiteSpace:      'nowrap',
  },
  uiBadgeDot: {
    width:           '6px',
    height:          '6px',
    borderRadius:    '50%',
    backgroundColor: T.statusAmber,
    flexShrink:      0,
  },

  /* ── Viewport wrapper ── */
  viewportWrapper: {
    display:       'flex',
    flexDirection: 'column',
    flex:          '1 1 auto',
    padding:       '0 10px 10px',
    minHeight:     '0',
  },

  /* ── Viewport card ── */
  viewport: {
    display:         'flex',
    flexDirection:   'column',
    flex:            '1 1 auto',
    borderRadius:    '6px',
    border:          `1px solid ${T.borderInner}`,
    backgroundColor: T.viewportBg,
    overflow:        'hidden',
    fontFamily:      T.mono,
    fontSize:        '13px',
    lineHeight:      '1.65',
    minHeight:       '170px',
  },

  /* ── Tab strip ── */
  tabStrip: {
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'space-between',
    height:          '34px',
    flexShrink:      0,
    borderBottom:    `1px solid ${T.borderInner}`,
    backgroundColor: T.tabBarBg,
    padding:         '0 12px',
  },
  tabLeft: {
    display:    'flex',
    alignItems: 'center',
    gap:        '6px',
  },
  tabLabel: {
    fontSize:      '12px',
    fontWeight:    600,
    color:         T.textPrimary,
    whiteSpace:    'nowrap',
    letterSpacing: '0.01em',
  },
  tabChevron: {
    color:      T.textMuted,
    marginLeft: '1px',
    flexShrink: 0,
  },

  /* Thin separator between tab and toolbar */
  toolbarDivider: {
    width:           '1px',
    height:          '16px',
    backgroundColor: T.borderInner,
    flexShrink:      0,
    marginLeft:      '4px',
  },

  /* Toolbar icon group */
  toolbarGroup: {
    display:    'flex',
    alignItems: 'center',
    gap:        '1px',
    flexShrink: 0,
  },

  /* Individual toolbar button — disabled / prototype */
  toolBtn: {
    display:         'inline-flex',
    alignItems:      'center',
    justifyContent:  'center',
    width:           '24px',
    height:          '24px',
    padding:         '0',
    border:          'none',
    borderRadius:    '3px',
    backgroundColor: 'transparent',
    color:           T.textMuted,
    opacity:         0.5,
    cursor:          'default',
    flexShrink:      0,
    transition:      'background-color 0.1s ease',
  },

  /* ── Viewport body (scrollable terminal area) ── */
  body: {
    flex:      '1 1 auto',
    padding:   '12px 14px 14px',
    overflowY: 'auto',
    color:     T.textPrimary,
    textAlign: 'left',         /* override #root { text-align: center } in index.css */
    cursor:    'text',         /* communicate that the area accepts text input */
  },

  /* Context line — muted, top of body */
  contextLine: {
    fontSize:     '12px',
    color:        T.textMuted,
    marginBottom: '3px',
    userSelect:   'none',
  },

  /* Prototype notice */
  noticeLine: {
    fontSize:     '12px',
    color:        T.textSec,
    marginBottom: '14px',
    userSelect:   'none',
  },

  /* ── Prompt shared styles ── */
  promptRow: {
    display:    'flex',
    alignItems: 'center',
    flexWrap:   'nowrap',        /* keep prompt on one line */
    minWidth:   '0',
  },
  promptUser: {
    color:      T.promptGreen,
    fontWeight: 600,
    flexShrink: 0,
  },
  promptCwd: {
    color:      T.promptCyan,
    fontWeight: 600,
    flexShrink: 0,
  },
  promptSym: {
    color:       T.textPrimary,
    opacity:     0.75,
    marginRight: '4px',
    flexShrink:  0,
  },

  /* ── History lines (submitted, read-only) ── */
  historyLine: {
    display:    'flex',
    alignItems: 'center',
    flexWrap:   'wrap',
    lineHeight: '1.65',
  },
  historyText: {
    color:     T.textPrimary,
    whiteSpace: 'pre',
  },

  /* ── Live input field ── */
  termInput: {
    flex:            '1 1 auto',
    minWidth:        '1px',      /* prevent input collapsing to zero width */
    maxWidth:        '100%',
    background:      'transparent',
    border:          'none',
    outline:         'none',
    color:           T.textPrimary,
    fontFamily:      T.mono,
    fontSize:        '13px',
    lineHeight:      '1.65',
    padding:         '0',
    margin:          '0',
    caretColor:      T.caretCol, /* neutral #CCCCCC cursor — not purple */
    whiteSpace:      'pre',
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   Injected CSS — toolbar hover / focus states + custom scrollbar.
   Keeps all interactive styles out of inline objects where :pseudo unsupported.
───────────────────────────────────────────────────────────────────────────── */
const TERMINAL_CSS = `
  /* VS Code Dark Modern hover */
  .ros-tb-btn:hover { background-color: #252526; }
  /* Keyboard focus ring — VS Code accent blue */
  .ros-tb-btn:focus-visible {
    outline: 1px solid #0078D4;
    outline-offset: 1px;
    border-radius: 3px;
  }
  /* Slim scrollbar for the terminal body */
  .ros-terminal-body::-webkit-scrollbar { width: 6px; }
  .ros-terminal-body::-webkit-scrollbar-track { background: transparent; }
  .ros-terminal-body::-webkit-scrollbar-thumb {
    background: #2B2B2B;
    border-radius: 3px;
  }
  /* Remove browser default focus ring from the input; caret handles feedback */
  .ros-term-input { outline: none; }
`;

function TerminalStyles() {
  return <style>{TERMINAL_CSS}</style>;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────────────────────────────── */

/** Outer panel header — 40 px, matches teammate panel card pattern */
function OuterHeader() {
  return (
    <div style={S.outerHeader}>
      <div style={S.outerHeaderLeft}>
        <SquareTerminal
          size={15}
          style={{ color: T.textSec, flexShrink: 0 }}
          aria-hidden="true"
        />
        <span style={S.outerHeaderTitle}>Terminal</span>
      </div>
      <div style={S.outerHeaderRight}>
        <span style={S.uiBadge} title="UI prototype — command execution not connected">
          <span style={S.uiBadgeDot} />
          UI Preview
        </span>
      </div>
    </div>
  );
}

/**
 * Prototype toolbar button — disabled for this milestone.
 * Tooltip communicates the future capability without implying it exists.
 */
function ToolBtn({ icon: Icon, label, title }) {
  return (
    <button
      style={S.toolBtn}
      className="ros-tb-btn"
      title={title}
      aria-label={label}
      aria-disabled="true"
      /* No onClick — intentionally non-functional in UI prototype */
    >
      <Icon size={14} aria-hidden="true" />
    </button>
  );
}

/** Windows Terminal-style tab strip with VS Code-inspired toolbar */
function TabStrip() {
  const PROTO = '— not available in UI prototype (27 Oct 2026)';
  return (
    <div style={S.tabStrip}>
      {/* Left: profile selector */}
      <div style={S.tabLeft}>
        <SquareTerminal
          size={13}
          style={{ color: T.textSec, flexShrink: 0 }}
          aria-hidden="true"
        />
        <span style={S.tabLabel}>Ubuntu Bash</span>
        <ChevronDown
          size={12}
          style={S.tabChevron}
          aria-hidden="true"
        />
      </div>

      {/* Right: action toolbar — all disabled for this milestone */}
      <div style={S.toolbarGroup} role="toolbar" aria-label="Terminal actions (prototype — unavailable)">
        <div style={S.toolbarDivider} aria-hidden="true" />
        <ToolBtn icon={Plus}                  label="New terminal (unavailable)"   title={`New Terminal ${PROTO}`} />
        <ToolBtn icon={SplitSquareHorizontal} label="Split terminal (unavailable)" title={`Split Terminal ${PROTO}`} />
        <ToolBtn icon={Trash2}                label="Clear terminal (unavailable)" title={`Clear Terminal ${PROTO}`} />
        <ToolBtn icon={MoreHorizontal}        label="More actions (unavailable)"   title={`More Actions ${PROTO}`} />
        <div style={S.toolbarDivider} aria-hidden="true" />
        <ToolBtn icon={Maximize2}             label="Maximize panel (unavailable)" title={`Maximize Panel ${PROTO}`} />
        <ToolBtn icon={X}                     label="Close terminal (unavailable)" title={`Close Terminal ${PROTO}`} />
      </div>
    </div>
  );
}

/**
 * Interactive terminal body.
 *
 * Accepts keyboard input via a controlled <input> element.
 * Enter submits the current line to local history (no command execution).
 * All output is strictly local React state — no shell, no eval, no network.
 */
function TerminalBody() {
  const [history, setHistory] = useState([]); /* submitted prompt lines */
  const [input,   setInput]   = useState('');
  const inputRef = useRef(null);
  const bodyRef  = useRef(null);

  /** Focus the input whenever the terminal area is clicked */
  const focusInput = () => inputRef.current?.focus();

  /** Scroll the body to the bottom (called after state update) */
  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (bodyRef.current) {
        bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
      }
    });
  };

  /**
   * Enter: record the line in history, clear the input, scroll down.
   * All other keys (Backspace, Delete, arrows, Home/End, selection)
   * are handled natively by the <input> element.
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setHistory(prev => [...prev, input]);
      setInput('');
      scrollToBottom();
    }
  };

  return (
    <div
      ref={bodyRef}
      style={S.body}
      className="ros-terminal-body"
      onClick={focusInput}
    >
      {/* Context label */}
      <p style={S.contextLine}>ROS Development Workspace</p>

      {/* Prototype notice — always visible, clearly non-functional */}
      <p style={S.noticeLine}>
        Frontend prototype&nbsp;— command execution unavailable.
        Input is recorded locally only.
      </p>

      {/* History: previously submitted lines (read-only, no output generated) */}
      {history.map((line, i) => (
        <div key={i} style={S.historyLine}>
          <span style={S.promptUser}>student@ros-workspace</span>
          <span style={S.promptCwd}>:~</span>
          <span style={S.promptSym}>$</span>
          {/* space before input text, preserved exactly as typed */}
          <span style={S.historyText}>&nbsp;{line}</span>
        </div>
      ))}

      {/* Active prompt — <input> handles all native editing behaviour */}
      <div style={S.promptRow}>
        <span style={S.promptUser}>student@ros-workspace</span>
        <span style={S.promptCwd}>:~</span>
        <span style={S.promptSym}>$&nbsp;</span>
        <input
          ref={inputRef}
          type="text"
          className="ros-term-input"
          style={S.termInput}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          aria-label="Terminal input — command execution unavailable in UI prototype"
          aria-describedby="ros-term-notice"
        />
      </div>

      {/* Screen-reader accessible notice (hidden visually) */}
      <span
        id="ros-term-notice"
        style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}
      >
        This is a UI prototype. Commands typed here are not executed.
      </span>
    </div>
  );
}

/** Dark terminal viewport — tab strip + interactive body */
function TerminalViewport() {
  return (
    <div
      style={S.viewport}
      role="region"
      aria-label="Terminal viewport — UI prototype, command execution unavailable"
    >
      <TabStrip />
      <TerminalBody />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main export
───────────────────────────────────────────────────────────────────────────── */

/**
 * TerminalPanel
 *
 * Self-contained interactive terminal placeholder for the ROS workspace UI.
 * Accepts keyboard input locally. No shell, no backend, no fabricated output.
 *
 * Usage (integrator):
 *   import TerminalPanel from './components/Terminal';
 *   <TerminalPanel />
 */
function TerminalPanel() {
  return (
    <>
      <TerminalStyles />
      <section style={S.section} aria-label="Terminal panel">
        <OuterHeader />
        <div style={S.viewportWrapper}>
          <TerminalViewport />
        </div>
      </section>
    </>
  );
}

export default TerminalPanel;
