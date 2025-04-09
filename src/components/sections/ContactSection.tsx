import Section from '../ui/Section';
import Button from '../ui/Button';
import useScrollAnimation from '../../hooks/useScrollAnimation';

export default function ContactSection() {
    const [formRef, isFormVisible] = useScrollAnimation<HTMLFormElement>({
        threshold: 0.2,
    });

    return (
        <Section id="contact" bgColor="bg-white">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
                    <p className="text-xl text-gray-600">
                        Have questions about our 3D web experiences? Send us a message!
                    </p>
                </div>

                <form
                    ref={formRef}
                    className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-700 ${isFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                    onSubmit={(e) => e.preventDefault()}
                >
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Your name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="your.email@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                Phone (optional)
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="(123) 456-7890"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={6}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Your message..."
                            ></textarea>
                        </div>
                        <div className="pt-4">
                            <Button type="submit" size="lg" className="w-full">
                                Send Message
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </Section>
    );
}