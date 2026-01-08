import {
  areaElementClasses,
  LineChart,
  lineElementClasses,
  MarkElementProps,
} from "@mui/x-charts/LineChart";
import Box from "@mui/material/Box";

const margin = { right: 24, left: -12, top: 24 };
const uData = [71, 69.5, 71.4, 72.6, 73];
const xLabels = ["янв 25", "февр 25", "март 25", "апр 25", "май 25"];

function CustomMark(props: MarkElementProps) {
  const { x, y, color } = props;

  return (
    <g>
      <circle cx={x} cy={y} r={4} fill={color || "currentColor"} />
      <text
        x={x}
        y={Number(y) - 12}
        style={{
          textAnchor: "middle",
          dominantBaseline: "auto",
          fill: color || "currentColor",
          fontWeight: "bold",
          fontSize: 12,
        }}
      >
        {uData[props.dataIndex].toString()}
      </text>
    </g>
  );
}

export default function Graph() {
  return (
    <div className="bg-white rounded-2xl shadow-md px-1">
      <div className="text-gray-700 mb-2 text-xl font-medium px-3 py-2">
        График изменения веса
      </div>
      <Box sx={{ width: "100%", height: 300 }}>
        <LineChart
          series={[{ data: uData, area: true, baseline: "min" }]}
          xAxis={[{ scaleType: "point", data: xLabels }]}
          margin={margin}
          sx={{
            [`& .${areaElementClasses.root}`]: {
              fill: "#2967ed8e",
            },
          }}
          slots={{
            mark: CustomMark,
          }}
          grid={{ horizontal: true }}
        />
      </Box>
    </div>
  );
}
