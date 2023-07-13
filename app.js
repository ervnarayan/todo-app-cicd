import express from 'express';
import { PORT } from './config';

const app = express();



app.get('/', (req, res)=>{
    res.send('API is working');
})


app.listen(PORT, ()=>{
    console.log(`App is listening on PORT ${PORT}...`);
});
