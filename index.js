
import { menuArray } from "./data.js"


const map = new Map()

function handleAddBtnClick() {
    map.set("Pizza", 1);
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
                    <p>${ingredientsSeparated}</p>
                    <p>$${item.price}</p>
                </div>
            </div>
            <img class="add-btn" alt="Add button" src="images/add-btn.png"></img>
        </div>
        `
        
    })

    // map.set("Pizza", 1);
    map.set("Food", 3);
    if(map.size > 0) {
        menuHtml += 
        `
        <h3 class="order-title">Your order</h3>
        `    
        for(const [key, value] of map) {
            menuHtml += 
            `
            <div class="order-list">
                <div class="order-item">
                    <div class="order-desc">
                        <p>${key}</p>
                        <p>remove</p>
                    </div>
                    <p>${value}</p>                
                </div>
            </div>
            `
        }
        
        
    }

    
    return menuHtml
}


function render() {
    //document.getElementById("menu-area").innerHTML = getMenuHtml()
    document.querySelector("#menu-area").innerHTML = getMenuHtml()
}

render()