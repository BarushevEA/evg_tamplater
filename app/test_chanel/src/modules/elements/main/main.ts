import {IChildChannel, OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/elements/types";
import {IStudent} from "../../env/types";

export class Main implements OnInit, OnCreate, OnDestroy {
    name: string;

    child1Chanel: IChildChannel;
    child2Chanel: IChildChannel;
    child3Chanel: IChildChannel;
    child4Chanel: IChildChannel;

    forElements: IStudent[] = [{name: "Sergey"}, {name: "Andrey"}, {name: "Nik"}];

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
    }

    onCreate(): void {
        this.root.collect(
            this.root
                .onMessage$()
                .subscribe(message => {
                    console.log("MAIN MESSAGE:", message);
                })
        );
    }

    onInit(): void {
        setTimeout(() => {
            this.sendMessageToChildren();
        }, 5000);

        const images = [
            "./assets/img/photo_2024-04-06_00-29-23.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUHvkoW4YAf73Ea3smStZwvrdxi4sUChgm6VOFHyfJ1Q&s",
            "https://media.licdn.com/dms/image/C4E03AQHjm7BY5INpBA/profile-displayphoto-shrink_200_200/0/1660152384175?e=2147483647&v=beta&t=5XDlbq2DvTVNmAuyCtaPfyqvvraRxC_1mK-u4Lh--ZU"
        ];

        setTimeout(() => {
            this.forElements = [
                {
                    name: "Sergey",
                    isStudying: true,
                    age: 18,
                    class: "3TI",
                    school: "ZSZnr1",
                    photo: images[0]
                },
                {
                    name: "Andrey",
                    isStudying: true,
                    age: 21,
                    class: "4TI",
                    school: "ZSZnr1",
                    photo: images[1]
                },
                {
                    name: "Nik",
                    isStudying: true,
                    age: 18,
                    class: "1",
                    school: "СШ#76",
                    photo: images[2]
                },
                {name: "Kazashka", isStudying: false, age: 18, class: "3TI", school: "ZSZnr1"},
                {name: "Kazashka1", isStudying: false, age: 18, class: "3TI", school: "ZSZnr1"},
                {name: "Kazashka2", isStudying: false, age: 18, class: "3TI", school: "ZSZnr1"},
                {name: "Kazashka3", isStudying: false, age: 18, class: "3TI", school: "ZSZnr1"},
                {name: "Kazashka4", isStudying: false, age: 18, class: "3TI", school: "ZSZnr1"},
            ];
            this.root.detectChanges();

            let imageCounter = 0;

            setInterval(() => {
                this.forElements = [
                    {
                        name: "Sergey",
                        isStudying: true,
                        age: 18,
                        class: "3TI",
                        school: "ZSZnr1",
                        photo: images[imageCounter],
                    }
                ];
                imageCounter++;

                if (imageCounter >= images.length) imageCounter = 0;

                this.root.detectChanges();
            }, 2000);
        }, 10000);
    }

    onDestroy(): void {
    }

    private sendMessageToChildren() {
        this.child1Chanel?.sendMessage("Message by main to child1");
        this.child2Chanel?.sendMessage("Message by main to child2");
        this.child3Chanel?.sendMessage("Message by main to child3");
        this.child4Chanel?.sendMessage("Message by main to child4");
    }
}
