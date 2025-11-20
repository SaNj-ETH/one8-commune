import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

export default function Toast({ message, onClose, duration = 2000 }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div style={{
            position: 'fixed',
            bottom: '100px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            zIndex: 150,
            animation: 'slideUpFade 0.3s ease-out',
            minWidth: '250px'
        }}>
            <style>{`
        @keyframes slideUpFade {
          from { transform: translateX(-50%) translateY(20px); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
      `}</style>
            <CheckCircle size={20} />
            <span style={{ flex: 1, fontSize: '0.9rem' }}>{message}</span>
            <button onClick={onClose} style={{ background: 'transparent', padding: '4px' }}>
                <X size={16} />
            </button>
        </div>
    );
}
