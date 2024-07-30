import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
  test('renders the copyright information', () => {
    const { getByTestId, getByLabelText } = render(<Footer />);
    const copyrightElement = getByLabelText('Copyright Information');
    expect(copyrightElement).toBeInTheDocument();
    expect(copyrightElement).toHaveTextContent('Copyright ©');
    expect(getComputedStyle(copyrightElement).getPropertyValue('color')).toBe(
      'black',
    );
    expect(
      getComputedStyle(copyrightElement).getPropertyValue('font-size'),
    ).toBe('.8rem');
    expect(
      getComputedStyle(copyrightElement).getPropertyValue('padding-left'),
    ).toBe('16px');
    const footerElement = getByTestId('footer');
    expect(getComputedStyle(footerElement).getPropertyValue('height')).toBe(
      '40px',
    );
  });

  test('does not render the ChangeLanguage component', () => {
    const { queryByTestId } = render(<Footer />);
    const changeLanguageComponent = queryByTestId('change-language');
    expect(changeLanguageComponent).toBeNull();
  });
});
