

function getCategories(categoryId) {
    fetch('https://magento-demo.tk/rest/V1/curs/categorii/' + categoryId, { method: 'GET' })
        .then((response) => response.json())
        .then((result) => {
            sessionStorage.setItem('categorii', JSON.stringify(result));
        })

};

if (!sessionStorage.getItem('categorii')) {  //daca nu exista categorii luate de pe server, se executa getCategories 56
    getCategories(56);
}



function getProducts(categoryId) {
    fetch('https://magento-demo.tk/rest/V1/curs/produse/' + categoryId, { method: 'GET' })
        .then((response) => response.json())
        .then((result) => {
            sessionStorage.setItem('products', JSON.stringify(result));

        })
};

if (!sessionStorage.getItem('products')) {  //daca nu exista categorii luate de pe server, se executa getCategories 56
    getProducts(56);
}


function getReviews(categoryId) {
    fetch('https://magento-demo.tk/rest/V1/curs/produse/' + categoryId, { method: 'GET' })
        .then((response) => response.json())
        .then((result) => {
            sessionStorage.setItem('products', JSON.stringify(result));

        })
};

if (!sessionStorage.getItem('products')) {  //daca nu exista categorii luate de pe server, se executa getCategories 56
    getProducts(56);
}

function categoriesHeader() {
    let meniu = '';
    let categorii = JSON.parse(sessionStorage.getItem('categorii'));
    if (categorii) {
        categorii.forEach(function (categorie) {
            meniu += '<li><a href="?categoryId=' + categorie.id + '">' + categorie.name + ' </a></li>';
        });
        document.querySelector('li.shop ul').innerHTML = meniu;

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



function showMenu() {
    document.querySelector(".navigation").classList.toggle("active");
    document.querySelector(".fa-bars").classList.toggle("hide");
    document.querySelector(".fa-x").classList.toggle("show");

}

function productsHtml() {
    let finalPrice = '';
    let saleLabel = '';
    let items = '';

    const ingredientsTitle = document.querySelector('.ingredients');
    let nutritionBenefits = '';
    const nutrition = document.querySelector('.nutrition');
    let healthBenefits = '';
    const healthBen = document.querySelector('.healthbenefits');


    let products = JSON.parse(sessionStorage.getItem('products'));

    let sku = window.location.search ? window.location.search.replace('?sku=', '') : '';  //opertori ternari , daca conditia este adevarata, apelam prima parte, intre semnul intrebarii si :, daca nu e adevarata se va apela ce este dupa :, adica nimic in cazul nostru
    console.log(sku);
    if (sku) {
        items = Object.values(products).filter(function (product) {


            if (Object.values(product)[0].sku.includes(sku)) {
                return product;
            }

        })
        console.log(items)

    } else {
        items = products
    }

    items.forEach(function (product) {
        const productFinal = product[Object.keys(product)[0]];

        if (Number(productFinal.final_price) < Number(productFinal.price)) {

            document.querySelector('.normalprice').innerHTML = productFinal.price;
            document.querySelector('.finalprice').innerHTML = productFinal.final_price;

            saleLabel = '<span class="sale">Sale</span>'
        }
        else {
            document.querySelector('.normalprice').innerHTML = productFinal.price;
            document.querySelector('.finalprice').remove;
            saleLabel = '';
        }

        document.querySelector('.title h2').innerHTML = productFinal.name;
        document.querySelector('.homepage span').innerHTML = productFinal.name;

        document.querySelector('.titleimg img').setAttribute('src', 'https://magento-demo.tk/media/catalog/product' + productFinal.image);
        document.querySelector('.titleimg img').setAttribute('alt', productFinal.name);


        if (productFinal.stock_status === "0") {
            document.querySelector('.instock h5').setAttribute('class', 'notinstock');
            document.querySelector('.instock h5').innerHTML = 'Not In Stock'
        }
        else {

            document.querySelector('.instock h5').innerHTML = 'In Stock'
        }

        document.querySelector('.normalprice').innerHTML = productFinal.price;

        if (productFinal.price > productFinal.final_price) {
            document.querySelector('.finalprice').innerHTML = productFinal.final_price;
        }

        if (productFinal.short_description === null) {
            document.querySelector('.description p').innerHTML = productFinal.description.substring(0, 250);


        } else {
            document.querySelector('.description p').innerHTML = productFinal.short_description;

        }


        if (productFinal.ingredients === null) {
            ingredientsTitle.remove();
            document.querySelector(".accordion__title").classList.add("active");

        }
        else {
            document.querySelector('.ingrediente li').innerHTML = productFinal.ingredients;

        }


        if (productFinal.nutritional_information === null) {
            nutrition.remove();
            document.querySelector(".accordion__title").classList.add("active");

        }
        else {
            document.querySelector('.nutritie').innerHTML = productFinal.nutritional_information; /// RTEBUIE SCHIMBAT DUPA CE VAD CE FEL DE DATA IMI VIN DE PE SERVER

        }


        if (productFinal.health_benefits === null) {
            healthBen.remove();
            document.querySelector(".accordion__title").classList.add("active");


        }
        else {
            document.querySelector('.beneficii ul').innerHTML = productFinal.health_benefits;
        }


            if (productFinal.ingredients === null) {
                ingredientsTitle.remove();
                document.querySelector(".accordion__title").classList.add("active");

            }
            else {
                ingredients += '<li>' + productFinal.ingredients + '</li>';
            }


            if (productFinal.nutritional_information === null) {
                nutrition.remove();
                document.querySelector(".accordion__title").classList.add("active");

            }
            else {
                nutritionBenefits += '<li>' + productFinal.nutritional_information + '</li>';
            }


            if (productFinal.health_benefits === null) {
                healthBen.remove();
                document.querySelector(".accordion__title").classList.add("active");


            }
            else {
                healthBenefits += '<ul>' + productFinal.health_benefits + '</ul>';
            }
        });
}




const intervalProduse = setInterval(function () {
    if (sessionStorage.getItem('products')) {
        productsHtml();
        clearInterval(intervalProduse);

    }
}, 200);



document.querySelector(".accordion__title").classList.add("active");
document.onclick = function (event) {
    if (event.target.classList.contains("accordion__title")) {
        if (event.target.classList.contains("active")) {
            event.target.classList.remove("active");
        }
        else {
            document.querySelector(".accordion__title.active").classList.remove("active");
        }
        event.target.classList.add("active");

    }
};

var minus = document.querySelector(".fa-minus");
var add = document.querySelector(".fa-plus");
var quantity = document.querySelector(".quantity1");

// includes button minus disablement if at minimum or below
const minimum = 1;

minus.addEventListener("click", function () {
    if (quantity.value <= minimum) {
        minus.disabled = true;
        return; // return to avoid decrementing
    } else {
        minus.disabled = false;
    }
    quantity.value--;
});

add.addEventListener("click", function () {
    if (quantity.value > minimum) {
        minus.disabled = false;
    }
    quantity.value++;
});

// // La description se adauga short_description.
// In cazul in care nu exista short description se iau ~250 caractere din description.

// de schimbat codul de la produse pentru html

// flex-carduri definit acelasi width la toate @media,   width in %

