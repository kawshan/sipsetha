package lk.sipsetha.controller;

import lk.sipsetha.dao.PaymentDao;
import lk.sipsetha.entity.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping(value = "/payment")
public class PaymentController {

    @Autowired
    private PaymentDao dao;


    @GetMapping(value = "/paymentform")
    public ModelAndView getPaymentTypeUI(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView paymentTypeView = new ModelAndView();
        paymentTypeView.setViewName("payment.html");
        paymentTypeView.addObject("loggedusername",auth.getName());
        paymentTypeView.addObject("title","student management ui");
        return paymentTypeView;
    }

    @GetMapping(value = "/findall")
    public List<Payment> getAllPaymentType(){
        return dao.findAll();
    }

    @PostMapping
    public String saveStudentPayment(@RequestBody Payment payment){
        //authentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        //existing and duplicate
        //operators
        try {
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
        //existing check
        //operation
        try {
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
        //existing
        //operator
        try {
            dao.delete(payment);
            return "ok";
        }catch (Exception e){
            return "delete payment not successful "+e.getMessage();
        }
    }


}
