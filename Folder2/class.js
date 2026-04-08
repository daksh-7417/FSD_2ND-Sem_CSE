let jsonString = '{"productName":"Laptop","price":1200,"inStock":true}';
let product = JSON.parse(jsonString);
console.log(product.productName);

let newProduct = {productName:"mouse",price:"400",inStock:"true"};
let newjsonString = JSON.stringify(newProduct);
console.log(newjsonString); 

let person = {
    name:"Charlie",
    age:35,
    city:"New York",
};
let text="";
for(let key in person){
    text+=key+" "+person[key]+"\n";
}
console.log(text);