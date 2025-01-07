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

    classOffering=JSON.parse(JSON.stringify(ob));
    oldClassOffering=JSON.parse(JSON.stringify(ob));

    $('#modalClassAdd').modal('show');


    textClassName.value=classOffering.classname;
    textFees.value=classOffering.fees;
    textDuration.value=classOffering.duration;
    textServiceCharge.value=classOffering.servicecharge;

    if (classOffering.note != null){
        textNote.value=classOffering.note;
    }else {
        textNote.value="";
    }

    classTypes=ajaxGetRequest("/classtype/findall");
    fillDataIntoSelect(selectClassType,'select class type',classTypes,'name',classOffering.classtype_id.name);

    academicYears=ajaxGetRequest("/academicyear/findall")
    fillDataIntoSelect(SelectAcademicYear,'select academic year',academicYears,'name',classOffering.academicyear_id.name);

    subjects=ajaxGetRequest("/subject/findall");
    fillDataIntoSelect(selectSubject,'select subject',subjects,'name',classOffering.subject_id.name);

    teachers=ajaxGetRequest("/teacher/findall")
    fillDataIntoSelect(selectTeacher,'select teacher',teachers,'fullname',classOffering.teacher_id.fullname);

    grades=ajaxGetRequest("/grade/findall");
    fillDataIntoSelect(selectGrade,'select grade',grades,'name',classOffering.grade_id.name);


}

// create function for class delete
const deleteClass = (ob,rowIndex)=>{
    console.log('delete');

    tableClass.children[1].children[rowIndex].style.backgroundColor='pink';

    setTimeout(function (){
        const userConfirm = confirm('are you sure to delete following class \n'
            + '\n class name is '+ob.classname
            + '\n fees is '+ob.fees
            + '\n duration is '+ob.duration
            + '\n service charge is '+ob.servicecharge
        );

        if (userConfirm){
            const deleteServerResponse = ajaxDeleteRequest("/classoffering",ob);
            if (deleteServerResponse == 'ok'){
                alert("delete successfull");
                refreshClassOfferingTable()
                // Swal.fire({ title:'delete successful', icon:'success'});
            }else {
                alert('delete was unsuccessful you might have following errors \n' + deleteServerResponse)
                // Swal.fire({ title: 'delete unsuccessful you might have following errors \n'+deleteServerResponse, icon: 'error'});
            }
        }
    },500)


}

//create function for print class
const printClass = (ob,rowIndex)=>{
    console.log('print')
}


//create function for check error
const checkFormErrors = ()=>{
    let errors = '';

    if (classOffering.classname == null){
        errors =errors+' class name cannot be empty \n'
        textClassName.classList.add('is-invalid');
    }

    if (classOffering.fees == null){
        errors =errors+' fees cannot be empty \n'
        textFees.classList.add('is-invalid');
    }

    if (classOffering.duration == null){
        errors=errors+' duration cannot be empty \n'
        textDuration.classList.add('is-invalid');
    }

    if (classOffering.servicecharge == null){
        errors=errors+' service charge cannot be empty \n'
        textServiceCharge.classList.add('is-invalid');
    }

    if (classOffering.classtype_id == null){
        errors = errors+'class type cannot be empty \n'
        selectClassType.classList.add('is-invalid');
    }


    if (classOffering.academicyear_id == null){
        errors =errors+' academic year cannot be empty \n'
        SelectAcademicYear.classList.add('is-invalid');
    }


    if (classOffering.subject_id == null){
        errors =errors+' subject cannot be empty \n'
        selectSubject.classList.add('is-invalid');
    }

    if (classOffering.teacher_id == null){
        errors= errors+' teacher cannot be empty \n'
        selectTeacher.classList.add('is-invalid');
    }

    if (classOffering.grade_id == null){
        errors = errors+ ' grade cannot be empty \n'
        selectGrade.classList.add('is-invalid');
    }

    return errors;
}

//create function for submit class
const classSubmit = ()=>{
    console.log(classOffering);

    const errors = checkFormErrors();
    if (errors == ''){
        //if errors not available
        const userConfirm = confirm('are you sure to add this following class offering'
        +'\n class name is'+classOffering.classname
        +'\n fees  is'+classOffering.fees
        +'\n duration  is'+classOffering.duration
        +'\n servicecharge  is'+classOffering.servicecharge
        )
        //get user confirmation
        if (userConfirm){
            let postServiceResponse = ajaxPostRequest("/classoffering",classOffering);
            if (postServiceResponse=="ok"){
                alert('save success '+postServiceResponse);
                classOfferingForm.reset();
                refreshClassOfferingForm()
                $('#modalClassAdd').modal('hide');
                refreshClassOfferingTable();
            }else {
                alert('save not success'+postServiceResponse);
            }
        }
    }else {
        // alert('you might have some errors \n'+errors);
        swal.fire({
            title:'you might have some errors \n '+errors,
            icon:'error'
        });
    }

}


//define function for check class offering update
const checkUpdates=()=>{
    let updates="";

    if (classOffering.classname != oldClassOffering.classname){
        updates=updates+"class name is updated \n";
    }
    if (classOffering.fees != oldClassOffering.fees){
        updates=updates+"fees is updated \n";
    }
    if (classOffering.duration != oldClassOffering.duration){
        updates=updates+"duration is updated \n";
    }
    if (classOffering.note != oldClassOffering.note){
        updates=updates+"note is updated \n"
    }
    if (classOffering.servicecharge != oldClassOffering.servicecharge){
        updates=updates+"service charge updated \n"
    }
    if (classOffering.classtype_id.name != oldClassOffering.classtype_id.name){
        updates=updates+"class type is updated \n";
    }
    if (classOffering.academicyear_id.name != oldClassOffering.academicyear_id.name){
        updates=updates+"academic year is updated \n";
    }
    if (classOffering.subject_id.name != oldClassOffering.subject_id.name){
        updates=updates+"subject is updated \n";
    }
    if (classOffering.teacher_id.fullname != oldClassOffering.teacher_id.fullname){
        updates=updates+"teacher is changed \n"
    }
    if (classOffering.grade_id.name != oldClassOffering.grade_id.name){
        updates=updates+"grade is changed \n";
    }

    return updates
}

const buttonFormUpdate = ()=>{
    console.log('update');
    let errors = checkFormErrors();
    if (errors==""){
        let updates = checkUpdates();
        if (updates ==""){
            alert('nothing updated');
        }else {
            const userConfirm = confirm('are you sure to update following changes to class offering\n'+updates);
            if (userConfirm){
                let putServiceResponse = ajaxPutRequest("/classoffering",classOffering);
                if (putServiceResponse=="ok"){
                    alert('save success '+putServiceResponse);
                    classOfferingForm.reset();
                    refreshClassOfferingForm()
                    $('#modalClassAdd').modal('hide');
                    refreshClassOfferingTable();
                }else {
                    alert('save not success '+putServiceResponse);
                }
            }
        }
    }

}







































