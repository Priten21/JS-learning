//"this" refers to an obejct that is executing the current piece of code.

const student = {
    name : "Priten",
    age : 20,
    eng : 95,
    math :99,
    phy : 90,
    getAvg(){
        let avg = (this.eng + this.math + this.phy)/3
        console.log(`${this.name} got average marks : ${avg}`)
    }
}

function getAvg(){
    console.log(this)
}


student.getAvg();
getAvg();