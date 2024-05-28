import dotenv from 'dotenv';


import express from 'express';
import passport from 'passport';
import fileUpload from 'express-fileupload';
import { setupDatabase } from './src/Configs/Database.js';
import { applyMiddlewares } from './src/Configs/Middlewares.js';
import PassportConfig from './src/Configs/PassportConfig.js';
import { fileURLToPath } from 'url';
import path from 'path';
import Routes from './src/Routes/Index.js';
import GoogleRoutes from './src/Routes/GoogleRoutes.js';

const app = express();
dotenv.config();
setupDatabase();
applyMiddlewares(app);
PassportConfig();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/uploads', express.static(__dirname + '/Uploads'));
app.use('/api', Routes);
app.use('/auth', GoogleRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`App is listening to port: ${process.env.PORT}`);
});

export default app;
 
