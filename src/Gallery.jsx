import { useRef, useState, useEffect } from "react";
import LightGallery from "lightgallery/react";
import Masonry from "react-masonry-css";

import { getDataFromFM, callFileMakerInfoScript } from "./functions";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

export function Gallery() {
  const lightboxRef = useRef(null);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getDataFromFM();
        setImages(data || []);
        setIsLoading(false);
      } catch (err) {
        console.error("Fehler beim Laden der Bilder:", err);
        setError("Fehler beim Laden der Bilder aus FileMaker");
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const onInit = (ref) => {
    if (ref) {
      lightboxRef.current = ref.instance;
    }
  };

  // Event handler for FileMaker-Info-Button
  const onAfterOpen = () => {
    // check if button exists
    const existingButton = document.getElementById("lg-fm-info");
    if (existingButton) {
      return;
    }

    // Define button for tool bar
    const fmInfoBtn = `
      <button type="button" 
              aria-label="FileMaker Info" 
              class="lg-icon lg-fm-info" 
              id="lg-fm-info">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <path d="M12 16v-4M12 8h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    `;

    // Add button to tool bar
    const toolbar = document.querySelector(".lg-toolbar");
    if (toolbar) {
      toolbar.insertAdjacentHTML("beforeend", fmInfoBtn);

      // Event listener for the button
      const fmButton = document.getElementById("lg-fm-info");
      if (fmButton) {
        fmButton.addEventListener("click", () => {
          const currentIndex = lightboxRef.current.index;
          const currentImage = images[currentIndex];

          // Call FileMaker function using Image-ID
          if (currentImage) {
            callFileMakerInfoScript(currentImage.id);
          }
        });
      }
    }
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="gallery-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading Data from FileMaker...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="gallery-container">
        <div className="error-state">
          <p>❌ {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            Try load again
          </button>
        </div>
      </div>
    );
  }

  // Empty State
  if (!images || images.length === 0) {
    return (
      <div className="gallery-container">
        <div className="empty-state">
          <p>No Data found</p>
        </div>
      </div>
    );
  }

  // Gallery State
  return (
    <div className="gallery-container">
      {/* Hidden LightGallery component for lightbox functionality */}
      <LightGallery
        onInit={onInit}
        onAfterOpen={onAfterOpen}
        speed={500}
        download={false}
        plugins={[lgThumbnail, lgZoom]}
        licenseKey="0000-0000-0000-0000"
        dynamic={true}
        dynamicEl={images.map((image) => ({
          src: `data:image/jpeg;base64,${image.fullImage}`,
          thumb: `data:image/jpeg;base64,${image.fullImage}`,
          subHtml: `<h4>${image.title}</h4><p>${image.alt}</p>`,
        }))}
      />

      {/* Masonry layout for thumbnails */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid-column"
      >
        {images.map((image, index) => (
          <img
            key={image.id}
            src={`data:image/jpeg;base64,${image.fullImage}`}
            alt={image.alt}
            title={image.title}
            className="masonry-image"
            onClick={() => lightboxRef.current?.openGallery(index)}
          />
        ))}
      </Masonry>
    </div>
  );
}
