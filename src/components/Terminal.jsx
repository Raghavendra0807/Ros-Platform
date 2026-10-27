/**
 * Terminal.jsx
 *
 * Milestone: Frontend UI Prototype (27 October 2026)
 * Assigned contributor: Terminal panel
 *
 * Purpose:
 *   Renders the Terminal placeholder panel for the Scalable ROS Platform workspace.
 *   No shell commands are executed. No WebSocket or backend connection is made.
 *   The viewport reserves space for a real ttyd / xterm.js terminal in a future milestone.
 *
 * Integration note for the integrator (App.jsx owner):
 *   1. Add:  import TerminalPanel from './components/Terminal';
 *   2. Replace the inline "Terminal container — Member 4" <section> block with:
 *      <TerminalPanel />
 *   The component is self-contained — it controls its own outer <section> wrapper,
 *   matching the dimensions and margin of the existing inline placeholder.
 */

import { SquareTerminal, Minus, Square, Circle } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   Design tokens mirrored from App.jsx / the integrator's established palette.
   These are self-contained CSS values — Tailwind CSS is NOT required.
───────────────────────────────────────────────────────────────────────────── */
const TOKEN = {
  /** Outer card / panel background */
  cardBg:         '#181a1d',
  /** Page / app background (slightly darker) */
  appBg:          '#111315',
  /** Terminal viewport background — deepest surface */
  viewportBg:     '#0c0d10',
  /** Outer panel border */
  borderOuter:    '#292c30',
  /** Inner / dashed element border */
  borderInner:    '#34373c',
  /** Primary foreground text */
  textPrimary:    '#e5e7eb',
  /** Secondary / label text */
  textSecondary:  '#b5bdc8',
  /** Muted / placeholder text */
  textMuted:      '#858b95',
  /** Icon tint */
  iconTint:       '#9aa7b7',
  /** Accent — restrained purple from index.css --accent */
  accent:         '#c084fc',
  /** Amber — offline / standalone status */
  statusAmber:    '#f59e0b',
  /** Monospace font stack */
  mono:           "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Styles object — plain JS style objects consumed by React's style prop.
   Matches the panel card pattern used in the integrator's App.jsx scaffold.
───────────────────────────────────────────────────────────────────────────── */
const S = {
  /** Outer section — matches the integrator's section wrapper dimensions */
  section: {
    marginTop:      '12px',             /* mt-3 equivalent */
    display:        'flex',
    flexDirection:  'column',
    overflow:       'hidden',
    borderRadius:   '8px',
    border:         `1px solid ${TOKEN.borderOuter}`,
    backgroundColor: TOKEN.cardBg,
    minHeight:      '240px',            /* slightly taller than integrator's 190px for readability */
    flex:           '1 1 auto',
  },

  /** Header bar ─ 40px fixed height */
  header: {
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'space-between',
    height:         '40px',
    flexShrink:     0,
    borderBottom:   `1px solid ${TOKEN.borderOuter}`,
    padding:        '0 12px',
    gap:            '8px',
  },

  /** Left cluster inside the header */
  headerLeft: {
    display:   'flex',
    alignItems: 'center',
    gap:        '8px',
    overflow:   'hidden',
  },

  /** Panel title text */
  headerTitle: {
    fontFamily:     TOKEN.mono,
    fontSize:       '11px',
    fontWeight:     600,
    letterSpacing:  '0.08em',
    textTransform:  'uppercase',
    color:          TOKEN.textSecondary,
    whiteSpace:     'nowrap',
  },

  /** Shell badge pill */
  shellBadge: {
    display:        'inline-flex',
    alignItems:     'center',
    height:         '18px',
    padding:        '0 7px',
    borderRadius:   '4px',
    border:         `1px solid ${TOKEN.borderInner}`,
    backgroundColor: TOKEN.viewportBg,
    fontFamily:     TOKEN.mono,
    fontSize:       '10px',
    color:          TOKEN.textMuted,
    letterSpacing:  '0.04em',
    whiteSpace:     'nowrap',
  },

  /** Right cluster: status + window chrome */
  headerRight: {
    display:   'flex',
    alignItems: 'center',
    gap:        '10px',
    flexShrink: 0,
  },

  /** Standalone / mock status badge */
  statusBadge: {
    display:        'inline-flex',
    alignItems:     'center',
    gap:            '5px',
    height:         '20px',
    padding:        '0 8px',
    borderRadius:   '4px',
    border:         `1px solid ${TOKEN.borderInner}`,
    backgroundColor: TOKEN.viewportBg,
    fontSize:       '10px',
    color:          TOKEN.textMuted,
    whiteSpace:     'nowrap',
    letterSpacing:  '0.03em',
  },

  /** Amber dot inside status badge */
  statusDot: {
    width:           '6px',
    height:          '6px',
    borderRadius:    '50%',
    backgroundColor: TOKEN.statusAmber,
    flexShrink:      0,
  },

  /** Faux window-chrome buttons (purely decorative) */
  windowChrome: {
    display:   'flex',
    alignItems: 'center',
    gap:        '4px',
    opacity:    0.45,
  },

  /** Viewport wrapper — grows to fill remaining height */
  viewportWrapper: {
    display:       'flex',
    flexDirection: 'column',
    flex:          '1 1 auto',
    padding:       '10px',
    minHeight:     '0',             /* essential for flex shrinking */
  },

  /** The dark CLI viewport itself */
  viewport: {
    display:        'flex',
    flexDirection:  'column',
    flex:           '1 1 auto',
    borderRadius:   '6px',
    border:         `1px solid ${TOKEN.borderInner}`,
    backgroundColor: TOKEN.viewportBg,
    overflow:       'hidden',
    fontFamily:     TOKEN.mono,
    fontSize:       '13px',
    lineHeight:     '1.6',
    minHeight:      '160px',
  },

  /** Top chrome line of the viewport (mimics terminal app title bar) */
  viewportChrome: {
    display:        'flex',
    alignItems:     'center',
    height:         '26px',
    flexShrink:     0,
    borderBottom:   `1px solid ${TOKEN.borderInner}`,
    padding:        '0 10px',
    gap:            '6px',
  },

  /** Traffic-light dots on the viewport chrome (decorative) */
  trafficDot: (color) => ({
    width:           '10px',
    height:          '10px',
    borderRadius:    '50%',
    backgroundColor: color,
    opacity:         0.6,
  }),

  /** Viewport chrome label */
  viewportChromeLabel: {
    position:  'absolute',
    left:      '50%',
    transform: 'translateX(-50%)',
    fontSize:  '10px',
    color:     TOKEN.textMuted,
    letterSpacing: '0.04em',
    userSelect: 'none',
  },

  /** Scrollable body of the viewport */
  viewportBody: {
    flex:       '1 1 auto',
    padding:    '14px 16px',
    overflowY:  'auto',
    color:      TOKEN.textPrimary,
  },

  /** Dim banner / system info lines */
  bannerLine: {
    color:        TOKEN.textMuted,
    fontSize:     '12px',
    marginBottom: '2px',
    userSelect:   'none',
  },

  /** Separator line */
  separator: {
    borderTop:    `1px solid ${TOKEN.borderInner}`,
    margin:       '10px 0',
    opacity:      0.5,
  },

  /** Milestone notice block */
  notice: {
    display:        'flex',
    alignItems:     'flex-start',
    gap:            '8px',
    padding:        '8px 10px',
    borderRadius:   '4px',
    border:         `1px solid ${TOKEN.borderInner}`,
    backgroundColor: 'rgba(240,159,50,0.06)',
    margin:         '10px 0 14px',
    fontSize:       '11px',
    color:          '#c9a96e',
    lineHeight:     '1.5',
  },

  /** [notice] icon column */
  noticeIcon: {
    flexShrink:     0,
    marginTop:      '1px',
    fontSize:       '13px',
  },

  /** The prompt line */
  promptLine: {
    display:    'flex',
    alignItems: 'center',
    gap:        '0px',
    marginTop:  '4px',
    flexWrap:   'wrap',
  },

  /** prompt path segment */
  promptPath: {
    color:      '#6ca9f7',      /* blue — conventional shell cwd */
    fontWeight: 600,
  },

  /** prompt symbol */
  promptSymbol: {
    color:      TOKEN.textMuted,
    margin:     '0 4px',
  },

  /** Blinking block cursor */
  cursor: {
    display:         'inline-block',
    width:           '8px',
    height:          '14px',
    backgroundColor: TOKEN.accent,
    verticalAlign:   'middle',
    animation:       'ros-cursor-blink 1.1s step-end infinite',
    borderRadius:    '1px',
    marginLeft:      '2px',
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   Cursor blink keyframes — injected once as a <style> tag.
   Avoids any dependency on external CSS infrastructure.
───────────────────────────────────────────────────────────────────────────── */
const CURSOR_KEYFRAMES = `
  @keyframes ros-cursor-blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
`;

function CursorStyle() {
  return <style>{CURSOR_KEYFRAMES}</style>;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────────────────────────────── */

/** Header bar at the top of the panel card */
function TerminalHeader() {
  return (
    <div style={S.header}>
      {/* ── Left: icon · title · shell badge ── */}
      <div style={S.headerLeft}>
        <SquareTerminal
          size={15}
          style={{ color: TOKEN.iconTint, flexShrink: 0 }}
          aria-hidden="true"
        />
        <span style={S.headerTitle}>Terminal</span>
        <span style={S.shellBadge}>bash</span>
      </div>

      {/* ── Right: status · window chrome ── */}
      <div style={S.headerRight}>
        {/* Standalone / mock indicator */}
        <span
          style={S.statusBadge}
          title="No backend connection — UI prototype only"
        >
          <span style={S.statusDot} />
          Standalone · Mock
        </span>

        {/* Decorative window chrome — not functional */}
        <span style={S.windowChrome} aria-hidden="true">
          <Minus size={12} style={{ color: TOKEN.iconTint }} />
          <Square size={11} style={{ color: TOKEN.iconTint }} />
          <Circle size={11} style={{ color: TOKEN.iconTint }} />
        </span>
      </div>
    </div>
  );
}

/** Dark CLI viewport with banner, notice, and mock prompt */
function TerminalViewport() {
  return (
    <div style={S.viewport} role="region" aria-label="Terminal viewport placeholder">
      {/* Viewport chrome — mimics a native terminal window title bar */}
      <div style={{ ...S.viewportChrome, position: 'relative' }}>
        <span style={S.trafficDot('#ff5f57')} />
        <span style={S.trafficDot('#febc2e')} />
        <span style={S.trafficDot('#28c840')} />
        <span style={S.viewportChromeLabel}>
          bash — student@ros-workspace
        </span>
      </div>

      {/* Scrollable terminal body */}
      <div style={S.viewportBody}>
        {/* System / platform banner */}
        <p style={S.bannerLine}>
          Scalable ROS Platform — Interactive Web Terminal
        </p>
        <p style={S.bannerLine}>
          Session type: browser-based (ttyd / xterm.js — future milestone)
        </p>
        <p style={S.bannerLine}>
          ROS 2 Humble Hawksbill &nbsp;|&nbsp; Gazebo Fortress &nbsp;|&nbsp; Ubuntu 22.04 LTS
        </p>

        <div style={S.separator} />

        {/* Milestone placeholder notice */}
        <div style={S.notice} role="note">
          <span style={S.noticeIcon}>⚠</span>
          <span>
            <strong>UI Prototype — 27 October 2026</strong>
            <br />
            This terminal panel is a visual placeholder. Shell command execution,
            ROS 2 environment access and backend connections are not available at
            this milestone stage. The viewport will be replaced by a live ttyd
            session in a future integration sprint.
          </span>
        </div>

        {/* Illustrative shell prompt — static, no input or execution */}
        <div style={S.promptLine} aria-label="Placeholder shell prompt">
          <span style={{ color: '#7dd3a8' }}>student</span>
          <span style={{ color: TOKEN.textMuted }}>@</span>
          <span style={{ color: '#7dd3a8' }}>ros-workspace</span>
          <span style={{ color: TOKEN.textMuted }}>:</span>
          <span style={S.promptPath}>~</span>
          <span style={S.promptSymbol}>$&nbsp;</span>
          {/* Blinking cursor — purely decorative */}
          <span style={S.cursor} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main export
───────────────────────────────────────────────────────────────────────────── */

/**
 * TerminalPanel
 *
 * Self-contained terminal placeholder panel for the ROS workspace UI.
 *
 * Usage (for the integrator replacing the inline block in App.jsx):
 *
 *   import TerminalPanel from './components/Terminal';
 *   …
 *   <TerminalPanel />
 *
 * The component owns its outer <section> wrapper, matching the dimensions
 * established by the integrator's scaffold in App.jsx.
 */
function TerminalPanel() {
  return (
    <>
      <CursorStyle />
      <section style={S.section} aria-label="Terminal panel">
        <TerminalHeader />
        <div style={S.viewportWrapper}>
          <TerminalViewport />
        </div>
      </section>
    </>
  );
}

export default TerminalPanel;
