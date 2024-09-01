interface Sort{
    empty:boolean,
    sorted:boolean,
    unsorted:boolean,
}
export interface Pageable{
    offset:number,
    pageNumber:number,
    pageSize:number,
    paged:boolean,
    sort:Sort,
    unpaged:false,
}
