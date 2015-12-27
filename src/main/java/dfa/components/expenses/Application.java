package dfa.components.expenses;

import java.io.IOException;
import java.security.Principal;
import java.util.Date;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.data.rest.webmvc.BaseUriAwareController;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

@SpringBootApplication
@BaseUriAwareController
public class Application {

	private static final Logger log = LoggerFactory.getLogger(Application.class);
	
	@RequestMapping("/user")
	public Principal user(Principal user) {
		return user;
	}

	public static void main(String[] args) {
		SpringApplication.run(Application.class);
	}

	@Bean
	public CommandLineRunner demo(ExpensesRepository repository, UserRepository users) {
		return (args) -> {
			// save a couple of customers
			repository.save(new Expense("Brownes Hardware", new Date(), false, new Date()));
			users.save(new User("user", "password"));

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
			for (User user: users.findUserById(Long.parseLong("1"))) {
				log.info(user.toString());
			}
            log.info("");
		};
	}
	
	@Configuration
	@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
	protected static class SecurityConfiguration extends WebSecurityConfigurerAdapter {
		@Override
		protected void configure(HttpSecurity http) throws Exception {
			http.httpBasic().and().authorizeRequests()
					.antMatchers("/index.html", "/home.html", "/login.html", "/").permitAll().anyRequest()
					.authenticated().and().csrf()
					.csrfTokenRepository(csrfTokenRepository()).and()
					.addFilterAfter(csrfHeaderFilter(), CsrfFilter.class);
		}

		private Filter csrfHeaderFilter() {
			return new OncePerRequestFilter() {
				@Override
				protected void doFilterInternal(HttpServletRequest request,
						HttpServletResponse response, FilterChain filterChain)
						throws ServletException, IOException {
					CsrfToken csrf = (CsrfToken) request.getAttribute(CsrfToken.class
							.getName());
					if (csrf != null) {
						Cookie cookie = WebUtils.getCookie(request, "XSRF-TOKEN");
						String token = csrf.getToken();
						if (cookie == null || token != null
								&& !token.equals(cookie.getValue())) {
							cookie = new Cookie("XSRF-TOKEN", token);
							cookie.setPath("/");
							response.addCookie(cookie);
						}
					}
					filterChain.doFilter(request, response);
				}
			};
		}

		private CsrfTokenRepository csrfTokenRepository() {
			HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
			repository.setHeaderName("X-XSRF-TOKEN");
			return repository;
		}
	}
	
	// TESTIN WITH CURL
	//curl -i -u user:password -X POST -H "Content-Type:application/json" -d '{"merchantName": "Kerry Co op", "dateOfPurchase" : "Frodo","paymentDueDate": "Baggins" }' http://localhost:8080/expenses
	//curl -H "X-Requested-With: XMLHttpRequest" http://localhost:8080/user
}
