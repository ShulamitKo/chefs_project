using System.Collections.Generic;
using MongoDB.Driver;

namespace Back.Controllers
{
    /// <summary>
    /// Represents a class for querying chefs from the database.
    /// </summary>
    /// 
    public class ChefQuery
    {
        private readonly DbService _dbService;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChefQuery"/> class.
        /// </summary>
        /// <param name="dbService">The database service.</param>
        public ChefQuery(DbService dbService)
        {
            _dbService = dbService;
        }

        /// <summary>
        /// Retrieves all chefs from the database.
        /// </summary>
        /// <returns>A list of all chefs.</returns>
        public List<Chef> GetChefs()
        {
            try
            {
                var collection = _dbService.GetCollection<Chef>("chefs");
                return collection.Find(chef => true).ToList();
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error retrieving chefs: {ex.Message}");
                return new List<Chef>(); // Return an empty list or handle as needed
            }
        }

        /// <summary>
        /// Searches chefs based on specified criteria.
        /// </summary>
        /// <returns>A list of chefs matching the search criteria.</returns>
        public List<Chef> SearchChefs(string name, bool? kosher, bool? gluten_free, bool? free_delivery, string price_range, string cuisine, string sortBy)
        {
            try
            {
                var collection = _dbService.GetCollection<Chef>("chefs");

                var filterBuilder = Builders<Chef>.Filter;
                var filters = new List<FilterDefinition<Chef>>();

                if (!string.IsNullOrEmpty(name))
                {
                    filters.Add(filterBuilder.Regex("name", new MongoDB.Bson.BsonRegularExpression(name, "i")));
                }

                if (kosher.HasValue)
                {
                    filters.Add(filterBuilder.Eq(c => c.Kosher, kosher.Value));
                }

                if (gluten_free.HasValue)
                {
                    filters.Add(filterBuilder.Eq(c => c.gluten_free, gluten_free.Value));
                }

                if (free_delivery.HasValue)
                {
                    filters.Add(filterBuilder.Eq(c => c.free_delivery, free_delivery.Value));
                }

                if (!string.IsNullOrEmpty(price_range))
                {
                    filters.Add(filterBuilder.Eq(c => c.price_range, price_range));
                }

                if (!string.IsNullOrEmpty(cuisine))
                {
                    filters.Add(filterBuilder.Eq(c => c.cuisine, cuisine));
                }

                var filter = filters.Count > 0 ? filterBuilder.And(filters) : filterBuilder.Empty;

                var sortBuilder = Builders<Chef>.Sort;
                SortDefinition<Chef> sort = sortBy switch
                {
                    "rating" => sortBuilder.Descending(c => c.rating),
                    "popularity" => sortBuilder.Descending(c => c.popularity),
                    "preparationTime" => sortBuilder.Ascending(c => c.preparationTime),

                    _ => sortBuilder.Descending(c => c.rating)
                };

                var result = collection.Find(filter).Sort(sort).ToList();

                return result;

            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error searching chefs: {ex.Message}");
                return new List<Chef>(); // Return an empty list or handle as needed
            }
        }

    }


}
