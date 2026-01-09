import {
  areaElementClasses,
  LineChart,
  lineElementClasses,
  MarkElementProps,
} from "@mui/x-charts/LineChart";
import Box from "@mui/material/Box";
import { IBodyWeight } from "../../../utils";
import { useCallback, useMemo } from "react";

const margin = { right: 24, left: -12, top: 24 };

function formatShortMonth(date: Date) {
  return new Intl.DateTimeFormat("ru-RU", {
    month: "short",
    year: "2-digit",
  })
    .format(date)
    .replace("г.", "")
    .trim();
}

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
        {props.seriesData[props.dataIndex].toString()}
      </text>
    </g>
  );
}

interface IProps {
  items: IBodyWeight[];
}

export default function Graph({ items }: IProps) {
  const seriesData = useMemo(
    () => items?.map((item) => item.value_kg),
    [items]
  );
  const labelsData = useMemo(
    () =>
      items?.map((item, index) => formatShortMonth(new Date(item.measured_at))),
    [items]
  );

  const Mark = useCallback(
    (props: any) => {
      return <CustomMark {...props} seriesData={seriesData} />;
    },
    [seriesData]
  );

  if (!items?.length) {
    return <></>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-md px-1">
      <div className="text-gray-700 mb-2 text-xl font-medium px-3 py-2">
        График изменения веса
      </div>
      <Box sx={{ width: "100%", height: 300 }}>
        <LineChart
          series={[{ data: seriesData, area: true, baseline: "min" }]}
          xAxis={[{ scaleType: "point", data: labelsData }]}
          margin={margin}
          sx={{
            [`& .${areaElementClasses.root}`]: {
              fill: "#2967ed8e",
            },
          }}
          slots={{
            mark: Mark,
          }}
          grid={{ horizontal: true }}
        />
      </Box>
    </div>
  );
}
