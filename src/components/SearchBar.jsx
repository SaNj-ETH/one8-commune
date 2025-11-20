import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ onSearch, onClose }) {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            backgroundColor: 'white',
            padding: '16px 20px',
            borderBottom: '1px solid var(--color-border)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            animation: 'slideDown 0.3s ease-out'
        }}>
            <style>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
      `}</style>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', maxWidth: '600px', margin: '0 auto' }}>
                <Search size={20} color="var(--color-text-light)" />
                <input
                    type="text"
                    placeholder="Search for dishes..."
                    value={query}
                    onChange={handleChange}
                    autoFocus
                    style={{
                        flex: 1,
                        border: 'none',
                        outline: 'none',
                        fontSize: '1rem',
                        padding: '8px 0'
                    }}
                />
                <button onClick={onClose} style={{ background: 'transparent', padding: '4px' }}>
                    <X size={20} />
                </button>
            </div>
        </div>
    );
}
