import React from 'react';
import { render } from '@testing-library/react';

import Carousel, {
  Image,
  getPage,
  getScreen,
  initPagination,
  paginationReducer,
  PAGE_SIZES
} from '../Carousel';
const screenTestCases = {
  480: 'mobile',
  600: 'mobile',
  780: 'tablet',
  1000: 'tablet',
  1100: 'desktop',
  1250: 'xl',
  1600: 'xxl'
};
describe('Helper Functions', () => {
  Object.keys(PAGE_SIZES).forEach(size => {
    it(`getPage returns correct for screen ${size}`, () => {
      const state = {
        currentPage: 2,
        images: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        screen: size
      };
      const page = getPage(state);
      expect(page.length).toBe(PAGE_SIZES[size]);
    });
  });
  Object.keys(screenTestCases).forEach(size => {
    it('getScreen returns correct size for: ' + size, () => {
      const screen = getScreen(size);
      expect(screen).toBe(screenTestCases[size]);
    });
  });

  it('initPagination returns mobile first', () => {
    const state = {
      currentPage: 2,
      images: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      screen: 'mobile'
    };
    const initializedState = initPagination(state);
    expect(initializedState.page).toStrictEqual(getPage(state));
  });
});

describe('Reducer', () => {
  it('Handles Action NEXT', () => {
    const state = {
      images: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      screen: 'tablet',
      currentPage: 0
    };
    const newState = paginationReducer(state, { type: 'NEXT' });
    expect(newState.currentPage).toBe(1);
    expect(newState.page).toStrictEqual([2, 3]);
  });

  it('Handles Action PREV', () => {
    const state = {
      images: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      screen: 'desktop',
      currentPage: 3
    };
    const newState = paginationReducer(state, { type: 'PREV' });
    expect(newState.currentPage).toBe(2);
    expect(newState.page).toStrictEqual([6, 7, 8]);
  });

  it('Handles Action RESIZE', () => {
    const state = {
      images: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      screen: 'mobile',
      currentPage: 3
    };
    const newState = paginationReducer(state, {
      type: 'RESIZE',
      payload: 1500
    });
    expect(newState.currentPage).toBe(0);
    expect(newState.page).toStrictEqual([0, 1, 2, 3, 4]);
    expect(newState.screen).toBe('xxl');
  });
  it('Handles Default action', () => {
    const state = {
      images: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      screen: 'mobile',
      currentPage: 3
    };
    const newState = paginationReducer(state, {
      type: 'UNKOWN'
    });
    expect(newState).toStrictEqual(state);
  });
});

describe('render', () => {
  it('Image component renders', () => {
    const { getByText, getByTestId } = render(
      <Image
        webformatURL="http://www.test.com/image.jpg"
        tags="test tag text"
      />
    );
    const linkElement = getByText(/test tag text/i);
    const imgElement = getByTestId('carousel-item-image');
    expect(linkElement).toBeInTheDocument();
    expect(imgElement).toBeInTheDocument();
  });

  it('Carousel componsnt renders', () => {
    const images = [];
    for (let i = 0; i < 20; i++) {
      images.push({
        id: i + 1,
        webformatURL: `http://www.test.com/image_${i + 1}.jpg`,
        tags: 'test tag ' + (i + 1)
      });
    }
    const { getByTestId } = render(<Carousel images={images} />);
    const carousel = getByTestId('Carousel');
    expect(carousel).toBeInTheDocument();
  });
});

describe('snapshots', () => {
  it('Image component match snapshot', () => {
    const { container } = render(
      <Image
        webformatURL="http://www.test.com/image.jpg"
        tags="test tag text"
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('Carousel componsnt match snapshot', () => {
    const images = [];
    for (let i = 0; i < 20; i++) {
      images.push({
        id: i + 1,
        webformatURL: `http://www.test.com/image_${i + 1}.jpg`,
        tags: 'test tag ' + (i + 1)
      });
    }
    const { container } = render(<Carousel images={images} />);
    expect(container).toMatchSnapshot();
  });
});
