import { imageProviderEnum } from './cesiumEnum'
export default [
  {
    title: '中国地图彩色版',
    type: imageProviderEnum.arcgisImageProvider,
    // img: require('@/assets/img/arcgis1.png'),
    img: new URL('../assets/img/arcgis1.png', import.meta.url).href,
    url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer'
  },
  {
    title: '中国地图彩色英文版（含POI）',
    type: imageProviderEnum.arcgisImageProvider,
    img: new URL('../assets/img/arcgis2.png', import.meta.url).href,
    url: 'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunityENG/MapServer'
  },
  {
    title: '中国地图暖色版',
    type: imageProviderEnum.arcgisImageProvider,
    img: new URL('../assets/img/arcgis3.png', import.meta.url).href,
    url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer'
  },
  {
    title: '中国地图灰色版',
    type: imageProviderEnum.arcgisImageProvider,
    img: new URL('../assets/img/cn_canvas.jpg', import.meta.url).href,
    url: 'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer'
  },
  {
    title: '中国地图蓝黑版',
    type: imageProviderEnum.arcgisImageProvider,
    img: new URL('../assets/img/arcgis4.png', import.meta.url).href,
    url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer'
  },
  // {
  //   title: '天地图-地形（CGCS2000）',
  //   type: imageProviderEnum.wmsImageProvider,
  //   img: new URL('../assets/img/thumbnail1629180926424.png', import.meta.url).href,
  //   url: ['https://t0.tianditu.gov.cn/cta_c/esri/wmts?layer=cta&tilematrixset=c', 'https://t0.tianditu.gov.cn/ter_c/esri/wmts?layer=ter&tilematrixset=c']
  // },
  {
    title: '天地图-地形（球面墨卡托）',
    type: imageProviderEnum.wmsImageProvider,
    img: new URL('../assets/img/thumbnail1629181479311.png', import.meta.url).href,
    url: ['https://t0.tianditu.gov.cn/cta_w/esri/wmts?layer=cta&tilematrixset=w', 'https://t0.tianditu.gov.cn/ter_w/esri/wmts?layer=ter&tilematrixset=w']
  },
  // {
  //   title: '天地图-影像（CGCS2000）',
  //   type: imageProviderEnum.wmsImageProvider,
  //   img: new URL('../assets/img/thumbnail1629179809862.png', import.meta.url).href,
  //   url: ['https://t0.tianditu.gov.cn/cia_c/esri/wmts?layer=cia&tilematrixset=c', 'https://t0.tianditu.gov.cn/img_c/esri/wmts?layer=img&tilematrixset=c']
  // },
  {
    title: '天地图-影像（球面墨卡托）',
    type: imageProviderEnum.wmsImageProvider,
    img: new URL('../assets/img/thumbnail1629180632982.png', import.meta.url).href,
    url: ['https://t0.tianditu.gov.cn/cia_w/esri/wmts?layer=cia&tilematrixset=w', 'https://t0.tianditu.gov.cn/img_w/esri/wmts?layer=img&tilematrixset=w']
  },
  // {
  //   title: '天地图-矢量（CGCS2000）',
  //   type: imageProviderEnum.wmsImageProvider,
  //   img: new URL('../assets/img/thumbnail1629179208957.png', import.meta.url).href,
  //   // https://t0.tianditu.gov.cn/cva_c/esri/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=cva&STYLE=default&FORMAT=tiles&TILEMATRIXSET=c&TILEMATRIX=3&TILEROW=1&TILECOL=1&tk=85c9d12d5d691d168ba5cb6ecaa749eb
  //   url: ['https://t0.tianditu.gov.cn/cva_c/esri/wmts?layer=cva&tilematrixset=c', 'https://t0.tianditu.gov.cn/vec_c/esri/wmts?layer=vec&tilematrixset=c']
  // },
  {
    title: '天地图-矢量（球面墨卡托）',
    type: imageProviderEnum.wmsImageProvider,
    img: new URL('../assets/img/thumbnail1629181199303.png', import.meta.url).href,
    // https://t0.tianditu.gov.cn/cva_w/esri/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=cva&STYLE=default&FORMAT=tiles&TILEMATRIXSET=w&TILEMATRIX=3&TILEROW=1&TILECOL=6&tk=85c9d12d5d691d168ba5cb6ecaa749eb
    url: ['https://t0.tianditu.gov.cn/cva_w/esri/wmts?layer=cva&tilematrixset=w', 'https://t0.tianditu.gov.cn/vec_w/esri/wmts?layer=vec&tilematrixset=w']
  }
]
