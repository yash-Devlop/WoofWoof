export default function Spinner({ size = 'md' }) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className={`relative ${sizeClasses[size]}`}>
        <style jsx>{`
          .spinner-bar {
            position: absolute;
            width: 50%;
            height: 150%;
            background: #FF4D7F;
            transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1%));
            animation: spinner-pulse 1s calc(var(--delay) * 1s) infinite ease;
          }
          
          @keyframes spinner-pulse {
            0%, 10%, 20%, 30%, 50%, 60%, 70%, 80%, 90%, 100% {
              transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1%));
            }
            50% {
              transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1.5%));
            }
          }
        `}</style>
        
        <div className="spinner-bar" style={{'--delay': -0.4, '--rotation': 36, '--translation': 150}} />
        <div className="spinner-bar" style={{'--delay': -0.3, '--rotation': 72, '--translation': 150}} />
        <div className="spinner-bar" style={{'--delay': -0.2, '--rotation': 108, '--translation': 150}} />
        <div className="spinner-bar" style={{'--delay': -0.1, '--rotation': 144, '--translation': 150}} />
        <div className="spinner-bar" style={{'--delay': 0, '--rotation': 180, '--translation': 150}} />
        <div className="spinner-bar" style={{'--delay': 0.1, '--rotation': 216, '--translation': 150}} />
        <div className="spinner-bar" style={{'--delay': 0.2, '--rotation': 252, '--translation': 150}} />
        <div className="spinner-bar" style={{'--delay': 0.3, '--rotation': 288, '--translation': 150}} />
        <div className="spinner-bar" style={{'--delay': 0.4, '--rotation': 324, '--translation': 150}} />
        <div className="spinner-bar" style={{'--delay': 0.5, '--rotation': 360, '--translation': 150}} />
      </div>
    </div>
  );
}
