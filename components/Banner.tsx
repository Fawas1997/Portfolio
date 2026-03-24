import React from 'react';

const Banner: React.FC = () => {

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-blue-600 dark:bg-blue-700 rounded-2xl my-24 transition-colors duration-500 ease-in-out">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          สนใจร่วมงานกันไหม?
        </h2>
        <p className="text-lg text-blue-200 max-w-2xl mx-auto mb-8">
          ผมพร้อมที่จะนำทักษะและความคิดสร้างสรรค์ของผมมาช่วยให้โปรเจกต์ของคุณประสบความสำเร็จ
        </p>
        <button
          onClick={scrollToContact}
          className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
        >
          ติดต่อฉัน
        </button>
      </div>
    </section>
  );
};

export default Banner;