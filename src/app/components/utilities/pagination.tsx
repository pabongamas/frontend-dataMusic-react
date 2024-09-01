import React from "react";
import { Pageable } from "@/app/Interfaces/Response/pageable";

export function Pagination({
  totalElements,
  pageable,
  elementsByPage,
  totalPages,
  url
}: {
  totalElements: number;
  pageable: Pageable;
  elementsByPage:number;
  totalPages:number;
  url:string
}) {
  const numbersOfPages=Array.from({ length: totalPages }, (_, index) => index + 1)
 const  functionPageRender=()=>{
    return numbersOfPages.map(pageNumber=>(
        <li key={pageNumber}>
        <a
          href={url+`?page=`+pageNumber}
          className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          {pageNumber}
        </a>
      </li>
    ));
 }

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-base h-10">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </a>
          </li>
            {functionPageRender()}
          
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
