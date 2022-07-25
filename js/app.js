
'use strict';


let totalVotes = 25;
let allProducts = [];
let productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu','dog-duck', 'dragon','pen', 'pet-sweep','scissors', 'shark','sweep', 'tauntaun','unicorn', 'water-can','wine-glass'];


let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultsBtn = document.getElementById('show-results-btn');
let resultsList = document.getElementById('results-list');



function Product(name, photoExtension = 'jpg'){
  this.name = name;
  this.photo = `img/${name}.${photoExtension}`;
  this.views = 0;
  this.votes = 0

  allProducts.push(this);
}

for(let i = 0; i < productNames.length; i++){
  if(productNames[i] === 'sweep'){
    new Product(productNames[i], 'png');
  }else{
    new Product(productNames[i]);
  }
}

function randomIndexGenerator(){
  return Math.floor(Math.random() * allProducts.length);
}



function renderImgs(){
  let imgOneIndex = randomIndexGenerator();
  let imgTwoIndex = randomIndexGenerator();
  let imgThreeIndex = randomIndexGenerator();

  while(imgOneIndex === imgTwoIndex || imgOneIndex === imgThreeIndex || imgTwoIndex === imgThreeIndex) {
    imgTwoIndex = randomIndexGenerator();
  }

  imgOne.src = allProducts[imgOneIndex].photo;
  imgOne.alt = allProducts[imgOneIndex].name;
  imgOne.name = allProducts[imgOneIndex].name;
  allProducts[imgOneIndex].views++;

  imgTwo.src = allProducts[imgTwoIndex].photo;
  imgTwo.alt = allProducts[imgTwoIndex].name;
  imgTwo.name = allProducts[imgTwoIndex].name;
  allProducts[imgTwoIndex].views++;

  imgThree.src = allProducts[imgThreeIndex].photo;
  imgThree.alt = allProducts[imgThreeIndex].name;
  imgThree.name = allProducts[imgThreeIndex].name;
  allProducts[imgThreeIndex].views++;

}

renderImgs();

function handleClick(event){
  let imgClicked = event.target.alt;

  for(let i = 0; i < allProducts.length; i++){
    if(imgClicked === allProducts[i].name){
      allProducts[i].votes++;
    }
  }
  totalVotes--;
  
  renderImgs();

  if(totalVotes === 0){
    imgContainer.removeEventListener('click', handleClick);
  }
}

function handleShowResults(){
  if(totalVotes === 0){
    for(let i = 0; i < allProducts.length; i++){
      let liElem = document.createElement('li');
      // liElem.textContent = `${allProducts[i].name} had ${allProducts[i].votes} votes, and was seen ${allProducts[i].views} times`;
      liElem.textContent = 'Hello!!!';
      resultsList.appendChild(liElem);
    }
    resultsBtn.removeEventListener('click', handleShowResults);
  }

}

imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);
// 1.
// •	Create an algorithm that will randomly generate three unique product images from the images directory and display them side-by-side-by-side in the browser window.
//     ===> randomizer somehow
//     ===> render somehow (separate methods for randomizer and render?)
// •	For each of the three images, increment its property of times it has been shown by one.
//     ===> for loop counter --- goes to an array or an object?
// •	Attach an event listener to the section of the HTML page where the images are going to be displayed.
// •	Once the users ‘clicks’ a product, generate three new products for the user to pick from.

//2.	As a user, I would like to track the selections made by viewers so that I can determine which products to begin production on.
// •	In the constructor function define a property to hold the number of times a product has been clicked.
//      ===> different than how many times it has been shown; same questions ==> for loop counter, but array or object
// •	After every selection by the viewer, update the newly added property to reflect if it was clicked.

//3.	As a user, I would like to control the number of rounds a user is presented with so that I can control the voting session duration.
// •	By default, the user should be presented with 25 rounds of voting before ending the session.
// •	Keep the number of rounds in a variable to allow the number to be easily changed for debugging and testing purposes.
//      ===> Re. # of rounds, this means they can go above 25? we assume they may do any number below 25?
//      ===> I assume this is a for loop wiht a limit of 25...? or could it be a while loop with a 25 limit that keeps going till it's stopped

