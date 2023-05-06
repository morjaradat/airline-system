require("dotenv").config();
const PORT = process.env.PORT || 3030;
const ioServer = require("socket.io")(PORT);
const uuid = require("uuid").v4;

const queue = {
  flights: {},
};

//namespace
const airLineSystem = ioServer.of("/airline");

ioServer.on("connection", (socket) => {
  console.log("connected to open socket", socket.id);

  socket.on("newFlight", (info) => {
    const id = uuid();
    airLineSystem.emit("new_flight_is_scheduled", info);
    queue.flights[id] = {
      event: "new-flight",
      details: {
        time: info.time,
        id: info.Details.flightID,
        pilot: info.Details.pilot,
        destination: info.Details.destination,
      },
    };
    console.log("Flight", info);
    console.log(queue.flights);
  });
});

airLineSystem.on("connection", (socket) => {
  console.log("connected to airline system ", socket.id);

  socket.on("took_off", handleTookOff);
  function handleTookOff(info) {
    info.event = "took_off";
    console.log("Flight", info);
  }
  socket.on("flight_arrived", handleFlightArrived);
  function handleFlightArrived(info) {
    info.event = "flight_arrived";
    console.log("Flight", info);
    ioServer.emit("flight_arrived", info);
  }

  socket.on("get-all", (callback) => {
    Object.keys(queue.flights).forEach((id) => {
      socket.emit("fligt", {
        id: id,
        msg: queue.flights[id],
      });
    });
    queue.flights = {};
  });
});
