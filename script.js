

function getCategories(categoryId) {
    fetch('https://magento-demo.tk/rest/V1/curs/categorii/' + categoryId, { method: 'GET' })
    .then((response) => response.json())
    .then((result) =>{
sessionStorage.setItem('categorii', JSON.stringify(result));
    })

};

if (!sessionStorage.getItem('categorii')){  //daca nu exista categorii luate de pe server, se executa getCategories 56
getCategories(56);
}



function getProducts(categoryId) {
    fetch('https://magento-demo.tk/rest/V1/curs/produse/' + categoryId, { method: 'GET' })
    .then((response) => response.json())
    .then((result) =>{
sessionStorage.setItem('products', JSON.stringify(result));

})};

if (!sessionStorage.getItem('products')){  //daca nu exista categorii luate de pe server, se executa getCategories 56
getProducts(56);
}


function getReviews(categoryId) {
    fetch('https://magento-demo.tk/rest/V1/curs/produse/' + categoryId, { method: 'GET' })
    .then((response) => response.json())
    .then((result) =>{
sessionStorage.setItem('products', JSON.stringify(result));

})};

if (!sessionStorage.getItem('products')){  //daca nu exista categorii luate de pe server, se executa getCategories 56
getProducts(56);
}

function categoriesHeader (){
    let meniu='';
    let categorii=JSON.parse(sessionStorage.getItem('categorii'));  
    if (categorii){
        categorii.forEach(function (categorie){
    meniu += '<li><a href="categoryId='+categorie.id+'">'+categorie.name+' </a></li>';
        });
        document.querySelector('li.shop ul').innerHTML=meniu;
    }
}
categoriesHeader();


const shop = document.querySelector('.shop');

shop.addEventListener('click', () => {
    if (shop.classList.contains('active')) {
        shop.classList.remove('active');
        document.querySelector('body').classList.remove('zeroscroll');
    } else {
        shop.classList.add('active');
        document.querySelector('body').classList.add('zeroscroll');
    }

})

// if (window.innerWidth < 1024) {
//     //cod sub 1024
//     console.log("123");
// }
// else {
//     //cod peste 1024
// }

// window.onresize = function () {
//     if (window.innerWidth < 1024) {
//         //aici vine codul sub 1024
//         console.log("456");
//     }
//     else {
//         //cod peste 1024
//     }
// };

function showMenu() {
    document.querySelector(".navigation").classList.toggle("active");
    document.querySelector(".fa-bars").classList.toggle("hide");
    document.querySelector(".fa-x").classList.toggle("show");

}
 