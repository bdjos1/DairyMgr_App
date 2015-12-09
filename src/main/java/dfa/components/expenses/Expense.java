/**
 * 
 */
package dfa.components.expenses;

import java.util.Date;

/**
 * @author barry.os
 *
 */
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Expense {

    
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
	
    private String merchantName;
    private Date dateOfPurchase;
    private boolean paidByCredit;
    private Date paymentDueDate;

    protected Expense() {}

    public Expense(String merchantName, Date dateOfPurchase, boolean paidByCredit, Date paymentDueDate) {
        this.merchantName = merchantName;
        this.dateOfPurchase = dateOfPurchase;
        this.paidByCredit = paidByCredit;
        this.paymentDueDate = paymentDueDate;
    }
    
    public String getMerchantName() {
		return this.merchantName;
	}
    
    public Long getId() {
		return id;
	}
    
    public void setId(Long id) {
		this.id = id;
	}

	public void setMerchantName(String merchantName) {
		this.merchantName = merchantName;
	}

	public Date getdateOfPurchase() {
		return this.dateOfPurchase;
	}

	public void setDateOfPurchase(Date dateOfPurchase) {
		this.dateOfPurchase = dateOfPurchase;
	}

	public boolean isPaidByCredit() {
		return this.paidByCredit;
	}

	public void setPaidByCredit(boolean paidByCredit) {
		this.paidByCredit = paidByCredit;
	}

	public Date getPaymentDueDate() {
		return this.paymentDueDate;
	}

	public void setPaymentDueDate(Date paymentDueDate) {
		this.paymentDueDate = paymentDueDate;
	}


   // @Override
    public String toString() {
        return String.format(
                "Customer[id=%d, merchantName='%s', dateOfPurchase='%s', paidByCredit='%s', paymentDueDate='%s']",
                id, merchantName, dateOfPurchase, paidByCredit, paymentDueDate);
    }

}
