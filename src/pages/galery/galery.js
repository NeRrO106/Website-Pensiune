import React from 'react';
import '../galery/galery.scss';
import camera1 from '../../img/Deluxe.jpg';
import camera2 from '../../img/family.jpg';
import camera3 from '../../img/dubla.jpg';
import camera4 from '../../img/single.jpg';

const Galery = () => {
  return (
    <section className="gallery-container main">
      <h1>Galerie Pensiune</h1>
      <div className="gallery">
        {[
          { src: camera1, alt: 'Camera Dubla Deluxe' },
          { src: camera2, alt: 'Camera Family' },
          { src: camera3, alt: 'Camera Dubla' },
          { src: camera4, alt: 'Camera Single' },
          { src: 'exterior.jpg', alt: 'Exterior Pensiune' },
        ].map((item, index) => (
          <div className="gallery-item" key={index}>
            <img src={item.src} alt={item.alt} />
            <div className="overlay">
              <p>{item.alt}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Galery;
