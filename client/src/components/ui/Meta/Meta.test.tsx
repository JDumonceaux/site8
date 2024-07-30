import { render } from '@testing-library/react';
import { describe, expect } from 'vitest';
import Meta from './Meta';

describe('Meta', () => {
  test('renders the title correctly', () => {
    render(<Meta title="Test Title" />);
    expect(document.title).toBe('Test Title');
  });

  test('renders the description correctly', () => {
    render(<Meta description="Test Description" />);
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription?.getAttribute('content')).toBe('Test Description');
  });

  it('renders the og:type correctly', () => {
    render(<Meta type="article" />);
    const ogType = document.querySelector('meta[property="og:type"]');
    expect(ogType?.getAttribute('content')).toBe('article');
  });

  it('renders the og:title correctly', () => {
    render(<Meta title="Test Title" />);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogTitle?.getAttribute('content')).toBe('Test Title');
  });

  it('renders the og:description correctly', () => {
    render(<Meta description="Test Description" />);
    const ogDescription = document.querySelector(
      'meta[property="og:description"]',
    );
    expect(ogDescription?.getAttribute('content')).toBe('Test Description');
  });

  it('renders the twitter:creator correctly', () => {
    render(<Meta name="Test Name" />);
    const twitterCreator = document.querySelector(
      'meta[name="twitter:creator"]',
    );
    expect(twitterCreator?.getAttribute('content')).toBe('Test Name');
  });

  it('renders the twitter:card correctly', () => {
    render(<Meta type="article" />);
    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    expect(twitterCard?.getAttribute('content')).toBe('article');
  });

  it('renders the twitter:title correctly', () => {
    render(<Meta title="Test Title" />);
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    expect(twitterTitle?.getAttribute('content')).toBe('Test Title');
  });

  it('renders the twitter:description correctly', () => {
    render(<Meta description="Test Description" />);
    const twitterDescription = document.querySelector(
      'meta[name="twitter:description"]',
    );
    expect(twitterDescription?.getAttribute('content')).toBe(
      'Test Description',
    );
  });
});
