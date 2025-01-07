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

const validateFileField = (fieldId,object,propertyOne,propertyTwo,oldObject,privId,nameFieldID)=>{
    if (fieldId.value != ""){
        console.log(fieldId.files); //files kiyane array eke 0 vena index eke thama file eka thiyenne saha file ekata adala okkoma thiyenne ex size eka name eka wage dewal thiyemme
        let file = fieldId.files[0];    //
        nameFieldID.value =file['name'];  //field id eke files kiyana array eken 0 veni eka access krala eke nama gannawa
        window[object][propertyTwo]=file['name'];


        let fileReader = new  FileReader(); //meka read karanna venne file reader objecr ekek use karagena
        fileReader.onload = function (e) { //file reader ekata annonymous function ekak call karala thiyeneawa E kiyala aran thiyenne onload ekata pass karana parameter eka
            privId.src=e.target.result; //preview eke source hatiyata pass wena file eke object eka thama E kiyala pass wenne. eeta passe e eke target eke result eka ganna puluwan| result eken enne image ekak image tag ekakata siuce eken set karanwa wage wadak venne
            window[object][propertyOne]=btoa(e.target.result)   //btoa() eken venne image code eka encrypt kara gannawa
        }

        fileReader.readAsDataURL(file);// is a method in the FileReader API used to read the contents of a File or Blob object. When the read operation is complete, the result attribute contains a data URL representing the file's data. This data URL can be used as a source for images or other media elements in web applications.
        return ; //return eka dammata passe thama read as data url eke file ekata anuwa onload eka trigger vennee

    }
}







