'use client';

import { useState } from 'react';
import { LogicalPagination } from '@/registry/logical-pagination/logical-pagination';

export function PaginationView() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <section>
      <LogicalPagination
        totalPages={25}
        currentPage={currentPage}
        size={{ sm: 3, lg: 5, '2xl': 8 }}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </section>
  );
}
