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
let filter=[]
let copy=[]
let section=document.querySelector("table tbody");
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
        `  
        <tr>  <td>${element.id}</td>
        <td>${element.name}</td>
        <td>${element.price}</td>
        <td onclick="uptade((${element.id}))"><i class="bi bi-arrow-clockwise"></i></td>
        <td onclick="deleteid((${element.id}))"><i class="bi bi-trash"></i></td> </tr>
        `
    })
}
getAll()

let alertdiv= document.querySelector(".alertdiv")


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
    let form= document.querySelector(".form")
let file=document.querySelector("#file")
let nameinp= document.querySelector("#name")
let priceinp=document.querySelector("#price")
let img= document.querySelector("#im1")
let upid=null;

file.addEventListener("change",(e)=>{
    let src = e.target.files[0];
    if(src){
let reader=new FileReader()
reader.readAsDataURL(src)
reader.onload =(e)=>{
  return  img.src=e.target.result
}
    }
})

async function uptade(id) {
    let res = await axios.get(url + "/" + id)
    let data = await res.data
    upid = id;
    nameinp.value = data.name;
    priceinp.value = data.price;
    img.src = data.img
    
}
async function deleteid(id){
    axios.delete(url+ "/" + id)
}
let closeButton=document.querySelector(".bi-x")
closeButton.addEventListener("click", () => {
    if (alertdiv.style.top === "300px") {
        alertdiv.style.top = "-500px";
    } else {
        alertdiv.style.top = "300px";
    }
});


form.addEventListener("submit",(e)=>{
    e.preventDefault()
    let res =  axios.get(url)
    let data =  res.data
    if (nameinp.value.trim()==="" || priceinp.value==="" || file.files.length===0) {
        if (alertdiv.style.top === "-500px") {
                    alertdiv.style.top = "300px";
                } else {
                    alertdiv.style.top = "-500px";
                }
        
    } else {
        if(!upid){
            axios.post(url,{
                name:nameinp.value,
                price:priceinp.value,
                img:img.src
            })
        }
        else{
            axios.patch(url + "/" + upid,{
                name:nameinp.value,
                price:priceinp.value,
                img:img.src
            })
        }
    }
})



