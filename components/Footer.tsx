import React from 'react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-[#0B1120] border-t border-gray-200 dark:border-gray-800/50 py-12">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">
          Fawas Thongkham &copy; {new Date().getFullYear()}
        </p>
        <p className="text-xs font-medium text-gray-400 dark:text-gray-500 flex items-center justify-center gap-1.5 flex-wrap">
          Designed and built with <span className="text-red-500 mx-0.5"></span>
          <img src="/logoicon/google-ai-studio.webp" alt="Google AI Studio" className="inline-block w-4 h-4 object-contain" />
          <span>Google AI Studio</span>
          <span className="text-gray-300 dark:text-gray-600">·</span>
          <img src="/logoicon/React.webp" alt="React" className="inline-block w-4 h-4 object-contain" />
          <span>React</span>
          <span className="text-gray-300 dark:text-gray-600">·</span>
          <img src="/logoicon/Tailwind_CSS.webp" alt="Tailwind CSS" className="inline-block w-4 h-4 object-contain" />
          <span>Tailwind CSS</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;