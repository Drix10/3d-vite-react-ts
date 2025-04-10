import { useState, useEffect } from 'react';

interface HeaderProps {
    title?: string;
}

export default function Header({ title = 'React TypeScript Template' }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        const handleScroll = () => {
            const sections = document.querySelectorAll('section[id], div[id]');
            let currentSection = '';

            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                if (sectionTop <= 100) {
                    currentSection = section.id;
                }
            });

            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', checkIfMobile);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const navLinks = [
        { label: 'Home', href: '#' },
        { label: 'Features', href: '#features' },
        { label: 'About', href: '#about' },
        { label: 'Models', href: '#models' },
        { label: 'Three.js', href: '#threejs' },
        { label: 'Spline', href: '#spline' },
        { label: 'Contact', href: '#contact' }
    ];

    return (
        <header className="header">
            <div className="header-title">{title}</div>

            {isMobile ? (
                <>
                    <button
                        className="hamburger-menu"
                        onClick={toggleMenu}
                        aria-label="Toggle navigation menu"
                    >
                        <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
                        <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
                        <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
                    </button>

                    <nav className={`mobile-nav ${isMenuOpen ? 'mobile-nav-open' : ''}`}>
                        {navLinks.map(link => (
                            <a
                                key={link.href}
                                href={link.href}
                                className={`header-link ${activeSection === link.href.replace('#', '') ? 'active' : ''}`}
                                onClick={closeMenu}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </>
            ) : (
                <nav className="header-nav">
                    {navLinks.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={`header-link ${activeSection === link.href.replace('#', '') ? 'active' : ''}`}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
            )}
        </header>
    );
} 