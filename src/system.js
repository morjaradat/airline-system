const event = require("./event");

require("./pilot");

require("./manger");

event.on("newFlight", newFlightHandler);
function newFlightHandler(info) {
  console.log(
    `Manager: new flight with ID \‘${info.Details.flightID}\’ have been scheduled`
  );
  console.log("Flight", info);
  event.emit("took_off", info);
}

event.on("pilot_arrive", pilotArriveHandler);
function pilotArriveHandler(politName) {
  console.log(
    `Manager: we’re greatly thankful for the amazing flight, ${politName}`
  );
}
