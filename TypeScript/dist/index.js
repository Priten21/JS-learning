"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let userName = "Priten";
let isActive = true;
let scores = [90, 85, 88];
let user = [1, "Admin"];
var Size;
(function (Size) {
    Size[Size["Small"] = 0] = "Small";
    Size[Size["Medium"] = 1] = "Medium";
    Size[Size["Large"] = 2] = "Large";
})(Size || (Size = {}));
;
let mySize = Size.Medium;
console.log(mySize);
let employee = {
    id: 1,
    employeeName: "Priten",
    retire: (date) => {
        console.log(date);
    }
};
let age = 21;
let name = "Priten";
let isIntern = true;
console.log(age, name, isIntern);
let city = "Ahmedabad";
let score = 95;
let data = "Hello";
data = 10;
data.toUpperCase();
let safeData = "World";
if (typeof safeData === "string") {
    console.log(safeData.toUpperCase());
}
let marks = [90, 85, 88];
let students = ["A", "B", "C"];
marks.push(100);
let userTuple = [1, "Admin"];
let userObj = {
    id: 1,
    username: "Priten",
    isActive: true
};
const user1 = {
    id: 1,
    name: "Priten"
};
const user2 = {
    id: 2,
    name: "Rahul",
    email: "rahul@test.com"
};
let userId = 101;
userId = "U101";
let employee2 = {
    id: 2,
    employeeName: "Priten",
    retire: (date) => {
        console.log(date);
    }
};
let input;
input = 10;
input = "ten";
function kgtolbs(weight) {
    if (typeof (weight) === 'number') {
        return weight * 2.2;
    }
    else {
        return parseInt(weight) * 2.2;
    }
}
kgtolbs(10);
kgtolbs("10kg");
let textbox = {
    drag: () => { },
    resize: () => { }
};
let apiStatus = "success";
let quantity = 100;
var Role;
(function (Role) {
    Role[Role["Admin"] = 0] = "Admin";
    Role[Role["User"] = 1] = "User";
    Role[Role["Guest"] = 2] = "Guest";
})(Role || (Role = {}));
let currentRole = Role.Admin;
function add(a, b) {
    return a + b;
}
function logMessage(message) {
    console.log(message);
}
logMessage("Learning TypeScript");
function calculateTax(income, taxYear = 2022) {
    if (taxYear < 2022)
        return income * 1.2;
    return income * 1.3;
}
function greet(name = "Guest") {
    return `Hello, ${name}`;
}
greet();
greet("Priten");
function getCustomer(id) {
    return id === 0 ? null : { birthday: new Date() };
}
let customer = getCustomer(0);
console.log(customer?.birthday);
let log = null;
log?.('a');
function throwError(msg) {
    throw new Error(msg);
}
function echoValue(inputValue) {
    return inputValue;
}
const echoedNumber = echoValue(10);
const echoedString = echoValue("TypeScript");
const echoedBoolean = echoValue(true);
const inferredNumber = echoValue(100);
const inferredText = echoValue("Hello");
function getFirstItem(items) {
    return items[0];
}
const firstNumber = getFirstItem([1, 2, 3]);
const firstName = getFirstItem(["A", "B", "C"]);
const userResponse = {
    status: 200,
    data: "User created"
};
class StorageBox {
    storedValue;
    constructor(value) {
        this.storedValue = value;
    }
    getValue() {
        return this.storedValue;
    }
}
const numberStorage = new StorageBox(50);
const stringStorage = new StorageBox("Saved");
function getLength(value) {
    return value.length;
}
getLength("Hello");
getLength([1, 2, 3]);
let unknownInput = "TypeScript";
let inputLength = unknownInput.length;
const inputElement = document.getElementById("username");
if (inputElement) {
    console.log(inputElement.value);
}
let mixedValue = 123;
if (typeof mixedValue === "number") {
    console.log(mixedValue.toFixed(2));
}
class Student {
    name;
    age;
    constructor(studentName, studentAge) {
        this.name = studentName;
        this.age = studentAge;
    }
    getDetails() {
        return `${this.name} is ${this.age} years old`;
    }
}
const studentOne = new Student("Priten", 21);
class BankAccount {
    accountHolder;
    balance;
    accountType;
    constructor(holder, initialBalance, type) {
        this.accountHolder = holder;
        this.balance = initialBalance;
        this.accountType = type;
    }
    getBalance() {
        return this.balance;
    }
}
class SavingsAccount extends BankAccount {
    constructor(holder, balance) {
        super(holder, balance, "Savings");
    }
    getAccountInfo() {
        return `${this.accountHolder} has a ${this.accountType} account`;
    }
}
class Course {
    courseId;
    courseName;
    constructor(courseId, courseName) {
        this.courseId = courseId;
        this.courseName = courseName;
    }
}
class Report {
    print() {
        console.log("Printing report...");
    }
}
class Shape {
    describe() {
        console.log("This is a shape");
    }
}
class Circle extends Shape {
    radius;
    constructor(radius) {
        super();
        this.radius = radius;
    }
    calculateArea() {
        return Math.PI * this.radius * this.radius;
    }
}
class MathHelper {
    static add(a, b) {
        return a + b;
    }
}
class UserProfile {
    _email = "";
    get email() {
        return this._email;
    }
    set email(value) {
        if (!value.includes("@")) {
            throw new Error("Invalid email");
        }
        this._email = value;
    }
}
class Animal {
    makeSound() {
        return "Some sound";
    }
}
class Dog extends Animal {
    makeSound() {
        return "Bark";
    }
}
function playSound(animal) {
    console.log(animal.makeSound());
}
const savings = new SavingsAccount("Priten", 5000);
console.log(savings.getAccountInfo());
console.log(savings.getBalance());
const courseOne = new Course(1, "TypeScript Basics");
console.log(courseOne.courseId);
const reportOne = new Report();
reportOne.print();
const circleOne = new Circle(10);
circleOne.describe();
console.log(circleOne.calculateArea());
console.log(MathHelper.add(5, 3));
const profile = new UserProfile();
profile.email = "user@example.com";
console.log(profile.email);
playSound(new Dog());
console.log(studentOne.getDetails());
//# sourceMappingURL=index.js.map