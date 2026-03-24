import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import WorkExperience from './components/WorkExperience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';

const App: React.FC = () => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 antialiased selection:bg-blue-500 selection:text-white transition-colors duration-500 ease-in-out overflow-hidden h-screen flex flex-col">
      <div className="relative flex flex-col h-full">
        <Header scrollContainerRef={scrollContainerRef} />
        <div 
          ref={scrollContainerRef}
          id="main-scroll-container"
          className="flex-1 overflow-y-auto overflow-x-hidden relative"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-50 to-blue-100/30 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/30 -z-10 overflow-hidden transition-all duration-500"></div>
          <main className="container mx-auto px-6 md:px-12 pb-8 overflow-x-hidden">
            <Hero scrollContainerRef={scrollContainerRef} />
            <About />
            <Projects />
            <Experience />
            <WorkExperience />
            <Contact />
          </main>
          <Footer />
          <ScrollToTopButton scrollContainerRef={scrollContainerRef} />
        </div>
      </div>
    </div>
  );
};

export default App;