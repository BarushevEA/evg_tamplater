interface IAnimal {
    name: string;

    voice(): string;

    run(): string;
}

interface ISapiens {
    think(): string;
}

class Cat implements IAnimal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    run(): string {
        return "Jump";
    }

    voice(): string {
        return "Mew";
    }
}

class Human implements IAnimal, ISapiens {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    run(): string {
        return "Run";
    }

    think(): string {
        return "I think about item";
    }

    voice(): string {
        return "Hello!";
    }
}

class Computer implements ISapiens {
    think(): string {
        return "1001110011010100101111";
    }
}

const sapiens: ISapiens[] = [];
const animals: IAnimal[] = [];

const Lena = new Human("Lena");
const Kris = new Human("Kris");
const Maria = new Human("Maria");

const cat1 = new Cat("Murka");
const cat2 = new Cat("Senya");
const cat3 = new Cat("Sonya");

const computer = new Computer();

sapiens.push(
    Lena,
    Kris,
    Maria,
    computer
)

animals.push(
    cat1,
    cat2,
    cat3,
    Lena,
    Kris,
    Maria
);

sapiens.forEach(item => {
    console.log(item.think());
});

animals.forEach(animal => {
    console.log(animal.name, animal.voice());
});
