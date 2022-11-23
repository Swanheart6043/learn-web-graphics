import { useEffect } from "react"
import * as d3 from "d3"

const json = [
  {
    name: "deps",
    children: [
      {
        name: "dev",
        children: [
          {
            name: "dev-1",
          },
        ],
      },
      {
        name: "test",
        children: [
          {
            name: "test1",
          },
        ],
      },
    ],
  },
]

export default function ExploreD31() {
  useEffect(() => {
    const area = d3.select("#map-area")
    const svg = area.append("svg")

    d3.json("./data.json").then((data) => {
      const r = d3.hierarchy(data)
      console.log(r)
      d3.tree().size([1000, 500])(r)
      d3.linkHorizontal()
      // g.selectAll("path")
    })
  })

  return <div id="map-area"></div>
}
