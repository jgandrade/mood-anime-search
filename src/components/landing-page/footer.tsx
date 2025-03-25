"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const socialLinks = [
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-labelledby="twitterTitle"
      >
        <title id="twitterTitle">Twitter</title>
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
  {
    name: "Discord",
    href: "https://discord.com",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-labelledby="discordTitle"
      >
        <title id="discordTitle">Discord</title>
        <circle cx="9" cy="12" r="1" />
        <circle cx="15" cy="12" r="1" />
        <path d="M7.5 7.2c3.4-1 5.6-1 8.3-.1" />
        <path d="M7.5 16.8c3.4 1 5.6 1 8.3.1" />
        <path d="M15.5 17c.8-1.1 1.6-3.4 1.5-5 0-1.6-.8-3.9-1.5-5" />
        <path d="M8.5 17c-.8-1.1-1.6-3.4-1.5-5 0-1.6.8-3.9 1.5-5" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-labelledby="instagramTitle"
      >
        <title id="instagramTitle">Instagram</title>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer className="bg-background py-16 px-4 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="md:col-span-2">
            <div className="text-2xl font-bold text-primary flex items-center mb-4">
              AniVibe
            </div>
            <p className="text-foreground/80 mb-4 max-w-md">
              Your personalized anime companion that helps you find the perfect
              show based on your mood.
            </p>
            <p className="text-foreground/60 text-sm">
              © {new Date().getFullYear()} AniVibe. All rights reserved.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-foreground/80 hover:text-primary"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-foreground/80 hover:text-primary"
                >
                  Anime API
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-foreground/80 hover:text-primary"
                >
                  Developer Docs
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-foreground/80 hover:text-primary"
                >
                  Partnerships
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-foreground/80 hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-foreground/80 hover:text-primary"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-foreground/80 hover:text-primary"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-foreground/80 hover:text-primary"
                >
                  DMCA Policy
                </Link>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-foreground/60 text-sm mb-4 sm:mb-0">
            Made with 💚 for anime fans everywhere
          </p>

          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
