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


const checkBoxValidator = (fieldId,pattern,object,property)=>{
    if (fieldId.value != ''){
        fieldId.style.border='2px solid green';
        window[object][property] = fieldId.value;
    }else {
        fieldId.style.border='2px solid green';
        window[object][property] = null;

    }

}

