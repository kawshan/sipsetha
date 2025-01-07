window.addEventListener('load',()=>{
    //get privileges to check button events
    userPrivilege =ajaxGetRequest("/privilege/byloggeduser/classhall")

    refreshClassHallForm();

    refreshClassHallTable();

});

//define function for refresh class hall table
const refreshClassHallTable = ()=>{

    classhalls=ajaxGetRequest("/classhall/findall")

    displayProperty=[
        {dataType:'text',propertyName:'name'},
        {dataType:'text',propertyName:'location'},
        {dataType:'text',propertyName:'tablecount'},
        {dataType:'text',propertyName:'benchcount'},
        {dataType:'function',propertyName:getClassHallStatus},
    ];

    fillDataIntoTable(tableClassHall,classhalls,displayProperty,checkPrivilege,true)
    $('#tableClassHall').dataTable();

}

const checkPrivilege = (innerOB)=>{
    if (innerOB.classhallstatus_id.name!="inactive"){
        if (!userPrivilege.delete){
            divModifyButtonDelete.className='d-none';
        }
    }else {
        divModifyButtonDelete.disabled=true;
        divModifyButtonDelete.style.cursor='not-allowed';
    }
}

//define function for get class hall status
const getClassHallStatus = (rowOb)=>{
    if (rowOb.classhallstatus_id.name == 'active'){
        return 'active';
    }else if (rowOb.classhallstatus_id.name == 'under-construction'){
        return 'under construction';
    }else {
        return 'in-active'
    }
}


//define function for refresh class hall form
const refreshClassHallForm = ()=>{
    classhall = new Object();
    classHallForm.reset();
    classhall.features = [];

    classHallStatus = ajaxGetRequest("/classhallstatus/findall");
    fillDataIntoSelect(selectClassHallStatus,'select status',classHallStatus,'name');

    availbaleFeatures=ajaxGetRequest("/classhallfeatures/findall")
    fillDataIntoSelect(selectAllItem,'select features',availbaleFeatures,'name');

    fillDataIntoSelect(selectedFeatures,'',classhall.features,'name');


    textName.style.border='2px solid #ced4da';
    textLocation.style.border='2px solid #ced4da';
    textMinCount.style.border='2px solid #ced4da';
    textMaxCount.style.border='2px solid #ced4da';
    textTableCount.style.border='2px solid #ced4da';
    textBenchCount.style.border='2px solid #ced4da';
    textMaxTableCount.style.border='2px solid #ced4da';
    textMaxBenchCount.style.border='2px solid #ced4da';
    textNote.style.border='2px solid #ced4da';
    selectClassHallStatus.style.border='2px solid #ced4da';


//man methana karala thiyenne filed id eka aran eke inner html eka empty karala message eka aran eka disable karala eka selected karala iita passe eka appen karala eeta passe data list ekata loop ekk hadala ekata document create element eken element ekak create karan eka appenc child karala select element ekata dagena thiyenwa iita passe selected value eka deela thiyenwa active kiyala
    fillDataIntoSelect(selectClassHallStatus,'select status',classHallStatus,'name','active');
    selectClassHallStatus.style.border="2px solid green";   //colur eka green karala thiyenwa
    classhall.classhallstatus_id=JSON.parse(selectClassHallStatus.value);   //object eke property ekata bind karagen thiyenewa json parse karagena ai json parse karanne apita server eken enner json string ekak eeka ehema thiyegena apita wada karanna ba ee nisa JSON string eka JS object ekata convert karanna one nisa thama meka karanne


    //need to disable update button when form is refreshing
    btnClassHallUpdate.disabled=true     //
    btnClassHallUpdate.style.cursor="not-allowed";       //ethakota cursor eka me symbol eken 🚫 pennnawa


    btnClassHallAdd.disabled=false;  //disable false ee kiyanne visible venna hadanawa
    btnClassHallAdd.style.cursor="pointer";      ////refill ekedi pointer not allowed dunna nisa thama methana pointer dunne ethakota cursor eka 👆 mehema pennanawa


    if (!userPrivilege.update){
        btnClassHallUpdate.disabled=true;
        btnClassHallUpdate.style.cursor='not-allowed';
    }

    if (!userPrivilege.insert){
        btnClassHallAdd.disabled=true;
        btnClassHallAdd.style.cursor='not-allowed';
    }

};

