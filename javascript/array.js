let person = {
    name: "Daksh",
    age: 30,
    city: "New York"
};
console.log(person);
console.log(person.name);
console.log(person.age);
console.log(person.city);

//array data type

let numbers = [1,2,3,4,5];
console.log(numbers[0]);
console.log(numbers[1]);
console.log(numbers[2]);
console.log(numbers[3]);

// array with multiple data types

let mixedArray = [1,"Hello",true,{name:"Alice"},[1,2,3]];
console.log(mixedArray[0]);
console.log(mixedArray[1]);
console.log(mixedArray[2]);
console.log(mixedArray[3]);
console.log(mixedArray[4]);

//map on array

let num = [1,2,3,4,5];
let squaredarray = num.map(num => num*num);
console.log(squaredarray);
console.log(num);

//filter on array


