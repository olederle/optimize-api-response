import React from "react";
import { UserResponse } from "../types/user";

export const PaginationInfo: React.FC<{
  pagination?: UserResponse["pagination"];
}> = ({ pagination }) => {
  return (
    <div className="pagination-info">
      <strong>Info</strong>
      <br />
      {pagination === undefined && <div>No pagination</div>}
      {pagination?.type === "cursor" && <div>Cursor: {pagination.cursor}</div>}
      {pagination?.type === "offset" && (
        <div>
          Offset={pagination.offset}, Page Size={pagination.pageSize}, Total=
          {pagination.total}
        </div>
      )}
      {pagination?.type === "page" && (
        <div>
          Page={pagination.page}, Page Size={pagination.pageSize}, Total=
          {pagination.total}
        </div>
      )}
    </div>
  );
};
