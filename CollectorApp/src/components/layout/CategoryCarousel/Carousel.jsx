import EmblaCarousel from './EmblaCarousel';
import Header from './Header';
import Figurka from '../../../assets/ikonF.png';
import Znaczek from '../../../assets/ikonZ.png';
import Moneta from '../../../assets/ikonM.png';
import Karta from '../../../assets/ikonK.png';
import Inne from '../../../assets/ikonI.webp';

import './base.css';
import './sandbox.css';
import './embla.css';

const slides = [
  { id: 1, imageUrl: Figurka, title: 'Figurka' },
  { id: 2, imageUrl: Znaczek, title: 'Znaczek' },
  { id: 3, imageUrl: Moneta, title: 'Moneta' },
  { id: 4, imageUrl: Karta, title: 'Karta' },
  { id: 5, imageUrl: Inne, title: 'Inne' }
];
// Loop: true;
const OPTIONS = { dragFree: true };

const Carousel = () => {
  return (
    <div className="carousel">
      <Header />
      <EmblaCarousel
        slides={slides}
        options={OPTIONS}
        backgroundImage={slides.imageUrl}
      />
    </div>
  );
};

export default Carousel;
