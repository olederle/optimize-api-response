import express, { Express, Request, Response } from "express";

const app: Express = express();

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function calculateFibonacci(n: number): Promise<number> {
  let fib = [0, 1];
  while (fib[fib.length - 1] <= n) {
    fib.push(fib[fib.length - 1] + fib[fib.length - 2]);
  }
  await delay(400 + Math.random() * 2000);
  return fib[fib.length - 1];
}

app.get("/:number", async (req: Request, res: Response) => {
  const number = parseInt(req.params.number);
  // TODO: cache computation
  res.send({ result: await calculateFibonacci(number) });
});

app.listen(3000, () => {
  console.log(`[server]: Server is running at http://localhost:3000`);
});
