const product = {
  'crazy':{
    name:'Crazy',
    price:31000,
    amount:0,
    img:'images/products/burger-1.png',
    get totalSum() {
      return this.amount * this.price;
    }
  },
  'light':{
    name:'Light',
    price:26000,
    amount:0,
    img:'images/products/burger-2.png',
    get totalSum() {
      return this.amount * this.price;
    }
  },
  'cheeseburger':{
    name:'Cheeseburger',
    price:29000,
    amount:0,
    img:'images/products/burger-3.png',
    get totalSum() {
      return this.amount * this.price;
    }
  },
  'dburger':{
    name:'Dburger',
    price:24000,
    amount:0,
    img:'images/products/burger-4.png',
    get totalSum() {
      return this.amount * this.price;
    }
  },

}

// Ulanish

const wrapperBtn = document.querySelectorAll('.wrapper__list-btn');
const wrapperTotalPr = document.querySelector('.wrapper__navbar-totalprice');
const wrapChekMain = document.querySelector('.wrapper__navbar-checklist');
const cartCount = document.querySelector('.warapper__navbar-count');
const printBody = document.querySelector('.print__body');
const printFooter= document.querySelector('.print__footer');
const wapperBotBtn = document.querySelector('.wrapper__navbar-bottom')

// BACKET

const backetBtn = document.querySelector('.wrapper__navbar-btn');
const backetView = document.querySelector('.wrapper__navbar-basket');
const backetClose = document.querySelector('.wrapper__navbar-close');

  backetBtn.addEventListener('click', ()=>{
  backetView.classList.toggle('active');
})
  backetClose.addEventListener('click', ()=>{
  backetView.classList.remove('active');
})


// functional

wrapperBtn.forEach((btn)=>{
  btn.addEventListener('click',()=>{
    plusOrMinus(btn);
  })
})

function plusOrMinus(btn){
  let parrent = btn.closest('.wrapper__list-card');
  let parrentId = parrent.getAttribute('id');
  product[parrentId].amount++ ;

  backet() ;



}
function backet(){

  let productArr = [];

  for (const key in product) {

    let prKey = product[key];
    let prCard = document.querySelector(`#${key}`);
    let prIndecator = prCard.querySelector('.wrapper__list-count');

    if(prKey.amount){

      productArr.push(prKey);
      prIndecator.classList.add('active');
      prIndecator.innerHTML = prKey.amount;

    }else{

      prIndecator.classList.remove('active');
      prIndecator.innerHTML = '' ;

    }

  }

  const allCount = productCount();

  if (allCount) {

    cartCount.classList.add('active');

  }else{

    cartCount.classList.remove('active');

  }

  cartCount.innerHTML = allCount.toLocaleString();
  wrapperTotalPr.innerHTML = `${productAllpr().toLocaleString()} cyм`;
  wrapChekMain.innerHTML = '';


  for (let i = 0; i < productArr.length; i++) {

    wrapChekMain.innerHTML += cartProduct(productArr[i]);

  }

}

function productCount(){
  let total = 0;
  for (const key in product) {
    total += product[key].amount > 0 ? 1 : 0 ;
  }
  return total ;
}

function productAllpr(){
  let total = 0;
  for (const key in product) {
    total += product[key].totalSum;
  }
  return total ;
}

function cartProduct(productArr){

  const {name, img, totalSum, amount} = productArr;

  return `

  <div class="wrapper__navbar-view">

  <img class="wrapp__shop-img" src="${img}" alt="">
  <div class="wrapp__about">
      <h3 class="wrapp__about-name">${name}</h3>
      <p class="wrapp__about-prise">${totalSum.toLocaleString()}</p>
  </div>
  <div class="plus-or-muinus" id="${name.toLowerCase()}__card">
      <button class="plus-or-muinus__btn" data-symbol="-" >-</button>
      <span class="plus-or-muinus__text">${amount}</span>
      <button class="plus-or-muinus__btn" data-symbol="+" >+</button>
  </div>

</div>

  `
    
}

window.addEventListener('click',(e)=> {
  btn = e.target;
  if(btn.classList.contains('plus-or-muinus__btn')){
    const attr = btn.getAttribute('data-symbol');
    const parrent = btn.closest('.plus-or-muinus');
    if(parrent){
      const parrentId = parrent.getAttribute('id').split('__')[0];
      if(attr == '+') product[parrentId].amount++ ;
      else if (attr == '-') product[parrentId].amount-- ;

      backet();

    }

  }

})

wapperBotBtn.addEventListener('click',()=>{
  printBody.innerHTML = '';
  for (const key in product) {
    const {name, totalSum, amount} = product[key];
    if (amount) {
      printBody.innerHTML += `
      <div class="print__body-item">

      <p class="print__body-item_name ">
          <span class="name">${name}</span>
          <span class="count">${amount} шт: </span>
      </p>

      <p class="print__body-item_summ">

         ${totalSum.toLocaleString() } cyм ;
          
      </p>

  </div>
      `
    }
  }
  printFooter.innerHTML = `${productAllpr()} cyм`;
  window.print();
  location.reload();
})