const express = require('express');
const {sequelize}=require('./models');
const bodyParser=require('body-parser');
const cors=require('cors');

require('dotenv').config();

const userRouter=require('./routes/user');
const mapRouter=require('./routes/map');

const app = express();
const PORT=3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/user/:userId/map', mapRouter);
app.use('/api/user/:userId/store', userRouter);


sequelize.sync({ force: false })
    .then(() => {
        console.log('success');
    })
    .catch((error) => {
        console.error('db sync error ', error);
    });


app.use((req, res, next) => {
    const error=new Error(`${req.method} ${req.url} 라우터가 없습니다`);
    next(error);
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
