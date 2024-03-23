export const roundTotalPrice = (num : number) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}


export const convertDocToObj = (Doc :any) => {
 Doc._id = Doc._id.toString();
 return Doc;   
}