import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
}

export default function Layout({
    children,
    title = '3D Landing Page',
    description = 'A modern 3D landing page template built with React, Three.js, and TailwindCSS'
}: LayoutProps) {
    useEffect(() => {
        document.title = title;

        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description);
        }
    }, [title, description]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header title={title} />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}
