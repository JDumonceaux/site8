import express, { Request, Response } from 'express';

const port = process.env.PORT ?? 3005; // default port to listen
const path = require('path');
const app = express();

app.set('x-powered-by', false);
app.set('etag', false);
app.use(express.json({ limit: '1000mb' }));
app.use(express.urlencoded({ limit: '1000mb', extended: false }));

// app.get('/api', (req: Request, res: Response) => {
//   res.send('Welcome to Express & TypeScript Server');
// });

app.get('/api', (req: Request, res: Response) => {
  const fileName = 'restaurants.json';
  const options = {
    root: path.join(__dirname, '../data'),
  };
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
});

app.listen(port, () => {
  console.log(`site8 Service is listening on port ${port}.`);
});
