// components/Navbar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Menu, X } from 'lucide-react';
import { Button } from './Button';

interface NavbarProps {
  isAuthenticated?: boolean;
  userName?: string;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, userName, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Phone className="w-8 h-8 text-blue-500" />
          <span className="font-bold text-xl gradient-text">VoIPCall</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-300 hover:text-white smooth-transition">
            Features
          </a>
          <a href="#pricing" className="text-gray-300 hover:text-white smooth-transition">
            Pricing
          </a>
          <a href="#faq" className="text-gray-300 hover:text-white smooth-transition">
            FAQ
          </a>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {isAuthenticated ? (
            <>
              <span className="text-gray-300 text-sm">
                {userName}
              </span>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass border-b">
          <div className="px-4 py-4 space-y-3">
            <a href="#features" className="block text-gray-300 hover:text-white">
              Features
            </a>
            <a href="#pricing" className="block text-gray-300 hover:text-white">
              Pricing
            </a>
            <a href="#faq" className="block text-gray-300 hover:text-white">
              FAQ
            </a>
            <div className="pt-3 border-t border-gray-700 space-y-2">
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" className="block">
                    <Button className="w-full" variant="secondary">
                      Dashboard
                    </Button>
                  </Link>
                  <Button className="w-full" variant="ghost" onClick={onLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block">
                    <Button className="w-full" variant="secondary">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register" className="block">
                    <Button className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
