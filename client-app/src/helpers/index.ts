export const lengthString = (str: string) => {
    if (str.length > 15) {
        let arr = str.split('');
        arr.splice(6, (arr.length - 15), '...');
        str = arr.join('');
    }
    return str;
}