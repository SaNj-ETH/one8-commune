import React, { useEffect, useState } from 'react';
import { X, Sparkles } from 'lucide-react';

export default function GreetingPopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show popup after a short delay
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
            padding: '20px'
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '24px',
                padding: '32px',
                maxWidth: '400px',
                width: '100%',
                textAlign: 'center',
                position: 'relative',
                boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
                animation: 'scaleUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}>
                <style>{`
          @keyframes scaleUp {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        `}</style>

                <button
                    onClick={() => setIsOpen(false)}
                    style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: '#f5f5f5',
                        border: 'none',
                        borderRadius: '50%',
                        padding: '8px',
                        cursor: 'pointer'
                    }}
                >
                    <X size={20} color="#666" />
                </button>

                <div style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    color: 'var(--color-accent)'
                }}>
                    <Sparkles size={32} />
                </div>

                <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    marginBottom: '12px',
                    color: 'var(--color-primary)'
                }}>
                    Welcome!
                </h2>

                <p style={{
                    fontSize: '1.1rem',
                    color: 'var(--color-text-light)',
                    lineHeight: '1.5',
                    marginBottom: '24px'
                }}>
                    Hope you're doing fantastic today! ✨
                </p>

                <button
                    onClick={() => setIsOpen(false)}
                    className="btn-primary"
                    style={{
                        fontSize: '1rem',
                        padding: '14px'
                    }}
                >
                    Let's Order
                </button>
            </div>
        </div>
    );
}
