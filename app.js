const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const amount = document.querySelector(".amount input");
// Chart elements
//const chartCanvas = document.getElementById("historyChart");
//let historyChart;                                                                         

//  Fill dropdowns                                
for (let select of dropdowns) {
                                                      
    for (let currCode in countryList) {        

        let option = document.createElement("option");
        option.innerText = currCode;
        option.value = currCode;

        if (select.name === "from" && currCode === "USD") {
            option.selected = true;
        }

        if (select.name === "to" && currCode === "INR") {
            option.selected = true;
        }

        select.append(option);
    }

    select.addEventListener("change", (evt) => {         
        updateFlag(evt.target);
    });
}

// Update exchange rate  
const updateExchangeRate = async () => {

    let amtVal = amount.value;

    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = 1;
    }

    const URL =
`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    let data = await response.json();

    let rate =
data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmount = amtVal * rate;

    msg.innerText =
`${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
};

// Update flag                             
const updateFlag = (element) => {

    let currCode = element.value;
    let countryCode = countryList[currCode];

    let img = element.parentElement.querySelector("img");

    img.src =
`https://flagsapi.com/${countryCode}/flat/64.png`;
};

//  Button click                                    
btn.addEventListener("click", (evt) => {
 evt.preventDefault();
updateExchangeRate(); 
}); 
//btn.addEventListener("click", async (evt) => {
//   evt.preventDefault();

//    await updateExchangeRate();
//    await loadHistoricalChart();
//}); 



//Load default rate 
window.addEventListener("load", () => {
  updateExchangeRate();
});                                                      
window.addEventListener("load", async () => {

    await updateExchangeRate();
    await loadHistoricalChart();
});    
// ---------------- Auto Update on Currency Change ----------------
//dropdowns.forEach((select) => {

//select.addEventListener("change", async () => {
//updateFlag(select);
//await updateExchangeRate();
//await loadHistoricalChart();
//});
//});
