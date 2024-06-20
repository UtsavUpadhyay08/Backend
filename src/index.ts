import express from 'express';
import submissionRoutes from './Routes/submissionroutes';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/', submissionRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
