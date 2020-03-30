const express = require('express');// To create the  server
const app = express();
const connectDB = require('./config/db');// Connect mongodb with the server
connectDB();

app.use(express.json({extended:false}));
app.get('/',(req,res)=>res.send('API Running'));
//following coomands are to connect the api's defined in the folders in server
// format app.use('Api end point',require('location of API file defined'))
app.use('/api/auth',require('./routes/api/auth'));
app.use('/profile/form',require('./routes/api/form'));
app.use('/form/cities',require('./routes/api/cities'));
app.use('/form/update',require('./routes/api/updateform'));
app.use('/form/idgen',require('./routes/api/consumercodegen'));
app.use('/form/payment',require('./routes/api/payment'));
app.use('/form/collect',require('./routes/api/collectpay'));
app.use('/reciept/pdfgen',require('./routes/api/pdfgen'));
app.use('/reciept/print',require('./routes/api/printpdf'));
app.listen(5000,()=>console.log(`working`));// Specify Port at which the server works 