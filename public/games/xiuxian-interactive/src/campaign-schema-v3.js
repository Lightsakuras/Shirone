(function(root){
'use strict';
// Frozen M4 definition from 94015e8; source SHA256 a7a488b0e51b70c0d755453146c4c9c03bce8060021a4f03fc3187e61abf992c. No map registration.
const data={
  "schema": 1,
  "revision": 3,
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
        },
        {
          "id": "retreatNorthGate",
          "name": "赴北荒避劫谷",
          "x": 1180,
          "y": 610,
          "kind": "campaignObject",
          "role": "portal",
          "atlas": null,
          "cell": null,
          "height": 0,
          "sinceRevision": 3
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
    },
    "beihuang-retreat": {
      "name": "北荒 · 避劫谷",
      "sub": "旧矿、亲人护法与元婴雷劫",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "jindan-crossroads",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "jindan"
          }
        ],
        "any": []
      },
      "walls": [
        {
          "x": 0,
          "y": 0,
          "w": 1280,
          "h": 85
        },
        {
          "x": 0,
          "y": 85,
          "w": 25,
          "h": 645
        },
        {
          "x": 1255,
          "y": 85,
          "w": 25,
          "h": 645
        },
        {
          "x": 0,
          "y": 730,
          "w": 1280,
          "h": 30
        },
        {
          "x": 0,
          "y": 0,
          "w": 1280,
          "h": 115
        },
        {
          "x": 0,
          "y": 115,
          "w": 100,
          "h": 170
        },
        {
          "x": 110,
          "y": 170,
          "w": 190,
          "h": 65
        },
        {
          "x": 145,
          "y": 235,
          "w": 150,
          "h": 25
        },
        {
          "x": 1030,
          "y": 125,
          "w": 210,
          "h": 140
        },
        {
          "x": 1000,
          "y": 160,
          "w": 50,
          "h": 100
        },
        {
          "x": 1150,
          "y": 260,
          "w": 130,
          "h": 100
        },
        {
          "x": 1220,
          "y": 360,
          "w": 60,
          "h": 190
        },
        {
          "x": 0,
          "y": 290,
          "w": 40,
          "h": 245
        },
        {
          "x": 0,
          "y": 535,
          "w": 120,
          "h": 70
        },
        {
          "x": 0,
          "y": 605,
          "w": 210,
          "h": 50
        },
        {
          "x": 0,
          "y": 655,
          "w": 440,
          "h": 40
        },
        {
          "x": 0,
          "y": 695,
          "w": 520,
          "h": 65
        },
        {
          "x": 1120,
          "y": 555,
          "w": 160,
          "h": 60
        },
        {
          "x": 1040,
          "y": 615,
          "w": 240,
          "h": 50
        },
        {
          "x": 830,
          "y": 665,
          "w": 450,
          "h": 95
        }
      ],
      "objects": [
        {
          "id": "northQingweiLetter",
          "name": "师门玉简",
          "x": 240,
          "y": 300,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsA",
          "cell": 2,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "northKit",
          "name": "避劫与救护包",
          "x": 300,
          "y": 535,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsA",
          "cell": 0,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "northGroundWest",
          "name": "西导雷钉",
          "x": 400,
          "y": 300,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "jindanPropsA",
          "cell": 0,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "northGroundEast",
          "name": "东导雷钉",
          "x": 890,
          "y": 300,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "jindanPropsA",
          "cell": 0,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "northTrial",
          "name": "结婴阵眼",
          "x": 640,
          "y": 250,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "jindanPropsA",
          "cell": 1,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "northLingyulang",
          "name": "凌玉琅",
          "x": 1050,
          "y": 390,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "jindanPeopleA",
          "cell": 2,
          "height": 110,
          "sinceRevision": 3,
          "personId": "lingyulang"
        },
        {
          "id": "northWoundedLingyun",
          "name": "凌云子",
          "x": 250,
          "y": 400,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "campaignPeople",
          "cell": 1,
          "height": 110,
          "sinceRevision": 3,
          "personId": "lingyun"
        },
        {
          "id": "northShen",
          "name": "沈灵薇",
          "x": 950,
          "y": 560,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "characters",
          "cell": 8,
          "height": 110,
          "sinceRevision": 3,
          "personId": "shen"
        },
        {
          "id": "northMineLock",
          "name": "双系矿柜锁",
          "x": 1080,
          "y": 320,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsA",
          "cell": 6,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "northMineProbeA",
          "name": "采血槽核查札",
          "x": 900,
          "y": 180,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsA",
          "cell": 3,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "northMineProbeB",
          "name": "矿石运输单",
          "x": 900,
          "y": 425,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsA",
          "cell": 3,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "northMineProbeC",
          "name": "检修匣封签",
          "x": 1100,
          "y": 520,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsA",
          "cell": 3,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "northReturn",
          "name": "返回后山整备",
          "x": 640,
          "y": 665,
          "kind": "campaignObject",
          "role": "portal",
          "atlas": null,
          "cell": null,
          "height": 0,
          "sinceRevision": 3
        },
        {
          "id": "northSummitGate",
          "name": "赴金顶议事庭",
          "x": 1130,
          "y": 440,
          "kind": "campaignObject",
          "role": "portal",
          "atlas": null,
          "cell": null,
          "height": 0,
          "sinceRevision": 3
        }
      ],
      "artKey": "beihuang-retreat",
      "width": 1280,
      "height": 760,
      "entry": {
        "x": 640,
        "y": 650
      },
      "sources": [
        {
          "file": "src/lib/story/volume4.ts",
          "line": 454,
          "node": "yuanying_beihuang_arrive"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 466,
          "node": "yuanying_thunder_1"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 479,
          "node": "yuanying_uncle_comes"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 524,
          "node": "yuanying_birth"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 41,
          "node": "yuanying_save_lingyun"
        },
        {
          "file": "src/lib/story/volume3.ts",
          "line": 1022,
          "node": "jindan_uncle_tianhen"
        },
        {
          "file": "src/lib/story/volume3.ts",
          "line": 1022,
          "node": "jindan_uncle_tianhen"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 815,
          "node": "huashen_trial_prep"
        }
      ],
      "artAudit": {
        "file": "assets/art-v160/beihuang-retreat.webp",
        "method": "逐图目视校准墙脚、台边、岩体、沟壑与云外边界；低台阶和地面阵纹可行走。",
        "date": "2026-11-13"
      },
      "sinceRevision": 3
    },
    "golden-summit": {
      "name": "金顶 · 议事庭",
      "sub": "七宗试剑、呈证与公开会审",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "northbound-rescue",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "yuanying"
          }
        ],
        "any": []
      },
      "walls": [
        {
          "x": 0,
          "y": 0,
          "w": 1280,
          "h": 85
        },
        {
          "x": 0,
          "y": 85,
          "w": 25,
          "h": 645
        },
        {
          "x": 1255,
          "y": 85,
          "w": 25,
          "h": 645
        },
        {
          "x": 0,
          "y": 730,
          "w": 1280,
          "h": 30
        },
        {
          "x": 0,
          "y": 0,
          "w": 1280,
          "h": 125
        },
        {
          "x": 0,
          "y": 125,
          "w": 100,
          "h": 65
        },
        {
          "x": 0,
          "y": 190,
          "w": 80,
          "h": 105
        },
        {
          "x": 0,
          "y": 295,
          "w": 60,
          "h": 130
        },
        {
          "x": 0,
          "y": 425,
          "w": 40,
          "h": 180
        },
        {
          "x": 1180,
          "y": 125,
          "w": 100,
          "h": 100
        },
        {
          "x": 1200,
          "y": 225,
          "w": 80,
          "h": 125
        },
        {
          "x": 1220,
          "y": 350,
          "w": 60,
          "h": 170
        },
        {
          "x": 1240,
          "y": 520,
          "w": 40,
          "h": 100
        },
        {
          "x": 116,
          "y": 200,
          "w": 155,
          "h": 60
        },
        {
          "x": 1040,
          "y": 190,
          "w": 125,
          "h": 105
        },
        {
          "x": 0,
          "y": 660,
          "w": 480,
          "h": 100
        },
        {
          "x": 800,
          "y": 660,
          "w": 480,
          "h": 100
        },
        {
          "x": 0,
          "y": 630,
          "w": 120,
          "h": 30
        },
        {
          "x": 1160,
          "y": 625,
          "w": 120,
          "h": 35
        }
      ],
      "objects": [
        {
          "id": "summitClerk",
          "name": "会审执事",
          "x": 200,
          "y": 320,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "m4PeopleB",
          "cell": 3,
          "height": 105,
          "sinceRevision": 3,
          "personId": "summit-clerk"
        },
        {
          "id": "summitArchive",
          "name": "查封矿账案",
          "x": 190,
          "y": 285,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsA",
          "cell": 3,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "summitEvidenceDesk",
          "name": "会审呈证案",
          "x": 430,
          "y": 210,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsA",
          "cell": 3,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "summitWitnessLingyun",
          "name": "凌云子",
          "x": 330,
          "y": 490,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "campaignPeople",
          "cell": 1,
          "height": 110,
          "sinceRevision": 3,
          "personId": "lingyun"
        },
        {
          "id": "summitWitnessLiu",
          "name": "柳如烟",
          "x": 980,
          "y": 440,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "jindanPeopleB",
          "cell": 1,
          "height": 110,
          "sinceRevision": 3,
          "personId": "liuruyan"
        },
        {
          "id": "summitTrialCircle",
          "name": "七宗试剑台",
          "x": 640,
          "y": 370,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "jindanPropsA",
          "cell": 1,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "summitXuanji",
          "name": "玄玑子",
          "x": 650,
          "y": 155,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "jindanPeopleA",
          "cell": 0,
          "height": 110,
          "sinceRevision": 3,
          "personId": "xuanji"
        },
        {
          "id": "summitQingwei",
          "name": "清微",
          "x": 920,
          "y": 200,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "chapterPeople",
          "cell": 3,
          "height": 110,
          "sinceRevision": 3,
          "personId": "qingwei"
        },
        {
          "id": "summitCustody",
          "name": "青霞",
          "x": 1100,
          "y": 335,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "m4PeopleA",
          "cell": 1,
          "height": 105,
          "sinceRevision": 3,
          "personId": "qingxia"
        },
        {
          "id": "summitNameTablets",
          "name": "遇害者具名录",
          "x": 800,
          "y": 520,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsA",
          "cell": 3,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "summitSwordSeal",
          "name": "守心复核座",
          "x": 480,
          "y": 530,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsC",
          "cell": 6,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "summitCliffGate",
          "name": "赴问道崖",
          "x": 1170,
          "y": 565,
          "kind": "campaignObject",
          "role": "portal",
          "atlas": null,
          "cell": null,
          "height": 0,
          "sinceRevision": 3
        },
        {
          "id": "summitCommonsGate",
          "name": "回蜀山山门",
          "x": 1000,
          "y": 595,
          "kind": "campaignObject",
          "role": "portal",
          "atlas": null,
          "cell": null,
          "height": 0,
          "sinceRevision": 3
        },
        {
          "id": "summitReturn",
          "name": "回北荒谷",
          "x": 640,
          "y": 665,
          "kind": "campaignObject",
          "role": "portal",
          "atlas": null,
          "cell": null,
          "height": 0,
          "sinceRevision": 3
        }
      ],
      "artKey": "golden-summit",
      "width": 1280,
      "height": 760,
      "entry": {
        "x": 640,
        "y": 650
      },
      "sources": [
        {
          "file": "src/lib/story/volume4.ts",
          "line": 650,
          "node": "yuanying_debate_evidence"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 593,
          "node": "yuanying_debate_arrive"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 607,
          "node": "yuanying_debate_sword_1"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 666,
          "node": "yuanying_debate_betray"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 760,
          "node": "huashen_battle_final"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 791,
          "node": "huashen_breakthrough"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 815,
          "node": "huashen_trial_prep"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 856,
          "node": "huashen_trial_sentence"
        }
      ],
      "artAudit": {
        "file": "assets/art-v160/golden-summit.webp",
        "method": "逐图目视校准墙脚、台边、岩体、沟壑与云外边界；低台阶和地面阵纹可行走。",
        "date": "2026-11-13"
      },
      "sinceRevision": 3
    },
    "heart-cliff": {
      "name": "问道崖 · 父书残壁",
      "sub": "绳路或破阵，实地读父书",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "summit-rebellion",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "yuanying"
          }
        ],
        "any": []
      },
      "walls": [
        {
          "x": 0,
          "y": 0,
          "w": 1280,
          "h": 85
        },
        {
          "x": 0,
          "y": 85,
          "w": 25,
          "h": 645
        },
        {
          "x": 1255,
          "y": 85,
          "w": 25,
          "h": 645
        },
        {
          "x": 0,
          "y": 730,
          "w": 1280,
          "h": 30
        },
        {
          "x": 0,
          "y": 0,
          "w": 1280,
          "h": 105
        },
        {
          "x": 0,
          "y": 105,
          "w": 45,
          "h": 50
        },
        {
          "x": 0,
          "y": 155,
          "w": 90,
          "h": 65
        },
        {
          "x": 0,
          "y": 220,
          "w": 65,
          "h": 120
        },
        {
          "x": 0,
          "y": 340,
          "w": 80,
          "h": 60
        },
        {
          "x": 0,
          "y": 400,
          "w": 120,
          "h": 55
        },
        {
          "x": 0,
          "y": 455,
          "w": 205,
          "h": 45
        },
        {
          "x": 0,
          "y": 500,
          "w": 245,
          "h": 40
        },
        {
          "x": 0,
          "y": 540,
          "w": 190,
          "h": 70
        },
        {
          "x": 0,
          "y": 610,
          "w": 215,
          "h": 55
        },
        {
          "x": 0,
          "y": 665,
          "w": 300,
          "h": 45
        },
        {
          "x": 0,
          "y": 710,
          "w": 375,
          "h": 50
        },
        {
          "x": 1100,
          "y": 105,
          "w": 180,
          "h": 50
        },
        {
          "x": 1170,
          "y": 155,
          "w": 110,
          "h": 70
        },
        {
          "x": 1210,
          "y": 225,
          "w": 70,
          "h": 125
        },
        {
          "x": 1190,
          "y": 350,
          "w": 90,
          "h": 70
        },
        {
          "x": 1160,
          "y": 420,
          "w": 120,
          "h": 70
        },
        {
          "x": 1130,
          "y": 490,
          "w": 150,
          "h": 75
        },
        {
          "x": 1080,
          "y": 565,
          "w": 200,
          "h": 55
        },
        {
          "x": 1010,
          "y": 620,
          "w": 270,
          "h": 50
        },
        {
          "x": 935,
          "y": 670,
          "w": 345,
          "h": 50
        },
        {
          "x": 810,
          "y": 720,
          "w": 470,
          "h": 40
        },
        {
          "x": 300,
          "y": 120,
          "w": 165,
          "h": 50
        },
        {
          "x": 265,
          "y": 170,
          "w": 230,
          "h": 75
        },
        {
          "x": 230,
          "y": 245,
          "w": 290,
          "h": 85
        },
        {
          "x": 260,
          "y": 330,
          "w": 170,
          "h": 65
        },
        {
          "x": 315,
          "y": 395,
          "w": 95,
          "h": 25
        },
        {
          "x": 985,
          "y": 260,
          "w": 160,
          "h": 70
        },
        {
          "x": 920,
          "y": 330,
          "w": 200,
          "h": 75
        },
        {
          "x": 850,
          "y": 405,
          "w": 190,
          "h": 80
        },
        {
          "x": 760,
          "y": 485,
          "w": 195,
          "h": 50
        }
      ],
      "objects": [
        {
          "id": "cliffRopeChest",
          "name": "登崖绳具匣",
          "x": 190,
          "y": 590,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsA",
          "cell": 0,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "cliffSwordArray",
          "name": "残剑阵眼",
          "x": 440,
          "y": 470,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "jindanPropsA",
          "cell": 1,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "cliffRopeWest",
          "name": "西绳扣",
          "x": 210,
          "y": 390,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsA",
          "cell": 0,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "cliffRopeMiddle",
          "name": "承重扣",
          "x": 600,
          "y": 270,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsA",
          "cell": 0,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "cliffRopeEast",
          "name": "落绳扣",
          "x": 760,
          "y": 230,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsA",
          "cell": 0,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "cliffSutra",
          "name": "飞升偈石面",
          "x": 335,
          "y": 130,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsA",
          "cell": 7,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "cliffFatherLetter",
          "name": "父书血字石面",
          "x": 900,
          "y": 130,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsB",
          "cell": 0,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "cliffHeartPractice",
          "name": "守心练剑处",
          "x": 670,
          "y": 425,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "jindanPropsA",
          "cell": 1,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "cliffRescueBell",
          "name": "回援铜铃",
          "x": 1000,
          "y": 555,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "sectProps",
          "cell": 0,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "cliffReturn",
          "name": "回金顶",
          "x": 640,
          "y": 665,
          "kind": "campaignObject",
          "role": "portal",
          "atlas": null,
          "cell": null,
          "height": 0,
          "sinceRevision": 3
        }
      ],
      "artKey": "heart-cliff",
      "width": 1280,
      "height": 760,
      "entry": {
        "x": 640,
        "y": 650
      },
      "sources": [
        {
          "file": "src/lib/story/volume4.ts",
          "line": 711,
          "node": "yuanying_cliff_wall"
        }
      ],
      "artAudit": {
        "file": "assets/art-v160/heart-cliff.webp",
        "method": "逐图目视校准墙脚、台边、岩体、沟壑与云外边界；低台阶和地面阵纹可行走。",
        "date": "2026-11-13"
      },
      "sinceRevision": 3
    },
    "shushan-commons": {
      "name": "蜀山 · 山门与义塾",
      "sub": "门规、安置、互市与十年复核",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "huashen-trial",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "huashen"
          }
        ],
        "any": []
      },
      "walls": [
        {
          "x": 0,
          "y": 0,
          "w": 1280,
          "h": 85
        },
        {
          "x": 0,
          "y": 85,
          "w": 25,
          "h": 645
        },
        {
          "x": 1255,
          "y": 85,
          "w": 25,
          "h": 645
        },
        {
          "x": 0,
          "y": 730,
          "w": 1280,
          "h": 30
        },
        {
          "x": 0,
          "y": 0,
          "w": 1280,
          "h": 105
        },
        {
          "x": 0,
          "y": 105,
          "w": 365,
          "h": 115
        },
        {
          "x": 45,
          "y": 220,
          "w": 255,
          "h": 40
        },
        {
          "x": 0,
          "y": 260,
          "w": 95,
          "h": 55
        },
        {
          "x": 1040,
          "y": 145,
          "w": 240,
          "h": 100
        },
        {
          "x": 1195,
          "y": 245,
          "w": 85,
          "h": 80
        },
        {
          "x": 0,
          "y": 450,
          "w": 210,
          "h": 175
        },
        {
          "x": 0,
          "y": 625,
          "w": 110,
          "h": 45
        },
        {
          "x": 0,
          "y": 700,
          "w": 135,
          "h": 60
        },
        {
          "x": 1120,
          "y": 700,
          "w": 160,
          "h": 60
        }
      ],
      "objects": [
        {
          "id": "commonsCharter",
          "name": "新门规公示案",
          "x": 460,
          "y": 185,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsB",
          "cell": 1,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "commonsAppealDesk",
          "name": "刑期申诉案",
          "x": 680,
          "y": 185,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsB",
          "cell": 1,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "commonsOldElder",
          "name": "离任长老",
          "x": 350,
          "y": 330,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "m4PeopleB",
          "cell": 2,
          "height": 105,
          "sinceRevision": 3,
          "personId": "old-elder"
        },
        {
          "id": "commonsSchool",
          "name": "义塾备课案",
          "x": 180,
          "y": 280,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsB",
          "cell": 2,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "commonsChildRoll",
          "name": "安置与学籍册",
          "x": 260,
          "y": 435,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsB",
          "cell": 2,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "commonsLingyunTeacher",
          "name": "凌云子",
          "x": 440,
          "y": 490,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "campaignPeople",
          "cell": 1,
          "height": 110,
          "sinceRevision": 3,
          "personId": "lingyun"
        },
        {
          "id": "commonsAchen",
          "name": "阿辰",
          "x": 550,
          "y": 550,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "m4PeopleA",
          "cell": 2,
          "height": 65,
          "sinceRevision": 3,
          "personId": "achen",
          "hidden": true
        },
        {
          "id": "commonsSuye",
          "name": "苏叶",
          "x": 770,
          "y": 510,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "jindanPeopleA",
          "cell": 3,
          "height": 110,
          "sinceRevision": 3,
          "personId": "suye"
        },
        {
          "id": "commonsTradeLedger",
          "name": "两界互市账",
          "x": 1080,
          "y": 290,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsB",
          "cell": 3,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "commonsScale",
          "name": "互市衡器",
          "x": 980,
          "y": 410,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsB",
          "cell": 3,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "commonsWagon",
          "name": "首批商货",
          "x": 1040,
          "y": 550,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsB",
          "cell": 3,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "commonsReviewSeal",
          "name": "十年履约案",
          "x": 680,
          "y": 350,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsB",
          "cell": 1,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "commonsQingweiChair",
          "name": "清微",
          "x": 860,
          "y": 210,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "chapterPeople",
          "cell": 3,
          "height": 110,
          "sinceRevision": 3,
          "personId": "qingwei"
        },
        {
          "id": "commonsMemorial",
          "name": "寺方托付处",
          "x": 115,
          "y": 410,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsD",
          "cell": 4,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "commonsCampGate",
          "name": "赴联军战营",
          "x": 1180,
          "y": 630,
          "kind": "campaignObject",
          "role": "portal",
          "atlas": null,
          "cell": null,
          "height": 0,
          "sinceRevision": 3
        },
        {
          "id": "commonsHeavenGate",
          "name": "赴天门前台",
          "x": 1000,
          "y": 650,
          "kind": "campaignObject",
          "role": "portal",
          "atlas": null,
          "cell": null,
          "height": 0,
          "sinceRevision": 3
        },
        {
          "id": "commonsReturn",
          "name": "回金顶",
          "x": 640,
          "y": 665,
          "kind": "campaignObject",
          "role": "portal",
          "atlas": null,
          "cell": null,
          "height": 0,
          "sinceRevision": 3
        }
      ],
      "artKey": "shushan-commons",
      "width": 1280,
      "height": 760,
      "entry": {
        "x": 640,
        "y": 650
      },
      "sources": [
        {
          "file": "src/lib/story/volume4.ts",
          "line": 873,
          "node": "huashen_year_1"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 936,
          "node": "huashen_year_3_school"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 985,
          "node": "huashen_year_6_reform"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 998,
          "node": "huashen_year_7_disciple"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 1015,
          "node": "huashen_year_8_yuantong_nirvana"
        },
        {
          "file": "src/lib/story/endings.ts",
          "line": 45,
          "node": "ending_dao"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 1283,
          "node": "heti_aftermath"
        }
      ],
      "artAudit": {
        "file": "assets/art-v160/shushan-commons.webp",
        "method": "逐图目视校准墙脚、台边、岩体、沟壑与云外边界；低台阶和地面阵纹可行走。",
        "date": "2026-11-13"
      },
      "sinceRevision": 3
    },
    "alliance-camp": {
      "name": "联军 · 北伐战营",
      "sub": "合体整备、职责与双线调度",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "governance-review",
            "status": "claimed"
          },
          {
            "type": "choice",
            "task": "governance-review",
            "id": "continue"
          },
          {
            "type": "realm",
            "id": "huashen"
          }
        ],
        "any": []
      },
      "walls": [
        {
          "x": 0,
          "y": 0,
          "w": 1280,
          "h": 85
        },
        {
          "x": 0,
          "y": 85,
          "w": 25,
          "h": 645
        },
        {
          "x": 1255,
          "y": 85,
          "w": 25,
          "h": 645
        },
        {
          "x": 0,
          "y": 730,
          "w": 1280,
          "h": 30
        },
        {
          "x": 0,
          "y": 0,
          "w": 550,
          "h": 150
        },
        {
          "x": 740,
          "y": 0,
          "w": 540,
          "h": 150
        },
        {
          "x": 40,
          "y": 150,
          "w": 280,
          "h": 120
        },
        {
          "x": 70,
          "y": 270,
          "w": 205,
          "h": 20
        },
        {
          "x": 1000,
          "y": 150,
          "w": 250,
          "h": 130
        },
        {
          "x": 65,
          "y": 440,
          "w": 205,
          "h": 85
        },
        {
          "x": 0,
          "y": 300,
          "w": 65,
          "h": 125
        },
        {
          "x": 1235,
          "y": 300,
          "w": 45,
          "h": 135
        },
        {
          "x": 0,
          "y": 690,
          "w": 420,
          "h": 70
        },
        {
          "x": 880,
          "y": 690,
          "w": 400,
          "h": 70
        }
      ],
      "objects": [
        {
          "id": "campWarTable",
          "name": "两线军议图",
          "x": 640,
          "y": 250,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsD",
          "cell": 6,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "campLingyulang",
          "name": "凌玉琅",
          "x": 390,
          "y": 290,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "jindanPeopleA",
          "cell": 2,
          "height": 110,
          "sinceRevision": 3,
          "personId": "lingyulang"
        },
        {
          "id": "campNewAbbot",
          "name": "法华寺新方丈",
          "x": 930,
          "y": 290,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "m4PeopleB",
          "cell": 1,
          "height": 105,
          "sinceRevision": 3,
          "personId": "new-abbot"
        },
        {
          "id": "campSupply",
          "name": "战线定额架",
          "x": 230,
          "y": 390,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsD",
          "cell": 7,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "campMedic",
          "name": "苏叶",
          "x": 1050,
          "y": 440,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "jindanPeopleA",
          "cell": 3,
          "height": 110,
          "sinceRevision": 3,
          "personId": "suye"
        },
        {
          "id": "campRedBanner",
          "name": "仙魔协约旗",
          "x": 750,
          "y": 400,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsB",
          "cell": 4,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "campLotusSeed",
          "name": "苦莲子护匣",
          "x": 900,
          "y": 520,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsB",
          "cell": 5,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "campSwordAnvil",
          "name": "守心剑交接架",
          "x": 390,
          "y": 520,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsC",
          "cell": 0,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "campFusionTrial",
          "name": "身识合流阵",
          "x": 640,
          "y": 465,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "jindanPropsA",
          "cell": 1,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "campWestGate",
          "name": "赴归墟西线",
          "x": 100,
          "y": 650,
          "kind": "campaignObject",
          "role": "portal",
          "atlas": null,
          "cell": null,
          "height": 0,
          "sinceRevision": 3
        },
        {
          "id": "campEastGate",
          "name": "赴归墟东线",
          "x": 1180,
          "y": 650,
          "kind": "campaignObject",
          "role": "portal",
          "atlas": null,
          "cell": null,
          "height": 0,
          "sinceRevision": 3
        },
        {
          "id": "campCoreGate",
          "name": "赴归墟核心",
          "x": 640,
          "y": 135,
          "kind": "campaignObject",
          "role": "portal",
          "atlas": null,
          "cell": null,
          "height": 0,
          "sinceRevision": 3
        },
        {
          "id": "campReturn",
          "name": "回山门整备",
          "x": 640,
          "y": 665,
          "kind": "campaignObject",
          "role": "portal",
          "atlas": null,
          "cell": null,
          "height": 0,
          "sinceRevision": 3
        }
      ],
      "artKey": "alliance-camp",
      "width": 1280,
      "height": 760,
      "entry": {
        "x": 640,
        "y": 650
      },
      "sources": [
        {
          "file": "src/lib/story/volume4.ts",
          "line": 1056,
          "node": "huashen_muster"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 1070,
          "node": "huashen_march"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 1070,
          "node": "huashen_march"
        }
      ],
      "artAudit": {
        "file": "assets/art-v160/alliance-camp.webp",
        "method": "逐图目视校准墙脚、台边、岩体、沟壑与云外边界；低台阶和地面阵纹可行走。",
        "date": "2026-11-13"
      },
      "sinceRevision": 3
    },
    "guixu-west": {
      "name": "归墟 · 莲华西线",
      "sub": "三处阵锚与护持的代价",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "war-order",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "heti"
          }
        ],
        "any": [
          {
            "type": "choice",
            "task": "war-order",
            "id": "west-first"
          },
          {
            "type": "task",
            "id": "war-east",
            "status": "claimed"
          }
        ]
      },
      "walls": [
        {
          "x": 0,
          "y": 0,
          "w": 1280,
          "h": 85
        },
        {
          "x": 0,
          "y": 85,
          "w": 25,
          "h": 645
        },
        {
          "x": 1255,
          "y": 85,
          "w": 25,
          "h": 645
        },
        {
          "x": 0,
          "y": 730,
          "w": 1280,
          "h": 30
        },
        {
          "x": 0,
          "y": 0,
          "w": 1280,
          "h": 85
        },
        {
          "x": 0,
          "y": 85,
          "w": 280,
          "h": 40
        },
        {
          "x": 1010,
          "y": 85,
          "w": 270,
          "h": 40
        },
        {
          "x": 70,
          "y": 210,
          "w": 110,
          "h": 55
        },
        {
          "x": 180,
          "y": 185,
          "w": 115,
          "h": 55
        },
        {
          "x": 270,
          "y": 160,
          "w": 50,
          "h": 60
        },
        {
          "x": 1045,
          "y": 280,
          "w": 140,
          "h": 70
        },
        {
          "x": 1105,
          "y": 350,
          "w": 150,
          "h": 60
        },
        {
          "x": 0,
          "y": 420,
          "w": 85,
          "h": 65
        },
        {
          "x": 0,
          "y": 680,
          "w": 170,
          "h": 80
        },
        {
          "x": 170,
          "y": 700,
          "w": 165,
          "h": 60
        },
        {
          "x": 1030,
          "y": 695,
          "w": 250,
          "h": 65
        }
      ],
      "objects": [
        {
          "id": "westEntryBoard",
          "name": "西线裂损图",
          "x": 570,
          "y": 575,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsD",
          "cell": 6,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "westLotusAnchor",
          "name": "莲华中锚",
          "x": 640,
          "y": 250,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsD",
          "cell": 5,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "westAnchorLeft",
          "name": "莲华左锚",
          "x": 360,
          "y": 420,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsD",
          "cell": 5,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "westAnchorRight",
          "name": "莲华右锚",
          "x": 920,
          "y": 420,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsD",
          "cell": 5,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "westLingyun",
          "name": "凌云子",
          "x": 630,
          "y": 380,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "campaignPeople",
          "cell": 1,
          "height": 110,
          "sinceRevision": 3,
          "personId": "lingyun"
        },
        {
          "id": "westSupplyRuin",
          "name": "断阵修复处",
          "x": 200,
          "y": 300,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsB",
          "cell": 6,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "westPuppetGate",
          "name": "巨傀压境处",
          "x": 750,
          "y": 175,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "jindanPropsA",
          "cell": 1,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "westReturn",
          "name": "回战营",
          "x": 640,
          "y": 665,
          "kind": "campaignObject",
          "role": "portal",
          "atlas": null,
          "cell": null,
          "height": 0,
          "sinceRevision": 3
        }
      ],
      "artKey": "guixu-west",
      "width": 1280,
      "height": 760,
      "entry": {
        "x": 640,
        "y": 650
      },
      "sources": [
        {
          "file": "src/lib/story/volume4.ts",
          "line": 1154,
          "node": "heti_day_2"
        }
      ],
      "artAudit": {
        "file": "assets/art-v160/guixu-west.webp",
        "method": "逐图目视校准墙脚、台边、岩体、沟壑与云外边界；低台阶和地面阵纹可行走。",
        "date": "2026-11-13"
      },
      "sinceRevision": 3
    },
    "guixu-east": {
      "name": "归墟 · 东线伤营",
      "sub": "先稳伤处，再交接撤离",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "war-order",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "heti"
          }
        ],
        "any": [
          {
            "type": "choice",
            "task": "war-order",
            "id": "east-first"
          },
          {
            "type": "task",
            "id": "war-west",
            "status": "claimed"
          }
        ]
      },
      "walls": [
        {
          "x": 0,
          "y": 0,
          "w": 1280,
          "h": 85
        },
        {
          "x": 0,
          "y": 85,
          "w": 25,
          "h": 645
        },
        {
          "x": 1255,
          "y": 85,
          "w": 25,
          "h": 645
        },
        {
          "x": 0,
          "y": 730,
          "w": 1280,
          "h": 30
        },
        {
          "x": 0,
          "y": 0,
          "w": 1280,
          "h": 105
        },
        {
          "x": 0,
          "y": 105,
          "w": 180,
          "h": 655
        },
        {
          "x": 180,
          "y": 210,
          "w": 15,
          "h": 70
        },
        {
          "x": 180,
          "y": 550,
          "w": 20,
          "h": 60
        },
        {
          "x": 230,
          "y": 80,
          "w": 245,
          "h": 45
        },
        {
          "x": 850,
          "y": 80,
          "w": 245,
          "h": 45
        },
        {
          "x": 1110,
          "y": 195,
          "w": 115,
          "h": 70
        },
        {
          "x": 1060,
          "y": 250,
          "w": 110,
          "h": 30
        },
        {
          "x": 1120,
          "y": 420,
          "w": 115,
          "h": 70
        },
        {
          "x": 1070,
          "y": 485,
          "w": 105,
          "h": 20
        },
        {
          "x": 1125,
          "y": 620,
          "w": 155,
          "h": 45
        },
        {
          "x": 1190,
          "y": 130,
          "w": 90,
          "h": 45
        }
      ],
      "objects": [
        {
          "id": "eastEntryBoard",
          "name": "伤营位置图",
          "x": 550,
          "y": 580,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsD",
          "cell": 6,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "eastSuye",
          "name": "苏叶",
          "x": 260,
          "y": 300,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "jindanPeopleA",
          "cell": 3,
          "height": 110,
          "sinceRevision": 3,
          "personId": "suye"
        },
        {
          "id": "eastAchen",
          "name": "十四岁阿辰",
          "x": 600,
          "y": 340,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "m4PeopleA",
          "cell": 3,
          "height": 85,
          "sinceRevision": 3,
          "personId": "achen"
        },
        {
          "id": "eastWounded",
          "name": "伤者担架",
          "x": 360,
          "y": 490,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsA",
          "cell": 1,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "eastEvacuationWagon",
          "name": "伤员交接点",
          "x": 890,
          "y": 570,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsB",
          "cell": 7,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "eastMedicalCase",
          "name": "伤营修补包",
          "x": 910,
          "y": 260,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsD",
          "cell": 7,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "eastSupplySeal",
          "name": "伤营修复处",
          "x": 1110,
          "y": 350,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsD",
          "cell": 7,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "eastPuppetApproach",
          "name": "傀儡追击口",
          "x": 740,
          "y": 190,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "jindanPropsA",
          "cell": 1,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "eastReturn",
          "name": "回战营",
          "x": 640,
          "y": 665,
          "kind": "campaignObject",
          "role": "portal",
          "atlas": null,
          "cell": null,
          "height": 0,
          "sinceRevision": 3
        }
      ],
      "artKey": "guixu-east",
      "width": 1280,
      "height": 760,
      "entry": {
        "x": 640,
        "y": 650
      },
      "sources": [
        {
          "file": "src/lib/story/volume4.ts",
          "line": 1171,
          "node": "heti_achen_stands"
        }
      ],
      "artAudit": {
        "file": "assets/art-v160/guixu-east.webp",
        "method": "逐图目视校准墙脚、台边、岩体、沟壑与云外边界；低台阶和地面阵纹可行走。",
        "date": "2026-11-13"
      },
      "sinceRevision": 3
    },
    "guixu-core": {
      "name": "归墟 · 玄玑中枢",
      "sub": "亲属真相、断控与守心终战",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "war-west",
            "status": "claimed"
          },
          {
            "type": "task",
            "id": "war-east",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "heti"
          }
        ],
        "any": []
      },
      "walls": [
        {
          "x": 0,
          "y": 0,
          "w": 1280,
          "h": 85
        },
        {
          "x": 0,
          "y": 85,
          "w": 25,
          "h": 645
        },
        {
          "x": 1255,
          "y": 85,
          "w": 25,
          "h": 645
        },
        {
          "x": 0,
          "y": 730,
          "w": 1280,
          "h": 30
        },
        {
          "x": 0,
          "y": 0,
          "w": 1280,
          "h": 95
        },
        {
          "x": 135,
          "y": 300,
          "w": 110,
          "h": 70
        },
        {
          "x": 115,
          "y": 350,
          "w": 150,
          "h": 35
        },
        {
          "x": 1050,
          "y": 300,
          "w": 105,
          "h": 70
        },
        {
          "x": 1030,
          "y": 350,
          "w": 145,
          "h": 35
        },
        {
          "x": 0,
          "y": 640,
          "w": 140,
          "h": 65
        },
        {
          "x": 0,
          "y": 705,
          "w": 260,
          "h": 55
        },
        {
          "x": 1140,
          "y": 640,
          "w": 140,
          "h": 65
        },
        {
          "x": 1020,
          "y": 705,
          "w": 260,
          "h": 55
        }
      ],
      "objects": [
        {
          "id": "coreLingyulang",
          "name": "凌玉琅",
          "x": 260,
          "y": 460,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "jindanPeopleA",
          "cell": 2,
          "height": 110,
          "sinceRevision": 3,
          "personId": "lingyulang"
        },
        {
          "id": "coreGrandmotherSeal",
          "name": "外婆残魂封位",
          "x": 470,
          "y": 230,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsD",
          "cell": 5,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "corePuppetControl",
          "name": "外在控魂阵",
          "x": 880,
          "y": 240,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsD",
          "cell": 5,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "coreXuanji",
          "name": "玄玑中枢战阵",
          "x": 640,
          "y": 320,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsD",
          "cell": 2,
          "height": 60,
          "sinceRevision": 3
        },
        {
          "id": "coreLockShell",
          "name": "母亲留下的半锁",
          "x": 360,
          "y": 570,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsC",
          "cell": 3,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "coreSilverHairpin",
          "name": "外婆遗簪留证案",
          "x": 870,
          "y": 540,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsC",
          "cell": 4,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "coreMachineDial",
          "name": "停用中枢定盘",
          "x": 1100,
          "y": 435,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsD",
          "cell": 2,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "coreMemorialStone",
          "name": "收殓与遗物安放处",
          "x": 210,
          "y": 580,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsD",
          "cell": 4,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "coreReturn",
          "name": "回战营",
          "x": 640,
          "y": 665,
          "kind": "campaignObject",
          "role": "portal",
          "atlas": null,
          "cell": null,
          "height": 0,
          "sinceRevision": 3
        }
      ],
      "artKey": "guixu-core",
      "width": 1280,
      "height": 760,
      "entry": {
        "x": 640,
        "y": 650
      },
      "sources": [
        {
          "file": "src/lib/story/volume4.ts",
          "line": 1201,
          "node": "heti_uncle_mother_puppet"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 1218,
          "node": "heti_1v1"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 1258,
          "node": "heti_final_strike"
        }
      ],
      "artAudit": {
        "file": "assets/art-v160/guixu-core.webp",
        "method": "逐图目视校准墙脚、台边、岩体、沟壑与云外边界；低台阶和地面阵纹可行走。",
        "date": "2026-11-13"
      },
      "sinceRevision": 3
    },
    "heaven-threshold": {
      "name": "高天 · 天门前台",
      "sub": "三十年交接、三组大乘劫与去留",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "war-aftermath",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "heti"
          }
        ],
        "any": []
      },
      "walls": [
        {
          "x": 0,
          "y": 0,
          "w": 1280,
          "h": 85
        },
        {
          "x": 0,
          "y": 85,
          "w": 25,
          "h": 645
        },
        {
          "x": 1255,
          "y": 85,
          "w": 25,
          "h": 645
        },
        {
          "x": 0,
          "y": 730,
          "w": 1280,
          "h": 30
        },
        {
          "x": 0,
          "y": 0,
          "w": 1280,
          "h": 110
        },
        {
          "x": 0,
          "y": 110,
          "w": 190,
          "h": 45
        },
        {
          "x": 0,
          "y": 155,
          "w": 125,
          "h": 50
        },
        {
          "x": 0,
          "y": 205,
          "w": 75,
          "h": 50
        },
        {
          "x": 0,
          "y": 255,
          "w": 40,
          "h": 80
        },
        {
          "x": 1090,
          "y": 110,
          "w": 190,
          "h": 45
        },
        {
          "x": 1155,
          "y": 155,
          "w": 125,
          "h": 50
        },
        {
          "x": 1205,
          "y": 205,
          "w": 75,
          "h": 50
        },
        {
          "x": 1240,
          "y": 255,
          "w": 40,
          "h": 80
        },
        {
          "x": 0,
          "y": 340,
          "w": 30,
          "h": 60
        },
        {
          "x": 0,
          "y": 400,
          "w": 75,
          "h": 65
        },
        {
          "x": 0,
          "y": 465,
          "w": 90,
          "h": 60
        },
        {
          "x": 0,
          "y": 525,
          "w": 55,
          "h": 60
        },
        {
          "x": 0,
          "y": 585,
          "w": 95,
          "h": 45
        },
        {
          "x": 0,
          "y": 630,
          "w": 145,
          "h": 40
        },
        {
          "x": 0,
          "y": 670,
          "w": 195,
          "h": 90
        },
        {
          "x": 1250,
          "y": 340,
          "w": 30,
          "h": 60
        },
        {
          "x": 1205,
          "y": 400,
          "w": 75,
          "h": 65
        },
        {
          "x": 1190,
          "y": 465,
          "w": 90,
          "h": 60
        },
        {
          "x": 1225,
          "y": 525,
          "w": 55,
          "h": 60
        },
        {
          "x": 1185,
          "y": 585,
          "w": 95,
          "h": 45
        },
        {
          "x": 1135,
          "y": 630,
          "w": 145,
          "h": 40
        },
        {
          "x": 1085,
          "y": 670,
          "w": 195,
          "h": 90
        }
      ],
      "objects": [
        {
          "id": "heavenSwordForge",
          "name": "守心重铸炉",
          "x": 240,
          "y": 300,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsC",
          "cell": 2,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "heavenMirrorPlate",
          "name": "碑纹取印座",
          "x": 350,
          "y": 410,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsD",
          "cell": 0,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "heavenBoundaryWedge",
          "name": "界路楔护座",
          "x": 950,
          "y": 410,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsD",
          "cell": 1,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "heavenReceptionDial",
          "name": "接引定盘校准座",
          "x": 640,
          "y": 520,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsD",
          "cell": 2,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "heavenTrialFocus",
          "name": "大乘渡劫阵",
          "x": 640,
          "y": 280,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "jindanPropsA",
          "cell": 1,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "heavenCompanionBook",
          "name": "自愿同行名册",
          "x": 990,
          "y": 250,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsD",
          "cell": 3,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "heavenLingyunFarewell",
          "name": "凌云子",
          "x": 220,
          "y": 530,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "campaignPeople",
          "cell": 1,
          "height": 110,
          "sinceRevision": 3,
          "personId": "lingyun"
        },
        {
          "id": "heavenShenFarewell",
          "name": "沈灵薇",
          "x": 1040,
          "y": 530,
          "kind": "campaignObject",
          "role": "npc",
          "atlas": "characters",
          "cell": 8,
          "height": 110,
          "sinceRevision": 3,
          "personId": "shen"
        },
        {
          "id": "heavenAchenSeal",
          "name": "掌门印与传承案",
          "x": 780,
          "y": 200,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "m4PropsC",
          "cell": 6,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "heavenGateChoice",
          "name": "天门去留台",
          "x": 640,
          "y": 155,
          "kind": "campaignObject",
          "role": "prop",
          "atlas": "jindanPropsA",
          "cell": 1,
          "height": 58,
          "sinceRevision": 3
        },
        {
          "id": "heavenReturn",
          "name": "回蜀山山门",
          "x": 640,
          "y": 665,
          "kind": "campaignObject",
          "role": "portal",
          "atlas": null,
          "cell": null,
          "height": 0,
          "sinceRevision": 3
        }
      ],
      "artKey": "heaven-threshold",
      "width": 1280,
      "height": 760,
      "entry": {
        "x": 640,
        "y": 650
      },
      "sources": [
        {
          "file": "src/lib/story/volume4.ts",
          "line": 1302,
          "node": "dacheng_30years_1"
        },
        {
          "file": "src/lib/story/volume3.ts",
          "line": 960,
          "node": "jindan_meet_liuruyan"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 1359,
          "node": "dacheng_breakthrough"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 1514,
          "node": "dacheng_gate_arrive"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 354,
          "node": "dacheng_farewell"
        }
      ],
      "artAudit": {
        "file": "assets/art-v160/heaven-threshold.webp",
        "method": "逐图目视校准墙脚、台边、岩体、沟壑与云外边界；低台阶和地面阵纹可行走。",
        "date": "2026-11-13"
      },
      "sinceRevision": 3
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
    },
    "retreat-north": {
      "id": "retreat-north",
      "map": "jindan-retreat",
      "objectId": "retreatNorthGate",
      "to": {
        "map": "beihuang-retreat",
        "x": 640,
        "y": 650
      },
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "jindan-crossroads",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "jindan"
          }
        ],
        "any": []
      },
      "sinceRevision": 3
    },
    "north-retreat": {
      "id": "north-retreat",
      "map": "beihuang-retreat",
      "objectId": "northReturn",
      "to": {
        "map": "jindan-retreat",
        "x": 640,
        "y": 650
      },
      "requires": {
        "all": [],
        "any": []
      },
      "sinceRevision": 3
    },
    "north-summit": {
      "id": "north-summit",
      "map": "beihuang-retreat",
      "objectId": "northSummitGate",
      "to": {
        "map": "golden-summit",
        "x": 640,
        "y": 650
      },
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "northbound-rescue",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "yuanying"
          }
        ],
        "any": []
      },
      "sinceRevision": 3
    },
    "summit-north": {
      "id": "summit-north",
      "map": "golden-summit",
      "objectId": "summitReturn",
      "to": {
        "map": "beihuang-retreat",
        "x": 640,
        "y": 650
      },
      "requires": {
        "all": [],
        "any": []
      },
      "sinceRevision": 3
    },
    "summit-cliff": {
      "id": "summit-cliff",
      "map": "golden-summit",
      "objectId": "summitCliffGate",
      "to": {
        "map": "heart-cliff",
        "x": 640,
        "y": 650
      },
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "summit-rebellion",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "yuanying"
          }
        ],
        "any": []
      },
      "sinceRevision": 3
    },
    "cliff-summit": {
      "id": "cliff-summit",
      "map": "heart-cliff",
      "objectId": "cliffReturn",
      "to": {
        "map": "golden-summit",
        "x": 640,
        "y": 650
      },
      "requires": {
        "all": [],
        "any": []
      },
      "sinceRevision": 3
    },
    "summit-commons": {
      "id": "summit-commons",
      "map": "golden-summit",
      "objectId": "summitCommonsGate",
      "to": {
        "map": "shushan-commons",
        "x": 640,
        "y": 650
      },
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "huashen-trial",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "huashen"
          }
        ],
        "any": []
      },
      "sinceRevision": 3
    },
    "commons-summit": {
      "id": "commons-summit",
      "map": "shushan-commons",
      "objectId": "commonsReturn",
      "to": {
        "map": "golden-summit",
        "x": 640,
        "y": 650
      },
      "requires": {
        "all": [],
        "any": []
      },
      "sinceRevision": 3
    },
    "commons-camp": {
      "id": "commons-camp",
      "map": "shushan-commons",
      "objectId": "commonsCampGate",
      "to": {
        "map": "alliance-camp",
        "x": 640,
        "y": 650
      },
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "governance-review",
            "status": "claimed"
          },
          {
            "type": "choice",
            "task": "governance-review",
            "id": "continue"
          },
          {
            "type": "realm",
            "id": "huashen"
          }
        ],
        "any": []
      },
      "sinceRevision": 3
    },
    "camp-commons": {
      "id": "camp-commons",
      "map": "alliance-camp",
      "objectId": "campReturn",
      "to": {
        "map": "shushan-commons",
        "x": 640,
        "y": 650
      },
      "requires": {
        "all": [],
        "any": []
      },
      "sinceRevision": 3
    },
    "camp-west": {
      "id": "camp-west",
      "map": "alliance-camp",
      "objectId": "campWestGate",
      "to": {
        "map": "guixu-west",
        "x": 640,
        "y": 650
      },
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "war-order",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "heti"
          }
        ],
        "any": [
          {
            "type": "choice",
            "task": "war-order",
            "id": "west-first"
          },
          {
            "type": "task",
            "id": "war-east",
            "status": "claimed"
          }
        ]
      },
      "sinceRevision": 3
    },
    "west-camp": {
      "id": "west-camp",
      "map": "guixu-west",
      "objectId": "westReturn",
      "to": {
        "map": "alliance-camp",
        "x": 640,
        "y": 650
      },
      "requires": {
        "all": [],
        "any": []
      },
      "sinceRevision": 3
    },
    "camp-east": {
      "id": "camp-east",
      "map": "alliance-camp",
      "objectId": "campEastGate",
      "to": {
        "map": "guixu-east",
        "x": 640,
        "y": 650
      },
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "war-order",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "heti"
          }
        ],
        "any": [
          {
            "type": "choice",
            "task": "war-order",
            "id": "east-first"
          },
          {
            "type": "task",
            "id": "war-west",
            "status": "claimed"
          }
        ]
      },
      "sinceRevision": 3
    },
    "east-camp": {
      "id": "east-camp",
      "map": "guixu-east",
      "objectId": "eastReturn",
      "to": {
        "map": "alliance-camp",
        "x": 640,
        "y": 650
      },
      "requires": {
        "all": [],
        "any": []
      },
      "sinceRevision": 3
    },
    "camp-core": {
      "id": "camp-core",
      "map": "alliance-camp",
      "objectId": "campCoreGate",
      "to": {
        "map": "guixu-core",
        "x": 640,
        "y": 650
      },
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "war-west",
            "status": "claimed"
          },
          {
            "type": "task",
            "id": "war-east",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "heti"
          }
        ],
        "any": []
      },
      "sinceRevision": 3
    },
    "core-camp": {
      "id": "core-camp",
      "map": "guixu-core",
      "objectId": "coreReturn",
      "to": {
        "map": "alliance-camp",
        "x": 640,
        "y": 650
      },
      "requires": {
        "all": [],
        "any": []
      },
      "sinceRevision": 3
    },
    "commons-heaven": {
      "id": "commons-heaven",
      "map": "shushan-commons",
      "objectId": "commonsHeavenGate",
      "to": {
        "map": "heaven-threshold",
        "x": 640,
        "y": 650
      },
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "war-aftermath",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "heti"
          }
        ],
        "any": []
      },
      "sinceRevision": 3
    },
    "heaven-commons": {
      "id": "heaven-commons",
      "map": "heaven-threshold",
      "objectId": "heavenReturn",
      "to": {
        "map": "shushan-commons",
        "x": 640,
        "y": 650
      },
      "requires": {
        "all": [],
        "any": []
      },
      "sinceRevision": 3
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
    },
    "northbound-preparation": {
      "id": "northbound-preparation",
      "title": "循前路赴北荒",
      "summary": "三年整备后，循来信赴北荒。领取本次接地与固定伤处的包材，依次铺西线、接东桩；三途承诺保留在先前行程中。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "jindan-crossroads",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "jindan"
          }
        ],
        "any": []
      },
      "objectives": [
        {
          "id": "read-northbound-writ",
          "title": "核师门来信，确认此行先赴北荒；保留原三途承诺"
        },
        {
          "id": "receive-north-kit",
          "title": "领取避劫、夹板各一包"
        },
        {
          "id": "ground-north-west",
          "title": "铺西侧导线"
        },
        {
          "id": "ground-north-east",
          "title": "接地并核两桩"
        }
      ],
      "requiredObjectives": [
        "read-northbound-writ",
        "receive-north-kit",
        "ground-north-west",
        "ground-north-east"
      ],
      "sequence": [],
      "choices": [],
      "volumeLabel": "元婴卷",
      "sources": [
        {
          "file": "src/lib/story/volume4.ts",
          "line": 454,
          "node": "yuanying_beihuang_arrive"
        }
      ],
      "sinceRevision": 3
    },
    "yuanying-breakthrough": {
      "id": "yuanying-breakthrough",
      "title": "归墟结婴",
      "summary": "先卸暴雷，接受舅舅护法，再选末段备物。两场劫战各自记录胜利，失败只重试当前段；稳定本体后领取元婴境界。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "northbound-preparation",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "jindan"
          }
        ],
        "any": []
      },
      "objectives": [
        {
          "id": "fight-yuanying-outer-thunder",
          "title": "卸去前段暴雷"
        },
        {
          "id": "accept-uncle-guard",
          "title": "接受舅舅护法与一份实用回复药"
        },
        {
          "id": "choose-yuanying-focus-steady",
          "title": "稳守护持"
        },
        {
          "id": "choose-yuanying-focus",
          "title": "稳守护持"
        },
        {
          "id": "choose-yuanying-focus-sword",
          "title": "剑修断雷"
        },
        {
          "id": "choose-yuanying-focus-medicine",
          "title": "医修固本"
        },
        {
          "id": "choose-yuanying-focus-scholar",
          "title": "符修辨息"
        },
        {
          "id": "fight-yuanying-life-trial",
          "title": "独自完成末段命劫"
        },
        {
          "id": "settle-yuanying",
          "title": "核元婴与本体稳定"
        }
      ],
      "requiredObjectives": [
        "fight-yuanying-outer-thunder",
        "accept-uncle-guard",
        "choose-yuanying-focus",
        "fight-yuanying-life-trial",
        "settle-yuanying"
      ],
      "sequence": [],
      "choices": [
        {
          "id": "steady",
          "label": "稳守护持"
        },
        {
          "id": "sword",
          "label": "剑修断雷"
        },
        {
          "id": "medicine",
          "label": "医修固本"
        },
        {
          "id": "scholar",
          "label": "符修辨息"
        }
      ],
      "volumeLabel": "元婴卷",
      "sources": [
        {
          "file": "src/lib/story/volume4.ts",
          "line": 466,
          "node": "yuanying_thunder_1"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 479,
          "node": "yuanying_uncle_comes"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 524,
          "node": "yuanying_birth"
        }
      ],
      "sinceRevision": 3,
      "trial": true
    },
    "northbound-rescue": {
      "id": "northbound-rescue",
      "title": "带同门活着归山",
      "summary": "击退追兵、用夹板固定师兄伤处并交接。铁牌、凤羽残光与魔纹矿钥须各由在场者亲自交付。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "yuanying-breakthrough",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "yuanying"
          }
        ],
        "any": []
      },
      "objectives": [
        {
          "id": "clear-north-pursuit",
          "title": "打退追击师兄的暗桩"
        },
        {
          "id": "splint-lingyun",
          "title": "实际固定伤处"
        },
        {
          "id": "handoff-lingyun",
          "title": "把伤者交给接应者"
        },
        {
          "id": "receive-brother-credential",
          "title": "师兄当面交铁牌"
        },
        {
          "id": "receive-feather-remnant",
          "title": "灵薇确认万妖救援后的凤羽残光去向"
        },
        {
          "id": "receive-demon-mine-key",
          "title": "舅舅从旧矿守封匣交出魔纹矿钥并具名"
        }
      ],
      "requiredObjectives": [
        "clear-north-pursuit",
        "splint-lingyun",
        "handoff-lingyun",
        "receive-brother-credential",
        "receive-feather-remnant",
        "receive-demon-mine-key"
      ],
      "sequence": [],
      "choices": [],
      "volumeLabel": "元婴卷",
      "sources": [
        {
          "file": "src/lib/story/volume4.ts",
          "line": 41,
          "node": "yuanying_save_lingyun"
        },
        {
          "file": "src/lib/story/volume3.ts",
          "line": 1022,
          "node": "jindan_uncle_tianhen"
        }
      ],
      "sinceRevision": 3
    },
    "summit-evidence": {
      "id": "summit-evidence",
      "title": "呈证前的两次核验",
      "summary": "查矿账、核签押，再听两位证人的具名口述。已保全的原卷可以直接比印；无原卷也能从登记原簿补证。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "northbound-rescue",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "yuanying"
          }
        ],
        "any": []
      },
      "objectives": [
        {
          "id": "audit-summit-ledger",
          "title": "核矿账签押与次序"
        },
        {
          "id": "choose-summit-proof-method-carried-docket",
          "title": "核自己保全的原卷"
        },
        {
          "id": "choose-summit-proof-method",
          "title": "核自己保全的原卷"
        },
        {
          "id": "choose-summit-proof-method-clerk-and-witness",
          "title": "查原簿补证"
        },
        {
          "id": "docket-authenticated",
          "title": "用已保全的万妖签押原卷直接比印"
        },
        {
          "id": "paper-authenticated",
          "title": "用已保全的万妖签押原卷直接比印"
        },
        {
          "id": "consult-clerk-book",
          "title": "查登记原簿（普通补证）"
        },
        {
          "id": "clerk-authenticated",
          "title": "复核原簿签押并记录独立来源"
        },
        {
          "id": "hear-summit-lingyun",
          "title": "核凌云子伤证"
        },
        {
          "id": "hear-summit-liu",
          "title": "核合欢宗遇害弟子具名证词"
        }
      ],
      "requiredObjectives": [
        "paper-authenticated",
        "hear-summit-lingyun",
        "hear-summit-liu"
      ],
      "sequence": [],
      "choices": [
        {
          "id": "carried-docket",
          "label": "核自己保全的原卷"
        },
        {
          "id": "clerk-and-witness",
          "label": "查原簿补证"
        }
      ],
      "volumeLabel": "元婴卷",
      "sources": [
        {
          "file": "src/lib/story/volume4.ts",
          "line": 650,
          "node": "yuanying_debate_evidence"
        }
      ],
      "sinceRevision": 3
    },
    "summit-swordmeet": {
      "id": "summit-swordmeet",
      "title": "七宗试剑与护民之答",
      "summary": "以节制试剑回应七宗质疑，再用你经历过的救援说明护民之道。试剑失利可以整备后再来。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "summit-evidence",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "yuanying"
          }
        ],
        "any": []
      },
      "objectives": [
        {
          "id": "fight-summit-measured-spar",
          "title": "节制试剑：两种敌情，保持原符药/控制用途"
        },
        {
          "id": "answer-demon-heir",
          "title": "以实际经历解释护民之道"
        }
      ],
      "requiredObjectives": [
        "fight-summit-measured-spar",
        "answer-demon-heir"
      ],
      "sequence": [],
      "choices": [],
      "volumeLabel": "元婴卷",
      "sources": [
        {
          "file": "src/lib/story/volume4.ts",
          "line": 593,
          "node": "yuanying_debate_arrive"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 607,
          "node": "yuanying_debate_sword_1"
        }
      ],
      "sinceRevision": 3
    },
    "summit-rebellion": {
      "id": "summit-rebellion",
      "title": "呈证与三宗反水",
      "summary": "当众呈证后，叛宗弟子围堵证人。实际护住撤路，查封矿账柜、清点仙纹矿钥，接应清微后赴问道崖。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "summit-swordmeet",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "yuanying"
          }
        ],
        "any": []
      },
      "objectives": [
        {
          "id": "present-summit-proofs",
          "title": "公开具来源的物证与证词"
        },
        {
          "id": "protect-summit-witnesses",
          "title": "护住被围的证人撤路"
        },
        {
          "id": "seize-immortal-mine-key",
          "title": "会审执事在查封账柜清点仙纹矿钥"
        },
        {
          "id": "secure-qingwei-retreat",
          "title": "师父阻敌，转入问道崖"
        }
      ],
      "requiredObjectives": [
        "present-summit-proofs",
        "protect-summit-witnesses",
        "seize-immortal-mine-key",
        "secure-qingwei-retreat"
      ],
      "sequence": [],
      "choices": [],
      "volumeLabel": "元婴卷",
      "sources": [
        {
          "file": "src/lib/story/volume4.ts",
          "line": 666,
          "node": "yuanying_debate_betray"
        }
      ],
      "sinceRevision": 3
    },
    "heartcliff-inquiry": {
      "id": "heartcliff-inquiry",
      "title": "问道崖上的父书",
      "summary": "从绳具匣领取一套绳具，选择破阵或三步架绳。到达残壁后分别留存飞升偈与父亲血书。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "summit-rebellion",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "yuanying"
          }
        ],
        "any": []
      },
      "objectives": [
        {
          "id": "take-cliff-rope",
          "title": "领取一套登崖绳具"
        },
        {
          "id": "choose-cliff-route-break-array",
          "title": "击破残剑阵"
        },
        {
          "id": "choose-cliff-route",
          "title": "击破残剑阵"
        },
        {
          "id": "choose-cliff-route-rope-route",
          "title": "架绳稳登崖"
        },
        {
          "id": "array-cleared",
          "title": "破剑阵登崖"
        },
        {
          "id": "cliff-reached",
          "title": "破剑阵登崖"
        },
        {
          "id": "rope-crossed",
          "title": "最后落扣抵崖"
        },
        {
          "id": "copy-cliff-sutra",
          "title": "拓飞升偈"
        },
        {
          "id": "read-father-bloodletter",
          "title": "读父书并与先前亲缘证据分开留存"
        }
      ],
      "requiredObjectives": [
        "cliff-reached",
        "copy-cliff-sutra",
        "read-father-bloodletter"
      ],
      "sequence": [
        "tie-cliff-west",
        "tie-cliff-middle",
        "tie-cliff-east"
      ],
      "choices": [
        {
          "id": "break-array",
          "label": "击破残剑阵"
        },
        {
          "id": "rope-route",
          "label": "架绳稳登崖"
        }
      ],
      "volumeLabel": "元婴卷",
      "sources": [
        {
          "file": "src/lib/story/volume4.ts",
          "line": 711,
          "node": "yuanying_cliff_wall"
        }
      ],
      "sinceRevision": 3
    },
    "huashen-breakthrough": {
      "id": "huashen-breakthrough",
      "title": "守心实践与化神",
      "summary": "回金顶击破玄玑封锁，救护清微。三年修行后再经护心实战，稳定本体，复验化神。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "heartcliff-inquiry",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "yuanying"
          }
        ],
        "any": []
      },
      "objectives": [
        {
          "id": "fight-xuanji-first-stand",
          "title": "回金顶护人，击破玄玑替身封锁"
        },
        {
          "id": "care-qingwei-after-battle",
          "title": "将师父送入医庐，确认玄玑已遁走"
        },
        {
          "id": "fight-huashen-heart-trial",
          "title": "三年修行后护心问道"
        },
        {
          "id": "settle-huashen",
          "title": "复核化神，承担公开呈证责任"
        }
      ],
      "requiredObjectives": [
        "fight-xuanji-first-stand",
        "care-qingwei-after-battle",
        "fight-huashen-heart-trial",
        "settle-huashen"
      ],
      "sequence": [],
      "choices": [],
      "volumeLabel": "元婴卷",
      "sources": [
        {
          "file": "src/lib/story/volume4.ts",
          "line": 760,
          "node": "huashen_battle_final"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 791,
          "node": "huashen_breakthrough"
        }
      ],
      "sinceRevision": 3,
      "trial": true
    },
    "mine-dual-keys": {
      "id": "mine-dual-keys",
      "title": "重查天痕矿的实体依据",
      "summary": "回北荒旧矿柜核仙、魔两钥，启匣查采血槽、运单与检修封记。界路楔须有现场来源，疑点仍要经公审。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "huashen-breakthrough",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "huashen"
          }
        ],
        "any": []
      },
      "objectives": [
        {
          "id": "compare-mine-two-keys",
          "title": "核仙魔两钥和账柜封记"
        },
        {
          "id": "open-mine-inspection-case",
          "title": "两钥启旧矿检修匣，不消耗钥匙"
        },
        {
          "id": "inspect-mine-blood-groove",
          "title": "对采血槽与账簿时序"
        },
        {
          "id": "inspect-mine-transport",
          "title": "核天痕石运送去向"
        },
        {
          "id": "recover-mine-boundary-wedge",
          "title": "从检修匣取界路楔，封好实物来源"
        }
      ],
      "requiredObjectives": [
        "compare-mine-two-keys",
        "open-mine-inspection-case",
        "inspect-mine-blood-groove",
        "inspect-mine-transport",
        "recover-mine-boundary-wedge"
      ],
      "sequence": [],
      "choices": [],
      "volumeLabel": "化神卷",
      "sources": [
        {
          "file": "src/lib/story/volume3.ts",
          "line": 1022,
          "node": "jindan_uncle_tianhen"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 815,
          "node": "huashen_trial_prep"
        }
      ],
      "sinceRevision": 3
    },
    "huashen-trial": {
      "id": "huashen-trial",
      "title": "公审与责任",
      "summary": "核查封记录、清微的知情责任与具名遇害者。听取青霞最后证词，区分首恶与胁从，公布判决并平反林清风。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "mine-dual-keys",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "huashen"
          }
        ],
        "any": []
      },
      "objectives": [
        {
          "id": "catalogue-confiscated-records",
          "title": "把查封记录按时间归档"
        },
        {
          "id": "examine-qingwei-responsibility",
          "title": "请清微说明当年知情与失察"
        },
        {
          "id": "identify-victim-tablets",
          "title": "认领、念名并核三份代表性受害者记录"
        },
        {
          "id": "hear-qingxia-last-testimony",
          "title": "核青霞与胁从弟子的不同责任"
        },
        {
          "id": "publish-trial-sentence",
          "title": "公布会审结果、平反林清风、处理叛宗首恶"
        }
      ],
      "requiredObjectives": [
        "catalogue-confiscated-records",
        "examine-qingwei-responsibility",
        "identify-victim-tablets",
        "hear-qingxia-last-testimony",
        "publish-trial-sentence"
      ],
      "sequence": [],
      "choices": [],
      "volumeLabel": "化神卷",
      "sources": [
        {
          "file": "src/lib/story/volume4.ts",
          "line": 815,
          "node": "huashen_trial_prep"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 856,
          "node": "huashen_trial_sentence"
        }
      ],
      "sinceRevision": 3
    },
    "reform-charter": {
      "id": "reform-charter",
      "title": "门规先改在自己身上",
      "summary": "刑期复核与经阁开放两项都要落实。先复刑可得西线阵师援助，先开放经阁可得东线医阵抄本；先行援助只取一项。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "huashen-trial",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "huashen"
          }
        ],
        "any": []
      },
      "objectives": [
        {
          "id": "read-prison-register",
          "title": "查冤囚与无期限旧条"
        },
        {
          "id": "choose-charter-order-sentence-review",
          "title": "先复核旧刑"
        },
        {
          "id": "choose-charter-order",
          "title": "先复核旧刑"
        },
        {
          "id": "choose-charter-order-open-library",
          "title": "先开放经阁"
        },
        {
          "id": "deliver-sentence-review",
          "title": "完成限期关押与申诉复核"
        },
        {
          "id": "open-public-library",
          "title": "开放经阁并落实登记"
        },
        {
          "id": "publish-new-charter",
          "title": "签新门规、安置反对后离任者"
        }
      ],
      "requiredObjectives": [
        "read-prison-register",
        "choose-charter-order",
        "deliver-sentence-review",
        "open-public-library",
        "publish-new-charter"
      ],
      "sequence": [],
      "choices": [
        {
          "id": "sentence-review",
          "label": "先复核旧刑"
        },
        {
          "id": "open-library",
          "label": "先开放经阁"
        }
      ],
      "volumeLabel": "化神卷",
      "sources": [
        {
          "file": "src/lib/story/volume4.ts",
          "line": 873,
          "node": "huashen_year_1"
        }
      ],
      "sinceRevision": 3,
      "group": "governance",
      "choiceDetails": {
        "sentence-review": {
          "label": "先复核旧刑",
          "consequences": [
            "先安排无期限关押的申诉复核，之后仍完成经阁开放。",
            "被平反的阵师以正式回执支持西线，开放一种修阵援助；不会同时获得东线典籍援助。"
          ]
        },
        "open-library": {
          "label": "先开放经阁",
          "consequences": [
            "先让散修查阅典籍，之后仍完成刑期复核。",
            "医师取得可核的抄本，支持东线伤营；不会同时获得西线阵师援助。"
          ]
        }
      }
    },
    "school-shelter": {
      "id": "school-shelter",
      "title": "义塾与失去父母的孩子",
      "summary": "三份安置包分别用于避雨屋、孩子安置与首课教材，再与医师落实照护。师徒和同门称谓不会自动变成婚姻。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "reform-charter",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "huashen"
          }
        ],
        "any": []
      },
      "objectives": [
        {
          "id": "receive-school-kits",
          "title": "核领三份书籍与安置包"
        },
        {
          "id": "prepare-school-roof",
          "title": "用一份修整避雨处"
        },
        {
          "id": "register-school-children",
          "title": "用一份安置并核名单"
        },
        {
          "id": "deliver-first-lesson",
          "title": "用一份教材完成首课与护人实践"
        },
        {
          "id": "arrange-school-care",
          "title": "医师与先生分工"
        }
      ],
      "requiredObjectives": [
        "receive-school-kits",
        "prepare-school-roof",
        "register-school-children",
        "deliver-first-lesson",
        "arrange-school-care"
      ],
      "sequence": [],
      "choices": [],
      "volumeLabel": "化神卷",
      "sources": [
        {
          "file": "src/lib/story/volume4.ts",
          "line": 936,
          "node": "huashen_year_3_school"
        }
      ],
      "sinceRevision": 3,
      "group": "governance"
    },
    "border-commerce": {
      "id": "border-commerce",
      "title": "两界互市第一次交割",
      "summary": "核衡器、护首批商货，再决定医药或接应运力优先。实际封存交割单后才交付对应物资。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "school-shelter",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "huashen"
          }
        ],
        "any": []
      },
      "objectives": [
        {
          "id": "take-trade-seal",
          "title": "领一份官验封签"
        },
        {
          "id": "weigh-trade-cargo",
          "title": "校两方衡器"
        },
        {
          "id": "protect-trade-caravan",
          "title": "击退破坏首批互市的袭击者"
        },
        {
          "id": "choose-trade-priority-medicine",
          "title": "医药先行"
        },
        {
          "id": "choose-trade-priority",
          "title": "医药先行"
        },
        {
          "id": "choose-trade-priority-evacuation",
          "title": "接应先行"
        },
        {
          "id": "seal-trade-covenant",
          "title": "实际封存对等货单"
        },
        {
          "id": "medicine-delivered",
          "title": "封存医药交割单，领取回气丹二枚与温养茶一份"
        },
        {
          "id": "evacuation-delivered",
          "title": "封存接应货单，领取一份伤营修补料"
        }
      ],
      "requiredObjectives": [
        "take-trade-seal",
        "weigh-trade-cargo",
        "protect-trade-caravan",
        "choose-trade-priority",
        "seal-trade-covenant"
      ],
      "sequence": [],
      "choices": [
        {
          "id": "medicine",
          "label": "医药先行"
        },
        {
          "id": "evacuation",
          "label": "接应先行"
        }
      ],
      "volumeLabel": "化神卷",
      "sources": [
        {
          "file": "src/lib/story/volume4.ts",
          "line": 985,
          "node": "huashen_year_6_reform"
        }
      ],
      "sinceRevision": 3,
      "group": "governance",
      "choiceDetails": {
        "medicine": {
          "label": "医药先行",
          "consequences": [
            "首批安全运力交付回气丹2枚和温养茶1份。",
            "本次不领额外伤营修补料；必需的战地物资仍由联军按定额供给。"
          ]
        },
        "evacuation": {
          "label": "接应先行",
          "consequences": [
            "首批安全运力交付一份伤营修补料，可省去晚到东线的现场筹料。",
            "本次不领额外普通符药。"
          ]
        }
      }
    },
    "governance-review": {
      "id": "governance-review",
      "title": "十年之后选传道或担责",
      "summary": "接七岁阿辰入门、受托圆通舍利，逐项复核十年治理。可在化神立道传法，或保留治理成果继续北伐。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "border-commerce",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "huashen"
          }
        ],
        "any": []
      },
      "objectives": [
        {
          "id": "receive-achen-as-disciple",
          "title": "第七年接七岁阿辰入门，明确师徒"
        },
        {
          "id": "receive-yuantong-relic",
          "title": "第八年圆通坐化，接寺方托付舍利"
        },
        {
          "id": "audit-three-reforms",
          "title": "逐项复核门规、义塾、商约实际兑现"
        },
        {
          "id": "choose-governance-future-teach",
          "title": "立道传法"
        },
        {
          "id": "choose-governance-future",
          "title": "立道传法"
        },
        {
          "id": "choose-governance-future-continue",
          "title": "继续担起战事"
        }
      ],
      "requiredObjectives": [
        "receive-achen-as-disciple",
        "receive-yuantong-relic",
        "audit-three-reforms",
        "choose-governance-future"
      ],
      "sequence": [],
      "choices": [
        {
          "id": "teach",
          "label": "立道传法"
        },
        {
          "id": "continue",
          "label": "继续担起战事"
        }
      ],
      "volumeLabel": "化神卷",
      "sources": [
        {
          "file": "src/lib/story/volume4.ts",
          "line": 998,
          "node": "huashen_year_7_disciple"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 1015,
          "node": "huashen_year_8_yuantong_nirvana"
        },
        {
          "file": "src/lib/story/endings.ts",
          "line": 45,
          "node": "ending_dao"
        }
      ],
      "sinceRevision": 3,
      "group": "governance",
      "choiceDetails": {
        "teach": {
          "label": "立道传法",
          "consequences": [
            "在化神境开问道阁，完成本条主线的立道终局。",
            "确认领取后结束本档行程；若要继续北伐，可先导出此刻存档。"
          ]
        },
        "continue": {
          "label": "继续担起战事",
          "consequences": [
            "保留已经落实的治理，开启联军与合体道路。",
            "本次不结算化神立道终局；之后仍有三种天门去向。"
          ]
        }
      }
    },
    "alliance-muster": {
      "id": "alliance-muster",
      "title": "先备人再出征",
      "summary": "核盟约与职责，决定正式结盟或各军自主，领取本次有限物资并接守心剑。舅舅的亲缘援手不改变你的宗门。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "governance-review",
            "status": "claimed"
          },
          {
            "type": "choice",
            "task": "governance-review",
            "id": "continue"
          },
          {
            "type": "realm",
            "id": "huashen"
          }
        ],
        "any": []
      },
      "objectives": [
        {
          "id": "check-alliance-roll",
          "title": "核本档已立的盟约与战地职责"
        },
        {
          "id": "choose-alliance-policy-allied",
          "title": "举旗正式结盟"
        },
        {
          "id": "choose-alliance-policy",
          "title": "举旗正式结盟"
        },
        {
          "id": "choose-alliance-policy-independent",
          "title": "各军保留自主"
        },
        {
          "id": "receive-frontline-supplies",
          "title": "领取此次战线定额"
        },
        {
          "id": "receive-shouxin-sword",
          "title": "清微当面交守心剑，核交接来源"
        }
      ],
      "requiredObjectives": [
        "check-alliance-roll",
        "choose-alliance-policy",
        "receive-frontline-supplies",
        "receive-shouxin-sword"
      ],
      "sequence": [],
      "choices": [
        {
          "id": "allied",
          "label": "举旗正式结盟"
        },
        {
          "id": "independent",
          "label": "各军保留自主"
        }
      ],
      "volumeLabel": "化神卷",
      "sources": [
        {
          "file": "src/lib/story/volume4.ts",
          "line": 1056,
          "node": "huashen_muster"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 1070,
          "node": "huashen_march"
        }
      ],
      "sinceRevision": 3,
      "group": "war",
      "choiceDetails": {
        "allied": {
          "label": "举旗正式结盟",
          "consequences": [
            "仙魔联军依真实商约协同，解锁有援军的固定敌情。",
            "宗门归属、身世和个人修习道路不因此改写。"
          ]
        },
        "independent": {
          "label": "保留各军自主",
          "consequences": [
            "舅舅以亲人身份援手，魔域部队不受此行指挥。",
            "战场采用无魔域援军的普通敌情；定额整备和两条战线仍可完成。"
          ]
        }
      }
    },
    "heti-breakthrough": {
      "id": "heti-breakthrough",
      "title": "北伐四年的合体试炼",
      "summary": "北伐四年间，以两段身识协同实战检验修行。分识、复合再护持，最后领取合体；先前境界与训练仍保留。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "alliance-muster",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "huashen"
          }
        ],
        "any": []
      },
      "objectives": [
        {
          "id": "check-body-and-spirit",
          "title": "检本体与元婴协同"
        },
        {
          "id": "fight-heti-separation",
          "title": "分识而不失守"
        },
        {
          "id": "rejoin-spirit-channel",
          "title": "复合神识后重新核剑"
        },
        {
          "id": "fight-heti-unity",
          "title": "完成合体护持试炼"
        }
      ],
      "requiredObjectives": [
        "check-body-and-spirit",
        "fight-heti-separation",
        "rejoin-spirit-channel",
        "fight-heti-unity"
      ],
      "sequence": [],
      "choices": [],
      "volumeLabel": "化神卷",
      "sources": [
        {
          "file": "src/lib/story/volume4.ts",
          "line": 1070,
          "node": "huashen_march"
        }
      ],
      "sinceRevision": 3,
      "trial": true
    },
    "war-order": {
      "id": "war-order",
      "title": "两处战线先救哪边",
      "summary": "两条战线都要处理。西先保住阵材并免一场压力战；东先保住伤营。后到处需要真实补修或清追兵，没有隐藏倒计时。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "heti-breakthrough",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "heti"
          }
        ],
        "any": []
      },
      "objectives": [
        {
          "id": "read-both-front-reports",
          "title": "公示结界与伤营的需求"
        },
        {
          "id": "choose-war-order-west-first",
          "title": "先赴西线"
        },
        {
          "id": "choose-war-order",
          "title": "先赴西线"
        },
        {
          "id": "choose-war-order-east-first",
          "title": "先赴东线"
        }
      ],
      "requiredObjectives": [
        "read-both-front-reports",
        "choose-war-order"
      ],
      "sequence": [],
      "choices": [
        {
          "id": "west-first",
          "label": "先赴西线"
        },
        {
          "id": "east-first",
          "label": "先赴东线"
        }
      ],
      "volumeLabel": "合体卷",
      "sources": [],
      "sinceRevision": 3,
      "group": "war",
      "choiceDetails": {
        "west-first": {
          "label": "先护西线结界",
          "consequences": [
            "先到西线，避免一场阵外加压敌袭，并保住阵材。",
            "东线后到需要先修整伤营再击退追兵；阿辰和伤者仍有实际救援机会。"
          ]
        },
        "east-first": {
          "label": "先护东线伤营",
          "consequences": [
            "先到东线，伤营不需临时重修，可及时接走伤者。",
            "西线后到需要额外清除阵外敌袭；既有阵锚可修复，师兄的护持任务仍能继续。"
          ]
        }
      }
    },
    "war-west": {
      "id": "war-west",
      "title": "莲华结界的代价",
      "summary": "核阵锚、驱敌，交苦莲子给师兄护持，守住撤离路。师兄以修为为代价保全同门，战后仍存活并需要照护。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "war-order",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "heti"
          }
        ],
        "any": [
          {
            "type": "choice",
            "task": "war-order",
            "id": "west-first"
          },
          {
            "type": "task",
            "id": "war-east",
            "status": "claimed"
          }
        ]
      },
      "objectives": [
        {
          "id": "inspect-west-anchor",
          "title": "核先后次序对应的裂损"
        },
        {
          "id": "repair-west-left",
          "title": "修左锚"
        },
        {
          "id": "repair-west-right",
          "title": "修右锚"
        },
        {
          "id": "clear-west-pressure",
          "title": "击退阵外巨傀（先后选择不同静态敌情）"
        },
        {
          "id": "entrust-lotus-to-lingyun",
          "title": "将苦莲子交师兄作不可逆护持"
        },
        {
          "id": "hold-west-lotus-line",
          "title": "趁结界护住撤离路"
        },
        {
          "id": "recover-powerless-lingyun",
          "title": "确认师兄存活而修为已废"
        },
        {
          "id": "west-early-receipt",
          "title": "先到西线，核未断的阵锚"
        },
        {
          "id": "west-arrival-ready",
          "title": "先到西线，核未断的阵锚"
        },
        {
          "id": "west-late-pressure-won",
          "title": "晚到西线：先驱离阵外追击傀"
        },
        {
          "id": "west-left-intact",
          "title": "先到核左锚，保留修复料"
        },
        {
          "id": "west-left-repaired",
          "title": "晚到修左锚，实际投入一份阵料"
        },
        {
          "id": "west-right-intact",
          "title": "先到核右锚，保留修复料"
        },
        {
          "id": "west-right-repaired",
          "title": "晚到修右锚，实际投入一份阵料"
        },
        {
          "id": "clear-west-pressure-0-won",
          "title": "联军侧翼援护下清西线巨傀"
        },
        {
          "id": "clear-west-pressure-1-won",
          "title": "各军自主：正面清西线巨傀"
        },
        {
          "id": "hold-west-lotus-line-0-won",
          "title": "平反阵师按门规回执协助稳住莲华结界"
        },
        {
          "id": "hold-west-lotus-line-1-won",
          "title": "自行稳住莲华结界并清敌"
        }
      ],
      "requiredObjectives": [
        "inspect-west-anchor",
        "repair-west-left",
        "repair-west-right",
        "clear-west-pressure",
        "entrust-lotus-to-lingyun",
        "hold-west-lotus-line",
        "recover-powerless-lingyun",
        "west-arrival-ready"
      ],
      "sequence": [],
      "choices": [],
      "volumeLabel": "合体卷",
      "sources": [
        {
          "file": "src/lib/story/volume4.ts",
          "line": 1154,
          "node": "heti_day_2"
        }
      ],
      "sinceRevision": 3,
      "group": "war"
    },
    "war-east": {
      "id": "war-east",
      "title": "阿辰与伤兵营",
      "summary": "苏叶报出伤者与十四岁阿辰的位置。守住伤营、用担架固定并撤离，再逐人交接；阿辰仍是受保护的未成年弟子。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "war-order",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "heti"
          }
        ],
        "any": [
          {
            "type": "choice",
            "task": "war-order",
            "id": "east-first"
          },
          {
            "type": "task",
            "id": "war-west",
            "status": "claimed"
          }
        ]
      },
      "objectives": [
        {
          "id": "check-east-wounded",
          "title": "核伤营与十四岁阿辰位置"
        },
        {
          "id": "stop-east-puppet",
          "title": "护住伤营，完成真战"
        },
        {
          "id": "splint-achen",
          "title": "固定伤处、用担架把他撤下"
        },
        {
          "id": "escort-east-patients",
          "title": "交接伤员，核苏叶人员名单"
        },
        {
          "id": "east-early-receipt",
          "title": "先到伤营，确认撤路仍通"
        },
        {
          "id": "east-route-ready",
          "title": "先到伤营，确认撤路仍通"
        },
        {
          "id": "east-local-material",
          "title": "医药优先且晚到：从未损医帐拆出一份修补料"
        },
        {
          "id": "east-camp-repaired",
          "title": "晚到东线：用一份修补料修通伤营"
        },
        {
          "id": "east-pursuit-won",
          "title": "晚到东线：击退修路后的追兵"
        },
        {
          "id": "stop-east-puppet-0-won",
          "title": "开放典籍的医阵抄本援护伤营"
        },
        {
          "id": "stop-east-puppet-1-won",
          "title": "守住伤营击退巨傀"
        }
      ],
      "requiredObjectives": [
        "check-east-wounded",
        "stop-east-puppet",
        "splint-achen",
        "escort-east-patients",
        "east-route-ready"
      ],
      "sequence": [],
      "choices": [],
      "volumeLabel": "合体卷",
      "sources": [
        {
          "file": "src/lib/story/volume4.ts",
          "line": 1171,
          "node": "heti_achen_stands"
        }
      ],
      "sinceRevision": 3,
      "group": "war"
    },
    "guixu-family": {
      "id": "guixu-family",
      "title": "外婆残魂与最后的母子相认",
      "summary": "被囚傀儡是凌玉琅的母亲、你的外婆。破外在控魂阵，让玉琅与母亲告别，独立留存外婆遗簪。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "war-west",
            "status": "claimed"
          },
          {
            "type": "task",
            "id": "war-east",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "heti"
          }
        ],
        "any": []
      },
      "objectives": [
        {
          "id": "identify-grandmother-puppet",
          "title": "核外婆与母亲凌玉杏的亲属区别"
        },
        {
          "id": "cut-grandmother-control",
          "title": "击碎外在控魂阵，不攻击被囚残魂"
        },
        {
          "id": "witness-uncle-farewell",
          "title": "玉琅解脱母亲残魂，交银簪留证"
        }
      ],
      "requiredObjectives": [
        "identify-grandmother-puppet",
        "cut-grandmother-control",
        "witness-uncle-farewell"
      ],
      "sequence": [],
      "choices": [],
      "volumeLabel": "合体卷",
      "sources": [
        {
          "file": "src/lib/story/volume4.ts",
          "line": 1201,
          "node": "heti_uncle_mother_puppet"
        }
      ],
      "sinceRevision": 3,
      "group": "war"
    },
    "guixu-final": {
      "id": "guixu-final",
      "title": "守心一剑",
      "summary": "破玄玑魔甲，耗尽母亲留下的锁芯余息，再趁舅舅碎丹锁敌完成终战。自己的空半壳留身，收殓在独立遗物安放处办理。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "guixu-family",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "heti"
          }
        ],
        "any": []
      },
      "objectives": [
        {
          "id": "fight-xuanji-demon-armor",
          "title": "破玄玑外层魔甲"
        },
        {
          "id": "lock-core-spent",
          "title": "母亲留下的锁芯余息护住元婴，空半壳仍在"
        },
        {
          "id": "fight-xuanji-final-bind",
          "title": "舅舅以碎丹锁敌，实际完成最后一战"
        },
        {
          "id": "recover-uncle-remains",
          "title": "收殓并接回魔丹残片"
        },
        {
          "id": "recover-reception-dial",
          "title": "从已停用中枢取接引定盘并记录封签"
        }
      ],
      "requiredObjectives": [
        "fight-xuanji-demon-armor",
        "lock-core-spent",
        "fight-xuanji-final-bind",
        "recover-uncle-remains",
        "recover-reception-dial"
      ],
      "sequence": [],
      "choices": [],
      "volumeLabel": "合体卷",
      "sources": [
        {
          "file": "src/lib/story/volume4.ts",
          "line": 1218,
          "node": "heti_1v1"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 1258,
          "node": "heti_final_strike"
        }
      ],
      "sinceRevision": 3,
      "group": "war"
    },
    "war-aftermath": {
      "id": "war-aftermath",
      "title": "合锁送葬与归山",
      "summary": "合锁诀别，舅舅半锁入葬。安顿废功的师兄、核阿辰康复，把两线先后与真实救援结果记入山门档案。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "guixu-final",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "heti"
          }
        ],
        "any": []
      },
      "objectives": [
        {
          "id": "bury-lingyulang",
          "title": "合两半锁诀别，舅舅半锁入葬，自己的空半壳留身"
        },
        {
          "id": "settle-lingyun-care",
          "title": "安排无修为师兄的居处与教书"
        },
        {
          "id": "check-achen-recovery",
          "title": "阿辰康复记录"
        },
        {
          "id": "record-war-losses",
          "title": "记实际双线先后和救援后果"
        }
      ],
      "requiredObjectives": [
        "bury-lingyulang",
        "settle-lingyun-care",
        "check-achen-recovery",
        "record-war-losses"
      ],
      "sequence": [],
      "choices": [],
      "volumeLabel": "合体卷",
      "sources": [
        {
          "file": "src/lib/story/volume4.ts",
          "line": 1283,
          "node": "heti_aftermath"
        }
      ],
      "sinceRevision": 3,
      "group": "war"
    },
    "dacheng-preparation": {
      "id": "dacheng-preparation",
      "title": "三十年的交接与重铸",
      "summary": "战后三十年，重铸守心剑，依旧拓片取碑印，在三个现场校准护持器。完成清微祭与传承，逐一登记愿同行者。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "war-aftermath",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "heti"
          }
        ],
        "any": []
      },
      "objectives": [
        {
          "id": "receive-reforge-material",
          "title": "领取一份战后重铸料"
        },
        {
          "id": "reforge-shouxin",
          "title": "重铸守心剑"
        },
        {
          "id": "prepare-tablet-imprint",
          "title": "依万妖原碑拓记取印板，注明复核来源"
        },
        {
          "id": "match-gate-three-components",
          "title": "逐一核碑印、界路楔、定盘，完成三点校准"
        },
        {
          "id": "arrange-qingwei-memorial",
          "title": "师父坐化后完成祭与传承"
        },
        {
          "id": "collect-willing-companions",
          "title": "逐一确认同门、伤者与民众自己的去留意愿"
        },
        {
          "id": "calibrate-gate-tablet",
          "title": "把已复核的碑纹印板校入护座"
        },
        {
          "id": "calibrate-gate-wedge",
          "title": "将界路楔校入侧座并核撤路"
        },
        {
          "id": "calibrate-gate-dial",
          "title": "对准接引定盘，确认三座呼应"
        }
      ],
      "requiredObjectives": [
        "receive-reforge-material",
        "reforge-shouxin",
        "prepare-tablet-imprint",
        "match-gate-three-components",
        "arrange-qingwei-memorial",
        "collect-willing-companions",
        "calibrate-gate-tablet",
        "calibrate-gate-wedge",
        "calibrate-gate-dial"
      ],
      "sequence": [],
      "choices": [],
      "volumeLabel": "大乘卷",
      "sources": [
        {
          "file": "src/lib/story/volume4.ts",
          "line": 1302,
          "node": "dacheng_30years_1"
        },
        {
          "file": "src/lib/story/volume3.ts",
          "line": 960,
          "node": "jindan_meet_liuruyan"
        }
      ],
      "sinceRevision": 3
    },
    "dacheng-breakthrough": {
      "id": "dacheng-breakthrough",
      "title": "仙、魔与众生三组劫",
      "summary": "依次经历仙、魔与众生三组劫战，段间可检身体与符药。每组胜利单独保留，最后复验领取大乘。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "dacheng-preparation",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "heti"
          }
        ],
        "any": []
      },
      "objectives": [
        {
          "id": "fight-dacheng-immortal",
          "title": "仙劫：稳守与清除高压雷影"
        },
        {
          "id": "settle-dacheng-immortal",
          "title": "段间检身体与符药"
        },
        {
          "id": "fight-dacheng-demon",
          "title": "魔劫：先破护甲再制控魂影"
        },
        {
          "id": "settle-dacheng-demon",
          "title": "段间归拢神识"
        },
        {
          "id": "fight-dacheng-living",
          "title": "众生劫：保护撤路标志并完成真实战斗"
        },
        {
          "id": "settle-dacheng-realm",
          "title": "复验领取大乘"
        }
      ],
      "requiredObjectives": [
        "fight-dacheng-immortal",
        "settle-dacheng-immortal",
        "fight-dacheng-demon",
        "settle-dacheng-demon",
        "fight-dacheng-living",
        "settle-dacheng-realm"
      ],
      "sequence": [],
      "choices": [],
      "volumeLabel": "大乘卷",
      "sources": [
        {
          "file": "src/lib/story/volume4.ts",
          "line": 1359,
          "node": "dacheng_breakthrough"
        }
      ],
      "sinceRevision": 3,
      "trial": true
    },
    "heaven-gate": {
      "id": "heaven-gate",
      "title": "在天门前作最后选择",
      "summary": "传掌门印，与师兄和灵薇按实际关系告别。独登、携众或留世都需明确确认；携众另需真实意愿与护持，不自动结契。",
      "requires": {
        "all": [
          {
            "type": "task",
            "id": "dacheng-breakthrough",
            "status": "claimed"
          },
          {
            "type": "realm",
            "id": "dacheng"
          }
        ],
        "any": []
      },
      "objectives": [
        {
          "id": "handover-shushan-seal",
          "title": "传掌门印，确认人间照护继续"
        },
        {
          "id": "farewell-lingyun",
          "title": "与活着的师兄话别"
        },
        {
          "id": "farewell-shen",
          "title": "按本档朋友/亲近实际关系告别"
        },
        {
          "id": "choose-heaven-ending-alone",
          "title": "独自入仙门"
        },
        {
          "id": "choose-heaven-ending",
          "title": "独自入仙门"
        },
        {
          "id": "choose-heaven-ending-together",
          "title": "携愿同行者登天"
        },
        {
          "id": "choose-heaven-ending-stay",
          "title": "留在人间"
        }
      ],
      "requiredObjectives": [
        "handover-shushan-seal",
        "farewell-lingyun",
        "farewell-shen",
        "choose-heaven-ending"
      ],
      "sequence": [],
      "choices": [
        {
          "id": "alone",
          "label": "独自入仙门"
        },
        {
          "id": "together",
          "label": "携愿同行者登天"
        },
        {
          "id": "stay",
          "label": "留在人间"
        }
      ],
      "volumeLabel": "大乘卷",
      "sources": [
        {
          "file": "src/lib/story/volume4.ts",
          "line": 1514,
          "node": "dacheng_gate_arrive"
        },
        {
          "file": "src/lib/story/volume4.ts",
          "line": 354,
          "node": "dacheng_farewell"
        }
      ],
      "sinceRevision": 3
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
    },
    "accept-northbound-preparation": {
      "id": "accept-northbound-preparation",
      "task": "northbound-preparation",
      "map": "beihuang-retreat",
      "objectId": "northQingweiLetter",
      "kind": "accept",
      "label": "办理：循前路赴北荒",
      "detail": "三年整备后，循来信赴北荒。领取本次接地与固定伤处的包材，依次铺西线、接东桩；三途承诺保留在先前行程中。",
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
      "sinceRevision": 3
    },
    "read-northbound-writ": {
      "id": "read-northbound-writ",
      "task": "northbound-preparation",
      "map": "beihuang-retreat",
      "objectId": "northQingweiLetter",
      "kind": "progress",
      "label": "核师门来信，确认此行先赴北荒；保留原三途承诺",
      "detail": "三年整备后，清微来信指向北荒避劫谷。你保留此前回山、独自追查或赴魔域的承诺；这一次先查亲缘与旧矿线索，不被迫改投宗门。",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "read-northbound-writ"
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
      "sinceRevision": 3
    },
    "receive-north-kit": {
      "id": "receive-north-kit",
      "task": "northbound-preparation",
      "map": "beihuang-retreat",
      "objectId": "northKit",
      "kind": "progress",
      "label": "领取避劫、夹板各一包",
      "detail": "领取避劫、夹板各一包",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "northbound-preparation",
            "id": "read-northbound-writ"
          }
        ],
        "any": []
      },
      "marks": [
        "receive-north-kit"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {
          "north-storm-kit": 1,
          "north-healing-pack": 1
        },
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "ground-north-west": {
      "id": "ground-north-west",
      "task": "northbound-preparation",
      "map": "beihuang-retreat",
      "objectId": "northGroundWest",
      "kind": "progress",
      "label": "铺西侧导线",
      "detail": "铺西侧导线",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "northbound-preparation",
            "id": "receive-north-kit"
          }
        ],
        "any": []
      },
      "marks": [
        "ground-north-west"
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
      "sinceRevision": 3
    },
    "ground-north-east": {
      "id": "ground-north-east",
      "task": "northbound-preparation",
      "map": "beihuang-retreat",
      "objectId": "northGroundEast",
      "kind": "progress",
      "label": "接地并核两桩",
      "detail": "接地并核两桩",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "northbound-preparation",
            "id": "ground-north-west"
          }
        ],
        "any": []
      },
      "marks": [
        "ground-north-east"
      ],
      "cost": {
        "items": {},
        "supplies": {
          "north-storm-kit": 1
        }
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "claim-northbound-preparation": {
      "id": "claim-northbound-preparation",
      "task": "northbound-preparation",
      "map": "beihuang-retreat",
      "objectId": "northGroundEast",
      "kind": "claim",
      "label": "交付：循前路赴北荒",
      "detail": "全部必要行动实际完成后一次交付；满仓整单拒绝。",
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
      "sinceRevision": 3
    },
    "accept-yuanying-breakthrough": {
      "id": "accept-yuanying-breakthrough",
      "task": "yuanying-breakthrough",
      "map": "beihuang-retreat",
      "objectId": "northTrial",
      "kind": "accept",
      "label": "办理：归墟结婴",
      "detail": "先卸暴雷，接受舅舅护法，再选末段备物。两场劫战各自记录胜利，失败只重试当前段；稳定本体后领取元婴境界。",
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
      "sinceRevision": 3
    },
    "fight-yuanying-outer-thunder": {
      "id": "fight-yuanying-outer-thunder",
      "task": "yuanying-breakthrough",
      "map": "beihuang-retreat",
      "objectId": "northTrial",
      "kind": "battle",
      "label": "卸去前段暴雷",
      "detail": "卸去前段暴雷",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "fight-yuanying-outer-thunder"
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
      "sinceRevision": 3,
      "encounter": "fight-yuanying-outer-thunder"
    },
    "accept-uncle-guard": {
      "id": "accept-uncle-guard",
      "task": "yuanying-breakthrough",
      "map": "beihuang-retreat",
      "objectId": "northLingyulang",
      "kind": "progress",
      "label": "接受舅舅护法与一份实用回复药",
      "detail": "凌玉琅挡住谷外余雷，叫你稳住本体。他是母亲凌玉杏的幼弟；这次以舅舅身份护法，不以是否加入魔域交换亲情。另交一枚普通回气丹，使用仍由你决定。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "yuanying-breakthrough",
            "id": "fight-yuanying-outer-thunder"
          }
        ],
        "any": []
      },
      "marks": [
        "accept-uncle-guard"
      ],
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
      "sinceRevision": 3
    },
    "choose-yuanying-focus-steady": {
      "id": "choose-yuanying-focus-steady",
      "task": "yuanying-breakthrough",
      "map": "beihuang-retreat",
      "objectId": "northTrial",
      "kind": "choice",
      "label": "稳守护持",
      "detail": "领护身符一张用于末段护持。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "yuanying-breakthrough",
            "id": "accept-uncle-guard"
          }
        ],
        "any": []
      },
      "marks": [
        "choose-yuanying-focus-steady",
        "choose-yuanying-focus"
      ],
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
      "sinceRevision": 3,
      "choice": "steady",
      "confirm": {
        "title": "确定末段护持方式",
        "text": "领护身符一张用于末段护持。",
        "label": "确认：稳守护持"
      }
    },
    "choose-yuanying-focus-sword": {
      "id": "choose-yuanying-focus-sword",
      "task": "yuanying-breakthrough",
      "map": "beihuang-retreat",
      "objectId": "northTrial",
      "kind": "choice",
      "label": "剑修断雷",
      "detail": "须首章实际剑修训练；领烈焰符两张，用于断雷。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "yuanying-breakthrough",
            "id": "accept-uncle-guard"
          },
          {
            "type": "originTraining",
            "id": "sword"
          }
        ],
        "any": []
      },
      "marks": [
        "choose-yuanying-focus-sword",
        "choose-yuanying-focus"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {
          "fire": 2
        },
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 3,
      "choice": "sword",
      "confirm": {
        "title": "确定末段护持方式",
        "text": "须首章实际剑修训练；领烈焰符两张，用于断雷。",
        "label": "确认：剑修断雷"
      }
    },
    "choose-yuanying-focus-medicine": {
      "id": "choose-yuanying-focus-medicine",
      "task": "yuanying-breakthrough",
      "map": "beihuang-retreat",
      "objectId": "northTrial",
      "kind": "choice",
      "label": "医修固本",
      "detail": "须首章实际医修训练；领回气丹一枚固本。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "yuanying-breakthrough",
            "id": "accept-uncle-guard"
          },
          {
            "type": "originTraining",
            "id": "medicine"
          }
        ],
        "any": []
      },
      "marks": [
        "choose-yuanying-focus-medicine",
        "choose-yuanying-focus"
      ],
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
      "sinceRevision": 3,
      "choice": "medicine",
      "confirm": {
        "title": "确定末段护持方式",
        "text": "须首章实际医修训练；领回气丹一枚固本。",
        "label": "确认：医修固本"
      }
    },
    "choose-yuanying-focus-scholar": {
      "id": "choose-yuanying-focus-scholar",
      "task": "yuanying-breakthrough",
      "map": "beihuang-retreat",
      "objectId": "northTrial",
      "kind": "choice",
      "label": "符修辨息",
      "detail": "须首章实际符修训练；领银针符两张，用于辨息控场。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "yuanying-breakthrough",
            "id": "accept-uncle-guard"
          },
          {
            "type": "originTraining",
            "id": "scholar"
          }
        ],
        "any": []
      },
      "marks": [
        "choose-yuanying-focus-scholar",
        "choose-yuanying-focus"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {
          "needle": 2
        },
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 3,
      "choice": "scholar",
      "confirm": {
        "title": "确定末段护持方式",
        "text": "须首章实际符修训练；领银针符两张，用于辨息控场。",
        "label": "确认：符修辨息"
      }
    },
    "fight-yuanying-life-trial": {
      "id": "fight-yuanying-life-trial",
      "task": "yuanying-breakthrough",
      "map": "beihuang-retreat",
      "objectId": "northTrial",
      "kind": "battle",
      "label": "独自完成末段命劫",
      "detail": "独自完成末段命劫",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "yuanying-breakthrough",
            "id": "choose-yuanying-focus"
          }
        ],
        "any": []
      },
      "marks": [
        "fight-yuanying-life-trial"
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
      "sinceRevision": 3,
      "encounter": "fight-yuanying-life-trial"
    },
    "settle-yuanying": {
      "id": "settle-yuanying",
      "task": "yuanying-breakthrough",
      "map": "beihuang-retreat",
      "objectId": "northTrial",
      "kind": "progress",
      "label": "核元婴与本体稳定",
      "detail": "核元婴与本体稳定",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "yuanying-breakthrough",
            "id": "fight-yuanying-life-trial"
          }
        ],
        "any": []
      },
      "marks": [
        "settle-yuanying"
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
      "sinceRevision": 3
    },
    "claim-yuanying-breakthrough": {
      "id": "claim-yuanying-breakthrough",
      "task": "yuanying-breakthrough",
      "map": "beihuang-retreat",
      "objectId": "northTrial",
      "kind": "claim",
      "label": "复验并领取归墟结婴",
      "detail": "全部必要行动实际完成后一次交付；满仓整单拒绝。",
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
      "sinceRevision": 3
    },
    "accept-northbound-rescue": {
      "id": "accept-northbound-rescue",
      "task": "northbound-rescue",
      "map": "beihuang-retreat",
      "objectId": "northWoundedLingyun",
      "kind": "accept",
      "label": "办理：带同门活着归山",
      "detail": "击退追兵、用夹板固定师兄伤处并交接。铁牌、凤羽残光与魔纹矿钥须各由在场者亲自交付。",
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
      "sinceRevision": 3
    },
    "clear-north-pursuit": {
      "id": "clear-north-pursuit",
      "task": "northbound-rescue",
      "map": "beihuang-retreat",
      "objectId": "northWoundedLingyun",
      "kind": "battle",
      "label": "打退追击师兄的暗桩",
      "detail": "打退追击师兄的暗桩",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "clear-north-pursuit"
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
      "sinceRevision": 3,
      "encounter": "clear-north-pursuit"
    },
    "splint-lingyun": {
      "id": "splint-lingyun",
      "task": "northbound-rescue",
      "map": "beihuang-retreat",
      "objectId": "northWoundedLingyun",
      "kind": "progress",
      "label": "实际固定伤处",
      "detail": "实际固定伤处",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "northbound-rescue",
            "id": "clear-north-pursuit"
          }
        ],
        "any": []
      },
      "marks": [
        "splint-lingyun"
      ],
      "cost": {
        "items": {},
        "supplies": {
          "north-healing-pack": 1
        }
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "handoff-lingyun": {
      "id": "handoff-lingyun",
      "task": "northbound-rescue",
      "map": "beihuang-retreat",
      "objectId": "northShen",
      "kind": "progress",
      "label": "把伤者交给接应者",
      "detail": "把伤者交给接应者",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "northbound-rescue",
            "id": "splint-lingyun"
          }
        ],
        "any": []
      },
      "marks": [
        "handoff-lingyun"
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
      "sinceRevision": 3
    },
    "receive-brother-credential": {
      "id": "receive-brother-credential",
      "task": "northbound-rescue",
      "map": "beihuang-retreat",
      "objectId": "northWoundedLingyun",
      "kind": "progress",
      "label": "师兄当面交铁牌",
      "detail": "伤处已经固定并交给同门照护。凌云子当面把铁牌交你，愿你此后仍认得回山的路；这次亲交才算实得，不追补过去未拿的物件。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "northbound-rescue",
            "id": "handoff-lingyun"
          }
        ],
        "any": []
      },
      "marks": [
        "receive-brother-credential"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [
          "brother-iron-badge"
        ],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "receive-feather-remnant": {
      "id": "receive-feather-remnant",
      "task": "northbound-rescue",
      "map": "beihuang-retreat",
      "objectId": "northShen",
      "kind": "progress",
      "label": "灵薇确认万妖救援后的凤羽残光去向",
      "detail": "灵薇把已经燃过的凤羽残光护匣交给你，补齐万妖之后的实际交接。它留下曾经护人的证据，不再提供一次免死。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "northbound-rescue",
            "id": "receive-brother-credential"
          }
        ],
        "any": []
      },
      "marks": [
        "receive-feather-remnant"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [
          "phoenix-feather-remnant"
        ],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "receive-demon-mine-key": {
      "id": "receive-demon-mine-key",
      "task": "northbound-rescue",
      "map": "beihuang-retreat",
      "objectId": "northLingyulang",
      "kind": "progress",
      "label": "舅舅从旧矿守封匣交出魔纹矿钥并具名",
      "detail": "舅舅从旧矿守封匣交出魔纹矿钥并具名",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "northbound-rescue",
            "id": "receive-feather-remnant"
          }
        ],
        "any": []
      },
      "marks": [
        "receive-demon-mine-key"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [
          "mine-key-demon"
        ],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "claim-northbound-rescue": {
      "id": "claim-northbound-rescue",
      "task": "northbound-rescue",
      "map": "beihuang-retreat",
      "objectId": "northLingyulang",
      "kind": "claim",
      "label": "交付：带同门活着归山",
      "detail": "全部必要行动实际完成后一次交付；满仓整单拒绝。",
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
      "sinceRevision": 3
    },
    "accept-summit-evidence": {
      "id": "accept-summit-evidence",
      "task": "summit-evidence",
      "map": "golden-summit",
      "objectId": "summitArchive",
      "kind": "accept",
      "label": "办理：呈证前的两次核验",
      "detail": "查矿账、核签押，再听两位证人的具名口述。已保全的原卷可以直接比印；无原卷也能从登记原簿补证。",
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
      "sinceRevision": 3
    },
    "audit-summit-ledger": {
      "id": "audit-summit-ledger",
      "task": "summit-evidence",
      "map": "golden-summit",
      "objectId": "summitArchive",
      "kind": "progress",
      "label": "核矿账签押与次序",
      "detail": "核矿账签押与次序",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "audit-summit-ledger"
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
      "sinceRevision": 3
    },
    "choose-summit-proof-method-carried-docket": {
      "id": "choose-summit-proof-method-carried-docket",
      "task": "summit-evidence",
      "map": "golden-summit",
      "objectId": "summitEvidenceDesk",
      "kind": "choice",
      "label": "核自己保全的原卷",
      "detail": "必须确实在万妖救援中保全签押原卷；直接比印，省去查原簿与复签两步。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "summit-evidence",
            "id": "audit-summit-ledger"
          },
          {
            "type": "evidence",
            "id": "outer-signed-docket"
          }
        ],
        "any": []
      },
      "marks": [
        "choose-summit-proof-method-carried-docket",
        "choose-summit-proof-method"
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
      "sinceRevision": 3,
      "choice": "carried-docket",
      "confirm": {
        "title": "选择核验路径",
        "text": "必须确实在万妖救援中保全签押原卷；直接比印，省去查原簿与复签两步。",
        "label": "确认：核自己保全的原卷"
      }
    },
    "choose-summit-proof-method-clerk-and-witness": {
      "id": "choose-summit-proof-method-clerk-and-witness",
      "task": "summit-evidence",
      "map": "golden-summit",
      "objectId": "summitEvidenceDesk",
      "kind": "choice",
      "label": "查原簿补证",
      "detail": "从库吏登记原簿和实地见证补齐签押证据，不要求上一段选择护证。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "summit-evidence",
            "id": "audit-summit-ledger"
          }
        ],
        "any": []
      },
      "marks": [
        "choose-summit-proof-method-clerk-and-witness",
        "choose-summit-proof-method"
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
      "sinceRevision": 3,
      "choice": "clerk-and-witness",
      "confirm": {
        "title": "选择核验路径",
        "text": "从库吏登记原簿和实地见证补齐签押证据，不要求上一段选择护证。",
        "label": "确认：查原簿补证"
      }
    },
    "authenticate-carried-docket": {
      "id": "authenticate-carried-docket",
      "task": "summit-evidence",
      "map": "golden-summit",
      "objectId": "summitEvidenceDesk",
      "kind": "progress",
      "label": "用已保全的万妖签押原卷直接比印",
      "detail": "用已保全的万妖签押原卷直接比印",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "summit-evidence",
            "id": "choose-summit-proof-method"
          },
          {
            "type": "evidence",
            "id": "outer-signed-docket"
          },
          {
            "type": "choice",
            "task": "summit-evidence",
            "id": "carried-docket"
          }
        ],
        "any": []
      },
      "marks": [
        "docket-authenticated",
        "paper-authenticated"
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
      "sinceRevision": 3
    },
    "consult-clerk-book": {
      "id": "consult-clerk-book",
      "task": "summit-evidence",
      "map": "golden-summit",
      "objectId": "summitClerk",
      "kind": "progress",
      "label": "查登记原簿（普通补证）",
      "detail": "查登记原簿（普通补证）",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "summit-evidence",
            "id": "choose-summit-proof-method"
          },
          {
            "type": "choice",
            "task": "summit-evidence",
            "id": "clerk-and-witness"
          }
        ],
        "any": []
      },
      "marks": [
        "consult-clerk-book"
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
      "sinceRevision": 3
    },
    "verify-clerk-signature": {
      "id": "verify-clerk-signature",
      "task": "summit-evidence",
      "map": "golden-summit",
      "objectId": "summitArchive",
      "kind": "progress",
      "label": "复核原簿签押并记录独立来源",
      "detail": "复核原簿签押并记录独立来源",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "summit-evidence",
            "id": "consult-clerk-book"
          },
          {
            "type": "choice",
            "task": "summit-evidence",
            "id": "clerk-and-witness"
          }
        ],
        "any": []
      },
      "marks": [
        "clerk-authenticated",
        "paper-authenticated"
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
      "sinceRevision": 3
    },
    "hear-summit-lingyun": {
      "id": "hear-summit-lingyun",
      "task": "summit-evidence",
      "map": "golden-summit",
      "objectId": "summitWitnessLingyun",
      "kind": "progress",
      "label": "核凌云子伤证",
      "detail": "核凌云子伤证",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "summit-evidence",
            "id": "paper-authenticated"
          }
        ],
        "any": []
      },
      "marks": [
        "hear-summit-lingyun"
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
      "sinceRevision": 3
    },
    "hear-summit-liu": {
      "id": "hear-summit-liu",
      "task": "summit-evidence",
      "map": "golden-summit",
      "objectId": "summitWitnessLiu",
      "kind": "progress",
      "label": "核合欢宗遇害弟子具名证词",
      "detail": "核合欢宗遇害弟子具名证词",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "summit-evidence",
            "id": "hear-summit-lingyun"
          }
        ],
        "any": []
      },
      "marks": [
        "hear-summit-liu"
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
      "sinceRevision": 3
    },
    "claim-summit-evidence": {
      "id": "claim-summit-evidence",
      "task": "summit-evidence",
      "map": "golden-summit",
      "objectId": "summitWitnessLiu",
      "kind": "claim",
      "label": "交付：呈证前的两次核验",
      "detail": "全部必要行动实际完成后一次交付；满仓整单拒绝。",
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
      "sinceRevision": 3
    },
    "accept-summit-swordmeet": {
      "id": "accept-summit-swordmeet",
      "task": "summit-swordmeet",
      "map": "golden-summit",
      "objectId": "summitTrialCircle",
      "kind": "accept",
      "label": "办理：七宗试剑与护民之答",
      "detail": "以节制试剑回应七宗质疑，再用你经历过的救援说明护民之道。试剑失利可以整备后再来。",
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
      "sinceRevision": 3
    },
    "fight-summit-measured-spar": {
      "id": "fight-summit-measured-spar",
      "task": "summit-swordmeet",
      "map": "golden-summit",
      "objectId": "summitTrialCircle",
      "kind": "battle",
      "label": "节制试剑：两种敌情，保持原符药/控制用途",
      "detail": "节制试剑：两种敌情，保持原符药/控制用途",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "fight-summit-measured-spar"
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
      "sinceRevision": 3,
      "encounter": "fight-summit-measured-spar"
    },
    "answer-demon-heir": {
      "id": "answer-demon-heir",
      "task": "summit-swordmeet",
      "map": "golden-summit",
      "objectId": "summitTrialCircle",
      "kind": "progress",
      "label": "以实际经历解释护民之道",
      "detail": "以实际经历解释护民之道",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "summit-swordmeet",
            "id": "fight-summit-measured-spar"
          }
        ],
        "any": []
      },
      "marks": [
        "answer-demon-heir"
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
      "sinceRevision": 3
    },
    "claim-summit-swordmeet": {
      "id": "claim-summit-swordmeet",
      "task": "summit-swordmeet",
      "map": "golden-summit",
      "objectId": "summitTrialCircle",
      "kind": "claim",
      "label": "交付：七宗试剑与护民之答",
      "detail": "全部必要行动实际完成后一次交付；满仓整单拒绝。",
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
      "sinceRevision": 3
    },
    "accept-summit-rebellion": {
      "id": "accept-summit-rebellion",
      "task": "summit-rebellion",
      "map": "golden-summit",
      "objectId": "summitEvidenceDesk",
      "kind": "accept",
      "label": "办理：呈证与三宗反水",
      "detail": "当众呈证后，叛宗弟子围堵证人。实际护住撤路，查封矿账柜、清点仙纹矿钥，接应清微后赴问道崖。",
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
      "sinceRevision": 3
    },
    "present-summit-proofs": {
      "id": "present-summit-proofs",
      "task": "summit-rebellion",
      "map": "golden-summit",
      "objectId": "summitEvidenceDesk",
      "kind": "progress",
      "label": "公开具来源的物证与证词",
      "detail": "公开具来源的物证与证词",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "present-summit-proofs"
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
      "sinceRevision": 3
    },
    "protect-summit-witnesses": {
      "id": "protect-summit-witnesses",
      "task": "summit-rebellion",
      "map": "golden-summit",
      "objectId": "summitWitnessLingyun",
      "kind": "battle",
      "label": "护住被围的证人撤路",
      "detail": "护住被围的证人撤路",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "summit-rebellion",
            "id": "present-summit-proofs"
          }
        ],
        "any": []
      },
      "marks": [
        "protect-summit-witnesses"
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
      "sinceRevision": 3,
      "encounter": "protect-summit-witnesses"
    },
    "seize-immortal-mine-key": {
      "id": "seize-immortal-mine-key",
      "task": "summit-rebellion",
      "map": "golden-summit",
      "objectId": "summitArchive",
      "kind": "progress",
      "label": "会审执事在查封账柜清点仙纹矿钥",
      "detail": "会审执事在查封账柜清点仙纹矿钥",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "summit-rebellion",
            "id": "protect-summit-witnesses"
          }
        ],
        "any": []
      },
      "marks": [
        "seize-immortal-mine-key"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [
          "mine-key-immortal"
        ],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "secure-qingwei-retreat": {
      "id": "secure-qingwei-retreat",
      "task": "summit-rebellion",
      "map": "golden-summit",
      "objectId": "summitQingwei",
      "kind": "progress",
      "label": "师父阻敌，转入问道崖",
      "detail": "师父阻敌，转入问道崖",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "summit-rebellion",
            "id": "seize-immortal-mine-key"
          }
        ],
        "any": []
      },
      "marks": [
        "secure-qingwei-retreat"
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
      "sinceRevision": 3
    },
    "claim-summit-rebellion": {
      "id": "claim-summit-rebellion",
      "task": "summit-rebellion",
      "map": "golden-summit",
      "objectId": "summitQingwei",
      "kind": "claim",
      "label": "交付：呈证与三宗反水",
      "detail": "全部必要行动实际完成后一次交付；满仓整单拒绝。",
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
      "sinceRevision": 3
    },
    "accept-heartcliff-inquiry": {
      "id": "accept-heartcliff-inquiry",
      "task": "heartcliff-inquiry",
      "map": "heart-cliff",
      "objectId": "cliffRopeChest",
      "kind": "accept",
      "label": "办理：问道崖上的父书",
      "detail": "从绳具匣领取一套绳具，选择破阵或三步架绳。到达残壁后分别留存飞升偈与父亲血书。",
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
      "sinceRevision": 3
    },
    "take-cliff-rope": {
      "id": "take-cliff-rope",
      "task": "heartcliff-inquiry",
      "map": "heart-cliff",
      "objectId": "cliffRopeChest",
      "kind": "progress",
      "label": "领取一套登崖绳具",
      "detail": "领取一套登崖绳具",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "take-cliff-rope"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {
          "cliff-rope-kit": 1
        },
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "choose-cliff-route-break-array": {
      "id": "choose-cliff-route-break-array",
      "task": "heartcliff-inquiry",
      "map": "heart-cliff",
      "objectId": "cliffSwordArray",
      "kind": "choice",
      "label": "击破残剑阵",
      "detail": "进入一场真实战斗；普通符药照常消耗，失败可整备后重试。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "heartcliff-inquiry",
            "id": "take-cliff-rope"
          }
        ],
        "any": []
      },
      "marks": [
        "choose-cliff-route-break-array",
        "choose-cliff-route"
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
      "sinceRevision": 3,
      "choice": "break-array",
      "confirm": {
        "title": "选实际登崖方法",
        "text": "进入一场真实战斗；普通符药照常消耗，失败可整备后重试。",
        "label": "确认：击破残剑阵"
      }
    },
    "choose-cliff-route-rope-route": {
      "id": "choose-cliff-route-rope-route",
      "task": "heartcliff-inquiry",
      "map": "heart-cliff",
      "objectId": "cliffSwordArray",
      "kind": "choice",
      "label": "架绳稳登崖",
      "detail": "依次西扣、验承重、末扣，末步消耗一套登崖绳具；不打破阵战。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "heartcliff-inquiry",
            "id": "take-cliff-rope"
          }
        ],
        "any": []
      },
      "marks": [
        "choose-cliff-route-rope-route",
        "choose-cliff-route"
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
      "sinceRevision": 3,
      "choice": "rope-route",
      "confirm": {
        "title": "选实际登崖方法",
        "text": "依次西扣、验承重、末扣，末步消耗一套登崖绳具；不打破阵战。",
        "label": "确认：架绳稳登崖"
      }
    },
    "break-cliff-array": {
      "id": "break-cliff-array",
      "task": "heartcliff-inquiry",
      "map": "heart-cliff",
      "objectId": "cliffSwordArray",
      "kind": "battle",
      "label": "破剑阵登崖",
      "detail": "破剑阵登崖",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "heartcliff-inquiry",
            "id": "choose-cliff-route"
          },
          {
            "type": "choice",
            "task": "heartcliff-inquiry",
            "id": "break-array"
          }
        ],
        "any": []
      },
      "marks": [
        "array-cleared",
        "cliff-reached"
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
      "sinceRevision": 3,
      "encounter": "break-cliff-array"
    },
    "tie-cliff-west": {
      "id": "tie-cliff-west",
      "task": "heartcliff-inquiry",
      "map": "heart-cliff",
      "objectId": "cliffRopeWest",
      "kind": "sequence",
      "label": "架绳第一扣",
      "detail": "架绳第一扣",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "heartcliff-inquiry",
            "id": "choose-cliff-route"
          },
          {
            "type": "choice",
            "task": "heartcliff-inquiry",
            "id": "rope-route"
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
      },
      "sinceRevision": 3
    },
    "tie-cliff-middle": {
      "id": "tie-cliff-middle",
      "task": "heartcliff-inquiry",
      "map": "heart-cliff",
      "objectId": "cliffRopeMiddle",
      "kind": "sequence",
      "label": "验绳承重",
      "detail": "验绳承重",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "heartcliff-inquiry",
            "id": "choose-cliff-route"
          },
          {
            "type": "choice",
            "task": "heartcliff-inquiry",
            "id": "rope-route"
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
      },
      "sinceRevision": 3
    },
    "tie-cliff-east": {
      "id": "tie-cliff-east",
      "task": "heartcliff-inquiry",
      "map": "heart-cliff",
      "objectId": "cliffRopeEast",
      "kind": "sequence",
      "label": "最后落扣抵崖",
      "detail": "最后落扣抵崖",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "heartcliff-inquiry",
            "id": "choose-cliff-route"
          },
          {
            "type": "choice",
            "task": "heartcliff-inquiry",
            "id": "rope-route"
          }
        ],
        "any": []
      },
      "marks": [
        "rope-crossed",
        "cliff-reached"
      ],
      "cost": {
        "items": {},
        "supplies": {
          "cliff-rope-kit": 1
        }
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "copy-cliff-sutra": {
      "id": "copy-cliff-sutra",
      "task": "heartcliff-inquiry",
      "map": "heart-cliff",
      "objectId": "cliffSutra",
      "kind": "progress",
      "label": "拓飞升偈",
      "detail": "石壁上是父亲清远的字：“守道，先守心。”旁边叮嘱孩子不要只为寻仇而活，要护好蜀山与众生。你留下一页偈语拓记。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "heartcliff-inquiry",
            "id": "cliff-reached"
          }
        ],
        "any": []
      },
      "marks": [
        "copy-cliff-sutra"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [
          "heart-sutra-page"
        ],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "read-father-bloodletter": {
      "id": "read-father-bloodletter",
      "task": "heartcliff-inquiry",
      "map": "heart-cliff",
      "objectId": "cliffFatherLetter",
      "kind": "progress",
      "label": "读父书并与先前亲缘证据分开留存",
      "detail": "石壁后的玉盒留着玄玑亲批的屠杀密令、灵矿脉图与父亲血书。父亲写下未能护全母亲、未见孩子长大的遗憾，最后仍让你做个好人、为苍生守道。三份材料分别存证，不能把亲缘相认当作已经证明全部罪责。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "heartcliff-inquiry",
            "id": "copy-cliff-sutra"
          }
        ],
        "any": []
      },
      "marks": [
        "read-father-bloodletter"
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
          "father-cliff-letter",
          "xuanji-sealed-order",
          "old-mine-vein-chart"
        ]
      },
      "sinceRevision": 3
    },
    "claim-heartcliff-inquiry": {
      "id": "claim-heartcliff-inquiry",
      "task": "heartcliff-inquiry",
      "map": "heart-cliff",
      "objectId": "cliffFatherLetter",
      "kind": "claim",
      "label": "交付：问道崖上的父书",
      "detail": "全部必要行动实际完成后一次交付；满仓整单拒绝。",
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
      "sinceRevision": 3
    },
    "accept-huashen-breakthrough": {
      "id": "accept-huashen-breakthrough",
      "task": "huashen-breakthrough",
      "map": "golden-summit",
      "objectId": "summitTrialCircle",
      "kind": "accept",
      "label": "办理：守心实践与化神",
      "detail": "回金顶击破玄玑封锁，救护清微。三年修行后再经护心实战，稳定本体，复验化神。",
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
      "sinceRevision": 3
    },
    "fight-xuanji-first-stand": {
      "id": "fight-xuanji-first-stand",
      "task": "huashen-breakthrough",
      "map": "golden-summit",
      "objectId": "summitTrialCircle",
      "kind": "battle",
      "label": "回援金顶，击退玄玑",
      "detail": "以守心之意迎战玄玑，护住金顶同门。此战破其封锁、逼其遁走；归墟中的最后对决尚未发生。",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "fight-xuanji-first-stand"
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
      "sinceRevision": 3,
      "encounter": "fight-xuanji-first-stand"
    },
    "care-qingwei-after-battle": {
      "id": "care-qingwei-after-battle",
      "task": "huashen-breakthrough",
      "map": "golden-summit",
      "objectId": "summitQingwei",
      "kind": "progress",
      "label": "将师父送入医庐，确认玄玑已遁走",
      "detail": "玄玑已从金顶遁走，清微双腿重伤。你先将师父安顿，再继续追查；救命之恩和当年的知情责任，都要分别记清。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "huashen-breakthrough",
            "id": "fight-xuanji-first-stand"
          }
        ],
        "any": []
      },
      "marks": [
        "care-qingwei-after-battle"
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
      "sinceRevision": 3
    },
    "fight-huashen-heart-trial": {
      "id": "fight-huashen-heart-trial",
      "task": "huashen-breakthrough",
      "map": "golden-summit",
      "objectId": "summitTrialCircle",
      "kind": "battle",
      "label": "三年修行后护心问道",
      "detail": "三年修行后护心问道",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "huashen-breakthrough",
            "id": "care-qingwei-after-battle"
          }
        ],
        "any": []
      },
      "marks": [
        "fight-huashen-heart-trial"
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
      "sinceRevision": 3,
      "encounter": "fight-huashen-heart-trial"
    },
    "settle-huashen": {
      "id": "settle-huashen",
      "task": "huashen-breakthrough",
      "map": "golden-summit",
      "objectId": "summitSwordSeal",
      "kind": "progress",
      "label": "复核化神，承担公开呈证责任",
      "detail": "复核化神，承担公开呈证责任",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "huashen-breakthrough",
            "id": "fight-huashen-heart-trial"
          }
        ],
        "any": []
      },
      "marks": [
        "settle-huashen"
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
      "sinceRevision": 3
    },
    "claim-huashen-breakthrough": {
      "id": "claim-huashen-breakthrough",
      "task": "huashen-breakthrough",
      "map": "golden-summit",
      "objectId": "summitSwordSeal",
      "kind": "claim",
      "label": "复验并领取守心实践与化神",
      "detail": "全部必要行动实际完成后一次交付；满仓整单拒绝。",
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
      "sinceRevision": 3
    },
    "accept-mine-dual-keys": {
      "id": "accept-mine-dual-keys",
      "task": "mine-dual-keys",
      "map": "beihuang-retreat",
      "objectId": "northMineLock",
      "kind": "accept",
      "label": "办理：重查天痕矿的实体依据",
      "detail": "回北荒旧矿柜核仙、魔两钥，启匣查采血槽、运单与检修封记。界路楔须有现场来源，疑点仍要经公审。",
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
      "sinceRevision": 3
    },
    "compare-mine-two-keys": {
      "id": "compare-mine-two-keys",
      "task": "mine-dual-keys",
      "map": "beihuang-retreat",
      "objectId": "northMineLock",
      "kind": "progress",
      "label": "核仙魔两钥和账柜封记",
      "detail": "核仙魔两钥和账柜封记",
      "requires": {
        "all": [
          {
            "type": "token",
            "id": "mine-key-immortal"
          },
          {
            "type": "token",
            "id": "mine-key-demon"
          }
        ],
        "any": []
      },
      "marks": [
        "compare-mine-two-keys"
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
      "sinceRevision": 3
    },
    "open-mine-inspection-case": {
      "id": "open-mine-inspection-case",
      "task": "mine-dual-keys",
      "map": "beihuang-retreat",
      "objectId": "northMineLock",
      "kind": "progress",
      "label": "两钥启旧矿检修匣，不消耗钥匙",
      "detail": "两钥启旧矿检修匣，不消耗钥匙",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "mine-dual-keys",
            "id": "compare-mine-two-keys"
          }
        ],
        "any": []
      },
      "marks": [
        "open-mine-inspection-case"
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
      "sinceRevision": 3
    },
    "inspect-mine-blood-groove": {
      "id": "inspect-mine-blood-groove",
      "task": "mine-dual-keys",
      "map": "beihuang-retreat",
      "objectId": "northMineProbeA",
      "kind": "progress",
      "label": "对采血槽与账簿时序",
      "detail": "对采血槽与账簿时序",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "mine-dual-keys",
            "id": "open-mine-inspection-case"
          }
        ],
        "any": []
      },
      "marks": [
        "inspect-mine-blood-groove"
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
      "sinceRevision": 3
    },
    "inspect-mine-transport": {
      "id": "inspect-mine-transport",
      "task": "mine-dual-keys",
      "map": "beihuang-retreat",
      "objectId": "northMineProbeB",
      "kind": "progress",
      "label": "核天痕石运送去向",
      "detail": "核天痕石运送去向",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "mine-dual-keys",
            "id": "inspect-mine-blood-groove"
          }
        ],
        "any": []
      },
      "marks": [
        "inspect-mine-transport"
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
      "sinceRevision": 3
    },
    "recover-mine-boundary-wedge": {
      "id": "recover-mine-boundary-wedge",
      "task": "mine-dual-keys",
      "map": "beihuang-retreat",
      "objectId": "northMineProbeC",
      "kind": "progress",
      "label": "从检修匣取界路楔，封好实物来源",
      "detail": "从检修匣取界路楔，封好实物来源",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "mine-dual-keys",
            "id": "inspect-mine-transport"
          }
        ],
        "any": []
      },
      "marks": [
        "recover-mine-boundary-wedge"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [
          "gate-boundary-wedge"
        ],
        "evidence": [
          "mine-workings-verified"
        ]
      },
      "sinceRevision": 3
    },
    "claim-mine-dual-keys": {
      "id": "claim-mine-dual-keys",
      "task": "mine-dual-keys",
      "map": "beihuang-retreat",
      "objectId": "northMineProbeC",
      "kind": "claim",
      "label": "交付：重查天痕矿的实体依据",
      "detail": "全部必要行动实际完成后一次交付；满仓整单拒绝。",
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
      "sinceRevision": 3
    },
    "accept-huashen-trial": {
      "id": "accept-huashen-trial",
      "task": "huashen-trial",
      "map": "golden-summit",
      "objectId": "summitArchive",
      "kind": "accept",
      "label": "办理：公审与责任",
      "detail": "核查封记录、清微的知情责任与具名遇害者。听取青霞最后证词，区分首恶与胁从，公布判决并平反林清风。",
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
      "sinceRevision": 3
    },
    "catalogue-confiscated-records": {
      "id": "catalogue-confiscated-records",
      "task": "huashen-trial",
      "map": "golden-summit",
      "objectId": "summitArchive",
      "kind": "progress",
      "label": "把查封记录按时间归档",
      "detail": "把查封记录按时间归档",
      "requires": {
        "all": [
          {
            "type": "evidence",
            "id": "xuanji-sealed-order"
          },
          {
            "type": "evidence",
            "id": "mine-workings-verified"
          }
        ],
        "any": []
      },
      "marks": [
        "catalogue-confiscated-records"
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
      "sinceRevision": 3
    },
    "examine-qingwei-responsibility": {
      "id": "examine-qingwei-responsibility",
      "task": "huashen-trial",
      "map": "golden-summit",
      "objectId": "summitQingwei",
      "kind": "progress",
      "label": "请清微说明当年知情与失察",
      "detail": "清微坐在轮椅上回答当年的知情与失察。你把回答同密令、矿证和遇害者名单逐项对照；师徒关系不免除公开说明的责任。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "huashen-trial",
            "id": "catalogue-confiscated-records"
          }
        ],
        "any": []
      },
      "marks": [
        "examine-qingwei-responsibility"
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
      "sinceRevision": 3
    },
    "identify-victim-tablets": {
      "id": "identify-victim-tablets",
      "task": "huashen-trial",
      "map": "golden-summit",
      "objectId": "summitNameTablets",
      "kind": "progress",
      "label": "认领、念名并核三份代表性受害者记录",
      "detail": "认领、念名并核三份代表性受害者记录",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "huashen-trial",
            "id": "examine-qingwei-responsibility"
          }
        ],
        "any": []
      },
      "marks": [
        "identify-victim-tablets"
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
      "sinceRevision": 3
    },
    "hear-qingxia-last-testimony": {
      "id": "hear-qingxia-last-testimony",
      "task": "huashen-trial",
      "map": "golden-summit",
      "objectId": "summitCustody",
      "kind": "progress",
      "label": "核青霞与胁从弟子的不同责任",
      "detail": "核青霞与胁从弟子的不同责任",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "huashen-trial",
            "id": "identify-victim-tablets"
          }
        ],
        "any": []
      },
      "marks": [
        "hear-qingxia-last-testimony"
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
      "sinceRevision": 3
    },
    "publish-trial-sentence": {
      "id": "publish-trial-sentence",
      "task": "huashen-trial",
      "map": "golden-summit",
      "objectId": "summitEvidenceDesk",
      "kind": "progress",
      "label": "公布会审结果、平反林清风、处理叛宗首恶",
      "detail": "会审确认青霞主动害人的责任并执行死刑；两名叛宗宗主收押，受胁迫弟子按具体情节处理。林清风虽已去世，反水救人的事实仍被平反昭雪。蜀山此后收徒不以出身、种族或仙魔定善恶。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "huashen-trial",
            "id": "hear-qingxia-last-testimony"
          }
        ],
        "any": []
      },
      "marks": [
        "publish-trial-sentence"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [
          "public-trial-verdict"
        ],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "claim-huashen-trial": {
      "id": "claim-huashen-trial",
      "task": "huashen-trial",
      "map": "golden-summit",
      "objectId": "summitEvidenceDesk",
      "kind": "claim",
      "label": "交付：公审与责任",
      "detail": "全部必要行动实际完成后一次交付；满仓整单拒绝。",
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
      "sinceRevision": 3
    },
    "accept-reform-charter": {
      "id": "accept-reform-charter",
      "task": "reform-charter",
      "map": "shushan-commons",
      "objectId": "commonsAppealDesk",
      "kind": "accept",
      "label": "办理：门规先改在自己身上",
      "detail": "刑期复核与经阁开放两项都要落实。先复刑可得西线阵师援助，先开放经阁可得东线医阵抄本；先行援助只取一项。",
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
      "sinceRevision": 3
    },
    "read-prison-register": {
      "id": "read-prison-register",
      "task": "reform-charter",
      "map": "shushan-commons",
      "objectId": "commonsAppealDesk",
      "kind": "progress",
      "label": "查冤囚与无期限旧条",
      "detail": "查冤囚与无期限旧条",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "read-prison-register"
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
      "sinceRevision": 3
    },
    "choose-charter-order-sentence-review": {
      "id": "choose-charter-order-sentence-review",
      "task": "reform-charter",
      "map": "shushan-commons",
      "objectId": "commonsCharter",
      "kind": "choice",
      "label": "先复核旧刑",
      "detail": "先安排无期限关押的申诉复核，之后仍完成经阁开放。 被平反的阵师以正式回执支持西线，开放一种修阵援助；不会同时获得东线典籍援助。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "reform-charter",
            "id": "read-prison-register"
          }
        ],
        "any": []
      },
      "marks": [
        "choose-charter-order-sentence-review",
        "choose-charter-order"
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
      "sinceRevision": 3,
      "choice": "sentence-review",
      "confirm": {
        "title": "决定先推行的制度",
        "text": "先安排无期限关押的申诉复核，之后仍完成经阁开放。 被平反的阵师以正式回执支持西线，开放一种修阵援助；不会同时获得东线典籍援助。",
        "label": "确认：先复核旧刑"
      }
    },
    "choose-charter-order-open-library": {
      "id": "choose-charter-order-open-library",
      "task": "reform-charter",
      "map": "shushan-commons",
      "objectId": "commonsCharter",
      "kind": "choice",
      "label": "先开放经阁",
      "detail": "先让散修查阅典籍，之后仍完成刑期复核。 医师取得可核的抄本，支持东线伤营；不会同时获得西线阵师援助。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "reform-charter",
            "id": "read-prison-register"
          }
        ],
        "any": []
      },
      "marks": [
        "choose-charter-order-open-library",
        "choose-charter-order"
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
      "sinceRevision": 3,
      "choice": "open-library",
      "confirm": {
        "title": "决定先推行的制度",
        "text": "先让散修查阅典籍，之后仍完成刑期复核。 医师取得可核的抄本，支持东线伤营；不会同时获得西线阵师援助。",
        "label": "确认：先开放经阁"
      }
    },
    "deliver-sentence-review": {
      "id": "deliver-sentence-review",
      "task": "reform-charter",
      "map": "shushan-commons",
      "objectId": "commonsAppealDesk",
      "kind": "progress",
      "label": "完成限期关押与申诉复核",
      "detail": "完成限期关押与申诉复核",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "reform-charter",
            "id": "choose-charter-order"
          }
        ],
        "any": []
      },
      "marks": [
        "deliver-sentence-review"
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
      "sinceRevision": 3
    },
    "open-public-library": {
      "id": "open-public-library",
      "task": "reform-charter",
      "map": "shushan-commons",
      "objectId": "commonsSchool",
      "kind": "progress",
      "label": "开放经阁并落实登记",
      "detail": "开放经阁并落实登记",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "reform-charter",
            "id": "deliver-sentence-review"
          }
        ],
        "any": []
      },
      "marks": [
        "open-public-library"
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
      "sinceRevision": 3
    },
    "publish-new-charter": {
      "id": "publish-new-charter",
      "task": "reform-charter",
      "map": "shushan-commons",
      "objectId": "commonsCharter",
      "kind": "progress",
      "label": "签新门规、安置反对后离任者",
      "detail": "签新门规、安置反对后离任者",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "reform-charter",
            "id": "open-public-library"
          }
        ],
        "any": []
      },
      "marks": [
        "publish-new-charter"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [
          "reform-charter"
        ],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "claim-reform-charter": {
      "id": "claim-reform-charter",
      "task": "reform-charter",
      "map": "shushan-commons",
      "objectId": "commonsCharter",
      "kind": "claim",
      "label": "交付：门规先改在自己身上",
      "detail": "全部必要行动实际完成后一次交付；满仓整单拒绝。",
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
      "sinceRevision": 3
    },
    "accept-school-shelter": {
      "id": "accept-school-shelter",
      "task": "school-shelter",
      "map": "shushan-commons",
      "objectId": "commonsChildRoll",
      "kind": "accept",
      "label": "办理：义塾与失去父母的孩子",
      "detail": "三份安置包分别用于避雨屋、孩子安置与首课教材，再与医师落实照护。师徒和同门称谓不会自动变成婚姻。",
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
      "sinceRevision": 3
    },
    "receive-school-kits": {
      "id": "receive-school-kits",
      "task": "school-shelter",
      "map": "shushan-commons",
      "objectId": "commonsChildRoll",
      "kind": "progress",
      "label": "核领三份书籍与安置包",
      "detail": "核领三份书籍与安置包",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "receive-school-kits"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {
          "school-kit": 3
        },
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "prepare-school-roof": {
      "id": "prepare-school-roof",
      "task": "school-shelter",
      "map": "shushan-commons",
      "objectId": "commonsSchool",
      "kind": "progress",
      "label": "用一份修整避雨处",
      "detail": "用一份修整避雨处",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "school-shelter",
            "id": "receive-school-kits"
          }
        ],
        "any": []
      },
      "marks": [
        "prepare-school-roof"
      ],
      "cost": {
        "items": {},
        "supplies": {
          "school-kit": 1
        }
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "register-school-children": {
      "id": "register-school-children",
      "task": "school-shelter",
      "map": "shushan-commons",
      "objectId": "commonsChildRoll",
      "kind": "progress",
      "label": "用一份安置并核名单",
      "detail": "用一份安置并核名单",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "school-shelter",
            "id": "prepare-school-roof"
          }
        ],
        "any": []
      },
      "marks": [
        "register-school-children"
      ],
      "cost": {
        "items": {},
        "supplies": {
          "school-kit": 1
        }
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "deliver-first-lesson": {
      "id": "deliver-first-lesson",
      "task": "school-shelter",
      "map": "shushan-commons",
      "objectId": "commonsLingyunTeacher",
      "kind": "progress",
      "label": "用一份教材完成首课与护人实践",
      "detail": "用一份教材完成首课与护人实践",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "school-shelter",
            "id": "register-school-children"
          }
        ],
        "any": []
      },
      "marks": [
        "deliver-first-lesson"
      ],
      "cost": {
        "items": {},
        "supplies": {
          "school-kit": 1
        }
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "arrange-school-care": {
      "id": "arrange-school-care",
      "task": "school-shelter",
      "map": "shushan-commons",
      "objectId": "commonsSuye",
      "kind": "progress",
      "label": "医师与先生分工",
      "detail": "医师与先生分工",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "school-shelter",
            "id": "deliver-first-lesson"
          }
        ],
        "any": []
      },
      "marks": [
        "arrange-school-care"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [
          "school-care-roll"
        ],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "claim-school-shelter": {
      "id": "claim-school-shelter",
      "task": "school-shelter",
      "map": "shushan-commons",
      "objectId": "commonsSuye",
      "kind": "claim",
      "label": "交付：义塾与失去父母的孩子",
      "detail": "全部必要行动实际完成后一次交付；满仓整单拒绝。",
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
      "sinceRevision": 3
    },
    "accept-border-commerce": {
      "id": "accept-border-commerce",
      "task": "border-commerce",
      "map": "shushan-commons",
      "objectId": "commonsTradeLedger",
      "kind": "accept",
      "label": "办理：两界互市第一次交割",
      "detail": "核衡器、护首批商货，再决定医药或接应运力优先。实际封存交割单后才交付对应物资。",
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
      "sinceRevision": 3
    },
    "take-trade-seal": {
      "id": "take-trade-seal",
      "task": "border-commerce",
      "map": "shushan-commons",
      "objectId": "commonsTradeLedger",
      "kind": "progress",
      "label": "领一份官验封签",
      "detail": "领一份官验封签",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "take-trade-seal"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {
          "trade-seal-kit": 1
        },
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "weigh-trade-cargo": {
      "id": "weigh-trade-cargo",
      "task": "border-commerce",
      "map": "shushan-commons",
      "objectId": "commonsScale",
      "kind": "progress",
      "label": "校两方衡器",
      "detail": "校两方衡器",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "border-commerce",
            "id": "take-trade-seal"
          }
        ],
        "any": []
      },
      "marks": [
        "weigh-trade-cargo"
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
      "sinceRevision": 3
    },
    "protect-trade-caravan": {
      "id": "protect-trade-caravan",
      "task": "border-commerce",
      "map": "shushan-commons",
      "objectId": "commonsWagon",
      "kind": "battle",
      "label": "击退破坏首批互市的袭击者",
      "detail": "击退破坏首批互市的袭击者",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "border-commerce",
            "id": "weigh-trade-cargo"
          }
        ],
        "any": []
      },
      "marks": [
        "protect-trade-caravan"
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
      "sinceRevision": 3,
      "encounter": "protect-trade-caravan"
    },
    "choose-trade-priority-medicine": {
      "id": "choose-trade-priority-medicine",
      "task": "border-commerce",
      "map": "shushan-commons",
      "objectId": "commonsTradeLedger",
      "kind": "choice",
      "label": "医药先行",
      "detail": "首批安全运力交付回气丹2枚和温养茶1份。 本次不领额外伤营修补料；必需的战地物资仍由联军按定额供给。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "border-commerce",
            "id": "protect-trade-caravan"
          }
        ],
        "any": []
      },
      "marks": [
        "choose-trade-priority-medicine",
        "choose-trade-priority"
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
      "sinceRevision": 3,
      "choice": "medicine",
      "confirm": {
        "title": "首批安全运力优先用途",
        "text": "首批安全运力交付回气丹2枚和温养茶1份。 本次不领额外伤营修补料；必需的战地物资仍由联军按定额供给。",
        "label": "确认：医药先行"
      }
    },
    "choose-trade-priority-evacuation": {
      "id": "choose-trade-priority-evacuation",
      "task": "border-commerce",
      "map": "shushan-commons",
      "objectId": "commonsTradeLedger",
      "kind": "choice",
      "label": "接应先行",
      "detail": "首批安全运力交付一份伤营修补料，可省去晚到东线的现场筹料。 本次不领额外普通符药。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "border-commerce",
            "id": "protect-trade-caravan"
          }
        ],
        "any": []
      },
      "marks": [
        "choose-trade-priority-evacuation",
        "choose-trade-priority"
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
      "sinceRevision": 3,
      "choice": "evacuation",
      "confirm": {
        "title": "首批安全运力优先用途",
        "text": "首批安全运力交付一份伤营修补料，可省去晚到东线的现场筹料。 本次不领额外普通符药。",
        "label": "确认：接应先行"
      }
    },
    "claim-border-commerce": {
      "id": "claim-border-commerce",
      "task": "border-commerce",
      "map": "shushan-commons",
      "objectId": "commonsTradeLedger",
      "kind": "claim",
      "label": "交付：两界互市第一次交割",
      "detail": "全部必要行动实际完成后一次交付；满仓整单拒绝。",
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
      "sinceRevision": 3
    },
    "accept-governance-review": {
      "id": "accept-governance-review",
      "task": "governance-review",
      "map": "shushan-commons",
      "objectId": "commonsChildRoll",
      "kind": "accept",
      "label": "办理：十年之后选传道或担责",
      "detail": "接七岁阿辰入门、受托圆通舍利，逐项复核十年治理。可在化神立道传法，或保留治理成果继续北伐。",
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
      "sinceRevision": 3
    },
    "receive-achen-as-disciple": {
      "id": "receive-achen-as-disciple",
      "task": "governance-review",
      "map": "shushan-commons",
      "objectId": "commonsChildRoll",
      "kind": "progress",
      "label": "第七年接七岁阿辰入门，明确师徒",
      "detail": "治宗第七年，一个七岁的孩子阿辰来到学籍案前。你确认其安置与照护人，再收入门下；这是一份师徒责任，不能把孩子推上成人关系线。",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "receive-achen-as-disciple"
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
      "sinceRevision": 3
    },
    "receive-yuantong-relic": {
      "id": "receive-yuantong-relic",
      "task": "governance-review",
      "map": "shushan-commons",
      "objectId": "commonsMemorial",
      "kind": "progress",
      "label": "第八年圆通坐化，接寺方托付舍利",
      "detail": "治宗第八年，圆通坐化，寺方将舍利托付给你。此后法华寺由他的师弟接任；战营不会再让圆通本人重新出现。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "governance-review",
            "id": "receive-achen-as-disciple"
          }
        ],
        "any": []
      },
      "marks": [
        "receive-yuantong-relic"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [
          "yuantong-relic"
        ],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "audit-three-reforms": {
      "id": "audit-three-reforms",
      "task": "governance-review",
      "map": "shushan-commons",
      "objectId": "commonsReviewSeal",
      "kind": "progress",
      "label": "逐项复核门规、义塾、商约实际兑现",
      "detail": "逐项复核门规、义塾、商约实际兑现",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "governance-review",
            "id": "receive-yuantong-relic"
          }
        ],
        "any": []
      },
      "marks": [
        "audit-three-reforms"
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
      "sinceRevision": 3
    },
    "choose-governance-future-teach": {
      "id": "choose-governance-future-teach",
      "task": "governance-review",
      "map": "shushan-commons",
      "objectId": "commonsReviewSeal",
      "kind": "choice",
      "label": "立道传法",
      "detail": "在化神境开问道阁，完成本条主线的立道终局。 确认领取后结束本档行程；若要继续北伐，可先导出此刻存档。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "governance-review",
            "id": "audit-three-reforms"
          }
        ],
        "any": []
      },
      "marks": [
        "choose-governance-future-teach",
        "choose-governance-future"
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
      "sinceRevision": 3,
      "choice": "teach",
      "confirm": {
        "title": "选择此生的下一步",
        "text": "在化神境开问道阁，完成本条主线的立道终局。 确认领取后结束本档行程；若要继续北伐，可先导出此刻存档。",
        "label": "确认：立道传法"
      }
    },
    "choose-governance-future-continue": {
      "id": "choose-governance-future-continue",
      "task": "governance-review",
      "map": "shushan-commons",
      "objectId": "commonsReviewSeal",
      "kind": "choice",
      "label": "继续担起战事",
      "detail": "保留已经落实的治理，开启联军与合体道路。 本次不结算化神立道终局；之后仍有三种天门去向。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "governance-review",
            "id": "audit-three-reforms"
          }
        ],
        "any": []
      },
      "marks": [
        "choose-governance-future-continue",
        "choose-governance-future"
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
      "sinceRevision": 3,
      "choice": "continue",
      "confirm": {
        "title": "选择此生的下一步",
        "text": "保留已经落实的治理，开启联军与合体道路。 本次不结算化神立道终局；之后仍有三种天门去向。",
        "label": "确认：继续担起战事"
      }
    },
    "claim-governance-review": {
      "id": "claim-governance-review",
      "task": "governance-review",
      "map": "shushan-commons",
      "objectId": "commonsReviewSeal",
      "kind": "claim",
      "label": "确认本次选择并交付",
      "detail": "全部必要行动实际完成后一次交付；满仓整单拒绝。",
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
      "sinceRevision": 3
    },
    "accept-alliance-muster": {
      "id": "accept-alliance-muster",
      "task": "alliance-muster",
      "map": "alliance-camp",
      "objectId": "campWarTable",
      "kind": "accept",
      "label": "办理：先备人再出征",
      "detail": "核盟约与职责，决定正式结盟或各军自主，领取本次有限物资并接守心剑。舅舅的亲缘援手不改变你的宗门。",
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
      "sinceRevision": 3
    },
    "check-alliance-roll": {
      "id": "check-alliance-roll",
      "task": "alliance-muster",
      "map": "alliance-camp",
      "objectId": "campWarTable",
      "kind": "progress",
      "label": "核本档已立的盟约与战地职责",
      "detail": "核本档已立的盟约与战地职责",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "check-alliance-roll"
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
      "sinceRevision": 3
    },
    "choose-alliance-policy-allied": {
      "id": "choose-alliance-policy-allied",
      "task": "alliance-muster",
      "map": "alliance-camp",
      "objectId": "campRedBanner",
      "kind": "choice",
      "label": "举旗正式结盟",
      "detail": "仙魔联军依真实商约协同，解锁有援军的固定敌情。 宗门归属、身世和个人修习道路不因此改写。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "alliance-muster",
            "id": "check-alliance-roll"
          }
        ],
        "any": []
      },
      "marks": [
        "choose-alliance-policy-allied",
        "choose-alliance-policy"
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
      "sinceRevision": 3,
      "choice": "allied",
      "confirm": {
        "title": "明确仙魔合作方式",
        "text": "仙魔联军依真实商约协同，解锁有援军的固定敌情。 宗门归属、身世和个人修习道路不因此改写。",
        "label": "确认：举旗正式结盟"
      }
    },
    "choose-alliance-policy-independent": {
      "id": "choose-alliance-policy-independent",
      "task": "alliance-muster",
      "map": "alliance-camp",
      "objectId": "campRedBanner",
      "kind": "choice",
      "label": "各军保留自主",
      "detail": "舅舅以亲人身份援手，魔域部队不受此行指挥。 战场采用无魔域援军的普通敌情；定额整备和两条战线仍可完成。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "alliance-muster",
            "id": "check-alliance-roll"
          }
        ],
        "any": []
      },
      "marks": [
        "choose-alliance-policy-independent",
        "choose-alliance-policy"
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
      "sinceRevision": 3,
      "choice": "independent",
      "confirm": {
        "title": "明确仙魔合作方式",
        "text": "舅舅以亲人身份援手，魔域部队不受此行指挥。 战场采用无魔域援军的普通敌情；定额整备和两条战线仍可完成。",
        "label": "确认：各军保留自主"
      }
    },
    "receive-frontline-supplies": {
      "id": "receive-frontline-supplies",
      "task": "alliance-muster",
      "map": "alliance-camp",
      "objectId": "campSupply",
      "kind": "progress",
      "label": "领取此次战线定额",
      "detail": "领取此次战线定额",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "alliance-muster",
            "id": "choose-alliance-policy"
          }
        ],
        "any": []
      },
      "marks": [
        "receive-frontline-supplies"
      ],
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
        "supplies": {
          "frontline-lotus-seed": 1,
          "west-repair-kit": 2,
          "east-stretcher": 1
        },
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "receive-shouxin-sword": {
      "id": "receive-shouxin-sword",
      "task": "alliance-muster",
      "map": "alliance-camp",
      "objectId": "campSwordAnvil",
      "kind": "progress",
      "label": "清微当面交守心剑，核交接来源",
      "detail": "清微当面交守心剑，核交接来源",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "alliance-muster",
            "id": "receive-frontline-supplies"
          }
        ],
        "any": []
      },
      "marks": [
        "receive-shouxin-sword"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [
          "shouxin-sword"
        ],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "claim-alliance-muster": {
      "id": "claim-alliance-muster",
      "task": "alliance-muster",
      "map": "alliance-camp",
      "objectId": "campSwordAnvil",
      "kind": "claim",
      "label": "交付：先备人再出征",
      "detail": "全部必要行动实际完成后一次交付；满仓整单拒绝。",
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
      "sinceRevision": 3
    },
    "accept-heti-breakthrough": {
      "id": "accept-heti-breakthrough",
      "task": "heti-breakthrough",
      "map": "alliance-camp",
      "objectId": "campFusionTrial",
      "kind": "accept",
      "label": "办理：北伐四年的合体试炼",
      "detail": "北伐四年间，以两段身识协同实战检验修行。分识、复合再护持，最后领取合体；先前境界与训练仍保留。",
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
      "sinceRevision": 3
    },
    "check-body-and-spirit": {
      "id": "check-body-and-spirit",
      "task": "heti-breakthrough",
      "map": "alliance-camp",
      "objectId": "campFusionTrial",
      "kind": "progress",
      "label": "检本体与元婴协同",
      "detail": "检本体与元婴协同",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "check-body-and-spirit"
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
      "sinceRevision": 3
    },
    "fight-heti-separation": {
      "id": "fight-heti-separation",
      "task": "heti-breakthrough",
      "map": "alliance-camp",
      "objectId": "campFusionTrial",
      "kind": "battle",
      "label": "分识而不失守",
      "detail": "分识而不失守",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "heti-breakthrough",
            "id": "check-body-and-spirit"
          }
        ],
        "any": []
      },
      "marks": [
        "fight-heti-separation"
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
      "sinceRevision": 3,
      "encounter": "fight-heti-separation"
    },
    "rejoin-spirit-channel": {
      "id": "rejoin-spirit-channel",
      "task": "heti-breakthrough",
      "map": "alliance-camp",
      "objectId": "campSwordAnvil",
      "kind": "progress",
      "label": "复合神识后重新核剑",
      "detail": "复合神识后重新核剑",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "heti-breakthrough",
            "id": "fight-heti-separation"
          }
        ],
        "any": []
      },
      "marks": [
        "rejoin-spirit-channel"
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
      "sinceRevision": 3
    },
    "fight-heti-unity": {
      "id": "fight-heti-unity",
      "task": "heti-breakthrough",
      "map": "alliance-camp",
      "objectId": "campFusionTrial",
      "kind": "battle",
      "label": "完成合体护持试炼",
      "detail": "完成合体护持试炼",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "heti-breakthrough",
            "id": "rejoin-spirit-channel"
          }
        ],
        "any": []
      },
      "marks": [
        "fight-heti-unity"
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
      "sinceRevision": 3,
      "encounter": "fight-heti-unity"
    },
    "claim-heti-breakthrough": {
      "id": "claim-heti-breakthrough",
      "task": "heti-breakthrough",
      "map": "alliance-camp",
      "objectId": "campFusionTrial",
      "kind": "claim",
      "label": "复验并领取北伐四年的合体试炼",
      "detail": "全部必要行动实际完成后一次交付；满仓整单拒绝。",
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
      "sinceRevision": 3
    },
    "accept-war-order": {
      "id": "accept-war-order",
      "task": "war-order",
      "map": "alliance-camp",
      "objectId": "campWarTable",
      "kind": "accept",
      "label": "办理：两处战线先救哪边",
      "detail": "两条战线都要处理。西先保住阵材并免一场压力战；东先保住伤营。后到处需要真实补修或清追兵，没有隐藏倒计时。",
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
      "sinceRevision": 3
    },
    "read-both-front-reports": {
      "id": "read-both-front-reports",
      "task": "war-order",
      "map": "alliance-camp",
      "objectId": "campWarTable",
      "kind": "progress",
      "label": "公示结界与伤营的需求",
      "detail": "公示结界与伤营的需求",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "read-both-front-reports"
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
      "sinceRevision": 3
    },
    "choose-war-order-west-first": {
      "id": "choose-war-order-west-first",
      "task": "war-order",
      "map": "alliance-camp",
      "objectId": "campWarTable",
      "kind": "choice",
      "label": "先赴西线",
      "detail": "先到西线，避免一场阵外加压敌袭，并保住阵材。 东线后到需要先修整伤营再击退追兵；阿辰和伤者仍有实际救援机会。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "war-order",
            "id": "read-both-front-reports"
          }
        ],
        "any": []
      },
      "marks": [
        "choose-war-order-west-first",
        "choose-war-order"
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
      "sinceRevision": 3,
      "choice": "west-first",
      "confirm": {
        "title": "两线都要处理，先到收益只给一边",
        "text": "先到西线，避免一场阵外加压敌袭，并保住阵材。 东线后到需要先修整伤营再击退追兵；阿辰和伤者仍有实际救援机会。",
        "label": "确认：先赴西线"
      }
    },
    "choose-war-order-east-first": {
      "id": "choose-war-order-east-first",
      "task": "war-order",
      "map": "alliance-camp",
      "objectId": "campWarTable",
      "kind": "choice",
      "label": "先赴东线",
      "detail": "先到东线，伤营不需临时重修，可及时接走伤者。 西线后到需要额外清除阵外敌袭；既有阵锚可修复，师兄的护持任务仍能继续。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "war-order",
            "id": "read-both-front-reports"
          }
        ],
        "any": []
      },
      "marks": [
        "choose-war-order-east-first",
        "choose-war-order"
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
      "sinceRevision": 3,
      "choice": "east-first",
      "confirm": {
        "title": "两线都要处理，先到收益只给一边",
        "text": "先到东线，伤营不需临时重修，可及时接走伤者。 西线后到需要额外清除阵外敌袭；既有阵锚可修复，师兄的护持任务仍能继续。",
        "label": "确认：先赴东线"
      }
    },
    "claim-war-order": {
      "id": "claim-war-order",
      "task": "war-order",
      "map": "alliance-camp",
      "objectId": "campWarTable",
      "kind": "claim",
      "label": "交付：两处战线先救哪边",
      "detail": "全部必要行动实际完成后一次交付；满仓整单拒绝。",
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
      "sinceRevision": 3
    },
    "accept-war-west": {
      "id": "accept-war-west",
      "task": "war-west",
      "map": "guixu-west",
      "objectId": "westEntryBoard",
      "kind": "accept",
      "label": "办理：莲华结界的代价",
      "detail": "核阵锚、驱敌，交苦莲子给师兄护持，守住撤离路。师兄以修为为代价保全同门，战后仍存活并需要照护。",
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
      "sinceRevision": 3
    },
    "inspect-west-anchor": {
      "id": "inspect-west-anchor",
      "task": "war-west",
      "map": "guixu-west",
      "objectId": "westEntryBoard",
      "kind": "progress",
      "label": "核先后次序对应的裂损",
      "detail": "核先后次序对应的裂损",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "inspect-west-anchor"
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
      "sinceRevision": 3
    },
    "entrust-lotus-to-lingyun": {
      "id": "entrust-lotus-to-lingyun",
      "task": "war-west",
      "map": "guixu-west",
      "objectId": "westLingyun",
      "kind": "progress",
      "label": "将苦莲子交师兄作不可逆护持",
      "detail": "将苦莲子交师兄作不可逆护持",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "war-west",
            "id": "clear-west-pressure"
          }
        ],
        "any": []
      },
      "marks": [
        "entrust-lotus-to-lingyun"
      ],
      "cost": {
        "items": {},
        "supplies": {
          "frontline-lotus-seed": 1
        }
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "recover-powerless-lingyun": {
      "id": "recover-powerless-lingyun",
      "task": "war-west",
      "map": "guixu-west",
      "objectId": "westLingyun",
      "kind": "progress",
      "label": "确认师兄存活而修为已废",
      "detail": "确认师兄存活而修为已废",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "war-west",
            "id": "hold-west-lotus-line"
          }
        ],
        "any": []
      },
      "marks": [
        "recover-powerless-lingyun"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [
          "west-evacuation-receipt"
        ],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "claim-war-west": {
      "id": "claim-war-west",
      "task": "war-west",
      "map": "guixu-west",
      "objectId": "westLingyun",
      "kind": "claim",
      "label": "交付：莲华结界的代价",
      "detail": "全部必要行动实际完成后一次交付；满仓整单拒绝。",
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
      "sinceRevision": 3
    },
    "accept-war-east": {
      "id": "accept-war-east",
      "task": "war-east",
      "map": "guixu-east",
      "objectId": "eastSuye",
      "kind": "accept",
      "label": "办理：阿辰与伤兵营",
      "detail": "苏叶报出伤者与十四岁阿辰的位置。守住伤营、用担架固定并撤离，再逐人交接；阿辰仍是受保护的未成年弟子。",
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
      "sinceRevision": 3
    },
    "check-east-wounded": {
      "id": "check-east-wounded",
      "task": "war-east",
      "map": "guixu-east",
      "objectId": "eastSuye",
      "kind": "progress",
      "label": "核伤营与十四岁阿辰位置",
      "detail": "核伤营与十四岁阿辰位置",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "check-east-wounded"
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
      "sinceRevision": 3
    },
    "splint-achen": {
      "id": "splint-achen",
      "task": "war-east",
      "map": "guixu-east",
      "objectId": "eastAchen",
      "kind": "progress",
      "label": "固定伤处、用担架把他撤下",
      "detail": "固定伤处、用担架把他撤下",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "war-east",
            "id": "stop-east-puppet"
          }
        ],
        "any": []
      },
      "marks": [
        "splint-achen"
      ],
      "cost": {
        "items": {},
        "supplies": {
          "east-stretcher": 1
        }
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "escort-east-patients": {
      "id": "escort-east-patients",
      "task": "war-east",
      "map": "guixu-east",
      "objectId": "eastEvacuationWagon",
      "kind": "progress",
      "label": "交接伤员，核苏叶人员名单",
      "detail": "交接伤员，核苏叶人员名单",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "war-east",
            "id": "splint-achen"
          }
        ],
        "any": []
      },
      "marks": [
        "escort-east-patients"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [
          "east-medical-receipt"
        ],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "claim-war-east": {
      "id": "claim-war-east",
      "task": "war-east",
      "map": "guixu-east",
      "objectId": "eastEvacuationWagon",
      "kind": "claim",
      "label": "交付：阿辰与伤兵营",
      "detail": "全部必要行动实际完成后一次交付；满仓整单拒绝。",
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
      "sinceRevision": 3
    },
    "accept-guixu-family": {
      "id": "accept-guixu-family",
      "task": "guixu-family",
      "map": "guixu-core",
      "objectId": "coreGrandmotherSeal",
      "kind": "accept",
      "label": "办理：外婆残魂与最后的母子相认",
      "detail": "被囚傀儡是凌玉琅的母亲、你的外婆。破外在控魂阵，让玉琅与母亲告别，独立留存外婆遗簪。",
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
      "sinceRevision": 3
    },
    "identify-grandmother-puppet": {
      "id": "identify-grandmother-puppet",
      "task": "guixu-family",
      "map": "guixu-core",
      "objectId": "coreGrandmotherSeal",
      "kind": "progress",
      "label": "核外婆与母亲凌玉杏的亲属区别",
      "detail": "受控残魂属于凌玉琅的母亲，也就是你的外婆；母亲凌玉杏是另一人。玄玑故意保留她的一缕意识折磨玉琅，你先核外在控魂阵的连结。",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "identify-grandmother-puppet"
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
      "sinceRevision": 3
    },
    "cut-grandmother-control": {
      "id": "cut-grandmother-control",
      "task": "guixu-family",
      "map": "guixu-core",
      "objectId": "corePuppetControl",
      "kind": "battle",
      "label": "击碎外在控魂阵，不攻击被囚残魂",
      "detail": "击碎外在控魂阵，不攻击被囚残魂",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "guixu-family",
            "id": "identify-grandmother-puppet"
          }
        ],
        "any": []
      },
      "marks": [
        "cut-grandmother-control"
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
      "sinceRevision": 3,
      "encounter": "cut-grandmother-control"
    },
    "witness-uncle-farewell": {
      "id": "witness-uncle-farewell",
      "task": "guixu-family",
      "map": "guixu-core",
      "objectId": "coreLingyulang",
      "kind": "progress",
      "label": "玉琅解脱母亲残魂，交银簪留证",
      "detail": "控魂阵已断。外婆最后恢复一丝清明，叫出“玉琅”，摸了摸他的脸；母子相认后残魂消散。玉琅把她留下的银簪交你独立留证，它不是灵薇的情感信物。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "guixu-family",
            "id": "cut-grandmother-control"
          }
        ],
        "any": []
      },
      "marks": [
        "witness-uncle-farewell"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [
          "grandmother-silver-hairpin"
        ],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "claim-guixu-family": {
      "id": "claim-guixu-family",
      "task": "guixu-family",
      "map": "guixu-core",
      "objectId": "coreLingyulang",
      "kind": "claim",
      "label": "交付：外婆残魂与最后的母子相认",
      "detail": "全部必要行动实际完成后一次交付；满仓整单拒绝。",
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
      "sinceRevision": 3
    },
    "accept-guixu-final": {
      "id": "accept-guixu-final",
      "task": "guixu-final",
      "map": "guixu-core",
      "objectId": "coreXuanji",
      "kind": "accept",
      "label": "办理：守心一剑",
      "detail": "破玄玑魔甲，耗尽母亲留下的锁芯余息，再趁舅舅碎丹锁敌完成终战。自己的空半壳留身，收殓在独立遗物安放处办理。",
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
      "sinceRevision": 3
    },
    "fight-xuanji-demon-armor": {
      "id": "fight-xuanji-demon-armor",
      "task": "guixu-final",
      "map": "guixu-core",
      "objectId": "coreXuanji",
      "kind": "battle",
      "label": "破玄玑外层魔甲",
      "detail": "破玄玑外层魔甲",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "fight-xuanji-demon-armor"
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
      "sinceRevision": 3,
      "encounter": "fight-xuanji-demon-armor"
    },
    "spend-mother-lock-core": {
      "id": "spend-mother-lock-core",
      "task": "guixu-final",
      "map": "guixu-core",
      "objectId": "coreLockShell",
      "kind": "progress",
      "label": "母亲留下的锁芯余息护住元婴，空半壳仍在",
      "detail": "母亲留在锁芯中的最后余息护住元婴，随即彻底散尽。你确认锁中已空，仍把自己的半壳留在身边；它是旧物与亲缘历史，不再能第二次救命。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "guixu-final",
            "id": "fight-xuanji-demon-armor"
          },
          {
            "type": "legacyToken",
            "id": "locket"
          }
        ],
        "any": []
      },
      "marks": [
        "lock-core-spent"
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
      "sinceRevision": 3
    },
    "fight-xuanji-final-bind": {
      "id": "fight-xuanji-final-bind",
      "task": "guixu-final",
      "map": "guixu-core",
      "objectId": "coreXuanji",
      "kind": "battle",
      "label": "舅舅以碎丹锁敌，实际完成最后一战",
      "detail": "凌玉琅以碎丹为代价锁住玄玑。你必须真正击败其魔甲本体，才能完成守心一剑；普通符药和战术照常生效。失败可重新整备，不设置要求精确按键的十息倒计时。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "guixu-final",
            "id": "lock-core-spent"
          },
          {
            "type": "token",
            "id": "shouxin-sword"
          },
          {
            "type": "token",
            "id": "yuantong-relic"
          }
        ],
        "any": []
      },
      "marks": [
        "fight-xuanji-final-bind"
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
      "sinceRevision": 3,
      "encounter": "fight-xuanji-final-bind"
    },
    "recover-uncle-remains": {
      "id": "recover-uncle-remains",
      "task": "guixu-final",
      "map": "guixu-core",
      "objectId": "coreMemorialStone",
      "kind": "progress",
      "label": "收殓并接回魔丹残片",
      "detail": "玄玑已经败亡，守心剑也在终战中裂断。玉琅魔丹已碎，最后摸过你的脸便垂下手。你在遗物安放处收殓，将魔丹残片与外婆银簪分别留存。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "guixu-final",
            "id": "fight-xuanji-final-bind"
          }
        ],
        "any": []
      },
      "marks": [
        "recover-uncle-remains"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [
          "uncle-core-fragment"
        ],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "recover-reception-dial": {
      "id": "recover-reception-dial",
      "task": "guixu-final",
      "map": "guixu-core",
      "objectId": "coreMachineDial",
      "kind": "progress",
      "label": "从已停用中枢取接引定盘并记录封签",
      "detail": "从已停用中枢取接引定盘并记录封签",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "guixu-final",
            "id": "recover-uncle-remains"
          }
        ],
        "any": []
      },
      "marks": [
        "recover-reception-dial"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [
          "gate-reception-dial"
        ],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "claim-guixu-final": {
      "id": "claim-guixu-final",
      "task": "guixu-final",
      "map": "guixu-core",
      "objectId": "coreMemorialStone",
      "kind": "claim",
      "label": "交付：守心一剑",
      "detail": "全部必要行动实际完成后一次交付；满仓整单拒绝。",
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
      "sinceRevision": 3
    },
    "accept-war-aftermath": {
      "id": "accept-war-aftermath",
      "task": "war-aftermath",
      "map": "shushan-commons",
      "objectId": "commonsMemorial",
      "kind": "accept",
      "label": "办理：合锁送葬与归山",
      "detail": "合锁诀别，舅舅半锁入葬。安顿废功的师兄、核阿辰康复，把两线先后与真实救援结果记入山门档案。",
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
      "sinceRevision": 3
    },
    "bury-lingyulang": {
      "id": "bury-lingyulang",
      "task": "war-aftermath",
      "map": "shushan-commons",
      "objectId": "commonsMemorial",
      "kind": "progress",
      "label": "合两半锁诀别，舅舅半锁入葬，自己的空半壳留身",
      "detail": "你合起两半长命锁作最后诀别，把舅舅那一半随他下葬，再留下自己的空半壳。亲人不会因回访旧地图而重新站起；师兄和阿辰的照护还要继续。",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "bury-lingyulang"
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
      "sinceRevision": 3
    },
    "settle-lingyun-care": {
      "id": "settle-lingyun-care",
      "task": "war-aftermath",
      "map": "shushan-commons",
      "objectId": "commonsLingyunTeacher",
      "kind": "progress",
      "label": "安排无修为师兄的居处与教书",
      "detail": "安排无修为师兄的居处与教书",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "war-aftermath",
            "id": "bury-lingyulang"
          }
        ],
        "any": []
      },
      "marks": [
        "settle-lingyun-care"
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
      "sinceRevision": 3
    },
    "check-achen-recovery": {
      "id": "check-achen-recovery",
      "task": "war-aftermath",
      "map": "shushan-commons",
      "objectId": "commonsAchen",
      "kind": "progress",
      "label": "阿辰康复记录",
      "detail": "阿辰康复记录",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "war-aftermath",
            "id": "settle-lingyun-care"
          }
        ],
        "any": []
      },
      "marks": [
        "check-achen-recovery"
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
      "sinceRevision": 3
    },
    "record-war-losses": {
      "id": "record-war-losses",
      "task": "war-aftermath",
      "map": "shushan-commons",
      "objectId": "commonsReviewSeal",
      "kind": "progress",
      "label": "记实际双线先后和救援后果",
      "detail": "记实际双线先后和救援后果",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "war-aftermath",
            "id": "check-achen-recovery"
          }
        ],
        "any": []
      },
      "marks": [
        "record-war-losses"
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
      "sinceRevision": 3
    },
    "claim-war-aftermath": {
      "id": "claim-war-aftermath",
      "task": "war-aftermath",
      "map": "shushan-commons",
      "objectId": "commonsReviewSeal",
      "kind": "claim",
      "label": "交付：合锁送葬与归山",
      "detail": "全部必要行动实际完成后一次交付；满仓整单拒绝。",
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
      "sinceRevision": 3
    },
    "accept-dacheng-preparation": {
      "id": "accept-dacheng-preparation",
      "task": "dacheng-preparation",
      "map": "heaven-threshold",
      "objectId": "heavenSwordForge",
      "kind": "accept",
      "label": "办理：三十年的交接与重铸",
      "detail": "战后三十年，重铸守心剑，依旧拓片取碑印，在三个现场校准护持器。完成清微祭与传承，逐一登记愿同行者。",
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
      "sinceRevision": 3
    },
    "receive-reforge-material": {
      "id": "receive-reforge-material",
      "task": "dacheng-preparation",
      "map": "heaven-threshold",
      "objectId": "heavenSwordForge",
      "kind": "progress",
      "label": "领取一份战后重铸料",
      "detail": "领取一份战后重铸料",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "receive-reforge-material"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {
          "sword-reforge-material": 1
        },
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "reforge-shouxin": {
      "id": "reforge-shouxin",
      "task": "dacheng-preparation",
      "map": "heaven-threshold",
      "objectId": "heavenSwordForge",
      "kind": "progress",
      "label": "重铸守心剑",
      "detail": "重铸守心剑",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "dacheng-preparation",
            "id": "receive-reforge-material"
          },
          {
            "type": "token",
            "id": "shouxin-sword"
          }
        ],
        "any": []
      },
      "marks": [
        "reforge-shouxin"
      ],
      "cost": {
        "items": {},
        "supplies": {
          "sword-reforge-material": 1
        }
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "prepare-tablet-imprint": {
      "id": "prepare-tablet-imprint",
      "task": "dacheng-preparation",
      "map": "heaven-threshold",
      "objectId": "heavenMirrorPlate",
      "kind": "progress",
      "label": "依万妖原碑拓记取印板，注明复核来源",
      "detail": "依万妖原碑拓记取印板，注明复核来源",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "dacheng-preparation",
            "id": "reforge-shouxin"
          },
          {
            "type": "evidence",
            "id": "black-tablet-rubbing"
          }
        ],
        "any": []
      },
      "marks": [
        "prepare-tablet-imprint"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [
          "gate-tablet-imprint"
        ],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "match-gate-three-components": {
      "id": "match-gate-three-components",
      "task": "dacheng-preparation",
      "map": "heaven-threshold",
      "objectId": "heavenReceptionDial",
      "kind": "progress",
      "label": "逐一核碑印、界路楔、定盘，完成三点校准",
      "detail": "逐一核碑印、界路楔、定盘，完成三点校准",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "dacheng-preparation",
            "id": "prepare-tablet-imprint"
          },
          {
            "type": "token",
            "id": "gate-tablet-imprint"
          },
          {
            "type": "token",
            "id": "gate-boundary-wedge"
          },
          {
            "type": "token",
            "id": "gate-reception-dial"
          },
          {
            "type": "done",
            "task": "dacheng-preparation",
            "id": "calibrate-gate-dial"
          }
        ],
        "any": []
      },
      "marks": [
        "match-gate-three-components"
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
      "sinceRevision": 3
    },
    "arrange-qingwei-memorial": {
      "id": "arrange-qingwei-memorial",
      "task": "dacheng-preparation",
      "map": "heaven-threshold",
      "objectId": "heavenAchenSeal",
      "kind": "progress",
      "label": "师父坐化后完成祭与传承",
      "detail": "师父坐化后完成祭与传承",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "dacheng-preparation",
            "id": "match-gate-three-components"
          }
        ],
        "any": []
      },
      "marks": [
        "arrange-qingwei-memorial"
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
      "sinceRevision": 3
    },
    "collect-willing-companions": {
      "id": "collect-willing-companions",
      "task": "dacheng-preparation",
      "map": "heaven-threshold",
      "objectId": "heavenCompanionBook",
      "kind": "progress",
      "label": "逐一确认同门、伤者与民众自己的去留意愿",
      "detail": "战后三十年，你逐一询问同门、伤者与愿离开人间的人。名册只登记本人同意的同行意愿，不把朋友自动写成恋人，也不替任何人决定余生。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "dacheng-preparation",
            "id": "arrange-qingwei-memorial"
          }
        ],
        "any": []
      },
      "marks": [
        "collect-willing-companions"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [
          "willing-companion-roll"
        ],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "claim-dacheng-preparation": {
      "id": "claim-dacheng-preparation",
      "task": "dacheng-preparation",
      "map": "heaven-threshold",
      "objectId": "heavenCompanionBook",
      "kind": "claim",
      "label": "交付：三十年的交接与重铸",
      "detail": "全部必要行动实际完成后一次交付；满仓整单拒绝。",
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
      "sinceRevision": 3
    },
    "accept-dacheng-breakthrough": {
      "id": "accept-dacheng-breakthrough",
      "task": "dacheng-breakthrough",
      "map": "heaven-threshold",
      "objectId": "heavenTrialFocus",
      "kind": "accept",
      "label": "办理：仙、魔与众生三组劫",
      "detail": "依次经历仙、魔与众生三组劫战，段间可检身体与符药。每组胜利单独保留，最后复验领取大乘。",
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
      "sinceRevision": 3
    },
    "fight-dacheng-immortal": {
      "id": "fight-dacheng-immortal",
      "task": "dacheng-breakthrough",
      "map": "heaven-threshold",
      "objectId": "heavenTrialFocus",
      "kind": "battle",
      "label": "仙劫：稳守与清除高压雷影",
      "detail": "仙劫：稳守与清除高压雷影",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "fight-dacheng-immortal"
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
      "sinceRevision": 3,
      "encounter": "fight-dacheng-immortal"
    },
    "settle-dacheng-immortal": {
      "id": "settle-dacheng-immortal",
      "task": "dacheng-breakthrough",
      "map": "heaven-threshold",
      "objectId": "heavenMirrorPlate",
      "kind": "progress",
      "label": "段间检身体与符药",
      "detail": "段间检身体与符药",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "dacheng-breakthrough",
            "id": "fight-dacheng-immortal"
          }
        ],
        "any": []
      },
      "marks": [
        "settle-dacheng-immortal"
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
      "sinceRevision": 3
    },
    "fight-dacheng-demon": {
      "id": "fight-dacheng-demon",
      "task": "dacheng-breakthrough",
      "map": "heaven-threshold",
      "objectId": "heavenTrialFocus",
      "kind": "battle",
      "label": "魔劫：先破护甲再制控魂影",
      "detail": "魔劫：先破护甲再制控魂影",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "dacheng-breakthrough",
            "id": "settle-dacheng-immortal"
          }
        ],
        "any": []
      },
      "marks": [
        "fight-dacheng-demon"
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
      "sinceRevision": 3,
      "encounter": "fight-dacheng-demon"
    },
    "settle-dacheng-demon": {
      "id": "settle-dacheng-demon",
      "task": "dacheng-breakthrough",
      "map": "heaven-threshold",
      "objectId": "heavenBoundaryWedge",
      "kind": "progress",
      "label": "段间归拢神识",
      "detail": "段间归拢神识",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "dacheng-breakthrough",
            "id": "fight-dacheng-demon"
          }
        ],
        "any": []
      },
      "marks": [
        "settle-dacheng-demon"
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
      "sinceRevision": 3
    },
    "fight-dacheng-living": {
      "id": "fight-dacheng-living",
      "task": "dacheng-breakthrough",
      "map": "heaven-threshold",
      "objectId": "heavenTrialFocus",
      "kind": "battle",
      "label": "众生劫：保护撤路标志并完成真实战斗",
      "detail": "众生劫：保护撤路标志并完成真实战斗",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "dacheng-breakthrough",
            "id": "settle-dacheng-demon"
          }
        ],
        "any": []
      },
      "marks": [
        "fight-dacheng-living"
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
      "sinceRevision": 3,
      "encounter": "fight-dacheng-living"
    },
    "settle-dacheng-realm": {
      "id": "settle-dacheng-realm",
      "task": "dacheng-breakthrough",
      "map": "heaven-threshold",
      "objectId": "heavenGateChoice",
      "kind": "progress",
      "label": "复验领取大乘",
      "detail": "复验领取大乘",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "dacheng-breakthrough",
            "id": "fight-dacheng-living"
          }
        ],
        "any": []
      },
      "marks": [
        "settle-dacheng-realm"
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
      "sinceRevision": 3
    },
    "claim-dacheng-breakthrough": {
      "id": "claim-dacheng-breakthrough",
      "task": "dacheng-breakthrough",
      "map": "heaven-threshold",
      "objectId": "heavenGateChoice",
      "kind": "claim",
      "label": "复验并领取仙、魔与众生三组劫",
      "detail": "全部必要行动实际完成后一次交付；满仓整单拒绝。",
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
      "sinceRevision": 3
    },
    "accept-heaven-gate": {
      "id": "accept-heaven-gate",
      "task": "heaven-gate",
      "map": "heaven-threshold",
      "objectId": "heavenAchenSeal",
      "kind": "accept",
      "label": "办理：在天门前作最后选择",
      "detail": "传掌门印，与师兄和灵薇按实际关系告别。独登、携众或留世都需明确确认；携众另需真实意愿与护持，不自动结契。",
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
      "sinceRevision": 3
    },
    "handover-shushan-seal": {
      "id": "handover-shushan-seal",
      "task": "heaven-gate",
      "map": "heaven-threshold",
      "objectId": "heavenAchenSeal",
      "kind": "progress",
      "label": "传掌门印，确认人间照护继续",
      "detail": "传掌门印，确认人间照护继续",
      "requires": {
        "all": [],
        "any": []
      },
      "marks": [
        "handover-shushan-seal"
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
      "sinceRevision": 3
    },
    "farewell-lingyun": {
      "id": "farewell-lingyun",
      "task": "heaven-gate",
      "map": "heaven-threshold",
      "objectId": "heavenLingyunFarewell",
      "kind": "progress",
      "label": "与活着的师兄话别",
      "detail": "与活着的师兄话别",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "heaven-gate",
            "id": "handover-shushan-seal"
          }
        ],
        "any": []
      },
      "marks": [
        "farewell-lingyun"
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
      "sinceRevision": 3
    },
    "farewell-shen": {
      "id": "farewell-shen",
      "task": "heaven-gate",
      "map": "heaven-threshold",
      "objectId": "heavenShenFarewell",
      "kind": "progress",
      "label": "按本档朋友/亲近实际关系告别",
      "detail": "按本档朋友/亲近实际关系告别",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "heaven-gate",
            "id": "farewell-lingyun"
          }
        ],
        "any": []
      },
      "marks": [
        "farewell-shen"
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
      "sinceRevision": 3
    },
    "choose-heaven-ending-alone": {
      "id": "choose-heaven-ending-alone",
      "task": "heaven-gate",
      "map": "heaven-threshold",
      "objectId": "heavenGateChoice",
      "kind": "choice",
      "label": "独自入仙门",
      "detail": "在领取终局前可另存此刻行程。你独自跨过天门，不强迫他人同行。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "heaven-gate",
            "id": "farewell-shen"
          }
        ],
        "any": []
      },
      "marks": [
        "choose-heaven-ending-alone",
        "choose-heaven-ending"
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
      "sinceRevision": 3,
      "choice": "alone",
      "confirm": {
        "title": "明确选择终局并在领取前可取消",
        "text": "在领取终局前可另存此刻行程。你独自跨过天门，不强迫他人同行。",
        "label": "确认：独自入仙门"
      }
    },
    "choose-heaven-ending-together": {
      "id": "choose-heaven-ending-together",
      "task": "heaven-gate",
      "map": "heaven-threshold",
      "objectId": "heavenGateChoice",
      "kind": "choice",
      "label": "携愿同行者登天",
      "detail": "须已有狐簪、凤羽残光、师兄铁牌、真实自愿名册和三处界路护持。同行不是自动恋爱或婚契。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "heaven-gate",
            "id": "farewell-shen"
          },
          {
            "type": "legacyToken",
            "id": "foxHairpin"
          },
          {
            "type": "token",
            "id": "phoenix-feather-remnant"
          },
          {
            "type": "token",
            "id": "brother-iron-badge"
          },
          {
            "type": "token",
            "id": "willing-companion-roll"
          },
          {
            "type": "token",
            "id": "gate-tablet-imprint"
          },
          {
            "type": "token",
            "id": "gate-boundary-wedge"
          },
          {
            "type": "token",
            "id": "gate-reception-dial"
          }
        ],
        "any": []
      },
      "marks": [
        "choose-heaven-ending-together",
        "choose-heaven-ending"
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
      "sinceRevision": 3,
      "choice": "together",
      "confirm": {
        "title": "明确选择终局并在领取前可取消",
        "text": "须已有狐簪、凤羽残光、师兄铁牌、真实自愿名册和三处界路护持。同行不是自动恋爱或婚契。",
        "label": "确认：携愿同行者登天"
      }
    },
    "choose-heaven-ending-stay": {
      "id": "choose-heaven-ending-stay",
      "task": "heaven-gate",
      "map": "heaven-threshold",
      "objectId": "heavenGateChoice",
      "kind": "choice",
      "label": "留在人间",
      "detail": "你选择留在人间照护与传承。本次行程将结束，可查看记录或恢复此前存档。",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "heaven-gate",
            "id": "farewell-shen"
          }
        ],
        "any": []
      },
      "marks": [
        "choose-heaven-ending-stay",
        "choose-heaven-ending"
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
      "sinceRevision": 3,
      "choice": "stay",
      "confirm": {
        "title": "明确选择终局并在领取前可取消",
        "text": "你选择留在人间照护与传承。本次行程将结束，可查看记录或恢复此前存档。",
        "label": "确认：留在人间"
      }
    },
    "claim-heaven-gate": {
      "id": "claim-heaven-gate",
      "task": "heaven-gate",
      "map": "heaven-threshold",
      "objectId": "heavenGateChoice",
      "kind": "claim",
      "label": "完成本次行程",
      "detail": "全部必要行动实际完成后一次交付；满仓整单拒绝。",
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
      "sinceRevision": 3
    },
    "seal-trade-medicine": {
      "id": "seal-trade-medicine",
      "task": "border-commerce",
      "map": "shushan-commons",
      "objectId": "commonsTradeLedger",
      "kind": "progress",
      "label": "封存医药交割单，领取回气丹二枚与温养茶一份",
      "detail": "封存医药交割单，领取回气丹二枚与温养茶一份",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "border-commerce",
            "id": "choose-trade-priority"
          },
          {
            "type": "choice",
            "task": "border-commerce",
            "id": "medicine"
          }
        ],
        "any": []
      },
      "marks": [
        "medicine-delivered",
        "seal-trade-covenant"
      ],
      "cost": {
        "items": {},
        "supplies": {
          "trade-seal-kit": 1
        }
      },
      "grant": {
        "items": {
          "potion": 2,
          "tea": 1
        },
        "supplies": {},
        "tokens": [
          "border-commerce-covenant"
        ],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "seal-trade-evacuation": {
      "id": "seal-trade-evacuation",
      "task": "border-commerce",
      "map": "shushan-commons",
      "objectId": "commonsTradeLedger",
      "kind": "progress",
      "label": "封存接应货单，领取一份伤营修补料",
      "detail": "封存接应货单，领取一份伤营修补料",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "border-commerce",
            "id": "choose-trade-priority"
          },
          {
            "type": "choice",
            "task": "border-commerce",
            "id": "evacuation"
          }
        ],
        "any": []
      },
      "marks": [
        "evacuation-delivered",
        "seal-trade-covenant"
      ],
      "cost": {
        "items": {},
        "supplies": {
          "trade-seal-kit": 1
        }
      },
      "grant": {
        "items": {},
        "supplies": {
          "east-repair-kit": 1
        },
        "tokens": [
          "border-commerce-covenant"
        ],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "west-arrival-early": {
      "id": "west-arrival-early",
      "task": "war-west",
      "map": "guixu-west",
      "objectId": "westEntryBoard",
      "kind": "progress",
      "label": "先到西线，核未断的阵锚",
      "detail": "先到西线，核未断的阵锚",
      "requires": {
        "all": [
          {
            "type": "choice",
            "task": "war-order",
            "id": "west-first"
          },
          {
            "type": "done",
            "task": "war-west",
            "id": "inspect-west-anchor"
          }
        ],
        "any": []
      },
      "marks": [
        "west-early-receipt",
        "west-arrival-ready"
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
      "sinceRevision": 3
    },
    "fight-west-late-pressure": {
      "id": "fight-west-late-pressure",
      "task": "war-west",
      "map": "guixu-west",
      "objectId": "westEntryBoard",
      "kind": "battle",
      "label": "晚到西线：先驱离阵外追击傀",
      "detail": "晚到西线：先驱离阵外追击傀",
      "requires": {
        "all": [
          {
            "type": "choice",
            "task": "war-order",
            "id": "east-first"
          },
          {
            "type": "done",
            "task": "war-west",
            "id": "inspect-west-anchor"
          }
        ],
        "any": []
      },
      "marks": [
        "west-late-pressure-won",
        "west-arrival-ready"
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
      "sinceRevision": 3,
      "encounter": "fight-west-late-pressure"
    },
    "verify-west-left": {
      "id": "verify-west-left",
      "task": "war-west",
      "map": "guixu-west",
      "objectId": "westAnchorLeft",
      "kind": "progress",
      "label": "先到核左锚，保留修复料",
      "detail": "先到核左锚，保留修复料",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "war-west",
            "id": "west-arrival-ready"
          },
          {
            "type": "choice",
            "task": "war-order",
            "id": "west-first"
          }
        ],
        "any": []
      },
      "marks": [
        "west-left-intact",
        "repair-west-left"
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
      "sinceRevision": 3
    },
    "repair-west-left-late": {
      "id": "repair-west-left-late",
      "task": "war-west",
      "map": "guixu-west",
      "objectId": "westAnchorLeft",
      "kind": "progress",
      "label": "晚到修左锚，实际投入一份阵料",
      "detail": "晚到修左锚，实际投入一份阵料",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "war-west",
            "id": "west-arrival-ready"
          },
          {
            "type": "choice",
            "task": "war-order",
            "id": "east-first"
          }
        ],
        "any": []
      },
      "marks": [
        "west-left-repaired",
        "repair-west-left"
      ],
      "cost": {
        "items": {},
        "supplies": {
          "west-repair-kit": 1
        }
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "verify-west-right": {
      "id": "verify-west-right",
      "task": "war-west",
      "map": "guixu-west",
      "objectId": "westAnchorRight",
      "kind": "progress",
      "label": "先到核右锚，保留修复料",
      "detail": "先到核右锚，保留修复料",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "war-west",
            "id": "repair-west-left"
          },
          {
            "type": "choice",
            "task": "war-order",
            "id": "west-first"
          }
        ],
        "any": []
      },
      "marks": [
        "west-right-intact",
        "repair-west-right"
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
      "sinceRevision": 3
    },
    "repair-west-right-late": {
      "id": "repair-west-right-late",
      "task": "war-west",
      "map": "guixu-west",
      "objectId": "westAnchorRight",
      "kind": "progress",
      "label": "晚到修右锚，实际投入一份阵料",
      "detail": "晚到修右锚，实际投入一份阵料",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "war-west",
            "id": "repair-west-left"
          },
          {
            "type": "choice",
            "task": "war-order",
            "id": "east-first"
          }
        ],
        "any": []
      },
      "marks": [
        "west-right-repaired",
        "repair-west-right"
      ],
      "cost": {
        "items": {},
        "supplies": {
          "west-repair-kit": 1
        }
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "east-arrival-early": {
      "id": "east-arrival-early",
      "task": "war-east",
      "map": "guixu-east",
      "objectId": "eastSuye",
      "kind": "progress",
      "label": "先到伤营，确认撤路仍通",
      "detail": "先到伤营，确认撤路仍通",
      "requires": {
        "all": [
          {
            "type": "choice",
            "task": "war-order",
            "id": "east-first"
          },
          {
            "type": "done",
            "task": "war-east",
            "id": "check-east-wounded"
          }
        ],
        "any": []
      },
      "marks": [
        "east-early-receipt",
        "east-route-ready"
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
      "sinceRevision": 3
    },
    "take-east-local-repair": {
      "id": "take-east-local-repair",
      "task": "war-east",
      "map": "guixu-east",
      "objectId": "eastSuye",
      "kind": "progress",
      "label": "医药优先且晚到：从未损医帐拆出一份修补料",
      "detail": "医药优先且晚到：从未损医帐拆出一份修补料",
      "requires": {
        "all": [
          {
            "type": "choice",
            "task": "war-order",
            "id": "west-first"
          },
          {
            "type": "choice",
            "task": "border-commerce",
            "id": "medicine"
          },
          {
            "type": "done",
            "task": "war-east",
            "id": "check-east-wounded"
          }
        ],
        "any": []
      },
      "marks": [
        "east-local-material"
      ],
      "cost": {
        "items": {},
        "supplies": {}
      },
      "grant": {
        "items": {},
        "supplies": {
          "east-repair-kit": 1
        },
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "repair-east-late": {
      "id": "repair-east-late",
      "task": "war-east",
      "map": "guixu-east",
      "objectId": "eastSuye",
      "kind": "progress",
      "label": "晚到东线：用一份修补料修通伤营",
      "detail": "晚到东线：用一份修补料修通伤营",
      "requires": {
        "all": [
          {
            "type": "choice",
            "task": "war-order",
            "id": "west-first"
          },
          {
            "type": "done",
            "task": "war-east",
            "id": "check-east-wounded"
          }
        ],
        "any": []
      },
      "marks": [
        "east-camp-repaired"
      ],
      "cost": {
        "items": {},
        "supplies": {
          "east-repair-kit": 1
        }
      },
      "grant": {
        "items": {},
        "supplies": {},
        "tokens": [],
        "evidence": []
      },
      "sinceRevision": 3
    },
    "fight-east-late-pursuit": {
      "id": "fight-east-late-pursuit",
      "task": "war-east",
      "map": "guixu-east",
      "objectId": "eastSuye",
      "kind": "battle",
      "label": "晚到东线：击退修路后的追兵",
      "detail": "晚到东线：击退修路后的追兵",
      "requires": {
        "all": [
          {
            "type": "choice",
            "task": "war-order",
            "id": "west-first"
          },
          {
            "type": "done",
            "task": "war-east",
            "id": "east-camp-repaired"
          }
        ],
        "any": []
      },
      "marks": [
        "east-pursuit-won",
        "east-route-ready"
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
      "sinceRevision": 3,
      "encounter": "fight-east-late-pursuit"
    },
    "clear-west-pressure-0": {
      "id": "clear-west-pressure-0",
      "task": "war-west",
      "map": "guixu-west",
      "objectId": "westPuppetGate",
      "kind": "battle",
      "label": "联军侧翼援护下清西线巨傀",
      "detail": "联军侧翼援护下清西线巨傀",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "war-west",
            "id": "repair-west-right"
          },
          {
            "type": "choice",
            "task": "alliance-muster",
            "id": "allied"
          }
        ],
        "any": []
      },
      "marks": [
        "clear-west-pressure-0-won",
        "clear-west-pressure"
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
      "sinceRevision": 3,
      "encounter": "clear-west-pressure-0"
    },
    "clear-west-pressure-1": {
      "id": "clear-west-pressure-1",
      "task": "war-west",
      "map": "guixu-west",
      "objectId": "westPuppetGate",
      "kind": "battle",
      "label": "各军自主：正面清西线巨傀",
      "detail": "各军自主：正面清西线巨傀",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "war-west",
            "id": "repair-west-right"
          },
          {
            "type": "choice",
            "task": "alliance-muster",
            "id": "independent"
          }
        ],
        "any": []
      },
      "marks": [
        "clear-west-pressure-1-won",
        "clear-west-pressure"
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
      "sinceRevision": 3,
      "encounter": "clear-west-pressure-1"
    },
    "hold-west-lotus-line-0": {
      "id": "hold-west-lotus-line-0",
      "task": "war-west",
      "map": "guixu-west",
      "objectId": "westLotusAnchor",
      "kind": "battle",
      "label": "平反阵师按门规回执协助稳住莲华结界",
      "detail": "平反阵师按门规回执协助稳住莲华结界",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "war-west",
            "id": "entrust-lotus-to-lingyun"
          },
          {
            "type": "choice",
            "task": "reform-charter",
            "id": "sentence-review"
          }
        ],
        "any": []
      },
      "marks": [
        "hold-west-lotus-line-0-won",
        "hold-west-lotus-line"
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
      "sinceRevision": 3,
      "encounter": "hold-west-lotus-line-0"
    },
    "hold-west-lotus-line-1": {
      "id": "hold-west-lotus-line-1",
      "task": "war-west",
      "map": "guixu-west",
      "objectId": "westLotusAnchor",
      "kind": "battle",
      "label": "自行稳住莲华结界并清敌",
      "detail": "自行稳住莲华结界并清敌",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "war-west",
            "id": "entrust-lotus-to-lingyun"
          },
          {
            "type": "choice",
            "task": "reform-charter",
            "id": "open-library"
          }
        ],
        "any": []
      },
      "marks": [
        "hold-west-lotus-line-1-won",
        "hold-west-lotus-line"
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
      "sinceRevision": 3,
      "encounter": "hold-west-lotus-line-1"
    },
    "stop-east-puppet-0": {
      "id": "stop-east-puppet-0",
      "task": "war-east",
      "map": "guixu-east",
      "objectId": "eastPuppetApproach",
      "kind": "battle",
      "label": "开放典籍的医阵抄本援护伤营",
      "detail": "开放典籍的医阵抄本援护伤营",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "war-east",
            "id": "east-route-ready"
          },
          {
            "type": "choice",
            "task": "reform-charter",
            "id": "open-library"
          }
        ],
        "any": []
      },
      "marks": [
        "stop-east-puppet-0-won",
        "stop-east-puppet"
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
      "sinceRevision": 3,
      "encounter": "stop-east-puppet-0"
    },
    "stop-east-puppet-1": {
      "id": "stop-east-puppet-1",
      "task": "war-east",
      "map": "guixu-east",
      "objectId": "eastPuppetApproach",
      "kind": "battle",
      "label": "守住伤营击退巨傀",
      "detail": "守住伤营击退巨傀",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "war-east",
            "id": "east-route-ready"
          },
          {
            "type": "choice",
            "task": "reform-charter",
            "id": "sentence-review"
          }
        ],
        "any": []
      },
      "marks": [
        "stop-east-puppet-1-won",
        "stop-east-puppet"
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
      "sinceRevision": 3,
      "encounter": "stop-east-puppet-1"
    },
    "calibrate-gate-tablet": {
      "id": "calibrate-gate-tablet",
      "task": "dacheng-preparation",
      "map": "heaven-threshold",
      "objectId": "heavenMirrorPlate",
      "kind": "progress",
      "label": "把已复核的碑纹印板校入护座",
      "detail": "把已复核的碑纹印板校入护座",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "dacheng-preparation",
            "id": "prepare-tablet-imprint"
          },
          {
            "type": "token",
            "id": "gate-tablet-imprint"
          }
        ],
        "any": []
      },
      "marks": [
        "calibrate-gate-tablet"
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
      "sinceRevision": 3
    },
    "calibrate-gate-wedge": {
      "id": "calibrate-gate-wedge",
      "task": "dacheng-preparation",
      "map": "heaven-threshold",
      "objectId": "heavenBoundaryWedge",
      "kind": "progress",
      "label": "将界路楔校入侧座并核撤路",
      "detail": "将界路楔校入侧座并核撤路",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "dacheng-preparation",
            "id": "calibrate-gate-tablet"
          },
          {
            "type": "token",
            "id": "gate-boundary-wedge"
          }
        ],
        "any": []
      },
      "marks": [
        "calibrate-gate-wedge"
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
      "sinceRevision": 3
    },
    "calibrate-gate-dial": {
      "id": "calibrate-gate-dial",
      "task": "dacheng-preparation",
      "map": "heaven-threshold",
      "objectId": "heavenReceptionDial",
      "kind": "progress",
      "label": "对准接引定盘，确认三座呼应",
      "detail": "对准接引定盘，确认三座呼应",
      "requires": {
        "all": [
          {
            "type": "done",
            "task": "dacheng-preparation",
            "id": "calibrate-gate-wedge"
          },
          {
            "type": "token",
            "id": "gate-reception-dial"
          }
        ],
        "any": []
      },
      "marks": [
        "calibrate-gate-dial"
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
      "sinceRevision": 3
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
    },
    "fight-yuanying-outer-thunder": {
      "id": "fight-yuanying-outer-thunder",
      "map": "beihuang-retreat",
      "title": "卸去前段暴雷",
      "detail": "实际清敌才留下胜利凭据；本场无普通掉落。失败保留此前已完成阶段，可回安全处整备重试。",
      "enemies": [
        {
          "id": "fight-yuanying-outer-thunder-enemy-0",
          "kind": "stone",
          "name": "劫影·守势",
          "x": 515,
          "y": 340,
          "maxHp": 180,
          "speed": 44,
          "damage": 11,
          "spriteKey": "m4Thunder",
          "spriteCell": 0
        },
        {
          "id": "fight-yuanying-outer-thunder-enemy-1",
          "kind": "sprite",
          "name": "劫影·游袭",
          "x": 765,
          "y": 340,
          "maxHp": 122,
          "speed": 68,
          "damage": 9,
          "spriteKey": "m4Mind",
          "spriteCell": 0
        }
      ],
      "returnTo": {
        "map": "beihuang-retreat",
        "x": 640,
        "y": 650
      },
      "sinceRevision": 3
    },
    "fight-yuanying-life-trial": {
      "id": "fight-yuanying-life-trial",
      "map": "beihuang-retreat",
      "title": "独自完成末段命劫",
      "detail": "实际清敌才留下胜利凭据；本场无普通掉落。失败保留此前已完成阶段，可回安全处整备重试。",
      "enemies": [
        {
          "id": "fight-yuanying-life-trial-enemy-0",
          "kind": "stone",
          "name": "劫影·守势",
          "x": 515,
          "y": 340,
          "maxHp": 180,
          "speed": 44,
          "damage": 11,
          "spriteKey": "m4Thunder",
          "spriteCell": 0
        },
        {
          "id": "fight-yuanying-life-trial-enemy-1",
          "kind": "sprite",
          "name": "劫影·游袭",
          "x": 765,
          "y": 340,
          "maxHp": 122,
          "speed": 68,
          "damage": 9,
          "spriteKey": "m4Mind",
          "spriteCell": 0
        }
      ],
      "returnTo": {
        "map": "beihuang-retreat",
        "x": 640,
        "y": 650
      },
      "sinceRevision": 3
    },
    "clear-north-pursuit": {
      "id": "clear-north-pursuit",
      "map": "beihuang-retreat",
      "title": "打退追击师兄的暗桩",
      "detail": "实际清敌才留下胜利凭据；本场无普通掉落。失败保留此前已完成阶段，可回安全处整备重试。",
      "enemies": [
        {
          "id": "clear-north-pursuit-enemy-0",
          "kind": "stone",
          "name": "截路者·守势",
          "x": 125,
          "y": 490,
          "maxHp": 220,
          "speed": 44,
          "damage": 11,
          "spriteKey": "m4Rebel",
          "spriteCell": 0
        }
      ],
      "returnTo": {
        "map": "beihuang-retreat",
        "x": 640,
        "y": 650
      },
      "sinceRevision": 3
    },
    "fight-summit-measured-spar": {
      "id": "fight-summit-measured-spar",
      "map": "golden-summit",
      "title": "节制试剑：两种敌情，保持原符药/控制用途",
      "detail": "实际清敌才留下胜利凭据；本场无普通掉落。失败保留此前已完成阶段，可回安全处整备重试。",
      "enemies": [
        {
          "id": "fight-summit-measured-spar-enemy-0",
          "kind": "stone",
          "name": "试剑修士·守势",
          "x": 515,
          "y": 460,
          "maxHp": 220,
          "speed": 44,
          "damage": 11,
          "spriteKey": "m4SwordDisciple",
          "spriteCell": 0
        },
        {
          "id": "fight-summit-measured-spar-enemy-1",
          "kind": "sprite",
          "name": "试剑修士·游袭",
          "x": 765,
          "y": 460,
          "maxHp": 150,
          "speed": 68,
          "damage": 9,
          "spriteKey": "m4SwordDisciple",
          "spriteCell": 0
        }
      ],
      "returnTo": {
        "map": "golden-summit",
        "x": 640,
        "y": 650
      },
      "sinceRevision": 3
    },
    "protect-summit-witnesses": {
      "id": "protect-summit-witnesses",
      "map": "golden-summit",
      "title": "护住被围的证人撤路",
      "detail": "实际清敌才留下胜利凭据；本场无普通掉落。失败保留此前已完成阶段，可回安全处整备重试。",
      "enemies": [
        {
          "id": "protect-summit-witnesses-enemy-0",
          "kind": "stone",
          "name": "截路者·守势",
          "x": 205,
          "y": 580,
          "maxHp": 220,
          "speed": 44,
          "damage": 11,
          "spriteKey": "m4Rebel",
          "spriteCell": 0
        }
      ],
      "returnTo": {
        "map": "golden-summit",
        "x": 640,
        "y": 650
      },
      "sinceRevision": 3
    },
    "break-cliff-array": {
      "id": "break-cliff-array",
      "map": "heart-cliff",
      "title": "破剑阵登崖",
      "detail": "实际清敌才留下胜利凭据；本场无普通掉落。失败保留此前已完成阶段，可回安全处整备重试。",
      "enemies": [
        {
          "id": "break-cliff-array-enemy-0",
          "kind": "stone",
          "name": "截路者·守势",
          "x": 315,
          "y": 560,
          "maxHp": 220,
          "speed": 44,
          "damage": 11,
          "spriteKey": "m4Thunder",
          "spriteCell": 0
        }
      ],
      "returnTo": {
        "map": "heart-cliff",
        "x": 640,
        "y": 650
      },
      "sinceRevision": 3
    },
    "fight-xuanji-first-stand": {
      "id": "fight-xuanji-first-stand",
      "map": "golden-summit",
      "title": "回金顶护人，击破玄玑替身封锁",
      "detail": "实际清敌才留下胜利凭据；本场无普通掉落。失败保留此前已完成阶段，可回安全处整备重试。",
      "enemies": [
        {
          "id": "fight-xuanji-first-stand-enemy-0",
          "kind": "stone",
          "name": "玄玑子 · 金顶封锁",
          "x": 515,
          "y": 460,
          "maxHp": 220,
          "speed": 44,
          "damage": 11,
          "spriteKey": "m4XuanjiPlain",
          "spriteCell": 0
        }
      ],
      "returnTo": {
        "map": "golden-summit",
        "x": 640,
        "y": 650
      },
      "sinceRevision": 3
    },
    "fight-huashen-heart-trial": {
      "id": "fight-huashen-heart-trial",
      "map": "golden-summit",
      "title": "三年修行后护心问道",
      "detail": "实际清敌才留下胜利凭据；本场无普通掉落。失败保留此前已完成阶段，可回安全处整备重试。",
      "enemies": [
        {
          "id": "fight-huashen-heart-trial-enemy-0",
          "kind": "stone",
          "name": "劫影·守势",
          "x": 515,
          "y": 460,
          "maxHp": 220,
          "speed": 44,
          "damage": 11,
          "spriteKey": "m4Thunder",
          "spriteCell": 0
        },
        {
          "id": "fight-huashen-heart-trial-enemy-1",
          "kind": "sprite",
          "name": "劫影·游袭",
          "x": 765,
          "y": 460,
          "maxHp": 150,
          "speed": 68,
          "damage": 9,
          "spriteKey": "m4Mind",
          "spriteCell": 0
        }
      ],
      "returnTo": {
        "map": "golden-summit",
        "x": 640,
        "y": 650
      },
      "sinceRevision": 3
    },
    "protect-trade-caravan": {
      "id": "protect-trade-caravan",
      "map": "shushan-commons",
      "title": "击退破坏首批互市的袭击者",
      "detail": "实际清敌才留下胜利凭据；本场无普通掉落。失败保留此前已完成阶段，可回安全处整备重试。",
      "enemies": [
        {
          "id": "protect-trade-caravan-enemy-0",
          "kind": "stone",
          "name": "截路者·守势",
          "x": 915,
          "y": 640,
          "maxHp": 280,
          "speed": 44,
          "damage": 11,
          "spriteKey": "m4Rebel",
          "spriteCell": 0
        }
      ],
      "returnTo": {
        "map": "shushan-commons",
        "x": 640,
        "y": 650
      },
      "sinceRevision": 3
    },
    "fight-heti-separation": {
      "id": "fight-heti-separation",
      "map": "alliance-camp",
      "title": "分识而不失守",
      "detail": "实际清敌才留下胜利凭据；本场无普通掉落。失败保留此前已完成阶段，可回安全处整备重试。",
      "enemies": [
        {
          "id": "fight-heti-separation-enemy-0",
          "kind": "stone",
          "name": "劫影·守势",
          "x": 515,
          "y": 555,
          "maxHp": 280,
          "speed": 44,
          "damage": 11,
          "spriteKey": "m4Thunder",
          "spriteCell": 0
        },
        {
          "id": "fight-heti-separation-enemy-1",
          "kind": "sprite",
          "name": "劫影·游袭",
          "x": 765,
          "y": 555,
          "maxHp": 190,
          "speed": 68,
          "damage": 9,
          "spriteKey": "m4Mind",
          "spriteCell": 0
        }
      ],
      "returnTo": {
        "map": "alliance-camp",
        "x": 640,
        "y": 650
      },
      "sinceRevision": 3
    },
    "fight-heti-unity": {
      "id": "fight-heti-unity",
      "map": "alliance-camp",
      "title": "完成合体护持试炼",
      "detail": "实际清敌才留下胜利凭据；本场无普通掉落。失败保留此前已完成阶段，可回安全处整备重试。",
      "enemies": [
        {
          "id": "fight-heti-unity-enemy-0",
          "kind": "stone",
          "name": "劫影·守势",
          "x": 515,
          "y": 555,
          "maxHp": 280,
          "speed": 44,
          "damage": 11,
          "spriteKey": "m4Thunder",
          "spriteCell": 0
        },
        {
          "id": "fight-heti-unity-enemy-1",
          "kind": "sprite",
          "name": "劫影·游袭",
          "x": 765,
          "y": 555,
          "maxHp": 190,
          "speed": 68,
          "damage": 9,
          "spriteKey": "m4Mind",
          "spriteCell": 0
        }
      ],
      "returnTo": {
        "map": "alliance-camp",
        "x": 640,
        "y": 650
      },
      "sinceRevision": 3
    },
    "cut-grandmother-control": {
      "id": "cut-grandmother-control",
      "map": "guixu-core",
      "title": "击碎外在控魂阵，不攻击被囚残魂",
      "detail": "实际清敌才留下胜利凭据；本场无普通掉落。失败保留此前已完成阶段，可回安全处整备重试。",
      "enemies": [
        {
          "id": "cut-grandmother-control-enemy-0",
          "kind": "stone",
          "name": "控魂阵·守势",
          "x": 755,
          "y": 330,
          "maxHp": 370,
          "speed": 44,
          "damage": 11,
          "spriteKey": "m4Grandmother",
          "spriteCell": 0
        }
      ],
      "returnTo": {
        "map": "alliance-camp",
        "x": 640,
        "y": 650
      },
      "sinceRevision": 3
    },
    "fight-xuanji-demon-armor": {
      "id": "fight-xuanji-demon-armor",
      "map": "guixu-core",
      "title": "破玄玑外层魔甲",
      "detail": "实际清敌才留下胜利凭据；本场无普通掉落。失败保留此前已完成阶段，可回安全处整备重试。",
      "enemies": [
        {
          "id": "fight-xuanji-demon-armor-enemy-0",
          "kind": "stone",
          "name": "玄玑·守势",
          "x": 515,
          "y": 410,
          "maxHp": 370,
          "speed": 44,
          "damage": 11,
          "spriteKey": "m4Xuanji",
          "spriteCell": 0
        }
      ],
      "returnTo": {
        "map": "alliance-camp",
        "x": 640,
        "y": 650
      },
      "sinceRevision": 3
    },
    "fight-xuanji-final-bind": {
      "id": "fight-xuanji-final-bind",
      "map": "guixu-core",
      "title": "舅舅以碎丹锁敌，实际完成最后一战",
      "detail": "实际清敌才留下胜利凭据；本场无普通掉落。失败保留此前已完成阶段，可回安全处整备重试。",
      "enemies": [
        {
          "id": "fight-xuanji-final-bind-enemy-0",
          "kind": "stone",
          "name": "玄玑·守势",
          "x": 515,
          "y": 410,
          "maxHp": 370,
          "speed": 44,
          "damage": 11,
          "spriteKey": "m4Xuanji",
          "spriteCell": 0
        }
      ],
      "returnTo": {
        "map": "alliance-camp",
        "x": 640,
        "y": 650
      },
      "sinceRevision": 3
    },
    "fight-dacheng-immortal": {
      "id": "fight-dacheng-immortal",
      "map": "heaven-threshold",
      "title": "仙劫：稳守与清除高压雷影",
      "detail": "实际清敌才留下胜利凭据；本场无普通掉落。失败保留此前已完成阶段，可回安全处整备重试。",
      "enemies": [
        {
          "id": "fight-dacheng-immortal-enemy-0",
          "kind": "stone",
          "name": "劫影·守势",
          "x": 515,
          "y": 370,
          "maxHp": 460,
          "speed": 44,
          "damage": 11,
          "spriteKey": "m4Thunder",
          "spriteCell": 0
        },
        {
          "id": "fight-dacheng-immortal-enemy-1",
          "kind": "sprite",
          "name": "劫影·游袭",
          "x": 765,
          "y": 370,
          "maxHp": 313,
          "speed": 68,
          "damage": 9,
          "spriteKey": "m4Mind",
          "spriteCell": 0
        }
      ],
      "returnTo": {
        "map": "heaven-threshold",
        "x": 640,
        "y": 650
      },
      "sinceRevision": 3
    },
    "fight-dacheng-demon": {
      "id": "fight-dacheng-demon",
      "map": "heaven-threshold",
      "title": "魔劫：先破护甲再制控魂影",
      "detail": "实际清敌才留下胜利凭据；本场无普通掉落。失败保留此前已完成阶段，可回安全处整备重试。",
      "enemies": [
        {
          "id": "fight-dacheng-demon-enemy-0",
          "kind": "stone",
          "name": "劫影·守势",
          "x": 515,
          "y": 370,
          "maxHp": 460,
          "speed": 44,
          "damage": 11,
          "spriteKey": "m4Thunder",
          "spriteCell": 0
        },
        {
          "id": "fight-dacheng-demon-enemy-1",
          "kind": "sprite",
          "name": "劫影·游袭",
          "x": 765,
          "y": 370,
          "maxHp": 313,
          "speed": 68,
          "damage": 9,
          "spriteKey": "m4Mind",
          "spriteCell": 0
        }
      ],
      "returnTo": {
        "map": "heaven-threshold",
        "x": 640,
        "y": 650
      },
      "sinceRevision": 3
    },
    "fight-dacheng-living": {
      "id": "fight-dacheng-living",
      "map": "heaven-threshold",
      "title": "众生劫：保护撤路标志并完成真实战斗",
      "detail": "实际清敌才留下胜利凭据；本场无普通掉落。失败保留此前已完成阶段，可回安全处整备重试。",
      "enemies": [
        {
          "id": "fight-dacheng-living-enemy-0",
          "kind": "stone",
          "name": "劫影·守势",
          "x": 515,
          "y": 370,
          "maxHp": 460,
          "speed": 44,
          "damage": 11,
          "spriteKey": "m4LivingTrial",
          "spriteCell": 0
        },
        {
          "id": "fight-dacheng-living-enemy-1",
          "kind": "sprite",
          "name": "劫影·游袭",
          "x": 765,
          "y": 370,
          "maxHp": 313,
          "speed": 68,
          "damage": 9,
          "spriteKey": "m4LivingTrial",
          "spriteCell": 0
        }
      ],
      "returnTo": {
        "map": "heaven-threshold",
        "x": 640,
        "y": 650
      },
      "sinceRevision": 3
    },
    "fight-west-late-pressure": {
      "id": "fight-west-late-pressure",
      "map": "guixu-west",
      "title": "晚到西线：先驱离阵外追击傀",
      "detail": "实际清敌才留下胜利凭据；本场无普通掉落。失败保留此前已完成阶段，可回安全处整备重试。",
      "enemies": [
        {
          "id": "fight-west-late-pressure-enemy-0",
          "kind": "stone",
          "name": "战场傀儡·守势",
          "x": 445,
          "y": 665,
          "maxHp": 370,
          "speed": 44,
          "damage": 11,
          "spriteKey": "m4WarGolem",
          "spriteCell": 0
        },
        {
          "id": "fight-west-late-pressure-enemy-1",
          "kind": "sprite",
          "name": "战场傀儡·游袭",
          "x": 695,
          "y": 665,
          "maxHp": 252,
          "speed": 68,
          "damage": 9,
          "spriteKey": "m4WarGolem",
          "spriteCell": 0
        }
      ],
      "returnTo": {
        "map": "alliance-camp",
        "x": 640,
        "y": 650
      },
      "sinceRevision": 3
    },
    "fight-east-late-pursuit": {
      "id": "fight-east-late-pursuit",
      "map": "guixu-east",
      "title": "晚到东线：击退修路后的追兵",
      "detail": "实际清敌才留下胜利凭据；本场无普通掉落。失败保留此前已完成阶段，可回安全处整备重试。",
      "enemies": [
        {
          "id": "fight-east-late-pursuit-enemy-0",
          "kind": "stone",
          "name": "战场傀儡·守势",
          "x": 385,
          "y": 390,
          "maxHp": 370,
          "speed": 44,
          "damage": 11,
          "spriteKey": "m4WarGolem",
          "spriteCell": 0
        }
      ],
      "returnTo": {
        "map": "alliance-camp",
        "x": 640,
        "y": 650
      },
      "sinceRevision": 3
    },
    "clear-west-pressure-0": {
      "id": "clear-west-pressure-0",
      "map": "guixu-west",
      "title": "联军侧翼援护下清西线巨傀",
      "detail": "实际清敌才留下胜利凭据；本场无普通掉落。失败保留此前已完成阶段，可回安全处整备重试。",
      "enemies": [
        {
          "id": "clear-west-pressure-0-enemy-0",
          "kind": "stone",
          "name": "战场傀儡·守势",
          "x": 625,
          "y": 265,
          "maxHp": 289,
          "speed": 44,
          "damage": 11,
          "spriteKey": "m4WarGolem",
          "spriteCell": 0
        }
      ],
      "returnTo": {
        "map": "alliance-camp",
        "x": 640,
        "y": 650
      },
      "sinceRevision": 3
    },
    "clear-west-pressure-1": {
      "id": "clear-west-pressure-1",
      "map": "guixu-west",
      "title": "各军自主：正面清西线巨傀",
      "detail": "实际清敌才留下胜利凭据；本场无普通掉落。失败保留此前已完成阶段，可回安全处整备重试。",
      "enemies": [
        {
          "id": "clear-west-pressure-1-enemy-0",
          "kind": "stone",
          "name": "战场傀儡·守势",
          "x": 625,
          "y": 265,
          "maxHp": 370,
          "speed": 44,
          "damage": 11,
          "spriteKey": "m4WarGolem",
          "spriteCell": 0
        },
        {
          "id": "clear-west-pressure-1-enemy-1",
          "kind": "sprite",
          "name": "战场傀儡·游袭",
          "x": 875,
          "y": 265,
          "maxHp": 252,
          "speed": 68,
          "damage": 9,
          "spriteKey": "m4WarGolem",
          "spriteCell": 0
        }
      ],
      "returnTo": {
        "map": "alliance-camp",
        "x": 640,
        "y": 650
      },
      "sinceRevision": 3
    },
    "hold-west-lotus-line-0": {
      "id": "hold-west-lotus-line-0",
      "map": "guixu-west",
      "title": "平反阵师按门规回执协助稳住莲华结界",
      "detail": "实际清敌才留下胜利凭据；本场无普通掉落。失败保留此前已完成阶段，可回安全处整备重试。",
      "enemies": [
        {
          "id": "hold-west-lotus-line-0-enemy-0",
          "kind": "stone",
          "name": "战场傀儡·守势",
          "x": 515,
          "y": 340,
          "maxHp": 289,
          "speed": 44,
          "damage": 11,
          "spriteKey": "m4WarGolem",
          "spriteCell": 0
        }
      ],
      "returnTo": {
        "map": "alliance-camp",
        "x": 640,
        "y": 650
      },
      "sinceRevision": 3
    },
    "hold-west-lotus-line-1": {
      "id": "hold-west-lotus-line-1",
      "map": "guixu-west",
      "title": "自行稳住莲华结界并清敌",
      "detail": "实际清敌才留下胜利凭据；本场无普通掉落。失败保留此前已完成阶段，可回安全处整备重试。",
      "enemies": [
        {
          "id": "hold-west-lotus-line-1-enemy-0",
          "kind": "stone",
          "name": "战场傀儡·守势",
          "x": 515,
          "y": 340,
          "maxHp": 370,
          "speed": 44,
          "damage": 11,
          "spriteKey": "m4WarGolem",
          "spriteCell": 0
        },
        {
          "id": "hold-west-lotus-line-1-enemy-1",
          "kind": "sprite",
          "name": "战场傀儡·游袭",
          "x": 765,
          "y": 340,
          "maxHp": 252,
          "speed": 68,
          "damage": 9,
          "spriteKey": "m4WarGolem",
          "spriteCell": 0
        }
      ],
      "returnTo": {
        "map": "alliance-camp",
        "x": 640,
        "y": 650
      },
      "sinceRevision": 3
    },
    "stop-east-puppet-0": {
      "id": "stop-east-puppet-0",
      "map": "guixu-east",
      "title": "开放典籍的医阵抄本援护伤营",
      "detail": "实际清敌才留下胜利凭据；本场无普通掉落。失败保留此前已完成阶段，可回安全处整备重试。",
      "enemies": [
        {
          "id": "stop-east-puppet-0-enemy-0",
          "kind": "stone",
          "name": "战场傀儡·守势",
          "x": 615,
          "y": 280,
          "maxHp": 289,
          "speed": 44,
          "damage": 11,
          "spriteKey": "m4WarGolem",
          "spriteCell": 0
        }
      ],
      "returnTo": {
        "map": "alliance-camp",
        "x": 640,
        "y": 650
      },
      "sinceRevision": 3
    },
    "stop-east-puppet-1": {
      "id": "stop-east-puppet-1",
      "map": "guixu-east",
      "title": "守住伤营击退巨傀",
      "detail": "实际清敌才留下胜利凭据；本场无普通掉落。失败保留此前已完成阶段，可回安全处整备重试。",
      "enemies": [
        {
          "id": "stop-east-puppet-1-enemy-0",
          "kind": "stone",
          "name": "战场傀儡·守势",
          "x": 615,
          "y": 280,
          "maxHp": 370,
          "speed": 44,
          "damage": 11,
          "spriteKey": "m4WarGolem",
          "spriteCell": 0
        },
        {
          "id": "stop-east-puppet-1-enemy-1",
          "kind": "sprite",
          "name": "战场傀儡·游袭",
          "x": 865,
          "y": 280,
          "maxHp": 252,
          "speed": 68,
          "damage": 9,
          "spriteKey": "m4WarGolem",
          "spriteCell": 0
        }
      ],
      "returnTo": {
        "map": "alliance-camp",
        "x": 640,
        "y": 650
      },
      "sinceRevision": 3
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
    },
    "north-storm-kit": {
      "id": "north-storm-kit",
      "title": "避劫接地包",
      "max": 1,
      "usage": "用于东西两桩的导线与地钉，最后接地时整包扣除。",
      "sinceRevision": 3
    },
    "north-healing-pack": {
      "id": "north-healing-pack",
      "title": "北荒固定夹板",
      "max": 1,
      "usage": "清除追兵后固定凌云子伤处一次。",
      "sinceRevision": 3
    },
    "cliff-rope-kit": {
      "id": "cliff-rope-kit",
      "title": "登崖绳具",
      "max": 1,
      "usage": "三步架绳末扣时消耗；选择破阵则保留，不变普通材料。",
      "sinceRevision": 3
    },
    "school-kit": {
      "id": "school-kit",
      "title": "义塾安置包",
      "max": 3,
      "usage": "修屋、安置、首课各用一份。",
      "sinceRevision": 3
    },
    "trade-seal-kit": {
      "id": "trade-seal-kit",
      "title": "互市官验封签",
      "max": 1,
      "usage": "真实货物交割封单时消耗。",
      "sinceRevision": 3
    },
    "frontline-lotus-seed": {
      "id": "frontline-lotus-seed",
      "title": "苦莲子",
      "max": 1,
      "usage": "西线实际交师兄护持，修为牺牲不可撤销。",
      "sinceRevision": 3
    },
    "west-repair-kit": {
      "id": "west-repair-kit",
      "title": "西线阵锚修复料",
      "max": 2,
      "usage": "晚到西线两锚各用一份；先到核锚不必耗料。",
      "sinceRevision": 3
    },
    "east-stretcher": {
      "id": "east-stretcher",
      "title": "东线救援担架",
      "max": 1,
      "usage": "固定阿辰伤处并撤离时一次投入。",
      "sinceRevision": 3
    },
    "east-repair-kit": {
      "id": "east-repair-kit",
      "title": "伤营修补料",
      "max": 1,
      "usage": "晚到东线真实修复伤营；互市接应优先可提前取得，否则现场筹一份。",
      "sinceRevision": 3
    },
    "sword-reforge-material": {
      "id": "sword-reforge-material",
      "title": "守心剑重铸料",
      "max": 1,
      "usage": "战后清点后投入重铸一次。",
      "sinceRevision": 3
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
    },
    "brother-iron-badge": {
      "id": "brother-iron-badge",
      "title": "凌云子亲交铁牌",
      "detail": "师兄当面交铁牌",
      "source": {
        "task": "northbound-rescue",
        "on": "receive-brother-credential"
      },
      "sinceRevision": 3,
      "spoiler": true
    },
    "phoenix-feather-remnant": {
      "id": "phoenix-feather-remnant",
      "title": "已燃凤羽的残光",
      "detail": "灵薇确认万妖救援后的凤羽残光去向",
      "source": {
        "task": "northbound-rescue",
        "on": "receive-feather-remnant"
      },
      "sinceRevision": 3,
      "spoiler": true
    },
    "mine-key-demon": {
      "id": "mine-key-demon",
      "title": "魔纹矿钥",
      "detail": "舅舅从旧矿守封匣交出魔纹矿钥并具名",
      "source": {
        "task": "northbound-rescue",
        "on": "receive-demon-mine-key"
      },
      "sinceRevision": 3,
      "spoiler": true
    },
    "mine-key-immortal": {
      "id": "mine-key-immortal",
      "title": "仙纹矿钥",
      "detail": "会审执事在查封账柜清点仙纹矿钥",
      "source": {
        "task": "summit-rebellion",
        "on": "seize-immortal-mine-key"
      },
      "sinceRevision": 3,
      "spoiler": true
    },
    "heart-sutra-page": {
      "id": "heart-sutra-page",
      "title": "飞升偈拓页",
      "detail": "拓飞升偈",
      "source": {
        "task": "heartcliff-inquiry",
        "on": "copy-cliff-sutra"
      },
      "sinceRevision": 3,
      "spoiler": true
    },
    "gate-boundary-wedge": {
      "id": "gate-boundary-wedge",
      "title": "界路楔",
      "detail": "从检修匣取界路楔，封好实物来源",
      "source": {
        "task": "mine-dual-keys",
        "on": "recover-mine-boundary-wedge"
      },
      "sinceRevision": 3,
      "spoiler": true
    },
    "public-trial-verdict": {
      "id": "public-trial-verdict",
      "title": "具名公审判决",
      "detail": "公布会审结果、平反林清风、处理叛宗首恶",
      "source": {
        "task": "huashen-trial",
        "on": "publish-trial-sentence"
      },
      "sinceRevision": 3,
      "spoiler": true
    },
    "reform-charter": {
      "id": "reform-charter",
      "title": "已执行新门规",
      "detail": "签新门规、安置反对后离任者",
      "source": {
        "task": "reform-charter",
        "on": "publish-new-charter"
      },
      "sinceRevision": 3,
      "spoiler": true
    },
    "school-care-roll": {
      "id": "school-care-roll",
      "title": "义塾照护名册",
      "detail": "医师与先生分工",
      "source": {
        "task": "school-shelter",
        "on": "arrange-school-care"
      },
      "sinceRevision": 3,
      "spoiler": true
    },
    "border-commerce-covenant": {
      "id": "border-commerce-covenant",
      "title": "已交割互市契约",
      "detail": "实际封存对等货单",
      "source": {
        "task": "border-commerce",
        "on": "seal-trade-covenant"
      },
      "sinceRevision": 3,
      "spoiler": true
    },
    "yuantong-relic": {
      "id": "yuantong-relic",
      "title": "圆通舍利",
      "detail": "第八年圆通坐化，接寺方托付舍利",
      "source": {
        "task": "governance-review",
        "on": "receive-yuantong-relic"
      },
      "sinceRevision": 3,
      "spoiler": true
    },
    "shouxin-sword": {
      "id": "shouxin-sword",
      "title": "清微所交守心剑",
      "detail": "清微当面交守心剑，核交接来源",
      "source": {
        "task": "alliance-muster",
        "on": "receive-shouxin-sword"
      },
      "sinceRevision": 3,
      "spoiler": true
    },
    "west-evacuation-receipt": {
      "id": "west-evacuation-receipt",
      "title": "西线撤离回执",
      "detail": "确认师兄存活而修为已废",
      "source": {
        "task": "war-west",
        "on": "recover-powerless-lingyun"
      },
      "sinceRevision": 3,
      "spoiler": true
    },
    "east-medical-receipt": {
      "id": "east-medical-receipt",
      "title": "东线伤员交接册",
      "detail": "交接伤员，核苏叶人员名单",
      "source": {
        "task": "war-east",
        "on": "escort-east-patients"
      },
      "sinceRevision": 3,
      "spoiler": true
    },
    "grandmother-silver-hairpin": {
      "id": "grandmother-silver-hairpin",
      "title": "外婆遗下的银簪",
      "detail": "玉琅解脱母亲残魂，交银簪留证",
      "source": {
        "task": "guixu-family",
        "on": "witness-uncle-farewell"
      },
      "sinceRevision": 3,
      "spoiler": true
    },
    "uncle-core-fragment": {
      "id": "uncle-core-fragment",
      "title": "凌玉琅魔丹残片",
      "detail": "收殓并接回魔丹残片",
      "source": {
        "task": "guixu-final",
        "on": "recover-uncle-remains"
      },
      "sinceRevision": 3,
      "spoiler": true
    },
    "gate-reception-dial": {
      "id": "gate-reception-dial",
      "title": "接引定盘",
      "detail": "从已停用中枢取接引定盘并记录封签",
      "source": {
        "task": "guixu-final",
        "on": "recover-reception-dial"
      },
      "sinceRevision": 3,
      "spoiler": true
    },
    "gate-tablet-imprint": {
      "id": "gate-tablet-imprint",
      "title": "万妖碑纹印板",
      "detail": "依万妖原碑拓记取印板，注明复核来源",
      "source": {
        "task": "dacheng-preparation",
        "on": "prepare-tablet-imprint"
      },
      "sinceRevision": 3,
      "spoiler": true
    },
    "willing-companion-roll": {
      "id": "willing-companion-roll",
      "title": "自愿同行名册",
      "detail": "逐一确认同门、伤者与民众自己的去留意愿",
      "source": {
        "task": "dacheng-preparation",
        "on": "collect-willing-companions"
      },
      "sinceRevision": 3,
      "spoiler": true
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
    },
    "father-cliff-letter": {
      "id": "father-cliff-letter",
      "title": "父亲血书留证",
      "detail": "读父书并与先前亲缘证据分开留存",
      "source": {
        "task": "heartcliff-inquiry",
        "on": "read-father-bloodletter"
      },
      "sinceRevision": 3,
      "spoiler": true
    },
    "mine-workings-verified": {
      "id": "mine-workings-verified",
      "title": "天痕矿实地查验",
      "detail": "从检修匣取界路楔，封好实物来源",
      "source": {
        "task": "mine-dual-keys",
        "on": "recover-mine-boundary-wedge"
      },
      "sinceRevision": 3,
      "spoiler": true
    },
    "xuanji-sealed-order": {
      "id": "xuanji-sealed-order",
      "title": "玄玑亲批的屠杀密令",
      "detail": "问道崖玉盒中的亲笔朱批，与十五年前青阳林氏遇害直接相关。",
      "source": {
        "task": "heartcliff-inquiry",
        "on": "read-father-bloodletter"
      },
      "sinceRevision": 3,
      "spoiler": true
    },
    "old-mine-vein-chart": {
      "id": "old-mine-vein-chart",
      "title": "玉盒灵矿脉图",
      "detail": "父亲留存的矿脉图，可与北荒检修柜和运输单交叉核对。",
      "source": {
        "task": "heartcliff-inquiry",
        "on": "read-father-bloodletter"
      },
      "sinceRevision": 3,
      "spoiler": true
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
      "goal": "让值役弟子按规矩检查封印，不把被囚者一概当作攻击目标。",
      "metSource": {
        "task": "tower-duty",
        "on": "water-issued"
      }
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
      "goal": "保住同囚者，提醒林墨别以自己的魂魄购买未经证实的话。",
      "metSource": {
        "task": "tower-duty",
        "on": "fox-heard"
      }
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
      "goal": "说出自己见过的青衫年轻人，与外界“入魔逃亡”的说法区分。",
      "metSource": {
        "task": "tower-duty",
        "on": "bear-heard"
      }
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
      "goal": "把林墨带回师父处，同时留下自己愿意承担责任的口述。",
      "lifecycle": [
        {
          "source": {
            "task": "war-west",
            "on": "recover-powerless-lingyun"
          },
          "state": "injured",
          "detail": "师兄存活，修为已废；之后照护与教书不再持战斗架势。",
          "presentation": {
            "atlas": "m4PeopleC",
            "cell": 0,
            "height": 105
          },
          "portrait": {
            "atlas": "m4PeopleC",
            "cell": 0
          }
        }
      ],
      "metSource": {
        "task": "tower-duty",
        "on": "accept"
      }
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
      "goal": "收妥证据与疑点，承认有待解释的往事，安排后续结丹与查证。",
      "lifecycle": [
        {
          "source": {
            "task": "huashen-breakthrough",
            "on": "care-qingwei-after-battle"
          },
          "state": "injured",
          "detail": "金顶受伤后乘轮椅，仍可公开说明责任。",
          "presentation": {
            "atlas": "m4PeopleA",
            "cell": 0,
            "height": 105
          },
          "portrait": {
            "atlas": "m4PeopleA",
            "cell": 0
          }
        },
        {
          "source": {
            "task": "dacheng-preparation",
            "on": "arrange-qingwei-memorial"
          },
          "state": "dead",
          "detail": "战后十年坐化；使用墓碑与祭文，不能再在药庐站立授课。",
          "presentation": {
            "hidden": true
          }
        }
      ],
      "metSource": {
        "task": "tower-duty",
        "on": "accept"
      }
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
      },
      "ageAtEpoch": 25
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
      "sinceRevision": 2,
      "lifecycle": [
        {
          "source": {
            "task": "huashen-breakthrough",
            "on": "care-qingwei-after-battle"
          },
          "state": "alive",
          "detail": "金顶遁走，不再留在旧图。",
          "presentation": {
            "hidden": true
          }
        },
        {
          "source": {
            "task": "guixu-final",
            "on": "fight-xuanji-final-bind"
          },
          "state": "dead",
          "detail": "玄玑已在核心战中败亡。",
          "presentation": {
            "hidden": true
          }
        }
      ],
      "metSource": {
        "task": "tianji-negotiation",
        "on": "offer-heard"
      }
    },
    "qingxia": {
      "id": "qingxia",
      "name": "青霞",
      "role": "丹鼎派修士",
      "portrait": {
        "atlas": "jindanPeopleA",
        "cell": 1
      },
      "sinceRevision": 2,
      "lifecycle": [
        {
          "source": {
            "task": "huashen-trial",
            "on": "publish-trial-sentence"
          },
          "state": "dead",
          "detail": "公审判决已执行；旧图仅保留案卷记录，无活人像。",
          "presentation": {
            "hidden": true
          }
        }
      ],
      "metSource": {
        "task": "wanyao-breakout",
        "on": "accept"
      }
    },
    "lingyulang": {
      "id": "lingyulang",
      "name": "凌玉琅",
      "role": "魔尊与母亲的幼弟",
      "portrait": {
        "atlas": "jindanPeopleA",
        "cell": 2
      },
      "sinceRevision": 2,
      "lifecycle": [
        {
          "source": {
            "task": "guixu-final",
            "on": "fight-xuanji-final-bind"
          },
          "state": "dead",
          "detail": "碎丹锁敌后牺牲；后续以遗物与望乡崖墓碑出现。",
          "presentation": {
            "hidden": true
          }
        }
      ],
      "metSource": {
        "task": "wanyao-trace",
        "on": "lock-compared"
      }
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
      },
      "ageAtEpoch": 30
    },
    "yuantong": {
      "id": "yuantong",
      "name": "圆通",
      "role": "法华寺僧人",
      "portrait": {
        "atlas": "jindanPeopleB",
        "cell": 0
      },
      "sinceRevision": 2,
      "lifecycle": [
        {
          "source": {
            "task": "governance-review",
            "on": "receive-yuantong-relic"
          },
          "state": "dead",
          "detail": "第八年坐化，舍利由寺方托付；战场由新方丈接任。",
          "presentation": {
            "hidden": true
          }
        }
      ],
      "metSource": {
        "task": "wanyao-rescue",
        "on": "accept"
      }
    },
    "liuruyan": {
      "id": "liuruyan",
      "name": "柳如烟",
      "role": "合欢宗宗主",
      "portrait": {
        "atlas": "jindanPeopleB",
        "cell": 1
      },
      "sinceRevision": 2,
      "metSource": {
        "task": "wanyao-rescue",
        "on": "accept"
      }
    },
    "zhouzheng": {
      "id": "zhouzheng",
      "name": "周正",
      "role": "同行弟子",
      "portrait": {
        "atlas": "jindanPeopleB",
        "cell": 2
      },
      "sinceRevision": 2,
      "metSource": {
        "task": "wanyao-rescue",
        "on": "claimed"
      }
    },
    "linqingfeng": {
      "id": "linqingfeng",
      "name": "林清风",
      "role": "丹鼎派修士",
      "portrait": {
        "atlas": "jindanPeopleB",
        "cell": 3
      },
      "sinceRevision": 2,
      "metSource": {
        "task": "huashen-trial",
        "on": "publish-trial-sentence"
      },
      "lifecycle": [
        {
          "source": {
            "task": "huashen-trial",
            "on": "publish-trial-sentence"
          },
          "state": "dead",
          "detail": "林清风在万妖中留下注解后离世；会审已正式平反，旧现场不再停放遗体。",
          "presentation": {
            "hidden": true
          }
        }
      ]
    },
    "shen": {
      "id": "shen",
      "name": "沈灵薇",
      "role": "同门",
      "portrait": {
        "atlas": "characters",
        "cell": 8
      },
      "lifecycle": [
        {
          "source": {
            "task": "dacheng-preparation",
            "on": "claimed"
          },
          "state": "alive",
          "detail": "战后三十年，同门各自长成，仍按实际朋友或亲近关系相待。",
          "presentation": {
            "atlas": "m4PeopleC",
            "cell": 1,
            "height": 105
          },
          "portrait": {
            "atlas": "m4PeopleC",
            "cell": 1
          }
        }
      ],
      "metSource": {
        "task": "tower-duty",
        "on": "accept"
      }
    },
    "achen": {
      "id": "achen",
      "name": "阿辰",
      "role": "弟子，入门七岁、战场十四岁；不开放恋爱",
      "sinceRevision": 3,
      "metSource": {
        "task": "governance-review",
        "on": "receive-achen-as-disciple"
      },
      "lifecycle": [
        {
          "source": {
            "task": "governance-review",
            "on": "receive-achen-as-disciple"
          },
          "state": "alive",
          "detail": "七岁入门的弟子；由义塾照护，不开放感情选择。",
          "presentation": {
            "name": "七岁阿辰",
            "atlas": "m4PeopleA",
            "cell": 2,
            "height": 65,
            "hidden": false
          },
          "portrait": {
            "atlas": "m4PeopleA",
            "cell": 2
          },
          "ageText": "7岁"
        },
        {
          "source": {
            "task": "heti-breakthrough",
            "on": "claimed"
          },
          "state": "alive",
          "detail": "北伐四年后十四岁，仍是需要保护的未成年弟子。",
          "presentation": {
            "name": "十四岁阿辰",
            "atlas": "m4PeopleA",
            "cell": 3,
            "height": 85
          },
          "portrait": {
            "atlas": "m4PeopleA",
            "cell": 3
          },
          "ageText": "14岁"
        },
        {
          "source": {
            "task": "dacheng-preparation",
            "on": "arrange-qingwei-memorial"
          },
          "state": "alive",
          "detail": "战后十年已二十四岁，参与照护和师门交接。",
          "presentation": {
            "name": "成年阿辰",
            "atlas": "m4PeopleB",
            "cell": 0,
            "height": 105
          },
          "portrait": {
            "atlas": "m4PeopleB",
            "cell": 0
          },
          "ageText": "24岁"
        },
        {
          "source": {
            "task": "dacheng-preparation",
            "on": "claimed"
          },
          "state": "alive",
          "ageText": "44岁",
          "detail": "战后三十年，四十四岁的阿辰接续师门照护与传承。",
          "presentation": {
            "name": "成年阿辰",
            "atlas": "m4PeopleB",
            "cell": 0,
            "height": 105
          },
          "portrait": {
            "atlas": "m4PeopleB",
            "cell": 0
          }
        }
      ]
    },
    "new-abbot": {
      "id": "new-abbot",
      "name": "新方丈",
      "role": "圆通师弟，战时接任法华寺",
      "sinceRevision": 3,
      "portrait": {
        "atlas": "m4PeopleB",
        "cell": 1
      },
      "metSource": {
        "task": "alliance-muster",
        "on": "check-alliance-roll"
      }
    },
    "summit-clerk": {
      "id": "summit-clerk",
      "name": "会审执事",
      "role": "保管查封账册",
      "sinceRevision": 3,
      "portrait": {
        "atlas": "m4PeopleB",
        "cell": 3
      },
      "metSource": {
        "task": "summit-evidence",
        "on": "accept"
      }
    },
    "old-elder": {
      "id": "old-elder",
      "name": "离任长老",
      "role": "门规调整后的见证者",
      "sinceRevision": 3,
      "portrait": {
        "atlas": "m4PeopleB",
        "cell": 2
      },
      "metSource": {
        "task": "reform-charter",
        "on": "publish-new-charter"
      }
    }
  },
  "endingCatalog": [],
  "meta": {
    "draft": false,
    "stage": "M4",
    "date": "2026-11-13",
    "scope": "已声明元婴至大乘九处新地图、二十五事务及四个正道终局；其他长分支与关系终局仍由后续阶段制作。",
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
      },
      "m4-north": {
        "file": "src/lib/story/volume4.ts",
        "line": 454,
        "node": "yuanying_beihuang_arrive"
      },
      "m4-thunder": {
        "file": "src/lib/story/volume4.ts",
        "line": 466,
        "node": "yuanying_thunder_1"
      },
      "m4-uncle": {
        "file": "src/lib/story/volume4.ts",
        "line": 479,
        "node": "yuanying_uncle_comes"
      },
      "m4-birth": {
        "file": "src/lib/story/volume4.ts",
        "line": 524,
        "node": "yuanying_birth"
      },
      "m4-rescue": {
        "file": "src/lib/story/volume4.ts",
        "line": 41,
        "node": "yuanying_save_lingyun"
      },
      "m4-debate": {
        "file": "src/lib/story/volume4.ts",
        "line": 593,
        "node": "yuanying_debate_arrive"
      },
      "m4-sword": {
        "file": "src/lib/story/volume4.ts",
        "line": 607,
        "node": "yuanying_debate_sword_1"
      },
      "m4-evidence": {
        "file": "src/lib/story/volume4.ts",
        "line": 650,
        "node": "yuanying_debate_evidence"
      },
      "m4-betray": {
        "file": "src/lib/story/volume4.ts",
        "line": 666,
        "node": "yuanying_debate_betray"
      },
      "m4-cliff": {
        "file": "src/lib/story/volume4.ts",
        "line": 711,
        "node": "yuanying_cliff_wall"
      },
      "m4-heartSword": {
        "file": "src/lib/story/volume4.ts",
        "line": 760,
        "node": "huashen_battle_final"
      },
      "m4-huashen": {
        "file": "src/lib/story/volume4.ts",
        "line": 791,
        "node": "huashen_breakthrough"
      },
      "m4-trial": {
        "file": "src/lib/story/volume4.ts",
        "line": 815,
        "node": "huashen_trial_prep"
      },
      "m4-sentence": {
        "file": "src/lib/story/volume4.ts",
        "line": 856,
        "node": "huashen_trial_sentence"
      },
      "m4-charter": {
        "file": "src/lib/story/volume4.ts",
        "line": 873,
        "node": "huashen_year_1"
      },
      "m4-school": {
        "file": "src/lib/story/volume4.ts",
        "line": 936,
        "node": "huashen_year_3_school"
      },
      "m4-commerce": {
        "file": "src/lib/story/volume4.ts",
        "line": 985,
        "node": "huashen_year_6_reform"
      },
      "m4-achen": {
        "file": "src/lib/story/volume4.ts",
        "line": 998,
        "node": "huashen_year_7_disciple"
      },
      "m4-yuantong": {
        "file": "src/lib/story/volume4.ts",
        "line": 1015,
        "node": "huashen_year_8_yuantong_nirvana"
      },
      "m4-muster": {
        "file": "src/lib/story/volume4.ts",
        "line": 1056,
        "node": "huashen_muster"
      },
      "m4-march": {
        "file": "src/lib/story/volume4.ts",
        "line": 1070,
        "node": "huashen_march"
      },
      "m4-west": {
        "file": "src/lib/story/volume4.ts",
        "line": 1154,
        "node": "heti_day_2"
      },
      "m4-east": {
        "file": "src/lib/story/volume4.ts",
        "line": 1171,
        "node": "heti_achen_stands"
      },
      "m4-grandmother": {
        "file": "src/lib/story/volume4.ts",
        "line": 1201,
        "node": "heti_uncle_mother_puppet"
      },
      "m4-duel": {
        "file": "src/lib/story/volume4.ts",
        "line": 1218,
        "node": "heti_1v1"
      },
      "m4-final": {
        "file": "src/lib/story/volume4.ts",
        "line": 1258,
        "node": "heti_final_strike"
      },
      "m4-aftermath": {
        "file": "src/lib/story/volume4.ts",
        "line": 1283,
        "node": "heti_aftermath"
      },
      "m4-decades": {
        "file": "src/lib/story/volume4.ts",
        "line": 1302,
        "node": "dacheng_30years_1"
      },
      "m4-dacheng": {
        "file": "src/lib/story/volume4.ts",
        "line": 1359,
        "node": "dacheng_breakthrough"
      },
      "m4-gate": {
        "file": "src/lib/story/volume4.ts",
        "line": 1514,
        "node": "dacheng_gate_arrive"
      },
      "m4-farewell": {
        "file": "src/lib/story/volume4.ts",
        "line": 354,
        "node": "dacheng_farewell"
      },
      "m4-keysTwo": {
        "file": "src/lib/story/volume3.ts",
        "line": 1022,
        "node": "jindan_uncle_tianhen"
      },
      "m4-keysThree": {
        "file": "src/lib/story/volume3.ts",
        "line": 960,
        "node": "jindan_meet_liuruyan"
      },
      "m4-dao": {
        "file": "src/lib/story/endings.ts",
        "line": 45,
        "node": "ending_dao"
      },
      "m4-ascent": {
        "file": "src/lib/story/endings.ts",
        "line": 28,
        "node": "ending_ascent"
      },
      "m4-together": {
        "file": "src/lib/story/endings.ts",
        "line": 536,
        "node": "ending_dacheng_together"
      },
      "m4-stay": {
        "file": "src/lib/story/endings.ts",
        "line": 495,
        "node": "ending_dacheng_free"
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
      },
      "m4": [
        "retreat-north",
        "accept-northbound-preparation",
        "read-northbound-writ",
        "receive-north-kit",
        "ground-north-west",
        "ground-north-east",
        "claim-northbound-preparation",
        "accept-yuanying-breakthrough",
        "fight-yuanying-outer-thunder",
        "accept-uncle-guard",
        "choose-yuanying-focus-steady",
        "fight-yuanying-life-trial",
        "settle-yuanying",
        "claim-yuanying-breakthrough",
        "accept-northbound-rescue",
        "clear-north-pursuit",
        "splint-lingyun",
        "handoff-lingyun",
        "receive-brother-credential",
        "receive-feather-remnant",
        "receive-demon-mine-key",
        "claim-northbound-rescue",
        "north-summit",
        "accept-summit-evidence",
        "audit-summit-ledger",
        "choose-summit-proof-method-clerk-and-witness",
        "consult-clerk-book",
        "verify-clerk-signature",
        "hear-summit-lingyun",
        "hear-summit-liu",
        "claim-summit-evidence",
        "accept-summit-swordmeet",
        "fight-summit-measured-spar",
        "answer-demon-heir",
        "claim-summit-swordmeet",
        "accept-summit-rebellion",
        "present-summit-proofs",
        "protect-summit-witnesses",
        "seize-immortal-mine-key",
        "secure-qingwei-retreat",
        "claim-summit-rebellion",
        "summit-cliff",
        "accept-heartcliff-inquiry",
        "take-cliff-rope",
        "choose-cliff-route-rope-route",
        "tie-cliff-west",
        "tie-cliff-middle",
        "tie-cliff-east",
        "copy-cliff-sutra",
        "read-father-bloodletter",
        "claim-heartcliff-inquiry",
        "cliff-summit",
        "accept-huashen-breakthrough",
        "fight-xuanji-first-stand",
        "care-qingwei-after-battle",
        "fight-huashen-heart-trial",
        "settle-huashen",
        "claim-huashen-breakthrough",
        "summit-north",
        "accept-mine-dual-keys",
        "compare-mine-two-keys",
        "open-mine-inspection-case",
        "inspect-mine-blood-groove",
        "inspect-mine-transport",
        "recover-mine-boundary-wedge",
        "claim-mine-dual-keys",
        "north-summit",
        "accept-huashen-trial",
        "catalogue-confiscated-records",
        "examine-qingwei-responsibility",
        "identify-victim-tablets",
        "hear-qingxia-last-testimony",
        "publish-trial-sentence",
        "claim-huashen-trial",
        "summit-commons",
        "accept-reform-charter",
        "read-prison-register",
        "choose-charter-order-sentence-review",
        "deliver-sentence-review",
        "open-public-library",
        "publish-new-charter",
        "claim-reform-charter",
        "accept-school-shelter",
        "receive-school-kits",
        "prepare-school-roof",
        "register-school-children",
        "deliver-first-lesson",
        "arrange-school-care",
        "claim-school-shelter",
        "accept-border-commerce",
        "take-trade-seal",
        "weigh-trade-cargo",
        "protect-trade-caravan",
        "choose-trade-priority-medicine",
        "seal-trade-medicine",
        "claim-border-commerce",
        "accept-governance-review",
        "receive-achen-as-disciple",
        "receive-yuantong-relic",
        "audit-three-reforms",
        "choose-governance-future-continue",
        "claim-governance-review",
        "commons-camp",
        "accept-alliance-muster",
        "check-alliance-roll",
        "choose-alliance-policy-independent",
        "receive-frontline-supplies",
        "receive-shouxin-sword",
        "claim-alliance-muster",
        "accept-heti-breakthrough",
        "check-body-and-spirit",
        "fight-heti-separation",
        "rejoin-spirit-channel",
        "fight-heti-unity",
        "claim-heti-breakthrough",
        "accept-war-order",
        "read-both-front-reports",
        "choose-war-order-east-first",
        "claim-war-order",
        "camp-east",
        "accept-war-east",
        "check-east-wounded",
        "east-arrival-early",
        "stop-east-puppet-1",
        "splint-achen",
        "escort-east-patients",
        "claim-war-east",
        "east-camp",
        "camp-west",
        "accept-war-west",
        "inspect-west-anchor",
        "fight-west-late-pressure",
        "repair-west-left-late",
        "repair-west-right-late",
        "clear-west-pressure-1",
        "entrust-lotus-to-lingyun",
        "hold-west-lotus-line-0",
        "recover-powerless-lingyun",
        "claim-war-west",
        "west-camp",
        "camp-core",
        "accept-guixu-family",
        "identify-grandmother-puppet",
        "cut-grandmother-control",
        "witness-uncle-farewell",
        "claim-guixu-family",
        "accept-guixu-final",
        "fight-xuanji-demon-armor",
        "spend-mother-lock-core",
        "fight-xuanji-final-bind",
        "recover-uncle-remains",
        "recover-reception-dial",
        "claim-guixu-final",
        "core-camp",
        "camp-commons",
        "accept-war-aftermath",
        "bury-lingyulang",
        "settle-lingyun-care",
        "check-achen-recovery",
        "record-war-losses",
        "claim-war-aftermath",
        "commons-heaven",
        "accept-dacheng-preparation",
        "receive-reforge-material",
        "reforge-shouxin",
        "prepare-tablet-imprint",
        "calibrate-gate-tablet",
        "calibrate-gate-wedge",
        "calibrate-gate-dial",
        "match-gate-three-components",
        "arrange-qingwei-memorial",
        "collect-willing-companions",
        "claim-dacheng-preparation",
        "accept-dacheng-breakthrough",
        "fight-dacheng-immortal",
        "settle-dacheng-immortal",
        "fight-dacheng-demon",
        "settle-dacheng-demon",
        "fight-dacheng-living",
        "settle-dacheng-realm",
        "claim-dacheng-breakthrough",
        "accept-heaven-gate",
        "handover-shushan-seal",
        "farewell-lingyun",
        "farewell-shen",
        "choose-heaven-ending-alone",
        "claim-heaven-gate"
      ],
      "m4Variants": {
        "teach": {
          "from": "choose-governance-future-continue",
          "to": "claim-governance-review",
          "steps": [
            "choose-governance-future-teach",
            "claim-governance-review"
          ],
          "truncate": true
        },
        "stay": {
          "from": "choose-heaven-ending-alone",
          "to": "claim-heaven-gate",
          "steps": [
            "choose-heaven-ending-stay",
            "claim-heaven-gate"
          ]
        },
        "together": {
          "from": "choose-heaven-ending-alone",
          "to": "claim-heaven-gate",
          "steps": [
            "choose-heaven-ending-together",
            "claim-heaven-gate"
          ]
        },
        "carriedDocket": {
          "from": "choose-summit-proof-method-clerk-and-witness",
          "to": "verify-clerk-signature",
          "steps": [
            "choose-summit-proof-method-carried-docket",
            "authenticate-carried-docket"
          ]
        },
        "breakArray": {
          "from": "choose-cliff-route-rope-route",
          "to": "tie-cliff-east",
          "steps": [
            "choose-cliff-route-break-array",
            "break-cliff-array"
          ]
        },
        "westFirst": {
          "from": "choose-war-order-east-first",
          "to": "claim-war-west",
          "steps": [
            "choose-war-order-west-first",
            "claim-war-order",
            "camp-west",
            "accept-war-west",
            "inspect-west-anchor",
            "west-arrival-early",
            "verify-west-left",
            "verify-west-right",
            "clear-west-pressure-1",
            "entrust-lotus-to-lingyun",
            "hold-west-lotus-line-0",
            "recover-powerless-lingyun",
            "claim-war-west",
            "west-camp",
            "camp-east",
            "accept-war-east",
            "check-east-wounded",
            "take-east-local-repair",
            "repair-east-late",
            "fight-east-late-pursuit",
            "stop-east-puppet-1",
            "splint-achen",
            "escort-east-patients",
            "claim-war-east"
          ],
          "afterReplacement": {
            "west-camp": "east-camp"
          }
        },
        "allied": {
          "from": "choose-alliance-policy-independent",
          "to": "choose-alliance-policy-independent",
          "steps": [
            "choose-alliance-policy-allied"
          ],
          "actionReplacements": {
            "clear-west-pressure-1": "clear-west-pressure-0"
          }
        },
        "methodBattles": {
          "allied": {
            "clear-west-pressure-1": "clear-west-pressure-0"
          },
          "openLibrary": {
            "hold-west-lotus-line-0": "hold-west-lotus-line-1",
            "stop-east-puppet-1": "stop-east-puppet-0"
          }
        },
        "focuses": {
          "sword": {
            "from": "choose-yuanying-focus-steady",
            "to": "choose-yuanying-focus-steady",
            "steps": [
              "choose-yuanying-focus-sword"
            ]
          },
          "medicine": {
            "from": "choose-yuanying-focus-steady",
            "to": "choose-yuanying-focus-steady",
            "steps": [
              "choose-yuanying-focus-medicine"
            ]
          },
          "scholar": {
            "from": "choose-yuanying-focus-steady",
            "to": "choose-yuanying-focus-steady",
            "steps": [
              "choose-yuanying-focus-scholar"
            ]
          }
        },
        "taskPaths": {
          "northbound-preparation": [
            "accept-northbound-preparation",
            "read-northbound-writ",
            "receive-north-kit",
            "ground-north-west",
            "ground-north-east",
            "claim-northbound-preparation"
          ],
          "yuanying-breakthrough": [
            "accept-yuanying-breakthrough",
            "fight-yuanying-outer-thunder",
            "accept-uncle-guard",
            "choose-yuanying-focus-steady",
            "fight-yuanying-life-trial",
            "settle-yuanying",
            "claim-yuanying-breakthrough"
          ],
          "northbound-rescue": [
            "accept-northbound-rescue",
            "clear-north-pursuit",
            "splint-lingyun",
            "handoff-lingyun",
            "receive-brother-credential",
            "receive-feather-remnant",
            "receive-demon-mine-key",
            "claim-northbound-rescue"
          ],
          "summit-evidence": [
            "accept-summit-evidence",
            "audit-summit-ledger",
            "choose-summit-proof-method-clerk-and-witness",
            "consult-clerk-book",
            "verify-clerk-signature",
            "hear-summit-lingyun",
            "hear-summit-liu",
            "claim-summit-evidence"
          ],
          "summit-swordmeet": [
            "accept-summit-swordmeet",
            "fight-summit-measured-spar",
            "answer-demon-heir",
            "claim-summit-swordmeet"
          ],
          "summit-rebellion": [
            "accept-summit-rebellion",
            "present-summit-proofs",
            "protect-summit-witnesses",
            "seize-immortal-mine-key",
            "secure-qingwei-retreat",
            "claim-summit-rebellion"
          ],
          "heartcliff-inquiry": [
            "accept-heartcliff-inquiry",
            "take-cliff-rope",
            "choose-cliff-route-rope-route",
            "tie-cliff-west",
            "tie-cliff-middle",
            "tie-cliff-east",
            "copy-cliff-sutra",
            "read-father-bloodletter",
            "claim-heartcliff-inquiry"
          ],
          "huashen-breakthrough": [
            "accept-huashen-breakthrough",
            "fight-xuanji-first-stand",
            "care-qingwei-after-battle",
            "fight-huashen-heart-trial",
            "settle-huashen",
            "claim-huashen-breakthrough"
          ],
          "mine-dual-keys": [
            "accept-mine-dual-keys",
            "compare-mine-two-keys",
            "open-mine-inspection-case",
            "inspect-mine-blood-groove",
            "inspect-mine-transport",
            "recover-mine-boundary-wedge",
            "claim-mine-dual-keys"
          ],
          "huashen-trial": [
            "accept-huashen-trial",
            "catalogue-confiscated-records",
            "examine-qingwei-responsibility",
            "identify-victim-tablets",
            "hear-qingxia-last-testimony",
            "publish-trial-sentence",
            "claim-huashen-trial"
          ],
          "reform-charter": [
            "accept-reform-charter",
            "read-prison-register",
            "choose-charter-order-sentence-review",
            "deliver-sentence-review",
            "open-public-library",
            "publish-new-charter",
            "claim-reform-charter"
          ],
          "school-shelter": [
            "accept-school-shelter",
            "receive-school-kits",
            "prepare-school-roof",
            "register-school-children",
            "deliver-first-lesson",
            "arrange-school-care",
            "claim-school-shelter"
          ],
          "border-commerce": [
            "accept-border-commerce",
            "take-trade-seal",
            "weigh-trade-cargo",
            "protect-trade-caravan",
            "choose-trade-priority-medicine",
            "seal-trade-medicine",
            "claim-border-commerce"
          ],
          "governance-review": [
            "accept-governance-review",
            "receive-achen-as-disciple",
            "receive-yuantong-relic",
            "audit-three-reforms",
            "choose-governance-future-continue",
            "claim-governance-review"
          ],
          "alliance-muster": [
            "accept-alliance-muster",
            "check-alliance-roll",
            "choose-alliance-policy-independent",
            "receive-frontline-supplies",
            "receive-shouxin-sword",
            "claim-alliance-muster"
          ],
          "heti-breakthrough": [
            "accept-heti-breakthrough",
            "check-body-and-spirit",
            "fight-heti-separation",
            "rejoin-spirit-channel",
            "fight-heti-unity",
            "claim-heti-breakthrough"
          ],
          "war-order": [
            "accept-war-order",
            "read-both-front-reports",
            "choose-war-order-east-first",
            "claim-war-order"
          ],
          "war-west": [
            "accept-war-west",
            "inspect-west-anchor",
            "fight-west-late-pressure",
            "repair-west-left-late",
            "repair-west-right-late",
            "clear-west-pressure-1",
            "entrust-lotus-to-lingyun",
            "hold-west-lotus-line-0",
            "recover-powerless-lingyun",
            "claim-war-west"
          ],
          "war-east": [
            "accept-war-east",
            "check-east-wounded",
            "east-arrival-early",
            "stop-east-puppet-1",
            "splint-achen",
            "escort-east-patients",
            "claim-war-east"
          ],
          "guixu-family": [
            "accept-guixu-family",
            "identify-grandmother-puppet",
            "cut-grandmother-control",
            "witness-uncle-farewell",
            "claim-guixu-family"
          ],
          "guixu-final": [
            "accept-guixu-final",
            "fight-xuanji-demon-armor",
            "spend-mother-lock-core",
            "fight-xuanji-final-bind",
            "recover-uncle-remains",
            "recover-reception-dial",
            "claim-guixu-final"
          ],
          "war-aftermath": [
            "accept-war-aftermath",
            "bury-lingyulang",
            "settle-lingyun-care",
            "check-achen-recovery",
            "record-war-losses",
            "claim-war-aftermath"
          ],
          "dacheng-preparation": [
            "accept-dacheng-preparation",
            "receive-reforge-material",
            "reforge-shouxin",
            "prepare-tablet-imprint",
            "calibrate-gate-tablet",
            "calibrate-gate-wedge",
            "calibrate-gate-dial",
            "match-gate-three-components",
            "arrange-qingwei-memorial",
            "collect-willing-companions",
            "claim-dacheng-preparation"
          ],
          "dacheng-breakthrough": [
            "accept-dacheng-breakthrough",
            "fight-dacheng-immortal",
            "settle-dacheng-immortal",
            "fight-dacheng-demon",
            "settle-dacheng-demon",
            "fight-dacheng-living",
            "settle-dacheng-realm",
            "claim-dacheng-breakthrough"
          ],
          "heaven-gate": [
            "accept-heaven-gate",
            "handover-shushan-seal",
            "farewell-lingyun",
            "farewell-shen",
            "choose-heaven-ending-alone",
            "claim-heaven-gate"
          ]
        },
        "checkpoints": {
          "governanceBefore": "choose-governance-future-continue",
          "heavenBefore": "choose-heaven-ending-alone"
        },
        "openLibrary": {
          "from": "choose-charter-order-sentence-review",
          "to": "choose-charter-order-sentence-review",
          "steps": [
            "choose-charter-order-open-library"
          ],
          "actionReplacements": {
            "hold-west-lotus-line-0": "hold-west-lotus-line-1",
            "stop-east-puppet-1": "stop-east-puppet-0"
          }
        },
        "evacuation": {
          "from": "choose-trade-priority-medicine",
          "to": "seal-trade-medicine",
          "steps": [
            "choose-trade-priority-evacuation",
            "seal-trade-evacuation"
          ],
          "removeActions": [
            "take-east-local-repair"
          ]
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
    },
    "m4": {
      "status": "runtime-ready-for-integrated-validation",
      "tasks": [
        "northbound-preparation",
        "yuanying-breakthrough",
        "northbound-rescue",
        "summit-evidence",
        "summit-swordmeet",
        "summit-rebellion",
        "heartcliff-inquiry",
        "huashen-breakthrough",
        "mine-dual-keys",
        "huashen-trial",
        "reform-charter",
        "school-shelter",
        "border-commerce",
        "governance-review",
        "alliance-muster",
        "heti-breakthrough",
        "war-order",
        "war-west",
        "war-east",
        "guixu-family",
        "guixu-final",
        "war-aftermath",
        "dacheng-preparation",
        "dacheng-breakthrough",
        "heaven-gate"
      ],
      "maps": [
        "beihuang-retreat",
        "golden-summit",
        "heart-cliff",
        "shushan-commons",
        "alliance-camp",
        "guixu-west",
        "guixu-east",
        "guixu-core",
        "heaven-threshold"
      ],
      "artCalibration": "九图已按原画校准，步行与交互连通需正式审计报告核验。",
      "sourceNotes": "外婆傀儡、锁芯耗尽留半壳、圆通继任与纪年纠错见阶段剧情依据；矿钥实体与天门护持器来源为明确补写。"
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
      "next": "元婴准备",
      "sinceRevision": 2
    },
    "yuanying": {
      "id": "yuanying",
      "name": "元婴初期",
      "source": {
        "task": "yuanying-breakthrough",
        "on": "claimed"
      },
      "profile": {
        "blade": 46,
        "spell": 0.9,
        "defence": 0.36,
        "regen": 3.8
      },
      "bodyRules": [
        "境界由实际突破交付记录派生，不改首章修为阶位。",
        "气血、灵力上限仍为100；治疗、护甲、法宝、功法和战术继续生效。"
      ],
      "next": "化神修行"
    },
    "huashen": {
      "id": "huashen",
      "name": "化神初期",
      "source": {
        "task": "huashen-breakthrough",
        "on": "claimed"
      },
      "profile": {
        "blade": 60,
        "spell": 1.05,
        "defence": 0.42,
        "regen": 4.6
      },
      "bodyRules": [
        "境界由实际突破交付记录派生，不改首章修为阶位。",
        "气血、灵力上限仍为100；治疗、护甲、法宝、功法和战术继续生效。"
      ],
      "next": "合体与北伐"
    },
    "heti": {
      "id": "heti",
      "name": "合体初期",
      "source": {
        "task": "heti-breakthrough",
        "on": "claimed"
      },
      "profile": {
        "blade": 80,
        "spell": 1.2,
        "defence": 0.48,
        "regen": 5.4
      },
      "bodyRules": [
        "境界由实际突破交付记录派生，不改首章修为阶位。",
        "气血、灵力上限仍为100；治疗、护甲、法宝、功法和战术继续生效。"
      ],
      "next": "大乘准备"
    },
    "dacheng": {
      "id": "dacheng",
      "name": "大乘初期",
      "source": {
        "task": "dacheng-breakthrough",
        "on": "claimed"
      },
      "profile": {
        "blade": 102,
        "spell": 1.4,
        "defence": 0.54,
        "regen": 6.2
      },
      "bodyRules": [
        "境界由实际突破交付记录派生，不改首章修为阶位。",
        "气血、灵力上限仍为100；治疗、护甲、法宝、功法和战术继续生效。"
      ],
      "next": "天门抉择"
    }
  },
  "chapterLabel": "跨章行程 · 筑基至大乘",
  "personBindings": [
    {
      "map": "garden",
      "objectId": "qingwei",
      "personId": "qingwei"
    },
    {
      "map": "garden",
      "objectId": "sister",
      "personId": "shen"
    }
  ],
  "realmOrder": [
    "jindan",
    "yuanying",
    "huashen",
    "heti",
    "dacheng"
  ],
  "baseAge": 26,
  "ageEpoch": "northbound-preparation claimed after explicit three-year transition from M3",
  "eras": [
    {
      "id": "northbound",
      "label": "北荒元婴起点",
      "elapsedYears": 0,
      "source": {
        "task": "northbound-preparation",
        "on": "claimed"
      },
      "sourceText": "实际完成北荒元婴起点的约定事项后记入纪年；未做之事不提前发生。"
    },
    {
      "id": "huashen",
      "label": "化神三年",
      "elapsedYears": 3,
      "source": {
        "task": "huashen-breakthrough",
        "on": "claimed"
      },
      "sourceText": "实际完成化神三年的约定事项后记入纪年；未做之事不提前发生。"
    },
    {
      "id": "charter",
      "label": "治宗第一年",
      "elapsedYears": 4,
      "source": {
        "task": "reform-charter",
        "on": "claimed"
      },
      "sourceText": "实际完成治宗第一年的约定事项后记入纪年；未做之事不提前发生。"
    },
    {
      "id": "school",
      "label": "治宗第三年",
      "elapsedYears": 6,
      "source": {
        "task": "school-shelter",
        "on": "claimed"
      },
      "sourceText": "实际完成治宗第三年的约定事项后记入纪年；未做之事不提前发生。"
    },
    {
      "id": "commerce",
      "label": "治宗第六年",
      "elapsedYears": 9,
      "source": {
        "task": "border-commerce",
        "on": "claimed"
      },
      "sourceText": "实际完成治宗第六年的约定事项后记入纪年；未做之事不提前发生。"
    },
    {
      "id": "disciple",
      "label": "治宗第七年",
      "elapsedYears": 10,
      "source": {
        "task": "governance-review",
        "on": "receive-achen-as-disciple"
      },
      "sourceText": "实际完成治宗第七年的约定事项后记入纪年；未做之事不提前发生。"
    },
    {
      "id": "relic",
      "label": "治宗第八年",
      "elapsedYears": 11,
      "source": {
        "task": "governance-review",
        "on": "receive-yuantong-relic"
      },
      "sourceText": "实际完成治宗第八年的约定事项后记入纪年；未做之事不提前发生。"
    },
    {
      "id": "governance",
      "label": "治宗十年",
      "elapsedYears": 13,
      "source": {
        "task": "governance-review",
        "on": "claimed"
      },
      "sourceText": "实际完成治宗十年的约定事项后记入纪年；未做之事不提前发生。"
    },
    {
      "id": "heti",
      "label": "北伐四年",
      "elapsedYears": 17,
      "source": {
        "task": "heti-breakthrough",
        "on": "claimed"
      },
      "sourceText": "实际完成北伐四年的约定事项后记入纪年；未做之事不提前发生。"
    },
    {
      "id": "aftermath",
      "label": "战后归山",
      "elapsedYears": 17,
      "source": {
        "task": "war-aftermath",
        "on": "claimed"
      },
      "sourceText": "实际完成战后归山的约定事项后记入纪年；未做之事不提前发生。"
    },
    {
      "id": "memorial",
      "label": "战后十年",
      "elapsedYears": 27,
      "source": {
        "task": "dacheng-preparation",
        "on": "arrange-qingwei-memorial"
      },
      "sourceText": "实际完成战后十年的约定事项后记入纪年；未做之事不提前发生。"
    },
    {
      "id": "dacheng",
      "label": "战后三十年",
      "elapsedYears": 47,
      "source": {
        "task": "dacheng-preparation",
        "on": "claimed"
      },
      "sourceText": "实际完成战后三十年的约定事项后记入纪年；未做之事不提前发生。"
    }
  ],
  "endings": {
    "ending_dao": {
      "id": "ending_dao",
      "title": "立道传法",
      "sourceId": "ending_dao",
      "source": {
        "task": "governance-review",
        "on": "claimed",
        "choice": "teach"
      },
      "requires": {
        "all": [
          {
            "type": "realm",
            "id": "huashen"
          }
        ],
        "any": []
      },
      "sourceRefs": [
        {
          "file": "src/lib/story/endings.ts",
          "line": 45,
          "node": "ending_dao"
        }
      ],
      "summary": "在化神境落实门规、义塾和互市后，你选择把道传给后来人。本次行程止于立道传法。"
    },
    "ending_ascent": {
      "id": "ending_ascent",
      "title": "终入仙门",
      "sourceId": "ending_ascent",
      "source": {
        "task": "heaven-gate",
        "on": "claimed",
        "choice": "alone"
      },
      "requires": {
        "all": [
          {
            "type": "realm",
            "id": "dacheng"
          }
        ],
        "any": []
      },
      "sourceRefs": [
        {
          "file": "src/lib/story/endings.ts",
          "line": 28,
          "node": "ending_ascent"
        }
      ],
      "summary": "师门与伤者已有交接，你独自跨过天门。同行者与人间朋友各自保留自己的选择。",
      "recap": [
        {
          "title": "家人与遗物",
          "text": "外婆残魂已解脱，凌玉琅碎丹锁敌后安葬。母亲锁芯余息耗尽，自己的空半锁仍留在身边。"
        }
      ]
    },
    "ending_dacheng_together": {
      "id": "ending_dacheng_together",
      "title": "携众同天",
      "sourceId": "ending_dacheng_together",
      "source": {
        "task": "heaven-gate",
        "on": "claimed",
        "choice": "together"
      },
      "requires": {
        "all": [
          {
            "type": "realm",
            "id": "dacheng"
          },
          {
            "type": "legacyToken",
            "id": "foxHairpin"
          },
          {
            "type": "token",
            "id": "phoenix-feather-remnant"
          },
          {
            "type": "token",
            "id": "brother-iron-badge"
          },
          {
            "type": "token",
            "id": "willing-companion-roll"
          },
          {
            "type": "token",
            "id": "gate-tablet-imprint"
          },
          {
            "type": "token",
            "id": "gate-boundary-wedge"
          },
          {
            "type": "token",
            "id": "gate-reception-dial"
          }
        ],
        "any": []
      },
      "sourceRefs": [
        {
          "file": "src/lib/story/endings.ts",
          "line": 536,
          "node": "ending_dacheng_together"
        }
      ],
      "summary": "你以真实自愿名册与三处界路护持，带愿同行的人同登天门。同行不是自动婚契。",
      "recap": [
        {
          "title": "自愿同行",
          "text": "你们逐一登记了愿意同登者，并完成三处护持。未结契的人也可作为同门或朋友同行。"
        },
        {
          "title": "家人与遗物",
          "text": "外婆残魂已解脱，凌玉琅碎丹锁敌后安葬。母亲锁芯余息耗尽，自己的空半锁仍留在身边。"
        }
      ]
    },
    "ending_dacheng_free": {
      "id": "ending_dacheng_free",
      "title": "逍遥人间",
      "sourceId": "ending_dacheng_free",
      "source": {
        "task": "heaven-gate",
        "on": "claimed",
        "choice": "stay"
      },
      "requires": {
        "all": [
          {
            "type": "realm",
            "id": "dacheng"
          }
        ],
        "any": []
      },
      "sourceRefs": [
        {
          "file": "src/lib/story/endings.ts",
          "line": 495,
          "node": "ending_dacheng_free"
        }
      ],
      "summary": "大乘之后，你仍选择留在人间。已作的治理和照护继续，亲友各有自己的去处。",
      "recap": [
        {
          "title": "家人与遗物",
          "text": "外婆残魂已解脱，凌玉琅碎丹锁敌后安葬。母亲锁芯余息耗尽，自己的空半锁仍留在身边。"
        }
      ]
    }
  }
};
if(typeof module==='object'&&module.exports)module.exports=data;else root.XiuxianCampaignSchemaV3=data;
})(typeof globalThis!=='undefined'?globalThis:this);
