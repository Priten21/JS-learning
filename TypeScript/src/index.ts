// let age: number = 21;
let userName: string = "Priten";
let isActive: boolean = true;

// ===== arrays and tuples =====
let scores: number[] = [90, 85, 88];
let user: [number, string] = [1, "Admin"];

// problem with tuples 
// user.push(5);
// console.log(user);



// if(age<50)
//   age+= 10; 
// console.log(age);


// console.log(add(5,6));

// ===== Enums =====

enum Size {Small, Medium , Large};
let mySize: Size = Size.Medium;
console.log(mySize);


// ===== objects =====
let employee: {
  readonly id: number,
  employeeName: string,
  retire: (date: Date) => void
} = { 
  id: 1,
  employeeName: "Priten",
  retire: (date: Date) => {console.log(date);
}};

//===== types =====

/**************************************
 *  PRIMITIVE TYPES
 *************************************/

let age: number = 21;
let name: string = "Priten";
let isIntern: boolean = true;

console.log(age, name, isIntern);


/**************************************
 *  TYPE INFERENCE
 *************************************/

// TypeScript infers the type automatically
let city = "Ahmedabad"; // inferred as string
// city = 10; ❌ error

let score = 95; // inferred as number


/**************************************
 *  ANY vs UNKNOWN
 *************************************/

let data: any = "Hello";
data = 10;           // allowed
data.toUpperCase();  // allowed (but risky)

let safeData: unknown = "World";

// safeData.toUpperCase();  not allowed

if (typeof safeData === "string") {
  console.log(safeData.toUpperCase()); //  safe
}


/**************************************
 * ARRAYS
 *************************************/

let marks: number[] = [90, 85, 88];
let students: Array<string> = ["A", "B", "C"];

marks.push(100);
// marks.push("A");  error


/**************************************
 * TUPLES
 *************************************/

// Fixed length + fixed order
let userTuple: [number, string] = [1, "Admin"];
// userTuple = ["Admin", 1];  error


/**************************************
 * OBJECT TYPES
 *************************************/

let userObj: {
  id: number;
  username: string;
  isActive: boolean;
} = {
  id: 1,
  username: "Priten",
  isActive: true
};


/**************************************
 * INTERFACE (BEST PRACTICE)
 *************************************/

interface User {
  id: number;
  name: string;
  email?: string; // optional
}

const user1: User = {
  id: 1,
  name: "Priten"
};

const user2: User = {
  id: 2,
  name: "Rahul",
  email: "rahul@test.com"
};


/**************************************
 * TYPE ALIAS
 *************************************/

type ID = number | string;

let userId: ID = 101;
userId = "U101";

type Employee = {
    readonly id: number,
  employeeName: string,
  retire: (date: Date) => void
}

let employee2: Employee = {
   id: 2,
  employeeName: "Priten",
  retire: (date: Date) => {console.log(date);
}}


/**************************************
 *  UNION TYPES
 *************************************/

let input: number | string;

input = 10;
input = "ten";


function kgtolbs(weight: number | string): number {
  //narrowing 
  if(typeof(weight) === 'number'){
    return weight * 2.2
  } else { 
    return parseInt(weight) * 2.2
  }
}

kgtolbs(10);
kgtolbs("10kg");


/**************************************
 *  INTERSECTION TYPES
 *************************************/

type Draggable = {
  drag: () => void
}

type resizable = {
  resize: () => void
}

type UIWidget = Draggable & resizable;

let textbox: UIWidget = {
  drag: () => {},
  resize: () => {}
}



/**************************************
 * LITERAL TYPES
 *************************************/

type Status = "success" | "error" | "loading";

let apiStatus: Status = "success";
// apiStatus = "pending";  error

type Quantity = 50|100;

let quantity: Quantity = 100;

type Metric = 'cm' | 'inch';




/**************************************
 * ENUM
 *************************************/

enum Role {
  Admin,
  User,
  Guest
}

let currentRole: Role = Role.Admin;


/**************************************
 * FUNCTION TYPES
 *************************************/

function add(a: number, b: number): number {
  return a + b;
}

function logMessage(message: string): void {
  console.log(message);
}

logMessage("Learning TypeScript");



function calculateTax(income: number, taxYear = 2022): number {
  if( taxYear < 2022)
    return income * 1.2;
  return income * 1.3;
}

/**************************************
 * OPTIONAL & DEFAULT PARAMETERS
 *************************************/

function greet(name: string = "Guest"): string {
  return `Hello, ${name}`;
}

greet();
greet("Priten");

// optional property access operator 
type Customer = {
  birthday: Date
};

function getCustomer(id: number): Customer | null | undefined {
  return id === 0 ? null : {birthday: new Date()};
} 

let customer = getCustomer(0);
// optional property access operator 
console.log(customer?.birthday);


// optional element access operator 
//customers?.[0]

// optional call
let log: any = null;

log?.('a')


/**************************************
 * NEVER TYPE
 *************************************/

function throwError(msg: string): never {
  throw new Error(msg);
}

// throwError("Something went wrong");


/**************************************
 * EXHAUSTIVE CHECKING (NEVER)
 *************************************/

// type Shape =
//   | { kind: "circle"; radius: number }
//   | { kind: "square"; size: number };

// function calculateArea(shape: Shape): number {
//   switch (shape.kind) {
//     case "circle":
//       return Math.PI * shape.radius ** 2;
//     case "square":
//       return shape.size ** 2;
//     default:
//       const _exhaustive: never = shape;
//       return _exhaustive;
//   }
// }

