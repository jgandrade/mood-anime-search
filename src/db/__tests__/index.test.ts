import { db, connect, withTransaction, close } from "../index";
import { sql } from "drizzle-orm";

describe("SupabaseDB", () => {
  beforeAll(async () => {
    connect();
    console.log("Test database connected successfully");
  });

  afterAll(async () => {
    await close();
  });

  it("should have db instance properly initialized", async () => {
    const result = await db.execute(sql`SELECT 1 as result`);
    expect(result[0]?.result).toBe(1);
  });

  it("should execute callback and commit successfully when using withTransaction", async () => {
    const result = await withTransaction(async (tx) => {
      const queryResult = await tx.execute(sql`SELECT 1 as result`);
      return queryResult[0]?.result;
    });

    expect(result).toBe(1);
  });

  it("should roll back on error when using withTransaction", async () => {
    await expect(async () => {
      await withTransaction(async () => {
        throw new Error("Test error to trigger rollback");
      });
    }).rejects.toThrow();

    const result = await db.execute(sql`SELECT 1 as result`);
    expect(result[0]?.result).toBe(1);
  });
});
