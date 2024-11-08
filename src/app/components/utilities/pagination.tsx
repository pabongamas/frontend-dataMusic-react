"use client"
import React from "react";
import { Pageable } from "@/app/Interfaces/Response/pageable";
import { useRouter,usePathname } from "next/navigation";


//object of dinamyc pagination ,the parameter pageForApi is the actual page wich is searched in the browser 
export function Pagination({
  totalElements,
  pageable,
  elementsByPage,
  totalPages,
  url,
  pageForApi,
}: {
  totalElements: number;
  pageable: Pageable;
  elementsByPage: number;
  totalPages: number;
  url: string;
  pageForApi: number;
}) {
  const numbersOfPages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  const router = useRouter();

  const goToPage = (pageNumber: number) => {
    router.push(`${url}?page=${pageNumber}`)
  };
//   is added the logic for control the pagination , is created a new array with the values of the length of number of pages
// this is iterated for render every single page , is validates if each one is the page actual wich is searched 
// is added styles and classes depending if the page is actual o other 

  const functionPageRender = () => {
    return numbersOfPages.map((pageNumber) => (
      <li key={pageNumber}>
        <a
          // href={url + `?page=` + pageNumber}
          onClick={() => goToPage(pageNumber)}
          className={`cursor-pointer ${
            pageNumber === pageable.pageNumber + 1
              ? "bg-like text-principa  hover:text-principal "
              : "bg-principal"
          } ${
            pageable.pageNumber === 0 && pageNumber === pageable.pageNumber + 1
              ? " rounded-s-lg "
              : ""
          }
          ${
            totalPages===pageNumber && pageForApi+1===totalPages ? " rounded-e-lg " : ""
          }  flex items-center justify-center px-4 h-10 leading-tight border border-gray-300  hover:text-like  dark:border-gray-700`}
        >
          {pageNumber}
        </a>
      </li>
    ));
  };

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-base h-10">
          {pageable.pageNumber !== 0 && (
            <li>
              <a
                // href={url + `?page=` + pageForApi}
                onClick={() => goToPage(pageForApi)}
                className=" bg-principal flex items-center justify-center px-4 h-10 ms-0 leading-tight border rounded-s-lg  border-gray-300  hover:text-like  dark:border-gray-700"
              >
                Previous
              </a>
            </li>
          )}
          {functionPageRender()}
          {totalPages !== pageForApi + 1 && (
            <li>
              <a
                // href={url + `?page=` + (pageForApi + 2)}
                onClick={() => goToPage(pageForApi+2)}
                className=" bg-principal flex items-center justify-center px-4 h-10 leading-tight border  rounded-e-lg border-gray-300  hover:text-like  dark:border-gray-700"
              >
                Next
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
