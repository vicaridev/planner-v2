import { ArrowLeft, ArrowRight } from "lucide-react";
import { ComponentProps, useState } from "react"

interface PaginationProps extends ComponentProps<'button'> {
    length: number,
    itemsPerPage: number,
    handlePagination: (pageNumber: number) => void
    handleNextPage: (pageNumber: number) => void
    handlePreviousPage: (pageNumber: number) => void,
    maxVisiblePages: number,
}



export const Pagination = ({ length, itemsPerPage, handlePagination, handleNextPage, handlePreviousPage, maxVisiblePages }: PaginationProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(length / itemsPerPage);

    const handlePageSelection = (pageNumber: number) => {
        setCurrentPage(pageNumber)
        handlePagination(pageNumber)
    }

    const handlePreviousPageSelection = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1)
            handlePreviousPage(currentPage - 1)
        }
    }

    const handleNextPageSelection = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1)
            handleNextPage(currentPage + 1)
        }
    }

    const getPageNumbers = () => {
        const pages: (number | string)[] = []
        const halfVisible = Math.floor(maxVisiblePages / 2)

        if (totalPages <= maxVisiblePages) {
            return Array.from({ length: totalPages }, (_, index) => index + 1)
        }

        const startPage = Math.max(2, currentPage - halfVisible);
        const endPage = Math.min(totalPages - 1, currentPage + halfVisible)

        pages.push(1)

        if (startPage > 2) {
            pages.push('...')
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i)
        }

        if (endPage < totalPages - 1) {
            pages.push('...')
        }

        pages.push(totalPages)

        return pages
    }

    const pages = getPageNumbers()


    return (
        <>
            {length > itemsPerPage && (<div className="w-full flex size-max gap-3 justify-center">
                {currentPage > 1 && (<button className={`w-8 h-9 flex items-center justify-center rounded-lg border border-lime-300 text-lime-300 ${currentPage === 1 ? 'invisible' : 'hover:bg-lime-300 hover:text-zinc-600'}`}
                    onClick={handlePreviousPageSelection}><ArrowLeft size={20} /></button>
                )}
                {pages.map((pageNumber, index) => (
                    <button
                        key={index}
                        className={`w-8 h-9 rounded-lg border border-lime-300 ${currentPage === pageNumber ? 'bg-lime-300 text-zinc-950' : ''} ${typeof pageNumber === 'number' && currentPage !== pageNumber ? 'hover:bg-lime-300 hover:text-zinc-600' : ''}`}
                        onClick={() => typeof pageNumber === 'number' && handlePageSelection(pageNumber)}
                        disabled={typeof pageNumber !== 'number' || currentPage === pageNumber}
                    >
                        {typeof pageNumber === 'number' ? pageNumber : '...'}
                    </button>
                ))}
                {currentPage < totalPages &&
                    (<button className={`w-8 h-9 flex items-center justify-center  rounded-lg border border-lime-300 text-lime-300 ${currentPage === totalPages ? 'invisible' : 'hover:bg-lime-300 hover:text-zinc-600'}`}
                        onClick={handleNextPageSelection} disabled={currentPage === totalPages}><ArrowRight size={20}/></button>
                    )}
            </div>
            )}
        </>
    )
}