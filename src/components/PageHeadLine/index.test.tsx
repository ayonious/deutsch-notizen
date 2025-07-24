import { render, screen } from '@testing-library/react';
import React from 'react';
import PageHeadLine from './index';

describe('PageHeadLine', () => {
  it('renders without crashing', () => {
    render(<PageHeadLine />);
  });

  it('contains the expected text content', () => {
    render(<PageHeadLine />);
    expect(screen.getByText('Amateur-')).toBeInTheDocument();
    expect(screen.getByText('sammlung von')).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === ' schwierigen';
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === ' Deutschen Regeln';
      })
    ).toBeInTheDocument();
  });

  it('renders the get started button', () => {
    render(<PageHeadLine />);
    expect(screen.getByText("Auf Geht's")).toBeInTheDocument();
  });

  it('renders the product logo', () => {
    render(<PageHeadLine />);
    const logo = screen.getByAltText('Deutsch Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'img/undraw_Beer_celebration_cefj.svg');
  });
});
