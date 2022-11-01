let container = document.getElementById("container");

let basket = JSON.parse(localStorage.getItem("data")) || [];
let   generateshop = () => {
    return (container.innerHTML = shopitemsdata.map((x)=>{
        let { id, name, price, desc, img } = x;
        let search = basket.find( (x)=>x.id === id ) || [];
        return `
        <div class="cards" id=product-id-${id}>
            <img width="100%" height="220" src=${img} alt="babolat">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})"  class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">
                        ${search.item === undefined ? 0 :search.item}
                        </div>
                        <i onclick="increment(${id})"  class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>
        `;
    }).join(""));
};
generateshop();

let increment = (id) => {
    let selecteditem = id;
    let search = basket.find((x)=>x.id === selecteditem.id);
    if(search === undefined){
        basket.push({
            id: selecteditem.id,
            item: 1,
        });
    }
    else {
        search.item+=1;
    }
    // console.log(basket);
    update(selecteditem.id);
    localStorage.setItem("data",JSON.stringify(basket));

};
let decrement = (id) => {
    let selecteditem = id;
    let search = basket.find((x)=> x.id === selecteditem.id);
    if(search === undefined) return;
    else if(search.item === 0) return;
    else {
        search.item-=1;
    }
    update(selecteditem.id);
    basket = basket.filter((x)=>x.item !== 0);
    // console.log(basket);

    localStorage.setItem("data",JSON.stringify(basket));

};
let update = (id) => {
    let search = basket.find((x)=>x.id === id);
console.log(search.item);
document.getElementById(id).innerHTML = search.item;
calculation();
};
let calculation = () => {
    let carticon = document.getElementById("cartamount");
    carticon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=> x + y ,0 );
};
calculation();