//define function for
const classHallFormRefill = (ob,rowIndex)=>{
    classhall=JSON.parse(JSON.stringify(ob));
    oldClasshall=JSON.parse(JSON.stringify(ob));

    console.log('refill'+rowIndex);
    $('#modalClassHallAdd').modal('show');

    textName.value = classhall.name;
    textLocation.value = classhall.location;
    textMinCount.value = classhall.mincount;
    textMaxCount.value = classhall.maxcount;
    textTableCount.value = classhall.tablecount;
    textBenchCount.value = classhall.benchcount;
    textMaxTableCount.value = classhall.maxtablecount;
    textMaxBenchCount.value = classhall.maxbenchcount;

    if (classhall.note != null){
        textNote.value = classhall.note;
    }else {
        textNote.value="";
    }


    fillDataIntoSelect(selectClassHallStatus,'select status',classHallStatus,'name',classhall.classhallstatus_id.name);

    availbaleFeatures=ajaxGetRequest("/classhallfeatures/withoutchfeatures/"+classhall.id)
    fillDataIntoSelect(selectAllItem,'select features',availbaleFeatures,'name');

    fillDataIntoSelect(selectedFeatures,'',classhall.features,'name');


    btnClassHallUpdate.disabled=false   //update button eka enable karanwa
    btnClassHallUpdate.style.cursor="pointer";  //cursor eka pointer denawa


    btnClassHallAdd.disabled=true;  //add button eka disable karanawa
    btnClassHallAdd.style.cursor="not-allowed"; //cursor eka not allowed karanwa


    if (!userPrivilege.update){//privilege baluwa update eka karanna puluwan da ba da kiyala
        btnClassHallUpdate.disabled=true;//update privilege eka naththam diable karala danawa button eke
        btnClassHallUpdate.style.cursor='not-allowed';// pointer eka not allowed kiyala danawa
    }

}


//define function for
const deleteClassHall = (ob,rowIndex)=>{
    console.log('delete');

    tableClassHall.children[1].children[rowIndex].style.backgroundColor='pink';

    setTimeout(function () {
        const userConfirm= confirm('are you sure to delete following class hall'
        +'\n name is'+ob.name
        +'\n location  is'+ob.location
        );
        if (userConfirm){
            const deleteServerResponse= ajaxDeleteRequest("/classhall",ob);
            if (deleteServerResponse =="ok"){
                alert('delete successful')
                refreshClassHallTable();
                divModifyButton.className="d-none";
            }else {
                alert('delete unsuccessful '+deleteServerResponse);
            }
        }
        refreshClassHallTable()
    },500)
}
//define function for
const printClassHall = (ob,rowIndex)=>{
    console.log('print');
    console.log(ob);
    console.log(rowIndex);
    let classhalls = new Array(ob);

    displayProperty=[
        {dataType:'text',propertyName:'name'},
        {dataType:'text',propertyName:'location'},
        {dataType:'text',propertyName:'tablecount'},
        {dataType:'text',propertyName:'benchcount'},
        {dataType:'function',propertyName:getClassHallStatus},
    ];

    fillDataIntoTable(printClassHallTable,classhalls,displayProperty,"",false)


    let newWindow = window.open();
    newWindow.document.write(
        "<head>\n" +
        "    <link rel=\"stylesheet\" href=\"/bootstrap-5.2.3/css/bootstrap.min.css\">\n" +
        "    <script src=\"/bootstrap-5.2.3/js/bootstrap.bundle.min.js\"></script>\n" +
        "    <link rel=\"stylesheet\" href=\"/style/common.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"/style/button.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"/style/employee.css\">\n" +
        "</head>\n" +
        "<body>"+printClassHallTable.outerHTML+"</body> "
    );
    setTimeout(function (){ //settime out ekkk dunne uda table eka naththam print ui ea hariyata load venna one nisa thama minisecond 500 dunna ookooma bootstrap load vela ganata enna one nisa
        newWindow.stop();   //load vena eka nawaththuwa
        newWindow.print();  //print eka call kra
        newWindow.close();  //print rka open vela close krama close venawa
    },500);


}
//define function for check errors
const checkClassHallErrors = ()=>{
    let errors = ""

    if (classhall.name == null){
        errors=errors+"name cannot be empty \n"
    }
    if (classhall.location==null){
        errors=errors+"location cannot be empty \n";
    }
    if (classhall.mincount == null){
        errors=errors+"mincount cannot be empty \n";
    }
    if(classhall.maxcount == null){
        errors=errors+"maxcount cannot be empty \n";
    }
    if (classhall.tablecount==null){
        errors=errors+"table count cannot be empty \n";
    }
    if (classhall.benchcount == null){
        errors=errors+"bench count cannot be empty \n";
    }
    if (classhall.maxtablecount==null){
        errors=errors+"max table count cannot be empty \n";
    }
    if (classhall.maxbenchcount == null){
        errors=errors+"max bench count cannot be empty \n"
    }
    if (classhall.classhallstatus_id == null){
        errors=errors+"status cannot be empty \n"
    }

    return errors;
}

