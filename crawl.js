import puppeteer from "puppeteer";

const normaliseUrl = (url) => {
    try {
        const newUrl = new URL(url);
        return newUrl.toString();
    } catch (err) {
        console.error(`Error normalising URL: ${err.message}`);
        return null;
    }
};

async function fetchDataUsingPuppeteerAndFetch(url) {
    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true
    });
    const page = await browser.newPage();
    await page.goto(url);
    const html = await page.evaluate(() => document.documentElement.outerHTML);
    await browser.close();

    return html;
}

const crawlPage = async (currUrl) => {
    const normalizedUrl = normaliseUrl(currUrl);
    if (!normalizedUrl) {
        return { status: 400, message: 'Invalid URL' };
    }

    try {
        const html = await fetchDataUsingPuppeteerAndFetch(normalizedUrl);

        return { status: 200, data: html };
    } catch (err) {
        console.error(err)
        return { status: 500, message: `Error in fetch: ${err.message}` };

    }
}
export { normaliseUrl, crawlPage };