import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChooseAnonSetAssetPage } from './page';
import { useResetAnonSet } from '@hooks';

jest.mock('@hooks');

describe('ChooseAnonSetAssetPage', () => {
  beforeEach(() => {
    (useResetAnonSet as jest.Mock).mockClear();
  });

  it('renders correctly', () => {
    render(<ChooseAnonSetAssetPage />);
    expect(screen.getByText('What type of asset do you want to prove you own?')).toBeInTheDocument();
  });

  it('calls useResetAnonSet on render', () => {
    render(<ChooseAnonSetAssetPage />);
    expect(useResetAnonSet).toHaveBeenCalled();
  });

  it('displays the correct help text', () => {
    render(<ChooseAnonSetAssetPage />);
    expect(screen.getByText('NFT: are you a member of the group of people who own an NFT of a given collection?')).toBeInTheDocument();
    expect(screen.getByText('ERC20: are you a member of the group of people who own a min amount of a given ERC20 token?')).toBeInTheDocument();
  });

  it('displays the correct button options', () => {
    render(<ChooseAnonSetAssetPage />);
    expect(screen.getByText('NFT')).toBeInTheDocument();
    expect(screen.getByText('ERC20')).toBeInTheDocument();
  });
});
