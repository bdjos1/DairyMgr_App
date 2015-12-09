package dfa.components.expenses;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Application {

	private static final Logger log = LoggerFactory.getLogger(Application.class);

	public static void main(String[] args) {
		SpringApplication.run(Application.class);
	}

	@Bean
	public CommandLineRunner demo(ExpensesRepository repository) {
		return (args) -> {
			// save a couple of customers
			repository.save(new Expense("Brownes Hardware", new Date(), false, new Date()));
			/*repository.save(new Expense("Chloe", "O'Brian"));
			repository.save(new Expense("Kim", "Bauer"));
			repository.save(new Expense("David", "Palmer"));
			repository.save(new Expense("Michelle", "Dessler"));*/

			// fetch all customers
			log.info("Customers found with findAll():");
			log.info("-------------------------------");
			for (Expense customer : repository.findAll()) {
				log.info(customer.toString());
			}
            log.info("");

			// fetch an individual customer by ID
			Expense customer = repository.findOne(1L);
			log.info("Customer found with findOne(1L):");
			log.info("--------------------------------");
			log.info(customer.toString());
            log.info("");

			// fetch customers by last name
			log.info("Customer found with findExpenseById('Bauer'):");
			log.info("--------------------------------------------");
			for (Expense bauer : repository.findExpenseById(Long.parseLong("1"))) {
				log.info(bauer.toString());
			}
            log.info("");
		};
	}
	
	// TESTIN WITH CURL
	//curl -i -u user:password -X POST -H "Content-Type:application/json" -d '{"merchantName": "Kerry Co op", "dateOfPurchase" : "Frodo","paymentDueDate": "Baggins" }' http://localhost:8080/expenses

}
