import {IStudent} from "../../env/types";
import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/env/types";

export class For_element implements OnInit, OnCreate, OnDestroy {
    photo: string;
    name: string;
    age: number;
    isStudying: boolean;
    class: string;
    school: string;

    constructor(readonly root: RootBehavior) {

    }

    onCreate(): void {
        this.root.collect(
            this.root.onMessage$<IStudent>()
                .pipe()
                .refine(msg => !!msg)
                .subscribe((msg: IStudent) => {
                    this.setStudent(msg);
                })
        );
    }

    onInit(): void {
    }

    onDestroy(): void {
    }

    private setStudent(student: IStudent) {
        this.name = student.name ?? "NOT PRESENT YET";
        this.age = student.age ?? NaN;
        this.photo = student.photo ?? "";
        this.isStudying = student.isStudying ?? false;
        this.class = student.class ?? "NOT PRESENT YET";
        this.school = student.school ?? "NOT PRESENT YET";

        this.root.detectChanges();
    }
}
