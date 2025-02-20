import { usePagination } from "@/hooks/use-pagination";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationButton,
} from "@/components/ui/pagination";
import { ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  paginationItemsToDisplay?: number;
  onPageChange: (page: number) => void;
};

export default function AppClientPagination({
  currentPage,
  totalPages,
  paginationItemsToDisplay = 5,
  onPageChange,
}: PaginationProps) {
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay,
  });

  return (
    <Pagination className="w-fit m-0">
      <PaginationContent>
        {/* First page button */}
        <PaginationItem>
          <PaginationButton
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            aria-label="Go to first page"
            aria-disabled={currentPage === 1 ? true : undefined}
            role={currentPage === 1 ? "link" : undefined}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <ChevronFirstIcon size={16} aria-hidden="true" />
          </PaginationButton>
        </PaginationItem>

        {/* Previous page button */}
        <PaginationItem>
          <PaginationButton
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            aria-label="Go to previous page"
            aria-disabled={currentPage === 1 ? true : undefined}
            role={currentPage === 1 ? "link" : undefined}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <ChevronLeftIcon size={16} aria-hidden="true" />
          </PaginationButton>
        </PaginationItem>

        {/* Left ellipsis (...) */}
        {showLeftEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Page number links */}
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationButton
              isActive={page === currentPage}
              onClick={() => onPageChange(page)}
            >
              {page}
            </PaginationButton>
          </PaginationItem>
        ))}

        {/* Right ellipsis (...) */}
        {showRightEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Next page button */}
        <PaginationItem>
          <PaginationButton
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            aria-label="Go to next page"
            aria-disabled={currentPage === totalPages ? true : undefined}
            role={currentPage === totalPages ? "link" : undefined}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <ChevronRightIcon size={16} aria-hidden="true" />
          </PaginationButton>
        </PaginationItem>

        {/* Last page button */}
        <PaginationItem>
          <PaginationButton
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            aria-label="Go to last page"
            aria-disabled={currentPage === totalPages ? true : undefined}
            role={currentPage === totalPages ? "link" : undefined}
            onClick={() => onPageChange(totalPages)}
          >
            <ChevronLastIcon size={16} aria-hidden="true" />
          </PaginationButton>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
