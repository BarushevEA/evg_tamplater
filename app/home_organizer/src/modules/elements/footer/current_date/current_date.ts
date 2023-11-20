import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../../libs/elements/types";
import {formattedDate} from "../../../env/utils";

export class Current_date implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;
    timer: any;
    separator: string;
    isShowSecondSeparator: boolean;
    date: string;
    time: string;
    second: string;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
        this.separator = ":";
        this.updateDate();
    }

    onCreate(): void {
    }

    onInit(): void {
        this.handleTime();
    }

    onDestroy(): void {
    }

    private handleTime() {

        this.timer = setInterval(
            () => {
                this.updateDate();
                this.root.detectChanges();
            },
            500
        );
    }

    private updateDate() {
        const str = this.separator;
        this.isShowSecondSeparator = !this.isShowSecondSeparator;
        // const secondSeparator = this.isShowSecondSeparator ? str : " ";

        const date = new Date();
        const seconds = formattedDate(date.getSeconds());
        const minutes = formattedDate(date.getMinutes());
        const hours = formattedDate(date.getHours());
        const day = formattedDate(date.getDate());
        const month = formattedDate(date.getMonth() + 1);
        const year = formattedDate(date.getFullYear());

        this.date = `${year}${str}${month}${str}${day} `;
        this.time = `${hours}${str}${minutes} `;
        this.second = `${seconds}`;
    }
}
