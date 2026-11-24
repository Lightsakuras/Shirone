(function(root){
'use strict';
// Frozen M3 definition from efefc4a; source SHA256 e3425e977122b29efc908fb6abb1e148dc39879407c73b9858dd6f7701b507a6. No map registration.
const data={
  "schema": 1,
  "revision": 2,
  "maps": {
    "tower-duty": {
      "name": "锁妖塔 · 值夜环廊",
      "sub": "一层至四层 · 添水、询证、记值",
      "artKey": "tower-duty",
      "width": 1280,
      "height": 760,
      "entry": {
        "x": 640,
        "y": 650
      },
      "requires": {
        "all": [
          {
            "type": "legacy",
            "id": "chapterComplete"
          },
          {
            "type": "legacy",
            "id": "adultZhuji"
          },
          {
            "type": "token",
            "id": "duty-mirror"
          }
        ],
        "any": []
      },
      "layout": "外围宽环廊绕塔心基座；老狐与熊妖隔廊相望，三个符水盘分布西、东、北。",
      "walls": [
        {
          "x": 0,
          "y": 0,
          "w": 1280,
          "h": 60
        },
        {
          "x": 0,
          "y": 730,
          "w": 1280,
          "h": 30
        },
        {
          "x": 0,
          "y": 60,
          "w": 30,
          "h": 670
        },
        {
          "x": 1250,
          "y": 60,
          "w": 30,
          "h": 670
        },
        {
          "x": 30,
          "y": 60,
          "w": 535,
          "h": 130
        },
        {
          "x": 735,
          "y": 60,
          "w": 515,
          "h": 130
        },
        {
          "x": 500,
          "y": 300,
          "w": 280,
          "h": 115
        },
        {
          "x": 30,
          "y": 680,
          "w": 470,
          "h": 50
        },
        {
          "x": 790,
          "y": 680,
          "w": 460,
          "h": 50
        }
      ],
      "objects": [
        {
          "id": "towerDutyReturn",
          "name": "回药庐交班",
          "x": 640,
          "y": 650,
          "kind": "campaignObject",
          "role": "portal",
          "height": 0
        },
        {
          "id": "towerDutyUp",
          "name": "往六层封印廊",
          "x": 640,
          "y": 135,
          "kind": "campaignObject",
          "role": "portal",
          "height": 0
        },
        {
          "id": "towerSteward",
          "name": "玄都 · 值役执事",
          "x": 350,
          "y": 580,
          "kind": "campaignObject",
          "role": "npc",
          "height": 108,
          "personId": "xuandu",
          "atlas": "campaignPeople",
          "cell": 2
        },
        {
          "id": "towerOldFox",
          "name": "栏后老狐",
          "x": 250,
          "y": 180,
          "kind": "campaignObject",
          "role": "npc",
          "height": 108,
          "personId": "old-fox",
          "atlas": "campaignPeople",
          "cell": 3
        },
        {
          "id": "towerBear",
          "name": "塔心熊妖",
          "x": 1030,
          "y": 180,
          "kind": "campaignObject",
          "role": "npc",
          "height": 108,
          "personId": "tower-bear",
          "atlas": "campaignPeople",
          "cell": 4
        },
        {
          "id": "towerMirrorRack",
          "name": "值役镜架",
          "x": 440,
          "y": 520,
          "kind": "campaignObject",
          "role": "prop",
          "height": 56,
          "atlas": "campaignProps",
          "cell": 0
        },
        {
          "id": "towerWaterWest",
          "name": "西廊符水盘",
          "x": 225,
          "y": 450,
          "kind": "campaignObject",
          "role": "prop",
          "height": 56,
          "atlas": "campaignProps",
          "cell": 1
        },
        {
          "id": "towerWaterEast",
          "name": "东廊符水盘",
          "x": 1030,
          "y": 500,
          "kind": "campaignObject",
          "role": "prop",
          "height": 56,
          "atlas": "campaignProps",
          "cell": 1
        },
        {
          "id": "towerWaterNorth",
          "name": "北阶符水盘",
          "x": 640,
          "y": 240,
          "kind": "campaignObject",
          "role": "prop",
          "height": 56,
          "atlas": "campaignProps",
          "cell": 1
        },
        {
          "id": "towerDutyLedger",
          "name": "当值簿",
          "x": 820,
          "y": 600,
          "kind": "campaignObject",
          "role": "prop",
          "height": 56,
          "atlas": "chapterProps",
          "cell": 12
        }
      ],
      "sources": [
        {
          "file": "src/lib/story/volume2.ts",
          "line": 732,
          "node": "zhuji_tower_duty_start"
        },
        {
          "file": "src/lib/story/volume2.ts",
          "line": 747,
          "node": "zhuji_tower_night1"
        },
        {
          "file": "src/lib/story/volume2.ts",
          "line": 763,
          "node": "zhuji_tower_night2"
        }
      ]
    },
    "tower-seal": {
      "name": "锁妖塔 · 六层封印廊",
      "sub": "双闸折返 · 复封守阵或依证静行",
      "artKey": "tower-seal",
      "width": 1280,
      "height": 760,
      "entry": {
        "x": 250,
        "y": 620
      },
      "requires": {
        "all": [
          {
            "type": "legacy",
            "id": "adultZhuji"
          },
          {
            "type": "task",
            "id": "tower-duty",
            "status": "claimed"
          }
        ],
        "any": []
      },
      "layout": "两堵错开的纵向隔墙形成折返路；西、中、东三锚在不同可达区，中区为守阵战场。",
      "walls": [
        {
          "x": 0,
          "y": 0,
          "w": 1280,
          "h": 60
        },
        {
          "x": 0,
          "y": 730,
          "w": 1280,
          "h": 30
        },
        {
          "x": 0,
          "y": 60,
          "w": 30,
          "h": 670
        },
        {
          "x": 1250,
          "y": 60,
          "w": 30,
          "h": 670
        },
        {
          "x": 480,
          "y": 70,
          "w": 30,
          "h": 140
        },
        {
          "x": 472,
          "y": 200,
          "w": 32,
          "h": 130
        },
        {
          "x": 455,
          "y": 320,
          "w": 35,
          "h": 65
        },
        {
          "x": 425,
          "y": 375,
          "w": 45,
          "h": 60
        },
        {
          "x": 900,
          "y": 300,
          "w": 40,
          "h": 80
        },
        {
          "x": 875,
          "y": 370,
          "w": 40,
          "h": 155
        },
        {
          "x": 860,
          "y": 510,
          "w": 40,
          "h": 205
        },
        {
          "x": 625,
          "y": 135,
          "w": 200,
          "h": 95
        },
        {
          "x": 585,
          "y": 500,
          "w": 155,
          "h": 75
        },
        {
          "x": 30,
          "y": 540,
          "w": 155,
          "h": 25
        },
        {
          "x": 185,
          "y": 555,
          "w": 30,
          "h": 135
        }
      ],
      "objects": [
        {
          "id": "towerSealDown",
          "name": "返回值夜环廊",
          "x": 240,
          "y": 620,
          "kind": "campaignObject",
          "role": "portal",
          "height": 0
        },
        {
          "id": "towerSealUp",
          "name": "往七层镜室",
          "x": 1100,
          "y": 145,
          "kind": "campaignObject",
          "role": "portal",
          "height": 0
        },
        {
          "id": "towerSealNotice",
          "name": "封印值查图",
          "x": 280,
          "y": 580,
          "kind": "campaignObject",
          "role": "prop",
          "height": 56,
          "atlas": "chapterProps",
          "cell": 12
        },
        {
          "id": "towerSealClay",
          "name": "封缄朱泥匣",
          "x": 330,
          "y": 450,
          "kind": "campaignObject",
          "role": "prop",
          "height": 56,
          "atlas": "campaignProps",
          "cell": 2
        },
        {
          "id": "towerSealWest",
          "name": "西锚 · 定外环",
          "x": 290,
          "y": 250,
          "kind": "campaignObject",
          "role": "prop",
          "height": 56,
          "atlas": "campaignProps",
          "cell": 6
        },
        {
          "id": "towerSealMiddle",
          "name": "中锚 · 留回流",
          "x": 695,
          "y": 450,
          "kind": "campaignObject",
          "role": "prop",
          "height": 56,
          "atlas": "campaignProps",
          "cell": 6
        },
        {
          "id": "towerSealEast",
          "name": "东锚 · 合封缄",
          "x": 1130,
          "y": 400,
          "kind": "campaignObject",
          "role": "prop",
          "height": 56,
          "atlas": "campaignProps",
          "cell": 6
        },
        {
          "id": "towerSealCrack",
          "name": "被灵流滑过的裂纹",
          "x": 680,
          "y": 280,
          "kind": "campaignObject",
          "role": "prop",
          "height": 56,
          "atlas": "campaignProps",
          "cell": 6
        },
        {
          "id": "towerSealBell",
          "name": "守阵铜铃",
          "x": 650,
          "y": 360,
          "kind": "campaignObject",
          "role": "prop",
          "height": 56,
          "atlas": "sectProps",
          "cell": 0
        }
      ],
      "sources": [
        {
          "file": "src/lib/story/volume2.ts",
          "line": 779,
          "node": "zhuji_tower_night3"
        },
        {
          "file": "src/lib/story/volume2.ts",
          "line": 795,
          "node": "zhuji_tower_night4"
        }
      ]
    },
    "tower-upper": {
      "name": "锁妖塔 · 七层镜室",
      "sub": "先验眼前，再录墙上；不以一魄换一句话",
      "artKey": "tower-upper",
      "width": 1280,
      "height": 760,
      "entry": {
        "x": 640,
        "y": 640
      },
      "requires": {
        "all": [
          {
            "type": "legacy",
            "id": "adultZhuji"
          },
          {
            "type": "task",
            "id": "tower-seal",
            "status": "claimed"
          }
        ],
        "any": []
      },
      "layout": "中央薄墙镜室上下开口；血字在北，未知残响隔右壁，南端可绕到密道。",
      "walls": [
        {
          "x": 0,
          "y": 0,
          "w": 1280,
          "h": 60
        },
        {
          "x": 0,
          "y": 730,
          "w": 1280,
          "h": 30
        },
        {
          "x": 0,
          "y": 60,
          "w": 30,
          "h": 670
        },
        {
          "x": 1250,
          "y": 60,
          "w": 30,
          "h": 670
        },
        {
          "x": 30,
          "y": 60,
          "w": 1220,
          "h": 50
        },
        {
          "x": 390,
          "y": 225,
          "w": 240,
          "h": 35
        },
        {
          "x": 698,
          "y": 225,
          "w": 220,
          "h": 35
        },
        {
          "x": 385,
          "y": 225,
          "w": 20,
          "h": 260
        },
        {
          "x": 900,
          "y": 225,
          "w": 20,
          "h": 260
        },
        {
          "x": 390,
          "y": 450,
          "w": 175,
          "h": 35
        },
        {
          "x": 750,
          "y": 450,
          "w": 175,
          "h": 35
        },
        {
          "x": 1085,
          "y": 100,
          "w": 30,
          "h": 450
        },
        {
          "x": 30,
          "y": 655,
          "w": 290,
          "h": 75
        },
        {
          "x": 800,
          "y": 655,
          "w": 450,
          "h": 75
        },
        {
          "x": 320,
          "y": 590,
          "w": 25,
          "h": 140
        },
        {
          "x": 455,
          "y": 590,
          "w": 25,
          "h": 140
        }
      ],
      "objects": [
        {
          "id": "towerUpperDown",
          "name": "返回封印廊",
          "x": 400,
          "y": 650,
          "kind": "campaignObject",
          "role": "portal",
          "height": 0
        },
        {
          "id": "towerUpperNotice",
          "name": "七层留证牌",
          "x": 750,
          "y": 590,
          "kind": "campaignObject",
          "role": "prop",
          "height": 56,
          "atlas": "chapterProps",
          "cell": 12
        },
        {
          "id": "towerUpperMirror",
          "name": "映出异相的铜镜",
          "x": 640,
          "y": 345,
          "kind": "campaignObject",
          "role": "prop",
          "height": 56,
          "atlas": "campaignProps",
          "cell": 0
        },
        {
          "id": "towerUpperLamp",
          "name": "验镜侧灯",
          "x": 350,
          "y": 480,
          "kind": "campaignObject",
          "role": "prop",
          "height": 56,
          "atlas": "campaignProps",
          "cell": 3
        },
        {
          "id": "towerUpperRubbingKit",
          "name": "封缄拓纸卷",
          "x": 260,
          "y": 560,
          "kind": "campaignObject",
          "role": "prop",
          "height": 56,
          "atlas": "chapterProps",
          "cell": 12
        },
        {
          "id": "towerUpperBlood",
          "name": "石壁残缺血字",
          "x": 690,
          "y": 165,
          "kind": "campaignObject",
          "role": "prop",
          "height": 56,
          "atlas": "chapterProps",
          "cell": 7
        },
        {
          "id": "towerUnknownEcho",
          "name": "身份未核的塔中残响",
          "x": 1170,
          "y": 330,
          "kind": "campaignObject",
          "role": "echo",
          "height": 100,
          "artKey": "campaignUnknownEcho"
        },
        {
          "id": "towerTunnelLock",
          "name": "密道铜锁",
          "x": 1150,
          "y": 580,
          "kind": "campaignObject",
          "role": "prop",
          "height": 56,
          "atlas": "campaignProps",
          "cell": 7
        },
        {
          "id": "towerLingyun",
          "name": "凌云子",
          "x": 970,
          "y": 610,
          "kind": "campaignObject",
          "role": "npc",
          "height": 108,
          "personId": "lingyun",
          "atlas": "campaignPeople",
          "cell": 1
        },
        {
          "id": "towerTunnelExit",
          "name": "沿密道回药庐复核",
          "x": 1100,
          "y": 625,
          "kind": "campaignObject",
          "role": "portal",
          "height": 0
        }
      ],
      "sources": [
        {
          "file": "src/lib/story/volume2.ts",
          "line": 815,
          "node": "zhuji_tower_7_entry"
        },
        {
          "file": "src/lib/story/volume2.ts",
          "line": 835,
          "node": "zhuji_tower_7_mirror"
        },
        {
          "file": "src/lib/story/volume2.ts",
          "line": 851,
          "node": "zhuji_tower_7_blood"
        },
        {
          "file": "src/lib/story/volume2.ts",
          "line": 872,
          "node": "zhuji_tower_7_voice"
        },
        {
          "file": "src/lib/story/volume2.ts",
          "line": 894,
          "node": "zhuji_tower"
        },
        {
          "file": "src/lib/story/volume2.ts",
          "line": 919,
          "node": "zhuji_tower_tunnel_1"
        }
      ]
    },
    "apricot-village": {
      "name": "杏花村 · 春雨医庐",
      "sub": "采药、净煎、照护 · 阿杏二十二岁",
      "artKey": "apricot-village",
      "width": 1280,
      "height": 760,
      "entry": {
        "x": 640,
        "y": 650
      },
      "requires": {
        "all": [
          {
            "type": "legacy",
            "id": "adultZhuji"
          },
          {
            "type": "task",
            "id": "tower-review",
            "status": "claimed"
          }
        ],
        "any": []
      },
      "layout": "村口宽路分向西药圃、北医庐与东井台；两块药样田位置不同，病榻在下路旁。",
      "walls": [
        {
          "x": 0,
          "y": 0,
          "w": 1280,
          "h": 60
        },
        {
          "x": 0,
          "y": 730,
          "w": 1280,
          "h": 30
        },
        {
          "x": 0,
          "y": 60,
          "w": 30,
          "h": 670
        },
        {
          "x": 1250,
          "y": 60,
          "w": 30,
          "h": 670
        },
        {
          "x": 70,
          "y": 60,
          "w": 405,
          "h": 215
        },
        {
          "x": 1030,
          "y": 60,
          "w": 220,
          "h": 130
        },
        {
          "x": 855,
          "y": 330,
          "w": 230,
          "h": 95
        },
        {
          "x": 825,
          "y": 350,
          "w": 30,
          "h": 65
        },
        {
          "x": 1085,
          "y": 345,
          "w": 30,
          "h": 70
        },
        {
          "x": 85,
          "y": 445,
          "w": 310,
          "h": 145
        },
        {
          "x": 30,
          "y": 650,
          "w": 500,
          "h": 80
        },
        {
          "x": 780,
          "y": 650,
          "w": 470,
          "h": 80
        }
      ],
      "objects": [
        {
          "id": "apricotReturn",
          "name": "沿山路回药庐",
          "x": 640,
          "y": 680,
          "kind": "campaignObject",
          "role": "portal",
          "height": 0
        },
        {
          "id": "apricotAxing",
          "name": "阿杏 · 采药人",
          "x": 300,
          "y": 335,
          "kind": "campaignObject",
          "role": "npc",
          "height": 108,
          "personId": "axing",
          "atlas": "campaignPeople",
          "cell": 0
        },
        {
          "id": "apricotBench",
          "name": "医庐煎药案",
          "x": 510,
          "y": 320,
          "kind": "campaignObject",
          "role": "prop",
          "height": 56,
          "atlas": "campaignProps",
          "cell": 4
        },
        {
          "id": "apricotWell",
          "name": "净煎取水盘",
          "x": 770,
          "y": 290,
          "kind": "campaignObject",
          "role": "prop",
          "height": 56,
          "atlas": "campaignProps",
          "cell": 1
        },
        {
          "id": "apricotHerbWest",
          "name": "西圃 · 退热药样",
          "x": 180,
          "y": 430,
          "kind": "campaignObject",
          "role": "prop",
          "height": 56,
          "atlas": "props",
          "cell": 4
        },
        {
          "id": "apricotHerbEast",
          "name": "东坡 · 退热药样",
          "x": 460,
          "y": 500,
          "kind": "campaignObject",
          "role": "prop",
          "height": 56,
          "atlas": "props",
          "cell": 4
        },
        {
          "id": "apricotCasebook",
          "name": "行旅病案",
          "x": 570,
          "y": 235,
          "kind": "campaignObject",
          "role": "prop",
          "height": 56,
          "atlas": "chapterProps",
          "cell": 12
        },
        {
          "id": "apricotPatient",
          "name": "待护行旅",
          "x": 650,
          "y": 520,
          "kind": "campaignObject",
          "role": "npc",
          "height": 108,
          "personId": "traveler",
          "atlas": "campaignPeople",
          "cell": 5
        },
        {
          "id": "apricotRestBench",
          "name": "医庐门前长凳",
          "x": 470,
          "y": 620,
          "kind": "campaignObject",
          "role": "prop",
          "height": 56,
          "atlas": "campaignProps",
          "cell": 5
        }
      ],
      "sources": [
        {
          "file": "src/lib/story/branch_mortal.ts",
          "line": 65,
          "node": "mortal_village"
        },
        {
          "file": "src/lib/story/branch_mortal.ts",
          "line": 108,
          "node": "female_common_axing_jinlan"
        },
        {
          "file": "src/lib/story/branch_mortal.ts",
          "line": 615,
          "node": "mortal_herb_manual_gate"
        }
      ]
    },
    "jindan-retreat": {
      "name": "后山 · 洞府渡劫坪",
      "sub": "整备、护心、三段凝丹",
      "artKey": "jindan-retreat",
      "width": 1280,
      "height": 760,
      "entry": {
        "x": 640,
        "y": 650
      },
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "m2-handoff",
            "status": "claimed"
          }
        ],
        "any": []
      },
      "walls": [
        {
          "x": 0,
          "y": 0,
          "w": 1280,
          "h": 100
        },
        {
          "x": 0,
          "y": 100,
          "w": 35,
          "h": 630
        },
        {
          "x": 1245,
          "y": 100,
          "w": 35,
          "h": 630
        },
        {
          "x": 0,
          "y": 730,
          "w": 1280,
          "h": 30
        },
        {
          "x": 95,
          "y": 165,
          "w": 235,
          "h": 85
        },
        {
          "x": 1000,
          "y": 500,
          "w": 190,
          "h": 65
        },
        {
          "x": 0,
          "y": 100,
          "w": 85,
          "h": 130
        },
        {
          "x": 0,
          "y": 315,
          "w": 65,
          "h": 200
        },
        {
          "x": 0,
          "y": 595,
          "w": 115,
          "h": 165
        },
        {
          "x": 115,
          "y": 650,
          "w": 350,
          "h": 110
        },
        {
          "x": 1020,
          "y": 645,
          "w": 260,
          "h": 115
        },
        {
          "x": 1195,
          "y": 400,
          "w": 85,
          "h": 245
        }
      ],
      "objects": [
        {
          "id": "retreatReturn",
          "name": "返回药庐整备",
          "x": 640,
          "y": 665,
          "kind": "campaignObject",
          "role": "portal",
          "atlas": null,
          "cell": null,
          "height": 0,
          "sinceRevision": 2
        },
        {
          "id": "retreatPavilionGate",
          "name": "赴天机阁",
          "x": 1130,
          "y": 200,
          "kind": "campaignObject",
          "role": "portal",
          "atlas": null,
          "cell": null,
          "height": 0,
          "sinceRevision": 2
        },
        {
          "id": "retreatSouthGate",
          "name": "赴南疆秘境",
          "x": 1120,
          "y": 455,
          "kind": "campaignObject",
          "role": "portal",
          "atlas": null,
          "cell": null,
          "height": 0,
          "sinceRevision": 2
        },
        {
          "id": "retreatCore",
          "name": "洞府凝丹石",
          "x": 640,
          "y": 145,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "jindanPropsA",
          "cell": 1,
          "height": 60,
          "sinceRevision": 2
        },
        {
          "id": "retreatGroundRod",
          "name": "导雷铜杆",
          "x": 400,
          "y": 300,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "jindanPropsA",
          "cell": 0,
          "height": 60,
          "sinceRevision": 2
        },
        {
          "id": "retreatHeartStone",
          "name": "守心石座",
          "x": 640,
          "y": 265,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "jindanPropsA",
          "cell": 1,
          "height": 60,
          "sinceRevision": 2
        },
        {
          "id": "retreatCoreStand",
          "name": "收束雷息石座",
          "x": 880,
          "y": 300,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "jindanPropsA",
          "cell": 1,
          "height": 60,
          "sinceRevision": 2
        },
        {
          "id": "retreatQingwei",
          "name": "清微",
          "x": 190,
          "y": 365,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "chapterPeople",
          "cell": 3,
          "height": 110,
          "sinceRevision": 2,
          "personId": "qingwei"
        },
        {
          "id": "retreatLingyun",
          "name": "凌云子",
          "x": 1080,
          "y": 355,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "campaignPeople",
          "cell": 1,
          "height": 110,
          "sinceRevision": 2,
          "personId": "lingyun"
        },
        {
          "id": "retreatShen",
          "name": "沈灵薇",
          "x": 270,
          "y": 575,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "characters",
          "cell": 8,
          "height": 110,
          "sinceRevision": 2,
          "personId": "shen"
        },
        {
          "id": "retreatPrepareDesk",
          "name": "后山整备案",
          "x": 1010,
          "y": 485,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "campaignProps",
          "cell": 4,
          "height": 60,
          "sinceRevision": 2
        },
        {
          "id": "retreatNotes",
          "name": "本门修行手记",
          "x": 900,
          "y": 175,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "jindanPropsA",
          "cell": 2,
          "height": 60,
          "sinceRevision": 2
        },
        {
          "id": "retreatRest",
          "name": "段间休整蒲团",
          "x": 345,
          "y": 195,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "chapterProps",
          "cell": 17,
          "height": 60,
          "sinceRevision": 2
        }
      ],
      "sources": [
        {
          "file": "src/lib/story/volume3.ts",
          "line": 18,
          "node": "jindan_seed"
        },
        {
          "file": "src/lib/story/volume3.ts",
          "line": 284,
          "node": "jindan_thunder_1"
        }
      ],
      "artAudit": {
        "file": "assets/art-v150/jindan-retreat.webp",
        "method": "原画逐图目视校准矩形脚部障碍；地面台阶不扩大成墙",
        "date": "2026-11-13"
      }
    },
    "tianji-pavilion": {
      "name": "天机阁 · 议棋厅",
      "sub": "查卷、听言、自定去留",
      "artKey": "tianji-pavilion",
      "width": 1280,
      "height": 760,
      "entry": {
        "x": 640,
        "y": 650
      },
      "requires": {
        "all": [
          {
            "type": "realm",
            "id": "jindan"
          },
          {
            "type": "task",
            "id": "jindan-tribulation",
            "status": "claimed"
          }
        ],
        "any": []
      },
      "walls": [
        {
          "x": 0,
          "y": 0,
          "w": 1280,
          "h": 100
        },
        {
          "x": 0,
          "y": 100,
          "w": 35,
          "h": 630
        },
        {
          "x": 1245,
          "y": 100,
          "w": 35,
          "h": 630
        },
        {
          "x": 0,
          "y": 730,
          "w": 1280,
          "h": 30
        },
        {
          "x": 50,
          "y": 165,
          "w": 70,
          "h": 310
        },
        {
          "x": 1163,
          "y": 165,
          "w": 70,
          "h": 310
        },
        {
          "x": 615,
          "y": 235,
          "w": 155,
          "h": 125
        }
      ],
      "objects": [
        {
          "id": "pavilionReturn",
          "name": "返回后山",
          "x": 640,
          "y": 665,
          "kind": "campaignObject",
          "role": "portal",
          "atlas": null,
          "cell": null,
          "height": 0,
          "sinceRevision": 2
        },
        {
          "id": "pavilionXuanji",
          "name": "玄玑子",
          "x": 740,
          "y": 205,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "jindanPeopleA",
          "cell": 0,
          "height": 110,
          "sinceRevision": 2,
          "personId": "xuanji"
        },
        {
          "id": "pavilionChess",
          "name": "议棋案",
          "x": 695,
          "y": 395,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "campaignProps",
          "cell": null,
          "height": 60,
          "sinceRevision": 2
        },
        {
          "id": "pavilionOffer",
          "name": "副堂主金令函",
          "x": 925,
          "y": 265,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "jindanPropsA",
          "cell": 4,
          "height": 60,
          "sinceRevision": 2
        },
        {
          "id": "pavilionInvite",
          "name": "天机阁请帖",
          "x": 260,
          "y": 255,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "jindanPropsA",
          "cell": 3,
          "height": 60,
          "sinceRevision": 2
        },
        {
          "id": "pavilionArchive",
          "name": "旧矿卷目录",
          "x": 285,
          "y": 515,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "jindanPropsA",
          "cell": 2,
          "height": 60,
          "sinceRevision": 2
        },
        {
          "id": "pavilionLingyun",
          "name": "凌云子",
          "x": 970,
          "y": 535,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "campaignPeople",
          "cell": 1,
          "height": 110,
          "sinceRevision": 2,
          "personId": "lingyun"
        },
        {
          "id": "pavilionShen",
          "name": "沈灵薇",
          "x": 390,
          "y": 560,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "characters",
          "cell": 8,
          "height": 110,
          "sinceRevision": 2,
          "personId": "shen"
        },
        {
          "id": "pavilionDeparture",
          "name": "南疆备战清单",
          "x": 650,
          "y": 550,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "jindanPropsA",
          "cell": 2,
          "height": 60,
          "sinceRevision": 2
        }
      ],
      "sources": [
        {
          "file": "src/lib/story/volume3.ts",
          "line": 420,
          "node": "jindan_tianji_pavilion"
        },
        {
          "file": "src/lib/story/volume3.ts",
          "line": 463,
          "node": "jindan_xuanji_offer_detail"
        }
      ],
      "artAudit": {
        "file": "assets/art-v150/tianji-pavilion.webp",
        "method": "原画逐图目视校准矩形脚部障碍；地面台阶不扩大成墙",
        "date": "2026-11-13"
      }
    },
    "wanyao-outer": {
      "name": "万妖秘境 · 外境焦土",
      "sub": "护住同门，再决定有限运力投向",
      "artKey": "wanyao-outer",
      "width": 1280,
      "height": 760,
      "entry": {
        "x": 640,
        "y": 650
      },
      "requires": {
        "all": [
          {
            "type": "realm",
            "id": "jindan"
          },
          {
            "type": "task",
            "id": "wanyao-assembly",
            "status": "claimed"
          }
        ],
        "any": []
      },
      "walls": [
        {
          "x": 0,
          "y": 0,
          "w": 1280,
          "h": 100
        },
        {
          "x": 0,
          "y": 100,
          "w": 35,
          "h": 630
        },
        {
          "x": 1245,
          "y": 100,
          "w": 35,
          "h": 630
        },
        {
          "x": 0,
          "y": 730,
          "w": 1280,
          "h": 30
        },
        {
          "x": 150,
          "y": 150,
          "w": 180,
          "h": 65
        },
        {
          "x": 1060,
          "y": 480,
          "w": 200,
          "h": 105
        },
        {
          "x": 55,
          "y": 550,
          "w": 110,
          "h": 65
        }
      ],
      "objects": [
        {
          "id": "outerReturn",
          "name": "循界隙回后山",
          "x": 640,
          "y": 665,
          "kind": "campaignObject",
          "role": "portal",
          "atlas": null,
          "cell": null,
          "height": 0,
          "sinceRevision": 2
        },
        {
          "id": "outerInnerGate",
          "name": "往黑玉碑内境",
          "x": 1060,
          "y": 145,
          "kind": "campaignObject",
          "role": "portal",
          "atlas": null,
          "cell": null,
          "height": 0,
          "sinceRevision": 2
        },
        {
          "id": "suyeRubble",
          "name": "苏叶 · 碎石下的女医",
          "x": 245,
          "y": 280,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "jindanPeopleA",
          "cell": 3,
          "height": 110,
          "sinceRevision": 2,
          "personId": "suye"
        },
        {
          "id": "outerShen",
          "name": "沈灵薇 · 护住同门",
          "x": 470,
          "y": 285,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "characters",
          "cell": 8,
          "height": 110,
          "sinceRevision": 2,
          "personId": "shen"
        },
        {
          "id": "outerLingyun",
          "name": "凌云子",
          "x": 270,
          "y": 430,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "campaignPeople",
          "cell": 1,
          "height": 110,
          "sinceRevision": 2,
          "personId": "lingyun"
        },
        {
          "id": "outerWounded",
          "name": "伤员集合处",
          "x": 420,
          "y": 540,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "jindanPropsA",
          "cell": 5,
          "height": 60,
          "sinceRevision": 2
        },
        {
          "id": "outerZhou",
          "name": "周正",
          "x": 710,
          "y": 555,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "jindanPeopleB",
          "cell": 2,
          "height": 110,
          "sinceRevision": 2,
          "personId": "zhouzheng"
        },
        {
          "id": "outerDispatch",
          "name": "有限运力调度案",
          "x": 635,
          "y": 380,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "campaignProps",
          "cell": 4,
          "height": 60,
          "sinceRevision": 2
        },
        {
          "id": "outerWitnessLedger",
          "name": "待抢救的签押证卷",
          "x": 1000,
          "y": 275,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "jindanPropsA",
          "cell": 2,
          "height": 60,
          "sinceRevision": 2
        },
        {
          "id": "outerSupplyCart",
          "name": "可抢救的符药箱",
          "x": 1020,
          "y": 610,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "props",
          "cell": 5,
          "height": 60,
          "sinceRevision": 2
        },
        {
          "id": "outerMedicalKit",
          "name": "定额止血与接应包",
          "x": 390,
          "y": 625,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "jindanPropsA",
          "cell": 7,
          "height": 60,
          "sinceRevision": 2
        },
        {
          "id": "outerYuantong",
          "name": "圆通",
          "x": 170,
          "y": 440,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "jindanPeopleB",
          "cell": 0,
          "height": 110,
          "sinceRevision": 2,
          "personId": "yuantong"
        },
        {
          "id": "outerLiuruyan",
          "name": "柳如烟",
          "x": 1080,
          "y": 370,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "jindanPeopleB",
          "cell": 1,
          "height": 110,
          "sinceRevision": 2,
          "personId": "liuruyan"
        }
      ],
      "sources": [
        {
          "file": "src/lib/story/volume3.ts",
          "line": 572,
          "node": "jindan_well_accident"
        },
        {
          "file": "src/lib/story/volume3.ts",
          "line": 136,
          "node": "jindan_secret_realm_rescue"
        },
        {
          "file": "src/lib/story/volume3.ts",
          "line": 974,
          "node": "jindan_mid_save_suye"
        }
      ],
      "artAudit": {
        "file": "assets/art-v150/wanyao-outer.webp",
        "method": "原画逐图目视校准矩形脚部障碍；地面台阶不扩大成墙",
        "date": "2026-11-13"
      }
    },
    "wanyao-inner": {
      "name": "万妖秘境 · 黑玉碑内境",
      "sub": "血祭遗痕、亲缘核验与青霞截路",
      "artKey": "wanyao-inner",
      "width": 1280,
      "height": 760,
      "entry": {
        "x": 640,
        "y": 650
      },
      "requires": {
        "all": [
          {
            "type": "realm",
            "id": "jindan"
          },
          {
            "type": "task",
            "id": "wanyao-rescue",
            "status": "claimed"
          }
        ],
        "any": []
      },
      "walls": [
        {
          "x": 0,
          "y": 0,
          "w": 1280,
          "h": 100
        },
        {
          "x": 0,
          "y": 100,
          "w": 35,
          "h": 630
        },
        {
          "x": 1245,
          "y": 100,
          "w": 35,
          "h": 630
        },
        {
          "x": 0,
          "y": 730,
          "w": 1280,
          "h": 30
        },
        {
          "x": 565,
          "y": 220,
          "w": 170,
          "h": 60
        },
        {
          "x": 205,
          "y": 210,
          "w": 190,
          "h": 90
        },
        {
          "x": 1035,
          "y": 125,
          "w": 145,
          "h": 95
        },
        {
          "x": 0,
          "y": 100,
          "w": 70,
          "h": 490
        },
        {
          "x": 0,
          "y": 590,
          "w": 180,
          "h": 170
        },
        {
          "x": 180,
          "y": 650,
          "w": 330,
          "h": 110
        },
        {
          "x": 790,
          "y": 675,
          "w": 490,
          "h": 85
        },
        {
          "x": 1060,
          "y": 610,
          "w": 220,
          "h": 65
        },
        {
          "x": 1210,
          "y": 220,
          "w": 70,
          "h": 390
        }
      ],
      "objects": [
        {
          "id": "innerReturn",
          "name": "撤回外境营地",
          "x": 640,
          "y": 665,
          "kind": "campaignObject",
          "role": "portal",
          "atlas": null,
          "cell": null,
          "height": 0,
          "sinceRevision": 2
        },
        {
          "id": "innerTablet",
          "name": "黑玉碑八字",
          "x": 650,
          "y": 310,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "jindanPropsB",
          "cell": null,
          "height": 60,
          "sinceRevision": 2
        },
        {
          "id": "innerAltar",
          "name": "血祭坛遗痕",
          "x": 295,
          "y": 330,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "campaignProps",
          "cell": null,
          "height": 60,
          "sinceRevision": 2
        },
        {
          "id": "innerCaptivePosts",
          "name": "困住伤者的血线柱",
          "x": 170,
          "y": 405,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "campaignProps",
          "cell": 6,
          "height": 60,
          "sinceRevision": 2
        },
        {
          "id": "innerSealTool",
          "name": "断血线工具",
          "x": 405,
          "y": 255,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "campaignProps",
          "cell": 7,
          "height": 60,
          "sinceRevision": 2
        },
        {
          "id": "innerLinqingfeng",
          "name": "林清风",
          "x": 1000,
          "y": 300,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "jindanPeopleB",
          "cell": 3,
          "height": 110,
          "sinceRevision": 2,
          "personId": "linqingfeng"
        },
        {
          "id": "innerAntidote",
          "name": "待核的中和药样",
          "x": 950,
          "y": 385,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "jindanPropsB",
          "cell": 5,
          "height": 60,
          "sinceRevision": 2
        },
        {
          "id": "innerQingxia",
          "name": "青霞",
          "x": 700,
          "y": 500,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "jindanPeopleA",
          "cell": 1,
          "height": 110,
          "sinceRevision": 2,
          "personId": "qingxia"
        },
        {
          "id": "innerSoulBanner",
          "name": "青霞的万魂幡",
          "x": 990,
          "y": 490,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "jindanPropsB",
          "cell": 4,
          "height": 60,
          "sinceRevision": 2
        },
        {
          "id": "innerLingyulang",
          "name": "凌玉琅",
          "x": 840,
          "y": 205,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "jindanPeopleA",
          "cell": 2,
          "height": 110,
          "sinceRevision": 2,
          "personId": "lingyulang"
        },
        {
          "id": "innerLockCheck",
          "name": "两半铜锁核对处",
          "x": 770,
          "y": 290,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "jindanPropsB",
          "cell": 2,
          "height": 60,
          "sinceRevision": 2
        },
        {
          "id": "innerArchive",
          "name": "黑令与矿账交接",
          "x": 835,
          "y": 360,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "jindanPropsB",
          "cell": 0,
          "height": 60,
          "sinceRevision": 2
        },
        {
          "id": "innerKeyTraces",
          "name": "仙魔两系碑纹",
          "x": 480,
          "y": 340,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "jindanPropsB",
          "cell": 3,
          "height": 60,
          "sinceRevision": 2
        }
      ],
      "sources": [
        {
          "file": "src/lib/story/volume3.ts",
          "line": 986,
          "node": "jindan_mid_altar"
        },
        {
          "file": "src/lib/story/volume3.ts",
          "line": 710,
          "node": "jindan_stone_tablet"
        },
        {
          "file": "src/lib/story/volume3.ts",
          "line": 1009,
          "node": "jindan_uncle_half_lock"
        },
        {
          "file": "src/lib/story/volume3.ts",
          "line": 1048,
          "node": "jindan_qingxia_30"
        }
      ],
      "artAudit": {
        "file": "assets/art-v150/wanyao-inner.webp",
        "method": "原画逐图目视校准矩形脚部障碍；地面台阶不扩大成墙",
        "date": "2026-11-13"
      }
    }
  },
  "entryObjects": [
    {
      "map": "garden",
      "id": "qingwei",
      "name": "清微",
      "x": 1080,
      "y": 160,
      "kind": "campaignObject",
      "role": "npc",
      "height": 108,
      "personId": "qingwei",
      "artKey": "qingwei",
      "reuseExisting": true
    },
    {
      "map": "garden",
      "id": "campaignTowerGate",
      "name": "往锁妖塔当值",
      "x": 1180,
      "y": 210,
      "kind": "campaignObject",
      "role": "portal",
      "height": 0
    },
    {
      "map": "garden",
      "id": "campaignVillageGate",
      "name": "往杏花村医庐",
      "x": 180,
      "y": 640,
      "kind": "campaignObject",
      "role": "portal",
      "height": 0
    },
    {
      "map": "garden",
      "id": "campaignRetreatGate",
      "name": "往后山闭关坪",
      "x": 1180,
      "y": 500,
      "kind": "campaignObject",
      "role": "portal",
      "atlas": null,
      "cell": null,
      "height": 0,
      "sinceRevision": 2
    }
  ],
  "exits": {
    "enter-tower": {
      "id": "enter-tower",
      "map": "garden",
      "objectId": "campaignTowerGate",
      "to": {
        "map": "tower-duty",
        "x": 640,
        "y": 650
      },
      "requires": {
        "all": [
          {
            "type": "legacy",
            "id": "chapterComplete"
          },
          {
            "type": "legacy",
            "id": "adultZhuji"
          },
          {
            "type": "token",
            "id": "duty-mirror"
          }
        ],
        "any": []
      }
    },
    "duty-return": {
      "id": "duty-return",
      "map": "tower-duty",
      "objectId": "towerDutyReturn",
      "to": {
        "map": "garden",
        "x": 1180,
        "y": 210
      },
      "requires": {
        "all": [],
        "any": []
      }
    },
    "duty-up": {
      "id": "duty-up",
      "map": "tower-duty",
      "objectId": "towerDutyUp",
      "to": {
        "map": "tower-seal",
        "x": 250,
        "y": 620
      },
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "tower-duty",
            "status": "claimed"
          }
        ],
        "any": []
      }
    },
    "seal-down": {
      "id": "seal-down",
      "map": "tower-seal",
      "objectId": "towerSealDown",
      "to": {
        "map": "tower-duty",
        "x": 640,
        "y": 190
      },
      "requires": {
        "all": [],
        "any": []
      }
    },
    "seal-up": {
      "id": "seal-up",
      "map": "tower-seal",
      "objectId": "towerSealUp",
      "to": {
        "map": "tower-upper",
        "x": 640,
        "y": 640
      },
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "tower-seal",
            "status": "claimed"
          }
        ],
        "any": []
      }
    },
    "upper-down": {
      "id": "upper-down",
      "map": "tower-upper",
      "objectId": "towerUpperDown",
      "to": {
        "map": "tower-seal",
        "x": 1100,
        "y": 205
      },
      "requires": {
        "all": [],
        "any": []
      }
    },
    "tunnel-return": {
      "id": "tunnel-return",
      "map": "tower-upper",
      "objectId": "towerTunnelExit",
      "to": {
        "map": "garden",
        "x": 1080,
        "y": 250
      },
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "tower-trace",
            "status": "claimed"
          }
        ],
        "any": []
      }
    },
    "enter-apricot": {
      "id": "enter-apricot",
      "map": "garden",
      "objectId": "campaignVillageGate",
      "to": {
        "map": "apricot-village",
        "x": 640,
        "y": 650
      },
      "requires": {
        "all": [
          {
            "type": "legacy",
            "id": "adultZhuji"
          },
          {
            "type": "task",
            "id": "tower-review",
            "status": "claimed"
          }
        ],
        "any": []
      }
    },
    "apricot-return": {
      "id": "apricot-return",
      "map": "apricot-village",
      "objectId": "apricotReturn",
      "to": {
        "map": "garden",
        "x": 210,
        "y": 600
      },
      "requires": {
        "all": [],
        "any": []
      }
    },
    "enter-jindan-retreat": {
      "id": "enter-jindan-retreat",
      "map": "garden",
      "objectId": "campaignRetreatGate",
      "to": {
        "map": "jindan-retreat",
        "x": 640,
        "y": 650
      },
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "m2-handoff",
            "status": "claimed"
          }
        ],
        "any": []
      },
      "sinceRevision": 2
    },
    "retreat-return": {
      "id": "retreat-return",
      "map": "jindan-retreat",
      "objectId": "retreatReturn",
      "to": {
        "map": "garden",
        "x": 1180,
        "y": 500
      },
      "requires": {
        "all": [],
        "any": []
      },
      "sinceRevision": 2
    },
    "enter-tianji": {
      "id": "enter-tianji",
      "map": "jindan-retreat",
      "objectId": "retreatPavilionGate",
      "to": {
        "map": "tianji-pavilion",
        "x": 640,
        "y": 650
      },
      "requires": {
        "all": [
          {
            "type": "realm",
            "id": "jindan"
          }
        ],
        "any": []
      },
      "sinceRevision": 2
    },
    "tianji-return": {
      "id": "tianji-return",
      "map": "tianji-pavilion",
      "objectId": "pavilionReturn",
      "to": {
        "map": "jindan-retreat",
        "x": 1130,
        "y": 200
      },
      "requires": {
        "all": [],
        "any": []
      },
      "sinceRevision": 2
    },
    "enter-wanyao": {
      "id": "enter-wanyao",
      "map": "jindan-retreat",
      "objectId": "retreatSouthGate",
      "to": {
        "map": "wanyao-outer",
        "x": 640,
        "y": 650
      },
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "wanyao-assembly",
            "status": "claimed"
          }
        ],
        "any": []
      },
      "sinceRevision": 2
    },
    "outer-return": {
      "id": "outer-return",
      "map": "wanyao-outer",
      "objectId": "outerReturn",
      "to": {
        "map": "jindan-retreat",
        "x": 1120,
        "y": 455
      },
      "requires": {
        "all": [],
        "any": []
      },
      "sinceRevision": 2
    },
    "outer-inner": {
      "id": "outer-inner",
      "map": "wanyao-outer",
      "objectId": "outerInnerGate",
      "to": {
        "map": "wanyao-inner",
        "x": 640,
        "y": 650
      },
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "wanyao-rescue",
            "status": "claimed"
          }
        ],
        "any": []
      },
      "sinceRevision": 2
    },
    "inner-outer": {
      "id": "inner-outer",
      "map": "wanyao-inner",
      "objectId": "innerReturn",
      "to": {
        "map": "wanyao-outer",
        "x": 1060,
        "y": 190
      },
      "requires": {
        "all": [],
        "any": []
      },
      "sinceRevision": 2
    }
  },
  "tasks": {
    "tower-duty": {
      "id": "tower-duty",
      "title": "值夜先问其声",
      "summary": "领铜镜，按廊添符水，分别记录老狐与熊妖能亲证的往事。",
      "requires": {
        "all": [
          {
            "type": "legacy",
            "id": "chapterComplete"
          },
          {
            "type": "legacy",
            "id": "adultZhuji"
          }
        ],
        "any": []
      },
      "objectives": [
        "water-issued",
        "west-water",
        "east-water",
        "north-water",
        "fox-heard",
        "bear-heard",
        "duty-recorded"
      ],
      "sequence": [],
      "choices": [],
      "sources": [
        {
          "file": "src/lib/story/volume2.ts",
          "line": 732,
          "node": "zhuji_tower_duty_start"
        },
        {
          "file": "src/lib/story/volume2.ts",
          "line": 747,
          "node": "zhuji_tower_night1"
        },
        {
          "file": "src/lib/story/volume2.ts",
          "line": 763,
          "node": "zhuji_tower_night2"
        }
      ],
      "volumeLabel": "筑基卷"
    },
    "tower-seal": {
      "id": "tower-seal",
      "title": "裂纹从何而来",
      "summary": "先辨裂纹，再选复封守阵或依证静行；已历身世委托与本门试炼可提供不同查验方法。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "tower-duty",
            "status": "claimed"
          }
        ],
        "any": []
      },
      "objectives": [
        "fracture-read",
        "route-chosen",
        "clay-taken",
        "seal-set",
        "rift-held",
        "bypass-west",
        "bypass-east",
        "bypass-standard",
        "bypass-rain",
        "bypass-poor",
        "bypass-beggar",
        "bypass-caravan",
        "bypass-demon",
        "bypass-sword",
        "bypass-medicine",
        "bypass-scholar",
        "bypass-traced",
        "bypass-held",
        "seal-resolved"
      ],
      "requiredObjectives": [
        "fracture-read",
        "seal-resolved"
      ],
      "sequence": [
        "seal-west",
        "seal-middle",
        "seal-east"
      ],
      "choices": [
        "repair",
        "bypass"
      ],
      "sources": [
        {
          "file": "src/lib/story/volume2.ts",
          "line": 779,
          "node": "zhuji_tower_night3"
        },
        {
          "file": "src/lib/story/volume2.ts",
          "line": 795,
          "node": "zhuji_tower_night4"
        }
      ],
      "volumeLabel": "筑基卷"
    },
    "tower-trace": {
      "id": "tower-trace",
      "title": "镜室留证",
      "summary": "验镜辨伪、拓录残字，拒绝以魂换言，再从凌云子处核对密道见闻。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "tower-seal",
            "status": "claimed"
          }
        ],
        "any": []
      },
      "objectives": [
        "paper-taken",
        "mirror-verified",
        "blood-copied",
        "voice-bounded",
        "tunnel-found",
        "lingyun-heard"
      ],
      "sequence": [
        "mirror-edge",
        "mirror-light",
        "mirror-present"
      ],
      "choices": [
        "refuse",
        "record"
      ],
      "sources": [
        {
          "file": "src/lib/story/volume2.ts",
          "line": 835,
          "node": "zhuji_tower_7_mirror"
        },
        {
          "file": "src/lib/story/volume2.ts",
          "line": 851,
          "node": "zhuji_tower_7_blood"
        },
        {
          "file": "src/lib/story/volume2.ts",
          "line": 872,
          "node": "zhuji_tower_7_voice"
        },
        {
          "file": "src/lib/story/volume2.ts",
          "line": 894,
          "node": "zhuji_tower"
        },
        {
          "file": "src/lib/story/volume2.ts",
          "line": 919,
          "node": "zhuji_tower_tunnel_1"
        }
      ],
      "volumeLabel": "筑基卷"
    },
    "tower-review": {
      "id": "tower-review",
      "title": "回山复核案卷",
      "summary": "将证人所见、封印痕迹、血字与密道口述分开呈交清微；未证实之处仍留疑。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "tower-trace",
            "status": "claimed"
          }
        ],
        "any": []
      },
      "objectives": [
        "review-recorded"
      ],
      "sequence": [],
      "choices": [],
      "sources": [
        {
          "file": "src/lib/story/volume2.ts",
          "line": 959,
          "node": "zhuji_tower_back"
        },
        {
          "file": "src/lib/story/volume2.ts",
          "line": 1008,
          "node": "zhuji_back_debrief"
        }
      ],
      "volumeLabel": "筑基卷"
    },
    "apricot-aid": {
      "id": "apricot-aid",
      "title": "春雨一碗药",
      "summary": "与二十二岁的阿杏辨药、采样、净煎，为发热的行旅送药；朋友与亲近均可共同救人。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "tower-review",
            "status": "claimed"
          },
          {
            "type": "legacy",
            "id": "adultZhuji"
          }
        ],
        "any": []
      },
      "objectives": [
        "case-read",
        "west-sample",
        "east-sample",
        "water-drawn",
        "medicine-brewed",
        "care-delivered",
        "bond-defined"
      ],
      "sequence": [
        "apricot-crush",
        "apricot-soak",
        "apricot-simmer"
      ],
      "choices": [
        "friend",
        "close"
      ],
      "optional": true,
      "sources": [
        {
          "file": "src/lib/story/branch_mortal.ts",
          "line": 65,
          "node": "mortal_village"
        },
        {
          "file": "src/lib/story/branch_mortal.ts",
          "line": 108,
          "node": "female_common_axing_jinlan"
        },
        {
          "file": "src/lib/story/branch_mortal.ts",
          "line": 615,
          "node": "mortal_herb_manual_gate"
        }
      ],
      "volumeLabel": "筑基卷"
    },
    "m2-handoff": {
      "id": "m2-handoff",
      "title": "向金丹问路",
      "summary": "清微收妥复核案卷，列出后续结丹准备；这不是已经突破金丹。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "tower-review",
            "status": "claimed"
          }
        ],
        "any": []
      },
      "objectives": [
        "next-plan-read"
      ],
      "sequence": [],
      "choices": [],
      "sources": [
        {
          "file": "src/lib/story/volume2.ts",
          "line": 1008,
          "node": "zhuji_back_debrief"
        }
      ],
      "volumeLabel": "筑基卷"
    },
    "jindan-preparation": {
      "id": "jindan-preparation",
      "title": "闭关前先整备",
      "summary": "查洞府、布导雷与稳息准备，选择本次修行侧重。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "m2-handoff",
            "status": "claimed"
          }
        ],
        "any": []
      },
      "objectives": [
        "notes-read",
        "kit-taken",
        "grounded",
        "focus-chosen"
      ],
      "sequence": [],
      "choices": [
        "steady",
        "sword",
        "medicine",
        "scholar"
      ],
      "sinceRevision": 2,
      "volumeLabel": "金丹卷",
      "combatModifiers": {
        "steady": {
          "defence": 0.02
        },
        "sword": {
          "blade": 4
        },
        "medicine": {
          "regen": 0.6
        },
        "scholar": {
          "spell": 0.08
        }
      },
      "sources": [
        {
          "file": "src/lib/story/volume3.ts",
          "line": 18,
          "node": "jindan_seed"
        }
      ]
    },
    "jindan-tribulation": {
      "id": "jindan-tribulation",
      "title": "三段凝丹劫",
      "summary": "前雷、心魔与凝丹三段实战；段间可回药庐整备，失败只重试本段。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "jindan-preparation",
            "status": "claimed"
          }
        ],
        "any": []
      },
      "objectives": [
        "thunder-first",
        "heart-settled",
        "heart-trial",
        "core-stable",
        "breath-stable"
      ],
      "sequence": [],
      "choices": [],
      "sinceRevision": 2,
      "volumeLabel": "金丹卷",
      "trial": true,
      "sources": [
        {
          "file": "src/lib/story/volume3.ts",
          "line": 284,
          "node": "jindan_thunder_1"
        },
        {
          "file": "src/lib/story/volume3.ts",
          "line": 320,
          "node": "jindan_thunder_4"
        },
        {
          "file": "src/lib/story/volume3.ts",
          "line": 337,
          "node": "jindan_thunder_5"
        }
      ]
    },
    "tianji-negotiation": {
      "id": "tianji-negotiation",
      "title": "天机阁的金令",
      "summary": "核请帖与旧卷，听清条件后决定如何拒绝或暂不受职。",
      "requires": {
        "all": [
          {
            "type": "realm",
            "id": "jindan"
          },
          {
            "type": "task",
            "id": "jindan-tribulation",
            "status": "claimed"
          }
        ],
        "any": []
      },
      "objectives": [
        "invite-read",
        "archive-read",
        "offer-heard",
        "offer-decided"
      ],
      "sequence": [],
      "choices": [
        "refuse",
        "defer"
      ],
      "sinceRevision": 2,
      "volumeLabel": "金丹卷",
      "sources": [
        {
          "file": "src/lib/story/volume3.ts",
          "line": 420,
          "node": "jindan_tianji_pavilion"
        },
        {
          "file": "src/lib/story/volume3.ts",
          "line": 463,
          "node": "jindan_xuanji_offer_detail"
        }
      ]
    },
    "wanyao-assembly": {
      "id": "wanyao-assembly",
      "title": "南疆行前点名",
      "summary": "交代井口风险、领取有限接应工具，再去秘境。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "tianji-negotiation",
            "status": "claimed"
          }
        ],
        "any": []
      },
      "objectives": [
        "route-read",
        "companions-briefed",
        "tools-received"
      ],
      "sequence": [],
      "choices": [],
      "sinceRevision": 2,
      "volumeLabel": "金丹卷",
      "sources": [
        {
          "file": "src/lib/story/volume3.ts",
          "line": 523,
          "node": "jindan_prep_detail_2"
        },
        {
          "file": "src/lib/story/volume3.ts",
          "line": 572,
          "node": "jindan_well_accident"
        }
      ]
    },
    "wanyao-rescue": {
      "id": "wanyao-rescue",
      "title": "有限的一趟接应",
      "summary": "先打退追击并稳住伤者，再把仅有的一趟担架投向人、证卷或符药。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "wanyao-assembly",
            "status": "claimed"
          }
        ],
        "any": []
      },
      "objectives": [
        "outer-held",
        "shen-safe",
        "suye-stabilized",
        "priority-chosen",
        "suye-escorted",
        "docket-carried",
        "supplies-carried",
        "priority-delivered"
      ],
      "sequence": [],
      "choices": [
        "rescue",
        "evidence",
        "supplies"
      ],
      "sinceRevision": 2,
      "volumeLabel": "金丹卷",
      "requiredObjectives": [
        "outer-held",
        "shen-safe",
        "suye-stabilized",
        "priority-delivered"
      ],
      "sources": [
        {
          "file": "src/lib/story/volume3.ts",
          "line": 136,
          "node": "jindan_secret_realm_rescue"
        },
        {
          "file": "src/lib/story/volume3.ts",
          "line": 974,
          "node": "jindan_mid_save_suye"
        }
      ]
    },
    "wanyao-trace": {
      "id": "wanyao-trace",
      "title": "矿案与两半铜锁",
      "summary": "实际查坛、断线、听林清风、拓碑、验锁，区分物证与舅舅口述。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "wanyao-rescue",
            "status": "claimed"
          }
        ],
        "any": []
      },
      "objectives": [
        "altar-read",
        "captives-freed",
        "lin-heard",
        "tablet-copied",
        "lock-compared",
        "archive-received",
        "dual-traces-checked"
      ],
      "sequence": [],
      "choices": [],
      "sinceRevision": 2,
      "volumeLabel": "金丹卷",
      "sources": [
        {
          "file": "src/lib/story/volume3.ts",
          "line": 986,
          "node": "jindan_mid_altar"
        },
        {
          "file": "src/lib/story/volume3.ts",
          "line": 996,
          "node": "jindan_neiyu_linqingfeng"
        },
        {
          "file": "src/lib/story/volume3.ts",
          "line": 710,
          "node": "jindan_stone_tablet"
        },
        {
          "file": "src/lib/story/volume3.ts",
          "line": 1009,
          "node": "jindan_uncle_half_lock"
        },
        {
          "file": "src/lib/story/volume3.ts",
          "line": 1022,
          "node": "jindan_uncle_tianhen"
        }
      ]
    },
    "wanyao-breakout": {
      "id": "wanyao-breakout",
      "title": "青霞截路",
      "summary": "用真实医注核配中和药样，或选择正面护证突围；安全后亲自完成接人。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "wanyao-trace",
            "status": "claimed"
          }
        ],
        "any": []
      },
      "objectives": [
        "method-chosen",
        "antidote-made",
        "antidote-deployed",
        "direct-victory",
        "prepared-victory",
        "breakout-cleared",
        "return-patients"
      ],
      "sequence": [],
      "choices": [
        "direct",
        "antidote"
      ],
      "sinceRevision": 2,
      "volumeLabel": "金丹卷",
      "requiredObjectives": [
        "breakout-cleared",
        "return-patients"
      ],
      "sources": [
        {
          "file": "src/lib/story/volume3.ts",
          "line": 1048,
          "node": "jindan_qingxia_30"
        },
        {
          "file": "src/lib/story/volume3.ts",
          "line": 1058,
          "node": "jindan_qingxia_defeat"
        },
        {
          "file": "src/lib/story/volume3.ts",
          "line": 974,
          "node": "jindan_mid_save_suye"
        }
      ]
    },
    "jindan-crossroads": {
      "id": "jindan-crossroads",
      "title": "证据之后的三条路",
      "summary": "回山、入魔或独立查证由你明确选择；不替你改身世、宗门或道侣。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "wanyao-breakout",
            "status": "claimed"
          }
        ],
        "any": []
      },
      "objectives": [
        "consequences-read",
        "route-decided"
      ],
      "sequence": [],
      "choices": [
        "return",
        "demon",
        "investigate"
      ],
      "sinceRevision": 2,
      "volumeLabel": "金丹卷",
      "sources": [
        {
          "file": "src/lib/story/volume3.ts",
          "line": 227,
          "node": "jindan_secret_realm_choice"
        }
      ]
    }
  },
  "actions": {
    "accept-tower-duty": {
      "id": "accept-tower-duty",
      "task": "tower-duty",
      "map": "garden",
      "objectId": "qingwei",
      "label": "接下锁妖塔当值",
      "detail": "先完成回山呈证；清微转交值役铜镜与符验。二者是登记工具，不是可消耗战斗物。",
      "kind": "accept",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [
          "duty-mirror",
          "duty-talisman"
        ],
        "evidence": []
      }
    },
    "issue-duty-water": {
      "id": "issue-duty-water",
      "task": "tower-duty",
      "map": "tower-duty",
      "objectId": "towerSteward",
      "label": "核验符验，领三盘值夜符水",
      "detail": "执事按本次值役发三份封存符水，仅供三盘使用。",
      "kind": "progress",
      "requires": {
        "all": [
          {
            "type": "token",
            "id": "duty-talisman"
          }
        ],
        "any": []
      },
      "marks": [
        "water-issued"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {
          "duty-water": 3
        },
        "tokens": [],
        "evidence": []
      }
    },
    "fill-duty-west": {
      "id": "fill-duty-west",
      "task": "tower-duty",
      "map": "tower-duty",
      "objectId": "towerWaterWest",
      "label": "添入一份值夜符水",
      "detail": "消耗专用符水一份；已添的盘不再重复扣料。",
      "kind": "progress",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "tower-duty",
            "id": "water-issued"
          }
        ],
        "any": []
      },
      "marks": [
        "west-water"
      ],
      "cost": {
        "items": {},
        "supplies": {
          "duty-water": 1
        }
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "fill-duty-east": {
      "id": "fill-duty-east",
      "task": "tower-duty",
      "map": "tower-duty",
      "objectId": "towerWaterEast",
      "label": "添入一份值夜符水",
      "detail": "消耗专用符水一份；已添的盘不再重复扣料。",
      "kind": "progress",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "tower-duty",
            "id": "water-issued"
          }
        ],
        "any": []
      },
      "marks": [
        "east-water"
      ],
      "cost": {
        "items": {},
        "supplies": {
          "duty-water": 1
        }
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "fill-duty-north": {
      "id": "fill-duty-north",
      "task": "tower-duty",
      "map": "tower-duty",
      "objectId": "towerWaterNorth",
      "label": "添入一份值夜符水",
      "detail": "消耗专用符水一份；已添的盘不再重复扣料。",
      "kind": "progress",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "tower-duty",
            "id": "water-issued"
          }
        ],
        "any": []
      },
      "marks": [
        "north-water"
      ],
      "cost": {
        "items": {},
        "supplies": {
          "duty-water": 1
        }
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "hear-old-fox": {
      "id": "hear-old-fox",
      "task": "tower-duty",
      "map": "tower-duty",
      "objectId": "towerOldFox",
      "label": "听老狐说清它亲见的范围",
      "detail": "它认得凝霜，但未亲历矿案。记录提醒，不把塔中传言当作凶手定论。",
      "kind": "progress",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "tower-duty",
            "id": "west-water"
          }
        ],
        "any": []
      },
      "marks": [
        "fox-heard"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": [
          "fox-testimony"
        ]
      }
    },
    "hear-tower-bear": {
      "id": "hear-tower-bear",
      "task": "tower-duty",
      "map": "tower-duty",
      "objectId": "towerBear",
      "label": "记录熊妖见到的青衫客",
      "detail": "它看见年轻人去七层，也听见次日的逃亡说法；两者分栏记录，身份留待复核。",
      "kind": "progress",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "tower-duty",
            "id": "east-water"
          }
        ],
        "any": []
      },
      "marks": [
        "bear-heard"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": [
          "bear-testimony"
        ]
      }
    },
    "record-tower-duty": {
      "id": "record-tower-duty",
      "task": "tower-duty",
      "map": "tower-duty",
      "objectId": "towerDutyLedger",
      "label": "把值夜经过写入当值簿",
      "detail": "三盘已添，分别写下两位证人的见闻与未见之处。",
      "kind": "progress",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "tower-duty",
            "id": "north-water"
          },
          {
            "type": "evidence",
            "id": "fox-testimony"
          },
          {
            "type": "evidence",
            "id": "bear-testimony"
          }
        ],
        "any": []
      },
      "marks": [
        "duty-recorded"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "claim-tower-duty": {
      "id": "claim-tower-duty",
      "task": "tower-duty",
      "map": "tower-duty",
      "objectId": "towerSteward",
      "label": "交值查簿，领取回气丹",
      "detail": "回气丹一枚与六层准簿只领一次；满仓先留在执事处。",
      "kind": "claim",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {
          "potion": 1
        },
        "supplies": {},
        "tokens": [
          "duty-pass"
        ],
        "evidence": []
      }
    },
    "accept-tower-seal": {
      "id": "accept-tower-seal",
      "task": "tower-seal",
      "map": "tower-seal",
      "objectId": "towerSealNotice",
      "label": "核查六层封印",
      "detail": "先看裂纹和三锚图，再动手复封；被囚的老狐与熊妖都不是本次战斗目标。",
      "kind": "accept",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "inspect-seal-slip": {
      "id": "inspect-seal-slip",
      "task": "tower-seal",
      "map": "tower-seal",
      "objectId": "towerSealCrack",
      "label": "沿裂纹辨认灵流方向",
      "detail": "印痕像有人绕过禁制，和清微一脉手法相似；仅记痕迹，不凭手法定罪。",
      "kind": "progress",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "fracture-read"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": [
          "seal-slip"
        ]
      }
    },
    "choose-seal-repair": {
      "id": "choose-seal-repair",
      "task": "tower-seal",
      "map": "tower-seal",
      "objectId": "towerSealNotice",
      "label": "选择复封守阵",
      "detail": "按三锚复封并实际守住失控阵灵；可使用已有功法、法宝与符药。",
      "kind": "choice",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "tower-seal",
            "id": "fracture-read"
          }
        ],
        "any": []
      },
      "marks": [
        "route-chosen"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "choice": "repair",
      "confirm": {
        "title": "确认本次通行方法",
        "text": "按三锚复封并实际守住失控阵灵；可使用已有功法、法宝与符药。 两路同样获得一次护身符和通行复验记；确认后不能换路，取消不记录选择。",
        "label": "确认此方法"
      }
    },
    "choose-seal-bypass": {
      "id": "choose-seal-bypass",
      "task": "tower-seal",
      "map": "tower-seal",
      "objectId": "towerSealNotice",
      "label": "选择依证静行",
      "detail": "把两位证人的提醒与裂痕方向对照，现场测出不扰阵灵的通路；这条路不替囚塔完成复封。",
      "kind": "choice",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "tower-seal",
            "id": "fracture-read"
          }
        ],
        "any": []
      },
      "marks": [
        "route-chosen"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "choice": "bypass",
      "confirm": {
        "title": "确认本次通行方法",
        "text": "把两位证人的提醒与裂痕方向对照，现场测出不扰阵灵的通路；这条路不替囚塔完成复封。 两路同样获得一次护身符和通行复验记；确认后不能换路，取消不记录选择。",
        "label": "确认此方法"
      }
    },
    "take-seal-clay": {
      "id": "take-seal-clay",
      "task": "tower-seal",
      "map": "tower-seal",
      "objectId": "towerSealClay",
      "label": "取本次复封朱泥",
      "detail": "只取一盒按此裂缝配好的朱泥，不进入可炼制材料库存。",
      "kind": "progress",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "tower-seal",
            "id": "fracture-read"
          },
          {
            "type": "choice",
            "task": "tower-seal",
            "id": "repair"
          }
        ],
        "any": []
      },
      "marks": [
        "clay-taken"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {
          "seal-clay": 1
        },
        "tokens": [],
        "evidence": []
      }
    },
    "seal-west": {
      "id": "seal-west",
      "task": "tower-seal",
      "map": "tower-seal",
      "objectId": "towerSealWest",
      "label": "西锚定外环",
      "detail": "依次西、中、东；错误次序复位，不耗朱泥。第三锚正确时才整份用去朱泥。",
      "kind": "sequence",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "tower-seal",
            "id": "fracture-read"
          },
          {
            "type": "done",
            "task": "tower-seal",
            "id": "clay-taken"
          },
          {
            "type": "choice",
            "task": "tower-seal",
            "id": "repair"
          }
        ],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "seal-middle": {
      "id": "seal-middle",
      "task": "tower-seal",
      "map": "tower-seal",
      "objectId": "towerSealMiddle",
      "label": "中锚留回流",
      "detail": "依次西、中、东；错误次序复位，不耗朱泥。第三锚正确时才整份用去朱泥。",
      "kind": "sequence",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "tower-seal",
            "id": "fracture-read"
          },
          {
            "type": "done",
            "task": "tower-seal",
            "id": "clay-taken"
          },
          {
            "type": "choice",
            "task": "tower-seal",
            "id": "repair"
          }
        ],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "seal-east": {
      "id": "seal-east",
      "task": "tower-seal",
      "map": "tower-seal",
      "objectId": "towerSealEast",
      "label": "东锚合封缄",
      "detail": "依次西、中、东；错误次序复位，不耗朱泥。第三锚正确时才整份用去朱泥。",
      "kind": "sequence",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "tower-seal",
            "id": "fracture-read"
          },
          {
            "type": "done",
            "task": "tower-seal",
            "id": "clay-taken"
          },
          {
            "type": "choice",
            "task": "tower-seal",
            "id": "repair"
          }
        ],
        "any": []
      },
      "marks": [
        "seal-set"
      ],
      "cost": {
        "items": {},
        "supplies": {
          "seal-clay": 1
        }
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "defend-seal-rift": {
      "id": "defend-seal-rift",
      "task": "tower-seal",
      "map": "tower-seal",
      "objectId": "towerSealBell",
      "label": "敲铃守住复封窗口",
      "detail": "两名失控阵灵逼近；可自动迎敌并以V暂停下令。开战不扣任务物，普通符药按实际施用消耗。",
      "kind": "battle",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "tower-seal",
            "id": "seal-set"
          },
          {
            "type": "choice",
            "task": "tower-seal",
            "id": "repair"
          }
        ],
        "any": []
      },
      "marks": [
        "rift-held",
        "seal-resolved"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "encounter": "seal-rift"
    },
    "bypass-measure-west": {
      "id": "bypass-measure-west",
      "task": "tower-seal",
      "map": "tower-seal",
      "objectId": "towerSealWest",
      "label": "测西锚回流间隙",
      "detail": "观察西锚三次回流并把最弱的一线标在值查图上；静行仍须核另一侧，不能只凭口述越禁。",
      "kind": "progress",
      "requires": {
        "all": [
          {
            "type": "choice",
            "task": "tower-seal",
            "id": "bypass"
          },
          {
            "type": "evidence",
            "id": "fox-testimony"
          },
          {
            "type": "evidence",
            "id": "bear-testimony"
          },
          {
            "type": "evidence",
            "id": "seal-slip"
          }
        ],
        "any": []
      },
      "marks": [
        "bypass-west"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "bypass-measure-east": {
      "id": "bypass-measure-east",
      "task": "tower-seal",
      "map": "tower-seal",
      "objectId": "towerSealEast",
      "label": "核东锚静隙",
      "detail": "走到东侧把回流方向与西锚记录相对照；不消耗朱泥，也不惊动阵灵。",
      "kind": "progress",
      "requires": {
        "all": [
          {
            "type": "choice",
            "task": "tower-seal",
            "id": "bypass"
          },
          {
            "type": "done",
            "task": "tower-seal",
            "id": "bypass-west"
          }
        ],
        "any": []
      },
      "marks": [
        "bypass-east"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "bypass-combine-standard": {
      "id": "bypass-combine-standard",
      "task": "tower-seal",
      "map": "tower-seal",
      "objectId": "towerSealMiddle",
      "label": "合成两侧静行图",
      "detail": "两侧观测在中锚相合，确认每一步都落在回流间隙；这是所有来处和专长都能完成的普通方法。",
      "kind": "progress",
      "requires": {
        "all": [
          {
            "type": "choice",
            "task": "tower-seal",
            "id": "bypass"
          },
          {
            "type": "done",
            "task": "tower-seal",
            "id": "bypass-west"
          },
          {
            "type": "done",
            "task": "tower-seal",
            "id": "bypass-east"
          }
        ],
        "any": []
      },
      "marks": [
        "bypass-standard",
        "bypass-traced"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "bypass-method-rain": {
      "id": "bypass-method-rain",
      "task": "tower-seal",
      "map": "tower-seal",
      "objectId": "towerSealNotice",
      "label": "以行路记分清两份证词",
      "detail": "已办雨夜行路记，把老狐的提醒与熊妖所见分栏；对照西锚实测找到能互相印证的静隙，不把传闻当事实。",
      "kind": "progress",
      "requires": {
        "all": [
          {
            "type": "choice",
            "task": "tower-seal",
            "id": "bypass"
          },
          {
            "type": "done",
            "task": "tower-seal",
            "id": "bypass-west"
          },
          {
            "type": "backgroundMission",
            "id": "rain"
          }
        ],
        "any": []
      },
      "marks": [
        "bypass-rain",
        "bypass-traced"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "bypass-method-poor": {
      "id": "bypass-method-poor",
      "task": "tower-seal",
      "map": "tower-seal",
      "objectId": "towerSealClay",
      "label": "以共灶核份经验核朱泥用量",
      "detail": "已办共灶委托，能从值查图的定额与匣内旧泥残量辨出未受扰动的锚侧；只查看公用匣，不取朱泥或补发粮契。",
      "kind": "progress",
      "requires": {
        "all": [
          {
            "type": "choice",
            "task": "tower-seal",
            "id": "bypass"
          },
          {
            "type": "done",
            "task": "tower-seal",
            "id": "bypass-west"
          },
          {
            "type": "backgroundMission",
            "id": "poor"
          }
        ],
        "any": []
      },
      "marks": [
        "bypass-poor",
        "bypass-traced"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "bypass-method-beggar": {
      "id": "bypass-method-beggar",
      "task": "tower-seal",
      "map": "tower-seal",
      "objectId": "towerSealUp",
      "label": "沿旧脚印核安全落点",
      "detail": "已办街巷递送人委托，循干净落脚点与回头痕核对西锚记录，找到既有静行线；旧结绳不再授予，也没有隐身能力。",
      "kind": "progress",
      "requires": {
        "all": [
          {
            "type": "choice",
            "task": "tower-seal",
            "id": "bypass"
          },
          {
            "type": "done",
            "task": "tower-seal",
            "id": "bypass-west"
          },
          {
            "type": "backgroundMission",
            "id": "beggar"
          }
        ],
        "any": []
      },
      "marks": [
        "bypass-beggar",
        "bypass-traced"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "bypass-method-caravan": {
      "id": "bypass-method-caravan",
      "task": "tower-seal",
      "map": "tower-seal",
      "objectId": "towerSealNotice",
      "label": "以药路核签经验验交班次序",
      "detail": "已结药路委托，对照值查图的交班签序与西锚实测，识出不会撞上阵灵回流的窗口；不重发已交封签。",
      "kind": "progress",
      "requires": {
        "all": [
          {
            "type": "choice",
            "task": "tower-seal",
            "id": "bypass"
          },
          {
            "type": "done",
            "task": "tower-seal",
            "id": "bypass-west"
          },
          {
            "type": "backgroundMission",
            "id": "caravan"
          }
        ],
        "any": []
      },
      "marks": [
        "bypass-caravan",
        "bypass-traced"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "bypass-method-demon": {
      "id": "bypass-method-demon",
      "task": "tower-seal",
      "map": "tower-seal",
      "objectId": "towerSealCrack",
      "label": "以边药查伪经验辨灵流外缘",
      "detail": "已办魔域独立回报，按查伪符所用的内外纹序复核裂痕与西锚；辨出静行外缘，不改阵营，也不把魔域来处当善恶。",
      "kind": "progress",
      "requires": {
        "all": [
          {
            "type": "choice",
            "task": "tower-seal",
            "id": "bypass"
          },
          {
            "type": "done",
            "task": "tower-seal",
            "id": "bypass-west"
          },
          {
            "type": "backgroundMission",
            "id": "demon"
          }
        ],
        "any": []
      },
      "marks": [
        "bypass-demon",
        "bypass-traced"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "bypass-method-sword": {
      "id": "bypass-method-sword",
      "task": "tower-seal",
      "map": "tower-seal",
      "objectId": "towerSealMiddle",
      "label": "以回风剑页辨回流节律",
      "detail": "已完成剑庐试炼，用所学回风节律核对西锚的收放，在中锚辨出可通行的间隙；不强行斩封印。",
      "kind": "progress",
      "requires": {
        "all": [
          {
            "type": "choice",
            "task": "tower-seal",
            "id": "bypass"
          },
          {
            "type": "done",
            "task": "tower-seal",
            "id": "bypass-west"
          },
          {
            "type": "originTraining",
            "id": "sword"
          }
        ],
        "any": []
      },
      "marks": [
        "bypass-sword",
        "bypass-traced"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "bypass-method-medicine": {
      "id": "bypass-method-medicine",
      "task": "tower-seal",
      "map": "tower-seal",
      "objectId": "towerSealClay",
      "label": "以药庐辨材核锚侧湿度",
      "detail": "已完成药庐试炼，结合西锚记录与旧泥干湿判断哪侧尚未被扰动；只辨材，不消耗药囊或任何普通草药。",
      "kind": "progress",
      "requires": {
        "all": [
          {
            "type": "choice",
            "task": "tower-seal",
            "id": "bypass"
          },
          {
            "type": "done",
            "task": "tower-seal",
            "id": "bypass-west"
          },
          {
            "type": "originTraining",
            "id": "medicine"
          }
        ],
        "any": []
      },
      "marks": [
        "bypass-medicine",
        "bypass-traced"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "bypass-method-scholar": {
      "id": "bypass-method-scholar",
      "task": "tower-seal",
      "map": "tower-seal",
      "objectId": "towerSealNotice",
      "label": "以经阁定脉补齐静行图",
      "detail": "已完成经阁试炼，按定脉所学从西锚与旧图推回另一侧的回流位置；仍须到铜铃复核，不直接越层。",
      "kind": "progress",
      "requires": {
        "all": [
          {
            "type": "choice",
            "task": "tower-seal",
            "id": "bypass"
          },
          {
            "type": "done",
            "task": "tower-seal",
            "id": "bypass-west"
          },
          {
            "type": "originTraining",
            "id": "scholar"
          }
        ],
        "any": []
      },
      "marks": [
        "bypass-scholar",
        "bypass-traced"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "confirm-seal-bypass": {
      "id": "confirm-seal-bypass",
      "task": "tower-seal",
      "map": "tower-seal",
      "objectId": "towerSealBell",
      "label": "以证词和静行图核准通路",
      "detail": "西锚实测与现场核验相合；以不触发阵灵的节律经过侧阶。只记录静行通路核准，不记录复封、耗泥或击败敌人。",
      "kind": "progress",
      "requires": {
        "all": [
          {
            "type": "choice",
            "task": "tower-seal",
            "id": "bypass"
          },
          {
            "type": "done",
            "task": "tower-seal",
            "id": "bypass-traced"
          },
          {
            "type": "evidence",
            "id": "fox-testimony"
          },
          {
            "type": "evidence",
            "id": "bear-testimony"
          },
          {
            "type": "evidence",
            "id": "seal-slip"
          }
        ],
        "any": []
      },
      "marks": [
        "bypass-held",
        "seal-resolved"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "claim-tower-seal": {
      "id": "claim-tower-seal",
      "task": "tower-seal",
      "map": "tower-seal",
      "objectId": "towerSealNotice",
      "label": "交还值查图，收通行复验记",
      "detail": "守阵或静行择一完成后，在值查图旁一次领护身符与七层准记。两路不能双领；绕行无战斗掉落，守阵清敌也不即时掉普通材料。",
      "kind": "claim",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {
          "ward": 1
        },
        "supplies": {},
        "tokens": [
          "upper-pass"
        ],
        "evidence": []
      }
    },
    "accept-tower-trace": {
      "id": "accept-tower-trace",
      "task": "tower-trace",
      "map": "tower-upper",
      "objectId": "towerUpperNotice",
      "label": "开始七层留证",
      "detail": "铜镜只是观察工具。残响身份未核，不交魂、不照录许诺，也不凭幻相认定他人伤亡。",
      "kind": "accept",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "take-rubbing-paper": {
      "id": "take-rubbing-paper",
      "task": "tower-trace",
      "map": "tower-upper",
      "objectId": "towerUpperRubbingKit",
      "label": "取一张封缄拓纸",
      "detail": "拓纸专供本次残字，不可制符，未取纸不能将血字当作已留证。",
      "kind": "progress",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "paper-taken"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {
          "rubbing-paper": 1
        },
        "tokens": [],
        "evidence": []
      }
    },
    "mirror-edge": {
      "id": "mirror-edge",
      "task": "tower-trace",
      "map": "tower-upper",
      "objectId": "towerUpperMirror",
      "label": "先核镜框与手中铜镜",
      "detail": "依次验镜框、侧光和眼前人事；错序可重来，不消耗镜子。镜中恐吓不等于灵薇实际遇险。",
      "kind": "sequence",
      "requires": {
        "all": [
          {
            "type": "token",
            "id": "duty-mirror"
          }
        ],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "mirror-light": {
      "id": "mirror-light",
      "task": "tower-trace",
      "map": "tower-upper",
      "objectId": "towerUpperLamp",
      "label": "移到侧灯核对投影",
      "detail": "依次验镜框、侧光和眼前人事；错序可重来，不消耗镜子。镜中恐吓不等于灵薇实际遇险。",
      "kind": "sequence",
      "requires": {
        "all": [
          {
            "type": "token",
            "id": "duty-mirror"
          }
        ],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "mirror-present": {
      "id": "mirror-present",
      "task": "tower-trace",
      "map": "tower-upper",
      "objectId": "towerUpperMirror",
      "label": "再以眼前人事辨明幻相",
      "detail": "依次验镜框、侧光和眼前人事；错序可重来，不消耗镜子。镜中恐吓不等于灵薇实际遇险。",
      "kind": "sequence",
      "requires": {
        "all": [
          {
            "type": "token",
            "id": "duty-mirror"
          }
        ],
        "any": []
      },
      "marks": [
        "mirror-verified"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": [
          "mirror-illusion"
        ]
      }
    },
    "copy-wall-blood": {
      "id": "copy-wall-blood",
      "task": "tower-trace",
      "map": "tower-upper",
      "objectId": "towerUpperBlood",
      "label": "按原样拓下血字与残笔",
      "detail": "只拓可见字迹，不把残缺三点水补作姓名。用去本次封缄拓纸。",
      "kind": "progress",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "tower-trace",
            "id": "paper-taken"
          },
          {
            "type": "done",
            "task": "tower-trace",
            "id": "mirror-verified"
          }
        ],
        "any": []
      },
      "marks": [
        "blood-copied"
      ],
      "cost": {
        "items": {},
        "supplies": {
          "rubbing-paper": 1
        }
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": [
          "wall-blood"
        ]
      }
    },
    "refuse-echo": {
      "id": "refuse-echo",
      "task": "tower-trace",
      "map": "tower-upper",
      "objectId": "towerUnknownEcho",
      "label": "温和拒绝换魄",
      "detail": "谢谢提醒，但不能以魂魄换未经证明的话。此刻不认残响身份，也不把它的话写成案情结论。",
      "kind": "choice",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "tower-trace",
            "id": "blood-copied"
          }
        ],
        "any": []
      },
      "marks": [
        "voice-bounded"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "choice": "refuse",
      "confirm": {
        "title": "确认留证方式",
        "text": "谢谢提醒，但不能以魂魄换未经证明的话。此刻不认残响身份，也不把它的话写成案情结论。 此次回应会记入案卷，两种方式同样推进且同奖；取消可再考虑。",
        "label": "确认此回应"
      }
    },
    "record-echo": {
      "id": "record-echo",
      "task": "tower-trace",
      "map": "tower-upper",
      "objectId": "towerUnknownEcho",
      "label": "只记录交易要求",
      "detail": "我会记录你索要一魄，但不会答应；你所声称的身份和真相，留待独立查证。",
      "kind": "choice",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "tower-trace",
            "id": "blood-copied"
          }
        ],
        "any": []
      },
      "marks": [
        "voice-bounded"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "choice": "record",
      "confirm": {
        "title": "确认留证方式",
        "text": "我会记录你索要一魄，但不会答应；你所声称的身份和真相，留待独立查证。 此次回应会记入案卷，两种方式同样推进且同奖；取消可再考虑。",
        "label": "确认此回应"
      }
    },
    "find-tower-tunnel": {
      "id": "find-tower-tunnel",
      "task": "tower-trace",
      "map": "tower-upper",
      "objectId": "towerTunnelLock",
      "label": "核对铜锁与密道方向",
      "detail": "凌云子取出铜钥，说明通道回到师父住处。确认路线，不把钥匙变成可卖的法宝。",
      "kind": "progress",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "tower-trace",
            "id": "voice-bounded"
          }
        ],
        "any": []
      },
      "marks": [
        "tunnel-found"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "hear-lingyun": {
      "id": "hear-lingyun",
      "task": "tower-trace",
      "map": "tower-upper",
      "objectId": "towerLingyun",
      "label": "让师兄将所知具名说清",
      "detail": "他承认早知密道，并称陈玄受心蛊控制。林墨把“师兄所说”与“亲眼所见”分开，要求回山复核；不提前认定残响身份。",
      "kind": "progress",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "tower-trace",
            "id": "tunnel-found"
          }
        ],
        "any": []
      },
      "marks": [
        "lingyun-heard"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": [
          "tunnel-witness"
        ]
      }
    },
    "claim-tower-trace": {
      "id": "claim-tower-trace",
      "task": "tower-trace",
      "map": "tower-upper",
      "objectId": "towerLingyun",
      "label": "封存笔录，沿密道回山",
      "detail": "线索保留为证据与疑点；清心散一份作为回程照护，不因残响选择不同而改变。",
      "kind": "claim",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {
          "qingxin": 1
        },
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "accept-tower-review": {
      "id": "accept-tower-review",
      "task": "tower-review",
      "map": "garden",
      "objectId": "qingwei",
      "label": "请清微复核塔中见闻",
      "detail": "两位塔中证人、封印、铜镜、血字与凌云子口述逐项列开。",
      "kind": "accept",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "compare-tower-records": {
      "id": "compare-tower-records",
      "task": "tower-review",
      "map": "garden",
      "objectId": "qingwei",
      "label": "区分事实、证词和未决疑点",
      "detail": "清微确认旧案仍需追查。血字残笔不补名，陈玄心蛊说法仍待独立证据；残响身份与更深秘密暂不宣判。",
      "kind": "progress",
      "requires": {
        "all": [
          {
            "type": "evidence",
            "id": "fox-testimony"
          },
          {
            "type": "evidence",
            "id": "bear-testimony"
          },
          {
            "type": "evidence",
            "id": "seal-slip"
          },
          {
            "type": "evidence",
            "id": "mirror-illusion"
          },
          {
            "type": "evidence",
            "id": "wall-blood"
          },
          {
            "type": "evidence",
            "id": "tunnel-witness"
          }
        ],
        "any": []
      },
      "marks": [
        "review-recorded"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": [
          "master-review"
        ]
      }
    },
    "claim-tower-review": {
      "id": "claim-tower-review",
      "task": "tower-review",
      "map": "garden",
      "objectId": "qingwei",
      "label": "收好复核副卷",
      "detail": "取得副卷并可继续准备金丹；杏花村照护是可选去向，不以亲近任何人换主线资格。",
      "kind": "claim",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {
          "tea": 1
        },
        "supplies": {},
        "tokens": [
          "tower-case-copy"
        ],
        "evidence": []
      }
    },
    "accept-apricot-aid": {
      "id": "accept-apricot-aid",
      "task": "apricot-aid",
      "map": "apricot-village",
      "objectId": "apricotAxing",
      "label": "与阿杏一起照看行旅",
      "detail": "阿杏二十二岁，先说明病人的情况与她自己的判断。林墨可帮忙辨药与照护，不替她决定人生。",
      "kind": "accept",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "read-apricot-case": {
      "id": "read-apricot-case",
      "task": "apricot-aid",
      "map": "apricot-village",
      "objectId": "apricotCasebook",
      "label": "先看病案与药样辨识图",
      "detail": "只取指定鲜药样。阿杏逐项标出叶脉、气味与应采部位，不把普通草药画成发光灵物。",
      "kind": "progress",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "case-read"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "gather-apricot-west": {
      "id": "gather-apricot-west",
      "task": "apricot-aid",
      "map": "apricot-village",
      "objectId": "apricotHerbWest",
      "label": "按病案采一份退热药样",
      "detail": "本次病案只取这一处一份，采后记录来源；不是普通青灵草的隐藏备用库存。",
      "kind": "progress",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "apricot-aid",
            "id": "case-read"
          }
        ],
        "any": []
      },
      "marks": [
        "west-sample"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {
          "fever-sample": 1
        },
        "tokens": [],
        "evidence": []
      }
    },
    "gather-apricot-east": {
      "id": "gather-apricot-east",
      "task": "apricot-aid",
      "map": "apricot-village",
      "objectId": "apricotHerbEast",
      "label": "按病案采一份退热药样",
      "detail": "本次病案只取这一处一份，采后记录来源；不是普通青灵草的隐藏备用库存。",
      "kind": "progress",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "apricot-aid",
            "id": "case-read"
          }
        ],
        "any": []
      },
      "marks": [
        "east-sample"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {
          "fever-sample": 1
        },
        "tokens": [],
        "evidence": []
      }
    },
    "draw-apricot-water": {
      "id": "draw-apricot-water",
      "task": "apricot-aid",
      "map": "apricot-village",
      "objectId": "apricotWell",
      "label": "用净瓶量取一份煎药水",
      "detail": "净瓶已按病案定量，专供这一份汤剂，不与普通山泉水库存混用。",
      "kind": "progress",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "apricot-aid",
            "id": "case-read"
          }
        ],
        "any": []
      },
      "marks": [
        "water-drawn"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {
          "decoction-water": 1
        },
        "tokens": [],
        "evidence": []
      }
    },
    "apricot-crush": {
      "id": "apricot-crush",
      "task": "apricot-aid",
      "map": "apricot-village",
      "objectId": "apricotBench",
      "label": "先分拣轻捣鲜药样",
      "detail": "依次分拣、润药、净煎；错序重来不扣料，正确最后一步才用去两份鲜药样与一瓶净煎水。",
      "kind": "sequence",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "apricot-aid",
            "id": "west-sample"
          },
          {
            "type": "done",
            "task": "apricot-aid",
            "id": "east-sample"
          },
          {
            "type": "done",
            "task": "apricot-aid",
            "id": "water-drawn"
          }
        ],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "apricot-soak": {
      "id": "apricot-soak",
      "task": "apricot-aid",
      "map": "apricot-village",
      "objectId": "apricotBench",
      "label": "再以净煎水润药",
      "detail": "依次分拣、润药、净煎；错序重来不扣料，正确最后一步才用去两份鲜药样与一瓶净煎水。",
      "kind": "sequence",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "apricot-aid",
            "id": "west-sample"
          },
          {
            "type": "done",
            "task": "apricot-aid",
            "id": "east-sample"
          },
          {
            "type": "done",
            "task": "apricot-aid",
            "id": "water-drawn"
          }
        ],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "apricot-simmer": {
      "id": "apricot-simmer",
      "task": "apricot-aid",
      "map": "apricot-village",
      "objectId": "apricotBench",
      "label": "最后文火净煎成药",
      "detail": "依次分拣、润药、净煎；错序重来不扣料，正确最后一步才用去两份鲜药样与一瓶净煎水。",
      "kind": "sequence",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "apricot-aid",
            "id": "west-sample"
          },
          {
            "type": "done",
            "task": "apricot-aid",
            "id": "east-sample"
          },
          {
            "type": "done",
            "task": "apricot-aid",
            "id": "water-drawn"
          }
        ],
        "any": []
      },
      "marks": [
        "medicine-brewed"
      ],
      "cost": {
        "items": {},
        "supplies": {
          "fever-sample": 2,
          "decoction-water": 1
        }
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "deliver-apricot-care": {
      "id": "deliver-apricot-care",
      "task": "apricot-aid",
      "map": "apricot-village",
      "objectId": "apricotPatient",
      "label": "把温药送到病榻并协助照护",
      "detail": "阿杏复核用量后与林墨一起照护；行旅退热后可自行安排回家。成药不进入普通战斗库存，不会因误饮而使任务卡住。",
      "kind": "progress",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "apricot-aid",
            "id": "medicine-brewed"
          }
        ],
        "any": []
      },
      "marks": [
        "care-delivered"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "apricot-friend": {
      "id": "apricot-friend",
      "task": "apricot-aid",
      "map": "apricot-village",
      "objectId": "apricotAxing",
      "label": "以朋友相待，约好下次共事",
      "detail": "阿杏愿意把你当作可商量医案的朋友。共同医案与实用谢礼照常取得，不额外判好坏。",
      "kind": "choice",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "apricot-aid",
            "id": "care-delivered"
          }
        ],
        "any": []
      },
      "marks": [
        "bond-defined"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "choice": "friend",
      "confirm": {
        "title": "确认以朋友相待",
        "text": "阿杏愿意把你当作可商量医案的朋友。共同医案与实用谢礼照常取得，不额外判好坏。 两种选择均得回气丹、温养茶和医案札，不影响主线；取消不会写入关系。",
        "label": "确认朋友"
      }
    },
    "apricot-close": {
      "id": "apricot-close",
      "task": "apricot-aid",
      "map": "apricot-village",
      "objectId": "apricotAxing",
      "label": "明确回应：我愿多了解你",
      "detail": "阿杏愿意慢慢相识，也保留自己的药圃与目标。双方成年；此刻只确认亲近意愿，不自动恋爱、同居或结契。",
      "kind": "choice",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "apricot-aid",
            "id": "care-delivered"
          }
        ],
        "any": []
      },
      "marks": [
        "bond-defined"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "choice": "close",
      "confirm": {
        "title": "确认愿再相见",
        "text": "阿杏愿意慢慢相识，也保留自己的药圃与目标。双方成年；此刻只确认亲近意愿，不自动恋爱、同居或结契。 两种选择均得回气丹、温养茶和医案札，不影响主线；取消不会写入关系。",
        "label": "确认亲近意愿"
      }
    },
    "claim-apricot-aid": {
      "id": "claim-apricot-aid",
      "task": "apricot-aid",
      "map": "apricot-village",
      "objectId": "apricotAxing",
      "label": "共同署名，收好医案与谢礼",
      "detail": "朋友与亲近完全同奖：回气丹一枚、温养茶一份、春雨医案札；奖励放不下可稍后来取。",
      "kind": "claim",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {
          "potion": 1,
          "tea": 1
        },
        "supplies": {},
        "tokens": [
          "apricot-case-notes"
        ],
        "evidence": []
      }
    },
    "accept-m2-handoff": {
      "id": "accept-m2-handoff",
      "task": "m2-handoff",
      "map": "garden",
      "objectId": "qingwei",
      "label": "请教下一步结丹准备",
      "detail": "只要求锁妖塔案卷已复核；未去杏花村、未选择亲近也可继续。",
      "kind": "accept",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "read-jindan-plan": {
      "id": "read-jindan-plan",
      "task": "m2-handoff",
      "map": "garden",
      "objectId": "qingwei",
      "label": "核对修行、护持与后续取证安排",
      "detail": "札上列出后续结丹所需的修行与准备；当前仍为筑基，下一卷尚未开放，不提前发高境界属性。",
      "kind": "progress",
      "requires": {
        "all": [
          {
            "type": "token",
            "id": "tower-case-copy"
          }
        ],
        "any": []
      },
      "marks": [
        "next-plan-read"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      }
    },
    "claim-m2-handoff": {
      "id": "claim-m2-handoff",
      "task": "m2-handoff",
      "map": "garden",
      "objectId": "qingwei",
      "label": "收金丹准备札，完成本段交接",
      "detail": "护身符一张与准备札一次交付。本段结束后仍可自由回访塔区、药站或杏花村。",
      "kind": "claim",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {
          "ward": 1
        },
        "supplies": {},
        "tokens": [
          "jindan-preparation"
        ],
        "evidence": []
      }
    },
    "accept-jindan-preparation": {
      "id": "accept-jindan-preparation",
      "task": "jindan-preparation",
      "map": "jindan-retreat",
      "objectId": "retreatQingwei",
      "kind": "accept",
      "label": "接下闭关整备",
      "detail": "查洞府、布导雷与稳息准备，选择本次修行侧重。",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "read-retreat-notes": {
      "id": "read-retreat-notes",
      "task": "jindan-preparation",
      "map": "jindan-retreat",
      "objectId": "retreatNotes",
      "kind": "progress",
      "label": "查本门手记",
      "detail": "先核当前符药与已学功法，金丹不是凭一次阅读取得。",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "notes-read"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "take-storm-kit": {
      "id": "take-storm-kit",
      "task": "jindan-preparation",
      "map": "jindan-retreat",
      "objectId": "retreatPrepareDesk",
      "kind": "progress",
      "label": "取导雷稳息包",
      "detail": "后山按本次整备给一包专用品，不折算为灵石。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "jindan-preparation",
            "id": "notes-read"
          }
        ],
        "any": []
      },
      "marks": [
        "kit-taken"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {
          "storm-kit": 1
        },
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "ground-retreat-rods": {
      "id": "ground-retreat-rods",
      "task": "jindan-preparation",
      "map": "jindan-retreat",
      "objectId": "retreatGroundRod",
      "kind": "progress",
      "label": "接地并核稳息布置",
      "detail": "实际用完整包料固定铜杆和接地，不是给玩家无限护盾。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "jindan-preparation",
            "id": "kit-taken"
          }
        ],
        "any": []
      },
      "marks": [
        "grounded"
      ],
      "cost": {
        "items": {},
        "supplies": {
          "storm-kit": 1
        }
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "prepare-focus-steady": {
      "id": "prepare-focus-steady",
      "task": "jindan-preparation",
      "map": "jindan-retreat",
      "objectId": "retreatQingwei",
      "kind": "choice",
      "label": "稳扎稳打",
      "detail": "人人可用：稳息训练在领取整备后持续增加2个百分点减伤。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "jindan-preparation",
            "id": "grounded"
          }
        ],
        "any": []
      },
      "marks": [
        "focus-chosen"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2,
      "choice": "steady",
      "confirm": {
        "title": "确认本次选择",
        "text": "人人可用：稳息训练在领取整备后持续增加2个百分点减伤。 取消不会记录；确认后本次选择不能改写。",
        "label": "确认此选择"
      }
    },
    "prepare-focus-sword": {
      "id": "prepare-focus-sword",
      "task": "jindan-preparation",
      "map": "jindan-retreat",
      "objectId": "retreatQingwei",
      "kind": "choice",
      "label": "按剑庐节律整备",
      "detail": "已完成本人的剑庐试炼；领取整备后，已有剑式的普攻基础伤害持续增加4。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "jindan-preparation",
            "id": "grounded"
          },
          {
            "type": "originTraining",
            "id": "sword"
          }
        ],
        "any": []
      },
      "marks": [
        "focus-chosen"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2,
      "choice": "sword",
      "confirm": {
        "title": "确认本次选择",
        "text": "已完成本人的剑庐试炼；领取整备后，已有剑式的普攻基础伤害持续增加4。 取消不会记录；确认后本次选择不能改写。",
        "label": "确认此选择"
      }
    },
    "prepare-focus-medicine": {
      "id": "prepare-focus-medicine",
      "task": "jindan-preparation",
      "map": "jindan-retreat",
      "objectId": "retreatQingwei",
      "kind": "choice",
      "label": "按药庐续航整备",
      "detail": "已完成本人的药庐试炼；领取整备后，每秒回灵持续增加0.6，暂停期间不恢复。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "jindan-preparation",
            "id": "grounded"
          },
          {
            "type": "originTraining",
            "id": "medicine"
          }
        ],
        "any": []
      },
      "marks": [
        "focus-chosen"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2,
      "choice": "medicine",
      "confirm": {
        "title": "确认本次选择",
        "text": "已完成本人的药庐试炼；领取整备后，每秒回灵持续增加0.6，暂停期间不恢复。 取消不会记录；确认后本次选择不能改写。",
        "label": "确认此选择"
      }
    },
    "prepare-focus-scholar": {
      "id": "prepare-focus-scholar",
      "task": "jindan-preparation",
      "map": "jindan-retreat",
      "objectId": "retreatQingwei",
      "kind": "choice",
      "label": "按经阁符术整备",
      "detail": "已完成本人的经阁试炼；领取整备后，法术增益系数持续增加0.08，不补发符纸。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "jindan-preparation",
            "id": "grounded"
          },
          {
            "type": "originTraining",
            "id": "scholar"
          }
        ],
        "any": []
      },
      "marks": [
        "focus-chosen"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2,
      "choice": "scholar",
      "confirm": {
        "title": "确认本次选择",
        "text": "已完成本人的经阁试炼；领取整备后，法术增益系数持续增加0.08，不补发符纸。 取消不会记录；确认后本次选择不能改写。",
        "label": "确认此选择"
      }
    },
    "claim-jindan-preparation": {
      "id": "claim-jindan-preparation",
      "task": "jindan-preparation",
      "map": "jindan-retreat",
      "objectId": "retreatLingyun",
      "kind": "claim",
      "label": "领本次渡劫补给",
      "detail": "目标真正齐备后一次交付；满仓整单拒绝，可稍后来取。",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {
          "potion": 2,
          "ward": 2,
          "tea": 1
        },
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "accept-jindan-tribulation": {
      "id": "accept-jindan-tribulation",
      "task": "jindan-tribulation",
      "map": "jindan-retreat",
      "objectId": "retreatCore",
      "kind": "accept",
      "label": "开始三段凝丹劫",
      "detail": "前雷、心魔与凝丹三段实战；段间可回药庐整备，失败只重试本段。",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "fight-thunder-first": {
      "id": "fight-thunder-first",
      "task": "jindan-tribulation",
      "map": "jindan-retreat",
      "objectId": "retreatGroundRod",
      "kind": "battle",
      "label": "迎前段雷息",
      "detail": "自动普攻与暂停下令有效；真正胜利才记录本段，失败保留已胜段，已耗普通符药不返还。",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "thunder-first"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2,
      "encounter": "jindan-thunder-first"
    },
    "settle-heart-trial": {
      "id": "settle-heart-trial",
      "task": "jindan-tribulation",
      "map": "jindan-retreat",
      "objectId": "retreatQingwei",
      "kind": "progress",
      "label": "分清父影与心魔",
      "detail": "保留共同亲生身世，也记得不同成长经历中真实照护过自己的人；眼前心魔不等于亲人复活。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "jindan-tribulation",
            "id": "thunder-first"
          }
        ],
        "any": []
      },
      "marks": [
        "heart-settled"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "fight-heart-trial": {
      "id": "fight-heart-trial",
      "task": "jindan-tribulation",
      "map": "jindan-retreat",
      "objectId": "retreatHeartStone",
      "kind": "battle",
      "label": "护心破魇",
      "detail": "自动普攻与暂停下令有效；真正胜利才记录本段，失败保留已胜段，已耗普通符药不返还。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "jindan-tribulation",
            "id": "heart-settled"
          }
        ],
        "any": []
      },
      "marks": [
        "heart-trial"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2,
      "encounter": "jindan-heart-trial"
    },
    "fight-core-stable": {
      "id": "fight-core-stable",
      "task": "jindan-tribulation",
      "map": "jindan-retreat",
      "objectId": "retreatCoreStand",
      "kind": "battle",
      "label": "收束末段雷劫",
      "detail": "自动普攻与暂停下令有效；真正胜利才记录本段，失败保留已胜段，已耗普通符药不返还。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "jindan-tribulation",
            "id": "heart-trial"
          }
        ],
        "any": []
      },
      "marks": [
        "core-stable"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2,
      "encounter": "jindan-core-stable"
    },
    "stabilize-jindan-breath": {
      "id": "stabilize-jindan-breath",
      "task": "jindan-tribulation",
      "map": "jindan-retreat",
      "objectId": "retreatCore",
      "kind": "progress",
      "label": "收束丹息",
      "detail": "三段实战后亲手稳定丹息，再向师父复验；当前步骤未领取前仍不发金丹战力。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "jindan-tribulation",
            "id": "core-stable"
          }
        ],
        "any": []
      },
      "marks": [
        "breath-stable"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "claim-jindan-realm": {
      "id": "claim-jindan-realm",
      "task": "jindan-tribulation",
      "map": "jindan-retreat",
      "objectId": "retreatQingwei",
      "kind": "claim",
      "label": "复验并突破金丹",
      "detail": "目标真正齐备后一次交付；满仓整单拒绝，可稍后来取。",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "accept-tianji-negotiation": {
      "id": "accept-tianji-negotiation",
      "task": "tianji-negotiation",
      "map": "tianji-pavilion",
      "objectId": "pavilionInvite",
      "kind": "accept",
      "label": "赴帖先查来意",
      "detail": "核请帖与旧卷，听清条件后决定如何拒绝或暂不受职。",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "read-tianji-invite": {
      "id": "read-tianji-invite",
      "task": "tianji-negotiation",
      "map": "tianji-pavilion",
      "objectId": "pavilionInvite",
      "kind": "progress",
      "label": "核请帖与赴阁缘由",
      "detail": "先确定是玄玑本人召见，不把接帖当受职。",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "invite-read"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "read-tianji-archive": {
      "id": "read-tianji-archive",
      "task": "tianji-negotiation",
      "map": "tianji-pavilion",
      "objectId": "pavilionArchive",
      "kind": "progress",
      "label": "查旧矿卷目录",
      "detail": "留意矿案卷缺页与签押目录，尚未因此拿到完整凶案答案。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "tianji-negotiation",
            "id": "invite-read"
          }
        ],
        "any": []
      },
      "marks": [
        "archive-read"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "hear-tianji-offer": {
      "id": "hear-tianji-offer",
      "task": "tianji-negotiation",
      "map": "tianji-pavilion",
      "objectId": "pavilionChess",
      "kind": "progress",
      "label": "听清金令条件",
      "detail": "玄玑以副堂主与免赴南疆相邀，并提起你的血亲；金令仍放在函中，未进入行囊。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "tianji-negotiation",
            "id": "archive-read"
          }
        ],
        "any": []
      },
      "marks": [
        "offer-heard"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "tianji-refuse": {
      "id": "tianji-refuse",
      "task": "tianji-negotiation",
      "map": "tianji-pavilion",
      "objectId": "pavilionOffer",
      "kind": "choice",
      "label": "明确推回金令",
      "detail": "明确拒绝副堂主之位，仍愿亲赴秘境查证。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "tianji-negotiation",
            "id": "offer-heard"
          }
        ],
        "any": []
      },
      "marks": [
        "offer-decided"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": [
          "tianji-offer-record"
        ]
      },
      "sinceRevision": 2,
      "choice": "refuse",
      "confirm": {
        "title": "确认本次选择",
        "text": "明确拒绝副堂主之位，仍愿亲赴秘境查证。 取消不会记录；确认后本次选择不能改写。",
        "label": "确认此选择"
      }
    },
    "tianji-defer": {
      "id": "tianji-defer",
      "task": "tianji-negotiation",
      "map": "tianji-pavilion",
      "objectId": "pavilionOffer",
      "kind": "choice",
      "label": "婉拒，暂不受职",
      "detail": "谢过召见但不接令，保留核对线索的空间；不是接受副堂主职务。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "tianji-negotiation",
            "id": "offer-heard"
          }
        ],
        "any": []
      },
      "marks": [
        "offer-decided"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": [
          "tianji-offer-record"
        ]
      },
      "sinceRevision": 2,
      "choice": "defer",
      "confirm": {
        "title": "确认本次选择",
        "text": "谢过召见但不接令，保留核对线索的空间；不是接受副堂主职务。 取消不会记录；确认后本次选择不能改写。",
        "label": "确认此选择"
      }
    },
    "claim-tianji-negotiation": {
      "id": "claim-tianji-negotiation",
      "task": "tianji-negotiation",
      "map": "tianji-pavilion",
      "objectId": "pavilionLingyun",
      "kind": "claim",
      "label": "与同行核对来意",
      "detail": "目标真正齐备后一次交付；满仓整单拒绝，可稍后来取。",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {
          "qingxin": 1
        },
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "accept-wanyao-assembly": {
      "id": "accept-wanyao-assembly",
      "task": "wanyao-assembly",
      "map": "tianji-pavilion",
      "objectId": "pavilionDeparture",
      "kind": "accept",
      "label": "登记南疆出发",
      "detail": "交代井口风险、领取有限接应工具，再去秘境。",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "read-southern-route": {
      "id": "read-southern-route",
      "task": "wanyao-assembly",
      "map": "tianji-pavilion",
      "objectId": "pavilionDeparture",
      "kind": "progress",
      "label": "读井口风险与撤路",
      "detail": "古井提前异动不是正常开门；界内回程裂隙与南疆井外是不同地点。",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "route-read"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "brief-southern-companions": {
      "id": "brief-southern-companions",
      "task": "wanyao-assembly",
      "map": "tianji-pavilion",
      "objectId": "pavilionShen",
      "kind": "progress",
      "label": "与同行约定接应",
      "detail": "沈灵薇与凌云子各守一翼，不以亲近或道侣身份决定救助。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "wanyao-assembly",
            "id": "route-read"
          }
        ],
        "any": []
      },
      "marks": [
        "companions-briefed"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "take-rescue-tools": {
      "id": "take-rescue-tools",
      "task": "wanyao-assembly",
      "map": "jindan-retreat",
      "objectId": "retreatPrepareDesk",
      "kind": "progress",
      "label": "领取有限接应工具",
      "detail": "一包止血料、一副担架和一筒信号只能承担本次真实用途；不能出售或当普通药物使用。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "wanyao-assembly",
            "id": "companions-briefed"
          }
        ],
        "any": []
      },
      "marks": [
        "tools-received"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {
          "rescue-dressing": 1,
          "rescue-stretcher": 1,
          "rescue-flare": 1
        },
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "claim-wanyao-assembly": {
      "id": "claim-wanyao-assembly",
      "task": "wanyao-assembly",
      "map": "jindan-retreat",
      "objectId": "retreatLingyun",
      "kind": "claim",
      "label": "核齐同行，启程南疆",
      "detail": "目标真正齐备后一次交付；满仓整单拒绝，可稍后来取。",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {
          "ward": 1
        },
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "accept-wanyao-rescue": {
      "id": "accept-wanyao-rescue",
      "task": "wanyao-rescue",
      "map": "wanyao-outer",
      "objectId": "outerDispatch",
      "kind": "accept",
      "label": "接下外境救援",
      "detail": "先打退追击并稳住伤者，再把仅有的一趟担架投向人、证卷或符药。",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "fight-outer-pursuers": {
      "id": "fight-outer-pursuers",
      "task": "wanyao-rescue",
      "map": "wanyao-outer",
      "objectId": "outerDispatch",
      "kind": "battle",
      "label": "击退追赶同门的妖校",
      "detail": "自动普攻与暂停下令有效；真正胜利才记录本段，失败保留已胜段，已耗普通符药不返还。",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "outer-held"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2,
      "encounter": "wanyao-pursuers"
    },
    "secure-shen-retreat": {
      "id": "secure-shen-retreat",
      "task": "wanyao-rescue",
      "map": "wanyao-outer",
      "objectId": "outerShen",
      "kind": "progress",
      "label": "护送灵薇至接应线",
      "detail": "灵薇护住同门后负伤；凌云子接续照护，凤羽的代价保留为剧情，不复制成可反复使用的奖励。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "wanyao-rescue",
            "id": "outer-held"
          }
        ],
        "any": []
      },
      "marks": [
        "shen-safe"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "stabilize-suye": {
      "id": "stabilize-suye",
      "task": "wanyao-rescue",
      "map": "wanyao-outer",
      "objectId": "suyeRubble",
      "kind": "progress",
      "label": "固定伤处并给止血包",
      "detail": "真实使用定额工具让苏叶暂时稳定；此刻还没有把她护送回营。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "wanyao-rescue",
            "id": "shen-safe"
          }
        ],
        "any": []
      },
      "marks": [
        "suye-stabilized"
      ],
      "cost": {
        "items": {},
        "supplies": {
          "rescue-dressing": 1
        }
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "rescue-priority-rescue": {
      "id": "rescue-priority-rescue",
      "task": "wanyao-rescue",
      "map": "wanyao-outer",
      "objectId": "outerDispatch",
      "kind": "choice",
      "label": "先把苏叶接出险地",
      "detail": "本趟担架优先运人：得到她当场整理的医注，可核配青霞幡毒；会失去这次完整签押卷和箱中符药。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "wanyao-rescue",
            "id": "suye-stabilized"
          }
        ],
        "any": []
      },
      "marks": [
        "priority-chosen"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2,
      "choice": "rescue",
      "confirm": {
        "title": "确认本次选择",
        "text": "本趟担架优先运人：得到她当场整理的医注，可核配青霞幡毒；会失去这次完整签押卷和箱中符药。 取消不会记录；确认后本次选择不能改写。",
        "label": "确认此选择"
      }
    },
    "rescue-priority-evidence": {
      "id": "rescue-priority-evidence",
      "task": "wanyao-rescue",
      "map": "wanyao-outer",
      "objectId": "outerDispatch",
      "kind": "choice",
      "label": "先保全完整签押卷",
      "detail": "稳住苏叶后让她等后续接应，本趟运出次要签押原卷供后续呈证；失去战前医注与额外符药。最低主线证据仍可从内境取得。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "wanyao-rescue",
            "id": "suye-stabilized"
          }
        ],
        "any": []
      },
      "marks": [
        "priority-chosen"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2,
      "choice": "evidence",
      "confirm": {
        "title": "确认本次选择",
        "text": "稳住苏叶后让她等后续接应，本趟运出次要签押原卷供后续呈证；失去战前医注与额外符药。最低主线证据仍可从内境取得。 取消不会记录；确认后本次选择不能改写。",
        "label": "确认此选择"
      }
    },
    "rescue-priority-supplies": {
      "id": "rescue-priority-supplies",
      "task": "wanyao-rescue",
      "map": "wanyao-outer",
      "objectId": "outerDispatch",
      "kind": "choice",
      "label": "先保住有限符药箱",
      "detail": "稳住苏叶后让她等后续接应，本趟运出实际回气丹和护身符；失去战前医注及完整签押原卷。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "wanyao-rescue",
            "id": "suye-stabilized"
          }
        ],
        "any": []
      },
      "marks": [
        "priority-chosen"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2,
      "choice": "supplies",
      "confirm": {
        "title": "确认本次选择",
        "text": "稳住苏叶后让她等后续接应，本趟运出实际回气丹和护身符；失去战前医注及完整签押原卷。 取消不会记录；确认后本次选择不能改写。",
        "label": "确认此选择"
      }
    },
    "escort-suye-first": {
      "id": "escort-suye-first",
      "task": "wanyao-rescue",
      "map": "wanyao-outer",
      "objectId": "suyeRubble",
      "kind": "progress",
      "label": "发信号并把苏叶接上担架",
      "detail": "外围队接到信号后在接应线接走苏叶；她整理现场医注给你，不能再占用同一趟运力拿卷或箱。",
      "requires": {
        "all": [
          {
            "type": "choice",
            "task": "wanyao-rescue",
            "id": "rescue"
          }
        ],
        "any": []
      },
      "marks": [
        "suye-escorted",
        "priority-delivered"
      ],
      "cost": {
        "items": {},
        "supplies": {
          "rescue-stretcher": 1,
          "rescue-flare": 1
        }
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [
          "suye-clinical-notes"
        ],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "carry-signed-docket": {
      "id": "carry-signed-docket",
      "task": "wanyao-rescue",
      "map": "wanyao-outer",
      "objectId": "outerWitnessLedger",
      "kind": "progress",
      "label": "发信号转运签押证卷",
      "detail": "按原封签转交完整次要证卷，留有实物来源；苏叶仍在临时避险处待返程接应。",
      "requires": {
        "all": [
          {
            "type": "choice",
            "task": "wanyao-rescue",
            "id": "evidence"
          }
        ],
        "any": []
      },
      "marks": [
        "docket-carried",
        "priority-delivered"
      ],
      "cost": {
        "items": {},
        "supplies": {
          "rescue-stretcher": 1,
          "rescue-flare": 1
        }
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": [
          "outer-signed-docket"
        ]
      },
      "sinceRevision": 2
    },
    "carry-rescue-supplies": {
      "id": "carry-rescue-supplies",
      "task": "wanyao-rescue",
      "map": "wanyao-outer",
      "objectId": "outerSupplyCart",
      "kind": "progress",
      "label": "发信号转运有限符药",
      "detail": "实际搬出回气丹二枚与护身符二张；库存放不下则整单保留，不先消耗担架。",
      "requires": {
        "all": [
          {
            "type": "choice",
            "task": "wanyao-rescue",
            "id": "supplies"
          }
        ],
        "any": []
      },
      "marks": [
        "supplies-carried",
        "priority-delivered"
      ],
      "cost": {
        "items": {},
        "supplies": {
          "rescue-stretcher": 1,
          "rescue-flare": 1
        }
      },
      "grant": {
        "items": {
          "potion": 2,
          "ward": 2
        },
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "claim-wanyao-rescue": {
      "id": "claim-wanyao-rescue",
      "task": "wanyao-rescue",
      "map": "wanyao-outer",
      "objectId": "outerZhou",
      "kind": "claim",
      "label": "核对接应结果",
      "detail": "目标真正齐备后一次交付；满仓整单拒绝，可稍后来取。",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {
          "potion": 1
        },
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "accept-wanyao-trace": {
      "id": "accept-wanyao-trace",
      "task": "wanyao-trace",
      "map": "wanyao-inner",
      "objectId": "innerAltar",
      "kind": "accept",
      "label": "查内境实物与证人",
      "detail": "实际查坛、断线、听林清风、拓碑、验锁，区分物证与舅舅口述。",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "record-inner-altar": {
      "id": "record-inner-altar",
      "task": "wanyao-trace",
      "map": "wanyao-inner",
      "objectId": "innerAltar",
      "kind": "progress",
      "label": "记录祭坛采血槽",
      "detail": "亲眼核血线、石槽与束缚方式，留下物证，不只听阵营指控。",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "altar-read"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": [
          "altar-bloodline-record"
        ]
      },
      "sinceRevision": 2
    },
    "free-inner-captives": {
      "id": "free-inner-captives",
      "task": "wanyao-trace",
      "map": "wanyao-inner",
      "objectId": "innerCaptivePosts",
      "kind": "progress",
      "label": "断血线，交周正护送伤者",
      "detail": "逐一解开安全扣，周正带伤者沿已清外境撤出；该行动完成才记救人。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "wanyao-trace",
            "id": "altar-read"
          }
        ],
        "any": []
      },
      "marks": [
        "captives-freed"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "hear-linqingfeng": {
      "id": "hear-linqingfeng",
      "task": "wanyao-trace",
      "map": "wanyao-inner",
      "objectId": "innerLinqingfeng",
      "kind": "progress",
      "label": "听林清风说完，接药样",
      "detail": "他交付具名样本后伤重不治。没有凭空复活或已经配好的万能解药，样本必须先核适用方法。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "wanyao-trace",
            "id": "captives-freed"
          }
        ],
        "any": []
      },
      "marks": [
        "lin-heard"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {
          "neutralizer-sample": 1
        },
        "tokens": [],
        "evidence": [
          "lin-qingfeng-account"
        ]
      },
      "sinceRevision": 2
    },
    "copy-black-tablet": {
      "id": "copy-black-tablet",
      "task": "wanyao-trace",
      "map": "wanyao-inner",
      "objectId": "innerTablet",
      "kind": "progress",
      "label": "拓下黑玉碑八字",
      "detail": "记录灵矿之钥在魔在仙；不把碑纹当作已得实体钥匙。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "wanyao-trace",
            "id": "lin-heard"
          }
        ],
        "any": []
      },
      "marks": [
        "tablet-copied"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": [
          "black-tablet-rubbing"
        ]
      },
      "sinceRevision": 2
    },
    "compare-family-lock": {
      "id": "compare-family-lock",
      "task": "wanyao-trace",
      "map": "wanyao-inner",
      "objectId": "innerLockCheck",
      "kind": "progress",
      "label": "核对旧长命锁与半锁",
      "detail": "共同亲生身世与旧长命锁保留；在凌玉琅面前比对纹口，不重新发一枚长命锁，也不消耗旧物。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "wanyao-trace",
            "id": "tablet-copied"
          },
          {
            "type": "legacyToken",
            "id": "locket"
          }
        ],
        "any": []
      },
      "marks": [
        "lock-compared"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": [
          "kinship-lock-record"
        ]
      },
      "sinceRevision": 2
    },
    "receive-mine-archive": {
      "id": "receive-mine-archive",
      "task": "wanyao-trace",
      "map": "wanyao-inner",
      "objectId": "innerArchive",
      "kind": "progress",
      "label": "接矿账和执法黑令留证",
      "detail": "舅舅指明来源，林墨记录谁交来、何处得来，后卷仍须与原档签押核对。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "wanyao-trace",
            "id": "lock-compared"
          }
        ],
        "any": []
      },
      "marks": [
        "archive-received"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": [
          "mine-ledger-and-command"
        ]
      },
      "sinceRevision": 2
    },
    "check-dual-key-traces": {
      "id": "check-dual-key-traces",
      "task": "wanyao-trace",
      "map": "wanyao-inner",
      "objectId": "innerKeyTraces",
      "kind": "progress",
      "label": "核仙魔两系纹路",
      "detail": "核矿钥两系线索及天痕矿血祭的口述；不提前确认轮回碾磨，不混入天门三部件，也不发实体双钥。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "wanyao-trace",
            "id": "archive-received"
          }
        ],
        "any": []
      },
      "marks": [
        "dual-traces-checked"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": [
          "dual-key-source-record"
        ]
      },
      "sinceRevision": 2
    },
    "claim-wanyao-trace": {
      "id": "claim-wanyao-trace",
      "task": "wanyao-trace",
      "map": "wanyao-inner",
      "objectId": "innerLingyulang",
      "kind": "claim",
      "label": "封好案卷再应对追兵",
      "detail": "目标真正齐备后一次交付；满仓整单拒绝，可稍后来取。",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {
          "qingxin": 1
        },
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "accept-wanyao-breakout": {
      "id": "accept-wanyao-breakout",
      "task": "wanyao-breakout",
      "map": "wanyao-inner",
      "objectId": "innerAntidote",
      "kind": "accept",
      "label": "准备青霞截路战",
      "detail": "用真实医注核配中和药样，或选择正面护证突围；安全后亲自完成接人。",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "breakout-direct": {
      "id": "breakout-direct",
      "task": "wanyao-breakout",
      "map": "wanyao-inner",
      "objectId": "innerAntidote",
      "kind": "choice",
      "label": "正面护证突围",
      "detail": "无需医注或额外材料，面对青霞与两名幡灵；已有控制、护持、符药与装备均有效。",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "method-chosen"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2,
      "choice": "direct",
      "confirm": {
        "title": "确认本次选择",
        "text": "无需医注或额外材料，面对青霞与两名幡灵；已有控制、护持、符药与装备均有效。 取消不会记录；确认后本次选择不能改写。",
        "label": "确认此选择"
      }
    },
    "breakout-antidote": {
      "id": "breakout-antidote",
      "task": "wanyao-breakout",
      "map": "wanyao-inner",
      "objectId": "innerAntidote",
      "kind": "choice",
      "label": "依医注中和幡毒",
      "detail": "必须真正优先救出苏叶取得医注，核配林清风样本后才能削弱幡灵；医注不被消耗。",
      "requires": {
        "all": [
          {
            "type": "token",
            "id": "suye-clinical-notes"
          }
        ],
        "any": []
      },
      "marks": [
        "method-chosen"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2,
      "choice": "antidote",
      "confirm": {
        "title": "确认本次选择",
        "text": "必须真正优先救出苏叶取得医注，核配林清风样本后才能削弱幡灵；医注不被消耗。 取消不会记录；确认后本次选择不能改写。",
        "label": "确认此选择"
      }
    },
    "prepare-banner-neutralizer": {
      "id": "prepare-banner-neutralizer",
      "task": "wanyao-breakout",
      "map": "wanyao-inner",
      "objectId": "innerAntidote",
      "kind": "progress",
      "label": "按医注核配药样",
      "detail": "核对实际药样与医注适用处，整份用去一份中和样本；配好未施用不算已削弱幡。",
      "requires": {
        "all": [
          {
            "type": "choice",
            "task": "wanyao-breakout",
            "id": "antidote"
          },
          {
            "type": "token",
            "id": "suye-clinical-notes"
          }
        ],
        "any": []
      },
      "marks": [
        "antidote-made"
      ],
      "cost": {
        "items": {},
        "supplies": {
          "neutralizer-sample": 1
        }
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "deploy-banner-neutralizer": {
      "id": "deploy-banner-neutralizer",
      "task": "wanyao-breakout",
      "map": "wanyao-inner",
      "objectId": "innerSoulBanner",
      "kind": "progress",
      "label": "将已核药液施到幡面",
      "detail": "实际布置完成后，战斗采用受抑制幡灵模板；不是只把对白改成药已生效。",
      "requires": {
        "all": [
          {
            "type": "choice",
            "task": "wanyao-breakout",
            "id": "antidote"
          },
          {
            "type": "done",
            "task": "wanyao-breakout",
            "id": "antidote-made"
          }
        ],
        "any": []
      },
      "marks": [
        "antidote-deployed"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "fight-qingxia-direct": {
      "id": "fight-qingxia-direct",
      "task": "wanyao-breakout",
      "map": "wanyao-inner",
      "objectId": "innerQingxia",
      "kind": "battle",
      "label": "正面迎战青霞",
      "detail": "自动普攻与暂停下令有效；真正胜利才记录本段，失败保留已胜段，已耗普通符药不返还。",
      "requires": {
        "all": [
          {
            "type": "choice",
            "task": "wanyao-breakout",
            "id": "direct"
          }
        ],
        "any": []
      },
      "marks": [
        "direct-victory",
        "breakout-cleared"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2,
      "encounter": "qingxia-direct"
    },
    "fight-qingxia-prepared": {
      "id": "fight-qingxia-prepared",
      "task": "wanyao-breakout",
      "map": "wanyao-inner",
      "objectId": "innerQingxia",
      "kind": "battle",
      "label": "趁幡毒受抑护证突围",
      "detail": "自动普攻与暂停下令有效；真正胜利才记录本段，失败保留已胜段，已耗普通符药不返还。",
      "requires": {
        "all": [
          {
            "type": "choice",
            "task": "wanyao-breakout",
            "id": "antidote"
          },
          {
            "type": "done",
            "task": "wanyao-breakout",
            "id": "antidote-deployed"
          }
        ],
        "any": []
      },
      "marks": [
        "prepared-victory",
        "breakout-cleared"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2,
      "encounter": "qingxia-prepared"
    },
    "complete-patient-return": {
      "id": "complete-patient-return",
      "task": "wanyao-breakout",
      "map": "wanyao-outer",
      "objectId": "outerWounded",
      "kind": "progress",
      "label": "返程核齐伤者与苏叶",
      "detail": "已优先接走者核回营名册；先保卷或箱者现在亲自沿安全撤路接回苏叶。未做本步不写她已经回营。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "wanyao-breakout",
            "id": "breakout-cleared"
          }
        ],
        "any": []
      },
      "marks": [
        "return-patients"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "claim-wanyao-breakout": {
      "id": "claim-wanyao-breakout",
      "task": "wanyao-breakout",
      "map": "wanyao-outer",
      "objectId": "outerYuantong",
      "kind": "claim",
      "label": "交回救援记录与证物",
      "detail": "目标真正齐备后一次交付；满仓整单拒绝，可稍后来取。",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {
          "potion": 1,
          "tea": 1
        },
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "accept-jindan-crossroads": {
      "id": "accept-jindan-crossroads",
      "task": "jindan-crossroads",
      "map": "jindan-retreat",
      "objectId": "retreatQingwei",
      "kind": "accept",
      "label": "决定证据之后的路",
      "detail": "回山、入魔或独立查证由你明确选择；不替你改身世、宗门或道侣。",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "read-jindan-consequences": {
      "id": "read-jindan-consequences",
      "task": "jindan-crossroads",
      "map": "jindan-retreat",
      "objectId": "retreatNotes",
      "kind": "progress",
      "label": "逐条看三途后果",
      "detail": "回山走呈证与宗门对峙；入魔是明确接受另一修行道路的下一阶段；独立查证保留原证据。三者都不自动改变婚契、身世或既有宗门。",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "consequences-read"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2
    },
    "jindan-route-return": {
      "id": "jindan-route-return",
      "task": "jindan-crossroads",
      "map": "jindan-retreat",
      "objectId": "retreatQingwei",
      "kind": "choice",
      "label": "带证据回山",
      "detail": "接续七宗呈证与宗门公审目标；完整公审将在后卷继续。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "jindan-crossroads",
            "id": "consequences-read"
          }
        ],
        "any": []
      },
      "marks": [
        "route-decided"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2,
      "choice": "return",
      "confirm": {
        "title": "确认本次选择",
        "text": "接续七宗呈证与宗门公审目标；完整公审将在后卷继续。 取消不会记录；确认后本次选择不能改写。",
        "label": "确认此选择"
      }
    },
    "jindan-route-demon": {
      "id": "jindan-route-demon",
      "task": "jindan-crossroads",
      "map": "jindan-retreat",
      "objectId": "retreatQingwei",
      "kind": "choice",
      "label": "自愿赴魔域求法",
      "detail": "只登记愿赴魔域求法，尚未吞魔血或自动改换宗门；下一阶段必须再实际处理代价。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "jindan-crossroads",
            "id": "consequences-read"
          }
        ],
        "any": []
      },
      "marks": [
        "route-decided"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2,
      "choice": "demon",
      "confirm": {
        "title": "确认本次选择",
        "text": "只登记愿赴魔域求法，尚未吞魔血或自动改换宗门；下一阶段必须再实际处理代价。 取消不会记录；确认后本次选择不能改写。",
        "label": "确认此选择"
      }
    },
    "jindan-route-investigate": {
      "id": "jindan-route-investigate",
      "task": "jindan-crossroads",
      "map": "jindan-retreat",
      "objectId": "retreatQingwei",
      "kind": "choice",
      "label": "独立查证，仗剑远行",
      "detail": "接续散修/暗访证据方向，保留所有已有证据；不擅自把未获物品交给别人。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "jindan-crossroads",
            "id": "consequences-read"
          }
        ],
        "any": []
      },
      "marks": [
        "route-decided"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 2,
      "choice": "investigate",
      "confirm": {
        "title": "确认本次选择",
        "text": "接续散修/暗访证据方向，保留所有已有证据；不擅自把未获物品交给别人。 取消不会记录；确认后本次选择不能改写。",
        "label": "确认此选择"
      }
    },
    "claim-jindan-crossroads": {
      "id": "claim-jindan-crossroads",
      "task": "jindan-crossroads",
      "map": "jindan-retreat",
      "objectId": "retreatLingyun",
      "kind": "claim",
      "label": "收下已选行程副记",
      "detail": "目标真正齐备后一次交付；满仓整单拒绝，可稍后来取。",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [
          "jindan-route-order"
        ],
        "evidence": []
      },
      "sinceRevision": 2
    }
  },
  "encounters": {
    "seal-rift": {
      "id": "seal-rift",
      "title": "守住复封窗口",
      "map": "tower-seal",
      "detail": "裂隙扰动两名无主阵灵；先控制快的符灵还是先挡住石傀由玩家决定。囚中证人不是敌人。",
      "enemies": [
        {
          "id": "seal_stone",
          "kind": "stone",
          "name": "裂符石傀",
          "x": 655,
          "y": 455,
          "maxHp": 160,
          "speed": 44,
          "damage": 12
        },
        {
          "id": "seal_wisp",
          "kind": "sprite",
          "name": "游离符灵",
          "x": 780,
          "y": 465,
          "maxHp": 95,
          "speed": 66,
          "damage": 9
        }
      ],
      "returnTo": {
        "map": "garden",
        "x": 560,
        "y": 392
      }
    },
    "jindan-thunder-first": {
      "id": "jindan-thunder-first",
      "map": "jindan-retreat",
      "title": "前段雷息",
      "detail": "实际战斗，失败保留此前任务结果；无即时普通掉落。",
      "enemies": [
        {
          "id": "thunder_stone",
          "kind": "stone",
          "name": "凝雷石影",
          "x": 700,
          "y": 430,
          "maxHp": 150,
          "speed": 42,
          "damage": 11,
          "spriteKey": "campaignThunder",
          "spriteCell": 0
        },
        {
          "id": "thunder_wisp",
          "kind": "sprite",
          "name": "散雷游灵",
          "x": 820,
          "y": 490,
          "maxHp": 90,
          "speed": 60,
          "damage": 8,
          "spriteKey": "campaignSpark",
          "spriteCell": 0
        }
      ],
      "returnTo": {
        "map": "jindan-retreat",
        "x": 640,
        "y": 650
      },
      "sinceRevision": 2
    },
    "jindan-heart-trial": {
      "id": "jindan-heart-trial",
      "map": "jindan-retreat",
      "title": "护心破魇",
      "detail": "实际战斗，失败保留此前任务结果；无即时普通掉落。",
      "enemies": [
        {
          "id": "heart_left",
          "kind": "sprite",
          "name": "疑心之魇",
          "x": 470,
          "y": 440,
          "maxHp": 130,
          "speed": 62,
          "damage": 10,
          "spriteKey": "campaignNightmare",
          "spriteCell": 0
        },
        {
          "id": "heart_right",
          "kind": "sprite",
          "name": "复仇之魇",
          "x": 790,
          "y": 440,
          "maxHp": 130,
          "speed": 62,
          "damage": 10,
          "spriteKey": "campaignNightmare",
          "spriteCell": 0
        }
      ],
      "returnTo": {
        "map": "jindan-retreat",
        "x": 640,
        "y": 650
      },
      "sinceRevision": 2
    },
    "jindan-core-stable": {
      "id": "jindan-core-stable",
      "map": "jindan-retreat",
      "title": "收束末段雷劫",
      "detail": "实际战斗，失败保留此前任务结果；无即时普通掉落。",
      "enemies": [
        {
          "id": "core_thunder",
          "kind": "stone",
          "name": "九雷凝影",
          "x": 640,
          "y": 435,
          "maxHp": 260,
          "speed": 40,
          "damage": 14,
          "spriteKey": "campaignThunder",
          "spriteCell": 0
        },
        {
          "id": "core_wisp",
          "kind": "sprite",
          "name": "逆流雷息",
          "x": 850,
          "y": 540,
          "maxHp": 100,
          "speed": 58,
          "damage": 9,
          "spriteKey": "campaignSpark",
          "spriteCell": 0
        }
      ],
      "returnTo": {
        "map": "jindan-retreat",
        "x": 640,
        "y": 650
      },
      "sinceRevision": 2
    },
    "wanyao-pursuers": {
      "id": "wanyao-pursuers",
      "map": "wanyao-outer",
      "title": "外境同门救援",
      "detail": "实际战斗，失败保留此前任务结果；无即时普通掉落。",
      "enemies": [
        {
          "id": "wanyao_captain",
          "kind": "stone",
          "name": "追击妖校",
          "x": 760,
          "y": 410,
          "maxHp": 300,
          "speed": 48,
          "damage": 16,
          "spriteKey": "campaignCaptain",
          "spriteCell": 0
        },
        {
          "id": "wanyao_spirit",
          "kind": "sprite",
          "name": "裂隙妖灵",
          "x": 865,
          "y": 465,
          "maxHp": 170,
          "speed": 70,
          "damage": 11,
          "spriteKey": "campaignRiftSpirit",
          "spriteCell": 0
        }
      ],
      "returnTo": {
        "map": "wanyao-outer",
        "x": 640,
        "y": 650
      },
      "sinceRevision": 2
    },
    "qingxia-direct": {
      "id": "qingxia-direct",
      "map": "wanyao-inner",
      "title": "正面护证突围",
      "detail": "实际战斗，失败保留此前任务结果；无即时普通掉落。",
      "enemies": [
        {
          "id": "qingxia",
          "kind": "stone",
          "name": "青霞",
          "x": 830,
          "y": 480,
          "maxHp": 360,
          "speed": 52,
          "damage": 17,
          "spriteKey": "campaignQingxia",
          "spriteCell": 0,
          "atlas": "jindanPeopleA",
          "cell": 1
        },
        {
          "id": "banner_left",
          "kind": "sprite",
          "name": "左幡魂影",
          "x": 700,
          "y": 515,
          "maxHp": 160,
          "speed": 65,
          "damage": 12,
          "spriteKey": "campaignBannerShade",
          "spriteCell": 0
        },
        {
          "id": "banner_right",
          "kind": "sprite",
          "name": "右幡魂影",
          "x": 930,
          "y": 575,
          "maxHp": 160,
          "speed": 65,
          "damage": 12,
          "spriteKey": "campaignBannerShade",
          "spriteCell": 0
        }
      ],
      "returnTo": {
        "map": "wanyao-outer",
        "x": 640,
        "y": 650
      },
      "sinceRevision": 2
    },
    "qingxia-prepared": {
      "id": "qingxia-prepared",
      "map": "wanyao-inner",
      "title": "药液抑幡后的突围",
      "detail": "实际战斗，失败保留此前任务结果；无即时普通掉落。",
      "enemies": [
        {
          "id": "qingxia",
          "kind": "stone",
          "name": "青霞",
          "x": 830,
          "y": 480,
          "maxHp": 360,
          "speed": 52,
          "damage": 17,
          "spriteKey": "campaignQingxia",
          "spriteCell": 0,
          "atlas": "jindanPeopleA",
          "cell": 1
        },
        {
          "id": "banner_suppressed",
          "kind": "sprite",
          "name": "受抑幡魂影",
          "x": 930,
          "y": 575,
          "maxHp": 90,
          "speed": 48,
          "damage": 6,
          "spriteKey": "campaignBannerShade",
          "spriteCell": 0
        }
      ],
      "returnTo": {
        "map": "wanyao-outer",
        "x": 640,
        "y": 650
      },
      "sinceRevision": 2
    }
  },
  "supplies": {
    "duty-water": {
      "title": "值夜符水",
      "max": 3,
      "usage": "值役执事按三盘定额调制，只添塔中符水盘；不能饮用、炼丹或出售。"
    },
    "seal-clay": {
      "title": "复封朱泥",
      "max": 1,
      "usage": "封印库按本次裂缝配的一盒朱泥，三锚最后合封时整份用去。"
    },
    "rubbing-paper": {
      "title": "封缄拓纸",
      "max": 1,
      "usage": "带留证格的专用拓纸，只用于这次石壁血字，不代替普通符纸。"
    },
    "fever-sample": {
      "title": "退热药样",
      "max": 2,
      "usage": "阿杏按此行旅病案指定的两份鲜药样；只用于这份汤剂，不是青灵草库存。"
    },
    "decoction-water": {
      "title": "净煎水",
      "max": 1,
      "usage": "阿杏净瓶中的定量煎药水；不同于可饮用或炼丹的普通山泉水。"
    },
    "storm-kit": {
      "title": "导雷稳息包",
      "max": 1,
      "usage": "只用于本次闭关坪的铜杆接地与稳息布置。",
      "sinceRevision": 2
    },
    "rescue-dressing": {
      "title": "定额止血包",
      "max": 1,
      "usage": "本次用于苏叶伤处固定与止血，不能代替普通战斗药品。",
      "sinceRevision": 2
    },
    "rescue-stretcher": {
      "title": "折叠接应担架",
      "max": 1,
      "usage": "仅够本次抢救窗口的一趟运载，人、证卷、符药择一。",
      "sinceRevision": 2
    },
    "rescue-flare": {
      "title": "接应信号筒",
      "max": 1,
      "usage": "发一次接应信号，把本次担架与外围接应队对上。",
      "sinceRevision": 2
    },
    "neutralizer-sample": {
      "title": "林清风的中和药样",
      "max": 1,
      "usage": "具名交付的幡毒中和样本，需医注核配后才能安全用于幡面。",
      "sinceRevision": 2
    }
  },
  "tokens": {
    "duty-mirror": {
      "id": "duty-mirror",
      "title": "值役铜镜",
      "source": {
        "task": "tower-duty",
        "on": "accept"
      },
      "sourceRefs": [
        {
          "file": "src/lib/story/volume2.ts",
          "line": 732,
          "node": "zhuji_tower_duty_start"
        }
      ],
      "description": "照见幻相的值役工具，不提供战斗属性，不可炼制。"
    },
    "duty-talisman": {
      "id": "duty-talisman",
      "title": "锁妖塔值役符验",
      "source": {
        "task": "tower-duty",
        "on": "accept"
      },
      "sourceRefs": [
        {
          "file": "src/lib/story/volume2.ts",
          "line": 732,
          "node": "zhuji_tower_duty_start"
        }
      ],
      "description": "登记过的值役凭据，不是行囊护身符。"
    },
    "duty-pass": {
      "id": "duty-pass",
      "title": "六层值查准簿",
      "source": {
        "task": "tower-duty",
        "on": "claimed"
      },
      "sourceRefs": [
        {
          "file": "src/lib/story/volume2.ts",
          "line": 732,
          "node": "zhuji_tower_duty_start"
        },
        {
          "file": "src/lib/story/volume2.ts",
          "line": 779,
          "node": "zhuji_tower_night3"
        }
      ],
      "description": "已完成低层值查，准许核查六层封印。"
    },
    "upper-pass": {
      "id": "upper-pass",
      "title": "七层通行复验记",
      "source": {
        "task": "tower-seal",
        "on": "claimed"
      },
      "sourceRefs": [
        {
          "file": "src/lib/story/volume2.ts",
          "line": 779,
          "node": "zhuji_tower_night3"
        }
      ],
      "description": "复封守阵或具证静行已经核验，准许查七层；不把绕行记成击败。"
    },
    "tower-case-copy": {
      "id": "tower-case-copy",
      "title": "锁妖塔复核副卷",
      "source": {
        "task": "tower-review",
        "on": "claimed"
      },
      "sourceRefs": [
        {
          "file": "src/lib/story/volume2.ts",
          "line": 1008,
          "node": "zhuji_back_debrief"
        }
      ],
      "description": "清微收卷后的副本，将事实、证词和疑点分栏。"
    },
    "apricot-case-notes": {
      "id": "apricot-case-notes",
      "title": "春雨医案札",
      "source": {
        "task": "apricot-aid",
        "on": "claimed"
      },
      "sourceRefs": [
        {
          "file": "src/lib/story/branch_mortal.ts",
          "line": 108,
          "node": "female_common_axing_jinlan"
        },
        {
          "file": "src/lib/story/branch_mortal.ts",
          "line": 615,
          "node": "mortal_herb_manual_gate"
        }
      ],
      "description": "阿杏与林墨共同署名的救助记录；朋友与亲近均可取得。"
    },
    "jindan-preparation": {
      "id": "jindan-preparation",
      "title": "金丹准备札",
      "source": {
        "task": "m2-handoff",
        "on": "claimed"
      },
      "sourceRefs": [
        {
          "file": "src/lib/story/volume2.ts",
          "line": 1008,
          "node": "zhuji_back_debrief"
        }
      ],
      "description": "下一卷修行准备的线索，尚不解锁金丹属性或高境界玩法。"
    },
    "suye-clinical-notes": {
      "id": "suye-clinical-notes",
      "title": "苏叶的现场医注",
      "source": {
        "task": "wanyao-rescue",
        "on": "suye-escorted"
      },
      "description": "优先把苏叶护送出险后，她留下可当场校准幡毒药样的医注。",
      "sourceRefs": [
        {
          "file": "src/lib/story/volume3.ts",
          "line": 974,
          "node": "jindan_mid_save_suye"
        }
      ],
      "sinceRevision": 2
    },
    "jindan-route-order": {
      "id": "jindan-route-order",
      "title": "金丹卷后续去向",
      "source": {
        "task": "jindan-crossroads",
        "on": "claimed"
      },
      "description": "只登记本次明确选择的下一步目标；不宣称后续结局已经完成。",
      "sourceRefs": [
        {
          "file": "src/lib/story/volume3.ts",
          "line": 227,
          "node": "jindan_secret_realm_choice"
        }
      ],
      "sinceRevision": 2
    }
  },
  "evidence": {
    "fox-testimony": {
      "id": "fox-testimony",
      "title": "老狐口述",
      "source": {
        "task": "tower-duty",
        "on": "fox-heard"
      },
      "sourceRefs": [
        {
          "file": "src/lib/story/volume2.ts",
          "line": 747,
          "node": "zhuji_tower_night1"
        }
      ],
      "description": "老狐认出三尾气息，称凝霜是好妖；它并未目击灵矿案，只提醒七层的话需付代价。"
    },
    "bear-testimony": {
      "id": "bear-testimony",
      "title": "熊妖所见",
      "source": {
        "task": "tower-duty",
        "on": "bear-heard"
      },
      "sourceRefs": [
        {
          "file": "src/lib/story/volume2.ts",
          "line": 763,
          "node": "zhuji_tower_night2"
        }
      ],
      "description": "熊妖曾见青衫持钝剑的年轻人下七层，次日听到“入魔逃走”的说法；人物身份待交叉核对。"
    },
    "seal-slip": {
      "id": "seal-slip",
      "title": "禁制滑痕",
      "source": {
        "task": "tower-seal",
        "on": "fracture-read"
      },
      "sourceRefs": [
        {
          "file": "src/lib/story/volume2.ts",
          "line": 779,
          "node": "zhuji_tower_night3"
        }
      ],
      "description": "裂纹像灵力绕过，不是粗暴破门；与清微一脉手法相似，尚不足以指认某人。"
    },
    "mirror-illusion": {
      "id": "mirror-illusion",
      "title": "铜镜辨伪记录",
      "source": {
        "task": "tower-trace",
        "on": "mirror-verified"
      },
      "sourceRefs": [
        {
          "file": "src/lib/story/volume2.ts",
          "line": 835,
          "node": "zhuji_tower_7_mirror"
        }
      ],
      "description": "镜中绑架影像与眼前实物、侧灯反射和已知人事不符；不把幻相登记为实际伤亡。"
    },
    "wall-blood": {
      "id": "wall-blood",
      "title": "血字拓片",
      "source": {
        "task": "tower-trace",
        "on": "blood-copied"
      },
      "sourceRefs": [
        {
          "file": "src/lib/story/volume2.ts",
          "line": 851,
          "node": "zhuji_tower_7_blood"
        }
      ],
      "description": "残文提及灵矿案、蜀山内门与玄玑子；末笔残缺，不将三点水自行补为某个人名。"
    },
    "tunnel-witness": {
      "id": "tunnel-witness",
      "title": "密道会面笔录",
      "source": {
        "task": "tower-trace",
        "on": "lingyun-heard"
      },
      "sourceRefs": [
        {
          "file": "src/lib/story/volume2.ts",
          "line": 919,
          "node": "zhuji_tower_tunnel_1"
        },
        {
          "file": "src/lib/story/volume2.ts",
          "line": 938,
          "node": "zhuji_tower_tunnel_2"
        }
      ],
      "description": "凌云子说明密道通向师父住处，并称陈玄可能受心蛊操控；这是具名口述，尚需后卷独立证据。"
    },
    "master-review": {
      "id": "master-review",
      "title": "清微复核意见",
      "source": {
        "task": "tower-review",
        "on": "review-recorded"
      },
      "sourceRefs": [
        {
          "file": "src/lib/story/volume2.ts",
          "line": 959,
          "node": "zhuji_tower_back"
        },
        {
          "file": "src/lib/story/volume2.ts",
          "line": 1008,
          "node": "zhuji_back_debrief"
        }
      ],
      "description": "证人可证明的范围分别记录；玄玑嫌疑加重，陈玄责任仍需核实，先保全证人与副卷。"
    },
    "outer-signed-docket": {
      "id": "outer-signed-docket",
      "title": "抢救出的完整签押卷",
      "source": {
        "task": "wanyao-rescue",
        "on": "docket-carried"
      },
      "description": "有限运力保全的额外签押原卷；主线最低证据不依赖它，后续呈证可比对。",
      "sourceRefs": [
        {
          "file": "src/lib/story/volume3.ts",
          "line": 986,
          "node": "jindan_mid_altar"
        }
      ],
      "sinceRevision": 2
    },
    "tianji-offer-record": {
      "id": "tianji-offer-record",
      "title": "天机阁来意笔记",
      "source": {
        "task": "tianji-negotiation",
        "on": "offer-decided"
      },
      "description": "玄玑以副堂主金令与免赴秘境拉拢。林墨未受职，记下他提前知道血亲之事的疑点。",
      "sourceRefs": [
        {
          "file": "src/lib/story/volume3.ts",
          "line": 463,
          "node": "jindan_xuanji_offer_detail"
        }
      ],
      "sinceRevision": 2
    },
    "altar-bloodline-record": {
      "id": "altar-bloodline-record",
      "title": "祭坛血线实录",
      "source": {
        "task": "wanyao-trace",
        "on": "altar-read"
      },
      "description": "亲见血线束缚伤者与采血槽，不由阵营名号决定谁有罪。",
      "sourceRefs": [
        {
          "file": "src/lib/story/volume3.ts",
          "line": 986,
          "node": "jindan_mid_altar"
        }
      ],
      "sinceRevision": 2
    },
    "lin-qingfeng-account": {
      "id": "lin-qingfeng-account",
      "title": "林清风最后口述",
      "source": {
        "task": "wanyao-trace",
        "on": "lin-heard"
      },
      "description": "林清风具名交付中和药样并陈述青霞施害；口述与实物分开留存，不虚写已救活。",
      "sourceRefs": [
        {
          "file": "src/lib/story/volume3.ts",
          "line": 996,
          "node": "jindan_neiyu_linqingfeng"
        }
      ],
      "sinceRevision": 2
    },
    "black-tablet-rubbing": {
      "id": "black-tablet-rubbing",
      "title": "黑玉碑八字拓记",
      "source": {
        "task": "wanyao-trace",
        "on": "tablet-copied"
      },
      "description": "碑文为“灵矿之钥，在魔在仙”；不是已经取得两把钥匙。",
      "sourceRefs": [
        {
          "file": "src/lib/story/volume3.ts",
          "line": 710,
          "node": "jindan_stone_tablet"
        }
      ],
      "sinceRevision": 2
    },
    "kinship-lock-record": {
      "id": "kinship-lock-record",
      "title": "两半铜锁核验记",
      "source": {
        "task": "wanyao-trace",
        "on": "lock-compared"
      },
      "description": "既有长命锁与凌玉琅所带半锁相合，结合旧案记录确认亲缘；不复制或消耗旧信物。",
      "sourceRefs": [
        {
          "file": "src/lib/story/volume3.ts",
          "line": 1009,
          "node": "jindan_uncle_half_lock"
        }
      ],
      "sinceRevision": 2
    },
    "mine-ledger-and-command": {
      "id": "mine-ledger-and-command",
      "title": "矿账与执法黑令记录",
      "source": {
        "task": "wanyao-trace",
        "on": "archive-received"
      },
      "description": "舅舅交付账册与黑令，来源需在后卷与执法堂原件、签押继续核对。",
      "sourceRefs": [
        {
          "file": "src/lib/story/volume3.ts",
          "line": 710,
          "node": "jindan_stone_tablet"
        }
      ],
      "sinceRevision": 2
    },
    "dual-key-source-record": {
      "id": "dual-key-source-record",
      "title": "仙魔双钥来源口述",
      "source": {
        "task": "wanyao-trace",
        "on": "dual-traces-checked"
      },
      "description": "矿钥分仙魔两系的碑纹与具名口述；不与天门三部件混同，不提前认定天门最终真相。",
      "sourceRefs": [
        {
          "file": "src/lib/story/volume3.ts",
          "line": 1022,
          "node": "jindan_uncle_tianhen"
        }
      ],
      "sinceRevision": 2
    }
  },
  "people": {
    "xuandu": {
      "id": "xuandu",
      "name": "玄都",
      "role": "值役执事",
      "sourceRefs": [
        {
          "file": "src/lib/story/volume2.ts",
          "line": 732,
          "node": "zhuji_tower_duty_start"
        }
      ],
      "goal": "让值役弟子按规矩检查封印，不把被囚者一概当作攻击目标。"
    },
    "old-fox": {
      "id": "old-fox",
      "name": "老狐",
      "role": "塔中证人",
      "sourceRefs": [
        {
          "file": "src/lib/story/volume2.ts",
          "line": 747,
          "node": "zhuji_tower_night1"
        }
      ],
      "goal": "保住同囚者，提醒林墨别以自己的魂魄购买未经证实的话。"
    },
    "tower-bear": {
      "id": "tower-bear",
      "name": "熊妖",
      "role": "塔中证人",
      "sourceRefs": [
        {
          "file": "src/lib/story/volume2.ts",
          "line": 763,
          "node": "zhuji_tower_night2"
        }
      ],
      "goal": "说出自己见过的青衫年轻人，与外界“入魔逃亡”的说法区分。"
    },
    "lingyun": {
      "id": "lingyun",
      "name": "凌云子",
      "role": "大师兄",
      "sourceRefs": [
        {
          "file": "src/lib/story/volume2.ts",
          "line": 894,
          "node": "zhuji_tower"
        },
        {
          "file": "src/lib/story/volume2.ts",
          "line": 919,
          "node": "zhuji_tower_tunnel_1"
        }
      ],
      "goal": "把林墨带回师父处，同时留下自己愿意承担责任的口述。"
    },
    "qingwei": {
      "id": "qingwei",
      "name": "清微",
      "role": "师父",
      "sourceRefs": [
        {
          "file": "src/lib/story/volume2.ts",
          "line": 1008,
          "node": "zhuji_back_debrief"
        }
      ],
      "goal": "收妥证据与疑点，承认有待解释的往事，安排后续结丹与查证。"
    },
    "axing": {
      "id": "axing",
      "name": "阿杏",
      "age": 22,
      "gender": "female",
      "role": "采药人",
      "sourceRefs": [
        {
          "file": "src/lib/story/branch_mortal.ts",
          "line": 65,
          "node": "mortal_village"
        },
        {
          "file": "src/lib/story/branch_mortal.ts",
          "line": 108,
          "node": "female_common_axing_jinlan"
        }
      ],
      "adapted": true,
      "metSource": {
        "task": "apricot-aid",
        "on": "accept"
      },
      "relationshipTask": "apricot-aid",
      "relationshipChoices": {
        "friend": {
          "stage": "同行朋友",
          "detail": "共同医案已留下，你们以朋友相待。"
        },
        "close": {
          "stage": "愿再相见",
          "detail": "双方愿意慢慢相识；尚未确认为恋人或道侣。"
        }
      },
      "goal": "学会独立辨药和照护，让行旅与村中女子能安心来医庐求助。",
      "boundary": "这一段是成年提前相识；亲近须明确回应，亦可保持朋友，不自动恋爱或结契。",
      "portrait": {
        "atlas": "campaignPeople",
        "cell": 0
      }
    },
    "traveler": {
      "id": "traveler",
      "name": "发热的行旅",
      "age": 34,
      "role": "被救助者",
      "adapted": true,
      "goal": "退热后自行回家；不是奖励箱或感情交换条件。"
    },
    "xuanji": {
      "id": "xuanji",
      "name": "玄玑子",
      "role": "蜀山太师伯",
      "portrait": {
        "atlas": "jindanPeopleA",
        "cell": 0
      },
      "sinceRevision": 2
    },
    "qingxia": {
      "id": "qingxia",
      "name": "青霞",
      "role": "丹鼎派修士",
      "portrait": {
        "atlas": "jindanPeopleA",
        "cell": 1
      },
      "sinceRevision": 2
    },
    "lingyulang": {
      "id": "lingyulang",
      "name": "凌玉琅",
      "role": "魔尊与母亲的幼弟",
      "portrait": {
        "atlas": "jindanPeopleA",
        "cell": 2
      },
      "sinceRevision": 2
    },
    "suye": {
      "id": "suye",
      "name": "苏叶",
      "role": "百草堂女医",
      "portrait": {
        "atlas": "jindanPeopleA",
        "cell": 3
      },
      "sinceRevision": 2,
      "age": 27,
      "adapted": true,
      "goal": "护住伤者并把能救更多人的医注留下；不是奖励箱或自动恋爱对象。",
      "metSource": {
        "task": "wanyao-rescue",
        "on": "suye-stabilized"
      }
    },
    "yuantong": {
      "id": "yuantong",
      "name": "圆通",
      "role": "法华寺僧人",
      "portrait": {
        "atlas": "jindanPeopleB",
        "cell": 0
      },
      "sinceRevision": 2
    },
    "liuruyan": {
      "id": "liuruyan",
      "name": "柳如烟",
      "role": "合欢宗宗主",
      "portrait": {
        "atlas": "jindanPeopleB",
        "cell": 1
      },
      "sinceRevision": 2
    },
    "zhouzheng": {
      "id": "zhouzheng",
      "name": "周正",
      "role": "同行弟子",
      "portrait": {
        "atlas": "jindanPeopleB",
        "cell": 2
      },
      "sinceRevision": 2
    },
    "linqingfeng": {
      "id": "linqingfeng",
      "name": "林清风",
      "role": "丹鼎派修士",
      "portrait": {
        "atlas": "jindanPeopleB",
        "cell": 3
      },
      "sinceRevision": 2
    }
  },
  "endingCatalog": [],
  "meta": {
    "draft": false,
    "stage": "M3",
    "date": "2026-11-13",
    "scope": "筑基锁妖塔与成年阿杏、金丹三段劫、天机阁、万妖救援与三途入口；终章与终局仍待后续实现。",
    "sourceRoot": "src/lib/story/",
    "anchors": {
      "duty": {
        "file": "src/lib/story/volume2.ts",
        "line": 732,
        "node": "zhuji_tower_duty_start"
      },
      "fox": {
        "file": "src/lib/story/volume2.ts",
        "line": 747,
        "node": "zhuji_tower_night1"
      },
      "bear": {
        "file": "src/lib/story/volume2.ts",
        "line": 763,
        "node": "zhuji_tower_night2"
      },
      "seal": {
        "file": "src/lib/story/volume2.ts",
        "line": 779,
        "node": "zhuji_tower_night3"
      },
      "warning": {
        "file": "src/lib/story/volume2.ts",
        "line": 795,
        "node": "zhuji_tower_night4"
      },
      "upper": {
        "file": "src/lib/story/volume2.ts",
        "line": 815,
        "node": "zhuji_tower_7_entry"
      },
      "mirror": {
        "file": "src/lib/story/volume2.ts",
        "line": 835,
        "node": "zhuji_tower_7_mirror"
      },
      "blood": {
        "file": "src/lib/story/volume2.ts",
        "line": 851,
        "node": "zhuji_tower_7_blood"
      },
      "voice": {
        "file": "src/lib/story/volume2.ts",
        "line": 872,
        "node": "zhuji_tower_7_voice"
      },
      "tunnel": {
        "file": "src/lib/story/volume2.ts",
        "line": 894,
        "node": "zhuji_tower"
      },
      "lingyun": {
        "file": "src/lib/story/volume2.ts",
        "line": 919,
        "node": "zhuji_tower_tunnel_1"
      },
      "heartGu": {
        "file": "src/lib/story/volume2.ts",
        "line": 938,
        "node": "zhuji_tower_tunnel_2"
      },
      "return": {
        "file": "src/lib/story/volume2.ts",
        "line": 959,
        "node": "zhuji_tower_back"
      },
      "review": {
        "file": "src/lib/story/volume2.ts",
        "line": 1008,
        "node": "zhuji_back_debrief"
      },
      "axing": {
        "file": "src/lib/story/branch_mortal.ts",
        "line": 65,
        "node": "mortal_village"
      },
      "clinic": {
        "file": "src/lib/story/branch_mortal.ts",
        "line": 108,
        "node": "female_common_axing_jinlan"
      },
      "medicine": {
        "file": "src/lib/story/branch_mortal.ts",
        "line": 615,
        "node": "mortal_herb_manual_gate"
      },
      "m3-seed": {
        "file": "src/lib/story/volume3.ts",
        "line": 18,
        "node": "jindan_seed"
      },
      "m3-thunder": {
        "file": "src/lib/story/volume3.ts",
        "line": 284,
        "node": "jindan_thunder_1"
      },
      "m3-heart": {
        "file": "src/lib/story/volume3.ts",
        "line": 320,
        "node": "jindan_thunder_4"
      },
      "m3-core": {
        "file": "src/lib/story/volume3.ts",
        "line": 337,
        "node": "jindan_thunder_5"
      },
      "m3-pavilion": {
        "file": "src/lib/story/volume3.ts",
        "line": 420,
        "node": "jindan_tianji_pavilion"
      },
      "m3-offer": {
        "file": "src/lib/story/volume3.ts",
        "line": 463,
        "node": "jindan_xuanji_offer_detail"
      },
      "m3-assembly": {
        "file": "src/lib/story/volume3.ts",
        "line": 523,
        "node": "jindan_prep_detail_2"
      },
      "m3-well": {
        "file": "src/lib/story/volume3.ts",
        "line": 572,
        "node": "jindan_well_accident"
      },
      "m3-rescue": {
        "file": "src/lib/story/volume3.ts",
        "line": 136,
        "node": "jindan_secret_realm_rescue"
      },
      "m3-suye": {
        "file": "src/lib/story/volume3.ts",
        "line": 974,
        "node": "jindan_mid_save_suye"
      },
      "m3-altar": {
        "file": "src/lib/story/volume3.ts",
        "line": 986,
        "node": "jindan_mid_altar"
      },
      "m3-lin": {
        "file": "src/lib/story/volume3.ts",
        "line": 996,
        "node": "jindan_neiyu_linqingfeng"
      },
      "m3-tablet": {
        "file": "src/lib/story/volume3.ts",
        "line": 710,
        "node": "jindan_stone_tablet"
      },
      "m3-lock": {
        "file": "src/lib/story/volume3.ts",
        "line": 1009,
        "node": "jindan_uncle_half_lock"
      },
      "m3-mine": {
        "file": "src/lib/story/volume3.ts",
        "line": 1022,
        "node": "jindan_uncle_tianhen"
      },
      "m3-qingxia": {
        "file": "src/lib/story/volume3.ts",
        "line": 1048,
        "node": "jindan_qingxia_30"
      },
      "m3-flight": {
        "file": "src/lib/story/volume3.ts",
        "line": 1058,
        "node": "jindan_qingxia_defeat"
      },
      "m3-fork": {
        "file": "src/lib/story/volume3.ts",
        "line": 227,
        "node": "jindan_secret_realm_choice"
      }
    },
    "geometry": {
      "width": 1280,
      "height": 760,
      "playerSafeBounds": {
        "minX": 40,
        "maxX": 1240,
        "minY": 70,
        "maxY": 710
      },
      "interactDistanceExclusive": 93,
      "minimumWalkableRatio": 0.7,
      "artStatus": "四张本地原画已逐图检查并校准墙脚，正式图格已对应；70%设计目标偏差见v1.4地图与剧情锚点核对。"
    },
    "compatibility": {
      "legacyVersion": 4,
      "campaignSchema": 1,
      "chapterRankRemains": 4,
      "mutatesRuntimeOnRequire": "register-maps-only",
      "primaryTask": "m2-handoff",
      "optionalTasks": [
        "apricot-aid"
      ],
      "relationshipDerivedFrom": {
        "task": "apricot-aid",
        "choices": [
          "friend",
          "close"
        ],
        "partnerId": null
      }
    },
    "invariants": [
      "地图、任务、动作、证据与物品ID均为有限枚举。",
      "领取任务奖励仅claim一次，满仓不扣料、不写claimed。",
      "采料progress各有独有marks，只能执行一次；来源与消耗按done与sequence严格守恒。",
      "序列前两步不扣料不发奖，错序只清sequence；最后正确一步整份预检后扣料并写marks。",
      "战斗启动无任务耗材cost，无即时掉落；胜利才写battle action.marks，失败保留先前证据与任务耗材使用记录。",
      "所有任务耗材不可用于普通炼制/出售，错序不消耗；主线从普通行囊零材料也能以实际采集完成。",
      "药站、旧阵、五身世与首章状态不写入本数据，不修改旧存档贡献守恒。",
      "图鉴、状态与任务日志只读；办理须真实地图和距离。",
      "残响不登记成已确认人名；不在M2展示天门碾磨、九十九世或分魂真相。",
      "阿杏朋友/亲近同实用奖；杏花村不作为主线交接门槛；最终道侣仍null。"
    ],
    "adaptations": [
      {
        "kind": "source-order",
        "detail": "把原七层压成三个不同几何区段，保留低层证人、六层封印、七层镜室和密道；值夜由空间任务表达，不等待七个真实夜晚。"
      },
      {
        "kind": "spoiler-delay",
        "source": {
          "file": "src/lib/story/volume2.ts",
          "line": 1008,
          "node": "zhuji_back_debrief"
        },
        "detail": "原师徒夜话已经谈到天门与碾磨；按本版揭密节奏仅复核可证事实，将残响身份和天门真相延至后卷，不照搬早泄文本。"
      },
      {
        "kind": "character-age-and-order",
        "source": {
          "file": "src/lib/story/branch_mortal.ts",
          "line": 65,
          "node": "mortal_village"
        },
        "detail": "原归凡线阿杏初见年龄与时序不直接照搬；本版提前设置22岁相识及共同救助，恋爱尚未确认，女女终局仍属后续补写。"
      },
      {
        "kind": "gameplay",
        "detail": "三盘添水、三锚复封/守阵、三步验镜、指定药样采煎及此处奖励/敌人数据为互动版新增，不冒称原作已有可玩系统。"
      }
    ],
    "traversalWitnesses": {
      "main": [
        "accept-tower-duty",
        "enter-tower",
        "issue-duty-water",
        "fill-duty-west",
        "fill-duty-east",
        "fill-duty-north",
        "hear-old-fox",
        "hear-tower-bear",
        "record-tower-duty",
        "claim-tower-duty",
        "duty-up",
        "accept-tower-seal",
        "inspect-seal-slip",
        "choose-seal-repair",
        "take-seal-clay",
        "seal-west",
        "seal-middle",
        "seal-east",
        "defend-seal-rift",
        "claim-tower-seal",
        "seal-up",
        "accept-tower-trace",
        "take-rubbing-paper",
        "mirror-edge",
        "mirror-light",
        "mirror-present",
        "copy-wall-blood",
        "refuse-echo",
        "find-tower-tunnel",
        "hear-lingyun",
        "claim-tower-trace",
        "tunnel-return",
        "accept-tower-review",
        "compare-tower-records",
        "claim-tower-review",
        "accept-m2-handoff",
        "read-jindan-plan",
        "claim-m2-handoff"
      ],
      "optionalAid": [
        "enter-apricot",
        "accept-apricot-aid",
        "read-apricot-case",
        "gather-apricot-west",
        "gather-apricot-east",
        "draw-apricot-water",
        "apricot-crush",
        "apricot-soak",
        "apricot-simmer",
        "deliver-apricot-care",
        "apricot-friend",
        "claim-apricot-aid",
        "apricot-return"
      ],
      "bypassSeal": [
        "choose-seal-bypass",
        "bypass-measure-west",
        "bypass-measure-east",
        "bypass-combine-standard",
        "confirm-seal-bypass",
        "claim-tower-seal",
        "seal-up"
      ],
      "methods": {
        "background": {
          "rain": "bypass-method-rain",
          "poor": "bypass-method-poor",
          "beggar": "bypass-method-beggar",
          "caravan": "bypass-method-caravan",
          "demon": "bypass-method-demon"
        },
        "origin": {
          "sword": "bypass-method-sword",
          "medicine": "bypass-method-medicine",
          "scholar": "bypass-method-scholar"
        }
      },
      "m3": [
        "enter-jindan-retreat",
        "accept-jindan-preparation",
        "read-retreat-notes",
        "take-storm-kit",
        "ground-retreat-rods",
        "prepare-focus-steady",
        "claim-jindan-preparation",
        "accept-jindan-tribulation",
        "fight-thunder-first",
        "settle-heart-trial",
        "fight-heart-trial",
        "fight-core-stable",
        "stabilize-jindan-breath",
        "claim-jindan-realm",
        "enter-tianji",
        "accept-tianji-negotiation",
        "read-tianji-invite",
        "read-tianji-archive",
        "hear-tianji-offer",
        "tianji-refuse",
        "claim-tianji-negotiation",
        "accept-wanyao-assembly",
        "read-southern-route",
        "brief-southern-companions",
        "tianji-return",
        "take-rescue-tools",
        "claim-wanyao-assembly",
        "enter-wanyao",
        "accept-wanyao-rescue",
        "fight-outer-pursuers",
        "secure-shen-retreat",
        "stabilize-suye",
        "rescue-priority-rescue",
        "escort-suye-first",
        "claim-wanyao-rescue",
        "outer-inner",
        "accept-wanyao-trace",
        "record-inner-altar",
        "free-inner-captives",
        "hear-linqingfeng",
        "copy-black-tablet",
        "compare-family-lock",
        "receive-mine-archive",
        "check-dual-key-traces",
        "claim-wanyao-trace",
        "accept-wanyao-breakout",
        "breakout-antidote",
        "prepare-banner-neutralizer",
        "deploy-banner-neutralizer",
        "fight-qingxia-prepared",
        "inner-outer",
        "complete-patient-return",
        "claim-wanyao-breakout",
        "outer-return",
        "accept-jindan-crossroads",
        "read-jindan-consequences",
        "jindan-route-return",
        "claim-jindan-crossroads"
      ],
      "m3Variants": {
        "rescue": {
          "rescue": [
            "rescue-priority-rescue",
            "escort-suye-first"
          ],
          "evidence": [
            "rescue-priority-evidence",
            "carry-signed-docket"
          ],
          "supplies": [
            "rescue-priority-supplies",
            "carry-rescue-supplies"
          ]
        },
        "breakout": {
          "antidote": [
            "breakout-antidote",
            "prepare-banner-neutralizer",
            "deploy-banner-neutralizer",
            "fight-qingxia-prepared"
          ],
          "direct": [
            "breakout-direct",
            "fight-qingxia-direct"
          ]
        },
        "routes": {
          "return": "jindan-route-return",
          "demon": "jindan-route-demon",
          "investigate": "jindan-route-investigate"
        },
        "focus": {
          "steady": "prepare-focus-steady",
          "sword": "prepare-focus-sword",
          "medicine": "prepare-focus-medicine",
          "scholar": "prepare-focus-scholar"
        }
      }
    },
    "m3": {
      "status": "integrated-awaiting-release-validation",
      "taskIds": [
        "jindan-preparation",
        "jindan-tribulation",
        "tianji-negotiation",
        "wanyao-assembly",
        "wanyao-rescue",
        "wanyao-trace",
        "wanyao-breakout",
        "jindan-crossroads"
      ],
      "mapIds": [
        "jindan-retreat",
        "tianji-pavilion",
        "wanyao-outer",
        "wanyao-inner"
      ],
      "ordinaryRewardRule": "M3有限实物交付progress与claim都须整单预检并唯一receipt；战斗仍无即时掉落。",
      "cultivation": "chapter.rank/profile.rank保持4，真实金丹数值仅从已领取突破任务派生。",
      "adaptations": [
        "原九雷合并为三段真战，不作精准按键考核。",
        "救援有限运力使人/次要签押卷/符药不能全取，最低主线证据公共可得。",
        "原intelligence条件不代替解药来源；本版真实医注与药样决定抑幡模板。",
        "双钥口述与天门三部件分开，不虚发实体钥、不提前揭最终碾磨真相。",
        "主角五身世保持共同亲生身世；女性称谓与寄养经历独立适配。",
        "苏叶27岁为互动版成年设定，原文未明确该年龄。"
      ]
    }
  },
  "realms": {
    "jindan": {
      "id": "jindan",
      "name": "金丹初期",
      "source": {
        "task": "jindan-tribulation",
        "on": "claimed"
      },
      "profile": {
        "blade": 32,
        "spell": 0.75,
        "defence": 0.3,
        "regen": 3
      },
      "bodyRules": [
        "金丹气机自循环提高真实灵力恢复；暂停和对话不推进恢复。",
        "气血与灵力上限仍为100，伤势与消耗仍需治疗和护持。",
        "不再以饮食维生或经期调养为必需；灵膳可用于增益与相处，亲近意愿保留。"
      ],
      "next": "元婴准备（后续制作中）",
      "sinceRevision": 2
    }
  },
  "chapterLabel": "跨章行程 · 筑基与金丹"
};
if(typeof module==='object'&&module.exports)module.exports=data;else root.XiuxianCampaignSchemaV2=data;
})(globalThis);
