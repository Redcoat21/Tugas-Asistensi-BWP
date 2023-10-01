// XMLHttpRequest Based

function ajax(url, callback) {
    const xhr = new XMLHttpRequest();

    xhr.onload = () => {
        if(xhr.status === 200) {
            console.log("Request successful!");
            const data = JSON.parse(xhr.responseText);
            callback(null, data);
        } else {
            console.error(`Request is succesful, but something is wrong. Error code : ${xhr.status}`)
        }
    };

    xhr.onerror = () => {
        callback(`Request failed with status ${xhr.status}`, null);
    }

    xhr.open("POST", url);
    xhr.send();
}

function createElement(element, classList, innerText) {
    const createdElement = document.createElement(element);
    createdElement.classList.add(...classList);

    if(innerText) {
        createdElement.innerText = innerText;
    }

    return createdElement;
}

document.addEventListener("DOMContentLoaded", () => {
    const displayDiv = document.querySelector("#display");
    const usersButton = document.querySelector("#usersButton");
    const itemsButton = document.querySelector("#itemsButton");
    const userHandler = (error, data) => {
        if(!error) {
            for (const user of data) {
                const sellerDiv = document.createElement("div");
                sellerDiv.classList.add(...['bg-white', 'border', 'rounded', 'my-3']);

                const paragraphClass = ['font-semibold', 'px-3', 'py-3'];
                const sellerParagraph = [
                    createElement("p", paragraphClass, `Seller: ${user.username}`),
                    createElement("p", paragraphClass, `Full Name: ${user.full_name}`)
                ];

                for (const element of sellerParagraph) {
                    sellerDiv.appendChild(element);
                }

                displayDiv.appendChild(sellerDiv);
            }
        } else {
            console.error(error);
        }
    }

    const itemHandler = (error, data) => {
        if(!error) {
            for (const item of data) {
                const sellerDiv = document.createElement("div");
                sellerDiv.classList.add(...['bg-white', 'border', 'rounded', 'my-3', 'px-3', 'py-3']);

                const paragraphClass = ['font-semibold', 'px-3', 'py-3'];

                const sellerParagraph = [
                    createElement("p", paragraphClass, `Nama Item: ${item.item_name}`),
                    createElement("p", paragraphClass, `Harga: ${item.price}`),
                    createElement("p", paragraphClass, `Penjual: ${item.full_name}`)
                ];

                for (const element of sellerParagraph) {
                    sellerDiv.appendChild(element);
                }

                displayDiv.appendChild(sellerDiv);
            }
        } else {
            console.error(error);
        }
    }

    // Initial call untuk defaultnya.
    ajax("../scripts/query_user.php", userHandler);

    usersButton.addEventListener('click', () => {
        displayDiv.innerHTML = '';
        ajax("../scripts/query_user.php", userHandler);
    });

    itemsButton.addEventListener('click', () => {
        displayDiv.innerHTML = '';
        ajax("../scripts/query_item.php", itemHandler);
    });
});