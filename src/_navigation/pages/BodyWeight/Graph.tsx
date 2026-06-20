import { useCallback, useMemo } from "react";

import { useBodyWeightGraphQuery } from "../../../hooks";

import {
  areaElementClasses,
  LineChart,
  MarkElementProps,
} from "@mui/x-charts/LineChart";
import Box from "@mui/material/Box";
import { Skeleton } from "@mui/material";

const margin = { right: 24, left: -16, top: 24 };

function CustomMark(props: MarkElementProps) {
  const { x, y, color } = props;

  return (
    <g>
      <circle cx={x} cy={y} r={4} fill={color || "currentColor"} />
      <text
        x={props.dataIndex === 0 ? Number(x) + 12 : x}
        y={props.dataIndex === 0 ? Number(y) - 18 : Number(y) - 12}
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

export default function Graph() {
  const { data: items } = useBodyWeightGraphQuery();

  const seriesData = useMemo(
    () => items?.map((item) => item.value_kg),
    [items],
  );
  const labelsData = useMemo(
    () => items?.map((item) => item.short_date),
    [items],
  );

  const Mark = useCallback(
    (props: any) => {
      return <CustomMark {...props} seriesData={seriesData} />;
    },
    [seriesData],
  );

  return (
    <div className="bg-white rounded-2xl shadow-md px-1">
      <div className="text-gray-700 mb-2 text-xl font-medium px-3 py-2">
        График изменения веса
      </div>
      {items?.length ? (
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
      ) : (
        <div className="h-[300px] pb-4 px-1 rounded-xl overflow-hidden box-border">
          <Skeleton
            className="h-full"
            variant="rounded"
            animation="wave"
            height={"100%"}
          />
        </div>
      )}
    </div>
  );
}
