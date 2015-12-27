package dfa.components.expenses;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


/**
 * A user.
 */
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    private String password;
    
    private String user;

    
    protected User() {}

    public User(String user, String password) {
        this.user = user;
        this.password = password;
    }


   
    public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}
	
	 public Long getId() {
			return id;
		}
	    
	    public void setId(Long id) {
			this.id = id;
		}


	
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

   
    @Override
    public String toString() {
    	 return String.format(
                 "Customer[id=%d, user='%s', passowrd='%s']",
                 id, user, password);
    }
}
