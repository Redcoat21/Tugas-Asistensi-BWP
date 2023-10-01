// Promise Based
async function ajax(url) {
    const response = await fetch(url, {
        method: "GET",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return response.json();
}

function fetchData(url, handler) {
    ajax(url)
        .then(data => handler(data));
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

    const userHandler = (data) => {
        if(data) {
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
        }
    };

    const itemHandler = (data) => {
        if(data) {
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
        }
    }

    fetchData("../scripts/query_user.php", userHandler);

    usersButton.addEventListener('click', () => {
        displayDiv.innerHTML = '';
        fetchData("../scripts/query_user.php", userHandler);
    });

    itemsButton.addEventListener('click', () => {
        displayDiv.innerHTML = '';
        fetchData("../scripts/query_item.php", itemHandler);
    });
});