(function(root){
'use strict';
const patch={
  "tables": {
    "tasks": {
      "practice-zhuji": {
        "id": "practice-zhuji",
        "title": "筑基三段实修",
        "summary": "把已经历过的险处化为可反复记住的修行次序；可提前冲关，实修提供准备而不代替判断。",
        "requires": {
          "all": [
            {
              "type": "legacy",
              "id": "chapterComplete"
            },
            {
              "type": "body",
              "id": "cultivator"
            },
            {
              "type": "currentRealm",
              "id": "zhuji"
            }
          ],
          "any": []
        },
        "objectives": [
          "stage-middle",
          "stage-late",
          "stage-complete"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/volume2.ts",
            "line": 1028,
            "node": "zhuji_second_brother_night"
          }
        ],
        "volumeLabel": "境界实修",
        "sinceRevision": 5
      },
      "practice-jindan": {
        "id": "practice-jindan",
        "title": "金丹三段实修",
        "summary": "把已经历过的险处化为可反复记住的修行次序；可提前冲关，实修提供准备而不代替判断。",
        "requires": {
          "all": [
            {
              "type": "legacy",
              "id": "chapterComplete"
            },
            {
              "type": "body",
              "id": "cultivator"
            },
            {
              "type": "currentRealm",
              "id": "jindan"
            }
          ],
          "any": []
        },
        "objectives": [
          "stage-middle",
          "stage-late",
          "stage-complete"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/volume3.ts",
            "line": 284,
            "node": "jindan_thunder_1"
          }
        ],
        "volumeLabel": "境界实修",
        "sinceRevision": 5
      },
      "practice-yuanying": {
        "id": "practice-yuanying",
        "title": "元婴三段实修",
        "summary": "把已经历过的险处化为可反复记住的修行次序；可提前冲关，实修提供准备而不代替判断。",
        "requires": {
          "all": [
            {
              "type": "legacy",
              "id": "chapterComplete"
            },
            {
              "type": "body",
              "id": "cultivator"
            },
            {
              "type": "currentRealm",
              "id": "yuanying"
            }
          ],
          "any": []
        },
        "objectives": [
          "stage-middle",
          "stage-late",
          "stage-complete"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/volume4.ts",
            "line": 466,
            "node": "yuanying_thunder_1"
          }
        ],
        "volumeLabel": "境界实修",
        "sinceRevision": 5
      },
      "practice-huashen": {
        "id": "practice-huashen",
        "title": "化神三段实修",
        "summary": "把已经历过的险处化为可反复记住的修行次序；可提前冲关，实修提供准备而不代替判断。",
        "requires": {
          "all": [
            {
              "type": "legacy",
              "id": "chapterComplete"
            },
            {
              "type": "body",
              "id": "cultivator"
            },
            {
              "type": "currentRealm",
              "id": "huashen"
            }
          ],
          "any": []
        },
        "objectives": [
          "stage-middle",
          "stage-late",
          "stage-complete"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/volume4.ts",
            "line": 760,
            "node": "huashen_battle_final"
          }
        ],
        "volumeLabel": "境界实修",
        "sinceRevision": 5
      },
      "practice-heti": {
        "id": "practice-heti",
        "title": "合体三段实修",
        "summary": "把已经历过的险处化为可反复记住的修行次序；可提前冲关，实修提供准备而不代替判断。",
        "requires": {
          "all": [
            {
              "type": "legacy",
              "id": "chapterComplete"
            },
            {
              "type": "body",
              "id": "cultivator"
            },
            {
              "type": "currentRealm",
              "id": "heti"
            }
          ],
          "any": []
        },
        "objectives": [
          "stage-middle",
          "stage-late",
          "stage-complete"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/volume4.ts",
            "line": 1070,
            "node": "huashen_march"
          }
        ],
        "volumeLabel": "境界实修",
        "sinceRevision": 5
      },
      "practice-dacheng": {
        "id": "practice-dacheng",
        "title": "大乘三段实修",
        "summary": "把已经历过的险处化为可反复记住的修行次序；可提前冲关，实修提供准备而不代替判断。",
        "requires": {
          "all": [
            {
              "type": "legacy",
              "id": "chapterComplete"
            },
            {
              "type": "body",
              "id": "cultivator"
            },
            {
              "type": "currentRealm",
              "id": "dacheng"
            }
          ],
          "any": []
        },
        "objectives": [
          "stage-middle",
          "stage-late",
          "stage-complete"
        ],
        "sequence": [],
        "choices": [],
        "sources": [
          {
            "file": "src/lib/story/volume4.ts",
            "line": 1359,
            "node": "dacheng_breakthrough"
          }
        ],
        "volumeLabel": "境界实修",
        "sinceRevision": 5
      }
    },
    "actions": {
      "accept-practice-zhuji": {
        "id": "accept-practice-zhuji",
        "task": "practice-zhuji",
        "map": "tower-duty",
        "objectId": "towerDutyLedger",
        "kind": "accept",
        "label": "接下：筑基三段实修",
        "detail": "登记本次筑基实修，一次领取三份定脉试练液。每段完成都耗一份；越过此境后，未用材料留作旧课记录，不转作更高境界供料。",
        "requires": {
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
          "supplies": {
            "practice-meridian-liquid": 3
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 5
      },
      "practice-zhuji-middle": {
        "id": "practice-zhuji-middle",
        "task": "practice-zhuji",
        "map": "tower-duty",
        "objectId": "towerWaterWest",
        "kind": "progress",
        "label": "辨脉，修至中期",
        "detail": "先辨清灵息偏向，确认可控后再引入供料；一次用料只记一次实修。",
        "requires": {
          "all": [
            {
              "type": "currentRealm",
              "id": "zhuji"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": [
            {
              "type": "task",
              "id": "tower-duty",
              "status": "claimed"
            }
          ]
        },
        "marks": [
          "stage-middle"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "practice-meridian-liquid": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 5
      },
      "practice-zhuji-late": {
        "id": "practice-zhuji-late",
        "task": "practice-zhuji",
        "map": "tower-duty",
        "objectId": "towerWaterEast",
        "kind": "progress",
        "label": "稳回流，修至后期",
        "detail": "沿前段辨明的回路护住逆流，动作放缓，直到回返次序清楚。",
        "requires": {
          "all": [
            {
              "type": "currentRealm",
              "id": "zhuji"
            },
            {
              "type": "body",
              "id": "cultivator"
            },
            {
              "type": "done",
              "task": "practice-zhuji",
              "id": "stage-middle"
            }
          ],
          "any": [
            {
              "type": "task",
              "id": "tower-seal",
              "status": "claimed"
            }
          ]
        },
        "marks": [
          "stage-late"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "practice-meridian-liquid": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 5
      },
      "practice-zhuji-complete": {
        "id": "practice-zhuji-complete",
        "task": "practice-zhuji",
        "map": "tower-duty",
        "objectId": "towerWaterNorth",
        "kind": "progress",
        "label": "核周天，修至圆满",
        "detail": "在最后一份供料耗尽前完成收束，核对身识与灵息都能自行回稳。",
        "requires": {
          "all": [
            {
              "type": "currentRealm",
              "id": "zhuji"
            },
            {
              "type": "body",
              "id": "cultivator"
            },
            {
              "type": "done",
              "task": "practice-zhuji",
              "id": "stage-late"
            }
          ],
          "any": [
            {
              "type": "task",
              "id": "tower-review",
              "status": "claimed"
            }
          ]
        },
        "marks": [
          "stage-complete"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "practice-meridian-liquid": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 5
      },
      "claim-practice-zhuji": {
        "id": "claim-practice-zhuji",
        "task": "practice-zhuji",
        "map": "tower-duty",
        "objectId": "towerDutyLedger",
        "kind": "claim",
        "label": "交付：筑基三段实修",
        "detail": "三段实修记录归入案簿，境界收益已由实际完成的阶段产生，不再另发一次属性奖励。",
        "requires": {
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
        "sinceRevision": 5
      },
      "accept-practice-jindan": {
        "id": "accept-practice-jindan",
        "task": "practice-jindan",
        "map": "jindan-retreat",
        "objectId": "retreatPrepareDesk",
        "kind": "accept",
        "label": "接下：金丹三段实修",
        "detail": "登记本次金丹实修，一次领取三份凝丹温养砂。每段完成都耗一份；越过此境后，未用材料留作旧课记录，不转作更高境界供料。",
        "requires": {
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
          "supplies": {
            "practice-core-sand": 3
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 5
      },
      "practice-jindan-middle": {
        "id": "practice-jindan-middle",
        "task": "practice-jindan",
        "map": "jindan-retreat",
        "objectId": "retreatGroundRod",
        "kind": "progress",
        "label": "引丹息，修至中期",
        "detail": "先辨清灵息偏向，确认可控后再引入供料；一次用料只记一次实修。",
        "requires": {
          "all": [
            {
              "type": "currentRealm",
              "id": "jindan"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": [
            {
              "type": "task",
              "id": "tianji-negotiation",
              "status": "claimed"
            }
          ]
        },
        "marks": [
          "stage-middle"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "practice-core-sand": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 5
      },
      "practice-jindan-late": {
        "id": "practice-jindan-late",
        "task": "practice-jindan",
        "map": "jindan-retreat",
        "objectId": "retreatHeartStone",
        "kind": "progress",
        "label": "护逆流，修至后期",
        "detail": "沿前段辨明的回路护住逆流，动作放缓，直到回返次序清楚。",
        "requires": {
          "all": [
            {
              "type": "currentRealm",
              "id": "jindan"
            },
            {
              "type": "body",
              "id": "cultivator"
            },
            {
              "type": "done",
              "task": "practice-jindan",
              "id": "stage-middle"
            }
          ],
          "any": [
            {
              "type": "task",
              "id": "wanyao-rescue",
              "status": "claimed"
            }
          ]
        },
        "marks": [
          "stage-late"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "practice-core-sand": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 5
      },
      "practice-jindan-complete": {
        "id": "practice-jindan-complete",
        "task": "practice-jindan",
        "map": "jindan-retreat",
        "objectId": "retreatCoreStand",
        "kind": "progress",
        "label": "收丹息，修至圆满",
        "detail": "在最后一份供料耗尽前完成收束，核对身识与灵息都能自行回稳。",
        "requires": {
          "all": [
            {
              "type": "currentRealm",
              "id": "jindan"
            },
            {
              "type": "body",
              "id": "cultivator"
            },
            {
              "type": "done",
              "task": "practice-jindan",
              "id": "stage-late"
            }
          ],
          "any": [
            {
              "type": "task",
              "id": "jindan-crossroads",
              "status": "claimed"
            }
          ]
        },
        "marks": [
          "stage-complete"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "practice-core-sand": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 5
      },
      "claim-practice-jindan": {
        "id": "claim-practice-jindan",
        "task": "practice-jindan",
        "map": "jindan-retreat",
        "objectId": "retreatPrepareDesk",
        "kind": "claim",
        "label": "交付：金丹三段实修",
        "detail": "三段实修记录归入案簿，境界收益已由实际完成的阶段产生，不再另发一次属性奖励。",
        "requires": {
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
        "sinceRevision": 5
      },
      "accept-practice-yuanying": {
        "id": "accept-practice-yuanying",
        "task": "practice-yuanying",
        "map": "jindan-retreat",
        "objectId": "retreatPrepareDesk",
        "kind": "accept",
        "label": "接下：元婴三段实修",
        "detail": "登记本次元婴实修，一次领取三份分识护脉绢。每段完成都耗一份；越过此境后，未用材料留作旧课记录，不转作更高境界供料。",
        "requires": {
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
          "supplies": {
            "practice-spirit-silk": 3
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 5
      },
      "practice-yuanying-middle": {
        "id": "practice-yuanying-middle",
        "task": "practice-yuanying",
        "map": "jindan-retreat",
        "objectId": "retreatGroundRod",
        "kind": "progress",
        "label": "分识标记，修至中期",
        "detail": "先辨清灵息偏向，确认可控后再引入供料；一次用料只记一次实修。",
        "requires": {
          "all": [
            {
              "type": "currentRealm",
              "id": "yuanying"
            },
            {
              "type": "body",
              "id": "cultivator"
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
              "task": "demon-tribal-work",
              "id": "demon-tribal-work-grain"
            },
            {
              "type": "task",
              "id": "enlighten-three-witnesses",
              "status": "claimed"
            }
          ]
        },
        "marks": [
          "stage-middle"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "practice-spirit-silk": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 5
      },
      "practice-yuanying-late": {
        "id": "practice-yuanying-late",
        "task": "practice-yuanying",
        "map": "jindan-retreat",
        "objectId": "retreatHeartStone",
        "kind": "progress",
        "label": "回返护持，修至后期",
        "detail": "沿前段辨明的回路护住逆流，动作放缓，直到回返次序清楚。",
        "requires": {
          "all": [
            {
              "type": "currentRealm",
              "id": "yuanying"
            },
            {
              "type": "body",
              "id": "cultivator"
            },
            {
              "type": "done",
              "task": "practice-yuanying",
              "id": "stage-middle"
            }
          ],
          "any": [
            {
              "type": "task",
              "id": "summit-swordmeet",
              "status": "claimed"
            },
            {
              "type": "task",
              "id": "demon-tribal-work",
              "status": "claimed"
            },
            {
              "type": "task",
              "id": "enlighten-compiled-case",
              "status": "claimed"
            }
          ]
        },
        "marks": [
          "stage-late"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "practice-spirit-silk": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 5
      },
      "practice-yuanying-complete": {
        "id": "practice-yuanying-complete",
        "task": "practice-yuanying",
        "map": "jindan-retreat",
        "objectId": "retreatCoreStand",
        "kind": "progress",
        "label": "身识核对，修至圆满",
        "detail": "在最后一份供料耗尽前完成收束，核对身识与灵息都能自行回稳。",
        "requires": {
          "all": [
            {
              "type": "currentRealm",
              "id": "yuanying"
            },
            {
              "type": "body",
              "id": "cultivator"
            },
            {
              "type": "done",
              "task": "practice-yuanying",
              "id": "stage-late"
            }
          ],
          "any": [
            {
              "type": "task",
              "id": "heartcliff-inquiry",
              "status": "claimed"
            },
            {
              "type": "task",
              "id": "demon-rebellion",
              "status": "claimed"
            },
            {
              "type": "task",
              "id": "enlighten-public-trial",
              "status": "claimed"
            }
          ]
        },
        "marks": [
          "stage-complete"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "practice-spirit-silk": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 5
      },
      "claim-practice-yuanying": {
        "id": "claim-practice-yuanying",
        "task": "practice-yuanying",
        "map": "jindan-retreat",
        "objectId": "retreatPrepareDesk",
        "kind": "claim",
        "label": "交付：元婴三段实修",
        "detail": "三段实修记录归入案簿，境界收益已由实际完成的阶段产生，不再另发一次属性奖励。",
        "requires": {
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
        "sinceRevision": 5
      },
      "accept-practice-huashen": {
        "id": "accept-practice-huashen",
        "task": "practice-huashen",
        "map": "jindan-retreat",
        "objectId": "retreatPrepareDesk",
        "kind": "accept",
        "label": "接下：化神三段实修",
        "detail": "登记本次化神实修，一次领取三份观心定识香。每段完成都耗一份；越过此境后，未用材料留作旧课记录，不转作更高境界供料。",
        "requires": {
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
          "supplies": {
            "practice-mind-incense": 3
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 5
      },
      "practice-huashen-middle": {
        "id": "practice-huashen-middle",
        "task": "practice-huashen",
        "map": "jindan-retreat",
        "objectId": "retreatGroundRod",
        "kind": "progress",
        "label": "辨念，修至中期",
        "detail": "先辨清灵息偏向，确认可控后再引入供料；一次用料只记一次实修。",
        "requires": {
          "all": [
            {
              "type": "currentRealm",
              "id": "huashen"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": [
            {
              "type": "task",
              "id": "huashen-trial",
              "status": "claimed"
            },
            {
              "type": "task",
              "id": "demon-mother-legacy",
              "status": "claimed"
            },
            {
              "type": "task",
              "id": "enlighten-master-trial",
              "status": "claimed"
            }
          ]
        },
        "marks": [
          "stage-middle"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "practice-mind-incense": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 5
      },
      "practice-huashen-late": {
        "id": "practice-huashen-late",
        "task": "practice-huashen",
        "map": "jindan-retreat",
        "objectId": "retreatHeartStone",
        "kind": "progress",
        "label": "定识，修至后期",
        "detail": "沿前段辨明的回路护住逆流，动作放缓，直到回返次序清楚。",
        "requires": {
          "all": [
            {
              "type": "currentRealm",
              "id": "huashen"
            },
            {
              "type": "body",
              "id": "cultivator"
            },
            {
              "type": "done",
              "task": "practice-huashen",
              "id": "stage-middle"
            }
          ],
          "any": [
            {
              "type": "task",
              "id": "school-shelter",
              "status": "claimed"
            },
            {
              "type": "done",
              "task": "demon-coup",
              "id": "demon-coup-break-control"
            },
            {
              "type": "done",
              "task": "enlighten-treaty",
              "id": "enlighten-treaty-ten-rebellion"
            }
          ]
        },
        "marks": [
          "stage-late"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "practice-mind-incense": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 5
      },
      "practice-huashen-complete": {
        "id": "practice-huashen-complete",
        "task": "practice-huashen",
        "map": "jindan-retreat",
        "objectId": "retreatCoreStand",
        "kind": "progress",
        "label": "合照，修至圆满",
        "detail": "在最后一份供料耗尽前完成收束，核对身识与灵息都能自行回稳。",
        "requires": {
          "all": [
            {
              "type": "currentRealm",
              "id": "huashen"
            },
            {
              "type": "body",
              "id": "cultivator"
            },
            {
              "type": "done",
              "task": "practice-huashen",
              "id": "stage-late"
            }
          ],
          "any": [
            {
              "type": "done",
              "task": "governance-review",
              "id": "audit-three-reforms"
            },
            {
              "type": "done",
              "task": "demon-coup",
              "id": "demon-coup-public-account"
            },
            {
              "type": "task",
              "id": "enlighten-personal-farewell",
              "status": "claimed"
            }
          ]
        },
        "marks": [
          "stage-complete"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "practice-mind-incense": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 5
      },
      "claim-practice-huashen": {
        "id": "claim-practice-huashen",
        "task": "practice-huashen",
        "map": "jindan-retreat",
        "objectId": "retreatPrepareDesk",
        "kind": "claim",
        "label": "交付：化神三段实修",
        "detail": "三段实修记录归入案簿，境界收益已由实际完成的阶段产生，不再另发一次属性奖励。",
        "requires": {
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
        "sinceRevision": 5
      },
      "accept-practice-heti": {
        "id": "accept-practice-heti",
        "task": "practice-heti",
        "map": "jindan-retreat",
        "objectId": "retreatPrepareDesk",
        "kind": "accept",
        "label": "接下：合体三段实修",
        "detail": "登记本次合体实修，一次领取三份身识合流阵片。每段完成都耗一份；越过此境后，未用材料留作旧课记录，不转作更高境界供料。",
        "requires": {
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
          "supplies": {
            "practice-confluence-chip": 3
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 5
      },
      "practice-heti-middle": {
        "id": "practice-heti-middle",
        "task": "practice-heti",
        "map": "jindan-retreat",
        "objectId": "retreatGroundRod",
        "kind": "progress",
        "label": "校身，修至中期",
        "detail": "先辨清灵息偏向，确认可控后再引入供料；一次用料只记一次实修。",
        "requires": {
          "all": [
            {
              "type": "currentRealm",
              "id": "heti"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": [
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
              "type": "task",
              "id": "demon-treaty",
              "status": "claimed"
            },
            {
              "type": "done",
              "task": "enlighten-thirty-one",
              "id": "enlighten-thirty-one-names"
            }
          ]
        },
        "marks": [
          "stage-middle"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "practice-confluence-chip": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 5
      },
      "practice-heti-late": {
        "id": "practice-heti-late",
        "task": "practice-heti",
        "map": "jindan-retreat",
        "objectId": "retreatHeartStone",
        "kind": "progress",
        "label": "校识，修至后期",
        "detail": "沿前段辨明的回路护住逆流，动作放缓，直到回返次序清楚。",
        "requires": {
          "all": [
            {
              "type": "currentRealm",
              "id": "heti"
            },
            {
              "type": "body",
              "id": "cultivator"
            },
            {
              "type": "done",
              "task": "practice-heti",
              "id": "stage-middle"
            }
          ],
          "any": [
            {
              "type": "task",
              "id": "guixu-family",
              "status": "claimed"
            },
            {
              "type": "done",
              "task": "demon-century",
              "id": "demon-century-fifty-assassin"
            },
            {
              "type": "done",
              "task": "enlighten-thirty-one",
              "id": "enlighten-thirty-one-exercise"
            }
          ]
        },
        "marks": [
          "stage-late"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "practice-confluence-chip": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 5
      },
      "practice-heti-complete": {
        "id": "practice-heti-complete",
        "task": "practice-heti",
        "map": "jindan-retreat",
        "objectId": "retreatCoreStand",
        "kind": "progress",
        "label": "合流，修至圆满",
        "detail": "在最后一份供料耗尽前完成收束，核对身识与灵息都能自行回稳。",
        "requires": {
          "all": [
            {
              "type": "currentRealm",
              "id": "heti"
            },
            {
              "type": "body",
              "id": "cultivator"
            },
            {
              "type": "done",
              "task": "practice-heti",
              "id": "stage-late"
            }
          ],
          "any": [
            {
              "type": "task",
              "id": "war-aftermath",
              "status": "claimed"
            },
            {
              "type": "done",
              "task": "demon-century",
              "id": "demon-century-hundred-handoff"
            },
            {
              "type": "done",
              "task": "enlighten-thirty-one",
              "id": "enlighten-thirty-one-check"
            }
          ]
        },
        "marks": [
          "stage-complete"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "practice-confluence-chip": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 5
      },
      "claim-practice-heti": {
        "id": "claim-practice-heti",
        "task": "practice-heti",
        "map": "jindan-retreat",
        "objectId": "retreatPrepareDesk",
        "kind": "claim",
        "label": "交付：合体三段实修",
        "detail": "三段实修记录归入案簿，境界收益已由实际完成的阶段产生，不再另发一次属性奖励。",
        "requires": {
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
        "sinceRevision": 5
      },
      "accept-practice-dacheng": {
        "id": "accept-practice-dacheng",
        "task": "practice-dacheng",
        "map": "jindan-retreat",
        "objectId": "retreatPrepareDesk",
        "kind": "accept",
        "label": "接下：大乘三段实修",
        "detail": "登记本次大乘实修，一次领取三份护界定流芯。每段完成都耗一份；越过此境后，未用材料留作旧课记录，不转作更高境界供料。",
        "requires": {
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
          "supplies": {
            "practice-boundary-wick": 3
          },
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 5
      },
      "practice-dacheng-middle": {
        "id": "practice-dacheng-middle",
        "task": "practice-dacheng",
        "map": "jindan-retreat",
        "objectId": "retreatGroundRod",
        "kind": "progress",
        "label": "稳界，修至中期",
        "detail": "先辨清灵息偏向，确认可控后再引入供料；一次用料只记一次实修。",
        "requires": {
          "all": [
            {
              "type": "currentRealm",
              "id": "dacheng"
            },
            {
              "type": "body",
              "id": "cultivator"
            }
          ],
          "any": [
            {
              "type": "task",
              "id": "dacheng-breakthrough",
              "status": "claimed"
            },
            {
              "type": "task",
              "id": "demon-dacheng-trial",
              "status": "claimed"
            },
            {
              "type": "task",
              "id": "enlighten-dacheng-trial",
              "status": "claimed"
            }
          ]
        },
        "marks": [
          "stage-middle"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "practice-boundary-wick": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 5
      },
      "practice-dacheng-late": {
        "id": "practice-dacheng-late",
        "task": "practice-dacheng",
        "map": "jindan-retreat",
        "objectId": "retreatHeartStone",
        "kind": "progress",
        "label": "试护，修至后期",
        "detail": "沿前段辨明的回路护住逆流，动作放缓，直到回返次序清楚。",
        "requires": {
          "all": [
            {
              "type": "currentRealm",
              "id": "dacheng"
            },
            {
              "type": "body",
              "id": "cultivator"
            },
            {
              "type": "done",
              "task": "practice-dacheng",
              "id": "stage-middle"
            }
          ],
          "any": [
            {
              "type": "task",
              "id": "dacheng-breakthrough",
              "status": "claimed"
            },
            {
              "type": "task",
              "id": "demon-dacheng-trial",
              "status": "claimed"
            },
            {
              "type": "task",
              "id": "enlighten-dacheng-trial",
              "status": "claimed"
            }
          ]
        },
        "marks": [
          "stage-late"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "practice-boundary-wick": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 5
      },
      "practice-dacheng-complete": {
        "id": "practice-dacheng-complete",
        "task": "practice-dacheng",
        "map": "jindan-retreat",
        "objectId": "retreatCoreStand",
        "kind": "progress",
        "label": "收势，修至圆满",
        "detail": "在最后一份供料耗尽前完成收束，核对身识与灵息都能自行回稳。",
        "requires": {
          "all": [
            {
              "type": "currentRealm",
              "id": "dacheng"
            },
            {
              "type": "body",
              "id": "cultivator"
            },
            {
              "type": "done",
              "task": "practice-dacheng",
              "id": "stage-late"
            }
          ],
          "any": [
            {
              "type": "task",
              "id": "dacheng-breakthrough",
              "status": "claimed"
            },
            {
              "type": "task",
              "id": "demon-dacheng-trial",
              "status": "claimed"
            },
            {
              "type": "task",
              "id": "enlighten-dacheng-trial",
              "status": "claimed"
            }
          ]
        },
        "marks": [
          "stage-complete"
        ],
        "cost": {
          "items": {},
          "supplies": {
            "practice-boundary-wick": 1
          }
        },
        "grant": {
          "items": {},
          "supplies": {},
          "tokens": [],
          "evidence": []
        },
        "sinceRevision": 5
      },
      "claim-practice-dacheng": {
        "id": "claim-practice-dacheng",
        "task": "practice-dacheng",
        "map": "jindan-retreat",
        "objectId": "retreatPrepareDesk",
        "kind": "claim",
        "label": "交付：大乘三段实修",
        "detail": "三段实修记录归入案簿，境界收益已由实际完成的阶段产生，不再另发一次属性奖励。",
        "requires": {
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
        "sinceRevision": 5
      }
    },
    "supplies": {
      "practice-meridian-liquid": {
        "title": "定脉试练液",
        "max": 3,
        "usage": "本境三段实修各用一份，只供本次辨息、护持与收束，不能改作旧任务材料。",
        "sinceRevision": 5
      },
      "practice-core-sand": {
        "title": "凝丹温养砂",
        "max": 3,
        "usage": "本境三段实修各用一份，只供本次辨息、护持与收束，不能改作旧任务材料。",
        "sinceRevision": 5
      },
      "practice-spirit-silk": {
        "title": "分识护脉绢",
        "max": 3,
        "usage": "本境三段实修各用一份，只供本次辨息、护持与收束，不能改作旧任务材料。",
        "sinceRevision": 5
      },
      "practice-mind-incense": {
        "title": "观心定识香",
        "max": 3,
        "usage": "本境三段实修各用一份，只供本次辨息、护持与收束，不能改作旧任务材料。",
        "sinceRevision": 5
      },
      "practice-confluence-chip": {
        "title": "身识合流阵片",
        "max": 3,
        "usage": "本境三段实修各用一份，只供本次辨息、护持与收束，不能改作旧任务材料。",
        "sinceRevision": 5
      },
      "practice-boundary-wick": {
        "title": "护界定流芯",
        "max": 3,
        "usage": "本境三段实修各用一份，只供本次辨息、护持与收束，不能改作旧任务材料。",
        "sinceRevision": 5
      }
    }
  },
  "recommendations": {
    "jindan-tribulation": {
      "realm": "zhuji",
      "stage": "complete"
    },
    "yuanying-breakthrough": {
      "realm": "jindan",
      "stage": "complete"
    },
    "huashen-breakthrough": {
      "realm": "yuanying",
      "stage": "complete"
    },
    "heti-breakthrough": {
      "realm": "huashen",
      "stage": "complete"
    },
    "dacheng-breakthrough": {
      "realm": "heti",
      "stage": "complete"
    },
    "demon-yuanying-trial": {
      "realm": "jindan",
      "stage": "complete"
    },
    "demon-huashen-trial": {
      "realm": "yuanying",
      "stage": "complete"
    },
    "demon-heti-trial": {
      "realm": "huashen",
      "stage": "complete"
    },
    "demon-dacheng-trial": {
      "realm": "heti",
      "stage": "complete"
    },
    "enlighten-yuanying-trial": {
      "realm": "jindan",
      "stage": "complete"
    },
    "enlighten-huashen-trial": {
      "realm": "yuanying",
      "stage": "complete"
    },
    "enlighten-heti-trial": {
      "realm": "huashen",
      "stage": "complete"
    },
    "enlighten-dacheng-trial": {
      "realm": "heti",
      "stage": "complete"
    }
  },
  "fields": {
    "revision": 5,
    "cultivationStages": {
      "zhuji": {
        "task": "practice-zhuji",
        "stages": [
          {
            "id": "middle",
            "name": "中期",
            "source": {
              "task": "practice-zhuji",
              "on": "stage-middle"
            },
            "profile": {
              "blade": 2,
              "spell": 0.02,
              "defence": 0.01,
              "regen": 0.1
            },
            "healingBonus": 2
          },
          {
            "id": "late",
            "name": "后期",
            "source": {
              "task": "practice-zhuji",
              "on": "stage-late"
            },
            "profile": {
              "blade": 4,
              "spell": 0.04,
              "defence": 0.02,
              "regen": 0.2
            },
            "healingBonus": 4
          },
          {
            "id": "complete",
            "name": "圆满",
            "source": {
              "task": "practice-zhuji",
              "on": "stage-complete"
            },
            "profile": {
              "blade": 6,
              "spell": 0.06,
              "defence": 0.03,
              "regen": 0.30000000000000004
            },
            "healingBonus": 6
          }
        ]
      },
      "jindan": {
        "task": "practice-jindan",
        "stages": [
          {
            "id": "middle",
            "name": "中期",
            "source": {
              "task": "practice-jindan",
              "on": "stage-middle"
            },
            "profile": {
              "blade": 3,
              "spell": 0.02,
              "defence": 0.01,
              "regen": 0.1
            },
            "healingBonus": 2
          },
          {
            "id": "late",
            "name": "后期",
            "source": {
              "task": "practice-jindan",
              "on": "stage-late"
            },
            "profile": {
              "blade": 6,
              "spell": 0.04,
              "defence": 0.02,
              "regen": 0.2
            },
            "healingBonus": 4
          },
          {
            "id": "complete",
            "name": "圆满",
            "source": {
              "task": "practice-jindan",
              "on": "stage-complete"
            },
            "profile": {
              "blade": 9,
              "spell": 0.06,
              "defence": 0.03,
              "regen": 0.30000000000000004
            },
            "healingBonus": 6
          }
        ]
      },
      "yuanying": {
        "task": "practice-yuanying",
        "stages": [
          {
            "id": "middle",
            "name": "中期",
            "source": {
              "task": "practice-yuanying",
              "on": "stage-middle"
            },
            "profile": {
              "blade": 4,
              "spell": 0.02,
              "defence": 0.01,
              "regen": 0.1
            },
            "healingBonus": 2
          },
          {
            "id": "late",
            "name": "后期",
            "source": {
              "task": "practice-yuanying",
              "on": "stage-late"
            },
            "profile": {
              "blade": 8,
              "spell": 0.04,
              "defence": 0.02,
              "regen": 0.2
            },
            "healingBonus": 4
          },
          {
            "id": "complete",
            "name": "圆满",
            "source": {
              "task": "practice-yuanying",
              "on": "stage-complete"
            },
            "profile": {
              "blade": 12,
              "spell": 0.06,
              "defence": 0.03,
              "regen": 0.30000000000000004
            },
            "healingBonus": 6
          }
        ]
      },
      "huashen": {
        "task": "practice-huashen",
        "stages": [
          {
            "id": "middle",
            "name": "中期",
            "source": {
              "task": "practice-huashen",
              "on": "stage-middle"
            },
            "profile": {
              "blade": 5,
              "spell": 0.02,
              "defence": 0.01,
              "regen": 0.1
            },
            "healingBonus": 2
          },
          {
            "id": "late",
            "name": "后期",
            "source": {
              "task": "practice-huashen",
              "on": "stage-late"
            },
            "profile": {
              "blade": 10,
              "spell": 0.04,
              "defence": 0.02,
              "regen": 0.2
            },
            "healingBonus": 4
          },
          {
            "id": "complete",
            "name": "圆满",
            "source": {
              "task": "practice-huashen",
              "on": "stage-complete"
            },
            "profile": {
              "blade": 15,
              "spell": 0.06,
              "defence": 0.03,
              "regen": 0.30000000000000004
            },
            "healingBonus": 6
          }
        ]
      },
      "heti": {
        "task": "practice-heti",
        "stages": [
          {
            "id": "middle",
            "name": "中期",
            "source": {
              "task": "practice-heti",
              "on": "stage-middle"
            },
            "profile": {
              "blade": 6,
              "spell": 0.02,
              "defence": 0.01,
              "regen": 0.1
            },
            "healingBonus": 2
          },
          {
            "id": "late",
            "name": "后期",
            "source": {
              "task": "practice-heti",
              "on": "stage-late"
            },
            "profile": {
              "blade": 12,
              "spell": 0.04,
              "defence": 0.02,
              "regen": 0.2
            },
            "healingBonus": 4
          },
          {
            "id": "complete",
            "name": "圆满",
            "source": {
              "task": "practice-heti",
              "on": "stage-complete"
            },
            "profile": {
              "blade": 18,
              "spell": 0.06,
              "defence": 0.03,
              "regen": 0.30000000000000004
            },
            "healingBonus": 6
          }
        ]
      },
      "dacheng": {
        "task": "practice-dacheng",
        "stages": [
          {
            "id": "middle",
            "name": "中期",
            "source": {
              "task": "practice-dacheng",
              "on": "stage-middle"
            },
            "profile": {
              "blade": 7,
              "spell": 0.02,
              "defence": 0.01,
              "regen": 0.1
            },
            "healingBonus": 2
          },
          {
            "id": "late",
            "name": "后期",
            "source": {
              "task": "practice-dacheng",
              "on": "stage-late"
            },
            "profile": {
              "blade": 14,
              "spell": 0.04,
              "defence": 0.02,
              "regen": 0.2
            },
            "healingBonus": 4
          },
          {
            "id": "complete",
            "name": "圆满",
            "source": {
              "task": "practice-dacheng",
              "on": "stage-complete"
            },
            "profile": {
              "blade": 21,
              "spell": 0.06,
              "defence": 0.03,
              "regen": 0.30000000000000004
            },
            "healingBonus": 6
          }
        ]
      }
    },
    "restSites": {
      "retreat-rest": {
        "map": "jindan-retreat",
        "objectId": "retreatRest",
        "title": "洞府段间调息",
        "detail": "在确认安全处停下来歇息，恢复气血与当前身体可用的灵力；不会补充符药、任务用料或奖励；功法调息与药物护持的剩余时间不变。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "jindan-preparation",
              "status": "claimed"
            }
          ],
          "any": []
        }
      },
      "north-rest": {
        "map": "beihuang-retreat",
        "objectId": "northKit",
        "title": "北荒试炼整备",
        "detail": "在确认安全处停下来歇息，恢复气血与当前身体可用的灵力；不会补充符药、任务用料或奖励；功法调息与药物护持的剩余时间不变。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "northbound-preparation",
              "status": "claimed"
            }
          ],
          "any": []
        }
      },
      "cliff-rest": {
        "map": "heart-cliff",
        "objectId": "cliffHeartPractice",
        "title": "守心崖安全调息",
        "detail": "在确认安全处停下来歇息，恢复气血与当前身体可用的灵力；不会补充符药、任务用料或奖励；功法调息与药物护持的剩余时间不变。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "heartcliff-inquiry",
              "status": "claimed"
            }
          ],
          "any": []
        }
      },
      "camp-rest": {
        "map": "alliance-camp",
        "objectId": "campFusionTrial",
        "title": "联军阵后休整",
        "detail": "在确认安全处停下来歇息，恢复气血与当前身体可用的灵力；不会补充符药、任务用料或奖励；功法调息与药物护持的剩余时间不变。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "alliance-muster",
              "status": "claimed"
            }
          ],
          "any": []
        }
      },
      "heaven-rest": {
        "map": "heaven-threshold",
        "objectId": "heavenTrialFocus",
        "title": "天门阵旁休整",
        "detail": "在确认安全处停下来歇息，恢复气血与当前身体可用的灵力；不会补充符药、任务用料或奖励；功法调息与药物护持的剩余时间不变。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "dacheng-preparation",
              "status": "claimed"
            }
          ],
          "any": []
        }
      },
      "demon-blood-rest": {
        "map": "demon-blood-cavern",
        "objectId": "demonTrialBook",
        "title": "血窟核验席调息",
        "detail": "在确认安全处停下来歇息，恢复气血与当前身体可用的灵力；不会补充符药、任务用料或奖励；功法调息与药物护持的剩余时间不变。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "demon-blood-preparation",
              "status": "claimed"
            }
          ],
          "any": []
        }
      },
      "tribes-rest": {
        "map": "demon-tribes",
        "objectId": "tribesAccount",
        "title": "部族公案旁休整",
        "detail": "在确认安全处停下来歇息，恢复气血与当前身体可用的灵力；不会补充符药、任务用料或奖励；功法调息与药物护持的剩余时间不变。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "demon-tribal-work",
              "status": "claimed"
            }
          ],
          "any": []
        }
      },
      "palace-rest": {
        "map": "demon-palace",
        "objectId": "palaceEdict",
        "title": "魔宫议事后休整",
        "detail": "在确认安全处停下来歇息，恢复气血与当前身体可用的灵力；不会补充符药、任务用料或奖励；功法调息与药物护持的剩余时间不变。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "demon-mother-legacy",
              "status": "claimed"
            }
          ],
          "any": []
        }
      },
      "ice-rest": {
        "map": "icefield-cavern",
        "objectId": "iceTablet",
        "title": "冰洞背风处调息",
        "detail": "在确认安全处停下来歇息，恢复气血与当前身体可用的灵力；不会补充符药、任务用料或奖励；功法调息与药物护持的剩余时间不变。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "enlighten-entry",
              "status": "claimed"
            }
          ],
          "any": []
        }
      },
      "summit-rest": {
        "map": "golden-summit",
        "objectId": "enlightenPublicBench",
        "title": "金顶护证席休整",
        "detail": "在确认安全处停下来歇息，恢复气血与当前身体可用的灵力；不会补充符药、任务用料或奖励；功法调息与药物护持的剩余时间不变。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "enlighten-compiled-case",
              "status": "claimed"
            }
          ],
          "any": []
        }
      },
      "vault-rest": {
        "map": "sword-vault",
        "objectId": "vaultOath",
        "title": "剑冢誓案旁调息",
        "detail": "在确认安全处停下来歇息，恢复气血与当前身体可用的灵力；不会补充符药、任务用料或奖励；功法调息与药物护持的剩余时间不变。",
        "requires": {
          "all": [
            {
              "type": "task",
              "id": "enlighten-personal-farewell",
              "status": "claimed"
            }
          ],
          "any": []
        }
      }
    }
  }
};
const copy=value=>JSON.parse(JSON.stringify(value));
function extend(data){
 if(!data||data.revision!==4)throw Error('M6-B requires released revision4 data');
 if(data.cultivationStages||data.restSites)throw Error('M6-B fields already exist');
 for(const[key,table]of Object.entries(patch.tables))for(const id of Object.keys(table))if(!data[key]||Object.prototype.hasOwnProperty.call(data[key],id))throw Error('M6-B definition collision '+key+'/'+id);
 for(const id of Object.keys(patch.recommendations))if(!data.tasks[id]||data.tasks[id].recommendedPractice)throw Error('M6-B recommendation source changed '+id);
 for(const[key,table]of Object.entries(patch.tables))Object.assign(data[key],copy(table));
 for(const[id,value]of Object.entries(patch.recommendations))data.tasks[id].recommendedPractice=copy(value);
 Object.assign(data,copy(patch.fields));return data;
}
extend.provenance={
  "baselineCommit": "67c5395e8e0dc36171d05348fb0225e549c84601",
  "baseFingerprint": "a522235789319b1db8d82154c3e26d6f2f77efa52374cf67613a7e8c0cf08abe",
  "baselineSourceHashes": {
    "src/campaign-data.js": "fb3f8b423468bed161d749f3ee6dc0da2fc646b900701aa6c660750611123474",
    "src/data.js": "5448dc147634a8b553961a714c25f4978966be97b7313bc4fda5575b285470b0",
    "src/campaign-branches-data.js": "b361687c4c3476ea6efd22fd9a4ab947a72be373a25e71fa96f1713df9211bf3"
  },
  "originalAnchorAuditSha256": "5b5603fb067aa36ed0206e7c4c15407b4084e5781cec1dc476d2257022739782",
  "inputHashes": {
    "build-practice-data.cjs": "ce85eb3aa29610a399ccaf314b28a737d07f4043c2f95bdac55d0bd81b8e23dd",
    "author-helpers.cjs": "052da35063cbece88db8fda1490be0b6c8af99ebf0d036e87aed53a084f5d9e4",
    "practice-qualifications.cjs": "ff15885d9a93c8d066815e0b8589038705ebcfd55d2d5e7afb72f74f06e05ca0",
    "data-cultivation.cjs": "cfec62c89ab21a4fd01066039b047961aae4f8c5afadc303f6bbab55e6aefd00",
    "data-rest-sites.cjs": "eed89c8b18b86e3b0af97f3d10d68df45a47c103406dd034f670a1980a7cf4b5"
  }
};
if(typeof module==='object'&&module.exports)module.exports=extend;else root.XiuxianCampaignM6Data=extend;
})(globalThis);
