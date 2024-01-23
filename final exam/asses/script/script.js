let menu=document.querySelector(".center2")
let menuBtn=document.querySelector(".bi-list")
menuBtn.addEventListener("click",()=>{
    if (menu.style.left==="-1000px") {
        menu.style.left="60px"
    }
    else{
        menu.style.left="-1000px"
    }
})

let url="http://localhost:3000/data";
let favurl="http://localhost:3000/fav";
let filter=[]
let copy=[]
let section=document.querySelector(".bot");
let search= document.querySelector("#search");
let select=document.querySelector("#select");

async function getAll() {
    let res = await axios.get(url);
    let data = await res.data;
    copy=data
    section.innerHTML=""
    filter=filter.length || search.value ? filter : data;
    filter.map(element=>{
        section.innerHTML+=
        ` <div class="cart">
        <div class="img"><img src="${element.img}" alt=""></div>
        <div class="text"><a href="./details.html?=id">${element.name}</a>
        <i class="bi bi-heart fav"></i>
        <p>$${element.price}</p></div>
    </div>
        `
    })
}
getAll()

search.addEventListener("input",(el)=>{
filter=copy
    filter=filter.filter((e)=>{
        return e.name.toLocaleLowerCase().includes(el.target.value.toLocaleLowerCase())
    })
    getAll()
})

select.addEventListener("change",(e)=>{
    
    if (e.target.value==="asc") {
        filter.sort((a,b)=>a.price-b.price)
        console.log(filter);
    }
   else if (e.target.value ==="dsc") {
        filter.sort((b,a)=>a.price-b.price)
        console.log(filter);
    }
    else{
        filter=[]
    }
    getAll()
})


let arrup= document.querySelector(".topArr");
window.addEventListener("scroll",(e)=>{
    if(window.scrollY>50){
      
            arrup.style.right="50px"
        }
        else{
            arrup.style.right="-50px"
        
    }
})