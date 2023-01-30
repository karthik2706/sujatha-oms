// neo4jApis.ts
import neo4j from "neo4j-driver";
import { Driver, Session } from "neo4j-driver";

const driver = neo4j.driver(
    "neo4j+s://5f03bbc4.databases.neo4j.io",
    neo4j.auth.basic("neo4j", "4RcdFNCscZg_2nhoDGNqr6RRNZXQUIUGPOop3W5p67w")
);

export const neo4jApis = {
  checkUserLogin: async (username: string, password: string) => {
    const session = driver.session();
    try {
      const result = await session.run(
        `MATCH (u:User {username: "${username}", password: "${password}"})
         RETURN u`
      );
      return result.records.length > 0;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      await session.close();
    }
  },
  registerUser: async (username: string, password: string) => {
    const session = driver.session();
    try {
      const result = await session.run(
        `CREATE (u:User {username: "${username}", password: "${password}"})
         RETURN u`
      );
      return result.records.length > 0;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      await session.close();
    }
  }
};
