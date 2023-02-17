fetch("http://localhost:5678/api/works", {
   method: "GET",
   headers: {
      Accept: "application/json",
   },

   body: JSON.stringify(),
})
   .then((response) => response.json())
   .then((result) => console.log(result));

const filtre1 = document.querySelector("#bloc-btn :nth-child(1)");
const filtre2 = document.querySelector("#bloc-btn :nth-child(2)");
const filtre3 = document.querySelector("#bloc-btn :nth-child(3)");
const filtre4 = document.querySelector("#bloc-btn :nth-child(4)");
let count = 0;

function selectFilter(numFilter) {
   let childNum = count + 1;

   document.querySelector("#bloc-btn :nth-child(" + childNum + ")").classList.remove("btn-selected");
   count = numFilter;

   childNum = count + 1;
   document.querySelector("#bloc-btn :nth-child(" + childNum + ")").classList.add("btn-selected");
}
