import { Environment } from './Environment';

describe('Environment', () => {
  test('should return the application version', () => {
    const result = Environment.getApplicationVersion();
    expect(result).toEqual(process.env.REACT_APP_VERSION);
  });

  test('should return the public URL', () => {
    const result = Environment.getPublicUrl();
    expect(result).toEqual(process.env.PUBLIC_URL);
  });

  test('should return the Google Tag Manager ID', () => {
    const result = Environment.getGoogleTagManagerId();
    expect(result).toEqual(process.env.REACT_APP_GTM_ID);
  });

  test('should return the Google Tag Manager environment auth', () => {
    const result = Environment.getGoogleTagManagerEnvironmentAuth();
    expect(result).toEqual(process.env.REACT_APP_GTM_ENV_AUTH);
  });

  test('should return the Google Tag Manager environment preview', () => {
    const result = Environment.getGoogleTagManagerEnvironmentPreview();
    expect(result).toEqual(process.env.REACT_APP_GTM_ENV_PREVIEW);
  });

  test('should return whether it is running locally', () => {
    const result = Environment.isLocal();
    expect(result).toEqual(process.env.NODE_ENV === 'local');
  });

  test('should return whether it is running in production', () => {
    const result = Environment.isProduction();
    expect(result).toEqual(process.env.NODE_ENV === 'production');
  });

  test('should return whether it is running in a lower environment', () => {
    const result = Environment.isLowerEnvironment();
    expect(result).toEqual(process.env.NODE_ENV !== 'production');
  });

  test('should return whether it is running near production', () => {
    const result = Environment.isNearProduction();
    expect(result).toEqual(process.env.NODE_ENV === 'staging');
  });
});
