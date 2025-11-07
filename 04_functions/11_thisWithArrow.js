// scope of arrow functions depends on scope of parent (Lexical Scope)

const student = {
    name : "Priten",
    marks : "99",
    age : 20,
    prop : this,
    getName: function() {
        return this.name;
    },
    getMarks: () =>{
        return this.marks
    },
    getInfo1: function(){
        setTimeout(() =>{
            console.log(this);
        },2000)
    },
    getInfo2: function(){
        setTimeout(function() {
            console.log(this);
        },2000)
    },
    teacher : {
        name : "Shradha",
        marks : 100,
        getAge : () => {
            return this.age
        }
    }
};

// console.log(student);
console.log(student.getName());
console.log(student.getMarks()); // refers to the parent object i.e. window for browser JS

console.log(student.getInfo1()) // will return student as it is the parent object 

console.log(student.getInfo2()) // will return the calling object i.e. timeout or window

console.log(student.teacher.getAge())// refers to window so, returns undefined
