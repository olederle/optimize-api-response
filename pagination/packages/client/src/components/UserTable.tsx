import React from "react";
import { User } from "../types/user";
import "./UserTable.css";

export const UserTable: React.FC<{ users: Array<User> }> = ({ users }) => {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>E-Mail</th>
          <th>Phone</th>
          <th>Gender</th>
          <th>Age</th>
          <th>Birth Date</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.gender}</td>
              <td>{user.age}</td>
              <td>{user.birthDate}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
