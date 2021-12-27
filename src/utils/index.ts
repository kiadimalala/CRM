/**Read from LS */
export const getFromLS = (key: string) => {
    try{
        if(typeof window !== 'undefined'){
            const item = localStorage.getItem(key);
            return item;
        }
        else {
            return null
        }
    }
    catch(err){
        return null;
    }
}

/**Write to LS */

export const writeToLS = (key: string, data: string) => {
    try{
        if(typeof window !== 'undefined'){
            localStorage.setItem(key, data);
            return true;
        }
        else return false;
    }
    catch(err){
        return false;
    }
}

/**Remove from LS */

export const removeFromLS = (key: string) => {
    try{
        if(typeof window !== 'undefined'){
            localStorage.removeItem(key);
            return true;
        }
        else return false;
    }
    catch(err){
        return false;
    }
}