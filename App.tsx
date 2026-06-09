import React from 'react';
import Header from './components/Header';
import CustomScrollbar from './components/CustomScrollbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import WorkExperience from './components/WorkExperience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import AIChatbot from './components/AIChatbot';

const App: React.FC = () => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-200 antialiased selection:bg-blue-500 selection:text-white transition-colors duration-500 ease-in-out overflow-hidden h-screen flex flex-col">
      <div className="relative flex flex-col h-full">
        <Header scrollContainerRef={scrollContainerRef} />
        <div
          ref={scrollContainerRef}
          id="main-scroll-container"
          className="flex-1 overflow-y-auto overflow-x-hidden relative w-full"
        >
          {/* Removed global gradient so Hero background stands on its own */}
          <Hero scrollContainerRef={scrollContainerRef} />
          <div className="w-full bg-white dark:bg-gray-900 relative z-10">
            <About />
            <main className="container mx-auto px-6 md:px-12 pb-8 overflow-x-hidden w-full">
              <Projects />
              <Experience />
              <WorkExperience />
            </main>
            <Contact />
            <Footer />
          </div>
          <ScrollToTopButton scrollContainerRef={scrollContainerRef} />
        </div>
        <CustomScrollbar scrollContainerRef={scrollContainerRef} hideOnTop={true} />
      </div>
      {/* <AIChatbot /> */}
    </div>
  );
};

export default App;