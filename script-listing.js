
function categoriesSlider() {
    let slide = '';
    let categorii = JSON.parse(sessionStorage.getItem('categorii'));
    if (categorii) {
        categorii.forEach(function (categorie) {
            slide += '<li class="glide__slide"><a href="categoryId=' + categorie.id + '"><img src="https://magento-demo.tk/' + categorie.imageUrl + '">' + categorie.name + ' </a></li>';
        });
        document.querySelector('.glide__slides').innerHTML = slide;

        new Glide('.glide', {
            type: 'carousel',
            perView: 5,
            gap: 20,
            breakpoints: {
                580: {
                    perView: 1
                },
                768: {
                    perView: 2
                },
                1024: {
                    perView: 3
                },
                1200: {
                    perView: 4
                }
            }
        }).mount()
    }
}

const intervalCategorii = setInterval(function () {
    if (sessionStorage.getItem('categorii')) {
        categoriesSlider();

        clearInterval(intervalCategorii);
    }
}, 200);


let ItemsPerPage = sessionStorage.getItem('ItemsPerPage');
if (ItemsPerPage) {
    document.querySelector('.dropdown-content').value = ItemsPerPage;
}
document.querySelector('.dropdown-content').addEventListener('change', (event) => {
    sessionStorage.setItem('ItemsPerPage', event.target.value)
    window.location.reload()

});










function productsHtml() {
    let productTemplate = '';
    let finalPrice = '';
    let saleLabel = '';
    let items ='';
    let products = JSON.parse(sessionStorage.getItem('products'));

    let categoryId = window.location.search ? window.location.search.replace('categoryId=', '') : '';  //opertori ternari , daca conditia este adevarata, apelam prima parte, intre semnul intrebarii si :, daca nu e adevarata se va apela ce este dupa :, adica nimic in cazul nostru

    if (categoryId) {
        items = Object.values(products).filter(function(product) {

        
        if (Object.values(product)[0].category_id.includes(categoryId)) {
            return product;
        }
        
        })
    console.log(items)
    
    } else {
         items =products
    }
    
    items.forEach(function (product) {
        const productFinal = product[Object.keys(product)[0]];
        if (Number(productFinal.final_price) < Number(productFinal.price)) {

            finalPrice = '<p class="finalprice">' + productFinal.final_price + '</p>';
            saleLabel = '<span class="sale">Sale</span>'
        }
        else {
            finalPrice = '';
            saleLabel = '';
        }
        productTemplate +=
            '<div class="card">' +
            '<a href="product.html?sku=' + productFinal.sku + '">' +
            '<img src="https://magento-demo.tk/media/catalog/product' + productFinal.image + '" alt="' + productFinal.name + '">' + saleLabel + '</a>' +
            '<div class="cardinfo">' +
            '<a href="productFinal.html?sku=' + productFinal.sku + '">' +
            '<h4>' + productFinal.name + '</h4></a>' +
            '<h5>' + productFinal.weight + '</h5>' +
            '<div class="card-overlap">' +
            '<div class="review">' +
            '<i class="stars"></i>' +
            '<i class="stars full" style="width: 80%;"></i>' +
            '</div>' +
            '<div class="price">' +
            finalPrice +
            '<p class="normalprice">' + productFinal.price + '</p>' +
            '</div>' +
            '</div >' +
            '</div>' +
            '</div>';
    });

    document.querySelector('.fruits').innerHTML = productTemplate;



}

const intervalProduse = setInterval(function () {
    if (sessionStorage.getItem('products')) {
        productsHtml();
        clearInterval(intervalProduse);

    }
}, 200);



