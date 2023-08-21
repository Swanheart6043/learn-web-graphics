import { useEffect } from "react"
import * as d3 from "d3"

const data = {
  name: "中国",
  children: [
    {
      name: "浙江",
      children: [
        { name: "杭州", value: 100 },
        { name: "宁波", value: 200 },
        { name: "温州", value: 30 },
        { name: "绍兴", value: 50 },
      ],
    },
    {
      name: "广西",
      children: [
        {
          name: "桂林",
          children: [
            { name: "秀峰区", value: 20 },
            { name: "叠彩区", value: 130 },
            { name: "象山区", value: 140 },
            { name: "七星区", value: 10 },
          ],
        },
        { name: "南宁", value: 90 },
        { name: "柳州", value: 88 },
        { name: "防城港", value: 99 },
      ],
    },
    {
      name: "黑龙江",
      children: [
        { name: "哈尔滨", value: 54 },
        { name: "齐齐哈尔", value: 2 },
        { name: "牡丹江", value: 42 },
        { name: "大庆", value: 43 },
      ],
    },
    {
      name: "新疆",
      children: [
        { name: "乌鲁木齐", value: 1 },
        { name: "克拉玛依", value: 10 },
        { name: "吐鲁番", value: 23 },
        { name: "哈密", value: 43 },
      ],
    },
  ],
}

export default function ExploreTree() {
  useEffect(() => {
    const getTree = async () => {
      const svgArea = d3
        .select("body")
        .append("svg")
        .classed("chart", true)
        .attr("width", 1305)
        .attr("height", 705)

      const g = svgArea
        .append("g")
        .attr("width", 1305)
        .attr("height", 705)
        .attr("transform", "translate(0, 20)")

      const dataAfterFormat = d3.hierarchy(data)

      const treeLayout = d3
        .tree()
        .nodeSize([1000, 500])
        .separation((a, b) => (a.parent === b.parent ? 1 : 2))

      const nodesData = treeLayout(dataAfterFormat)

      // 画线
      const links = g
        .selectAll(".links")
        .data(nodesData.descendants().slice(1)) //nodesData.descendants()返回所有节点的数据，利于我们绑定数据，slcie(1)截取root后的全部节点，防止重绘
        .enter()
        .append("path") //用path画线
        .attr("fill", "none")
        .attr("stroke", "#313131")
        .attr("stroke-width", 2)
        .attr("d", (d) => {
          const parent: any = d.parent
          return `
            M${d.x},${d.y}
            C${d.x},${(d.y + parent.y) / 2}
            ${parent.x},${(d.y + parent.y) / 2.5}
            ${parent.x},${parent.y}
          `
        })

      // 画圆
      const nodes = g
        .selectAll(".node")
        .data(nodesData.descendants()) //同样是获得所有节点，便于数据绑定
        .enter()
        .append("g")
        .attr("transform", (d) => {
          return `translate(${d.x}, ${d.y})` //位移
        })
      //画圆
      nodes.append("circle").style("fill", "#c03027").attr("r", 10)
      //插入文字
      nodes
        .append("text")
        .attr("dx", ".9em")
        .text((d) => {
          const originalData: any = d.data
          return originalData.name
        })
    }

    getTree()
  })

  return null
}
