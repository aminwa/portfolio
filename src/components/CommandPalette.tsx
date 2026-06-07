import { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight } from 'lucide-react';

type Command = {
  label: string;
  description: string;
  action: () => void;
};

const commands: Command[] = [
  { label: 'About', description: 'Jump to about section', action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
  { label: 'Projects', description: 'Jump to featured projects', action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
  { label: 'Research', description: 'Jump to dissertation research', action: () => document.getElementById('research')?.scrollIntoView({ behavior: 'smooth' }) },
  { label: 'Skills', description: 'Jump to skills section', action: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }) },
  { label: 'Contact', description: 'Jump to contact', action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
  { label: 'shell-pilot', description: 'View shell-pilot project', action: () => window.location.assign('/projects/shell-pilot') },
  { label: 'screenshield', description: 'View screenshield project', action: () => window.location.assign('/projects/screenshield') },
  { label: 'redact', description: 'View redact project', action: () => window.location.assign('/projects/redact') },
  { label: 'Airport X-ray', description: 'View CV detection project', action: () => window.location.assign('/projects/airport-xray') },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase()),
      )
    : commands;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 10);
      setQuery('');
      setSelected(0);
    }
  }, [open]);

  const run = (cmd: Command) => {
    setOpen(false);
    cmd.action();
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    }
    if (e.key === 'Enter' && filtered[selected]) run(filtered[selected]);
  };

  const btnStyle: React.CSSProperties = {
    display: 'none',
    alignItems: 'center',
    gap: '0.375rem',
    padding: '0.375rem 0.625rem',
    fontSize: '0.75rem',
    fontFamily: 'var(--font-mono, monospace)',
    color: 'var(--fg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: '0.375rem',
    background: 'transparent',
    cursor: 'pointer',
    transition: 'border-color 0.15s, color 0.15s',
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Open command palette (Cmd+K)"
        style={{ ...btnStyle, display: 'flex' }}
        className="hidden md:flex"
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.borderColor = '#C9A227';
          el.style.color = '#C9A227';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.borderColor = 'var(--border-color)';
          el.style.color = 'var(--fg-secondary)';
        }}
      >
        <span>⌘K</span>
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '20vh',
        padding: '20vh 1rem 0',
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        onClick={() => setOpen(false)}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(10,15,22,0.8)',
          backdropFilter: 'blur(4px)',
        }}
      />
      <div
        className="animate-fade-up"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '32rem',
          background: 'var(--bg-raised)',
          border: '1px solid var(--border-color)',
          borderRadius: '0.75rem',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          <Search size={16} style={{ color: 'var(--fg-secondary)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
            onKeyDown={handleKey}
            placeholder="Jump to section or project..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '0.875rem',
              color: 'var(--fg-primary)',
              fontFamily: 'var(--font-mono, monospace)',
            }}
          />
          <kbd
            style={{
              fontSize: '0.7rem',
              color: 'var(--fg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '0.25rem',
              padding: '0.125rem 0.375rem',
              fontFamily: 'var(--font-mono, monospace)',
            }}
          >
            esc
          </kbd>
        </div>
        <ul role="listbox" style={{ padding: '0.5rem 0', maxHeight: '20rem', overflowY: 'auto', margin: 0, listStyle: 'none' }}>
          {filtered.map((cmd, i) => (
            <li
              key={cmd.label}
              role="option"
              aria-selected={i === selected}
              onClick={() => run(cmd)}
              onMouseEnter={() => setSelected(i)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.625rem 1rem',
                cursor: 'pointer',
                background: i === selected ? 'var(--bg-surface)' : 'transparent',
                color: i === selected ? 'var(--fg-primary)' : 'var(--fg-secondary)',
                transition: 'background 0.1s, color 0.1s',
              }}
            >
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>{cmd.label}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{cmd.description}</div>
              </div>
              {i === selected && <ArrowRight size={14} style={{ color: '#C9A227', flexShrink: 0 }} />}
            </li>
          ))}
          {filtered.length === 0 && (
            <li style={{ padding: '1.5rem 1rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--fg-secondary)' }}>
              No results
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
