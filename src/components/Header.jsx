import React from 'react';
import { Search } from 'lucide-react';

export default function Header() {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      padding: '16px 20px',
      borderBottom: '1px solid var(--color-border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.5px' }}>one8 Commune</h1>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>Indore</p>
      </div>
      <button style={{ padding: '8px', background: 'transparent' }}>
        <Search size={20} color="var(--color-text)" />
      </button>
    </header>
  );
}
