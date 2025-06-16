
import React from 'react';

const VideoSection = () => {
  return (
    <section className="md:hidden bg-gradient-to-b from-business-blue-800 to-navy-900 py-4">
      <div className="px-4 max-w-7xl mx-auto">
        <div className="text-center mb-3">
          <h2 className="font-montserrat text-xl font-bold text-white mb-1">
            Zobacz jak pomagamy naszym klientom
          </h2>
          <p className="text-warm-neutral-300 text-sm">
            Film prezentujący nasze podejście do oddłużania
          </p>
        </div>
        
        <div className="w-full">
          <script src="https://fast.wistia.com/player.js" async></script>
          <script src="https://fast.wistia.com/embed/nlk4gmdg22.js" async type="module"></script>
          <style dangerouslySetInnerHTML={{
            __html: `
              wistia-player[media-id='nlk4gmdg22']:not(:defined) { 
                background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/nlk4gmdg22/swatch'); 
                display: block; 
                filter: blur(5px); 
                padding-top:177.78%; 
              }
            `
          }} />
          <div dangerouslySetInnerHTML={{
            __html: '<wistia-player media-id="nlk4gmdg22" aspect="0.5625"></wistia-player>'
          }} />
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
