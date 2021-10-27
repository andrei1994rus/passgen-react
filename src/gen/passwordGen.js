const symbols='!%*)(}{?@#$~_-+=';
const numbers='0123456789';
const alphabet='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const generateRandomCharForPassword=chars=>chars.charAt(Math.floor(Math.random()*chars.length));

const createPassword=(length,hasNumbers,hasSymbols)=>
{
	let chars=alphabet;
	
	chars+=(hasNumbers) ? numbers : '';
	chars+=(hasSymbols) ? symbols : '';

	let password='';

    for(let i=0;i<length;i++)
    {
    	password+=generateRandomCharForPassword(chars);
    }

    return password;
}

export default createPassword;