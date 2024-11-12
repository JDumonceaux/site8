import type { MetricType } from 'web-vitals';

/**
 * Reports web vitals by importing the 'web-vitals' library and calling the provided callback functions.
 * @param onPerfEntry - The callback function to be called with the metric data.
 */
const reportWebVitals = (onPerfEntry: (metric: MetricType) => void) => {
  import('web-vitals')
    .then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
      onCLS(onPerfEntry);
      onINP(onPerfEntry);
      onFCP(onPerfEntry);
      onLCP(onPerfEntry);
      onTTFB(onPerfEntry);
    })
    .catch((error) => {
      console.error('Error importing web-vitals:', error);
    });
};

export default reportWebVitals;
