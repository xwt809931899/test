/**
 * Created by lred on 2016/1/22.
 */
var store = {};

store.found = {};
store.eid;

store.createParams = function (obj) {
    var params = {
        title: obj.text,
        titleImg: obj.imgUrl,
        canQuote: obj.canQuote,
        // isOriginal: 1,
        // orgEid: 0,
        status: obj.status,
        content: [],
    };
//    obj.fields.forEach(function (item) {
//        var field;
//        switch (item.type) {
//            case "1":
//                field = {
//                    type: "1",
//                    text: item.text,
//                };
//                break;
//            case "2":
//                field = {
//                    type: "2",
//                    imgUrl: item.imgUrl,
//                };
//                break;
//            case "3":
//                item.type = "3";
//                field = item;
//                break;
//        }
//        params.content.push(field);
//    })

    params.content = JSON.stringify(obj.fields);


    return params;
}
export default store;