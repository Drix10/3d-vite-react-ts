import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { ComponentBaseProps } from '../../types';

interface FooterProps extends ComponentBaseProps { }

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        product: [
            { name: 'Features', href: '/features' },
            { name: 'Showcase', href: '/showcase' },
            { name: 'Pricing', href: '/pricing' },
            { name: 'Documentation', href: '/docs' },
        ],
        company: [
            { name: 'About', href: '/about' },
            { name: 'Blog', href: '/blog' },
            { name: 'Careers', href: '/careers' },
            { name: 'Contact', href: '/contact' },
        ],
        support: [
            { name: 'Help Center', href: '/help' },
            { name: 'Community', href: '/community' },
            { name: 'Status', href: '/status' },
            { name: 'Updates', href: '/updates' },
        ],
        legal: [
            { name: 'Privacy', href: '/privacy' },
            { name: 'Terms', href: '/terms' },
            { name: 'License', href: '/license' },
            { name: 'Cookies', href: '/cookies' },
        ],
    };

    const socialLinks = [
        { name: 'GitHub', href: '#', icon: Github },
        { name: 'Twitter', href: '#', icon: Twitter },
        { name: 'LinkedIn', href: '#', icon: Linkedin },
        { name: 'Email', href: 'mailto:hello@example.com', icon: Mail },
    ];

    return (
        <footer className={`bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 ${className}`}>
            <div className="container mx-auto px-4 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">3D</span>
                            </div>
                            <span>Landing</span>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                            Create stunning 3D landing pages with our modern React template.
                            Built with Three.js, TypeScript, and Tailwind CSS.
                        </p>

                        {/* Social Links */}
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                                        aria-label={social.name}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Product
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Support
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Legal
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            © {currentYear} 3D Landing. All rights reserved.
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-4 md:mt-0">
                            Built with ❤️ using React, Three.js & TypeScript
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
export { Footer }; 