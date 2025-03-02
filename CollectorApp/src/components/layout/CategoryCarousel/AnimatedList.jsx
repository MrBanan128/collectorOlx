import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Flex } from "@chakra-ui/react";
import './AnimatedList.css';

const AnimatedItem = ({ children, delay = 0, index, onMouseEnter, onClick }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, triggerOnce: false });
  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay }}
      style={{ marginBottom: '1rem', cursor: 'pointer' }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedList = ({
  items = [
    'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5',
    'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10',
    'Item 11', 'Item 12', 'Item 13', 'Item 14', 'Item 15'
  ],
  onItemSelect,
  showGradients = true,
  enableArrowNavigation = true,
  className = '',
  itemClassName = '',
  displayScrollbar = true,
  initialSelectedIndex = -1,
  subcategory
}) => {
  const listRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [topGradientOpacity, setTopGradientOpacity] = useState(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    if (!listRef.current) return;
    setCanScrollLeft(listRef.current.scrollLeft > 0);
    setCanScrollRight(
      listRef.current.scrollLeft < listRef.current.scrollWidth - listRef.current.clientWidth
    );
  };

  useEffect(() => {
    if (!enableArrowNavigation) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1));
      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          e.preventDefault();
          if (onItemSelect) {
            onItemSelect(items[selectedIndex], selectedIndex);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items, selectedIndex, onItemSelect, enableArrowNavigation]);

  // Scroll the selected item into view if needed
  useEffect(() => {
    if (listRef.current) {
      listRef.current.addEventListener('scroll', handleScroll);
      handleScroll(); // Inicjalizacja
    }
    return () => listRef.current?.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollByAmount = (amount) => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  

  return (
    <div className={`scroll-list-container ${className}`}>

     <Flex>

     {!subcategory && (
          <button 
            className={`arrow left ${canScrollLeft ? '' : 'disabled'}`}
            onClick={() => scrollByAmount(-listRef.current.clientWidth)}
            disabled={!canScrollLeft}
          >
            ❮
          </button>
        )}

        <Flex direction={subcategory ? "column" : "row"}  
      
        // scrollbarWidth={"none"}
         ref={listRef}
        className={`scroll-list ${!displayScrollbar ? 'no-scrollbar' : ''}`} 
       
        onScroll={handleScroll}>

        {items.map((item, index) => (
          <AnimatedItem
            key={index}
            delay={0.1}
            index={index}
            onMouseEnter={() => setSelectedIndex(index)}
            onClick={() => {
              setSelectedIndex(index);
              if (onItemSelect) {
                onItemSelect(item, index);
              }
            }}
          >
            <div className={`item ${selectedIndex === index ? 'selected' : ''} ${itemClassName}`}>
              <div className="item-text">{item}</div>
            </div>
          </AnimatedItem>
        ))}
      </Flex>

      {!subcategory && (
          <button
            className={`arrow right ${canScrollRight ? '' : 'disabled'}`}
            onClick={() => scrollByAmount(listRef.current.clientWidth)}
            disabled={!canScrollRight}
          >
            ❯
          </button>
        )}

      </Flex>

      {showGradients && (
        <>
          <div
            className="top-gradient"
            style={{ opacity: topGradientOpacity }}
          ></div>
          <div
            className="bottom-gradient"
            style={{ opacity: bottomGradientOpacity }}
          ></div>
        </>
      )}
    </div>
  );
};

export default AnimatedList;
