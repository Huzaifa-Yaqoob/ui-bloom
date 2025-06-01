'use client';

import { useState } from 'react';
import { LogicalPagination } from '@/registry/logical-pagination/logical-pagination';

export default function PaginationView() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <section>
      <LogicalPagination
        totalPages={25}
        currentPage={currentPage}
        size={{ sm: 0, lg: 7, '2xl': 10 }}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </section>
  );
}
