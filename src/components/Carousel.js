import React, { useReducer, useEffect } from 'react';
import { ReactComponent as ArrowSVG } from '../assets/arrow.svg';
import './Carousel.scss';

export const Image = ({ webformatURL, tags }) => {
  return (
    <div className="App__Carousel__Images__Item">
      <div
        className="App__Carousel__Images__Item__Image"
        style={{ backgroundImage: `url(${webformatURL})` }}
      >
        <img src={webformatURL} alt={tags} data-testid="carousel-item-image" />
      </div>
      <h3>{tags}</h3>
    </div>
  );
};

export function paginationReducer(state, action) {
  let currentPage = state.currentPage;
  switch (action.type) {
    case 'RESIZE':
      let screen = getScreen(action.payload);
      return {
        ...state,
        screen: screen,
        currentPage: 0,
        page: getPage({ ...state, screen, currentPage: 0 }),
        screenWidth: action.payload
      };
    case 'NEXT':
      currentPage = state.currentPage + 1;
      return {
        ...state,
        currentPage,
        page: getPage({ ...state, currentPage })
      };
    case 'PREV':
      currentPage = state.currentPage - 1;
      return {
        ...state,
        currentPage,
        page: getPage({ ...state, currentPage })
      };
    default:
      return state;
  }
}

export function getPage(state) {
  return state.images.slice(
    state.currentPage * PAGE_SIZES[state.screen],
    state.currentPage * PAGE_SIZES[state.screen] + PAGE_SIZES[state.screen]
  );
}

export function getScreen(width) {
  let screen = 'mobile';
  if (width >= 768 && width < 1024) {
    screen = 'tablet';
  } else if (width >= 1024 && width < 1200) {
    screen = 'desktop';
  } else if (width >= 1200 && width < 1440) {
    screen = 'xl';
  } else if (width >= 1440) {
    screen = 'xxl';
  }
  return screen;
}

export function initPagination(state) {
  return { ...state, page: getPage(state) };
}

export const PAGE_SIZES = {
  mobile: 1,
  tablet: 2,
  desktop: 3,
  xl: 4,
  xxl: 5
};

export default function Carousel({ images }) {
  const [state, dispatch] = useReducer(
    paginationReducer,
    { images, page: [], screen: 'mobile', currentPage: 0 },
    initPagination
  );

  useEffect(() => {
    const onResize = event => {
      dispatch({ type: 'RESIZE', payload: event.target.innerWidth });
    };
    if (window) {
      window.addEventListener('resize', onResize);
      dispatch({ type: 'RESIZE', payload: window.innerWidth });
    }
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [dispatch]);

  return (
    <div className="App__Carousel" data-testid="Carousel">
      <div className="App__Carousel__Images">
        {state.page.map((image, i) => {
          return (
            <Image
              key={`image_${i}_${image.id}`}
              {...image}
              width={100 / PAGE_SIZES[state.screen]}
            />
          );
        })}
      </div>
      <div className="App__Carousel__Controls">
        <button
          className="App__Carousel__Controls__Prev"
          disabled={!(state.currentPage > 0)}
          onClick={() => {
            dispatch({ type: 'PREV' });
          }}
        >
          <span>Prev</span>
          <ArrowSVG />
        </button>
        <button
          className="App__Carousel__Controls__Next"
          disabled={
            !(
              state.currentPage <
              Math.ceil(state.images.length / PAGE_SIZES[state.screen]) - 1
            )
          }
          onClick={() => {
            dispatch({ type: 'NEXT' });
          }}
        >
          <span>Next</span>
          <ArrowSVG />
        </button>
      </div>
    </div>
  );
}
