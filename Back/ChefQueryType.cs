using HotChocolate.Types;

namespace Back.Controllers
{
    /// <summary>
    /// Represents the GraphQL query type for chef-related operations.
    /// </summary>
    public class ChefQueryType : ObjectType<ChefQuery>
    {
        /// <summary>
        /// Configures the GraphQL fields for the chef query type.
        /// </summary>
        /// <param name="descriptor">The descriptor for the chef query type.</param>
        protected override void Configure(IObjectTypeDescriptor<ChefQuery> descriptor)
        {
            // Defines the field for retrieving all chefs
            descriptor.Field(t => t.GetChefs()).Name("allChefs").Type<ListType<ChefType>>();

            // Defines the field for searching chefs with specified criteria
            descriptor.Field(t => t.SearchChefs(default!, default, default, default, default!, default!, default!))
                .Name("searchChefs")
                .Type<ListType<ChefType>>()
                .Argument("name", a => a.Type<StringType>())
                .Argument("kosher", a => a.Type<BooleanType>())
                .Argument("gluten_free", a => a.Type<BooleanType>())
                .Argument("free_delivery", a => a.Type<BooleanType>())
                .Argument("price_range", a => a.Type<StringType>())
                .Argument("cuisine", a => a.Type<StringType>())
                .Argument("sortBy", a => a.Type<StringType>());
        }
    }
}
