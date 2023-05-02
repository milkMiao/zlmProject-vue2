import { queryTableMeta } from "@/request/services";
import { getLightMapServer, getUUID } from "@/utils";
import { tablesConfig } from "../config";
import moment from "moment";

const getLocFileList = async () => {
  const locLogs = await queryTableMeta("loc_view");
  return locLogs.Data.map((loc) => {
    return {
      id: loc.loc_id,
      name: loc.loc_table_name,
      createTime: moment(loc.job_starttime).format("YYYY-MM-DD HH:mm"),
      gridNum: loc.loc_grid_count,
      status: loc.job_process === "finished" ? "已完成" : "未开始",
    };
  });
};

const getStatisticList = async () => {
  return [
    {
      id: 0,
      createTime: "2022-03-19T21:04:21Z",
      name: "受淹地物统计汇总",
    },
    {
      id: 1,
      createTime: "2022-03-19T21:04:21Z",
      name: "受淹居民地分类统计",
    },
    {
      id: 2,
      createTime: "2022-03-19T21:04:21Z",
      name: "受影响道路分类统计",
    },
    {
      id: 3,
      createTime: "2022-03-19T21:04:21Z",
      name: "受影响重点单位及设施分类统计",
    },
    {
      id: 4,
      createTime: "2022-03-19T21:04:21Z",
      name: "受淹地面积统计",
    },
    {
      id: 5,
      createTime: "2022-03-19T21:04:21Z",
      name: "受淹行政区面积统计",
    },
    {
      id: 6,
      createTime: "2022-03-19T21:04:21Z",
      name: "受淹铁路统计",
    },
  ];
};

//获取处理后的数据
const getAnalysisData = async () => {
  const result = await queryTableMeta("loc_view", {
    job_process: "finished",
  });

  return result.Data.map((item) => {
    let { output_table_name: outputTablesStr, job_id: key } = item;
    let outputTables = [];
    //区分空间表和统计表
    outputTablesStr.split(",").forEach((tablename) => {
      const originTableNameArr = tablename.split("_");
      let actualTableName = "";

      if (originTableNameArr[0] === "statistic") {
        actualTableName = originTableNameArr[1];
      } else {
        actualTableName = originTableNameArr[0];
      }

      const tableConfig = tablesConfig.find(
        (item) => item.id === actualTableName
      );

      if (tableConfig) {
        let url;
        if (!tableConfig.statistic) {
          url = getLightMapServer(tablename, tableConfig.geomtype, {
            coor: tableConfig.coor,
          });
        }
        outputTables.push({
          key: getUUID(),
          ...tableConfig,
          tablename,
          show: false,
          leaf: true,
          url,
        });
      }
    });

    return {
      name: item.input_table_name,
      key: item.job_id,
      statisticTables: outputTables.filter((table) => table.statistic),
      children: outputTables.filter((table) => !table.statistic),
    };
  });
};

export { getLocFileList, getStatisticList, getAnalysisData };
