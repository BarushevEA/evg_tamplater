import {IChannel, OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/elements/types";
import {IStudent} from "../../env/types";

export class Main implements OnInit, OnCreate, OnDestroy {
    name: string;
    child1: HTMLElement;
    child2: HTMLElement;
    child3: HTMLElement;
    child4: HTMLElement;

    child1Chanel: IChannel;
    child2Chanel: IChannel;
    child3Chanel: IChannel;
    child4Chanel: IChannel;

    forElements: IStudent[] = [{name: "Sergey"}, {name: "Andrey"}, {name: "Nik"}];

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
    }

    onCreate(): void {
    }

    onInit(): void {
        this.initializeChannels();

        setTimeout(() => {
            this.sendMessageToChildren();
        }, 5000);

        setTimeout(() => {
            this.forElements = [
                {
                    name: "Sergey",
                    isStudying: true,
                    age: 18,
                    class: "3TI",
                    school: "ZSZnr1",
                    photo: "./assets/img/photo_2024-04-06_00-29-23.jpg"
                },
                {
                    name: "Andrey",
                    isStudying: true,
                    age: 21,
                    class: "4TI",
                    school: "ZSZnr1",
                    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUHvkoW4YAf73Ea3smStZwvrdxi4sUChgm6VOFHyfJ1Q&s"
                },
                {
                    name: "Nik",
                    isStudying: true,
                    age: 18,
                    class: "1",
                    school: "СШ#76",
                    photo: "https://media.licdn.com/dms/image/C4E03AQHjm7BY5INpBA/profile-displayphoto-shrink_200_200/0/1660152384175?e=2147483647&v=beta&t=5XDlbq2DvTVNmAuyCtaPfyqvvraRxC_1mK-u4Lh--ZU"
                },
                {name: "Kazashka", isStudying: false, age: 18, class: "3TI", school: "ZSZnr1"},
                {name: "Kazashka1", isStudying: false, age: 18, class: "3TI", school: "ZSZnr1"},
                {name: "Kazashka2", isStudying: false, age: 18, class: "3TI", school: "ZSZnr1"},
                {name: "Kazashka3", isStudying: false, age: 18, class: "3TI", school: "ZSZnr1"},
                {name: "Kazashka4", isStudying: false, age: 18, class: "3TI", school: "ZSZnr1"},
            ];
            this.root.detectChanges();
        }, 10000);
    }

    onDestroy(): void {
    }

    private initializeChannels() {
        this.child1Chanel = this.root.getChannel(this.child1);
        this.child2Chanel = this.root.getChannel(this.child2);
        this.child3Chanel = this.root.getChannel(this.child3);
        this.child4Chanel = this.root.getChannel(this.child4);
    }

    private sendMessageToChildren() {
        this.child1Chanel?.sendData("Message by main to child1");
        this.child2Chanel?.sendData("Message by main to child2");
        this.child3Chanel?.sendData("Message by main to child3");
        this.child4Chanel?.sendData("Message by main to child4");
    }
}
