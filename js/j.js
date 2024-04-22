import anime from "animejs/lib/anime.es.js";

let title = document.getElementById('title')
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let search = document.getElementById('search');
let searchtitle = document.getElementById('searchtitle');
let searchCategory = document.getElementById('searchCategory');
let total = document.getElementsByClassName('total')[0];
let btnDel = document.getElementById('delAll');

let check = true;
let tmp;
let dataPro;
let moodS = 'searchtitle';

anime({
    targets:'div',
    translateX:250,
    rotate:'1turn',
    backgroundColor:'#fff',
    duration:800
});

if (localStorage.pro != null) {
    dataPro = JSON.parse(localStorage.pro);
} else {
    dataPro = [];
}

function getTotal() {
    if (price.value > 0) {
        total.innerHTML = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.style.background = '#040'

    } else {

        total.innerHTML = ''
        total.style.background = 'firebrick'
    }
}
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
    getTotal();

}

submit.onclick = () => {
    let prodect = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        category: category.value.toLowerCase(),
        total: total.innerHTML,
    }
    if (check) {
        if (+count.value > 1 && title.value != '' && price.value != '') {
            for (let i = 0; i < +count.value; i++) {
                dataPro.push(prodect);
                
            }
            clearData();
        } else if (+count.value == 1 && title.value != '' && price.value != '') {
            dataPro.push(prodect);
            clearData();

        }
    } else if (title.value != '' && price.value != '') {
        dataPro[tmp] = prodect;
        check = true;
        submit.innerHTML = 'Create';
        count.style.display = 'block';
        clearData();

    }
    localStorage.pro = JSON.stringify(dataPro);
    delAll();
    save();
}


function save() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="upda(${i})" id="update">update</button></td>
                        <td><button onclick="delet(${i})" id="delete">delete</button></td>
                        </tr>
                        `
    }
    document.getElementById('td').innerHTML = table;
}
save();

function upda(i) {
    title.value = dataPro[i].title
    price.value = dataPro[i].price
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    discount.value = dataPro[i].discount
    category.value = dataPro[i].category
    submit.innerHTML = 'Update'
    getTotal();
    count.style.display = 'none';
    check = false;
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    });

}
function delAll() {
    if (dataPro.length > 0) {
        btnDel.textContent = `Delete All (${dataPro.length})`;
        btnDel.style.display = 'block';
    } else {
        btnDel.style.display = 'none';
    }
}
delAll();
function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    btnDel.style.display = 'none';
    document.getElementById('td').innerHTML = '';
    
}

function delet(i) {

    dataPro.splice(i, 1);
    localStorage.pro = JSON.stringify(dataPro);
}
function valueSearch(vSearch) {
    let table = '';
    let x = 0;
    if (moodS == 'searchtitle') {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(vSearch)) {
                x += 1
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="upda(${i})" id="update">update</button></td>
                        <td><button onclick="delet(${i})" id="delete">delete</button></td>
                        </tr>
                        `
            }

        }

    } else {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(vSearch)) {
                x += 1
                table += `
                            <tr>
                                <td>${i}</td>
                                <td>${dataPro[i].title}</td>
                                <td>${dataPro[i].price}</td>
                                <td>${dataPro[i].taxes}</td>
                                <td>${dataPro[i].ads}</td>
                                <td>${dataPro[i].discount}</td>
                                <td>${dataPro[i].total}</td>
                                <td>${dataPro[i].category}</td>
                                <td><button onclick="upda(${i})" id="update">update</button></td>
                                <td><button onclick="delet(${i})" id="delete">delete</button></td>
                                </tr>
                                `
            }

        }
    }
    document.getElementById('td').innerHTML = table;
    btnDel.textContent = `Delete All (${x})`;
}
function getSearch(id) {
    moodS = id;
    if (id == 'searchtitle') {
        search.placeholder = 'search By title';
                
    } else{
        search.placeholder = 'search By category';
    }
    
    search.focus();
    search.value = '';
    save();
    delAll();
}
