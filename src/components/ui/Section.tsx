import React from 'react';

interface SectionProps {
    children: React.ReactNode;
    id?: string;
    className?: string;
    fullHeight?: boolean;
    bgColor?: string;
}

export default function Section({
    children,
    id,
    className = '',
    fullHeight = false,
    bgColor = 'bg-white'
}: SectionProps) {
    return (
        <section
            id={id}
            className={`
        ${bgColor} 
        ${fullHeight ? 'min-h-screen' : ''}
        py-16 
        px-4 
        md:px-6 
        lg:px-8 
        ${className}
      `}
        >
            <div className="container mx-auto">
                {children}
            </div>
        </section>
    );
} 