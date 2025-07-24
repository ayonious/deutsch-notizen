import { render, screen } from '@testing-library/react';
import React from 'react';
import Sources from './index';

// Mock sources
jest.mock('../../utils/sources', () => [
  {
    title: 'Test Source 1',
    imageUrl: 'img/test1.svg',
    description: 'Test description 1',
  },
  {
    title: 'Test Source 2',
    imageUrl: 'img/test2.svg',
    description: 'Test description 2',
  },
]);

describe('Sources', () => {
  it('renders without crashing', () => {
    render(<Sources />);
  });

  it('renders source titles', () => {
    render(<Sources />);
    expect(screen.getByText('Test Source 1')).toBeInTheDocument();
    expect(screen.getByText('Test Source 2')).toBeInTheDocument();
  });

  it('renders source descriptions', () => {
    render(<Sources />);
    expect(screen.getByText('Test description 1')).toBeInTheDocument();
    expect(screen.getByText('Test description 2')).toBeInTheDocument();
  });

  it('renders source images', () => {
    render(<Sources />);
    const image1 = screen.getByAltText('Test Source 1');
    const image2 = screen.getByAltText('Test Source 2');

    expect(image1).toBeInTheDocument();
    expect(image2).toBeInTheDocument();
    expect(image1).toHaveAttribute('src', 'img/test1.svg');
    expect(image2).toHaveAttribute('src', 'img/test2.svg');
  });
});
