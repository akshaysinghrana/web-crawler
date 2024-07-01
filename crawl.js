import puppeteer from "puppeteer";
import { handleError, handleSuccess } from "./helper.js";

const normaliseUrl = (url) => {
    try {
        const newUrl = new URL(url);
        return newUrl.toString();
    } catch (err) {
        return handleError(`Error normalising URL: ${err.message}`);
    }
};

const fetchDataUsingPuppeteer = async (url) => {
    try {
        const browser = await puppeteer.launch({
            ignoreHTTPSErrors: true // set true to bypas the site's certificate
        });
        const page = await browser.newPage();
        await page.goto(url);
        const html = await page.evaluate(() => document.documentElement.outerHTML);
        await browser.close();
        return html;
    } catch (err) {
        return handleError(`Error in fetch: ${err.message}`);
    }
}

const crawlPage = async (currUrl) => {
    const normalizedUrl = normaliseUrl(currUrl);
    if (!normalizedUrl)
        return handleError('Invalid URL', 400);
    try {
        const html = await fetchDataUsingPuppeteer(normalizedUrl);
        return handleSuccess(html, 200);
    } catch (error) {
        return handleError(error.message);
    }
}

export { normaliseUrl, crawlPage };