import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    product: [
      { label: 'Features', path: '/landing-page' },
      { label: 'Create Meme', path: '/video-input' },
      { label: 'My Dashboard', path: '/user-dashboard' },
      { label: 'Pricing', path: '/landing-page' }
    ],
    resources: [
      { label: 'Documentation', path: '/landing-page' },
      { label: 'Tutorials', path: '/landing-page' },
      { label: 'Blog', path: '/landing-page' },
      { label: 'Support', path: '/landing-page' }
    ],
    company: [
      { label: 'About Us', path: '/landing-page' },
      { label: 'Contact', path: '/landing-page' },
      { label: 'Careers', path: '/landing-page' },
      { label: 'Press Kit', path: '/landing-page' }
    ],
    legal: [
      { label: 'Privacy Policy', path: '/landing-page' },
      { label: 'Terms of Service', path: '/landing-page' },
      { label: 'Cookie Policy', path: '/landing-page' },
      { label: 'DMCA', path: '/landing-page' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', url: 'https://twitter.com' },
    { name: 'Facebook', icon: 'Facebook', url: 'https://facebook.com' },
    { name: 'Instagram', icon: 'Instagram', url: 'https://instagram.com' },
    { name: 'YouTube', icon: 'Youtube', url: 'https://youtube.com' }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 md:gap-12 mb-12">
          <div className="lg:col-span-2">
            <Link to="/landing-page" className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Zap" size={24} color="#FFFFFF" />
              </div>
              <span className="text-xl font-semibold text-foreground">MemeDownloader</span>
            </Link>
            <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-sm">
              Transform YouTube videos into viral memes with powerful editing tools. Create, customize, and download in seconds.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks?.map((social) => (
                <a
                  key={social?.name}
                  href={social?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors duration-200"
                  aria-label={social?.name}
                >
                  <Icon name={social?.icon} size={18} color="var(--color-muted-foreground)" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks?.product?.map((link) => (
                <li key={link?.label}>
                  <Link
                    to={link?.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks?.resources?.map((link) => (
                <li key={link?.label}>
                  <Link
                    to={link?.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks?.company?.map((link) => (
                <li key={link?.label}>
                  <Link
                    to={link?.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks?.legal?.map((link) => (
                <li key={link?.label}>
                  <Link
                    to={link?.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              &copy; {currentYear} MemeDownloader. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="mailto:support@memedownloader.com"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                support@memedownloader.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;