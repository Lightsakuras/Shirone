(function(root,factory){'use strict';const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.XiuxianCampaignM6Combat=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){'use strict';
  const declaration={
  "revision": 6,
  "sourceCommit": "dec8287dfa0f0d1423f59cee2e2e912d3ab36cad",
  "budgets": {
    "jindan-tribulation": {
      "sourceId": "jindan-tribulation",
      "task": "jindan-tribulation",
      "realm": "zhuji",
      "hp": 650,
      "damage": 12,
      "armor": {
        "maxArmor": 100
      },
      "encounters": [
        "jindan-thunder-first",
        "jindan-heart-trial",
        "jindan-core-stable"
      ]
    },
    "yuanying-breakthrough": {
      "sourceId": "yuanying-breakthrough",
      "task": "yuanying-breakthrough",
      "realm": "jindan",
      "hp": 1200,
      "damage": 18,
      "armor": {
        "maxArmor": 200
      },
      "encounters": [
        "fight-yuanying-outer-thunder",
        "fight-yuanying-life-trial"
      ]
    },
    "demon-yuanying-trial": {
      "sourceId": "demon-yuanying-trial",
      "task": "demon-yuanying-trial",
      "realm": "jindan",
      "hp": 1200,
      "damage": 18,
      "armor": {
        "maxArmor": 200
      },
      "encounters": [
        "demon-yuanying-trial-first-encounter",
        "demon-yuanying-trial-second-encounter"
      ]
    },
    "enlighten-yuanying-trial": {
      "sourceId": "enlighten-yuanying-trial",
      "task": "enlighten-yuanying-trial",
      "realm": "jindan",
      "hp": 1200,
      "damage": 18,
      "armor": {
        "maxArmor": 200
      },
      "encounters": [
        "enlighten-yuanying-trial-first-encounter",
        "enlighten-yuanying-trial-second-encounter"
      ]
    },
    "huashen-breakthrough": {
      "sourceId": "huashen-breakthrough",
      "task": "huashen-breakthrough",
      "realm": "yuanying",
      "hp": 1800,
      "damage": 22,
      "armor": {
        "maxArmor": 300
      },
      "encounters": [
        "fight-xuanji-first-stand",
        "fight-huashen-heart-trial"
      ]
    },
    "demon-huashen-trial": {
      "sourceId": "demon-huashen-trial",
      "task": "demon-huashen-trial",
      "realm": "yuanying",
      "hp": 1800,
      "damage": 22,
      "armor": {
        "maxArmor": 300
      },
      "encounters": [
        "demon-huashen-trial-first-encounter",
        "demon-huashen-trial-second-encounter"
      ]
    },
    "enlighten-huashen-trial": {
      "sourceId": "enlighten-huashen-trial",
      "task": "enlighten-huashen-trial",
      "realm": "yuanying",
      "hp": 1800,
      "damage": 22,
      "armor": {
        "maxArmor": 300
      },
      "encounters": [
        "enlighten-huashen-trial-first-encounter",
        "enlighten-huashen-trial-second-encounter"
      ]
    },
    "heti-breakthrough": {
      "sourceId": "heti-breakthrough",
      "task": "heti-breakthrough",
      "realm": "huashen",
      "hp": 2400,
      "damage": 26,
      "armor": {
        "maxArmor": 440
      },
      "encounters": [
        "fight-heti-separation",
        "fight-heti-unity"
      ]
    },
    "demon-heti-trial": {
      "sourceId": "demon-heti-trial",
      "task": "demon-heti-trial",
      "realm": "huashen",
      "hp": 2400,
      "damage": 26,
      "armor": {
        "maxArmor": 440
      },
      "encounters": [
        "demon-heti-trial-first-encounter",
        "demon-heti-trial-second-encounter"
      ]
    },
    "enlighten-heti-trial": {
      "sourceId": "enlighten-heti-trial",
      "task": "enlighten-heti-trial",
      "realm": "huashen",
      "hp": 2400,
      "damage": 26,
      "armor": {
        "maxArmor": 440
      },
      "encounters": [
        "enlighten-heti-trial-first-encounter",
        "enlighten-heti-trial-second-encounter"
      ]
    },
    "dacheng-breakthrough": {
      "sourceId": "dacheng-breakthrough",
      "task": "dacheng-breakthrough",
      "realm": "heti",
      "hp": 3200,
      "damage": 30,
      "armor": {
        "maxArmor": 640
      },
      "encounters": [
        "fight-dacheng-immortal",
        "fight-dacheng-demon",
        "fight-dacheng-living"
      ]
    },
    "demon-dacheng-trial": {
      "sourceId": "demon-dacheng-trial",
      "task": "demon-dacheng-trial",
      "realm": "heti",
      "hp": 3200,
      "damage": 30,
      "armor": {
        "maxArmor": 640
      },
      "encounters": [
        "demon-dacheng-trial-first-encounter",
        "demon-dacheng-trial-second-encounter"
      ]
    },
    "enlighten-dacheng-trial": {
      "sourceId": "enlighten-dacheng-trial",
      "task": "enlighten-dacheng-trial",
      "realm": "heti",
      "hp": 3200,
      "damage": 30,
      "armor": {
        "maxArmor": 640
      },
      "encounters": [
        "enlighten-dacheng-trial-first-encounter",
        "enlighten-dacheng-trial-second-encounter"
      ]
    }
  },
  "encounters": [
    {
      "id": "jindan-thunder-first",
      "action": "fight-thunder-first",
      "sourceId": "jindan-tribulation",
      "enemies": [
        {
          "id": "thunder_stone",
          "armorKind": "sentinel"
        },
        {
          "id": "thunder_wisp",
          "armorKind": "keeper"
        }
      ]
    },
    {
      "id": "jindan-heart-trial",
      "action": "fight-heart-trial",
      "sourceId": "jindan-tribulation",
      "enemies": [
        {
          "id": "heart_left",
          "armorKind": "sentinel"
        },
        {
          "id": "heart_right",
          "armorKind": "keeper"
        }
      ]
    },
    {
      "id": "jindan-core-stable",
      "action": "fight-core-stable",
      "sourceId": "jindan-tribulation",
      "enemies": [
        {
          "id": "core_thunder",
          "armorKind": "sentinel"
        },
        {
          "id": "core_wisp",
          "armorKind": "keeper"
        }
      ]
    },
    {
      "id": "fight-yuanying-outer-thunder",
      "action": "fight-yuanying-outer-thunder",
      "sourceId": "yuanying-breakthrough",
      "enemies": [
        {
          "id": "fight-yuanying-outer-thunder-enemy-0",
          "armorKind": "sentinel"
        },
        {
          "id": "fight-yuanying-outer-thunder-enemy-1",
          "armorKind": "keeper"
        }
      ]
    },
    {
      "id": "fight-yuanying-life-trial",
      "action": "fight-yuanying-life-trial",
      "sourceId": "yuanying-breakthrough",
      "enemies": [
        {
          "id": "fight-yuanying-life-trial-enemy-0",
          "armorKind": "sentinel"
        },
        {
          "id": "fight-yuanying-life-trial-enemy-1",
          "armorKind": "keeper"
        }
      ]
    },
    {
      "id": "demon-yuanying-trial-first-encounter",
      "action": "demon-yuanying-trial-first",
      "sourceId": "demon-yuanying-trial",
      "enemies": [
        {
          "id": "demon-yuanying-trial-one",
          "armorKind": "sentinel"
        }
      ]
    },
    {
      "id": "demon-yuanying-trial-second-encounter",
      "action": "demon-yuanying-trial-second",
      "sourceId": "demon-yuanying-trial",
      "enemies": [
        {
          "id": "demon-yuanying-trial-two",
          "armorKind": "sentinel"
        }
      ]
    },
    {
      "id": "enlighten-yuanying-trial-first-encounter",
      "action": "enlighten-yuanying-trial-first",
      "sourceId": "enlighten-yuanying-trial",
      "enemies": [
        {
          "id": "enlighten-yuanying-trial-mind",
          "armorKind": "sentinel"
        }
      ]
    },
    {
      "id": "enlighten-yuanying-trial-second-encounter",
      "action": "enlighten-yuanying-trial-second",
      "sourceId": "enlighten-yuanying-trial",
      "enemies": [
        {
          "id": "enlighten-yuanying-trial-thunder",
          "armorKind": "sentinel"
        }
      ]
    },
    {
      "id": "fight-xuanji-first-stand",
      "action": "fight-xuanji-first-stand",
      "sourceId": "huashen-breakthrough",
      "enemies": [
        {
          "id": "fight-xuanji-first-stand-enemy-0",
          "armorKind": "sentinel"
        }
      ]
    },
    {
      "id": "fight-huashen-heart-trial",
      "action": "fight-huashen-heart-trial",
      "sourceId": "huashen-breakthrough",
      "enemies": [
        {
          "id": "fight-huashen-heart-trial-enemy-0",
          "armorKind": "sentinel"
        },
        {
          "id": "fight-huashen-heart-trial-enemy-1",
          "armorKind": "keeper"
        }
      ]
    },
    {
      "id": "demon-huashen-trial-first-encounter",
      "action": "demon-huashen-trial-first",
      "sourceId": "demon-huashen-trial",
      "enemies": [
        {
          "id": "demon-huashen-trial-one",
          "armorKind": "sentinel"
        }
      ]
    },
    {
      "id": "demon-huashen-trial-second-encounter",
      "action": "demon-huashen-trial-second",
      "sourceId": "demon-huashen-trial",
      "enemies": [
        {
          "id": "demon-huashen-trial-two",
          "armorKind": "sentinel"
        }
      ]
    },
    {
      "id": "enlighten-huashen-trial-first-encounter",
      "action": "enlighten-huashen-trial-first",
      "sourceId": "enlighten-huashen-trial",
      "enemies": [
        {
          "id": "enlighten-huashen-trial-mind",
          "armorKind": "sentinel"
        }
      ]
    },
    {
      "id": "enlighten-huashen-trial-second-encounter",
      "action": "enlighten-huashen-trial-second",
      "sourceId": "enlighten-huashen-trial",
      "enemies": [
        {
          "id": "enlighten-huashen-trial-thunder",
          "armorKind": "sentinel"
        }
      ]
    },
    {
      "id": "fight-heti-separation",
      "action": "fight-heti-separation",
      "sourceId": "heti-breakthrough",
      "enemies": [
        {
          "id": "fight-heti-separation-enemy-0",
          "armorKind": "sentinel"
        },
        {
          "id": "fight-heti-separation-enemy-1",
          "armorKind": "keeper"
        }
      ]
    },
    {
      "id": "fight-heti-unity",
      "action": "fight-heti-unity",
      "sourceId": "heti-breakthrough",
      "enemies": [
        {
          "id": "fight-heti-unity-enemy-0",
          "armorKind": "sentinel"
        },
        {
          "id": "fight-heti-unity-enemy-1",
          "armorKind": "keeper"
        }
      ]
    },
    {
      "id": "demon-heti-trial-first-encounter",
      "action": "demon-heti-trial-first",
      "sourceId": "demon-heti-trial",
      "enemies": [
        {
          "id": "demon-heti-trial-one",
          "armorKind": "sentinel"
        }
      ]
    },
    {
      "id": "demon-heti-trial-second-encounter",
      "action": "demon-heti-trial-second",
      "sourceId": "demon-heti-trial",
      "enemies": [
        {
          "id": "demon-heti-trial-two",
          "armorKind": "sentinel"
        }
      ]
    },
    {
      "id": "enlighten-heti-trial-first-encounter",
      "action": "enlighten-heti-trial-first",
      "sourceId": "enlighten-heti-trial",
      "enemies": [
        {
          "id": "enlighten-heti-trial-mind",
          "armorKind": "sentinel"
        }
      ]
    },
    {
      "id": "enlighten-heti-trial-second-encounter",
      "action": "enlighten-heti-trial-second",
      "sourceId": "enlighten-heti-trial",
      "enemies": [
        {
          "id": "enlighten-heti-trial-thunder",
          "armorKind": "sentinel"
        }
      ]
    },
    {
      "id": "fight-dacheng-immortal",
      "action": "fight-dacheng-immortal",
      "sourceId": "dacheng-breakthrough",
      "enemies": [
        {
          "id": "fight-dacheng-immortal-enemy-0",
          "armorKind": "sentinel"
        },
        {
          "id": "fight-dacheng-immortal-enemy-1",
          "armorKind": "keeper"
        }
      ]
    },
    {
      "id": "fight-dacheng-demon",
      "action": "fight-dacheng-demon",
      "sourceId": "dacheng-breakthrough",
      "enemies": [
        {
          "id": "fight-dacheng-demon-enemy-0",
          "armorKind": "sentinel"
        },
        {
          "id": "fight-dacheng-demon-enemy-1",
          "armorKind": "keeper"
        }
      ]
    },
    {
      "id": "fight-dacheng-living",
      "action": "fight-dacheng-living",
      "sourceId": "dacheng-breakthrough",
      "enemies": [
        {
          "id": "fight-dacheng-living-enemy-0",
          "armorKind": "sentinel"
        },
        {
          "id": "fight-dacheng-living-enemy-1",
          "armorKind": "keeper"
        }
      ]
    },
    {
      "id": "demon-dacheng-trial-first-encounter",
      "action": "demon-dacheng-trial-first",
      "sourceId": "demon-dacheng-trial",
      "enemies": [
        {
          "id": "demon-dacheng-trial-one",
          "armorKind": "sentinel"
        }
      ]
    },
    {
      "id": "demon-dacheng-trial-second-encounter",
      "action": "demon-dacheng-trial-second",
      "sourceId": "demon-dacheng-trial",
      "enemies": [
        {
          "id": "demon-dacheng-trial-two",
          "armorKind": "sentinel"
        }
      ]
    },
    {
      "id": "enlighten-dacheng-trial-first-encounter",
      "action": "enlighten-dacheng-trial-first",
      "sourceId": "enlighten-dacheng-trial",
      "enemies": [
        {
          "id": "enlighten-dacheng-trial-mind",
          "armorKind": "sentinel"
        }
      ]
    },
    {
      "id": "enlighten-dacheng-trial-second-encounter",
      "action": "enlighten-dacheng-trial-second",
      "sourceId": "enlighten-dacheng-trial",
      "enemies": [
        {
          "id": "enlighten-dacheng-trial-thunder",
          "armorKind": "sentinel"
        }
      ]
    }
  ]
};

  function share(total,index,count){return Math.floor(total/count)+(index<total%count?1:0);}
  function apply(data){
    if(data.revision!==5)throw Error('M6-C requires the final B revision5 definition');
    if(data.combatBudgets!==undefined)throw Error('M6-C combat budget definition collision');
    const seen=new Set();
    // Check every anchor before mutating the caller's data.
    for(const row of declaration.encounters){
      const action=data.actions[row.action],encounter=data.encounters[row.id],budget=declaration.budgets[row.sourceId];
      if(!action||action.kind!=='battle'||action.task!==budget.task||action.encounter!==row.id||!encounter||encounter.enemies.length!==row.enemies.length||seen.has(row.id))throw Error('M6-C static encounter anchor: '+row.id);
      if(encounter.enemies.some((enemy,index)=>enemy.id!==row.enemies[index].id))throw Error('M6-C ordered enemy anchor: '+row.id);
      seen.add(row.id);
    }
    data.combatBudgets=JSON.parse(JSON.stringify(declaration.budgets));
    for(const row of declaration.encounters){
      const encounter=data.encounters[row.id],budget=data.combatBudgets[row.sourceId],count=row.enemies.length;
      encounter.budgetSource=row.sourceId;
      encounter.enemies.forEach((enemy,index)=>{enemy.maxHp=share(budget.hp,index,count);enemy.damage=Math.round(budget.damage/Math.sqrt(count));enemy.armor={kind:row.enemies[index].armorKind,maxArmor:share(budget.armor.maxArmor,index,count)};});
    }
    data.revision=declaration.revision;
    return data;
  }
  return {declaration,apply};
});
