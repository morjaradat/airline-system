require("dotenv").config();
const PORT = process.env.PORT || 3030;
const ioServer = require("socket.io")(PORT);
//namespace
const airLineSystem = ioServer.of("/airline");

ioServer.on("connection", (socket) => {
  console.log("connected to open socket", socket.id);

  socket.on("newFlight", (info) => {
    airLineSystem.emit("new_flight_is_scheduled", info);
    console.log("Flight", info);
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
});
