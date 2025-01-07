package lk.sipsetha.controller;

import lk.sipsetha.dao.PaymentDao;
import lk.sipsetha.entity.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

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
        paymentTypeView.setViewName("paymenttype.html");
        paymentTypeView.addObject("loggedusername",auth.getName());
        paymentTypeView.addObject("title","payment type ui");
        return paymentTypeView;
    }

    @GetMapping(value = "/findall")
    public List<Payment> getAllPaymentType(){
        return dao.findAll();
    }


}
