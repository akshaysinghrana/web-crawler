const normaliseUrl = (url) => {
    try {
        const newUrl = new URL(url);
        return `${newUrl.protocol}//${newUrl.hostname}${newUrl.pathname}`;
    } catch (err) {
        console.log(`Error normalising URL: ${err.message}`);
        return null;
    }
};

const crawlPage = async (currUrl) => {
    const normalizedUrl = normaliseUrl(currUrl);
    if (!normalizedUrl) {
        return { status: 400, message: 'Invalid URL' };
    }

    try {
        const res = await fetch(normalizedUrl);
        const html = await res.text();

        if(res.status > 399) {
            return { status: res.status, message: `Error with status code: ${res.status}` };
        }

        const contentType = res.headers.get("content-type");
        if (!contentType || contentType.indexOf("text/html") === -1) {
            if (html.indexOf('<html') === -1 && html.indexOf('<!DOCTYPE html>') === -1) {
                return { status: 415, message: 'Unsupported Media Type' };
            }
        }

        return { status: 200, data: html };
    } catch (err) {
        return { status: 500, message: `Error in fetch: ${err.message}` };

    }
}
export { normaliseUrl, crawlPage };