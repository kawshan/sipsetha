const fillDataIntoSelect = (fieldId,message,dataList,property,selectedValue)=>{
    fieldId.innerHTML='';
    const optionMsj = document.createElement('option');
    optionMsj.innerText =message;
    optionMsj.selected='selected';
    optionMsj.disabled='disabled';
    fieldId.appendChild(optionMsj);


    dataList.forEach(element=>{
        const option = document.createElement('option');
        option.innerText=element[property];
        option.value=JSON.stringify(element); // json string ekak set kararanna one nisa meka dynamic dropdown mewa data base eken gannn one
        if (selectedValue == element[property]){
            option.selected='selected';
            console.log("ok")
        }
        fieldId.appendChild(option);
    })
}

//define function for fill data into select with two attributes
const fillDataIntoSelectWithTwoAttributes = (fieldId,message,dataList,property,propertyTwo,selectedValue)=>{
    fieldId.innerHTML=""; //inner html eka clean karala danawa monawath nathi venna ee html eka athule thiyena

    if (message!=""){
        let optionMessage=document.createElement('option');
        optionMessage.value='';
        optionMessage.selected='selected';
        optionMessage.disabled='disabled';
        optionMessage.innerText=message;
        fieldId.appendChild(optionMessage);
    }
    for (const ob of dataList){
        let option = document.createElement('option');
        option.value=JSON.stringify(ob);    //convert into json string and then assign to element
        option.innerText="("+ob[property]+")"+ob[propertyTwo];
        if (selectedValue==ob[property]){
            option.selected='selected';
        }
        fieldId.appendChild(option)
    }

}

//define function into fill data into data list
const fillDataIntoDataList = (fieldId,dataList,property,propertyTwo)=>{
    fieldId.innerHTML=""//empting all inner htmls
    for (const ob of dataList){
        let option = document.createElement('option');
        option.value=ob[property]+" "+ob[propertyTwo];
        fieldId.appendChild(option);
    }
}



















































