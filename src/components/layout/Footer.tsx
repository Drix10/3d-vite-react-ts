export default function Footer() {
    return (
        <footer className="w-full py-6 px-6 mt-16 bg-gray-900 text-white">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="font-bold text-xl mb-4">3D Landing Page</h3>
                    <p className="text-gray-300">Creating beautiful 3D experiences for the web.</p>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Links</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
                        <li><a href="#features" className="text-gray-300 hover:text-white">Features</a></li>
                        <li><a href="#about" className="text-gray-300 hover:text-white">About</a></li>
                        <li><a href="#contact" className="text-gray-300 hover:text-white">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Contact</h4>
                    <address className="not-italic text-gray-300">
                        <p>Email: hello@3dlanding.com</p>
                        <p>Phone: (123) 456-7890</p>
                    </address>
                </div>
            </div>
            <div className="mt-8 pt-4 border-t border-gray-800 text-center text-gray-400">
                <p>&copy; {new Date().getFullYear()} 3D Landing Page. All rights reserved.</p>
            </div>
        </footer>
    );
} 