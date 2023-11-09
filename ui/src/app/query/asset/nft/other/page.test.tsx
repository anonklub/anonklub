import React from 'react';
import { render, screen } from '@testing-library/react';
import Page from './page';
import { useAsync, useStore } from '@hooks';

jest.mock('@hooks');

describe('Page', () => {
  beforeEach(() => {
    (useAsync as jest.Mock).mockClear();
    (useStore as jest.Mock).mockClear();
  });

  it('renders correctly', () => {
    render(<Page />);
    expect(screen.getByText('NFT Contract Address')).toBeInTheDocument();
  });

  it('calls useAsync and useStore on render', () => {
    render(<Page />);
    expect(useAsync).toHaveBeenCalled();
    expect(useStore).toHaveBeenCalled();
  });

  it('displays the correct elements based on state', () => {
    (useStore as jest.Mock).mockReturnValue({
      anonSet: null,
    });
    render(<Page />);
    expect(screen.getByText('Fetch Anonset')).toBeInTheDocument();
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
  });
});
