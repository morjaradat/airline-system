require("dotenv").config({ path: "../.env" });
const io = require("socket.io-client");

let host = `http://localhost:${process.env.PORT}/`;
const systemConnection = io.connect(`${host}airline`);
const systemClientConnection = io.connect(host);

systemConnection.on("new_flight_is_scheduled", (info) => {
  console.log(
    `Pilot: flight with ID \‘${info.Details.flightID}\’ has been scheduled`
  );
  setTimeout(() => {
    systemConnection.emit("took_off", info);
    console.log(`Pilot: flight with ID \‘${info.Details.flightID}\’ took-off`);
  }, 4000);
  setTimeout(() => {
    systemConnection.emit("flight_arrived", info);
    console.log(
      `Pilot: flight with ID \‘${info.Details.flightID}\’ has arrived`
    );
  }, 7000);
});

systemConnection.emit("get-all");
systemConnection.on("fligt", (response) => {
  console.log(
    `Pilot:Sorry i didn't catch this flight ID ${response.msg.details.id}`
  );
});
