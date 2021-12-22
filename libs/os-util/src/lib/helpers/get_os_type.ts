import os from 'os';
const getOsType = ()=>{
    const types = {
        "Windows_NT":"Windows",
        "Darwin":"MacOS",
    }
    const actualType = os.type();
    return types[actualType] || actualType;
}
export default getOsType;