"use client";

import { Camera } from 'lucide-react';
import Link from 'next/link';

const footerLinks = {
  product: [
    { name: 'How It Works', href: '#' },
    { name: 'For Photographers', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'Protection Plans', href: '#' }
  ],
  support: [
    { name: 'Help Center', href: '#' },
    { name: 'Contact Us', href: '#' },
    { name: 'File a Claim', href: '#' },
    { name: 'Emergency Support', href: '#' }
  ],
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Blog', href: '#' }
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Protection Terms', href: '#' }
  ]
};

const trustSignals = [
  'PCI Compliant Payments',
  'Stripe Secure Processing',
  'SSL Encrypted',
  'GDPR Compliant'
];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Camera className="w-8 h-8 text-[#9FE870]" />
                <span className="text-2xl font-bold">VowGuard</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Protecting your wedding photography investment with 100% payment security.
              </p>
            </div>
            
            {/* Links Columns */}
            <div className="lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Product</h3>
                <ul className="space-y-3">
                  {footerLinks.product.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.name === 'For Photographers' ? '/vendor-registration' : link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Support</h3>
                <ul className="space-y-3">
                  {footerLinks.support.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Contact Column */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-3 text-gray-400">
                <p>1-800-VOWGUARD</p>
                <p>support@vowguard.com</p>
                <p>24/7 Emergency Line:<br />1-800-EMERGENCY</p>
              </div>
            </div>
          </div>
          
          {/* Trust Signals */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-gray-400">
                {trustSignals.map((signal) => (
                  <span key={signal} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#9FE870] rounded-full"></div>
                    {signal}
                  </span>
                ))}
              </div>
              
              <p className="text-gray-400 text-sm">
                © 2025 VowGuard. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}