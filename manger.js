//  airLine: 'Royal Jordanian Airlines',
const event = require("./event");
const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");

setInterval(() => {
  event.emit("newFlight", {
    event: "new-flight",
    time: faker.datatype.datetime(),
    Details: {
      airLine: "Royal Jordanian Airlines",
      flightID: uuidv4(),
      pilot: faker.name.fullName(),
      destination: faker.address.country(),
    },
  });
}, 10000);
