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

### Tests

```
 PASS  src/components/App.test.js
  ✓ renders  header (52ms)
```
