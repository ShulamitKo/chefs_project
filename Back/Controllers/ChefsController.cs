using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

using HotChocolate;
using HotChocolate.AspNetCore;
using HotChocolate.Types;
using HotChocolate.Execution;


using System.Text.Json;
using System;
using GraphQL;

using System.Collections.Generic;
using System.Threading.Tasks;


namespace Back.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class ChefsController : ControllerBase
    {
        private readonly IMongoCollection<Chef> _chefsCollection;
        private readonly IRequestExecutor _requestExecutor;

        public ChefsController(IMongoDatabase database, IRequestExecutorResolver executorResolver)
        {
            _chefsCollection = database.GetCollection<Chef>("chefs");
            // _requestExecutor = requestExecutor;
            _requestExecutor = executorResolver.GetRequestExecutorAsync().GetAwaiter().GetResult();


        }

        [HttpGet("/chefs")]
        public ActionResult<List<Chef>> Get()
        {
            var chefs = _chefsCollection.Find(chef => true).ToList();
            return chefs;
        }

        public class GraphQLQuery
        {
            public string Query { get; set; } = string.Empty;
            public Dictionary<string, object?> Variables { get; set; } = new Dictionary<string, object?>();
        }

        [HttpPost("graphql")]
        public async Task<IActionResult> GraphQL([FromBody] GraphQLQuery query)
        {
            var request = QueryRequestBuilder.New()
                .SetQuery(query.Query)
                .SetVariableValues(query.Variables)
                .Create();

            var result = await _requestExecutor.ExecuteAsync(request);

            return Ok(result);
        }


    }
}


