using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodingChallenge.Models
{
    public class TriangleItem
    {
        public long Id { get; set; }
        // grid coordinates
        public int gridx, gridy;
        // Vertex Coordinates (pixel)
        public int V1x, V1y;
        public int V2x, V2y;
        public int V3x, V3y;

    }
}
