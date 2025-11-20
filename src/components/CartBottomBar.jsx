import React from 'react';
import { ShoppingBag } from 'lucide-react';

export default function CartBottomBar({ itemCount, total, onClick }) {
    if (itemCount === 0) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 40px)',
            maxWidth: '560px',
            zIndex: 100
        }}>
            <button
                onClick={onClick}
                style={{
                    width: '100%',
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    padding: '16px 20px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                    border: 'none'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{itemCount}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '0.8rem', opacity: 0.9 }}>Total</span>
                        <span style={{ fontWeight: 700, fontSize: '1rem' }}>₹{total}</span>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 600, fontSize: '1rem' }}>View Cart</span>
                    <ShoppingBag size={18} />
                </div>
            </button>
        </div>
    );
}
