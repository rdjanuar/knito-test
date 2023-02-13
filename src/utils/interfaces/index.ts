export interface ITodos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface IUsePagination {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
}
