import React from 'react';
import '../galery/galery.scss';
import camera1 from '../../img/Deluxe.jpg';
import camera2 from '../../img/family.jpg';
import camera3 from '../../img/dubla.jpg';
import camera4 from '../../img/single.jpg';
import ext1 from '../../img/ext1.jpeg';
import ext2 from '../../img/ext2.jpeg';
import ext3 from '../../img/ext3.jpg';
import ext4 from '../../img/ext4.JPEG';

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
          { src: ext1, alt: 'Exterior Pensiune' },
          { src: ext2, alt: 'Exterior Pensiune' },
          { src: ext3, alt: 'Exterior Pensiune' },
          { src: ext4, alt: 'Exterior Pensiune' },
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
