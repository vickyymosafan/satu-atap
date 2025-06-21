import React from 'react';

interface SatuAtapLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const SatuAtapLogo: React.FC<SatuAtapLogoProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7 md:w-8 md:h-8',
    lg: 'w-10 h-10'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background Circle with Blue Gradient */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>
        <circle
          cx="16"
          cy="16"
          r="16"
          fill="url(#logoGradient)"
        />

        {/* Main Building Structure - Modern Kost Design */}
        <g>
          {/* Main Roof - Triangular with modern touch */}
          <path
            d="M7 15L16 7L25 15V16H7V15Z"
            className="fill-primary-foreground"
          />

          {/* Building Body */}
          <rect
            x="8"
            y="15"
            width="16"
            height="11"
            className="fill-primary-foreground"
            rx="0.5"
          />

          {/* Multiple Windows - Representing multiple rooms in kost */}
          <g fill="url(#logoGradient)">
            {/* First floor windows */}
            <rect x="10" y="17" width="2.5" height="2.5" rx="0.3" />
            <rect x="13.75" y="17" width="2.5" height="2.5" rx="0.3" />
            <rect x="17.5" y="17" width="2.5" height="2.5" rx="0.3" />

            {/* Second floor windows */}
            <rect x="10" y="21" width="2.5" height="2.5" rx="0.3" />
            <rect x="17.5" y="21" width="2.5" height="2.5" rx="0.3" />
          </g>

          {/* Main Entrance Door */}
          <rect
            x="13.75"
            y="21"
            width="2.5"
            height="5"
            fill="url(#logoGradient)"
            rx="0.3"
          />

          {/* Door handle */}
          <circle cx="15.8" cy="23.5" r="0.2" className="fill-primary-foreground" />

          {/* Roof details - Modern lines */}
          <path
            d="M8 15.5L24 15.5"
            stroke="currentColor"
            strokeWidth="0.3"
            className="stroke-primary-foreground opacity-70"
          />
        </g>

        {/* Decorative elements representing "Satu Atap" concept */}
        <g className="fill-primary-foreground opacity-60">
          {/* Small decorative dots on roof */}
          <circle cx="12" cy="11" r="0.4" />
          <circle cx="16" cy="9" r="0.4" />
          <circle cx="20" cy="11" r="0.4" />
        </g>

        {/* Text element - subtle "SA" integration */}
        <g className="fill-primary-foreground opacity-40">
          <text
            x="16"
            y="30"
            textAnchor="middle"
            fontSize="3"
            fontWeight="bold"
            className="fill-primary-foreground"
          >
            SA
          </text>
        </g>
      </svg>
    </div>
  );
};

export default SatuAtapLogo;
