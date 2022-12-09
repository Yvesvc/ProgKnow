using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ProgKnow.Models
{
    public class ProgTerm
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Category { get; set; }
        public string TermText { get; set; }
        public List<Value> Term { get; set; }
        public List<Definition> Definition { get; set; }
        public List<List<Value>> AdditionalInfo { get; set; }
    }
}
