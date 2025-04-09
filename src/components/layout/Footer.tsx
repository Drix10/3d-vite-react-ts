export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-grid">
                <div>
                    <h3 className="footer-title">React TypeScript Template</h3>
                    <p>A lightweight template for React TypeScript applications.</p>
                </div>
                <div>
                    <h4 className="footer-heading">Links</h4>
                    <ul className="footer-list">
                        <li><a href="#" className="footer-link">Home</a></li>
                        <li><a href="#features" className="footer-link">Features</a></li>
                        <li><a href="#about" className="footer-link">About</a></li>
                        <li><a href="#contact" className="footer-link">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="footer-heading">Contact</h4>
                    <address className="footer-address">
                        <p>Email: hello@example.com</p>
                        <p>Phone: (123) 456-7890</p>
                    </address>
                </div>
            </div>
            <div className="footer-copyright">
                <p>&copy; {new Date().getFullYear()} React TypeScript Template. All rights reserved.</p>
            </div>
        </footer>
    );
} 