let allProducts = document.querySelectorAll(".Product");
let positionBasket = document.getElementById("Basket").getBoundingClientRect();
let catchProduct = false;
let div = undefined;
let offset = [0, 0];
let TotalPrice = 0;
let productsStartPosition = [];
let Cash = 0;

for (var i = 0; i < allProducts.length; i++) {
    productsStartPosition[i] = {
        div : allProducts[i],
        x : allProducts[i].style.left,
        y : allProducts[i].style.top,
        cost : (i + 1) * 10,
        count : 0
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
    let flag = false;
    //проверить попал ли в корзину, если да, то удалить
    if ((div.offsetLeft >= positionBasket.left) && (div.offsetLeft <= positionBasket.right) &&
        (div.offsetTop >= positionBasket.top) && (div.offsetTop <= positionBasket.bottom) && 
        (Cash >= parseInt(div.childNodes[1].textContent))) {
            TotalPrice += parseInt(div.childNodes[1].textContent);
            console.log("Total Price = " + TotalPrice);
            Cash -= parseInt(div.childNodes[1].textContent);
            console.log("Your cash = " + Cash);
            flag = true;
    }
    else {
        alert("Вы не попали в корзину или у Вас недостаточно средств!");
    }

    for (var i = 0; i < productsStartPosition.length; i++) {
        //проверить какой элемент был занесен в корзину
        if (productsStartPosition[i].div === div) {
            //задать ему начальную позицию
            div.style.left = productsStartPosition[i].x;
            div.style.top = productsStartPosition[i].y;
            if (flag == true) {
                productsStartPosition[i].count++;
                let data = div.textContent.split(" ");
                let flagAdd = false;
                let childrenBasket = document.getElementById("Basket").children;
                for (var j = 0; j < childrenBasket.length; j++) {
                    //если такой товар уже имеется в корзине, тогда изменить count
                    if (childrenBasket[j].textContent.split(' ')[1] === data[1]) {
                        childrenBasket[j].textContent = data[0] + " " + data[1] + " Count : " + productsStartPosition[i].count;
                        flagAdd = true;
                        break;
                    }
                }
                // если flag не поменялся => такого товара в корзине нет, то добавить его в конец списка
                if (flagAdd === false) {
                    let localDiv = document.createElement('div');
                    localDiv.className = "ProductIntBasket";
                    localDiv.innerHTML = data[0] + " " + data[1] + " Count : " + productsStartPosition[i].count;
                    document.getElementById("Basket").appendChild(localDiv);
                }
            }
        }
    }
}

function setCash() {
    for (var i = 0; i < productsStartPosition.length; i++)
        productsStartPosition[i].count = 0;
    if (document.getElementById("Basket").childElementCount > 0) {
        while (document.getElementById("Basket").childElementCount != 0) {
            document.getElementById("Basket").removeChild(document.getElementById("Basket").lastChild);
        }
    }
    TotalPrice = 0;
    console.clear();
    Cash = document.getElementById("CountCash").value;
    console.log("Your cahse = " + Cash + "$");
}
