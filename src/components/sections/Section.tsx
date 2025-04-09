import React from 'react';

interface SectionProps {
    children: React.ReactNode;
    id?: string;
    title?: string;
    className?: string;
}

export default function Section({
    children,
    id,
    title,
    className = '',
}: SectionProps) {
    return (
        <section id={id} className={`section ${className}`}>
            <div className="section-container">
                {title && <h2>{title}</h2>}
                {children}
            </div>
        </section>
    );
} 