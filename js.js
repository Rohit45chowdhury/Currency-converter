const BASE_URL ="https://api.exchangerate-api.com/v4/latest/USD";


 const dropdowns = document.querySelectorAll(".dropdown select");
 const btn = document.querySelector("form button");
 const fromCurr = document.querySelector(".from select");
 const toCurr = document.querySelector(".to select");
 const msg = document.querySelector(".msg");
 
   
 
 for (let select of dropdowns) {
   for (let currCode in countryList) {
     let newOption = document.createElement("option");
     newOption.innerText = currCode;
     newOption.value = currCode;
     if (select.name === "from" && currCode === "USD") {
       newOption.selected = "selected";
     } else if (select.name === "to" && currCode === "INR") {
       newOption.selected = "selected";
      }
      select.append(newOption);
    }
    
    select.addEventListener("change", (evt) => {
      updateFlag(evt.target);
    });
  }
  

  
  const calculation = (data)=> {
    let fromBase = data.rates[fromCurr.value];
    let toBase = data.rates[toCurr.value];
    let rate = toBase / fromBase;
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    let finalResult = amtVal*rate;

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalResult} ${toCurr.value}`;
 }
 const updateExchangeRate = async () => { 
   let amount = document.querySelector(".amount input");
   let amtVal = amount.value;
   if (amtVal === "" || amtVal < 0) {
     amtVal = 1;
     amount.value = "1";
   }

   let response = await fetch(BASE_URL);
   let data = await response.json();
   console.log(data);
   calculation(data);
 };
 
 const updateFlag = (element) => {
   let currCode = element.value;
   let countryCode = countryList[currCode];
   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
   let img = element.parentElement.querySelector("img");
   img.src = newSrc;
 };
 
 btn.addEventListener("click", (evt) => {
   evt.preventDefault();
   updateExchangeRate();
 });
 
 window.addEventListener("load", () => {
   updateExchangeRate();
 });