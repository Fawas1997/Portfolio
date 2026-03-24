import React from 'react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-[#0B1120] border-t border-gray-200 dark:border-gray-800/50 py-12">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">
          Fawas Thongkham &copy; {new Date().getFullYear()}
        </p>
        <div className="mt-3 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-2 text-xs font-medium text-gray-400 dark:text-gray-500">
          <span>Designed and built with</span>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-2">
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <img src="/logoicon/google-ai-studio.webp" alt="Google AI Studio" className="w-4 h-4 object-contain" />
              <span>Google AI Studio</span>
            </span>
            <span className="hidden md:inline text-gray-300 dark:text-gray-600">·</span>
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <img src="/logoicon/React.webp" alt="React" className="w-4 h-4 object-contain" />
              <span>React</span>
            </span>
            <span className="hidden md:inline text-gray-300 dark:text-gray-600">·</span>
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <img src="/logoicon/Tailwind_CSS.webp" alt="Tailwind CSS" className="w-4 h-4 object-contain" />
              <span>Tailwind CSS</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;