import { useState } from 'react';
import { PrevButton, NextButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';
import { SelectedSnapDisplay, useSelectedSnapDisplay } from './EmblaCarouselSelectedSnapDisplay';
import useEmblaCarousel from 'embla-carousel-react';
import CategorySelector from './CategorySelector';

const EmblaCarousel = ({ slides = [], options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isExpanded, setIsExpanded] = useState(false); // Dodajemy stan do rozwijania/zwijania

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsExpanded((prev) => (prev === category ? null : category)); // Jeśli ten sam element, zamykamy, w przeciwnym razie otwieramy nowy
  };

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi || null);

  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi || null);
 
  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.length > 0 ? (
            slides.map((slide, index) => (
              <div
                className="embla__slide"
                key={index}
                style={{
                  minHeight: '200px',
                  width: '100%',
                  margin: '20px',
                  boxShadow: '4px 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div
                  className="embla__slide__content"
                  onClick={() => handleCategoryClick(slide.title)}
                >
                  <h2 className="embla__slide__title">{slide.title}</h2>
                  <img
                    className="embla__slide__image"
                    src={slide.imageUrl}
                    alt={slide.title}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="embla__empty">Brak dostępnych slajdów</p>
          )}
        </div>
      </div>

      {/* Komponent wyboru kategorii */}
      {isExpanded && <CategorySelector selectedCategory={selectedCategory} />}

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <SelectedSnapDisplay
          selectedSnap={selectedSnap}
          snapCount={snapCount}
        />
      </div>
    </section>
  );
};

export default EmblaCarousel;
