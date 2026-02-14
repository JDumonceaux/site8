import { Environment } from './Environment';

const getExpectedValue = (key: string): string | undefined => {
  const env = import.meta.env as Record<string, unknown>;
  const candidateKeys = new Set<string>([key]);

  if (key.startsWith('REACT_APP_')) {
    candidateKeys.add(key.replace('REACT_APP_', 'VITE_'));
  }

  if (key === 'PUBLIC_URL') {
    candidateKeys.add('BASE_URL');
  }

  const value = [...candidateKeys]
    .map((candidateKey) => env[candidateKey])
    .find(
      (candidateValue): candidateValue is string =>
        typeof candidateValue === 'string' && candidateValue.length > 0,
    );

  return value;
};

describe('environment', () => {
  test('should return the application version', () => {
    expect.hasAssertions();

    const result = Environment.getApplicationVersion();

    expect(result).toEqual(getExpectedValue('REACT_APP_VERSION'));
  });

  test('should return the public URL', () => {
    expect.hasAssertions();

    const result = Environment.getPublicUrl();

    expect(result).toEqual(getExpectedValue('PUBLIC_URL'));
  });

  test('should return the Google Tag Manager ID', () => {
    expect.hasAssertions();

    const result = Environment.getGoogleTagManagerId();

    expect(result).toEqual(getExpectedValue('REACT_APP_GTM_ID'));
  });

  test('should return the Google Tag Manager environment auth', () => {
    expect.hasAssertions();

    const result = Environment.getGoogleTagManagerEnvironmentAuth();

    expect(result).toEqual(getExpectedValue('REACT_APP_GTM_ENV_AUTH'));
  });

  test('should return the Google Tag Manager environment preview', () => {
    expect.hasAssertions();

    const result = Environment.getGoogleTagManagerEnvironmentPreview();

    expect(result).toEqual(getExpectedValue('REACT_APP_GTM_ENV_PREVIEW'));
  });

  test('should return whether it is running locally', () => {
    expect.hasAssertions();

    const result = Environment.isLocal();

    expect(result).toEqual(
      getExpectedValue('REACT_APP_ENVIRONMENT') === 'local',
    );
  });

  test('should return whether it is running in production', () => {
    expect.hasAssertions();

    const result = Environment.isProduction();

    expect(result).toEqual(
      getExpectedValue('REACT_APP_ENVIRONMENT') === 'production',
    );
  });

  test('should return whether it is running in a lower environment', () => {
    expect.hasAssertions();

    const result = Environment.isLowerEnvironment();

    expect(result).toEqual(
      getExpectedValue('REACT_APP_ENVIRONMENT') !== 'production',
    );
  });

  test('should return whether it is running near production', () => {
    expect.hasAssertions();

    const result = Environment.isNearProduction();

    expect(result).toEqual(getExpectedValue('REACT_APP_ENVIRONMENT') === 'uat');
  });
});
