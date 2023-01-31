export const lengthString = (str: string) => {
    if (str.length > 15) {
        let arr = str.split('');
        arr.splice(6, (arr.length - 15), '...');
        str = arr.join('');
    }
    return str;
}
export const cutString = (str: string) => {
    if (str.length > 65) {
        let arr = str.split('');
        arr.splice(65, (arr.length - 65), '...');
        str = arr.join('');
    }
    return str;
}

export const convertToBase64 = (image: any) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(image);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};