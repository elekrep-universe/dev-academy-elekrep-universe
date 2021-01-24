"use strict";

const request = fetch("names.json")
  .then(function (response) {
    //console.log(response);
    return response.json();
  })
  .then(function (data) {
    jsonData(data);
  });

const containernames = document.querySelector(".names");
const search = document.querySelector(".search-button");
const inputValue = document.querySelector(".input-field");
const searchResult = document.querySelector(".search_result");
const order = document.querySelector(".sort-button");
let namesArray = [];
let amountArray = [];
let jsonString = [];

//Sort amount largest first
function orderJson(file) {
  let jsonSorted = file.names.sort((a, b) => b.amount - a.amount);
  return jsonSorted;
}

//print json file to UI
function jsonData(data) {
  jsonString = orderJson(data);
  containernames.innerHTML = "";

  //loop json
  for (const [i, { name, amount }] of jsonString.entries()) {
    const html = `<div class="names__row"> <div class="names__type">${i + 1}. ${
      jsonString[i].name
    }</div> <div class="names__value">${jsonString[i].amount}</div> </div>`;
    containernames.insertAdjacentHTML("beforeend", html);

    //store names and values to separate arrays
    namesArray.push(jsonString[i].name);
    amountArray.push(jsonString[i].amount);
  }

  const total = amountArray.reduce(function (a, b) {
    return a + b;
  });
  //sum of names amount
  document.querySelector(".amountTotal").textContent = `${total} total`;
  document.querySelector(
    ".amountNames"
  ).textContent = `${namesArray.length} names`;
}
//first letter capitalize lower case rest
function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

//search amount of single name
search.addEventListener("click", function () {
  //e.preventDefault();
  inputValue.value = capitalize(inputValue.value);

  const indexNumber = namesArray.indexOf(inputValue.value);
  if (indexNumber >= 0) {
    document.querySelector(
      ".search_result"
    ).textContent = `There is ${amountArray[indexNumber]} ${inputValue.value}'s`;
  } else {
    document.querySelector(".search_result").textContent =
      "Not a valid name. Choose name from the list";
  }
});
