window.addEventListener('load', () => {
    console.log('working');

    //call refresh class offering form
    refreshClassOfferingForm();

    //call refresh class offering table
    refreshClassOfferingTable();


});
//define refresh class offering refresh form
const refreshClassOfferingForm = ()=>{

    classOffering = new Object();

    classTypes=ajaxGetRequest("/classtype/findall");
    fillDataIntoSelect(selectClassType,'select class type',classTypes,'name');

    academicYears=ajaxGetRequest("/academicyear/findall")
    fillDataIntoSelect(SelectAcademicYear,'select academic year',academicYears,'name');

    subjects=ajaxGetRequest("/subject/findall");
    fillDataIntoSelect(selectSubject,'select subject',subjects,'name');

    teachers=ajaxGetRequest("/teacher/findall")
    fillDataIntoSelect(selectTeacher,'select teacher',teachers,'fullname');

    grades=ajaxGetRequest("/grade/findall");
    fillDataIntoSelect(selectGrade,'select grade',grades,'name');


    textClassName.style.border='2px solid #ced4da';
    textFees.style.border='2px solid #ced4da';
    textDuration.style.border='2px solid #ced4da';
    textServiceCharge.style.border='2px solid #ced4da';
    selectClassType.style.border='2px solid #ced4da';
    SelectAcademicYear.style.border='2px solid #ced4da';
    selectSubject.style.border='2px solid #ced4da';
    selectTeacher.style.border='2px solid #ced4da';
    selectGrade.style.border='2px solid #ced4da';
    textNote.style.border='2px solid #ced4da';


}


//define refresh class offering table
const refreshClassOfferingTable = () => {

    classOfferings=ajaxGetRequest("/classoffering/findall")

    displayProperty=[
        {dataType: 'text',propertyName:'classname'},
        {dataType:'text',propertyName:'fees'},
        {dataType:'text',propertyName:'duration'},
        {dataType:'text',propertyName:'servicecharge'},

        {dataType:'function',propertyName:getClassType},
        {dataType:'function',propertyName:getAcademicYear},
        {dataType:'function',propertyName:getSubject},
        {dataType:'function',propertyName:getTeacher},
        {dataType:'function',propertyName:getGrade},

    ];

    fillDataIntoTable(tableClass,classOfferings,displayProperty,true)

};

//create function for getClassStatus
const getClassType = (ob)=>{
    return ob.classtype_id.name;
}

//create function for getDate
const getAcademicYear = (ob)=>{
    return ob.academicyear_id.name;
}

//create function for getSubject
const getSubject = (ob)=>{
    return ob.subject_id.name;
}

//create function for getTeacher
const getTeacher = (ob)=>{
    return ob.teacher_id.name;
}
//create function for getGrade
const getGrade = (ob)=>{
    return ob.grade_id.name;
}



// create function for class refill
const classFormRefill = (ob,rowIndex)=>{
    console.log('refill'+ob+' '+rowIndex);
}

// create function for class delete
const deleteClass = (ob,rowIndex)=>{
    console.log('delete');

    tableClass.children[1].children[rowIndex].style.backgroundColor='pink';

    setTimeout(function (){
        const userConfirm = confirm('are you sure to delete following class \n'
            + '\n class code is '+ob.classcode
            + '\n teacher  is '+ob.teacher_id.name
            + '\n grade  is '+ob.grade_id.name
            + '\n subject  is '+ob.subject_id.name
            + '\n date  is '+ob.date_id.name
            + '\n class status  is '+ob.classstatus_id.name
        );

        if (userConfirm){
            const deleteServerResponse = 'ok'
            if (deleteServerResponse == 'ok'){
                // alert("delete successfull")
                Swal.fire({ title:'delete successful', icon:'success'});
            }else {
                // alert('delete was unsuccessful you might have following errors \n' + deleteServerResponse)
                Swal.fire({ title: 'delete unsuccessful you might have following errors \n'+deleteServerResponse, icon: 'error'});
            }
        }
        refreshClassTable();
    },500)


}

//create function for print class
const printClass = (ob,rowIndex)=>{
    console.log('print')
}


//create function for check error
const checkFormErrors = ()=>{
    let errors = '';

    if (cls.teacher_id == null){
        errors= errors+' teacher cannot be empty \n'
        selectTeacher.classList.add('is-invalid');
    }
    if (cls.grade_id == null){
        errors = errors+ ' grade cannot be empty \n'
        selectGrade.classList.add('is-invalid');
    }
    if (cls.subject_id == null){
        errors =errors+' subject cannot be empty \n'
        selectSubject.classList.add('is-invalid');
    }
    if (cls.duration == null){
        errors=errors+' duration cannot be empty \n'
        selectDuration.classList.add('is-invalid');
    }
    if (cls.year == null){
        errors =errors+' year cannot be empty \n'
        textYear.classList.add('is-invalid');
    }
    if (cls.date_id == null){
        errors = errors+'date cannot be empty \n'
        selectDate.classList.add('is-invalid');
    }
    if (cls.fees == null){
        errors =errors+' fees cannot be empty \n'
        textFees.classList.add('is-invalid');
    }
    if (cls.classstatus_id == null){
        errors = errors + ' status cannot be empty \n'
        selectStatus.classList.add('is-invalid');
    }
    return errors;
}

//create function for submit class
const classSubmit = ()=>{
    console.log(cls);

    const errors = checkFormErrors();
    if (errors == ''){
        //if errors not available
        //get user confirmation
    }else {
        // alert('you might have some errors \n'+errors);
        swal.fire({
            title:'you might have some errors \n '+errors,
            icon:'error'
        });
    }

}



