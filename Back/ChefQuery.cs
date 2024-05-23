using System.Collections.Generic;
using MongoDB.Driver;

namespace Back.Controllers
{
    public class ChefQuery
    {
        private readonly IMongoDatabase _database;

        public ChefQuery(IMongoDatabase database)
        {
            _database = database;
        }

        public List<Chef> GetChefs()
        {
            var collection = _database.GetCollection<Chef>("chefs");
            return collection.Find(chef => true).ToList();
        }

        public Chef GetChefByName(string name)
        {
            var collection = _database.GetCollection<Chef>("chefs");
            return collection.Find(chef => chef.name == name).FirstOrDefault();
        }


        // הוספת השאילתא החדשה
        public List<Chef> SearchChefs(string name, bool? kosher, bool? gluten_free, bool? free_delivery, string price_range, string cuisine)
        {
            var collection = _database.GetCollection<Chef>("chefs");

            var filterBuilder = Builders<Chef>.Filter;
            var filters = new List<FilterDefinition<Chef>>();

            if (!string.IsNullOrEmpty(name))
            {
                Console.WriteLine($"Searching for name: {name}");

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
                Console.WriteLine($"Searching for price_range: {price_range}");

                filters.Add(filterBuilder.Eq(c => c.price_range, price_range));
            }

            if (!string.IsNullOrEmpty(cuisine))
            {
                filters.Add(filterBuilder.Eq(c => c.cuisine, cuisine));
            }

            var filter = filters.Count > 0 ? filterBuilder.And(filters) : filterBuilder.Empty;
            var result = collection.Find(filter).ToList();

            // הוספת הודעת דיבאג
            Console.WriteLine($"Number of results found: {result.Count}");

            return result;
        }

    }


}
