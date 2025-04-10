import express from "express";
import env from "dotenv";
env.config();
import cors from "cors";

import apiRoutes from "./api-routes/index.mjs";
import "./helpers/db.mjs";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static("build"));
app.use(express.json());

// app.use(cors({
//     origin: "http://localhost:3000",
// }))

// API
app.use('/api', apiRoutes);

app.get("*", (req, res) => {
    res.sendFile("index.html", { root: "build" });
});

app.use(function(req, res) {
    res.status(404).json({ msg: "Page Not Found" });
});

app.use(function(err, req, res, next) {
    if(res.headersSent) {
        return next(err);
    }
    res.status(500).json({ msg: '不正なエラーが発生しました。'});
});

app.listen(port, () => {
    console.log(`Server Start: http://localhost:${port}`);
});