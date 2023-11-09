import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChooseAnonSetNftPage } from './page';
import { useResetAnonSet } from '@hooks';

jest.mock('@hooks');

describe('ChooseAnonSetNftPage', () => {
  beforeEach(() => {
    (useResetAnonSet as jest.Mock).mockClear();
  });

  it('renders correctly', () => {
    render(<ChooseAnonSetNftPage />);
    expect(screen.getByText('What type of NFT do you want to prove you own?')).toBeInTheDocument();
  });

  it('calls useResetAnonSet on render', () => {
    render(<ChooseAnonSetNftPage />);
    expect(useResetAnonSet).toHaveBeenCalled();
  });

  it('displays the correct help text', () => {
    render(<ChooseAnonSetNftPage />);
    expect(screen.getByText('Cryptopunk: are you a member of the group of people who own a cryptopunk?')).toBeInTheDocument();
    expect(screen.getByText('Other: are you a member of the group of people who own an NFT of a given collection (other than cryptopunks)?')).toBeInTheDocument();
  });

  it('displays the correct button options', () => {
    render(<ChooseAnonSetNftPage />);
    expect(screen.getByText('Cryptopunk')).toBeInTheDocument();
    expect(screen.getByText('Other')).toBeInTheDocument();
  });
});
