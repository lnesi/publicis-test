# Publicis.Sapient Front End Senior Associate Test

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />

### `yarn build`

Builds the app for production to the `build` folder.<br />

## Notes

### Improvements

- Preload Image so we can have smooth transition between pages
- On page load we should load the next and prev page to be able to animate transition beteen pages
- On resize the reset of the current page can be imporove by calculating a better index based on current posution on prev breakpoint.
- add Integration test to validate functionalities

### Tests

```
 PASS  src/components/App.test.js
  ✓ renders  header (52ms)

 PASS  src/components/__tests__/Carousel.js
  Helper Functions
    ✓ getPage returns correct for screen mobile (1ms)
    ✓ getPage returns correct for screen tablet (1ms)
    ✓ getPage returns correct for screen desktop
    ✓ getPage returns correct for screen xl
    ✓ getPage returns correct for screen xxl
    ✓ getScreen returns correct size for: 480
    ✓ getScreen returns correct size for: 600
    ✓ getScreen returns correct size for: 780 (1ms)
    ✓ getScreen returns correct size for: 1000
    ✓ getScreen returns correct size for: 1100 (1ms)
    ✓ getScreen returns correct size for: 1250
    ✓ getScreen returns correct size for: 1600 (2ms)
    ✓ initPagination returns mobile first (1ms)
  Reducer
    ✓ Handles Action NEXT (1ms)
    ✓ Handles Action PREV (1ms)
    ✓ Handles Action RESIZE (2ms)
    ✓ Handles Default action
  render
    ✓ Image component renders (7ms)
    ✓ Carousel componsnt renders (10ms)
  snapshots
    ✓ Image component match snapshot (3ms)
    ✓ Carousel componsnt match snapshot (8ms)

```
