import React from 'react';

export default function CategoryNav({ categories, activeCategory, onSelectCategory }) {
    return (
        <div style={{
            position: 'sticky',
            top: '60px', // Height of header roughly
            zIndex: 40,
            backgroundColor: 'var(--color-bg)',
            padding: '12px 0',
            borderBottom: '1px solid var(--color-border)',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            display: 'flex',
            gap: '12px',
            paddingLeft: '20px',
            paddingRight: '20px',
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none' // IE/Edge
        }} className="no-scrollbar">
            <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        backgroundColor: activeCategory === cat.id ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
                        color: activeCategory === cat.id ? '#fff' : 'var(--color-text)',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        transition: 'all 0.3s ease',
                        border: activeCategory === cat.id ? 'none' : '1px solid transparent'
                    }}
                >
                    {cat.name}
                </button>
            ))}
        </div>
    );
}
