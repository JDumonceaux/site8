import { Environment } from './Environment';

describe('environment', () => {
  test('should return the application version', () => {
    expect.hasAssertions();

    const result = Environment.getApplicationVersion();

    expect(result).toEqual(process.env.REACT_APP_VERSION);
  });

  test('should return the public URL', () => {
    expect.hasAssertions();

    const result = Environment.getPublicUrl();

    expect(result).toEqual(process.env.PUBLIC_URL);
  });

  test('should return the Google Tag Manager ID', () => {
    expect.hasAssertions();

    const result = Environment.getGoogleTagManagerId();

    expect(result).toEqual(process.env.REACT_APP_GTM_ID);
  });

  test('should return the Google Tag Manager environment auth', () => {
    expect.hasAssertions();

    const result = Environment.getGoogleTagManagerEnvironmentAuth();

    expect(result).toEqual(process.env.REACT_APP_GTM_ENV_AUTH);
  });

  test('should return the Google Tag Manager environment preview', () => {
    expect.hasAssertions();

    const result = Environment.getGoogleTagManagerEnvironmentPreview();

    expect(result).toEqual(process.env.REACT_APP_GTM_ENV_PREVIEW);
  });

  test('should return whether it is running locally', () => {
    expect.hasAssertions();

    const result = Environment.isLocal();

    expect(result).toEqual(process.env.NODE_ENV === 'local');
  });

  test('should return whether it is running in production', () => {
    expect.hasAssertions();

    const result = Environment.isProduction();

    expect(result).toEqual(process.env.NODE_ENV === 'production');
  });

  test('should return whether it is running in a lower environment', () => {
    expect.hasAssertions();

    const result = Environment.isLowerEnvironment();

    expect(result).toEqual(process.env.NODE_ENV !== 'production');
  });

  test('should return whether it is running near production', () => {
    expect.hasAssertions();

    const result = Environment.isNearProduction();

    expect(result).toEqual(process.env.NODE_ENV === 'staging');
  });
});
