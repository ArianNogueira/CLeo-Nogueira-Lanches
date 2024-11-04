const menu = document.getElementById("menu");
const cardBtn = document.getElementById("card-btn");
const cardmodal = document.getElementById("card-modal");
const cardIntemsContainer = document.getElementById("card-items");
const cartTotal = document.getElementById("card-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-monal-btn");
const cardCounter = document.getElementById("card-count");
// const addressInput = document.getElementById("address");
// const addressWarn = document.getElementById("address-warn");
const details = document.getElementById("details");
const cardModalDetails = document.getElementById("modal-details");
const closeModalDetails = document.getElementById("close-modal-details");
const openClose = document.getElementById("open-closed");
const iconeX = document.getElementById("icone-x")
const iconeDetailsX = document.getElementById("icone-details-x")
const observation = document.getElementById("observation")

const pricesFrenchFries = document.querySelectorAll('input[name="price-french-fries"]')
const pricebroths = document.querySelectorAll('input[name="broth"]')

const nameWarn = document.getElementById("name-warn")
const nameInput = document.getElementById("name")

const selectBarbecues = document.querySelectorAll('input[name="barbecue"]')
const selectfriedPastrys = document.querySelectorAll('input[name="fried-pastry"]')

let card = [];

// Abrir Modal
cardBtn.addEventListener("click", function () {
    cardmodal.style.display = "flex";
    updateCardMOdal();
})

details.addEventListener("click", function () {
    cardModalDetails.style.display = "flex"
})

cardModalDetails.addEventListener("click", function (evento) {
    if (evento.target === cardModalDetails || evento.target === closeModalDetails || evento.target === iconeDetailsX) {
        cardModalDetails.style.display = "none";
    }
})

// Fechar Modal
cardmodal.addEventListener("click", function (evento) {
    if (evento.target === cardmodal || evento.target === closeModalBtn || evento.target === iconeX) {
        cardmodal.style.display = "none";
    }
})

// Função para pegar informações
menu.addEventListener("click", function (evento) {

    let parantBtn = evento.target.closest(".add-to-cart-btn");

    if (parantBtn) {
        const nome = parantBtn.getAttribute("data-name");
        const valor = parseFloat(parantBtn.getAttribute("data-price")).toFixed(2);
        const src = parantBtn.getAttribute("data-caminho");

        addCard(nome, valor, src);
    }

})

// Função para adicionar no carrinho
function addCard(nome, valor, src) {
    if (nome === "Caldo de Ovos") {
        nome = functionSelectPriceBroth();
        if(nome === null) {
            nullCase("do Caldo de Ovos")
            return;
        } else {
            const formatted = nome.split(' ')
            const selectPrice = parseFloat(formatted[3]).toFixed(2)
            valor = selectPrice;
        }
    }

    if (nome === "Churrasco") {
        nome = functionSelectBarbecue()
        if (nome === null) {
            nullCase("do Churrasco")
            return;
        }
    }

    if (nome === "Pastel") {
        nome = functionSelectfriedPastry();
        if (nome === null) {
            nullCase("do Pastel")
            return;
        }
    }

    if (nome === "Batata Frita") {
        nome = getFriesValue();
        if (nome === null) {
            nullCase("da Batata Frita")
            return
        } else {
            const formatted = nome.split(' ');
            const selectPrice = parseFloat(formatted[4]).toFixed(2)
            valor = selectPrice;
        }


    }

    const existingITem = card.find(item => item.nome === nome);
    if (existingITem) {
        existingITem.quantidade += 1;
    } else {
        card.push({
            src,
            nome,
            valor,
            quantidade: 1,
            observation
        })
    }
    updateCardMOdal();
}

function nullCase(name) {
    Toastify({
        text: `Por favor, selecione uma opção ${name}`,
        duration: 3000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#ef4444",
        },
    }).showToast()
    return;
}

function functionSelectPriceBroth() {
    let selectValue = null
    pricebroths.forEach(pricebroth => {
        if (pricebroth.checked) {
            selectValue = pricebroth.value;
            pricebroth.checked = ""
        }
    })
    return selectValue;
}

function functionSelectfriedPastry() {
    let selectValue = null
    selectfriedPastrys.forEach(selectfriedPastry => {
        if (selectfriedPastry.checked) {
            selectValue = selectfriedPastry.value;
            selectfriedPastry.checked = ""
        }
    })
    return selectValue;
}

function functionSelectBarbecue() {
    let selectValue = null
    selectBarbecues.forEach(selectBarbecue => {
        if (selectBarbecue.checked) {
            selectValue = selectBarbecue.value;
            selectBarbecue.checked = ""
        }

    })
    return selectValue;
}

function getFriesValue() {
    let selectValue = null
    pricesFrenchFries.forEach(priceFrenchFries => {
        if (priceFrenchFries.checked) {
            selectValue = priceFrenchFries.value;
            priceFrenchFries.checked = ""
        }
    })
    return selectValue;
}

function getBrothValue() {
    if (firstChecked.checked) {
        firstChecked.checked = ""
        return firstvalue;
    } else if (secondChecked.checked) {
        secondChecked.checked = ""
        return secondvalue;
    } else {
        Toastify({
            text: "Por favor, selecione uma opção para o Caldo",
            duration: 3000,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#ef4444",
            },
        }).showToast();
        return null;
    }
}

