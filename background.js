/* chrome.runtime.onStartup.addListener(() => {
    console.log("Chrome just started!");
    chrome.tabs.create({ url: "https://youtube.com" });
});


chrome.runtime.onInstalled.addListener(() => {
    chrome.tabs.create({ url: "https://youtube.com" });
}); */



chrome.runtime.onStartup.addListener(() => {
    console.log("Chrome just started!");
    getStoredData(openTabs);
});

function getStoredData(openTabs) {
    chrome.storage.local.get("submittedData", (result) => {
        const submittedData = result.submittedData || [];
        openTabs(submittedData);
    });
}

function openTabs(data) {
    console.log("Opening tabs for:");
    data.forEach(web => {
        chrome.tabs.create({ url: web.url });
    });
}
