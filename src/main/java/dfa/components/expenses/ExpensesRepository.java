package dfa.components.expenses;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.webmvc.BaseUriAwareController;

@BaseUriAwareController
@RepositoryRestResource(collectionResourceRel = "expenses", path = "expenses")
public interface ExpensesRepository extends CrudRepository<Expense, Long> {

    List<Expense> findExpenseById(@Param("id") Long id);
}
