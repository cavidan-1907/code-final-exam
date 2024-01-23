let id =new URLSearchParams(window.location.search).get("id");

let bot2=document.querySelector(".bot2");
let url = "http://localhost:3000/data"
async function getid(id) {
    let res = await axios.get(url)
    let data = await res.data
    data.map(element=>
   bot2.innerHTML=
        ` <div class="cart2">
        <div class="img"><img src="${element.img}" alt=""></div>
        <div class="text"><a href="">${element.name}</a>
        
        <p>$${element.price}</p></div>
    </div>
        `
)}
getid()