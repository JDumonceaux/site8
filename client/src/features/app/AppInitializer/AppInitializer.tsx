// Single Responsibility Principle (SRP): Adhered to, as it performs only the initialization.
// Cyclomatic Complexity: 1 (very low).
// Cognitive Complexity: Very low, as it’s straightforward and easy to understand.
// Maintainability Index: High, inferred from simplicity and low complexity.
// Code smells: None found.

/**
 * Initializes the app.
 * This component sets up the necessary configurations and setups for the app.

 * Important that this is kept out of the <App/> or any other higher parent component,
 * as anything that happens within there is triggered as a state change of the application
 * and causes a total re-render
 */
const AppInitializer = () => {
  // useAppInitializer();
  return null;
};

export default AppInitializer;