//define function for check updates
const checkClassHallUpdates = ()=>{
    console.log('checking update is called');
    let updates = '';

    if (classhall.name != oldClasshall.name){
        updates=updates+"class hall name is changed \n";
    }
    if (classhall.location != oldClasshall.location){
        updates=updates+"location is changed \n";
    }
    if (classhall.mincount != oldClasshall.mincount){
        updates=updates+"mincount is changed \n";
    }
    if (classhall.maxcount != oldClasshall.maxcount){
        updates=updates+"maxcount is changed \n";
    }
    if (classhall.tablecount != oldClasshall.tablecount){
        updates=updates+"table count is changed \n";
    }
    if (classhall.benchcount != oldClasshall.benchcount){
        updates=updates+"bench count is changed \n";
    }
    if (classhall.maxtablecount != oldClasshall.maxtablecount){
        updates=updates+"max table count is changed \n";
    }
    if (classhall.maxbenchcount != oldClasshall.maxbenchcount){
        updates=updates+"max table count is changed \n";
    }
    if (classhall.note != oldClasshall.note){
        updates=updates+"note is changed \n";
    }
    if (classhall.classhallstatus_id.name != oldClasshall.classhallstatus_id.name){
        updates=updates+"status is changed \n"
    }
    if (classhall.features.length!=oldClasshall.features.length){
        updates=updates+"class hall features are changed \n"
    }else {
        for (let element of classhall.features) {
            let extFeaturesCount = oldClasshall.features.map(item => item.id).indexOf(element.id);

            if (extFeaturesCount!=-1){
                updates=updates+"features are changed \n";
                break;
            }

        }
    }


    return updates;
}


const classHallUpdate = ()=>{
    console.log('update');
    console.log(classhall)
    console.log(oldClasshall);

    let errors = checkClassHallErrors();
    if (errors == ""){
        let updates = checkClassHallUpdates();
        if (updates==''){
            alert('nothing to update');
        }else {
            const userConfirm = confirm('are you sure to update following class hall \n'+updates);
            if (userConfirm){
                const putServiceResponse=ajaxPutRequest("/classhall",classhall);
                if (putServiceResponse=="ok"){
                    alert('update successful');
                    classHallForm.reset();
                    refreshClassHallForm();
                    $('#modalClassHallAdd').modal('hide');
                    refreshClassHallTable()
                    divModifyButton.className="d-none";
                }else {
                    alert("update not successful"+putServiceResponse)
                }
            }
        }
    }else {
        alert("form has following errors"+errors);
    }


}

