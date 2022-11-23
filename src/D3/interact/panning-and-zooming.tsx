import { useEffect } from "react"
import * as d3 from "d3"

export default function PanningAndZooming() {
  const handleZoom = ({ transform }: any) => {
    d3.selectAll("g").attr("transform", transform)
  }

  useEffect(() => {
    const svg = d3
      .select("body")
      .append("svg")
      .attr("width", 1305)
      .attr("height", 705)
      .attr("transform", "translate(30, 30)")
      .style("border", "1px solid #f0f0f0")

    const g = svg.append("g")

    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 10; j++) {
        const res = g
          .append("rect")
          .attr("width", 20)
          .attr("height", 20)
          .attr("fill", "green")
        const x = 20 * i + i * 10
        const y = 20 * j + j * 10
        res.attr("transform", `translate(${x}, ${y})`)
      }
    }

    svg.call(
      d3
        .zoom()
        .extent([
          [0, 0],
          [600, 600],
        ])
        .scaleExtent([1, 8])
        .on("zoom", handleZoom) as any
    )
  }, [])

  return null
}
