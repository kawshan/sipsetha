window.addEventListener('load', function () {

    console.log("working dashboard");


    //call customize dash board fucntion
    customizeDashboard();

})

const refreshProfileEditForm = () => {
    loggeduser = ajaxGetRequest("/loggeduser");
    oldloggeduser = null;

    txtUsrNm.value = loggeduser.username;
    txtEm.value = loggeduser.email;


    if (loggeduser.userphoto == null) {//ee kiyanne user ta phooto ekak nathatm
        imgEmpPhoto.src = "/icons/no-photo.png";
        textEmpPhoto.value = "";
    } else {
        imgEmpPhoto.src = atob(loggeduser.userphoto);//btoa eken encrypt karanawa meken decrypt karanawa
        textEmpPhoto.value = ""
    }


}

const submitUserSetting = () => {
    console.log(loggeduser)
    let updateServiceResponse = ajaxPutRequest("/changeuser", loggeduser);
    if (updateServiceResponse == "ok") {
        alert("user profile change successfully");
        window.location.replace("/logout");
    } else {
        alert("user profile change not successful have some errors \n" + updateServiceResponse);
    }
}


const customizeDashboard = () => {
    console.log(roleNavBar.innerText+" in customized dash board");
    let roleValue = roleNavBar.innerText;

    switch (roleValue) {
        case "admin":

            break;
        case "manger":

            break;

        case "assistant-manager":

            break;
        case "cashier":

            if (window.location.pathname=='/dashboard'){    //window location pathname kiyanne JS property ekak eken return karanawa path portion eka current page eke. ekata include venne na protocaol eka domain eka and query parameters
                console.log("you are on dashboard");
                //hide rows in dashbord
                administrationRow.className = "d-none";
                classRow.className = "d-none";
                teacherRow.className = "d-none";
            }else {
                console.log("you are not in dashboard")
            }


            //hide nav bar dropdowns
            navAdministration.className = "d-none";
            navClass.className = "d-none";
            navTeacher.className = "d-none";

            //off canvas
            offCanAdministration.className = "d-none";
            offCanClass.className = "d-none";
            offCanTeacher.className = "d-none";
            offCanReports.className = "d-none";
            break;
        case "employee":
            //dash board

            if (window.location.pathname=='/dashboard'){
                console.log(" you are in dashboard")
                administrationRow.className = "d-none";
                StudentRow.className = "d-none";
                classRow.className = "d-none";
                teacherRow.className = "d-none";
            }else {
                console.log("you are not in dashboard")
            }

            //nav bar items
            navAdministration.className = "d-none";
            navStudent.className = "d-none";
            navClass.className = "d-none";
            navTeacher.className = "d-none";


            offCanAdministration.className = "d-none";
            offCanStudent.className = "d-none";
            offCanClass.className = "d-none";
            offCanTeacher.className = "d-none";
            offCanReports.className = "d-none";

            break;

        case "card-checker":

            if (window.location.pathname=='/dashboard'){
                console.log("you are in dashboard");
                //dash board
                administrationRow.className = "d-none";
                StudentRow.className = "d-none";
                classRow.className = "d-none";
                teacherRow.className = "d-none";

                attendanceRow.className="d-block";
            }else {
                console.log("not in dash board")
            }


            //nav bar items
            navAdministration.className = "d-none";
            navStudent.className = "d-none";
            navClass.className = "d-none";
            navTeacher.className = "d-none";


            offCanAdministration.className = "d-none";
            offCanStudent.className = "d-none";
            offCanClass.className = "d-none";
            offCanTeacher.className = "d-none";
            offCanReports.className = "d-none";

            offCanAttendance.className="d-block";



            break;
    }


}