//define function for class hall submit
const classHallSubmit = ()=>{
    console.log(classhall);
    const errors=checkClassHallErrors();
    if (errors==""){
        const userConfirm = confirm('are you sure to add following class hall'
        +'\n name is '+classhall.name
        +'\n location is '+classhall.location
        +'\n min count is '+classhall.mincount
        +'\n max count is '+classhall.maxcount
        +'\n table count is '+classhall.tablecount
        +'\n bench count is '+classhall.benchcount
        +'\n max table count is '+classhall.maxtablecount
        +'\n max bench count is '+classhall.maxbenchcount
        +'\n class hall status is '+classhall.classhallstatus_id.name
        )
        if (userConfirm){
            let postServerResponse = ajaxPostRequest("/classhall",classhall);
            if (postServerResponse=="ok"){
                alert('save success');
                classHallForm.reset();
                refreshClassHallForm();
                $('#modalClassHallAdd').modal('hide');
                refreshClassHallTable();
            }else {
                alert('save not success'+postServerResponse);
            }
        }
    }
}


//define function for button add one item
const btnAddOneItem= ()=>{
    console.log(selectAllItem.value);   //log ekak daagannawa select all item kiyana html element eka value aka
    if (selectAllItem.value==""){   //ee value eka empty nam
        alert("please select item") //user ta alert message ekak denawa plese select item kiyala
    }else { //value eka empty nathtam
        let selectedItem=JSON.parse(selectAllItem.value); //selectAllItem kiyana html element eke value eka json parse karala eka selected item kiyana variable ekata assign karagena thiyenwa JSOn parse karanne apita server eken enne json string ekak ehema thiyagena apita wada karanna ba ee nisa api eka JS object ekakata convert karagannwa


        classhall.features.push(selectedItem);      //class hall features kiyana array ekata push kiyana method ekan ee array ekata dagena thiyenwa
        fillDataIntoSelect(selectedFeatures,"",classhall.features,'name');  //fill data into select method ekan api select element ekata value daagannawa mekedi api data arrray eka vidihata use karanne class hall features kiyana array eka

        let extIndex = availbaleFeatures.map(item => item.name).indexOf(selectedItem.name); //meken create karanwa array of name properties from avalilable features walin eke uda api define karala thiyenewa line number 61 eken index eka hoyagena thiyenawa result eka daagena thiywnawa extIndex varible ekata
        if (extIndex != -1){ //index of eken return karanawa -1 ekak mukuth hambela naththam selected item ekata adala  //methana not eka -1 kiayanne match ekak thiyenwa kiyanna
            availbaleFeatures.splice(extIndex,1)    //mtach ekak ehema hambela nam remove karanawa one item eka from avaliable features array eken
        }
    fillDataIntoSelect(selectAllItem,"",availbaleFeatures,'name')   //iita passe fill data into select eken data fill karanwa

    }
}

