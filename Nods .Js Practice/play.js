var names = "zain";
let age = 40;
var location = "Gujranwala"

age = 45;
function mydetail (myname , myage , mylocation)
{
    return "name" +myname + " my age is " + myage +" my location is " +mylocation

}

const add = (a,b)=>{
    return a+b;
}
let subtract = (a,b) =>a-b;

var person ={
    name : "zain",
    age : 55,
    greet(){
        console.log("my name is " +this.name);
    }
}

 const hobbies = ["Cricket ","Football", 2,false];

 console.log(hobbies.map((hobby)=>{
    return "Hobbies " +hobby;
 }));
 console.log(hobbies);

console.log(person.greet());
console.log(add(1,2));
console.log(subtract(4,2));
var res = mydetail (names,age,location);
console.log(res);


console.log( hobbies[0], ...hobbies);

function addAll(...numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
  }
  console.log(addAll(1, 2, 3, 4)); // 10

  //objec and array destrutign 

  const {name,greet} = person;
  const [h1,...h3] = hobbies;
  console.log(name,greet);
  console.log(h1,h3.entries());