// noUnsedParmeters in config to detect the unsed parameters
//noUsedLocals for use of all local variables 
// noImplicitReturns for need to return every part of function

/****************************************************
 * GENERICS & TYPE ASSERTIONS IN TYPESCRIPT
 ****************************************************/


/****************************************************
 * 1. GENERIC FUNCTION
 * Allows the function to work with any type
 ****************************************************/

function echoValue<T>(inputValue: T): T {
  return inputValue;
}

const echoedNumber = echoValue<number>(10);
const echoedString = echoValue<string>("TypeScript");
const echoedBoolean = echoValue<boolean>(true);


/****************************************************
 * 2. GENERIC FUNCTION WITH TYPE INFERENCE
 ****************************************************/

const inferredNumber = echoValue(100);
const inferredText = echoValue("Hello");


/****************************************************
 * 3. GENERIC ARRAY FUNCTION
 ****************************************************/

function getFirstItem<T>(items: T[]): T {
  return items[0] as T;
}

const firstNumber = getFirstItem<number>([1, 2, 3]);
const firstName = getFirstItem<string>(["A", "B", "C"]);


/****************************************************
 * 4. GENERIC INTERFACE
 ****************************************************/

interface ApiResponse<T> {
  status: number;
  data: T;
}

const userResponse: ApiResponse<string> = {
  status: 200,
  data: "User created"
};


/****************************************************
 * 5. GENERIC CLASS
 ****************************************************/

class StorageBox<T> {
  private storedValue: T;

  constructor(value: T) {
    this.storedValue = value;
  }

  getValue(): T {
    return this.storedValue;
  }
}

const numberStorage = new StorageBox<number>(50);
const stringStorage = new StorageBox<string>("Saved");


/****************************************************
 * 6. GENERIC CONSTRAINTS
 ****************************************************/

function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}

getLength("Hello");
getLength([1, 2, 3]);


/****************************************************
 * 7. BASIC TYPE ASSERTION
 ****************************************************/

let unknownInput: unknown = "TypeScript";

let inputLength: number = (unknownInput as string).length;


/****************************************************
 * 8. TYPE ASSERTION WITH DOM ELEMENT (COMMON USE CASE)
 ****************************************************/

const inputElement = document.getElementById("username") as HTMLInputElement;

if (inputElement) {
  console.log(inputElement.value);
}


/****************************************************
 * 9. TYPE ASSERTION VS TYPE GUARD
 ****************************************************/

let mixedValue: unknown = 123;

if (typeof mixedValue === "number") {
  console.log(mixedValue.toFixed(2));
}




/****************************************************
 * CLASSES & OBJECTS IN TYPESCRIPT
 ****************************************************/


/****************************************************
 * 1. BASIC CLASS, OBJECT & CONSTRUCTOR
 ****************************************************/

class Student {
  name: string;
  age: number;

  constructor(studentName: string, studentAge: number) {
    this.name = studentName;
    this.age = studentAge;
  }

  getDetails(): string {
    return `${this.name} is ${this.age} years old`;
  }
}

const studentOne = new Student("Priten", 21);


/****************************************************
 * 2. ACCESS MODIFIERS
 ****************************************************/

class BankAccount {
  public accountHolder: string;    // accessible everywhere
  private balance: number;         // accessible only inside class
  protected accountType: string;   // accessible in subclasses

  constructor(holder: string, initialBalance: number, type: string) {
    this.accountHolder = holder;
    this.balance = initialBalance;
    this.accountType = type;
  }

  public getBalance(): number {
    return this.balance;
  }
}


/****************************************************
 * 3. INHERITANCE & SUPER
 ****************************************************/

class SavingsAccount extends BankAccount {
  constructor(holder: string, balance: number) {
    super(holder, balance, "Savings");
  }

  getAccountInfo(): string {
    return `${this.accountHolder} has a ${this.accountType} account`;
  }
}


/****************************************************
 * 4. CONSTRUCTOR SHORTHAND & READONLY
 ****************************************************/

class Course {
  constructor(
    public readonly courseId: number,
    public courseName: string
  ) {}
}


/****************************************************
 * 5. INTERFACE IMPLEMENTATION
 ****************************************************/

interface Printable {
  print(): void;
}

class Report implements Printable {
  print(): void {
    console.log("Printing report...");
  }
}


/****************************************************
 * 6. ABSTRACT CLASS
 ****************************************************/

abstract class Shape {
  abstract calculateArea(): number;

  describe(): void {
    console.log("This is a shape");
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  calculateArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}


/****************************************************
 * 7. STATIC MEMBERS
 ****************************************************/

class MathHelper {
  static add(a: number, b: number): number {
    return a + b;
  }
}


/****************************************************
 * 8. GETTERS & SETTERS
 ****************************************************/

class UserProfile {
  private _email: string = "";

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    if (!value.includes("@")) {
      throw new Error("Invalid email");
    }
    this._email = value;
  }
}


/****************************************************
 * 9. POLYMORPHISM
 ****************************************************/

class Animal {
  makeSound(): string {
    return "Some sound";
  }
}

class Dog extends Animal {
  makeSound(): string {
    return "Bark";
  }
}

function playSound(animal: Animal): void {
  console.log(animal.makeSound());
}


/****************************************************
 * 10. OBJECT CREATION & USAGE
 ****************************************************/

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

