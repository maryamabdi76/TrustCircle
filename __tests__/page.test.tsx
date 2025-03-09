import React from 'react';
import LandingPage from '@/app/page';
import '@testing-library/jest-dom';
import { render, screen } from '@/lib/test-utils';

describe('LandingPage', () => {
  it('renders a heading', () => {
    render(<LandingPage />);

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
