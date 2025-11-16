import React, { Suspense, useEffect, useState, memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { showSpinner } from 'actions/index';

// AppLoading as functional component
const AppLoading = ({ error, showSpinner }) => {
  useEffect(() => {
    showSpinner(true);
    return () => {
      if (!error) {
        showSpinner(false);
      }
    };
  }, [showSpinner, error]);

  return <div />;
};

AppLoading.propTypes = {
  error: PropTypes.bool,
  showSpinner: PropTypes.func.isRequired,
};

// Loading as functional component
const Loading = ({ error, pastDelay, showSpinner }) => {
  if (error) {
    return null;
  }
  if (pastDelay) {
    return (
      <AppLoading
        error={error}
        showSpinner={showSpinner}
      />
    );
  }
  return null;
};

Loading.propTypes = {
  error: PropTypes.bool,
  pastDelay: PropTypes.bool,
  showSpinner: PropTypes.func.isRequired,
};

// ErrorBoundary as functional component
const ErrorBoundary = ({ children, showSpinner }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (hasError) {
      showSpinner(false);
    }
    return () => {
      if (!hasError) {
        showSpinner(false);
      }
    };
  }, [hasError, showSpinner]);

  // Simulate getDerivedStateFromError
  const errorHandler = () => setHasError(true);

  if (hasError) {
    return <div />;
  }

  // Wrap children with error boundary
  return (
    <>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { onError: errorHandler }),
      )}
    </>
  );
};

ErrorBoundary.propTypes = {
  children: PropTypes.node,
  showSpinner: PropTypes.func.isRequired,
};

const SuspenseRender = ({ children, error, showSpinner }) => (
  <ErrorBoundary showSpinner={showSpinner}>
    <Suspense
      fallback={
        <Loading
          pastDelay
          error={error}
          showSpinner={showSpinner}
        />
      }
    >
      {children}
    </Suspense>
  </ErrorBoundary>
);

SuspenseRender.propTypes = {
  children: PropTypes.node,
  error: PropTypes.bool,
  showSpinner: PropTypes.func.isRequired,
};

SuspenseRender.displayName = 'SuspenseRender';

export default connect(null, { showSpinner })(memo(SuspenseRender));
