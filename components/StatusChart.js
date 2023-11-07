import { useState, useMemo } from 'react'
import { PieChart, Pie, Sector, Cell, Tooltip } from 'recharts'

// function generateRandomColorsArray(count) {
//   const colors = [];
//   const characters = "0123456789ABCDEF";

//   for (let i = 0; i < count; i++) {
//     let color = "#";
//     for (let j = 0; j < 6; j++) {
//       color += characters[Math.floor(Math.random() * 16)];
//     }
//     colors.push(color);
//   }

//   return colors;
// }

const colors = [
  "rgb(2, 202, 156)",
  "rgb(255, 194, 77)",
  "rgb(232, 131, 74)",
  "rgb(23, 143, 253)",
  "rgb(69, 76, 251)",
  "rgb(155, 77, 255)",
  "rgb(2, 202, 156)",
  "rgb(255, 194, 77)",
  "rgb(232, 131, 74)",
  "rgb(23, 143, 253)",
  "rgb(69, 76, 251)",
    "rgb(155, 77, 255)"
]; 

export default function StatusChart({ data }) {
    const [activeIndex] = useState(0)

    // const colors = useMemo(() => generateRandomColorsArray(data.length+2), [data]);

    const renderActiveShape = (props) => {
        const { cx, cy, innerRadius, outerRadius, endAngle, fill } = props

        return (
            <g>
                <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} endAngle={endAngle} fill={fill} />
            </g>
        )
    }

    return (
      <PieChart width={280} height={240}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx={140}
          cy={120}
          innerRadius={50}
          startAngle={90}
          endAngle={720}
          outerRadius={75}
          paddingAngle={-3}
          cornerRadius={0}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
              fill={colors[index]}
              key={entry.name + entry.value}
              dataKey={entry.name}
            />
          ))}
        </Pie>
        <Tooltip cursor={false} />
      </PieChart>
    );
}