//define function for btn add all item
const btnAddAllItem = ()=>{
    availbaleFeatures.forEach(item=>{   //available features kiyana array eke eka item ekek gaane iterate venna kiyala for each eka hadagena thiyenwa
        classhall.features.push(item);  //ee item tika push karanawa class hall features kiyana array eka
    });

    fillDataIntoSelect(selectedFeatures,'',classhall.features,'name');  // select element eka fill karanawa class hall features kiyana array eka use karala name eka thama ee table eke property eka selected featurs kiyana ekata thama html element eka

    availbaleFeatures=[];       //empty array ekak hadagena thiyenwa mokada apita data empty karanna one nisa select all item kiyana html element ekan
    fillDataIntoSelect(selectAllItem,"",availbaleFeatures,'name');  //dan ee empty array eka use karala data fill kara gannawa select all iten kiyana html element ekata ee kiyanne ee element ekata mukuth fill karanne na kiyana eka



}
//define function doe remove one item
const btnRemoveOneItem = ()=>{
    console.log(selectAllItem.value);   //log ekak danawa select all item eke value eka
    if (selectedFeatures.value==""){    //value eka empty nam
        alert("please select item for remove"); //alert ekak denawa please select item for remove kiyana
    }else {//value ekak thiyenwa nam
        let selectedRemoveItem = JSON.parse(selectedFeatures.value) //selected features eke value eka json parse karanawa eeta passe eka selected remove item kiyana variable ekata assign karanawa
        availbaleFeatures.push(selectedRemoveItem); //avalibale features kiyana array eka push karanawa seleced remove item eke
        fillDataIntoSelect(selectAllItem,"",availbaleFeatures,'name');  //ee array eka pavivhi karala select all item ekata data fill kara gannnawa

        let extIndex = classhall.features.map(item=>item.name).indexOf(selectedRemoveItem.name);     //This line finds the index of the item in classhall.features that matches the name property of selectedRemoveItem.name index of eken return karanawa -1 ekak mukuth hambune naththam
        if (extIndex!=-1){      //index eka -1 kiaynne hambela na kiyana eka eke not eke  kiaynne hambela kiyana eka
            classhall.features.splice(extIndex,1)   //ee match ekak hambela nisa eeka remove karanawa ext index from class hall features array eken
        }
        fillDataIntoSelect(selectedFeatures,"",classhall.features,'name');  //selected features kiyana html element ekeata data fill karanwa classhall features kiyana array ekan
    }
}

//define function for remove all item
function btnRemoveAllItem(){
    classhall.features.forEach(item=>{  //class hall features kiyana array eke eka item ekek gaanne iterate karala
        availbaleFeatures.push(item);   //available features kiyana array ekata ee item eka push karanawa
    });
//eeta passe ee availbale features kiayana array eka use karla select all item kiyana html select element ekata data fill kara gannawa
    fillDataIntoSelect(selectAllItem,"",availbaleFeatures,'name');

    classhall.features=[];  //class hall features kiyala empty array ekak hadagannawa mokda selected features element eka empty karaganna one nisa
    fillDataIntoSelect(selectedFeatures,"",classhall.features,'name'); //selected features element ekatata empty array eken data fill kragannnawa ee kiyanne element eka empty karagannawa kiyana eka
}


const printClassHallFullTable = ()=>{
    $("#printClassHallModel").modal('show');


    classhalls=ajaxGetRequest("/classhall/findall")

    displayProperty=[
        {dataType:'text',propertyName:'name'},
        {dataType:'text',propertyName:'location'},
        {dataType:'text',propertyName:'tablecount'},
        {dataType:'text',propertyName:'benchcount'},
        {dataType:'function',propertyName:getClassHallStatus},
    ];

    fillDataIntoTable(printClassHallTable,classhalls,displayProperty,"",false)

}


const modalPrintButton = ()=>{
    console.log("model print working");
    let newWindow = window.open();
    newWindow.document.write(
        "<head>\n" +
        "    <link rel=\"stylesheet\" href=\"/bootstrap-5.2.3/css/bootstrap.min.css\">\n" +
        "    <script src=\"/bootstrap-5.2.3/js/bootstrap.bundle.min.js\"></script>\n" +
        "    <link rel=\"stylesheet\" href=\"/style/common.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"/style/button.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"/style/employee.css\">\n" +
        "</head>\n" +
        "<body>"+printClassHallTable.outerHTML+"</body> "
    );
    setTimeout(function (){ //settime out ekkk dunne uda table eka naththam print ui ea hariyata load venna one nisa thama minisecond 500 dunna ookooma bootstrap load vela ganata enna one nisa
        newWindow.stop();   //load vena eka nawaththuwa
        newWindow.print();  //print eka call kra
        newWindow.close();  //print rka open vela close krama close venawa
    },500)


}



