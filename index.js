import express from 'express';
import userRouter from "./src/routers/user.router"
import doctorRouter from "./src/routers/doctor.router"
import patientRouter from "./src/routers/patient.router"
import authRouter from "./src/routers/auth.router";
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json({limit: '10mb'}));

app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    //check => return res.send()
    console.log('>>> run into my middleware')
    console.log(req.method)
    next();
})

app.use("/api/user", userRouter);

app.use("/api/doctor", doctorRouter);

app.use("/api/patient", patientRouter);

app.use("/api", authRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})