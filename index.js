import express from 'express';
import medicalSpecialtyRouter from './src/routers/medicalSpecialty.router.js';
import annoucementRouter from './src/routers/annoucement.router.js';
import scheduleRouter from './src/routers/schedule.router.js';
import bookingRouter from './src/routers/booking.router.js';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/medicalSpecialty', medicalSpecialtyRouter);
app.use('/api/announcement', annoucementRouter);
app.use('/api/schedule', scheduleRouter);
app.use('/api/booking', bookingRouter);

app.use((req, res, next) => {
    console.log('>>> run into my middleware')
    console.log(req.method)
    next();
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})