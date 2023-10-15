import {APP_INFO} from "./settings/info";
import {APP_LOCALE} from "../../../libs/elements/AppLocalization/LocationManager";
import {LOCATION} from "../../../libs/elements/AppLocalization/location";
import {MODULES} from "./settings/modules";
import {RENDER_MANAGER} from "../../../libs/elements/rootElements/managers/RenderManager";
import {IsTableReady$, TableData$} from "./modules/services/tableServices";
import {TableOptions} from "./modules/env/types";

fillTable();
APP_INFO.init();
APP_LOCALE.set(LOCATION.EN);
RENDER_MANAGER.register(MODULES);
RENDER_MANAGER.run(true);

const Tables: TableOptions[] = [
    {
        header: ["field1", "field2", "field3",],
        body: [
            ["1", "2", "3"],
            ["4", "5", "6"],
            ["7", "8", "9"],
        ],
        footer: "TABLE1"
    },
    {
        header: ["field1a", "field2a", "field3a", "field4a", "field5a", "field6a",],
        body: [
            ["1a", "2a", "3a", "1a", "2a", "3a",],
            ["4a", "5a", "6a", "4a", "5a", "6a",],
            ["7a", "8a", "9a", "7a", "8a", "9a",],
        ],
        footer: "TABLE1a"
    },
    {
        header: ["field1b"],
        body: [
            ["1b",],
            ["4b",],
            ["7b",],
        ],
        footer: "TABLE1b"
    },
    {
        header: ["field1a", "field2a", "field3a", "field4a", "field5a", "field6a",],
        body: [
            ["1a", "2a", "3a", "1a", "2a", "3a",],
            ["4a", "5a", "6a", "4a", "5a", "6a",],
            ["7a", "8a", "9a", "7a", "8a", "9a",],
        ],
        footer: "TABLE1a"
    },
    {
        header: ["field1", "field2", "field3",],
        body: [
            ["1", "2", "3"],
            ["4", "5", "6"],
            ["7", "8", "9"],
        ],
        footer: "TABLE1"
    },
    {
        header: ["field1c"],
        body: [
            ["1c",],
            ["4c",],
            ["7c",],
            ["7c",],
            ["7c",],
            ["7c",],
            ["7c",],
            ["7c",],
            ["7c",],
            ["7c",],
            ["7c",],
            ["8c",],
            ["8c",],
            ["8c",],
            ["8c",],
            ["8c",],
            ["8c",],
            ["8c",],
            ["8c",],
            ["8c",],
            ["8c",],
            ["8c",],
            ["8c",],
            ["8c",],
            ["8c",],
            ["8c",],
            ["8c",],
            ["8c",],
            ["8c",],
            ["8c",],
            ["8c",],
            ["8c",],
            ["8c",],
            ["8c",],
            ["8c",],
            ["9c",],
        ],
        footer: "TABLE1c"
    },
    {
        header: ["field1d"],
        body: [
            ["1d",],
        ],
        footer: "TABLE1d"
    },
    {
        header: ["field1", "field2", "field3",],
        body: [
            ["1", "2", "3"],
            ["4", "5", "6"],
            ["7", "8", "9"],
        ],
        footer: "TABLE1"
    },
];

function fillTable() {
    IsTableReady$
        .pipe()
        .emitByPositive((isReady) => isReady)
        .subscribe(() => {
            let index = 0;
            const counter = setInterval(
                () => {
                    TableData$.next(Tables[index]);

                    index++;
                    if (index === Tables.length || index > Tables.length) {
                        clearInterval(counter);
                    }
                },
                5000
            );
        });
}
