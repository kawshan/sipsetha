window.addEventListener('load',function (){

    console.log("working dashboard");
    console.log(roleNavBar.innerText);

    //call customize dash board fucntion
    customizeDashboard();

})

const refreshProfileEditForm = ()=>{
    loggeduser=ajaxGetRequest("/loggeduser");
    oldloggeduser=null;

    txtUsrNm.value=loggeduser.username;
    txtEm.value=loggeduser.email;


    if (loggeduser.userphoto==null){//ee kiyanne user ta phooto ekak nathatm
        imgEmpPhoto.src="/icons/no-photo.png";
        textEmpPhoto.value="";
    }else {
        imgEmpPhoto.src=atob(loggeduser.userphoto);//btoa eken encrypt karanawa meken decrypt karanawa
        textEmpPhoto.value=""
    }


}

const submitUserSetting = ()=>{
    console.log(loggeduser)
    let updateServiceResponse=ajaxPutRequest("/changeuser",loggeduser);
    if (updateServiceResponse=="ok"){
    alert("user profile change successfully");
    window.location.replace("/logout");
    }else {
        alert("user profile change not successful have some errors \n"+updateServiceResponse);
    }
}


const customizeDashboard = ()=>{
    let roleValue=roleNavBar.innerText;

    switch (roleValue) {
        case "admin":

            break;
        case "manger":

            break;
        case "cashier":
            //hide rows in dashbord
            administrationRow.className="d-none";
            classRow.className="d-none";
            teacherRow.className="d-none";


            //hide nav bar dropdowns
            navAdministration.className="d-none";
            navClass.className="d-none";
            navTeacher.className="d-none";

            offCanAdministration.className="d-none";
            offCanClass.className="d-none";
            offCanTeacher.className="d-none";
            offCanReports.className="d-none";
            break;
    }


}