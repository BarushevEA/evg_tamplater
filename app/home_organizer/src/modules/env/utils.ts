export function formattedDate(num: number): string {
    let date = ""+num;
    if (date.length<2) date = "0" + date;

    return date;
}
