using MongoDB.Driver;

/// <summary>
/// Service for interacting with the MongoDB database.
/// </summary>
public class DbService
{
    private readonly IMongoDatabase _database;

    /// <summary>
    /// Initializes a new instance of the <see cref="DbService"/> class.
    /// </summary>
    /// <param name="client">The MongoDB client.</param>

    public DbService(IMongoClient client)
    {
        _database = client.GetDatabase("chefs_db");// Retrieves the database named "chefs_db"
    }

   /// <summary>
    /// Retrieves a collection from the database.
    /// </summary>
    /// <typeparam name="T">The type of documents in the collection.</typeparam>
    /// <param name="name">The name of the collection.</param>
    /// <returns>The collection with the specified name.</returns>
    public IMongoCollection<T> GetCollection<T>(string name)
    {
        return _database.GetCollection<T>(name);// Retrieves the collection with the specified name
    }
}