using MongoDB.Driver;
using ProgKnow.Models;

namespace ProgKnow
{
    public class ProgTermMongoClient
    {
        private static ProgTermMongoClient? _instance;
        public static ProgTermMongoClient Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new ProgTermMongoClient();
                }

                return _instance;
            }
        }

        private MongoClient _client;

        public IMongoCollection<ProgTerm> ProgTerms {
        get
            {
                var database = _client.GetDatabase("ProgQuizDB");
                return database.GetCollection<ProgTerm>("ProgTerms");
            }
        }


        private ProgTermMongoClient()
        {
            var settings = MongoClientSettings.FromConnectionString(System.Configuration.ConfigurationManager.AppSettings["ConnectionStrings:MongoDBConnection"]);
            settings.ServerApi = new ServerApi(ServerApiVersion.V1);
            _client = new MongoClient(settings);
        }
    }
}
