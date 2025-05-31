'use client';

import { useMemo, ComponentProps } from 'react';
import { Button } from '@/components/ui/button';
import { Ellipsis, ChevronLeft, ChevronRight } from 'lucide-react';
import { useWindowWidth, BreakPoints } from '../hooks/useWindowWidth';

interface LogicalPaginationProps {
  size?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  totalPages: number;
  currentPage: number;
  isPrev?: boolean;
  isNext?: boolean;
  onPageChange: (page: number) => void;
}

interface PageNumberProps extends ComponentProps<'button'> {
  isActive: boolean;
  num: number;
}

const logicalPaginationDefaultProps = {
  size: {
    sm: 5,
  },
  isPrev: true,
  isNext: true,
};

function LogicalPagination(props: LogicalPaginationProps) {
  const { size, totalPages, currentPage, isPrev, isNext, onPageChange } = {
    ...logicalPaginationDefaultProps,
    ...props,
  };

  const width = useWindowWidth();

  const visiblePages = useMemo(() => {
    if (!width) return size?.sm ?? 5;

    const getClosestSize = (...keys: (keyof typeof BreakPoints)[]): number => {
      for (const key of keys) {
        const k = key as keyof LogicalPaginationProps['size'];
        if (size?.[k] != null) return size[k]!;
      }
      return 5;
    };

    if (width < BreakPoints.md) return getClosestSize('sm');
    if (width < BreakPoints.lg) return getClosestSize('md', 'sm');
    if (width < BreakPoints.xl) return getClosestSize('lg', 'md', 'sm');
    return getClosestSize('xl', 'lg', 'md', 'sm');
  }, [width, size]);

  const pageNumbers = useMemo(() => {
    const pages: number[] = [];

    if (totalPages <= visiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    const pageNeighbors = Math.floor((visiblePages - 2) / 2);
    let startPage = Math.max(2, currentPage - pageNeighbors);
    let endPage = Math.min(totalPages - 1, currentPage + pageNeighbors);

    // adjust for boundaries
    if (currentPage - pageNeighbors < 2) {
      endPage = Math.min(
        totalPages - 1,
        endPage + (2 - (currentPage - pageNeighbors))
      );
    }

    if (currentPage + pageNeighbors > totalPages - 1) {
      startPage = Math.max(
        2,
        startPage - (currentPage + pageNeighbors - (totalPages - 1))
      );
    }

    const hasStartEllipsis = startPage > 2;
    const hasEndEllipsis = endPage < totalPages - 1;

    pages.push(1);
    if (hasStartEllipsis) pages.push(-1);
    for (let i = startPage; i <= endPage; i++) pages.push(i);
    if (hasEndEllipsis) pages.push(-1);
    pages.push(totalPages);

    return pages;
  }, [currentPage, totalPages, visiblePages]);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {isPrev && (
        <Previous onClick={() => onPageChange(Math.max(1, currentPage - 1))} />
      )}
      {pageNumbers.map((num, idx) =>
        num === -1 ? (
          <GapPlaceholder key={`gap-${idx}`} />
        ) : (
          <PageNumber
            key={num}
            num={num}
            isActive={num === currentPage}
            onClick={() => onPageChange(num)}
          />
        )
      )}
      {isNext && (
        <Next
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        />
      )}
    </div>
  );
}

function PageNumber({ num, isActive, ...props }: PageNumberProps) {
  return (
    <Button variant={isActive ? 'default' : 'outline'} size="sm" {...props}>
      {num}
    </Button>
  );
}

function GapPlaceholder() {
  return (
    <Button variant="ghost" size="sm" disabled>
      <Ellipsis />
    </Button>
  );
}

function Previous(props: ComponentProps<'button'>) {
  return (
    <Button variant="outline" size="sm" {...props}>
      <ChevronLeft />
    </Button>
  );
}

function Next(props: ComponentProps<'button'>) {
  return (
    <Button variant="outline" size="sm" {...props}>
      <ChevronRight />
    </Button>
  );
}

export { LogicalPagination };
