import './MostViewed.css';
import BlurText from '../../ui/blur-text';

// Przykładowe dane do kategorii rzadkich przedmiotów
const categories = [
  {
    title: 'Figurki',
    description:
      'Ręcznie wykonane figurki, które przedstawiają postacie z różnych uniwersów. Każda z nich jest unikalnym dziełem sztuki.',
    image: '/item1.png',
    link: '#'
  },
  {
    title: 'Znaczki',
    description:
      'Cenne znaczki pocztowe, które są kolekcjonowane na całym świecie. Każdy z nich ma swoją historię.',
    image: '/item2.png',
    link: '#'
  },
  {
    title: 'Monety',
    description:
      'Stare monety z różnych epok, które mogą mieć wartość historyczną lub numizmatyczną.',
    image: '/item5.png',
    link: '#'
  },
  {
    title: 'Karty Kolekcjonerskie',
    description:
      'Rzadkie karty kolekcjonerskie, które przedstawiają postacie, miejsca lub wydarzenia z popularnych gier i filmów.',
    image: '/item44.jpg',
    link: '#'
  }
];

const MostViewed = () => {
  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };
  return (
    <div className="categories-container" width="100%">
      <div className="heading-container">
        <BlurText
          text="Most Viewed Items"
          delay={50}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          mb={8}
          display="flex"
          flexWrap="nowrap"
        ></BlurText>
      </div>
      {categories.map((category, index) => (
        <div className="category-card" key={index}>
          <img
            src={category.image}
            alt={category.title}
            className="category-image"
          />
          <h3 className="category-title">{category.title}</h3>
          <p className="category-description">{category.description}</p>
          <a href={category.link} className="category-link">
            Zobacz więcej
          </a>
        </div>
      ))}
    </div>
  );
};

export default MostViewed;
