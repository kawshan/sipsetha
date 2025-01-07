package lk.sipsetha.dao;

import lk.sipsetha.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentDao extends JpaRepository<Payment,Integer> {
}
