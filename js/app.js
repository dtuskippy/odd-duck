
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
  this.votes = 0;

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
      liElem.textContent = `${allProducts[i].name} had ${allProducts[i].votes} votes, and was seen ${allProducts[i].views} times`;
      resultsList.appendChild(liElem);
    }
    resultsBtn.removeEventListener('click', handleShowResults);
  }

}

imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);

