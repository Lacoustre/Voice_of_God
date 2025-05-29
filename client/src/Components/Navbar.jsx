import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import CarouselComponent from './CarouselComponent';

const navLinks = [
  { name: 'HOME', to: '#home' },
  { name: 'LEADERSHIP', to: '#leadership' },
  { name: 'SERVICES', to: '#services' },
  { name: 'EVENTS', to: '#events' },
  { name: 'DONATE', to: '#donation' },
  { name: 'CONTACT', to: '#contact' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.to.substring(1));
      
      const current = sections.reduce((current, section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            return section;
          }
        }
        return current;
      }, 'home');
      
      setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 text-white shadow-md scroll-smooth">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo and Branding */}
          <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
            <img 
              src={logo} 
              alt="Voice of God Logo" 
              className="w-10 h-10 rounded-full object-cover transition-transform duration-300 transform group-hover:scale-110" 
            />
            <span className="text-xl font-bold tracking-wide transition-transform duration-300 transform group-hover:scale-110">
              VOICE OF GOD MINISTRIES
            </span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.to.substring(1);
              return (
                <motion.li
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="font-bold cursor-pointer transition-all duration-300 ease-in-out"
                  style={{
                    color: isActive ? '#FBBF24' : 'white',
                    borderBottom: isActive ? '2px solid #FBBF24' : '2px solid transparent'
                  }}
                >
                  <a href={link.to}>
                    {link.name}
                  </a>
                </motion.li>
              );
            })}
          </ul>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none"
              aria-label="Toggle menu"
            >
              <motion.div
                className="w-6 h-5 flex flex-col justify-between"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className={`h-0.5 w-full bg-white block rounded-sm transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
                ></motion.span>
                <motion.span
                  className={`h-0.5 w-full bg-white block rounded-sm transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                ></motion.span>
                <motion.span
                  className={`h-0.5 w-full bg-white block rounded-sm transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
                ></motion.span>
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed top-16 right-4 w-48 text-white rounded-lg border border-blue-200 shadow-lg"
            >
              <ul className="py-4 px-4 space-y-3">
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.to.substring(1);
                  return (
                    <motion.li
                      key={index}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="font-bold transition-all duration-300 ease-in-out"
                      style={{
                        color: isActive ? '#FBBF24' : 'white'
                      }}
                    >
                      <a
                        href={link.to}
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-2 border-b border-gray-200 transition-all duration-300 ease-in-out"
                        style={{
                          fontWeight: isActive ? '800' : '700'
                        }}
                      >
                        {link.name}
                        <span 
                          className="ml-2 transition-all duration-300 ease-in-out" 
                          style={{ 
                            opacity: isActive ? 1 : 0,
                            transform: isActive ? 'scale(1)' : 'scale(0)'
                          }}
                        >
                          •
                        </span>
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <div id="home" className="pt-16">
        <CarouselComponent />
      </div>
    </div>
  );
}
