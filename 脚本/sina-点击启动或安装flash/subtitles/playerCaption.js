function captionData(data){
    data = data[0];
    sendMsg("captionData",data);
}
function captionFile(data){
    var arr = data[0];
    var islive = data[1];
    if(islive==true||islive=="true"){
        islive = true;
    }
    var ids = [];
    var sentences = [];

    if(arr.length>1){
        var sentence = arr[0];
        var id = sentence.sentence_id2;
        for(var i = 1;i<arr.length;i++){
            if(id!=arr[i].sentence_id2){
                var index = ids.indexOf(id);
                if(index!=-1){
                    sentences[index] = sentence;
                }
                else{
                    sentences.push(sentence);
                    ids.push(id);
                }
                sentence = arr[i];
                id = sentence.sentence_id2;
            }
            else{
                sentence = arr[i];
            }
        }
    }
    else if(arr.length==1){
        sentences = arr;
    }

    var tmpArr = [sentences,islive];
    sendMsg("captionFile",tmpArr);
}

function sendMsg(type,data){
    //console.log("sendMsg",type,data);
    var obj = {type:type,content:data};
    window.parent.postMessage(JSON.stringify(obj),"*");
}