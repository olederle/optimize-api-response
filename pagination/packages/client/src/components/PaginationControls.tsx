import React from "react";
import {
  ICursorPagination,
  IOffsetPagination,
  IPagePagination,
  IPaginationController,
} from "../types/pagination";

export const PaginationControls: React.FC<{
  controller: IPaginationController;
  pagination:
    | ICursorPagination
    | IPagePagination
    | IOffsetPagination
    | { type: "" }
    | undefined;
}> = ({ controller, pagination }) => {
  return (
    <div className="pagination-controls">
      <strong>Pagniation</strong>
      <br />
      <input
        type="radio"
        name="type"
        value=""
        checked={pagination === undefined || pagination.type === ""}
        onChange={controller.setPaginationNone}
      />{" "}
      None
      <input
        type="radio"
        name="type"
        value="cursor"
        checked={pagination?.type === "cursor"}
        onChange={controller.setPaginationCursor}
      />{" "}
      Cursor
      <input
        type="radio"
        name="type"
        value="offset"
        checked={pagination?.type === "offset"}
        onChange={controller.setPaginationOffset}
      />{" "}
      Offset
      <input
        type="radio"
        name="type"
        value="Page"
        checked={pagination?.type === "page"}
        onChange={controller.setPaginationPage}
      />{" "}
      Page
      <br />
      {pagination?.type === "cursor" && (
        <div>
          <span>Cursor: </span>
          <input
            type="text"
            defaultValue={pagination.cursor}
            onBlur={(e) => {
              controller.setCursor(e.target.value);
            }}
          />
        </div>
      )}
      {pagination?.type === "offset" && (
        <div>
          {" "}
          <div>
            <span>Limit: </span>
            <input
              type="text"
              defaultValue={pagination.limit}
              onBlur={(e) => {
                controller.setLimit(parseInt(e.target.value));
              }}
            />
          </div>{" "}
          <div>
            <span>Offset: </span>
            <input
              type="text"
              defaultValue={pagination.offset}
              onBlur={(e) => {
                controller.setOffset(parseInt(e.target.value));
              }}
            />
          </div>
        </div>
      )}
      {pagination?.type === "page" && (
        <div>
          {" "}
          <div>
            <span>Page: </span>
            <input
              type="text"
              defaultValue={pagination.page}
              onBlur={(e) => {
                controller.setPage(parseInt(e.target.value));
              }}
            />
          </div>{" "}
          <div>
            <span>Size: </span>
            <input
              type="text"
              defaultValue={pagination.size}
              onBlur={(e) => {
                controller.setSize(parseInt(e.target.value));
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