const validateClassHallExisting = (fieldId)=>{
    let classHallValue=textName.value;//class hall eke value eka gannawa
    let locationValue=fieldId.value;
    if ((new RegExp('^[A-Z][A-Za-z]{2,20}[\\s][A-Z][A-Za-z]{2,20}$').test(classHallValue)) && (new RegExp('^[A-Z][A-Za-z]{2,20}[\\s][A-Z][A-Za-z]{2,20}$').test(locationValue))){
        console.log("good class hall amd location name to validate existing");

        let getServerResponse=ajaxGetRequest("/classhall/checkduplicatebyhallname/"+classHallValue+"/"+locationValue);
        if (getServerResponse==true){
            divClassHallText.classList.remove("d-none");
            divClassHallText.innerHTML="class hall "+"<span class='fw-bold text-danger'>name </span>"+classHallValue+"<span class='fw-bold text-danger'> location </span>"+locationValue+" is already exists please recheck";
            divClassHallText.classList.add("form-text","text-center","d-inline")
            divClassHallText.style.color="red";
        }else {
            divClassHallText.classList.remove("d-none");
            divClassHallText.innerHTML="class hall "+"<span class='fw-bold text-success'>name </span>"+classHallValue+"<span class='fw-bold text-success'> location </span>"+locationValue+" is good it is not previously entered";
            divClassHallText.style.color="green";
        }
    }
}




const validateMaxStudent= (fieldID)=>{


    let minValue=parseFloat(textMinCount.value);
    let maxValue=parseFloat(fieldID.value);

    if ((new RegExp('^[1-9][0-9]{0,4}$').test(minValue)) && new RegExp('^[1-9][0-9]{0,4}$').test(maxValue)){    //new reg exp kiyana eken new regular expression object ekak halda ekata pattern eka deela eka test kiyan function eken test karala thiyenawa ekata pass karla deela thiyenawa values
        if (maxValue>=minValue){ //max value eka min value ekata wada samanayi ho wadinam
            console.log("good");
            textMaxCount.style.border="2px solid green" //border eka dammma
            classhall.maxcount=maxValue;    //class hall object eke propert eka vena max count ekata bind kara

            //min table count eka
            let minTableCount=Math.ceil(minValue/4);
            textTableCount.value=parseFloat(minTableCount);
            classhall.tablecount=textTableCount.value;
            textTableCount.style.border='2px solid green';


            //min bench count ekata value set karala object ekata bind karanna
            textBenchCount.value=parseFloat(minTableCount); //mokada bench count ekatath table count eka set kare table ekata bench ekayi
            classhall.benchcount=textBenchCount.value;
            textBenchCount.style.border='2px solid green';


            //max table count eka
            let maxTableCount=Math.ceil(maxValue/4);
            textMaxTableCount.value=parseFloat(maxTableCount);
            classhall.maxtablecount=textMaxTableCount.value;
            textMaxTableCount.style.border="2px solid green";


            //max bench count ekata value set karala object ekata bind karanna
            textMaxBenchCount.value=parseFloat(maxTableCount);
            classhall.maxbenchcount=textMaxBenchCount.value;
            textMaxBenchCount.style.border="2px solid green";




        }else {
            console.log("not good")
            textMaxCount.style.border="2px solid red"
            classhall.maxcount=null;

            // methana table value tikayi bench value tikayi empty karala object ekata bind vena eka null karala danna one


            //table count start
            textTableCount.value="";    //value eka empty karanwa
            classhall.tablecount=null;  //object ekata null value eka bind karanawa
            textTableCount.style.border='2px solid red';    //border eka red karanawa


            textBenchCount.value=""
            classhall.benchcount=null;
            textBenchCount.style.border='2px solid red';


            textMaxTableCount.value="";
            classhall.maxtablecount=null;
            textMaxTableCount.style.border="2px solid red";

            textMaxBenchCount.value="";
            classhall.maxbenchcount=null;
            textMaxBenchCount.style.border="2px solid red";


        }
    }


}





