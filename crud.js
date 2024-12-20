let title =document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let sumbit=document.getElementById('sumbit');
let mood='create';
let tmp;
//get total
function gettot(){
    // price makhawyash input 
    if(price.value !=''){
        let resulat= (+price.value+ +taxes.value+ +ads.value) - +discount.value;
        total.innerHTML = resulat;
        total.style.background='green';
    }else{
        total.innerHTML='';
        total.style.background='red';
    }
}
//create product
let datapro;
if(localStorage.product != null){
  datapro = JSON.parse(localStorage.product)
}else{
     datapro=[];

}


sumbit.onclick=function(){
    let newPro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
  if(mood==='create'){
    if(newPro.count > 1){
        for(let i=0;i<newPro.count;i++){
            datapro.push(newPro);
        }
    }else{
        datapro.push(newPro);
    }
  }else{
       datapro[tmp]=newPro;
       mood='create';
       sumbit.innerHTML='create';
       count.style.display='block';
  }
   
     // save storage
     localStorage.setItem('product',  JSON.stringify(datapro))
    console.log(datapro);
    clearData();
    readData()
}

//clear input
function clearData(){
     title.value='';
     price.value='';
     taxes.value='';
     ads.value='';
     discount.value='';
     total.innerHTML='';
     count.value='';
     category.value='';
}

//read data
function readData(){
gettot();    
let table='';
for(let i=0; i<datapro.length; i++){
    table +=`
       <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})" id="btnupdate">update</button></td>
                <td><button onclick="deleteData(${i})" id="btndelete">delete</button></td>
            </tr>
    `

}
document.getElementById('tbody').innerHTML=table;
let btndelete=document.getElementById('deleteAll');
if(datapro.length>0){
    btndelete.innerHTML=`
     <button onclick="deleteAll()">delete All (${datapro.length})</button>
    `
}else{
    btndelete.innerHTML='';
}

}
readData()
//delete data
 function deleteData(i){
    datapro.splice(i,1);
    localStorage.product=JSON.stringify(datapro);
    readData();
    
 }

 //delete all data
 function deleteAll() {
    localStorage.clear();
    datapro.splice(0);
    readData();
 }

 //count


 // updateData
 function updateData(i){
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    gettot();
    count.style.display="none";
    discount.value=datapro[i].discount;
    category.value=datapro[i].category;
    sumbit.innerHTML='update';
    mood='update';
    tmp=i;
    scroll({
        top:0,
        behavior:'smooth',
    })

 }

 //search
 let searchMood='title';
 function getsearchMood(id){
    let search=document.getElementById('serach')
    if(id=='serachTitle'){
        searchMood='title';
        search.placeholder='search by title';


    }else{
        searchMood='category';
        search.placeholder='search by category';

    }
    search.focus();
    search.value='';
    readData(); 

 }
 // search data
 function searchData(value)
 {
    let table='';
    if(searchMood=='title')
        {
            for(let i=0; i<datapro.length; i++){
                if(datapro[i].title.includes(value.toLowerCase())){
                    table +=`
                    <tr>
                             <td>${i}</td>
                             <td>${datapro[i].title}</td>
                             <td>${datapro[i].price}</td>
                             <td>${datapro[i].taxes}</td>
                             <td>${datapro[i].ads}</td>
                             <td>${datapro[i].discount}</td>
                             <td>${datapro[i].total}</td>
                             <td>${datapro[i].category}</td>
                             <td><button onclick="updateData(${i})" id="btnupdate">update</button></td>
                             <td><button onclick="deleteData(${i})" id="btndelete">delete</button></td>
                         </tr>
                 `

                }
            }


        }
 else{
        for(let i=0; i<datapro.length; i++){
            if(datapro[i].category.includes(value.toLowerCase())){
                table +=`
                <tr>
                         <td>${i}</td>
                         <td>${datapro[i].title}</td>
                         <td>${datapro[i].price}</td>
                         <td>${datapro[i].taxes}</td>
                         <td>${datapro[i].ads}</td>
                         <td>${datapro[i].discount}</td>
                         <td>${datapro[i].total}</td>
                         <td>${datapro[i].category}</td>
                         <td><button onclick="updateData(${i})" id="btnupdate">update</button></td>
                         <td><button onclick="deleteData(${i})" id="btndelete">delete</button></td>
                     </tr>
             `

            }
        }
    }
    document.getElementById('tbody').innerHTML=table;
}

//clean data
