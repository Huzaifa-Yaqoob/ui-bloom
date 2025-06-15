'use client';

import { useMemo, memo, ComponentProps, FC } from 'react';
import { Button } from '@/components/ui/button';
import { Ellipsis, ChevronLeft, ChevronRight } from 'lucide-react';
import { useWindowWidth, BreakPoints } from '../hooks/useWindowWidth';
import { cn } from '@/lib/utils';

interface LogicalPaginationProps {
  size?: Partial<typeof BreakPoints>;
  totalPages: number;
  currentPage: number;
  isPrev?: boolean;
  isNext?: boolean;
  onPageChange: (page: number) => void;
  className?: string;

  PreviousComponent?: FC<ComponentProps<'button'>>;
  NextComponent?: FC<ComponentProps<'button'>>;
  GapPlaceholderComponent?: FC;
  PageNumberComponent?: FC<PageNumberProps>;
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

function LogicalPaginationComponent(props: LogicalPaginationProps) {
  const {
    size,
    totalPages,
    currentPage,
    isPrev,
    isNext,
    onPageChange,
    className,
    PreviousComponent = DefaultPrevious,
    NextComponent = DefaultNext,
    GapPlaceholderComponent = DefaultGapPlaceholder,
    PageNumberComponent = DefaultPageNumber,
  } = {
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
    if (width < BreakPoints['2xl'])
      return getClosestSize('xl', 'lg', 'md', 'sm');
    return getClosestSize('2xl', 'xl', 'lg', 'md', 'sm');
  }, [width, size]);

  const pageNumbers = useMemo(() => {
    const pages: number[] = [];

    if (visiblePages <= 1) {
      pages.push(currentPage);
      return pages;
    }

    if (visiblePages === 2) {
      if (currentPage === totalPages) {
        if (currentPage - 1 >= 1) pages.push(currentPage - 1);
        pages.push(currentPage);
      } else {
        pages.push(currentPage, currentPage + 1);
      }
      return pages;
    }

    if (totalPages <= visiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    const numbersToShow = visiblePages - 2;
    const halfVisible = Math.floor(numbersToShow / 2);

    let startPage = Math.max(2, currentPage - halfVisible);
    let endPage = Math.min(totalPages - 1, startPage + numbersToShow - 1);

    if (endPage === totalPages - 1) {
      startPage = Math.max(2, endPage - numbersToShow + 1);
    }

    if (startPage === 2) {
      endPage = Math.min(totalPages - 1, startPage + numbersToShow - 1);
    }

    pages.push(1);

    if (startPage > 2) {
      pages.push(-1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add end ellipsis if needed
    if (endPage < totalPages - 1) {
      pages.push(-1);
    }

    pages.push(totalPages);

    return pages;
  }, [currentPage, totalPages, visiblePages]);

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {isPrev && (
        <PreviousComponent
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        />
      )}
      {pageNumbers.map((num, idx) =>
        num === -1 ? (
          <GapPlaceholderComponent key={`gap-${idx}`} />
        ) : (
          <PageNumberComponent
            key={num}
            num={num}
            isActive={num === currentPage}
            onClick={() => onPageChange(num)}
          />
        )
      )}
      {isNext && (
        <NextComponent
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        />
      )}
    </div>
  );
}

// --- Default Components ---

const DefaultPageNumber: FC<PageNumberProps> = ({
  num,
  isActive,
  ...props
}) => (
  <Button variant={isActive ? 'default' : 'outline'} size="sm" {...props}>
    {num}
  </Button>
);

const DefaultGapPlaceholder: FC<ComponentProps<'button'>> = (props) => (
  <Button variant="ghost" size="sm" disabled {...props}>
    <Ellipsis />
  </Button>
);

const DefaultPrevious: FC<ComponentProps<'button'>> = (props) => (
  <Button variant="outline" size="sm" {...props}>
    <ChevronLeft />
  </Button>
);

const DefaultNext: FC<ComponentProps<'button'>> = (props) => (
  <Button variant="outline" size="sm" {...props}>
    <ChevronRight />
  </Button>
);

// memorizing
const LogicalPagination = memo(LogicalPaginationComponent);

export { LogicalPagination, type PageNumberProps };
