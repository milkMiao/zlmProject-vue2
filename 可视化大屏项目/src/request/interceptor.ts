/*
 * @Author: zhixian
 * @Date: 2022-05-29 19:15:15
 * @Description:
 */
import {
  getTablefield,
  queryTableMeta,
  querySpatialTable,
} from "@/request/services";
import {
  getTableColCompareFunc,
  getTableColFilterFunc,
  getUUID,
} from "@/utils";
import { errorEnumZh } from "@/dictionary";
import { message } from "ant-design-vue";
export function getTableFields(tablename: string) {
  return getTablefield(tablename).then((res: any) => {
    if (res.length === 0) {
      message.error(errorEnumZh.empty);
    }
    let fields = res
      .filter((item: { field_name: string }) => item.field_name !== "geom")
      .map((item: any, index: number) => {
        let column = {
          dataIndex: item.field_name,
          title: item.field_name,
          key: `column-${index}`,
          valueType: item.field_type_alias,
          // width: 200, //TODO:可以根据列名长度判断宽度
          ellipsis: true,
        };
        if (["int", "double", "string"].includes(column.valueType)) {
          column.sorter = {
            compare: getTableColCompareFunc(column.dataIndex, column.valueType),
            multiple: index + 1,
          };
        }
        //添加过滤
        if (column.valueType === "string") {
          column.customFilterDropdown = true;
          column.onFilter = getTableColFilterFunc(column.dataIndex);
        }
        return column;
      });

    return fields;
  });
}

export function getData(tablename: string, pageSize: number, sort?: string) {
  return queryTableMeta(tablename, {
    limit: pageSize,
    sort,
  }).then((res: any) => {
    const oldData = res?.Data ?? [];
    return oldData.map((item: any) => {
      const key = item.key ?? getUUID();
      return {
        key,
        ...item,
      };
    });
  });
}

export function getFieldDetail(tablename: string) {
  return querySpatialTable(tablename).then((res: any) => {
    return res.Data;
  });
}
