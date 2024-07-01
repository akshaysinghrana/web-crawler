export const handleError = (errorMsg="Server Error", statusCode=500) => {
    console.error(`Error with status code: ${statusCode}, Error: ${errorMsg}`);
    return { status: statusCode, message: errorMsg };
};

export const handleSuccess = (successData="Data Fetched Successfully", statusCode=200) => {
    console.log(`Request Fetched Successfully with status code: ${statusCode}`);
    return { status: statusCode, data: successData };
}