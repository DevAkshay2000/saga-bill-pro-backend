import "reflect-metadata";
import { DataSource } from "typeorm";
import { Item, ItemDescription, ItemImage } from "../../entities";
import dotenv from "dotenv";
import path from "path";
// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, "../../.env") });
let appDataSource: DataSource;
console.log(process.env.Host,
  Number(process.env.Port),
  process.env.User_Name,
  process.env.Password,
  process.env.Database,)
const initializeDataSource = async (): Promise<DataSource> => {
  if (!appDataSource) {
    appDataSource = new DataSource({
      type: "postgres",
      host: process.env.Host,
      port: Number(process.env.Port),
      username: process.env.User_Name,
      password: process.env.Password,
      database: process.env.Database,
      entities: [Item, ItemImage, ItemDescription],
      //   entities: [
      //     "../../../src/entities/index/**/*.{ts,js}",
      //     "../../../build/entities/**/*.{ts,js}",
      //   ],
      synchronize: true,
      logging: false,
      ssl: {
        rejectUnauthorized: true, // Disables SSL certificate verification
      },
    });
    await appDataSource.initialize();
  }
  return appDataSource;
};
export const handler = async (): Promise<DataSource> => {
  const dataSource = await initializeDataSource();
  return dataSource;
};
