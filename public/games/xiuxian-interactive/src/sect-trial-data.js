'use strict'

// 门内比试（S2）：收力的同门切磋，作为门内选拔的第一步。
// 只做已验证的范围：真实战术对局 + 逐次记录；对手是未具名的同门，不新增人物、不改经济数值。

;(function (root, node) {
  const TRIAL = {
    id: 'sectSparring',
    schema: 1,
    title: '门内比试',
    map: 'garden',
    place: '药庐庭院',
    intro: '同门在庭院收力切磋：只比招法与分寸，不伤性命。胜负按实际气血与回合结算，输了回息再报试。',
    rewardNote: '比试不赠物资，也不改宗门贡献账；入选名额只记门内档案。',
    foes: [
      { id: 'sparring_blade', name: '执剑同门', kind: 'stone', x: 930, y: 470, maxHp: 132, speed: 62, damage: 9 },
      { id: 'sparring_staff', name: '持杖同门', kind: 'sprite', x: 1080, y: 470, maxHp: 108, speed: 54, damage: 7 },
    ],
    maxAttempts: 999,
    source: '门内比试为门内选拔第一段；赴会、赛事与返宗的路线仍待核定，不在此处实装。',
  }
  const F = TRIAL.foes
  const ids = F.map(f => f.id)
  TRIAL.foeIds = ids

  if (node) module.exports = TRIAL
  else root.XiuxianSectTrialData = TRIAL
})(globalThis, typeof module !== 'undefined' && module.exports)
