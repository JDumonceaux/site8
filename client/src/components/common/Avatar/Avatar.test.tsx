import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Avatar from './Avatar';

jest.mock('hooks/useAuth', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    authFetchUserAttributes: jest.fn(),
    authFetchAuthSession: jest.fn(),
    initial: 'JD',
    authorized: true,
  })),
}));

describe('Avatar', () => {
  it('renders the avatar with initial', () => {
    render(<Avatar />);
    const avatarElement = screen.getByTestId('avatar');
    const initialElement = screen.getByText('JD');
    expect(avatarElement).toBeInTheDocument();
    expect(initialElement).toBeInTheDocument();
  });

  it('renders the avatar without initial', () => {
    jest.spyOn(window, 'matchMedia').mockImplementation(() => ({
      matches: true,
    }));
    render(<Avatar />);
    const avatarElement = screen.getByTestId('avatar');
    const initialElement = screen.queryByText('JD');
    expect(avatarElement).toBeInTheDocument();
    expect(initialElement).not.toBeInTheDocument();
  });

  it('renders the sign out menu when authorized', () => {
    render(<Avatar />);
    const signOutLink = screen.getByText('Sign Out');
    const changePasswordLink = screen.getByText('Change Password');
    const deleteAccountLink = screen.getByText('Delete Account');
    expect(signOutLink).toBeInTheDocument();
    expect(changePasswordLink).toBeInTheDocument();
    expect(deleteAccountLink).toBeInTheDocument();
  });

  it('renders the sign in link when not authorized', () => {
    jest.spyOn(window, 'matchMedia').mockImplementation(() => ({
      matches: true,
    }));
    jest.resetModules();
    jest.doMock('hooks/useAuth', () => ({
      __esModule: true,
      default: jest.fn(() => ({
        authFetchUserAttributes: jest.fn(),
        authFetchAuthSession: jest.fn(),
        initial: '',
        authorized: false,
      })),
    }));
    const { default: Avatar } = require('./Avatar');
    render(<Avatar />);
    const signInLink = screen.getByText('Sign In');
    expect(signInLink).toBeInTheDocument();
  });

  it('calls authFetchAuthSession on mount', () => {
    const authFetchAuthSession = jest.fn();
    jest.doMock('hooks/useAuth', () => ({
      __esModule: true,
      default: jest.fn(() => ({
        authFetchUserAttributes: jest.fn(),
        authFetchAuthSession,
        initial: 'JD',
        authorized: true,
      })),
    }));
    const { default: Avatar } = require('./Avatar');
    render(<Avatar />);
    expect(authFetchAuthSession).toHaveBeenCalled();
  });

  it('calls authFetchUserAttributes when authorized changes', () => {
    const authFetchUserAttributes = jest.fn();
    jest.doMock('hooks/useAuth', () => ({
      __esModule: true,
      default: jest.fn(() => ({
        authFetchUserAttributes,
        authFetchAuthSession: jest.fn(),
        initial: 'JD',
        authorized: true,
      })),
    }));
    const { default: Avatar } = require('./Avatar');
    render(<Avatar />);
    expect(authFetchUserAttributes).toHaveBeenCalled();
  });

  it('does not call authFetchUserAttributes when authorized does not change', () => {
    const authFetchUserAttributes = jest.fn();
    jest.doMock('hooks/useAuth', () => ({
      __esModule: true,
      default: jest.fn(() => ({
        authFetchUserAttributes,
        authFetchAuthSession: jest.fn(),
        initial: 'JD',
        authorized: false,
      })),
    }));
    const { default: Avatar } = require('./Avatar');
    render(<Avatar />);
    expect(authFetchUserAttributes).not.toHaveBeenCalled();
  });

  it('navigates to sign out page when sign out link is clicked', () => {
    render(<Avatar />);
    const signOutLink = screen.getByText('Sign Out');
    userEvent.click(signOutLink);
    expect(window.location.pathname).toBe('/signout');
  });

  it('navigates to change password page when change password link is clicked', () => {
    render(<Avatar />);
    const changePasswordLink = screen.getByText('Change Password');
    userEvent.click(changePasswordLink);
    expect(window.location.pathname).toBe('/password/change');
  });

  it('navigates to delete account page when delete account link is clicked', () => {
    render(<Avatar />);
    const deleteAccountLink = screen.getByText('Delete Account');
    userEvent.click(deleteAccountLink);
    expect(window.location.pathname).toBe('/account/delete');
  });

  it('navigates to sign in page when sign in link is clicked', () => {
    jest.spyOn(window, 'matchMedia').mockImplementation(() => ({
      matches: true,
    }));
    jest.resetModules();
    jest.doMock('hooks/useAuth', () => ({
      __esModule: true,
      default: jest.fn(() => ({
        authFetchUserAttributes: jest.fn(),
        authFetchAuthSession: jest.fn(),
        initial: '',
        authorized: false,
      })),
    }));
    const { default: Avatar } = require('./Avatar');
    render(<Avatar />);
    const signInLink = screen.getByText('Sign In');
    userEvent.click(signInLink);
    expect(window.location.pathname).toBe('/signin');
  });
});
