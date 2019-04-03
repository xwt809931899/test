// const nums = ['c', 'a', 'z', 'y'];
// // console.log(nums.sort());     //sort方法排序  按字母排序
// const nums2 = [1,10,2,28];
// console.log(nums2.sort(function(a, b){
//     return a-b < 0;
// }));

const people = [
    {age:46,name:'roger'},
    {age:99,name:'xwt'},
    {age:26,name:'zzw'},
    {age:74,name:'dq'}
]
var orderPeople = function (people) {
    return people.sort((a,b) => {
        return a.age - b.age 

    })
}
console.log(orderPeople(people));