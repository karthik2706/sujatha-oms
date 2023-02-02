import neo4j from "neo4j-driver";

export const submitOrder = async (orderData: any) => {
  // Define the driver and the connection credentials
  const driver = neo4j.driver(
    "neo4j+s://5f03bbc4.databases.neo4j.io",
    neo4j.auth.basic("neo4j", "4RcdFNCscZg_2nhoDGNqr6RRNZXQUIUGPOop3W5p67w")
  );
  const session = driver.session();

  // Create a Cypher statement for the given order data
  const cypher = `CREATE (n:Order {price: "${orderData.price}", qty: "${orderData.qty}", price: "${orderData.price}", rmobile: "${orderData.rmobile}", weight: "${orderData.weight}", cod: "${orderData.cod}", pickupD: "${orderData.pickupD}", country: "${orderData.country}", state: "${orderData.state}", city: "${orderData.city}", address: "${orderData.address}", vendor: "${orderData.vendor}", mobile: "${orderData.mobile}", name: "${orderData.name}", pincode: "${orderData.pincode}", ref: "${orderData.ref}", rname: "${orderData.rname}", time: "${orderData.time}", trackingID: "${orderData.trackingID}"})`;

  try {
    const result = await session.run(cypher);
    return result;
  } catch (error) {
    console.error(error);
  }

  session.close();
  driver.close();
};

export const retrieveOrderData = async (refId: string) => {
  console.log(refId);
  const driver = neo4j.driver(
    "neo4j+s://5f03bbc4.databases.neo4j.io",
    neo4j.auth.basic("neo4j", "4RcdFNCscZg_2nhoDGNqr6RRNZXQUIUGPOop3W5p67w")
  );
  const session = driver.session();

  // Create a Cypher statement for retrieving orders within the given date range
  const cypher = `MATCH (n:Order) WHERE n.ref = "${refId}" RETURN n`;

  try {
    const result = await session.run(cypher);
    const resp = result.records.map(record => record.get("n").properties);
    console.log(resp[0]);
    return resp[0];
  } catch (error) {
    console.error(error);
  } finally {
    await session.close();
  }
  session.close();
  driver.close();
};

export const retrieveOrdersByDateRange = async (startDate: string, endDate: string) => {
  // Define the driver and the connection credentials
  const driver = neo4j.driver(
    "neo4j+s://5f03bbc4.databases.neo4j.io",
    neo4j.auth.basic("neo4j", "4RcdFNCscZg_2nhoDGNqr6RRNZXQUIUGPOop3W5p67w")
  );
  const session = driver.session();

  // Create a Cypher statement for retrieving orders within the given date range
  const cypher = `MATCH (n:Order) WHERE n.time >= "${startDate}" AND n.time <= "${endDate}" RETURN n`;

  try {
    const result = await session.run(cypher);
    return result.records.map(record => record.get("o").properties);
  } catch (error) {
    console.error(error);
  }

  session.close();
  driver.close();
};

export const fetchAllOrders = async () => {
  const driver = neo4j.driver(
    "neo4j+s://5f03bbc4.databases.neo4j.io",
    neo4j.auth.basic("neo4j", "4RcdFNCscZg_2nhoDGNqr6RRNZXQUIUGPOop3W5p67w")
  );

  const session = driver.session();
  const result = await session.run(
    `MATCH (o:Order) RETURN o LIMIT 25`
  );

  console.log(result);

  session.close();

  function resp(result: { records: any[]; }) {
    return result.records.map(function(record: { get: (arg0: string) => { (): any; new(): any; properties: any; elementId: any; }; }) {
      return {
        elementId: record.get("o").elementId,
        properties: record.get("o").properties,
      };
    });
  }

  return resp(result);
};