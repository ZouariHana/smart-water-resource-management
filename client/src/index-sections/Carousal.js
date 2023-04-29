import React from "react";
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

// reactstrap components
import {
  Container,
  Row,
  Col,
  Carousel,
  CarouselItem,
  CarouselIndicators,
  Button
} from "reactstrap";

// core components
const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px; /* set the height of the container to your desired value */
  width : 600 px;
`;

const items = [
  {
    src: require("assets/img/Barage_sidi_salem.jpg"),
    altText: "Barrage de Sejnane,nord-est de Sejnane",
    caption: "Barrage  Sidi Salem"
  },
  {
    src: require("assets/img/Barrage_Beni_Mtir_36.jpg"),
    title: "Barrage de Sejnane",
    caption: "Barrage  Beni Mtir",
    description: "This is the Sejnane Dam located in the northeast of Sejnane."
  },
 
  {
    src: require("assets/img/Barrage_Sidi_Barrak.jpg"),
    altText: "Barrage de Sidi El Barrak",
    caption: "Barrage Sidi El Barrak"
  },
 
  {
    src: require("assets/img/mellegue.jpg"),
    
    caption: "Barrage Mellegue"
  },

  {
    src: require("assets/img/kasseb.jpg"),
    altText: "Barrage de Sidi Salem, Testour",
    caption: "Barrage Kasseb"
  }
];
function CarouselSection1() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);

  const onExiting = () => {
    setAnimating(true);
  };

  const onExited = () => {
    setAnimating(false);
  };

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  return (
    <>
      <div className="section" id="carousel">
        <Container>
          <Row className="justify-content-center">
          <Button color = "info" onClick={previous}>
            <FontAwesomeIcon icon={faAngleLeft} size="2x" />
          </Button>
            <Col lg="8" md="8">
              <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
              >
                <CarouselIndicators
                  items={items}
                  activeIndex={activeIndex}
                  onClickHandler={goToIndex}
                />
                {items.map((item, index) => (
                  <CarouselItem
                    key={item.src}
                    onExiting={onExiting}
                    onExited={onExited}
                    active={index === activeIndex}
                  >
                     <ImageContainer>
                    <img src={item.src} alt={item.altText} />
                    </ImageContainer>
                    <div className="carousel-caption d-none d-md-block">
                      <h5>{item.caption}</h5>
                    </div>
                  </CarouselItem>
                ))}
                <a
                  className="carousel-control-prev"
                  data-slide="prev"
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    previous();
                  }}
                  role="button"
                >
                  <i className="now-ui-icons arrows-1_minimal-left"></i>
                </a>
                <a
                  className="carousel-control-next"
                  data-slide="next"
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    next();
                  }}
                  role="button"
                >
                  <i className="now-ui-icons arrows-1_minimal-right"></i>
                </a>
              </Carousel>
              
            </Col>
            <Button color="info" onClick={next} >
              <FontAwesomeIcon icon={faAngleRight} size="2x" />
            </Button> 
          </Row>
          
        </Container>
      </div>
    </>
  );
}
export default CarouselSection1;

