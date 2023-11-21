import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Page from './page';
import { getData } from '#/get-data';
import { AnonSetResults } from '@components';

jest.mock('#/get-data');
jest.mock('@components/AnonSetResults', () => jest.fn(() => null));

describe('Page', () => {
  const mockGetData = getData as jest.MockedFunction<typeof getData>;
  const mockAnonSetResults = AnonSetResults as jest.MockedFunction<typeof AnonSetResults>;

  beforeEach(() => {
    mockGetData.mockClear();
    mockAnonSetResults.mockClear();
  });

  it('renders without crashing', () => {
    mockGetData.mockResolvedValue([]);
    render(<Page />);
  });

  it('calls getData with correct argument', async () => {
    mockGetData.mockResolvedValue([]);
    render(<Page />);
    await waitFor(() => expect(mockGetData).toHaveBeenCalledWith(`${config.urls.queryApi}/beacon`));
  });

  it('renders AnonSetResults with correct props', async () => {
    const mockData = ['0x123', '0x456'];
    mockGetData.mockResolvedValue(mockData);
    render(<Page />);
    await waitFor(() => expect(mockAnonSetResults).toHaveBeenCalledWith({ anonSet: mockData, title: 'Beacon depositors' }, expect.anything()));
  });
});
