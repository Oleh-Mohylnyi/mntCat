import { useState, useMemo } from 'react'
import { PieChart, Pie, Sector, Cell } from 'recharts'

function generateRandomColorsArray(count) {
  const colors = [];
  const characters = "0123456789ABCDEF";

  for (let i = 0; i < count; i++) {
    let color = "#";
    for (let j = 0; j < 6; j++) {
      color += characters[Math.floor(Math.random() * 16)];
    }
    colors.push(color);
  }

  return colors;
}

export default function StatusChart({ data }) {
    const [activeIndex] = useState(0)

    const colors = useMemo(() => generateRandomColorsArray(data.length+2), [data]);

    const renderActiveShape = (props) => {
        const { cx, cy, innerRadius, outerRadius, endAngle, fill } = props

        return (
            <g>
                <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} endAngle={endAngle} fill={fill} />
            </g>
        )
    }

    return (
        <PieChart width={160} height={160}>
            <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx={75}
                cy={75}
                innerRadius={50}
                startAngle={90}
                endAngle={720}
                outerRadius={75}
                paddingAngle={-3}
                cornerRadius={0}
                dataKey="value"
            >
                {data.map((entry, index) => (
                    < Cell fill = {colors[index]} key = { entry.name + entry.value } />
                ))}
            </Pie>
        </PieChart>
    )
}
