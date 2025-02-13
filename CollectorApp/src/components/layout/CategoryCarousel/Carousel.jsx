import EmblaCarousel from './EmblaCarousel';
import Header from './Header';

import './base.css';
import './sandbox.css';
import './embla.css';

const slides = [
  { id: 1, imageUrl: '/item1.png', title: 'Figurka' },
  { id: 2, imageUrl: '/item2.png', title: 'Znaczek' },
  { id: 3, imageUrl: '/item5.png', title: 'Moneta' },
  { id: 4, imageUrl: '/item44.jpg', title: 'Karta' }
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
