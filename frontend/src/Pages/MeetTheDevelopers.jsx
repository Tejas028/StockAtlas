import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, MapPin, Calendar, Code, TrendingUp, BarChart3, Activity, Star, Award, Target, ExternalLink, Server, Database } from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const MeetTheDevelopers = () => {
  const location = useLocation();
  const { initTab } = location.state || {};
  const [activeTab, setActiveTab] = useState(initTab);

  const navigate=useNavigate();

  const developers = [
    {
      id: 1,
      name: "Tejas Geria",
      role: "Frontend Developer",
      type: "frontend",
      location: "Ahmedabad, Gujarat",
      experience: "3+ years",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "Passionate frontend developer who enjoys building clean, user-friendly interfaces. I created StockAtlas's frontend to make stock data easily accessible and intuitive for everyone to use.",
      journey: [
        { year: "2021", event: "Started journey as Frontend Developer" },
        { year: "2022", event: "Specialized in React and modern web technologies" },
        { year: "2023", event: "Began building StockAtlas platform" },
        { year: "2024", event: "Launched StockAtlas with seamless data access" }
      ],
      skills: ["React", "JavaScript", "TypeScript", "Tailwind CSS", "Chart.js", "D3.js", "React Router", "Responsive Design"],
      achievements: [
        "Built StockAtlas's complete frontend architecture",
        "Created intuitive interface for stock data visualization",
        "Implemented responsive design for all device sizes",
        "Integrated real-time data display systems",
        "Optimized performance for smooth user experience"
      ],
      interests: ["Web Development", "UI/UX Design", "Data Visualization", "Modern JavaScript"],
      social: {
        github: "tejasgeria",
        linkedin: "tejas-geria",
        twitter: "tejasgeria",
        email: "tejas@stockatlas.app"
      },
      stockFocus: "User Interface & Data Accessibility",
      aim: "Making stock data easy to access and understand",
      linkedinUrl: "https://www.linkedin.com/in/tejas-geria/"
    },
    {
      id: 2,
      name: "Monish Patel",
      role: "Backend Developer",
      type: "backend",
      location: "Gandhinagar, Gujarat",
      experience: "2+ years",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "Skilled backend developer focused on building robust, scalable server-side solutions. I developed StockAtlas's backend infrastructure to ensure reliable data processing and seamless API performance for all users.",
      journey: [
        { year: "2022", event: "Started backend development journey" },
        { year: "2023", event: "Specialized in Node.js and database systems" },
        { year: "2023", event: "Joined StockAtlas backend development" },
        { year: "2024", event: "Deployed scalable backend infrastructure" }
      ],
      skills: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "REST APIs", "GraphQL", "Redis", "Docker", "AWS"],
      achievements: [
        "Architected StockAtlas's complete backend system",
        "Implemented efficient data processing algorithms",
        "Built secure authentication and authorization",
        "Optimized database queries for fast data retrieval",
        "Ensured high availability and scalability"
      ],
      interests: ["Backend Architecture", "Database Design", "API Development", "Cloud Technologies"],
      social: {
        github: "monishpatel",
        linkedin: "monish-patel-a594462b8",
        twitter: "monishpatel",
        email: "monish@stockatlas.app"
      },
      stockFocus: "Data Processing & API Performance",
      aim: "Building robust systems for reliable data access",
      linkedinUrl: "https://www.linkedin.com/in/monish-patel-a594462b8/"
    }
  ];

  const filteredDevelopers = activeTab === 'all'
    ? developers
    : developers.filter(dev => dev.type === activeTab);

  const JourneyTimeline = ({ journey }) => (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-blue-700"></div>
      {journey.map((item, index) => (
        <div key={index} className="relative flex items-center mb-6 last:mb-0">
          <div className="absolute left-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-gray-950 shadow-lg"></div>
          <div className="ml-12">
            <div className="font-semibold text-blue-400">{item.year}</div>
            <div className="text-gray-300">{item.event}</div>
          </div>
        </div>
      ))}
    </div>
  );

  const DeveloperCard = ({ developer }) => (
    <div className="bg-gray-900 rounded-2xl shadow-lg border border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 max-w-6xl mx-auto mb-8">
      <div className="relative">
        <img
          src={developer.image}
          alt={developer.name}
          className="w-full h-80 object-cover"
        />
        <div className="absolute top-4 right-4 bg-blue-800 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
          {developer.type === 'frontend' ? (
            <>
              <Code className="w-4 h-4 mr-2" />
              Frontend Developer
            </>
          ) : (
            <>
              <Server className="w-4 h-4 mr-2" />
              Backend Developer
            </>
          )}
        </div>
        <div className="absolute bottom-4 left-4 bg-gray-950 bg-opacity-90 text-white px-4 py-2 rounded-lg text-sm">
          <Target className="w-4 h-4 inline mr-2" />
          {developer.aim}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
        {/* Developer Info - Left Column */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-white">{developer.name}</h3>
            <div className="flex items-center text-gray-400">
              <Calendar className="w-4 h-4 mr-1" />
              <span className="text-sm">{developer.experience}</span>
            </div>
          </div>

          <p className="text-blue-400 font-semibold mb-3 text-lg">{developer.role}</p>

          <div className="flex items-center text-gray-400 mb-4">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{developer.location}</span>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
            <div className="flex items-center text-blue-400 font-medium text-sm mb-2">
              <Activity className="w-4 h-4 mr-2" />
              StockAtlas Focus
            </div>
            <p className="text-gray-300 text-sm">{developer.stockFocus}</p>
          </div>

          <p className="text-gray-300 mb-6 leading-relaxed text-base">{developer.bio}</p>

          <div className="mb-6">
            <h4 className="font-semibold text-white mb-3 flex items-center text-lg">
              <Code className="w-5 h-5 mr-2" />
              Technical Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {developer.skills.map((skill, index) => (
                <span key={index} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-lg text-sm border border-gray-700 hover:bg-gray-700 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-white mb-3 flex items-center text-lg">
              <Award className="w-5 h-5 mr-2" />
              Key Achievements
            </h4>
            <ul className="text-sm text-gray-300 space-y-2">
              {developer.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-white mb-3 flex items-center text-lg">
              <BarChart3 className="w-5 h-5 mr-2" />
              Interests & Expertise
            </h4>
            <div className="flex flex-wrap gap-2">
              {developer.interests.map((interest, index) => (
                <span key={index} className="bg-gray-800 text-blue-400 px-3 py-1 rounded-lg text-sm border border-gray-700 hover:bg-gray-700 transition-colors">
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <h4 className="font-semibold text-white mb-3">Connect with {developer.name.split(' ')[0]}</h4>
            <div className="flex space-x-4">
              <a
                href={developer.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn Profile
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
              <a
                href={`mailto:${developer.social.email}`}
                className="flex items-center text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Journey Timeline - Right Column */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 h-fit">
            <h4 className="font-semibold text-white mb-4 flex items-center text-lg">
              <Activity className="w-5 h-5 mr-2" />
              Development Journey
            </h4>
            <JourneyTimeline journey={developer.journey} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar/>
      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <TrendingUp className="w-12 h-12 text-blue-500 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Meet the <span className="text-blue-500">StockAtlas</span> Developers
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Get to know the developers behind StockAtlas - we built this platform with one simple goal: making stock data easy to access and understand for everyone.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-800 rounded-full p-2 border border-gray-700">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
                }`}
            >
              All Developers
            </button>
            <button
              onClick={() => setActiveTab('frontend')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'frontend'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
                }`}
            >
              Frontend
            </button>
            <button
              onClick={() => setActiveTab('backend')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'backend'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
                }`}
            >
              Backend
            </button>
          </div>
        </div>

        {/* Developer Cards */}
        <div className="mb-12">
          {filteredDevelopers.map((developer) => (
            <DeveloperCard key={developer.id} developer={developer} />
          ))}
        </div>

        {/* Why We Built StockAtlas */}
        <div className="bg-gray-900 rounded-2xl shadow-lg border border-gray-700 p-8 mb-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center">
            <Target className="w-6 h-6 mr-2" />
            Why We Built StockAtlas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="font-semibold text-blue-400 mb-3">Our Goal</h3>
              <p className="text-gray-300 leading-relaxed">
                We wanted to create a simple, accessible platform where anyone can easily obtain and understand stock data without the complexity of traditional financial tools.
              </p>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="font-semibold text-blue-400 mb-3">The Solution</h3>
              <p className="text-gray-300 leading-relaxed">
                StockAtlas provides a clean, user-friendly interface that makes stock data accessible to everyone - whether you're a beginner or just need quick, reliable information.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Questions About StockAtlas?</h2>
          <p className="text-gray-400 mb-6">
            Have feedback or want to learn more about our platform? We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@stockatlas.app"
              className="bg-blue-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:-translate-y-1 inline-flex items-center justify-center"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Us
            </a>
            <button onClick={()=>{navigate('/'); scrollTo(0,0)}} className="border border-gray-700 text-gray-300 px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all duration-200 inline-flex items-center justify-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Try StockAtlas
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default MeetTheDevelopers;