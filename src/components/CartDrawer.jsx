import React, { useState } from 'react';
import { X, Minus, Plus, ArrowRight } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cartItems, onAdd, onRemove, total, onCheckout }) {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end'
        }}>
            <div
                onClick={onClose}
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(4px)'
                }}
            />

            <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '600px',
                backgroundColor: 'white',
                borderTopLeftRadius: '24px',
                borderTopRightRadius: '24px',
                padding: '24px',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                animation: 'slideUp 0.3s ease-out'
            }}>
                <style>{`
          @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
        `}</style>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Your Order</h2>
                    <button onClick={onClose} style={{ padding: '8px', backgroundColor: '#f5f5f5', borderRadius: '50%' }}>
                        <X size={20} />
                    </button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', marginBottom: '24px' }}>
                    {cartItems.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--color-text-light)' }}>
                            Your cart is empty
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{
                                        width: '16px',
                                        height: '16px',
                                        border: `1px solid ${item.isVeg ? 'var(--color-veg)' : 'var(--color-non-veg)'}`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '4px',
                                        flexShrink: 0
                                    }}>
                                        <div style={{
                                            width: '8px',
                                            height: '8px',
                                            backgroundColor: item.isVeg ? 'var(--color-veg)' : 'var(--color-non-veg)',
                                            borderRadius: '50%'
                                        }} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: 500, fontSize: '0.95rem' }}>{item.name}</h4>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>₹{item.price}</p>
                                    </div>
                                </div>

                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    border: '1px solid var(--color-border)',
                                    padding: '6px 12px',
                                    borderRadius: '8px'
                                }}>
                                    <button onClick={() => onRemove(item)} style={{ color: 'var(--color-primary)' }}>
                                        <Minus size={16} />
                                    </button>
                                    <span style={{ fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                    <button onClick={() => onAdd(item)} style={{ color: 'var(--color-primary)' }}>
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>Grand Total</span>
                        <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>₹{total}</span>
                    </div>

                    <button
                        onClick={onCheckout}
                        disabled={cartItems.length === 0}
                        style={{
                            width: '100%',
                            backgroundColor: 'var(--color-primary)',
                            color: 'white',
                            padding: '16px',
                            borderRadius: '16px',
                            fontSize: '1rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            opacity: cartItems.length === 0 ? 0.5 : 1
                        }}
                    >
                        Place Order <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
