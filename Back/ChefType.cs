using HotChocolate.Types;

namespace Back.Controllers
{

    public class ChefQueryType : ObjectType<ChefQuery>
    {
        protected override void Configure(IObjectTypeDescriptor<ChefQuery> descriptor)
        {
            descriptor.Field(t => t.GetChefs()).Name("allChefs").Type<ListType<ChefType>>();
            descriptor.Field(t => t.GetChefByName(default(string)!)).Name("chefByName").Type<ChefType>();
            // הוספת השאילתא החדשה
            descriptor.Field(t => t.SearchChefs(default(string)!, default, default, default, default(string)!))
                .Name("searchChefs")
                .Type<ListType<ChefType>>()
                .Argument("name", a => a.Type<StringType>())
                .Argument("kosher", a => a.Type<BooleanType>())
                .Argument("gluten_free", a => a.Type<BooleanType>())
                .Argument("free_delivery", a => a.Type<BooleanType>())
                .Argument("price_range", a => a.Type<StringType>());

        }
    }

    public class ChefType : ObjectType<Chef>
    {
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
            descriptor.Field(t => t.location).Type<ObjectType<Location>>();
        }
    }

    public class LocationType : ObjectType<Location>
    {
        protected override void Configure(IObjectTypeDescriptor<Location> descriptor)
        {
            descriptor.Field(t => t.type).Type<StringType>();
            descriptor.Field(t => t.coordinates).Type<ListType<FloatType>>();
        }
    }
}
