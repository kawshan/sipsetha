window.addEventListener('load', () => {
    console.log('working');

    cls = new Object();

    refreshClassTable();

    grades = [
        {id: 1, name: 'nursery'},
        {id: 2, name: 'grade 3'},
        {id: 3, name: 'grade 4'},
        {id: 4, name: 'grade 5'},
        {id: 5, name: 'grade 6'},
        {id: 6, name: 'grade 7'},
        {id: 7, name: 'grade 8'},
        {id: 8, name: 'grade 9'},
        {id: 9, name: 'grade 10'},
        {id: 10, name: 'grade 11'},
        {id: 11, name: 'grade 12'},
        {id: 12, name: 'grade 13'}
    ];

    fillDataIntoSelect(selectGrade, 'select a grade', grades, 'name');

    subjects = [
        {id: 1, name: 'nursery'},
        {id: 2, name: 'sinhala'},
        {id: 3, name: 'history'},
        {id: 4, name: 'maths'},
        {id: 5, name: 'science'},
        {id: 6, name: 'geography'},
        {id: 7, name: 'dancing'},
        {id: 8, name: 'music'},
    ];

    fillDataIntoSelect(selectSubject, 'select subject', subjects, 'name');

    dates = [
        {id: 1, name: 'monday'},
        {id: 2, name: 'tuesday'},
        {id: 3, name: 'wednesday'},
        {id: 4, name: 'thursday'},
        {id: 5, name: 'friday'},
        {id: 6, name: 'saturday'},
        {id: 7, name: 'sunday'},
    ];

    fillDataIntoSelect(selectDate, 'select a date', dates, 'name');

    classstatuses = [
        {id: 1, name: 'present'},
        {id: 2, name: 'delete'}
    ];

    fillDataIntoSelect(selectStatus,'select status',classstatuses,'name')

    teachers=[
        {id:1,name:'nimal'},
        {id:2,name:'sunil'}
    ];

    fillDataIntoSelect(selectTeacher,'select teacher',teachers,'name');

});

const refreshClassTable = () => {

    clases=[
        {id:1,classcode:'00001',teacher_id:{id:1,name:'nimal perera'},grade_id:{id:1,name:'grade 6'},subject_id:{id:1,name:'sinhala'},date_id:{id:1,name:'monday'},classstatus_id:{id:1,name:'present'},year:'2023',duration:'one year',fees:'500'}
    ];

    displayProperty=[
        {dataType: 'text',propertyName:'classcode'},
        {dataType:'function',propertyName:getTeacher},
        {dataType:'function',propertyName:getGrade},
        {dataType:'function',propertyName:getSubject},
        {dataType:'function',propertyName:getDate},
        {dataType:'function',propertyName:getClassStatus},
        {dataType:'text',propertyName:'year'},
        {dataType:'text',propertyName:'duration'},
        {dataType:'text',propertyName:'fees'}
    ];

    fillDataIntoTable(tableClass,clases,displayProperty,true)

};

//create function for getTeacher
const getTeacher = (ob)=>{
    return ob.teacher_id.name;
}
//create function for getGrade
const getGrade = (ob)=>{
    return ob.grade_id.name;
}
//create function for getSubject
const getSubject = (ob)=>{
    return ob.subject_id.name;
}
//create function for getDate
const getDate = (ob)=>{
    return ob.date_id.name;
}
//create function for getClassStatus
const getClassStatus = (ob)=>{
    return ob.classstatus_id.name;
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



