import express from "express";
import userRouter from "./src/routers/user.router";
import doctorRouter from "./src/routers/doctor.router";
import patientRouter from "./src/routers/patient.router";
import authRouter from "./src/routers/auth.router";
import bodyParser from "body-parser";
import medicalSpecialtyRouter from "./src/routers/medicalSpecialty.router.js";
import annoucementRouter from "./src/routers/annoucement.router.js";
import scheduleRouter from "./src/routers/schedule.router.js";
import bookingRouter from "./src/routers/booking.router.js";
import moment from "moment-timezone";
import schedule from "node-schedule";

import bookingService from "./src/services/booking.service.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("assets"));

app.use("/api", authRouter);
app.use("/api/medicalSpecialty", medicalSpecialtyRouter);
app.use("/api/announcement", annoucementRouter);
app.use("/api/schedule", scheduleRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/user", userRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/patient", patientRouter);

async function updateBookings() {
  try {
    const bookings = await bookingService.getAll();
    const dateNow = moment(); // Sử dụng moment để lấy thời gian hiện tại

    // Định dạng ngày theo định dạng "YYYY-MM-DD"
    const dateNowFormat = dateNow.format("YYYY-MM-DD");

    for (const booking of bookings) {
      // format lại timezone booking
      const dateBookingTimeZone = moment(booking.datebooking).tz(
        "Asia/Ho_Chi_Minh"
      );
      //format lại ngày tháng năm booking
      const dateBooking = dateBookingTimeZone.format("YYYY-MM-DD");
      if (dateNowFormat == dateBooking && booking.status == 2) {
        const bodyBooking = {
          status: 4,
          datebooking: dateNowFormat,
          timestart: booking.timestart,
          timeend: booking.timeend,
          patientid: booking.patientid,
          doctorid: booking.doctorid,
        };
        const result = await bookingService.updateStatus(bodyBooking);
        console.log(result);
      }
    }
  } catch (error) {
    console.error("Error fetching bookings:", error);
  }
}

schedule.scheduleJob({ hour: 0, minute: 0 }, () => {
  updateBookings();
});

app.use((req, res, next) => {
  console.log(">>> run into my middleware");
  console.log(req.method);
  next();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
