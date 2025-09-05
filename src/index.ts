import promptSync from "prompt-sync";

const prompt = promptSync();

console.log("Welcome to Student Database CLI!");
console.log("Please choose an option:");
console.log("1. Add student");
console.log("2. View report card");
console.log("3. List students");
console.log("4. Exit");

const choice = prompt("Enter your choice (1-4): ");

if (choice === "1") {
  console.log("You want to add a student.");
} else if (choice === "2") {
  console.log("You want to view a report card.");
} else if (choice === "3") {
  console.log("You want to list all students.");
} else if (choice === "4") {
  console.log("Goodbye!");
} else {
  console.log("Invalid choice. Please try again.");
}
