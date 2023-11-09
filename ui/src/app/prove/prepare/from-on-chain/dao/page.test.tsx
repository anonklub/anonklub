import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChooseAnonSetDaoPage } from './page';
import { useResetAnonSet } from '@hooks';

jest.mock('@hooks');

describe('ChooseAnonSetDaoPage', () => {
  beforeEach(() => {
    (useResetAnonSet as jest.Mock).mockClear();
  });

  it('renders correctly', () => {
    render(<ChooseAnonSetDaoPage />);
    expect(screen.getByText('Which DAO do you want to prove you participated in the governance of?')).toBeInTheDocument();
  });

  it('calls useResetAnonSet on render', () => {
    render(<ChooseAnonSetDaoPage />);
    expect(useResetAnonSet).toHaveBeenCalled();
  });

  it('displays the correct help text', () => {
    render(<ChooseAnonSetDaoPage />);
    expect(screen.getByText('ENS: are you a member of the group of people who voted on a specific ENS proposal.')).toBeInTheDocument();
  });

  it('displays the correct button options', () => {
    render(<ChooseAnonSetDaoPage />);
    expect(screen.getByText('ENS')).toBeInTheDocument();
  });
});
