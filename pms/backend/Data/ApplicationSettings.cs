using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Data
{
    public class ApplicationSettings
    {
        public string Secret { get; set; }

        public string ValidIssuer { get; set; }

        public string ValidAudience { get; set; }

        public int Expiration { get; set; }

        public string GoogleClient { get; set; }
    }
}
