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
        public char gridx { get; set; }
        public int gridy { get; set; }
        // Vertex Coordinates (pixel)
        public int V1x { get; set;}
        public int V1y { get; set;}
        public int V2x { get; set;}
        public int V2y { get; set;}
        public int V3x { get; set;}
        public int V3y { get; set;}

        public void FindVertices()
        {
            // convert gridx char to int
            int gridx = char.ToUpper(this.gridx) - 64;

            // Vertex 1 depends on whether the coulumn is even or odd
            if (this.gridy % 2 == 0) // even (Upper Left Corner)
            {
                this.V1x = (gridx - 1) * 10;
                this.V1y = (this.gridy / 2) * 10;
            }
            else // odd (Lower Left Corner)
            {
                this.V1x = gridx * 10;
                this.V1y = ((this.gridy - 1) / 2) * 10;
            }

            // Vertex 2 (Upper Left Corner)
            this.V2x = (gridx - 1) * 10;
            this.V2y = ((this.gridy - 1) / 2) * 10;

            // Vertex 3 (Lower Right Corner)
            this.V3x = gridx * 10;
            this.V3y = ((this.gridy + 1) / 2) * 10;
        }

        public void FindGridCoords()
        {
            // convert gridx char to int
            int gridx = char.ToUpper(this.gridx) - 64;

            // triangle coordinates are given
            // We only need Vertex Two since the right trangles always expand down and to the right from there.
            // Vertex 2 is the top left vertex in the triangle
            // Further, the grid starts at 1
            gridx = (this.V2x / 10) + 1;
            this.gridx = (Char)((true ? 65 : 97) + (gridx - 1));
            this.gridy = ((this.V2y / 10) * 2) + 1;
        }

        public bool GridDefined()
        {
            if(this.gridx == ' ' && this.gridy == 0)
            {
                return false;
            }
            return true;
        }

        public bool VertexDefined()
        {
            if((this.V1x == 0) && (this.V1y == 0) && (this.V2x == 0) && (this.V2y ==0) && (this.V3x == 0) && (this.V3y == 0))
            {
                return false;
            }
            return true;
        }
    }
}
