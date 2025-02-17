import readlineSync from "readline-sync";
let animals = ["Lion", "Elephant", "Crocodile", "Giraffe", "Hippo"];
let index = readlineSync.keyInSelect(animals, "Which animal?");
console.log(index);

console.log("Ok, " + animals[index] + " goes to your room.");
2;