// Atualizar o carrinho
function updateCardMOdal() {
    cardIntemsContainer.innerHTML = "";
    let total = 0

    card.forEach((item) => {
        const carItemElement = document.createElement("div")

        // Criação do item selecionado
        carItemElement.innerHTML = `
            <div class="flex felx-col items-center justify-between">
                <div class="flex gap-x-5 items-center justify-center">
                    <img src="${item.src}" class="w-20 h-20 rounded" alt="icon">
                    <div class="flex flex-col gap-y-3">
                        <p class="font-bold">${item.nome}</p>
                        <p>R$ ${item.valor}</p>
                        <p class="mb-3 flex gap-3">Quantidade:
                            <button class="bg-[#d1c4ac] hover:bg-[#926e56] px-3 rounded less-btn">-</button>
                            ${item.quantidade}
                            <button class="bg-[#d1c4ac] hover:bg-[#926e56] px-3 rounded more-btn">+</button>
                        </p>
                    </div>
                </div>
                <button class="text-red-500 underline font-semibold remove-from-cart-btn" data-nome="${item.nome}">Remover</button>
            </div>
            <hr class="border-1 border-[#382110] py-1"/>
        `

        const lessBtn = carItemElement.querySelector(".less-btn");
        const moreBtn = carItemElement.querySelector(".more-btn");

        lessBtn.addEventListener("click", function () {
            // verifica se o item for menor que 1 e excluir do carrinho, do contránio apenas diminue a quantidade
            if (item.quantidade <= 1) {
                carItemElement.remove();
                const index = card.indexOf(item);
                if (index > -1) {
                    card.splice(index, 1);
                }
            }
            item.quantidade--;
        })

        // aumenta a quantidade do carrinho
        moreBtn.addEventListener("click", function () {
            return item.quantidade++
        })

        total += item.valor * item.quantidade;
        cardIntemsContainer.appendChild(carItemElement);
    })
    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    let totalItem = card.length
    cardCounter.innerHTML = totalItem
}


cardIntemsContainer.addEventListener("click", function (evento) {
    updateCardMOdal();

    // verifica se a classe atribuida ao botão e armazena o atributo do nome do alimento
    if (evento.target.classList.contains("remove-from-cart-btn")) {
        const nome = evento.target.getAttribute("data-nome")

        removeItemCart(nome);
    }
})

// Função para remover 
function removeItemCart(nome) {
    const index = card.findIndex(item => item.nome === nome)

    if (index !== -1) {
        card.splice(index, 1);
        if (card.length <= 0) {
            nameInput.value = " "
            // addressInput.value = ""
        }
        updateCardMOdal();
    }

}

// faz uma estilização caso o endereço não seja informado
// addressInput.addEventListener("input", function (evento) {
//     let inputValue = evento.target.value;

//     if (inputValue != "") {
//         addressInput.classList.remove("border-red-500");
//         addressWarn.classList.add("hidden");
//     }
// })

nameInput.addEventListener("input", function (evento) {
    let inputValeu = evento.target.value;
    if (inputValeu != "") {
        nameWarn.classList.remove("border-red-500");
        nameWarn.classList.add("hidden");
    }
})


// Finalizar pedido
checkoutBtn.addEventListener("click", function () {
    if (!isOpen) {
        Toastify({
            text: "Restaurante fechado no momento!",
            duration: 3000,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#ef4444",
            },
        }).showToast();

        return;
    }

    if (card.length === 0) return;


    if (nameInput.value === "") {
        nameWarn.classList.remove("hidden")
        nameWarn.classList.add("border-red-500")
        return;
    }

    // if (addressInput.value === "") {
    //     addressWarn.classList.remove("hidden")
    //     addressInput.classList.add("border-red-500")
    //     return;
    // }



    //Enviar o pedido para whats
    const cardItems = card.map((item) => {
        return (
            `
            *Produto*: ${item.nome}
            *Quantidade*: ${item.quantidade}
            *Total*: R$${(item.valor * item.quantidade).toFixed(2)}
            ----------------------------
            `
        )
    }).join("")

    // envio da mensagem para o whatsapp
    const totalPedido = card.reduce((acc, item) => acc + (item.valor * item.quantidade), 0).toFixed(2);
    const phone = "98984504091"
    // const endereco = addressInput.value;
    const menssage = encodeURIComponent(`
        *Novo Pedido Recebido!*
==============================
        *Cliente: ${nameInput.value}*
        ${cardItems}
        *Total do Pedido*: R$${totalPedido}
        *Observação*: ${observation.value}
    `)

    window.open(`https://wa.me/${phone}?text=${menssage}`, "_blank");

    card = []
    // addressInput.value = "";
    nameInput.value = "";
    observation.value = ""
    updateCardMOdal();
})


// Verificar horarario
function checkRestaurantOpen() {
    const data = new Date();
    const hora = data.getHours();
    const dia = data.getDay(0);

    return ((dia !== 0) && (hora >= 9 && hora < 13)) || ((dia !== 0) && (hora >= 18 && hora <= 22.30));
}

const spanItem = document.getElementById("details");
const isOpen = checkRestaurantOpen();
console.log(isOpen);


// faz uma estilização caso o restaurante esteja fechado
if (!isOpen) {
    checkoutBtn.style.cursor = "not-allowed";
    checkoutBtn.style.backgroundColor = "#382110";
    spanItem.style.backgroundColor = "#382110";
    openClose.style.backgroundColor = "red";
    openClose.textContent = "Fechado";
} 

