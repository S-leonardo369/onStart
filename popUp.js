const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const url = document.getElementById("url").value;
    const func = document.getElementById("func").value;

    const li = document.createElement("li");
    li.textContent = `${name} - ${url} [${func}]`;
    document.querySelector("ul").appendChild(li);


    storeData(name, url, func);

});



function storeData(name, url, funcName) {
    const data = { name, url, funcName }; // store string identifier instead of actual function
    chrome.storage.local.get("submittedData", (result) => {
        const submittedData = result.submittedData || [];
        submittedData.push(data);
        chrome.storage.local.set({ submittedData }, () => {
            console.log("Data saved:", data);
        });
    });
}

/* 
function storeData(name, url, func) {
    const data = { name, url, func };
    chrome.storage.local.get("submittedData", (result) => {
        const submittedData = result.submittedData || [];
        submittedData.push(data);
        chrome.storage.local.set({ submittedData });
    });
} */




