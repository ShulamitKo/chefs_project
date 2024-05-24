using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Back.Controllers
{
    public class Chef
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? _id { get; set; }

        [BsonElement("name")]
        public string name { get; set; } = "";

        [BsonElement("cuisine")]
        public string? cuisine { get; set; }

        [BsonElement("rating")]
        public double rating { get; set; }

        [BsonElement("price_range")]
        public string? price_range { get; set; }

        [BsonElement("kosher")]
        public bool Kosher { get; set; }

        [BsonElement("gluten_free")]
        public bool gluten_free { get; set; }

        [BsonElement("free_delivery")]
        public bool free_delivery { get; set; }
        
        [BsonElement("popularity")]
        public int popularity { get; set; }

        [BsonElement("preparationTime")]
        public int preparationTime { get; set; }

        
    }


}
