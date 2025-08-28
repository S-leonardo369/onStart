const form = document.querySelector("form");

makeList()
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const url = normalizeUrl(document.getElementById("url").value);


    if (!name) {
        alert("Please enter a name.");
        return;
    }

    if (!url) {
        alert("Please enter a url.");
        return;
    }

    storeData(name, url);

});



function storeData(name, url) {
    const data = { name, url }; // store string identifier instead of actual function
    chrome.storage.local.get("submittedData", (result) => {
        const submittedData = result.submittedData || [];
        submittedData.push(data);
        chrome.storage.local.set({ submittedData }, () => {
            console.log("Data saved:", data);
        })
    });
    makeLi(name, url);
}

function removeItems(urlToRemove, nameToRemove) {
    chrome.storage.local.get("submittedData", (res) => {
        const arr = res.submittedData || [];
        const newArr = arr.filter(item => !(item.url === urlToRemove && item.name === nameToRemove));
        chrome.storage.local.set({ submittedData: newArr }, () => {
            console.log("Removed item:", { url: urlToRemove, name: nameToRemove });
        });
    });
}


function makeList() {
    chrome.storage.local.get("submittedData", (result) => {
        const submittedData = result.submittedData || [];
        for (const item of submittedData) {
            makeLi(item.name, item.url);
        }
    })
}

function makeLi(name, url) {
    const li = document.createElement("li");
    li.addEventListener("click", () => {
        li.remove();
        console.log(name, url);
        removeItems(url, name);
    });
    li.textContent = `${name} - ${url}`;
    document.querySelector("ul").appendChild(li);
}

function normalizeUrl(raw) {
    raw = raw.trim();
    if (!raw) return "";
    if (!/^https?:\/\//i.test(raw)) {
        return "https://" + raw;
    }
    return raw;
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




