import React from 'react';
import { render, screen } from '@testing-library/react';
import ChooseAnonSetTypePage from './page';
import { useResetAnonSet } from '@hooks';

jest.mock('@hooks');

describe('ChooseAnonSetTypePage', () => {
  beforeEach(() => {
    useResetAnonSet.mockImplementation(jest.fn());
  });

  it('renders without crashing', () => {
    render(<ChooseAnonSetTypePage />);
    expect(screen.getByText('What type of membership do you want to prove?')).toBeInTheDocument();
  });

  it('calls useResetAnonSet on render', () => {
    render(<ChooseAnonSetTypePage />);
    expect(useResetAnonSet).toHaveBeenCalled();
  });

  it('renders Screen with correct props', () => {
    render(<ChooseAnonSetTypePage />);
    expect(screen.getByText('Asset: are you a member of the group of people who own some ETH, ERC20, NFTs...?')).toBeInTheDocument();
    expect(screen.getByText('DAO: are you a member of the group of people involved in a DAO governance?')).toBeInTheDocument();
    expect(screen.getByText('Beacon: are you a member of the group of addresses who have deposited ETH in the Ethereum 2.0 beacon contract (0x00000000219ab540356cbb839cbe05303d7705fa)?')).toBeInTheDocument();
    expect(screen.getByText('Asset')).toBeInTheDocument();
    expect(screen.getByText('DAO')).toBeInTheDocument();
    expect(screen.getByText('Beacon')).toBeInTheDocument();
  });
});
