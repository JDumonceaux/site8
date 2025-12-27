import type { MetricType } from 'web-vitals';

/**
 * Reports web vitals by dynamically importing the 'web-vitals' library
 * and calling the provided callback for each metric.
 *
 * @param onPerfEntry - The callback function to be invoked with each metric.
 * @returns A Promise that resolves once all web vitals have been reported.
 */
const reportWebVitals = async (
  onPerfEntry: (metric: MetricType) => void,
): Promise<void> => {
  try {
    const { onCLS } = await import('web-vitals');
    onCLS(onPerfEntry);
    //   onFCP(onPerfEntry);
    //   onINP(onPerfEntry);
    //   onLCP(onPerfEntry);
    //   onTTFB(onPerfEntry);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error importing web-vitals:', error);
  }
};

export default reportWebVitals;
