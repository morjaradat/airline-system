const event = require("./event");

event.on("took_off", handleTookOff);
function handleTookOff(info) {
  setTimeout(() => {
    console.log(
      `Pilot: flight with ID  \‘${info.Details.flightID}\’  took-off`
    );
    info.event = "took_off";
    console.log("Flight", info);

    event.emit("arrived", info);
  }, 4000);
}

event.on("arrived", handleArrived);
function handleArrived(info) {
  setTimeout(() => {
    console.log(
      `Pilot: flight with ID  \‘${info.Details.flightID}\’  has arrived`
    );
    info.event = "arrived";
    console.log("Flight", info);

    event.emit("pilot_arrive", info.Details.pilot);
  }, 3000);
}
