import React, { useContext } from 'react';
import { TrendingUp, Target, Users, Shield, Award, Globe, BarChart3, Zap, Mail, FileText, Phone } from 'lucide-react';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import { AuthContext } from '../Context/authContext';
import { useNavigate } from 'react-router-dom';

export default function AboutUs() {
  const { state } = useContext(AuthContext)
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About <span className="text-blue-800">StockAtlas</span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Your comprehensive atlas to the world's stock markets. We provide professional-grade financial data,
            advanced analytics, and market intelligence to empower investors at every level.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 hover:border-blue-800 transition-colors duration-300">
              <div className="flex items-center mb-6">
                <Target className="h-8 w-8 text-blue-800 mr-3" />
                <h2 className="text-2xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                To democratize access to professional-grade financial data and analytics,
                making sophisticated investment tools available to traders and investors worldwide.
                We believe informed decision-making is the foundation of successful investing.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 hover:border-blue-800 transition-colors duration-300">
              <div className="flex items-center mb-6">
                <Globe className="h-8 w-8 text-blue-800 mr-3" />
                <h2 className="text-2xl font-bold text-white">Our Vision</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                To become the leading global platform for financial market intelligence,
                creating a world where every investor has access to the data, tools, and insights
                needed to navigate complex markets with confidence and clarity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-700 transition-colors duration-300">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Transparency</h3>
              <p className="text-gray-400">
                Complete transparency in our data sources, methodologies, and pricing structure.
                No hidden fees or obscured metrics—just clear, honest information.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-700 transition-colors duration-300">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Innovation</h3>
              <p className="text-gray-400">
                Continuously advancing financial technology to deliver cutting-edge solutions
                that meet the evolving needs of modern investors and traders.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-700 transition-colors duration-300">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Community</h3>
              <p className="text-gray-400">
                Building a supportive ecosystem where investors share knowledge, insights,
                and strategies for collective success in the financial markets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">What We Offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-blue-800 transition-colors duration-300">
              <TrendingUp className="h-10 w-10 text-blue-800 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Real-Time Market Data</h3>
              <p className="text-gray-400 text-sm">
                Live stock prices, market movements, and trading volumes from major global exchanges
                with institutional-grade accuracy and speed.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-blue-800 transition-colors duration-300">
              <BarChart3 className="h-10 w-10 text-blue-800 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Advanced Analytics</h3>
              <p className="text-gray-400 text-sm">
                Sophisticated charting tools, technical indicators, and statistical analysis
                to help you make data-driven investment decisions.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-blue-800 transition-colors duration-300">
              <Award className="h-10 w-10 text-blue-800 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Portfolio Management</h3>
              <p className="text-gray-400 text-sm">
                Comprehensive tools to track, analyze, and optimize your investment portfolio
                performance across multiple asset classes.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-blue-800 transition-colors duration-300">
              <Globe className="h-10 w-10 text-blue-800 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Global Market Coverage</h3>
              <p className="text-gray-400 text-sm">
                Access to international markets including NYSE, NASDAQ, LSE, and other major
                exchanges worldwide with unified data formatting.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-blue-800 transition-colors duration-300">
              <FileText className="h-10 w-10 text-blue-800 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Research & Reports</h3>
              <p className="text-gray-400 text-sm">
                In-depth market analysis, sector reports, and company fundamentals
                to support your investment research process.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-blue-800 transition-colors duration-300">
              <Zap className="h-10 w-10 text-blue-800 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">API Access</h3>
              <p className="text-gray-400 text-sm">
                Developer-friendly APIs for seamless integration of our data and analytics
                into your applications and trading systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Goals */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Our Strategic Goals</h2>
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-800 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Market Accessibility</h3>
                <p className="text-gray-300">
                  Break down traditional barriers by making institutional-quality financial tools
                  accessible to retail investors, democratizing market participation globally.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-800 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Financial Education</h3>
                <p className="text-gray-300">
                  Provide comprehensive educational resources, market insights, and analytical tools
                  to help investors develop their skills and market understanding.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-800 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Technological Innovation</h3>
                <p className="text-gray-300">
                  Continuously evolve our platform with machine learning, AI-powered insights,
                  and predictive analytics to stay ahead of market trends and user needs.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-800 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm font-bold">4</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Global Expansion</h3>
                <p className="text-gray-300">
                  Expand our market coverage and user base internationally, serving investors
                  across different time zones, currencies, and regulatory environments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Built by Financial Technology Experts</h2>
          <p className="text-xl text-gray-300 mb-12">
            StockAtlas is developed by a team of experienced financial professionals,
            software engineers, and data scientists who understand the complexities of modern markets.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Frontend Excellence</h3>
              <p className="text-gray-400 text-sm mb-3">
                Crafting intuitive user experiences for complex financial data visualization and analysis.
              </p>
              <a href="https://www.linkedin.com/in/tejas-geria/" target="_blank" rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 transition-colors text-sm">
                Connect with our Frontend Team
              </a>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Backend Infrastructure</h3>
              <p className="text-gray-400 text-sm mb-3">
                Building scalable, high-performance systems for real-time financial data processing.
              </p>
              <a href="https://www.linkedin.com/in/monish-patel-a594462b8/" target="_blank" rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 transition-colors text-sm">
                Connect with our Backend Team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Navigate the Markets with Confidence?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of investors who rely on StockAtlas for their market intelligence and analysis needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate(state === 'Sign Up' ? '/login' : '/')}
              className="bg-blue-800 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
              Start Your Free Trial
            </button>
            <button className="border border-gray-700 hover:border-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
              View Pricing Plans
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}