//4.	As a user, I would like to view a report of results after all rounds of voting have concluded so that I can evaluate which products were the most popular.
// •	Create a property attached to the constructor function itself that keeps track of all the products that are currently being considered.
//      ===> need to understand the ask here better -- doesn't sound like a counter though, more like a push to an array, or just adding to an object (seems like an array)
// •	After voting rounds have been completed, remove the event listeners on the product.
//      ===> this is the reset ?attribute?
// •	Add a button with the text View Results, which when clicked displays the list of all the products followed by the votes received, and number of times seen for each. Example: banana had 3 votes, and was seen 5 times.
//      ===> another event listener...and render...with obvious interaction construtor function / methods
// 1.	NOTE: Displayed product names should match the file name for the product. Example: the product represented with dog-duck.jpg should be displayed to the user as exactly “dog-duck” when the results are shown.
//        ===> OK -- seems easy or am I missing something hard here?






















// let salesDataArr = [];
// let storesArr = [];

// function Store(location, minCust, maxCust, aveCookieSale){
//   this.location = location;
//   this.minCust = minCust;
//   this.maxCust = maxCust;
//   this.aveCookieSale = aveCookieSale;
//   this.openingHour = 6;
//   this.closingHour = 19;
//   this.salesData = 0;

//   salesDataArr.push(this.salesCount());
//   storesArr.push(this);
// }

// Store.prototype.customerCalc = function(){
//   return Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
// }

// Store.prototype.salesCount = function(){
//   let arr = [];
//   let total = 0;  
//     for(let i = this.openingHour; i <= this.closingHour; i++) {
//         let obj = {};
//         let salesCalc = Math.floor(this.customerCalc() * this.aveCookieSale);
//         total += salesCalc;
//           if(i < 12) {
//             obj[i + "am"] = salesCalc;
//           } else if(i === 12){
//             obj[i + "pm"] = salesCalc;
//           }else {
//             obj[i - 12 + "pm"] = salesCalc;
//           }
//             arr.push(obj);
//     }
//     let totObj = {};
//     totObj['Total'] = total;
//     arr.push(totObj);
//     return arr;
// }

// Store.prototype.render = function(){
    
//   let tBodyElem = document.createElement('tbody');
//   salesTable.appendChild(tBodyElem);

//   let tRowElem = document.createElement('tr');
//   tBodyElem.appendChild(tRowElem);
  
//   let tHElem = document.createElement('th');
//   tHElem.textContent = `${this.location}`;
//   tRowElem.appendChild(tHElem);
 
//   for(let i = 0; i < this.salesData.length; i++){
//     let innerObj = this.salesData[i];
//     for(let key in innerObj) {
//       let tDElem = document.createElement('td');
//       tDElem.textContent = `${innerObj[key]}`;
//       tRowElem.appendChild(tDElem);
//      }
//   }
// }

// let storeForm = document.getElementById('store-form');

// function handleSubmit(event) {
//   event.preventDefault();
//   let location = event.target.location.value;
//   let minCust = +event.target.minCust.value;
//   let maxCust = +event.target.maxCust.value;
//   let aveCookieSale = +event.target.aveCookieSale.value;
//   let newStore = new Store(location, minCust, maxCust, aveCookieSale);
//   salesTable.deleteTFoot();
//   storesArr[storesArr.length-1].salesData = salesDataArr[salesDataArr.length-1];
//   storesArr[storesArr.length-1].render();
//   renderFooter();
//   document.getElementById('store-form').reset();

// }

// storeForm.addEventListener('submit', handleSubmit);


// let seattle = new Store('Seattle', 23, 65, 6.3);
// let tokyo = new Store('Tokyo', 3, 24, 1.2);
// let dubai = new Store('Dubai', 11, 38, 3.7);
// let paris = new Store('Paris', 20, 38, 2.3);
// let lima = new Store('Lima', 2, 16, 4.6);

// for(let i = 0; i < storesArr.length; i++) {
//   storesArr[i].salesData = salesDataArr[i];
//   storesArr[i].render();
// }

// renderHeader();
// renderFooter();

