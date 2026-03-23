import { useEffect } from 'react'

interface ToastProps {
  message: string;
  visible: boolean;
  onDismiss: () => void;
  duration?: number;
}

export default function Toast({ message, visible, onDismiss, duration = 2500 }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onDismiss, duration)
      return () => clearTimeout(timer)
    }
  }, [visible, duration, onDismiss])

  if (!visible) return null

  return (
    <div
      className="animate-slide-up"
      style={{
        position: 'fixed',
        bottom: 100,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'var(--color-status-ok)',
        color: 'var(--color-status-ok-text)',
        padding: '12px 24px',
        borderRadius: 'var(--radius-md)',
        fontSize: 14,
        fontWeight: 600,
        zIndex: 100,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        whiteSpace: 'nowrap',
      }}
    >
      {message}
    </div>
  )
}
