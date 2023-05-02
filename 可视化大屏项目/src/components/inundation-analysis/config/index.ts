export const basicLayerConfig = [
  {
    id: "grid",
    name: "行政区网格",
  },
  {
    id: "highway",
    name: "高速路",
  },
  {
    id: "residence",
    name: "居民地",
  },
  {
    id: "railway",
    name: "铁路",
  },
  {
    id: "farmland",
    name: "耕地",
  },
  {
    id: "company",
    name: "重点单位",
  },
];

export const floodDefaultGrade = [
  {
    key: 1,
    name: "水深等级",
    grade: "水深",
    type: "水深",
    unit: "米",
    input: "0~0.05",
  },
  {
    key: 2,
    name: "水深等级",
    grade: "水深",
    type: "水深",
    unit: "米",
    input: "0.05~0.3",
  },
  {
    key: 3,
    name: "水深等级",
    grade: "水深",
    type: "水深",
    unit: "米",
    input: "0.3~0.5",
  },
  {
    key: 4,
    name: "水深等级",
    grade: "水深",
    type: "水深",
    unit: "米",
    input: "0.5~1",
  },
  {
    key: 5,
    name: "水深等级",
    grade: "水深",
    type: "水深",
    unit: "米",
    input: "1~2",
  },
  {
    key: 6,
    name: "水深等级",
    grade: "水深",
    type: "水深",
    unit: "米",
    input: ">2",
  },
];

//基础地理数据选择
export const basicLayers = [
  {
    key: "1-0",
    show: false,
    name: "行政区",
    leaf: true,
    tablename: "行政区",
    url: "/tile/?geomtype=polygon&dir=district&tablename=district&coor=4326&geomfield=geom&savepng=yes&x={x}&y={y}&z={z}",
  },
  {
    //TODO:待处理
    key: "1-1",
    show: false,
    name: "居民地",
    tablename: "居民地",
    leaf: true,
    url: "/tile/?geomtype=polygon&dir=residence&tablename=residence&coor=4326&geomfield=geom&savepng=yes&x={x}&y={y}&z={z}",
  },
  {
    //TODO:待处理
    key: "1-2",
    show: false,
    name: "耕地",
    tablename: "耕地",
    leaf: true,
    url: "/tile/?geomtype=polygon&dir=farmland&tablename=farmland&coor=4326&geomfield=geom&savepng=yes&x={x}&y={y}&z={z}",
  },
  {
    //TODO:待处理
    key: "1-3",
    show: false,
    name: "道路",
    tablename: "道路",
    leaf: true,
    url: "/tile/?geomtype=polyline&tablename=highway&coor=4326&geomfield=geom&x={x}&y={y}&z={z}",
  },
  {
    //TODO:待处理
    key: "1-4",
    show: false,
    name: "铁路",
    tablename: "铁路",
    leaf: true,
    url: "/tile/?geomtype=polyline&tablename=railway&coor=4326&geomfield=geom&x={x}&y={y}&z={z}",
  },
  {
    //TODO:待处理
    key: "1-5",
    show: false,
    name: "重要设施",
    tablename: "重要设施",
    leaf: true,
    url: "/tile/?geomtype=point&tablename=company&coor=4326&geomfield=geom&x={x}&y={y}&z={z}",
  },
];

//淹没分析
export const inundationAnalysisFormConfig = {
  洪水淹没数据: [
    {
      title: "名称",
      dataIndex: "name",
      valueType: "text",
    },
    {
      title: "最大水深字段名称",
      dataIndex: "depthOfWater",
      valueType: "text",
    },
  ],
  当前方案洪水损失率: [
    {
      title: "洪水损失率",
      dataIndex: "rateOfRate",
      valueType: "text",
    },
  ],
  去除水域影响: [
    {
      title: "网格类型",
      dataIndex: "gridType",
      valueType: "enum",
    },
    {
      title: "水域面",
      dataIndex: "waterArea",
      valueType: "enum",
    },
  ],
  default: [
    {
      title: "分析容量",
      dataIndex: "vol",
      valueType: "text",
    },
    {
      title: "删除网格",
      dataIndex: "deleteGrade",
      valueType: "bool",
    },
    {
      title: "水深≤",
      dataIndex: "depthOfWaterLe",
      valueType: "digit",
    },
  ],
};

//添加模型数据配置
export const floodStatisticsConfig = {
  default: [
    {
      title: "损失评估方案",
      dataIndex: "scheme",
      valueType: "text",
    },
    {
      title: "洪水损失率",
      dataIndex: "floodLossRate",
      valueType: "text",
    },
  ],
};

export const tablesConfig = [
  {
    id: "district",
    name: "按区县统计",
    statistic: true,
  },
  {
    id: "subdistrict",
    name: "按水利分区统计",
    statistic: true,
  },
  {
    id: "grid",
    name: "网格",
    geomtype: "polygon",
    coor: "4326",
  },
  {
    id: "highway",
    name: "高速公路",
    geomtype: "polyline",
    coor: "4326",
  },
  {
    id: "residence",
    name: "居民地",
    geomtype: "polygon",
    coor: "4326",
  },
  {
    id: "railway",
    name: "铁路",
    geomtype: "polyline",
    coor: "4326",
  },
  {
    id: "farmland",
    name: "耕地",
    geomtype: "polygon",
    coor: "4326",
  },
  {
    id: "company",
    name: "重要设施",
    geomtype: "point",
    coor: "4326",
  },
];

export const statisticTableField = [
  { key: "statistic_id", title: "ID" },
  { key: "district_code", title: "所属区县的code" },
  { key: "district_name", title: "所属区县的name" },
  { key: "grid_water_depth_level", title: "所属的grid水深级别" },
  { key: "grid_area_sum", title: "行政区面积淹没" },
  { key: "farmland_intersect_area_sum", title: "耕地面积淹没" },
  { key: "residence_intersect_area_sum", title: "居民地面积淹没" },
  { key: "railway_intersect_length_sum", title: "铁路长度淹没" },
  { key: "highway_intersect_length_sum", title: "公路长度淹没" },
  { key: "company_count", title: "重点设施淹没个数" },
  { key: "subdistrict_code", title: "所属水利分区的code" },
  { key: "subdistrict_name", title: "所属水利分区的name" },
];
