import React, { useState } from 'react';
import { Shield, FileText, AlertTriangle, BarChart3, ChevronRight, Lock, Eye, UserCheck } from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useLocation } from 'react-router-dom';

const PoliciesAndSecurity = () => {
    const location = useLocation();
    const { initTab } = location.state || {};
    const [activeTab, setActiveTab] = useState(initTab);

    const TabButton = ({ id, icon: Icon, title, isActive, onClick }) => (
        <button
            onClick={onClick}
            className={`flex items-center space-x-3 w-full p-4 rounded-lg transition-all duration-200 ${isActive
                ? 'bg-blue-800 text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
        >
            <Icon className="h-5 w-5" />
            <span className="font-medium">{title}</span>
            <ChevronRight className={`h-4 w-4 ml-auto transition-transform ${isActive ? 'rotate-90' : ''}`} />
        </button>
    );

    const TermsOfUse = () => (
        <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
                <FileText className="h-8 w-8 text-blue-800" />
                <h1 className="text-3xl font-bold text-white">Terms of Use</h1>
            </div>

            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <p className="text-gray-300 mb-4">
                    <strong>Last Updated:</strong> January 15, 2025
                </p>
                <p className="text-gray-300 leading-relaxed">
                    Welcome to StockAtlas. By accessing or using our services, you agree to be bound by these Terms of Use.
                    Please read them carefully before using our platform.
                </p>
            </div>

            <div className="space-y-6">
                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
                    <p className="text-gray-300 leading-relaxed">
                        By accessing, browsing, or using StockAtlas, you acknowledge that you have read, understood,
                        and agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree to
                        these terms, please do not use our services.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">2. Description of Services</h2>
                    <p className="text-gray-300 leading-relaxed mb-3">
                        StockAtlas provides financial market data, analytics, and research tools including:
                    </p>
                    <ul className="text-gray-300 space-y-2 ml-6">
                        <li>• Real-time and historical stock market data</li>
                        <li>• Financial analysis and charting tools</li>
                        <li>• Portfolio management features</li>
                        <li>• Market research and insights</li>
                        <li>• API access for developers</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">3. User Responsibilities</h2>
                    <p className="text-gray-300 leading-relaxed mb-3">
                        As a user of StockAtlas, you agree to:
                    </p>
                    <ul className="text-gray-300 space-y-2 ml-6">
                        <li>• Provide accurate and complete information when creating an account</li>
                        <li>• Maintain the confidentiality of your account credentials</li>
                        <li>• Use the service only for lawful purposes</li>
                        <li>• Not attempt to gain unauthorized access to our systems</li>
                        <li>• Respect intellectual property rights</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">4. Data Usage and Restrictions</h2>
                    <p className="text-gray-300 leading-relaxed">
                        The financial data provided through StockAtlas is for your personal use only. You may not redistribute,
                        resell, or use this data for commercial purposes without explicit written permission. Market data
                        is provided by third-party sources and may be subject to additional terms and conditions.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">5. Limitation of Liability</h2>
                    <p className="text-gray-300 leading-relaxed">
                        StockAtlas provides information and tools for educational and analytical purposes. We are not
                        responsible for investment decisions made based on our data or analysis. Users should conduct
                        their own research and consult with financial advisors before making investment decisions.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">6. Termination</h2>
                    <p className="text-gray-300 leading-relaxed">
                        We reserve the right to terminate or suspend your account at our discretion, without notice,
                        for conduct that we believe violates these Terms of Use or is harmful to other users or our business.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">7. Changes to Terms</h2>
                    <p className="text-gray-300 leading-relaxed">
                        We may update these Terms of Use from time to time. We will notify users of any material
                        changes by posting the new terms on our website. Your continued use of the service after
                        such changes constitutes acceptance of the new terms.
                    </p>
                </section>
            </div>
        </div>
    );

    const Disclaimer = () => (
        <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
                <AlertTriangle className="h-8 w-8 text-blue-800" />
                <h1 className="text-3xl font-bold text-white">Disclaimer</h1>
            </div>

            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-3">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <span className="text-red-400 font-semibold">Important Notice</span>
                </div>
                <p className="text-gray-300 leading-relaxed">
                    The information provided by StockAtlas is for educational and informational purposes only.
                    It should not be considered as investment advice, financial advice, or a recommendation to buy or sell securities.
                </p>
            </div>

            <div className="space-y-6">
                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">Investment Risk Warning</h2>
                    <p className="text-gray-300 leading-relaxed">
                        All investments carry inherent risks, including the potential loss of principal. Past performance
                        does not guarantee future results. Stock prices can be volatile and may decline significantly.
                        Before making any investment decisions, please consider your financial situation, investment
                        objectives, and risk tolerance.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">No Financial Advice</h2>
                    <p className="text-gray-300 leading-relaxed">
                        StockAtlas and its team are not registered investment advisors, financial planners, or brokers.
                        We do not provide personalized investment advice or recommendations. The tools, data, and analysis
                        provided are for informational purposes only and should not be relied upon as the sole basis for
                        investment decisions.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">Data Accuracy</h2>
                    <p className="text-gray-300 leading-relaxed">
                        While we strive to provide accurate and up-to-date information, we cannot guarantee the accuracy,
                        completeness, or timeliness of the data provided. Market data may be delayed, and technical issues
                        may occasionally affect data quality. Users should verify information independently before making
                        investment decisions.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">Third-Party Data</h2>
                    <p className="text-gray-300 leading-relaxed">
                        Our platform aggregates data from various third-party sources. We are not responsible for the
                        accuracy or reliability of third-party data. Data providers may have their own terms of use
                        and restrictions that apply to the information they provide.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">Professional Consultation</h2>
                    <p className="text-gray-300 leading-relaxed">
                        We strongly recommend consulting with qualified financial advisors, tax professionals, or other
                        experts before making investment decisions. Consider your individual circumstances, including
                        your financial goals, risk tolerance, and time horizon.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">Limitation of Liability</h2>
                    <p className="text-gray-300 leading-relaxed">
                        StockAtlas, its affiliates, and team members shall not be liable for any direct, indirect,
                        incidental, special, or consequential damages arising from the use of our platform or reliance
                        on the information provided. This includes, but is not limited to, financial losses, trading
                        losses, or missed opportunities.
                    </p>
                </section>
            </div>
        </div>
    );

    const PrivacyPolicy = () => (
        <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
                <Shield className="h-8 w-8 text-blue-800" />
                <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
            </div>

            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <p className="text-gray-300 mb-4">
                    <strong>Last Updated:</strong> January 15, 2025
                </p>
                <p className="text-gray-300 leading-relaxed">
                    At StockAtlas, we take your privacy seriously. This Privacy Policy explains how we collect,
                    use, and protect your personal information when you use our services.
                </p>
            </div>

            <div className="space-y-6">
                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-medium text-white mb-2">Personal Information</h3>
                            <p className="text-gray-300 leading-relaxed mb-2">
                                We collect information you provide directly to us, including:
                            </p>
                            <ul className="text-gray-300 space-y-1 ml-6">
                                <li>• Name and email address</li>
                                <li>• Account credentials</li>
                                <li>• Payment information (processed securely by third parties)</li>
                                <li>• Communication preferences</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium text-white mb-2">Usage Information</h3>
                            <p className="text-gray-300 leading-relaxed mb-2">
                                We automatically collect information about how you use our services:
                            </p>
                            <ul className="text-gray-300 space-y-1 ml-6">
                                <li>• Login times and frequency</li>
                                <li>• Features and tools accessed</li>
                                <li>• Search queries and preferences</li>
                                <li>• Device and browser information</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
                    <p className="text-gray-300 leading-relaxed mb-3">
                        We use the information we collect to:
                    </p>
                    <ul className="text-gray-300 space-y-2 ml-6">
                        <li>• Provide and improve our services</li>
                        <li>• Personalize your experience</li>
                        <li>• Process payments and manage accounts</li>
                        <li>• Send important updates and notifications</li>
                        <li>• Analyze usage patterns and optimize performance</li>
                        <li>• Prevent fraud and ensure security</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">3. Information Sharing</h2>
                    <p className="text-gray-300 leading-relaxed mb-3">
                        We do not sell, trade, or rent your personal information to third parties. We may share
                        information only in the following circumstances:
                    </p>
                    <ul className="text-gray-300 space-y-2 ml-6">
                        <li>• With service providers who assist in our operations</li>
                        <li>• When required by law or legal process</li>
                        <li>• To protect our rights or the safety of our users</li>
                        <li>• In connection with a business transaction (merger, acquisition, etc.)</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">4. Data Security</h2>
                    <p className="text-gray-300 leading-relaxed">
                        We implement appropriate technical and organizational measures to protect your personal
                        information against unauthorized access, alteration, disclosure, or destruction. This includes
                        encryption, secure servers, and regular security audits. However, no method of transmission
                        over the internet is 100% secure.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">5. Your Rights and Choices</h2>
                    <p className="text-gray-300 leading-relaxed mb-3">
                        You have the right to:
                    </p>
                    <ul className="text-gray-300 space-y-2 ml-6">
                        <li>• Access and update your personal information</li>
                        <li>• Delete your account and associated data</li>
                        <li>• Opt out of marketing communications</li>
                        <li>• Request a copy of your data</li>
                        <li>• Restrict processing of your information</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">6. Cookies and Tracking</h2>
                    <p className="text-gray-300 leading-relaxed">
                        We use cookies and similar technologies to improve your experience, analyze usage, and provide
                        personalized content. You can manage your cookie preferences through your browser settings.
                        Some features may not function properly if cookies are disabled.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">7. Children's Privacy</h2>
                    <p className="text-gray-300 leading-relaxed">
                        Our services are not intended for individuals under the age of 18. We do not knowingly collect
                        personal information from children. If you believe we have collected information from a child,
                        please contact us immediately.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">8. Changes to This Policy</h2>
                    <p className="text-gray-300 leading-relaxed">
                        We may update this Privacy Policy from time to time. We will notify you of any material changes
                        by posting the new policy on our website and updating the "Last Updated" date. Your continued
                        use of our services after such changes constitutes acceptance of the updated policy.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">9. Contact Information</h2>
                    <p className="text-gray-300 leading-relaxed">
                        If you have questions about this Privacy Policy or our data practices, please contact us at:
                    </p>
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-3">
                        <p className="text-gray-300">Email: privacy@stockatlas.app</p>
                        <p className="text-gray-300">Support: support@stockatlas.app</p>
                    </div>
                </section>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'terms':
                return <TermsOfUse />;
            case 'disclaimer':
                return <Disclaimer />;
            case 'privacy':
                return <PrivacyPolicy />;
            default:
                return <TermsOfUse />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Mock Navbar */}
            <Navbar />

            <div className=" pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-950 border border-gray-700 rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
                                <Lock className="h-5 w-5 mr-2 text-blue-800" />
                                Legal & Security
                            </h2>
                            <nav className="space-y-2">
                                <TabButton
                                    id="terms"
                                    icon={FileText}
                                    title="Terms of Use"
                                    isActive={activeTab === 'terms'}
                                    onClick={() => setActiveTab('terms')}
                                />
                                <TabButton
                                    id="disclaimer"
                                    icon={AlertTriangle}
                                    title="Disclaimer"
                                    isActive={activeTab === 'disclaimer'}
                                    onClick={() => setActiveTab('disclaimer')}
                                />
                                <TabButton
                                    id="privacy"
                                    icon={Shield}
                                    title="Privacy Policy"
                                    isActive={activeTab === 'privacy'}
                                    onClick={() => setActiveTab('privacy')}
                                />
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-gray-950 border border-gray-700 rounded-lg p-8">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mock Footer */}
            <Footer />
        </div>
    );
};

export default PoliciesAndSecurity;