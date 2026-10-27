/**
 * Terminal.jsx
 *
 * Milestone: Frontend UI Prototype (27 October 2026)
 * Assigned contributor: Terminal panel — Member 4
 *
 * Purpose:
 *   Renders the Terminal placeholder panel for the Scalable ROS Platform workspace.
 *   UI-only — no shell execution, no WebSocket, no backend connection.
 *   Styled after a Windows Terminal-inspired tab interface embedded in the browser.
 *
 * Integration note for the integrator (App.jsx owner):
 *   1. import TerminalPanel from './components/Terminal';
 *   2. Replace the "Terminal container — Member 4" <section> block with:
 *      <TerminalPanel />
 */

import { SquareTerminal, ChevronDown } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   Design tokens — mirrored from the integrator's established App.jsx palette.
   Tailwind CSS is NOT required; all values are plain CSS strings.
───────────────────────────────────────────────────────────────────────────── */
const T = {
  cardBg:       '#181a1d',   /* outer panel surface                  */
  viewportBg:   '#0e1013',   /* terminal viewport — deepest surface  */
  tabBarBg:     '#131518',   /* tab-strip surface, slightly lighter  */
  borderOuter:  '#292c30',   /* panel / header border                */
  borderInner:  '#34373c',   /* inner dividers, badge outlines       */
  textPrimary:  '#e5e7eb',   /* main terminal text                   */
  textSec:      '#9aa7b7',   /* secondary labels, icon tint          */
  textMuted:    '#858b95',   /* muted / dimmed lines                 */
  accent:       '#c084fc',   /* cursor accent                        */
  statusAmber:  '#f59e0b',   /* UI Preview dot                       */
  promptGreen:  '#4ade80',   /* user@host green — standard bash      */
  promptBlue:   '#60a5fa',   /* cwd blue                             */
  mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace",
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

  /* ── Outer panel header bar (40 px, matches other panels) ── */
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

  /* ── Windows Terminal-style tab strip ── */
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
    fontSize:   '12px',
    fontWeight: 600,
    color:      T.textPrimary,
    whiteSpace: 'nowrap',
    letterSpacing: '0.01em',
  },
  tabChevron: {
    color:      T.textMuted,
    marginLeft: '1px',
    flexShrink: 0,
  },
  tabRight: {
    fontSize:      '11px',
    color:         T.textMuted,
    letterSpacing: '0.03em',
    whiteSpace:    'nowrap',
    userSelect:    'none',
  },

  /* ── Viewport body ── */
  body: {
    flex:       '1 1 auto',
    padding:    '14px 16px',
    overflowY:  'auto',
    color:      T.textPrimary,
    textAlign:  'left',            /* override #root { text-align: center } in index.css */
  },

  /* Dimmed context line — same size as body for monospace rhythm */
  contextLine: {
    fontSize:     '13px',
    color:        T.textMuted,
    marginBottom: '4px',
    userSelect:   'none',
  },

  /* Prototype notice — one step below context, above prompt */
  noticeLine: {
    fontSize:     '13px',
    color:        T.textSec,
    marginBottom: '16px',
  },

  /* Prompt row — flex, all tokens flush against each other */
  promptRow: {
    display:    'flex',
    alignItems: 'center',
    flexWrap:   'wrap',
  },
  /* green: student@ros-workspace */
  promptUser: {
    color:      T.promptGreen,
    fontWeight: 600,
  },
  /* blue accent: :~ */
  promptCwd: {
    color:      T.promptBlue,
    fontWeight: 600,
  },
  /* neutral: $ with a single space before cursor */
  promptSym: {
    color:        T.textPrimary,
    opacity:      0.75,
    marginRight:  '4px',
  },
  cursor: {
    display:         'inline-block',
    width:           '8px',
    height:          '15px',
    backgroundColor: T.accent,
    verticalAlign:   'middle',
    animation:       'ros-terminal-blink 1.1s step-end infinite',
    borderRadius:    '1px',
  },
};

/* ── Cursor keyframe injected once ── */
const BLINK_CSS = `
  @keyframes ros-terminal-blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
`;

function BlinkStyle() {
  return <style>{BLINK_CSS}</style>;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────────────────────────────── */

/** Outer panel header — matches the card header pattern of all other panels */
function OuterHeader() {
  return (
    <div style={S.outerHeader}>
      {/* Left: icon + TERMINAL label */}
      <div style={S.outerHeaderLeft}>
        <SquareTerminal
          size={15}
          style={{ color: T.textSec, flexShrink: 0 }}
          aria-hidden="true"
        />
        <span style={S.outerHeaderTitle}>Terminal</span>
      </div>

      {/* Right: UI Preview badge */}
      <div style={S.outerHeaderRight}>
        <span style={S.uiBadge} title="UI prototype — no backend connection">
          <span style={S.uiBadgeDot} />
          UI Preview
        </span>
      </div>
    </div>
  );
}

/** Windows Terminal-style tab strip inside the dark viewport card */
function TabStrip() {
  return (
    <div style={S.tabStrip}>
      {/* Left: icon · Ubuntu Bash · chevron */}
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

      {/* Right: shell type label */}
      <span style={S.tabRight}>Linux Shell</span>
    </div>
  );
}

/** Scrollable terminal viewport body */
function ViewportBody() {
  return (
    <div style={S.body}>
      {/* Context label */}
      <p style={S.contextLine}>ROS Development Workspace</p>

      {/* Prototype notice — clearly marked as placeholder */}
      <p style={S.noticeLine}>
        Frontend prototype&nbsp;— terminal connection is not available yet.
      </p>

      {/* Static illustrative prompt — decorative only, no input or execution */}
      <div style={S.promptRow} aria-label="Placeholder shell prompt">
        {/* green  */ }<span style={S.promptUser}>student@ros-workspace</span>
        {/* blue   */ }<span style={S.promptCwd}>:~</span>
        {/* symbol */ }<span style={S.promptSym}>$</span>
        {/* cursor — decorative blink, aria-hidden */}
        <span style={S.cursor} aria-hidden="true" />
      </div>
    </div>
  );
}

/** Dark terminal viewport card — tab strip + body */
function TerminalViewport() {
  return (
    <div
      style={S.viewport}
      role="region"
      aria-label="Terminal viewport placeholder"
    >
      <TabStrip />
      <ViewportBody />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main export
───────────────────────────────────────────────────────────────────────────── */

/**
 * TerminalPanel
 *
 * Self-contained terminal placeholder for the ROS workspace UI.
 * Styled after a Windows Terminal-inspired browser-embedded terminal.
 *
 * Usage (integrator):
 *   import TerminalPanel from './components/Terminal';
 *   <TerminalPanel />
 */
function TerminalPanel() {
  return (
    <>
      <BlinkStyle />
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
