import React from 'react';
import { SiTypescript, SiHtml5, SiCss3 } from 'react-icons/si';

const tools = [
  { name: 'Google AI Studio', icon: <img src="/logoicon/google-ai-studio.webp" alt="Google AI Studio" className="w-4 h-4 object-contain" /> },
  { name: 'Antigravity', icon: <img src="/logoicon/antigravity.webp" alt="Antigravity" className="w-4 h-4 object-contain" /> },
  { name: 'React', icon: <img src="/logoicon/React.webp" alt="React" className="w-4 h-4 object-contain" /> },
  { name: 'Tailwind CSS', icon: <img src="/logoicon/Tailwind_CSS.webp" alt="Tailwind CSS" className="w-4 h-4 object-contain" /> },
  { name: 'TypeScript', icon: <span className="text-[#3178C6]"><SiTypescript size={16} /></span> },
  { name: 'HTML', icon: <span className="text-orange-600"><SiHtml5 size={16} /></span> },
  { name: 'CSS', icon: <span className="text-blue-500"><SiCss3 size={16} /></span> },
  { name: 'Vite', icon: <img src="/logoicon/Vite.webp" alt="Vite" className="w-4 h-4 object-contain" /> }
];

const Footer: React.FC = () => {
  return (
    <footer className="mx-4 md:mx-0 rounded-t-3xl md:rounded-none overflow-hidden bg-gray-50 dark:bg-[#0B1120] border-t border-l border-r md:border-x-0 border-gray-200 dark:border-gray-800/50 pt-2 pb-20 md:pt-6 md:pb-12 shadow-[0_-15px_40px_-5px_rgba(0,0,0,0.05)] md:shadow-none">
      <div className="container mx-auto px-4 md:px-6 text-center w-full overflow-hidden">
        <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-1">
          Fawas Thongkham &copy; {new Date().getFullYear()}
        </p>
        <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-4">
          Designed and built with
        </p>
        
        <div className="relative flex overflow-hidden w-full max-w-4xl mx-auto mask-image-gradient">
          <style dangerouslySetInnerHTML={{
            __html: `
            .mask-image-gradient {
              -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
              mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
            }
          `}} />
          <div className="flex w-max animate-marquee flex-nowrap hover:[animation-play-state:paused] will-change-transform">
            <div className="flex shrink-0 w-max">
              {tools.map((tool, index) => (
                <div key={`set1-${index}`} className="flex items-center justify-center gap-2 px-3 md:px-4 shrink-0 text-xs font-medium text-gray-500 dark:text-gray-400">
                  {tool.icon}
                  <span>{tool.name}</span>
                  <span className="ml-3 md:ml-4 text-gray-300 dark:text-gray-600">·</span>
                </div>
              ))}
            </div>
            <div className="flex shrink-0 w-max" aria-hidden="true">
              {tools.map((tool, index) => (
                <div key={`set2-${index}`} className="flex items-center justify-center gap-2 px-3 md:px-4 shrink-0 text-xs font-medium text-gray-500 dark:text-gray-400">
                  {tool.icon}
                  <span>{tool.name}</span>
                  <span className="ml-3 md:ml-4 text-gray-300 dark:text-gray-600">·</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;