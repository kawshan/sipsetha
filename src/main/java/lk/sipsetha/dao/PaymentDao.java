package lk.sipsetha.dao;

import lk.sipsetha.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PaymentDao extends JpaRepository<Payment,Integer> {

    @Query(value = "select lpad(max(p.billnumber)+1,10,0) as billnum from payment as p;",nativeQuery = true)
    public String getNextBillNumber();

}
