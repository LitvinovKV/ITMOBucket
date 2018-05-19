let allProducts = document.querySelectorAll(".Product");
let positionBasket = document.getElementById("Basket").getBoundingClientRect();
let catchProduct = false;
let div = undefined;
let offset = [0, 0];
let TotalPrice = 0;
let productsStartPosition = [];

for (var i = 0; i < allProducts.length; i++) {
    productsStartPosition[i] = {
        div : allProducts[i],
        x : allProducts[i].style.left,
        y : allProducts[i].style.top
    };

    allProducts[i].addEventListener("mousedown", function (e) {
        catchProduct = true;
        div = this;
        offset = [div.offsetLeft - e.clientX, div.offsetTop - e.clientY];
    }, true);

    allProducts[i].addEventListener("mouseup", function () {
    }, true);

    allProducts[i].addEventListener("click", function (e) {
        if (catchProduct == true) {
            catchProduct = false;
            checkProductInBasket(div);
        }
    }, true);

    allProducts[i].addEventListener("mousemove", function(e) {
        if (catchProduct == true) {
            div.style.left = (e.clientX + offset[0]) + 'px';
            div.style.top = (e.clientY + offset[1]) + 'px';
        }
    }, true)

    allProducts[i].addEventListener("mouseout", function() {
        if (catchProduct == true) {
            catchProduct = false;
            checkProductInBasket(div);
        }
    }, true)
}

function checkProductInBasket(div) {
    //проверить попал ли в корзину, если да, то удалить
    if ((div.offsetLeft >= positionBasket.left) && (div.offsetLeft <= positionBasket.right) &&
        (div.offsetTop >= positionBasket.top) && (div.offsetTop <= positionBasket.bottom)) {
            TotalPrice += parseInt(div.childNodes[1].textContent);
            console.log("Total Price = " + TotalPrice);
    }

    for (var i = 0; i < productsStartPosition.length; i++) {
        //проверить какой элемент был занесен в корзину
        if (productsStartPosition[i].div === div) {
            //задать ему начальную позицию
            div.style.left = productsStartPosition[i].x;
            div.style.top = productsStartPosition[i].y;
        }
    }
}