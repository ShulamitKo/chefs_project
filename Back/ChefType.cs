using HotChocolate.Types;

namespace Back.Controllers
{
    /// <summary>
    /// Represents the GraphQL type for a chef.
    /// </summary>

    public class ChefType : ObjectType<Chef>
    {
        /// <summary>
        /// Configures the GraphQL fields for the chef type.
        /// </summary>
        /// <param name="descriptor">The descriptor for the chef type.</param>
        protected override void Configure(IObjectTypeDescriptor<Chef> descriptor)
        {
            descriptor.Field(t => t._id).Type<StringType>();
            descriptor.Field(t => t.name).Type<StringType>();
            descriptor.Field(t => t.cuisine).Type<StringType>();
            descriptor.Field(t => t.rating).Type<FloatType>();
            descriptor.Field(t => t.price_range).Type<StringType>();
            descriptor.Field(t => t.Kosher).Type<BooleanType>();
            descriptor.Field(t => t.gluten_free).Type<BooleanType>();
            descriptor.Field(t => t.free_delivery).Type<BooleanType>();
            descriptor.Field(t => t.popularity).Type<IntType>();
            descriptor.Field(t => t.preparationTime).Type<IntType>();

        }
    }

}
