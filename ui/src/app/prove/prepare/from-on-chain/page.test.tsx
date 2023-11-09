import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChooseAnonSetTypePage } from './page';
import { useResetAnonSet } from '@hooks';

jest.mock('@hooks');

describe('ChooseAnonSetTypePage', () => {
  beforeEach(() => {
    (useResetAnonSet as jest.Mock).mockClear();
  });

  it('renders correctly', () => {
    render(<ChooseAnonSetTypePage />);
    expect(screen.getByText('What type of membership do you want to prove?')).toBeInTheDocument();
  });

  it('calls useResetAnonSet on render', () => {
    render(<ChooseAnonSetTypePage />);
    expect(useResetAnonSet).toHaveBeenCalled();
  });

  it('displays the correct help text', () => {
    render(<ChooseAnonSetTypePage />);
    expect(screen.getByText('Asset: are you a member of the group of people who own some ETH, ERC20, NFTs...?')).toBeInTheDocument();
    expect(screen.getByText('DAO: are you a member of the group of people involved in a DAO governance?')).toBeInTheDocument();
  });

  it('displays the correct button options', () => {
    render(<ChooseAnonSetTypePage />);
    expect(screen.getByText('Asset')).toBeInTheDocument();
    expect(screen.getByText('DAO')).toBeInTheDocument();
  });
});
