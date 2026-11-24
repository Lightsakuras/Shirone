(function(root){
'use strict';
// M5 branches; finite declarative definitions. Implementation remains in campaign/state.
const patch={
  "tables": {
    "maps": {
      "apricot-village": {
        "name": "杏花村 · 春雨医庐",
        "sub": "采药、净煎、照护 · 杏村医案",
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
          },
          {
            "id": "apricotDepartureDesk",
            "name": "归凡与旧责交接案",
            "x": 840,
            "y": 590,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsE",
            "cell": 7,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "apricotHomesteadGate",
            "name": "往杏林医塾",
            "x": 1110,
            "y": 590,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
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
          },
          {
            "id": "retreatJourneyBoard",
            "name": "行旅与旧案登记案",
            "x": 525,
            "y": 565,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "chapterProps",
            "cell": 12,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "retreatCharityGate",
            "name": "下山赴青阳",
            "x": 855,
            "y": 650,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
          },
          {
            "id": "retreatIceInvestigation",
            "name": "赴冰原核验碎片",
            "x": 770,
            "y": 615,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
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
          },
          {
            "id": "innerRemnantWarning",
            "name": "尚未吞噬的秘境残魂",
            "x": 540,
            "y": 580,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "campaignProps",
            "cell": 0,
            "height": 56,
            "sinceRevision": 4
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
      "golden-summit": {
        "name": "金顶 · 议事庭",
        "sub": "七宗试剑、呈证与公开会审",
        "requires": {
          "all": [
            {
              "type": "realm",
              "id": "jindan"
            }
          ],
          "any": [
            {
              "type": "task",
              "id": "northbound-rescue",
              "status": "claimed"
            },
            {
              "type": "done",
              "task": "wander-return-trial",
              "id": "reunion-present-five-proofs"
            },
            {
              "type": "task",
              "id": "enlighten-compiled-case",
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
          },
          {
            "id": "wanderTrialDocket",
            "name": "散修五证公示案",
            "x": 470,
            "y": 610,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "chapterProps",
            "cell": 12,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "enlightenPublicBench",
            "name": "三证公开会审台",
            "x": 815,
            "y": 590,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsC",
            "cell": 6,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "summitVaultGate",
            "name": "入后山剑冢",
            "x": 185,
            "y": 620,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
          },
          {
            "id": "summitTreatyGate",
            "name": "赴两界渡口",
            "x": 1160,
            "y": 610,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
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
          },
          {
            "id": "heavenSwordRoad",
            "name": "回剑冢办理守山交托",
            "x": 420,
            "y": 590,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
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
      },
      "qingyang-charity": {
        "name": "青阳 · 济善堂前街",
        "sub": "行旅实事与抉择",
        "artKey": "qingyang-charity",
        "width": 1280,
        "height": 760,
        "entry": {
          "x": 640,
          "y": 650
        },
        "requires": {
          "all": [],
          "any": [
            {
              "type": "choice",
              "task": "journey-departure",
              "id": "wander"
            },
            {
              "type": "task",
              "id": "enlighten-entry",
              "status": "claimed"
            },
            {
              "type": "task",
              "id": "loop-path-choice",
              "status": "claimed"
            }
          ]
        },
        "layout": "缓存构图；须以最终原画校准碰撞与对象脚点",
        "walls": [
          {
            "x": 0,
            "y": 0,
            "w": 1280,
            "h": 220
          },
          {
            "x": 0,
            "y": 220,
            "w": 105,
            "h": 340
          },
          {
            "x": 105,
            "y": 265,
            "w": 80,
            "h": 105
          },
          {
            "x": 105,
            "y": 380,
            "w": 62,
            "h": 85
          },
          {
            "x": 90,
            "y": 470,
            "w": 50,
            "h": 72
          },
          {
            "x": 945,
            "y": 220,
            "w": 220,
            "h": 52
          },
          {
            "x": 1165,
            "y": 220,
            "w": 115,
            "h": 80
          },
          {
            "x": 0,
            "y": 680,
            "w": 495,
            "h": 80
          },
          {
            "x": 0,
            "y": 640,
            "w": 390,
            "h": 40
          },
          {
            "x": 795,
            "y": 700,
            "w": 485,
            "h": 60
          },
          {
            "x": 1090,
            "y": 660,
            "w": 190,
            "h": 40
          },
          {
            "x": 1245,
            "y": 300,
            "w": 35,
            "h": 360
          }
        ],
        "objects": [
          {
            "id": "charityReturn",
            "name": "回后山行旅案",
            "x": 640,
            "y": 680,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
          },
          {
            "id": "charityStockadeGate",
            "name": "赴黑风寨",
            "x": 1170,
            "y": 560,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
          },
          {
            "id": "charityBorderGate",
            "name": "往北境关隘",
            "x": 1170,
            "y": 420,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
          },
          {
            "id": "charityDoctor",
            "name": "苏老头 · 济善堂",
            "x": 510,
            "y": 270,
            "kind": "campaignObject",
            "role": "npc",
            "atlas": "m5PeopleA",
            "cell": 0,
            "height": 105,
            "sinceRevision": 4,
            "personId": "old-su"
          },
          {
            "id": "charityHongye",
            "name": "沈红叶 · 待护伤者",
            "x": 900,
            "y": 480,
            "kind": "campaignObject",
            "role": "npc",
            "atlas": "m5PeopleA",
            "cell": 1,
            "height": 105,
            "sinceRevision": 4,
            "personId": "shenhongye"
          },
          {
            "id": "charitySuye",
            "name": "苏叶 · 行医同道",
            "x": 1040,
            "y": 310,
            "kind": "campaignObject",
            "role": "npc",
            "atlas": "jindanPeopleA",
            "cell": 3,
            "height": 105,
            "sinceRevision": 4,
            "personId": "suye"
          },
          {
            "id": "charitySampleWest",
            "name": "教学药样 · 西圃",
            "x": 240,
            "y": 330,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsA",
            "cell": 0,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "charitySampleEast",
            "name": "教学药样 · 东篮",
            "x": 1050,
            "y": 450,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsA",
            "cell": 0,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "charityWater",
            "name": "净水量盘",
            "x": 320,
            "y": 470,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "campaignProps",
            "cell": 1,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "charityMedicineDesk",
            "name": "诊药石案",
            "x": 720,
            "y": 325,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "campaignProps",
            "cell": 4,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "charityLetters",
            "name": "乡民联名册",
            "x": 430,
            "y": 350,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsC",
            "cell": 6,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "charityTravelBook",
            "name": "十年行旅交接册",
            "x": 770,
            "y": 550,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsB",
            "cell": 0,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "charityForge",
            "name": "药具锻修台",
            "x": 220,
            "y": 540,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsD",
            "cell": 2,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "charityMemorial",
            "name": "归途告别亭",
            "x": 480,
            "y": 550,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "chapterProps",
            "cell": 12,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "charityNing",
            "name": "凝霜 · 狐簪残魂",
            "x": 850,
            "y": 385,
            "kind": "campaignObject",
            "role": "npc",
            "atlas": "m5PeopleA",
            "cell": 2,
            "height": 105,
            "sinceRevision": 4,
            "personId": "ning",
            "hidden": true
          },
          {
            "id": "charityZhousan",
            "name": "周三 · 青阳旧案见证人",
            "x": 920,
            "y": 590,
            "kind": "campaignObject",
            "role": "npc",
            "atlas": "m5PeopleB",
            "cell": 2,
            "height": 105,
            "sinceRevision": 4,
            "personId": "zhousan"
          },
          {
            "id": "charityArchiveGate",
            "name": "赴藏经案阁",
            "x": 1130,
            "y": 650,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
          },
          {
            "id": "charityMemoryReturn",
            "name": "回轮回大殿交托",
            "x": 940,
            "y": 600,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4,
            "visibleRequires": {
              "all": [
                {
                  "type": "task",
                  "id": "loop-path-choice",
                  "status": "claimed"
                },
                {
                  "type": "choice",
                  "task": "loop-path-choice",
                  "id": "road"
                }
              ],
              "any": []
            }
          }
        ],
        "sources": [
          {
            "file": "src/lib/story/branch_wander.ts",
            "line": 166,
            "node": "wander_arrive_qingyang"
          },
          {
            "file": "src/lib/story/branch_wander.ts",
            "line": 176,
            "node": "wander_jishantang_apprentice"
          }
        ],
        "artAudit": {
          "path": "assets/art-v170/qingyang-charity.webp",
          "status": "viewed-collision-adjusted-awaiting-runtime-walk"
        }
      },
      "blackwind-stockade": {
        "name": "黑风寨 · 囚棚与旧帐",
        "sub": "行旅实事与抉择",
        "artKey": "blackwind-stockade",
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
              "id": "wander-charity",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "layout": "缓存构图；须以最终原画校准碰撞与对象脚点",
        "walls": [
          {
            "x": 0,
            "y": 0,
            "w": 1280,
            "h": 120
          },
          {
            "x": 380,
            "y": 120,
            "w": 505,
            "h": 75
          },
          {
            "x": 95,
            "y": 150,
            "w": 205,
            "h": 125
          },
          {
            "x": 970,
            "y": 145,
            "w": 245,
            "h": 145
          },
          {
            "x": 0,
            "y": 120,
            "w": 60,
            "h": 510
          },
          {
            "x": 1220,
            "y": 120,
            "w": 60,
            "h": 510
          },
          {
            "x": 335,
            "y": 300,
            "w": 105,
            "h": 45
          },
          {
            "x": 395,
            "y": 265,
            "w": 100,
            "h": 42
          },
          {
            "x": 805,
            "y": 245,
            "w": 100,
            "h": 45
          },
          {
            "x": 880,
            "y": 280,
            "w": 110,
            "h": 55
          },
          {
            "x": 0,
            "y": 655,
            "w": 405,
            "h": 105
          },
          {
            "x": 875,
            "y": 660,
            "w": 405,
            "h": 100
          }
        ],
        "objects": [
          {
            "id": "stockadeReturn",
            "name": "退回青阳",
            "x": 640,
            "y": 680,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
          },
          {
            "id": "stockadeCaptive",
            "name": "受困商旅",
            "x": 300,
            "y": 350,
            "kind": "campaignObject",
            "role": "npc",
            "atlas": "campaignPeople",
            "cell": 5,
            "height": 105,
            "sinceRevision": 4,
            "personId": "stockade-captive"
          },
          {
            "id": "stockadePatrol",
            "name": "寨口警哨",
            "x": 690,
            "y": 250,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "sectProps",
            "cell": 0,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "stockadeLedger",
            "name": "寨库焦账",
            "x": 1070,
            "y": 350,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsA",
            "cell": 7,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "stockadeOrder",
            "name": "黑风令与签押",
            "x": 950,
            "y": 390,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsA",
            "cell": 4,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "stockadeCell",
            "name": "囚棚门锁",
            "x": 330,
            "y": 260,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "campaignProps",
            "cell": 7,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "stockadePrisonRoll",
            "name": "换岗令册",
            "x": 650,
            "y": 520,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsE",
            "cell": 7,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "stockadeMarshal",
            "name": "被押老帅",
            "x": 230,
            "y": 440,
            "kind": "campaignObject",
            "role": "npc",
            "atlas": "m5PeopleA",
            "cell": 3,
            "height": 105,
            "sinceRevision": 4,
            "personId": "old-marshal"
          }
        ],
        "sources": [
          {
            "file": "src/lib/story/branch_wander.ts",
            "line": 255,
            "node": "wander_heifeng_shan"
          },
          {
            "file": "src/lib/story/branch_wander.ts",
            "line": 267,
            "node": "wander_heifeng_after"
          }
        ],
        "artAudit": {
          "path": "assets/art-v170/blackwind-stockade.webp",
          "status": "viewed-collision-adjusted-awaiting-runtime-walk"
        }
      },
      "northern-border": {
        "name": "北境 · 关隘与陷阵营",
        "sub": "行旅实事与抉择",
        "artKey": "northern-border",
        "width": 1280,
        "height": 760,
        "entry": {
          "x": 640,
          "y": 650
        },
        "requires": {
          "all": [],
          "any": [
            {
              "type": "task",
              "id": "wander-black-order",
              "status": "claimed"
            },
            {
              "type": "done",
              "task": "loop-life-general",
              "id": "memory-door-open"
            },
            {
              "type": "task",
              "id": "loop-path-choice",
              "status": "claimed"
            }
          ]
        },
        "layout": "缓存构图；须以最终原画校准碰撞与对象脚点",
        "walls": [
          {
            "x": 0,
            "y": 0,
            "w": 550,
            "h": 195
          },
          {
            "x": 730,
            "y": 0,
            "w": 550,
            "h": 195
          },
          {
            "x": 90,
            "y": 130,
            "w": 105,
            "h": 95
          },
          {
            "x": 1070,
            "y": 130,
            "w": 100,
            "h": 100
          },
          {
            "x": 0,
            "y": 225,
            "w": 75,
            "h": 190
          },
          {
            "x": 1200,
            "y": 225,
            "w": 80,
            "h": 195
          },
          {
            "x": 0,
            "y": 445,
            "w": 245,
            "h": 155
          },
          {
            "x": 1110,
            "y": 345,
            "w": 170,
            "h": 150
          },
          {
            "x": 0,
            "y": 680,
            "w": 470,
            "h": 80
          },
          {
            "x": 815,
            "y": 680,
            "w": 465,
            "h": 80
          }
        ],
        "objects": [
          {
            "id": "borderReturn",
            "name": "回青阳整备",
            "x": 640,
            "y": 680,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
          },
          {
            "id": "borderIceGate",
            "name": "赴冰原古洞",
            "x": 1160,
            "y": 600,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
          },
          {
            "id": "borderCaptain",
            "name": "陷阵营哨长",
            "x": 390,
            "y": 560,
            "kind": "campaignObject",
            "role": "npc",
            "atlas": "m5PeopleB",
            "cell": 0,
            "height": 105,
            "sinceRevision": 4,
            "personId": "border-captain"
          },
          {
            "id": "borderOrders",
            "name": "关隘传令台",
            "x": 640,
            "y": 220,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m4PropsD",
            "cell": 6,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "borderMedical",
            "name": "伤员安置帐",
            "x": 1010,
            "y": 530,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m4PropsD",
            "cell": 7,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "borderGrain",
            "name": "防潮军粮棚",
            "x": 300,
            "y": 570,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "chapterProps",
            "cell": 12,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "borderWestPost",
            "name": "西翼烽台",
            "x": 240,
            "y": 290,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m4PropsB",
            "cell": 4,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "borderEastPost",
            "name": "东翼烽台",
            "x": 1040,
            "y": 290,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m4PropsB",
            "cell": 4,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "borderTestimony",
            "name": "老军证词案",
            "x": 560,
            "y": 500,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsC",
            "cell": 6,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "borderPrisonOrder",
            "name": "提审通关簿",
            "x": 940,
            "y": 420,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsA",
            "cell": 6,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "borderLastStand",
            "name": "最后守阵碑",
            "x": 650,
            "y": 340,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m4PropsD",
            "cell": 4,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "memoryGeneralOrders",
            "name": "回忆 · 十二道召令",
            "x": 540,
            "y": 230,
            "kind": "campaignObject",
            "role": "memory",
            "atlas": "m5PropsA",
            "cell": 5,
            "height": 56,
            "sinceRevision": 4,
            "memoryTask": "loop-life-general"
          },
          {
            "id": "memoryGeneralCamp",
            "name": "回忆 · 等候撤离的营地",
            "x": 900,
            "y": 520,
            "kind": "campaignObject",
            "role": "memory",
            "atlas": "m4PropsB",
            "cell": 7,
            "height": 56,
            "sinceRevision": 4,
            "memoryTask": "loop-life-general"
          },
          {
            "id": "memoryGeneralGate",
            "name": "回忆 · 边塞战阵",
            "x": 380,
            "y": 430,
            "kind": "campaignObject",
            "role": "memory",
            "atlas": "m4PropsB",
            "cell": 4,
            "height": 56,
            "sinceRevision": 4,
            "memoryTask": "loop-life-general"
          },
          {
            "id": "return-loop-life-general",
            "name": "回到轮回大殿",
            "x": 640,
            "y": 610,
            "kind": "campaignObject",
            "role": "memory",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4,
            "memoryTask": "loop-life-general"
          },
          {
            "id": "borderPeaceRoad",
            "name": "沿传承道路赴两界渡口",
            "x": 1010,
            "y": 620,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4,
            "visibleRequires": {
              "all": [
                {
                  "type": "task",
                  "id": "loop-path-choice",
                  "status": "claimed"
                },
                {
                  "type": "choice",
                  "task": "loop-path-choice",
                  "id": "road"
                }
              ],
              "any": []
            }
          }
        ],
        "sources": [
          {
            "file": "src/lib/story/branch_wander.ts",
            "line": 105,
            "node": "wander_military"
          },
          {
            "file": "src/lib/story/branch_wander.ts",
            "line": 291,
            "node": "wander_join_army"
          },
          {
            "file": "src/lib/story/branch_wander.ts",
            "line": 301,
            "node": "wander_laoshuai"
          }
        ],
        "artAudit": {
          "path": "assets/art-v170/northern-border.webp",
          "status": "viewed-collision-adjusted-awaiting-runtime-walk"
        }
      },
      "icefield-cavern": {
        "name": "冰原 · 古洞与矿道",
        "sub": "行旅实事与抉择",
        "artKey": "icefield-cavern",
        "width": 1280,
        "height": 760,
        "entry": {
          "x": 640,
          "y": 650
        },
        "requires": {
          "all": [],
          "any": [
            {
              "type": "task",
              "id": "wander-border-service",
              "status": "claimed"
            },
            {
              "type": "task",
              "id": "enlighten-entry",
              "status": "claimed"
            },
            {
              "type": "task",
              "id": "demon-coup",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "wander-road-choice",
              "id": "loop"
            },
            {
              "type": "choice",
              "task": "demon-future-choice",
              "id": "guardian"
            },
            {
              "type": "task",
              "id": "dacheng-preparation",
              "status": "claimed"
            }
          ]
        },
        "layout": "缓存构图；须以最终原画校准碰撞与对象脚点",
        "walls": [
          {
            "x": 0,
            "y": 0,
            "w": 420,
            "h": 120
          },
          {
            "x": 900,
            "y": 0,
            "w": 380,
            "h": 110
          },
          {
            "x": 0,
            "y": 120,
            "w": 100,
            "h": 95
          },
          {
            "x": 1180,
            "y": 110,
            "w": 100,
            "h": 110
          },
          {
            "x": 140,
            "y": 275,
            "w": 210,
            "h": 105
          },
          {
            "x": 245,
            "y": 315,
            "w": 225,
            "h": 110
          },
          {
            "x": 350,
            "y": 285,
            "w": 155,
            "h": 60
          },
          {
            "x": 770,
            "y": 285,
            "w": 270,
            "h": 120
          },
          {
            "x": 835,
            "y": 315,
            "w": 245,
            "h": 110
          },
          {
            "x": 1040,
            "y": 285,
            "w": 65,
            "h": 75
          },
          {
            "x": 0,
            "y": 650,
            "w": 240,
            "h": 110
          },
          {
            "x": 1120,
            "y": 600,
            "w": 160,
            "h": 160
          }
        ],
        "objects": [
          {
            "id": "iceReturn",
            "name": "退回北境营地",
            "x": 640,
            "y": 680,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
          },
          {
            "id": "iceMiner",
            "name": "阿石 · 矿道见证人",
            "x": 270,
            "y": 230,
            "kind": "campaignObject",
            "role": "npc",
            "atlas": "m5PeopleB",
            "cell": 1,
            "height": 105,
            "sinceRevision": 4,
            "personId": "ashi"
          },
          {
            "id": "iceSampleSouth",
            "name": "南裂冰碎片",
            "x": 390,
            "y": 540,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsB",
            "cell": 1,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "iceSampleEast",
            "name": "东矿脉碎片",
            "x": 900,
            "y": 490,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsB",
            "cell": 1,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "iceSampleNorth",
            "name": "北冰台碎片",
            "x": 700,
            "y": 250,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsB",
            "cell": 1,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "iceFire",
            "name": "洞边护温火盆",
            "x": 430,
            "y": 220,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "campaignProps",
            "cell": 3,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "iceTablet",
            "name": "古洞印纹",
            "x": 650,
            "y": 200,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m4PropsD",
            "cell": 0,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "icePatient",
            "name": "雪崩伤者担架",
            "x": 1060,
            "y": 510,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m4PropsB",
            "cell": 7,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "iceShelter",
            "name": "北岸小屋材料处",
            "x": 910,
            "y": 570,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "chapterProps",
            "cell": 12,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "iceGateSeal",
            "name": "封冻窟口",
            "x": 1090,
            "y": 210,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "chapterProps",
            "cell": 12,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "iceMemoryGate",
            "name": "循已核碎片进入白光",
            "x": 660,
            "y": 610,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
          },
          {
            "id": "iceMemoryRecord",
            "name": "碎片与狐簪核验案",
            "x": 590,
            "y": 200,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsB",
            "cell": 1,
            "height": 56,
            "sinceRevision": 4
          }
        ],
        "sources": [
          {
            "file": "src/lib/story/branch_wander.ts",
            "line": 118,
            "node": "wander_icefield"
          },
          {
            "file": "src/lib/story/branch_wander.ts",
            "line": 338,
            "node": "wander_ice_cave"
          }
        ],
        "artAudit": {
          "path": "assets/art-v170/icefield-cavern.webp",
          "status": "viewed-collision-adjusted-awaiting-runtime-walk"
        }
      },
      "demon-blood-cavern": {
        "name": "万魔窟 · 护脉与泄压",
        "sub": "行旅实事与抉择",
        "artKey": "demon-blood-cavern",
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
              "id": "demon-entry",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "layout": "按实际原画校准墙脚、沟水与栏沿；台阶开口保留。",
        "walls": [
          {
            "x": 0,
            "y": 0,
            "w": 1280,
            "h": 40
          },
          {
            "x": 0,
            "y": 40,
            "w": 20,
            "h": 720
          },
          {
            "x": 1260,
            "y": 40,
            "w": 20,
            "h": 720
          },
          {
            "x": 0,
            "y": 740,
            "w": 1280,
            "h": 20
          },
          {
            "x": 0,
            "y": 0,
            "w": 1280,
            "h": 175
          },
          {
            "x": 325,
            "y": 205,
            "w": 630,
            "h": 65
          },
          {
            "x": 355,
            "y": 180,
            "w": 570,
            "h": 35
          },
          {
            "x": 355,
            "y": 270,
            "w": 575,
            "h": 35
          },
          {
            "x": 410,
            "y": 305,
            "w": 470,
            "h": 25
          },
          {
            "x": 0,
            "y": 175,
            "w": 160,
            "h": 190
          },
          {
            "x": 0,
            "y": 365,
            "w": 140,
            "h": 140
          },
          {
            "x": 0,
            "y": 505,
            "w": 80,
            "h": 90
          },
          {
            "x": 1140,
            "y": 175,
            "w": 140,
            "h": 145
          },
          {
            "x": 1220,
            "y": 320,
            "w": 60,
            "h": 250
          },
          {
            "x": 0,
            "y": 690,
            "w": 470,
            "h": 70
          },
          {
            "x": 800,
            "y": 690,
            "w": 480,
            "h": 70
          }
        ],
        "objects": [
          {
            "id": "demonCaveReturn",
            "name": "退回行旅案",
            "x": 640,
            "y": 680,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
          },
          {
            "id": "demonCaveMarket",
            "name": "赴十二部集市",
            "x": 1140,
            "y": 600,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
          },
          {
            "id": "demonOldMaster",
            "name": "窟中老魔头",
            "x": 270,
            "y": 285,
            "kind": "campaignObject",
            "role": "npc",
            "atlas": "m5PeopleC",
            "cell": 3,
            "height": 105,
            "sinceRevision": 4,
            "personId": "old-demon"
          },
          {
            "id": "demonAjiu",
            "name": "阿九 · 青年同修",
            "x": 1020,
            "y": 530,
            "kind": "campaignObject",
            "role": "npc",
            "atlas": "m5PeopleD",
            "cell": 0,
            "height": 105,
            "sinceRevision": 4,
            "personId": "ajiu"
          },
          {
            "id": "demonBloodAltar",
            "name": "血脉试炼石坛",
            "x": 640,
            "y": 375,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m4PropsD",
            "cell": 5,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "demonPressureValve",
            "name": "西侧泄压阵钉",
            "x": 300,
            "y": 380,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "jindanPropsA",
            "cell": 0,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "demonColdForge",
            "name": "寒铁护脉台",
            "x": 1000,
            "y": 370,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsB",
            "cell": 2,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "demonTrialBook",
            "name": "试炼核验册",
            "x": 630,
            "y": 560,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsE",
            "cell": 7,
            "height": 56,
            "sinceRevision": 4
          }
        ],
        "sources": [
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 249,
            "node": "demon_blood_day_1"
          },
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 277,
            "node": "demon_blood_month_1"
          },
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 291,
            "node": "demon_cave_year"
          }
        ],
        "artAudit": {
          "path": "assets/art-v170/demon-blood-cavern.webp",
          "status": "visually-calibrated-awaiting-runtime-and-bfs",
          "date": "2026-11-13"
        }
      },
      "demon-tribes": {
        "name": "十二部 · 粮、铁与义塾",
        "sub": "行旅实事与抉择",
        "artKey": "demon-tribes",
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
              "id": "demon-yuanying-trial",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "layout": "按实际原画校准墙脚、沟水与栏沿；台阶开口保留。",
        "walls": [
          {
            "x": 0,
            "y": 0,
            "w": 1280,
            "h": 40
          },
          {
            "x": 0,
            "y": 40,
            "w": 20,
            "h": 720
          },
          {
            "x": 1260,
            "y": 40,
            "w": 20,
            "h": 720
          },
          {
            "x": 0,
            "y": 740,
            "w": 1280,
            "h": 20
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
            "w": 400,
            "h": 90
          },
          {
            "x": 490,
            "y": 115,
            "w": 330,
            "h": 65
          },
          {
            "x": 895,
            "y": 115,
            "w": 385,
            "h": 125
          },
          {
            "x": 0,
            "y": 270,
            "w": 290,
            "h": 200
          },
          {
            "x": 0,
            "y": 470,
            "w": 240,
            "h": 80
          },
          {
            "x": 1000,
            "y": 300,
            "w": 280,
            "h": 150
          },
          {
            "x": 0,
            "y": 680,
            "w": 470,
            "h": 80
          },
          {
            "x": 815,
            "y": 680,
            "w": 465,
            "h": 80
          }
        ],
        "objects": [
          {
            "id": "tribesCave",
            "name": "回万魔窟",
            "x": 640,
            "y": 680,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
          },
          {
            "id": "tribesPalace",
            "name": "赴魔宫议庭",
            "x": 1160,
            "y": 590,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
          },
          {
            "id": "tribesWitch",
            "name": "巫姑 · 医与蛊",
            "x": 660,
            "y": 235,
            "kind": "campaignObject",
            "role": "npc",
            "atlas": "m5PeopleC",
            "cell": 0,
            "height": 105,
            "sinceRevision": 4,
            "personId": "witch"
          },
          {
            "id": "tribesSmith",
            "name": "老铁头",
            "x": 1010,
            "y": 280,
            "kind": "campaignObject",
            "role": "npc",
            "atlas": "m5PeopleC",
            "cell": 1,
            "height": 105,
            "sinceRevision": 4,
            "personId": "old-smith"
          },
          {
            "id": "tribesHerder",
            "name": "乌云琪琪格",
            "x": 1040,
            "y": 540,
            "kind": "campaignObject",
            "role": "npc",
            "atlas": "m5PeopleC",
            "cell": 2,
            "height": 105,
            "sinceRevision": 4,
            "personId": "qiqige"
          },
          {
            "id": "tribesLingshuang",
            "name": "凌霜 · 待安置的孩子",
            "x": 285,
            "y": 565,
            "kind": "campaignObject",
            "role": "npc",
            "atlas": "m5PeopleD",
            "cell": 1,
            "height": 105,
            "sinceRevision": 4,
            "personId": "lingshuang"
          },
          {
            "id": "tribesGrain",
            "name": "农部粮仓",
            "x": 250,
            "y": 250,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsB",
            "cell": 4,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "tribesChannel",
            "name": "修渠料堆",
            "x": 350,
            "y": 430,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsB",
            "cell": 5,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "tribesSchool",
            "name": "义塾学具",
            "x": 430,
            "y": 550,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsB",
            "cell": 6,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "tribesAccount",
            "name": "五部共用粮册",
            "x": 650,
            "y": 420,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsE",
            "cell": 7,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "tribesRebelPost",
            "name": "血月部交涉营",
            "x": 900,
            "y": 280,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "chapterProps",
            "cell": 12,
            "height": 56,
            "sinceRevision": 4
          }
        ],
        "sources": [
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 309,
            "node": "demon_12_tribes_farmer"
          },
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 322,
            "node": "demon_12_tribes_witch"
          },
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 338,
            "node": "demon_12_tribes_orphans"
          }
        ],
        "artAudit": {
          "path": "assets/art-v170/demon-tribes.webp",
          "status": "visually-calibrated-awaiting-runtime-and-bfs",
          "date": "2026-11-13"
        }
      },
      "demon-palace": {
        "name": "魔宫 · 议庭与遗物",
        "sub": "行旅实事与抉择",
        "artKey": "demon-palace",
        "width": 1280,
        "height": 760,
        "entry": {
          "x": 640,
          "y": 650
        },
        "requires": {
          "all": [],
          "any": [
            {
              "type": "task",
              "id": "demon-huashen-trial",
              "status": "claimed"
            },
            {
              "type": "done",
              "task": "loop-life-ruler",
              "id": "memory-door-open"
            }
          ]
        },
        "layout": "按实际原画校准墙脚、沟水与栏沿；台阶开口保留。",
        "walls": [
          {
            "x": 0,
            "y": 0,
            "w": 1280,
            "h": 40
          },
          {
            "x": 0,
            "y": 40,
            "w": 20,
            "h": 720
          },
          {
            "x": 1260,
            "y": 40,
            "w": 20,
            "h": 720
          },
          {
            "x": 0,
            "y": 740,
            "w": 1280,
            "h": 20
          },
          {
            "x": 0,
            "y": 0,
            "w": 1280,
            "h": 180
          },
          {
            "x": 0,
            "y": 180,
            "w": 165,
            "h": 130
          },
          {
            "x": 0,
            "y": 310,
            "w": 110,
            "h": 150
          },
          {
            "x": 1115,
            "y": 180,
            "w": 165,
            "h": 130
          },
          {
            "x": 1170,
            "y": 310,
            "w": 110,
            "h": 150
          },
          {
            "x": 0,
            "y": 670,
            "w": 400,
            "h": 90
          },
          {
            "x": 890,
            "y": 670,
            "w": 390,
            "h": 90
          }
        ],
        "objects": [
          {
            "id": "palaceTribes",
            "name": "回十二部集市",
            "x": 640,
            "y": 680,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
          },
          {
            "id": "palaceCrossing",
            "name": "赴两界渡口",
            "x": 1160,
            "y": 600,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
          },
          {
            "id": "palaceUncle",
            "name": "凌玉琅",
            "x": 640,
            "y": 230,
            "kind": "campaignObject",
            "role": "npc",
            "atlas": "jindanPeopleA",
            "cell": 2,
            "height": 105,
            "sinceRevision": 4,
            "personId": "lingyulang"
          },
          {
            "id": "palaceLingyun",
            "name": "凌云子 · 来使",
            "x": 250,
            "y": 550,
            "kind": "campaignObject",
            "role": "npc",
            "atlas": "campaignPeople",
            "cell": 1,
            "height": 105,
            "sinceRevision": 4,
            "personId": "lingyun"
          },
          {
            "id": "palaceWarTable",
            "name": "魔军调度案",
            "x": 1010,
            "y": 330,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m4PropsD",
            "cell": 6,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "palacePrisoners",
            "name": "俘虏登记处",
            "x": 270,
            "y": 330,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsE",
            "cell": 4,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "palaceLegacy",
            "name": "生母旧匣",
            "x": 990,
            "y": 255,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsC",
            "cell": 4,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "palaceEdict",
            "name": "新令公示处",
            "x": 640,
            "y": 420,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsB",
            "cell": 7,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "palaceThrone",
            "name": "魔尊冠与半印",
            "x": 640,
            "y": 290,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsC",
            "cell": 0,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "palaceSiegeGate",
            "name": "金顶军报案",
            "x": 1070,
            "y": 520,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "chapterProps",
            "cell": 12,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "palaceMemorial",
            "name": "舅舅衣冠处",
            "x": 350,
            "y": 255,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m4PropsD",
            "cell": 4,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "memoryRulerEdict",
            "name": "回忆 · 不伤凡人的政令",
            "x": 500,
            "y": 300,
            "kind": "campaignObject",
            "role": "memory",
            "atlas": "m5PropsE",
            "cell": 7,
            "height": 56,
            "sinceRevision": 4,
            "memoryTask": "loop-life-ruler"
          },
          {
            "id": "memoryRulerTrade",
            "name": "回忆 · 仙魔通商契",
            "x": 1000,
            "y": 500,
            "kind": "campaignObject",
            "role": "memory",
            "atlas": "m4PropsB",
            "cell": 3,
            "height": 56,
            "sinceRevision": 4,
            "memoryTask": "loop-life-ruler"
          },
          {
            "id": "memoryRulerDefense",
            "name": "回忆 · 最后的护民阵",
            "x": 760,
            "y": 500,
            "kind": "campaignObject",
            "role": "memory",
            "atlas": "m4PropsD",
            "cell": 5,
            "height": 56,
            "sinceRevision": 4,
            "memoryTask": "loop-life-ruler"
          },
          {
            "id": "return-loop-life-ruler",
            "name": "回到轮回大殿",
            "x": 640,
            "y": 610,
            "kind": "campaignObject",
            "role": "memory",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4,
            "memoryTask": "loop-life-ruler"
          }
        ],
        "sources": [
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 169,
            "node": "demon_coup"
          },
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 563,
            "node": "demon_enthrone"
          },
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 918,
            "node": "female_demon_mother_legacy"
          }
        ],
        "artAudit": {
          "path": "assets/art-v170/demon-palace.webp",
          "status": "visually-calibrated-awaiting-runtime-and-bfs",
          "date": "2026-11-13"
        }
      },
      "two-realms-crossing": {
        "name": "两界 · 桥与商约",
        "sub": "行旅实事与抉择",
        "artKey": "two-realms-crossing",
        "width": 1280,
        "height": 760,
        "entry": {
          "x": 640,
          "y": 650
        },
        "requires": {
          "all": [],
          "any": [
            {
              "type": "task",
              "id": "demon-coup",
              "status": "claimed"
            },
            {
              "type": "task",
              "id": "enlighten-master-trial",
              "status": "claimed"
            },
            {
              "type": "task",
              "id": "loop-path-choice",
              "status": "claimed"
            }
          ]
        },
        "layout": "按实际原画校准墙脚、沟水与栏沿；台阶开口保留。",
        "walls": [
          {
            "x": 0,
            "y": 0,
            "w": 1280,
            "h": 40
          },
          {
            "x": 0,
            "y": 40,
            "w": 20,
            "h": 720
          },
          {
            "x": 1260,
            "y": 40,
            "w": 20,
            "h": 720
          },
          {
            "x": 0,
            "y": 740,
            "w": 1280,
            "h": 20
          },
          {
            "x": 0,
            "y": 0,
            "w": 1280,
            "h": 120
          },
          {
            "x": 0,
            "y": 120,
            "w": 580,
            "h": 55
          },
          {
            "x": 875,
            "y": 120,
            "w": 235,
            "h": 90
          },
          {
            "x": 0,
            "y": 270,
            "w": 590,
            "h": 70
          },
          {
            "x": 0,
            "y": 340,
            "w": 620,
            "h": 70
          },
          {
            "x": 0,
            "y": 410,
            "w": 635,
            "h": 60
          },
          {
            "x": 770,
            "y": 280,
            "w": 510,
            "h": 65
          },
          {
            "x": 805,
            "y": 345,
            "w": 475,
            "h": 65
          },
          {
            "x": 840,
            "y": 410,
            "w": 440,
            "h": 60
          },
          {
            "x": 0,
            "y": 470,
            "w": 305,
            "h": 220
          },
          {
            "x": 0,
            "y": 690,
            "w": 170,
            "h": 70
          }
        ],
        "objects": [
          {
            "id": "crossingPalace",
            "name": "回魔宫议庭",
            "x": 640,
            "y": 680,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
          },
          {
            "id": "crossingIce",
            "name": "沿北岸去冰原",
            "x": 1160,
            "y": 590,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
          },
          {
            "id": "crossingClerk",
            "name": "两界公证执事",
            "x": 850,
            "y": 185,
            "kind": "campaignObject",
            "role": "npc",
            "atlas": "m4PeopleB",
            "cell": 3,
            "height": 105,
            "sinceRevision": 4,
            "personId": "crossing-clerk"
          },
          {
            "id": "crossingTradeSeal",
            "name": "通商秤与封签",
            "x": 380,
            "y": 580,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m4PropsB",
            "cell": 3,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "crossingVictims",
            "name": "受难者与赔偿册",
            "x": 970,
            "y": 560,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsE",
            "cell": 4,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "crossingBridgeSouth",
            "name": "南桥修缮台",
            "x": 750,
            "y": 500,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsB",
            "cell": 5,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "crossingBridgeNorth",
            "name": "北桥护持台",
            "x": 680,
            "y": 240,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m4PropsD",
            "cell": 5,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "crossingTreaty",
            "name": "两界公约亭",
            "x": 970,
            "y": 245,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsC",
            "cell": 6,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "crossingSchool",
            "name": "边民学堂物资处",
            "x": 260,
            "y": 220,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsB",
            "cell": 6,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "crossingMemoryReturn",
            "name": "回轮回大殿",
            "x": 950,
            "y": 620,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4,
            "visibleRequires": {
              "all": [
                {
                  "type": "task",
                  "id": "loop-path-choice",
                  "status": "claimed"
                },
                {
                  "type": "choice",
                  "task": "loop-path-choice",
                  "id": "road"
                }
              ],
              "any": []
            }
          }
        ],
        "sources": [
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 594,
            "node": "demon_peace_treaty_2"
          },
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 447,
            "node": "enlighten_treaty_year_5"
          }
        ],
        "artAudit": {
          "path": "assets/art-v170/two-realms-crossing.webp",
          "status": "visually-calibrated-awaiting-runtime-and-bfs",
          "date": "2026-11-13"
        }
      },
      "archive-hearing": {
        "name": "藏经案阁 · 名册与销账",
        "sub": "行旅实事与抉择",
        "artKey": "archive-hearing",
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
              "id": "enlighten-entry",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "layout": "按实际原画校准墙脚、沟水与栏沿；台阶开口保留。",
        "walls": [
          {
            "x": 0,
            "y": 0,
            "w": 1280,
            "h": 40
          },
          {
            "x": 0,
            "y": 40,
            "w": 20,
            "h": 720
          },
          {
            "x": 1260,
            "y": 40,
            "w": 20,
            "h": 720
          },
          {
            "x": 0,
            "y": 740,
            "w": 1280,
            "h": 20
          },
          {
            "x": 0,
            "y": 0,
            "w": 1280,
            "h": 200
          },
          {
            "x": 0,
            "y": 200,
            "w": 145,
            "h": 120
          },
          {
            "x": 0,
            "y": 320,
            "w": 85,
            "h": 150
          },
          {
            "x": 0,
            "y": 470,
            "w": 40,
            "h": 130
          },
          {
            "x": 1135,
            "y": 200,
            "w": 145,
            "h": 120
          },
          {
            "x": 1195,
            "y": 320,
            "w": 85,
            "h": 150
          },
          {
            "x": 1240,
            "y": 470,
            "w": 40,
            "h": 130
          },
          {
            "x": 0,
            "y": 615,
            "w": 475,
            "h": 145
          },
          {
            "x": 815,
            "y": 615,
            "w": 465,
            "h": 145
          },
          {
            "x": 380,
            "y": 280,
            "w": 20,
            "h": 130
          },
          {
            "x": 400,
            "y": 275,
            "w": 480,
            "h": 12
          },
          {
            "x": 880,
            "y": 280,
            "w": 20,
            "h": 130
          },
          {
            "x": 380,
            "y": 422,
            "w": 110,
            "h": 12
          },
          {
            "x": 780,
            "y": 422,
            "w": 120,
            "h": 12
          }
        ],
        "objects": [
          {
            "id": "archiveReturn",
            "name": "回青阳济善堂",
            "x": 640,
            "y": 680,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
          },
          {
            "id": "archiveSummitGate",
            "name": "赴金顶公开呈案",
            "x": 1125,
            "y": 560,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
          },
          {
            "id": "archiveChenmo",
            "name": "陈默 · 藏经阁书吏",
            "x": 650,
            "y": 230,
            "kind": "campaignObject",
            "role": "npc",
            "atlas": "m5PeopleB",
            "cell": 3,
            "height": 105,
            "sinceRevision": 4,
            "personId": "chenmo"
          },
          {
            "id": "archiveOldAccount",
            "name": "旧矿账架",
            "x": 230,
            "y": 240,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsC",
            "cell": 6,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "archiveErasedRoll",
            "name": "删名与销账案",
            "x": 1040,
            "y": 240,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsA",
            "cell": 7,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "archiveComparison",
            "name": "三证对勘案",
            "x": 640,
            "y": 350,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsC",
            "cell": 6,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "archiveFoxLamp",
            "name": "经同意使用的狐火护灯",
            "x": 970,
            "y": 500,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsC",
            "cell": 5,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "archiveWitnessRest",
            "name": "证人安全等候处",
            "x": 300,
            "y": 530,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "campaignProps",
            "cell": 5,
            "height": 56,
            "sinceRevision": 4
          }
        ],
        "sources": [
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 282,
            "node": "enlighten_old_chen_book"
          },
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 682,
            "node": "enlighten_chen_mo_books"
          },
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 705,
            "node": "enlighten_evidence_night"
          }
        ],
        "artAudit": {
          "path": "assets/art-v170/archive-hearing.webp",
          "status": "visually-calibrated-awaiting-runtime-and-bfs",
          "date": "2026-11-13"
        }
      },
      "sword-vault": {
        "name": "后山剑冢 · 守阵与封剑",
        "sub": "行旅实事与抉择",
        "artKey": "sword-vault",
        "width": 1280,
        "height": 760,
        "entry": {
          "x": 640,
          "y": 650
        },
        "requires": {
          "all": [],
          "any": [
            {
              "type": "task",
              "id": "enlighten-compiled-case",
              "status": "claimed"
            },
            {
              "type": "task",
              "id": "dacheng-breakthrough",
              "status": "claimed"
            }
          ]
        },
        "layout": "按实际原画校准墙脚、沟水与栏沿；台阶开口保留。",
        "walls": [
          {
            "x": 0,
            "y": 0,
            "w": 1280,
            "h": 40
          },
          {
            "x": 0,
            "y": 40,
            "w": 20,
            "h": 720
          },
          {
            "x": 1260,
            "y": 40,
            "w": 20,
            "h": 720
          },
          {
            "x": 0,
            "y": 740,
            "w": 1280,
            "h": 20
          },
          {
            "x": 0,
            "y": 0,
            "w": 1280,
            "h": 135
          },
          {
            "x": 775,
            "y": 135,
            "w": 285,
            "h": 65
          },
          {
            "x": 0,
            "y": 155,
            "w": 250,
            "h": 105
          },
          {
            "x": 0,
            "y": 260,
            "w": 200,
            "h": 105
          },
          {
            "x": 0,
            "y": 365,
            "w": 135,
            "h": 55
          },
          {
            "x": 1130,
            "y": 190,
            "w": 150,
            "h": 160
          },
          {
            "x": 1080,
            "y": 390,
            "w": 200,
            "h": 155
          },
          {
            "x": 975,
            "y": 545,
            "w": 305,
            "h": 75
          },
          {
            "x": 0,
            "y": 675,
            "w": 460,
            "h": 85
          },
          {
            "x": 820,
            "y": 675,
            "w": 460,
            "h": 85
          },
          {
            "x": 500,
            "y": 285,
            "w": 245,
            "h": 12
          },
          {
            "x": 450,
            "y": 310,
            "w": 15,
            "h": 65
          },
          {
            "x": 790,
            "y": 310,
            "w": 15,
            "h": 65
          },
          {
            "x": 500,
            "y": 410,
            "w": 70,
            "h": 12
          },
          {
            "x": 700,
            "y": 410,
            "w": 70,
            "h": 12
          }
        ],
        "objects": [
          {
            "id": "vaultReturn",
            "name": "返回金顶",
            "x": 640,
            "y": 680,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
          },
          {
            "id": "vaultGuardArray",
            "name": "守山剑阵",
            "x": 280,
            "y": 330,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m4PropsC",
            "cell": 2,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "vaultClosedGate",
            "name": "自封界门",
            "x": 990,
            "y": 240,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "chapterProps",
            "cell": 12,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "vaultUnfinishedCase",
            "name": "尚未问清的案卷",
            "x": 1000,
            "y": 530,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsC",
            "cell": 6,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "vaultMemorial",
            "name": "剑冢旧碑",
            "x": 640,
            "y": 340,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m4PropsD",
            "cell": 4,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "vaultLesson",
            "name": "后来弟子的护山札",
            "x": 350,
            "y": 540,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsE",
            "cell": 7,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "vaultOath",
            "name": "剑道与护持誓案",
            "x": 640,
            "y": 230,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsD",
            "cell": 7,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "vaultShen",
            "name": "沈灵薇 · 剑坪交托",
            "x": 840,
            "y": 455,
            "kind": "campaignObject",
            "role": "npc",
            "atlas": "characters",
            "cell": 8,
            "height": 105,
            "sinceRevision": 4,
            "personId": "shen"
          },
          {
            "id": "vaultMandate",
            "name": "掌门印信交接案",
            "x": 490,
            "y": 525,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsD",
            "cell": 7,
            "height": 56,
            "sinceRevision": 4
          }
        ],
        "sources": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 391,
            "node": "ending_enlighten_sword_seal"
          },
          {
            "file": "src/lib/story/endings.ts",
            "line": 369,
            "node": "ending_jindan_sword_sage"
          },
          {
            "file": "src/lib/story/volume4.ts",
            "line": 392,
            "node": "female_sword_solitary_path"
          }
        ],
        "artAudit": {
          "path": "assets/art-v170/sword-vault.webp",
          "status": "visually-calibrated-awaiting-runtime-and-bfs",
          "date": "2026-11-13"
        }
      },
      "apricot-homestead": {
        "name": "杏林 · 医馆与课室",
        "sub": "行旅实事与抉择",
        "artKey": "apricot-homestead",
        "width": 1280,
        "height": 760,
        "entry": {
          "x": 640,
          "y": 650
        },
        "requires": {
          "all": [],
          "any": [
            {
              "type": "task",
              "id": "mortal-renunciation",
              "status": "claimed"
            },
            {
              "type": "done",
              "task": "loop-life-healer",
              "id": "memory-door-open"
            }
          ]
        },
        "layout": "按实际原画校准墙脚、沟水与栏沿；台阶开口保留。",
        "walls": [
          {
            "x": 0,
            "y": 0,
            "w": 1280,
            "h": 40
          },
          {
            "x": 0,
            "y": 40,
            "w": 20,
            "h": 720
          },
          {
            "x": 1260,
            "y": 40,
            "w": 20,
            "h": 720
          },
          {
            "x": 0,
            "y": 740,
            "w": 1280,
            "h": 20
          },
          {
            "x": 0,
            "y": 0,
            "w": 1280,
            "h": 155
          },
          {
            "x": 0,
            "y": 155,
            "w": 660,
            "h": 65
          },
          {
            "x": 860,
            "y": 155,
            "w": 420,
            "h": 95
          },
          {
            "x": 190,
            "y": 220,
            "w": 55,
            "h": 85
          },
          {
            "x": 0,
            "y": 330,
            "w": 150,
            "h": 205
          },
          {
            "x": 1095,
            "y": 315,
            "w": 185,
            "h": 205
          },
          {
            "x": 0,
            "y": 640,
            "w": 535,
            "h": 120
          },
          {
            "x": 715,
            "y": 640,
            "w": 565,
            "h": 120
          }
        ],
        "objects": [
          {
            "id": "homesteadVillage",
            "name": "回杏花村医庐",
            "x": 640,
            "y": 680,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
          },
          {
            "id": "homesteadRiver",
            "name": "赴杏河堤岸",
            "x": 1060,
            "y": 585,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
          },
          {
            "id": "homesteadAxing",
            "name": "阿杏 · 独立医者",
            "x": 800,
            "y": 250,
            "kind": "campaignObject",
            "role": "npc",
            "atlas": "m5PeopleE",
            "cell": 0,
            "height": 105,
            "sinceRevision": 4,
            "personId": "axing"
          },
          {
            "id": "homesteadGrandma",
            "name": "王婆婆",
            "x": 310,
            "y": 310,
            "kind": "campaignObject",
            "role": "npc",
            "atlas": "m5PeopleD",
            "cell": 3,
            "height": 105,
            "sinceRevision": 4,
            "personId": "apricot-grandma"
          },
          {
            "id": "homesteadClinic",
            "name": "医室诊药案",
            "x": 480,
            "y": 250,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "campaignProps",
            "cell": 4,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "homesteadClass",
            "name": "识字辨药课桌",
            "x": 1000,
            "y": 290,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsB",
            "cell": 6,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "homesteadGarden",
            "name": "药圃领种处",
            "x": 200,
            "y": 370,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsB",
            "cell": 4,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "homesteadKitchen",
            "name": "厨房与普通饭食",
            "x": 1060,
            "y": 500,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsE",
            "cell": 6,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "homesteadWork",
            "name": "修屋与木工案",
            "x": 400,
            "y": 540,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsB",
            "cell": 5,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "homesteadCare",
            "name": "保暖与自愿照护匣",
            "x": 760,
            "y": 540,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m4PropsD",
            "cell": 7,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "homesteadLegacy",
            "name": "医案与课程传承柜",
            "x": 640,
            "y": 360,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsD",
            "cell": 5,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "homesteadMemorial",
            "name": "杏树旁独立追念碑",
            "x": 260,
            "y": 555,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m4PropsD",
            "cell": 4,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "homesteadFlute",
            "name": "修笛石案",
            "x": 1010,
            "y": 390,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsC",
            "cell": 7,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "memoryHealerDesk",
            "name": "回忆 · 陈守心的药案",
            "x": 470,
            "y": 310,
            "kind": "campaignObject",
            "role": "memory",
            "atlas": "campaignProps",
            "cell": 4,
            "height": 56,
            "sinceRevision": 4,
            "memoryTask": "loop-life-healer"
          },
          {
            "id": "memoryHealerPatient",
            "name": "回忆 · 山中伤者的病案",
            "x": 790,
            "y": 450,
            "kind": "campaignObject",
            "role": "memory",
            "atlas": "m5PropsD",
            "cell": 5,
            "height": 56,
            "sinceRevision": 4,
            "memoryTask": "loop-life-healer"
          },
          {
            "id": "memoryHealerVillage",
            "name": "回忆 · 无钱求诊者的病案",
            "x": 1000,
            "y": 570,
            "kind": "campaignObject",
            "role": "memory",
            "atlas": "m5PropsD",
            "cell": 5,
            "height": 56,
            "sinceRevision": 4,
            "memoryTask": "loop-life-healer"
          },
          {
            "id": "return-loop-life-healer",
            "name": "回到轮回大殿",
            "x": 640,
            "y": 610,
            "kind": "campaignObject",
            "role": "memory",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4,
            "memoryTask": "loop-life-healer"
          }
        ],
        "sources": [
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 319,
            "node": "mortal_first_work"
          },
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 123,
            "node": "female_common_jinlan_clinic"
          },
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 737,
            "node": "mortal_school_reopen"
          }
        ],
        "artAudit": {
          "path": "assets/art-v170/apricot-homestead.webp",
          "status": "visually-calibrated-awaiting-runtime-and-bfs",
          "date": "2026-11-13"
        }
      },
      "floodplain": {
        "name": "杏河 · 堤口与避难地",
        "sub": "行旅实事与抉择",
        "artKey": "floodplain",
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
              "id": "mortal-livelihood",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "mortal"
            }
          ],
          "any": []
        },
        "layout": "按实际原画校准墙脚、沟水与栏沿；台阶开口保留。",
        "walls": [
          {
            "x": 0,
            "y": 0,
            "w": 1280,
            "h": 40
          },
          {
            "x": 0,
            "y": 40,
            "w": 20,
            "h": 720
          },
          {
            "x": 1260,
            "y": 40,
            "w": 20,
            "h": 720
          },
          {
            "x": 0,
            "y": 740,
            "w": 1280,
            "h": 20
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
            "w": 165,
            "h": 100
          },
          {
            "x": 400,
            "y": 110,
            "w": 420,
            "h": 35
          },
          {
            "x": 210,
            "y": 235,
            "w": 330,
            "h": 70
          },
          {
            "x": 260,
            "y": 305,
            "w": 275,
            "h": 55
          },
          {
            "x": 700,
            "y": 225,
            "w": 230,
            "h": 75
          },
          {
            "x": 715,
            "y": 300,
            "w": 250,
            "h": 60
          },
          {
            "x": 0,
            "y": 355,
            "w": 130,
            "h": 240
          },
          {
            "x": 1060,
            "y": 390,
            "w": 220,
            "h": 190
          },
          {
            "x": 0,
            "y": 660,
            "w": 170,
            "h": 100
          },
          {
            "x": 1170,
            "y": 650,
            "w": 110,
            "h": 110
          }
        ],
        "objects": [
          {
            "id": "riverReturn",
            "name": "回杏林医塾",
            "x": 640,
            "y": 680,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
          },
          {
            "id": "riverWestBank",
            "name": "西堤低口",
            "x": 260,
            "y": 390,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsD",
            "cell": 3,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "riverBridge",
            "name": "中央浮板渡口",
            "x": 640,
            "y": 370,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsD",
            "cell": 4,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "riverGrain",
            "name": "北岸粮台",
            "x": 850,
            "y": 190,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsE",
            "cell": 6,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "riverMaterials",
            "name": "沙袋与浮板领用处",
            "x": 400,
            "y": 570,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsD",
            "cell": 3,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "riverShelter",
            "name": "避难棚与伤者",
            "x": 970,
            "y": 560,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m4PropsB",
            "cell": 7,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "riverWaterMark",
            "name": "水位与缺口记录",
            "x": 320,
            "y": 410,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsE",
            "cell": 7,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "riverRoad",
            "name": "通往镇上药铺的堤路",
            "x": 790,
            "y": 170,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsE",
            "cell": 6,
            "height": 56,
            "sinceRevision": 4
          }
        ],
        "sources": [
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 778,
            "node": "mortal_flood"
          },
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 792,
            "node": "mortal_rebuild"
          },
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 142,
            "node": "female_common_jinlan_plague"
          }
        ],
        "artAudit": {
          "path": "assets/art-v170/floodplain.webp",
          "status": "visually-calibrated-awaiting-runtime-and-bfs",
          "date": "2026-11-13"
        }
      },
      "reincarnation-hall": {
        "name": "白光之后 · 轮回大殿",
        "sub": "行旅实事与抉择",
        "artKey": "reincarnation-hall",
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
              "id": "loop-investigation",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "layout": "按实际原画校准墙脚、沟水与栏沿；台阶开口保留。",
        "walls": [
          {
            "x": 0,
            "y": 0,
            "w": 1280,
            "h": 40
          },
          {
            "x": 0,
            "y": 40,
            "w": 20,
            "h": 720
          },
          {
            "x": 1260,
            "y": 40,
            "w": 20,
            "h": 720
          },
          {
            "x": 0,
            "y": 740,
            "w": 1280,
            "h": 20
          },
          {
            "x": 0,
            "y": 0,
            "w": 560,
            "h": 170
          },
          {
            "x": 720,
            "y": 0,
            "w": 560,
            "h": 170
          },
          {
            "x": 0,
            "y": 170,
            "w": 105,
            "h": 200
          },
          {
            "x": 1175,
            "y": 170,
            "w": 105,
            "h": 200
          },
          {
            "x": 285,
            "y": 170,
            "w": 40,
            "h": 85
          },
          {
            "x": 955,
            "y": 170,
            "w": 40,
            "h": 85
          },
          {
            "x": 325,
            "y": 225,
            "w": 175,
            "h": 25
          },
          {
            "x": 780,
            "y": 225,
            "w": 175,
            "h": 25
          },
          {
            "x": 0,
            "y": 690,
            "w": 400,
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
            "id": "hallIce",
            "name": "退回冰原",
            "x": 640,
            "y": 680,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
          },
          {
            "id": "hallBorder",
            "name": "第五世 · 北境将军",
            "x": 200,
            "y": 540,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
          },
          {
            "id": "hallClinic",
            "name": "第十世 · 杏村医者",
            "x": 1080,
            "y": 540,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
          },
          {
            "id": "hallPalace",
            "name": "第三十七世 · 魔域守土",
            "x": 1080,
            "y": 290,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
          },
          {
            "id": "hallMill",
            "name": "循魂名去往碾磨",
            "x": 640,
            "y": 150,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
          },
          {
            "id": "hallRecord",
            "name": "九十九世记忆册",
            "x": 460,
            "y": 350,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsE",
            "cell": 4,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "hallLamp",
            "name": "当世护魂灯",
            "x": 820,
            "y": 350,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsE",
            "cell": 2,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "hallNames",
            "name": "未能逐一重历的九十六世",
            "x": 360,
            "y": 190,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsE",
            "cell": 4,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "hallGuardian",
            "name": "凝霜留下的守门人见证",
            "x": 980,
            "y": 390,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsC",
            "cell": 5,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "hallHumanRoad",
            "name": "返人间交付传承",
            "x": 400,
            "y": 560,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
          }
        ],
        "sources": [
          {
            "file": "src/lib/story/branch_loop.ts",
            "line": 126,
            "node": "loop_awaken"
          },
          {
            "file": "src/lib/story/branch_loop.ts",
            "line": 449,
            "node": "loop_awaken_hall"
          },
          {
            "file": "src/lib/story/branch_loop.ts",
            "line": 462,
            "node": "loop_guardian_bet"
          }
        ],
        "artAudit": {
          "path": "assets/art-v170/reincarnation-hall.webp",
          "status": "visually-calibrated-awaiting-runtime-and-bfs",
          "date": "2026-11-13"
        }
      },
      "world-mill": {
        "name": "天门之后 · 时间碾磨",
        "sub": "行旅实事与抉择",
        "artKey": "world-mill",
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
              "id": "loop-memory-review",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "layout": "按实际原画校准墙脚、沟水与栏沿；台阶开口保留。",
        "walls": [
          {
            "x": 0,
            "y": 0,
            "w": 1280,
            "h": 40
          },
          {
            "x": 0,
            "y": 40,
            "w": 20,
            "h": 720
          },
          {
            "x": 1260,
            "y": 40,
            "w": 20,
            "h": 720
          },
          {
            "x": 0,
            "y": 740,
            "w": 1280,
            "h": 20
          },
          {
            "x": 0,
            "y": 0,
            "w": 1280,
            "h": 175
          },
          {
            "x": 0,
            "y": 175,
            "w": 180,
            "h": 70
          },
          {
            "x": 1100,
            "y": 175,
            "w": 180,
            "h": 70
          },
          {
            "x": 420,
            "y": 235,
            "w": 190,
            "h": 50
          },
          {
            "x": 350,
            "y": 285,
            "w": 260,
            "h": 60
          },
          {
            "x": 375,
            "y": 345,
            "w": 235,
            "h": 65
          },
          {
            "x": 430,
            "y": 410,
            "w": 180,
            "h": 45
          },
          {
            "x": 690,
            "y": 235,
            "w": 170,
            "h": 50
          },
          {
            "x": 690,
            "y": 285,
            "w": 260,
            "h": 60
          },
          {
            "x": 690,
            "y": 345,
            "w": 215,
            "h": 65
          },
          {
            "x": 690,
            "y": 410,
            "w": 160,
            "h": 45
          },
          {
            "x": 0,
            "y": 425,
            "w": 310,
            "h": 155
          },
          {
            "x": 310,
            "y": 495,
            "w": 145,
            "h": 45
          },
          {
            "x": 970,
            "y": 425,
            "w": 310,
            "h": 155
          },
          {
            "x": 825,
            "y": 495,
            "w": 145,
            "h": 45
          },
          {
            "x": 0,
            "y": 580,
            "w": 145,
            "h": 180
          },
          {
            "x": 1135,
            "y": 580,
            "w": 145,
            "h": 180
          },
          {
            "x": 0,
            "y": 710,
            "w": 480,
            "h": 50
          },
          {
            "x": 800,
            "y": 710,
            "w": 480,
            "h": 50
          }
        ],
        "objects": [
          {
            "id": "millHall",
            "name": "回轮回大殿复核",
            "x": 640,
            "y": 680,
            "kind": "campaignObject",
            "role": "portal",
            "atlas": null,
            "cell": null,
            "height": 0,
            "sinceRevision": 4
          },
          {
            "id": "millLedger",
            "name": "失去姓名的升仙名册",
            "x": 260,
            "y": 370,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsE",
            "cell": 4,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "millWestAnchor",
            "name": "西侧护魂阵脚",
            "x": 320,
            "y": 235,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m4PropsD",
            "cell": 5,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "millEastAnchor",
            "name": "东侧导流阵脚",
            "x": 970,
            "y": 270,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m4PropsD",
            "cell": 5,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "millAxle",
            "name": "碾磨轴心",
            "x": 640,
            "y": 330,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsE",
            "cell": 3,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "millSoulDock",
            "name": "待渡魂影停靠处",
            "x": 980,
            "y": 375,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsE",
            "cell": 2,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "millRoad",
            "name": "通往人间的引路台",
            "x": 530,
            "y": 590,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m4PropsD",
            "cell": 2,
            "height": 56,
            "sinceRevision": 4
          },
          {
            "id": "millVerdict",
            "name": "四种道路的代价",
            "x": 640,
            "y": 200,
            "kind": "campaignObject",
            "role": "prop",
            "atlas": "m5PropsE",
            "cell": 7,
            "height": 56,
            "sinceRevision": 4
          }
        ],
        "sources": [
          {
            "file": "src/lib/story/branch_loop.ts",
            "line": 495,
            "node": "loop_truth_mill"
          },
          {
            "file": "src/lib/story/branch_loop.ts",
            "line": 520,
            "node": "loop_three_paths"
          },
          {
            "file": "src/lib/story/branch_loop.ts",
            "line": 786,
            "node": "loop_choice_real_3rd"
          }
        ],
        "artAudit": {
          "path": "assets/art-v170/world-mill.webp",
          "status": "visually-calibrated-awaiting-runtime-and-bfs",
          "date": "2026-11-13"
        }
      }
    },
    "exits": {
      "retreat-charity": {
        "id": "retreat-charity",
        "map": "jindan-retreat",
        "objectId": "retreatCharityGate",
        "to": {
          "map": "qingyang-charity",
          "x": 640,
          "y": 650
        },
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "journey-departure",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "journey-departure",
              "id": "wander"
            }
          ],
          "any": []
        },
        "sinceRevision": 4
      },
      "charity-retreat": {
        "id": "charity-retreat",
        "map": "qingyang-charity",
        "objectId": "charityReturn",
        "to": {
          "map": "jindan-retreat",
          "x": 855,
          "y": 610
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sinceRevision": 4
      },
      "charity-stockade": {
        "id": "charity-stockade",
        "map": "qingyang-charity",
        "objectId": "charityStockadeGate",
        "to": {
          "map": "blackwind-stockade",
          "x": 640,
          "y": 650
        },
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "wander-charity",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "sinceRevision": 4
      },
      "stockade-charity": {
        "id": "stockade-charity",
        "map": "blackwind-stockade",
        "objectId": "stockadeReturn",
        "to": {
          "map": "qingyang-charity",
          "x": 1130,
          "y": 560
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sinceRevision": 4
      },
      "charity-border": {
        "id": "charity-border",
        "map": "qingyang-charity",
        "objectId": "charityBorderGate",
        "to": {
          "map": "northern-border",
          "x": 640,
          "y": 650
        },
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "wander-black-order",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "sinceRevision": 4
      },
      "border-charity": {
        "id": "border-charity",
        "map": "northern-border",
        "objectId": "borderReturn",
        "to": {
          "map": "qingyang-charity",
          "x": 1130,
          "y": 420
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sinceRevision": 4
      },
      "border-ice": {
        "id": "border-ice",
        "map": "northern-border",
        "objectId": "borderIceGate",
        "to": {
          "map": "icefield-cavern",
          "x": 640,
          "y": 650
        },
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "wander-border-service",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "sinceRevision": 4
      },
      "ice-border": {
        "id": "ice-border",
        "map": "icefield-cavern",
        "objectId": "iceReturn",
        "to": {
          "map": "northern-border",
          "x": 1120,
          "y": 600
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sinceRevision": 4
      },
      "retreat-wander-trial": {
        "id": "retreat-wander-trial",
        "map": "jindan-retreat",
        "objectId": "retreatJourneyBoard",
        "to": {
          "map": "golden-summit",
          "x": 640,
          "y": 650
        },
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-return-trial",
              "id": "reunion-present-five-proofs"
            }
          ],
          "any": []
        },
        "sinceRevision": 4
      },
      "retreat-demon": {
        "id": "retreat-demon",
        "map": "jindan-retreat",
        "objectId": "retreatJourneyBoard",
        "to": {
          "map": "demon-blood-cavern",
          "x": 640,
          "y": 650
        },
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "demon-entry",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "sinceRevision": 4
      },
      "demon-retreat": {
        "id": "demon-retreat",
        "map": "demon-blood-cavern",
        "objectId": "demonCaveReturn",
        "to": {
          "map": "jindan-retreat",
          "x": 525,
          "y": 620
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sinceRevision": 4
      },
      "demon-tribes": {
        "id": "demon-tribes",
        "map": "demon-blood-cavern",
        "objectId": "demonCaveMarket",
        "to": {
          "map": "demon-tribes",
          "x": 640,
          "y": 650
        },
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "demon-yuanying-trial",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "sinceRevision": 4
      },
      "tribes-demon": {
        "id": "tribes-demon",
        "map": "demon-tribes",
        "objectId": "tribesCave",
        "to": {
          "map": "demon-blood-cavern",
          "x": 1100,
          "y": 600
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sinceRevision": 4
      },
      "tribes-palace": {
        "id": "tribes-palace",
        "map": "demon-tribes",
        "objectId": "tribesPalace",
        "to": {
          "map": "demon-palace",
          "x": 640,
          "y": 650
        },
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "demon-huashen-trial",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "sinceRevision": 4
      },
      "palace-tribes": {
        "id": "palace-tribes",
        "map": "demon-palace",
        "objectId": "palaceTribes",
        "to": {
          "map": "demon-tribes",
          "x": 1080,
          "y": 620
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sinceRevision": 4
      },
      "palace-crossing": {
        "id": "palace-crossing",
        "map": "demon-palace",
        "objectId": "palaceCrossing",
        "to": {
          "map": "two-realms-crossing",
          "x": 640,
          "y": 650
        },
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "demon-coup",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "sinceRevision": 4
      },
      "crossing-palace": {
        "id": "crossing-palace",
        "map": "two-realms-crossing",
        "objectId": "crossingPalace",
        "to": {
          "map": "demon-palace",
          "x": 1120,
          "y": 600
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sinceRevision": 4
      },
      "crossing-ice": {
        "id": "crossing-ice",
        "map": "two-realms-crossing",
        "objectId": "crossingIce",
        "to": {
          "map": "icefield-cavern",
          "x": 640,
          "y": 650
        },
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "demon-coup",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "sinceRevision": 4
      },
      "ice-crossing": {
        "id": "ice-crossing",
        "map": "icefield-cavern",
        "objectId": "iceReturn",
        "to": {
          "map": "two-realms-crossing",
          "x": 1120,
          "y": 590
        },
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "demon-coup",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "sinceRevision": 4
      },
      "retreat-enlighten": {
        "id": "retreat-enlighten",
        "map": "jindan-retreat",
        "objectId": "retreatJourneyBoard",
        "to": {
          "map": "qingyang-charity",
          "x": 640,
          "y": 650
        },
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "enlighten-entry",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "sinceRevision": 4
      },
      "charity-enlighten-ice": {
        "id": "charity-enlighten-ice",
        "map": "qingyang-charity",
        "objectId": "charityBorderGate",
        "to": {
          "map": "icefield-cavern",
          "x": 640,
          "y": 650
        },
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "enlighten-entry",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "sinceRevision": 4
      },
      "ice-enlighten-charity": {
        "id": "ice-enlighten-charity",
        "map": "icefield-cavern",
        "objectId": "iceReturn",
        "to": {
          "map": "qingyang-charity",
          "x": 1130,
          "y": 420
        },
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "enlighten-entry",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "sinceRevision": 4
      },
      "charity-archive": {
        "id": "charity-archive",
        "map": "qingyang-charity",
        "objectId": "charityArchiveGate",
        "to": {
          "map": "archive-hearing",
          "x": 640,
          "y": 650
        },
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "enlighten-entry",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "sinceRevision": 4
      },
      "archive-charity": {
        "id": "archive-charity",
        "map": "archive-hearing",
        "objectId": "archiveReturn",
        "to": {
          "map": "qingyang-charity",
          "x": 1040,
          "y": 630
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sinceRevision": 4
      },
      "archive-enlighten-summit": {
        "id": "archive-enlighten-summit",
        "map": "archive-hearing",
        "objectId": "archiveSummitGate",
        "to": {
          "map": "golden-summit",
          "x": 815,
          "y": 645
        },
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "enlighten-compiled-case",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "sinceRevision": 4
      },
      "summit-archive": {
        "id": "summit-archive",
        "map": "golden-summit",
        "objectId": "enlightenPublicBench",
        "to": {
          "map": "archive-hearing",
          "x": 1120,
          "y": 580
        },
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "enlighten-entry",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "sinceRevision": 4
      },
      "summit-vault": {
        "id": "summit-vault",
        "map": "golden-summit",
        "objectId": "summitVaultGate",
        "to": {
          "map": "sword-vault",
          "x": 640,
          "y": 650
        },
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "enlighten-compiled-case",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "sinceRevision": 4
      },
      "vault-summit": {
        "id": "vault-summit",
        "map": "sword-vault",
        "objectId": "vaultReturn",
        "to": {
          "map": "golden-summit",
          "x": 185,
          "y": 580
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sinceRevision": 4
      },
      "summit-treaty": {
        "id": "summit-treaty",
        "map": "golden-summit",
        "objectId": "summitTreatyGate",
        "to": {
          "map": "two-realms-crossing",
          "x": 640,
          "y": 650
        },
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "enlighten-master-trial",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "sinceRevision": 4
      },
      "crossing-summit": {
        "id": "crossing-summit",
        "map": "two-realms-crossing",
        "objectId": "crossingPalace",
        "to": {
          "map": "golden-summit",
          "x": 1120,
          "y": 610
        },
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "enlighten-master-trial",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "sinceRevision": 4
      },
      "village-homestead": {
        "id": "village-homestead",
        "map": "apricot-village",
        "objectId": "apricotHomesteadGate",
        "to": {
          "map": "apricot-homestead",
          "x": 640,
          "y": 650
        },
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "mortal-renunciation",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "mortal"
            }
          ],
          "any": []
        },
        "sinceRevision": 4
      },
      "homestead-village": {
        "id": "homestead-village",
        "map": "apricot-homestead",
        "objectId": "homesteadVillage",
        "to": {
          "map": "apricot-village",
          "x": 1130,
          "y": 570
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sinceRevision": 4
      },
      "homestead-river": {
        "id": "homestead-river",
        "map": "apricot-homestead",
        "objectId": "homesteadRiver",
        "to": {
          "map": "floodplain",
          "x": 640,
          "y": 650
        },
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "mortal-livelihood",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "mortal"
            }
          ],
          "any": []
        },
        "sinceRevision": 4
      },
      "river-homestead": {
        "id": "river-homestead",
        "map": "floodplain",
        "objectId": "riverReturn",
        "to": {
          "map": "apricot-homestead",
          "x": 1060,
          "y": 590
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sinceRevision": 4
      },
      "retreat-loop-ice": {
        "id": "retreat-loop-ice",
        "map": "jindan-retreat",
        "objectId": "retreatIceInvestigation",
        "to": {
          "map": "icefield-cavern",
          "x": 640,
          "y": 650
        },
        "requires": {
          "all": [
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": [
            {
              "type": "choice",
              "task": "wander-road-choice",
              "id": "loop"
            },
            {
              "type": "choice",
              "task": "demon-future-choice",
              "id": "guardian"
            },
            {
              "type": "task",
              "id": "dacheng-preparation",
              "status": "claimed"
            }
          ]
        },
        "sinceRevision": 4
      },
      "ice-hall": {
        "id": "ice-hall",
        "map": "icefield-cavern",
        "objectId": "iceMemoryGate",
        "to": {
          "map": "reincarnation-hall",
          "x": 640,
          "y": 650
        },
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "loop-investigation",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "sinceRevision": 4
      },
      "hall-ice": {
        "id": "hall-ice",
        "map": "reincarnation-hall",
        "objectId": "hallIce",
        "to": {
          "map": "icefield-cavern",
          "x": 640,
          "y": 610
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sinceRevision": 4
      },
      "hall-mill": {
        "id": "hall-mill",
        "map": "reincarnation-hall",
        "objectId": "hallMill",
        "to": {
          "map": "world-mill",
          "x": 640,
          "y": 650
        },
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "loop-memory-review",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "sinceRevision": 4
      },
      "mill-hall": {
        "id": "mill-hall",
        "map": "world-mill",
        "objectId": "millHall",
        "to": {
          "map": "reincarnation-hall",
          "x": 640,
          "y": 210
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sinceRevision": 4
      },
      "hall-loop-life-general": {
        "id": "hall-loop-life-general",
        "map": "reincarnation-hall",
        "objectId": "hallBorder",
        "to": {
          "map": "northern-border",
          "x": 640,
          "y": 620
        },
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-life-general",
              "id": "memory-door-open"
            }
          ],
          "any": []
        },
        "sinceRevision": 4
      },
      "loop-life-general-hall": {
        "id": "loop-life-general-hall",
        "map": "northern-border",
        "objectId": "return-loop-life-general",
        "to": {
          "map": "reincarnation-hall",
          "x": 640,
          "y": 620
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sinceRevision": 4
      },
      "hall-loop-life-healer": {
        "id": "hall-loop-life-healer",
        "map": "reincarnation-hall",
        "objectId": "hallClinic",
        "to": {
          "map": "apricot-homestead",
          "x": 640,
          "y": 620
        },
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-life-healer",
              "id": "memory-door-open"
            }
          ],
          "any": []
        },
        "sinceRevision": 4
      },
      "loop-life-healer-hall": {
        "id": "loop-life-healer-hall",
        "map": "apricot-homestead",
        "objectId": "return-loop-life-healer",
        "to": {
          "map": "reincarnation-hall",
          "x": 640,
          "y": 620
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sinceRevision": 4
      },
      "hall-loop-life-ruler": {
        "id": "hall-loop-life-ruler",
        "map": "reincarnation-hall",
        "objectId": "hallPalace",
        "to": {
          "map": "demon-palace",
          "x": 640,
          "y": 620
        },
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-life-ruler",
              "id": "memory-door-open"
            }
          ],
          "any": []
        },
        "sinceRevision": 4
      },
      "loop-life-ruler-hall": {
        "id": "loop-life-ruler-hall",
        "map": "demon-palace",
        "objectId": "return-loop-life-ruler",
        "to": {
          "map": "reincarnation-hall",
          "x": 640,
          "y": 620
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sinceRevision": 4
      },
      "hall-human-road": {
        "id": "hall-human-road",
        "map": "reincarnation-hall",
        "objectId": "hallHumanRoad",
        "to": {
          "map": "qingyang-charity",
          "x": 640,
          "y": 630
        },
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "loop-path-choice",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "loop-path-choice",
              "id": "road"
            }
          ],
          "any": []
        },
        "sinceRevision": 4
      },
      "charity-memory-hall": {
        "id": "charity-memory-hall",
        "map": "qingyang-charity",
        "objectId": "charityMemoryReturn",
        "to": {
          "map": "reincarnation-hall",
          "x": 640,
          "y": 620
        },
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "loop-path-choice",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "loop-path-choice",
              "id": "road"
            }
          ],
          "any": []
        },
        "sinceRevision": 4
      },
      "border-loop-crossing": {
        "id": "border-loop-crossing",
        "map": "northern-border",
        "objectId": "borderPeaceRoad",
        "to": {
          "map": "two-realms-crossing",
          "x": 640,
          "y": 650
        },
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "loop-path-choice",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "loop-path-choice",
              "id": "road"
            }
          ],
          "any": []
        },
        "sinceRevision": 4
      },
      "crossing-memory-hall": {
        "id": "crossing-memory-hall",
        "map": "two-realms-crossing",
        "objectId": "crossingMemoryReturn",
        "to": {
          "map": "reincarnation-hall",
          "x": 640,
          "y": 620
        },
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "loop-path-choice",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "loop-path-choice",
              "id": "road"
            }
          ],
          "any": []
        },
        "sinceRevision": 4
      },
      "heaven-sword-vault": {
        "id": "heaven-sword-vault",
        "map": "heaven-threshold",
        "objectId": "heavenSwordRoad",
        "to": {
          "map": "sword-vault",
          "x": 640,
          "y": 650
        },
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "dacheng-breakthrough",
              "status": "claimed"
            },
            {
              "type": "gender",
              "id": "female"
            }
          ],
          "any": []
        },
        "sinceRevision": 4
      }
    },
    "tasks": {
      "journey-departure": {
        "id": "journey-departure",
        "title": "行旅与旧案去向",
        "summary": "行旅不是抹去旧事。先整理已有案卷，再亲自选择下一段路。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "jindan-crossroads",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "objectives": [
          "read-journey-record",
          "course-chosen"
        ],
        "sequence": [],
        "choices": [
          "wander",
          "demon",
          "enlighten",
          "shushan"
        ],
        "sources": [
          {
            "file": "src/lib/story/volume3.ts",
            "line": 927,
            "node": "jindan_after_choice_wander"
          },
          {
            "file": "src/lib/story/branch_wander.ts",
            "line": 21,
            "node": "wander_from_jindan"
          }
        ],
        "volumeLabel": "散修行旅",
        "sinceRevision": 4,
        "window": "early-politics"
      },
      "wander-charity": {
        "id": "wander-charity",
        "title": "济善堂里的一席",
        "summary": "苏老头让你辨药，沈红叶请你先处理她的伤；医术从实际救助中学来。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "journey-departure",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "journey-departure",
              "id": "wander"
            }
          ],
          "any": []
        },
        "objectives": [
          "charity-read-case",
          "charity-gather-west",
          "charity-gather-east",
          "charity-draw-water",
          "charity-medicine-ready",
          "charity-care-hongye"
        ],
        "sequence": [
          "charity-sort",
          "charity-wash",
          "charity-apply"
        ],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_wander.ts",
            "line": 176,
            "node": "wander_jishantang_apprentice"
          },
          {
            "file": "src/lib/story/branch_wander.ts",
            "line": 219,
            "node": "wander_shen_heal"
          }
        ],
        "volumeLabel": "散修行旅",
        "sinceRevision": 4
      },
      "wander-black-order": {
        "id": "wander-black-order",
        "title": "黑风寨里留活证",
        "summary": "先查警哨与账页，再决定怎样保护囚客取令。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "wander-charity",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "objectives": [
          "black-read-patrol",
          "black-copy-ledger",
          "course-chosen",
          "black-quiet-cleared",
          "black-order-secured",
          "black-assault-cleared",
          "black-take-order",
          "black-captive-testimony"
        ],
        "sequence": [],
        "choices": [
          "quiet",
          "assault"
        ],
        "sources": [
          {
            "file": "src/lib/story/branch_wander.ts",
            "line": 255,
            "node": "wander_heifeng_shan"
          },
          {
            "file": "src/lib/story/branch_wander.ts",
            "line": 267,
            "node": "wander_heifeng_after"
          }
        ],
        "volumeLabel": "散修行旅",
        "sinceRevision": 4,
        "requiredObjectives": [
          "black-read-patrol",
          "black-copy-ledger",
          "course-chosen",
          "black-order-secured",
          "black-take-order",
          "black-captive-testimony"
        ]
      },
      "wander-border-service": {
        "id": "wander-border-service",
        "title": "关隘的一夜",
        "summary": "传令与补给都不足，选择先稳住伤员还是军粮，另一项由守军接手。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "wander-black-order",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "objectives": [
          "border-receive-kits",
          "course-chosen",
          "border-medical-delivered",
          "border-priority-done",
          "border-grain-delivered",
          "border-hold-west",
          "border-relay-order"
        ],
        "sequence": [],
        "choices": [
          "medical",
          "grain"
        ],
        "sources": [
          {
            "file": "src/lib/story/branch_wander.ts",
            "line": 291,
            "node": "wander_join_army"
          },
          {
            "file": "src/lib/story/branch_wander.ts",
            "line": 301,
            "node": "wander_laoshuai"
          }
        ],
        "volumeLabel": "散修行旅",
        "sinceRevision": 4,
        "requiredObjectives": [
          "border-receive-kits",
          "course-chosen",
          "border-priority-done",
          "border-hold-west",
          "border-relay-order"
        ]
      },
      "wander-prison-evidence": {
        "id": "wander-prison-evidence",
        "title": "救出肯作证的老帅",
        "summary": "令符、证词与联名都必须来自具体的人；查清提审手续再救人。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "wander-border-service",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "objectives": [
          "marshal-check-army-seal",
          "marshal-village-signatures",
          "marshal-open-cell",
          "marshal-cover-exit",
          "marshal-take-testimony"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_wander.ts",
            "line": 316,
            "node": "wander_investigate_xuanji"
          },
          {
            "file": "src/lib/story/branch_wander.ts",
            "line": 301,
            "node": "wander_laoshuai"
          }
        ],
        "volumeLabel": "散修行旅",
        "sinceRevision": 4
      },
      "wander-icefield-survey": {
        "id": "wander-icefield-survey",
        "title": "古洞的三道异纹",
        "summary": "确认三处冰纹同源，也照料困在矿道的伤者，才离开冰原。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "wander-border-service",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "objectives": [
          "ice-survey-notes",
          "ice-take-south",
          "ice-take-east",
          "ice-take-north",
          "ice-rescue-miner",
          "ice-fit-fragments"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_wander.ts",
            "line": 118,
            "node": "wander_icefield"
          },
          {
            "file": "src/lib/story/branch_wander.ts",
            "line": 338,
            "node": "wander_ice_cave"
          },
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 257,
            "node": "enlighten_ashi_tale"
          }
        ],
        "volumeLabel": "散修行旅",
        "sinceRevision": 4
      },
      "wander-road-years": {
        "id": "wander-road-years",
        "title": "江湖十年，有处可归",
        "summary": "巡行不是一页空白年表。亲自把药货、证卷与护温所需送到不同地方。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "wander-prison-evidence",
              "status": "claimed"
            },
            {
              "type": "task",
              "id": "wander-icefield-survey",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "objectives": [
          "roads-load-parcels",
          "roads-clinic-year",
          "roads-border-years",
          "roads-ice-years"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_wander.ts",
            "line": 371,
            "node": "wander_10_years_1"
          },
          {
            "file": "src/lib/story/branch_wander.ts",
            "line": 383,
            "node": "wander_10_years_2"
          },
          {
            "file": "src/lib/story/branch_wander.ts",
            "line": 394,
            "node": "wander_10_years_3"
          },
          {
            "file": "src/lib/story/branch_wander.ts",
            "line": 405,
            "node": "wander_10_years_4"
          }
        ],
        "volumeLabel": "散修行旅",
        "sinceRevision": 4
      },
      "wander-road-choice": {
        "id": "wander-road-choice",
        "title": "十年之后的路",
        "summary": "把走过的事与尚未解决的代价放在桌上，再决定下一段承诺。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "wander-road-years",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "objectives": [
          "course-chosen"
        ],
        "sequence": [],
        "choices": [
          "alone",
          "legend",
          "reunion",
          "blacklord",
          "medical",
          "laststand",
          "demon",
          "enlighten",
          "mortal",
          "loop"
        ],
        "sources": [
          {
            "file": "src/lib/story/branch_wander.ts",
            "line": 146,
            "node": "wander_crossroad"
          },
          {
            "file": "src/lib/story/branch_wander.ts",
            "line": 448,
            "node": "wander_crossroad_expand"
          }
        ],
        "volumeLabel": "散修行旅",
        "sinceRevision": 4
      },
      "wander-independent-farewell": {
        "id": "wander-independent-farewell",
        "title": "独行者的路册",
        "summary": "把能帮助后来人的记录留下，亲自结清旧委托，再独行。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "wander-road-choice",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "wander-road-choice",
              "id": "alone"
            },
            {
              "type": "partner",
              "id": "none"
            }
          ],
          "any": []
        },
        "objectives": [
          "alone-mark-ice-path",
          "alone-close-commissions"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_wander.ts",
            "line": 492,
            "node": "wander_old_age_path"
          }
        ],
        "volumeLabel": "散修行旅",
        "sinceRevision": 4
      },
      "wander-legend-handoff": {
        "id": "wander-legend-handoff",
        "title": "江湖夜雨前的一次交接",
        "summary": "把各自署名的证卷交给能继续查案的人，再决定同行。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "wander-road-choice",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "wander-road-choice",
              "id": "legend"
            },
            {
              "type": "legacyToken",
              "id": "foxHairpin"
            }
          ],
          "any": []
        },
        "objectives": [
          "legend-official-dossier",
          "legend-return-order-copy",
          "legend-ning-response",
          "legend-cover-last-caravan"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 190,
            "node": "ending_wander_legend"
          }
        ],
        "volumeLabel": "散修行旅",
        "sinceRevision": 4
      },
      "wander-return-trial": {
        "id": "wander-return-trial",
        "title": "五证齐备再登金顶",
        "summary": "入口不足的证据必须真补齐，再向金顶说明十年所见。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "wander-road-choice",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "wander-road-choice",
              "id": "reunion"
            }
          ],
          "any": []
        },
        "objectives": [
          "reunion-capture-officer",
          "reunion-officer-testimony",
          "reunion-present-five-proofs",
          "reunion-public-defense",
          "reunion-accept-protection-duty"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 241,
            "node": "ending_wander_reunion"
          }
        ],
        "volumeLabel": "散修行旅",
        "sinceRevision": 4,
        "window": "early-politics"
      },
      "wander-black-command": {
        "id": "wander-black-command",
        "title": "黑令之下的军纪",
        "summary": "八部响应一纸令符之前，先看你怎样处理粮、俘与旧友。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "wander-road-choice",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "wander-road-choice",
              "id": "blacklord"
            },
            {
              "type": "token",
              "id": "wander-black-order"
            }
          ],
          "any": []
        },
        "objectives": [
          "blacklord-count-grain",
          "blacklord-stop-marauders",
          "blacklord-release-captives",
          "blacklord-old-friend-farewell",
          "blacklord-oath-command"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 225,
            "node": "ending_wander_demon"
          }
        ],
        "volumeLabel": "散修行旅",
        "sinceRevision": 4,
        "window": "early-politics"
      },
      "wander-medical-legacy": {
        "id": "wander-medical-legacy",
        "title": "把剑铸成药具",
        "summary": "医道不只一本书；三地实诊、三处交药、一次雪山救助之后，才谈传承。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "wander-road-choice",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "wander-road-choice",
              "id": "medical"
            },
            {
              "type": "token",
              "id": "wander-herb-manual"
            }
          ],
          "any": []
        },
        "objectives": [
          "medical-sample-clinic",
          "medical-sample-border",
          "medical-sample-ice",
          "medical-compile-remedy",
          "medical-deliver-clinic",
          "medical-deliver-border",
          "medical-deliver-ice",
          "medical-forge-tool",
          "medical-snow-ward",
          "medical-pass-casebook"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 351,
            "node": "ending_wander_medical_immortal"
          }
        ],
        "volumeLabel": "散修行旅",
        "sinceRevision": 4
      },
      "wander-last-stand": {
        "id": "wander-last-stand",
        "title": "证词必须送出去",
        "summary": "在明确接受最后守阵代价前，把证词和撤离路线交给能活着离开的人。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "wander-road-choice",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "wander-road-choice",
              "id": "laststand"
            }
          ],
          "any": []
        },
        "objectives": [
          "laststand-send-testimony",
          "laststand-mark-retreat",
          "laststand-hold-gate"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 208,
            "node": "ending_wander_death"
          }
        ],
        "volumeLabel": "散修行旅",
        "sinceRevision": 4,
        "window": "early-politics"
      },
      "relation-shen-case": {
        "id": "relation-shen-case",
        "title": "让问案的人能开口",
        "summary": "灵薇要让女弟子也能平等申诉；你帮她整理与护送真实卷宗。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "jindan-crossroads",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "objectives": [
          "shen-hear-case-goal",
          "shen-seal-petition",
          "shen-cover-petition",
          "shen-respect-duty"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/volume2.ts",
            "line": 239,
            "node": "zhuji_prep_lingwei"
          },
          {
            "file": "src/lib/story/volume3.ts",
            "line": 392,
            "node": "female_sword_shushan_first_female"
          }
        ],
        "volumeLabel": "相知与自主",
        "sinceRevision": 4,
        "requiresLivingPerson": "shen"
      },
      "relation-shen-vow": {
        "id": "relation-shen-vow",
        "title": "与沈灵薇说清承诺",
        "summary": "共同经历不是自动结契。双方明确成年且愿意，才把关系写成一生的承诺。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "relation-shen-case",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "objectives": [
          "listen-shen-intent",
          "relationship-decided"
        ],
        "sequence": [],
        "choices": [
          "vow",
          "friend",
          "decline"
        ],
        "sources": [
          {
            "file": "src/lib/story/volume2.ts",
            "line": 239,
            "node": "zhuji_prep_lingwei"
          },
          {
            "file": "src/lib/story/volume4.ts",
            "line": 344,
            "node": "female_sword_final_duel_shen"
          }
        ],
        "volumeLabel": "相知与自主",
        "sinceRevision": 4,
        "requiresLivingPerson": "shen"
      },
      "relation-ning-soul": {
        "id": "relation-ning-soul",
        "title": "她要守住的名字",
        "summary": "凝霜要找回受困魂影的姓名，请你帮她核对两个原有见证。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "wander-icefield-survey",
              "status": "claimed"
            },
            {
              "type": "legacyToken",
              "id": "foxHairpin"
            }
          ],
          "any": []
        },
        "objectives": [
          "ning-hear-own-goal",
          "ning-check-ice-names",
          "ning-check-road-witness",
          "ning-light-soul-lamp"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_wander.ts",
            "line": 146,
            "node": "wander_crossroad"
          },
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 693,
            "node": "enlighten_ningshuang_fire"
          }
        ],
        "volumeLabel": "相知与自主",
        "sinceRevision": 4,
        "requiresLivingPerson": "ning"
      },
      "relation-ning-vow": {
        "id": "relation-ning-vow",
        "title": "与凝霜说清承诺",
        "summary": "共同经历不是自动结契。双方明确成年且愿意，才把关系写成一生的承诺。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "relation-ning-soul",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "objectives": [
          "listen-ning-intent",
          "relationship-decided"
        ],
        "sequence": [],
        "choices": [
          "vow",
          "friend",
          "decline"
        ],
        "sources": [
          {
            "file": "src/lib/story/branch_wander.ts",
            "line": 146,
            "node": "wander_crossroad"
          },
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 750,
            "node": "demon_lord_choice_3"
          }
        ],
        "volumeLabel": "相知与自主",
        "sinceRevision": 4,
        "requiresLivingPerson": "ning"
      },
      "relation-axing-clinic": {
        "id": "relation-axing-clinic",
        "title": "她的医案，她的名字",
        "summary": "阿杏想让病案与医课都留下自己的姓名，与你商量可以平等合作的办法。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "apricot-aid",
              "status": "claimed"
            },
            {
              "type": "task",
              "id": "jindan-crossroads",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "objectives": [
          "axing-hear-clinic-goal",
          "axing-compile-own-case",
          "axing-write-teaching-page",
          "axing-agree-independent-work"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 108,
            "node": "female_common_axing_jinlan"
          },
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 123,
            "node": "female_common_jinlan_clinic"
          }
        ],
        "volumeLabel": "相知与自主",
        "sinceRevision": 4,
        "requiresLivingPerson": "axing"
      },
      "relation-axing-vow": {
        "id": "relation-axing-vow",
        "title": "与阿杏说清承诺",
        "summary": "共同经历不是自动结契。双方明确成年且愿意，才把关系写成一生的承诺。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "relation-axing-clinic",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "objectives": [
          "listen-axing-intent",
          "relationship-decided"
        ],
        "sequence": [],
        "choices": [
          "vow",
          "friend",
          "decline"
        ],
        "sources": [
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 108,
            "node": "female_common_axing_jinlan"
          },
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 123,
            "node": "female_common_jinlan_clinic"
          }
        ],
        "volumeLabel": "相知与自主",
        "sinceRevision": 4,
        "requiresLivingPerson": "axing"
      },
      "relation-lingyun-oath": {
        "id": "relation-lingyun-oath",
        "title": "旧书匣与新的约定",
        "summary": "凌云要把旧私塾的东西交给后来学生；你帮他修整，再谈如今的选择。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "jindan-crossroads",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "objectives": [
          "lingyun-hear-school-goal",
          "lingyun-repair-old-case",
          "lingyun-receive-ruler",
          "lingyun-compare-two-jades"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/volume2.ts",
            "line": 1086,
            "node": "female_brother_oath"
          },
          {
            "file": "src/lib/story/volume3.ts",
            "line": 1141,
            "node": "female_brother_separation"
          },
          {
            "file": "src/lib/story/volume4.ts",
            "line": 284,
            "node": "female_brother_reunion"
          }
        ],
        "volumeLabel": "相知与自主",
        "sinceRevision": 4,
        "requiresLivingPerson": "lingyun"
      },
      "relation-lingyun-vow": {
        "id": "relation-lingyun-vow",
        "title": "与凌云子说清承诺",
        "summary": "共同经历不是自动结契。双方明确成年且愿意，才把关系写成一生的承诺。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "relation-lingyun-oath",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "objectives": [
          "listen-lingyun-intent",
          "relationship-decided"
        ],
        "sequence": [],
        "choices": [
          "vow",
          "friend",
          "decline"
        ],
        "sources": [
          {
            "file": "src/lib/story/volume4.ts",
            "line": 284,
            "node": "female_brother_reunion"
          },
          {
            "file": "src/lib/story/volume4.ts",
            "line": 411,
            "node": "female_brother_mountain_oath"
          }
        ],
        "volumeLabel": "相知与自主",
        "sinceRevision": 4,
        "requiresLivingPerson": "lingyun"
      },
      "demon-entry": {
        "id": "demon-entry",
        "title": "赴魔域前的交接",
        "summary": "入魔域是主动选择，不由寄养身世替你决定。先核旧案、退路与双方所知。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "jindan-crossroads",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": [
            {
              "type": "choice",
              "task": "journey-departure",
              "id": "demon"
            },
            {
              "type": "choice",
              "task": "wander-road-choice",
              "id": "demon"
            }
          ]
        },
        "objectives": [
          "demon-entry-check-blood",
          "demon-entry-leave-record"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 17,
            "node": "demon_acknowledge"
          }
        ],
        "volumeLabel": "魔域长线",
        "sinceRevision": 4,
        "window": "early-politics"
      },
      "demon-blood-preparation": {
        "id": "demon-blood-preparation",
        "title": "先稳住自己的血脉",
        "summary": "老魔头与你核对失控征兆，三处稳定工作完成后才进入试炼。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "demon-entry",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "demon-blood-preparation-receive",
          "demon-blood-preparation-clamp",
          "demon-blood-preparation-release",
          "demon-blood-preparation-record"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 249,
            "node": "demon_blood_day_1"
          },
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 262,
            "node": "demon_blood_day_7"
          },
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 277,
            "node": "demon_blood_month_1"
          }
        ],
        "volumeLabel": "魔域长线",
        "sinceRevision": 4
      },
      "demon-yuanying-trial": {
        "id": "demon-yuanying-trial",
        "title": "万魔窟结婴试炼",
        "summary": "两段真实试炼之间可退出整备，失败只重试当前段，只有交付才突破。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "demon-blood-preparation",
              "status": "claimed"
            },
            {
              "type": "realm",
              "id": "jindan"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "demon-yuanying-trial-first",
          "demon-yuanying-trial-second"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 58,
            "node": "demon_training"
          }
        ],
        "volumeLabel": "魔域长线",
        "sinceRevision": 4,
        "trial": true
      },
      "demon-tribal-work": {
        "id": "demon-tribal-work",
        "title": "十二部的五件实事",
        "summary": "以农、牧、巫、铁、义塾五处代表事务展开十二部生活；人物有自己的目标。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "demon-yuanying-trial",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "demon-tribal-work-receive",
          "demon-tribal-work-canal-west",
          "demon-tribal-work-canal-east",
          "demon-tribal-work-grain",
          "demon-tribal-work-cure",
          "demon-tribal-work-forge",
          "demon-tribal-work-school"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 309,
            "node": "demon_12_tribes_farmer"
          },
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 804,
            "node": "demon_12_tribes_herders"
          },
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 322,
            "node": "demon_12_tribes_witch"
          },
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 338,
            "node": "demon_12_tribes_orphans"
          },
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 816,
            "node": "demon_12_tribes_blacksmith"
          }
        ],
        "volumeLabel": "魔域长线",
        "sinceRevision": 4
      },
      "demon-rebellion": {
        "id": "demon-rebellion",
        "title": "平叛也要留下账",
        "summary": "两部反抗有真实粮路争议；选择交账协商或战场止乱，结果影响军规。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "demon-tribal-work",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "course-chosen",
          "rebel-negotiate-receipt",
          "rebel-settled",
          "rebel-force-receipt",
          "demon-rebel-register"
        ],
        "sequence": [],
        "choices": [
          "negotiate",
          "force"
        ],
        "sources": [
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 354,
            "node": "demon_supress_rebellion_1"
          },
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 371,
            "node": "demon_supress_rebellion_2"
          }
        ],
        "volumeLabel": "魔域长线",
        "sinceRevision": 4,
        "requiredObjectives": [
          "course-chosen",
          "rebel-settled",
          "demon-rebel-register"
        ]
      },
      "demon-huashen-trial": {
        "id": "demon-huashen-trial",
        "title": "魔域守心化神",
        "summary": "两段真实试炼之间可退出整备，失败只重试当前段，只有交付才突破。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "demon-rebellion",
              "status": "claimed"
            },
            {
              "type": "realm",
              "id": "yuanying"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "demon-huashen-trial-first",
          "demon-huashen-trial-second"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 291,
            "node": "demon_cave_year"
          }
        ],
        "volumeLabel": "魔域长线",
        "sinceRevision": 4,
        "trial": true
      },
      "demon-mother-legacy": {
        "id": "demon-mother-legacy",
        "title": "先交遗物，再问前路",
        "summary": "凌玉琅仍在时说明生母旧物来历；外婆遗簪与母亲素银簪不混成一件。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "demon-huashen-trial",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "demon-mother-legacy-hear",
          "demon-mother-legacy-verify",
          "demon-mother-legacy-receive"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 918,
            "node": "female_demon_mother_legacy"
          },
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 941,
            "node": "female_demon_ling_reform"
          }
        ],
        "volumeLabel": "魔域长线",
        "sinceRevision": 4
      },
      "demon-coup": {
        "id": "demon-coup",
        "title": "金顶前的撤民与政变",
        "summary": "围山前先让平民离开，敌人是玄玑势力，旧同门不因阵营被强制杀害。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "demon-mother-legacy",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "demon-coup-evacuate",
          "demon-coup-siege",
          "demon-coup-break-control",
          "demon-coup-uncle-farewell",
          "demon-coup-public-account"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 425,
            "node": "demon_letter_to_shushan"
          },
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 463,
            "node": "demon_shen_confront"
          },
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 498,
            "node": "demon_coup_uncle_dies"
          },
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 905,
            "node": "demon_final_three_strikes"
          }
        ],
        "volumeLabel": "魔域长线",
        "sinceRevision": 4
      },
      "demon-heti-trial": {
        "id": "demon-heti-trial",
        "title": "合体劫后的军权责任",
        "summary": "两段真实试炼之间可退出整备，失败只重试当前段，只有交付才突破。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "demon-coup",
              "status": "claimed"
            },
            {
              "type": "realm",
              "id": "huashen"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "demon-heti-trial-first",
          "demon-heti-trial-second"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 197,
            "node": "demon_aftermath"
          }
        ],
        "volumeLabel": "魔域长线",
        "sinceRevision": 4,
        "trial": true
      },
      "demon-treaty": {
        "id": "demon-treaty",
        "title": "两界城先有一座桥",
        "summary": "互不侵犯要由桥、粮、伤者名单兑现，不是王座上一句承诺。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "demon-heti-trial",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "demon-treaty-receive",
          "demon-treaty-south-bridge",
          "demon-treaty-north-bridge",
          "demon-treaty-victims",
          "demon-treaty-school",
          "demon-treaty-sign"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 580,
            "node": "demon_peace_treaty_1"
          },
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 594,
            "node": "demon_peace_treaty_2"
          }
        ],
        "volumeLabel": "魔域长线",
        "sinceRevision": 4
      },
      "demon-century": {
        "id": "demon-century",
        "title": "百年里仍要面对的人",
        "summary": "十年照护、二十年告别、五十年遇刺、百年交接分别留实际记录。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "demon-treaty",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "demon-century-ten-care",
          "demon-century-twenty-farewell",
          "demon-century-fifty-assassin",
          "demon-century-hundred-handoff"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 607,
            "node": "demon_year_10_lingwei"
          },
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 620,
            "node": "demon_year_20_qingwei"
          },
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 633,
            "node": "demon_year_50_assassination"
          },
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 706,
            "node": "demon_old_woman_cake"
          }
        ],
        "volumeLabel": "魔域长线",
        "sinceRevision": 4
      },
      "demon-dacheng-trial": {
        "id": "demon-dacheng-trial",
        "title": "魔域百年大乘试炼",
        "summary": "两段真实试炼之间可退出整备，失败只重试当前段，只有交付才突破。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "demon-century",
              "status": "claimed"
            },
            {
              "type": "realm",
              "id": "heti"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "demon-dacheng-trial-first",
          "demon-dacheng-trial-second"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 230,
            "node": "demon_final_choice"
          }
        ],
        "volumeLabel": "魔域长线",
        "sinceRevision": 4,
        "trial": true
      },
      "demon-future-choice": {
        "id": "demon-future-choice",
        "title": "尊位之后如何交代",
        "summary": "统治、赎罪、归隐、杏旗改革与守门各有真实后续，不在这里直接结局。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "demon-dacheng-trial",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "course-chosen"
        ],
        "sequence": [],
        "choices": [
          "lord",
          "dark",
          "redeem",
          "hermit",
          "reform",
          "guardian"
        ],
        "sources": [
          {
            "file": "src/lib/story/branch_demon.ts",
            "line": 230,
            "node": "demon_final_choice"
          }
        ],
        "volumeLabel": "魔域长线",
        "sinceRevision": 4
      },
      "demon-lord-settlement": {
        "id": "demon-lord-settlement",
        "title": "尊位与仁魔之规",
        "summary": "每项交代完成后才收束此生，普通失败仍可重试当前战。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "demon-future-choice",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "demon-future-choice",
              "id": "lord"
            }
          ],
          "any": []
        },
        "objectives": [
          "demon-lord-settlement-prisoners",
          "demon-lord-settlement-order",
          "demon-lord-settlement-trade"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 119,
            "node": "ending_demon_lord"
          }
        ],
        "volumeLabel": "魔域长线",
        "sinceRevision": 4
      },
      "demon-dark-conquest": {
        "id": "demon-dark-conquest",
        "title": "破约的代价",
        "summary": "每项交代完成后才收束此生，普通失败仍可重试当前战。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "demon-future-choice",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "demon-future-choice",
              "id": "dark"
            }
          ],
          "any": []
        },
        "objectives": [
          "demon-dark-conquest-break-treaty",
          "demon-dark-conquest-old-friend",
          "demon-dark-conquest-lost-friend",
          "demon-dark-conquest-command"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 330,
            "node": "ending_demon_dark_reign"
          }
        ],
        "volumeLabel": "魔域长线",
        "sinceRevision": 4
      },
      "demon-redemption-handoff": {
        "id": "demon-redemption-handoff",
        "title": "退兵之后走进塔底",
        "summary": "每项交代完成后才收束此生，普通失败仍可重试当前战。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "demon-future-choice",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "demon-future-choice",
              "id": "redeem"
            }
          ],
          "any": []
        },
        "objectives": [
          "demon-redemption-handoff-military",
          "demon-redemption-handoff-victims",
          "demon-redemption-handoff-relinquish",
          "demon-redemption-enter-tower"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 132,
            "node": "ending_demon_redemption"
          }
        ],
        "volumeLabel": "魔域长线",
        "sinceRevision": 4
      },
      "demon-hermit-care": {
        "id": "demon-hermit-care",
        "title": "北岸的木屋与回应",
        "summary": "每项交代完成后才收束此生，普通失败仍可重试当前战。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "demon-future-choice",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "demon-future-choice",
              "id": "hermit"
            }
          ],
          "any": []
        },
        "objectives": [
          "demon-hermit-care-successor",
          "demon-hermit-care-gather",
          "demon-hermit-care-roof",
          "demon-hermit-care-window",
          "demon-hermit-care-answer"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 512,
            "node": "ending_demon_hermit"
          }
        ],
        "volumeLabel": "魔域长线",
        "sinceRevision": 4
      },
      "demon-apricot-reform": {
        "id": "demon-apricot-reform",
        "title": "杏旗必须兑现的四件事",
        "summary": "每项交代完成后才收束此生，普通失败仍可重试当前战。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "demon-future-choice",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "demon-future-choice",
              "id": "reform"
            }
          ],
          "any": []
        },
        "objectives": [
          "demon-apricot-reform-stop-sacrifice",
          "demon-apricot-reform-school",
          "demon-apricot-reform-market",
          "demon-apricot-reform-vow"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 477,
            "node": "ending_f_demon_lady_ling"
          }
        ],
        "volumeLabel": "魔域长线",
        "sinceRevision": 4
      },
      "enlighten-entry": {
        "id": "enlighten-entry",
        "title": "不急着定罪的第三条路",
        "summary": "先约定三位证人的安全与各自证言，再决定如何公开旧矿案。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "jindan-crossroads",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": [
            {
              "type": "choice",
              "task": "journey-departure",
              "id": "enlighten"
            },
            {
              "type": "choice",
              "task": "wander-road-choice",
              "id": "enlighten"
            }
          ]
        },
        "objectives": [
          "enlighten-entry-plan",
          "enlighten-entry-protection"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 18,
            "node": "enlighten_begin"
          }
        ],
        "volumeLabel": "证道长线",
        "sinceRevision": 4,
        "window": "early-politics"
      },
      "enlighten-yuanying-trial": {
        "id": "enlighten-yuanying-trial",
        "title": "查访前的元婴守心",
        "summary": "以实际护证和守心为准备，两段劫战完成后才交付突破。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "enlighten-entry",
              "status": "claimed"
            },
            {
              "type": "realm",
              "id": "jindan"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "enlighten-yuanying-trial-first",
          "enlighten-yuanying-trial-second"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 18,
            "node": "enlighten_begin"
          }
        ],
        "volumeLabel": "证道长线",
        "sinceRevision": 4,
        "trial": true
      },
      "enlighten-three-witnesses": {
        "id": "enlighten-three-witnesses",
        "title": "三位证人，各自一席",
        "summary": "三人都应有安全、知情与独立署名，不能让一张旧账冒充三个活人。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "enlighten-yuanying-trial",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "enlighten-three-witnesses-receive",
          "enlighten-three-witnesses-zhou",
          "enlighten-three-witnesses-ashi",
          "enlighten-three-witnesses-chen"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 216,
            "node": "enlighten_zhousan_testimony"
          },
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 257,
            "node": "enlighten_ashi_tale"
          },
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 682,
            "node": "enlighten_chen_mo_books"
          }
        ],
        "volumeLabel": "证道长线",
        "sinceRevision": 4
      },
      "enlighten-compiled-case": {
        "id": "enlighten-compiled-case",
        "title": "卷宗夜与狐火验真",
        "summary": "证词、原账和删账互相对勘，护住真话，也保护愿意说话的人。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "enlighten-three-witnesses",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "enlighten-compiled-case-original",
          "enlighten-compiled-case-erased",
          "enlighten-compiled-case-consent",
          "enlighten-compiled-case-verify",
          "enlighten-compiled-case-guard"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 693,
            "node": "enlighten_ningshuang_fire"
          },
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 705,
            "node": "enlighten_evidence_night"
          },
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 751,
            "node": "enlighten_foxfire_truth"
          }
        ],
        "volumeLabel": "证道长线",
        "sinceRevision": 4
      },
      "enlighten-case-direction": {
        "id": "enlighten-case-direction",
        "title": "案卷之后仍有选择",
        "summary": "继续公开问责，或明确停止追查、自封剑冢。后者不是成功守山的别名。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "enlighten-compiled-case",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "course-chosen"
        ],
        "sequence": [],
        "choices": [
          "continue",
          "seal"
        ],
        "sources": [
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 113,
            "node": "enlighten_compile"
          },
          {
            "file": "src/lib/story/endings.ts",
            "line": 391,
            "node": "ending_enlighten_sword_seal"
          }
        ],
        "volumeLabel": "证道长线",
        "sinceRevision": 4
      },
      "enlighten-sword-seal": {
        "id": "enlighten-sword-seal",
        "title": "剑冢里未问完的事",
        "summary": "你明确停止追查，必须把未结卷宗与职责交代清楚，再封住自己的出口。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "enlighten-case-direction",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "enlighten-case-direction",
              "id": "seal"
            },
            {
              "type": "partner",
              "id": "none"
            }
          ],
          "any": []
        },
        "objectives": [
          "enlighten-sword-seal-dossier",
          "enlighten-sword-seal-sword",
          "enlighten-sword-seal-gate"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 391,
            "node": "ending_enlighten_sword_seal"
          }
        ],
        "volumeLabel": "证道长线",
        "sinceRevision": 4
      },
      "enlighten-public-trial": {
        "id": "enlighten-public-trial",
        "title": "三证人在金顶",
        "summary": "让每位证人有自己的发言顺序，再面对被揭面的玄玑。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "enlighten-case-direction",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "enlighten-case-direction",
              "id": "continue"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "enlighten-public-trial-witnesses",
          "enlighten-public-trial-present",
          "enlighten-public-trial-battle",
          "enlighten-public-trial-record"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 728,
            "node": "enlighten_3_witnesses"
          },
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 384,
            "node": "enlighten_xuanji_unmask"
          },
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 763,
            "node": "enlighten_allied_attack"
          }
        ],
        "volumeLabel": "证道长线",
        "sinceRevision": 4
      },
      "enlighten-huashen-trial": {
        "id": "enlighten-huashen-trial",
        "title": "公议后的化神护持",
        "summary": "以实际护证和守心为准备，两段劫战完成后才交付突破。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "enlighten-public-trial",
              "status": "claimed"
            },
            {
              "type": "realm",
              "id": "yuanying"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "enlighten-huashen-trial-first",
          "enlighten-huashen-trial-second"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 422,
            "node": "enlighten_master_trial"
          }
        ],
        "volumeLabel": "证道长线",
        "sinceRevision": 4,
        "trial": true
      },
      "enlighten-master-trial": {
        "id": "enlighten-master-trial",
        "title": "师罪也应当说清",
        "summary": "清微的帮助与隐瞒都应真实呈现，承担问责而不是一句道歉覆盖旧案。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "enlighten-huashen-trial",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "enlighten-master-trial-letter",
          "enlighten-master-trial-testimony",
          "enlighten-master-trial-penance"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 368,
            "node": "enlighten_qingwei_confess"
          },
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 422,
            "node": "enlighten_master_trial"
          },
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 790,
            "node": "enlighten_master_retire"
          }
        ],
        "volumeLabel": "证道长线",
        "sinceRevision": 4
      },
      "enlighten-treaty": {
        "id": "enlighten-treaty",
        "title": "归元之约的三十年",
        "summary": "通商、破约、义学、正式签约各有实际事务与承担者。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "enlighten-master-trial",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "enlighten-treaty-receive",
          "enlighten-treaty-south",
          "enlighten-treaty-five-trade",
          "enlighten-treaty-ten-rebellion",
          "enlighten-treaty-twenty-school",
          "enlighten-treaty-thirty-sign"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 447,
            "node": "enlighten_treaty_year_5"
          },
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 459,
            "node": "enlighten_treaty_year_10_rebellion"
          },
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 484,
            "node": "enlighten_treaty_year_20_school"
          },
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 496,
            "node": "enlighten_treaty_year_30_sign"
          }
        ],
        "volumeLabel": "证道长线",
        "sinceRevision": 4
      },
      "enlighten-personal-farewell": {
        "id": "enlighten-personal-farewell",
        "title": "承诺之后仍要照护的人",
        "summary": "先核人各自的愿望与生活，再面对不可代替的自然告别。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "enlighten-treaty",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "enlighten-personal-farewell-shen-wish",
          "enlighten-personal-farewell-shen-farewell",
          "enlighten-personal-farewell-qingwei-farewell",
          "enlighten-personal-farewell-successors"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 523,
            "node": "enlighten_year_50_lingwei"
          },
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 540,
            "node": "enlighten_year_60_master_pass"
          },
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 840,
            "node": "enlighten_farewell_before_ascend"
          }
        ],
        "volumeLabel": "证道长线",
        "sinceRevision": 4
      },
      "enlighten-heti-trial": {
        "id": "enlighten-heti-trial",
        "title": "归元合体试炼",
        "summary": "以实际护证和守心为准备，两段劫战完成后才交付突破。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "enlighten-personal-farewell",
              "status": "claimed"
            },
            {
              "type": "realm",
              "id": "huashen"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "enlighten-heti-trial-first",
          "enlighten-heti-trial-second"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 555,
            "node": "enlighten_heti_prep"
          }
        ],
        "volumeLabel": "证道长线",
        "sinceRevision": 4,
        "trial": true
      },
      "enlighten-thirty-one": {
        "id": "enlighten-thirty-one",
        "title": "同登的人先说愿不愿",
        "summary": "三十位同行者和主角合计三十一人；人数来自自愿名册，绝不自动强拉已亡者。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "enlighten-heti-trial",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "enlighten-thirty-one-names",
          "enlighten-thirty-one-roles",
          "enlighten-thirty-one-exercise",
          "enlighten-thirty-one-check"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 605,
            "node": "enlighten_31_people"
          },
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 580,
            "node": "enlighten_final_tribulation_start"
          }
        ],
        "volumeLabel": "证道长线",
        "sinceRevision": 4
      },
      "enlighten-dacheng-trial": {
        "id": "enlighten-dacheng-trial",
        "title": "众生同度的大乘劫",
        "summary": "以实际护证和守心为准备，两段劫战完成后才交付突破。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "enlighten-thirty-one",
              "status": "claimed"
            },
            {
              "type": "realm",
              "id": "heti"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "enlighten-dacheng-trial-first",
          "enlighten-dacheng-trial-second"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 568,
            "node": "enlighten_dacheng_prep"
          }
        ],
        "volumeLabel": "证道长线",
        "sinceRevision": 4,
        "trial": true
      },
      "enlighten-final-vow": {
        "id": "enlighten-final-vow",
        "title": "天光之下保留自己的道",
        "summary": "共同开界与独守蜀山都有实际后续；不是在这里直接改结局标题。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "enlighten-dacheng-trial",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "course-chosen"
        ],
        "sequence": [],
        "choices": [
          "grand",
          "guard"
        ],
        "sources": [
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 840,
            "node": "enlighten_farewell_before_ascend"
          },
          {
            "file": "src/lib/story/branch_enlighten.ts",
            "line": 621,
            "node": "enlighten_ascend"
          }
        ],
        "volumeLabel": "证道长线",
        "sinceRevision": 4
      },
      "enlighten-open-common-heaven": {
        "id": "enlighten-open-common-heaven",
        "title": "同天之界由众人共同守成",
        "summary": "三组各完成一件真实护持，最后仍允许各自决定去留。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "enlighten-final-vow",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "enlighten-final-vow",
              "id": "grand"
            }
          ],
          "any": []
        },
        "objectives": [
          "enlighten-open-common-heaven-anchor",
          "enlighten-open-common-heaven-care",
          "enlighten-open-common-heaven-road",
          "enlighten-open-common-heaven-consent"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 261,
            "node": "ending_enlighten_grand"
          }
        ],
        "volumeLabel": "证道长线",
        "sinceRevision": 4
      },
      "enlighten-sword-guard": {
        "id": "enlighten-sword-guard",
        "title": "独守也有三种需要",
        "summary": "来犯、灾害与后继者都需要不同回应，千年守山由这三种真实代表事件展开。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "enlighten-final-vow",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "enlighten-final-vow",
              "id": "guard"
            },
            {
              "type": "partner",
              "id": "none"
            }
          ],
          "any": []
        },
        "objectives": [
          "enlighten-sword-guard-invasion",
          "enlighten-sword-guard-disaster",
          "enlighten-sword-guard-successor"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 369,
            "node": "ending_jindan_sword_sage"
          }
        ],
        "volumeLabel": "证道长线",
        "sinceRevision": 4
      },
      "mortal-renunciation": {
        "id": "mortal-renunciation",
        "title": "归凡前，先把旧责说清",
        "summary": "散功会实际停止修为、灵力与法宝被动；收藏和突破历史保留。先保管恢复点，再由本人决定。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "jindan-crossroads",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "mortal-list-responsibilities",
          "mortal-store-implements",
          "course-chosen"
        ],
        "sequence": [],
        "choices": [
          "renounce"
        ],
        "sources": [
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 17,
            "node": "mortal_dispel"
          }
        ],
        "volumeLabel": "归凡长线",
        "sinceRevision": 4
      },
      "mortal-livelihood": {
        "id": "mortal-livelihood",
        "title": "凡人的一间屋",
        "summary": "从短工、修屋与种药开始，普通身体不靠御剑越水或施法施工。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "mortal-renunciation",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "mortal"
            }
          ],
          "any": []
        },
        "objectives": [
          "mortal-livelihood-work",
          "mortal-livelihood-seeds",
          "mortal-livelihood-roof",
          "mortal-livelihood-desk",
          "mortal-livelihood-plant",
          "mortal-livelihood-book"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 319,
            "node": "mortal_first_work"
          },
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 347,
            "node": "mortal_learn_farming"
          },
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 360,
            "node": "mortal_su_laotou"
          }
        ],
        "volumeLabel": "归凡长线",
        "sinceRevision": 4
      },
      "mortal-daily-care": {
        "id": "mortal-daily-care",
        "title": "饭食与自己的身体",
        "summary": "普通饭食、休息和自愿照护属于凡人日常，不按性别强制惩罚。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "mortal-livelihood",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "mortal"
            }
          ],
          "any": []
        },
        "objectives": [
          "mortal-care-receive",
          "course-chosen",
          "mortal-care-eat",
          "care-regular-receipt",
          "daily-care-complete",
          "care-cycle-receipt"
        ],
        "sequence": [],
        "choices": [
          "regular",
          "cycle"
        ],
        "sources": [
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 319,
            "node": "mortal_first_work"
          },
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 466,
            "node": "mortal_axing_nurse"
          }
        ],
        "volumeLabel": "归凡长线",
        "sinceRevision": 4,
        "optional": true,
        "requiredObjectives": [
          "mortal-care-receive",
          "course-chosen",
          "mortal-care-eat",
          "daily-care-complete"
        ]
      },
      "mortal-clinic-school": {
        "id": "mortal-clinic-school",
        "title": "医馆与课室一起开门",
        "summary": "阿杏保留独立出诊与采购，你们分别署名，不因亲近而减少教学或救人目标。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "mortal-livelihood",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "mortal"
            }
          ],
          "any": []
        },
        "objectives": [
          "mortal-clinic-school-divide",
          "mortal-clinic-school-literacy",
          "mortal-clinic-school-medicine",
          "mortal-clinic-school-register"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 123,
            "node": "female_common_jinlan_clinic"
          },
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 737,
            "node": "mortal_school_reopen"
          }
        ],
        "volumeLabel": "归凡长线",
        "sinceRevision": 4
      },
      "mortal-plague": {
        "id": "mortal-plague",
        "title": "三处病例，不漏一个名字",
        "summary": "先查病例与缺药，真实补料、配伍和分送；帮人不以结契为交换。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "mortal-clinic-school",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "mortal"
            }
          ],
          "any": []
        },
        "objectives": [
          "mortal-plague-clinic-sample",
          "mortal-plague-village-sample",
          "mortal-plague-road-sample",
          "mortal-plague-mix",
          "mortal-plague-axing",
          "mortal-plague-village",
          "mortal-plague-shelter"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 615,
            "node": "mortal_herb_manual_gate"
          },
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 646,
            "node": "mortal_axing_sick"
          },
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 142,
            "node": "female_common_jinlan_plague"
          }
        ],
        "volumeLabel": "归凡长线",
        "sinceRevision": 4
      },
      "mortal-flood": {
        "id": "mortal-flood",
        "title": "水来时先做哪一件",
        "summary": "救人或保粮先后不同，都会留下需要亲自补上的另一件事。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "mortal-plague",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "mortal"
            }
          ],
          "any": []
        },
        "objectives": [
          "mortal-flood-check",
          "course-chosen",
          "flood-people-receipt",
          "flood-priority-done",
          "flood-grain-receipt",
          "flood-people-repair",
          "flood-complete",
          "flood-grain-rescue"
        ],
        "sequence": [],
        "choices": [
          "people",
          "grain"
        ],
        "sources": [
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 778,
            "node": "mortal_flood"
          },
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 792,
            "node": "mortal_rebuild"
          }
        ],
        "volumeLabel": "归凡长线",
        "sinceRevision": 4,
        "requiredObjectives": [
          "mortal-flood-check",
          "course-chosen",
          "flood-priority-done",
          "flood-complete"
        ]
      },
      "mortal-rebuild": {
        "id": "mortal-rebuild",
        "title": "灾后屋与药圃都要回来",
        "summary": "用早先真实留种复种，重新整理受潮医案和学生名册。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "mortal-flood",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "mortal"
            }
          ],
          "any": []
        },
        "objectives": [
          "mortal-rebuild-seed",
          "mortal-rebuild-books",
          "mortal-rebuild-reopen"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 792,
            "node": "mortal_rebuild"
          },
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 737,
            "node": "mortal_school_reopen"
          }
        ],
        "volumeLabel": "归凡长线",
        "sinceRevision": 4
      },
      "mortal-life-years": {
        "id": "mortal-life-years",
        "title": "留下怎样的传承",
        "summary": "按入村时真正的年龄安排人生，不把晚年来访者写回青年。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "mortal-rebuild",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "mortal"
            }
          ],
          "any": []
        },
        "objectives": [
          "course-chosen",
          "mortal-years-early-1",
          "mortal-years-stage-1",
          "mortal-years-early-2",
          "mortal-years-stage-2",
          "mortal-years-early-3",
          "mortal-years-stage-3",
          "mortal-years-late-1",
          "mortal-years-late-2",
          "mortal-years-late-3"
        ],
        "sequence": [],
        "choices": [
          "early",
          "late"
        ],
        "sources": [
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 290,
            "node": "mortal_oldage"
          },
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 988,
            "node": "mortal_teacher_decades"
          },
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 895,
            "node": "mortal_anniversary"
          }
        ],
        "volumeLabel": "归凡长线",
        "sinceRevision": 4,
        "requiredObjectives": [
          "course-chosen",
          "mortal-years-stage-1",
          "mortal-years-stage-2",
          "mortal-years-stage-3"
        ]
      },
      "mortal-final-choice": {
        "id": "mortal-final-choice",
        "title": "杏树下各有自己的回答",
        "summary": "医馆、私塾、相守与临终重逢由已发生的关系与传承决定，不替人安排婚育。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "mortal-life-years",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "mortal"
            }
          ],
          "any": []
        },
        "objectives": [
          "course-chosen"
        ],
        "sequence": [],
        "choices": [
          "home",
          "teacher",
          "clinic",
          "reunion",
          "women"
        ],
        "sources": [
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 960,
            "node": "mortal_after_death"
          },
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 1014,
            "node": "mortal_teacher_last_class"
          },
          {
            "file": "src/lib/story/endings.ts",
            "line": 407,
            "node": "ending_mortal_doctor_return"
          }
        ],
        "volumeLabel": "归凡长线",
        "sinceRevision": 4
      },
      "mortal-home-farewell": {
        "id": "mortal-home-farewell",
        "title": "烟火一生的照护",
        "summary": "把已完成的生活交给后继者，再收束此生；具体关系以本人真实承诺为准。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "mortal-final-choice",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "mortal-final-choice",
              "id": "home"
            },
            {
              "type": "body",
              "id": "mortal"
            }
          ],
          "any": []
        },
        "objectives": [
          "mortal-home-farewell-care",
          "mortal-home-farewell-goodbye",
          "mortal-home-farewell-inherit"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 147,
            "node": "ending_mortal_family"
          }
        ],
        "volumeLabel": "归凡长线",
        "sinceRevision": 4
      },
      "mortal-teacher-legacy": {
        "id": "mortal-teacher-legacy",
        "title": "学生真正接过课堂",
        "summary": "把已完成的生活交给后继者，再收束此生；具体关系以本人真实承诺为准。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "mortal-final-choice",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "mortal-final-choice",
              "id": "teacher"
            },
            {
              "type": "body",
              "id": "mortal"
            }
          ],
          "any": []
        },
        "objectives": [
          "mortal-teacher-legacy-lesson",
          "mortal-teacher-legacy-student",
          "mortal-teacher-legacy-name"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 164,
            "node": "ending_mortal_teacher"
          }
        ],
        "volumeLabel": "归凡长线",
        "sinceRevision": 4
      },
      "mortal-clinic-legacy": {
        "id": "mortal-clinic-legacy",
        "title": "杏春堂继续开门",
        "summary": "把已完成的生活交给后继者，再收束此生；具体关系以本人真实承诺为准。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "mortal-final-choice",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "mortal-final-choice",
              "id": "clinic"
            },
            {
              "type": "body",
              "id": "mortal"
            }
          ],
          "any": []
        },
        "objectives": [
          "mortal-clinic-legacy-cases",
          "mortal-clinic-legacy-fees",
          "mortal-clinic-legacy-handoff"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 407,
            "node": "ending_mortal_doctor_return"
          }
        ],
        "volumeLabel": "归凡长线",
        "sinceRevision": 4
      },
      "mortal-flute-reunion": {
        "id": "mortal-flute-reunion",
        "title": "守庐、修笛与成年初见",
        "summary": "把已完成的生活交给后继者，再收束此生；具体关系以本人真实承诺为准。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "mortal-final-choice",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "mortal-final-choice",
              "id": "reunion"
            },
            {
              "type": "body",
              "id": "mortal"
            }
          ],
          "any": []
        },
        "objectives": [
          "mortal-flute-reunion-care",
          "mortal-flute-reunion-goodbye",
          "mortal-flute-reunion-repair"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 312,
            "node": "ending_mortal_reunion_peace"
          }
        ],
        "volumeLabel": "归凡长线",
        "sinceRevision": 4
      },
      "mortal-women-clinic": {
        "id": "mortal-women-clinic",
        "title": "杏林同心，两人都有姓名",
        "summary": "把已完成的生活交给后继者，再收束此生；具体关系以本人真实承诺为准。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "mortal-final-choice",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "mortal-final-choice",
              "id": "women"
            },
            {
              "type": "body",
              "id": "mortal"
            }
          ],
          "any": []
        },
        "objectives": [
          "mortal-women-clinic-own-goals",
          "mortal-women-clinic-shared-class",
          "mortal-women-clinic-sign",
          "mortal-women-clinic-promise"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 123,
            "node": "female_common_jinlan_clinic"
          }
        ],
        "volumeLabel": "归凡长线",
        "sinceRevision": 4
      },
      "loop-investigation": {
        "id": "loop-investigation",
        "title": "三片碎影必须先查清",
        "summary": "核验南北东西的真实裂纹与护魂记录，不借原来未有的碎片跳过调查。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "jindan-crossroads",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": [
            {
              "type": "choice",
              "task": "wander-road-choice",
              "id": "loop"
            },
            {
              "type": "choice",
              "task": "demon-future-choice",
              "id": "guardian"
            },
            {
              "type": "task",
              "id": "dacheng-preparation",
              "status": "claimed"
            }
          ]
        },
        "objectives": [
          "loop-investigation-south",
          "loop-investigation-east",
          "loop-investigation-north",
          "loop-investigation-hairpin"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_loop.ts",
            "line": 21,
            "node": "loop_shard_wander"
          },
          {
            "file": "src/lib/story/branch_loop.ts",
            "line": 38,
            "node": "loop_shard_glow"
          },
          {
            "file": "src/lib/story/branch_loop.ts",
            "line": 224,
            "node": "loop_shard_react"
          }
        ],
        "volumeLabel": "轮回长线",
        "sinceRevision": 4
      },
      "loop-awakening": {
        "id": "loop-awakening",
        "title": "先分清记忆与当下",
        "summary": "确认这是已逝经历的回忆，不能带走旧世物资、替现实人物复活，也不由旧世婚姻改变今生承诺。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "loop-investigation",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "loop-awakening-identity",
          "loop-awakening-boundaries",
          "loop-awakening-door"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_loop.ts",
            "line": 126,
            "node": "loop_awaken"
          },
          {
            "file": "src/lib/story/branch_loop.ts",
            "line": 436,
            "node": "loop_memory_all"
          },
          {
            "file": "src/lib/story/branch_loop.ts",
            "line": 161,
            "node": "loop_truth"
          }
        ],
        "volumeLabel": "轮回长线",
        "sinceRevision": 4
      },
      "loop-life-general": {
        "id": "loop-life-general",
        "title": "第五世 · 忠义与退路",
        "summary": "这是回忆中的真实操作；不授予今生物品、关系或战争记录。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "loop-awakening",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "memory-door-open",
          "loop-life-general-read",
          "loop-life-general-evacuate",
          "loop-life-general-hold",
          "loop-life-general-leave"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_loop.ts",
            "line": 274,
            "node": "loop_life_5"
          }
        ],
        "volumeLabel": "轮回长线",
        "sinceRevision": 4
      },
      "loop-life-healer": {
        "id": "loop-life-healer",
        "title": "第十世 · 医者与凡常一生",
        "summary": "这是回忆中的真实操作；不授予今生物品、关系或战争记录。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "loop-life-general",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "memory-door-open",
          "loop-life-healer-prepare",
          "loop-life-healer-stranger",
          "loop-life-healer-village",
          "loop-life-healer-farewell"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_loop.ts",
            "line": 287,
            "node": "loop_life_10_full"
          }
        ],
        "volumeLabel": "轮回长线",
        "sinceRevision": 4
      },
      "loop-life-ruler": {
        "id": "loop-life-ruler",
        "title": "第三十七世 · 魔域守土之道",
        "summary": "这是回忆中的真实操作；不授予今生物品、关系或战争记录。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "loop-life-healer",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "memory-door-open",
          "loop-life-ruler-read",
          "loop-life-ruler-protect",
          "loop-life-ruler-trade",
          "loop-life-ruler-defend",
          "loop-life-ruler-truth"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_loop.ts",
            "line": 322,
            "node": "loop_life_37_full"
          }
        ],
        "volumeLabel": "轮回长线",
        "sinceRevision": 4
      },
      "loop-memory-review": {
        "id": "loop-memory-review",
        "title": "三段重历与九十六份记忆",
        "summary": "三段有实际任务的代表世完成后，其余九十六世只作记忆册复核，不声称重玩了九十九张地图。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "loop-life-ruler",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "loop-memory-review-general",
          "loop-memory-review-healer",
          "loop-memory-review-ruler",
          "loop-memory-review-others"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_loop.ts",
            "line": 369,
            "node": "loop_life_69_full"
          },
          {
            "file": "src/lib/story/branch_loop.ts",
            "line": 407,
            "node": "loop_life_98_full"
          },
          {
            "file": "src/lib/story/branch_loop.ts",
            "line": 436,
            "node": "loop_memory_all"
          },
          {
            "file": "src/lib/story/branch_loop.ts",
            "line": 449,
            "node": "loop_awaken_hall"
          }
        ],
        "volumeLabel": "轮回长线",
        "sinceRevision": 4
      },
      "loop-mill-investigation": {
        "id": "loop-mill-investigation",
        "title": "碾磨之前先救下名字",
        "summary": "先查飞升名册与碾磨流向，再护送无名魂影；真实救助之后才讨论四种道路。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "loop-memory-review",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "loop-mill-investigation-names",
          "loop-mill-investigation-west",
          "loop-mill-investigation-guard",
          "loop-mill-investigation-east",
          "loop-mill-investigation-dock"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_loop.ts",
            "line": 495,
            "node": "loop_truth_mill"
          },
          {
            "file": "src/lib/story/branch_loop.ts",
            "line": 507,
            "node": "loop_truth_reincarnation"
          },
          {
            "file": "src/lib/story/branch_loop.ts",
            "line": 769,
            "node": "loop_mill_purpose"
          }
        ],
        "volumeLabel": "轮回长线",
        "sinceRevision": 4
      },
      "loop-path-choice": {
        "id": "loop-path-choice",
        "title": "知道代价之后再择路",
        "summary": "碎轮、共守、化入与返世铺路各有不同代价，需要完成各自的最后事务。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "loop-mill-investigation",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "course-chosen"
        ],
        "sequence": [],
        "choices": [
          "break",
          "guardian",
          "king",
          "road"
        ],
        "sources": [
          {
            "file": "src/lib/story/branch_loop.ts",
            "line": 520,
            "node": "loop_three_paths"
          },
          {
            "file": "src/lib/story/branch_loop.ts",
            "line": 786,
            "node": "loop_choice_real_3rd"
          },
          {
            "file": "src/lib/story/branch_loop.ts",
            "line": 495,
            "node": "loop_truth_mill"
          }
        ],
        "volumeLabel": "轮回长线",
        "sinceRevision": 4
      },
      "loop-break-wheel": {
        "id": "loop-break-wheel",
        "title": "碎轮之前给众生留下退路",
        "summary": "先完成实际护持与交接，再作最终确认。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "loop-path-choice",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "loop-path-choice",
              "id": "break"
            }
          ],
          "any": []
        },
        "objectives": [
          "loop-break-wheel-evacuate",
          "loop-break-wheel-ning-consent",
          "loop-break-wheel-break",
          "loop-break-wheel-aftermath",
          "loop-break-wheel-return"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_loop.ts",
            "line": 589,
            "node": "loop_break_final"
          },
          {
            "file": "src/lib/story/branch_loop.ts",
            "line": 206,
            "node": "loop_aftermath"
          },
          {
            "file": "src/lib/story/endings.ts",
            "line": 277,
            "node": "ending_forbidden_loop"
          }
        ],
        "volumeLabel": "轮回长线",
        "sinceRevision": 4
      },
      "loop-guardian-service": {
        "id": "loop-guardian-service",
        "title": "共同守门前的四份交托",
        "summary": "先完成实际护持与交接，再作最终确认。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "loop-path-choice",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "loop-path-choice",
              "id": "guardian"
            }
          ],
          "any": []
        },
        "objectives": [
          "loop-guardian-service-self",
          "loop-guardian-service-ning",
          "loop-guardian-service-lamp",
          "loop-guardian-service-handoff"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_loop.ts",
            "line": 555,
            "node": "loop_path_3"
          },
          {
            "file": "src/lib/story/branch_loop.ts",
            "line": 802,
            "node": "loop_fusion"
          },
          {
            "file": "src/lib/story/endings.ts",
            "line": 294,
            "node": "ending_loop_guardian"
          }
        ],
        "volumeLabel": "轮回长线",
        "sinceRevision": 4
      },
      "loop-incorporate-time": {
        "id": "loop-incorporate-time",
        "title": "化入之前先交还自己的名字",
        "summary": "先完成实际护持与交接，再作最终确认。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "loop-path-choice",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "loop-path-choice",
              "id": "king"
            }
          ],
          "any": []
        },
        "objectives": [
          "loop-incorporate-time-names",
          "loop-incorporate-time-consent",
          "loop-incorporate-time-axis",
          "loop-incorporate-time-warmth"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_loop.ts",
            "line": 495,
            "node": "loop_truth_mill"
          },
          {
            "file": "src/lib/story/endings.ts",
            "line": 431,
            "node": "ending_loop_samsara_king"
          }
        ],
        "volumeLabel": "轮回长线",
        "sinceRevision": 4
      },
      "loop-five-thousand-road": {
        "id": "loop-five-thousand-road",
        "title": "把看清的危险写给后来人",
        "summary": "先完成实际护持与交接，再作最终确认。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "loop-path-choice",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "loop-path-choice",
              "id": "road"
            }
          ],
          "any": []
        },
        "objectives": [
          "loop-five-thousand-road-promise",
          "loop-five-thousand-road-school",
          "loop-five-thousand-road-winter",
          "loop-five-thousand-road-peace",
          "loop-five-thousand-road-last"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/branch_loop.ts",
            "line": 648,
            "node": "loop_submit_return"
          },
          {
            "file": "src/lib/story/endings.ts",
            "line": 557,
            "node": "ending_dao_samsara"
          }
        ],
        "volumeLabel": "轮回长线",
        "sinceRevision": 4
      },
      "admission-overdraw": {
        "id": "admission-overdraw",
        "title": "读过戒示，再决定是否强引灵气",
        "summary": "正常运气可以另行在蒲团进行；强引未稳的灵气是主动危险选择，可能结束此生。",
        "requires": {
          "all": [],
          "any": []
        },
        "objectives": [
          "admission-decided"
        ],
        "sequence": [],
        "choices": [
          "force",
          "leave"
        ],
        "sources": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 103,
            "node": "ending_death"
          }
        ],
        "volumeLabel": "入门抉择",
        "sinceRevision": 4,
        "phase": "admission"
      },
      "forbidden-remnant": {
        "id": "forbidden-remnant",
        "title": "残魂的许诺与代价",
        "summary": "秘境结束后的一次短暂回访：先核残魂与过去的伤痕，再由本人决定是否吞噬；残魂的自称不能当已核真相。",
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
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "remnant-check-traces",
          "remnant-read-price",
          "course-chosen"
        ],
        "sequence": [],
        "choices": [
          "force",
          "refuse"
        ],
        "sources": [
          {
            "file": "src/lib/story/volume3.ts",
            "line": 227,
            "node": "jindan_secret_realm_choice"
          },
          {
            "file": "src/lib/story/endings.ts",
            "line": 77,
            "node": "ending_demon"
          }
        ],
        "volumeLabel": "金丹抉择",
        "sinceRevision": 4,
        "window": "jindan-remnant"
      },
      "huashen-desperate-defense": {
        "id": "huashen-desperate-defense",
        "title": "不待合体，先赴必死的守山战",
        "summary": "这是一条明确自愿的危险分歧：联军尚未练成，你可以取消并继续整备；承诺死守后须实际完成撤伤、分粮和阻敌。",
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
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "objectives": [
          "defense-committed",
          "last-stand-allocate",
          "last-stand-evacuate",
          "last-stand-rations",
          "last-stand-hold-line"
        ],
        "sequence": [],
        "choices": [
          "defend"
        ],
        "sources": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 578,
            "node": "ending_huashen_last_stand"
          }
        ],
        "volumeLabel": "守山抉择",
        "sinceRevision": 4,
        "window": "huashen-last-stand"
      },
      "female-sword-mandate": {
        "id": "female-sword-mandate",
        "title": "剑坪应向每个愿学的人开放",
        "summary": "灵薇有自己的求道与离山计划；先完成公平授剑与真实交接，不把关系亲疏写成她必须留下的理由。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "dacheng-breakthrough",
              "status": "claimed"
            },
            {
              "type": "gender",
              "id": "female"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": [
            {
              "type": "partner",
              "id": "none"
            },
            {
              "type": "partner",
              "id": "lingyun"
            }
          ]
        },
        "objectives": [
          "female-sword-mandate-lesson",
          "female-sword-mandate-practice",
          "female-sword-mandate-shen-wish",
          "female-sword-mandate-jade"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/volume4.ts",
            "line": 344,
            "node": "female_sword_final_duel_shen"
          },
          {
            "file": "src/lib/story/volume4.ts",
            "line": 392,
            "node": "female_sword_solitary_path"
          }
        ],
        "volumeLabel": "女剑修终章",
        "sinceRevision": 4,
        "window": "female-sword-living-witness"
      },
      "female-sword-choice": {
        "id": "female-sword-choice",
        "title": "印信之后，选择自己的守护",
        "summary": "独守不等于人物被迫孤独，共守也必须有本人明确道侣承诺；两条路各有最后实事。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "female-sword-mandate",
              "status": "claimed"
            },
            {
              "type": "gender",
              "id": "female"
            }
          ],
          "any": []
        },
        "objectives": [
          "course-chosen"
        ],
        "sequence": [],
        "choices": [
          "alone",
          "together"
        ],
        "sources": [
          {
            "file": "src/lib/story/volume4.ts",
            "line": 392,
            "node": "female_sword_solitary_path"
          },
          {
            "file": "src/lib/story/volume4.ts",
            "line": 411,
            "node": "female_brother_mountain_oath"
          }
        ],
        "volumeLabel": "女剑修终章",
        "sinceRevision": 4
      },
      "female-solitary-legacy": {
        "id": "female-solitary-legacy",
        "title": "她西行，你为后来者留剑坪",
        "summary": "先完成灵薇的自主告别，再把开放剑坪的制度与日常练习传下去。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "female-sword-choice",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "female-sword-choice",
              "id": "alone"
            },
            {
              "type": "token",
              "id": "female-leader-jade"
            },
            {
              "type": "token",
              "id": "female-leader-seal"
            }
          ],
          "any": []
        },
        "objectives": [
          "female-solitary-legacy-farewell",
          "female-solitary-legacy-charter",
          "female-solitary-legacy-watch"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/volume4.ts",
            "line": 344,
            "node": "female_sword_final_duel_shen"
          },
          {
            "file": "src/lib/story/endings.ts",
            "line": 457,
            "node": "ending_f_solitary_sword"
          }
        ],
        "volumeLabel": "女剑修终章",
        "sinceRevision": 4
      },
      "female-mountain-watch": {
        "id": "female-mountain-watch",
        "title": "以各自仍有的能力共同守山",
        "summary": "验旧尺与合玉，重新分工，再完成主角护阵与同伴照护的共同任务。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "female-sword-choice",
              "status": "claimed"
            },
            {
              "type": "choice",
              "task": "female-sword-choice",
              "id": "together"
            },
            {
              "type": "partner",
              "id": "lingyun"
            }
          ],
          "any": []
        },
        "objectives": [
          "female-mountain-watch-keepsakes",
          "female-mountain-watch-roles",
          "female-mountain-watch-watch",
          "female-mountain-watch-promise"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/volume4.ts",
            "line": 411,
            "node": "female_brother_mountain_oath"
          },
          {
            "file": "src/lib/story/endings.ts",
            "line": 467,
            "node": "ending_f_mountain_oath"
          }
        ],
        "volumeLabel": "女剑修终章",
        "sinceRevision": 4
      }
    },
    "actions": {
      "accept-journey-departure": {
        "id": "accept-journey-departure",
        "task": "journey-departure",
        "map": "jindan-retreat",
        "objectId": "retreatJourneyBoard",
        "kind": "accept",
        "label": "接下：行旅与旧案去向",
        "detail": "行旅不是抹去旧事。先整理已有案卷，再亲自选择下一段路。",
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
        "sinceRevision": 4
      },
      "read-journey-record": {
        "id": "read-journey-record",
        "task": "journey-departure",
        "map": "jindan-retreat",
        "objectId": "retreatJourneyBoard",
        "kind": "progress",
        "label": "核对三途与未结旧案",
        "detail": "记录此前选择，不赠新物或替你完成未走过的路。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "read-journey-record"
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
        "sinceRevision": 4
      },
      "depart-wander": {
        "id": "depart-wander",
        "task": "journey-departure",
        "map": "jindan-retreat",
        "objectId": "retreatJourneyBoard",
        "kind": "choice",
        "label": "先行江湖",
        "detail": "带着旧案下山，在青阳行医取证；之后仍可持真实证据回山。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "journey-departure",
              "id": "read-journey-record"
            }
          ],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "wander",
        "confirm": {
          "title": "先行江湖",
          "text": "带着旧案下山，在青阳行医取证；之后仍可持真实证据回山。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "depart-demon": {
        "id": "depart-demon",
        "task": "journey-departure",
        "map": "jindan-retreat",
        "objectId": "retreatJourneyBoard",
        "kind": "choice",
        "label": "主动赴魔域",
        "detail": "需要走完整魔域事务；与此后蜀山的同一场政变互斥，先保存恢复点。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "journey-departure",
              "id": "read-journey-record"
            }
          ],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "demon",
        "confirm": {
          "title": "主动赴魔域",
          "text": "需要走完整魔域事务；与此后蜀山的同一场政变互斥，先保存恢复点。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "depart-enlighten": {
        "id": "depart-enlighten",
        "task": "journey-departure",
        "map": "jindan-retreat",
        "objectId": "retreatJourneyBoard",
        "kind": "choice",
        "label": "以三证问道",
        "detail": "选择另起三证调查与公开问责，不能同时走另一套蜀山公审。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "journey-departure",
              "id": "read-journey-record"
            }
          ],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "enlighten",
        "confirm": {
          "title": "以三证问道",
          "text": "选择另起三证调查与公开问责，不能同时走另一套蜀山公审。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "depart-shushan": {
        "id": "depart-shushan",
        "task": "journey-departure",
        "map": "jindan-retreat",
        "objectId": "retreatJourneyBoard",
        "kind": "choice",
        "label": "沿原路归山",
        "detail": "保留原有蜀山正道行程；不因选择此路赠予其他长线物证。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "journey-departure",
              "id": "read-journey-record"
            }
          ],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "shushan",
        "confirm": {
          "title": "沿原路归山",
          "text": "保留原有蜀山正道行程；不因选择此路赠予其他长线物证。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "claim-journey-departure": {
        "id": "claim-journey-departure",
        "task": "journey-departure",
        "map": "jindan-retreat",
        "objectId": "retreatJourneyBoard",
        "kind": "claim",
        "label": "收好行旅登记",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-wander-charity": {
        "id": "accept-wander-charity",
        "task": "wander-charity",
        "map": "qingyang-charity",
        "objectId": "charityDoctor",
        "kind": "accept",
        "label": "接下：济善堂里的一席",
        "detail": "苏老头让你辨药，沈红叶请你先处理她的伤；医术从实际救助中学来。",
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
        "sinceRevision": 4
      },
      "charity-read-case": {
        "id": "charity-read-case",
        "task": "wander-charity",
        "map": "qingyang-charity",
        "objectId": "charityMedicineDesk",
        "kind": "progress",
        "label": "核对伤处与病案",
        "detail": "先辨明外伤和发热样本，决定使用堂中教学药样。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "charity-read-case"
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
        "sinceRevision": 4
      },
      "charity-gather-west": {
        "id": "charity-gather-west",
        "task": "wander-charity",
        "map": "qingyang-charity",
        "objectId": "charitySampleWest",
        "kind": "progress",
        "label": "取西圃教学样",
        "detail": "指定来源只取一次；此批材料专供这一病案。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-charity",
              "id": "charity-read-case"
            }
          ],
          "any": []
        },
        "marks": [
          "charity-gather-west"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "charity-herb-sample": 1
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "charity-gather-east": {
        "id": "charity-gather-east",
        "task": "wander-charity",
        "map": "qingyang-charity",
        "objectId": "charitySampleEast",
        "kind": "progress",
        "label": "取东篮教学样",
        "detail": "指定来源只取一次；此批材料专供这一病案。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-charity",
              "id": "charity-read-case"
            }
          ],
          "any": []
        },
        "marks": [
          "charity-gather-east"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "charity-herb-sample": 1
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "charity-draw-water": {
        "id": "charity-draw-water",
        "task": "wander-charity",
        "map": "qingyang-charity",
        "objectId": "charityWater",
        "kind": "progress",
        "label": "量取净洗水",
        "detail": "指定来源只取一次；此批材料专供这一病案。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-charity",
              "id": "charity-read-case"
            }
          ],
          "any": []
        },
        "marks": [
          "charity-draw-water"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "charity-clean-water": 1
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "charity-sort": {
        "id": "charity-sort",
        "task": "wander-charity",
        "map": "qingyang-charity",
        "objectId": "charityMedicineDesk",
        "kind": "sequence",
        "label": "先分清叶脉与药样",
        "detail": "按病案次序配伍；错序重来不扣料，正确最后一步才扣两份教学药样和一份净洗水。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-charity",
              "id": "charity-gather-west"
            },
            {
              "type": "done",
              "task": "wander-charity",
              "id": "charity-gather-east"
            },
            {
              "type": "done",
              "task": "wander-charity",
              "id": "charity-draw-water"
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
        "sinceRevision": 4
      },
      "charity-wash": {
        "id": "charity-wash",
        "task": "wander-charity",
        "map": "qingyang-charity",
        "objectId": "charityMedicineDesk",
        "kind": "sequence",
        "label": "再净洗待用",
        "detail": "按病案次序配伍；错序重来不扣料，正确最后一步才扣两份教学药样和一份净洗水。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-charity",
              "id": "charity-gather-west"
            },
            {
              "type": "done",
              "task": "wander-charity",
              "id": "charity-gather-east"
            },
            {
              "type": "done",
              "task": "wander-charity",
              "id": "charity-draw-water"
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
        "sinceRevision": 4
      },
      "charity-apply": {
        "id": "charity-apply",
        "task": "wander-charity",
        "map": "qingyang-charity",
        "objectId": "charityMedicineDesk",
        "kind": "sequence",
        "label": "最后配好外敷药",
        "detail": "按病案次序配伍；错序重来不扣料，正确最后一步才扣两份教学药样和一份净洗水。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-charity",
              "id": "charity-gather-west"
            },
            {
              "type": "done",
              "task": "wander-charity",
              "id": "charity-gather-east"
            },
            {
              "type": "done",
              "task": "wander-charity",
              "id": "charity-draw-water"
            }
          ],
          "any": []
        },
        "marks": [
          "charity-medicine-ready"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "charity-herb-sample": 2,
            "charity-clean-water": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "charity-care-hongye": {
        "id": "charity-care-hongye",
        "task": "wander-charity",
        "map": "qingyang-charity",
        "objectId": "charityHongye",
        "kind": "progress",
        "label": "给沈红叶敷药并复核伤势",
        "detail": "她说明自己继续查案的打算，救助不等于恋爱或收她为徒。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-charity",
              "id": "charity-medicine-ready"
            }
          ],
          "any": []
        },
        "marks": [
          "charity-care-hongye"
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
        "sinceRevision": 4
      },
      "claim-wander-charity": {
        "id": "claim-wander-charity",
        "task": "wander-charity",
        "map": "qingyang-charity",
        "objectId": "charityDoctor",
        "kind": "claim",
        "label": "交还药具，收好医理抄本",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
            "wander-herb-manual"
          ],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "accept-wander-black-order": {
        "id": "accept-wander-black-order",
        "task": "wander-black-order",
        "map": "blackwind-stockade",
        "objectId": "stockadeCaptive",
        "kind": "accept",
        "label": "接下：黑风寨里留活证",
        "detail": "先查警哨与账页，再决定怎样保护囚客取令。",
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
        "sinceRevision": 4
      },
      "black-read-patrol": {
        "id": "black-read-patrol",
        "task": "wander-black-order",
        "map": "blackwind-stockade",
        "objectId": "stockadePatrol",
        "kind": "progress",
        "label": "观察警哨的传令次序",
        "detail": "确认两处游哨与主寨的联系，不碰未辨明的机关。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "black-read-patrol"
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
        "sinceRevision": 4
      },
      "black-copy-ledger": {
        "id": "black-copy-ledger",
        "task": "wander-black-order",
        "map": "blackwind-stockade",
        "objectId": "stockadeLedger",
        "kind": "progress",
        "label": "拓下库帐与黑令签押",
        "detail": "这份印记必须与真实令符现场对照。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "black-copy-ledger"
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
            "wander-blood-seal"
          ]
        },
        "sinceRevision": 4
      },
      "black-route-quiet": {
        "id": "black-route-quiet",
        "task": "wander-black-order",
        "map": "blackwind-stockade",
        "objectId": "stockadeCaptive",
        "kind": "choice",
        "label": "先断警护囚客",
        "detail": "先切断警哨，面对一名守卫；取令后仍要当面留供。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-black-order",
              "id": "black-read-patrol"
            },
            {
              "type": "done",
              "task": "wander-black-order",
              "id": "black-copy-ledger"
            }
          ],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "quiet",
        "confirm": {
          "title": "先断警护囚客",
          "text": "先切断警哨，面对一名守卫；取令后仍要当面留供。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "black-route-assault": {
        "id": "black-route-assault",
        "task": "wander-black-order",
        "map": "blackwind-stockade",
        "objectId": "stockadeCaptive",
        "kind": "choice",
        "label": "正面拦住寨卫",
        "detail": "与两名寨卫交战，胜后保全俘虏并收取供词。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-black-order",
              "id": "black-read-patrol"
            },
            {
              "type": "done",
              "task": "wander-black-order",
              "id": "black-copy-ledger"
            }
          ],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "assault",
        "confirm": {
          "title": "正面拦住寨卫",
          "text": "与两名寨卫交战，胜后保全俘虏并收取供词。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "black-quiet-fight": {
        "id": "black-quiet-fight",
        "task": "wander-black-order",
        "map": "blackwind-stockade",
        "objectId": "stockadeOrder",
        "kind": "battle",
        "label": "断警后拦住守令者",
        "detail": "只在胜利后记下保全令符的结果。",
        "requires": {
          "all": [
            {
              "type": "choice",
              "task": "wander-black-order",
              "id": "quiet"
            }
          ],
          "any": []
        },
        "marks": [
          "black-quiet-cleared",
          "black-order-secured"
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
        "sinceRevision": 4,
        "encounter": "black-quiet-fight-encounter"
      },
      "black-assault-fight": {
        "id": "black-assault-fight",
        "task": "wander-black-order",
        "map": "blackwind-stockade",
        "objectId": "stockadeOrder",
        "kind": "battle",
        "label": "正面守住令台与囚棚",
        "detail": "两名寨卫位置不同；守势、选目标与符药决定负担。",
        "requires": {
          "all": [
            {
              "type": "choice",
              "task": "wander-black-order",
              "id": "assault"
            }
          ],
          "any": []
        },
        "marks": [
          "black-assault-cleared",
          "black-order-secured"
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
        "sinceRevision": 4,
        "encounter": "black-assault-fight-encounter"
      },
      "black-take-order": {
        "id": "black-take-order",
        "task": "wander-black-order",
        "map": "blackwind-stockade",
        "objectId": "stockadeOrder",
        "kind": "progress",
        "label": "取令并比对焦账签押",
        "detail": "实物验真后才能作为八部或公诉凭证。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-black-order",
              "id": "black-order-secured"
            }
          ],
          "any": []
        },
        "marks": [
          "black-take-order"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [
            "wander-black-order"
          ],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "black-captive-testimony": {
        "id": "black-captive-testimony",
        "task": "wander-black-order",
        "map": "blackwind-stockade",
        "objectId": "stockadeCaptive",
        "kind": "progress",
        "label": "留下商旅愿意署名的供词",
        "detail": "见证者说清自己知道的事，不替他写未见之事。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-black-order",
              "id": "black-order-secured"
            }
          ],
          "any": []
        },
        "marks": [
          "black-captive-testimony"
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
            "wander-captive-testimony"
          ]
        },
        "sinceRevision": 4
      },
      "claim-wander-black-order": {
        "id": "claim-wander-black-order",
        "task": "wander-black-order",
        "map": "blackwind-stockade",
        "objectId": "stockadeCaptive",
        "kind": "claim",
        "label": "送商旅出寨",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "accept-wander-border-service": {
        "id": "accept-wander-border-service",
        "task": "wander-border-service",
        "map": "northern-border",
        "objectId": "borderCaptain",
        "kind": "accept",
        "label": "接下：关隘的一夜",
        "detail": "传令与补给都不足，选择先稳住伤员还是军粮，另一项由守军接手。",
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
        "sinceRevision": 4
      },
      "border-receive-kits": {
        "id": "border-receive-kits",
        "task": "wander-border-service",
        "map": "northern-border",
        "objectId": "borderOrders",
        "kind": "progress",
        "label": "核领担架与粮封",
        "detail": "两件各一份，实际选择只消耗相应用料；剩余为未用军资记录。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "border-receive-kits"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "border-stretcher-pack": 1,
            "border-grain-seal": 1
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "border-priority-medical": {
        "id": "border-priority-medical",
        "task": "wander-border-service",
        "map": "northern-border",
        "objectId": "borderCaptain",
        "kind": "choice",
        "label": "先转运伤员",
        "detail": "使用担架包，后续老军更愿为你作证；粮封留待守军。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-border-service",
              "id": "border-receive-kits"
            }
          ],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "medical",
        "confirm": {
          "title": "先转运伤员",
          "text": "使用担架包，后续老军更愿为你作证；粮封留待守军。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "border-priority-grain": {
        "id": "border-priority-grain",
        "task": "wander-border-service",
        "map": "northern-border",
        "objectId": "borderCaptain",
        "kind": "choice",
        "label": "先保住军粮",
        "detail": "使用防潮粮封，后续商队供给更稳；担架留待医帐。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-border-service",
              "id": "border-receive-kits"
            }
          ],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "grain",
        "confirm": {
          "title": "先保住军粮",
          "text": "使用防潮粮封，后续商队供给更稳；担架留待医帐。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "border-deliver-medical": {
        "id": "border-deliver-medical",
        "task": "wander-border-service",
        "map": "northern-border",
        "objectId": "borderMedical",
        "kind": "progress",
        "label": "将伤员移到医帐",
        "detail": "实际用去本件军营配给，保留另一件库存记录。",
        "requires": {
          "all": [
            {
              "type": "choice",
              "task": "wander-border-service",
              "id": "medical"
            }
          ],
          "any": []
        },
        "marks": [
          "border-medical-delivered",
          "border-priority-done"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "border-stretcher-pack": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "border-deliver-grain": {
        "id": "border-deliver-grain",
        "task": "wander-border-service",
        "map": "northern-border",
        "objectId": "borderGrain",
        "kind": "progress",
        "label": "封好粮车并送入棚",
        "detail": "实际用去本件军营配给，保留另一件库存记录。",
        "requires": {
          "all": [
            {
              "type": "choice",
              "task": "wander-border-service",
              "id": "grain"
            }
          ],
          "any": []
        },
        "marks": [
          "border-grain-delivered",
          "border-priority-done"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "border-grain-seal": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "border-hold-west": {
        "id": "border-hold-west",
        "task": "wander-border-service",
        "map": "northern-border",
        "objectId": "borderWestPost",
        "kind": "battle",
        "label": "守住西翼传令点",
        "detail": "守军分担另一侧压力；本次胜利只完成这一段边防。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-border-service",
              "id": "border-priority-done"
            }
          ],
          "any": []
        },
        "marks": [
          "border-hold-west"
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
        "sinceRevision": 4,
        "encounter": "border-hold-west-encounter"
      },
      "border-relay-order": {
        "id": "border-relay-order",
        "task": "wander-border-service",
        "map": "northern-border",
        "objectId": "borderEastPost",
        "kind": "progress",
        "label": "向东翼交接实际战况",
        "detail": "交接需先守住西翼，不能从一处重复点击当两处战线。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-border-service",
              "id": "border-hold-west"
            }
          ],
          "any": []
        },
        "marks": [
          "border-relay-order"
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
        "sinceRevision": 4
      },
      "claim-wander-border-service": {
        "id": "claim-wander-border-service",
        "task": "wander-border-service",
        "map": "northern-border",
        "objectId": "borderCaptain",
        "kind": "claim",
        "label": "收好营中通行铜符",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
            "wander-army-seal"
          ],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "accept-wander-prison-evidence": {
        "id": "accept-wander-prison-evidence",
        "task": "wander-prison-evidence",
        "map": "northern-border",
        "objectId": "borderPrisonOrder",
        "kind": "accept",
        "label": "接下：救出肯作证的老帅",
        "detail": "令符、证词与联名都必须来自具体的人；查清提审手续再救人。",
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
        "sinceRevision": 4
      },
      "marshal-check-army-seal": {
        "id": "marshal-check-army-seal",
        "task": "wander-prison-evidence",
        "map": "northern-border",
        "objectId": "borderPrisonOrder",
        "kind": "progress",
        "label": "核验铜符，领取提审封签",
        "detail": "铜符不耗；封签只有一份，开囚棚时实际使用。",
        "requires": {
          "all": [
            {
              "type": "token",
              "id": "wander-army-seal"
            }
          ],
          "any": []
        },
        "marks": [
          "marshal-check-army-seal"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "marshal-transfer-seal": 1
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "marshal-village-signatures": {
        "id": "marshal-village-signatures",
        "task": "wander-prison-evidence",
        "map": "qingyang-charity",
        "objectId": "charityLetters",
        "kind": "progress",
        "label": "请受助乡民各自核对署名",
        "detail": "不是替所有人统一写同意；可核验名单来自这次现场交接。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "marshal-village-signatures"
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
            "wander-village-signatures"
          ]
        },
        "sinceRevision": 4
      },
      "marshal-open-cell": {
        "id": "marshal-open-cell",
        "task": "wander-prison-evidence",
        "map": "blackwind-stockade",
        "objectId": "stockadeCell",
        "kind": "progress",
        "label": "按印开锁，移出老帅",
        "detail": "提审封签在这一步实际使用；旧锁妖塔钥匙不能替代。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-prison-evidence",
              "id": "marshal-check-army-seal"
            }
          ],
          "any": []
        },
        "marks": [
          "marshal-open-cell"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "marshal-transfer-seal": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "marshal-cover-exit": {
        "id": "marshal-cover-exit",
        "task": "wander-prison-evidence",
        "map": "blackwind-stockade",
        "objectId": "stockadePrisonRoll",
        "kind": "battle",
        "label": "掩护老帅离开囚棚",
        "detail": "胜利才完成转运；失败不重复扣已经用于开锁的封签。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-prison-evidence",
              "id": "marshal-open-cell"
            }
          ],
          "any": []
        },
        "marks": [
          "marshal-cover-exit"
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
        "sinceRevision": 4,
        "encounter": "marshal-cover-exit-encounter"
      },
      "marshal-take-testimony": {
        "id": "marshal-take-testimony",
        "task": "wander-prison-evidence",
        "map": "northern-border",
        "objectId": "borderTestimony",
        "kind": "progress",
        "label": "记录老帅亲自确认的证言",
        "detail": "救出老帅且有乡民联名后，分别记录军令与矿案所见。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-prison-evidence",
              "id": "marshal-cover-exit"
            },
            {
              "type": "done",
              "task": "wander-prison-evidence",
              "id": "marshal-village-signatures"
            }
          ],
          "any": []
        },
        "marks": [
          "marshal-take-testimony"
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
            "wander-marshal-testimony"
          ]
        },
        "sinceRevision": 4
      },
      "claim-wander-prison-evidence": {
        "id": "claim-wander-prison-evidence",
        "task": "wander-prison-evidence",
        "map": "northern-border",
        "objectId": "borderTestimony",
        "kind": "claim",
        "label": "封存三方证卷",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "accept-wander-icefield-survey": {
        "id": "accept-wander-icefield-survey",
        "task": "wander-icefield-survey",
        "map": "icefield-cavern",
        "objectId": "iceMiner",
        "kind": "accept",
        "label": "接下：古洞的三道异纹",
        "detail": "确认三处冰纹同源，也照料困在矿道的伤者，才离开冰原。",
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
        "sinceRevision": 4
      },
      "ice-survey-notes": {
        "id": "ice-survey-notes",
        "task": "wander-icefield-survey",
        "map": "icefield-cavern",
        "objectId": "iceMiner",
        "kind": "progress",
        "label": "听阿石指认三处裂冰",
        "detail": "他说明矿道风险并交一份护温药包，不泄露尚未查明的轮回真相。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "ice-survey-notes"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "icefield-warming-kit": 1
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "ice-take-south": {
        "id": "ice-take-south",
        "task": "wander-icefield-survey",
        "map": "icefield-cavern",
        "objectId": "iceSampleSouth",
        "kind": "progress",
        "label": "取南裂冰上的异纹片",
        "detail": "此处只取一枚，保留三个地点各自的记录。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-icefield-survey",
              "id": "ice-survey-notes"
            }
          ],
          "any": []
        },
        "marks": [
          "ice-take-south"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "icefield-fragment": 1
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "ice-take-east": {
        "id": "ice-take-east",
        "task": "wander-icefield-survey",
        "map": "icefield-cavern",
        "objectId": "iceSampleEast",
        "kind": "progress",
        "label": "取东矿脉中的异纹片",
        "detail": "此处只取一枚，保留三个地点各自的记录。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-icefield-survey",
              "id": "ice-survey-notes"
            }
          ],
          "any": []
        },
        "marks": [
          "ice-take-east"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "icefield-fragment": 1
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "ice-take-north": {
        "id": "ice-take-north",
        "task": "wander-icefield-survey",
        "map": "icefield-cavern",
        "objectId": "iceSampleNorth",
        "kind": "progress",
        "label": "取北冰台下的异纹片",
        "detail": "此处只取一枚，保留三个地点各自的记录。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-icefield-survey",
              "id": "ice-survey-notes"
            }
          ],
          "any": []
        },
        "marks": [
          "ice-take-north"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "icefield-fragment": 1
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "ice-rescue-miner": {
        "id": "ice-rescue-miner",
        "task": "wander-icefield-survey",
        "map": "icefield-cavern",
        "objectId": "icePatient",
        "kind": "progress",
        "label": "用护温药包安置伤者",
        "detail": "实际消耗药包；曾学医理帮助你理解过程，不替代救助。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-icefield-survey",
              "id": "ice-survey-notes"
            }
          ],
          "any": []
        },
        "marks": [
          "ice-rescue-miner"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "icefield-warming-kit": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "ice-fit-fragments": {
        "id": "ice-fit-fragments",
        "task": "wander-icefield-survey",
        "map": "icefield-cavern",
        "objectId": "iceTablet",
        "kind": "progress",
        "label": "在古洞印纹前比合三片",
        "detail": "实际比合三片异纹时，随身旧狐簪传来微弱回应。你以洞口灯火护住残响，凝霜愿回济善堂护魂灯旁显相；她没有恢复肉身。这里只知异纹与狐簪相应，天门真相仍待查证。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-icefield-survey",
              "id": "ice-take-south"
            },
            {
              "type": "done",
              "task": "wander-icefield-survey",
              "id": "ice-take-east"
            },
            {
              "type": "done",
              "task": "wander-icefield-survey",
              "id": "ice-take-north"
            },
            {
              "type": "legacyToken",
              "id": "foxHairpin"
            }
          ],
          "any": []
        },
        "marks": [
          "ice-fit-fragments"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "icefield-fragment": 3
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [
            "wander-loop-shard"
          ],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "claim-wander-icefield-survey": {
        "id": "claim-wander-icefield-survey",
        "task": "wander-icefield-survey",
        "map": "icefield-cavern",
        "objectId": "iceMiner",
        "kind": "claim",
        "label": "收好古洞勘记",
        "detail": "收妥古洞勘记，将依托狐簪的凝霜残响带到济善堂护魂灯旁。此后可听她本人说明护魂意愿，不把回响当成肉体复活。",
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
        "sinceRevision": 4
      },
      "accept-wander-road-years": {
        "id": "accept-wander-road-years",
        "task": "wander-road-years",
        "map": "qingyang-charity",
        "objectId": "charityTravelBook",
        "kind": "accept",
        "label": "接下：江湖十年，有处可归",
        "detail": "巡行不是一页空白年表。亲自把药货、证卷与护温所需送到不同地方。",
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
        "sinceRevision": 4
      },
      "roads-load-parcels": {
        "id": "roads-load-parcels",
        "task": "wander-road-years",
        "map": "qingyang-charity",
        "objectId": "charityTravelBook",
        "kind": "progress",
        "label": "核领三份巡行封装",
        "detail": "分别送医堂、边关与冰原；每份仅在实际交货时扣除。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "roads-load-parcels"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "wander-route-parcel": 3
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "roads-clinic-year": {
        "id": "roads-clinic-year",
        "task": "wander-road-years",
        "map": "qingyang-charity",
        "objectId": "charityDoctor",
        "kind": "progress",
        "label": "第一程：交济善堂药货",
        "detail": "这批交接会推进明确行旅年份；人物年龄随真实经历增长。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-road-years",
              "id": "roads-load-parcels"
            }
          ],
          "any": []
        },
        "marks": [
          "roads-clinic-year"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "wander-route-parcel": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "roads-border-years": {
        "id": "roads-border-years",
        "task": "wander-road-years",
        "map": "northern-border",
        "objectId": "borderMedical",
        "kind": "progress",
        "label": "第二程：交边关救护药货",
        "detail": "这批交接会推进明确行旅年份；人物年龄随真实经历增长。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-road-years",
              "id": "roads-clinic-year"
            }
          ],
          "any": []
        },
        "marks": [
          "roads-border-years"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "wander-route-parcel": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "roads-ice-years": {
        "id": "roads-ice-years",
        "task": "wander-road-years",
        "map": "icefield-cavern",
        "objectId": "iceMiner",
        "kind": "progress",
        "label": "第三程：交冰原护温药货",
        "detail": "这批交接会推进明确行旅年份；人物年龄随真实经历增长。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-road-years",
              "id": "roads-border-years"
            }
          ],
          "any": []
        },
        "marks": [
          "roads-ice-years"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "wander-route-parcel": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "claim-wander-road-years": {
        "id": "claim-wander-road-years",
        "task": "wander-road-years",
        "map": "qingyang-charity",
        "objectId": "charityTravelBook",
        "kind": "claim",
        "label": "封存十年路册",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
            "wander-route-map"
          ],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "accept-wander-road-choice": {
        "id": "accept-wander-road-choice",
        "task": "wander-road-choice",
        "map": "qingyang-charity",
        "objectId": "charityTravelBook",
        "kind": "accept",
        "label": "接下：十年之后的路",
        "detail": "把走过的事与尚未解决的代价放在桌上，再决定下一段承诺。",
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
        "sinceRevision": 4
      },
      "wander-decide-alone": {
        "id": "wander-decide-alone",
        "task": "wander-road-choice",
        "map": "qingyang-charity",
        "objectId": "charityTravelBook",
        "kind": "choice",
        "label": "继续独行九州",
        "detail": "完成路册交接，保持独立游侠身份。",
        "requires": {
          "all": [
            {
              "type": "partner",
              "id": "none"
            }
          ],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "alone",
        "confirm": {
          "title": "继续独行九州",
          "text": "完成路册交接，保持独立游侠身份。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "wander-decide-legend": {
        "id": "wander-decide-legend",
        "task": "wander-road-choice",
        "map": "qingyang-charity",
        "objectId": "charityTravelBook",
        "kind": "choice",
        "label": "交出证据，退入江湖",
        "detail": "先把证据交给查案者，再与凝霜讨论是否同行；不自动结契。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "legend",
        "confirm": {
          "title": "交出证据，退入江湖",
          "text": "先把证据交给查案者，再与凝霜讨论是否同行；不自动结契。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "wander-decide-reunion": {
        "id": "wander-decide-reunion",
        "task": "wander-road-choice",
        "map": "qingyang-charity",
        "objectId": "charityTravelBook",
        "kind": "choice",
        "label": "持完整证卷回山",
        "detail": "先补敌将供词，再在金顶当面举证；不是证据不足却宣告胜诉。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "reunion",
        "confirm": {
          "title": "持完整证卷回山",
          "text": "先补敌将供词，再在金顶当面举证；不是证据不足却宣告胜诉。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "wander-decide-blacklord": {
        "id": "wander-decide-blacklord",
        "task": "wander-road-choice",
        "map": "qingyang-charity",
        "objectId": "charityTravelBook",
        "kind": "choice",
        "label": "持黑令整合八部",
        "detail": "必须实际整军立规；旧友会因威压而离开，凝霜不是自动魔后。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "blacklord",
        "confirm": {
          "title": "持黑令整合八部",
          "text": "必须实际整军立规；旧友会因威压而离开，凝霜不是自动魔后。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "wander-decide-medical": {
        "id": "wander-decide-medical",
        "task": "wander-road-choice",
        "map": "qingyang-charity",
        "objectId": "charityTravelBook",
        "kind": "choice",
        "label": "放剑行医",
        "detail": "完成三地救治、交剑为药具与医道护持，保留行医的独立人生。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "medical",
        "confirm": {
          "title": "放剑行医",
          "text": "完成三地救治、交剑为药具与医道护持，保留行医的独立人生。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "wander-decide-laststand": {
        "id": "wander-decide-laststand",
        "task": "wander-road-choice",
        "map": "qingyang-charity",
        "objectId": "charityTravelBook",
        "kind": "choice",
        "label": "进入北荒最后守阵",
        "detail": "这是自愿承担不可逆生命代价的剧情末路；普通边防失败不会触发。先保管恢复点，再完成护证与殿后。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "laststand",
        "confirm": {
          "title": "进入北荒最后守阵",
          "text": "这是自愿承担不可逆生命代价的剧情末路；普通边防失败不会触发。先保管恢复点，再完成护证与殿后。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "claim-wander-road-choice": {
        "id": "claim-wander-road-choice",
        "task": "wander-road-choice",
        "map": "qingyang-charity",
        "objectId": "charityTravelBook",
        "kind": "claim",
        "label": "封存这次去向",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-wander-independent-farewell": {
        "id": "accept-wander-independent-farewell",
        "task": "wander-independent-farewell",
        "map": "qingyang-charity",
        "objectId": "charityMemorial",
        "kind": "accept",
        "label": "接下：独行者的路册",
        "detail": "把能帮助后来人的记录留下，亲自结清旧委托，再独行。",
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
        "sinceRevision": 4
      },
      "alone-mark-ice-path": {
        "id": "alone-mark-ice-path",
        "task": "wander-independent-farewell",
        "map": "icefield-cavern",
        "objectId": "iceTablet",
        "kind": "progress",
        "label": "标清冰原安全路径",
        "detail": "把真实踏过的桥与裂冰记入残图，留给矿工。",
        "requires": {
          "all": [
            {
              "type": "token",
              "id": "wander-route-map"
            }
          ],
          "any": []
        },
        "marks": [
          "alone-mark-ice-path"
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
        "sinceRevision": 4
      },
      "alone-close-commissions": {
        "id": "alone-close-commissions",
        "task": "wander-independent-farewell",
        "map": "qingyang-charity",
        "objectId": "charityTravelBook",
        "kind": "progress",
        "label": "结清委托，把副册交给后来人",
        "detail": "不注销收藏与相识，只结束这段承担过的职责。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-independent-farewell",
              "id": "alone-mark-ice-path"
            }
          ],
          "any": []
        },
        "marks": [
          "alone-close-commissions"
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
        "sinceRevision": 4
      },
      "claim-wander-independent-farewell": {
        "id": "claim-wander-independent-farewell",
        "task": "wander-independent-farewell",
        "map": "qingyang-charity",
        "objectId": "charityMemorial",
        "kind": "claim",
        "label": "带着自己的路离开",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-wander-legend-handoff": {
        "id": "accept-wander-legend-handoff",
        "task": "wander-legend-handoff",
        "map": "qingyang-charity",
        "objectId": "charityLetters",
        "kind": "accept",
        "label": "接下：江湖夜雨前的一次交接",
        "detail": "把各自署名的证卷交给能继续查案的人，再决定同行。",
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
        "sinceRevision": 4
      },
      "legend-official-dossier": {
        "id": "legend-official-dossier",
        "task": "wander-legend-handoff",
        "map": "qingyang-charity",
        "objectId": "charityLetters",
        "kind": "progress",
        "label": "将三方证卷交付六扇门转办",
        "detail": "沈红叶确认丈夫所在衙门接收，官府查案不等于替主角公开所有个人记忆。",
        "requires": {
          "all": [
            {
              "type": "evidence",
              "id": "wander-captive-testimony"
            },
            {
              "type": "evidence",
              "id": "wander-marshal-testimony"
            },
            {
              "type": "evidence",
              "id": "wander-village-signatures"
            }
          ],
          "any": []
        },
        "marks": [
          "legend-official-dossier"
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
        "sinceRevision": 4
      },
      "legend-return-order-copy": {
        "id": "legend-return-order-copy",
        "task": "wander-legend-handoff",
        "map": "jindan-retreat",
        "objectId": "retreatJourneyBoard",
        "kind": "progress",
        "label": "交黑令拓印供蜀山追查",
        "detail": "只交拓印，真实令符与收藏历史仍保留。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-legend-handoff",
              "id": "legend-official-dossier"
            },
            {
              "type": "token",
              "id": "wander-black-order"
            }
          ],
          "any": []
        },
        "marks": [
          "legend-return-order-copy"
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
        "sinceRevision": 4
      },
      "legend-ning-response": {
        "id": "legend-ning-response",
        "task": "wander-legend-handoff",
        "map": "qingyang-charity",
        "objectId": "charityNing",
        "kind": "progress",
        "label": "听凝霜说明自己的行程",
        "detail": "她愿在冰原护魂路上与你同行一程。已有道侣关系如实回顾，朋友同行不另写情爱。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-legend-handoff",
              "id": "legend-return-order-copy"
            }
          ],
          "any": []
        },
        "marks": [
          "legend-ning-response"
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
        "sinceRevision": 4
      },
      "legend-cover-last-caravan": {
        "id": "legend-cover-last-caravan",
        "task": "wander-legend-handoff",
        "map": "northern-border",
        "objectId": "borderEastPost",
        "kind": "battle",
        "label": "护最后一队药车出关",
        "detail": "不同于此前西翼防守，这是离开前的东翼护送。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-legend-handoff",
              "id": "legend-ning-response"
            }
          ],
          "any": []
        },
        "marks": [
          "legend-cover-last-caravan"
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
        "sinceRevision": 4,
        "encounter": "legend-cover-last-caravan-encounter"
      },
      "claim-wander-legend-handoff": {
        "id": "claim-wander-legend-handoff",
        "task": "wander-legend-handoff",
        "map": "qingyang-charity",
        "objectId": "charityNing",
        "kind": "claim",
        "label": "辞别这一程江湖",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-wander-return-trial": {
        "id": "accept-wander-return-trial",
        "task": "wander-return-trial",
        "map": "northern-border",
        "objectId": "borderPrisonOrder",
        "kind": "accept",
        "label": "接下：五证齐备再登金顶",
        "detail": "入口不足的证据必须真补齐，再向金顶说明十年所见。",
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
        "sinceRevision": 4
      },
      "reunion-capture-officer": {
        "id": "reunion-capture-officer",
        "task": "wander-return-trial",
        "map": "northern-border",
        "objectId": "borderEastPost",
        "kind": "battle",
        "label": "截住私通军令的敌将",
        "detail": "击败护卫并保留活口，才可取得亲口供词。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "reunion-capture-officer"
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
        "sinceRevision": 4,
        "encounter": "reunion-capture-officer-encounter"
      },
      "reunion-officer-testimony": {
        "id": "reunion-officer-testimony",
        "task": "wander-return-trial",
        "map": "northern-border",
        "objectId": "borderPrisonOrder",
        "kind": "progress",
        "label": "逐项询问军令与粮路",
        "detail": "供词只记录敌将承认并可核对的内容。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-return-trial",
              "id": "reunion-capture-officer"
            }
          ],
          "any": []
        },
        "marks": [
          "reunion-officer-testimony"
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
            "wander-enemy-confession"
          ]
        },
        "sinceRevision": 4
      },
      "reunion-present-five-proofs": {
        "id": "reunion-present-five-proofs",
        "task": "wander-return-trial",
        "map": "jindan-retreat",
        "objectId": "retreatJourneyBoard",
        "kind": "progress",
        "label": "排好五证，预约金顶公开呈案",
        "detail": "血符印、黑令、老帅证词、乡民联名、敌将供词缺一不能宣称铁证如山。",
        "requires": {
          "all": [
            {
              "type": "token",
              "id": "wander-black-order"
            },
            {
              "type": "evidence",
              "id": "wander-blood-seal"
            },
            {
              "type": "evidence",
              "id": "wander-marshal-testimony"
            },
            {
              "type": "evidence",
              "id": "wander-village-signatures"
            },
            {
              "type": "evidence",
              "id": "wander-enemy-confession"
            }
          ],
          "any": []
        },
        "marks": [
          "reunion-present-five-proofs"
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
        "sinceRevision": 4
      },
      "reunion-public-defense": {
        "id": "reunion-public-defense",
        "task": "wander-return-trial",
        "map": "golden-summit",
        "objectId": "wanderTrialDocket",
        "kind": "progress",
        "label": "当众逐项呈案，接受质询",
        "detail": "完整证卷经交叉核验，由公议交付查处，不复用未发生的化神公审结果。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-return-trial",
              "id": "reunion-present-five-proofs"
            }
          ],
          "any": []
        },
        "marks": [
          "reunion-public-defense"
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
        "sinceRevision": 4
      },
      "reunion-accept-protection-duty": {
        "id": "reunion-accept-protection-duty",
        "task": "wander-return-trial",
        "map": "golden-summit",
        "objectId": "wanderTrialDocket",
        "kind": "progress",
        "label": "接下保护凡人的外门巡察职责",
        "detail": "回山为行事之责，不把已经走过的江湖说成从未离山。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-return-trial",
              "id": "reunion-public-defense"
            }
          ],
          "any": []
        },
        "marks": [
          "reunion-accept-protection-duty"
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
        "sinceRevision": 4
      },
      "claim-wander-return-trial": {
        "id": "claim-wander-return-trial",
        "task": "wander-return-trial",
        "map": "golden-summit",
        "objectId": "wanderTrialDocket",
        "kind": "claim",
        "label": "以散修见证守住此案",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-wander-black-command": {
        "id": "accept-wander-black-command",
        "task": "wander-black-command",
        "map": "blackwind-stockade",
        "objectId": "stockadeOrder",
        "kind": "accept",
        "label": "接下：黑令之下的军纪",
        "detail": "八部响应一纸令符之前，先看你怎样处理粮、俘与旧友。",
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
        "sinceRevision": 4
      },
      "blacklord-count-grain": {
        "id": "blacklord-count-grain",
        "task": "wander-black-command",
        "map": "blackwind-stockade",
        "objectId": "stockadeLedger",
        "kind": "progress",
        "label": "核查八部所报粮册",
        "detail": "确认各部真实缺口，不能持令凭空生成十万兵。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "blacklord-count-grain"
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
        "sinceRevision": 4
      },
      "blacklord-stop-marauders": {
        "id": "blacklord-stop-marauders",
        "task": "wander-black-command",
        "map": "blackwind-stockade",
        "objectId": "stockadePrisonRoll",
        "kind": "battle",
        "label": "压住借令抢粮的兵众",
        "detail": "实际阻止一次劫粮，才能要求部众遵守不犯凡的军纪。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-black-command",
              "id": "blacklord-count-grain"
            }
          ],
          "any": []
        },
        "marks": [
          "blacklord-stop-marauders"
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
        "sinceRevision": 4,
        "encounter": "blacklord-stop-marauders-encounter"
      },
      "blacklord-release-captives": {
        "id": "blacklord-release-captives",
        "task": "wander-black-command",
        "map": "blackwind-stockade",
        "objectId": "stockadeCell",
        "kind": "progress",
        "label": "释放不涉案的囚客",
        "detail": "黑令不把普通人的生计变成军粮。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-black-command",
              "id": "blacklord-stop-marauders"
            }
          ],
          "any": []
        },
        "marks": [
          "blacklord-release-captives"
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
        "sinceRevision": 4
      },
      "blacklord-old-friend-farewell": {
        "id": "blacklord-old-friend-farewell",
        "task": "wander-black-command",
        "map": "qingyang-charity",
        "objectId": "charityHongye",
        "kind": "progress",
        "label": "听旧友拒绝以威压追仇",
        "detail": "她承认救命之情，也明确拒绝参加魔道征讨；关系不会被一句话改写成效忠。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-black-command",
              "id": "blacklord-release-captives"
            }
          ],
          "any": []
        },
        "marks": [
          "blacklord-old-friend-farewell"
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
        "sinceRevision": 4
      },
      "blacklord-oath-command": {
        "id": "blacklord-oath-command",
        "task": "wander-black-command",
        "map": "northern-border",
        "objectId": "borderOrders",
        "kind": "progress",
        "label": "向八部立军令并承担其代价",
        "detail": "此路从游侠转向黑令统治，之后结束本次旅程；凝霜的道侣身份只认真实承诺。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-black-command",
              "id": "blacklord-old-friend-farewell"
            }
          ],
          "any": []
        },
        "marks": [
          "blacklord-oath-command"
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
        "sinceRevision": 4
      },
      "claim-wander-black-command": {
        "id": "claim-wander-black-command",
        "task": "wander-black-command",
        "map": "northern-border",
        "objectId": "borderOrders",
        "kind": "claim",
        "label": "执黑令走入下一段岁月",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-wander-medical-legacy": {
        "id": "accept-wander-medical-legacy",
        "task": "wander-medical-legacy",
        "map": "qingyang-charity",
        "objectId": "charitySuye",
        "kind": "accept",
        "label": "接下：把剑铸成药具",
        "detail": "医道不只一本书；三地实诊、三处交药、一次雪山救助之后，才谈传承。",
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
        "sinceRevision": 4
      },
      "medical-sample-clinic": {
        "id": "medical-sample-clinic",
        "task": "wander-medical-legacy",
        "map": "qingyang-charity",
        "objectId": "charityMedicineDesk",
        "kind": "progress",
        "label": "复核堂中外伤病案",
        "detail": "这批仅取本病例一个实际样本，不重复发此前教学药样。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "medical-sample-clinic"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "wandering-clinic-sample": 1
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "medical-sample-border": {
        "id": "medical-sample-border",
        "task": "wander-medical-legacy",
        "map": "northern-border",
        "objectId": "borderMedical",
        "kind": "progress",
        "label": "复核营中寒伤病案",
        "detail": "这批仅取本病例一个实际样本，不重复发此前教学药样。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "medical-sample-border"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "wandering-clinic-sample": 1
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "medical-sample-ice": {
        "id": "medical-sample-ice",
        "task": "wander-medical-legacy",
        "map": "icefield-cavern",
        "objectId": "icePatient",
        "kind": "progress",
        "label": "复核雪山久困病案",
        "detail": "这批仅取本病例一个实际样本，不重复发此前教学药样。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "medical-sample-ice"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "wandering-clinic-sample": 1
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "medical-compile-remedy": {
        "id": "medical-compile-remedy",
        "task": "wander-medical-legacy",
        "map": "qingyang-charity",
        "objectId": "charityMedicineDesk",
        "kind": "progress",
        "label": "与苏叶比对三案，分装三份药",
        "detail": "使用三份实诊药样，产出三份专供原病人的定量成药；不展示现实药物剂量。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-medical-legacy",
              "id": "medical-sample-clinic"
            },
            {
              "type": "done",
              "task": "wander-medical-legacy",
              "id": "medical-sample-border"
            },
            {
              "type": "done",
              "task": "wander-medical-legacy",
              "id": "medical-sample-ice"
            }
          ],
          "any": []
        },
        "marks": [
          "medical-compile-remedy"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "wandering-clinic-sample": 3
          }
        },
        "grant": {
          "items": {},
          "supplies": {
            "wandering-clinic-dose": 3
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "medical-deliver-clinic": {
        "id": "medical-deliver-clinic",
        "task": "wander-medical-legacy",
        "map": "qingyang-charity",
        "objectId": "charityMedicineDesk",
        "kind": "progress",
        "label": "实际为堂中外伤病人交药",
        "detail": "每处用一份；不能误饮、出售后让救治无药可用。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-medical-legacy",
              "id": "medical-compile-remedy"
            }
          ],
          "any": []
        },
        "marks": [
          "medical-deliver-clinic"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "wandering-clinic-dose": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "medical-deliver-border": {
        "id": "medical-deliver-border",
        "task": "wander-medical-legacy",
        "map": "northern-border",
        "objectId": "borderMedical",
        "kind": "progress",
        "label": "实际为营中寒伤病人交药",
        "detail": "每处用一份；不能误饮、出售后让救治无药可用。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-medical-legacy",
              "id": "medical-compile-remedy"
            }
          ],
          "any": []
        },
        "marks": [
          "medical-deliver-border"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "wandering-clinic-dose": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "medical-deliver-ice": {
        "id": "medical-deliver-ice",
        "task": "wander-medical-legacy",
        "map": "icefield-cavern",
        "objectId": "icePatient",
        "kind": "progress",
        "label": "实际为雪山久困病人交药",
        "detail": "每处用一份；不能误饮、出售后让救治无药可用。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-medical-legacy",
              "id": "medical-compile-remedy"
            }
          ],
          "any": []
        },
        "marks": [
          "medical-deliver-ice"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "wandering-clinic-dose": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "medical-forge-tool": {
        "id": "medical-forge-tool",
        "task": "wander-medical-legacy",
        "map": "qingyang-charity",
        "objectId": "charityForge",
        "kind": "progress",
        "label": "将行旅旧剑改成药锄",
        "detail": "这是专属行旅旧剑的交接，不销毁玩家已有装备收藏；你把以后行事的重点交给药具。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-medical-legacy",
              "id": "medical-deliver-clinic"
            },
            {
              "type": "done",
              "task": "wander-medical-legacy",
              "id": "medical-deliver-border"
            },
            {
              "type": "done",
              "task": "wander-medical-legacy",
              "id": "medical-deliver-ice"
            }
          ],
          "any": []
        },
        "marks": [
          "medical-forge-tool"
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
        "sinceRevision": 4
      },
      "medical-snow-ward": {
        "id": "medical-snow-ward",
        "task": "wander-medical-legacy",
        "map": "icefield-cavern",
        "objectId": "iceGateSeal",
        "kind": "battle",
        "label": "护住雪山伤者与医道灯",
        "detail": "医道劫仍由修为与战术应对，护持目标来自已完成的救人行动；苏叶作为成年同道独立署名。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-medical-legacy",
              "id": "medical-forge-tool"
            }
          ],
          "any": []
        },
        "marks": [
          "medical-snow-ward"
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
        "sinceRevision": 4,
        "encounter": "medical-snow-ward-encounter"
      },
      "medical-pass-casebook": {
        "id": "medical-pass-casebook",
        "task": "wander-medical-legacy",
        "map": "qingyang-charity",
        "objectId": "charitySuye",
        "kind": "progress",
        "label": "把合编医案交给独立行医的苏叶",
        "detail": "她保留自己的姓名、职业与人生，不成为玩家的养女或被指定婚配。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-medical-legacy",
              "id": "medical-snow-ward"
            }
          ],
          "any": []
        },
        "marks": [
          "medical-pass-casebook"
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
        "sinceRevision": 4
      },
      "claim-wander-medical-legacy": {
        "id": "claim-wander-medical-legacy",
        "task": "wander-medical-legacy",
        "map": "qingyang-charity",
        "objectId": "charityMedicineDesk",
        "kind": "claim",
        "label": "以医道走完这一程",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-wander-last-stand": {
        "id": "accept-wander-last-stand",
        "task": "wander-last-stand",
        "map": "northern-border",
        "objectId": "borderLastStand",
        "kind": "accept",
        "label": "接下：证词必须送出去",
        "detail": "在明确接受最后守阵代价前，把证词和撤离路线交给能活着离开的人。",
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
        "sinceRevision": 4
      },
      "laststand-send-testimony": {
        "id": "laststand-send-testimony",
        "task": "wander-last-stand",
        "map": "northern-border",
        "objectId": "borderTestimony",
        "kind": "progress",
        "label": "封证词送出关外",
        "detail": "使后来的查案者有据可循；此后战败仍可重试，不自动结束。",
        "requires": {
          "all": [
            {
              "type": "evidence",
              "id": "wander-marshal-testimony"
            }
          ],
          "any": []
        },
        "marks": [
          "laststand-send-testimony"
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
        "sinceRevision": 4
      },
      "laststand-mark-retreat": {
        "id": "laststand-mark-retreat",
        "task": "wander-last-stand",
        "map": "northern-border",
        "objectId": "borderMedical",
        "kind": "progress",
        "label": "把伤者撤离路交给医帐",
        "detail": "确认伤员已获撤离安排，最后一战不把平民当作必须牺牲的筹码。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-last-stand",
              "id": "laststand-send-testimony"
            }
          ],
          "any": []
        },
        "marks": [
          "laststand-mark-retreat"
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
        "sinceRevision": 4
      },
      "laststand-hold-gate": {
        "id": "laststand-hold-gate",
        "task": "wander-last-stand",
        "map": "northern-border",
        "objectId": "borderLastStand",
        "kind": "battle",
        "label": "最后守住关门缺口",
        "detail": "击败这组前锋只完成护证窗口。生命代价由之后具名确认的结局交付承担，不由普通失败触发。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "wander-last-stand",
              "id": "laststand-mark-retreat"
            }
          ],
          "any": []
        },
        "marks": [
          "laststand-hold-gate"
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
        "sinceRevision": 4,
        "encounter": "laststand-hold-gate-encounter"
      },
      "claim-wander-last-stand": {
        "id": "claim-wander-last-stand",
        "task": "wander-last-stand",
        "map": "northern-border",
        "objectId": "borderLastStand",
        "kind": "claim",
        "label": "确认留下殿后，结束这一生",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-relation-shen-case": {
        "id": "accept-relation-shen-case",
        "task": "relation-shen-case",
        "map": "jindan-retreat",
        "objectId": "retreatShen",
        "kind": "accept",
        "label": "接下：让问案的人能开口",
        "detail": "灵薇要让女弟子也能平等申诉；你帮她整理与护送真实卷宗。",
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
        "sinceRevision": 4
      },
      "shen-hear-case-goal": {
        "id": "shen-hear-case-goal",
        "task": "relation-shen-case",
        "map": "jindan-retreat",
        "objectId": "retreatShen",
        "kind": "progress",
        "label": "先听灵薇自己的问案计划",
        "detail": "她希望守塔与执事轮值公平，不以陪伴主角为唯一目标。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "shen-hear-case-goal"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "shen-fair-case-kit": 1
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "shen-seal-petition": {
        "id": "shen-seal-petition",
        "task": "relation-shen-case",
        "map": "jindan-retreat",
        "objectId": "retreatNotes",
        "kind": "progress",
        "label": "核验申诉名册并封存",
        "detail": "实际使用封存包，保留申诉者愿意公开的内容。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "relation-shen-case",
              "id": "shen-hear-case-goal"
            }
          ],
          "any": []
        },
        "marks": [
          "shen-seal-petition"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "shen-fair-case-kit": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "shen-cover-petition": {
        "id": "shen-cover-petition",
        "task": "relation-shen-case",
        "map": "jindan-retreat",
        "objectId": "retreatPrepareDesk",
        "kind": "battle",
        "label": "护住送往山门的申诉卷",
        "detail": "阻案执事在整备案北侧拦路，胜后才完成交接。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "relation-shen-case",
              "id": "shen-seal-petition"
            }
          ],
          "any": []
        },
        "marks": [
          "shen-cover-petition"
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
        "sinceRevision": 4,
        "encounter": "shen-cover-petition-encounter"
      },
      "shen-respect-duty": {
        "id": "shen-respect-duty",
        "task": "relation-shen-case",
        "map": "jindan-retreat",
        "objectId": "retreatShen",
        "kind": "progress",
        "label": "让她亲自决定守塔与执事安排",
        "detail": "她保留自己的责任；你不能因为帮她而代她许下关系。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "relation-shen-case",
              "id": "shen-cover-petition"
            }
          ],
          "any": []
        },
        "marks": [
          "shen-respect-duty"
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
        "sinceRevision": 4
      },
      "claim-relation-shen-case": {
        "id": "claim-relation-shen-case",
        "task": "relation-shen-case",
        "map": "jindan-retreat",
        "objectId": "retreatShen",
        "kind": "claim",
        "label": "收好共同署名的问案记录",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-relation-shen-vow": {
        "id": "accept-relation-shen-vow",
        "task": "relation-shen-vow",
        "map": "jindan-retreat",
        "objectId": "retreatShen",
        "kind": "accept",
        "label": "接下：与沈灵薇说清承诺",
        "detail": "共同经历不是自动结契。双方明确成年且愿意，才把关系写成一生的承诺。",
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
        "sinceRevision": 4
      },
      "listen-shen-intent": {
        "id": "listen-shen-intent",
        "task": "relation-shen-vow",
        "map": "jindan-retreat",
        "objectId": "retreatShen",
        "kind": "progress",
        "label": "听沈灵薇亲口说明自己的愿望",
        "detail": "沈灵薇保留自己的职业、去向与拒绝的权利；亲近不是义务，帮助也不是交换关系。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "listen-shen-intent"
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
        "sinceRevision": 4
      },
      "vow-shen": {
        "id": "vow-shen",
        "task": "relation-shen-vow",
        "map": "jindan-retreat",
        "objectId": "retreatShen",
        "kind": "choice",
        "label": "与沈灵薇明确结为道侣",
        "detail": "双方已成年，自愿选择彼此为唯一明确道侣；不自动安排婚礼、生育或改变对方职业。交付前还会再次具名确认。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "relation-shen-vow",
              "id": "listen-shen-intent"
            },
            {
              "type": "partner",
              "id": "none"
            }
          ],
          "any": []
        },
        "marks": [
          "relationship-decided"
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
        "sinceRevision": 4,
        "choice": "vow",
        "confirm": {
          "title": "与沈灵薇明确结为道侣",
          "text": "双方已成年，自愿选择彼此为唯一明确道侣；不自动安排婚礼、生育或改变对方职业。交付前还会再次具名确认。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "friend-shen": {
        "id": "friend-shen",
        "task": "relation-shen-vow",
        "map": "jindan-retreat",
        "objectId": "retreatShen",
        "kind": "choice",
        "label": "以朋友身份相互支持",
        "detail": "实用谢礼和共同事业照常完成，不把友谊写成次等结局。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "relation-shen-vow",
              "id": "listen-shen-intent"
            }
          ],
          "any": []
        },
        "marks": [
          "relationship-decided"
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
        "sinceRevision": 4,
        "choice": "friend",
        "confirm": {
          "title": "以朋友身份相互支持",
          "text": "实用谢礼和共同事业照常完成，不把友谊写成次等结局。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "decline-shen": {
        "id": "decline-shen",
        "task": "relation-shen-vow",
        "map": "jindan-retreat",
        "objectId": "retreatShen",
        "kind": "choice",
        "label": "明确谢绝结契，尊重彼此选择",
        "detail": "共同经历仍被尊重，各自的目标与已得实用奖励不收回。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "relation-shen-vow",
              "id": "listen-shen-intent"
            }
          ],
          "any": []
        },
        "marks": [
          "relationship-decided"
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
        "sinceRevision": 4,
        "choice": "decline",
        "confirm": {
          "title": "明确谢绝结契，尊重彼此选择",
          "text": "共同经历仍被尊重，各自的目标与已得实用奖励不收回。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "claim-relation-shen-vow": {
        "id": "claim-relation-shen-vow",
        "task": "relation-shen-vow",
        "map": "jindan-retreat",
        "objectId": "retreatShen",
        "kind": "claim",
        "label": "再次确认与沈灵薇的关系并交付",
        "detail": "朋友、婉拒、结契均得回气丹一枚与温养茶一份。只有已明确选择结契时才登记唯一道侣；取消不结算。",
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
        "sinceRevision": 4,
        "confirm": {
          "title": "与沈灵薇核对这次承诺",
          "text": "请再次核对双方选择。只有双方明确自愿结契，才登记为彼此唯一道侣；朋友或拒绝不减少实用谢礼。不自动安排婚育。",
          "label": "核对后交付"
        }
      },
      "accept-relation-ning-soul": {
        "id": "accept-relation-ning-soul",
        "task": "relation-ning-soul",
        "map": "qingyang-charity",
        "objectId": "charityNing",
        "kind": "accept",
        "label": "接下：她要守住的名字",
        "detail": "凝霜要找回受困魂影的姓名，请你帮她核对两个原有见证。",
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
        "sinceRevision": 4
      },
      "ning-hear-own-goal": {
        "id": "ning-hear-own-goal",
        "task": "relation-ning-soul",
        "map": "qingyang-charity",
        "objectId": "charityNing",
        "kind": "progress",
        "label": "听凝霜说她想守住谁",
        "detail": "她自愿交一枚灯芯，请你记下魂影名字，不把相识凭物当作道侣契约。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "ning-hear-own-goal"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "ning-soul-lamp-wick": 1
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "ning-check-ice-names": {
        "id": "ning-check-ice-names",
        "task": "relation-ning-soul",
        "map": "icefield-cavern",
        "objectId": "iceTablet",
        "kind": "progress",
        "label": "核对冰原留下的名字",
        "detail": "实际与洞中印纹对照，未知身世不提前解释成天门真相。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "relation-ning-soul",
              "id": "ning-hear-own-goal"
            }
          ],
          "any": []
        },
        "marks": [
          "ning-check-ice-names"
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
        "sinceRevision": 4
      },
      "ning-check-road-witness": {
        "id": "ning-check-road-witness",
        "task": "relation-ning-soul",
        "map": "qingyang-charity",
        "objectId": "charityLetters",
        "kind": "progress",
        "label": "查巡行册中失踪者的见证",
        "detail": "核对活人留下的记录，不能给未见过的魂影凭空补名字。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "relation-ning-soul",
              "id": "ning-check-ice-names"
            }
          ],
          "any": []
        },
        "marks": [
          "ning-check-road-witness"
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
        "sinceRevision": 4
      },
      "ning-light-soul-lamp": {
        "id": "ning-light-soul-lamp",
        "task": "relation-ning-soul",
        "map": "icefield-cavern",
        "objectId": "iceFire",
        "kind": "progress",
        "label": "与她点护魂灯，送受困者离开",
        "detail": "实际用去灯芯。她选择护送魂影，你尊重这一段属于她自己的路。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "relation-ning-soul",
              "id": "ning-check-road-witness"
            }
          ],
          "any": []
        },
        "marks": [
          "ning-light-soul-lamp"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "ning-soul-lamp-wick": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "claim-relation-ning-soul": {
        "id": "claim-relation-ning-soul",
        "task": "relation-ning-soul",
        "map": "qingyang-charity",
        "objectId": "charityNing",
        "kind": "claim",
        "label": "共同记下护住的魂名",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-relation-ning-vow": {
        "id": "accept-relation-ning-vow",
        "task": "relation-ning-vow",
        "map": "qingyang-charity",
        "objectId": "charityNing",
        "kind": "accept",
        "label": "接下：与凝霜说清承诺",
        "detail": "共同经历不是自动结契。双方明确成年且愿意，才把关系写成一生的承诺。",
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
        "sinceRevision": 4
      },
      "listen-ning-intent": {
        "id": "listen-ning-intent",
        "task": "relation-ning-vow",
        "map": "qingyang-charity",
        "objectId": "charityNing",
        "kind": "progress",
        "label": "听凝霜亲口说明自己的愿望",
        "detail": "凝霜保留自己的职业、去向与拒绝的权利；亲近不是义务，帮助也不是交换关系。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "listen-ning-intent"
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
        "sinceRevision": 4
      },
      "vow-ning": {
        "id": "vow-ning",
        "task": "relation-ning-vow",
        "map": "qingyang-charity",
        "objectId": "charityNing",
        "kind": "choice",
        "label": "与凝霜明确结为道侣",
        "detail": "双方已成年，自愿选择彼此为唯一明确道侣；不自动安排婚礼、生育或改变对方职业。交付前还会再次具名确认。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "relation-ning-vow",
              "id": "listen-ning-intent"
            },
            {
              "type": "partner",
              "id": "none"
            }
          ],
          "any": []
        },
        "marks": [
          "relationship-decided"
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
        "sinceRevision": 4,
        "choice": "vow",
        "confirm": {
          "title": "与凝霜明确结为道侣",
          "text": "双方已成年，自愿选择彼此为唯一明确道侣；不自动安排婚礼、生育或改变对方职业。交付前还会再次具名确认。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "friend-ning": {
        "id": "friend-ning",
        "task": "relation-ning-vow",
        "map": "qingyang-charity",
        "objectId": "charityNing",
        "kind": "choice",
        "label": "以朋友身份相互支持",
        "detail": "实用谢礼和共同事业照常完成，不把友谊写成次等结局。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "relation-ning-vow",
              "id": "listen-ning-intent"
            }
          ],
          "any": []
        },
        "marks": [
          "relationship-decided"
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
        "sinceRevision": 4,
        "choice": "friend",
        "confirm": {
          "title": "以朋友身份相互支持",
          "text": "实用谢礼和共同事业照常完成，不把友谊写成次等结局。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "decline-ning": {
        "id": "decline-ning",
        "task": "relation-ning-vow",
        "map": "qingyang-charity",
        "objectId": "charityNing",
        "kind": "choice",
        "label": "明确谢绝结契，尊重彼此选择",
        "detail": "共同经历仍被尊重，各自的目标与已得实用奖励不收回。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "relation-ning-vow",
              "id": "listen-ning-intent"
            }
          ],
          "any": []
        },
        "marks": [
          "relationship-decided"
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
        "sinceRevision": 4,
        "choice": "decline",
        "confirm": {
          "title": "明确谢绝结契，尊重彼此选择",
          "text": "共同经历仍被尊重，各自的目标与已得实用奖励不收回。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "claim-relation-ning-vow": {
        "id": "claim-relation-ning-vow",
        "task": "relation-ning-vow",
        "map": "qingyang-charity",
        "objectId": "charityNing",
        "kind": "claim",
        "label": "再次确认与凝霜的关系并交付",
        "detail": "朋友、婉拒、结契均得回气丹一枚与温养茶一份。只有已明确选择结契时才登记唯一道侣；取消不结算。",
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
        "sinceRevision": 4,
        "confirm": {
          "title": "与凝霜核对这次承诺",
          "text": "请再次核对双方选择。只有双方明确自愿结契，才登记为彼此唯一道侣；朋友或拒绝不减少实用谢礼。不自动安排婚育。",
          "label": "核对后交付"
        }
      },
      "accept-relation-axing-clinic": {
        "id": "accept-relation-axing-clinic",
        "task": "relation-axing-clinic",
        "map": "apricot-village",
        "objectId": "apricotAxing",
        "kind": "accept",
        "label": "接下：她的医案，她的名字",
        "detail": "阿杏想让病案与医课都留下自己的姓名，与你商量可以平等合作的办法。",
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
        "sinceRevision": 4
      },
      "axing-hear-clinic-goal": {
        "id": "axing-hear-clinic-goal",
        "task": "relation-axing-clinic",
        "map": "apricot-village",
        "objectId": "apricotAxing",
        "kind": "progress",
        "label": "听阿杏说明独立行医的目标",
        "detail": "双方都是成年人。她不是待许配的少女，也不以玩家许可为出门行医的条件。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "axing-hear-clinic-goal"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "axing-clinic-form": 2
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "axing-compile-own-case": {
        "id": "axing-compile-own-case",
        "task": "relation-axing-clinic",
        "map": "apricot-village",
        "objectId": "apricotCasebook",
        "kind": "progress",
        "label": "把她的诊疗判断独立编入医案",
        "detail": "实际用一张医案纸；共同署名不抹去她自己的判断。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "relation-axing-clinic",
              "id": "axing-hear-clinic-goal"
            }
          ],
          "any": []
        },
        "marks": [
          "axing-compile-own-case"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "axing-clinic-form": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "axing-write-teaching-page": {
        "id": "axing-write-teaching-page",
        "task": "relation-axing-clinic",
        "map": "apricot-village",
        "objectId": "apricotBench",
        "kind": "progress",
        "label": "一起做给后来女医者的辨药课页",
        "detail": "实际用一张医案纸，辨药课用于公开教学，不以恋爱为交换。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "relation-axing-clinic",
              "id": "axing-compile-own-case"
            }
          ],
          "any": []
        },
        "marks": [
          "axing-write-teaching-page"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "axing-clinic-form": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "axing-agree-independent-work": {
        "id": "axing-agree-independent-work",
        "task": "relation-axing-clinic",
        "map": "apricot-village",
        "objectId": "apricotAxing",
        "kind": "progress",
        "label": "约清各自行医与共同医馆的分工",
        "detail": "她可以独立采购、出诊、讲学；亲近或朋友都不替她决定人生。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "relation-axing-clinic",
              "id": "axing-write-teaching-page"
            }
          ],
          "any": []
        },
        "marks": [
          "axing-agree-independent-work"
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
        "sinceRevision": 4
      },
      "claim-relation-axing-clinic": {
        "id": "claim-relation-axing-clinic",
        "task": "relation-axing-clinic",
        "map": "apricot-village",
        "objectId": "apricotAxing",
        "kind": "claim",
        "label": "收好共同的医课与分工记录",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-relation-axing-vow": {
        "id": "accept-relation-axing-vow",
        "task": "relation-axing-vow",
        "map": "apricot-village",
        "objectId": "apricotAxing",
        "kind": "accept",
        "label": "接下：与阿杏说清承诺",
        "detail": "共同经历不是自动结契。双方明确成年且愿意，才把关系写成一生的承诺。",
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
        "sinceRevision": 4
      },
      "listen-axing-intent": {
        "id": "listen-axing-intent",
        "task": "relation-axing-vow",
        "map": "apricot-village",
        "objectId": "apricotAxing",
        "kind": "progress",
        "label": "听阿杏亲口说明自己的愿望",
        "detail": "阿杏保留自己的职业、去向与拒绝的权利；亲近不是义务，帮助也不是交换关系。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "listen-axing-intent"
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
        "sinceRevision": 4
      },
      "vow-axing": {
        "id": "vow-axing",
        "task": "relation-axing-vow",
        "map": "apricot-village",
        "objectId": "apricotAxing",
        "kind": "choice",
        "label": "与阿杏明确结为道侣",
        "detail": "双方已成年，自愿选择彼此为唯一明确道侣；不自动安排婚礼、生育或改变对方职业。交付前还会再次具名确认。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "relation-axing-vow",
              "id": "listen-axing-intent"
            },
            {
              "type": "partner",
              "id": "none"
            }
          ],
          "any": []
        },
        "marks": [
          "relationship-decided"
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
        "sinceRevision": 4,
        "choice": "vow",
        "confirm": {
          "title": "与阿杏明确结为道侣",
          "text": "双方已成年，自愿选择彼此为唯一明确道侣；不自动安排婚礼、生育或改变对方职业。交付前还会再次具名确认。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "friend-axing": {
        "id": "friend-axing",
        "task": "relation-axing-vow",
        "map": "apricot-village",
        "objectId": "apricotAxing",
        "kind": "choice",
        "label": "以朋友身份相互支持",
        "detail": "实用谢礼和共同事业照常完成，不把友谊写成次等结局。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "relation-axing-vow",
              "id": "listen-axing-intent"
            }
          ],
          "any": []
        },
        "marks": [
          "relationship-decided"
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
        "sinceRevision": 4,
        "choice": "friend",
        "confirm": {
          "title": "以朋友身份相互支持",
          "text": "实用谢礼和共同事业照常完成，不把友谊写成次等结局。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "decline-axing": {
        "id": "decline-axing",
        "task": "relation-axing-vow",
        "map": "apricot-village",
        "objectId": "apricotAxing",
        "kind": "choice",
        "label": "明确谢绝结契，尊重彼此选择",
        "detail": "共同经历仍被尊重，各自的目标与已得实用奖励不收回。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "relation-axing-vow",
              "id": "listen-axing-intent"
            }
          ],
          "any": []
        },
        "marks": [
          "relationship-decided"
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
        "sinceRevision": 4,
        "choice": "decline",
        "confirm": {
          "title": "明确谢绝结契，尊重彼此选择",
          "text": "共同经历仍被尊重，各自的目标与已得实用奖励不收回。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "claim-relation-axing-vow": {
        "id": "claim-relation-axing-vow",
        "task": "relation-axing-vow",
        "map": "apricot-village",
        "objectId": "apricotAxing",
        "kind": "claim",
        "label": "再次确认与阿杏的关系并交付",
        "detail": "朋友、婉拒、结契均得回气丹一枚与温养茶一份。只有已明确选择结契时才登记唯一道侣；取消不结算。",
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
        "sinceRevision": 4,
        "confirm": {
          "title": "与阿杏核对这次承诺",
          "text": "请再次核对双方选择。只有双方明确自愿结契，才登记为彼此唯一道侣；朋友或拒绝不减少实用谢礼。不自动安排婚育。",
          "label": "核对后交付"
        }
      },
      "accept-relation-lingyun-oath": {
        "id": "accept-relation-lingyun-oath",
        "task": "relation-lingyun-oath",
        "map": "jindan-retreat",
        "objectId": "retreatLingyun",
        "kind": "accept",
        "label": "接下：旧书匣与新的约定",
        "detail": "凌云要把旧私塾的东西交给后来学生；你帮他修整，再谈如今的选择。",
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
        "sinceRevision": 4
      },
      "lingyun-hear-school-goal": {
        "id": "lingyun-hear-school-goal",
        "task": "relation-lingyun-oath",
        "map": "jindan-retreat",
        "objectId": "retreatLingyun",
        "kind": "progress",
        "label": "听凌云说明自己的教书安排",
        "detail": "童年照料不倒写成当时的恋爱；如今各自成年，才讨论新的关系。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "lingyun-hear-school-goal"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "lingyun-school-repair": 1
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "lingyun-repair-old-case": {
        "id": "lingyun-repair-old-case",
        "task": "relation-lingyun-oath",
        "map": "jindan-retreat",
        "objectId": "retreatNotes",
        "kind": "progress",
        "label": "实际修好私塾旧书匣",
        "detail": "消耗修整件，打开可核验来历的旧匣；不恢复他以后可能失去的修为。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "relation-lingyun-oath",
              "id": "lingyun-hear-school-goal"
            }
          ],
          "any": []
        },
        "marks": [
          "lingyun-repair-old-case"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "lingyun-school-repair": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "lingyun-receive-ruler": {
        "id": "lingyun-receive-ruler",
        "task": "relation-lingyun-oath",
        "map": "jindan-retreat",
        "objectId": "retreatLingyun",
        "kind": "progress",
        "label": "由本人确认戒尺来历并交还",
        "detail": "这次是真正的新交接；先前铁牌不是戒尺，也不假写旧章已经取得。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "relation-lingyun-oath",
              "id": "lingyun-repair-old-case"
            }
          ],
          "any": []
        },
        "marks": [
          "lingyun-receive-ruler"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [
            "lingyun-bamboo-ruler"
          ],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "lingyun-compare-two-jades": {
        "id": "lingyun-compare-two-jades",
        "task": "relation-lingyun-oath",
        "map": "jindan-retreat",
        "objectId": "retreatLingyun",
        "kind": "progress",
        "label": "对照两半玉的旧刻痕，再交由本人保管",
        "detail": "先核两半来源，不把半玉当作已经结契；明确承诺另行决定。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "relation-lingyun-oath",
              "id": "lingyun-receive-ruler"
            }
          ],
          "any": []
        },
        "marks": [
          "lingyun-compare-two-jades"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [
            "lingyun-jade-confirmed"
          ],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "claim-relation-lingyun-oath": {
        "id": "claim-relation-lingyun-oath",
        "task": "relation-lingyun-oath",
        "map": "jindan-retreat",
        "objectId": "retreatLingyun",
        "kind": "claim",
        "label": "完成旧物交接",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-relation-lingyun-vow": {
        "id": "accept-relation-lingyun-vow",
        "task": "relation-lingyun-vow",
        "map": "jindan-retreat",
        "objectId": "retreatLingyun",
        "kind": "accept",
        "label": "接下：与凌云子说清承诺",
        "detail": "共同经历不是自动结契。双方明确成年且愿意，才把关系写成一生的承诺。",
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
        "sinceRevision": 4
      },
      "listen-lingyun-intent": {
        "id": "listen-lingyun-intent",
        "task": "relation-lingyun-vow",
        "map": "jindan-retreat",
        "objectId": "retreatLingyun",
        "kind": "progress",
        "label": "听凌云子亲口说明自己的愿望",
        "detail": "凌云子保留自己的职业、去向与拒绝的权利；亲近不是义务，帮助也不是交换关系。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "listen-lingyun-intent"
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
        "sinceRevision": 4
      },
      "vow-lingyun": {
        "id": "vow-lingyun",
        "task": "relation-lingyun-vow",
        "map": "jindan-retreat",
        "objectId": "retreatLingyun",
        "kind": "choice",
        "label": "与凌云子明确结为道侣",
        "detail": "双方已成年，自愿选择彼此为唯一明确道侣；不自动安排婚礼、生育或改变对方职业。交付前还会再次具名确认。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "relation-lingyun-vow",
              "id": "listen-lingyun-intent"
            },
            {
              "type": "partner",
              "id": "none"
            },
            {
              "type": "gender",
              "id": "female"
            }
          ],
          "any": []
        },
        "marks": [
          "relationship-decided"
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
        "sinceRevision": 4,
        "choice": "vow",
        "confirm": {
          "title": "与凌云子明确结为道侣",
          "text": "双方已成年，自愿选择彼此为唯一明确道侣；不自动安排婚礼、生育或改变对方职业。交付前还会再次具名确认。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "friend-lingyun": {
        "id": "friend-lingyun",
        "task": "relation-lingyun-vow",
        "map": "jindan-retreat",
        "objectId": "retreatLingyun",
        "kind": "choice",
        "label": "以朋友身份相互支持",
        "detail": "实用谢礼和共同事业照常完成，不把友谊写成次等结局。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "relation-lingyun-vow",
              "id": "listen-lingyun-intent"
            }
          ],
          "any": []
        },
        "marks": [
          "relationship-decided"
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
        "sinceRevision": 4,
        "choice": "friend",
        "confirm": {
          "title": "以朋友身份相互支持",
          "text": "实用谢礼和共同事业照常完成，不把友谊写成次等结局。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "decline-lingyun": {
        "id": "decline-lingyun",
        "task": "relation-lingyun-vow",
        "map": "jindan-retreat",
        "objectId": "retreatLingyun",
        "kind": "choice",
        "label": "明确谢绝结契，尊重彼此选择",
        "detail": "共同经历仍被尊重，各自的目标与已得实用奖励不收回。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "relation-lingyun-vow",
              "id": "listen-lingyun-intent"
            }
          ],
          "any": []
        },
        "marks": [
          "relationship-decided"
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
        "sinceRevision": 4,
        "choice": "decline",
        "confirm": {
          "title": "明确谢绝结契，尊重彼此选择",
          "text": "共同经历仍被尊重，各自的目标与已得实用奖励不收回。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "claim-relation-lingyun-vow": {
        "id": "claim-relation-lingyun-vow",
        "task": "relation-lingyun-vow",
        "map": "jindan-retreat",
        "objectId": "retreatLingyun",
        "kind": "claim",
        "label": "再次确认与凌云子的关系并交付",
        "detail": "朋友、婉拒、结契均得回气丹一枚与温养茶一份。只有已明确选择结契时才登记唯一道侣；取消不结算。",
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
        "sinceRevision": 4,
        "confirm": {
          "title": "与凌云子核对这次承诺",
          "text": "请再次核对双方选择。只有双方明确自愿结契，才登记为彼此唯一道侣；朋友或拒绝不减少实用谢礼。不自动安排婚育。",
          "label": "核对后交付"
        }
      },
      "wander-decide-demon": {
        "id": "wander-decide-demon",
        "task": "wander-road-choice",
        "map": "qingyang-charity",
        "objectId": "charityTravelBook",
        "kind": "choice",
        "label": "沿完整魔域之路追查",
        "detail": "亲自去十二部与魔宫，承担不同的民生与政变事件。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "demon",
        "confirm": {
          "title": "沿完整魔域之路追查",
          "text": "亲自去十二部与魔宫，承担不同的民生与政变事件。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "wander-decide-enlighten": {
        "id": "wander-decide-enlighten",
        "task": "wander-road-choice",
        "map": "qingyang-charity",
        "objectId": "charityTravelBook",
        "kind": "choice",
        "label": "带证走完整问道长线",
        "detail": "查齐三证人，继续公开问责与归元之约。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "enlighten",
        "confirm": {
          "title": "带证走完整问道长线",
          "text": "查齐三证人，继续公开问责与归元之约。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "wander-decide-mortal": {
        "id": "wander-decide-mortal",
        "task": "wander-road-choice",
        "map": "qingyang-charity",
        "objectId": "charityTravelBook",
        "kind": "choice",
        "label": "准备散功，归凡行医",
        "detail": "先到杏花村办理交接，能力实际停用后走凡人事务。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "mortal",
        "confirm": {
          "title": "准备散功，归凡行医",
          "text": "先到杏花村办理交接，能力实际停用后走凡人事务。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "wander-decide-loop": {
        "id": "wander-decide-loop",
        "task": "wander-road-choice",
        "map": "qingyang-charity",
        "objectId": "charityTravelBook",
        "kind": "choice",
        "label": "凭碎片追查异象",
        "detail": "先核碎片与残图，再进入尚未查明的记忆之路。",
        "requires": {
          "all": [
            {
              "type": "token",
              "id": "wander-loop-shard"
            },
            {
              "type": "token",
              "id": "wander-route-map"
            }
          ],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "loop",
        "confirm": {
          "title": "凭碎片追查异象",
          "text": "先核碎片与残图，再进入尚未查明的记忆之路。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "accept-demon-entry": {
        "id": "accept-demon-entry",
        "task": "demon-entry",
        "map": "jindan-retreat",
        "objectId": "retreatJourneyBoard",
        "kind": "accept",
        "label": "接下：赴魔域前的交接",
        "detail": "入魔域是主动选择，不由寄养身世替你决定。先核旧案、退路与双方所知。",
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
        "sinceRevision": 4
      },
      "demon-entry-check-blood": {
        "id": "demon-entry-check-blood",
        "task": "demon-entry",
        "map": "jindan-retreat",
        "objectId": "retreatJourneyBoard",
        "kind": "progress",
        "label": "核对已查明的舅甥亲缘",
        "detail": "只读取已发生的验锁与血脉事实，不复活旧人或赠第二枚长命锁。",
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
        "marks": [
          "demon-entry-check-blood"
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
        "sinceRevision": 4
      },
      "demon-entry-leave-record": {
        "id": "demon-entry-leave-record",
        "task": "demon-entry",
        "map": "jindan-retreat",
        "objectId": "retreatJourneyBoard",
        "kind": "progress",
        "label": "留下可追查的去向记录",
        "detail": "此后魔域与蜀山同一场政治冲突不能同时发生。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-entry",
              "id": "demon-entry-check-blood"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-entry-leave-record"
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
        "sinceRevision": 4
      },
      "claim-demon-entry": {
        "id": "claim-demon-entry",
        "task": "demon-entry",
        "map": "jindan-retreat",
        "objectId": "retreatJourneyBoard",
        "kind": "claim",
        "label": "亲自踏上赴魔域的路",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-demon-blood-preparation": {
        "id": "accept-demon-blood-preparation",
        "task": "demon-blood-preparation",
        "map": "demon-blood-cavern",
        "objectId": "demonOldMaster",
        "kind": "accept",
        "label": "接下：先稳住自己的血脉",
        "detail": "老魔头与你核对失控征兆，三处稳定工作完成后才进入试炼。",
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
        "sinceRevision": 4
      },
      "demon-blood-preparation-receive": {
        "id": "demon-blood-preparation-receive",
        "task": "demon-blood-preparation",
        "map": "demon-blood-cavern",
        "objectId": "demonOldMaster",
        "kind": "progress",
        "label": "核领护脉夹与泄压盐",
        "detail": "老魔头与你核对失控征兆，三处稳定工作完成后才进入试炼。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "demon-blood-preparation-receive"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "demon-cold-clamp": 1,
            "demon-release-salt": 1
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "demon-blood-preparation-clamp": {
        "id": "demon-blood-preparation-clamp",
        "task": "demon-blood-preparation",
        "map": "demon-blood-cavern",
        "objectId": "demonColdForge",
        "kind": "progress",
        "label": "实际安好寒铁护脉夹",
        "detail": "老魔头与你核对失控征兆，三处稳定工作完成后才进入试炼。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-blood-preparation",
              "id": "demon-blood-preparation-receive"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-blood-preparation-clamp"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "demon-cold-clamp": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "demon-blood-preparation-release": {
        "id": "demon-blood-preparation-release",
        "task": "demon-blood-preparation",
        "map": "demon-blood-cavern",
        "objectId": "demonPressureValve",
        "kind": "progress",
        "label": "用泄压盐分散逆流",
        "detail": "老魔头与你核对失控征兆，三处稳定工作完成后才进入试炼。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-blood-preparation",
              "id": "demon-blood-preparation-clamp"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-blood-preparation-release"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "demon-release-salt": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "demon-blood-preparation-record": {
        "id": "demon-blood-preparation-record",
        "task": "demon-blood-preparation",
        "map": "demon-blood-cavern",
        "objectId": "demonTrialBook",
        "kind": "progress",
        "label": "按本人反应记下稳定次序",
        "detail": "老魔头与你核对失控征兆，三处稳定工作完成后才进入试炼。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-blood-preparation",
              "id": "demon-blood-preparation-release"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-blood-preparation-record"
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
        "sinceRevision": 4
      },
      "claim-demon-blood-preparation": {
        "id": "claim-demon-blood-preparation",
        "task": "demon-blood-preparation",
        "map": "demon-blood-cavern",
        "objectId": "demonOldMaster",
        "kind": "claim",
        "label": "交付：先稳住自己的血脉",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-demon-yuanying-trial": {
        "id": "accept-demon-yuanying-trial",
        "task": "demon-yuanying-trial",
        "map": "demon-blood-cavern",
        "objectId": "demonBloodAltar",
        "kind": "accept",
        "label": "接下：万魔窟结婴试炼",
        "detail": "两段真实试炼之间可退出整备，失败只重试当前段，只有交付才突破。",
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
        "sinceRevision": 4
      },
      "demon-yuanying-trial-first": {
        "id": "demon-yuanying-trial-first",
        "task": "demon-yuanying-trial",
        "map": "demon-blood-cavern",
        "objectId": "demonBloodAltar",
        "kind": "battle",
        "label": "第一段：稳住逆流",
        "detail": "两段真实试炼之间可退出整备，失败只重试当前段，只有交付才突破。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "demon-yuanying-trial-first"
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
        "sinceRevision": 4,
        "encounter": "demon-yuanying-trial-first-encounter"
      },
      "demon-yuanying-trial-second": {
        "id": "demon-yuanying-trial-second",
        "task": "demon-yuanying-trial",
        "map": "demon-blood-cavern",
        "objectId": "demonBloodAltar",
        "kind": "battle",
        "label": "第二段：护住本心",
        "detail": "两段真实试炼之间可退出整备，失败只重试当前段，只有交付才突破。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-yuanying-trial",
              "id": "demon-yuanying-trial-first"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-yuanying-trial-second"
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
        "sinceRevision": 4,
        "encounter": "demon-yuanying-trial-second-encounter"
      },
      "claim-demon-yuanying-trial": {
        "id": "claim-demon-yuanying-trial",
        "task": "demon-yuanying-trial",
        "map": "demon-blood-cavern",
        "objectId": "demonBloodAltar",
        "kind": "claim",
        "label": "交付：万魔窟结婴试炼",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-demon-tribal-work": {
        "id": "accept-demon-tribal-work",
        "task": "demon-tribal-work",
        "map": "demon-tribes",
        "objectId": "tribesAccount",
        "kind": "accept",
        "label": "接下：十二部的五件实事",
        "detail": "以农、牧、巫、铁、义塾五处代表事务展开十二部生活；人物有自己的目标。",
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
        "sinceRevision": 4
      },
      "demon-tribal-work-receive": {
        "id": "demon-tribal-work-receive",
        "task": "demon-tribal-work",
        "map": "demon-tribes",
        "objectId": "tribesAccount",
        "kind": "progress",
        "label": "按五部账目核领本批用料",
        "detail": "以农、牧、巫、铁、义塾五处代表事务展开十二部生活；人物有自己的目标。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "demon-tribal-work-receive"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "tribal-grain": 2,
            "tribal-tools": 2,
            "tribal-school-kit": 1,
            "tribal-witch-dose": 1
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "demon-tribal-work-canal-west": {
        "id": "demon-tribal-work-canal-west",
        "task": "demon-tribal-work",
        "map": "demon-tribes",
        "objectId": "tribesChannel",
        "kind": "progress",
        "label": "修农部西渠口",
        "detail": "以农、牧、巫、铁、义塾五处代表事务展开十二部生活；人物有自己的目标。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-tribal-work",
              "id": "demon-tribal-work-receive"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-tribal-work-canal-west"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "tribal-tools": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "demon-tribal-work-canal-east": {
        "id": "demon-tribal-work-canal-east",
        "task": "demon-tribal-work",
        "map": "demon-tribes",
        "objectId": "tribesHerder",
        "kind": "progress",
        "label": "与牧部修东渠并交一份粮种",
        "detail": "以农、牧、巫、铁、义塾五处代表事务展开十二部生活；人物有自己的目标。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-tribal-work",
              "id": "demon-tribal-work-canal-west"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-tribal-work-canal-east"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "tribal-tools": 1,
            "tribal-grain": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "demon-tribal-work-grain": {
        "id": "demon-tribal-work-grain",
        "task": "demon-tribal-work",
        "map": "demon-tribes",
        "objectId": "tribesGrain",
        "kind": "progress",
        "label": "按人口分发另一份粮种",
        "detail": "以农、牧、巫、铁、义塾五处代表事务展开十二部生活；人物有自己的目标。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-tribal-work",
              "id": "demon-tribal-work-canal-east"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-tribal-work-grain"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "tribal-grain": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "demon-tribal-work-cure": {
        "id": "demon-tribal-work-cure",
        "task": "demon-tribal-work",
        "map": "demon-tribes",
        "objectId": "tribesWitch",
        "kind": "progress",
        "label": "按病案调救护药样",
        "detail": "以农、牧、巫、铁、义塾五处代表事务展开十二部生活；人物有自己的目标。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-tribal-work",
              "id": "demon-tribal-work-grain"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-tribal-work-cure"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "tribal-witch-dose": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "demon-tribal-work-forge": {
        "id": "demon-tribal-work-forge",
        "task": "demon-tribal-work",
        "map": "demon-tribes",
        "objectId": "tribesSmith",
        "kind": "progress",
        "label": "修正农具与护具的分配清单",
        "detail": "以农、牧、巫、铁、义塾五处代表事务展开十二部生活；人物有自己的目标。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-tribal-work",
              "id": "demon-tribal-work-cure"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-tribal-work-forge"
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
        "sinceRevision": 4
      },
      "demon-tribal-work-school": {
        "id": "demon-tribal-work-school",
        "task": "demon-tribal-work",
        "map": "demon-tribes",
        "objectId": "tribesSchool",
        "kind": "progress",
        "label": "用学具安置孤儿入学",
        "detail": "以农、牧、巫、铁、义塾五处代表事务展开十二部生活；人物有自己的目标。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-tribal-work",
              "id": "demon-tribal-work-forge"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-tribal-work-school"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "tribal-school-kit": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "claim-demon-tribal-work": {
        "id": "claim-demon-tribal-work",
        "task": "demon-tribal-work",
        "map": "demon-tribes",
        "objectId": "tribesAccount",
        "kind": "claim",
        "label": "交付：十二部的五件实事",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "accept-demon-rebellion": {
        "id": "accept-demon-rebellion",
        "task": "demon-rebellion",
        "map": "demon-tribes",
        "objectId": "tribesRebelPost",
        "kind": "accept",
        "label": "接下：平叛也要留下账",
        "detail": "两部反抗有真实粮路争议；选择交账协商或战场止乱，结果影响军规。",
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
        "sinceRevision": 4
      },
      "demon-rebellion-negotiate": {
        "id": "demon-rebellion-negotiate",
        "task": "demon-rebellion",
        "map": "demon-tribes",
        "objectId": "tribesRebelPost",
        "kind": "choice",
        "label": "先公开粮册再交涉",
        "detail": "公开真实修渠与粮种流向，面对少量拒绝停手的武装。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "negotiate",
        "confirm": {
          "title": "先公开粮册再交涉",
          "text": "公开真实修渠与粮种流向，面对少量拒绝停手的武装。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "demon-rebellion-force": {
        "id": "demon-rebellion-force",
        "task": "demon-rebellion",
        "map": "demon-tribes",
        "objectId": "tribesRebelPost",
        "kind": "choice",
        "label": "先压下持械叛军",
        "detail": "必须实际击败更多敌人，留下威压记录，不能同时宣称谈判解决。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "force",
        "confirm": {
          "title": "先压下持械叛军",
          "text": "必须实际击败更多敌人，留下威压记录，不能同时宣称谈判解决。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "demon-rebel-negotiate": {
        "id": "demon-rebel-negotiate",
        "task": "demon-rebellion",
        "map": "demon-tribes",
        "objectId": "tribesRebelPost",
        "kind": "battle",
        "label": "保护公开交涉场",
        "detail": "胜利才记录本次处理方法。",
        "requires": {
          "all": [
            {
              "type": "choice",
              "task": "demon-rebellion",
              "id": "negotiate"
            }
          ],
          "any": []
        },
        "marks": [
          "rebel-negotiate-receipt",
          "rebel-settled"
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
        "sinceRevision": 4,
        "encounter": "demon-rebel-negotiate-encounter"
      },
      "demon-rebel-force": {
        "id": "demon-rebel-force",
        "task": "demon-rebellion",
        "map": "demon-tribes",
        "objectId": "tribesRebelPost",
        "kind": "battle",
        "label": "压住两队叛军",
        "detail": "胜利才记录本次处理方法。",
        "requires": {
          "all": [
            {
              "type": "choice",
              "task": "demon-rebellion",
              "id": "force"
            }
          ],
          "any": []
        },
        "marks": [
          "rebel-force-receipt",
          "rebel-settled"
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
        "sinceRevision": 4,
        "encounter": "demon-rebel-force-encounter"
      },
      "demon-rebel-register": {
        "id": "demon-rebel-register",
        "task": "demon-rebellion",
        "map": "demon-tribes",
        "objectId": "tribesAccount",
        "kind": "progress",
        "label": "登记受损者与实际解决办法",
        "detail": "军规与赔偿以后从这份真实记录读取。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-rebellion",
              "id": "rebel-settled"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-rebel-register"
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
        "sinceRevision": 4
      },
      "claim-demon-rebellion": {
        "id": "claim-demon-rebellion",
        "task": "demon-rebellion",
        "map": "demon-tribes",
        "objectId": "tribesAccount",
        "kind": "claim",
        "label": "交付平叛与受损记录",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-demon-huashen-trial": {
        "id": "accept-demon-huashen-trial",
        "task": "demon-huashen-trial",
        "map": "demon-tribes",
        "objectId": "tribesAccount",
        "kind": "accept",
        "label": "接下：魔域守心化神",
        "detail": "两段真实试炼之间可退出整备，失败只重试当前段，只有交付才突破。",
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
        "sinceRevision": 4
      },
      "demon-huashen-trial-first": {
        "id": "demon-huashen-trial-first",
        "task": "demon-huashen-trial",
        "map": "demon-tribes",
        "objectId": "tribesAccount",
        "kind": "battle",
        "label": "第一段：稳住逆流",
        "detail": "两段真实试炼之间可退出整备，失败只重试当前段，只有交付才突破。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "demon-huashen-trial-first"
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
        "sinceRevision": 4,
        "encounter": "demon-huashen-trial-first-encounter"
      },
      "demon-huashen-trial-second": {
        "id": "demon-huashen-trial-second",
        "task": "demon-huashen-trial",
        "map": "demon-tribes",
        "objectId": "tribesAccount",
        "kind": "battle",
        "label": "第二段：护住本心",
        "detail": "两段真实试炼之间可退出整备，失败只重试当前段，只有交付才突破。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-huashen-trial",
              "id": "demon-huashen-trial-first"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-huashen-trial-second"
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
        "sinceRevision": 4,
        "encounter": "demon-huashen-trial-second-encounter"
      },
      "claim-demon-huashen-trial": {
        "id": "claim-demon-huashen-trial",
        "task": "demon-huashen-trial",
        "map": "demon-tribes",
        "objectId": "tribesAccount",
        "kind": "claim",
        "label": "交付：魔域守心化神",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-demon-mother-legacy": {
        "id": "accept-demon-mother-legacy",
        "task": "demon-mother-legacy",
        "map": "demon-palace",
        "objectId": "palaceUncle",
        "kind": "accept",
        "label": "接下：先交遗物，再问前路",
        "detail": "凌玉琅仍在时说明生母旧物来历；外婆遗簪与母亲素银簪不混成一件。",
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
        "sinceRevision": 4
      },
      "demon-mother-legacy-hear": {
        "id": "demon-mother-legacy-hear",
        "task": "demon-mother-legacy",
        "map": "demon-palace",
        "objectId": "palaceUncle",
        "kind": "progress",
        "label": "听舅舅说明凌玉杏的遗志",
        "detail": "凌玉琅仍在时说明生母旧物来历；外婆遗簪与母亲素银簪不混成一件。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "demon-mother-legacy-hear"
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
        "sinceRevision": 4
      },
      "demon-mother-legacy-verify": {
        "id": "demon-mother-legacy-verify",
        "task": "demon-mother-legacy",
        "map": "demon-palace",
        "objectId": "palaceLegacy",
        "kind": "progress",
        "label": "核素银簪、糕模与十八杏花旗来历",
        "detail": "凌玉琅仍在时说明生母旧物来历；外婆遗簪与母亲素银簪不混成一件。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-mother-legacy",
              "id": "demon-mother-legacy-hear"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-mother-legacy-verify"
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
        "sinceRevision": 4
      },
      "demon-mother-legacy-receive": {
        "id": "demon-mother-legacy-receive",
        "task": "demon-mother-legacy",
        "map": "demon-palace",
        "objectId": "palaceLegacy",
        "kind": "progress",
        "label": "实际接过属于生母的遗物",
        "detail": "凌玉琅仍在时说明生母旧物来历；外婆遗簪与母亲素银簪不混成一件。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-mother-legacy",
              "id": "demon-mother-legacy-verify"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-mother-legacy-receive"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [
            "demon-mother-hairpin",
            "demon-apricot-flag"
          ],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "claim-demon-mother-legacy": {
        "id": "claim-demon-mother-legacy",
        "task": "demon-mother-legacy",
        "map": "demon-palace",
        "objectId": "palaceUncle",
        "kind": "claim",
        "label": "交付：先交遗物，再问前路",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-demon-coup": {
        "id": "accept-demon-coup",
        "task": "demon-coup",
        "map": "demon-palace",
        "objectId": "palaceWarTable",
        "kind": "accept",
        "label": "接下：金顶前的撤民与政变",
        "detail": "围山前先让平民离开，敌人是玄玑势力，旧同门不因阵营被强制杀害。",
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
        "sinceRevision": 4
      },
      "demon-coup-evacuate": {
        "id": "demon-coup-evacuate",
        "task": "demon-coup",
        "map": "demon-palace",
        "objectId": "palacePrisoners",
        "kind": "progress",
        "label": "核撤民名单并停止借道掠粮",
        "detail": "围山前先让平民离开，敌人是玄玑势力，旧同门不因阵营被强制杀害。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "demon-coup-evacuate"
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
        "sinceRevision": 4
      },
      "demon-coup-siege": {
        "id": "demon-coup-siege",
        "task": "demon-coup",
        "map": "demon-palace",
        "objectId": "palaceSiegeGate",
        "kind": "battle",
        "label": "击退阻撤离的魔甲先遣",
        "detail": "围山前先让平民离开，敌人是玄玑势力，旧同门不因阵营被强制杀害。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-coup",
              "id": "demon-coup-evacuate"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-coup-siege"
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
        "sinceRevision": 4,
        "encounter": "demon-coup-siege-encounter"
      },
      "demon-coup-break-control": {
        "id": "demon-coup-break-control",
        "task": "demon-coup",
        "map": "demon-palace",
        "objectId": "palaceWarTable",
        "kind": "battle",
        "label": "截断玄玑的遥控阵脉",
        "detail": "围山前先让平民离开，敌人是玄玑势力，旧同门不因阵营被强制杀害。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-coup",
              "id": "demon-coup-siege"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-coup-break-control"
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
        "sinceRevision": 4,
        "encounter": "demon-coup-break-control-encounter"
      },
      "demon-coup-uncle-farewell": {
        "id": "demon-coup-uncle-farewell",
        "task": "demon-coup",
        "map": "demon-palace",
        "objectId": "palaceMemorial",
        "kind": "progress",
        "label": "接舅舅最后托付，明确他已牺牲",
        "detail": "围山前先让平民离开，敌人是玄玑势力，旧同门不因阵营被强制杀害。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-coup",
              "id": "demon-coup-break-control"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-coup-uncle-farewell"
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
        "sinceRevision": 4
      },
      "demon-coup-public-account": {
        "id": "demon-coup-public-account",
        "task": "demon-coup",
        "map": "demon-palace",
        "objectId": "palacePrisoners",
        "kind": "progress",
        "label": "登记死伤与被救者，不抹去代价",
        "detail": "围山前先让平民离开，敌人是玄玑势力，旧同门不因阵营被强制杀害。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-coup",
              "id": "demon-coup-uncle-farewell"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-coup-public-account"
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
        "sinceRevision": 4
      },
      "claim-demon-coup": {
        "id": "claim-demon-coup",
        "task": "demon-coup",
        "map": "demon-palace",
        "objectId": "palaceWarTable",
        "kind": "claim",
        "label": "交付：金顶前的撤民与政变",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-demon-heti-trial": {
        "id": "accept-demon-heti-trial",
        "task": "demon-heti-trial",
        "map": "demon-palace",
        "objectId": "palaceEdict",
        "kind": "accept",
        "label": "接下：合体劫后的军权责任",
        "detail": "两段真实试炼之间可退出整备，失败只重试当前段，只有交付才突破。",
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
        "sinceRevision": 4
      },
      "demon-heti-trial-first": {
        "id": "demon-heti-trial-first",
        "task": "demon-heti-trial",
        "map": "demon-palace",
        "objectId": "palaceEdict",
        "kind": "battle",
        "label": "第一段：稳住逆流",
        "detail": "两段真实试炼之间可退出整备，失败只重试当前段，只有交付才突破。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "demon-heti-trial-first"
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
        "sinceRevision": 4,
        "encounter": "demon-heti-trial-first-encounter"
      },
      "demon-heti-trial-second": {
        "id": "demon-heti-trial-second",
        "task": "demon-heti-trial",
        "map": "demon-palace",
        "objectId": "palaceEdict",
        "kind": "battle",
        "label": "第二段：护住本心",
        "detail": "两段真实试炼之间可退出整备，失败只重试当前段，只有交付才突破。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-heti-trial",
              "id": "demon-heti-trial-first"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-heti-trial-second"
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
        "sinceRevision": 4,
        "encounter": "demon-heti-trial-second-encounter"
      },
      "claim-demon-heti-trial": {
        "id": "claim-demon-heti-trial",
        "task": "demon-heti-trial",
        "map": "demon-palace",
        "objectId": "palaceEdict",
        "kind": "claim",
        "label": "交付：合体劫后的军权责任",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-demon-treaty": {
        "id": "accept-demon-treaty",
        "task": "demon-treaty",
        "map": "two-realms-crossing",
        "objectId": "crossingTreaty",
        "kind": "accept",
        "label": "接下：两界城先有一座桥",
        "detail": "互不侵犯要由桥、粮、伤者名单兑现，不是王座上一句承诺。",
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
        "sinceRevision": 4
      },
      "demon-treaty-receive": {
        "id": "demon-treaty-receive",
        "task": "demon-treaty",
        "map": "two-realms-crossing",
        "objectId": "crossingTradeSeal",
        "kind": "progress",
        "label": "核领桥料与赔偿粮",
        "detail": "互不侵犯要由桥、粮、伤者名单兑现，不是王座上一句承诺。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "demon-treaty-receive"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "demon-bridge-repair": 2,
            "demon-compensation": 2
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "demon-treaty-south-bridge": {
        "id": "demon-treaty-south-bridge",
        "task": "demon-treaty",
        "map": "two-realms-crossing",
        "objectId": "crossingBridgeSouth",
        "kind": "progress",
        "label": "修南岸桥脚",
        "detail": "互不侵犯要由桥、粮、伤者名单兑现，不是王座上一句承诺。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-treaty",
              "id": "demon-treaty-receive"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-treaty-south-bridge"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "demon-bridge-repair": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "demon-treaty-north-bridge": {
        "id": "demon-treaty-north-bridge",
        "task": "demon-treaty",
        "map": "two-realms-crossing",
        "objectId": "crossingBridgeNorth",
        "kind": "progress",
        "label": "修北岸桥脚",
        "detail": "互不侵犯要由桥、粮、伤者名单兑现，不是王座上一句承诺。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-treaty",
              "id": "demon-treaty-south-bridge"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-treaty-north-bridge"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "demon-bridge-repair": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "demon-treaty-victims": {
        "id": "demon-treaty-victims",
        "task": "demon-treaty",
        "map": "two-realms-crossing",
        "objectId": "crossingVictims",
        "kind": "progress",
        "label": "按名册向受难者交粮",
        "detail": "互不侵犯要由桥、粮、伤者名单兑现，不是王座上一句承诺。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-treaty",
              "id": "demon-treaty-north-bridge"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-treaty-victims"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "demon-compensation": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "demon-treaty-school": {
        "id": "demon-treaty-school",
        "task": "demon-treaty",
        "map": "two-realms-crossing",
        "objectId": "crossingSchool",
        "kind": "progress",
        "label": "向边民学堂交粮",
        "detail": "互不侵犯要由桥、粮、伤者名单兑现，不是王座上一句承诺。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-treaty",
              "id": "demon-treaty-victims"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-treaty-school"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "demon-compensation": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "demon-treaty-sign": {
        "id": "demon-treaty-sign",
        "task": "demon-treaty",
        "map": "two-realms-crossing",
        "objectId": "crossingTreaty",
        "kind": "progress",
        "label": "双方当面签互不犯境约",
        "detail": "互不侵犯要由桥、粮、伤者名单兑现，不是王座上一句承诺。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-treaty",
              "id": "demon-treaty-school"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-treaty-sign"
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
        "sinceRevision": 4
      },
      "claim-demon-treaty": {
        "id": "claim-demon-treaty",
        "task": "demon-treaty",
        "map": "two-realms-crossing",
        "objectId": "crossingTreaty",
        "kind": "claim",
        "label": "交付：两界城先有一座桥",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-demon-century": {
        "id": "accept-demon-century",
        "task": "demon-century",
        "map": "demon-palace",
        "objectId": "palaceEdict",
        "kind": "accept",
        "label": "接下：百年里仍要面对的人",
        "detail": "十年照护、二十年告别、五十年遇刺、百年交接分别留实际记录。",
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
        "sinceRevision": 4
      },
      "demon-century-ten-care": {
        "id": "demon-century-ten-care",
        "task": "demon-century",
        "map": "demon-palace",
        "objectId": "palacePrisoners",
        "kind": "progress",
        "label": "第十年交旧伤医案与追念记录",
        "detail": "十年照护、二十年告别、五十年遇刺、百年交接分别留实际记录。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "demon-century-ten-care"
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
        "sinceRevision": 4
      },
      "demon-century-twenty-farewell": {
        "id": "demon-century-twenty-farewell",
        "task": "demon-century",
        "map": "demon-palace",
        "objectId": "palaceMemorial",
        "kind": "progress",
        "label": "第二十年接师门正式讣告与遗教",
        "detail": "十年照护、二十年告别、五十年遇刺、百年交接分别留实际记录。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-century",
              "id": "demon-century-ten-care"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-century-twenty-farewell"
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
        "sinceRevision": 4
      },
      "demon-century-fifty-assassin": {
        "id": "demon-century-fifty-assassin",
        "task": "demon-century",
        "map": "demon-palace",
        "objectId": "palaceWarTable",
        "kind": "battle",
        "label": "第五十年护住议庭，击退刺客",
        "detail": "十年照护、二十年告别、五十年遇刺、百年交接分别留实际记录。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-century",
              "id": "demon-century-twenty-farewell"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-century-fifty-assassin"
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
        "sinceRevision": 4,
        "encounter": "demon-century-fifty-assassin-encounter"
      },
      "demon-century-hundred-handoff": {
        "id": "demon-century-hundred-handoff",
        "task": "demon-century",
        "map": "demon-palace",
        "objectId": "palaceLingyun",
        "kind": "progress",
        "label": "百年后来使在场，核继任与退路",
        "detail": "十年照护、二十年告别、五十年遇刺、百年交接分别留实际记录。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-century",
              "id": "demon-century-fifty-assassin"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-century-hundred-handoff"
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
        "sinceRevision": 4
      },
      "claim-demon-century": {
        "id": "claim-demon-century",
        "task": "demon-century",
        "map": "demon-palace",
        "objectId": "palaceEdict",
        "kind": "claim",
        "label": "交付：百年里仍要面对的人",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-demon-dacheng-trial": {
        "id": "accept-demon-dacheng-trial",
        "task": "demon-dacheng-trial",
        "map": "demon-palace",
        "objectId": "palaceEdict",
        "kind": "accept",
        "label": "接下：魔域百年大乘试炼",
        "detail": "两段真实试炼之间可退出整备，失败只重试当前段，只有交付才突破。",
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
        "sinceRevision": 4
      },
      "demon-dacheng-trial-first": {
        "id": "demon-dacheng-trial-first",
        "task": "demon-dacheng-trial",
        "map": "demon-palace",
        "objectId": "palaceEdict",
        "kind": "battle",
        "label": "第一段：稳住逆流",
        "detail": "两段真实试炼之间可退出整备，失败只重试当前段，只有交付才突破。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "demon-dacheng-trial-first"
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
        "sinceRevision": 4,
        "encounter": "demon-dacheng-trial-first-encounter"
      },
      "demon-dacheng-trial-second": {
        "id": "demon-dacheng-trial-second",
        "task": "demon-dacheng-trial",
        "map": "demon-palace",
        "objectId": "palaceEdict",
        "kind": "battle",
        "label": "第二段：护住本心",
        "detail": "两段真实试炼之间可退出整备，失败只重试当前段，只有交付才突破。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-dacheng-trial",
              "id": "demon-dacheng-trial-first"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-dacheng-trial-second"
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
        "sinceRevision": 4,
        "encounter": "demon-dacheng-trial-second-encounter"
      },
      "claim-demon-dacheng-trial": {
        "id": "claim-demon-dacheng-trial",
        "task": "demon-dacheng-trial",
        "map": "demon-palace",
        "objectId": "palaceEdict",
        "kind": "claim",
        "label": "交付：魔域百年大乘试炼",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-demon-future-choice": {
        "id": "accept-demon-future-choice",
        "task": "demon-future-choice",
        "map": "demon-palace",
        "objectId": "palaceEdict",
        "kind": "accept",
        "label": "接下：尊位之后如何交代",
        "detail": "统治、赎罪、归隐、杏旗改革与守门各有真实后续，不在这里直接结局。",
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
        "sinceRevision": 4
      },
      "demon-future-lord": {
        "id": "demon-future-lord",
        "task": "demon-future-choice",
        "map": "demon-palace",
        "objectId": "palaceEdict",
        "kind": "choice",
        "label": "以仁魔之规承担尊位",
        "detail": "实际安置俘虏、确认军令与继任体系，不把复仇变成无限杀戮。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "lord",
        "confirm": {
          "title": "以仁魔之规承担尊位",
          "text": "实际安置俘虏、确认军令与继任体系，不把复仇变成无限杀戮。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "demon-future-dark": {
        "id": "demon-future-dark",
        "task": "demon-future-choice",
        "map": "demon-palace",
        "objectId": "palaceEdict",
        "kind": "choice",
        "label": "破约走向万世魔治",
        "detail": "将真实伤害旧友与压制诸部；这是不可逆的道路，普通战败不会代选。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "dark",
        "confirm": {
          "title": "破约走向万世魔治",
          "text": "将真实伤害旧友与压制诸部；这是不可逆的道路，普通战败不会代选。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "demon-future-redeem": {
        "id": "demon-future-redeem",
        "task": "demon-future-choice",
        "map": "demon-palace",
        "objectId": "palaceEdict",
        "kind": "choice",
        "label": "退兵赔偿，自囚赎罪",
        "detail": "归还军权与兵器并实际停止运用修为，再去锁妖塔自囚。",
        "requires": {
          "all": [
            {
              "type": "legacyToken",
              "id": "foxHairpin"
            }
          ],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "redeem",
        "confirm": {
          "title": "退兵赔偿，自囚赎罪",
          "text": "归还军权与兵器并实际停止运用修为，再去锁妖塔自囚。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "demon-future-hermit": {
        "id": "demon-future-hermit",
        "task": "demon-future-choice",
        "map": "demon-palace",
        "objectId": "palaceEdict",
        "kind": "choice",
        "label": "交位归隐北岸",
        "detail": "真实交军权、建屋保温、护住凝霜残魂；空锁壳保留历史。",
        "requires": {
          "all": [
            {
              "type": "legacyToken",
              "id": "foxHairpin"
            },
            {
              "type": "legacyToken",
              "id": "locket"
            }
          ],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "hermit",
        "confirm": {
          "title": "交位归隐北岸",
          "text": "真实交军权、建屋保温、护住凝霜残魂；空锁壳保留历史。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "demon-future-reform": {
        "id": "demon-future-reform",
        "task": "demon-future-choice",
        "map": "demon-palace",
        "objectId": "palaceEdict",
        "kind": "choice",
        "label": "以杏旗偿还累世血债",
        "detail": "女主接母亲遗志，真实废血祭、办学、开边市；舅舅不是道侣。",
        "requires": {
          "all": [
            {
              "type": "gender",
              "id": "female"
            },
            {
              "type": "token",
              "id": "demon-apricot-flag"
            },
            {
              "type": "token",
              "id": "demon-mother-hairpin"
            }
          ],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "reform",
        "confirm": {
          "title": "以杏旗偿还累世血债",
          "text": "女主接母亲遗志，真实废血祭、办学、开边市；舅舅不是道侣。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "demon-future-guardian": {
        "id": "demon-future-guardian",
        "task": "demon-future-choice",
        "map": "demon-palace",
        "objectId": "palaceEdict",
        "kind": "choice",
        "label": "追查碎片，准备守门",
        "detail": "先到冰原核碎片，再到真实轮回大殿护魂，不能直接点出守门结局。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "guardian",
        "confirm": {
          "title": "追查碎片，准备守门",
          "text": "先到冰原核碎片，再到真实轮回大殿护魂，不能直接点出守门结局。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "claim-demon-future-choice": {
        "id": "claim-demon-future-choice",
        "task": "demon-future-choice",
        "map": "demon-palace",
        "objectId": "palaceEdict",
        "kind": "claim",
        "label": "把决定写入交接案",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-demon-lord-settlement": {
        "id": "accept-demon-lord-settlement",
        "task": "demon-lord-settlement",
        "map": "demon-palace",
        "objectId": "palaceEdict",
        "kind": "accept",
        "label": "接下：尊位与仁魔之规",
        "detail": "每项交代完成后才收束此生，普通失败仍可重试当前战。",
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
        "sinceRevision": 4
      },
      "demon-lord-settlement-prisoners": {
        "id": "demon-lord-settlement-prisoners",
        "task": "demon-lord-settlement",
        "map": "demon-palace",
        "objectId": "palacePrisoners",
        "kind": "progress",
        "label": "按案释放无罪俘虏",
        "detail": "每项交代完成后才收束此生，普通失败仍可重试当前战。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "demon-lord-settlement-prisoners"
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
        "sinceRevision": 4
      },
      "demon-lord-settlement-order": {
        "id": "demon-lord-settlement-order",
        "task": "demon-lord-settlement",
        "map": "demon-palace",
        "objectId": "palaceWarTable",
        "kind": "progress",
        "label": "向实到部众颁行不犯凡人令",
        "detail": "每项交代完成后才收束此生，普通失败仍可重试当前战。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-lord-settlement",
              "id": "demon-lord-settlement-prisoners"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-lord-settlement-order"
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
        "sinceRevision": 4
      },
      "demon-lord-settlement-trade": {
        "id": "demon-lord-settlement-trade",
        "task": "demon-lord-settlement",
        "map": "two-realms-crossing",
        "objectId": "crossingTradeSeal",
        "kind": "progress",
        "label": "验两界商队仍可依约通行",
        "detail": "每项交代完成后才收束此生，普通失败仍可重试当前战。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-lord-settlement",
              "id": "demon-lord-settlement-order"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-lord-settlement-trade"
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
        "sinceRevision": 4
      },
      "claim-demon-lord-settlement": {
        "id": "claim-demon-lord-settlement",
        "task": "demon-lord-settlement",
        "map": "demon-palace",
        "objectId": "palaceEdict",
        "kind": "claim",
        "label": "交付：尊位与仁魔之规",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-demon-dark-conquest": {
        "id": "accept-demon-dark-conquest",
        "task": "demon-dark-conquest",
        "map": "demon-palace",
        "objectId": "palaceWarTable",
        "kind": "accept",
        "label": "接下：破约的代价",
        "detail": "每项交代完成后才收束此生，普通失败仍可重试当前战。",
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
        "sinceRevision": 4
      },
      "demon-dark-conquest-break-treaty": {
        "id": "demon-dark-conquest-break-treaty",
        "task": "demon-dark-conquest",
        "map": "two-realms-crossing",
        "objectId": "crossingTreaty",
        "kind": "progress",
        "label": "当众毁约，记下被迫离开的边民",
        "detail": "每项交代完成后才收束此生，普通失败仍可重试当前战。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "demon-dark-conquest-break-treaty"
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
        "sinceRevision": 4
      },
      "demon-dark-conquest-old-friend": {
        "id": "demon-dark-conquest-old-friend",
        "task": "demon-dark-conquest",
        "map": "demon-palace",
        "objectId": "palaceLingyun",
        "kind": "battle",
        "label": "面对阻你继续破约的旧友",
        "detail": "每项交代完成后才收束此生，普通失败仍可重试当前战。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-dark-conquest",
              "id": "demon-dark-conquest-break-treaty"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-dark-conquest-old-friend"
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
        "sinceRevision": 4,
        "encounter": "demon-dark-conquest-old-friend-encounter"
      },
      "demon-dark-conquest-lost-friend": {
        "id": "demon-dark-conquest-lost-friend",
        "task": "demon-dark-conquest",
        "map": "demon-palace",
        "objectId": "palaceMemorial",
        "kind": "progress",
        "label": "确认旧友已因这次选择离世",
        "detail": "每项交代完成后才收束此生，普通失败仍可重试当前战。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-dark-conquest",
              "id": "demon-dark-conquest-old-friend"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-dark-conquest-lost-friend"
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
        "sinceRevision": 4
      },
      "demon-dark-conquest-command": {
        "id": "demon-dark-conquest-command",
        "task": "demon-dark-conquest",
        "map": "demon-palace",
        "objectId": "palaceEdict",
        "kind": "progress",
        "label": "在失去亲故的代价上颁新魔令",
        "detail": "每项交代完成后才收束此生，普通失败仍可重试当前战。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-dark-conquest",
              "id": "demon-dark-conquest-lost-friend"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-dark-conquest-command"
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
        "sinceRevision": 4
      },
      "claim-demon-dark-conquest": {
        "id": "claim-demon-dark-conquest",
        "task": "demon-dark-conquest",
        "map": "demon-palace",
        "objectId": "palaceWarTable",
        "kind": "claim",
        "label": "交付：破约的代价",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-demon-redemption-handoff": {
        "id": "accept-demon-redemption-handoff",
        "task": "demon-redemption-handoff",
        "map": "demon-palace",
        "objectId": "palacePrisoners",
        "kind": "accept",
        "label": "接下：退兵之后走进塔底",
        "detail": "每项交代完成后才收束此生，普通失败仍可重试当前战。",
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
        "sinceRevision": 4
      },
      "demon-redemption-handoff-military": {
        "id": "demon-redemption-handoff-military",
        "task": "demon-redemption-handoff",
        "map": "demon-palace",
        "objectId": "palaceWarTable",
        "kind": "progress",
        "label": "交出军令并遣散私兵",
        "detail": "每项交代完成后才收束此生，普通失败仍可重试当前战。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "demon-redemption-handoff-military"
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
        "sinceRevision": 4
      },
      "demon-redemption-handoff-victims": {
        "id": "demon-redemption-handoff-victims",
        "task": "demon-redemption-handoff",
        "map": "two-realms-crossing",
        "objectId": "crossingVictims",
        "kind": "progress",
        "label": "逐名确认赔偿与后续照护",
        "detail": "每项交代完成后才收束此生，普通失败仍可重试当前战。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-redemption-handoff",
              "id": "demon-redemption-handoff-military"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-redemption-handoff-victims"
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
        "sinceRevision": 4
      },
      "demon-redemption-handoff-relinquish": {
        "id": "demon-redemption-handoff-relinquish",
        "task": "demon-redemption-handoff",
        "map": "demon-palace",
        "objectId": "palaceEdict",
        "kind": "progress",
        "label": "交出魔尊令，自愿停止运用修为",
        "detail": "每项交代完成后才收束此生，普通失败仍可重试当前战。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-redemption-handoff",
              "id": "demon-redemption-handoff-victims"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-redemption-handoff-relinquish"
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
        "sinceRevision": 4
      },
      "claim-demon-redemption-handoff": {
        "id": "claim-demon-redemption-handoff",
        "task": "demon-redemption-handoff",
        "map": "tower-duty",
        "objectId": "towerDutyLedger",
        "kind": "claim",
        "label": "交付：退兵之后走进塔底",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "demon-redemption-enter-tower": {
        "id": "demon-redemption-enter-tower",
        "task": "demon-redemption-handoff",
        "map": "tower-duty",
        "objectId": "towerDutyLedger",
        "kind": "progress",
        "label": "亲自到塔中登记自囚",
        "detail": "已交军权且封存魔功后，以余生为受难者诵名。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-redemption-handoff",
              "id": "demon-redemption-handoff-relinquish"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-redemption-enter-tower"
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
        "sinceRevision": 4
      },
      "accept-demon-hermit-care": {
        "id": "accept-demon-hermit-care",
        "task": "demon-hermit-care",
        "map": "demon-palace",
        "objectId": "palaceLingyun",
        "kind": "accept",
        "label": "接下：北岸的木屋与回应",
        "detail": "每项交代完成后才收束此生，普通失败仍可重试当前战。",
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
        "sinceRevision": 4
      },
      "demon-hermit-care-successor": {
        "id": "demon-hermit-care-successor",
        "task": "demon-hermit-care",
        "map": "demon-palace",
        "objectId": "palaceEdict",
        "kind": "progress",
        "label": "选定能履约的继任并交出军权",
        "detail": "每项交代完成后才收束此生，普通失败仍可重试当前战。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "demon-hermit-care-successor"
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
        "sinceRevision": 4
      },
      "demon-hermit-care-gather": {
        "id": "demon-hermit-care-gather",
        "task": "demon-hermit-care",
        "map": "icefield-cavern",
        "objectId": "iceShelter",
        "kind": "progress",
        "label": "收拾北岸两份可用屋料",
        "detail": "每项交代完成后才收束此生，普通失败仍可重试当前战。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-hermit-care",
              "id": "demon-hermit-care-successor"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-hermit-care-gather"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "demon-hermit-wood": 2
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "demon-hermit-care-roof": {
        "id": "demon-hermit-care-roof",
        "task": "demon-hermit-care",
        "map": "icefield-cavern",
        "objectId": "iceShelter",
        "kind": "progress",
        "label": "修好木屋顶",
        "detail": "每项交代完成后才收束此生，普通失败仍可重试当前战。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-hermit-care",
              "id": "demon-hermit-care-gather"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-hermit-care-roof"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "demon-hermit-wood": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "demon-hermit-care-window": {
        "id": "demon-hermit-care-window",
        "task": "demon-hermit-care",
        "map": "icefield-cavern",
        "objectId": "iceFire",
        "kind": "progress",
        "label": "封窗护温，把狐簪安稳放好",
        "detail": "每项交代完成后才收束此生，普通失败仍可重试当前战。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-hermit-care",
              "id": "demon-hermit-care-roof"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-hermit-care-window"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "demon-hermit-wood": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "demon-hermit-care-answer": {
        "id": "demon-hermit-care-answer",
        "task": "demon-hermit-care",
        "map": "icefield-cavern",
        "objectId": "iceFire",
        "kind": "progress",
        "label": "尊重凝霜残魂自己的回应",
        "detail": "每项交代完成后才收束此生，普通失败仍可重试当前战。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-hermit-care",
              "id": "demon-hermit-care-window"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-hermit-care-answer"
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
        "sinceRevision": 4
      },
      "claim-demon-hermit-care": {
        "id": "claim-demon-hermit-care",
        "task": "demon-hermit-care",
        "map": "icefield-cavern",
        "objectId": "iceFire",
        "kind": "claim",
        "label": "交付：北岸的木屋与回应",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-demon-apricot-reform": {
        "id": "accept-demon-apricot-reform",
        "task": "demon-apricot-reform",
        "map": "demon-palace",
        "objectId": "palaceEdict",
        "kind": "accept",
        "label": "接下：杏旗必须兑现的四件事",
        "detail": "每项交代完成后才收束此生，普通失败仍可重试当前战。",
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
        "sinceRevision": 4
      },
      "demon-apricot-reform-stop-sacrifice": {
        "id": "demon-apricot-reform-stop-sacrifice",
        "task": "demon-apricot-reform",
        "map": "demon-palace",
        "objectId": "palacePrisoners",
        "kind": "progress",
        "label": "废血祭并放还被选作牺牲的人",
        "detail": "每项交代完成后才收束此生，普通失败仍可重试当前战。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "demon-apricot-reform-stop-sacrifice"
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
        "sinceRevision": 4
      },
      "demon-apricot-reform-school": {
        "id": "demon-apricot-reform-school",
        "task": "demon-apricot-reform",
        "map": "demon-tribes",
        "objectId": "tribesSchool",
        "kind": "progress",
        "label": "确认义塾由独立教习长期接办",
        "detail": "每项交代完成后才收束此生，普通失败仍可重试当前战。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-apricot-reform",
              "id": "demon-apricot-reform-stop-sacrifice"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-apricot-reform-school"
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
        "sinceRevision": 4
      },
      "demon-apricot-reform-market": {
        "id": "demon-apricot-reform-market",
        "task": "demon-apricot-reform",
        "map": "two-realms-crossing",
        "objectId": "crossingTradeSeal",
        "kind": "progress",
        "label": "取消压制边民的旧关约",
        "detail": "每项交代完成后才收束此生，普通失败仍可重试当前战。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-apricot-reform",
              "id": "demon-apricot-reform-school"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-apricot-reform-market"
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
        "sinceRevision": 4
      },
      "demon-apricot-reform-vow": {
        "id": "demon-apricot-reform-vow",
        "task": "demon-apricot-reform",
        "map": "demon-palace",
        "objectId": "palaceLegacy",
        "kind": "progress",
        "label": "以母亲银簪与杏旗正式承担改革",
        "detail": "每项交代完成后才收束此生，普通失败仍可重试当前战。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "demon-apricot-reform",
              "id": "demon-apricot-reform-market"
            }
          ],
          "any": []
        },
        "marks": [
          "demon-apricot-reform-vow"
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
        "sinceRevision": 4
      },
      "claim-demon-apricot-reform": {
        "id": "claim-demon-apricot-reform",
        "task": "demon-apricot-reform",
        "map": "demon-palace",
        "objectId": "palaceEdict",
        "kind": "claim",
        "label": "交付：杏旗必须兑现的四件事",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-enlighten-entry": {
        "id": "accept-enlighten-entry",
        "task": "enlighten-entry",
        "map": "jindan-retreat",
        "objectId": "retreatJourneyBoard",
        "kind": "accept",
        "label": "接下：不急着定罪的第三条路",
        "detail": "先约定三位证人的安全与各自证言，再决定如何公开旧矿案。",
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
        "sinceRevision": 4
      },
      "enlighten-entry-plan": {
        "id": "enlighten-entry-plan",
        "task": "enlighten-entry",
        "map": "jindan-retreat",
        "objectId": "retreatJourneyBoard",
        "kind": "progress",
        "label": "列三证人查访与保护计划",
        "detail": "周三、阿石、陈默的见证各有范围，旧矿账不能直接顶替他们。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "enlighten-entry-plan"
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
        "sinceRevision": 4
      },
      "enlighten-entry-protection": {
        "id": "enlighten-entry-protection",
        "task": "enlighten-entry",
        "map": "jindan-retreat",
        "objectId": "retreatJourneyBoard",
        "kind": "progress",
        "label": "公开自己承担护证与问责的责任",
        "detail": "不会因为查出师门错误就自动背弃所有旧关系。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-entry",
              "id": "enlighten-entry-plan"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-entry-protection"
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
        "sinceRevision": 4
      },
      "claim-enlighten-entry": {
        "id": "claim-enlighten-entry",
        "task": "enlighten-entry",
        "map": "jindan-retreat",
        "objectId": "retreatJourneyBoard",
        "kind": "claim",
        "label": "带着护证约定出发",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-enlighten-yuanying-trial": {
        "id": "accept-enlighten-yuanying-trial",
        "task": "enlighten-yuanying-trial",
        "map": "icefield-cavern",
        "objectId": "iceTablet",
        "kind": "accept",
        "label": "接下：查访前的元婴守心",
        "detail": "以实际护证和守心为准备，两段劫战完成后才交付突破。",
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
        "sinceRevision": 4
      },
      "enlighten-yuanying-trial-first": {
        "id": "enlighten-yuanying-trial-first",
        "task": "enlighten-yuanying-trial",
        "map": "icefield-cavern",
        "objectId": "iceTablet",
        "kind": "battle",
        "label": "第一段：守住自身识念",
        "detail": "以实际护证和守心为准备，两段劫战完成后才交付突破。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "enlighten-yuanying-trial-first"
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
        "sinceRevision": 4,
        "encounter": "enlighten-yuanying-trial-first-encounter"
      },
      "enlighten-yuanying-trial-second": {
        "id": "enlighten-yuanying-trial-second",
        "task": "enlighten-yuanying-trial",
        "map": "icefield-cavern",
        "objectId": "iceTablet",
        "kind": "battle",
        "label": "第二段：守住共同护持",
        "detail": "以实际护证和守心为准备，两段劫战完成后才交付突破。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-yuanying-trial",
              "id": "enlighten-yuanying-trial-first"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-yuanying-trial-second"
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
        "sinceRevision": 4,
        "encounter": "enlighten-yuanying-trial-second-encounter"
      },
      "claim-enlighten-yuanying-trial": {
        "id": "claim-enlighten-yuanying-trial",
        "task": "enlighten-yuanying-trial",
        "map": "icefield-cavern",
        "objectId": "iceTablet",
        "kind": "claim",
        "label": "交付：查访前的元婴守心",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-enlighten-three-witnesses": {
        "id": "accept-enlighten-three-witnesses",
        "task": "enlighten-three-witnesses",
        "map": "qingyang-charity",
        "objectId": "charityZhousan",
        "kind": "accept",
        "label": "接下：三位证人，各自一席",
        "detail": "三人都应有安全、知情与独立署名，不能让一张旧账冒充三个活人。",
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
        "sinceRevision": 4
      },
      "enlighten-three-witnesses-receive": {
        "id": "enlighten-three-witnesses-receive",
        "task": "enlighten-three-witnesses",
        "map": "qingyang-charity",
        "objectId": "charityZhousan",
        "kind": "progress",
        "label": "核领三份护送用料",
        "detail": "三人都应有安全、知情与独立署名，不能让一张旧账冒充三个活人。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "enlighten-three-witnesses-receive"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "enlighten-witness-kit": 3
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "enlighten-three-witnesses-zhou": {
        "id": "enlighten-three-witnesses-zhou",
        "task": "enlighten-three-witnesses",
        "map": "qingyang-charity",
        "objectId": "charityZhousan",
        "kind": "progress",
        "label": "保护周三并核对青阳口供",
        "detail": "三人都应有安全、知情与独立署名，不能让一张旧账冒充三个活人。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-three-witnesses",
              "id": "enlighten-three-witnesses-receive"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-three-witnesses-zhou"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "enlighten-witness-kit": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": [
            "enlighten-zhou-testimony"
          ]
        },
        "sinceRevision": 4
      },
      "enlighten-three-witnesses-ashi": {
        "id": "enlighten-three-witnesses-ashi",
        "task": "enlighten-three-witnesses",
        "map": "icefield-cavern",
        "objectId": "iceMiner",
        "kind": "progress",
        "label": "护矿道中的阿石，记录矿难所见",
        "detail": "三人都应有安全、知情与独立署名，不能让一张旧账冒充三个活人。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-three-witnesses",
              "id": "enlighten-three-witnesses-zhou"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-three-witnesses-ashi"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "enlighten-witness-kit": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": [
            "enlighten-ashi-testimony"
          ]
        },
        "sinceRevision": 4
      },
      "enlighten-three-witnesses-chen": {
        "id": "enlighten-three-witnesses-chen",
        "task": "enlighten-three-witnesses",
        "map": "archive-hearing",
        "objectId": "archiveChenmo",
        "kind": "progress",
        "label": "保护陈默并对照经阁销账",
        "detail": "三人都应有安全、知情与独立署名，不能让一张旧账冒充三个活人。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-three-witnesses",
              "id": "enlighten-three-witnesses-ashi"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-three-witnesses-chen"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "enlighten-witness-kit": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": [
            "enlighten-chen-testimony"
          ]
        },
        "sinceRevision": 4
      },
      "claim-enlighten-three-witnesses": {
        "id": "claim-enlighten-three-witnesses",
        "task": "enlighten-three-witnesses",
        "map": "qingyang-charity",
        "objectId": "charityZhousan",
        "kind": "claim",
        "label": "交付：三位证人，各自一席",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-enlighten-compiled-case": {
        "id": "accept-enlighten-compiled-case",
        "task": "enlighten-compiled-case",
        "map": "archive-hearing",
        "objectId": "archiveComparison",
        "kind": "accept",
        "label": "接下：卷宗夜与狐火验真",
        "detail": "证词、原账和删账互相对勘，护住真话，也保护愿意说话的人。",
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
        "sinceRevision": 4
      },
      "enlighten-compiled-case-original": {
        "id": "enlighten-compiled-case-original",
        "task": "enlighten-compiled-case",
        "map": "archive-hearing",
        "objectId": "archiveOldAccount",
        "kind": "progress",
        "label": "抄核旧矿账的年月与签押",
        "detail": "证词、原账和删账互相对勘，护住真话，也保护愿意说话的人。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "enlighten-compiled-case-original"
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
        "sinceRevision": 4
      },
      "enlighten-compiled-case-erased": {
        "id": "enlighten-compiled-case-erased",
        "task": "enlighten-compiled-case",
        "map": "archive-hearing",
        "objectId": "archiveErasedRoll",
        "kind": "progress",
        "label": "对照被删的矿工与货路名字",
        "detail": "证词、原账和删账互相对勘，护住真话，也保护愿意说话的人。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-compiled-case",
              "id": "enlighten-compiled-case-original"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-compiled-case-erased"
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
        "sinceRevision": 4
      },
      "enlighten-compiled-case-consent": {
        "id": "enlighten-compiled-case-consent",
        "task": "enlighten-compiled-case",
        "map": "archive-hearing",
        "objectId": "archiveFoxLamp",
        "kind": "progress",
        "label": "请凝霜明确同意协助验真",
        "detail": "证词、原账和删账互相对勘，护住真话，也保护愿意说话的人。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-compiled-case",
              "id": "enlighten-compiled-case-erased"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-compiled-case-consent"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "enlighten-fox-wick": 1
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "enlighten-compiled-case-verify": {
        "id": "enlighten-compiled-case-verify",
        "task": "enlighten-compiled-case",
        "map": "archive-hearing",
        "objectId": "archiveFoxLamp",
        "kind": "progress",
        "label": "依三证顺序照验账印",
        "detail": "证词、原账和删账互相对勘，护住真话，也保护愿意说话的人。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-compiled-case",
              "id": "enlighten-compiled-case-consent"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-compiled-case-verify"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "enlighten-fox-wick": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": [
            "enlighten-verified-case"
          ]
        },
        "sinceRevision": 4
      },
      "enlighten-compiled-case-guard": {
        "id": "enlighten-compiled-case-guard",
        "task": "enlighten-compiled-case",
        "map": "archive-hearing",
        "objectId": "archiveComparison",
        "kind": "battle",
        "label": "护住卷宗，击退夜袭死士",
        "detail": "证词、原账和删账互相对勘，护住真话，也保护愿意说话的人。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-compiled-case",
              "id": "enlighten-compiled-case-verify"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-compiled-case-guard"
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
        "sinceRevision": 4,
        "encounter": "enlighten-compiled-case-guard-encounter"
      },
      "claim-enlighten-compiled-case": {
        "id": "claim-enlighten-compiled-case",
        "task": "enlighten-compiled-case",
        "map": "archive-hearing",
        "objectId": "archiveComparison",
        "kind": "claim",
        "label": "交付：卷宗夜与狐火验真",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-enlighten-case-direction": {
        "id": "accept-enlighten-case-direction",
        "task": "enlighten-case-direction",
        "map": "archive-hearing",
        "objectId": "archiveComparison",
        "kind": "accept",
        "label": "接下：案卷之后仍有选择",
        "detail": "继续公开问责，或明确停止追查、自封剑冢。后者不是成功守山的别名。",
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
        "sinceRevision": 4
      },
      "enlighten-continue-case": {
        "id": "enlighten-continue-case",
        "task": "enlighten-case-direction",
        "map": "archive-hearing",
        "objectId": "archiveComparison",
        "kind": "choice",
        "label": "带卷宗公开质询",
        "detail": "继续保护证人、审师与仙魔共敌，不保证所有旧人都能轻松接受。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "continue",
        "confirm": {
          "title": "带卷宗公开质询",
          "text": "继续保护证人、审师与仙魔共敌，不保证所有旧人都能轻松接受。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "enlighten-seal-case": {
        "id": "enlighten-seal-case",
        "task": "enlighten-case-direction",
        "map": "archive-hearing",
        "objectId": "archiveComparison",
        "kind": "choice",
        "label": "停止追查，准备封剑",
        "detail": "将留下未解之案并结束这次旅程。先保存恢复点，再实际交卷、封阵、关门。",
        "requires": {
          "all": [
            {
              "type": "partner",
              "id": "none"
            }
          ],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "seal",
        "confirm": {
          "title": "停止追查，准备封剑",
          "text": "将留下未解之案并结束这次旅程。先保存恢复点，再实际交卷、封阵、关门。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "claim-enlighten-case-direction": {
        "id": "claim-enlighten-case-direction",
        "task": "enlighten-case-direction",
        "map": "archive-hearing",
        "objectId": "archiveComparison",
        "kind": "claim",
        "label": "确认案卷的去向",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-enlighten-sword-seal": {
        "id": "accept-enlighten-sword-seal",
        "task": "enlighten-sword-seal",
        "map": "sword-vault",
        "objectId": "vaultUnfinishedCase",
        "kind": "accept",
        "label": "接下：剑冢里未问完的事",
        "detail": "你明确停止追查，必须把未结卷宗与职责交代清楚，再封住自己的出口。",
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
        "sinceRevision": 4
      },
      "enlighten-sword-seal-dossier": {
        "id": "enlighten-sword-seal-dossier",
        "task": "enlighten-sword-seal",
        "map": "sword-vault",
        "objectId": "vaultUnfinishedCase",
        "kind": "progress",
        "label": "将未解之卷封存并注明缺口",
        "detail": "你明确停止追查，必须把未结卷宗与职责交代清楚，再封住自己的出口。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "enlighten-sword-seal-dossier"
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
        "sinceRevision": 4
      },
      "enlighten-sword-seal-sword": {
        "id": "enlighten-sword-seal-sword",
        "task": "enlighten-sword-seal",
        "map": "sword-vault",
        "objectId": "vaultGuardArray",
        "kind": "progress",
        "label": "把自己的剑封入界内",
        "detail": "你明确停止追查，必须把未结卷宗与职责交代清楚，再封住自己的出口。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-sword-seal",
              "id": "enlighten-sword-seal-dossier"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-sword-seal-sword"
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
        "sinceRevision": 4
      },
      "enlighten-sword-seal-gate": {
        "id": "enlighten-sword-seal-gate",
        "task": "enlighten-sword-seal",
        "map": "sword-vault",
        "objectId": "vaultClosedGate",
        "kind": "progress",
        "label": "最后确认闭门，不再继续此案",
        "detail": "你明确停止追查，必须把未结卷宗与职责交代清楚，再封住自己的出口。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-sword-seal",
              "id": "enlighten-sword-seal-sword"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-sword-seal-gate"
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
        "sinceRevision": 4
      },
      "claim-enlighten-sword-seal": {
        "id": "claim-enlighten-sword-seal",
        "task": "enlighten-sword-seal",
        "map": "sword-vault",
        "objectId": "vaultUnfinishedCase",
        "kind": "claim",
        "label": "交付：剑冢里未问完的事",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-enlighten-public-trial": {
        "id": "accept-enlighten-public-trial",
        "task": "enlighten-public-trial",
        "map": "golden-summit",
        "objectId": "enlightenPublicBench",
        "kind": "accept",
        "label": "接下：三证人在金顶",
        "detail": "让每位证人有自己的发言顺序，再面对被揭面的玄玑。",
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
        "sinceRevision": 4
      },
      "enlighten-public-trial-witnesses": {
        "id": "enlighten-public-trial-witnesses",
        "task": "enlighten-public-trial",
        "map": "golden-summit",
        "objectId": "enlightenPublicBench",
        "kind": "progress",
        "label": "三位证人各自确认出庭意愿",
        "detail": "让每位证人有自己的发言顺序，再面对被揭面的玄玑。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "enlighten-public-trial-witnesses"
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
        "sinceRevision": 4
      },
      "enlighten-public-trial-present": {
        "id": "enlighten-public-trial-present",
        "task": "enlighten-public-trial",
        "map": "golden-summit",
        "objectId": "enlightenPublicBench",
        "kind": "progress",
        "label": "公开卷宗，接受逐项质询",
        "detail": "让每位证人有自己的发言顺序，再面对被揭面的玄玑。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-public-trial",
              "id": "enlighten-public-trial-witnesses"
            },
            {
              "type": "evidence",
              "id": "enlighten-verified-case"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-public-trial-present"
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
        "sinceRevision": 4
      },
      "enlighten-public-trial-battle": {
        "id": "enlighten-public-trial-battle",
        "task": "enlighten-public-trial",
        "map": "golden-summit",
        "objectId": "enlightenPublicBench",
        "kind": "battle",
        "label": "与愿意护证的人联手挡住玄玑",
        "detail": "让每位证人有自己的发言顺序，再面对被揭面的玄玑。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-public-trial",
              "id": "enlighten-public-trial-present"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-public-trial-battle"
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
        "sinceRevision": 4,
        "encounter": "enlighten-public-trial-battle-encounter"
      },
      "enlighten-public-trial-record": {
        "id": "enlighten-public-trial-record",
        "task": "enlighten-public-trial",
        "map": "golden-summit",
        "objectId": "enlightenPublicBench",
        "kind": "progress",
        "label": "记录击破控制后的真实死伤",
        "detail": "让每位证人有自己的发言顺序，再面对被揭面的玄玑。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-public-trial",
              "id": "enlighten-public-trial-battle"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-public-trial-record"
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
        "sinceRevision": 4
      },
      "claim-enlighten-public-trial": {
        "id": "claim-enlighten-public-trial",
        "task": "enlighten-public-trial",
        "map": "golden-summit",
        "objectId": "enlightenPublicBench",
        "kind": "claim",
        "label": "交付：三证人在金顶",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-enlighten-huashen-trial": {
        "id": "accept-enlighten-huashen-trial",
        "task": "enlighten-huashen-trial",
        "map": "golden-summit",
        "objectId": "enlightenPublicBench",
        "kind": "accept",
        "label": "接下：公议后的化神护持",
        "detail": "以实际护证和守心为准备，两段劫战完成后才交付突破。",
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
        "sinceRevision": 4
      },
      "enlighten-huashen-trial-first": {
        "id": "enlighten-huashen-trial-first",
        "task": "enlighten-huashen-trial",
        "map": "golden-summit",
        "objectId": "enlightenPublicBench",
        "kind": "battle",
        "label": "第一段：守住自身识念",
        "detail": "以实际护证和守心为准备，两段劫战完成后才交付突破。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "enlighten-huashen-trial-first"
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
        "sinceRevision": 4,
        "encounter": "enlighten-huashen-trial-first-encounter"
      },
      "enlighten-huashen-trial-second": {
        "id": "enlighten-huashen-trial-second",
        "task": "enlighten-huashen-trial",
        "map": "golden-summit",
        "objectId": "enlightenPublicBench",
        "kind": "battle",
        "label": "第二段：守住共同护持",
        "detail": "以实际护证和守心为准备，两段劫战完成后才交付突破。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-huashen-trial",
              "id": "enlighten-huashen-trial-first"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-huashen-trial-second"
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
        "sinceRevision": 4,
        "encounter": "enlighten-huashen-trial-second-encounter"
      },
      "claim-enlighten-huashen-trial": {
        "id": "claim-enlighten-huashen-trial",
        "task": "enlighten-huashen-trial",
        "map": "golden-summit",
        "objectId": "enlightenPublicBench",
        "kind": "claim",
        "label": "交付：公议后的化神护持",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-enlighten-master-trial": {
        "id": "accept-enlighten-master-trial",
        "task": "enlighten-master-trial",
        "map": "golden-summit",
        "objectId": "enlightenPublicBench",
        "kind": "accept",
        "label": "接下：师罪也应当说清",
        "detail": "清微的帮助与隐瞒都应真实呈现，承担问责而不是一句道歉覆盖旧案。",
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
        "sinceRevision": 4
      },
      "enlighten-master-trial-letter": {
        "id": "enlighten-master-trial-letter",
        "task": "enlighten-master-trial",
        "map": "golden-summit",
        "objectId": "enlightenPublicBench",
        "kind": "progress",
        "label": "核清微私信与当年隐瞒的边界",
        "detail": "清微的帮助与隐瞒都应真实呈现，承担问责而不是一句道歉覆盖旧案。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "enlighten-master-trial-letter"
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
        "sinceRevision": 4
      },
      "enlighten-master-trial-testimony": {
        "id": "enlighten-master-trial-testimony",
        "task": "enlighten-master-trial",
        "map": "golden-summit",
        "objectId": "enlightenPublicBench",
        "kind": "progress",
        "label": "听本人认罪，不由玩家代写清白",
        "detail": "清微的帮助与隐瞒都应真实呈现，承担问责而不是一句道歉覆盖旧案。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-master-trial",
              "id": "enlighten-master-trial-letter"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-master-trial-testimony"
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
        "sinceRevision": 4
      },
      "enlighten-master-trial-penance": {
        "id": "enlighten-master-trial-penance",
        "task": "enlighten-master-trial",
        "map": "golden-summit",
        "objectId": "enlightenPublicBench",
        "kind": "progress",
        "label": "登记三十年思过与对受难者的交代",
        "detail": "清微的帮助与隐瞒都应真实呈现，承担问责而不是一句道歉覆盖旧案。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-master-trial",
              "id": "enlighten-master-trial-testimony"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-master-trial-penance"
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
        "sinceRevision": 4
      },
      "claim-enlighten-master-trial": {
        "id": "claim-enlighten-master-trial",
        "task": "enlighten-master-trial",
        "map": "golden-summit",
        "objectId": "enlightenPublicBench",
        "kind": "claim",
        "label": "交付：师罪也应当说清",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-enlighten-treaty": {
        "id": "accept-enlighten-treaty",
        "task": "enlighten-treaty",
        "map": "two-realms-crossing",
        "objectId": "crossingTreaty",
        "kind": "accept",
        "label": "接下：归元之约的三十年",
        "detail": "通商、破约、义学、正式签约各有实际事务与承担者。",
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
        "sinceRevision": 4
      },
      "enlighten-treaty-receive": {
        "id": "enlighten-treaty-receive",
        "task": "enlighten-treaty",
        "map": "two-realms-crossing",
        "objectId": "crossingTradeSeal",
        "kind": "progress",
        "label": "核领两岸货签与义学册",
        "detail": "通商、破约、义学、正式签约各有实际事务与承担者。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "enlighten-treaty-receive"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "enlighten-trade-parcel": 2,
            "enlighten-school-kit": 1
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "enlighten-treaty-south": {
        "id": "enlighten-treaty-south",
        "task": "enlighten-treaty",
        "map": "two-realms-crossing",
        "objectId": "crossingBridgeSouth",
        "kind": "progress",
        "label": "把货签交南岸商队",
        "detail": "通商、破约、义学、正式签约各有实际事务与承担者。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-treaty",
              "id": "enlighten-treaty-receive"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-treaty-south"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "enlighten-trade-parcel": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "enlighten-treaty-five-trade": {
        "id": "enlighten-treaty-five-trade",
        "task": "enlighten-treaty",
        "map": "two-realms-crossing",
        "objectId": "crossingBridgeNorth",
        "kind": "progress",
        "label": "第五年核北岸实际供货",
        "detail": "通商、破约、义学、正式签约各有实际事务与承担者。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-treaty",
              "id": "enlighten-treaty-south"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-treaty-five-trade"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "enlighten-trade-parcel": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "enlighten-treaty-ten-rebellion": {
        "id": "enlighten-treaty-ten-rebellion",
        "task": "enlighten-treaty",
        "map": "two-realms-crossing",
        "objectId": "crossingVictims",
        "kind": "battle",
        "label": "第十年保护边民，止住破约武装",
        "detail": "通商、破约、义学、正式签约各有实际事务与承担者。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-treaty",
              "id": "enlighten-treaty-five-trade"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-treaty-ten-rebellion"
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
        "sinceRevision": 4,
        "encounter": "enlighten-treaty-ten-rebellion-encounter"
      },
      "enlighten-treaty-twenty-school": {
        "id": "enlighten-treaty-twenty-school",
        "task": "enlighten-treaty",
        "map": "two-realms-crossing",
        "objectId": "crossingSchool",
        "kind": "progress",
        "label": "第二十年把义学册交教习",
        "detail": "通商、破约、义学、正式签约各有实际事务与承担者。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-treaty",
              "id": "enlighten-treaty-ten-rebellion"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-treaty-twenty-school"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "enlighten-school-kit": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "enlighten-treaty-thirty-sign": {
        "id": "enlighten-treaty-thirty-sign",
        "task": "enlighten-treaty",
        "map": "two-realms-crossing",
        "objectId": "crossingTreaty",
        "kind": "progress",
        "label": "第三十年由双方真实签归元约",
        "detail": "通商、破约、义学、正式签约各有实际事务与承担者。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-treaty",
              "id": "enlighten-treaty-twenty-school"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-treaty-thirty-sign"
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
        "sinceRevision": 4
      },
      "claim-enlighten-treaty": {
        "id": "claim-enlighten-treaty",
        "task": "enlighten-treaty",
        "map": "two-realms-crossing",
        "objectId": "crossingTreaty",
        "kind": "claim",
        "label": "交付：归元之约的三十年",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-enlighten-personal-farewell": {
        "id": "accept-enlighten-personal-farewell",
        "task": "enlighten-personal-farewell",
        "map": "archive-hearing",
        "objectId": "archiveWitnessRest",
        "kind": "accept",
        "label": "接下：承诺之后仍要照护的人",
        "detail": "先核人各自的愿望与生活，再面对不可代替的自然告别。",
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
        "sinceRevision": 4
      },
      "enlighten-personal-farewell-shen-wish": {
        "id": "enlighten-personal-farewell-shen-wish",
        "task": "enlighten-personal-farewell",
        "map": "archive-hearing",
        "objectId": "archiveWitnessRest",
        "kind": "progress",
        "label": "留下灵薇亲自确认的执事与杏林愿望",
        "detail": "先核人各自的愿望与生活，再面对不可代替的自然告别。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "enlighten-personal-farewell-shen-wish"
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
        "sinceRevision": 4
      },
      "enlighten-personal-farewell-shen-farewell": {
        "id": "enlighten-personal-farewell-shen-farewell",
        "task": "enlighten-personal-farewell",
        "map": "archive-hearing",
        "objectId": "archiveWitnessRest",
        "kind": "progress",
        "label": "在长期照护后与灵薇告别，不默认配偶",
        "detail": "先核人各自的愿望与生活，再面对不可代替的自然告别。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-personal-farewell",
              "id": "enlighten-personal-farewell-shen-wish"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-personal-farewell-shen-farewell"
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
        "sinceRevision": 4
      },
      "enlighten-personal-farewell-qingwei-farewell": {
        "id": "enlighten-personal-farewell-qingwei-farewell",
        "task": "enlighten-personal-farewell",
        "map": "archive-hearing",
        "objectId": "archiveWitnessRest",
        "kind": "progress",
        "label": "记录清微完成思过之后的最终告别",
        "detail": "先核人各自的愿望与生活，再面对不可代替的自然告别。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-personal-farewell",
              "id": "enlighten-personal-farewell-shen-farewell"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-personal-farewell-qingwei-farewell"
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
        "sinceRevision": 4
      },
      "enlighten-personal-farewell-successors": {
        "id": "enlighten-personal-farewell-successors",
        "task": "enlighten-personal-farewell",
        "map": "archive-hearing",
        "objectId": "archiveWitnessRest",
        "kind": "progress",
        "label": "由活着的后继者接起旧人的职责",
        "detail": "先核人各自的愿望与生活，再面对不可代替的自然告别。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-personal-farewell",
              "id": "enlighten-personal-farewell-qingwei-farewell"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-personal-farewell-successors"
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
        "sinceRevision": 4
      },
      "claim-enlighten-personal-farewell": {
        "id": "claim-enlighten-personal-farewell",
        "task": "enlighten-personal-farewell",
        "map": "archive-hearing",
        "objectId": "archiveWitnessRest",
        "kind": "claim",
        "label": "交付：承诺之后仍要照护的人",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-enlighten-heti-trial": {
        "id": "accept-enlighten-heti-trial",
        "task": "enlighten-heti-trial",
        "map": "sword-vault",
        "objectId": "vaultGuardArray",
        "kind": "accept",
        "label": "接下：归元合体试炼",
        "detail": "以实际护证和守心为准备，两段劫战完成后才交付突破。",
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
        "sinceRevision": 4
      },
      "enlighten-heti-trial-first": {
        "id": "enlighten-heti-trial-first",
        "task": "enlighten-heti-trial",
        "map": "sword-vault",
        "objectId": "vaultGuardArray",
        "kind": "battle",
        "label": "第一段：守住自身识念",
        "detail": "以实际护证和守心为准备，两段劫战完成后才交付突破。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "enlighten-heti-trial-first"
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
        "sinceRevision": 4,
        "encounter": "enlighten-heti-trial-first-encounter"
      },
      "enlighten-heti-trial-second": {
        "id": "enlighten-heti-trial-second",
        "task": "enlighten-heti-trial",
        "map": "sword-vault",
        "objectId": "vaultGuardArray",
        "kind": "battle",
        "label": "第二段：守住共同护持",
        "detail": "以实际护证和守心为准备，两段劫战完成后才交付突破。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-heti-trial",
              "id": "enlighten-heti-trial-first"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-heti-trial-second"
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
        "sinceRevision": 4,
        "encounter": "enlighten-heti-trial-second-encounter"
      },
      "claim-enlighten-heti-trial": {
        "id": "claim-enlighten-heti-trial",
        "task": "enlighten-heti-trial",
        "map": "sword-vault",
        "objectId": "vaultGuardArray",
        "kind": "claim",
        "label": "交付：归元合体试炼",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-enlighten-thirty-one": {
        "id": "accept-enlighten-thirty-one",
        "task": "enlighten-thirty-one",
        "map": "two-realms-crossing",
        "objectId": "crossingTreaty",
        "kind": "accept",
        "label": "接下：同登的人先说愿不愿",
        "detail": "三十位同行者和主角合计三十一人；人数来自自愿名册，绝不自动强拉已亡者。",
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
        "sinceRevision": 4
      },
      "enlighten-thirty-one-names": {
        "id": "enlighten-thirty-one-names",
        "task": "enlighten-thirty-one",
        "map": "two-realms-crossing",
        "objectId": "crossingVictims",
        "kind": "progress",
        "label": "核三十位活着同行者的独立同意",
        "detail": "三十位同行者和主角合计三十一人；人数来自自愿名册，绝不自动强拉已亡者。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "enlighten-thirty-one-names"
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
        "sinceRevision": 4
      },
      "enlighten-thirty-one-roles": {
        "id": "enlighten-thirty-one-roles",
        "task": "enlighten-thirty-one",
        "map": "two-realms-crossing",
        "objectId": "crossingSchool",
        "kind": "progress",
        "label": "按实际专长分守锚、护伤、开路三组",
        "detail": "三十位同行者和主角合计三十一人；人数来自自愿名册，绝不自动强拉已亡者。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-thirty-one",
              "id": "enlighten-thirty-one-names"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-thirty-one-roles"
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
        "sinceRevision": 4
      },
      "enlighten-thirty-one-exercise": {
        "id": "enlighten-thirty-one-exercise",
        "task": "enlighten-thirty-one",
        "map": "two-realms-crossing",
        "objectId": "crossingBridgeNorth",
        "kind": "battle",
        "label": "共同演练护持，守住北桥锚",
        "detail": "三十位同行者和主角合计三十一人；人数来自自愿名册，绝不自动强拉已亡者。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-thirty-one",
              "id": "enlighten-thirty-one-roles"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-thirty-one-exercise"
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
        "sinceRevision": 4,
        "encounter": "enlighten-thirty-one-exercise-encounter"
      },
      "enlighten-thirty-one-check": {
        "id": "enlighten-thirty-one-check",
        "task": "enlighten-thirty-one",
        "map": "two-realms-crossing",
        "objectId": "crossingTreaty",
        "kind": "progress",
        "label": "再次允许任何人退出，封存最终名册",
        "detail": "三十位同行者和主角合计三十一人；人数来自自愿名册，绝不自动强拉已亡者。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-thirty-one",
              "id": "enlighten-thirty-one-exercise"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-thirty-one-check"
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
        "sinceRevision": 4
      },
      "claim-enlighten-thirty-one": {
        "id": "claim-enlighten-thirty-one",
        "task": "enlighten-thirty-one",
        "map": "two-realms-crossing",
        "objectId": "crossingTreaty",
        "kind": "claim",
        "label": "交付：同登的人先说愿不愿",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-enlighten-dacheng-trial": {
        "id": "accept-enlighten-dacheng-trial",
        "task": "enlighten-dacheng-trial",
        "map": "sword-vault",
        "objectId": "vaultOath",
        "kind": "accept",
        "label": "接下：众生同度的大乘劫",
        "detail": "以实际护证和守心为准备，两段劫战完成后才交付突破。",
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
        "sinceRevision": 4
      },
      "enlighten-dacheng-trial-first": {
        "id": "enlighten-dacheng-trial-first",
        "task": "enlighten-dacheng-trial",
        "map": "sword-vault",
        "objectId": "vaultOath",
        "kind": "battle",
        "label": "第一段：守住自身识念",
        "detail": "以实际护证和守心为准备，两段劫战完成后才交付突破。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "enlighten-dacheng-trial-first"
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
        "sinceRevision": 4,
        "encounter": "enlighten-dacheng-trial-first-encounter"
      },
      "enlighten-dacheng-trial-second": {
        "id": "enlighten-dacheng-trial-second",
        "task": "enlighten-dacheng-trial",
        "map": "sword-vault",
        "objectId": "vaultOath",
        "kind": "battle",
        "label": "第二段：守住共同护持",
        "detail": "以实际护证和守心为准备，两段劫战完成后才交付突破。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-dacheng-trial",
              "id": "enlighten-dacheng-trial-first"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-dacheng-trial-second"
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
        "sinceRevision": 4,
        "encounter": "enlighten-dacheng-trial-second-encounter"
      },
      "claim-enlighten-dacheng-trial": {
        "id": "claim-enlighten-dacheng-trial",
        "task": "enlighten-dacheng-trial",
        "map": "sword-vault",
        "objectId": "vaultOath",
        "kind": "claim",
        "label": "交付：众生同度的大乘劫",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-enlighten-final-vow": {
        "id": "accept-enlighten-final-vow",
        "task": "enlighten-final-vow",
        "map": "sword-vault",
        "objectId": "vaultOath",
        "kind": "accept",
        "label": "接下：天光之下保留自己的道",
        "detail": "共同开界与独守蜀山都有实际后续；不是在这里直接改结局标题。",
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
        "sinceRevision": 4
      },
      "enlighten-choose-grand": {
        "id": "enlighten-choose-grand",
        "task": "enlighten-final-vow",
        "map": "sword-vault",
        "objectId": "vaultOath",
        "kind": "choice",
        "label": "与同路人开同天界",
        "detail": "名册自愿、护持真实之后，共同寻找能平等修行的新界。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "grand",
        "confirm": {
          "title": "与同路人开同天界",
          "text": "名册自愿、护持真实之后，共同寻找能平等修行的新界。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "enlighten-choose-guard": {
        "id": "enlighten-choose-guard",
        "task": "enlighten-final-vow",
        "map": "sword-vault",
        "objectId": "vaultOath",
        "kind": "choice",
        "label": "留下独守蜀山",
        "detail": "保持已经达到的境界，完成三次不同护山目标，随后结束这一生。",
        "requires": {
          "all": [
            {
              "type": "partner",
              "id": "none"
            }
          ],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "guard",
        "confirm": {
          "title": "留下独守蜀山",
          "text": "保持已经达到的境界，完成三次不同护山目标，随后结束这一生。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "claim-enlighten-final-vow": {
        "id": "claim-enlighten-final-vow",
        "task": "enlighten-final-vow",
        "map": "sword-vault",
        "objectId": "vaultOath",
        "kind": "claim",
        "label": "确认最后的护持职责",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-enlighten-open-common-heaven": {
        "id": "accept-enlighten-open-common-heaven",
        "task": "enlighten-open-common-heaven",
        "map": "sword-vault",
        "objectId": "vaultOath",
        "kind": "accept",
        "label": "接下：同天之界由众人共同守成",
        "detail": "三组各完成一件真实护持，最后仍允许各自决定去留。",
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
        "sinceRevision": 4
      },
      "enlighten-open-common-heaven-anchor": {
        "id": "enlighten-open-common-heaven-anchor",
        "task": "enlighten-open-common-heaven",
        "map": "sword-vault",
        "objectId": "vaultGuardArray",
        "kind": "progress",
        "label": "由守锚组稳住开界剑阵",
        "detail": "三组各完成一件真实护持，最后仍允许各自决定去留。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "enlighten-open-common-heaven-anchor"
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
        "sinceRevision": 4
      },
      "enlighten-open-common-heaven-care": {
        "id": "enlighten-open-common-heaven-care",
        "task": "enlighten-open-common-heaven",
        "map": "two-realms-crossing",
        "objectId": "crossingVictims",
        "kind": "progress",
        "label": "由护伤组交代同行者的照护",
        "detail": "三组各完成一件真实护持，最后仍允许各自决定去留。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-open-common-heaven",
              "id": "enlighten-open-common-heaven-anchor"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-open-common-heaven-care"
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
        "sinceRevision": 4
      },
      "enlighten-open-common-heaven-road": {
        "id": "enlighten-open-common-heaven-road",
        "task": "enlighten-open-common-heaven",
        "map": "two-realms-crossing",
        "objectId": "crossingBridgeNorth",
        "kind": "progress",
        "label": "由开路组确认最后安全通道",
        "detail": "三组各完成一件真实护持，最后仍允许各自决定去留。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-open-common-heaven",
              "id": "enlighten-open-common-heaven-care"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-open-common-heaven-road"
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
        "sinceRevision": 4
      },
      "enlighten-open-common-heaven-consent": {
        "id": "enlighten-open-common-heaven-consent",
        "task": "enlighten-open-common-heaven",
        "map": "sword-vault",
        "objectId": "vaultOath",
        "kind": "progress",
        "label": "与三十同路人再次确认平等开界之约",
        "detail": "三组各完成一件真实护持，最后仍允许各自决定去留。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-open-common-heaven",
              "id": "enlighten-open-common-heaven-road"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-open-common-heaven-consent"
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
        "sinceRevision": 4
      },
      "claim-enlighten-open-common-heaven": {
        "id": "claim-enlighten-open-common-heaven",
        "task": "enlighten-open-common-heaven",
        "map": "sword-vault",
        "objectId": "vaultOath",
        "kind": "claim",
        "label": "交付：同天之界由众人共同守成",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-enlighten-sword-guard": {
        "id": "accept-enlighten-sword-guard",
        "task": "enlighten-sword-guard",
        "map": "sword-vault",
        "objectId": "vaultGuardArray",
        "kind": "accept",
        "label": "接下：独守也有三种需要",
        "detail": "来犯、灾害与后继者都需要不同回应，千年守山由这三种真实代表事件展开。",
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
        "sinceRevision": 4
      },
      "enlighten-sword-guard-invasion": {
        "id": "enlighten-sword-guard-invasion",
        "task": "enlighten-sword-guard",
        "map": "sword-vault",
        "objectId": "vaultGuardArray",
        "kind": "battle",
        "label": "第一事：挡住犯境妖影",
        "detail": "来犯、灾害与后继者都需要不同回应，千年守山由这三种真实代表事件展开。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "enlighten-sword-guard-invasion"
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
        "sinceRevision": 4,
        "encounter": "enlighten-sword-guard-invasion-encounter"
      },
      "enlighten-sword-guard-disaster": {
        "id": "enlighten-sword-guard-disaster",
        "task": "enlighten-sword-guard",
        "map": "sword-vault",
        "objectId": "vaultLesson",
        "kind": "progress",
        "label": "第二事：交山下避灾路线与物资安排",
        "detail": "来犯、灾害与后继者都需要不同回应，千年守山由这三种真实代表事件展开。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-sword-guard",
              "id": "enlighten-sword-guard-invasion"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-sword-guard-disaster"
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
        "sinceRevision": 4
      },
      "enlighten-sword-guard-successor": {
        "id": "enlighten-sword-guard-successor",
        "task": "enlighten-sword-guard",
        "map": "sword-vault",
        "objectId": "vaultMemorial",
        "kind": "progress",
        "label": "第三事：留下后继者可查的护山记录",
        "detail": "来犯、灾害与后继者都需要不同回应，千年守山由这三种真实代表事件展开。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "enlighten-sword-guard",
              "id": "enlighten-sword-guard-disaster"
            }
          ],
          "any": []
        },
        "marks": [
          "enlighten-sword-guard-successor"
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
        "sinceRevision": 4
      },
      "claim-enlighten-sword-guard": {
        "id": "claim-enlighten-sword-guard",
        "task": "enlighten-sword-guard",
        "map": "sword-vault",
        "objectId": "vaultGuardArray",
        "kind": "claim",
        "label": "交付：独守也有三种需要",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-mortal-renunciation": {
        "id": "accept-mortal-renunciation",
        "task": "mortal-renunciation",
        "map": "apricot-village",
        "objectId": "apricotDepartureDesk",
        "kind": "accept",
        "label": "接下：归凡前，先把旧责说清",
        "detail": "散功会实际停止修为、灵力与法宝被动；收藏和突破历史保留。先保管恢复点，再由本人决定。",
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
        "sinceRevision": 4
      },
      "mortal-list-responsibilities": {
        "id": "mortal-list-responsibilities",
        "task": "mortal-renunciation",
        "map": "apricot-village",
        "objectId": "apricotDepartureDesk",
        "kind": "progress",
        "label": "列清已有职责与尚未结束的委托",
        "detail": "不删除已做之事。此后凡人身体不能继续运灵战斗，未完修行事务会给明确原因。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "mortal-list-responsibilities"
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
        "sinceRevision": 4
      },
      "mortal-store-implements": {
        "id": "mortal-store-implements",
        "task": "mortal-renunciation",
        "map": "apricot-village",
        "objectId": "apricotDepartureDesk",
        "kind": "progress",
        "label": "把灵器按原所有权封存",
        "detail": "收藏、配装历史保留，但封存后不能借灵器词条获得凡人不该有的力量。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-renunciation",
              "id": "mortal-list-responsibilities"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-store-implements"
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
        "sinceRevision": 4
      },
      "mortal-confirm-renounce": {
        "id": "mortal-confirm-renounce",
        "task": "mortal-renunciation",
        "map": "apricot-village",
        "objectId": "apricotDepartureDesk",
        "kind": "choice",
        "label": "明确决定散功归凡",
        "detail": "这会实际关闭运灵能力、境界加成、法宝被动与回灵；普通工具、知识、食物仍可用。只有真实恢复点能返回先前身体，不会在普通村务中自动恢复。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-renunciation",
              "id": "mortal-store-implements"
            }
          ],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "renounce",
        "confirm": {
          "title": "明确决定散功归凡",
          "text": "这会实际关闭运灵能力、境界加成、法宝被动与回灵；普通工具、知识、食物仍可用。只有真实恢复点能返回先前身体，不会在普通村务中自动恢复。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "claim-mortal-renunciation": {
        "id": "claim-mortal-renunciation",
        "task": "mortal-renunciation",
        "map": "apricot-village",
        "objectId": "apricotDepartureDesk",
        "kind": "claim",
        "label": "再次确认散功并完成交接",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
            "mortal-old-flute"
          ],
          "evidence": []
        },
        "sinceRevision": 4,
        "confirm": {
          "title": "最后确认散功归凡",
          "text": "已成功保管恢复点后，才完成能力切换。你保留收藏与曾经的突破记录，但从此以凡人的身体经营医塾。",
          "label": "确认散功"
        }
      },
      "accept-mortal-livelihood": {
        "id": "accept-mortal-livelihood",
        "task": "mortal-livelihood",
        "map": "apricot-homestead",
        "objectId": "homesteadWork",
        "kind": "accept",
        "label": "接下：凡人的一间屋",
        "detail": "从短工、修屋与种药开始，普通身体不靠御剑越水或施法施工。",
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
        "sinceRevision": 4
      },
      "mortal-livelihood-work": {
        "id": "mortal-livelihood-work",
        "task": "mortal-livelihood",
        "map": "apricot-homestead",
        "objectId": "homesteadWork",
        "kind": "progress",
        "label": "完成短工，领两份木材",
        "detail": "从短工、修屋与种药开始，普通身体不靠御剑越水或施法施工。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "mortal-livelihood-work"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {
            "cake": 2
          },
          "supplies": {
            "mortal-house-wood": 2
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "mortal-livelihood-seeds": {
        "id": "mortal-livelihood-seeds",
        "task": "mortal-livelihood",
        "map": "apricot-homestead",
        "objectId": "homesteadGarden",
        "kind": "progress",
        "label": "向药圃领两包民间药种",
        "detail": "从短工、修屋与种药开始，普通身体不靠御剑越水或施法施工。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-livelihood",
              "id": "mortal-livelihood-work"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-livelihood-seeds"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "mortal-herb-seed": 2
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "mortal-livelihood-roof": {
        "id": "mortal-livelihood-roof",
        "task": "mortal-livelihood",
        "map": "apricot-homestead",
        "objectId": "homesteadWork",
        "kind": "progress",
        "label": "亲手修好屋顶",
        "detail": "从短工、修屋与种药开始，普通身体不靠御剑越水或施法施工。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-livelihood",
              "id": "mortal-livelihood-seeds"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-livelihood-roof"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "mortal-house-wood": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "mortal-livelihood-desk": {
        "id": "mortal-livelihood-desk",
        "task": "mortal-livelihood",
        "map": "apricot-homestead",
        "objectId": "homesteadClass",
        "kind": "progress",
        "label": "为课室修一张桌",
        "detail": "从短工、修屋与种药开始，普通身体不靠御剑越水或施法施工。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-livelihood",
              "id": "mortal-livelihood-roof"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-livelihood-desk"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "mortal-house-wood": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "mortal-livelihood-plant": {
        "id": "mortal-livelihood-plant",
        "task": "mortal-livelihood",
        "map": "apricot-homestead",
        "objectId": "homesteadGarden",
        "kind": "progress",
        "label": "试种一包药种，另一包留作灾后复种",
        "detail": "从短工、修屋与种药开始，普通身体不靠御剑越水或施法施工。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-livelihood",
              "id": "mortal-livelihood-desk"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-livelihood-plant"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "mortal-herb-seed": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "mortal-livelihood-book": {
        "id": "mortal-livelihood-book",
        "task": "mortal-livelihood",
        "map": "apricot-homestead",
        "objectId": "homesteadClinic",
        "kind": "progress",
        "label": "通过本人辨药与抄书获得医理授阅",
        "detail": "从短工、修屋与种药开始，普通身体不靠御剑越水或施法施工。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-livelihood",
              "id": "mortal-livelihood-plant"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-livelihood-book"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [
            "mortal-herb-manual"
          ],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "claim-mortal-livelihood": {
        "id": "claim-mortal-livelihood",
        "task": "mortal-livelihood",
        "map": "apricot-homestead",
        "objectId": "homesteadWork",
        "kind": "claim",
        "label": "交付：凡人的一间屋",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
            "cake": 1
          },
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "accept-mortal-daily-care": {
        "id": "accept-mortal-daily-care",
        "task": "mortal-daily-care",
        "map": "apricot-homestead",
        "objectId": "homesteadCare",
        "kind": "accept",
        "label": "接下：饭食与自己的身体",
        "detail": "普通饭食、休息和自愿照护属于凡人日常，不按性别强制惩罚。",
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
        "sinceRevision": 4
      },
      "mortal-care-receive": {
        "id": "mortal-care-receive",
        "task": "mortal-daily-care",
        "map": "apricot-homestead",
        "objectId": "homesteadCare",
        "kind": "progress",
        "label": "核领普通净布与保暖安排",
        "detail": "选择是否启用照护，不从性别猜身体情况。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "mortal-care-receive"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "mortal-care-cloth": 1
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "mortal-care-normal": {
        "id": "mortal-care-normal",
        "task": "mortal-daily-care",
        "map": "apricot-homestead",
        "objectId": "homesteadCare",
        "kind": "choice",
        "label": "只安排饭食与休息",
        "detail": "普通休息即可，不启用额外身体描写。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-daily-care",
              "id": "mortal-care-receive"
            }
          ],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "regular",
        "confirm": {
          "title": "只安排饭食与休息",
          "text": "普通休息即可，不启用额外身体描写。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "mortal-care-cycle": {
        "id": "mortal-care-cycle",
        "task": "mortal-daily-care",
        "map": "apricot-homestead",
        "objectId": "homesteadCare",
        "kind": "choice",
        "label": "自愿安排经期照护",
        "detail": "使用净布、保暖与休息，不降低女性角色经营效率，不加入现实医学剂量。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-daily-care",
              "id": "mortal-care-receive"
            },
            {
              "type": "gender",
              "id": "female"
            }
          ],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "cycle",
        "confirm": {
          "title": "自愿安排经期照护",
          "text": "使用净布、保暖与休息，不降低女性角色经营效率，不加入现实医学剂量。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "mortal-care-eat": {
        "id": "mortal-care-eat",
        "task": "mortal-daily-care",
        "map": "apricot-homestead",
        "objectId": "homesteadKitchen",
        "kind": "progress",
        "label": "吃一份真实库存中的杏花糕",
        "detail": "短工与交付已经给普通饭食；这一步实扣一份，不借灵丹恢复灵力。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-daily-care",
              "id": "course-chosen"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-care-eat"
        ],
        "cost": {
          "items": {
            "cake": 1
          },
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "mortal-care-regular-finish": {
        "id": "mortal-care-regular-finish",
        "task": "mortal-daily-care",
        "map": "apricot-homestead",
        "objectId": "homesteadCare",
        "kind": "progress",
        "label": "安排普通休息",
        "detail": "两种安排都不授战斗加成；净布只有选择需要时才实际使用。",
        "requires": {
          "all": [
            {
              "type": "choice",
              "task": "mortal-daily-care",
              "id": "regular"
            },
            {
              "type": "done",
              "task": "mortal-daily-care",
              "id": "mortal-care-eat"
            }
          ],
          "any": []
        },
        "marks": [
          "care-regular-receipt",
          "daily-care-complete"
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
        "sinceRevision": 4
      },
      "mortal-care-cycle-finish": {
        "id": "mortal-care-cycle-finish",
        "task": "mortal-daily-care",
        "map": "apricot-homestead",
        "objectId": "homesteadCare",
        "kind": "progress",
        "label": "取净布并完成保暖照护",
        "detail": "两种安排都不授战斗加成；净布只有选择需要时才实际使用。",
        "requires": {
          "all": [
            {
              "type": "choice",
              "task": "mortal-daily-care",
              "id": "cycle"
            },
            {
              "type": "done",
              "task": "mortal-daily-care",
              "id": "mortal-care-eat"
            }
          ],
          "any": []
        },
        "marks": [
          "care-cycle-receipt",
          "daily-care-complete"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "mortal-care-cloth": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "claim-mortal-daily-care": {
        "id": "claim-mortal-daily-care",
        "task": "mortal-daily-care",
        "map": "apricot-homestead",
        "objectId": "homesteadCare",
        "kind": "claim",
        "label": "完成本人选择的日常安排",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
            "cake": 1
          },
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "accept-mortal-clinic-school": {
        "id": "accept-mortal-clinic-school",
        "task": "mortal-clinic-school",
        "map": "apricot-homestead",
        "objectId": "homesteadLegacy",
        "kind": "accept",
        "label": "接下：医馆与课室一起开门",
        "detail": "阿杏保留独立出诊与采购，你们分别署名，不因亲近而减少教学或救人目标。",
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
        "sinceRevision": 4
      },
      "mortal-clinic-school-divide": {
        "id": "mortal-clinic-school-divide",
        "task": "mortal-clinic-school",
        "map": "apricot-homestead",
        "objectId": "homesteadAxing",
        "kind": "progress",
        "label": "由双方亲自确定诊疗与出诊分工",
        "detail": "阿杏保留独立出诊与采购，你们分别署名，不因亲近而减少教学或救人目标。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "mortal-clinic-school-divide"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "mortal-school-paper": 2
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "mortal-clinic-school-literacy": {
        "id": "mortal-clinic-school-literacy",
        "task": "mortal-clinic-school",
        "map": "apricot-homestead",
        "objectId": "homesteadClass",
        "kind": "progress",
        "label": "写一页识字课并实际授课",
        "detail": "阿杏保留独立出诊与采购，你们分别署名，不因亲近而减少教学或救人目标。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-clinic-school",
              "id": "mortal-clinic-school-divide"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-clinic-school-literacy"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "mortal-school-paper": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "mortal-clinic-school-medicine": {
        "id": "mortal-clinic-school-medicine",
        "task": "mortal-clinic-school",
        "map": "apricot-homestead",
        "objectId": "homesteadClinic",
        "kind": "progress",
        "label": "写一页辨药课并实际示范",
        "detail": "阿杏保留独立出诊与采购，你们分别署名，不因亲近而减少教学或救人目标。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-clinic-school",
              "id": "mortal-clinic-school-literacy"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-clinic-school-medicine"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "mortal-school-paper": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "mortal-clinic-school-register": {
        "id": "mortal-clinic-school-register",
        "task": "mortal-clinic-school",
        "map": "apricot-homestead",
        "objectId": "homesteadLegacy",
        "kind": "progress",
        "label": "登记各自署名的病案与减免费用",
        "detail": "阿杏保留独立出诊与采购，你们分别署名，不因亲近而减少教学或救人目标。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-clinic-school",
              "id": "mortal-clinic-school-medicine"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-clinic-school-register"
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
        "sinceRevision": 4
      },
      "claim-mortal-clinic-school": {
        "id": "claim-mortal-clinic-school",
        "task": "mortal-clinic-school",
        "map": "apricot-homestead",
        "objectId": "homesteadLegacy",
        "kind": "claim",
        "label": "交付：医馆与课室一起开门",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
            "cake": 1
          },
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "accept-mortal-plague": {
        "id": "accept-mortal-plague",
        "task": "mortal-plague",
        "map": "apricot-homestead",
        "objectId": "homesteadClinic",
        "kind": "accept",
        "label": "接下：三处病例，不漏一个名字",
        "detail": "先查病例与缺药，真实补料、配伍和分送；帮人不以结契为交换。",
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
        "sinceRevision": 4
      },
      "mortal-plague-clinic-sample": {
        "id": "mortal-plague-clinic-sample",
        "task": "mortal-plague",
        "map": "apricot-homestead",
        "objectId": "homesteadClinic",
        "kind": "progress",
        "label": "核医馆首例与药样",
        "detail": "先查病例与缺药，真实补料、配伍和分送；帮人不以结契为交换。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "mortal-plague-clinic-sample"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "mortal-plague-sample": 1
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "mortal-plague-village-sample": {
        "id": "mortal-plague-village-sample",
        "task": "mortal-plague",
        "map": "apricot-village",
        "objectId": "apricotCasebook",
        "kind": "progress",
        "label": "核村口病案与传播经过",
        "detail": "先查病例与缺药，真实补料、配伍和分送；帮人不以结契为交换。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-plague",
              "id": "mortal-plague-clinic-sample"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-plague-village-sample"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "mortal-plague-sample": 1
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "mortal-plague-road-sample": {
        "id": "mortal-plague-road-sample",
        "task": "mortal-plague",
        "map": "floodplain",
        "objectId": "riverRoad",
        "kind": "progress",
        "label": "沿堤路实际接回缺药封包",
        "detail": "先查病例与缺药，真实补料、配伍和分送；帮人不以结契为交换。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-plague",
              "id": "mortal-plague-village-sample"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-plague-road-sample"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "mortal-plague-sample": 1
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "mortal-plague-mix": {
        "id": "mortal-plague-mix",
        "task": "mortal-plague",
        "map": "apricot-homestead",
        "objectId": "homesteadClinic",
        "kind": "progress",
        "label": "依医书比对三案，配成三份药",
        "detail": "先查病例与缺药，真实补料、配伍和分送；帮人不以结契为交换。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-plague",
              "id": "mortal-plague-road-sample"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-plague-mix"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "mortal-plague-sample": 3
          }
        },
        "grant": {
          "items": {},
          "supplies": {
            "mortal-plague-dose": 3
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "mortal-plague-axing": {
        "id": "mortal-plague-axing",
        "task": "mortal-plague",
        "map": "apricot-homestead",
        "objectId": "homesteadAxing",
        "kind": "progress",
        "label": "把一份药交给自愿接受照护的阿杏",
        "detail": "先查病例与缺药，真实补料、配伍和分送；帮人不以结契为交换。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-plague",
              "id": "mortal-plague-mix"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-plague-axing"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "mortal-plague-dose": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "mortal-plague-village": {
        "id": "mortal-plague-village",
        "task": "mortal-plague",
        "map": "apricot-village",
        "objectId": "apricotPatient",
        "kind": "progress",
        "label": "把一份药交村口病患",
        "detail": "先查病例与缺药，真实补料、配伍和分送；帮人不以结契为交换。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-plague",
              "id": "mortal-plague-axing"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-plague-village"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "mortal-plague-dose": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "mortal-plague-shelter": {
        "id": "mortal-plague-shelter",
        "task": "mortal-plague",
        "map": "floodplain",
        "objectId": "riverShelter",
        "kind": "progress",
        "label": "把一份药交避难棚病患",
        "detail": "先查病例与缺药，真实补料、配伍和分送；帮人不以结契为交换。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-plague",
              "id": "mortal-plague-village"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-plague-shelter"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "mortal-plague-dose": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "claim-mortal-plague": {
        "id": "claim-mortal-plague",
        "task": "mortal-plague",
        "map": "apricot-homestead",
        "objectId": "homesteadClinic",
        "kind": "claim",
        "label": "交付：三处病例，不漏一个名字",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
            "cake": 2
          },
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "accept-mortal-flood": {
        "id": "accept-mortal-flood",
        "task": "mortal-flood",
        "map": "floodplain",
        "objectId": "riverMaterials",
        "kind": "accept",
        "label": "接下：水来时先做哪一件",
        "detail": "救人或保粮先后不同，都会留下需要亲自补上的另一件事。",
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
        "sinceRevision": 4
      },
      "mortal-flood-check": {
        "id": "mortal-flood-check",
        "task": "mortal-flood",
        "map": "floodplain",
        "objectId": "riverWaterMark",
        "kind": "progress",
        "label": "先查水位与两处低口",
        "detail": "确定实际安全路，再领本次沙袋与浮板。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "mortal-flood-check"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "mortal-flood-sandbag": 2,
            "mortal-flood-board": 1
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "mortal-flood-people": {
        "id": "mortal-flood-people",
        "task": "mortal-flood",
        "map": "floodplain",
        "objectId": "riverMaterials",
        "kind": "choice",
        "label": "先转运受困者",
        "detail": "先用浮板救人，随后补修被冲坏的粮棚。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-flood",
              "id": "mortal-flood-check"
            }
          ],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "people",
        "confirm": {
          "title": "先转运受困者",
          "text": "先用浮板救人，随后补修被冲坏的粮棚。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "mortal-flood-grain": {
        "id": "mortal-flood-grain",
        "task": "mortal-flood",
        "map": "floodplain",
        "objectId": "riverMaterials",
        "kind": "choice",
        "label": "先稳堤口保粮",
        "detail": "先用沙袋稳住水势，随后增加一段伤者安置。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-flood",
              "id": "mortal-flood-check"
            }
          ],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "grain",
        "confirm": {
          "title": "先稳堤口保粮",
          "text": "先用沙袋稳住水势，随后增加一段伤者安置。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "mortal-flood-priority-people": {
        "id": "mortal-flood-priority-people",
        "task": "mortal-flood",
        "map": "floodplain",
        "objectId": "riverBridge",
        "kind": "progress",
        "label": "用浮板逐次接回受困者",
        "detail": "本次选择实际用去对应材料；另一部分留给后续补救。",
        "requires": {
          "all": [
            {
              "type": "choice",
              "task": "mortal-flood",
              "id": "people"
            }
          ],
          "any": []
        },
        "marks": [
          "flood-people-receipt",
          "flood-priority-done"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "mortal-flood-board": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "mortal-flood-priority-grain": {
        "id": "mortal-flood-priority-grain",
        "task": "mortal-flood",
        "map": "floodplain",
        "objectId": "riverWestBank",
        "kind": "progress",
        "label": "将沙袋真正放到两个低口",
        "detail": "本次选择实际用去对应材料；另一部分留给后续补救。",
        "requires": {
          "all": [
            {
              "type": "choice",
              "task": "mortal-flood",
              "id": "grain"
            }
          ],
          "any": []
        },
        "marks": [
          "flood-grain-receipt",
          "flood-priority-done"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "mortal-flood-sandbag": 2
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "mortal-flood-followup-people": {
        "id": "mortal-flood-followup-people",
        "task": "mortal-flood",
        "map": "floodplain",
        "objectId": "riverGrain",
        "kind": "progress",
        "label": "修粮棚底脚并分装受潮粮",
        "detail": "先救人之后，用剩余沙袋稳住粮台。",
        "requires": {
          "all": [
            {
              "type": "choice",
              "task": "mortal-flood",
              "id": "people"
            },
            {
              "type": "done",
              "task": "mortal-flood",
              "id": "flood-priority-done"
            }
          ],
          "any": []
        },
        "marks": [
          "flood-people-repair",
          "flood-complete"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "mortal-flood-sandbag": 2
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "mortal-flood-followup-grain": {
        "id": "mortal-flood-followup-grain",
        "task": "mortal-flood",
        "map": "floodplain",
        "objectId": "riverShelter",
        "kind": "progress",
        "label": "用浮板把最后伤者移到高地",
        "detail": "先保粮之后，实际使用留下的浮板完成伤者安置。",
        "requires": {
          "all": [
            {
              "type": "choice",
              "task": "mortal-flood",
              "id": "grain"
            },
            {
              "type": "done",
              "task": "mortal-flood",
              "id": "flood-priority-done"
            }
          ],
          "any": []
        },
        "marks": [
          "flood-grain-rescue",
          "flood-complete"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "mortal-flood-board": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "claim-mortal-flood": {
        "id": "claim-mortal-flood",
        "task": "mortal-flood",
        "map": "floodplain",
        "objectId": "riverMaterials",
        "kind": "claim",
        "label": "核对救人与保粮都已完成",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
            "cake": 1
          },
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "accept-mortal-rebuild": {
        "id": "accept-mortal-rebuild",
        "task": "mortal-rebuild",
        "map": "apricot-homestead",
        "objectId": "homesteadWork",
        "kind": "accept",
        "label": "接下：灾后屋与药圃都要回来",
        "detail": "用早先真实留种复种，重新整理受潮医案和学生名册。",
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
        "sinceRevision": 4
      },
      "mortal-rebuild-seed": {
        "id": "mortal-rebuild-seed",
        "task": "mortal-rebuild",
        "map": "apricot-homestead",
        "objectId": "homesteadGarden",
        "kind": "progress",
        "label": "使用实际留存的药种复种",
        "detail": "用早先真实留种复种，重新整理受潮医案和学生名册。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "mortal-rebuild-seed"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "mortal-herb-seed": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "mortal-rebuild-books": {
        "id": "mortal-rebuild-books",
        "task": "mortal-rebuild",
        "map": "apricot-homestead",
        "objectId": "homesteadLegacy",
        "kind": "progress",
        "label": "逐页修补医案与课程",
        "detail": "用早先真实留种复种，重新整理受潮医案和学生名册。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-rebuild",
              "id": "mortal-rebuild-seed"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-rebuild-books"
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
        "sinceRevision": 4
      },
      "mortal-rebuild-reopen": {
        "id": "mortal-rebuild-reopen",
        "task": "mortal-rebuild",
        "map": "apricot-homestead",
        "objectId": "homesteadClass",
        "kind": "progress",
        "label": "由学徒接一次真实课堂，再复学",
        "detail": "用早先真实留种复种，重新整理受潮医案和学生名册。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-rebuild",
              "id": "mortal-rebuild-books"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-rebuild-reopen"
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
        "sinceRevision": 4
      },
      "claim-mortal-rebuild": {
        "id": "claim-mortal-rebuild",
        "task": "mortal-rebuild",
        "map": "apricot-homestead",
        "objectId": "homesteadWork",
        "kind": "claim",
        "label": "交付：灾后屋与药圃都要回来",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
            "cake": 2
          },
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "accept-mortal-life-years": {
        "id": "accept-mortal-life-years",
        "task": "mortal-life-years",
        "map": "apricot-homestead",
        "objectId": "homesteadLegacy",
        "kind": "accept",
        "label": "接下：留下怎样的传承",
        "detail": "按入村时真正的年龄安排人生，不把晚年来访者写回青年。",
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
        "sinceRevision": 4
      },
      "mortal-years-early": {
        "id": "mortal-years-early",
        "task": "mortal-life-years",
        "map": "apricot-homestead",
        "objectId": "homesteadLegacy",
        "kind": "choice",
        "label": "以长年经营走向白首",
        "detail": "只开放符合当前真实年龄的安排。后续仍有三次实际照护/授课/交班，不把年表当领奖按钮。",
        "requires": {
          "all": [
            {
              "type": "ageBand",
              "id": "earlyAdult"
            }
          ],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "early",
        "confirm": {
          "title": "以长年经营走向白首",
          "text": "只开放符合当前真实年龄的安排。后续仍有三次实际照护/授课/交班，不把年表当领奖按钮。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "mortal-years-late": {
        "id": "mortal-years-late",
        "task": "mortal-life-years",
        "map": "apricot-homestead",
        "objectId": "homesteadLegacy",
        "kind": "choice",
        "label": "以晚年经验留下十年医塾",
        "detail": "只开放符合当前真实年龄的安排。后续仍有三次实际照护/授课/交班，不把年表当领奖按钮。",
        "requires": {
          "all": [
            {
              "type": "ageBand",
              "id": "lateAdult"
            }
          ],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "late",
        "confirm": {
          "title": "以晚年经验留下十年医塾",
          "text": "只开放符合当前真实年龄的安排。后续仍有三次实际照护/授课/交班，不把年表当领奖按钮。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "mortal-years-early-1": {
        "id": "mortal-years-early-1",
        "task": "mortal-life-years",
        "map": "apricot-homestead",
        "objectId": "homesteadClinic",
        "kind": "progress",
        "label": "整理前一阶段医案并实际照护",
        "detail": "经过年份来自这次真实交接；已有年龄不回退。",
        "requires": {
          "all": [
            {
              "type": "choice",
              "task": "mortal-life-years",
              "id": "early"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-years-early-1",
          "mortal-years-stage-1"
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
        "sinceRevision": 4
      },
      "mortal-years-early-2": {
        "id": "mortal-years-early-2",
        "task": "mortal-life-years",
        "map": "apricot-homestead",
        "objectId": "homesteadClass",
        "kind": "progress",
        "label": "由学生试讲，亲自校对课程",
        "detail": "经过年份来自这次真实交接；已有年龄不回退。",
        "requires": {
          "all": [
            {
              "type": "choice",
              "task": "mortal-life-years",
              "id": "early"
            },
            {
              "type": "done",
              "task": "mortal-life-years",
              "id": "mortal-years-early-1"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-years-early-2",
          "mortal-years-stage-2"
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
        "sinceRevision": 4
      },
      "mortal-years-early-3": {
        "id": "mortal-years-early-3",
        "task": "mortal-life-years",
        "map": "apricot-homestead",
        "objectId": "homesteadLegacy",
        "kind": "progress",
        "label": "让后继者独立出诊与接班",
        "detail": "经过年份来自这次真实交接；已有年龄不回退。",
        "requires": {
          "all": [
            {
              "type": "choice",
              "task": "mortal-life-years",
              "id": "early"
            },
            {
              "type": "done",
              "task": "mortal-life-years",
              "id": "mortal-years-early-2"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-years-early-3",
          "mortal-years-stage-3"
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
        "sinceRevision": 4
      },
      "mortal-years-late-1": {
        "id": "mortal-years-late-1",
        "task": "mortal-life-years",
        "map": "apricot-homestead",
        "objectId": "homesteadClinic",
        "kind": "progress",
        "label": "整理前一阶段医案并实际照护",
        "detail": "经过年份来自这次真实交接；已有年龄不回退。",
        "requires": {
          "all": [
            {
              "type": "choice",
              "task": "mortal-life-years",
              "id": "late"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-years-late-1",
          "mortal-years-stage-1"
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
        "sinceRevision": 4
      },
      "mortal-years-late-2": {
        "id": "mortal-years-late-2",
        "task": "mortal-life-years",
        "map": "apricot-homestead",
        "objectId": "homesteadClass",
        "kind": "progress",
        "label": "由学生试讲，亲自校对课程",
        "detail": "经过年份来自这次真实交接；已有年龄不回退。",
        "requires": {
          "all": [
            {
              "type": "choice",
              "task": "mortal-life-years",
              "id": "late"
            },
            {
              "type": "done",
              "task": "mortal-life-years",
              "id": "mortal-years-late-1"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-years-late-2",
          "mortal-years-stage-2"
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
        "sinceRevision": 4
      },
      "mortal-years-late-3": {
        "id": "mortal-years-late-3",
        "task": "mortal-life-years",
        "map": "apricot-homestead",
        "objectId": "homesteadLegacy",
        "kind": "progress",
        "label": "让后继者独立出诊与接班",
        "detail": "经过年份来自这次真实交接；已有年龄不回退。",
        "requires": {
          "all": [
            {
              "type": "choice",
              "task": "mortal-life-years",
              "id": "late"
            },
            {
              "type": "done",
              "task": "mortal-life-years",
              "id": "mortal-years-late-2"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-years-late-3",
          "mortal-years-stage-3"
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
        "sinceRevision": 4
      },
      "claim-mortal-life-years": {
        "id": "claim-mortal-life-years",
        "task": "mortal-life-years",
        "map": "apricot-homestead",
        "objectId": "homesteadLegacy",
        "kind": "claim",
        "label": "交清这段人生的传承",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-mortal-final-choice": {
        "id": "accept-mortal-final-choice",
        "task": "mortal-final-choice",
        "map": "apricot-homestead",
        "objectId": "homesteadLegacy",
        "kind": "accept",
        "label": "接下：杏树下各有自己的回答",
        "detail": "医馆、私塾、相守与临终重逢由已发生的关系与传承决定，不替人安排婚育。",
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
        "sinceRevision": 4
      },
      "mortal-final-home": {
        "id": "mortal-final-home",
        "task": "mortal-final-choice",
        "map": "apricot-homestead",
        "objectId": "homesteadLegacy",
        "kind": "choice",
        "label": "与阿杏相守烟火一生",
        "detail": "需双方已有明确道侣承诺；家属/学徒按真实安排，不自动生育。",
        "requires": {
          "all": [
            {
              "type": "partner",
              "id": "axing"
            }
          ],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "home",
        "confirm": {
          "title": "与阿杏相守烟火一生",
          "text": "需双方已有明确道侣承诺；家属/学徒按真实安排，不自动生育。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "mortal-final-teacher": {
        "id": "mortal-final-teacher",
        "task": "mortal-final-choice",
        "map": "apricot-homestead",
        "objectId": "homesteadLegacy",
        "kind": "choice",
        "label": "把余生与医塾交给学生",
        "detail": "朋友也可完成同等传承，不强写阿杏嫁给别人。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "teacher",
        "confirm": {
          "title": "把余生与医塾交给学生",
          "text": "朋友也可完成同等传承，不强写阿杏嫁给别人。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "mortal-final-clinic": {
        "id": "mortal-final-clinic",
        "task": "mortal-final-choice",
        "map": "apricot-homestead",
        "objectId": "homesteadLegacy",
        "kind": "choice",
        "label": "把杏春医馆传下去",
        "detail": "保留真实关系称谓，未结契者不称夫妻或合葬。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "clinic",
        "confirm": {
          "title": "把杏春医馆传下去",
          "text": "保留真实关系称谓，未结契者不称夫妻或合葬。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "mortal-final-reunion": {
        "id": "mortal-final-reunion",
        "task": "mortal-final-choice",
        "map": "apricot-homestead",
        "objectId": "homesteadLegacy",
        "kind": "choice",
        "label": "以旧笛与一生承诺告别",
        "detail": "在真实相守与告别之后修笛守庐；回忆阿杏成年初识。",
        "requires": {
          "all": [
            {
              "type": "partner",
              "id": "axing"
            },
            {
              "type": "token",
              "id": "mortal-old-flute"
            }
          ],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "reunion",
        "confirm": {
          "title": "以旧笛与一生承诺告别",
          "text": "在真实相守与告别之后修笛守庐；回忆阿杏成年初识。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "mortal-final-women": {
        "id": "mortal-final-women",
        "task": "mortal-final-choice",
        "map": "apricot-homestead",
        "objectId": "homesteadLegacy",
        "kind": "choice",
        "label": "两位女医者共同署名相守",
        "detail": "成年女主与成年阿杏明确唯一结契，医馆与课程留下双方姓名；不是原男线改代词。",
        "requires": {
          "all": [
            {
              "type": "gender",
              "id": "female"
            },
            {
              "type": "partner",
              "id": "axing"
            }
          ],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "women",
        "confirm": {
          "title": "两位女医者共同署名相守",
          "text": "成年女主与成年阿杏明确唯一结契，医馆与课程留下双方姓名；不是原男线改代词。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "claim-mortal-final-choice": {
        "id": "claim-mortal-final-choice",
        "task": "mortal-final-choice",
        "map": "apricot-homestead",
        "objectId": "homesteadLegacy",
        "kind": "claim",
        "label": "确认最后的托付",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-mortal-home-farewell": {
        "id": "accept-mortal-home-farewell",
        "task": "mortal-home-farewell",
        "map": "apricot-homestead",
        "objectId": "homesteadLegacy",
        "kind": "accept",
        "label": "接下：烟火一生的照护",
        "detail": "把已完成的生活交给后继者，再收束此生；具体关系以本人真实承诺为准。",
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
        "sinceRevision": 4
      },
      "mortal-home-farewell-care": {
        "id": "mortal-home-farewell-care",
        "task": "mortal-home-farewell",
        "map": "apricot-homestead",
        "objectId": "homesteadCare",
        "kind": "progress",
        "label": "按阿杏本人意愿安排最后的照护",
        "detail": "把已完成的生活交给后继者，再收束此生；具体关系以本人真实承诺为准。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "mortal-home-farewell-care"
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
        "sinceRevision": 4
      },
      "mortal-home-farewell-goodbye": {
        "id": "mortal-home-farewell-goodbye",
        "task": "mortal-home-farewell",
        "map": "apricot-homestead",
        "objectId": "homesteadMemorial",
        "kind": "progress",
        "label": "与她告别，把她的姓名与医案留在杏树旁",
        "detail": "把已完成的生活交给后继者，再收束此生；具体关系以本人真实承诺为准。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-home-farewell",
              "id": "mortal-home-farewell-care"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-home-farewell-goodbye"
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
        "sinceRevision": 4
      },
      "mortal-home-farewell-inherit": {
        "id": "mortal-home-farewell-inherit",
        "task": "mortal-home-farewell",
        "map": "apricot-homestead",
        "objectId": "homesteadLegacy",
        "kind": "progress",
        "label": "向自愿接班的家人与学徒交托医塾",
        "detail": "把已完成的生活交给后继者，再收束此生；具体关系以本人真实承诺为准。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-home-farewell",
              "id": "mortal-home-farewell-goodbye"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-home-farewell-inherit"
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
        "sinceRevision": 4
      },
      "claim-mortal-home-farewell": {
        "id": "claim-mortal-home-farewell",
        "task": "mortal-home-farewell",
        "map": "apricot-homestead",
        "objectId": "homesteadLegacy",
        "kind": "claim",
        "label": "交付：烟火一生的照护",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-mortal-teacher-legacy": {
        "id": "accept-mortal-teacher-legacy",
        "task": "mortal-teacher-legacy",
        "map": "apricot-homestead",
        "objectId": "homesteadLegacy",
        "kind": "accept",
        "label": "接下：学生真正接过课堂",
        "detail": "把已完成的生活交给后继者，再收束此生；具体关系以本人真实承诺为准。",
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
        "sinceRevision": 4
      },
      "mortal-teacher-legacy-lesson": {
        "id": "mortal-teacher-legacy-lesson",
        "task": "mortal-teacher-legacy",
        "map": "apricot-homestead",
        "objectId": "homesteadClass",
        "kind": "progress",
        "label": "亲自完成最后一课",
        "detail": "把已完成的生活交给后继者，再收束此生；具体关系以本人真实承诺为准。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "mortal-teacher-legacy-lesson"
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
        "sinceRevision": 4
      },
      "mortal-teacher-legacy-student": {
        "id": "mortal-teacher-legacy-student",
        "task": "mortal-teacher-legacy",
        "map": "apricot-homestead",
        "objectId": "homesteadClass",
        "kind": "progress",
        "label": "听学生独立授课并核教案",
        "detail": "把已完成的生活交给后继者，再收束此生；具体关系以本人真实承诺为准。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-teacher-legacy",
              "id": "mortal-teacher-legacy-lesson"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-teacher-legacy-student"
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
        "sinceRevision": 4
      },
      "mortal-teacher-legacy-name": {
        "id": "mortal-teacher-legacy-name",
        "task": "mortal-teacher-legacy",
        "map": "apricot-homestead",
        "objectId": "homesteadLegacy",
        "kind": "progress",
        "label": "把课程与医塾钥交给愿意接班的人",
        "detail": "把已完成的生活交给后继者，再收束此生；具体关系以本人真实承诺为准。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-teacher-legacy",
              "id": "mortal-teacher-legacy-student"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-teacher-legacy-name"
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
        "sinceRevision": 4
      },
      "claim-mortal-teacher-legacy": {
        "id": "claim-mortal-teacher-legacy",
        "task": "mortal-teacher-legacy",
        "map": "apricot-homestead",
        "objectId": "homesteadLegacy",
        "kind": "claim",
        "label": "交付：学生真正接过课堂",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-mortal-clinic-legacy": {
        "id": "accept-mortal-clinic-legacy",
        "task": "mortal-clinic-legacy",
        "map": "apricot-homestead",
        "objectId": "homesteadLegacy",
        "kind": "accept",
        "label": "接下：杏春堂继续开门",
        "detail": "把已完成的生活交给后继者，再收束此生；具体关系以本人真实承诺为准。",
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
        "sinceRevision": 4
      },
      "mortal-clinic-legacy-cases": {
        "id": "mortal-clinic-legacy-cases",
        "task": "mortal-clinic-legacy",
        "map": "apricot-homestead",
        "objectId": "homesteadClinic",
        "kind": "progress",
        "label": "把真实疫案与药柜交给接班医者",
        "detail": "把已完成的生活交给后继者，再收束此生；具体关系以本人真实承诺为准。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "mortal-clinic-legacy-cases"
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
        "sinceRevision": 4
      },
      "mortal-clinic-legacy-fees": {
        "id": "mortal-clinic-legacy-fees",
        "task": "mortal-clinic-legacy",
        "map": "apricot-homestead",
        "objectId": "homesteadLegacy",
        "kind": "progress",
        "label": "确认减免诊费与公开医课继续实行",
        "detail": "把已完成的生活交给后继者，再收束此生；具体关系以本人真实承诺为准。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-clinic-legacy",
              "id": "mortal-clinic-legacy-cases"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-clinic-legacy-fees"
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
        "sinceRevision": 4
      },
      "mortal-clinic-legacy-handoff": {
        "id": "mortal-clinic-legacy-handoff",
        "task": "mortal-clinic-legacy",
        "map": "apricot-homestead",
        "objectId": "homesteadAxing",
        "kind": "progress",
        "label": "按双方关系与独立姓名核最后分工",
        "detail": "把已完成的生活交给后继者，再收束此生；具体关系以本人真实承诺为准。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-clinic-legacy",
              "id": "mortal-clinic-legacy-fees"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-clinic-legacy-handoff"
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
        "sinceRevision": 4
      },
      "claim-mortal-clinic-legacy": {
        "id": "claim-mortal-clinic-legacy",
        "task": "mortal-clinic-legacy",
        "map": "apricot-homestead",
        "objectId": "homesteadLegacy",
        "kind": "claim",
        "label": "交付：杏春堂继续开门",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-mortal-flute-reunion": {
        "id": "accept-mortal-flute-reunion",
        "task": "mortal-flute-reunion",
        "map": "apricot-homestead",
        "objectId": "homesteadLegacy",
        "kind": "accept",
        "label": "接下：守庐、修笛与成年初见",
        "detail": "把已完成的生活交给后继者，再收束此生；具体关系以本人真实承诺为准。",
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
        "sinceRevision": 4
      },
      "mortal-flute-reunion-care": {
        "id": "mortal-flute-reunion-care",
        "task": "mortal-flute-reunion",
        "map": "apricot-homestead",
        "objectId": "homesteadCare",
        "kind": "progress",
        "label": "与阿杏说清她的照护与告别意愿",
        "detail": "把已完成的生活交给后继者，再收束此生；具体关系以本人真实承诺为准。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "mortal-flute-reunion-care"
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
        "sinceRevision": 4
      },
      "mortal-flute-reunion-goodbye": {
        "id": "mortal-flute-reunion-goodbye",
        "task": "mortal-flute-reunion",
        "map": "apricot-homestead",
        "objectId": "homesteadMemorial",
        "kind": "progress",
        "label": "实际告别后在杏树旁守庐",
        "detail": "把已完成的生活交给后继者，再收束此生；具体关系以本人真实承诺为准。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-flute-reunion",
              "id": "mortal-flute-reunion-care"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-flute-reunion-goodbye"
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
        "sinceRevision": 4
      },
      "mortal-flute-reunion-repair": {
        "id": "mortal-flute-reunion-repair",
        "task": "mortal-flute-reunion",
        "map": "apricot-homestead",
        "objectId": "homesteadFlute",
        "kind": "progress",
        "label": "修好旧笛，吹双方成年相识的曲调",
        "detail": "把已完成的生活交给后继者，再收束此生；具体关系以本人真实承诺为准。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-flute-reunion",
              "id": "mortal-flute-reunion-goodbye"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-flute-reunion-repair"
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
        "sinceRevision": 4
      },
      "claim-mortal-flute-reunion": {
        "id": "claim-mortal-flute-reunion",
        "task": "mortal-flute-reunion",
        "map": "apricot-homestead",
        "objectId": "homesteadLegacy",
        "kind": "claim",
        "label": "交付：守庐、修笛与成年初见",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-mortal-women-clinic": {
        "id": "accept-mortal-women-clinic",
        "task": "mortal-women-clinic",
        "map": "apricot-homestead",
        "objectId": "homesteadLegacy",
        "kind": "accept",
        "label": "接下：杏林同心，两人都有姓名",
        "detail": "把已完成的生活交给后继者，再收束此生；具体关系以本人真实承诺为准。",
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
        "sinceRevision": 4
      },
      "mortal-women-clinic-own-goals": {
        "id": "mortal-women-clinic-own-goals",
        "task": "mortal-women-clinic",
        "map": "apricot-homestead",
        "objectId": "homesteadAxing",
        "kind": "progress",
        "label": "分别写下各自出诊与讲学的愿望",
        "detail": "把已完成的生活交给后继者，再收束此生；具体关系以本人真实承诺为准。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "mortal-women-clinic-own-goals"
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
        "sinceRevision": 4
      },
      "mortal-women-clinic-shared-class": {
        "id": "mortal-women-clinic-shared-class",
        "task": "mortal-women-clinic",
        "map": "apricot-homestead",
        "objectId": "homesteadClass",
        "kind": "progress",
        "label": "各带一组学徒完成共同课程",
        "detail": "把已完成的生活交给后继者，再收束此生；具体关系以本人真实承诺为准。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-women-clinic",
              "id": "mortal-women-clinic-own-goals"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-women-clinic-shared-class"
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
        "sinceRevision": 4
      },
      "mortal-women-clinic-sign": {
        "id": "mortal-women-clinic-sign",
        "task": "mortal-women-clinic",
        "map": "apricot-homestead",
        "objectId": "homesteadLegacy",
        "kind": "progress",
        "label": "以双方姓名合编医案与传承条约",
        "detail": "把已完成的生活交给后继者，再收束此生；具体关系以本人真实承诺为准。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-women-clinic",
              "id": "mortal-women-clinic-shared-class"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-women-clinic-sign"
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
        "sinceRevision": 4
      },
      "mortal-women-clinic-promise": {
        "id": "mortal-women-clinic-promise",
        "task": "mortal-women-clinic",
        "map": "apricot-homestead",
        "objectId": "homesteadAxing",
        "kind": "progress",
        "label": "再次确认成年女女道侣的自主相守",
        "detail": "把已完成的生活交给后继者，再收束此生；具体关系以本人真实承诺为准。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "mortal-women-clinic",
              "id": "mortal-women-clinic-sign"
            }
          ],
          "any": []
        },
        "marks": [
          "mortal-women-clinic-promise"
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
        "sinceRevision": 4
      },
      "claim-mortal-women-clinic": {
        "id": "claim-mortal-women-clinic",
        "task": "mortal-women-clinic",
        "map": "apricot-homestead",
        "objectId": "homesteadLegacy",
        "kind": "claim",
        "label": "交付：杏林同心，两人都有姓名",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-loop-investigation": {
        "id": "accept-loop-investigation",
        "task": "loop-investigation",
        "map": "icefield-cavern",
        "objectId": "iceMemoryRecord",
        "kind": "accept",
        "label": "接下：三片碎影必须先查清",
        "detail": "核验南北东西的真实裂纹与护魂记录，不借原来未有的碎片跳过调查。",
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
        "sinceRevision": 4
      },
      "loop-investigation-south": {
        "id": "loop-investigation-south",
        "task": "loop-investigation",
        "map": "icefield-cavern",
        "objectId": "iceSampleSouth",
        "kind": "progress",
        "label": "核南裂纹与已知断口",
        "detail": "核验南北东西的真实裂纹与护魂记录，不借原来未有的碎片跳过调查。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "loop-investigation-south"
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
        "sinceRevision": 4
      },
      "loop-investigation-east": {
        "id": "loop-investigation-east",
        "task": "loop-investigation",
        "map": "icefield-cavern",
        "objectId": "iceSampleEast",
        "kind": "progress",
        "label": "核东侧矿纹和残图方位",
        "detail": "核验南北东西的真实裂纹与护魂记录，不借原来未有的碎片跳过调查。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-investigation",
              "id": "loop-investigation-south"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-investigation-east"
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
        "sinceRevision": 4
      },
      "loop-investigation-north": {
        "id": "loop-investigation-north",
        "task": "loop-investigation",
        "map": "icefield-cavern",
        "objectId": "iceSampleNorth",
        "kind": "progress",
        "label": "核北冰台的另一枚拓痕",
        "detail": "核验南北东西的真实裂纹与护魂记录，不借原来未有的碎片跳过调查。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-investigation",
              "id": "loop-investigation-east"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-investigation-north"
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
        "sinceRevision": 4
      },
      "loop-investigation-hairpin": {
        "id": "loop-investigation-hairpin",
        "task": "loop-investigation",
        "map": "icefield-cavern",
        "objectId": "iceMemoryRecord",
        "kind": "progress",
        "label": "以实际旧狐簪比对三处合纹",
        "detail": "核验南北东西的真实裂纹与护魂记录，不借原来未有的碎片跳过调查。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-investigation",
              "id": "loop-investigation-north"
            },
            {
              "type": "legacyToken",
              "id": "foxHairpin"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-investigation-hairpin"
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
        "sinceRevision": 4
      },
      "claim-loop-investigation": {
        "id": "claim-loop-investigation",
        "task": "loop-investigation",
        "map": "icefield-cavern",
        "objectId": "iceMemoryRecord",
        "kind": "claim",
        "label": "交付：三片碎影必须先查清",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
            "loop-investigated-fragment"
          ],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "accept-loop-awakening": {
        "id": "accept-loop-awakening",
        "task": "loop-awakening",
        "map": "reincarnation-hall",
        "objectId": "hallRecord",
        "kind": "accept",
        "label": "接下：先分清记忆与当下",
        "detail": "确认这是已逝经历的回忆，不能带走旧世物资、替现实人物复活，也不由旧世婚姻改变今生承诺。",
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
        "sinceRevision": 4
      },
      "loop-awakening-identity": {
        "id": "loop-awakening-identity",
        "task": "loop-awakening",
        "map": "reincarnation-hall",
        "objectId": "hallRecord",
        "kind": "progress",
        "label": "登记今生姓名与已经发生的真实选择",
        "detail": "确认这是已逝经历的回忆，不能带走旧世物资、替现实人物复活，也不由旧世婚姻改变今生承诺。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "loop-awakening-identity"
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
        "sinceRevision": 4
      },
      "loop-awakening-boundaries": {
        "id": "loop-awakening-boundaries",
        "task": "loop-awakening",
        "map": "reincarnation-hall",
        "objectId": "hallGuardian",
        "kind": "progress",
        "label": "区分凝霜、灵薇与旧世的不同人物",
        "detail": "确认这是已逝经历的回忆，不能带走旧世物资、替现实人物复活，也不由旧世婚姻改变今生承诺。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-awakening",
              "id": "loop-awakening-identity"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-awakening-boundaries"
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
        "sinceRevision": 4
      },
      "loop-awakening-door": {
        "id": "loop-awakening-door",
        "task": "loop-awakening",
        "map": "reincarnation-hall",
        "objectId": "hallLamp",
        "kind": "progress",
        "label": "只开启三段有具体见证的记忆",
        "detail": "确认这是已逝经历的回忆，不能带走旧世物资、替现实人物复活，也不由旧世婚姻改变今生承诺。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-awakening",
              "id": "loop-awakening-boundaries"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-awakening-door"
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
        "sinceRevision": 4
      },
      "claim-loop-awakening": {
        "id": "claim-loop-awakening",
        "task": "loop-awakening",
        "map": "reincarnation-hall",
        "objectId": "hallRecord",
        "kind": "claim",
        "label": "交付：先分清记忆与当下",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-loop-life-general": {
        "id": "accept-loop-life-general",
        "task": "loop-life-general",
        "map": "reincarnation-hall",
        "objectId": "hallBorder",
        "kind": "accept",
        "label": "接下：第五世 · 忠义与退路",
        "detail": "这是回忆中的真实操作；不授予今生物品、关系或战争记录。",
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
        "sinceRevision": 4
      },
      "loop-life-general-open": {
        "id": "loop-life-general-open",
        "task": "loop-life-general",
        "map": "reincarnation-hall",
        "objectId": "hallBorder",
        "kind": "progress",
        "label": "核对记忆门上的姓名与年份",
        "detail": "只在本人准备好后进入此段经历。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "memory-door-open"
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
        "sinceRevision": 4
      },
      "loop-life-general-read": {
        "id": "loop-life-general-read",
        "task": "loop-life-general",
        "map": "northern-border",
        "objectId": "memoryGeneralOrders",
        "kind": "progress",
        "label": "查召令先后与被撤去的粮道",
        "detail": "操作只作用于这段旧世记忆。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-life-general",
              "id": "memory-door-open"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-life-general-read"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "memory-general-order": 2
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "loop-life-general-evacuate": {
        "id": "loop-life-general-evacuate",
        "task": "loop-life-general",
        "map": "northern-border",
        "objectId": "memoryGeneralCamp",
        "kind": "progress",
        "label": "用一道军令先撤平民",
        "detail": "操作只作用于这段旧世记忆。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-life-general",
              "id": "loop-life-general-read"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-life-general-evacuate"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "memory-general-order": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "loop-life-general-hold": {
        "id": "loop-life-general-hold",
        "task": "loop-life-general",
        "map": "northern-border",
        "objectId": "memoryGeneralGate",
        "kind": "battle",
        "label": "以当世可用之力守住撤退阵口",
        "detail": "只与记忆中的战阵交手，胜败不改写现实人物命运。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-life-general",
              "id": "loop-life-general-evacuate"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-life-general-hold"
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
        "sinceRevision": 4,
        "encounter": "loop-life-general-hold-encounter"
      },
      "loop-life-general-leave": {
        "id": "loop-life-general-leave",
        "task": "loop-life-general",
        "map": "northern-border",
        "objectId": "memoryGeneralOrders",
        "kind": "progress",
        "label": "用最后一道军令交接兵权，见证忠而不保命的结局",
        "detail": "操作只作用于这段旧世记忆。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-life-general",
              "id": "loop-life-general-hold"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-life-general-leave"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "memory-general-order": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "claim-loop-life-general": {
        "id": "claim-loop-life-general",
        "task": "loop-life-general",
        "map": "reincarnation-hall",
        "objectId": "hallBorder",
        "kind": "claim",
        "label": "归还旧世物件，留下这段经历",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-loop-life-healer": {
        "id": "accept-loop-life-healer",
        "task": "loop-life-healer",
        "map": "reincarnation-hall",
        "objectId": "hallClinic",
        "kind": "accept",
        "label": "接下：第十世 · 医者与凡常一生",
        "detail": "这是回忆中的真实操作；不授予今生物品、关系或战争记录。",
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
        "sinceRevision": 4
      },
      "loop-life-healer-open": {
        "id": "loop-life-healer-open",
        "task": "loop-life-healer",
        "map": "reincarnation-hall",
        "objectId": "hallClinic",
        "kind": "progress",
        "label": "核对记忆门上的姓名与年份",
        "detail": "只在本人准备好后进入此段经历。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "memory-door-open"
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
        "sinceRevision": 4
      },
      "loop-life-healer-prepare": {
        "id": "loop-life-healer-prepare",
        "task": "loop-life-healer",
        "map": "apricot-homestead",
        "objectId": "memoryHealerDesk",
        "kind": "progress",
        "label": "按病案配成两份旧世药样",
        "detail": "操作只作用于这段旧世记忆。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-life-healer",
              "id": "memory-door-open"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-life-healer-prepare"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "memory-healer-dose": 2
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "loop-life-healer-stranger": {
        "id": "loop-life-healer-stranger",
        "task": "loop-life-healer",
        "map": "apricot-homestead",
        "objectId": "memoryHealerPatient",
        "kind": "progress",
        "label": "先救山中伤者，再询问她的去留意愿",
        "detail": "操作只作用于这段旧世记忆。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-life-healer",
              "id": "loop-life-healer-prepare"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-life-healer-stranger"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "memory-healer-dose": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "loop-life-healer-village": {
        "id": "loop-life-healer-village",
        "task": "loop-life-healer",
        "map": "apricot-homestead",
        "objectId": "memoryHealerVillage",
        "kind": "progress",
        "label": "为无钱者实际免诊并给药",
        "detail": "操作只作用于这段旧世记忆。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-life-healer",
              "id": "loop-life-healer-stranger"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-life-healer-village"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "memory-healer-dose": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "loop-life-healer-farewell": {
        "id": "loop-life-healer-farewell",
        "task": "loop-life-healer",
        "map": "apricot-homestead",
        "objectId": "memoryHealerDesk",
        "kind": "progress",
        "label": "读完凡常一生的告别，不把旧世婚姻当今生承诺",
        "detail": "操作只作用于这段旧世记忆。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-life-healer",
              "id": "loop-life-healer-village"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-life-healer-farewell"
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
        "sinceRevision": 4
      },
      "claim-loop-life-healer": {
        "id": "claim-loop-life-healer",
        "task": "loop-life-healer",
        "map": "reincarnation-hall",
        "objectId": "hallClinic",
        "kind": "claim",
        "label": "归还旧世物件，留下这段经历",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-loop-life-ruler": {
        "id": "accept-loop-life-ruler",
        "task": "loop-life-ruler",
        "map": "reincarnation-hall",
        "objectId": "hallPalace",
        "kind": "accept",
        "label": "接下：第三十七世 · 魔域守土之道",
        "detail": "这是回忆中的真实操作；不授予今生物品、关系或战争记录。",
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
        "sinceRevision": 4
      },
      "loop-life-ruler-open": {
        "id": "loop-life-ruler-open",
        "task": "loop-life-ruler",
        "map": "reincarnation-hall",
        "objectId": "hallPalace",
        "kind": "progress",
        "label": "核对记忆门上的姓名与年份",
        "detail": "只在本人准备好后进入此段经历。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "memory-door-open"
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
        "sinceRevision": 4
      },
      "loop-life-ruler-read": {
        "id": "loop-life-ruler-read",
        "task": "loop-life-ruler",
        "map": "demon-palace",
        "objectId": "memoryRulerEdict",
        "kind": "progress",
        "label": "读此世血仇与不伤凡人的约束",
        "detail": "操作只作用于这段旧世记忆。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-life-ruler",
              "id": "memory-door-open"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-life-ruler-read"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "memory-ruler-seal": 2
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "loop-life-ruler-protect": {
        "id": "loop-life-ruler-protect",
        "task": "loop-life-ruler",
        "map": "demon-palace",
        "objectId": "memoryRulerEdict",
        "kind": "progress",
        "label": "实际封存不伤凡人的政令",
        "detail": "操作只作用于这段旧世记忆。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-life-ruler",
              "id": "loop-life-ruler-read"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-life-ruler-protect"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "memory-ruler-seal": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "loop-life-ruler-trade": {
        "id": "loop-life-ruler-trade",
        "task": "loop-life-ruler",
        "map": "demon-palace",
        "objectId": "memoryRulerTrade",
        "kind": "progress",
        "label": "实际封存允许通商的政令",
        "detail": "操作只作用于这段旧世记忆。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-life-ruler",
              "id": "loop-life-ruler-protect"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-life-ruler-trade"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "memory-ruler-seal": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "loop-life-ruler-defend": {
        "id": "loop-life-ruler-defend",
        "task": "loop-life-ruler",
        "map": "demon-palace",
        "objectId": "memoryRulerDefense",
        "kind": "battle",
        "label": "守住平民撤离的最后一阵",
        "detail": "只与记忆中的战阵交手，胜败不改写现实人物命运。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-life-ruler",
              "id": "loop-life-ruler-trade"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-life-ruler-defend"
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
        "sinceRevision": 4,
        "encounter": "loop-life-ruler-defend-encounter"
      },
      "loop-life-ruler-truth": {
        "id": "loop-life-ruler-truth",
        "task": "loop-life-ruler",
        "map": "demon-palace",
        "objectId": "memoryRulerEdict",
        "kind": "progress",
        "label": "认清此世人物与今生血缘，留下守道而不保天下的见证",
        "detail": "操作只作用于这段旧世记忆。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-life-ruler",
              "id": "loop-life-ruler-defend"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-life-ruler-truth"
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
        "sinceRevision": 4
      },
      "claim-loop-life-ruler": {
        "id": "claim-loop-life-ruler",
        "task": "loop-life-ruler",
        "map": "reincarnation-hall",
        "objectId": "hallPalace",
        "kind": "claim",
        "label": "归还旧世物件，留下这段经历",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-loop-memory-review": {
        "id": "accept-loop-memory-review",
        "task": "loop-memory-review",
        "map": "reincarnation-hall",
        "objectId": "hallRecord",
        "kind": "accept",
        "label": "接下：三段重历与九十六份记忆",
        "detail": "三段有实际任务的代表世完成后，其余九十六世只作记忆册复核，不声称重玩了九十九张地图。",
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
        "sinceRevision": 4
      },
      "loop-memory-review-general": {
        "id": "loop-memory-review-general",
        "task": "loop-memory-review",
        "map": "reincarnation-hall",
        "objectId": "hallRecord",
        "kind": "progress",
        "label": "核将军之世：忠义不能代替退路",
        "detail": "三段有实际任务的代表世完成后，其余九十六世只作记忆册复核，不声称重玩了九十九张地图。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "loop-memory-review-general"
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
        "sinceRevision": 4
      },
      "loop-memory-review-healer": {
        "id": "loop-memory-review-healer",
        "task": "loop-memory-review",
        "map": "reincarnation-hall",
        "objectId": "hallRecord",
        "kind": "progress",
        "label": "核医者之世：凡常一生仍有价值",
        "detail": "三段有实际任务的代表世完成后，其余九十六世只作记忆册复核，不声称重玩了九十九张地图。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-memory-review",
              "id": "loop-memory-review-general"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-memory-review-healer"
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
        "sinceRevision": 4
      },
      "loop-memory-review-ruler": {
        "id": "loop-memory-review-ruler",
        "task": "loop-memory-review",
        "map": "reincarnation-hall",
        "objectId": "hallRecord",
        "kind": "progress",
        "label": "核魔尊之世：守道不能抹去众生代价",
        "detail": "三段有实际任务的代表世完成后，其余九十六世只作记忆册复核，不声称重玩了九十九张地图。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-memory-review",
              "id": "loop-memory-review-healer"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-memory-review-ruler"
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
        "sinceRevision": 4
      },
      "loop-memory-review-others": {
        "id": "loop-memory-review-others",
        "task": "loop-memory-review",
        "map": "reincarnation-hall",
        "objectId": "hallNames",
        "kind": "progress",
        "label": "逐册归档其余九十六世，标明未亲自重历",
        "detail": "三段有实际任务的代表世完成后，其余九十六世只作记忆册复核，不声称重玩了九十九张地图。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-memory-review",
              "id": "loop-memory-review-ruler"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-memory-review-others"
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
        "sinceRevision": 4
      },
      "claim-loop-memory-review": {
        "id": "claim-loop-memory-review",
        "task": "loop-memory-review",
        "map": "reincarnation-hall",
        "objectId": "hallRecord",
        "kind": "claim",
        "label": "交付：三段重历与九十六份记忆",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-loop-mill-investigation": {
        "id": "accept-loop-mill-investigation",
        "task": "loop-mill-investigation",
        "map": "world-mill",
        "objectId": "millLedger",
        "kind": "accept",
        "label": "接下：碾磨之前先救下名字",
        "detail": "先查飞升名册与碾磨流向，再护送无名魂影；真实救助之后才讨论四种道路。",
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
        "sinceRevision": 4
      },
      "loop-mill-investigation-names": {
        "id": "loop-mill-investigation-names",
        "task": "loop-mill-investigation",
        "map": "world-mill",
        "objectId": "millLedger",
        "kind": "progress",
        "label": "对照升仙名册，取三份保名灯芯",
        "detail": "先查飞升名册与碾磨流向，再护送无名魂影；真实救助之后才讨论四种道路。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "loop-mill-investigation-names"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "loop-soul-wick": 3
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "loop-mill-investigation-west": {
        "id": "loop-mill-investigation-west",
        "task": "loop-mill-investigation",
        "map": "world-mill",
        "objectId": "millWestAnchor",
        "kind": "progress",
        "label": "消耗一份灯芯护住西侧姓名",
        "detail": "先查飞升名册与碾磨流向，再护送无名魂影；真实救助之后才讨论四种道路。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-mill-investigation",
              "id": "loop-mill-investigation-names"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-mill-investigation-west"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "loop-soul-wick": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "loop-mill-investigation-guard": {
        "id": "loop-mill-investigation-guard",
        "task": "loop-mill-investigation",
        "map": "world-mill",
        "objectId": "millWestAnchor",
        "kind": "battle",
        "label": "阻止磨盘卫把待渡魂影带走",
        "detail": "先查飞升名册与碾磨流向，再护送无名魂影；真实救助之后才讨论四种道路。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-mill-investigation",
              "id": "loop-mill-investigation-west"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-mill-investigation-guard"
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
        "sinceRevision": 4,
        "encounter": "loop-mill-investigation-guard-encounter"
      },
      "loop-mill-investigation-east": {
        "id": "loop-mill-investigation-east",
        "task": "loop-mill-investigation",
        "map": "world-mill",
        "objectId": "millEastAnchor",
        "kind": "progress",
        "label": "消耗一份灯芯改接东侧引流",
        "detail": "先查飞升名册与碾磨流向，再护送无名魂影；真实救助之后才讨论四种道路。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-mill-investigation",
              "id": "loop-mill-investigation-guard"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-mill-investigation-east"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "loop-soul-wick": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "loop-mill-investigation-dock": {
        "id": "loop-mill-investigation-dock",
        "task": "loop-mill-investigation",
        "map": "world-mill",
        "objectId": "millSoulDock",
        "kind": "progress",
        "label": "消耗最后灯芯，让待渡者保名离开",
        "detail": "先查飞升名册与碾磨流向，再护送无名魂影；真实救助之后才讨论四种道路。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-mill-investigation",
              "id": "loop-mill-investigation-east"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-mill-investigation-dock"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "loop-soul-wick": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "claim-loop-mill-investigation": {
        "id": "claim-loop-mill-investigation",
        "task": "loop-mill-investigation",
        "map": "world-mill",
        "objectId": "millLedger",
        "kind": "claim",
        "label": "交付：碾磨之前先救下名字",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-loop-path-choice": {
        "id": "accept-loop-path-choice",
        "task": "loop-path-choice",
        "map": "world-mill",
        "objectId": "millVerdict",
        "kind": "accept",
        "label": "接下：知道代价之后再择路",
        "detail": "碎轮、共守、化入与返世铺路各有不同代价，需要完成各自的最后事务。",
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
        "sinceRevision": 4
      },
      "loop-choose-break": {
        "id": "loop-choose-break",
        "task": "loop-path-choice",
        "map": "world-mill",
        "objectId": "millVerdict",
        "kind": "choice",
        "label": "承担碎轮与重组的代价",
        "detail": "凝霜自主决定是否以最后力量护送；灾变与旧世回返不会被删去。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "break",
        "confirm": {
          "title": "承担碎轮与重组的代价",
          "text": "凝霜自主决定是否以最后力量护送；灾变与旧世回返不会被删去。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "loop-choose-guardian": {
        "id": "loop-choose-guardian",
        "task": "loop-path-choice",
        "map": "world-mill",
        "objectId": "millVerdict",
        "kind": "choice",
        "label": "与凝霜共同守门",
        "detail": "不是自动结契；双方须明确同意放弃独立人间身份，共担守护。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "guardian",
        "confirm": {
          "title": "与凝霜共同守门",
          "text": "不是自动结契；双方须明确同意放弃独立人间身份，共担守护。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "loop-choose-king": {
        "id": "loop-choose-king",
        "task": "loop-path-choice",
        "map": "world-mill",
        "objectId": "millVerdict",
        "kind": "choice",
        "label": "化入轮回本身",
        "detail": "实际交接姓名与记忆后，失去个人身份，承担不生不灭的代价。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "king",
        "confirm": {
          "title": "化入轮回本身",
          "text": "实际交接姓名与记忆后，失去个人身份，承担不生不灭的代价。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "loop-choose-road": {
        "id": "loop-choose-road",
        "task": "loop-path-choice",
        "map": "world-mill",
        "objectId": "millVerdict",
        "kind": "choice",
        "label": "回到人间为后来人铺路",
        "detail": "凝霜沉睡而不被说成当场死亡；五千年的传承以三种具体工作展开。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "road",
        "confirm": {
          "title": "回到人间为后来人铺路",
          "text": "凝霜沉睡而不被说成当场死亡；五千年的传承以三种具体工作展开。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "claim-loop-path-choice": {
        "id": "claim-loop-path-choice",
        "task": "loop-path-choice",
        "map": "world-mill",
        "objectId": "millVerdict",
        "kind": "claim",
        "label": "记下已经明确的道路",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-loop-break-wheel": {
        "id": "accept-loop-break-wheel",
        "task": "loop-break-wheel",
        "map": "world-mill",
        "objectId": "millVerdict",
        "kind": "accept",
        "label": "接下：碎轮之前给众生留下退路",
        "detail": "先完成实际护持与交接，再作最终确认。",
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
        "sinceRevision": 4
      },
      "loop-break-wheel-evacuate": {
        "id": "loop-break-wheel-evacuate",
        "task": "loop-break-wheel",
        "map": "world-mill",
        "objectId": "millSoulDock",
        "kind": "progress",
        "label": "先送走仍可保名的魂影",
        "detail": "先完成实际护持与交接，再作最终确认。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "loop-break-wheel-evacuate"
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
        "sinceRevision": 4
      },
      "loop-break-wheel-ning-consent": {
        "id": "loop-break-wheel-ning-consent",
        "task": "loop-break-wheel",
        "map": "world-mill",
        "objectId": "millLedger",
        "kind": "progress",
        "label": "记录凝霜本人最后的决定与代价",
        "detail": "先完成实际护持与交接，再作最终确认。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-break-wheel",
              "id": "loop-break-wheel-evacuate"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-break-wheel-ning-consent"
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
        "sinceRevision": 4
      },
      "loop-break-wheel-break": {
        "id": "loop-break-wheel-break",
        "task": "loop-break-wheel",
        "map": "world-mill",
        "objectId": "millAxle",
        "kind": "battle",
        "label": "破除控制碾磨的最后阵影",
        "detail": "先完成实际护持与交接，再作最终确认。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-break-wheel",
              "id": "loop-break-wheel-ning-consent"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-break-wheel-break"
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
        "sinceRevision": 4,
        "encounter": "loop-break-wheel-break-encounter"
      },
      "loop-break-wheel-aftermath": {
        "id": "loop-break-wheel-aftermath",
        "task": "loop-break-wheel",
        "map": "world-mill",
        "objectId": "millRoad",
        "kind": "progress",
        "label": "逐项面对灵气失序、十年灾变与重组见证",
        "detail": "先完成实际护持与交接，再作最终确认。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-break-wheel",
              "id": "loop-break-wheel-break"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-break-wheel-aftermath"
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
        "sinceRevision": 4
      },
      "loop-break-wheel-return": {
        "id": "loop-break-wheel-return",
        "task": "loop-break-wheel",
        "map": "world-mill",
        "objectId": "millVerdict",
        "kind": "progress",
        "label": "确认又回雨夜的终局，保留此程记录而不清空当前存档",
        "detail": "先完成实际护持与交接，再作最终确认。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-break-wheel",
              "id": "loop-break-wheel-aftermath"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-break-wheel-return"
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
        "sinceRevision": 4
      },
      "claim-loop-break-wheel": {
        "id": "claim-loop-break-wheel",
        "task": "loop-break-wheel",
        "map": "world-mill",
        "objectId": "millVerdict",
        "kind": "claim",
        "label": "交付：碎轮之前给众生留下退路",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-loop-guardian-service": {
        "id": "accept-loop-guardian-service",
        "task": "loop-guardian-service",
        "map": "world-mill",
        "objectId": "millVerdict",
        "kind": "accept",
        "label": "接下：共同守门前的四份交托",
        "detail": "先完成实际护持与交接，再作最终确认。",
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
        "sinceRevision": 4
      },
      "loop-guardian-service-self": {
        "id": "loop-guardian-service-self",
        "task": "loop-guardian-service",
        "map": "world-mill",
        "objectId": "millLedger",
        "kind": "progress",
        "label": "写明放弃人间身份的边界与意愿",
        "detail": "先完成实际护持与交接，再作最终确认。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "loop-guardian-service-self"
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
        "sinceRevision": 4
      },
      "loop-guardian-service-ning": {
        "id": "loop-guardian-service-ning",
        "task": "loop-guardian-service",
        "map": "world-mill",
        "objectId": "millSoulDock",
        "kind": "progress",
        "label": "听凝霜独立的同意，不把守门当自动道侣承诺",
        "detail": "先完成实际护持与交接，再作最终确认。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-guardian-service",
              "id": "loop-guardian-service-self"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-guardian-service-ning"
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
        "sinceRevision": 4
      },
      "loop-guardian-service-lamp": {
        "id": "loop-guardian-service-lamp",
        "task": "loop-guardian-service",
        "map": "world-mill",
        "objectId": "millWestAnchor",
        "kind": "progress",
        "label": "共同给无名者留下第一盏护名灯",
        "detail": "先完成实际护持与交接，再作最终确认。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-guardian-service",
              "id": "loop-guardian-service-ning"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-guardian-service-lamp"
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
        "sinceRevision": 4
      },
      "loop-guardian-service-handoff": {
        "id": "loop-guardian-service-handoff",
        "task": "loop-guardian-service",
        "map": "world-mill",
        "objectId": "millEastAnchor",
        "kind": "progress",
        "label": "交接永续护魂职责，不宣称碾磨已经停止",
        "detail": "先完成实际护持与交接，再作最终确认。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-guardian-service",
              "id": "loop-guardian-service-lamp"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-guardian-service-handoff"
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
        "sinceRevision": 4
      },
      "claim-loop-guardian-service": {
        "id": "claim-loop-guardian-service",
        "task": "loop-guardian-service",
        "map": "world-mill",
        "objectId": "millVerdict",
        "kind": "claim",
        "label": "交付：共同守门前的四份交托",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-loop-incorporate-time": {
        "id": "accept-loop-incorporate-time",
        "task": "loop-incorporate-time",
        "map": "world-mill",
        "objectId": "millVerdict",
        "kind": "accept",
        "label": "接下：化入之前先交还自己的名字",
        "detail": "先完成实际护持与交接，再作最终确认。",
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
        "sinceRevision": 4
      },
      "loop-incorporate-time-names": {
        "id": "loop-incorporate-time-names",
        "task": "loop-incorporate-time",
        "map": "world-mill",
        "objectId": "millLedger",
        "kind": "progress",
        "label": "将自己的姓名与记忆按原样归档",
        "detail": "先完成实际护持与交接，再作最终确认。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "loop-incorporate-time-names"
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
        "sinceRevision": 4
      },
      "loop-incorporate-time-consent": {
        "id": "loop-incorporate-time-consent",
        "task": "loop-incorporate-time",
        "map": "world-mill",
        "objectId": "millSoulDock",
        "kind": "progress",
        "label": "不替凝霜决定她自己的道路",
        "detail": "先完成实际护持与交接，再作最终确认。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-incorporate-time",
              "id": "loop-incorporate-time-names"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-incorporate-time-consent"
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
        "sinceRevision": 4
      },
      "loop-incorporate-time-axis": {
        "id": "loop-incorporate-time-axis",
        "task": "loop-incorporate-time",
        "map": "world-mill",
        "objectId": "millAxle",
        "kind": "progress",
        "label": "接替轴心的护名职责，明知失去个人身份",
        "detail": "先完成实际护持与交接，再作最终确认。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-incorporate-time",
              "id": "loop-incorporate-time-consent"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-incorporate-time-axis"
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
        "sinceRevision": 4
      },
      "loop-incorporate-time-warmth": {
        "id": "loop-incorporate-time-warmth",
        "task": "loop-incorporate-time",
        "map": "world-mill",
        "objectId": "millEastAnchor",
        "kind": "progress",
        "label": "为经过轮回者留下最后一点暖",
        "detail": "先完成实际护持与交接，再作最终确认。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-incorporate-time",
              "id": "loop-incorporate-time-axis"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-incorporate-time-warmth"
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
        "sinceRevision": 4
      },
      "claim-loop-incorporate-time": {
        "id": "claim-loop-incorporate-time",
        "task": "loop-incorporate-time",
        "map": "world-mill",
        "objectId": "millVerdict",
        "kind": "claim",
        "label": "交付：化入之前先交还自己的名字",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-loop-five-thousand-road": {
        "id": "accept-loop-five-thousand-road",
        "task": "loop-five-thousand-road",
        "map": "world-mill",
        "objectId": "millVerdict",
        "kind": "accept",
        "label": "接下：把看清的危险写给后来人",
        "detail": "先完成实际护持与交接，再作最终确认。",
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
        "sinceRevision": 4
      },
      "loop-five-thousand-road-promise": {
        "id": "loop-five-thousand-road-promise",
        "task": "loop-five-thousand-road",
        "map": "world-mill",
        "objectId": "millLedger",
        "kind": "progress",
        "label": "记下凝霜沉睡的守候与自己返世的约定",
        "detail": "先完成实际护持与交接，再作最终确认。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "loop-five-thousand-road-promise"
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
        "sinceRevision": 4
      },
      "loop-five-thousand-road-school": {
        "id": "loop-five-thousand-road-school",
        "task": "loop-five-thousand-road",
        "map": "qingyang-charity",
        "objectId": "charityMedicineDesk",
        "kind": "progress",
        "label": "在青阳留下可独立使用的识字辨药课程",
        "detail": "先完成实际护持与交接，再作最终确认。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-five-thousand-road",
              "id": "loop-five-thousand-road-promise"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-five-thousand-road-school"
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
        "sinceRevision": 4
      },
      "loop-five-thousand-road-winter": {
        "id": "loop-five-thousand-road-winter",
        "task": "loop-five-thousand-road",
        "map": "northern-border",
        "objectId": "borderMedical",
        "kind": "progress",
        "label": "在北境留下普通人也能使用的过冬救护册",
        "detail": "先完成实际护持与交接，再作最终确认。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-five-thousand-road",
              "id": "loop-five-thousand-road-school"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-five-thousand-road-winter"
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
        "sinceRevision": 4
      },
      "loop-five-thousand-road-peace": {
        "id": "loop-five-thousand-road-peace",
        "task": "loop-five-thousand-road",
        "map": "two-realms-crossing",
        "objectId": "crossingTreaty",
        "kind": "progress",
        "label": "在两界渡口记下冲突来由和可避开的岔路",
        "detail": "先完成实际护持与交接，再作最终确认。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-five-thousand-road",
              "id": "loop-five-thousand-road-winter"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-five-thousand-road-peace"
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
        "sinceRevision": 4
      },
      "loop-five-thousand-road-last": {
        "id": "loop-five-thousand-road-last",
        "task": "loop-five-thousand-road",
        "map": "world-mill",
        "objectId": "millRoad",
        "kind": "progress",
        "label": "将三册交给后继者，完成五千年铺路的托付",
        "detail": "先完成实际护持与交接，再作最终确认。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "loop-five-thousand-road",
              "id": "loop-five-thousand-road-peace"
            }
          ],
          "any": []
        },
        "marks": [
          "loop-five-thousand-road-last"
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
        "sinceRevision": 4
      },
      "claim-loop-five-thousand-road": {
        "id": "claim-loop-five-thousand-road",
        "task": "loop-five-thousand-road",
        "map": "world-mill",
        "objectId": "millVerdict",
        "kind": "claim",
        "label": "交付：把看清的危险写给后来人",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-admission-overdraw": {
        "id": "accept-admission-overdraw",
        "task": "admission-overdraw",
        "map": "garden",
        "objectId": "admissionWarning",
        "kind": "accept",
        "label": "接下：读过戒示，再决定是否强引灵气",
        "detail": "正常运气可以另行在蒲团进行；强引未稳的灵气是主动危险选择，可能结束此生。",
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
        "sinceRevision": 4
      },
      "admission-force": {
        "id": "admission-force",
        "task": "admission-overdraw",
        "map": "garden",
        "objectId": "admissionWarning",
        "kind": "choice",
        "label": "明知气脉未稳，仍强引灵气",
        "detail": "这不是普通战败：再次确认交付后，本次旅程将以身陨结束。恢复点必须先保管成功。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "admission-decided"
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
        "sinceRevision": 4,
        "choice": "force",
        "confirm": {
          "title": "明知气脉未稳，仍强引灵气",
          "text": "这不是普通战败：再次确认交付后，本次旅程将以身陨结束。恢复点必须先保管成功。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "admission-leave": {
        "id": "admission-leave",
        "task": "admission-overdraw",
        "map": "garden",
        "objectId": "admissionWarning",
        "kind": "choice",
        "label": "收好戒示，安全离开",
        "detail": "不授予任何资源或修为，结束此事后可正常运气修行。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "admission-decided"
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
        "sinceRevision": 4,
        "choice": "leave",
        "confirm": {
          "title": "收好戒示，安全离开",
          "text": "不授予任何资源或修为，结束此事后可正常运气修行。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "claim-admission-overdraw": {
        "id": "claim-admission-overdraw",
        "task": "admission-overdraw",
        "map": "garden",
        "objectId": "admissionWarning",
        "kind": "claim",
        "label": "再次确认本次入门决定",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4,
        "confirm": {
          "title": "确认入门抉择",
          "text": "若选择强引灵气，这次旅程将结束；若选择安全离开，将继续正常修行。取消不结算。",
          "label": "确认已选决定"
        }
      },
      "accept-forbidden-remnant": {
        "id": "accept-forbidden-remnant",
        "task": "forbidden-remnant",
        "map": "wanyao-inner",
        "objectId": "innerRemnantWarning",
        "kind": "accept",
        "label": "接下：残魂的许诺与代价",
        "detail": "秘境结束后的一次短暂回访：先核残魂与过去的伤痕，再由本人决定是否吞噬；残魂的自称不能当已核真相。",
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
        "sinceRevision": 4
      },
      "remnant-check-traces": {
        "id": "remnant-check-traces",
        "task": "forbidden-remnant",
        "map": "wanyao-inner",
        "objectId": "innerRemnantWarning",
        "kind": "progress",
        "label": "先查残魂与秘境伤痕是否相符",
        "detail": "实际对照已完成的秘境调查，不凭它一句话就确认身份。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "remnant-check-traces"
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
        "sinceRevision": 4
      },
      "remnant-read-price": {
        "id": "remnant-read-price",
        "task": "forbidden-remnant",
        "map": "wanyao-inner",
        "objectId": "innerRemnantWarning",
        "kind": "progress",
        "label": "读清吞魂将失去自主的危险",
        "detail": "它许诺的力量不是已经获得的奖励，主动吞噬会结束这段旅程。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "forbidden-remnant",
              "id": "remnant-check-traces"
            }
          ],
          "any": []
        },
        "marks": [
          "remnant-read-price"
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
        "sinceRevision": 4
      },
      "remnant-force": {
        "id": "remnant-force",
        "task": "forbidden-remnant",
        "map": "wanyao-inner",
        "objectId": "innerRemnantWarning",
        "kind": "choice",
        "label": "明知危险，仍吞噬残魂",
        "detail": "第二次确认后，此次旅程以堕入魔途结束；不是开启完整魔尊长线。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "forbidden-remnant",
              "id": "remnant-read-price"
            }
          ],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "force",
        "confirm": {
          "title": "明知危险，仍吞噬残魂",
          "text": "第二次确认后，此次旅程以堕入魔途结束；不是开启完整魔尊长线。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "remnant-refuse": {
        "id": "remnant-refuse",
        "task": "forbidden-remnant",
        "map": "wanyao-inner",
        "objectId": "innerRemnantWarning",
        "kind": "choice",
        "label": "封住残魂，继续自己的路",
        "detail": "不授予魔力或奖励；可以继续尚未错过的其他行程。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "forbidden-remnant",
              "id": "remnant-read-price"
            }
          ],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "refuse",
        "confirm": {
          "title": "封住残魂，继续自己的路",
          "text": "不授予魔力或奖励；可以继续尚未错过的其他行程。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "claim-forbidden-remnant": {
        "id": "claim-forbidden-remnant",
        "task": "forbidden-remnant",
        "map": "wanyao-inner",
        "objectId": "innerRemnantWarning",
        "kind": "claim",
        "label": "再次确认对残魂的决定",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4,
        "confirm": {
          "title": "确认是否承担吞魂后果",
          "text": "若选择吞噬，此程将进入明确终局；若封住残魂，则继续行旅。取消不结算。",
          "label": "确认已选决定"
        }
      },
      "accept-huashen-desperate-defense": {
        "id": "accept-huashen-desperate-defense",
        "task": "huashen-desperate-defense",
        "map": "alliance-camp",
        "objectId": "campWarTable",
        "kind": "accept",
        "label": "接下：不待合体，先赴必死的守山战",
        "detail": "这是一条明确自愿的危险分歧：联军尚未练成，你可以取消并继续整备；承诺死守后须实际完成撤伤、分粮和阻敌。",
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
        "sinceRevision": 4
      },
      "last-stand-commit": {
        "id": "last-stand-commit",
        "task": "huashen-desperate-defense",
        "map": "alliance-camp",
        "objectId": "campWarTable",
        "kind": "choice",
        "label": "不待合体，承担死守的后果",
        "detail": "这会选择不可与正常合体出征并行的道路。战斗失败仍可重试，但最终交付会以身陨结束本次旅程。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "defense-committed"
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
        "sinceRevision": 4,
        "choice": "defend",
        "confirm": {
          "title": "不待合体，承担死守的后果",
          "text": "这会选择不可与正常合体出征并行的道路。战斗失败仍可重试，但最终交付会以身陨结束本次旅程。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "last-stand-allocate": {
        "id": "last-stand-allocate",
        "task": "huashen-desperate-defense",
        "map": "alliance-camp",
        "objectId": "campSupply",
        "kind": "progress",
        "label": "领取最后两份救护安排",
        "detail": "清点现有能送到前线的物资，不捏造数百颗丹药。",
        "requires": {
          "all": [
            {
              "type": "choice",
              "task": "huashen-desperate-defense",
              "id": "defend"
            }
          ],
          "any": []
        },
        "marks": [
          "last-stand-allocate"
        ],
        "cost": {
          "items": {},
          "supplies": {}
        },
        "grant": {
          "items": {},
          "supplies": {
            "last-stand-aid": 2
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "last-stand-evacuate": {
        "id": "last-stand-evacuate",
        "task": "huashen-desperate-defense",
        "map": "alliance-camp",
        "objectId": "campMedic",
        "kind": "progress",
        "label": "先撤不能再战的伤者",
        "detail": "不要求未成年学徒留下送死；救护份额实际用去。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "huashen-desperate-defense",
              "id": "last-stand-allocate"
            }
          ],
          "any": []
        },
        "marks": [
          "last-stand-evacuate"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "last-stand-aid": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "last-stand-rations": {
        "id": "last-stand-rations",
        "task": "huashen-desperate-defense",
        "map": "alliance-camp",
        "objectId": "campSupply",
        "kind": "progress",
        "label": "把最后补给交到仍愿守线者手中",
        "detail": "只有自愿留下者继续守线，不宣称所有部众无一退后。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "huashen-desperate-defense",
              "id": "last-stand-evacuate"
            }
          ],
          "any": []
        },
        "marks": [
          "last-stand-rations"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "last-stand-aid": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "last-stand-hold-line": {
        "id": "last-stand-hold-line",
        "task": "huashen-desperate-defense",
        "map": "alliance-camp",
        "objectId": "campRedBanner",
        "kind": "battle",
        "label": "在红旗下守住最后撤离窗口",
        "detail": "这场可重试的实际阻敌战不自动令人物死亡，只有本人最终交付才收束此生。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "huashen-desperate-defense",
              "id": "last-stand-rations"
            }
          ],
          "any": []
        },
        "marks": [
          "last-stand-hold-line"
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
        "sinceRevision": 4,
        "encounter": "last-stand-hold-line-encounter"
      },
      "claim-huashen-desperate-defense": {
        "id": "claim-huashen-desperate-defense",
        "task": "huashen-desperate-defense",
        "map": "alliance-camp",
        "objectId": "campWarTable",
        "kind": "claim",
        "label": "最终确认：留下守线，收束此生",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4,
        "confirm": {
          "title": "最后确认死守终局",
          "text": "撤离窗口已经守住。你仍选择留下，这次旅程将以身陨结束；取消可保留进度稍后决定。",
          "label": "确认承担此结局"
        }
      },
      "accept-female-sword-mandate": {
        "id": "accept-female-sword-mandate",
        "task": "female-sword-mandate",
        "map": "sword-vault",
        "objectId": "vaultMandate",
        "kind": "accept",
        "label": "接下：剑坪应向每个愿学的人开放",
        "detail": "灵薇有自己的求道与离山计划；先完成公平授剑与真实交接，不把关系亲疏写成她必须留下的理由。",
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
        "sinceRevision": 4
      },
      "female-sword-mandate-lesson": {
        "id": "female-sword-mandate-lesson",
        "task": "female-sword-mandate",
        "map": "sword-vault",
        "objectId": "vaultLesson",
        "kind": "progress",
        "label": "完成不分性别的公开授剑课",
        "detail": "灵薇有自己的求道与离山计划；先完成公平授剑与真实交接，不把关系亲疏写成她必须留下的理由。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "female-sword-mandate-lesson"
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
        "sinceRevision": 4
      },
      "female-sword-mandate-practice": {
        "id": "female-sword-mandate-practice",
        "task": "female-sword-mandate",
        "map": "sword-vault",
        "objectId": "vaultGuardArray",
        "kind": "battle",
        "label": "按公开标准完成护山剑阵考核",
        "detail": "灵薇有自己的求道与离山计划；先完成公平授剑与真实交接，不把关系亲疏写成她必须留下的理由。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "female-sword-mandate",
              "id": "female-sword-mandate-lesson"
            }
          ],
          "any": []
        },
        "marks": [
          "female-sword-mandate-practice"
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
        "sinceRevision": 4,
        "encounter": "female-sword-mandate-practice-encounter"
      },
      "female-sword-mandate-shen-wish": {
        "id": "female-sword-mandate-shen-wish",
        "task": "female-sword-mandate",
        "map": "sword-vault",
        "objectId": "vaultShen",
        "kind": "progress",
        "label": "听灵薇亲口说明自己的西行计划",
        "detail": "灵薇有自己的求道与离山计划；先完成公平授剑与真实交接，不把关系亲疏写成她必须留下的理由。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "female-sword-mandate",
              "id": "female-sword-mandate-practice"
            }
          ],
          "any": []
        },
        "marks": [
          "female-sword-mandate-shen-wish"
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
        "sinceRevision": 4
      },
      "female-sword-mandate-jade": {
        "id": "female-sword-mandate-jade",
        "task": "female-sword-mandate",
        "map": "sword-vault",
        "objectId": "vaultMandate",
        "kind": "progress",
        "label": "当面核掌门玉印与护山印信的来历",
        "detail": "灵薇有自己的求道与离山计划；先完成公平授剑与真实交接，不把关系亲疏写成她必须留下的理由。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "female-sword-mandate",
              "id": "female-sword-mandate-shen-wish"
            }
          ],
          "any": []
        },
        "marks": [
          "female-sword-mandate-jade"
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
        "sinceRevision": 4
      },
      "claim-female-sword-mandate": {
        "id": "claim-female-sword-mandate",
        "task": "female-sword-mandate",
        "map": "sword-vault",
        "objectId": "vaultMandate",
        "kind": "claim",
        "label": "交付：剑坪应向每个愿学的人开放",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
            "female-leader-jade",
            "female-leader-seal"
          ],
          "evidence": []
        },
        "sinceRevision": 4
      },
      "accept-female-sword-choice": {
        "id": "accept-female-sword-choice",
        "task": "female-sword-choice",
        "map": "sword-vault",
        "objectId": "vaultMandate",
        "kind": "accept",
        "label": "接下：印信之后，选择自己的守护",
        "detail": "独守不等于人物被迫孤独，共守也必须有本人明确道侣承诺；两条路各有最后实事。",
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
        "sinceRevision": 4
      },
      "female-sword-alone": {
        "id": "female-sword-alone",
        "task": "female-sword-choice",
        "map": "sword-vault",
        "objectId": "vaultMandate",
        "kind": "choice",
        "label": "以自己的名字独守蜀山",
        "detail": "需本人尚无道侣；灵薇的西行来自她自己的决定。",
        "requires": {
          "all": [
            {
              "type": "partner",
              "id": "none"
            }
          ],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "alone",
        "confirm": {
          "title": "以自己的名字独守蜀山",
          "text": "需本人尚无道侣；灵薇的西行来自她自己的决定。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "female-sword-together": {
        "id": "female-sword-together",
        "task": "female-sword-choice",
        "map": "sword-vault",
        "objectId": "vaultMandate",
        "kind": "choice",
        "label": "与凌云依各自能力共同守山",
        "detail": "需与成年凌云已有明确结契。他若已废功，则以照护、教书与阵务参与，不会重新施法。",
        "requires": {
          "all": [
            {
              "type": "partner",
              "id": "lingyun"
            },
            {
              "type": "token",
              "id": "lingyun-jade-confirmed"
            },
            {
              "type": "task",
              "id": "relation-lingyun-oath",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "marks": [
          "course-chosen"
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
        "sinceRevision": 4,
        "choice": "together",
        "confirm": {
          "title": "与凌云依各自能力共同守山",
          "text": "需与成年凌云已有明确结契。他若已废功，则以照护、教书与阵务参与，不会重新施法。 取消不会写入选择。",
          "label": "确认此意"
        }
      },
      "claim-female-sword-choice": {
        "id": "claim-female-sword-choice",
        "task": "female-sword-choice",
        "map": "sword-vault",
        "objectId": "vaultMandate",
        "kind": "claim",
        "label": "确认自己承担的守护",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-female-solitary-legacy": {
        "id": "accept-female-solitary-legacy",
        "task": "female-solitary-legacy",
        "map": "sword-vault",
        "objectId": "vaultMandate",
        "kind": "accept",
        "label": "接下：她西行，你为后来者留剑坪",
        "detail": "先完成灵薇的自主告别，再把开放剑坪的制度与日常练习传下去。",
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
        "sinceRevision": 4
      },
      "female-solitary-legacy-farewell": {
        "id": "female-solitary-legacy-farewell",
        "task": "female-solitary-legacy",
        "map": "sword-vault",
        "objectId": "vaultShen",
        "kind": "progress",
        "label": "按灵薇自己的愿望完成西行告别",
        "detail": "先完成灵薇的自主告别，再把开放剑坪的制度与日常练习传下去。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "female-solitary-legacy-farewell"
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
        "sinceRevision": 4
      },
      "female-solitary-legacy-charter": {
        "id": "female-solitary-legacy-charter",
        "task": "female-solitary-legacy",
        "map": "sword-vault",
        "objectId": "vaultLesson",
        "kind": "progress",
        "label": "把平等授剑的门规交给后来弟子",
        "detail": "先完成灵薇的自主告别，再把开放剑坪的制度与日常练习传下去。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "female-solitary-legacy",
              "id": "female-solitary-legacy-farewell"
            }
          ],
          "any": []
        },
        "marks": [
          "female-solitary-legacy-charter"
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
        "sinceRevision": 4
      },
      "female-solitary-legacy-watch": {
        "id": "female-solitary-legacy-watch",
        "task": "female-solitary-legacy",
        "map": "sword-vault",
        "objectId": "vaultGuardArray",
        "kind": "progress",
        "label": "完成独立守阵与弟子轮值的最后核验",
        "detail": "先完成灵薇的自主告别，再把开放剑坪的制度与日常练习传下去。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "female-solitary-legacy",
              "id": "female-solitary-legacy-charter"
            }
          ],
          "any": []
        },
        "marks": [
          "female-solitary-legacy-watch"
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
        "sinceRevision": 4
      },
      "claim-female-solitary-legacy": {
        "id": "claim-female-solitary-legacy",
        "task": "female-solitary-legacy",
        "map": "sword-vault",
        "objectId": "vaultMandate",
        "kind": "claim",
        "label": "交付：她西行，你为后来者留剑坪",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      },
      "accept-female-mountain-watch": {
        "id": "accept-female-mountain-watch",
        "task": "female-mountain-watch",
        "map": "sword-vault",
        "objectId": "vaultMandate",
        "kind": "accept",
        "label": "接下：以各自仍有的能力共同守山",
        "detail": "验旧尺与合玉，重新分工，再完成主角护阵与同伴照护的共同任务。",
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
        "sinceRevision": 4
      },
      "female-mountain-watch-keepsakes": {
        "id": "female-mountain-watch-keepsakes",
        "task": "female-mountain-watch",
        "map": "sword-vault",
        "objectId": "vaultMandate",
        "kind": "progress",
        "label": "核曾实际交接的戒尺与合玉，不补发旧物",
        "detail": "验旧尺与合玉，重新分工，再完成主角护阵与同伴照护的共同任务。",
        "requires": {
          "all": [],
          "any": []
        },
        "marks": [
          "female-mountain-watch-keepsakes"
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
        "sinceRevision": 4
      },
      "female-mountain-watch-roles": {
        "id": "female-mountain-watch-roles",
        "task": "female-mountain-watch",
        "map": "sword-vault",
        "objectId": "vaultLesson",
        "kind": "progress",
        "label": "依凌云当前身体与自主意愿安排教书、照护和阵务",
        "detail": "验旧尺与合玉，重新分工，再完成主角护阵与同伴照护的共同任务。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "female-mountain-watch",
              "id": "female-mountain-watch-keepsakes"
            }
          ],
          "any": []
        },
        "marks": [
          "female-mountain-watch-roles"
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
        "sinceRevision": 4
      },
      "female-mountain-watch-watch": {
        "id": "female-mountain-watch-watch",
        "task": "female-mountain-watch",
        "map": "sword-vault",
        "objectId": "vaultGuardArray",
        "kind": "battle",
        "label": "主角守阵，凌云承担已约定的照护事务",
        "detail": "验旧尺与合玉，重新分工，再完成主角护阵与同伴照护的共同任务。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "female-mountain-watch",
              "id": "female-mountain-watch-roles"
            }
          ],
          "any": []
        },
        "marks": [
          "female-mountain-watch-watch"
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
        "sinceRevision": 4,
        "encounter": "female-mountain-watch-watch-encounter"
      },
      "female-mountain-watch-promise": {
        "id": "female-mountain-watch-promise",
        "task": "female-mountain-watch",
        "map": "sword-vault",
        "objectId": "vaultMandate",
        "kind": "progress",
        "label": "再次确认成年、自愿、唯一的共守承诺",
        "detail": "验旧尺与合玉，重新分工，再完成主角护阵与同伴照护的共同任务。",
        "requires": {
          "all": [
            {
              "type": "done",
              "task": "female-mountain-watch",
              "id": "female-mountain-watch-watch"
            }
          ],
          "any": []
        },
        "marks": [
          "female-mountain-watch-promise"
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
        "sinceRevision": 4
      },
      "claim-female-mountain-watch": {
        "id": "claim-female-mountain-watch",
        "task": "female-mountain-watch",
        "map": "sword-vault",
        "objectId": "vaultMandate",
        "kind": "claim",
        "label": "交付：以各自仍有的能力共同守山",
        "detail": "完成本事后一次交付；普通背包放不下时整笔保留，稍后再来。",
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
        "sinceRevision": 4
      }
    },
    "encounters": {
      "black-quiet-fight-encounter": {
        "id": "black-quiet-fight-encounter",
        "title": "断警后拦住守令者",
        "detail": "只在胜利后记下保全令符的结果。",
        "map": "blackwind-stockade",
        "enemies": [
          {
            "id": "black-quiet-guard",
            "kind": "stone",
            "name": "守令寨卫",
            "x": 810,
            "y": 405,
            "maxHp": 170,
            "speed": 44,
            "damage": 12,
            "spriteKey": "m5Bandit"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "black-assault-fight-encounter": {
        "id": "black-assault-fight-encounter",
        "title": "正面守住令台与囚棚",
        "detail": "两名寨卫位置不同；守势、选目标与符药决定负担。",
        "map": "blackwind-stockade",
        "enemies": [
          {
            "id": "black-assault-fight-encounter-guard",
            "kind": "stone",
            "name": "拦路寨卫",
            "x": 810,
            "y": 415,
            "maxHp": 150,
            "speed": 45,
            "damage": 11,
            "spriteKey": "m5Bandit"
          },
          {
            "id": "black-assault-fight-encounter-scout",
            "kind": "sprite",
            "name": "持弩游哨",
            "x": 835,
            "y": 490,
            "maxHp": 95,
            "speed": 58,
            "damage": 8,
            "spriteKey": "m5Scout"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "border-hold-west-encounter": {
        "id": "border-hold-west-encounter",
        "title": "守住西翼传令点",
        "detail": "守军分担另一侧压力；本次胜利只完成这一段边防。",
        "map": "northern-border",
        "enemies": [
          {
            "id": "border-raider",
            "kind": "stone",
            "name": "袭关军士",
            "x": 390,
            "y": 240,
            "maxHp": 170,
            "speed": 44,
            "damage": 12,
            "spriteKey": "m5Captain"
          },
          {
            "id": "border-archer",
            "kind": "sprite",
            "name": "绕翼弩手",
            "x": 330,
            "y": 370,
            "maxHp": 110,
            "speed": 59,
            "damage": 9,
            "spriteKey": "m5Scout"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "marshal-cover-exit-encounter": {
        "id": "marshal-cover-exit-encounter",
        "title": "掩护老帅离开囚棚",
        "detail": "胜利才完成转运；失败不重复扣已经用于开锁的封签。",
        "map": "blackwind-stockade",
        "enemies": [
          {
            "id": "marshal-cover-exit-encounter-guard",
            "kind": "stone",
            "name": "拦路寨卫",
            "x": 515,
            "y": 550,
            "maxHp": 150,
            "speed": 45,
            "damage": 11,
            "spriteKey": "m5Bandit"
          },
          {
            "id": "marshal-cover-exit-encounter-scout",
            "kind": "sprite",
            "name": "持弩游哨",
            "x": 540,
            "y": 425,
            "maxHp": 95,
            "speed": 58,
            "damage": 8,
            "spriteKey": "m5Scout"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "legend-cover-last-caravan-encounter": {
        "id": "legend-cover-last-caravan-encounter",
        "title": "护最后一队药车出关",
        "detail": "不同于此前西翼防守，这是离开前的东翼护送。",
        "map": "northern-border",
        "enemies": [
          {
            "id": "legend-raider-one",
            "kind": "stone",
            "name": "截药劫匪",
            "x": 900,
            "y": 280,
            "maxHp": 180,
            "speed": 45,
            "damage": 12,
            "spriteKey": "m5Bandit"
          },
          {
            "id": "legend-raider-two",
            "kind": "sprite",
            "name": "夺车游匪",
            "x": 920,
            "y": 405,
            "maxHp": 110,
            "speed": 61,
            "damage": 9,
            "spriteKey": "m5Scout"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "reunion-capture-officer-encounter": {
        "id": "reunion-capture-officer-encounter",
        "title": "截住私通军令的敌将",
        "detail": "击败护卫并保留活口，才可取得亲口供词。",
        "map": "northern-border",
        "enemies": [
          {
            "id": "reunion-officer",
            "kind": "stone",
            "name": "私通军令的敌将",
            "x": 900,
            "y": 300,
            "maxHp": 230,
            "speed": 42,
            "damage": 14,
            "spriteKey": "m5Captain"
          },
          {
            "id": "reunion-guard",
            "kind": "sprite",
            "name": "护将游骑",
            "x": 920,
            "y": 410,
            "maxHp": 115,
            "speed": 63,
            "damage": 10,
            "spriteKey": "m5Scout"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "blacklord-stop-marauders-encounter": {
        "id": "blacklord-stop-marauders-encounter",
        "title": "压住借令抢粮的兵众",
        "detail": "实际阻止一次劫粮，才能要求部众遵守不犯凡的军纪。",
        "map": "blackwind-stockade",
        "enemies": [
          {
            "id": "blacklord-stop-marauders-encounter-guard",
            "kind": "stone",
            "name": "拦路寨卫",
            "x": 515,
            "y": 550,
            "maxHp": 150,
            "speed": 45,
            "damage": 11,
            "spriteKey": "m5Bandit"
          },
          {
            "id": "blacklord-stop-marauders-encounter-scout",
            "kind": "sprite",
            "name": "持弩游哨",
            "x": 540,
            "y": 425,
            "maxHp": 95,
            "speed": 58,
            "damage": 8,
            "spriteKey": "m5Scout"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "medical-snow-ward-encounter": {
        "id": "medical-snow-ward-encounter",
        "title": "护住雪山伤者与医道灯",
        "detail": "医道劫仍由修为与战术应对，护持目标来自已完成的救人行动；苏叶作为成年同道独立署名。",
        "map": "icefield-cavern",
        "enemies": [
          {
            "id": "medical-cold-shadow",
            "kind": "stone",
            "name": "寒疫劫影",
            "x": 955,
            "y": 230,
            "maxHp": 200,
            "speed": 43,
            "damage": 13,
            "spriteKey": "m5ColdSpirit"
          },
          {
            "id": "medical-frost-wisp",
            "kind": "sprite",
            "name": "失温游魄",
            "x": 1160,
            "y": 285,
            "maxHp": 110,
            "speed": 61,
            "damage": 9,
            "spriteKey": "campaignRiftSpirit"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "laststand-hold-gate-encounter": {
        "id": "laststand-hold-gate-encounter",
        "title": "最后守住关门缺口",
        "detail": "击败这组前锋只完成护证窗口。生命代价由之后具名确认的结局交付承担，不由普通失败触发。",
        "map": "northern-border",
        "enemies": [
          {
            "id": "laststand-captain",
            "kind": "stone",
            "name": "北荒追击主将",
            "x": 525,
            "y": 250,
            "maxHp": 250,
            "speed": 44,
            "damage": 15,
            "spriteKey": "m5Captain"
          },
          {
            "id": "laststand-scout",
            "kind": "sprite",
            "name": "绕关追兵",
            "x": 670,
            "y": 500,
            "maxHp": 135,
            "speed": 62,
            "damage": 10,
            "spriteKey": "m5Scout"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "shen-cover-petition-encounter": {
        "id": "shen-cover-petition-encounter",
        "title": "护住送往山门的申诉卷",
        "detail": "阻案执事在整备案北侧拦路，胜后才完成交接。",
        "map": "jindan-retreat",
        "enemies": [
          {
            "id": "shen-case-obstructor",
            "kind": "stone",
            "name": "阻案执事",
            "x": 1010,
            "y": 325,
            "maxHp": 180,
            "speed": 43,
            "damage": 12,
            "spriteKey": "m4Rebel"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "demon-yuanying-trial-first-encounter": {
        "id": "demon-yuanying-trial-first-encounter",
        "title": "第一段：稳住逆流",
        "detail": "两段真实试炼之间可退出整备，失败只重试当前段，只有交付才突破。",
        "map": "demon-blood-cavern",
        "enemies": [
          {
            "id": "demon-yuanying-trial-one",
            "kind": "stone",
            "name": "魔息凝影",
            "x": 795,
            "y": 375,
            "maxHp": 220,
            "speed": 43,
            "damage": 13,
            "spriteKey": "m5BloodShade"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "demon-yuanying-trial-second-encounter": {
        "id": "demon-yuanying-trial-second-encounter",
        "title": "第二段：护住本心",
        "detail": "两段真实试炼之间可退出整备，失败只重试当前段，只有交付才突破。",
        "map": "demon-blood-cavern",
        "enemies": [
          {
            "id": "demon-yuanying-trial-two",
            "kind": "sprite",
            "name": "反照魔影",
            "x": 795,
            "y": 375,
            "maxHp": 190,
            "speed": 60,
            "damage": 12,
            "spriteKey": "m5BloodShade"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "demon-rebel-negotiate-encounter": {
        "id": "demon-rebel-negotiate-encounter",
        "title": "保护公开交涉场",
        "detail": "胜利才记录本次处理方法。",
        "map": "demon-tribes",
        "enemies": [
          {
            "id": "tribal-negotiate0",
            "kind": "stone",
            "name": "持械叛部兵",
            "x": 800,
            "y": 220,
            "maxHp": 230,
            "speed": 43,
            "damage": 14,
            "spriteKey": "m5TribalRebel"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "demon-rebel-force-encounter": {
        "id": "demon-rebel-force-encounter",
        "title": "压住两队叛军",
        "detail": "胜利才记录本次处理方法。",
        "map": "demon-tribes",
        "enemies": [
          {
            "id": "tribal-force0",
            "kind": "stone",
            "name": "持械叛部兵",
            "x": 800,
            "y": 220,
            "maxHp": 230,
            "speed": 43,
            "damage": 14,
            "spriteKey": "m5TribalRebel"
          },
          {
            "id": "tribal-force1",
            "kind": "sprite",
            "name": "持械叛部兵",
            "x": 770,
            "y": 320,
            "maxHp": 150,
            "speed": 59,
            "damage": 11,
            "spriteKey": "m5TribalRebel"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "demon-huashen-trial-first-encounter": {
        "id": "demon-huashen-trial-first-encounter",
        "title": "第一段：稳住逆流",
        "detail": "两段真实试炼之间可退出整备，失败只重试当前段，只有交付才突破。",
        "map": "demon-tribes",
        "enemies": [
          {
            "id": "demon-huashen-trial-one",
            "kind": "stone",
            "name": "魔息凝影",
            "x": 510,
            "y": 450,
            "maxHp": 220,
            "speed": 43,
            "damage": 13,
            "spriteKey": "m5BloodShade"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "demon-huashen-trial-second-encounter": {
        "id": "demon-huashen-trial-second-encounter",
        "title": "第二段：护住本心",
        "detail": "两段真实试炼之间可退出整备，失败只重试当前段，只有交付才突破。",
        "map": "demon-tribes",
        "enemies": [
          {
            "id": "demon-huashen-trial-two",
            "kind": "sprite",
            "name": "反照魔影",
            "x": 540,
            "y": 525,
            "maxHp": 190,
            "speed": 60,
            "damage": 12,
            "spriteKey": "m5BloodShade"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "demon-coup-siege-encounter": {
        "id": "demon-coup-siege-encounter",
        "title": "击退阻撤离的魔甲先遣",
        "detail": "围山前先让平民离开，敌人是玄玑势力，旧同门不因阵营被强制杀害。",
        "map": "demon-palace",
        "enemies": [
          {
            "id": "demon-coup-guard",
            "kind": "stone",
            "name": "玄玑魔甲先遣",
            "x": 930,
            "y": 550,
            "maxHp": 310,
            "speed": 43,
            "damage": 17,
            "spriteKey": "m5DemonGuard"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "demon-coup-break-control-encounter": {
        "id": "demon-coup-break-control-encounter",
        "title": "截断玄玑的遥控阵脉",
        "detail": "围山前先让平民离开，敌人是玄玑势力，旧同门不因阵营被强制杀害。",
        "map": "demon-palace",
        "enemies": [
          {
            "id": "demon-xuanji-projection",
            "kind": "stone",
            "name": "玄玑魔甲投影",
            "x": 870,
            "y": 350,
            "maxHp": 380,
            "speed": 42,
            "damage": 19,
            "spriteKey": "m4Xuanji"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "demon-heti-trial-first-encounter": {
        "id": "demon-heti-trial-first-encounter",
        "title": "第一段：稳住逆流",
        "detail": "两段真实试炼之间可退出整备，失败只重试当前段，只有交付才突破。",
        "map": "demon-palace",
        "enemies": [
          {
            "id": "demon-heti-trial-one",
            "kind": "stone",
            "name": "魔息凝影",
            "x": 510,
            "y": 450,
            "maxHp": 220,
            "speed": 43,
            "damage": 13,
            "spriteKey": "m5BloodShade"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "demon-heti-trial-second-encounter": {
        "id": "demon-heti-trial-second-encounter",
        "title": "第二段：护住本心",
        "detail": "两段真实试炼之间可退出整备，失败只重试当前段，只有交付才突破。",
        "map": "demon-palace",
        "enemies": [
          {
            "id": "demon-heti-trial-two",
            "kind": "sprite",
            "name": "反照魔影",
            "x": 540,
            "y": 525,
            "maxHp": 190,
            "speed": 60,
            "damage": 12,
            "spriteKey": "m5BloodShade"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "demon-century-fifty-assassin-encounter": {
        "id": "demon-century-fifty-assassin-encounter",
        "title": "第五十年护住议庭，击退刺客",
        "detail": "十年照护、二十年告别、五十年遇刺、百年交接分别留实际记录。",
        "map": "demon-palace",
        "enemies": [
          {
            "id": "demon-century-assassin",
            "kind": "sprite",
            "name": "破约刺客",
            "x": 880,
            "y": 350,
            "maxHp": 320,
            "speed": 65,
            "damage": 17,
            "spriteKey": "m5Scout"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "demon-dacheng-trial-first-encounter": {
        "id": "demon-dacheng-trial-first-encounter",
        "title": "第一段：稳住逆流",
        "detail": "两段真实试炼之间可退出整备，失败只重试当前段，只有交付才突破。",
        "map": "demon-palace",
        "enemies": [
          {
            "id": "demon-dacheng-trial-one",
            "kind": "stone",
            "name": "魔息凝影",
            "x": 510,
            "y": 450,
            "maxHp": 220,
            "speed": 43,
            "damage": 13,
            "spriteKey": "m5BloodShade"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "demon-dacheng-trial-second-encounter": {
        "id": "demon-dacheng-trial-second-encounter",
        "title": "第二段：护住本心",
        "detail": "两段真实试炼之间可退出整备，失败只重试当前段，只有交付才突破。",
        "map": "demon-palace",
        "enemies": [
          {
            "id": "demon-dacheng-trial-two",
            "kind": "sprite",
            "name": "反照魔影",
            "x": 540,
            "y": 525,
            "maxHp": 190,
            "speed": 60,
            "damage": 12,
            "spriteKey": "m5BloodShade"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "demon-dark-conquest-old-friend-encounter": {
        "id": "demon-dark-conquest-old-friend-encounter",
        "title": "面对阻你继续破约的旧友",
        "detail": "每项交代完成后才收束此生，普通失败仍可重试当前战。",
        "map": "demon-palace",
        "enemies": [
          {
            "id": "demon-dark-oath",
            "kind": "stone",
            "name": "守住旧约的剑阵",
            "x": 400,
            "y": 550,
            "maxHp": 420,
            "speed": 40,
            "damage": 20,
            "spriteKey": "m4SwordDisciple"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "enlighten-yuanying-trial-first-encounter": {
        "id": "enlighten-yuanying-trial-first-encounter",
        "title": "第一段：守住自身识念",
        "detail": "以实际护证和守心为准备，两段劫战完成后才交付突破。",
        "map": "icefield-cavern",
        "enemies": [
          {
            "id": "enlighten-yuanying-trial-mind",
            "kind": "stone",
            "name": "试道心识影",
            "x": 550,
            "y": 225,
            "maxHp": 230,
            "speed": 44,
            "damage": 14,
            "spriteKey": "m4Mind"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "enlighten-yuanying-trial-second-encounter": {
        "id": "enlighten-yuanying-trial-second-encounter",
        "title": "第二段：守住共同护持",
        "detail": "以实际护证和守心为准备，两段劫战完成后才交付突破。",
        "map": "icefield-cavern",
        "enemies": [
          {
            "id": "enlighten-yuanying-trial-thunder",
            "kind": "sprite",
            "name": "问道劫雷",
            "x": 565,
            "y": 290,
            "maxHp": 205,
            "speed": 59,
            "damage": 13,
            "spriteKey": "m4Thunder"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "enlighten-compiled-case-guard-encounter": {
        "id": "enlighten-compiled-case-guard-encounter",
        "title": "护住卷宗，击退夜袭死士",
        "detail": "证词、原账和删账互相对勘，护住真话，也保护愿意说话的人。",
        "map": "archive-hearing",
        "enemies": [
          {
            "id": "enlighten-assassin-left",
            "kind": "stone",
            "name": "灭口死士",
            "x": 510,
            "y": 370,
            "maxHp": 230,
            "speed": 44,
            "damage": 14,
            "spriteKey": "m5Bandit"
          },
          {
            "id": "enlighten-assassin-right",
            "kind": "sprite",
            "name": "夺卷死士",
            "x": 790,
            "y": 380,
            "maxHp": 160,
            "speed": 61,
            "damage": 11,
            "spriteKey": "m5Scout"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "enlighten-public-trial-battle-encounter": {
        "id": "enlighten-public-trial-battle-encounter",
        "title": "与愿意护证的人联手挡住玄玑",
        "detail": "让每位证人有自己的发言顺序，再面对被揭面的玄玑。",
        "map": "golden-summit",
        "enemies": [
          {
            "id": "enlighten-xuanji",
            "kind": "stone",
            "name": "玄玑子 · 真面",
            "x": 675,
            "y": 585,
            "maxHp": 390,
            "speed": 43,
            "damage": 18,
            "spriteKey": "m4XuanjiPlain"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "enlighten-huashen-trial-first-encounter": {
        "id": "enlighten-huashen-trial-first-encounter",
        "title": "第一段：守住自身识念",
        "detail": "以实际护证和守心为准备，两段劫战完成后才交付突破。",
        "map": "golden-summit",
        "enemies": [
          {
            "id": "enlighten-huashen-trial-mind",
            "kind": "stone",
            "name": "试道心识影",
            "x": 680,
            "y": 580,
            "maxHp": 230,
            "speed": 44,
            "damage": 14,
            "spriteKey": "m4Mind"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "enlighten-huashen-trial-second-encounter": {
        "id": "enlighten-huashen-trial-second-encounter",
        "title": "第二段：守住共同护持",
        "detail": "以实际护证和守心为准备，两段劫战完成后才交付突破。",
        "map": "golden-summit",
        "enemies": [
          {
            "id": "enlighten-huashen-trial-thunder",
            "kind": "sprite",
            "name": "问道劫雷",
            "x": 695,
            "y": 645,
            "maxHp": 205,
            "speed": 59,
            "damage": 13,
            "spriteKey": "m4Thunder"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "enlighten-treaty-ten-rebellion-encounter": {
        "id": "enlighten-treaty-ten-rebellion-encounter",
        "title": "第十年保护边民，止住破约武装",
        "detail": "通商、破约、义学、正式签约各有实际事务与承担者。",
        "map": "two-realms-crossing",
        "enemies": [
          {
            "id": "enlighten-treaty-rebel",
            "kind": "stone",
            "name": "冷月部破约兵",
            "x": 835,
            "y": 565,
            "maxHp": 310,
            "speed": 43,
            "damage": 17,
            "spriteKey": "m5TribalRebel"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "enlighten-heti-trial-first-encounter": {
        "id": "enlighten-heti-trial-first-encounter",
        "title": "第一段：守住自身识念",
        "detail": "以实际护证和守心为准备，两段劫战完成后才交付突破。",
        "map": "sword-vault",
        "enemies": [
          {
            "id": "enlighten-heti-trial-mind",
            "kind": "stone",
            "name": "试道心识影",
            "x": 420,
            "y": 330,
            "maxHp": 230,
            "speed": 44,
            "damage": 14,
            "spriteKey": "m4Mind"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "enlighten-heti-trial-second-encounter": {
        "id": "enlighten-heti-trial-second-encounter",
        "title": "第二段：守住共同护持",
        "detail": "以实际护证和守心为准备，两段劫战完成后才交付突破。",
        "map": "sword-vault",
        "enemies": [
          {
            "id": "enlighten-heti-trial-thunder",
            "kind": "sprite",
            "name": "问道劫雷",
            "x": 435,
            "y": 395,
            "maxHp": 205,
            "speed": 59,
            "damage": 13,
            "spriteKey": "m4Thunder"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "enlighten-thirty-one-exercise-encounter": {
        "id": "enlighten-thirty-one-exercise-encounter",
        "title": "共同演练护持，守住北桥锚",
        "detail": "三十位同行者和主角合计三十一人；人数来自自愿名册，绝不自动强拉已亡者。",
        "map": "two-realms-crossing",
        "enemies": [
          {
            "id": "enlighten-common-shadow",
            "kind": "stone",
            "name": "归元护持试影",
            "x": 510,
            "y": 235,
            "maxHp": 330,
            "speed": 42,
            "damage": 17,
            "spriteKey": "m4LivingTrial"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "enlighten-dacheng-trial-first-encounter": {
        "id": "enlighten-dacheng-trial-first-encounter",
        "title": "第一段：守住自身识念",
        "detail": "以实际护证和守心为准备，两段劫战完成后才交付突破。",
        "map": "sword-vault",
        "enemies": [
          {
            "id": "enlighten-dacheng-trial-mind",
            "kind": "stone",
            "name": "试道心识影",
            "x": 480,
            "y": 230,
            "maxHp": 230,
            "speed": 44,
            "damage": 14,
            "spriteKey": "m4Mind"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "enlighten-dacheng-trial-second-encounter": {
        "id": "enlighten-dacheng-trial-second-encounter",
        "title": "第二段：守住共同护持",
        "detail": "以实际护证和守心为准备，两段劫战完成后才交付突破。",
        "map": "sword-vault",
        "enemies": [
          {
            "id": "enlighten-dacheng-trial-thunder",
            "kind": "sprite",
            "name": "问道劫雷",
            "x": 480,
            "y": 230,
            "maxHp": 205,
            "speed": 59,
            "damage": 13,
            "spriteKey": "m4Thunder"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "enlighten-sword-guard-invasion-encounter": {
        "id": "enlighten-sword-guard-invasion-encounter",
        "title": "第一事：挡住犯境妖影",
        "detail": "来犯、灾害与后继者都需要不同回应，千年守山由这三种真实代表事件展开。",
        "map": "sword-vault",
        "enemies": [
          {
            "id": "sword-guard-invader",
            "kind": "stone",
            "name": "犯境妖影",
            "x": 420,
            "y": 320,
            "maxHp": 420,
            "speed": 43,
            "damage": 19,
            "spriteKey": "campaignRiftSpirit"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "loop-life-general-hold-encounter": {
        "id": "loop-life-general-hold-encounter",
        "title": "以当世可用之力守住撤退阵口",
        "detail": "只与记忆中的战阵交手，胜败不改写现实人物命运。",
        "map": "northern-border",
        "enemies": [
          {
            "id": "memory-general-guard",
            "kind": "stone",
            "name": "回忆中的追兵",
            "x": 530,
            "y": 430,
            "maxHp": 220,
            "speed": 44,
            "damage": 13,
            "spriteKey": "m5Captain"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "loop-life-ruler-defend-encounter": {
        "id": "loop-life-ruler-defend-encounter",
        "title": "守住平民撤离的最后一阵",
        "detail": "只与记忆中的战阵交手，胜败不改写现实人物命运。",
        "map": "demon-palace",
        "enemies": [
          {
            "id": "memory-ruler-guard",
            "kind": "stone",
            "name": "回忆中的联军阵影",
            "x": 910,
            "y": 500,
            "maxHp": 240,
            "speed": 42,
            "damage": 14,
            "spriteKey": "m5DemonGuard"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "loop-mill-investigation-guard-encounter": {
        "id": "loop-mill-investigation-guard-encounter",
        "title": "阻止磨盘卫把待渡魂影带走",
        "detail": "先查飞升名册与碾磨流向，再护送无名魂影；真实救助之后才讨论四种道路。",
        "map": "world-mill",
        "enemies": [
          {
            "id": "mill-watchman",
            "kind": "stone",
            "name": "无名磨盘卫",
            "x": 320,
            "y": 390,
            "maxHp": 260,
            "speed": 43,
            "damage": 15,
            "spriteKey": "m5MillGuard"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "loop-break-wheel-break-encounter": {
        "id": "loop-break-wheel-break-encounter",
        "title": "破除控制碾磨的最后阵影",
        "detail": "先完成实际护持与交接，再作最终确认。",
        "map": "world-mill",
        "enemies": [
          {
            "id": "mill-final-control",
            "kind": "stone",
            "name": "碾磨控制阵影",
            "x": 640,
            "y": 485,
            "maxHp": 300,
            "speed": 40,
            "damage": 16,
            "spriteKey": "m5MillGuard"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "last-stand-hold-line-encounter": {
        "id": "last-stand-hold-line-encounter",
        "title": "在红旗下守住最后撤离窗口",
        "detail": "这场可重试的实际阻敌战不自动令人物死亡，只有本人最终交付才收束此生。",
        "map": "alliance-camp",
        "enemies": [
          {
            "id": "last-stand-guard",
            "kind": "stone",
            "name": "破阵黑甲",
            "x": 590,
            "y": 400,
            "maxHp": 440,
            "speed": 42,
            "damage": 22,
            "spriteKey": "m5DemonGuard"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "female-sword-mandate-practice-encounter": {
        "id": "female-sword-mandate-practice-encounter",
        "title": "按公开标准完成护山剑阵考核",
        "detail": "灵薇有自己的求道与离山计划；先完成公平授剑与真实交接，不把关系亲疏写成她必须留下的理由。",
        "map": "sword-vault",
        "enemies": [
          {
            "id": "female-mandate-array",
            "kind": "stone",
            "name": "护山试剑阵影",
            "x": 280,
            "y": 175,
            "maxHp": 480,
            "speed": 42,
            "damage": 19,
            "spriteKey": "m4SwordDisciple"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      },
      "female-mountain-watch-watch-encounter": {
        "id": "female-mountain-watch-watch-encounter",
        "title": "主角守阵，凌云承担已约定的照护事务",
        "detail": "验旧尺与合玉，重新分工，再完成主角护阵与同伴照护的共同任务。",
        "map": "sword-vault",
        "enemies": [
          {
            "id": "female-common-trial",
            "kind": "stone",
            "name": "守山阵劫余影",
            "x": 280,
            "y": 175,
            "maxHp": 460,
            "speed": 42,
            "damage": 18,
            "spriteKey": "m4LivingTrial"
          }
        ],
        "returnTo": {
          "map": "jindan-retreat",
          "x": 640,
          "y": 650
        }
      }
    },
    "supplies": {
      "charity-herb-sample": {
        "title": "济善堂教学药样",
        "max": 2,
        "usage": "两处各一份，只用于处理堂中外伤教学，不是普通灵草备用仓。",
        "sinceRevision": 4
      },
      "charity-clean-water": {
        "title": "济善堂净洗水",
        "max": 1,
        "usage": "本次教学净洗与配伍各用其流程，最后成药扣一份。",
        "sinceRevision": 4
      },
      "border-stretcher-pack": {
        "title": "陷阵营担架包",
        "max": 1,
        "usage": "只在伤员转运时消耗，一次军营配给。",
        "sinceRevision": 4
      },
      "border-grain-seal": {
        "title": "陷阵营防潮粮封",
        "max": 1,
        "usage": "只在军粮护运时消耗，一次军营配给。",
        "sinceRevision": 4
      },
      "marshal-transfer-seal": {
        "title": "老帅提审封签",
        "max": 1,
        "usage": "核验军印后发放，只用于从囚棚转出老帅。",
        "sinceRevision": 4
      },
      "icefield-fragment": {
        "title": "冰原异纹碎片",
        "max": 3,
        "usage": "三个位置各一枚，最后比合为完整轮回物证；不可出售或作战斗材料。",
        "sinceRevision": 4
      },
      "icefield-warming-kit": {
        "title": "矿道护温药包",
        "max": 1,
        "usage": "矿工交出的有限药包，只供雪崩伤者实际救助。",
        "sinceRevision": 4
      },
      "wander-route-parcel": {
        "title": "十年巡行封装药货",
        "max": 3,
        "usage": "三份不同目的地的民间药货，一次领齐逐处交付，不可改作普通灵药库存。",
        "sinceRevision": 4
      },
      "wandering-clinic-sample": {
        "title": "巡医实诊药样",
        "max": 3,
        "usage": "青阳、边关、冰原三个病例各一份，仅供合编巡医方。",
        "sinceRevision": 4
      },
      "wandering-clinic-dose": {
        "title": "巡医定量成药",
        "max": 3,
        "usage": "完成三病例比对后一次配成三份，逐处用于原病例，不进入战斗背包。",
        "sinceRevision": 4
      },
      "shen-fair-case-kit": {
        "title": "灵薇问案封存包",
        "max": 1,
        "usage": "公开护送女弟子卷宗时使用，不能替代任何旧矿案证据。",
        "sinceRevision": 4
      },
      "ning-soul-lamp-wick": {
        "title": "凝霜护魂灯芯",
        "max": 1,
        "usage": "真实救护受困魂影时用去，不消耗旧狐簪、不自动融合灵薇或任何人。",
        "sinceRevision": 4
      },
      "axing-clinic-form": {
        "title": "阿杏独立医案纸",
        "max": 2,
        "usage": "两份分别作病案与教学抄本，帮她建立独立医馆记录，不是婚约票据。",
        "sinceRevision": 4
      },
      "lingyun-school-repair": {
        "title": "凌云旧私塾修整件",
        "max": 1,
        "usage": "现场领得一份，只用于修复旧书匣；不是回复灵力的法器。",
        "sinceRevision": 4
      },
      "demon-cold-clamp": {
        "title": "万魔窟寒铁护脉夹",
        "max": 1,
        "usage": "试炼前一次实物配给，在稳定血脉时使用。",
        "sinceRevision": 4
      },
      "demon-release-salt": {
        "title": "万魔窟泄压盐",
        "max": 1,
        "usage": "试炼泄压专用，不能卖成普通修为材料。",
        "sinceRevision": 4
      },
      "tribal-grain": {
        "title": "十二部粮种包",
        "max": 2,
        "usage": "农部实领两份，一份配粮、一份播种修渠后使用。",
        "sinceRevision": 4
      },
      "tribal-tools": {
        "title": "十二部修渠件",
        "max": 2,
        "usage": "两处渠口各耗一份，不是无限工程库存。",
        "sinceRevision": 4
      },
      "tribal-school-kit": {
        "title": "十二部义塾学具",
        "max": 1,
        "usage": "安置儿童时实际使用，不作招募亲兵耗材。",
        "sinceRevision": 4
      },
      "tribal-witch-dose": {
        "title": "巫部救护药样",
        "max": 1,
        "usage": "真实诊治牧部病畜后的用料，不发普通背包丹药。",
        "sinceRevision": 4
      },
      "demon-bridge-repair": {
        "title": "两界桥修缮件",
        "max": 2,
        "usage": "两岸各一份，桥面修通后才能实办互市。",
        "sinceRevision": 4
      },
      "demon-compensation": {
        "title": "停战赔偿粮包",
        "max": 2,
        "usage": "核粮仓后一次两包，必须实际分别交受难者与边民学堂。",
        "sinceRevision": 4
      },
      "demon-hermit-wood": {
        "title": "北岸木屋修整料",
        "max": 2,
        "usage": "冰原现场收拾的两份屋料，封窗与修屋各耗一份。",
        "sinceRevision": 4
      },
      "enlighten-witness-kit": {
        "title": "三证人护送用料",
        "max": 3,
        "usage": "三位证人各用一份，不是任意补给库存。",
        "sinceRevision": 4
      },
      "enlighten-fox-wick": {
        "title": "证道狐火护灯芯",
        "max": 1,
        "usage": "由凝霜明确同意后配给，用于三证验真，不消耗旧狐簪或关系承诺。",
        "sinceRevision": 4
      },
      "enlighten-trade-parcel": {
        "title": "归元通商货签",
        "max": 2,
        "usage": "两岸各交一份的实货签，不是凭空两界合好。",
        "sinceRevision": 4
      },
      "enlighten-school-kit": {
        "title": "归元义学册",
        "max": 1,
        "usage": "建立两界义学时一次交付。",
        "sinceRevision": 4
      },
      "mortal-house-wood": {
        "title": "医塾修屋木材",
        "max": 2,
        "usage": "两次实际短工所得，只用于修屋与课桌。",
        "sinceRevision": 4
      },
      "mortal-herb-seed": {
        "title": "医塾民间药种",
        "max": 2,
        "usage": "药圃领得两包，分别试种与留种，不是青灵草。",
        "sinceRevision": 4
      },
      "mortal-care-cloth": {
        "title": "普通净布照护包",
        "max": 1,
        "usage": "自愿采用经期照护时使用；不用时完整留在照护匣记录。",
        "sinceRevision": 4
      },
      "mortal-school-paper": {
        "title": "医塾教学纸",
        "max": 2,
        "usage": "两页分别用于识字与辨药课程，不是婚契材料。",
        "sinceRevision": 4
      },
      "mortal-plague-sample": {
        "title": "杏河疫案药样",
        "max": 3,
        "usage": "医馆、村口、药路三处来源；仅用于虚构疫案的配方核对。",
        "sinceRevision": 4
      },
      "mortal-plague-dose": {
        "title": "杏河疫案成药",
        "max": 3,
        "usage": "正确辨方后分成三份，送给阿杏、村民与避难棚，不可误饮成战斗药。",
        "sinceRevision": 4
      },
      "mortal-flood-sandbag": {
        "title": "杏河堤口沙袋包",
        "max": 2,
        "usage": "水位核查后现场领两包，一处堤口一包。",
        "sinceRevision": 4
      },
      "mortal-flood-board": {
        "title": "杏河救护浮板组",
        "max": 1,
        "usage": "一次河岸领用，真实转运使用，凡人不以御剑替代。",
        "sinceRevision": 4
      },
      "memory-general-order": {
        "title": "第五世军令回忆",
        "max": 2,
        "usage": "只用于此世退守与平民撤离，不能带到现实军阵。",
        "sinceRevision": 4
      },
      "memory-healer-dose": {
        "title": "第十世救助药样",
        "max": 2,
        "usage": "只救治旧世记忆中的两位病患，不进入今生药柜。",
        "sinceRevision": 4
      },
      "memory-ruler-seal": {
        "title": "第三十七世政令回忆",
        "max": 2,
        "usage": "只用在旧世不伤凡人和通商两份政令，不变动今生魔宫。",
        "sinceRevision": 4
      },
      "loop-soul-wick": {
        "title": "碾磨旁保名灯芯",
        "max": 3,
        "usage": "三份灯芯分别用于护名、引流与渡魂，不是战斗丹药。",
        "sinceRevision": 4
      },
      "last-stand-aid": {
        "title": "最后防线救护份额",
        "max": 2,
        "usage": "两份有限救护分别用于撤伤与分粮，不是可出售药材。",
        "sinceRevision": 4
      }
    },
    "tokens": {
      "wander-herb-manual": {
        "id": "wander-herb-manual",
        "title": "苏老头授予的百草经",
        "source": {
          "task": "wander-charity",
          "on": "claimed"
        },
        "description": "真实辨药与救助后授予的完整医理抄本；不同于先前现场医注。",
        "sinceRevision": 4
      },
      "wander-black-order": {
        "id": "wander-black-order",
        "title": "黑风寨验真的黑令",
        "source": {
          "task": "wander-black-order",
          "on": "black-take-order"
        },
        "description": "真实夺令、验印所得；不自动授予统率八部的资格。",
        "sinceRevision": 4
      },
      "wander-army-seal": {
        "id": "wander-army-seal",
        "title": "陷阵营出入铜符",
        "source": {
          "task": "wander-border-service",
          "on": "claimed"
        },
        "description": "完成实际边防后所得的通行凭证。",
        "sinceRevision": 4
      },
      "wander-loop-shard": {
        "id": "wander-loop-shard",
        "title": "冰原比合的轮回碎片",
        "source": {
          "task": "wander-icefield-survey",
          "on": "ice-fit-fragments"
        },
        "description": "三处真实取片形成的完整物证，身份尚未解释。",
        "sinceRevision": 4
      },
      "wander-route-map": {
        "id": "wander-route-map",
        "title": "实地补全的江湖残图",
        "source": {
          "task": "wander-road-years",
          "on": "claimed"
        },
        "description": "经过青阳、边关与冰原的实际交接后补全，不是开场所得。",
        "sinceRevision": 4
      },
      "lingyun-bamboo-ruler": {
        "id": "lingyun-bamboo-ruler",
        "title": "凌云交还的紫竹戒尺",
        "source": {
          "task": "relation-lingyun-oath",
          "on": "lingyun-receive-ruler"
        },
        "description": "旧私塾物证，成年时实际查匣交还。",
        "sinceRevision": 4
      },
      "lingyun-jade-confirmed": {
        "id": "lingyun-jade-confirmed",
        "title": "凌云合玉的验认",
        "source": {
          "task": "relation-lingyun-oath",
          "on": "lingyun-compare-two-jades"
        },
        "description": "只证明对照与交接经历，不自动证明恋爱或婚契。",
        "sinceRevision": 4
      },
      "demon-mother-hairpin": {
        "id": "demon-mother-hairpin",
        "title": "生母凌玉杏的素银簪",
        "source": {
          "task": "demon-mother-legacy",
          "on": "demon-mother-legacy-receive"
        },
        "description": "与沈灵薇传讯簪、外婆遗簪分别记录。",
        "sinceRevision": 4
      },
      "demon-apricot-flag": {
        "id": "demon-apricot-flag",
        "title": "生母所绣的十八杏花旗",
        "source": {
          "task": "demon-mother-legacy",
          "on": "demon-mother-legacy-receive"
        },
        "description": "真正核验后从魔宫旧匣交出，不补写M4旧任务已经授旗。",
        "sinceRevision": 4
      },
      "mortal-old-flute": {
        "id": "mortal-old-flute",
        "title": "归凡时实际交还的旧竹笛",
        "source": {
          "task": "mortal-renunciation",
          "on": "claimed"
        },
        "description": "新交接所得，不是迁移时补发的旧物。",
        "sinceRevision": 4
      },
      "mortal-herb-manual": {
        "id": "mortal-herb-manual",
        "title": "归凡后实学的百草经",
        "source": {
          "task": "mortal-livelihood",
          "on": "mortal-livelihood-book"
        },
        "description": "医术来自授阅、辨药与实践；修为散尽不抹去知识。",
        "sinceRevision": 4
      },
      "loop-investigated-fragment": {
        "id": "loop-investigated-fragment",
        "title": "三地核验后的轮回合纹",
        "source": {
          "task": "loop-investigation",
          "on": "claimed"
        },
        "description": "来自现场三处核验与真实狐簪比对，保留旧碎片收藏，不凭空复原长命锁。",
        "sinceRevision": 4
      },
      "female-leader-jade": {
        "id": "female-leader-jade",
        "title": "灵薇亲手交托的掌门玉印",
        "source": {
          "task": "female-sword-mandate",
          "on": "claimed"
        },
        "description": "本次公平授剑与本人交托后实际所得，不以旧矿钥或其他信物冒充。",
        "sinceRevision": 4
      },
      "female-leader-seal": {
        "id": "female-leader-seal",
        "title": "公开护山职责印信",
        "source": {
          "task": "female-sword-mandate",
          "on": "claimed"
        },
        "description": "完成护山考核后由公开交接所得，属于本版明确补写的可操作来源。",
        "sinceRevision": 4
      }
    },
    "evidence": {
      "wander-captive-testimony": {
        "id": "wander-captive-testimony",
        "title": "商旅签押供词",
        "source": {
          "task": "wander-black-order",
          "on": "black-captive-testimony"
        },
        "description": "与黑令、焦账分别核验。",
        "sinceRevision": 4
      },
      "wander-village-signatures": {
        "id": "wander-village-signatures",
        "title": "受助乡民联名状",
        "source": {
          "task": "wander-prison-evidence",
          "on": "marshal-village-signatures"
        },
        "description": "真实请愿署名，与军中证词相互独立。",
        "sinceRevision": 4
      },
      "wander-marshal-testimony": {
        "id": "wander-marshal-testimony",
        "title": "老帅当面证词",
        "source": {
          "task": "wander-prison-evidence",
          "on": "marshal-take-testimony"
        },
        "description": "由真实救援、转运和口述产生。",
        "sinceRevision": 4
      },
      "wander-blood-seal": {
        "id": "wander-blood-seal",
        "title": "黑风库帐上的血符印",
        "source": {
          "task": "wander-black-order",
          "on": "black-copy-ledger"
        },
        "description": "现场库帐抄印，与真实黑风令可以互验。",
        "sinceRevision": 4
      },
      "wander-enemy-confession": {
        "id": "wander-enemy-confession",
        "title": "北境敌将签认供词",
        "source": {
          "task": "wander-return-trial",
          "on": "reunion-officer-testimony"
        },
        "description": "现场截获后取得，可与军令和焦账比对。",
        "sinceRevision": 4
      },
      "enlighten-zhou-testimony": {
        "id": "enlighten-zhou-testimony",
        "title": "周三独立证言",
        "source": {
          "task": "enlighten-three-witnesses",
          "on": "enlighten-three-witnesses-zhou"
        },
        "description": "真实保护与本人核对后取得，不替其他证人作证。",
        "sinceRevision": 4
      },
      "enlighten-ashi-testimony": {
        "id": "enlighten-ashi-testimony",
        "title": "阿石独立证言",
        "source": {
          "task": "enlighten-three-witnesses",
          "on": "enlighten-three-witnesses-ashi"
        },
        "description": "真实保护与本人核对后取得，不替其他证人作证。",
        "sinceRevision": 4
      },
      "enlighten-chen-testimony": {
        "id": "enlighten-chen-testimony",
        "title": "陈默独立证言",
        "source": {
          "task": "enlighten-three-witnesses",
          "on": "enlighten-three-witnesses-chen"
        },
        "description": "真实保护与本人核对后取得，不替其他证人作证。",
        "sinceRevision": 4
      },
      "enlighten-verified-case": {
        "id": "enlighten-verified-case",
        "title": "经三证与狐火核验的旧矿案卷",
        "source": {
          "task": "enlighten-compiled-case",
          "on": "enlighten-compiled-case-verify"
        },
        "description": "真实对账/同意/护火来源，尚须公开质询。",
        "sinceRevision": 4
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
        },
        "portrait": {
          "atlas": "campaignPeople",
          "cell": 2
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
        },
        "portrait": {
          "atlas": "campaignPeople",
          "cell": 3
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
        },
        "portrait": {
          "atlas": "campaignPeople",
          "cell": 4
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
          },
          {
            "source": {
              "task": "demon-dark-conquest",
              "on": "demon-dark-conquest-lost-friend"
            },
            "state": "dead",
            "detail": "万世魔治分支中因阻止破约而牺牲，不能在旧图仍作来使。"
          }
        ],
        "metSource": {
          "task": "tower-duty",
          "on": "accept"
        },
        "adult": true,
        "relationshipTask": "relation-lingyun-vow",
        "relationshipChoices": {
          "friend": {
            "stage": "同行朋友",
            "detail": "共同事业与自主生活都被尊重。"
          },
          "decline": {
            "stage": "尊重各自选择",
            "detail": "明确谢绝结契，既有情义和实用合作保留。"
          },
          "vow": {
            "stage": "明确道侣",
            "detail": "双方成年、自愿、唯一；具体承诺由真实交付完成。"
          }
        },
        "portrait": {
          "atlas": "campaignPeople",
          "cell": 1
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
          },
          {
            "source": {
              "task": "demon-century",
              "on": "demon-century-twenty-farewell"
            },
            "state": "dead",
            "detail": "已接师门真实讣告，旧图不再复现活着的清微。"
          },
          {
            "source": {
              "task": "enlighten-personal-farewell",
              "on": "enlighten-personal-farewell-qingwei-farewell"
            },
            "state": "dead",
            "detail": "完成思过后在证道岁月中离世，旧图留下独立遗教。"
          }
        ],
        "metSource": {
          "task": "tower-duty",
          "on": "accept"
        },
        "portrait": {
          "atlas": "chapterPeople",
          "cell": 3
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
        "relationshipTask": "relation-axing-vow",
        "relationshipChoices": {
          "friend": {
            "stage": "同行朋友",
            "detail": "共同事业与自主生活都被尊重。"
          },
          "decline": {
            "stage": "尊重各自选择",
            "detail": "明确谢绝结契，既有情义和实用合作保留。"
          },
          "vow": {
            "stage": "明确道侣",
            "detail": "双方成年、自愿、唯一；具体承诺由真实交付完成。"
          }
        },
        "goal": "学会独立辨药和照护，让行旅与村中女子能安心来医庐求助。",
        "boundary": "这一段是成年提前相识；亲近须明确回应，亦可保持朋友，不自动恋爱或结契。",
        "portrait": {
          "atlas": "campaignPeople",
          "cell": 0
        },
        "ageAtEpoch": 25,
        "previousRelationshipTask": "apricot-aid",
        "previousRelationshipChoices": {
          "friend": {
            "stage": "同行朋友",
            "detail": "共同医案已留下，你们以朋友相待。"
          },
          "close": {
            "stage": "愿再相见",
            "detail": "双方愿意慢慢相识；尚未确认为恋人或道侣。"
          }
        },
        "adult": true,
        "lifecycle": [
          {
            "source": {
              "task": "mortal-life-years",
              "on": "mortal-years-early-1"
            },
            "state": "alive",
            "detail": "医塾已走过第一段十五年，她仍按自己的出诊与讲学计划工作。",
            "presentation": {
              "atlas": "m5PeopleE",
              "cell": 0
            },
            "portrait": {
              "atlas": "m5PeopleE",
              "cell": 0
            }
          },
          {
            "source": {
              "task": "mortal-life-years",
              "on": "mortal-years-early-3"
            },
            "state": "alive",
            "detail": "五十年医塾传承已完成，她已至晚年，仍有自己的照护与交托意愿。",
            "presentation": {
              "atlas": "m5PeopleE",
              "cell": 1
            },
            "portrait": {
              "atlas": "m5PeopleE",
              "cell": 1
            }
          },
          {
            "source": {
              "task": "dacheng-preparation",
              "on": "claimed"
            },
            "state": "alive",
            "detail": "世间已经过去数十年，杏村的医者也已年长。",
            "presentation": {
              "atlas": "m5PeopleE",
              "cell": 1
            },
            "portrait": {
              "atlas": "m5PeopleE",
              "cell": 1
            }
          },
          {
            "source": {
              "task": "mortal-life-years",
              "on": "mortal-years-late-1"
            },
            "state": "alive",
            "detail": "晚年来到医塾，先完成一段三年的课程交接；双方年龄不会退回初见。",
            "presentation": {
              "atlas": "m5PeopleE",
              "cell": 1
            },
            "portrait": {
              "atlas": "m5PeopleE",
              "cell": 1
            }
          },
          {
            "source": {
              "task": "mortal-home-farewell",
              "on": "mortal-home-farewell-goodbye"
            },
            "state": "dead",
            "detail": "真实凡人生涯照护与告别后离世，旧村只保留独立医案和追念处。"
          },
          {
            "source": {
              "task": "mortal-flute-reunion",
              "on": "mortal-flute-reunion-goodbye"
            },
            "state": "dead",
            "detail": "白首重逢路线中真实告别；临终回忆只呈成年相识，不把人物复活到旧图。"
          }
        ],
        "agePresentations": [
          {
            "minimumAge": 40,
            "portrait": {
              "atlas": "m5PeopleE",
              "cell": 0
            },
            "presentation": {
              "atlas": "m5PeopleE",
              "cell": 0
            }
          },
          {
            "minimumAge": 65,
            "portrait": {
              "atlas": "m5PeopleE",
              "cell": 1
            },
            "presentation": {
              "atlas": "m5PeopleE",
              "cell": 1
            }
          }
        ]
      },
      "traveler": {
        "id": "traveler",
        "name": "发热的行旅",
        "age": 34,
        "role": "被救助者",
        "adapted": true,
        "goal": "退热后自行回家；不是奖励箱或感情交换条件。",
        "portrait": {
          "atlas": "campaignPeople",
          "cell": 5
        }
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
          },
          {
            "source": {
              "task": "demon-coup",
              "on": "demon-coup-uncle-farewell"
            },
            "state": "dead",
            "detail": "魔域政变已击破其控制与本体，旧图不再以活人出现。"
          },
          {
            "source": {
              "task": "enlighten-public-trial",
              "on": "enlighten-public-trial-record"
            },
            "state": "dead",
            "detail": "证道线公开会审后与真实联手战结算，不再出现在旧图充作活人。"
          }
        ],
        "metSource": {
          "task": "tianji-negotiation",
          "on": "offer-heard"
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
          },
          {
            "source": {
              "task": "demon-coup",
              "on": "demon-coup-uncle-farewell"
            },
            "state": "dead",
            "detail": "魔域政变中真实牺牲，遗物与衣冠处供人追念。"
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
        "ageAtEpoch": 30,
        "description": "独立诊疗的年轻医修，关注伤患救治与医案传承，也有自己的行旅计划。"
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
          },
          {
            "source": {
              "task": "female-solitary-legacy",
              "on": "female-solitary-legacy-farewell"
            },
            "state": "alive",
            "detail": "按本人意愿西行求道，已经离开旧居；这不是死亡，也不强写双方曾为道侣。",
            "presentation": {
              "hidden": true
            }
          },
          {
            "source": {
              "task": "demon-century",
              "on": "demon-century-ten-care"
            },
            "state": "dead",
            "detail": "魔域线十年医案与追念记录确认沈灵薇已离世，未结契者不写配偶。"
          },
          {
            "source": {
              "task": "enlighten-personal-farewell",
              "on": "enlighten-personal-farewell-shen-farewell"
            },
            "state": "dead",
            "detail": "证道岁月中的自然告别已实际完成，朋友或道侣身份按真实承诺回顾。"
          }
        ],
        "metSource": {
          "task": "tower-duty",
          "on": "accept"
        },
        "adult": true,
        "relationshipTask": "relation-shen-vow",
        "relationshipChoices": {
          "friend": {
            "stage": "同行朋友",
            "detail": "共同事业与自主生活都被尊重。"
          },
          "decline": {
            "stage": "尊重各自选择",
            "detail": "明确谢绝结契，既有情义和实用合作保留。"
          },
          "vow": {
            "stage": "明确道侣",
            "detail": "双方成年、自愿、唯一；具体承诺由真实交付完成。"
          }
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
        ],
        "portrait": {
          "atlas": "m4PeopleA",
          "cell": 2
        }
      },
      "old-su": {
        "id": "old-su",
        "name": "苏老头",
        "role": "行旅相识",
        "metSource": {
          "task": "wander-charity",
          "on": "accept"
        },
        "description": "济善堂老医者，愿教肯实际照看病患的人。",
        "ageAtEpoch": 60,
        "portrait": {
          "atlas": "m5PeopleA",
          "cell": 0
        }
      },
      "shenhongye": {
        "id": "shenhongye",
        "name": "沈红叶",
        "role": "行旅相识",
        "metSource": {
          "task": "wander-charity",
          "on": "accept"
        },
        "description": "独立行走江湖的查案者，治好伤后继续自己的线索。",
        "ageAtEpoch": 28,
        "portrait": {
          "atlas": "m5PeopleA",
          "cell": 1
        }
      },
      "border-captain": {
        "id": "border-captain",
        "name": "陷阵营哨长",
        "role": "行旅相识",
        "metSource": {
          "task": "wander-border-service",
          "on": "accept"
        },
        "description": "照管关隘传令和后营伤员。",
        "ageAtEpoch": 35,
        "portrait": {
          "atlas": "m5PeopleB",
          "cell": 0
        }
      },
      "old-marshal": {
        "id": "old-marshal",
        "name": "老帅",
        "role": "行旅相识",
        "metSource": {
          "task": "wander-prison-evidence",
          "on": "accept"
        },
        "description": "身陷囚棚仍保有军令原委，待你真实转运。",
        "ageAtEpoch": 58,
        "portrait": {
          "atlas": "m5PeopleA",
          "cell": 3
        }
      },
      "ashi": {
        "id": "ashi",
        "name": "阿石",
        "role": "行旅相识",
        "metSource": {
          "task": "wander-icefield-survey",
          "on": "accept"
        },
        "description": "北荒矿工，知道旧矿道与伤者落脚处。",
        "ageAtEpoch": 32,
        "portrait": {
          "atlas": "m5PeopleB",
          "cell": 1
        }
      },
      "ning": {
        "id": "ning",
        "name": "凝霜",
        "role": "狐簪残魂",
        "metSource": {
          "task": "relation-ning-soul",
          "on": "accept"
        },
        "description": "汉墓后留在狐簪中的成年狐修残魂；只能借护魂灯显相，有自己的意愿。这不是肉身复活，也不替代沈灵薇的人格。",
        "portrait": {
          "atlas": "m5PeopleA",
          "cell": 2
        },
        "adult": true,
        "relationshipTask": "relation-ning-vow",
        "relationshipChoices": {
          "friend": {
            "stage": "同行朋友",
            "detail": "共同事业与自主生活都被尊重。"
          },
          "decline": {
            "stage": "尊重各自选择",
            "detail": "明确谢绝结契，既有情义和实用合作保留。"
          },
          "vow": {
            "stage": "明确道侣",
            "detail": "双方成年、自愿、唯一；具体承诺由真实交付完成。"
          }
        },
        "lifecycle": [
          {
            "source": {
              "task": "wander-icefield-survey",
              "on": "claimed"
            },
            "state": "alive",
            "detail": "三片异纹已实际比合，旧狐簪的微弱残响在护魂灯旁显相。凝霜没有恢复肉身，仍依托随身狐簪与护持灯火。",
            "presentation": {
              "name": "凝霜 · 狐簪残魂",
              "hidden": false
            },
            "portrait": {
              "atlas": "m5PeopleA",
              "cell": 2
            }
          }
        ]
      },
      "old-demon": {
        "id": "old-demon",
        "name": "窟中老魔头",
        "role": "行旅相识",
        "metSource": {
          "task": "demon-blood-preparation",
          "on": "accept"
        },
        "description": "懂得压住魔血的老修士，不把失控当作修炼的必需代价。",
        "ageAtEpoch": 70,
        "portrait": {
          "atlas": "m5PeopleC",
          "cell": 3
        }
      },
      "ajiu": {
        "id": "ajiu",
        "name": "阿九",
        "role": "行旅相识",
        "metSource": {
          "task": "demon-blood-preparation",
          "on": "accept"
        },
        "description": "二十岁的同修，有自己的生存经历与选择。",
        "ageAtEpoch": 20,
        "portrait": {
          "atlas": "m5PeopleD",
          "cell": 0
        }
      },
      "witch": {
        "id": "witch",
        "name": "巫姑",
        "role": "行旅相识",
        "metSource": {
          "task": "demon-tribal-work",
          "on": "accept"
        },
        "description": "负责巫部医药，能教救人之术。",
        "ageAtEpoch": 55,
        "portrait": {
          "atlas": "m5PeopleC",
          "cell": 0
        }
      },
      "old-smith": {
        "id": "old-smith",
        "name": "老铁头",
        "role": "行旅相识",
        "metSource": {
          "task": "demon-tribal-work",
          "on": "accept"
        },
        "description": "铁部匠人，要求军械与农具都有人承担成本。",
        "ageAtEpoch": 60,
        "portrait": {
          "atlas": "m5PeopleC",
          "cell": 1
        }
      },
      "qiqige": {
        "id": "qiqige",
        "name": "乌云琪琪格",
        "role": "行旅相识",
        "metSource": {
          "task": "demon-tribal-work",
          "on": "accept"
        },
        "description": "牧部领事，关心水渠与牲畜过冬。",
        "ageAtEpoch": 35,
        "portrait": {
          "atlas": "m5PeopleC",
          "cell": 2
        }
      },
      "lingshuang": {
        "id": "lingshuang",
        "name": "凌霜",
        "role": "行旅相识",
        "metSource": {
          "task": "demon-tribal-work",
          "on": "accept"
        },
        "description": "她在义塾求学，有自己想守住的名字和家园；后来承担的职责按实际行程记录。",
        "ageAtEpoch": 14,
        "lifecycle": [
          {
            "source": {
              "task": "demon-century",
              "on": "demon-century-hundred-handoff"
            },
            "state": "alive",
            "detail": "经历真实百年后，凌霜已是独立祭司，没有被指定婚配。",
            "presentation": {
              "name": "凌霜 · 成年祭司",
              "atlas": "m5PeopleD",
              "cell": 2,
              "height": 105
            },
            "portrait": {
              "atlas": "m5PeopleD",
              "cell": 2
            }
          }
        ],
        "portrait": {
          "atlas": "m5PeopleD",
          "cell": 1
        }
      },
      "crossing-clerk": {
        "id": "crossing-clerk",
        "name": "两界公证执事",
        "role": "行旅相识",
        "metSource": {
          "task": "demon-treaty",
          "on": "accept"
        },
        "description": "记录实际双方履约，不替任何人伪造同意。",
        "ageAtEpoch": 35,
        "portrait": {
          "atlas": "m4PeopleB",
          "cell": 3
        }
      },
      "zhousan": {
        "id": "zhousan",
        "name": "周三",
        "role": "行旅相识",
        "metSource": {
          "task": "enlighten-three-witnesses",
          "on": "accept"
        },
        "description": "青阳旧案的亲历者，愿说明自己真正看见的部分。",
        "ageAtEpoch": 50,
        "portrait": {
          "atlas": "m5PeopleB",
          "cell": 2
        }
      },
      "chenmo": {
        "id": "chenmo",
        "name": "陈默",
        "role": "行旅相识",
        "metSource": {
          "task": "enlighten-three-witnesses",
          "on": "accept"
        },
        "description": "藏经阁书吏，知道哪些账页被删改。",
        "ageAtEpoch": 45,
        "portrait": {
          "atlas": "m5PeopleB",
          "cell": 3
        }
      },
      "apricot-grandma": {
        "id": "apricot-grandma",
        "name": "王婆婆",
        "role": "村中长辈",
        "metSource": {
          "task": "mortal-livelihood",
          "on": "accept"
        },
        "description": "关心医塾与阿杏各自的生活，不替成年人指定婚配。",
        "adult": true,
        "portrait": {
          "atlas": "m5PeopleD",
          "cell": 3
        }
      }
    },
    "realms": {
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
        "next": "化神修行",
        "alternativeSources": [
          {
            "task": "demon-yuanying-trial",
            "on": "claimed"
          },
          {
            "task": "enlighten-yuanying-trial",
            "on": "claimed"
          }
        ]
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
        "next": "合体与北伐",
        "alternativeSources": [
          {
            "task": "demon-huashen-trial",
            "on": "claimed"
          },
          {
            "task": "enlighten-huashen-trial",
            "on": "claimed"
          }
        ]
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
        "next": "大乘准备",
        "alternativeSources": [
          {
            "task": "demon-heti-trial",
            "on": "claimed"
          },
          {
            "task": "enlighten-heti-trial",
            "on": "claimed"
          }
        ]
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
        "next": "天门抉择",
        "alternativeSources": [
          {
            "task": "demon-dacheng-trial",
            "on": "claimed"
          },
          {
            "task": "enlighten-dacheng-trial",
            "on": "claimed"
          }
        ]
      }
    },
    "endings": {
      "ending_wandering_path": {
        "id": "ending_wandering_path",
        "title": "独行九州",
        "sourceId": "wandering_path",
        "source": {
          "task": "wander-independent-farewell",
          "on": "claimed"
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sourceRefs": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 59,
            "node": "wandering_path"
          }
        ],
        "summary": "你留下可循的路册，作为独立游侠继续九州行旅。此后不以门派名望替别人作决定。"
      },
      "ending_wander_legend": {
        "id": "ending_wander_legend",
        "title": "江湖夜雨",
        "sourceId": "ending_wander_legend",
        "source": {
          "task": "wander-legend-handoff",
          "on": "claimed"
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sourceRefs": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 190,
            "node": "ending_wander_legend"
          }
        ],
        "summary": "老帅已脱险，案卷与黑令拓印各有去处。你与凝霜尊重彼此的行程，走进江湖夜雨。"
      },
      "ending_wander_reunion": {
        "id": "ending_wander_reunion",
        "title": "故剑归蜀",
        "sourceId": "ending_wander_reunion",
        "source": {
          "task": "wander-return-trial",
          "on": "claimed"
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sourceRefs": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 241,
            "node": "ending_wander_reunion"
          }
        ],
        "summary": "你以五证公开旧案，回山承担保护凡人的巡察职责；十年江湖成为你行事的依据。"
      },
      "ending_wander_demon": {
        "id": "ending_wander_demon",
        "title": "黑令魔尊",
        "sourceId": "ending_wander_demon",
        "source": {
          "task": "wander-black-command",
          "on": "claimed"
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sourceRefs": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 225,
            "node": "ending_wander_demon"
          }
        ],
        "summary": "你凭黑令收束八部，立下不犯凡人的严令，也失去了旧友对这条道路的认同。凝霜是否为道侣，只取决于你们真实的承诺。"
      },
      "ending_wander_medical_immortal": {
        "id": "ending_wander_medical_immortal",
        "title": "医仙 · 悬壶济世",
        "sourceId": "ending_wander_medical_immortal",
        "source": {
          "task": "wander-medical-legacy",
          "on": "claimed"
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sourceRefs": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 351,
            "node": "ending_wander_medical_immortal"
          }
        ],
        "summary": "你完成三地救治与雪山护持，把医案留给同行者。苏叶以自己的名字行医，后来者从你们留下的药圃继续救人。"
      },
      "ending_wander_death": {
        "id": "ending_wander_death",
        "title": "忠骨北荒",
        "sourceId": "ending_wander_death",
        "source": {
          "task": "wander-last-stand",
          "on": "claimed"
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sourceRefs": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 208,
            "node": "ending_wander_death"
          }
        ],
        "summary": "证词已送出，伤员有路可退。你在北荒选择留下，以此生守住最后的关门；后来人据这些证卷继续追查。"
      },
      "ending_demon_lord": {
        "id": "ending_demon_lord",
        "title": "万魔之主",
        "sourceId": "ending_demon_lord",
        "source": {
          "task": "demon-lord-settlement",
          "on": "claimed"
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sourceRefs": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 119,
            "node": "ending_demon_lord"
          }
        ],
        "summary": "复仇之后，你真实安置俘虏、开放商路、约束魔军，以仁魔之规承担尊位。"
      },
      "ending_demon_dark_reign": {
        "id": "ending_demon_dark_reign",
        "title": "魔隐 · 万世魔主",
        "sourceId": "ending_demon_dark_reign",
        "source": {
          "task": "demon-dark-conquest",
          "on": "claimed"
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sourceRefs": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 330,
            "node": "ending_demon_dark_reign"
          }
        ],
        "summary": "你真实破坏两界之约，失去阻止你的旧友，以强制军令把魔治压向三界。漫长统治并未抹去代价。"
      },
      "ending_demon_redemption": {
        "id": "ending_demon_redemption",
        "title": "回头是岸",
        "sourceId": "ending_demon_redemption",
        "source": {
          "task": "demon-redemption-handoff",
          "on": "claimed"
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sourceRefs": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 132,
            "node": "ending_demon_redemption"
          }
        ],
        "summary": "军权已交、赔偿有据、魔功封存。你亲自走进锁妖塔，以漫长自囚与诵名承担过往。"
      },
      "ending_demon_hermit": {
        "id": "ending_demon_hermit",
        "title": "北荒归客",
        "sourceId": "ending_demon_hermit",
        "source": {
          "task": "demon-hermit-care",
          "on": "claimed"
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sourceRefs": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 512,
            "node": "ending_demon_hermit"
          }
        ],
        "summary": "你先交出军权并守住两界旧约，再到北岸建屋护魂。狐簪旁留下的是等待与尊重，关系不因退隐自动改变。"
      },
      "ending_f_demon_lady_ling": {
        "id": "ending_f_demon_lady_ling",
        "title": "魔尊传火",
        "sourceId": "ending_f_demon_lady_ling",
        "source": {
          "task": "demon-apricot-reform",
          "on": "claimed"
        },
        "requires": {
          "all": [
            {
              "type": "gender",
              "id": "female"
            }
          ],
          "any": []
        },
        "sourceRefs": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 477,
            "node": "ending_f_demon_lady_ling"
          }
        ],
        "summary": "你以女主之身实际废血祭、兴魔塾、开边市，把生母未竟之志化作可执行的规约。母亲、外婆与舅舅的身份各有归处。"
      },
      "ending_enlighten_sword_seal": {
        "id": "ending_enlighten_sword_seal",
        "title": "剑冢 · 此生不出",
        "sourceId": "ending_enlighten_sword_seal",
        "source": {
          "task": "enlighten-sword-seal",
          "on": "claimed"
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sourceRefs": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 391,
            "node": "ending_enlighten_sword_seal"
          }
        ],
        "summary": "你交代了未解的卷宗，封剑闭门。此后没有人替你把未曾问完的真相写成胜诉。"
      },
      "ending_enlighten_grand": {
        "id": "ending_enlighten_grand",
        "title": "大道同天",
        "sourceId": "ending_enlighten_grand",
        "source": {
          "task": "enlighten-open-common-heaven",
          "on": "claimed"
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sourceRefs": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 261,
            "node": "ending_enlighten_grand"
          }
        ],
        "summary": "你与三十位自愿同路人完成分工护持，开同天界，使不同出身的人可以自行求道。"
      },
      "ending_jindan_sword_sage": {
        "id": "ending_jindan_sword_sage",
        "title": "剑仙 · 独守蜀山",
        "sourceId": "ending_jindan_sword_sage",
        "source": {
          "task": "enlighten-sword-guard",
          "on": "claimed"
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sourceRefs": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 369,
            "node": "ending_jindan_sword_sage"
          }
        ],
        "summary": "你没有飞升，也没有把已达境界降回金丹。独守的岁月中，守山、救灾与为后来人留路成为自己的选择。"
      },
      "ending_mortal_family": {
        "id": "ending_mortal_family",
        "title": "烟火人间",
        "sourceId": "ending_mortal_family",
        "source": {
          "task": "mortal-home-farewell",
          "on": "claimed"
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sourceRefs": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 147,
            "node": "ending_mortal_family"
          }
        ],
        "summary": "你与阿杏在明确承诺下走完烟火一生，把医塾交给自愿接班者。是否婚礼、生育或收养只按真实决定回顾，不自动补写。"
      },
      "ending_mortal_teacher": {
        "id": "ending_mortal_teacher",
        "title": "桃李天下",
        "sourceId": "ending_mortal_teacher",
        "source": {
          "task": "mortal-teacher-legacy",
          "on": "claimed"
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sourceRefs": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 164,
            "node": "ending_mortal_teacher"
          }
        ],
        "summary": "学生接过了课堂与医塾。你留下的不是修为，而是他们能够独立使用的知识；关系与家庭不被强行安排。"
      },
      "ending_mortal_doctor_return": {
        "id": "ending_mortal_doctor_return",
        "title": "人间医仙 · 杏花春雨",
        "sourceId": "ending_mortal_doctor_return",
        "source": {
          "task": "mortal-clinic-legacy",
          "on": "claimed"
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sourceRefs": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 407,
            "node": "ending_mortal_doctor_return"
          }
        ],
        "summary": "你们救下疫中的村民，重建医塾并把杏春堂交给下一代医者。朋友与道侣各有真实称谓，不把任何未选择的婚育写成事实。"
      },
      "ending_mortal_reunion_peace": {
        "id": "ending_mortal_reunion_peace",
        "title": "白首重逢",
        "sourceId": "ending_mortal_reunion_peace",
        "source": {
          "task": "mortal-flute-reunion",
          "on": "claimed"
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sourceRefs": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 312,
            "node": "ending_mortal_reunion_peace"
          }
        ],
        "summary": "旧笛吹起的是与二十二岁成年阿杏初识的记忆。真实相守与告别之后，你在临终的温暖回忆里与她重逢。"
      },
      "ending_axing_women_clinic": {
        "id": "ending_axing_women_clinic",
        "title": "杏林同心",
        "sourceId": null,
        "adapted": true,
        "source": {
          "task": "mortal-women-clinic",
          "on": "claimed"
        },
        "requires": {
          "all": [
            {
              "type": "gender",
              "id": "female"
            },
            {
              "type": "partner",
              "id": "axing"
            },
            {
              "type": "body",
              "id": "mortal"
            }
          ],
          "any": []
        },
        "sourceRefs": [
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 108,
            "node": "female_common_axing_jinlan"
          },
          {
            "file": "src/lib/story/branch_mortal.ts",
            "line": 123,
            "node": "female_common_jinlan_clinic"
          }
        ],
        "summary": "两位成年女医者在明确、自愿的唯一承诺下共同经营医塾，也各自出诊与讲学。传承册留下两个人的姓名；不默认婚育。本结局为本版明确新增。"
      },
      "ending_forbidden_loop": {
        "id": "ending_forbidden_loop",
        "title": "轮回再启",
        "sourceId": "ending_forbidden_loop",
        "source": {
          "task": "loop-break-wheel",
          "on": "claimed"
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sourceRefs": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 277,
            "node": "ending_forbidden_loop"
          }
        ],
        "summary": "你打破碾磨后亲见灾变与重组，意识再回雨夜。此程记录封存为终局；另开行程须由你明确决定，不会悄悄抹去当前收藏和历史。",
        "canStartSeparateJourney": true
      },
      "ending_loop_guardian": {
        "id": "ending_loop_guardian",
        "title": "轮回守门人",
        "sourceId": "ending_loop_guardian",
        "source": {
          "task": "loop-guardian-service",
          "on": "claimed"
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sourceRefs": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 294,
            "node": "ending_loop_guardian"
          }
        ],
        "summary": "你与凝霜经各自明确同意，共担守门之责，留下护名灯火。共同守护不是自动婚契；回顾只承认今生真实关系。",
        "canStartSeparateJourney": true
      },
      "ending_loop_samsara_king": {
        "id": "ending_loop_samsara_king",
        "title": "轮回之主 · 不生不灭",
        "sourceId": "ending_loop_samsara_king",
        "source": {
          "task": "loop-incorporate-time",
          "on": "claimed"
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sourceRefs": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 431,
            "node": "ending_loop_samsara_king"
          }
        ],
        "summary": "你成为轮回中的护名之处，也失去了作为个人回到人间的可能。凝霜如何同行出于她自己的明确意愿，不覆盖任何先前关系。",
        "canStartSeparateJourney": true
      },
      "ending_dao_samsara": {
        "id": "ending_dao_samsara",
        "title": "铺路五千年",
        "sourceId": "ending_dao_samsara",
        "source": {
          "task": "loop-five-thousand-road",
          "on": "claimed"
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sourceRefs": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 557,
            "node": "ending_dao_samsara"
          }
        ],
        "summary": "三种传承留下了实物用途：青阳教识字辨药、北境教过冬救护、两界记和平的来由。五千年的铺路最终交给后来人；凝霜在轮回深处沉睡。",
        "canStartSeparateJourney": true
      },
      "ending_death": {
        "id": "ending_death",
        "title": "气竭而亡",
        "sourceId": "ending_death",
        "source": {
          "task": "admission-overdraw",
          "on": "claimed",
          "choice": "force"
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sourceRefs": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 103,
            "node": "ending_death"
          }
        ],
        "summary": "你在气脉尚未稳定时，明知危险仍强行引灵。此生结束，先前恢复点与独立旅程记录保留。"
      },
      "ending_demon": {
        "id": "ending_demon",
        "title": "堕入魔途",
        "sourceId": "ending_demon",
        "source": {
          "task": "forbidden-remnant",
          "on": "claimed",
          "choice": "force"
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sourceRefs": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 77,
            "node": "ending_demon"
          }
        ],
        "summary": "你接受了残魂许诺，主动吞下未能驾驭的力量，失去了原来求道的方向。此终局与完整魔域治理长线分别记录。"
      },
      "ending_huashen_last_stand": {
        "id": "ending_huashen_last_stand",
        "title": "尸山血海",
        "sourceId": "ending_huashen_last_stand",
        "source": {
          "task": "huashen-desperate-defense",
          "on": "claimed"
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sourceRefs": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 578,
            "node": "ending_huashen_last_stand"
          }
        ],
        "summary": "你未等联军练成、未先突破合体，便承担了守山的最后防线。撤伤、分粮与阻敌均已完成；最终自愿留下，蜀山记住了这次死守。"
      },
      "ending_f_solitary_sword": {
        "id": "ending_f_solitary_sword",
        "title": "独剑镇蜀山",
        "sourceId": "ending_f_solitary_sword",
        "source": {
          "task": "female-solitary-legacy",
          "on": "claimed"
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sourceRefs": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 457,
            "node": "ending_f_solitary_sword"
          }
        ],
        "summary": "你接下真正交托的印信，保留灵薇自己的西行与求道，也把剑坪向后来人开放。独守出于本人选择，不替她编造死亡或婚配。"
      },
      "ending_f_mountain_oath": {
        "id": "ending_f_mountain_oath",
        "title": "与君共守",
        "sourceId": "ending_f_mountain_oath",
        "source": {
          "task": "female-mountain-watch",
          "on": "claimed"
        },
        "requires": {
          "all": [],
          "any": []
        },
        "sourceRefs": [
          {
            "file": "src/lib/story/endings.ts",
            "line": 467,
            "node": "ending_f_mountain_oath"
          }
        ],
        "summary": "你与凌云在明确道侣承诺下共同守山。谁施法、谁教书与照护都依据真实能力，旧伤与废功不会被结局抹去。"
      }
    }
  },
  "fields": {
    "revision": 4,
    "meta": {
      "draft": false,
      "stage": "M5 branches under verification",
      "date": "2026-11-13",
      "scope": "五长线与32终局声明已接入，完整流程、画面与平衡仍在验收。",
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
        },
        "m5WanderCore": [
          "accept-journey-departure",
          "read-journey-record",
          "depart-wander",
          "claim-journey-departure",
          "retreat-charity",
          "accept-wander-charity",
          "charity-read-case",
          "charity-gather-west",
          "charity-gather-east",
          "charity-draw-water",
          "charity-sort",
          "charity-wash",
          "charity-apply",
          "charity-care-hongye",
          "claim-wander-charity",
          "charity-stockade",
          "accept-wander-black-order",
          "black-read-patrol",
          "black-copy-ledger",
          "black-route-quiet",
          "black-quiet-fight",
          "black-take-order",
          "black-captive-testimony",
          "claim-wander-black-order",
          "stockade-charity",
          "charity-border",
          "accept-wander-border-service",
          "border-receive-kits",
          "border-priority-medical",
          "border-deliver-medical",
          "border-hold-west",
          "border-relay-order",
          "claim-wander-border-service",
          "accept-wander-prison-evidence",
          "marshal-check-army-seal",
          "border-charity",
          "marshal-village-signatures",
          "charity-stockade",
          "marshal-open-cell",
          "marshal-cover-exit",
          "stockade-charity",
          "charity-border",
          "marshal-take-testimony",
          "claim-wander-prison-evidence",
          "border-ice",
          "accept-wander-icefield-survey",
          "ice-survey-notes",
          "ice-take-south",
          "ice-take-east",
          "ice-take-north",
          "ice-rescue-miner",
          "ice-fit-fragments",
          "claim-wander-icefield-survey",
          "ice-border",
          "border-charity",
          "accept-wander-road-years",
          "roads-load-parcels",
          "roads-clinic-year",
          "charity-border",
          "roads-border-years",
          "border-ice",
          "roads-ice-years",
          "ice-border",
          "border-charity",
          "claim-wander-road-years"
        ],
        "m5WanderEndings": {
          "alone": [
            "accept-wander-road-choice",
            "wander-decide-alone",
            "claim-wander-road-choice",
            "accept-wander-independent-farewell",
            "charity-border",
            "border-ice",
            "alone-mark-ice-path",
            "ice-border",
            "border-charity",
            "alone-close-commissions",
            "claim-wander-independent-farewell"
          ],
          "legend": [
            "accept-wander-road-choice",
            "wander-decide-legend",
            "claim-wander-road-choice",
            "accept-wander-legend-handoff",
            "legend-official-dossier",
            "charity-retreat",
            "legend-return-order-copy",
            "retreat-charity",
            "legend-ning-response",
            "charity-border",
            "legend-cover-last-caravan",
            "border-charity",
            "claim-wander-legend-handoff"
          ],
          "reunion": [
            "accept-wander-road-choice",
            "wander-decide-reunion",
            "claim-wander-road-choice",
            "charity-border",
            "accept-wander-return-trial",
            "reunion-capture-officer",
            "reunion-officer-testimony",
            "border-charity",
            "charity-retreat",
            "reunion-present-five-proofs",
            "retreat-wander-trial",
            "reunion-public-defense",
            "reunion-accept-protection-duty",
            "claim-wander-return-trial"
          ],
          "blacklord": [
            "accept-wander-road-choice",
            "wander-decide-blacklord",
            "claim-wander-road-choice",
            "charity-stockade",
            "accept-wander-black-command",
            "blacklord-count-grain",
            "blacklord-stop-marauders",
            "blacklord-release-captives",
            "stockade-charity",
            "blacklord-old-friend-farewell",
            "charity-border",
            "blacklord-oath-command",
            "claim-wander-black-command"
          ],
          "medical": [
            "accept-wander-road-choice",
            "wander-decide-medical",
            "claim-wander-road-choice",
            "accept-wander-medical-legacy",
            "medical-sample-clinic",
            "charity-border",
            "medical-sample-border",
            "border-ice",
            "medical-sample-ice",
            "ice-border",
            "border-charity",
            "medical-compile-remedy",
            "medical-deliver-clinic",
            "charity-border",
            "medical-deliver-border",
            "border-ice",
            "medical-deliver-ice",
            "ice-border",
            "border-charity",
            "medical-forge-tool",
            "charity-border",
            "border-ice",
            "medical-snow-ward",
            "ice-border",
            "border-charity",
            "medical-pass-casebook",
            "claim-wander-medical-legacy"
          ],
          "laststand": [
            "accept-wander-road-choice",
            "wander-decide-laststand",
            "claim-wander-road-choice",
            "charity-border",
            "accept-wander-last-stand",
            "laststand-send-testimony",
            "laststand-mark-retreat",
            "laststand-hold-gate",
            "claim-wander-last-stand"
          ]
        },
        "m5Relationships": {
          "shen": [
            "accept-relation-shen-case",
            "shen-hear-case-goal",
            "shen-seal-petition",
            "shen-cover-petition",
            "shen-respect-duty",
            "claim-relation-shen-case",
            "accept-relation-shen-vow",
            "listen-shen-intent",
            "friend-shen",
            "claim-relation-shen-vow"
          ],
          "ning": [
            "accept-relation-ning-soul",
            "ning-hear-own-goal",
            "charity-border",
            "border-ice",
            "ning-check-ice-names",
            "ice-border",
            "border-charity",
            "ning-check-road-witness",
            "charity-border",
            "border-ice",
            "ning-light-soul-lamp",
            "ice-border",
            "border-charity",
            "claim-relation-ning-soul",
            "accept-relation-ning-vow",
            "listen-ning-intent",
            "friend-ning",
            "claim-relation-ning-vow"
          ],
          "axing": [
            "accept-relation-axing-clinic",
            "axing-hear-clinic-goal",
            "axing-compile-own-case",
            "axing-write-teaching-page",
            "axing-agree-independent-work",
            "claim-relation-axing-clinic",
            "accept-relation-axing-vow",
            "listen-axing-intent",
            "friend-axing",
            "claim-relation-axing-vow"
          ],
          "lingyun": [
            "accept-relation-lingyun-oath",
            "lingyun-hear-school-goal",
            "lingyun-repair-old-case",
            "lingyun-receive-ruler",
            "lingyun-compare-two-jades",
            "claim-relation-lingyun-oath",
            "accept-relation-lingyun-vow",
            "listen-lingyun-intent",
            "friend-lingyun",
            "claim-relation-lingyun-vow"
          ]
        },
        "m5RelationshipPlans": {
          "shen": {
            "startMap": "jindan-retreat",
            "fromCoreMap": "qingyang-charity",
            "travelFromCore": [
              "charity-retreat"
            ],
            "requires": {
              "all": [
                {
                  "type": "task",
                  "id": "jindan-crossroads",
                  "status": "claimed"
                }
              ],
              "any": []
            },
            "steps": [
              "accept-relation-shen-case",
              "shen-hear-case-goal",
              "shen-seal-petition",
              "shen-cover-petition",
              "shen-respect-duty",
              "claim-relation-shen-case",
              "accept-relation-shen-vow",
              "listen-shen-intent",
              "friend-shen",
              "claim-relation-shen-vow"
            ],
            "choiceAction": {
              "friend": "friend-shen",
              "vow": "vow-shen",
              "decline": "decline-shen"
            },
            "optionalPreparation": null
          },
          "ning": {
            "startMap": "qingyang-charity",
            "fromCoreMap": "qingyang-charity",
            "travelFromCore": [],
            "requires": {
              "all": [
                {
                  "type": "task",
                  "id": "wander-icefield-survey",
                  "status": "claimed"
                },
                {
                  "type": "legacyToken",
                  "id": "foxHairpin"
                }
              ],
              "any": []
            },
            "steps": [
              "accept-relation-ning-soul",
              "ning-hear-own-goal",
              "charity-border",
              "border-ice",
              "ning-check-ice-names",
              "ice-border",
              "border-charity",
              "ning-check-road-witness",
              "charity-border",
              "border-ice",
              "ning-light-soul-lamp",
              "ice-border",
              "border-charity",
              "claim-relation-ning-soul",
              "accept-relation-ning-vow",
              "listen-ning-intent",
              "friend-ning",
              "claim-relation-ning-vow"
            ],
            "choiceAction": {
              "friend": "friend-ning",
              "vow": "vow-ning",
              "decline": "decline-ning"
            },
            "optionalPreparation": null
          },
          "axing": {
            "startMap": "apricot-village",
            "fromCoreMap": "qingyang-charity",
            "travelFromCore": [
              "charity-retreat",
              "retreat-return",
              "enter-apricot"
            ],
            "requires": {
              "all": [
                {
                  "type": "task",
                  "id": "apricot-aid",
                  "status": "claimed"
                },
                {
                  "type": "task",
                  "id": "jindan-crossroads",
                  "status": "claimed"
                }
              ],
              "any": []
            },
            "steps": [
              "accept-relation-axing-clinic",
              "axing-hear-clinic-goal",
              "axing-compile-own-case",
              "axing-write-teaching-page",
              "axing-agree-independent-work",
              "claim-relation-axing-clinic",
              "accept-relation-axing-vow",
              "listen-axing-intent",
              "friend-axing",
              "claim-relation-axing-vow"
            ],
            "choiceAction": {
              "friend": "friend-axing",
              "vow": "vow-axing",
              "decline": "decline-axing"
            },
            "optionalPreparation": {
              "task": "apricot-aid",
              "steps": [
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
                "claim-apricot-aid"
              ]
            }
          },
          "lingyun": {
            "startMap": "jindan-retreat",
            "fromCoreMap": "qingyang-charity",
            "travelFromCore": [
              "charity-retreat"
            ],
            "requires": {
              "all": [
                {
                  "type": "task",
                  "id": "jindan-crossroads",
                  "status": "claimed"
                }
              ],
              "any": []
            },
            "steps": [
              "accept-relation-lingyun-oath",
              "lingyun-hear-school-goal",
              "lingyun-repair-old-case",
              "lingyun-receive-ruler",
              "lingyun-compare-two-jades",
              "claim-relation-lingyun-oath",
              "accept-relation-lingyun-vow",
              "listen-lingyun-intent",
              "friend-lingyun",
              "claim-relation-lingyun-vow"
            ],
            "choiceAction": {
              "friend": "friend-lingyun",
              "vow": "vow-lingyun",
              "decline": "decline-lingyun"
            },
            "optionalPreparation": null
          }
        },
        "m5Plans": {
          "demon": {
            "startMap": "jindan-retreat",
            "steps": [
              "accept-journey-departure",
              "read-journey-record",
              "depart-demon",
              "claim-journey-departure",
              "accept-demon-entry",
              "demon-entry-check-blood",
              "demon-entry-leave-record",
              "claim-demon-entry",
              "accept-demon-blood-preparation",
              "demon-blood-preparation-receive",
              "demon-blood-preparation-clamp",
              "demon-blood-preparation-release",
              "demon-blood-preparation-record",
              "claim-demon-blood-preparation",
              "accept-demon-yuanying-trial",
              "demon-yuanying-trial-first",
              "demon-yuanying-trial-second",
              "claim-demon-yuanying-trial",
              "accept-demon-tribal-work",
              "demon-tribal-work-receive",
              "demon-tribal-work-canal-west",
              "demon-tribal-work-canal-east",
              "demon-tribal-work-grain",
              "demon-tribal-work-cure",
              "demon-tribal-work-forge",
              "demon-tribal-work-school",
              "claim-demon-tribal-work",
              "accept-demon-rebellion",
              "demon-rebellion-negotiate",
              "demon-rebel-negotiate",
              "demon-rebel-register",
              "claim-demon-rebellion",
              "accept-demon-huashen-trial",
              "demon-huashen-trial-first",
              "demon-huashen-trial-second",
              "claim-demon-huashen-trial",
              "accept-demon-mother-legacy",
              "demon-mother-legacy-hear",
              "demon-mother-legacy-verify",
              "demon-mother-legacy-receive",
              "claim-demon-mother-legacy",
              "accept-demon-coup",
              "demon-coup-evacuate",
              "demon-coup-siege",
              "demon-coup-break-control",
              "demon-coup-uncle-farewell",
              "demon-coup-public-account",
              "claim-demon-coup",
              "accept-demon-heti-trial",
              "demon-heti-trial-first",
              "demon-heti-trial-second",
              "claim-demon-heti-trial",
              "accept-demon-treaty",
              "demon-treaty-receive",
              "demon-treaty-south-bridge",
              "demon-treaty-north-bridge",
              "demon-treaty-victims",
              "demon-treaty-school",
              "demon-treaty-sign",
              "claim-demon-treaty",
              "accept-demon-century",
              "demon-century-ten-care",
              "demon-century-twenty-farewell",
              "demon-century-fifty-assassin",
              "demon-century-hundred-handoff",
              "claim-demon-century",
              "accept-demon-dacheng-trial",
              "demon-dacheng-trial-first",
              "demon-dacheng-trial-second",
              "claim-demon-dacheng-trial"
            ],
            "finalChoices": {
              "lord": [
                "accept-demon-future-choice",
                "demon-future-lord",
                "claim-demon-future-choice",
                "accept-demon-lord-settlement",
                "demon-lord-settlement-prisoners",
                "demon-lord-settlement-order",
                "demon-lord-settlement-trade",
                "claim-demon-lord-settlement"
              ],
              "dark": [
                "accept-demon-future-choice",
                "demon-future-dark",
                "claim-demon-future-choice",
                "accept-demon-dark-conquest",
                "demon-dark-conquest-break-treaty",
                "demon-dark-conquest-old-friend",
                "demon-dark-conquest-lost-friend",
                "demon-dark-conquest-command",
                "claim-demon-dark-conquest"
              ],
              "redeem": [
                "accept-demon-future-choice",
                "demon-future-redeem",
                "claim-demon-future-choice",
                "accept-demon-redemption-handoff",
                "demon-redemption-handoff-military",
                "demon-redemption-handoff-victims",
                "demon-redemption-handoff-relinquish",
                "demon-redemption-enter-tower",
                "claim-demon-redemption-handoff"
              ],
              "hermit": [
                "accept-demon-future-choice",
                "demon-future-hermit",
                "claim-demon-future-choice",
                "accept-demon-hermit-care",
                "demon-hermit-care-successor",
                "demon-hermit-care-gather",
                "demon-hermit-care-roof",
                "demon-hermit-care-window",
                "demon-hermit-care-answer",
                "claim-demon-hermit-care"
              ],
              "reform": [
                "accept-demon-future-choice",
                "demon-future-reform",
                "claim-demon-future-choice",
                "accept-demon-apricot-reform",
                "demon-apricot-reform-stop-sacrifice",
                "demon-apricot-reform-school",
                "demon-apricot-reform-market",
                "demon-apricot-reform-vow",
                "claim-demon-apricot-reform"
              ]
            }
          },
          "enlighten": {
            "startMap": "jindan-retreat",
            "steps": [
              "accept-journey-departure",
              "read-journey-record",
              "depart-enlighten",
              "claim-journey-departure",
              "accept-enlighten-entry",
              "enlighten-entry-plan",
              "enlighten-entry-protection",
              "claim-enlighten-entry",
              "accept-enlighten-yuanying-trial",
              "enlighten-yuanying-trial-first",
              "enlighten-yuanying-trial-second",
              "claim-enlighten-yuanying-trial",
              "accept-enlighten-three-witnesses",
              "enlighten-three-witnesses-receive",
              "enlighten-three-witnesses-zhou",
              "enlighten-three-witnesses-ashi",
              "enlighten-three-witnesses-chen",
              "claim-enlighten-three-witnesses",
              "accept-enlighten-compiled-case",
              "enlighten-compiled-case-original",
              "enlighten-compiled-case-erased",
              "enlighten-compiled-case-consent",
              "enlighten-compiled-case-verify",
              "enlighten-compiled-case-guard",
              "claim-enlighten-compiled-case",
              "accept-enlighten-case-direction",
              "enlighten-continue-case",
              "claim-enlighten-case-direction",
              "accept-enlighten-public-trial",
              "enlighten-public-trial-witnesses",
              "enlighten-public-trial-present",
              "enlighten-public-trial-battle",
              "enlighten-public-trial-record",
              "claim-enlighten-public-trial",
              "accept-enlighten-huashen-trial",
              "enlighten-huashen-trial-first",
              "enlighten-huashen-trial-second",
              "claim-enlighten-huashen-trial",
              "accept-enlighten-master-trial",
              "enlighten-master-trial-letter",
              "enlighten-master-trial-testimony",
              "enlighten-master-trial-penance",
              "claim-enlighten-master-trial",
              "accept-enlighten-treaty",
              "enlighten-treaty-receive",
              "enlighten-treaty-south",
              "enlighten-treaty-five-trade",
              "enlighten-treaty-ten-rebellion",
              "enlighten-treaty-twenty-school",
              "enlighten-treaty-thirty-sign",
              "claim-enlighten-treaty",
              "accept-enlighten-personal-farewell",
              "enlighten-personal-farewell-shen-wish",
              "enlighten-personal-farewell-shen-farewell",
              "enlighten-personal-farewell-qingwei-farewell",
              "enlighten-personal-farewell-successors",
              "claim-enlighten-personal-farewell",
              "accept-enlighten-heti-trial",
              "enlighten-heti-trial-first",
              "enlighten-heti-trial-second",
              "claim-enlighten-heti-trial",
              "accept-enlighten-thirty-one",
              "enlighten-thirty-one-names",
              "enlighten-thirty-one-roles",
              "enlighten-thirty-one-exercise",
              "enlighten-thirty-one-check",
              "claim-enlighten-thirty-one",
              "accept-enlighten-dacheng-trial",
              "enlighten-dacheng-trial-first",
              "enlighten-dacheng-trial-second",
              "claim-enlighten-dacheng-trial"
            ],
            "finalChoices": {
              "grand": [
                "accept-enlighten-final-vow",
                "enlighten-choose-grand",
                "claim-enlighten-final-vow",
                "accept-enlighten-open-common-heaven",
                "enlighten-open-common-heaven-anchor",
                "enlighten-open-common-heaven-care",
                "enlighten-open-common-heaven-road",
                "enlighten-open-common-heaven-consent",
                "claim-enlighten-open-common-heaven"
              ],
              "guard": [
                "accept-enlighten-final-vow",
                "enlighten-choose-guard",
                "claim-enlighten-final-vow",
                "accept-enlighten-sword-guard",
                "enlighten-sword-guard-invasion",
                "enlighten-sword-guard-disaster",
                "enlighten-sword-guard-successor",
                "claim-enlighten-sword-guard"
              ]
            },
            "earlyChoice": {
              "from": "accept-enlighten-case-direction",
              "steps": [
                "accept-enlighten-case-direction",
                "enlighten-seal-case",
                "claim-enlighten-case-direction",
                "accept-enlighten-sword-seal",
                "enlighten-sword-seal-dossier",
                "enlighten-sword-seal-sword",
                "enlighten-sword-seal-gate",
                "claim-enlighten-sword-seal"
              ]
            }
          },
          "mortal": {
            "startMap": "jindan-retreat",
            "steps": [
              "accept-mortal-renunciation",
              "mortal-list-responsibilities",
              "mortal-store-implements",
              "mortal-confirm-renounce",
              "claim-mortal-renunciation",
              "accept-mortal-livelihood",
              "mortal-livelihood-work",
              "mortal-livelihood-seeds",
              "mortal-livelihood-roof",
              "mortal-livelihood-desk",
              "mortal-livelihood-plant",
              "mortal-livelihood-book",
              "claim-mortal-livelihood",
              "accept-mortal-clinic-school",
              "mortal-clinic-school-divide",
              "mortal-clinic-school-literacy",
              "mortal-clinic-school-medicine",
              "mortal-clinic-school-register",
              "claim-mortal-clinic-school",
              "accept-mortal-plague",
              "mortal-plague-clinic-sample",
              "mortal-plague-village-sample",
              "mortal-plague-road-sample",
              "mortal-plague-mix",
              "mortal-plague-axing",
              "mortal-plague-village",
              "mortal-plague-shelter",
              "claim-mortal-plague",
              "accept-mortal-flood",
              "mortal-flood-check",
              "mortal-flood-people",
              "mortal-flood-priority-people",
              "mortal-flood-followup-people",
              "claim-mortal-flood",
              "accept-mortal-rebuild",
              "mortal-rebuild-seed",
              "mortal-rebuild-books",
              "mortal-rebuild-reopen",
              "claim-mortal-rebuild",
              "accept-mortal-life-years",
              "mortal-years-early",
              "mortal-years-early-1",
              "mortal-years-early-2",
              "mortal-years-early-3",
              "claim-mortal-life-years"
            ],
            "finalChoices": {
              "home": [
                "accept-mortal-final-choice",
                "mortal-final-home",
                "claim-mortal-final-choice",
                "accept-mortal-home-farewell",
                "mortal-home-farewell-care",
                "mortal-home-farewell-goodbye",
                "mortal-home-farewell-inherit",
                "claim-mortal-home-farewell"
              ],
              "teacher": [
                "accept-mortal-final-choice",
                "mortal-final-teacher",
                "claim-mortal-final-choice",
                "accept-mortal-teacher-legacy",
                "mortal-teacher-legacy-lesson",
                "mortal-teacher-legacy-student",
                "mortal-teacher-legacy-name",
                "claim-mortal-teacher-legacy"
              ],
              "clinic": [
                "accept-mortal-final-choice",
                "mortal-final-clinic",
                "claim-mortal-final-choice",
                "accept-mortal-clinic-legacy",
                "mortal-clinic-legacy-cases",
                "mortal-clinic-legacy-fees",
                "mortal-clinic-legacy-handoff",
                "claim-mortal-clinic-legacy"
              ],
              "reunion": [
                "accept-mortal-final-choice",
                "mortal-final-reunion",
                "claim-mortal-final-choice",
                "accept-mortal-flute-reunion",
                "mortal-flute-reunion-care",
                "mortal-flute-reunion-goodbye",
                "mortal-flute-reunion-repair",
                "claim-mortal-flute-reunion"
              ],
              "women": [
                "accept-mortal-final-choice",
                "mortal-final-women",
                "claim-mortal-final-choice",
                "accept-mortal-women-clinic",
                "mortal-women-clinic-own-goals",
                "mortal-women-clinic-shared-class",
                "mortal-women-clinic-sign",
                "mortal-women-clinic-promise",
                "claim-mortal-women-clinic"
              ]
            }
          },
          "loop": {
            "startMap": "qingyang-charity",
            "requires": [
              {
                "type": "task",
                "id": "wander-road-years",
                "status": "claimed"
              }
            ],
            "steps": [
              "accept-wander-road-choice",
              "wander-decide-loop",
              "claim-wander-road-choice",
              "accept-loop-investigation",
              "loop-investigation-south",
              "loop-investigation-east",
              "loop-investigation-north",
              "loop-investigation-hairpin",
              "claim-loop-investigation",
              "accept-loop-awakening",
              "loop-awakening-identity",
              "loop-awakening-boundaries",
              "loop-awakening-door",
              "claim-loop-awakening",
              "accept-loop-life-general",
              "loop-life-general-open",
              "hall-loop-life-general",
              "loop-life-general-read",
              "loop-life-general-evacuate",
              "loop-life-general-hold",
              "loop-life-general-leave",
              "loop-life-general-hall",
              "claim-loop-life-general",
              "accept-loop-life-healer",
              "loop-life-healer-open",
              "hall-loop-life-healer",
              "loop-life-healer-prepare",
              "loop-life-healer-stranger",
              "loop-life-healer-village",
              "loop-life-healer-farewell",
              "loop-life-healer-hall",
              "claim-loop-life-healer",
              "accept-loop-life-ruler",
              "loop-life-ruler-open",
              "hall-loop-life-ruler",
              "loop-life-ruler-read",
              "loop-life-ruler-protect",
              "loop-life-ruler-trade",
              "loop-life-ruler-defend",
              "loop-life-ruler-truth",
              "loop-life-ruler-hall",
              "claim-loop-life-ruler",
              "accept-loop-memory-review",
              "loop-memory-review-general",
              "loop-memory-review-healer",
              "loop-memory-review-ruler",
              "loop-memory-review-others",
              "claim-loop-memory-review",
              "accept-loop-mill-investigation",
              "loop-mill-investigation-names",
              "loop-mill-investigation-west",
              "loop-mill-investigation-guard",
              "loop-mill-investigation-east",
              "loop-mill-investigation-dock",
              "claim-loop-mill-investigation"
            ],
            "finalChoices": {
              "break": [
                "accept-loop-path-choice",
                "loop-choose-break",
                "claim-loop-path-choice",
                "accept-loop-break-wheel",
                "loop-break-wheel-evacuate",
                "loop-break-wheel-ning-consent",
                "loop-break-wheel-break",
                "loop-break-wheel-aftermath",
                "loop-break-wheel-return",
                "claim-loop-break-wheel"
              ],
              "guardian": [
                "accept-loop-path-choice",
                "loop-choose-guardian",
                "claim-loop-path-choice",
                "accept-loop-guardian-service",
                "loop-guardian-service-self",
                "loop-guardian-service-ning",
                "loop-guardian-service-lamp",
                "loop-guardian-service-handoff",
                "claim-loop-guardian-service"
              ],
              "king": [
                "accept-loop-path-choice",
                "loop-choose-king",
                "claim-loop-path-choice",
                "accept-loop-incorporate-time",
                "loop-incorporate-time-names",
                "loop-incorporate-time-consent",
                "loop-incorporate-time-axis",
                "loop-incorporate-time-warmth",
                "claim-loop-incorporate-time"
              ],
              "road": [
                "accept-loop-path-choice",
                "loop-choose-road",
                "claim-loop-path-choice",
                "accept-loop-five-thousand-road",
                "loop-five-thousand-road-promise",
                "loop-five-thousand-road-school",
                "loop-five-thousand-road-winter",
                "loop-five-thousand-road-peace",
                "loop-five-thousand-road-last",
                "claim-loop-five-thousand-road"
              ]
            },
            "fromDemon": [
              "accept-demon-future-choice",
              "demon-future-guardian",
              "claim-demon-future-choice",
              "accept-loop-investigation",
              "loop-investigation-south",
              "loop-investigation-east",
              "loop-investigation-north",
              "loop-investigation-hairpin",
              "claim-loop-investigation",
              "accept-loop-awakening",
              "loop-awakening-identity",
              "loop-awakening-boundaries",
              "loop-awakening-door",
              "claim-loop-awakening",
              "accept-loop-life-general",
              "loop-life-general-open",
              "hall-loop-life-general",
              "loop-life-general-read",
              "loop-life-general-evacuate",
              "loop-life-general-hold",
              "loop-life-general-leave",
              "loop-life-general-hall",
              "claim-loop-life-general",
              "accept-loop-life-healer",
              "loop-life-healer-open",
              "hall-loop-life-healer",
              "loop-life-healer-prepare",
              "loop-life-healer-stranger",
              "loop-life-healer-village",
              "loop-life-healer-farewell",
              "loop-life-healer-hall",
              "claim-loop-life-healer",
              "accept-loop-life-ruler",
              "loop-life-ruler-open",
              "hall-loop-life-ruler",
              "loop-life-ruler-read",
              "loop-life-ruler-protect",
              "loop-life-ruler-trade",
              "loop-life-ruler-defend",
              "loop-life-ruler-truth",
              "loop-life-ruler-hall",
              "claim-loop-life-ruler",
              "accept-loop-memory-review",
              "loop-memory-review-general",
              "loop-memory-review-healer",
              "loop-memory-review-ruler",
              "loop-memory-review-others",
              "claim-loop-memory-review",
              "accept-loop-mill-investigation",
              "loop-mill-investigation-names",
              "loop-mill-investigation-west",
              "loop-mill-investigation-guard",
              "loop-mill-investigation-east",
              "loop-mill-investigation-dock",
              "claim-loop-mill-investigation"
            ]
          },
          "femaleSword": {
            "startMap": "heaven-threshold",
            "requires": [
              {
                "type": "task",
                "id": "dacheng-breakthrough",
                "status": "claimed"
              },
              {
                "type": "gender",
                "id": "female"
              }
            ],
            "steps": [
              "accept-female-sword-mandate",
              "female-sword-mandate-lesson",
              "female-sword-mandate-practice",
              "female-sword-mandate-shen-wish",
              "female-sword-mandate-jade",
              "claim-female-sword-mandate"
            ],
            "finalChoices": {
              "alone": [
                "accept-female-sword-choice",
                "female-sword-alone",
                "claim-female-sword-choice",
                "accept-female-solitary-legacy",
                "female-solitary-legacy-farewell",
                "female-solitary-legacy-charter",
                "female-solitary-legacy-watch",
                "claim-female-solitary-legacy"
              ],
              "together": [
                "accept-female-sword-choice",
                "female-sword-together",
                "claim-female-sword-choice",
                "accept-female-mountain-watch",
                "female-mountain-watch-keepsakes",
                "female-mountain-watch-roles",
                "female-mountain-watch-watch",
                "female-mountain-watch-promise",
                "claim-female-mountain-watch"
              ]
            }
          },
          "admission": {
            "startMap": "garden",
            "steps": [
              "accept-admission-overdraw",
              "admission-force",
              "claim-admission-overdraw"
            ],
            "safe": [
              "accept-admission-overdraw",
              "admission-leave",
              "claim-admission-overdraw"
            ]
          },
          "remnant": {
            "startMap": "jindan-retreat",
            "steps": [
              "accept-forbidden-remnant",
              "remnant-check-traces",
              "remnant-read-price",
              "remnant-force",
              "claim-forbidden-remnant"
            ],
            "safe": [
              "accept-forbidden-remnant",
              "remnant-check-traces",
              "remnant-read-price",
              "remnant-refuse",
              "claim-forbidden-remnant"
            ]
          },
          "huashenLastStand": {
            "startMap": "alliance-camp",
            "requires": [
              {
                "type": "task",
                "id": "alliance-muster",
                "status": "claimed"
              }
            ],
            "steps": [
              "accept-huashen-desperate-defense",
              "last-stand-commit",
              "last-stand-allocate",
              "last-stand-evacuate",
              "last-stand-rations",
              "last-stand-hold-line",
              "claim-huashen-desperate-defense"
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
      },
      "baselineSource": {
        "path": "src/campaign-schema-v3.js",
        "commit": "94015e8",
        "sha256": "b5221d76dfce24adeae0ef0f9630d9876f814a6fb9c719bd3386225925cae531",
        "status": "exact-released-M4-snapshot"
      },
      "m5SpawnCorrections": [
        {
          "action": "demon-yuanying-trial-first",
          "enemy": "demon-yuanying-trial-one",
          "from": {
            "x": 500,
            "y": 230
          },
          "to": {
            "x": 795,
            "y": 375
          },
          "reason": "实际障碍或办理点距离要求"
        },
        {
          "action": "demon-yuanying-trial-second",
          "enemy": "demon-yuanying-trial-two",
          "from": {
            "x": 810,
            "y": 250
          },
          "to": {
            "x": 795,
            "y": 375
          },
          "reason": "实际障碍或办理点距离要求"
        },
        {
          "action": "loop-mill-investigation-guard",
          "enemy": "mill-watchman",
          "from": {
            "x": 420,
            "y": 280
          },
          "to": {
            "x": 320,
            "y": 390
          },
          "reason": "实际障碍或办理点距离要求"
        },
        {
          "action": "loop-break-wheel-break",
          "enemy": "mill-final-control",
          "from": {
            "x": 790,
            "y": 330
          },
          "to": {
            "x": 640,
            "y": 485
          },
          "reason": "实际障碍或办理点距离要求"
        },
        {
          "action": "female-sword-mandate-practice",
          "enemy": "female-mandate-array",
          "from": {
            "x": 440,
            "y": 330
          },
          "to": {
            "x": 280,
            "y": 175
          },
          "reason": "实际障碍或办理点距离要求"
        },
        {
          "action": "female-mountain-watch-watch",
          "enemy": "female-common-trial",
          "from": {
            "x": 440,
            "y": 330
          },
          "to": {
            "x": 280,
            "y": 175
          },
          "reason": "实际障碍或办理点距离要求"
        }
      ],
      "branchPlans": {
        "demon": [
          "accept-demon-entry",
          "demon-entry-check-blood",
          "demon-entry-leave-record",
          "claim-demon-entry",
          "accept-demon-blood-preparation",
          "demon-blood-preparation-receive",
          "demon-blood-preparation-clamp",
          "demon-blood-preparation-release",
          "demon-blood-preparation-record",
          "claim-demon-blood-preparation",
          "accept-demon-yuanying-trial",
          "demon-yuanying-trial-first",
          "demon-yuanying-trial-second",
          "claim-demon-yuanying-trial",
          "accept-demon-tribal-work",
          "demon-tribal-work-receive",
          "demon-tribal-work-canal-west",
          "demon-tribal-work-canal-east",
          "demon-tribal-work-grain",
          "demon-tribal-work-cure",
          "demon-tribal-work-forge",
          "demon-tribal-work-school",
          "claim-demon-tribal-work",
          "accept-demon-rebellion",
          "demon-rebellion-negotiate",
          "demon-rebel-negotiate",
          "demon-rebel-register",
          "claim-demon-rebellion",
          "accept-demon-huashen-trial",
          "demon-huashen-trial-first",
          "demon-huashen-trial-second",
          "claim-demon-huashen-trial",
          "accept-demon-mother-legacy",
          "demon-mother-legacy-hear",
          "demon-mother-legacy-verify",
          "demon-mother-legacy-receive",
          "claim-demon-mother-legacy",
          "accept-demon-coup",
          "demon-coup-evacuate",
          "demon-coup-siege",
          "demon-coup-break-control",
          "demon-coup-uncle-farewell",
          "demon-coup-public-account",
          "claim-demon-coup",
          "accept-demon-heti-trial",
          "demon-heti-trial-first",
          "demon-heti-trial-second",
          "claim-demon-heti-trial",
          "accept-demon-treaty",
          "demon-treaty-receive",
          "demon-treaty-south-bridge",
          "demon-treaty-north-bridge",
          "demon-treaty-victims",
          "demon-treaty-school",
          "demon-treaty-sign",
          "claim-demon-treaty",
          "accept-demon-century",
          "demon-century-ten-care",
          "demon-century-twenty-farewell",
          "demon-century-fifty-assassin",
          "demon-century-hundred-handoff",
          "claim-demon-century",
          "accept-demon-dacheng-trial",
          "demon-dacheng-trial-first",
          "demon-dacheng-trial-second",
          "claim-demon-dacheng-trial"
        ],
        "demon-lord": [
          "accept-demon-lord-settlement",
          "demon-lord-settlement-prisoners",
          "demon-lord-settlement-order",
          "demon-lord-settlement-trade",
          "claim-demon-lord-settlement"
        ],
        "demon-dark": [
          "accept-demon-dark-conquest",
          "demon-dark-conquest-break-treaty",
          "demon-dark-conquest-old-friend",
          "demon-dark-conquest-lost-friend",
          "demon-dark-conquest-command",
          "claim-demon-dark-conquest"
        ],
        "demon-redeem": [
          "accept-demon-redemption-handoff",
          "demon-redemption-handoff-military",
          "demon-redemption-handoff-victims",
          "demon-redemption-handoff-relinquish",
          "demon-redemption-enter-tower",
          "claim-demon-redemption-handoff"
        ],
        "demon-hermit": [
          "accept-demon-hermit-care",
          "demon-hermit-care-successor",
          "demon-hermit-care-gather",
          "demon-hermit-care-roof",
          "demon-hermit-care-window",
          "demon-hermit-care-answer",
          "claim-demon-hermit-care"
        ],
        "demon-reform": [
          "accept-demon-apricot-reform",
          "demon-apricot-reform-stop-sacrifice",
          "demon-apricot-reform-school",
          "demon-apricot-reform-market",
          "demon-apricot-reform-vow",
          "claim-demon-apricot-reform"
        ],
        "enlighten": [
          "accept-enlighten-entry",
          "enlighten-entry-plan",
          "enlighten-entry-protection",
          "claim-enlighten-entry",
          "accept-enlighten-yuanying-trial",
          "enlighten-yuanying-trial-first",
          "enlighten-yuanying-trial-second",
          "claim-enlighten-yuanying-trial",
          "accept-enlighten-three-witnesses",
          "enlighten-three-witnesses-receive",
          "enlighten-three-witnesses-zhou",
          "enlighten-three-witnesses-ashi",
          "enlighten-three-witnesses-chen",
          "claim-enlighten-three-witnesses",
          "accept-enlighten-compiled-case",
          "enlighten-compiled-case-original",
          "enlighten-compiled-case-erased",
          "enlighten-compiled-case-consent",
          "enlighten-compiled-case-verify",
          "enlighten-compiled-case-guard",
          "claim-enlighten-compiled-case",
          "accept-enlighten-case-direction",
          "enlighten-continue-case",
          "claim-enlighten-case-direction",
          "accept-enlighten-public-trial",
          "enlighten-public-trial-witnesses",
          "enlighten-public-trial-present",
          "enlighten-public-trial-battle",
          "enlighten-public-trial-record",
          "claim-enlighten-public-trial",
          "accept-enlighten-huashen-trial",
          "enlighten-huashen-trial-first",
          "enlighten-huashen-trial-second",
          "claim-enlighten-huashen-trial",
          "accept-enlighten-master-trial",
          "enlighten-master-trial-letter",
          "enlighten-master-trial-testimony",
          "enlighten-master-trial-penance",
          "claim-enlighten-master-trial",
          "accept-enlighten-treaty",
          "enlighten-treaty-receive",
          "enlighten-treaty-south",
          "enlighten-treaty-five-trade",
          "enlighten-treaty-ten-rebellion",
          "enlighten-treaty-twenty-school",
          "enlighten-treaty-thirty-sign",
          "claim-enlighten-treaty",
          "accept-enlighten-personal-farewell",
          "enlighten-personal-farewell-shen-wish",
          "enlighten-personal-farewell-shen-farewell",
          "enlighten-personal-farewell-qingwei-farewell",
          "enlighten-personal-farewell-successors",
          "claim-enlighten-personal-farewell",
          "accept-enlighten-heti-trial",
          "enlighten-heti-trial-first",
          "enlighten-heti-trial-second",
          "claim-enlighten-heti-trial",
          "accept-enlighten-thirty-one",
          "enlighten-thirty-one-names",
          "enlighten-thirty-one-roles",
          "enlighten-thirty-one-exercise",
          "enlighten-thirty-one-check",
          "claim-enlighten-thirty-one",
          "accept-enlighten-dacheng-trial",
          "enlighten-dacheng-trial-first",
          "enlighten-dacheng-trial-second",
          "claim-enlighten-dacheng-trial"
        ],
        "enlighten-seal": [
          "accept-enlighten-sword-seal",
          "enlighten-sword-seal-dossier",
          "enlighten-sword-seal-sword",
          "enlighten-sword-seal-gate",
          "claim-enlighten-sword-seal"
        ],
        "enlighten-grand": [
          "accept-enlighten-open-common-heaven",
          "enlighten-open-common-heaven-anchor",
          "enlighten-open-common-heaven-care",
          "enlighten-open-common-heaven-road",
          "enlighten-open-common-heaven-consent",
          "claim-enlighten-open-common-heaven"
        ],
        "enlighten-guard": [
          "accept-enlighten-sword-guard",
          "enlighten-sword-guard-invasion",
          "enlighten-sword-guard-disaster",
          "enlighten-sword-guard-successor",
          "claim-enlighten-sword-guard"
        ],
        "mortal": [
          "accept-mortal-renunciation",
          "mortal-list-responsibilities",
          "mortal-store-implements",
          "mortal-confirm-renounce",
          "claim-mortal-renunciation",
          "accept-mortal-livelihood",
          "mortal-livelihood-work",
          "mortal-livelihood-seeds",
          "mortal-livelihood-roof",
          "mortal-livelihood-desk",
          "mortal-livelihood-plant",
          "mortal-livelihood-book",
          "claim-mortal-livelihood",
          "accept-mortal-clinic-school",
          "mortal-clinic-school-divide",
          "mortal-clinic-school-literacy",
          "mortal-clinic-school-medicine",
          "mortal-clinic-school-register",
          "claim-mortal-clinic-school",
          "accept-mortal-plague",
          "mortal-plague-clinic-sample",
          "mortal-plague-village-sample",
          "mortal-plague-road-sample",
          "mortal-plague-mix",
          "mortal-plague-axing",
          "mortal-plague-village",
          "mortal-plague-shelter",
          "claim-mortal-plague",
          "accept-mortal-flood",
          "mortal-flood-check",
          "mortal-flood-people",
          "mortal-flood-priority-people",
          "mortal-flood-followup-people",
          "claim-mortal-flood",
          "accept-mortal-rebuild",
          "mortal-rebuild-seed",
          "mortal-rebuild-books",
          "mortal-rebuild-reopen",
          "claim-mortal-rebuild",
          "accept-mortal-life-years",
          "mortal-years-early",
          "mortal-years-early-1",
          "mortal-years-early-2",
          "mortal-years-early-3",
          "claim-mortal-life-years"
        ],
        "mortal-home": [
          "accept-mortal-home-farewell",
          "mortal-home-farewell-care",
          "mortal-home-farewell-goodbye",
          "mortal-home-farewell-inherit",
          "claim-mortal-home-farewell"
        ],
        "mortal-teacher": [
          "accept-mortal-teacher-legacy",
          "mortal-teacher-legacy-lesson",
          "mortal-teacher-legacy-student",
          "mortal-teacher-legacy-name",
          "claim-mortal-teacher-legacy"
        ],
        "mortal-clinic": [
          "accept-mortal-clinic-legacy",
          "mortal-clinic-legacy-cases",
          "mortal-clinic-legacy-fees",
          "mortal-clinic-legacy-handoff",
          "claim-mortal-clinic-legacy"
        ],
        "mortal-reunion": [
          "accept-mortal-flute-reunion",
          "mortal-flute-reunion-care",
          "mortal-flute-reunion-goodbye",
          "mortal-flute-reunion-repair",
          "claim-mortal-flute-reunion"
        ],
        "mortal-women": [
          "accept-mortal-women-clinic",
          "mortal-women-clinic-own-goals",
          "mortal-women-clinic-shared-class",
          "mortal-women-clinic-sign",
          "mortal-women-clinic-promise",
          "claim-mortal-women-clinic"
        ],
        "loop": [
          "accept-loop-investigation",
          "loop-investigation-south",
          "loop-investigation-east",
          "loop-investigation-north",
          "loop-investigation-hairpin",
          "claim-loop-investigation",
          "accept-loop-awakening",
          "loop-awakening-identity",
          "loop-awakening-boundaries",
          "loop-awakening-door",
          "claim-loop-awakening",
          "accept-loop-life-general",
          "loop-life-general-open",
          "hall-loop-life-general",
          "loop-life-general-read",
          "loop-life-general-evacuate",
          "loop-life-general-hold",
          "loop-life-general-leave",
          "loop-life-general-hall",
          "claim-loop-life-general",
          "accept-loop-life-healer",
          "loop-life-healer-open",
          "hall-loop-life-healer",
          "loop-life-healer-prepare",
          "loop-life-healer-stranger",
          "loop-life-healer-village",
          "loop-life-healer-farewell",
          "loop-life-healer-hall",
          "claim-loop-life-healer",
          "accept-loop-life-ruler",
          "loop-life-ruler-open",
          "hall-loop-life-ruler",
          "loop-life-ruler-read",
          "loop-life-ruler-protect",
          "loop-life-ruler-trade",
          "loop-life-ruler-defend",
          "loop-life-ruler-truth",
          "loop-life-ruler-hall",
          "claim-loop-life-ruler",
          "accept-loop-memory-review",
          "loop-memory-review-general",
          "loop-memory-review-healer",
          "loop-memory-review-ruler",
          "loop-memory-review-others",
          "claim-loop-memory-review",
          "accept-loop-mill-investigation",
          "loop-mill-investigation-names",
          "loop-mill-investigation-west",
          "loop-mill-investigation-guard",
          "loop-mill-investigation-east",
          "loop-mill-investigation-dock",
          "claim-loop-mill-investigation"
        ],
        "loop-break": [
          "accept-loop-break-wheel",
          "loop-break-wheel-evacuate",
          "loop-break-wheel-ning-consent",
          "loop-break-wheel-break",
          "loop-break-wheel-aftermath",
          "loop-break-wheel-return",
          "claim-loop-break-wheel"
        ],
        "loop-guardian": [
          "accept-loop-guardian-service",
          "loop-guardian-service-self",
          "loop-guardian-service-ning",
          "loop-guardian-service-lamp",
          "loop-guardian-service-handoff",
          "claim-loop-guardian-service"
        ],
        "loop-king": [
          "accept-loop-incorporate-time",
          "loop-incorporate-time-names",
          "loop-incorporate-time-consent",
          "loop-incorporate-time-axis",
          "loop-incorporate-time-warmth",
          "claim-loop-incorporate-time"
        ],
        "loop-road": [
          "accept-loop-five-thousand-road",
          "loop-five-thousand-road-promise",
          "loop-five-thousand-road-school",
          "loop-five-thousand-road-winter",
          "loop-five-thousand-road-peace",
          "loop-five-thousand-road-last",
          "claim-loop-five-thousand-road"
        ],
        "admission": [
          "accept-admission-overdraw",
          "admission-force",
          "claim-admission-overdraw"
        ],
        "remnant": [
          "accept-forbidden-remnant",
          "remnant-check-traces",
          "remnant-read-price",
          "remnant-force",
          "claim-forbidden-remnant"
        ],
        "huashenLastStand": [
          "accept-huashen-desperate-defense",
          "last-stand-commit",
          "last-stand-allocate",
          "last-stand-evacuate",
          "last-stand-rations",
          "last-stand-hold-line",
          "claim-huashen-desperate-defense"
        ],
        "femaleSword": [
          "accept-female-sword-mandate",
          "female-sword-mandate-lesson",
          "female-sword-mandate-practice",
          "female-sword-mandate-shen-wish",
          "female-sword-mandate-jade",
          "claim-female-sword-mandate"
        ],
        "female-alone": [
          "accept-female-solitary-legacy",
          "female-solitary-legacy-farewell",
          "female-solitary-legacy-charter",
          "female-solitary-legacy-watch",
          "claim-female-solitary-legacy"
        ],
        "female-together": [
          "accept-female-mountain-watch",
          "female-mountain-watch-keepsakes",
          "female-mountain-watch-roles",
          "female-mountain-watch-watch",
          "female-mountain-watch-promise",
          "claim-female-mountain-watch"
        ]
      },
      "m5Draft": {
        "phase": "all-branches",
        "status": "definitions-and-source-audit-passed-runtime-verification-in-progress",
        "baseline": {
          "maps": 17,
          "tasks": 39,
          "actions": 318
        },
        "newCounts": {
          "maps": 14,
          "tasks": 90,
          "actions": 561
        },
        "pending": [
          "complete-runtime-route-proofs",
          "final-render-review",
          "balance-verification",
          "catalog-and-release-evidence"
        ]
      }
    },
    "windows": {
      "early-politics": {
        "title": "旧案尚未进入金顶公审",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "jindan-crossroads",
              "status": "claimed"
            }
          ],
          "any": []
        },
        "closedBy": [
          {
            "task": "summit-evidence",
            "on": "accept"
          },
          {
            "task": "huashen-trial",
            "on": "accept"
          }
        ]
      },
      "jindan-remnant": {
        "title": "秘境余魂尚可在金丹阶段回访",
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
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "closedBy": [
          {
            "task": "journey-departure",
            "on": "course-chosen"
          },
          {
            "task": "summit-evidence",
            "on": "accept"
          },
          {
            "task": "yuanying-breakthrough",
            "on": "claimed"
          },
          {
            "task": "demon-yuanying-trial",
            "on": "claimed"
          },
          {
            "task": "enlighten-yuanying-trial",
            "on": "claimed"
          }
        ]
      },
      "huashen-last-stand": {
        "title": "尚未合体，仍在联军整备阶段",
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
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "closedBy": [
          {
            "task": "heti-breakthrough",
            "on": "accept"
          },
          {
            "task": "demon-heti-trial",
            "on": "claimed"
          },
          {
            "task": "enlighten-heti-trial",
            "on": "claimed"
          }
        ]
      },
      "female-sword-living-witness": {
        "title": "灵薇尚可亲自交托剑坪",
        "requires": {
          "all": [
            {
              "type": "gender",
              "id": "female"
            },
            {
              "type": "task",
              "id": "dacheng-breakthrough",
              "status": "claimed"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": []
        },
        "closedBy": [
          {
            "task": "demon-century",
            "on": "demon-century-ten-care"
          },
          {
            "task": "enlighten-personal-farewell",
            "on": "enlighten-personal-farewell-shen-farewell"
          }
        ]
      }
    },
    "exclusiveHistories": {
      "political-career": {
        "title": "旧案只能走一条互斥的政治长线",
        "branches": [
          {
            "id": "demon",
            "sources": [
              {
                "task": "journey-departure",
                "on": "course-chosen",
                "choice": "demon"
              },
              {
                "task": "wander-road-choice",
                "on": "course-chosen",
                "choice": "demon"
              }
            ]
          },
          {
            "id": "enlighten",
            "sources": [
              {
                "task": "journey-departure",
                "on": "course-chosen",
                "choice": "enlighten"
              },
              {
                "task": "wander-road-choice",
                "on": "course-chosen",
                "choice": "enlighten"
              }
            ]
          },
          {
            "id": "shushan",
            "sources": [
              {
                "task": "summit-evidence",
                "on": "accept"
              }
            ]
          }
        ]
      },
      "war-preparation": {
        "title": "死守或整备必须由本人明确择一",
        "branches": [
          {
            "id": "desperate",
            "sources": [
              {
                "task": "huashen-desperate-defense",
                "on": "defense-committed",
                "choice": "defend"
              }
            ]
          },
          {
            "id": "prepared",
            "sources": [
              {
                "task": "heti-breakthrough",
                "on": "accept"
              }
            ]
          }
        ]
      }
    },
    "eraSteps": [
      {
        "id": "roads-clinic-year",
        "label": "第一程：交济善堂药货",
        "years": 1,
        "source": {
          "task": "wander-road-years",
          "on": "roads-clinic-year"
        }
      },
      {
        "id": "roads-border-years",
        "label": "第二程：交边关救护药货",
        "years": 4,
        "source": {
          "task": "wander-road-years",
          "on": "roads-border-years"
        }
      },
      {
        "id": "roads-ice-years",
        "label": "第三程：交冰原护温药货",
        "years": 5,
        "source": {
          "task": "wander-road-years",
          "on": "roads-ice-years"
        }
      },
      {
        "id": "demon-century-ten-care",
        "label": "魔域第十年",
        "years": 10,
        "source": {
          "task": "demon-century",
          "on": "demon-century-ten-care"
        }
      },
      {
        "id": "demon-century-twenty-farewell",
        "label": "魔域第二十年",
        "years": 10,
        "source": {
          "task": "demon-century",
          "on": "demon-century-twenty-farewell"
        }
      },
      {
        "id": "demon-century-fifty-assassin",
        "label": "魔域第五十年",
        "years": 30,
        "source": {
          "task": "demon-century",
          "on": "demon-century-fifty-assassin"
        }
      },
      {
        "id": "demon-century-hundred-handoff",
        "label": "魔域百年",
        "years": 50,
        "source": {
          "task": "demon-century",
          "on": "demon-century-hundred-handoff"
        }
      },
      {
        "id": "enlighten-five-trade",
        "label": "归元通商第五年",
        "years": 5,
        "source": {
          "task": "enlighten-treaty",
          "on": "enlighten-treaty-five-trade"
        }
      },
      {
        "id": "enlighten-ten-rebellion",
        "label": "归元止叛第十年",
        "years": 5,
        "source": {
          "task": "enlighten-treaty",
          "on": "enlighten-treaty-ten-rebellion"
        }
      },
      {
        "id": "enlighten-twenty-school",
        "label": "归元义学第二十年",
        "years": 10,
        "source": {
          "task": "enlighten-treaty",
          "on": "enlighten-treaty-twenty-school"
        }
      },
      {
        "id": "enlighten-thirty-sign",
        "label": "归元正式签约第三十年",
        "years": 10,
        "source": {
          "task": "enlighten-treaty",
          "on": "enlighten-treaty-thirty-sign"
        }
      },
      {
        "id": "enlighten-farewell",
        "label": "归元之约后的三十年",
        "years": 30,
        "source": {
          "task": "enlighten-personal-farewell",
          "on": "claimed"
        }
      },
      {
        "id": "mortal-years-early-1",
        "label": "凡人医塾第1次交接",
        "years": 15,
        "source": {
          "task": "mortal-life-years",
          "on": "mortal-years-early-1"
        }
      },
      {
        "id": "mortal-years-early-2",
        "label": "凡人医塾第2次交接",
        "years": 20,
        "source": {
          "task": "mortal-life-years",
          "on": "mortal-years-early-2"
        }
      },
      {
        "id": "mortal-years-early-3",
        "label": "凡人医塾第3次交接",
        "years": 15,
        "source": {
          "task": "mortal-life-years",
          "on": "mortal-years-early-3"
        }
      },
      {
        "id": "mortal-years-late-1",
        "label": "凡人医塾第1次交接",
        "years": 3,
        "source": {
          "task": "mortal-life-years",
          "on": "mortal-years-late-1"
        }
      },
      {
        "id": "mortal-years-late-2",
        "label": "凡人医塾第2次交接",
        "years": 4,
        "source": {
          "task": "mortal-life-years",
          "on": "mortal-years-late-2"
        }
      },
      {
        "id": "mortal-years-late-3",
        "label": "凡人医塾第3次交接",
        "years": 3,
        "source": {
          "task": "mortal-life-years",
          "on": "mortal-years-late-3"
        }
      }
    ],
    "partners": {
      "shen": {
        "personId": "shen",
        "source": {
          "task": "relation-shen-vow",
          "on": "claimed",
          "choice": "vow"
        },
        "adultSource": {
          "task": "relation-shen-case",
          "on": "shen-hear-case-goal"
        },
        "genders": [
          "female",
          "male"
        ]
      },
      "ning": {
        "personId": "ning",
        "source": {
          "task": "relation-ning-vow",
          "on": "claimed",
          "choice": "vow"
        },
        "adultSource": {
          "task": "relation-ning-soul",
          "on": "ning-hear-own-goal"
        },
        "genders": [
          "female",
          "male"
        ]
      },
      "axing": {
        "personId": "axing",
        "source": {
          "task": "relation-axing-vow",
          "on": "claimed",
          "choice": "vow"
        },
        "adultSource": {
          "task": "relation-axing-clinic",
          "on": "axing-hear-clinic-goal"
        },
        "genders": [
          "female",
          "male"
        ]
      },
      "lingyun": {
        "personId": "lingyun",
        "source": {
          "task": "relation-lingyun-vow",
          "on": "claimed",
          "choice": "vow"
        },
        "adultSource": {
          "task": "relation-lingyun-oath",
          "on": "lingyun-hear-school-goal"
        },
        "genders": [
          "female"
        ]
      }
    },
    "mortalBody": {
      "source": {
        "task": "mortal-renunciation",
        "on": "claimed",
        "choice": "renounce"
      },
      "title": "凡人身体",
      "detail": "灵力与修为战斗能力已停用，收藏与突破历史仍可查。",
      "rules": [
        "不能施法、回灵或触发法宝与灵甲被动。",
        "普通食物、休息、工具、知识与自愿照护仍可用。",
        "已完成的历史不删除，未完成的运灵任务不会假装完成。"
      ]
    },
    "sealedPractice": {
      "source": {
        "task": "demon-redemption-handoff",
        "on": "demon-redemption-handoff-relinquish"
      },
      "title": "已自愿封存魔功",
      "detail": "不再运用灵力、宗门法术与法宝被动，收藏和突破历史保留。"
    },
    "recoveryChoices": [
      {
        "task": "journey-departure",
        "on": "course-chosen"
      },
      {
        "task": "wander-road-choice",
        "on": "course-chosen"
      },
      {
        "task": "demon-future-choice",
        "on": "course-chosen"
      },
      {
        "task": "enlighten-case-direction",
        "on": "course-chosen"
      },
      {
        "task": "enlighten-final-vow",
        "on": "course-chosen"
      },
      {
        "task": "mortal-renunciation",
        "on": "course-chosen"
      },
      {
        "task": "mortal-final-choice",
        "on": "course-chosen"
      },
      {
        "task": "loop-path-choice",
        "on": "course-chosen"
      },
      {
        "task": "female-sword-choice",
        "on": "course-chosen"
      },
      {
        "task": "forbidden-remnant",
        "on": "course-chosen"
      },
      {
        "task": "admission-overdraw",
        "on": "admission-decided"
      },
      {
        "task": "huashen-desperate-defense",
        "on": "defense-committed"
      }
    ],
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
      },
      {
        "id": "admissionWarning",
        "name": "引灵戒示札",
        "x": 680,
        "y": 400,
        "kind": "campaignObject",
        "role": "prop",
        "atlas": "m5PropsE",
        "cell": 7,
        "height": 48,
        "sinceRevision": 4,
        "map": "garden"
      }
    ],
    "memoryVisits": [
      {
        "task": "loop-life-general",
        "map": "northern-border",
        "title": "第五世 · 忠义与退路",
        "until": "claimed"
      },
      {
        "task": "loop-life-healer",
        "map": "apricot-homestead",
        "title": "第十世 · 医者与凡常一生",
        "until": "claimed"
      },
      {
        "task": "loop-life-ruler",
        "map": "demon-palace",
        "title": "第三十七世 · 魔域守土之道",
        "until": "claimed"
      }
    ]
  }
};
const copy=value=>JSON.parse(JSON.stringify(value));
function extend(data){if(data.revision!==3)throw Error('M5 expects frozen revision3 base');for(const key of ['maps','exits','tasks','actions','encounters','supplies','tokens','evidence','people','realms','endings'])if(patch.tables[key])Object.assign(data[key],copy(patch.tables[key]));for(const key of ['revision','meta','windows','exclusiveHistories','eraSteps','partners','mortalBody','sealedPractice','recoveryChoices','entryObjects','memoryVisits','personBindings','endingCatalog'])if(Object.prototype.hasOwnProperty.call(patch.fields,key))data[key]=copy(patch.fields[key]);return data;}
if(typeof module==='object'&&module.exports)module.exports=extend;else root.XiuxianCampaignBranchesData=extend;
})(globalThis);
