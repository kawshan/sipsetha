package lk.sipsetha.controller;

import lk.sipsetha.dao.PaymentDao;
import lk.sipsetha.dao.UserDao;
import lk.sipsetha.entity.Payment;
import lk.sipsetha.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(value = "/payment")
public class PaymentController {

    @Autowired
    private PaymentDao dao;

    @Autowired
    private PrivilegeController privilegeController;

    @Autowired
    private UserDao userDao;

    @GetMapping(value = "/paymentform")
    public ModelAndView getPaymentTypeUI(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User loggedUser=userDao.getUserByUserName(auth.getName());
        ModelAndView paymentTypeView = new ModelAndView();
        paymentTypeView.setViewName("payment.html");
        paymentTypeView.addObject("loggedusername",auth.getName());
        paymentTypeView.addObject("loggeduserrole",loggedUser.getRoles().iterator().next().getName());
        paymentTypeView.addObject("loggeduserphoto",loggedUser.getUserphoto());
        paymentTypeView.addObject("title","student payment management ui");
        return paymentTypeView;
    }

    @GetMapping(value = "/findall")
    public List<Payment> getAllPaymentType(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserPrivileges = privilegeController.getPrivilegeByUserModule(auth.getName(),"studentpayment");
        if (!getLoggedUserPrivileges.get("select")){
            return null;
        }
        return dao.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }

    @PostMapping
    public String saveStudentPayment(@RequestBody Payment payment){
        //authentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserPrivilege = privilegeController.getPrivilegeByUserModule(auth.getName(), "studentpayment");
        if (!getLoggedUserPrivilege.get("insert")){
            return "cannot perform save student .. you don't have privileges";
        }


        System.out.println(payment.getPaymentcategory_id().getName());
        if (payment.getPaymentcategory_id().getName().equals("admission")){
            System.out.println("inside inner admission condition");
            //need to duplicate check
        }else {
            //existing and duplicate
            Payment exPayment=dao.checkDuplicateByStudentMonthAndRegistration(payment.getStudent_id().getId(),payment.getMonth(),payment.getStudentregistration_id().getId());
            if (exPayment!=null){
                return "cannot perform payment because it already exists";
            }
        }





        //operators
        try {
            payment.setAddeduser(userDao.getUserByUserName(auth.getName()).getId());

            String getNextBillNumber = dao.getNextBillNumber();
            if (getNextBillNumber==null || getNextBillNumber == ""){
                payment.setBillnumber("0000000001");
            }else {
                payment.setBillnumber(getNextBillNumber);
            }

            payment.setAddeddatetime(LocalDateTime.now());


            dao.save(payment);
            return "ok";
        }catch (Exception e){
            return "student payment submit not complete "+e.getMessage();
        }
    }

    @PutMapping
    public String ModifyPayment(@RequestBody Payment payment){
        //authentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserPrivileges = privilegeController.getPrivilegeByUserModule(auth.getName(), "studentpayment");
        if (!getLoggedUserPrivileges.get("update")){
            return "cannot perform modify payment ... you don't have privileges";
        }
        //existing check
        //operation
        try {
            payment.setModifyuser(userDao.getUserByUserName(auth.getName()).getId());
            payment.setModifydatetime(LocalDateTime.now());
            dao.save(payment);
            return "ok";
        }catch (Exception e){
            return "modify payment is not completed "+e.getMessage();
        }
    }

    @DeleteMapping
    public String deletePayment(@RequestBody Payment payment){
        //authentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserPrivileges = privilegeController.getPrivilegeByUserModule(auth.getName(), "studentpayment");
        if (!getLoggedUserPrivileges.get("delete")){
            return "cannot perform delete payment ... you don't have privileges";
        }
        //existing
        //operator
        try {
            dao.delete(payment);
            return "ok";
        }catch (Exception e){
            return "delete payment not successful "+e.getMessage();
        }
    }

    @GetMapping(value = "/payedamountbystudent/{stunum}")
    public Boolean getPaymentAmountByStudentNum(@PathVariable("stunum")String stunum){
        List<Payment> paymentList = dao.paymentByStudent(stunum);
        if (paymentList.size() == 0){
            return  false;
        }else {
           return true;
        }
    }


    
    @GetMapping(value = "/getmaxmonthbystudent/{stunum}")
    public String getMaxMonthByStudent(@PathVariable("stunum")String stunum){
        return dao.getMaxMonthPaymentByStudent(stunum);
    }

    @GetMapping(value = "/getmaxmonthpayment/{stunum}/{registration}")
    public String getMaxMonthBYPayment(@PathVariable("stunum")String stunum,@PathVariable("registration") String registration){
        return dao.getmaxbypayment(stunum,registration);
    }




}






