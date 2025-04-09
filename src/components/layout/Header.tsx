interface HeaderProps {
    title?: string;
}

export default function Header({ title = 'React TypeScript Template' }: HeaderProps) {
    return (
        <header className="header">
            <div className="header-title">{title}</div>
            <nav className="header-nav">
                <a href="#" className="header-link">Home</a>
                <a href="#features" className="header-link">Features</a>
                <a href="#about" className="header-link">About</a>
                <a href="#contact" className="header-link">Contact</a>
            </nav>
        </header>
    );
} 