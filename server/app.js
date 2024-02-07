import express from "express";
import fileUpload from "express-fileupload";
//IMPORT ROUTES
import studentsRoutes from "./routes/students.routes.js";

const app = express();
//Middlewares
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))

app.use(studentsRoutes);

export default app;
