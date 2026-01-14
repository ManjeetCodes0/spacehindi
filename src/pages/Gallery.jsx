import React, { useState } from 'react';
import AdSlot from '../components/common/AdSlot';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showDownloadAd, setShowDownloadAd] = useState(false);

  const wallpapers = [
    {
      id: 1,
      title: "Nebula Dreams",
      thumb: "/images/nebula-thumb.jpg",
      full: "/images/nebula-full.jpg",
      category: "nebula"
    },
    {
      id: 2,
      title: "Galaxy Spiral",
      thumb: "/images/galaxy-thumb.jpg",
      full: "/images/galaxy-full.jpg",
      category: "galaxy"
    },
    {
      id: 3,
      title: "Earth from Space",
      thumb: "/images/earth-thumb.jpg",
      full: "/images/earth-full.jpg",
      category: "planets"
    },
    {
      id: 4,
      title: "Aurora Lights",
      thumb: "/images/aurora-thumb.jpg",
      full: "/images/aurora-full.jpg",
      category: "earth"
    },
    {
      id: 5,
      title: "Black Hole",
      thumb: "/images/blackhole-thumb.jpg",
      full: "/images/blackhole-full.jpg",
      category: "cosmic"
    },
    {
      id: 6,
      title: "Mars Surface",
      thumb: "/images/mars-thumb.jpg",
      full: "/images/mars-full.jpg",
      category: "planets"
    }
  ];

  const handleDownload = (image) => {
    setShowDownloadAd(true);
    setTimeout(() => {
      setShowDownloadAd(false);
      // Trigger download
      const link = document.createElement('a');
      link.href = image.full;
      link.download = `sciencehindi-${image.title.replace(' ', '-').toLowerCase()}.jpg`;
      link.click();
    }, 3000);
  };

  return (
    <div className="gallery-page px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 glow-effect bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          🌌 Space Wallpaper Gallery
        </h1>
        <p className="text-center mb-8 opacity-80">
          HD Space Wallpapers for your mobile & desktop
        </p>

        {/* Ad Slot */}
        <AdSlot type="gallery-top" />

        {/* Gallery Grid */}
        <div className="gallery-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {wallpapers.map((image) => (
            <div
              key={image.id}
              className="gallery-item relative group cursor-pointer overflow-hidden rounded-lg"
              onClick={() => setSelectedImage(image)}
            >
              <div className="aspect-square bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                <span className="text-6xl opacity-20">🌌</span>
              </div>
              <div className="overlay absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-sm font-semibold">{image.title}</p>
                  <p className="text-xs opacity-70">Click to view</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            className="lightbox fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div 
              className="lightbox-content max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="glass-effect p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{selectedImage.title}</h3>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="text-2xl hover:text-red-400"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="aspect-video bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-9xl opacity-20">🌌</span>
                </div>

                {showDownloadAd ? (
                  <div className="download-ad-container">
                    <AdSlot type="download-interstitial" />
                    <p className="text-center mt-4">Preparing download...</p>
                  </div>
                ) : (
                  <div className="download-section flex justify-center space-x-4">
                    <button
                      onClick={() => handleDownload(selectedImage)}
                      className="download-btn bg-gradient-to-r from-green-500 to-blue-500 px-6 py-3 rounded-lg hover:scale-105 transition-transform"
                    >
                      📥 Download HD Wallpaper
                    </button>
                    <button
                      onClick={() => {
                        navigator.share?.({
                          title: selectedImage.title,
                          text: 'Check out this amazing space wallpaper!',
                          url: window.location.href
                        });
                      }}
                      className="share-btn bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-lg hover:scale-105 transition-transform"
                    >
                      📤 Share
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
