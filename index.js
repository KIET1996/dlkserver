import express from 'express';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
    //check => return res.send()
    console.log('>>> run into my middleware')
    console.log(req.method)
    next();
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})