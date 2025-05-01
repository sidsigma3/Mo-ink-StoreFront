import React, { useEffect } from 'react';

const WhatsAppWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="fixed bottom-7 left-5 z-[9999]"
      data-elfsight-app-lazy
    >
      <div className="elfsight-app-ead71a30-40d7-46d6-ab26-04b6c3455e2f"></div>
    </div>
  );
};

export default WhatsAppWidget;
