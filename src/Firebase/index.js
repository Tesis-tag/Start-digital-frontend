const {Router} = require('express');
const router = Router();
const app = require('./app');

app.listen(app.get('port'));
console.log('Server running on port', app.get('port'));

router.get('/',(req,res)=>{
    res.send('recibido');
});
