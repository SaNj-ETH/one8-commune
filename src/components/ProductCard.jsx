import React from 'react';
import { Plus, Minus } from 'lucide-react';

export default function ProductCard({ item, quantity, onAdd, onRemove }) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px',
            borderBottom: '1px solid var(--color-border)',
            gap: '16px'
        }}>
            <div style={{ flex: 1 }}>
                <div style={{ marginBottom: '8px' }}>
                    {item.isVeg ? (
                        <div className="veg-icon" title="Veg"></div>
                    ) : (
                        <div className="non-veg-icon" title="Non-Veg"></div>
                    )}
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '4px', color: 'var(--color-text)' }}>
                    {item.name}
                </h3>
                <p style={{ fontSize: '0.9rem', fontWeight: 500, marginBottom: '8px', color: 'var(--color-text)' }}>
                    ₹{item.price}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.description}
                </p>
            </div>

            <div style={{ position: 'relative', width: '120px', flexShrink: 0 }}>
                <div style={{
                    width: '100%',
                    height: '110px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundColor: '#f0f0f0'
                }}>
                    {item.image && (
                        <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    )}
                </div>

                <div style={{
                    position: 'absolute',
                    bottom: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '90px',
                    height: '36px',
                    border: '1px solid var(--color-border)'
                }}>
                    {quantity > 0 ? (
                        <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between', padding: '0 8px' }}>
                            <button onClick={onRemove} style={{ color: 'var(--color-text-light)', display: 'flex' }}>
                                <Minus size={14} />
                            </button>
                            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-primary)' }}>{quantity}</span>
                            <button onClick={onAdd} style={{ color: 'var(--color-primary)', display: 'flex' }}>
                                <Plus size={14} />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={onAdd}
                            style={{
                                width: '100%',
                                height: '100%',
                                color: 'var(--color-primary)',
                                fontSize: '0.9rem',
                                fontWeight: 700,
                                background: 'transparent'
                            }}
                        >
                            ADD
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
