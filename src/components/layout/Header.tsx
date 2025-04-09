interface HeaderProps {
    title?: string;
}

export default function Header({ title = '3D Landing Page' }: HeaderProps) {
    return (
        <header className="w-full py-4 px-6 flex justify-between items-center bg-transparent absolute top-0 z-10">
            <div className="font-bold text-2xl">{title}</div>
            <nav className="flex gap-6">
                <a href="#" className="hover:text-blue-500 transition-colors">Home</a>
                <a href="#features" className="hover:text-blue-500 transition-colors">Features</a>
                <a href="#about" className="hover:text-blue-500 transition-colors">About</a>
                <a href="#contact" className="hover:text-blue-500 transition-colors">Contact</a>
            </nav>
        </header>
    );
} 