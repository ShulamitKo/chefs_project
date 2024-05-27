using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using HotChocolate.Execution;




namespace Back.Controllers
{
    /// <summary>
    /// Controller for handling chef-related endpoints.
    /// </summary>

    [ApiController]
    [Route("[controller]")]
    public class ChefsController : ControllerBase
    {
        private readonly IMongoCollection<Chef> _chefsCollection;
        private readonly IRequestExecutor _requestExecutor;
        private readonly DbService _dbService;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChefsController"/> class.
        /// </summary>
        /// <param name="dbService">The database service.</param>
        /// <param name="executorResolver">The request executor resolver.</param>
        public ChefsController(DbService dbService, IRequestExecutorResolver executorResolver)
        {
            _dbService = dbService;
            _chefsCollection = dbService.GetCollection<Chef>("chefs");
            _requestExecutor = executorResolver.GetRequestExecutorAsync().Result;


        }

        /// <summary>
        /// Represents a GraphQL query.
        /// </summary>
        public class GraphQLQuery
        {
            public string Query { get; set; } = string.Empty;
            public Dictionary<string, object?> Variables { get; set; } = new Dictionary<string, object?>();
        }

        /// <summary>
        /// Handles GraphQL queries.
        /// </summary>
        /// <param name="query">The GraphQL query.</param>
        /// <returns>The result of the GraphQL query execution.</returns>
        [HttpPost("graphql")]
        public async Task<IActionResult> GraphQL([FromBody] GraphQLQuery query)
        {
            try
            {
                var request = QueryRequestBuilder.New()
                    .SetQuery(query.Query)
                    .SetVariableValues(query.Variables)
                    .Create();

                var result = await _requestExecutor.ExecuteAsync(request);

                return Ok(result);

            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error executing GraphQL query: {ex.Message}");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }


    }
}


