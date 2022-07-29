
'use strict';

let totalVotes = 25;
let allProducts = [];
let productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu','dog-duck', 'dragon','pen', 'pet-sweep','scissors', 'shark','sweep', 'tauntaun','unicorn', 'water-can','wine-glass'];

let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultsBtn = document.getElementById('show-results-btn');

let retrievedProducts = localStorage.getItem('myProducts');
console.log('retrievedProducts', retrievedProducts);
let parsedProducts = JSON.parse(retrievedProducts);
console.log('parsed Products >>> ', parsedProducts);

function Product(name, photoExtension = 'jpg'){
  this.name = name;
  this.photo = `img/${name}.${photoExtension}`;
  this.views = 0;
  this.votes = 0;

  allProducts.push(this);
}

if(retrievedProducts) {
  allProducts = parsedProducts;
} else {
  for(let i = 0; i < productNames.length; i++){
    if(productNames[i] === 'sweep'){
      new Product(productNames[i], 'png');
    }else{
      new Product(productNames[i]);
    }
  }
}

function randomIndexGenerator(){
  return Math.floor(Math.random() * allProducts.length);
}


let productIndexArr = [];

function renderImgs(){
  while(productIndexArr.length < 6){
    let randomNum = randomIndexGenerator();
    if(!productIndexArr.includes(randomNum)){
    productIndexArr.push(randomNum);
    }
  }

  let imgOneIndex = productIndexArr.shift();
  let imgTwoIndex = productIndexArr.shift();
  let imgThreeIndex = productIndexArr.shift();

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
    let stringifiedProducts = JSON.stringify(allProducts);
    console.log('stringified Products >>>', stringifiedProducts);
    localStorage.setItem('myProducts', stringifiedProducts);
    imgContainer.removeEventListener('click', handleClick);
  }
}

function handleShowResults(){
  if(totalVotes === 0){
    renderChart();
    resultsBtn.removeEventListener('click', handleShowResults);
  }
}

let canvasElem = document.getElementById('my-chart');

function renderChart() {
  let productNames = [];
  let productVotes = [];
  let productViews = [];

  for(let i = 0; i < allProducts.length; i++){
    productNames.push(allProducts[i].name);
    productVotes.push(allProducts[i].votes);
    productViews.push(allProducts[i].views);
  }

let myObject = {
  type: 'bar',
  data: {
      labels: productNames,
      datasets: [{
          label: '# of Votes',
          data: productVotes,
          backgroundColor: [
              'rgba(255, 204, 0, 0.8)',
              'rgba(255, 204, 0, 0.8)',
              'rgba(255, 204, 0, 0.8)',
              'rgba(255, 204, 0, 0.8)',
              'rgba(255, 204, 0, 0.8)',
              'rgba(255, 204, 0, 0.8)'
          ],
          borderColor: [
              'rgba(0, 51, 102, 1)',
              'rgba(0, 51, 102, 1)',
              'rgba(0, 51, 102, 1)',
              'rgba(0, 51, 102, 1)',
              'rgba(0, 51, 102, 1)',
              'rgba(0, 51, 102, 1)'
          ],
          borderWidth: 1
      },
      {
        label: '# of Views',
        data: productViews,
        backgroundColor: [
            'rgba(204, 204, 204, 0.8)',
            'rgba(204, 204, 204, 0.8)',
            'rgba(204, 204, 204, 0.8)',
            'rgba(204, 204, 204, 0.8)',
            'rgba(204, 204, 204, 0.8)',
            'rgba(204, 204, 204, 0.8)'
        ],
        borderColor: [
            'rgba(0, 51, 102, 1)',
            'rgba(0, 51, 102, 1)',
            'rgba(0, 51, 102, 1)',
            'rgba(0, 51, 102, 1)',
            'rgba(0, 51, 102, 1)',
            'rgba(0, 51, 102, 1)'
        ],
        borderWidth: 1
    }

    ],
      
  },
  
  options: {
      scales: {
          y: {
              beginAtZero: true
          }
      }
  }
}
  new Chart(canvasElem, myObject);
}

imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);

