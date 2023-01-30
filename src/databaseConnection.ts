import neo4j from "neo4j-driver";

export const submitOrder = async (orderData: any) => {
  // Define the driver and the connection credentials
  const driver = neo4j.driver(
    "neo4j+s://49ee1724.databases.neo4j.io",
    neo4j.auth.basic("neo4j", "roE5j8CrNI7j2olktlEQdiziU02H59V2Uf9jE5raNoc")
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

export const retrieveOrderData = async (orderId: string) => {
    // Define the driver and the connection credentials
    const driver = neo4j.driver(
        "neo4j+s://49ee1724.databases.neo4j.io",
         neo4j.auth.basic("neo4j", "roE5j8CrNI7j2olktlEQdiziU02H59V2Uf9jE5raNoc")
    );
    const session = driver.session();
  
    // Create a Cypher statement for retrieving order data with the given order ID
    const cypher = `MATCH (n:Order) WHERE n.tracking = "${orderId}" RETURN n`;
  
    try {
      const result = await session.run(cypher);
      return result;
    } catch (error) {
      console.error(error);
    }
  
    session.close();
    driver.close();
  };