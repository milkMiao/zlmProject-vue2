export default [
  {
    name: '地理基础图层',
    key: '0',
    children: [
      {
        key: '0-0',
        show: true,
        name: '太湖流域',
        tablename: 'subdistrict',
        leaf: true,
        url: '/tile/?geomtype=polygon&dir=subdistrict&begintime=2022.02.14.13.30.00&tablename=subdistrict&coor=3857&geomfield=geom&savepng=yes&x={x}&y={y}&z={z}&stylefield=圩区规模&styletype=multi&styleconfig=value:万亩以下圩区,fillcolor:252-218-207,strokecolor:110-110-110,transparent:1,linewidth:0.4|value:江南运河沿线,fillcolor:182-245-252,strokecolor:110-110-110,transparent:1,linewidth:0.4|value:望虞河沿线,fillcolor:239-215-252,strokecolor:110-110-110,transparent:1,linewidth:0.4|value:太浦河沿线,fillcolor:255-179-153,strokecolor:110-110-110,transparent:1,linewidth:0.4|value:城市防洪工程,fillcolor:201-242-208,strokecolor:110-110-110,transparent:1,linewidth:0.4|value:Default,fillcolor:255-255-190,strokecolor:110-110-110,transparent:1,linewidth:0.4'
      },
      {
        key: '0-1',
        show: true,
        name: '河道',
        tablename: '范围内河流',
        leaf: true,
        url: '/tile/?geomtype=polyline&dir=范围内河流&tablename=范围内河流&coor=3857&geomfield=geom&savepng=yes&x={x}&y={y}&z={z}'
      },
      {
        key: '0-2',
        show: true,
        name: '湖泊',
        tablename: '湖泊',
        leaf: true,
        url: '/tile/?geomtype=polygon&dir=湖泊&tablename=public.湖泊&coor=3857&geomfield=geom&savepng=yes&x={x}&y={y}&z={z}&stylefield=&styletype=one&styleconfig=value:,fillcolor:151-219-242,strokecolor:110-110-110,transparent:1,linewidth:0'
      },
      {
        key: '0-3',
        show: true,
        name: '圩区',
        tablename: '太湖流域圩区图层',
        leaf: true,
        url: '/tile/?geomtype=polygon&tablename=太湖流域圩区图层&coor=3857&x={x}&y={y}&z={z}&savepng=no&styleconfig=fillcolor:255-0-0,strokecolor:166-202-240,transparent:125,linewidth:2'
      }
    ]
  },
  {
    name: '风险基础图层',
    key: '1',
    children: [
      {
        key: '1-0',
        show: false,
        name: '行政区',
        leaf: true,
        tablename: 'district',
        url: '/tile/?geomtype=polygon&dir=district&tablename=district&coor=4326&geomfield=geom&savepng=yes&x={x}&y={y}&z={z}'
      },
      {
        key: '1-1',
        show: false,
        name: '居民地',
        tablename: 'residence',
        leaf: true,
        url: '/tile/?geomtype=polygon&dir=residence&tablename=residence&coor=4326&geomfield=geom&savepng=yes&x={x}&y={y}&z={z}'
      },
      {
        key: '1-2',
        show: false,
        name: '耕地',
        tablename: 'farmland',
        leaf: true,
        url: '/tile/?geomtype=polygon&dir=farmland&tablename=farmland&coor=4326&geomfield=geom&savepng=yes&x={x}&y={y}&z={z}'
      },
      {
        key: '1-3',
        show: false,
        name: '道路',
        tablename: 'highway',
        leaf: true,
        url: '/tile/?geomtype=polyline&tablename=highway&coor=4326&geomfield=geom&x={x}&y={y}&z={z}'
      },
      {
        key: '1-4',
        show: false,
        name: '铁路',
        tablename: 'railway',
        leaf: true,
        url: '/tile/?geomtype=polyline&tablename=railway&coor=4326&geomfield=geom&x={x}&y={y}&z={z}'
      },
      {
        key: '1-5',
        show: false,
        name: '重要设施',
        tablename: 'company',
        leaf: true,
        url: '/tile/?geomtype=point&tablename=company&coor=4326&geomfield=geom&x={x}&y={y}&z={z}'
      }
    ]
  },
  {
    name: '综合治理图层',
    key: '2',
    children: [
      {
        key: '2-0',
        show: false,
        name: '太湖流域外行政区',
        leaf: true,
        tablename: '行政分区_太湖流域外行政区',
        url: '/new_til2/tile?geomtype=polygon&tablename=行政分区_太湖流域外行政区&coor=4326&x={x}&y={y}&z={z}&savepng=yes&dir=行政分区_太湖流域外行政区&styleconfig=fillcolor:225-225-225,strokecolor:115-178-255,transparent:1,linewidth:0'
      },
      {
        key: '2-1',
        show: false,
        name: '太湖流域高程图',
        leaf: true,
        tablename: '等高线_太湖流域高程图（外廓线）',
        url: '/new_til2/tile?geomtype=polygon&tablename=等高线_太湖流域高程图（外廓线）&coor=4326&x={x}&y={y}&z={z}&savepng=yes&dir=等高线_太湖流域高程图（外廓线）&styleconfig=fillcolor:179-179-179,strokecolor:115-178-255,transparent:0,linewidth:1'
      },
      {
        key: '2-2',
        show: false,
        name: '流域外主要水域',
        leaf: true,
        tablename: '水系_流域外主要水域',
        url: '/new_til2/tile?geomtype=polygon&tablename=水系_流域外主要水域&coor=4326&x={x}&y={y}&z={z}&savepng=yes&dir=水系_流域外主要水域&styleconfig=fillcolor:190-232-255,strokecolor:0-197-255,transparent:1,linewidth:0'
      },
      {
        key: '2-3',
        show: false,
        name: '水资源分区界线2',
        leaf: true,
        tablename: '水资源分区_水资源分区界线（平滑）',
        url: '/new_til2/tile?geomtype=polyline&tablename=水资源分区_水资源分区界线（平滑）&coor=4326&x={x}&y={y}&z={z}&savepng=yes&dir=水资源分区_水资源分区界线（平滑）2&styleconfig=fillcolor:255-0-0,strokecolor:255-166-240,transparent:1,linewidth:16&where=' + encodeURIComponent("classid='TBA_2'")
      },
      {
        key: '2-4',
        show: false,
        name: '水资源分区界线1',
        leaf: true,
        tablename: '水资源分区_水资源分区界线（平滑）',
        url: '/new_til2/tile?geomtype=polyline&tablename=水资源分区_水资源分区界线（平滑）&coor=4326&x={x}&y={y}&z={z}&savepng=yes&dir=水资源分区_水资源分区界线（平滑）1&styleconfig=fillcolor:255-0-0,strokecolor:255-64-223,transparent:1,linewidth:8&where=' + encodeURIComponent("classid='TBA_2'")
      },
      {
        key: '2-5',
        show: false,
        name: '太湖流域高程图',
        leaf: true,
        tablename: '太湖流域高程图',
        url: '/new_til2/tile?geomtype=polygon&tablename=太湖流域高程图&coor=4326&x={x}&y={y}&z={z}&savepng=yes&dir=太湖流域高程图&stylefield=code&styletype=multi&styleconfig=value:0—2,fillcolor:173-224-199,transparent:1|value:2—5,fillcolor:204-255-217,transparent:1|value:5—10,fillcolor:230-255-204,transparent:1|value:10—50,fillcolor:255-242-204,transparent:1|value:50—200,fillcolor:255-230-179,transparent:1|value:200—500,fillcolor:255-204-153,transparent:1|value:500—1000,fillcolor:255-179-153,transparent:1|value:1000—1500,fillcolor:255-153-153,transparent:1|value:湖泊,fillcolor:204-226-255,transparent:1|value:Default,fillcolor:242-115-140,transparent:1'
      },
      {
        key: '2-6',
        show: false,
        name: '地市所在地',
        leaf: true,
        tablename: '行政分区_地市所在地',
        url: '/new_til2/tile?geomtype=polygon&tablename=行政分区_地市所在地&coor=4326&x={x}&y={y}&z={z}&savepng=yes&dir=行政分区_地市所在地4&stylefield=adclass&styletype=multi&styleconfig=value:AB,fillcolor:255-190-190,transparent:1,strokecolor:230-0-0,linewidth:0.4|value:AC,fillcolor:255-255-115,transparent:1,strokecolor:156-156-156,linewidth:0.4|value:Default,fillcolor:203-234-245,transparent:1,strokecolor:110-110-110,linewidth:0.4&labelfield=rname&labeltype=one&position=center&labelconfig=size:16,position:center,color:0-0-0,zoommin:4,zoommax:18'
      },
      {
        key: '2-7',
        show: false,
        name: 'taihu',
        leaf: true,
        tablename: 'taihu',
        url: '/new_til2/tile?geomtype=polygon&tablename=taihu&coor=4326&x={x}&y={y}&z={z}&savepng=yes&dir=taihu&styleconfig=fillcolor:150-218-241,strokecolor:128-123-127,transparent:1,linewidth:0'
      },
      {
        key: '2-8',
        show: false,
        name: 'th',
        leaf: true,
        tablename: 'th',
        url: '/new_til2/tile?geomtype=polygon&tablename=th&coor=4326&x={x}&y={y}&z={z}&savepng=yes&dir=th&styleconfig=fillcolor:233-158-180,strokecolor:128-123-127,transparent:1,linewidth:1'
      },
      {
        key: '2-9',
        show: false,
        name: '流域外主要河流',
        leaf: true,
        tablename: '水系_流域外主要河流',
        url: '/new_til2/tile?geomtype=polyline&tablename=水系_流域外主要河流&coor=4326&x={x}&y={y}&z={z}&savepng=yes&dir=水系_流域外主要河流&styleconfig=fillcolor:255-0-0,strokecolor:0-169-255,transparent:1,linewidth:1'
      },
      {
        key: '2-10',
        show: false,
        name: '行政分区界线',
        leaf: true,
        tablename: '行政分区_行政分区界线',
        url: '/new_til2/tile?geomtype=polyline&tablename=行政分区_行政分区界线&coor=4326&x={x}&y={y}&z={z}&savepng=yes&dir=行政分区_行政分区界线&styleconfig=fillcolor:255-0-0,strokecolor:15-26-7,transparent:1,linewidth:1'
      },
      {
        key: '2-11',
        show: false,
        name: '流域主要河流',
        leaf: true,
        tablename: '流域主要河流',
        url: '/new_til2/tile?geomtype=polyline&tablename=流域主要河流&coor=4326&x={x}&y={y}&z={z}&savepng=yes&dir=流域主要河流&styleconfig=fillcolor:255-0-0,strokecolor:0-169-255,transparent:1,linewidth:2'
      },
      {
        key: '2-12',
        show: false,
        name: '水资源配置工程布局',
        leaf: true,
        tablename: '水系_重点工程河线',
        url: '/new_til2/tile?geomtype=polyline&tablename=水系_重点工程河线&coor=4326&x={x}&y={y}&z={z}&savepng=yes&dir=水系_重点工程河线&stylefield=name&styletype=multi&styleconfig=value:川沙河-吴淞江-吴淞江出湖段-太浦河后续-望虞河,strokecolor:255-0-0,linewidth:4|value:北干河-滆湖抽槽-太滆运河-新孟河-新孟河延伸,strokecolor:255-170-0,linewidth:3|value:Default,strokecolor:0-92-130,linewidth:3'
      },
      {
        key: '2-13',
        show: false,
        name: '淀山湖图层',
        leaf: true,
        tablename: '淀山湖图层',
        url: '/new_til2/tile?geomtype=polyline&tablename=淀山湖图层&coor=4326&x={x}&y={y}&z={z}&savepng=yes&dir=淀山湖图层&styleconfig=fillcolor:255-0-0,strokecolor:0-0-255,transparent:1,linewidth:2'
      },
      {
        key: '2-14',
        show: false,
        name: '县市所在地',
        leaf: true,
        tablename: '行政分区_县市所在地',
        url: '/new_til2/tile?geomtype=point&tablename=行政分区_县市所在地&coor=4326&x={x}&y={y}&z={z}&savepng=yes&dir=行政分区_县市所在地&labelfield=rname&labeltype=one&labelconfig=size:10,position:center,color:0-0-0,zoommin:10,zoommax:18&styletype=one&icontype=img&styleconfig=icontype:img,iconsize:10,iconname:县.png'
      },
      {
        key: '2-15',
        show: false,
        name: '规划重点工程枢纽',
        leaf: true,
        tablename: '水利工程_规划重点工程枢纽',
        url: '/new_til2/tile?geomtype=point&tablename=水利工程_规划重点工程枢纽&coor=4326&x={x}&y={y}&z={z}&savepng=yes&dir=水利工程_规划重点工程枢纽2&stylefield=perimeter&styletype=multi&icontype=img&styleconfig=value:1,icontype:img,iconsize:20,iconname:11.png|value:2,icontype:img,iconsize:20,iconname:泵站.png'
      },
      {
        key: '2-16',
        show: false,
        name: '水系_流域外主要河流_注记',
        leaf: true,
        tablename: '水系_流域外主要河流_注记',
        url: '/new_til2/tile?geomtype=polygon&tablename=水系_流域外主要河流_注记&coor=4326&x={x}&y={y}&z={z}&savepng=yes&dir=水系_流域外主要河流_注记2&styleconfig=fillcolor:0-194-255,strokecolor:115-178-255,transparent:1,linewidth:0'
      },
      {
        key: '2-17',
        show: false,
        name: '流域主要河流_注记',
        leaf: true,
        tablename: '流域主要河流_注记',
        url: '/new_til2/tile?geomtype=polygon&tablename=流域主要河流_注记&coor=4326&x={x}&y={y}&z={z}&savepng=yes&dir=流域主要河流_注记&styleconfig=fillcolor:0-194-255,strokecolor:115-178-255,transparent:1,linewidth:0'
      }
    ]
  }
]
