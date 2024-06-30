import express from "express";
import { crawlPage } from "./crawl.js";

const app = express();

app.get("/getCrawlData", async (req, res) => {
    const url = req.query.targetUrl;
    console.log(url);

    try {
        const { status, data, message } = await crawlPage(url);
        console.log(data);

        if (status === 200) {
            res.status(200).send({
                statusCode: 200,
                response: data,
                message: "Data fetched successfully",
            });
        } else {
            res.status(status).send({
                statusCode: status,
                message: message,
            });
        }
    } catch (error) {
        console.error(`Error in /getCrawlData: ${error.message}`);
        res.status(500).send({
            statusCode: 500,
            message: "An error occurred while fetching data",
        });
    }
});


app.all("*", (req, res) => {
    res.status(404).send("No Resource Found!")
})

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});