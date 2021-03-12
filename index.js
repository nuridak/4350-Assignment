const express = require('express');
const Datastore = require('nedb');

const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin:",  "*");
  res.header("Access-Control-Allow-Headers",  "*")
  next();
});
app.get('/questions', async (request, response) => {
  const tag = request.params.tag;

  const url ='http://api.stackexchange.com/2.0/questions?site=stackoverflow&tagged=' + tag + '&sort=week';
  const qResponse = await fetch(url);
  const qData = await qResponse.json();

  response.json(qData);
});