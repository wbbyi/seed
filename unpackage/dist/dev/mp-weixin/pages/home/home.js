"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const pages_home_homeMethods = require("./homeMethods.js");
const pages_home_homeClass = require("./homeClass.js");
const url_url = require("../../url/url.js");
const v = "5.9.4";
const fr = 25;
const ip = 0;
const op = 56;
const w = 720;
const h = 720;
const nm = "loading-color 5";
const ddd = 0;
const assets = [];
const layers = [
  {
    ddd: 0,
    ind: 1,
    ty: 4,
    nm: "形状图层 1",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 1,
        k: [
          {
            i: {
              x: 0.035,
              y: 1
            },
            o: {
              x: 0.314,
              y: 0
            },
            t: 0,
            s: [
              220,
              360,
              0
            ],
            to: [
              13.333,
              0,
              0
            ],
            ti: [
              -13.333,
              0,
              0
            ]
          },
          {
            i: {
              x: 0.667,
              y: 0.667
            },
            o: {
              x: 0.333,
              y: 0.333
            },
            t: 10,
            s: [
              300,
              360,
              0
            ],
            to: [
              0,
              0,
              0
            ],
            ti: [
              0,
              0,
              0
            ]
          },
          {
            i: {
              x: 0.035,
              y: 1
            },
            o: {
              x: 0.314,
              y: 0
            },
            t: 15,
            s: [
              300,
              360,
              0
            ],
            to: [
              11.667,
              0,
              0
            ],
            ti: [
              -11.667,
              0,
              0
            ]
          },
          {
            i: {
              x: 0.667,
              y: 0.667
            },
            o: {
              x: 0.333,
              y: 0.333
            },
            t: 25,
            s: [
              370,
              360,
              0
            ],
            to: [
              0,
              0,
              0
            ],
            ti: [
              0,
              0,
              0
            ]
          },
          {
            i: {
              x: 0.035,
              y: 1
            },
            o: {
              x: 0.314,
              y: 0
            },
            t: 30,
            s: [
              370,
              360,
              0
            ],
            to: [
              11.667,
              0,
              0
            ],
            ti: [
              -11.667,
              0,
              0
            ]
          },
          {
            i: {
              x: 0.667,
              y: 0.667
            },
            o: {
              x: 0.333,
              y: 0.333
            },
            t: 40,
            s: [
              440,
              360,
              0
            ],
            to: [
              0,
              0,
              0
            ],
            ti: [
              0,
              0,
              0
            ]
          },
          {
            i: {
              x: 0.035,
              y: 1
            },
            o: {
              x: 0.314,
              y: 0
            },
            t: 45,
            s: [
              440,
              360,
              0
            ],
            to: [
              11.667,
              0,
              0
            ],
            ti: [
              -11.667,
              0,
              0
            ]
          },
          {
            t: 55,
            s: [
              510,
              360,
              0
            ]
          }
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -136,
          -18,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          100,
          100,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                45,
                45
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "椭圆路径 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: false
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0.145098039216,
                0.423529411765,
                1,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "填充 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: false
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -136,
                -18
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "变换"
          }
        ],
        nm: "椭圆 2",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: false
      },
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                45,
                45
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "椭圆路径 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: false
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0.145098039216,
                0.423529411765,
                1,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "填充 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: false
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -136,
                -18
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "变换"
          }
        ],
        nm: "椭圆 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 2,
        mn: "ADBE Vector Group",
        hd: false
      }
    ],
    ip: 0,
    op: 56,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 2,
    ty: 4,
    nm: "形状图层 6",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 1,
        k: [
          {
            i: {
              x: 0.209,
              y: 1
            },
            o: {
              x: 0.118,
              y: 0
            },
            t: 45,
            s: [
              510,
              360,
              0
            ],
            to: [
              -15.167,
              -76.25,
              0
            ],
            ti: [
              21.167,
              -75.5,
              0
            ]
          },
          {
            t: 55,
            s: [
              440,
              360,
              0
            ]
          }
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -136,
          -18,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          100,
          100,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                45,
                45
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "椭圆路径 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: false
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0.145098039216,
                0.423529411765,
                1,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "填充 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: false
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -136,
                -18
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "变换"
          }
        ],
        nm: "椭圆 2",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: false
      },
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                45,
                45
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "椭圆路径 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: false
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0.145098039216,
                0.423529411765,
                1,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "填充 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: false
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -136,
                -18
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "变换"
          }
        ],
        nm: "椭圆 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 2,
        mn: "ADBE Vector Group",
        hd: false
      }
    ],
    ip: 0,
    op: 56,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 3,
    ty: 4,
    nm: "形状图层 4",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 1,
        k: [
          {
            i: {
              x: 0.312,
              y: 1
            },
            o: {
              x: 0.117,
              y: 0
            },
            t: 30,
            s: [
              440,
              360,
              0
            ],
            to: [
              -34.167,
              -127.75,
              0
            ],
            ti: [
              0,
              0,
              0
            ]
          },
          {
            t: 40,
            s: [
              370,
              360,
              0
            ]
          }
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -136,
          -18,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          100,
          100,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                45,
                45
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "椭圆路径 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: false
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0.145098039216,
                0.423529411765,
                1,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "填充 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: false
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -136,
                -18
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "变换"
          }
        ],
        nm: "椭圆 2",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: false
      },
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                45,
                45
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "椭圆路径 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: false
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0.145098039216,
                0.423529411765,
                1,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "填充 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: false
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -136,
                -18
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "变换"
          }
        ],
        nm: "椭圆 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 2,
        mn: "ADBE Vector Group",
        hd: false
      }
    ],
    ip: 0,
    op: 56,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 4,
    ty: 4,
    nm: "形状图层 3",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 1,
        k: [
          {
            i: {
              x: 0.214,
              y: 1
            },
            o: {
              x: 0.173,
              y: 0
            },
            t: 15,
            s: [
              370,
              360,
              0
            ],
            to: [
              -41.917,
              -127.5,
              0
            ],
            ti: [
              0,
              0,
              0
            ]
          },
          {
            t: 25,
            s: [
              300,
              360,
              0
            ]
          }
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -136,
          -18,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          100,
          100,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                45,
                45
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "椭圆路径 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: false
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0.145098039216,
                0.423529411765,
                1,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "填充 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: false
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -136,
                -18
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "变换"
          }
        ],
        nm: "椭圆 2",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: false
      },
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                45,
                45
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "椭圆路径 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: false
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0.145098039216,
                0.423529411765,
                1,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "填充 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: false
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -136,
                -18
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "变换"
          }
        ],
        nm: "椭圆 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 2,
        mn: "ADBE Vector Group",
        hd: false
      }
    ],
    ip: 0,
    op: 56,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 5,
    ty: 4,
    nm: "形状图层 2",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 1,
        k: [
          {
            i: {
              x: 0.342,
              y: 1
            },
            o: {
              x: 0.138,
              y: 0
            },
            t: 0,
            s: [
              300,
              360,
              0
            ],
            to: [
              -40.083,
              -127.25,
              0
            ],
            ti: [
              0,
              0,
              0
            ]
          },
          {
            t: 10,
            s: [
              220,
              360,
              0
            ]
          }
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -136,
          -18,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          100,
          100,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                45,
                45
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "椭圆路径 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: false
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0.145098039216,
                0.423529411765,
                1,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "填充 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: false
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -136,
                -18
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "变换"
          }
        ],
        nm: "椭圆 2",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: false
      },
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                45,
                45
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "椭圆路径 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: false
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0.145098039216,
                0.423529411765,
                1,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "填充 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: false
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -136,
                -18
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "变换"
          }
        ],
        nm: "椭圆 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 2,
        mn: "ADBE Vector Group",
        hd: false
      }
    ],
    ip: 0,
    op: 56,
    st: 0,
    ct: 1,
    bm: 0
  }
];
const markers = [];
const animationData = {
  v,
  fr,
  ip,
  op,
  w,
  h,
  nm,
  ddd,
  assets,
  layers,
  markers
};
if (!Array) {
  const _easycom_uni_swiper_dot2 = common_vendor.resolveComponent("uni-swiper-dot");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_swiper_dot2 + _easycom_uni_card2)();
}
const _easycom_uni_swiper_dot = () => "../../uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_swiper_dot + _easycom_uni_card)();
}
const maxNum = 2;
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "home",
  setup(__props) {
    let { chooseImage } = pages_home_homeMethods.methods();
    const showUploadCartoon = common_vendor.ref(false);
    const showModel = common_vendor.ref(false);
    const current = common_vendor.ref(0);
    const info = common_vendor.ref([
      {
        content: "页面1"
      },
      {
        content: "页面2"
      },
      {
        content: "页面3"
      }
    ]);
    const imgPaths = common_vendor.ref([]);
    let seedList = common_vendor.ref([]);
    const date = /* @__PURE__ */ new Date();
    const seed1 = new pages_home_homeClass.CardMessage("/static/history.png", "1", "1", date);
    seedList.value.push(seed1);
    const dotsStyles = {
      backgroundColor: "rgba(0, 0, 0, .3)",
      border: "1px rgba(0, 0, 0, .3) solid",
      color: "#fff",
      selectedBackgroundColor: "rgba(0, 0, 0, .9)",
      selectedBorder: "1px rgba(0, 0, 0, .9) solid"
    };
    const onSwiperChange = (e) => {
      current.value = e.detail.current;
    };
    const showPopup = common_vendor.ref(false);
    const openPopup = () => {
      showPopup.value = true;
    };
    const closePopup = () => {
      showPopup.value = false;
    };
    const takePhoto = () => {
      closePopup();
      imgPaths.value = chooseImage(0, 1);
      showModel.value = true;
    };
    const chooseImages = () => {
      closePopup();
      imgPaths.value = chooseImage(0, maxNum);
      showModel.value = true;
    };
    const closemodalMask = () => {
      closePopup();
      showModel.value = false;
    };
    const uploadImages = () => {
      closemodalMask();
      showUploadCartoon.value = true;
      common_vendor.index.request({
        url: url_url.baseUrl + url_url.functionUrl,
        method: "POST",
        data: {
          imgs: seedList
        },
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/home/home.vue:152", "请求成功", res.data);
          showUploadCartoon.value = false;
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/home/home.vue:156", "请求失败", err);
          showUploadCartoon.value = false;
        },
        complete: () => {
          common_vendor.index.__f__("log", "at pages/home/home.vue:160", "请求完成");
        }
      });
    };
    const cancel = () => {
      closemodalMask();
    };
    common_vendor.onMounted(() => {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      currentPage.openPopup = openPopup;
    });
    common_vendor.onUnmounted(() => {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      delete currentPage.openPopup;
    });
    common_vendor.onShow(() => {
      const tabBar = getApp().$tabbar;
      if (tabBar) {
        tabBar.setData({
          selected: 0
        });
      }
    });
    common_vendor.onMounted(() => {
      common_vendor.index.createSelectorQuery().select("#canvas").node((res) => {
        const canvas = res.node;
        common_vendor.lottie.setup(canvas);
        common_vendor.lottie.loadAnimation({
          renderer: "canvas",
          loop: true,
          autoplay: true,
          animationData,
          rendererSettings: {
            context: canvas.getContext("2d")
          }
        });
      }).exec();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(info.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.content),
            b: index
          };
        }),
        b: current.value,
        c: common_vendor.o(onSwiperChange),
        d: common_vendor.p({
          info: info.value,
          current: current.value,
          mode: "round",
          ["dots-styles"]: dotsStyles
        }),
        e: common_vendor.unref(seedList).length === 0
      }, common_vendor.unref(seedList).length === 0 ? {
        f: common_assets._imports_0
      } : {
        g: common_vendor.f(common_vendor.unref(seedList), (i, k0, i0) => {
          return {
            a: common_vendor.t(i.text),
            b: "07e72d3c-1-" + i0,
            c: common_vendor.p({
              title: i.name,
              ["sub-title"]: i.time,
              thumbnail: i.photo
            }),
            d: i
          };
        })
      }, {
        h: showPopup.value || showModel.value
      }, showPopup.value || showModel.value ? {
        i: common_vendor.o(closePopup)
      } : {}, {
        j: showUploadCartoon.value,
        k: showPopup.value
      }, showPopup.value ? {
        l: common_assets._imports_3,
        m: common_vendor.o(takePhoto),
        n: common_assets._imports_4,
        o: common_vendor.o(chooseImages)
      } : {}, {
        p: showModel.value
      }, showModel.value ? {
        q: common_vendor.f(imgPaths.value, (i, index, i0) => {
          return {
            a: i,
            b: index
          };
        }),
        r: common_vendor.o(uploadImages),
        s: common_vendor.o(cancel)
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-07e72d3c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/home.js.map
