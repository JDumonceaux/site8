import { Environment } from './Environment';

describe('Environment', () => {
  it('should return the application version', () => {
    const result = Environment.getApplicationVersion();
    expect(result).toEqual(process.env.REACT_APP_VERSION);
  });

  it('should return the public URL', () => {
    const result = Environment.getPublicUrl();
    expect(result).toEqual(process.env.PUBLIC_URL);
  });

  it('should return the Google Tag Manager ID', () => {
    const result = Environment.getGoogleTagManagerId();
    expect(result).toEqual(process.env.REACT_APP_GTM_ID);
  });

  it('should return the Google Tag Manager environment auth', () => {
    const result = Environment.getGoogleTagManagerEnvironmentAuth();
    expect(result).toEqual(process.env.REACT_APP_GTM_ENV_AUTH);
  });

  it('should return the Google Tag Manager environment preview', () => {
    const result = Environment.getGoogleTagManagerEnvironmentPreview();
    expect(result).toEqual(process.env.REACT_APP_GTM_ENV_PREVIEW);
  });

  it('should return the environment', () => {
    const result = Environment.getEnvironment();
    expect(result).toEqual(process.env.NODE_ENV);
  });

  it('should return the node environment', () => {
    const result = Environment.getNodeEnvironment();
    expect(result).toEqual(process.env.NODE_ENV);
  });

  it('should return whether it is running locally', () => {
    const result = Environment.isLocal();
    expect(result).toEqual(process.env.NODE_ENV === 'local');
  });

  it('should return whether it is running in production', () => {
    const result = Environment.isProduction();
    expect(result).toEqual(process.env.NODE_ENV === 'production');
  });

  it('should return whether it is running in a lower environment', () => {
    const result = Environment.isLowerEnvironment();
    expect(result).toEqual(process.env.NODE_ENV !== 'production');
  });

  it('should return whether it is running near production', () => {
    const result = Environment.isNearProduction();
    expect(result).toEqual(process.env.NODE_ENV === 'staging');
  });
});
