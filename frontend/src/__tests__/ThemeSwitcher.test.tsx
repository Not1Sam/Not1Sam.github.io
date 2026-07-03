import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeSwitcher } from '../components/ThemeSwitcher';

describe('ThemeSwitcher', () => {
  it('renders three theme buttons', () => {
    render(
      <MemoryRouter>
        <ThemeSwitcher />
      </MemoryRouter>
    );
    expect(screen.getByText('DK')).toBeInTheDocument();
    expect(screen.getByText('LT')).toBeInTheDocument();
    expect(screen.getByText('PR')).toBeInTheDocument();
  });

  it('defaults to dark theme', () => {
    render(
      <MemoryRouter>
        <ThemeSwitcher />
      </MemoryRouter>
    );
    const darkButton = screen.getByText('DK');
    expect(darkButton).toHaveClass('text-fluo');
  });
});
