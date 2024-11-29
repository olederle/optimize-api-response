export type PaginationType = "cursor" | "page" | "offset";

export interface IPagination<T extends PaginationType> {
  type: T;
}

export interface ICursorPagination extends IPagination<"cursor"> {
  cursor: string | number;
}

export interface IOffsetPagination extends IPagination<"offset"> {
  offset: number;
  limit: number;
}

export interface IPagePagination extends IPagination<"page"> {
  page: number;
  size: number;
}

export interface IPaginationController {
  setPaginationNone: () => void;
  setPaginationCursor: () => void;
  setPaginationOffset: () => void;
  setPaginationPage: () => void;
  setCursor: (cursor: string | number) => void;
  setOffset: (offset: number) => void;
  setLimit: (limit: number) => void;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
}
