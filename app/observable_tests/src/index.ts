// Import the Observable library
import {Observable} from "evg_observable/src/outLib/Observable";

// Constants representing different hair colors
const HAIR = {
    BLOND: "BLOND",
    BLACK: "BLACK",
    BROWN: "BROWN",
}

// Constants for gender
const GENDER = {
    MAN: "MAN",
    WOMAN: "WOMAN"
}

// Constants for different occupations
const MAJOR = {
    DOCTOR: "DOCTOR",
    DRIVER: "DRIVER",
    CHILD: "CHILD",
}

// Definition of the "Person" class
class Person {
    constructor(
        public name: string,
        public age: number,
        public gender: string,
        public major: string,
        public hairColor: string) {

        this.hairColor = hairColor;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.major = major;
    }
}

// Create Observables for individual person, men and women
const personal$ = new Observable<Person>(null);
const men$ = new Observable<Person>(null)
const women$ = new Observable<Person>(null)

// Define various filters to be used later
const youngAgeFilter = (person: Person) => person.age > 17;
const oldAgeFilter = (person: Person) => person.age < 60;
const menFilter = (person: Person) => person.gender === GENDER.MAN;
const womenFilter = (person: Person) => person.gender === GENDER.WOMAN;
const blondFilter = (person: Person) => person.hairColor === HAIR.BLOND;
const blackFilter = (person: Person) => person.hairColor === HAIR.BLACK;

// Callback function to execute when some man is ready to work
const manReadyToWork = (worker: Person) => {
    console.log("MAN ==> is ready to work:", worker.name, worker.age, worker.major);
};

// Callback function to execute when some woman is ready to work
const womanReadyToWork = (worker: Person) => {
    console.log("WOMAN ==> is ready to work:", worker.name, worker.age, worker.major);
};

// Callback function to execute for people with black or blond hair
const blondAndBlack = (person: Person) => {
    console.log("PERSON ==> only black or blond:", person.name, person.age, person.hairColor);
};

// Apply the filters to men$ and women$
men$.addFilter()
    .filter(menFilter);

women$.addFilter()
    .filter(womenFilter);

// Subscribe the callback function to the created Observables
men$.subscribe(manReadyToWork);
women$.subscribe(womanReadyToWork);

// Stream the list of people by applying the age filters
personal$.pipe()
    .emitByPositive(youngAgeFilter)
    .emitByPositive(oldAgeFilter)
    .subscribe([men$, women$]);

// Stream the list of people considering the hair color
personal$.pipe()
    .switch()
    .case(blackFilter)
    .case(blondFilter)
    .subscribe(blondAndBlack);

// Start streaming the list of people
personal$.stream([
    new Person('Alex', 35, GENDER.MAN, MAJOR.DOCTOR, HAIR.BLOND),
    new Person('John', 45, GENDER.MAN, MAJOR.DRIVER, HAIR.BLACK),
    new Person('Alice', 30, GENDER.WOMAN, MAJOR.DOCTOR, HAIR.BROWN),
    new Person('Sophia', 36, GENDER.WOMAN, MAJOR.DRIVER, HAIR.BLOND),
    new Person('Matthew', 15, GENDER.MAN, MAJOR.CHILD, HAIR.BROWN),
    new Person('Emily', 17, GENDER.WOMAN, MAJOR.CHILD, HAIR.BLACK),
    new Person('James', 40, GENDER.MAN, MAJOR.DOCTOR, HAIR.BLOND),
    new Person('Emma', 35, GENDER.WOMAN, MAJOR.DRIVER, HAIR.BROWN),
    new Person('Michael', 15, GENDER.MAN, MAJOR.CHILD, HAIR.BLACK),
    new Person('Olivia', 16, GENDER.WOMAN, MAJOR.CHILD, HAIR.BLOND)
]);

// This is the result of handling persons:
// MAN ==> is ready to work: Alex 35 DOCTOR
// PERSON ==> only black or blond: Alex 35 BLOND
// MAN ==> is ready to work: John 45 DRIVER
// PERSON ==> only black or blond: John 45 BLACK
// WOMAN ==> is ready to work: Alice 30 DOCTOR
// WOMAN ==> is ready to work: Sophia 36 DRIVER
// PERSON ==> only black or blond: Sophia 36 BLOND
// PERSON ==> only black or blond: Emily 17 BLACK
// MAN ==> is ready to work: James 40 DOCTOR
// PERSON ==> only black or blond: James 40 BLOND
// WOMAN ==> is ready to work: Emma 35 DRIVER
// PERSON ==> only black or blond: Michael 15 BLACK
// PERSON ==> only black or blond: Olivia 16 BLOND
