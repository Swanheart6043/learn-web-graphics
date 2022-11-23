import { useEffect } from "react"
import * as d3 from "d3"

export default function ExploreD31() {
  useEffect(() => {
    const area = d3.select("#map-area")
    const svg = area.append("svg")
    svg.append("rect").attr("width", 20).attr("height", 20).attr("fill", "red")
    svg
      .append("circle")
      .attr("r", 30)
      .attr("fill", "green")
      .attr("transform", "translate(30, 40)")
  })

  return <div id="map-area"></div>
}
