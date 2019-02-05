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

        public void findVertices()
        {
            // get grid coordinates and copy them to method variables
            int x = this.gridx;
            int y = this.gridy;

            // Vertex 1 depends on whether the coulumn is even or odd
            if (y % 2 == 0) // even (Upper Left Corner)
            {
                this.V1x = (x - 1) * 10;
                this.V1y = (y / 2) * 10;
            }
            else // odd (Lower Left Corner)
            {
                this.V1x = x * 10;
                this.V1y = ((y - 1) / 2) * 10;
            }

            // Vertex 2 (Upper Left Corner)
            this.V2x = (x - 1) * 10;
            this.V2y = ((y - 1) / 2) * 10;

            // Vertex 3 (Lower Right Corner)
            this.V3x = x * 10;
            this.V3y = ((y + 1) / 2) * 10;
        }

    }
}
