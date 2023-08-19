
import { menuArray } from "./data.js"


const map = new Map()

document.addEventListener('click', function(e){
    
    if(e.target.dataset.add) {
        handleAddBtnClick(e.target.dataset.add)
    } else if (e.target.dataset.remove) {
        handleRemoveBtnClick(e.target.dataset.remove)
    } else if (e.target.className === "complete-order-btn") {
        handleCompleteBtnClick()
    } else if (e.target.className === "pay-btn") {
        handlePayBtnClick()
    } else if (e.target.className === "cancel-btn") {
        handleCancelBtnClick()
    }
}) 


function handleAddBtnClick(itemId) {

    if(document.querySelector(".thank-msg")) {
        if(document.querySelector(".thank-msg").style.display === "flex") {
            document.querySelector(".thank-msg").style.display="none"; 
        }   
    }
    

    if(map.has(itemId)) {
        map.set(itemId, map.get(itemId)+1);
    } else {
        map.set(itemId, 1);
    }
    
    render()
}

function handleRemoveBtnClick(itemId) {
    if(map.has(itemId)) {
        map.delete(itemId);
    }
    
    render()
}


function handleCompleteBtnClick() {
    //console.log(document.querySelector(".payment-popup").style.display === "")
    if(document.querySelector(".payment-popup").style.display === "") {
        document.querySelector(".payment-popup").style.display="block"; 
    }
}

function handlePayBtnClick() {
    map.clear()

    render()

    if(document.querySelector(".thank-msg").style.display === "") {
        document.querySelector(".thank-msg").style.display="flex"; 
    }        
}

function handleCancelBtnClick() {
    if(document.querySelector(".payment-popup").style.display === "block") {
        document.querySelector(".payment-popup").style.display="none"; 
    }    
    
    render()
}


function getMenuHtml() {

    let menuHtml = ''
    menuArray.forEach(function(item) {
        let ingredientsSeparated = ''
        item.ingredients.forEach(function(s, i) {
            if(i == 0) {
                ingredientsSeparated = s.charAt(0).toUpperCase() + s.slice(1)
            } else {
                ingredientsSeparated += ", " + s
            }
        })

        menuHtml += 
        `
        <div class="menu-item">
            <div class="menu-desc">
                <div class="menu-emoji">${item.emoji}</div>
                <div class="food-details">
                    <p>${item.name}</p>
                    <p class="ingredients-desc">${ingredientsSeparated}</p>
                    <p>$${item.price}</p>
                </div>
            </div>
            <img class="add-btn" alt="Add button" data-add="${item.id}" src="images/add-btn.png"></img>
        </div>
        `
        
    })

    if(map.size > 0) {
        let totalPrice = 0
        menuHtml += 
        `
        <div class="order">
        <h3 class="order-title">Your order</h3>
        `    
        for(const [key, value] of map) {
            menuHtml += 
            `
            <div class="order-item">
                <div class="order-desc">
                    <p>${menuArray[key].name}</p>
                    <button class="remove-btn" data-remove="${key}">remove</button>
                </div>
                <div class="order-details">
                    <p>x${value}</p>
                    <p>$${menuArray[key].price * value}</p>                
                </div>
            </div>
            `
            totalPrice += menuArray[key].price * value;
        }

        menuHtml +=
        `
        <hr></hr>
        <div class="total-details">
            <p>Total price:</p>
            <p>$${totalPrice}</p>  
        </div>
        <button class="complete-order-btn">Complete order</button>
        </div>
        `
    }

    menuHtml +=
    `
    <div class="payment-popup">
        <h3>Enter card details</h3>
        <input type="text" placeholder="Enter your name" required/>
        <input type="text" placeholder="Enter your card number" required/>
        <input type="text" placeholder="Enter cvv" required/>
        <button class="pay-btn">Pay</button>
        <button class="cancel-btn">Cancel</button>
    </div>

    <div class="thank-msg">
        <p>Thank you, your order is on its way!</p>
    </div>
    `

    return menuHtml
}


function render() {
    document.querySelector("#menu-area").innerHTML = getMenuHtml()
}

render()