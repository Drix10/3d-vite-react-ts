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
    title = 'React TypeScript Template',
    description = 'A lightweight React TypeScript template'
}: LayoutProps) {
    useEffect(() => {
        document.title = title;

        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description);
        }
    }, [title, description]);

    return (
        <div className="layout">
            <Header title={title} />
            <main className="layout-main">
                {children}
            </main>
            <Footer />
        </div>
    );
}
