// app/page.tsx
'use client';

import React, { useState } from 'react';
import { ArrowRight, Globe, Zap, Lock, Users, Phone, Headphones } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

const FEATURES = [
  {
    icon: Phone,
    title: 'Browser-to-Phone Calls',
    description: 'Call any mobile or landline from your browser instantly',
  },
  {
    icon: Zap,
    title: 'Free Daily Credits',
    description: 'Receive free calling credits every 24 hours',
  },
  {
    icon: Globe,
    title: 'Global Coverage',
    description: 'Call anyone, anywhere in 150+ countries worldwide',
  },
  {
    icon: Lock,
    title: 'Secure & Private',
    description: 'End-to-end encryption for all your calls',
  },
  {
    icon: Users,
    title: 'Browser-to-Browser',
    description: 'Make crystal clear calls with other users for free',
  },
  {
    icon: Headphones,
    title: 'HD Audio Quality',
    description: 'Premium audio experience on every call',
  },
];

const TESTIMONIALS = [
  {
    name: 'Sarah Johnson',
    role: 'Freelancer',
    text: 'VoIPCall saved me hundreds on international calls. The free credits are amazing!',
  },
  {
    name: 'Ahmed Hassan',
    role: 'Business Owner',
    text: 'Crystal clear audio quality and super easy to use. No complicated setup needed.',
  },
  {
    name: 'Maria Chen',
    role: 'Remote Worker',
    text: 'The browser-based calling is so convenient. I use it multiple times a day.',
  },
];

export default function HomePage() {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Phone className="w-8 h-8 text-blue-500" />
            <span className="font-bold text-xl gradient-text">VoIPCall</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white smooth-transition">Features</a>
            <a href="#pricing" className="text-gray-300 hover:text-white smooth-transition">Pricing</a>
            <a href="#faq" className="text-gray-300 hover:text-white smooth-transition">FAQ</a>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
              <span className="text-blue-400 text-sm font-medium">✨ Free Calls to 150+ Countries</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold space-y-4">
              <span className="block">Make Free Calls</span>
              <span className="gradient-text">From Your Browser</span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Crystal clear browser-based calling with WebRTC technology. Call mobile numbers, landlines, or other users instantly. No app download required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="group">
                  Start Calling Free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 smooth-transition" />
                </Button>
              </Link>
              <a href="#features">
                <Button size="lg" variant="secondary">
                  Learn More
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16 pt-16 border-t border-gray-800">
              <div>
                <div className="text-3xl font-bold text-blue-400">500K+</div>
                <div className="text-gray-400 text-sm">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">10M+</div>
                <div className="text-gray-400 text-sm">Calls Monthly</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-400">150+</div>
                <div className="text-gray-400 text-sm">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">Powerful Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Everything you need for crystal clear, secure calling</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} hover>
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="font-bold text-lg">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">Loved by Users Worldwide</h2>
            <p className="text-gray-400">Join thousands who save on calling costs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <Card key={index}>
                <div className="space-y-4">
                  <p className="text-gray-300 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <Card glass className="space-y-8 text-center">
            <h2 className="text-4xl font-bold">Ready to Start Calling?</h2>
            <p className="text-gray-300 text-lg">Get 5 free credits instantly and start making calls right now.</p>
            
            <Link href="/register">
              <Button size="lg">
                Create Free Account
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            <p className="text-gray-500 text-sm">No credit card required. Free daily credits for all users.</p>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <p className="font-bold text-white mb-4">VoIPCall</p>
              <p className="text-gray-400 text-sm">Free browser-based calling worldwide</p>
            </div>
            <div>
              <p className="font-semibold text-white mb-4">Product</p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Security</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white mb-4">Company</p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#">About</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white mb-4">Legal</p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Terms</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-500 text-sm text-center">
              © 2024 VoIPCall. All rights reserved. Made with ❤️
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
