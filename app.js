import express from "express";
import { crawlPage } from "./crawl.js";
import { handleError } from "puppeteer";

const app = express();

app.get("/getCrawledData", async (req, res) => {
    const url = req.query.targetUrl;
    try {
        const { status, data, message } = await crawlPage(url);
        if (status === 200) {
            res.status(200).send(data);
        } else {
            res.status(status).send(handleError(message, status));
        }
    } catch (error) {
        console.error(`Error in /getCrawlData: ${error.message}`);
        res.status(500).send(handleError("An error occurred while fetching data", 500));
    }
});

app.all("*", (req, res) => {
    res.status(404).send(handleError("No Resource Found!", 404))
})

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});