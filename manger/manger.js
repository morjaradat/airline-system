//  airLine: 'Royal Jordanian Airlines',
require("dotenv").config({ path: "../.env" });

const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");
const io = require("socket.io-client");

let host = `http://localhost:${process.env.PORT}/`;

const systemConnection = io.connect(host);

systemConnection.on("flight_arrived", handleArrived);
function handleArrived(info) {
  console.log(`Manager: we’re greatly thankful for the amazing flight, ${info.Details.pilot}
`);
}

setInterval(() => {
  let fakerData = {
    event: "new-flight",
    time: faker.datatype.datetime(),
    Details: {
      airLine: "Royal Jordanian Airlines",
      flightID: uuidv4(),
      pilot: faker.name.fullName(),
      destination: faker.address.country(),
    },
  };
  systemConnection.emit("newFlight", fakerData);
  console.log(
    `Manager: new flight with ID \‘${fakerData.Details.flightID}\’ have been scheduled`
  );
}, 5000);
