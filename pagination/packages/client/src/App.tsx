import { useEffect, useRef, useState } from "react";
import { UserResponse } from "./types/user";
import { UserTable } from "./components/UserTable";
import { PaginationInfo } from "./components/PaginationInfo";
import { PaginationControls } from "./components/PaginationControls";
import {
  ICursorPagination,
  IOffsetPagination,
  IPagePagination,
  IPaginationController,
} from "./types/pagination";
import "./App.css";

function usePagination(): {
  controller: IPaginationController;
  pagination:
    | ICursorPagination
    | IPagePagination
    | IOffsetPagination
    | { type: "" };
} {
  const [pagination, setPagination] = useState<
    ICursorPagination | IPagePagination | IOffsetPagination | { type: "" }
  >({
    cursor: "",
    limit: 10,
    offset: 0,
    page: 1,
    size: 10,
    type: "",
  } as ICursorPagination | IPagePagination | IOffsetPagination | { type: "" });
  const controllerRef = useRef<IPaginationController>();
  if (controllerRef.current === undefined) {
    controllerRef.current = {
      setCursor(cursor) {
        setPagination((v) => {
          return {
            ...v,
            cursor,
            type: "cursor",
          } as ICursorPagination;
        });
      },
      setLimit: (limit) => {
        setPagination((v) => {
          return {
            ...v,
            limit,
            type: "offset",
          } as IOffsetPagination;
        });
      },
      setOffset(offset) {
        setPagination((v) => {
          return {
            ...v,
            offset,
            type: "offset",
          } as IOffsetPagination;
        });
      },
      setPage(page) {
        setPagination((v) => {
          return {
            ...v,
            page,
            type: "page",
          } as IPagePagination;
        });
      },
      setPaginationCursor() {
        setPagination((v) => {
          return {
            ...v,
            type: "cursor",
          } as ICursorPagination;
        });
      },
      setPaginationNone() {
        setPagination((v) => {
          return {
            ...v,
            type: "",
          } as { type: "" };
        });
      },
      setPaginationOffset() {
        setPagination((v) => {
          return {
            ...v,
            type: "offset",
          } as IOffsetPagination;
        });
      },
      setPaginationPage() {
        setPagination((v) => {
          return {
            ...v,
            type: "page",
          } as IPagePagination;
        });
      },
      setSize(size) {
        setPagination((v) => {
          return {
            ...v,
            size,
            type: "page",
          } as IPagePagination;
        });
      },
    };
  }
  return { controller: controllerRef.current!, pagination };
}

function useUsers(
  pagination:
    | ICursorPagination
    | IPagePagination
    | IOffsetPagination
    | { type: "" }
    | undefined
): UserResponse {
  const [userResponse, setUserResponse] = useState<UserResponse>({ users: [] });
  const isMountedRef = useRef(false);

  useEffect(() => {
    async function getUsers() {
      let path: string;
      switch (pagination?.type) {
        case "cursor":
          path = `/api/cursor?cursor=${pagination.cursor}`;
          break;
        case "offset":
          path = `/api/offset?limit=${pagination.limit}&offset=${pagination.offset}`;
          break;
        case "page":
          path = `/api/page?page=${pagination.page}&size=${pagination.size}`;
          break;
        default:
          path = "/api";
          break;
      }

      const response = await fetch(path);
      const users = (await response.json()) as UserResponse;
      if (isMountedRef.current) setUserResponse(users);
    }
    void getUsers();

    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, [isMountedRef, pagination]);

  return userResponse;
}

function App() {
  const { controller, pagination } = usePagination();
  const users = useUsers(pagination);
  return (
    <div className="content">
      <UserTable users={users.users} />
      <div className="content-aside">
        <PaginationInfo pagination={users.pagination} />
        <PaginationControls controller={controller} pagination={pagination} />
      </div>
    </div>
  );
}

export default App;
