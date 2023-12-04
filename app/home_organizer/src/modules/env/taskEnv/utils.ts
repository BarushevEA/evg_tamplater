const symbols1 = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
const symbols2 = "01234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
const symbols3 = ":-.";
const len1 = symbols1.length - 1;
const len2 = symbols2.length - 1;
const len3 = symbols3.length - 1;
const defaultIdLength = 32;

export const getId = (prefix: string, length: number): string => {
    length = Math.round(length / 2);
    let encrypted = prefix;
    encrypted += symbols1[Math.round(Math.random() * len1)] +
        (Math.round(Math.random()) ?
            symbols3[Math.round(Math.random() * len3)] :
            symbols2[Math.round(Math.random() * len2)]);

    for (let i = 1; i < length; i++) {
        encrypted += symbols2[Math.round(Math.random() * len2)] +
            (Math.round(Math.random()) ?
                symbols3[Math.round(Math.random() * len3)] :
                symbols2[Math.round(Math.random() * len2)]);
    }

    return encrypted;
};

export const getDefaultId = (): string => getId("id# ", defaultIdLength);
