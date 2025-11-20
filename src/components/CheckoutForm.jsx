import React, { useState } from 'react';
import { X, CreditCard, Banknote, Smartphone } from 'lucide-react';

export default function CheckoutForm({ isOpen, onClose, total, onSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        paymentMode: 'online'
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 250,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)'
        }}>
            <div style={{
                backgroundColor: 'white',
                width: '100%',
                maxWidth: '600px',
                borderTopLeftRadius: '24px',
                borderTopRightRadius: '24px',
                padding: '24px',
                animation: 'slideUp 0.3s ease-out',
                maxHeight: '90vh',
                overflowY: 'auto'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Checkout Details</h2>
                    <button onClick={onClose} style={{ padding: '8px', backgroundColor: '#f5f5f5', borderRadius: '50%' }}>
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem' }}>Full Name</label>
                        <input
                            type="text"
                            required
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '14px',
                                borderRadius: '12px',
                                border: '1px solid var(--color-border)',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem' }}>Phone Number</label>
                        <input
                            type="tel"
                            required
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '14px',
                                borderRadius: '12px',
                                border: '1px solid var(--color-border)',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '32px' }}>
                        <label style={{ display: 'block', marginBottom: '12px', fontWeight: 500, fontSize: '0.9rem' }}>Payment Mode</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                            {[
                                { id: 'online', label: 'Online', icon: Smartphone },
                                { id: 'card', label: 'Card', icon: CreditCard },
                                { id: 'cash', label: 'Cash', icon: Banknote }
                            ].map((mode) => (
                                <button
                                    key={mode.id}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, paymentMode: mode.id })}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '16px',
                                        borderRadius: '12px',
                                        border: formData.paymentMode === mode.id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                                        backgroundColor: formData.paymentMode === mode.id ? 'rgba(26,26,26,0.05)' : 'white',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <mode.icon size={24} color={formData.paymentMode === mode.id ? 'var(--color-primary)' : '#999'} />
                                    <span style={{
                                        fontSize: '0.9rem',
                                        fontWeight: 500,
                                        color: formData.paymentMode === mode.id ? 'var(--color-primary)' : 'var(--color-text-light)'
                                    }}>{mode.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>Total Amount</span>
                            <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>₹{total}</span>
                        </div>

                        <button
                            type="submit"
                            className="btn-primary"
                            style={{ fontSize: '1.1rem' }}
                        >
                            Confirm Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
