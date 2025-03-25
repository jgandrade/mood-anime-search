import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { drizzle } from "drizzle-orm/postgres-js";
import { VError } from "verror";
import postgres from "postgres";
import "dotenv/config";

class SupabaseDB {
  private db!: PostgresJsDatabase;
  private sqlClient!: ReturnType<typeof postgres>;
  private isConnected = false;

  constructor() {
    try {
      if (process.env.NODE_ENV !== "test") {
        this.connect();
      }
    } catch (error) {
      throw new VError("Failed to connect to database due to error:", error);
    }
  }

  connect() {
    if (this.isConnected) {
      return this.db;
    }

    try {
      const sqlClient = postgres(process.env.DATABASE_URL || "");
      this.sqlClient = sqlClient;
      this.db = drizzle({
        client: sqlClient,
        casing: "snake_case",
      });
      this.isConnected = true;
      return this.db;
    } catch (error) {
      throw new VError("Failed to connect to database:", error);
    }
  }

  getInstance() {
    if (!this.isConnected) {
      return this.connect();
    }
    return this.db;
  }

  async withTransaction<T>(
    transactionCallback: (tx: PostgresJsDatabase) => Promise<T>
  ) {
    if (!this.isConnected) {
      this.connect();
    }

    return this.db.transaction(async (tx) => {
      try {
        return await transactionCallback(tx);
      } catch (error) {
        tx.rollback();
        throw new VError(
          "Failed to execute transaction, rolling back due to error:",
          error
        );
      }
    });
  }

  async close() {
    if (!this.isConnected) {
      return;
    }

    try {
      await this.sqlClient.end();
      this.isConnected = false;
    } catch (error) {
      throw new VError("Failed to close database connection:", error);
    }
  }

  get lib() {
    return {
      db: this.db,
      connect: this.connect.bind(this),
      withTransaction: this.withTransaction.bind(this),
      close: this.close.bind(this),
    };
  }
}

const supabaseDB = new SupabaseDB();
export const { db, connect, withTransaction, close } = supabaseDB.lib;
