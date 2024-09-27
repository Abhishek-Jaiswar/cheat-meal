
export const generateVerificationCode = (codeLength = 6) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let verificationCode = '';
    const charactersLength = characters.length;

    for (let i = 0; i < codeLength; i++) {
        verificationCode += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return verificationCode.toUpperCase();
} 

console.log(generateVerificationCode());

