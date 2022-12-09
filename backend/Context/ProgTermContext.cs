using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using ProgKnow.Models;

namespace ProgKnow.Context
{
    public class ProgTermContext : IProgTermContext
    {

        public async Task<ProgTerm> GetRandomAsync()
        {
            return await ProgTermMongoClient.Instance.ProgTerms.AsQueryable().Sample(1).FirstOrDefaultAsync();
        }

        public async Task<ProgTerm> GetNextAsync(string id)
        {
            BsonDocument filter = new BsonDocument{
                {
                    "_id", new BsonDocument{
                        { "$gt", new ObjectId(id) }
                    }
                }
            };
            return await ProgTermMongoClient.Instance.ProgTerms.Find(filter).FirstOrDefaultAsync();
        }

        public async Task<ProgTerm> GetPreviousAsync(string id)
        {
            BsonDocument filter = new BsonDocument{
                {
                    "_id", new BsonDocument{
                        { "$lt", new ObjectId(id) }
                    }
                }
            };
            return await ProgTermMongoClient.Instance.ProgTerms.Find(filter).SortByDescending(progTerm => progTerm.Id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<ProgTerm>> GetBySearchAsync(string q)
        {
            BsonDocument filter = new BsonDocument{
                {
                    "$text", new BsonDocument{
                        { "$search", "\"" + q + "\"" }
                    }
                }
            };
            return (await ProgTermMongoClient.Instance.ProgTerms.FindAsync(filter)).ToEnumerable();
        }

        public async Task<ProgTerm> GetByIdAsync(string id)
        {
            BsonDocument filter = new BsonDocument{
                {
                    "_id", new BsonDocument{
                        { "$eq", new ObjectId(id) }
                    }
                }
            };
            return await ProgTermMongoClient.Instance.ProgTerms.Find(filter).FirstOrDefaultAsync();
        }
    }
}


