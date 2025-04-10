import { useRef, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

interface MinimalLayoutProps {
    children: React.ReactNode;
}

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Experience', path: '#experience' },
    { name: 'About', path: '#about' },
    { name: 'Models', path: '/models' },
    { name: 'Contact', path: '#contact' }
];

const NavLink = ({
    item,
    style,
    onClick,
    hoverEffect = false
}: {
    item: { name: string; path: string },
    style: React.CSSProperties,
    onClick?: () => void,
    hoverEffect?: boolean
}) => {
    const location = useLocation();
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const hoverStyles = hoverEffect && isHovered ? { color: '#6366f1' } : {};
    const combinedStyles = { ...style, ...hoverStyles };

    if (item.path.startsWith('/')) {
        return (
            <Link
                to={item.path}
                style={combinedStyles}
                onClick={onClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {item.name}
            </Link>
        );
    } else if (item.path.startsWith('#')) {
        const isHomePage = location.pathname === '/';
        const fullPath = isHomePage ? item.path : `/${item.path}`;

        return (
            <Link
                to={fullPath}
                style={combinedStyles}
                onClick={onClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {item.name}
            </Link>
        );
    } else {
        return (
            <a
                href={item.path}
                style={combinedStyles}
                onClick={onClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {item.name}
            </a>
        );
    }
};

export default function MinimalLayout({ children }: MinimalLayoutProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const location = useLocation();

    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                toggleRef.current &&
                !toggleRef.current.contains(event.target as Node)
            ) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const desktopLinkStyle = {
        color: 'white',
        textDecoration: 'none',
        position: 'relative' as const,
        padding: '0.5rem 0',
        fontSize: '1rem',
        fontWeight: 'medium' as const
    };

    const mobileLinkStyle = {
        color: 'white',
        textDecoration: 'none',
        padding: '1rem 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        fontSize: '1.25rem',
        fontWeight: 'medium' as const,
        display: 'block' as const
    };

    return (
        <div className="minimal-layout">
            <header
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    padding: '1rem 2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 100,
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(17, 24, 39, 0.7)'
                }}
            >
                <div
                    style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'white'
                    }}
                >
                    <Link
                        to="/"
                        style={{
                            textDecoration: 'none',
                            color: 'white',
                            background: 'linear-gradient(to right, #8b5cf6, #6366f1)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        3D Experience
                    </Link>
                </div>

                <nav
                    style={{
                        display: 'flex',
                        gap: '2rem'
                    }}
                >
                    <div className="desktop-nav" style={{ display: 'flex', gap: '2rem' }}>
                        {navItems.map((item) => (
                            <NavLink
                                key={item.name}
                                item={item}
                                style={desktopLinkStyle}
                                hoverEffect={true}
                            />
                        ))}
                    </div>

                    <button
                        ref={toggleRef}
                        onClick={() => setMenuOpen(!menuOpen)}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            width: '2rem',
                            height: '2rem',
                            padding: '0.25rem',
                            zIndex: 120
                        }}
                        aria-label="Toggle menu"
                    >
                        <span
                            style={{
                                width: '100%',
                                height: '2px',
                                backgroundColor: 'white',
                                transition: 'all 0.3s ease',
                                transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
                            }}
                        />
                        <span
                            style={{
                                width: '100%',
                                height: '2px',
                                backgroundColor: 'white',
                                transition: 'all 0.3s ease',
                                opacity: menuOpen ? 0 : 1
                            }}
                        />
                        <span
                            style={{
                                width: '100%',
                                height: '2px',
                                backgroundColor: 'white',
                                transition: 'all 0.3s ease',
                                transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'
                            }}
                        />
                    </button>
                </nav>
            </header>

            <div
                ref={menuRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    width: '250px',
                    height: '100vh',
                    backgroundColor: '#1f2937',
                    transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'transform 0.3s ease',
                    zIndex: 110,
                    paddingTop: '5rem',
                    boxShadow: menuOpen ? '-5px 0 25px rgba(0, 0, 0, 0.3)' : 'none'
                }}
            >
                <nav
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '2rem'
                    }}
                >
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            item={item}
                            style={mobileLinkStyle}
                            onClick={() => setMenuOpen(false)}
                        />
                    ))}
                </nav>
            </div>

            <main>{children}</main>

            <footer
                style={{
                    padding: '2rem',
                    backgroundColor: '#111827',
                    color: 'white',
                    textAlign: 'center'
                }}
            >
                <p>© {new Date().getFullYear()} 3D Experience Template. All rights reserved.</p>
            </footer>
        </div>
    );
} 