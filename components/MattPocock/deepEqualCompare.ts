export const deepEqualCompare = <Arg>(a: Arg extends any[] ? "Dont pass an array" : Arg, b: Arg):boolean=>{
    //check is no longer needed due do extends check
    // if (Array.isArray(a) || Array.isArray(b)) {
    //     throw new Error ("You cannot compare arrays using deepEqualCompare");
    // }
    return a === b;
}