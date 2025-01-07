const textValidator = (fieldId,pattern,object,property)=>{
    const regPattern = new RegExp(pattern);
    if (fieldId.value != ""){
        if (regPattern.test(fieldId.value)){
            window[object][property] = fieldId.value;
            fieldId.style.border='2px solid green'
            console.log('ok');

        }else {
            window[object][property] = null;
            fieldId.style.border='2px solid red';
            console.log('error');
        }
    }else {
        if (fieldId.required){
            fieldId.style.border='2px solid red';
        }else {
            fieldId.style.border='1px solid #ced4da';
        }
    }
}


const selectDBValidator = (fieldId,pattern,object,property)=>{
    if (fieldId.value != ''){
        fieldId.style.border='2px solid green';
        window[object][property] = JSON.parse(fieldId.value);
    }else {
        fieldId.style.border='2px solid red';
        window[object][property] = null

    }
}

const selectValidator = (fieldId,pattern,object,property)=>{
    if (fieldId.value != ''){
        fieldId.style.border='2px solid green';
        window[object][property] = fieldId.value;
    }else {
        fieldId.style.border='2px solid red';
        window[object][property] = null

    }
}


const checkBoxValidator = (fieldId,pattern,object,property,trueValue,falseValue,labelID,labelTrueValue,labelFalseValue)=>{
//     if (fieldId.value != ''){
//         fieldId.style.border='2px solid green';
//         window[object][property] = fieldId.value;
//     }else {
//         fieldId.style.border='2px solid red';
//         window[object][property] = null;
//
//     }

    if (fieldId.checked){
        window[object][property]=trueValue;
        labelID.innerText = labelTrueValue;
    }else {
        window[object][property]=falseValue;
        labelID.innerText=labelFalseValue;
    }


}

const dataListValidator = (fieldId,dataListName,object,property,oldObject,displayPropertyOne,displayPropertyTwo) =>{

    const fieldValue = fieldId.value;
    if (fieldValue!==""){
        let dataList = window[dataListName];
        let extIndex=-1;
        for (const index in dataList){
            if (fieldValue == dataList[index][displayPropertyOne]+" "+dataList[index][displayPropertyTwo]){
                extIndex=index;
                break
            }
        }
        if (extIndex!=-1){
            window[object][property] = dataList[extIndex];
            if (window[oldObject]!=null && window[object][property]['id']!= window[oldObject][property]['id']){
                fieldId.style.border='2px solid orange';
            }else {
                fieldId.style.border='2px solid green';
            }
        }else {
            window[object][property]=null;
            fieldId.style.border='2px solid red';
        }


    }else {
        window[object][property]=null;
        if (fieldId.required){
            fieldId.style.border='2px solid red';
        }else {
            fieldId.style.border='2px solid #ced4da';

        }
    }
}

//start validation of two values
const textValidatorWithTwoValues=(fieldId,pattern,object,property,oldObject)=>{
    const fieldValue = fieldId.value;
    const regPattern = new RegExp(pattern);

    if (fieldValue !== ""){
        if (regPattern.test(fieldValue)){
            //bind value into object property
            window[object][property]=fieldValue;

            if (window[oldObject]!=null && window[object][property]!=window[oldObject][property]){
                // fieldId.style.border="2px solid #e67e22";
                fieldId.style.backgroundColor="#f1c40f";
            }else {
                fieldId.style.border="2px solid green";
            }
        }else {
            fieldId.style.border="2px solid red";
            window[object][property]=null;  //need to bind null
        }
    }else {
        if (fieldId.required){
            window[object][property]=null;
            fieldId.style.border="2px solid red";
        }else {
            fieldId.style.border = '2px solid #ced4da';
        }
    }



}

const selectDBFieldValidatorWithTwoValues = (fieldId,pattern,object,property,oldObject)=>{
    const fieldValue = fieldId.value;
    if (fieldValue!==""){
        window[object][property]=JSON.parse(fieldValue);//convert js object   //json parse eken venne string eka java script object ekat convert vena eka
                                                        //JSON.stringify is a JavaScript method used to convert a JavaScript object or value to a JSON string
        if (window[oldObject]!=null && window[object][property]['id']!= window[oldObject][property]['id']){
            // fieldId.style.border="2px solid #e67e22";
            fieldId.style.backgroundColor="#f1c40f";
        }else {
            fieldId.style.border="2px solid green";
        }
    }else {
        window[object][property]=null;
        if (fieldId.required){
            fieldId.style.border="2px solid red";
        }else {
            fieldId.style.border="2px solid #ced4da";
        }
    }

}









