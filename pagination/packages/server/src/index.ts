import express, { Express, Request, Response } from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { join } from "path";

const DB_FILE_NAME = join(__dirname, "..", "db", "data.db");

const app: Express = express();

// all users without pagination
app.get("/", async (req: Request, res: Response) => {
  const db = await open({
    driver: sqlite3.Database,
    filename: DB_FILE_NAME,
    mode: sqlite3.OPEN_READONLY,
  });

  const users = await db.all("SELECT * FROM USERS ORDER BY ID");

  await db.close();

  res.send({ users });
});

// offset based
app.get("/offset", async (req: Request, res: Response) => {
  const offset = parseInt(req.query.offset as string);
  const limit = parseInt(req.query.limit as string);

  const db = await open({
    driver: sqlite3.Database,
    filename: DB_FILE_NAME,
    mode: sqlite3.OPEN_READONLY,
  });

  // TODO: pagination
  const users = await db.all("SELECT * FROM USERS ORDER BY ID");

  await db.close();

  // TODO: update result
  res.send({
    users,
    pagination: {
      offset: 0,
      pageSize: users.length,
      total: 0,
      type: "offset",
    },
  });
});

// page based
app.get("/page", async (req: Request, res: Response) => {
  // TODO: use page based pagination
  const db = await open({
    driver: sqlite3.Database,
    filename: DB_FILE_NAME,
    mode: sqlite3.OPEN_READONLY,
  });

  const users = await db.all("SELECT * FROM USERS ORDER BY ID");

  await db.close();

  res.send({ users });
});

// cursor based
app.get("/cursor", async (req: Request, res: Response) => {
  // TODO: use cursor based pagination
  const db = await open({
    driver: sqlite3.Database,
    filename: DB_FILE_NAME,
    mode: sqlite3.OPEN_READONLY,
  });

  const users = await db.all("SELECT * FROM USERS ORDER BY ID");

  await db.close();

  res.send({ users });
});

app.listen(3000, () => {
  console.log(`[server]: Server is running at http://localhost:3000`);
});
