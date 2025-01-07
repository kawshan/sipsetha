window.addEventListener('load',()=>{

    userPrivilege =ajaxGetRequest("/privilege/byloggeduser/enrolment")


    refreshEnrolmentForm();

    refreshEnrolmentTable();
})

//define refresh Enrolment Table
const refreshEnrolmentTable = ()=>{
    enrolments=ajaxGetRequest("/enrolment/findall");
    displayProperty=[
        {dataType:'text',propertyName:'enrolmentnum'},
        {dataType:'function',propertyName:getTotalClassIncome},
        {dataType:'function',propertyName:getTotalServiceCharge},
        {dataType:'function',propertyName:getTotalAdditionalCharge},
        {dataType:'function',propertyName:getTotalToBePayed},
        {dataType:'function',propertyName:getPayedAmount},
        {dataType:'function',propertyName:getEnrolmentStatusId},
    ];
    fillDataIntoTable(tableEnrolment,enrolments,displayProperty,checkPrivilege,true)

    $('#tableEnrolment').dataTable();

}

const checkPrivilege = (innerOb)=>{
    if (innerOb.enrolmentstatus_id.name != 'not-active') {
        if (!userPrivilege.delete) {
            divModifyButtonDelete.className = 'd-none';
        }
    }
        else {
            divModifyButtonDelete.disabled=true;
            divModifyButtonDelete.style.cursor='not-allowed'

    }
}

const getTotalClassIncome = (ob)=>{
    return parseFloat(ob.totalclassincome).toFixed(2);
}

const getTotalServiceCharge = (ob)=>{
    return parseFloat(ob.totalservicecharge).toFixed(2);
}

const getTotalAdditionalCharge = (ob)=>{
    return parseFloat(ob.totaladditionalcharge).toFixed(2);
}

const getTotalToBePayed = (ob)=>{
return parseFloat(ob.totaltobepayed).toFixed(2);
}

const getPayedAmount = (ob)=>{
return parseFloat(ob.payedamount).toFixed(2);
}

const getEnrolmentStatusId = (ob)=>{
return ob.enrolmentstatus_id.name;
}



//define refresh enrolment form
const refreshEnrolmentForm = ()=>{
    
}