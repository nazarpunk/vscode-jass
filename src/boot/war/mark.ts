import * as fs from "fs";
import * as path from "path";

/**
 * 种类
 */
enum Kind {
    Unit = 0x00,
    Item = 0x10,
    Destructible = 0x20,
    Ornament = 0x30,
    Ability = 0x40,
    Buff = 0x50,
    Technology = 0x60,
}

/**
 * 转换kind为可读字符串
 * @param {Kind} kind
 * @returns {string}
 */
const kindToString = (kind: Kind) => {
    switch (kind) {
        case Kind.Unit:
            return "单位";
        case Kind.Item:
            return "物品";
        case Kind.Destructible:
            return "可破坏物";
        case Kind.Ornament:
            return "地形";
        case Kind.Ability:
            return "技能";
        case Kind.Buff:
            return "状态效果";
        case Kind.Technology:
            return "科技树";
        default:
            return "";
    }
};

/**
 * 种族
 */
enum Race {
    /**
     * 人族
     */
    Human = 0x00,
    /**
     * 兽族
     */
    Orc = 0x10,
    /**
     * 暗夜精灵
     */
    NightElf = 0x20,
    /**
     * 不死族
     */
    Undead = 0x30,
    /**
     * 娜伽
     */
    Naga = 0x40,
    /**
     * 中立敌对
     */
    NeutralHostile = 0x50,
    /**
     * 中立被动
     */
    NeutralPassive = 0x60,
    /**
     * 特殊
     */
    Special = 0x70,
}

/**
 * 转换race为可读字符串
 * @param {Race} race
 * @returns {string}
 */
const raceToString = (race: Race) => {
    switch (race) {
        case Race.Human:
            return "人族";
        case Race.Orc:
            return "兽族";
        case Race.NightElf:
            return "暗夜精灵";
        case Race.Undead:
            return "不死族";
        case Race.Naga:
            return "娜伽";
        case Race.NeutralHostile:
            return "中立被动";
        case Race.NeutralPassive:
            return "中立敌对";
        case Race.Special:
            return "特殊";
        default:
            return "";
    }
};

/**
 * 类型
 */
enum Type {
    Unit = 0x00,
    Architecture = 0x10,
    Hero = 0x20,
    Special = 0x30,
    Item = 0x40
}

/**
 * 转换type为可读字符串
 * @param {Type} type
 * @returns {string}
 */
const typeToString = (type: Type) => {
    switch (type) {
        case Type.Unit:
            return "单位";
        case Type.Architecture:
            return "建筑";
        case Type.Hero:
            return "英雄";
        case Type.Special:
            return "特殊";
        case Type.Item:
            return "物品";
        default:
            return "";
    }
};

const unitHuman = {
    "hpea": {
        code: "hpea",
        name: "农民",
        tip: "人族的基本工作单位，能采集金矿和木材还能建造和修理建筑物。紧急情况之下还可以变成民兵。能攻击地面单位和树木。",
        kind: Kind.Unit, race: Race.Human, type: Type.Unit
    },
    "hfoo": {
        code: "hfoo",
        name: "步兵",
        tip: "步兵能学习到防御模式技能。能攻击地面单位。",
        kind: Kind.Unit, race: Race.Human, type: Type.Unit
    },
    "hkni": {
        code: "hkni",
        name: "骑士",
        tip: "强大的地面单位，能学到训兽术。能攻击地面单位。",
        kind: Kind.Unit, race: Race.Human, type: Type.Unit
    },
    "hrif": {
        code: "hrif",
        name: "矮人火炮手",
        tip: "非常适合于对付敌人的空中单位，还能获得长管火枪的升级。能攻击地面和空中单位。",
        kind: Kind.Unit, race: Race.Human, type: Type.Unit
    },
    "hmtm": {
        code: "hmtm",
        name: "迫击炮小队",
        tip: "远距离攻城单位，对付建筑物特别地有效，但是速度很慢很容易遭受敌人的近身攻击。还能获得照明弹和碎片攻击技能。能攻击地面单位和树木。",
        kind: Kind.Unit, race: Race.Human, type: Type.Unit
    },
    "hgyr": {
        code: "hgyr",
        name: "飞行机器",
        tip: "快速移动的飞行机器，能出色地完成侦察任务也能有效地抵抗敌人的空中单位，能获得飞行机器炸弹和高射炮火的升级。能看见隐形单位。能攻击空中单位。",
        kind: Kind.Unit, race: Race.Human, type: Type.Unit
    },
    "hgry": {
        code: "hgry",
        name: "狮鹫骑士",
        tip: "威力巨大的飞行单位，狮鹫上面骑乘着一个矮人族的锤手。能学到风暴战锤技能。能攻击地面和空中单位。",
        kind: Kind.Unit, race: Race.Human, type: Type.Unit
    },
    "hmpr": {
        code: "hmpr",
        name: "牧师",
        tip: "一开始就拥有强大的医疗能力，随后还能学习到驱逐魔法和心灵之火这两项技能。能攻击地面和空中单位。",
        kind: Kind.Unit, race: Race.Human, type: Type.Unit
    },
    "hsor": {
        code: "hsor",
        name: "女巫",
        tip: "一开始能施放减慢敌人移动和进攻速度的减速魔法，随后还能学习到隐形术和变形术。能攻击地面和空中单位。",
        kind: Kind.Unit, race: Race.Human, type: Type.Unit
    },
    "hmtt": {
        code: "hmtt",
        name: "蒸汽机车",
        tip: "重型装甲车辆，特别擅长于对付敌人的建筑物。升级之后可以拥有弹幕攻击能力。能攻击建筑物。",
        kind: Kind.Unit, race: Race.Human, type: Type.Unit
    },
    "hspt": {
        code: "hspt",
        name: "魔法破坏者",
        tip: "精灵族的英勇战士，被训练来消灭法师。初始技能为魔法盗取，可以操纵魔法效果为你所用，还有魔法免疫和反馈技能，也可以学会控制魔法。能攻击地面单位。",
        kind: Kind.Unit, race: Race.Human, type: Type.Unit
    },
    "hdhw": {
        code: "hdhw",
        name: "龙鹰骑士",
        tip: "动作敏捷的飞行单位，骑乘一位精灵族战士。拥有空中锁镣技能，可以暂时禁锢和残废敌空中单位。可以学习到训兽术和乌云技能。能攻击地面和空中单位。",
        kind: Kind.Unit, race: Race.Human, type: Type.Unit
    },
    "htow": {
        code: "htow",
        name: "城镇大厅",
        tip: "基本建筑物，用来训练农民和存贮搜集到的资源，在升级到了主城和城堡之后能让玩家建造许多新的建筑物和单位。",
        kind: Kind.Unit, race: Race.Human, type: Type.Architecture
    },
    "hkee": {
        code: "hkee",
        name: "主城",
        tip: "升级到主城之后能使玩家建造许多新的建筑物和单位。",
        kind: Kind.Unit, race: Race.Human, type: Type.Architecture
    },
    "hcas": {
        code: "hcas",
        name: "城堡",
        tip: "升级到城堡之后能使玩家建造许多新的建筑物和单位。",
        kind: Kind.Unit, race: Race.Human, type: Type.Architecture
    },
    "hhou": {
        code: "hhou",
        name: "农场",
        tip: "提供人口，增加可造单位数量的最大值。",
        kind: Kind.Unit, race: Race.Human, type: Type.Architecture
    },
    "halt": {
        code: "halt",
        name: "国王祭坛",
        tip: "召唤新的英雄或者复活死去的英雄。",
        kind: Kind.Unit, race: Race.Human, type: Type.Architecture
    },
    "hbar": {
        code: "hbar",
        name: "兵营",
        tip: "最基本的产兵建筑物。能训练出人族的步兵，矮人火枪手和骑士。步兵的防御模式，矮人火枪手的长管火枪以及训兽术也都是在这里进行研究的。",
        kind: Kind.Unit, race: Race.Human, type: Type.Architecture
    },
    "hlum": {
        code: "hlum",
        name: "伐木场",
        tip: "能储存采集到的木材。还包括对伐木效率和石工技术的研究。",
        kind: Kind.Unit, race: Race.Human, type: Type.Architecture
    },
    "hbla": {
        code: "hbla",
        name: "铁匠铺",
        tip: "能对护甲，武器和火药进行升级。",
        kind: Kind.Unit, race: Race.Human, type: Type.Architecture
    },
    "harm": {
        code: "harm",
        name: "车间",
        tip: "能生产出蒸汽机车、迫击炮小队和飞行机器。并且包括对照明弹、碎片攻击、弹幕攻击、飞行机器炸弹和高射炮火的升级。",
        kind: Kind.Unit, race: Race.Human, type: Type.Architecture
    },
    "hars": {
        code: "hars",
        name: "神秘圣地",
        tip: "能训练出牧师，女巫，魔法破坏者。还包括对牧师，女巫的魔法技能升级，控制魔法的技能升级。使得人族的防御塔具有探测隐形单位能力的魔法岗哨也是在这里进行研究的。",
        kind: Kind.Unit, race: Race.Human, type: Type.Architecture
    },
    "hgra": {
        code: "hgra",
        name: "狮鹫笼",
        tip: "能训练出狮鹫骑士和龙鹰骑士。还包括对风暴战锤和乌云技能的研究。",
        kind: Kind.Unit, race: Race.Human, type: Type.Architecture
    },
    "hwtw": {
        code: "hwtw",
        name: "哨塔",
        tip: "基本的侦察型建筑物，能升级到炮塔或者防御塔，还能学习到魔法岗哨技能。",
        kind: Kind.Unit, race: Race.Human, type: Type.Architecture
    },
    "hgtw": {
        code: "hgtw",
        name: "防御塔",
        tip: "基本的防守型建筑物，能学习到魔法岗哨技能。能攻击地面和空中单位。",
        kind: Kind.Unit, race: Race.Human, type: Type.Architecture
    },
    "hctw": {
        code: "hctw",
        name: "炮塔",
        tip: "重型的防御性建筑物，对付成群结队的敌人尤为有效。还能学到魔法岗哨技能。能攻击地面单位和树木。",
        kind: Kind.Unit, race: Race.Human, type: Type.Architecture
    },
    "hatw": {
        code: "hatw",
        name: "神秘之塔",
        tip: "魔法防御塔。对于敌人的英雄和魔法施放者特别有效。有魔法回应技能，使它的攻击能够破坏魔法值，破坏的量与攻击的伤害相同。可以学习魔法哨兵技能。攻击地面和空中单位。",
        kind: Kind.Unit, race: Race.Human, type: Type.Architecture
    },
    "hvlt": {
        code: "hvlt",
        name: "神秘藏宝室",
        tip: "建造一个出售物品的商店。可供购买的物品的种类取决于你的城镇大厅的升级情况(城镇大厅，主城或者城堡)以及你所拥有的建筑物种类。",
        kind: Kind.Unit, race: Race.Human, type: Type.Architecture
    },
    "Hpal": {
        code: "Hpal",
        name: "圣骑士",
        tip: "战士型英雄，特别擅长于保护自己周围的部队，能学习到神圣之光，神圣护甲，专注光环和复活这四项技能。能攻击地面单位。",
        kind: Kind.Unit, race: Race.Human, type: Type.Hero
    },
    "Hamg": {
        code: "Hamg",
        name: "大魔法师",
        tip: "一位神秘的英雄，特别擅长于远程攻击。他能学到暴风雪，召唤水元素，辉煌光环和群体传送魔法。能攻击地面和空中单位。",
        kind: Kind.Unit, race: Race.Human, type: Type.Hero
    },
    "Hmkg": {
        code: "Hmkg",
        name: "山丘之王",
        tip: "战士型英雄，特别擅长于冲锋陷阵。能学习到风暴之锤、雷霆一击、重击和天神下凡。能攻击地面单位。",
        kind: Kind.Unit, race: Race.Human, type: Type.Hero
    },
    "Hblm": {
        code: "Hblm",
        name: "血魔法师",
        tip: "一位神秘的英雄，擅长于控制魔法能量和远程攻击。能学习到烈焰风暴、驱散、吸魔和火凤凰这四项技能。能攻击地面和空中单位。",
        kind: Kind.Unit, race: Race.Human, type: Type.Hero
    },
    "hpxe": {
        code: "hpxe",
        name: "凤凰蛋",
        tip: "",
        kind: Kind.Unit, race: Race.Human, type: Type.Special
    },
    "hrtt": {
        code: "hrtt",
        name: "蒸汽机车",
        tip: "重型装甲车辆，特别擅长于对付敌人的建筑物。拥有弹幕攻击技能从而可以对敌人的空中单位进行攻击。能攻击建筑物。",
        kind: Kind.Unit, race: Race.Human, type: Type.Special
    },
    "hmil": {
        code: "hmil",
        name: "民兵",
        tip: "农民相应战斗号召跑到最近的一个城镇大厅转变成民兵。",
        kind: Kind.Unit, race: Race.Human, type: Type.Special
    },
    "hwat": {
        code: "hwat",
        name: "水元素",
        tip: "等级一",
        kind: Kind.Unit, race: Race.Human, type: Type.Special
    },
    "hwt2": {
        code: "hwt2",
        name: "水元素",
        tip: "等级二",
        kind: Kind.Unit, race: Race.Human, type: Type.Special
    },
    "hwt3": {
        code: "hwt3",
        name: "水元素",
        tip: "等级三",
        kind: Kind.Unit, race: Race.Human, type: Type.Special
    },
    "hphx": {
        code: "hphx",
        name: "火凤凰",
        tip: "",
        kind: Kind.Unit, race: Race.Human, type: Type.Special
    },
    "hrdh": {code: "hrdh", name: "背负背包的马", tip: "", kind: Kind.Unit, race: Race.Human, type: Type.Unit},
    "hbew": {code: "hbew", name: "车", tip: "", kind: Kind.Unit, race: Race.Human, type: Type.Unit},
    "nhew": {
        code: "nhew",
        name: "工人(血精灵)",
        tip: "基本的工人单位。能建造建筑物和进行修理。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Unit
    },
    "njks": {code: "njks", name: "监狱小卒", tip: "", kind: Kind.Unit, race: Race.Human, type: Type.Unit},
    "hhal": {code: "hhal", name: "(无人之马", tip: "", kind: Kind.Unit, race: Race.Human, type: Type.Unit},
    "nbee": {
        code: "nbee",
        name: "血精灵工程师",
        tip: "极度聪慧的血精灵在发明新的技术和打造强大的防御塔方面极为擅长。攻击地面单位和树木。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Unit
    },
    "nbel": {
        code: "nbel",
        name: "血精灵中尉",
        tip: "来自于强大的卡尔省血精灵军队的中尉。破坏魔法施放单位的专家。攻击地面单位",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Unit
    },
    "hhes": {
        code: "hhes",
        name: "剑士",
        tip: "多才多艺的步兵战士。能学习到防御技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Unit
    },
    "heth": {code: "heth", name: "船长", tip: "", kind: Kind.Unit, race: Race.Human, type: Type.Unit},
    "hbot": {
        code: "hbot",
        name: "人族运输船",
        tip: "大型的海上船只，能携带单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Unit
    },
    "hdes": {
        code: "hdes",
        name: "人族护卫舰",
        tip: "多功能的攻击舰。擅长于攻击空中单位。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Unit
    },
    "hbsh": {
        code: "hbsh",
        name: "人族战舰",
        tip: "强大的舰船，能够有效地攻击地面建筑物。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Unit
    },
    "nemi": {
        code: "nemi",
        name: "使者",
        tip: "基本的远程攻击单位。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Unit
    },
    "nhef": {code: "nhef", name: "高等精灵(女性)", tip: "", kind: Kind.Unit, race: Race.Human, type: Type.Unit},
    "nhem": {code: "nhem", name: "高等精灵(男性)", tip: "", kind: Kind.Unit, race: Race.Human, type: Type.Unit},
    "nhea": {code: "nhea", name: "弓箭手", tip: "", kind: Kind.Unit, race: Race.Human, type: Type.Unit},
    "nmed": {code: "nmed", name: "麦迪文", tip: "", kind: Kind.Unit, race: Race.Human, type: Type.Unit},
    "nser": {code: "nser", name: "西里诺克斯", tip: "", kind: Kind.Unit, race: Race.Human, type: Type.Unit},
    "nchp": {
        code: "nchp",
        name: "牧师",
        tip: "支持性的魔法单位。能施放医疗，驱逐魔法和心灵之火技能。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Unit
    },
    "nhym": {
        code: "nhym",
        name: "术士",
        tip: "多才多艺的魔法单位。能施放减速，冲击波和变形魔法。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Unit
    },
    "nws1": {
        code: "nws1",
        name: "龙鹰",
        tip: "重型的远程攻击单位，能诱捕敌方单位。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Unit
    },
    "nitb": {
        code: "nitb",
        name: "冰之宝盒",
        tip: "里面有着宝藏。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Architecture
    },
    "nmgy": {
        code: "nmgy",
        name: "魔法宝箱",
        tip: "在每个盒子里面都藏着一个秘密。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Architecture
    },
    "hshy": {
        code: "hshy",
        name: "人族船坞",
        tip: "船只建造工厂。这里能建造出人族的运输船，护卫舰和战舰。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Architecture
    },
    "haro": {code: "haro", name: "神秘了望台", tip: "", kind: Kind.Unit, race: Race.Human, type: Type.Architecture},
    "nfrt": {
        code: "nfrt",
        name: "水果店",
        tip: "你一生中所见过的最不可思议的水果店。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Architecture
    },
    "ndt1": {
        code: "ndt1",
        name: "冰霜之塔",
        tip: "射出冰片进行攻击，擅长于减慢敌人的速度，对魔法免疫。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Architecture
    },
    "ndt2": {
        code: "ndt2",
        name: "高级水霜之塔",
        tip: "加快发射冰片的速度，擅长于减慢敌人的速度，对魔法免疫。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Architecture
    },
    "nft2": {
        code: "nft2",
        name: "高级火焰之塔",
        tip: "增加喷射火焰的攻击力，擅长于毁灭靠近的敌人，对魔法免疫。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Architecture
    },
    "nbt2": {
        code: "nbt2",
        name: "高级巨石之塔",
        tip: "增加石头的攻击力，擅长于对付地面单位，对魔法免疫。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Architecture
    },
    "net2": {
        code: "net2",
        name: "高级能里之塔",
        tip: "增加能量之箭的攻击力，擅长于对付敌人的空中单位，对魔法免疫。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Architecture
    },
    "ntx2": {
        code: "ntx2",
        name: "高级死亡之塔",
        tip: "射出致命的能量箭，擅长于实施大规模的伤害，对魔法免疫。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Architecture
    },
    "nft1": {
        code: "nft1",
        name: "火焰之塔",
        tip: "能射出灼热的火焰。擅长于毁灭靠近的敌人。对魔法免疫。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Architecture
    },
    "nbt1": {
        code: "nbt1",
        name: "巨石之塔",
        tip: "投掷出能造成溅射伤害的巨石，擅长于对付地面单位，对魔法免疫。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Architecture
    },
    "net1": {
        code: "net1",
        name: "能量之塔",
        tip: "射出能量之箭，擅长于对付敌人的空中单位，对魔法免疫。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Architecture
    },
    "ntt1": {
        code: "ntt1",
        name: "死亡之塔",
        tip: "射出致命的能量箭，擅长于实施大规模的伤害，对魔法免疫。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Architecture
    },
    "ngwr": {code: "ngwr", name: "谷仓", tip: "", kind: Kind.Unit, race: Race.Human, type: Type.Architecture},
    "negm": {code: "negm", name: "天怒之塔", tip: "", kind: Kind.Unit, race: Race.Human, type: Type.Architecture},
    "nezf": {code: "nezf", name: "地怒之塔", tip: "", kind: Kind.Unit, race: Race.Human, type: Type.Architecture},
    "negt": {
        code: "negt",
        name: "高等精灵防御塔",
        tip: "主要的防御性建筑。 能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Architecture
    },
    "ndgt": {code: "ndgt", name: "达拉然守卫塔", tip: "", kind: Kind.Unit, race: Race.Human, type: Type.Architecture},
    "nheb": {
        code: "nheb",
        name: "高等精灵兵营",
        tip: "主要部队生产建筑。 训练高等精灵剑士和高等精灵弓箭手和龙鹰。 同时包括对于高等精灵剑士防御技能的升级。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Architecture
    },
    "nefm": {code: "nefm", name: "高等精灵农场", tip: "", kind: Kind.Unit, race: Race.Human, type: Type.Architecture},
    "nef0": {code: "nef0", name: "高等精灵农场1", tip: "", kind: Kind.Unit, race: Race.Human, type: Type.Architecture},
    "nef1": {code: "nef1", name: "高等精灵农场2", tip: "", kind: Kind.Unit, race: Race.Human, type: Type.Architecture},
    "nef2": {code: "nef2", name: "高等精灵农场3", tip: "", kind: Kind.Unit, race: Race.Human, type: Type.Architecture},
    "nef3": {code: "nef3", name: "高等精灵农场4", tip: "", kind: Kind.Unit, race: Race.Human, type: Type.Architecture},
    "nef4": {code: "nef4", name: "高等精灵农场5", tip: "", kind: Kind.Unit, race: Race.Human, type: Type.Architecture},
    "nef5": {code: "nef5", name: "高等精灵农场6", tip: "", kind: Kind.Unit, race: Race.Human, type: Type.Architecture},
    "nef6": {code: "nef6", name: "高等精灵农场7", tip: "", kind: Kind.Unit, race: Race.Human, type: Type.Architecture},
    "nef7": {code: "nef7", name: "高等精灵农场8", tip: "", kind: Kind.Unit, race: Race.Human, type: Type.Architecture},
    "Hart": {
        code: "Hart",
        name: "阿尔塞斯",
        tip: "战士型英雄，特别擅长于保护自己周围的部队，能学习到神圣之光、神圣护甲、专注光环和复活这四项技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Hero
    },
    "Harf": {
        code: "Harf",
        name: "阿尔塞斯(挥舞着霜之哀伤宝剑)",
        tip: "战士型英雄，特别擅长于保护自己周围的部队，能学习到神圣之光、神圣护甲、专注光环和复活这四项技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Hero
    },
    "Hgam": {
        code: "Hgam",
        name: "安东尼达斯",
        tip: "一位神秘的英雄，擅长于远程攻击。能学习到暴风雪、召唤水元素、辉煌光环、和群体传送技能。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Hero
    },
    "Hant": {
        code: "Hant",
        name: "安东尼达斯",
        tip: "一位神秘的英雄，特别擅长于远程攻击。他能学到暴风雪、召唤水元素、辉煌光环和群体传送魔法。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Hero
    },
    "Hdgo": {
        code: "Hdgo",
        name: "达贡兽族屠杀者",
        tip: "战士型英雄，特别擅长于保护自己周围的部队，能学习到神圣之光、神圣护甲、专注光环和复活这四项技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Hero
    },
    "Hpb2": {
        code: "Hpb2",
        name: "格雷戈里爵士",
        tip: "战士型英雄，特别擅长于保护自己周围的部队，能学习到神圣之光、神圣护甲、专注光环和复活这四项技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Hero
    },
    "Hhkl": {
        code: "Hhkl",
        name: "哈拉生命使者",
        tip: "战士型英雄，特别擅长于保护自己周围的部队，能学习到神圣之光、神圣护甲、专注光环和复活这四项技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Hero
    },
    "Hapm": {
        code: "Hapm",
        name: "海军上将普洛德摩尔",
        tip: "战士型英雄，特别擅长于保护自己周围的部队，能学习到神圣之光、神圣护甲、专注光环和复活这四项技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Hero
    },
    "Hjai": {
        code: "Hjai",
        name: "吉安娜",
        tip: "一位神秘的英雄，特别擅长于远程攻击。他能学到暴风雪、召唤水元素、辉煌光环和群体传送魔法。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Hero
    },
    "Hlgr": {
        code: "Hlgr",
        name: "加理瑟斯",
        tip: "战士型英雄，特别擅长于保护自己周围的部队，能学习到神圣之光、神圣护甲、专注光环和复活这四项技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Hero
    },
    "Hkal": {
        code: "Hkal",
        name: "卡尔",
        tip: "一位神秘的英雄，擅长于控制魔法能量和远程攻击。能学习到烈焰风暴、驱散、吸魔和火凤凰这四项技能。攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Hero
    },
    "Hmgd": {
        code: "Hmgd",
        name: "马格罗斯守御者",
        tip: "战士型英雄，特别擅长于保护自己周围的部队，能学习到神圣之光、神圣护甲、专注光环和复活这四项技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Hero
    },
    "Hmbr": {
        code: "Hmbr",
        name: "穆拉丁",
        tip: "战士型英雄，特别擅长于冲锋陷阵。能学习到风暴之锤、雷霆一击、重击和天神下凡。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Hero
    },
    "Hpb1": {
        code: "Hpb1",
        name: "尼科拉斯大人",
        tip: "战士型英雄，特别擅长于保护自己周围的部队，能学习到神圣之光、神圣护甲、专注光环和复活这四项技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Hero
    },
    "Huth": {
        code: "Huth",
        name: "乌瑟尔",
        tip: "战士型英雄，特别擅长于保护自己周围的部队，能学习到神圣之光、神圣护甲、专注光环和复活这四项技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Human,
        type: Type.Hero
    },
    "Hvwd": {code: "Hvwd", name: "追风之西尔瓦娜斯", tip: "", kind: Kind.Unit, race: Race.Human, type: Type.Hero},
    "hprt": {code: "hprt", name: "传送门", tip: "打开传送门。", kind: Kind.Unit, race: Race.Human, type: Type.Special},
    "nmdm": {code: "nmdm", name: "麦迪文(血乌鸦形态)", tip: "", kind: Kind.Unit, race: Race.Human, type: Type.Special},
};

const unitOrc = {
    "opeo": {
        code: "opeo",
        name: "苦工",
        tip: "兽族的基本工人单位。能采集黄金和木材。还能建造建筑物和进行修理。在钻入地洞以后还能对来犯的敌人进行反击。能攻击地面单位和树木。",
        kind: Kind.Unit,
        race: Race.Orc,
        type: Type.Unit
    },
    "ogru": {
        code: "ogru",
        name: "兽族步兵",
        tip: "基本的兽族地面单位。能得到狂暴力量的升级。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Orc,
        type: Type.Unit
    },
    "orai": {
        code: "orai",
        name: "掠夺者",
        tip: "一种机动性很强的狼骑士。对付建筑物特别的有效，能学习到诱捕技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Orc,
        type: Type.Unit
    },
    "otau": {
        code: "otau",
        name: "牛头人",
        tip: "大型的单位，能学习到粉碎技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Orc,
        type: Type.Unit
    },
    "ohun": {
        code: "ohun",
        name: "巨魔猎头者",
        tip: "能有效对空的单位。能学习到巨魔再生和狂暴愤怒技能。能攻击地面和空中单位。 ",
        kind: Kind.Unit,
        race: Race.Orc,
        type: Type.Unit
    },
    "ocat": {
        code: "ocat",
        name: "粉碎者",
        tip: "远程攻城武器。对建筑很有效，但缓慢而昂贵。可以学会燃烧之油技能。攻击地面单位和树木。",
        kind: Kind.Unit,
        race: Race.Orc,
        type: Type.Unit
    },
    "okod": {
        code: "okod",
        name: "科多兽",
        tip: "笨重的战争野兽，上面骑着一个兽族鼓手。能学到战鼓和吞噬技能。战鼓能提高周围单位的攻击力，它本身也能进行升级。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Orc,
        type: Type.Unit
    },
    "owyv": {
        code: "owyv",
        name: "风骑士",
        tip: "一种高度机动的飞行单位。特别擅长于侦察。能获得浸毒武器的升级。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Orc,
        type: Type.Unit
    },
    "otbr": {
        code: "otbr",
        name: "巨魔蝙蝠骑士",
        tip: "轻型的飞行单位，有着出色的感官。擅长于摧毁敌人的建筑物，具有不稳定化合物技能，使得巨魔蝙蝠骑士能利用爆炸来伤害周围的空中单位。还能学习到液体炸弹和巨魔再生技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Orc,
        type: Type.Unit
    },
    "odoc": {
        code: "odoc",
        name: "巨魔巫医",
        tip: "魔法单位，一开始能施放岗哨魔法，从而能侦察到一定的区域。随后这种单位还能学习到静止陷阱和治疗守卫。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Orc,
        type: Type.Unit
    },
    "oshm": {
        code: "oshm",
        name: "萨满祭司",
        tip: "魔法单位。一开始能施放净化技能，从而能固定住敌人和驱逐其身上的魔法效果。随后还能学习到闪电护盾和嗜血术。能攻击地面单位和空中单位。",
        kind: Kind.Unit,
        race: Race.Orc,
        type: Type.Unit
    },
    "ospw": {
        code: "ospw",
        name: "灵魂行者",
        tip: "诡秘的牛头人法师。具有虚无形态技能，从而能让其对物理攻击免疫。还具有灵魂锁链技能，从而能对敌人进行连锁伤害。同时也能学习到消魔和先祖幽灵技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Orc,
        type: Type.Unit
    },
    "ogre": {
        code: "ogre",
        name: "大厅",
        tip: "兽族的基本建筑物。能训练出苦工，在升级到了要塞和堡垒之后能让玩家建造许多新的建筑物和单位。",
        kind: Kind.Unit,
        race: Race.Orc,
        type: Type.Architecture
    },
    "ostr": {
        code: "ostr",
        name: "要塞",
        tip: "在升级到要塞以后能使玩家建造许多新的建筑物和单位。",
        kind: Kind.Unit,
        race: Race.Orc,
        type: Type.Architecture
    },
    "ofrt": {
        code: "ofrt",
        name: "堡垒",
        tip: "升级到了堡垒之后能让玩家建造许多新的建筑物和单位。",
        kind: Kind.Unit,
        race: Race.Orc,
        type: Type.Architecture
    },
    "oalt": {
        code: "oalt",
        name: "风暴祭坛",
        tip: "能召唤新的英雄和复活阵亡的英雄。",
        kind: Kind.Unit,
        race: Race.Orc,
        type: Type.Architecture
    },
    "obar": {
        code: "obar",
        name: "兵营",
        tip: "主要部队生产建筑。训练步兵，猎头者和粉碎者。同时包括狂暴力量，狂暴愤怒，巨魔再生和燃烧汽油的升级。",
        kind: Kind.Unit,
        race: Race.Orc,
        type: Type.Architecture
    },
    "ofor": {
        code: "ofor",
        name: "战争磨坊",
        tip: "能存储采集到的木材。这里还包括对兽族各种单位的攻防升级，尖刺障碍和加强型防御也是在这里进行研究的。",
        kind: Kind.Unit,
        race: Race.Orc,
        type: Type.Architecture
    },
    "otto": {
        code: "otto",
        name: "牛头人图腾",
        tip: "能训练出牛头人来。还包括对粉碎技能的研究。",
        kind: Kind.Unit,
        race: Race.Orc,
        type: Type.Architecture
    },
    "osld": {
        code: "osld",
        name: "灵魂归宿",
        tip: "能生产出兽族的魔法单位：萨满祭司，巨魔巫医和灵魂行者。这里也可以进行对萨满祭司，巨魔巫医和灵魂行者的各种魔法升级。",
        kind: Kind.Unit,
        race: Race.Orc,
        type: Type.Architecture
    },
    "obea": {
        code: "obea",
        name: "兽栏",
        tip: "能训练出掠夺者，科多兽，风骑士和巨魔蝙蝠骑士。这里还包括诱捕，浸毒武器，战鼓和液体炸弹的升级。",
        kind: Kind.Unit,
        race: Race.Orc,
        type: Type.Architecture
    },
    "otrb": {
        code: "otrb",
        name: "兽族地洞",
        tip: "能提供人口，从而增加可造单位数量的最大值。苦工在进入其中以后还能对来犯的敌人进行反击。能进行加强型防御升级。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Orc,
        type: Type.Architecture
    },
    "owtw": {
        code: "owtw",
        name: "了望塔",
        tip: "防御性建筑，能得到到加强型防御升级。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Orc,
        type: Type.Architecture
    },
    "ovln": {
        code: "ovln",
        name: "巫毒商店",
        tip: "建造出一个能出售物品的商店。可以购买的物品种类取决于你的大厅升级情况(大厅, 要塞, 堡垒)和你所拥有的建筑物种类。",
        kind: Kind.Unit,
        race: Race.Orc,
        type: Type.Architecture
    },
    "Obla": {
        code: "Obla",
        name: "剑圣",
        tip: "一种较为灵活的英雄，特别擅长于一对一。能学习到镜像，疾步风，致命一击和剑刃风暴这四种技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Orc,
        type: Type.Hero
    },
    "Ofar": {
        code: "Ofar",
        name: "先知",
        tip: "一种神秘的英雄，特别擅长于远程攻击和侦察。能学习到闪电链，透视，野兽幽魂和地震这四种技能。能攻击地面单位和空中单位。",
        kind: Kind.Unit,
        race: Race.Orc,
        type: Type.Hero
    },
    "Otch": {
        code: "Otch",
        name: "牛头人酋长",
        tip: "一种战士型英雄，特别擅长于近战和吸收伤害。能学习到震荡波，战争践踏，耐久光环和重生这四种技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Orc,
        type: Type.Hero
    },
    "Oshd": {
        code: "Oshd",
        name: "暗影猎手",
        tip: "灵巧型的英雄，擅长于医疗和巫毒魔法。能学习到医疗波，妖术，毒蛇守卫和巫毒技能。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Orc,
        type: Type.Hero
    },
    "oeye": {code: "oeye", name: "岗哨守卫", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Special},
    "nwad": {code: "nwad", name: "观察守卫", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Special},
    "otot": {code: "otot", name: "静止陷阱", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Special},
    "osw1": {code: "osw1", name: "幽魂之狼(等级1)", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Special},
    "osw2": {code: "osw2", name: "恐惧之狼(等级2)", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Special},
    "osw3": {code: "osw3", name: "阴影之狼(等级3)", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Special},
    "ohwd": {code: "ohwd", name: "治疗守卫", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Special},
    "osp1": {code: "osp1", name: "毒蛇守卫(等级1)", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Special},
    "osp2": {code: "osp2", name: "毒蛇守卫(等级2)", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Special},
    "osp3": {code: "osp3", name: "毒蛇守卫(等级3)", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Special},
    "osp4": {code: "osp4", name: "毒蛇守卫(等级4)", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Special},
    "ospm": {
        code: "ospm",
        name: "灵魂行者(虚无状态)",
        tip: "诡秘的牛头人法师。具有虚无形态技能，从而能让其对物理攻击免疫。还具有灵魂锁链技能，从而能对敌人进行连锁伤害。同时也能学习到消魔和先祖幽灵技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Orc,
        type: Type.Special
    },
    "otbk": {
        code: "otbk",
        name: "巨竟狂暴战士",
        tip: "能有效对空的投矛战士，拥有狂暴愤怒技能，从而增加了攻击力但是也会因此而受到额外的伤害。能学习巨魔再生技能。能攻击地面和空中单位。 ",
        kind: Kind.Unit,
        race: Race.Orc,
        type: Type.Special
    },

    "nspc": {code: "nspc", name: "支柱", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Unit},
    "oosc": {code: "oosc", name: "科多兽(怀需要分配驾驭者", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Unit},
    "owar": {code: "owar", name: "兽族战争首领", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Unit},
    "ogrk": {code: "ogrk", name: "加嗦克", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Unit},
    "oswy": {code: "oswy", name: "灵魂飞龙", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Unit},
    "ownr": {code: "ownr", name: "双足飞龙(不需要分驾驭者", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Unit},
    "odkt": {code: "odkt", name: "德拉克苏尔", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Unit},
    "obot": {code: "obot", name: "兽族运输船", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Unit},
    "odes": {code: "odes", name: "兽族护卫舰", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Unit},
    "ojgn": {code: "ojgn", name: "兽族魔力战舰", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Unit},
    "nw2w": {code: "nw2w", name: "兽族巫师", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Unit},
    "nchw": {code: "nchw", name: "邪恶的巫师", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Unit},
    "nchg": {code: "nchg", name: "邪恶的兽族步兵", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Unit},
    "nchr": {code: "nchr", name: "邪恶的掠夺者", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Unit},
    "nckb": {code: "nckb", name: "邪恶的科多兽", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Unit},
    "ncpn": {code: "ncpn", name: "邪恶的苦工", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Unit},

    "npgr": {code: "npgr", name: "能里产生器", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Architecture},
    "oshy": {code: "oshy", name: "兽族船坞", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Architecture},
    "nwc1": {code: "nwc1", name: "双足飞龙牢笼(1", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Architecture},
    "nwc2": {code: "nwc2", name: "双足飞龙牢笼(2", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Architecture},
    "npgf": {code: "npgf", name: "猪圈农场", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Architecture},
    "ndrb": {code: "ndrb", name: "龙之栖木", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Architecture},
    "nbfl": {code: "nbfl", name: "血浴之泉", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Architecture},
    "ndfl": {code: "ndfl", name: "被污染的生命之泉", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Architecture},
    "ocbw": {
        code: "ocbw",
        name: "邪恶兽族地洞(混乱的",
        tip: "",
        kind: Kind.Unit,
        race: Race.Orc,
        type: Type.Architecture
    },

    "Nsjs": {code: "Nsjs", name: "陈-风暴烈酒", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Hero},
    "Odrt": {code: "Odrt", name: "德雷克萨尔", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Hero},
    "Ogrh": {code: "Ogrh", name: "格罗姆地狱咆哮", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Hero},
    "Opgh": {
        code: "Opgh",
        name: "格罗姆一地狱咆哮(恶魔附体)",
        tip: "",
        kind: Kind.Unit,
        race: Race.Orc,
        type: Type.Hero
    },
    "Ogld": {code: "Ogld", name: "古尔丹", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Hero},
    "Ocbh": {code: "Ocbh", name: "卡林-血蹄", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Hero},
    "Ocb2": {code: "Ocb2", name: "卡林血蹄(资料片", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Hero},
    "Orex": {code: "Orex", name: "雷克萨", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Hero},
    "Orkn": {code: "Orkn", name: "洛克汗", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Hero},
    "Othr": {code: "Othr", name: "萨尔", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Hero},
    "Osam": {code: "Osam", name: "萨穆罗", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Hero},
    "Nbbc": {code: "Nbbc", name: "黑岩氏族的剑圣", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Hero},

    "omtg": {code: "omtg", name: "马索格", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Special},
    "ovlj": {code: "ovlj", name: "沃尔京", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Special},
    "onzg": {code: "onzg", name: "那滋盖尔", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Special},
    "negz": {code: "negz", name: "工程师加磁劳", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Special},
    "nmsh": {code: "nmsh", name: "米纱", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Special},
    "Otcc": {code: "Otcc", name: "卡林-血蹄(过场动画", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Special},
    "ngbl": {code: "ngbl", name: "地精爆破T", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Special},

};

const unitNightElf = {
    "ewsp": {
        code: "ewsp",
        name: "小精灵",
        tip: "暗夜精灵族基本的工人单位。能采集金矿和木材。还能建造精灵族的建筑物并进行修理更新。能自我爆炸从而伤害到周围被召唤出来的单位并吸收一定范围内所有单位的魔法值。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Unit
    },
    "earc": {
        code: "earc",
        name: "弓箭手",
        tip: "基本的远程攻击单位。拥有艾鲁尼之优雅技能。能学习到射击术，硬弓和驯服角鹰兽这三项技能。能攻击地面和空中单位。 ",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Unit
    },
    "esen": {
        code: "esen",
        name: "女猎手",
        tip: "灵活的远程攻击单位，能学习到哨兵和月刃技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Unit
    },
    "edry": {
        code: "edry",
        name: "树妖",
        tip: "她的毒性攻击能减慢敌人的速度并慢慢地消耗敌人的生命值。她还具有驱魔技能和魔法免疫技能。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Unit
    },
    "ebal": {
        code: "ebal",
        name: "投刃车",
        tip: "远距离的攻城武器。对付建筑物特别地有效。还能得到穿刺剑刃的升级。从而能攻击树木。能攻击地面单位和树木。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Unit
    },
    "ehip": {
        code: "ehip",
        name: "角鹰兽",
        tip: "近战型飞行单位。能学习到驯服角鹰兽技能。能攻击空中单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Unit
    },
    "ehpr": {
        code: "ehpr",
        name: "角鹰兽骑士",
        tip: "弓箭手骑乘在了角鹰兽上面就成为了角鹰兽骑士。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Unit
    },
    "echm": {
        code: "echm",
        name: "奇美拉",
        tip: "双头飞龙。能学到腐蚀喷吐技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Unit
    },
    "edot": {
        code: "edot",
        name: "猛禽德鲁伊(暗夜精灵形态)",
        tip: "灵活的魔法单位。一开始就能施放精灵之火，从而能降低某个单位的护甲并让其不能隐形。随后还能学习到风暴之鸦，飓风和猛禽之痕技能。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Unit
    },
    "edoc": {
        code: "edoc",
        name: "利爪德鲁伊(暗夜精灵族形态)",
        tip: "近战型的魔法施放单位。一开始能施放咆哮技能，从而增加攻击力。随后还能学习到生命恢复，变熊和利爪之痕技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Unit
    },
    "emtg": {
        code: "emtg",
        name: "山岭巨人",
        tip: "大型的近战单位，善于吸收敌人的进攻。具有嘲讽和拔树技能。也能学习到硬化皮肤和抗性皮肤这两个技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Unit
    },
    "efdr": {
        code: "efdr",
        name: "精灵龙",
        tip: "小型的飞行单位，擅长伤害敌人的魔法单位。具有变相移动，魔力之焰和魔法免疫技能。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Unit
    },

    "etol": {
        code: "etol",
        name: "生命之树",
        tip: "暗夜精灵族的基本建筑物。能训练小精灵和缠绕金矿。在升级到了远古之树和永恒之树之后能让玩家建造许多新的建筑物和单位。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Architecture
    },
    "etoa": {
        code: "etoa",
        name: "远古之树",
        tip: "升级到了远古之树之后能让玩家建造许多新的建筑物和单位。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Architecture
    },
    "etoe": {
        code: "etoe",
        name: "永恒之树",
        tip: "升级到了永恒之树之后能让玩家建造许多新的建筑物和单位。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Architecture
    },
    "emow": {
        code: "emow",
        name: "月亮井",
        tip: "提供人口，从而增加可造单位数量的最大值。还能补充暗夜精灵族单位的魔法值和生命值。在夜间它也能自我恢复魔法能量。还能得到月井之春技能的升级。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Architecture
    },
    "eete": {
        code: "eete",
        name: "长者祭坛",
        tip: "能召唤新的英雄和复活阵亡的英雄。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Architecture
    },
    "eaom": {
        code: "eaom",
        name: "战争古树",
        tip: "能生产出：弓箭手，女猎手和投刃车。还包括对弓箭手，女猎手和投刃车的各类升级。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Architecture
    },
    "eaoe": {
        code: "eaoe",
        name: "知识古树",
        tip: "能生产出暗夜精灵族的地面魔法单位：利爪德鲁伊，山岭巨人和树妖。还包括对利爪德鲁伊，驱魔技能，利爪之痕，硬化皮肤和抗性皮肤的升级。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Architecture
    },
    "eaow": {
        code: "eaow",
        name: "风之古树",
        tip: "能生产出：角鹰兽，猛禽德鲁伊和精灵龙。还包括对角鹰兽和猛禽德鲁伊的各类升级。比如猛禽之痕和训练角鹰兽。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Architecture
    },
    "edob": {
        code: "edob",
        name: "猎手大厅",
        tip: "能对所有单位的攻防进行升级，还包括对夜视能力的升级。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Architecture
    },
    "etrp": {
        code: "etrp",
        name: "远古守护者",
        tip: "防御性古树。在扎根以后，会向空中投掷大量的石块以对来犯的敌人进行反击。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Architecture
    },
    "edos": {
        code: "edos",
        name: "奇美拉栖木",
        tip: "能训练出奇美拉怪兽。还包括对腐蚀喷吐的研究。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Architecture
    },
    "egol": {
        code: "egol",
        name: "被缠绕的金矿",
        tip: "冒出一些根须缠绕在金矿上，使得小精灵能采集资源。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Architecture
    },
    "eden": {
        code: "eden",
        name: "奇迹古树",
        tip: "建造一个可以出售物品的商店。物品的类型取决于你的生命之树的升级情况(生命之树,远古之树,永恒之树)以及你当前所拥有的建筑物种类。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Architecture
    },

    "Ekee": {
        code: "Ekee",
        name: "从林守护者",
        tip: "一种神秘的英雄，特别擅长于自然类的魔法。能学习到纠缠根须，自然之力，荆刺光环和宁静这四项技能。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Hero
    },
    "Emoo": {
        code: "Emoo",
        name: "月之女祭司",
        tip: "战士型英雄，擅长于远程攻击。能学习到侦察，灼热之箭，强击光环和群星坠落这四项技能。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Hero
    },
    "Edem": {
        code: "Edem",
        name: "恶魔猎手",
        tip: "一种灵活的英雄，能学习到献祭，闪避法力燃烧和变身这四项技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Hero
    },
    "Ewar": {
        code: "Ewar",
        name: "守望者",
        tip: "灵巧型英雄，能在战场上来去自如，能学习到闪烁, 刀阵旋风, 暗影突袭和复仇之魂这四项技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Hero
    },

    "now1": {
        code: "now1",
        name: "猫头鹰侦察者(等级1)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Special
    },
    "now2": {
        code: "now2",
        name: "猫头鹰侦察者(等级2)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Special
    },
    "now3": {
        code: "now3",
        name: "猫头鹰侦察者(等级3)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Special
    },
    "Edmm": {
        code: "Edmm",
        name: "恶魔猎手(恶魔形态)",
        tip: "一种灵活的英雄，能学习到献祭，闪避法力燃烧和变身这四项技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Special
    },
    "edtm": {
        code: "edtm",
        name: "猛禽德鲁伊(风暴之鸦形态)",
        tip: "灵活的魔法单位。一开始就能施放精灵之火，从而能降低某个单位的护甲并让其不能隐形。随后还能学习到风暴之鸦，飓风和猛禽之痕技能。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Special
    },
    "edcm": {
        code: "edcm",
        name: "利爪德鲁伊(变能)",
        tip: "近战型的魔法施放单位。一开始能施放咆哮技能，从而增加攻击力。随后还能学习到生命恢复，变熊和利爪之痕技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Special
    },
    "efon": {code: "efon", name: "树人", tip: "", kind: Kind.Unit, race: Race.NightElf, type: Type.Special},
    "espv": {code: "espv", name: "复仇天神", tip: "", kind: Kind.Unit, race: Race.NightElf, type: Type.Special},
    "even": {code: "even", name: "复仇之魂", tip: "", kind: Kind.Unit, race: Race.NightElf, type: Type.Special},

    "enec": {code: "enec", name: "暗夜精灵信使", tip: "", kind: Kind.Unit, race: Race.NightElf, type: Type.Unit},
    "eilw": {code: "eilw", name: "囚车", tip: "", kind: Kind.Unit, race: Race.NightElf, type: Type.Unit},
    "nwat": {code: "nwat", name: "岗哨", tip: "", kind: Kind.Unit, race: Race.NightElf, type: Type.Unit},
    "ensh": {code: "ensh", name: "娜萨", tip: "", kind: Kind.Unit, race: Race.NightElf, type: Type.Unit},
    "nssh": {code: "nssh", name: "守望者", tip: "", kind: Kind.Unit, race: Race.NightElf, type: Type.Unit},
    "eshd": {code: "eshd", name: "塞恩德里斯", tip: "", kind: Kind.Unit, race: Race.NightElf, type: Type.Unit},
    "etrs": {
        code: "etrs",
        name: "暗夜精灵族运输船",
        tip: "能够运送单位的运输船。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Unit
    },
    "edes": {
        code: "edes",
        name: "暗夜精灵族护卫舰",
        tip: "多功能的战斗舰船，擅长于攻击空中单位。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Unit
    },
    "ebsh": {
        code: "ebsh",
        name: "暗夜精灵族战舰",
        tip: "强大的攻城舰船，能够很好地攻击地面建筑物和敌人的船只。攻击地面单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Unit
    },
    "nthr": {code: "nthr", name: "萨里法斯", tip: "", kind: Kind.Unit, race: Race.NightElf, type: Type.Unit},

    "eshy": {
        code: "eshy",
        name: "暗夜精灵族船坞",
        tip: "船只建造工厂。能建造出暗夜精灵族的运输船，护卫舰和战舰。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Architecture
    },
    "nvr1": {
        code: "nvr1",
        name: "暗夜精灵族渔村(被毁坏的)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Architecture
    },
    "nvr0": {
        code: "nvr0",
        name: "暗夜精灵族渔村(被毁坏的)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Architecture
    },
    "nvr2": {
        code: "nvr2",
        name: "暗夜精灵族渔村(被毁坏的)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Architecture
    },
    "nfv4": {
        code: "nfv4",
        name: "暗夜精灵族渔村(顶层有装饰的)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Architecture
    },
    "nfv1": {
        code: "nfv1",
        name: "暗夜精灵族渔村(顶层有装饰的)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Architecture
    },
    "nfv3": {
        code: "nfv3",
        name: "暗夜精灵族渔村(双层的) ",
        tip: "",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Architecture
    },
    "nfv0": {
        code: "nfv0",
        name: "暗夜精灵族渔村(双层的)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Architecture
    },
    "nfv2": {
        code: "nfv2",
        name: "暗夜精灵族渔村(单层的)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Architecture
    },
    "ngob": {code: "ngob", name: "魔法宝石塔", tip: "", kind: Kind.Unit, race: Race.NightElf, type: Type.Architecture},
    "nbwd": {code: "nbwd", name: "兽穴", tip: "", kind: Kind.Unit, race: Race.NightElf, type: Type.Architecture},
    "nctl": {
        code: "nctl",
        name: "生命之树",
        tip: "暗夜精灵族的基本建筑物。能训练小精灵和缠绕金矿。在升级到了远古之树和永恒之树之后能让玩家建造许多新的建筑物和单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Architecture
    },
    "ncta": {
        code: "ncta",
        name: "远古之树",
        tip: "升级到了远古之树之后能让玩家建造许多新的建筑物和单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Architecture
    },
    "ncte": {
        code: "ncte",
        name: "永恒之树",
        tip: "升级到了永恒之树之后能让玩家建造许多新的建筑物和单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Architecture
    },
    "ncap": {
        code: "ncap",
        name: "远古守护者",
        tip: "防御性的古树。当扎根于地面的时候，能投掷出巨大的石块对敌人造成伤害。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Architecture
    },
    "ncaw": {
        code: "ncaw",
        name: "战争古树",
        tip: "主要的产兵建筑。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Architecture
    },
    "nhcn": {
        code: "nhcn",
        name: "伴神赛纳留斯之角",
        tip: "",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Architecture
    },
    "nfnp": {code: "nfnp", name: "威力之泉", tip: "", kind: Kind.Unit, race: Race.NightElf, type: Type.Architecture},

    "Efur": {
        code: "Efur",
        name: "法里奥",
        tip: "一种神秘的英雄，特别擅长于自然类的魔法。能学习到纠缠根须、自然之力、荆刺光环和宁静这四项技能。攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Hero
    },
    "Emfr": {
        code: "Emfr",
        name: "玛尔法里奥",
        tip: "一种神秘的英雄，特别擅长于自然类的魔法。能学习到纠缠根须、自然之力、荆刺光环和宁静这四项技能。攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Hero
    },
    "Emns": {
        code: "Emns",
        name: "玛尔法里奥(没有鹿角)",
        tip: "一种神秘的英雄，特别擅长于自然类的魔法。能学习到纠缠根须、自然之力、荆刺光环和宁静这四项技能。攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Hero
    },
    "Ewrd": {
        code: "Ewrd",
        name: "玛维",
        tip: "灵巧型英雄，能在战场上来去自如，能学习到闪烁、刀阵旋风、暗影突袭和复仇之魂这四项技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Hero
    },
    "Ecen": {code: "Ecen", name: "赛纳留斯", tip: "", kind: Kind.Unit, race: Race.Orc, type: Type.Hero},
    "Etyr": {
        code: "Etyr",
        name: "泰兰德",
        tip: "战士型英雄，擅长于远程攻击。能学习到侦察、灼热之箭、强击光环和群星坠落这四项技能。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Hero
    },
    "Ekgg": {
        code: "Ekgg",
        name: "幽灵",
        tip: "一种神秘的英雄，特别擅长于自然类的魔法。能学习到纠缠根须、自然之力、荆刺光环和宁静这四项技能。攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Hero
    },
    "Eill": {
        code: "Eill",
        name: "尤迪安",
        tip: "一种灵活的英雄，能学习到献祭、闪避、法力燃烧和变身这四项技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Hero
    },
    "Eevi": {
        code: "Eevi",
        name: "尤迪安(邪恶的)",
        tip: "一种灵活的英雄，能学习到献祭、闪避、法力燃烧和变身这四项技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Hero
    },

    "Eevm": {
        code: "Eevm",
        name: "尤迪安(Morphed)",
        tip: "一种灵活的英雄，能学习到献祭、闪避、法力燃烧和变身这四项技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Special
    },
    "Eilm": {
        code: "Eilm",
        name: "尤迪安(被变了形的)",
        tip: "一种灵活的英雄，能学习到献祭、闪避、法力燃烧和变身这四项技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Special
    },
    "Eidm": {
        code: "Eidm",
        name: "尤迪安(恶魔形态)",
        tip: "一种灵活的英雄，能学习到献祭、闪避、法力燃烧和变身这四项技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.NightElf,
        type: Type.Special
    },
};

const unitUndead = {
    "uaco": {
        code: "uaco",
        name: "侍僧",
        tip: "不死族的基本工人单位。能召唤建筑物，采集金矿和进行修复工作。在牺牲深渊里牺牲以后侍僧还可以变为阴影。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Unit
    },
    "ushd": {
        code: "ushd",
        name: "阴影",
        tip: "一个永远隐形的灵魂，能看见其他隐形单位，但是不能进攻。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Unit
    },
    "ugho": {
        code: "ugho",
        name: "食尸鬼",
        tip: "基本的地面单位，也能采集木材。能学习到吞食尸体和食尸鬼狂热技能。能攻击地面单位和树木。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Unit
    },
    "uabo": {
        code: "uabo",
        name: "憎恶",
        tip: "重型的近战单位。能学习到疾病云雾和吞食尸体技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Unit
    },
    "umtw": {
        code: "umtw",
        name: "绞肉车",
        tip: "能存放尸体，也是一种远程的攻城武器。对付建筑物特别地有效，但是自己本身也移动缓慢而容易遭受攻击。还能学习到疾病云雾技能。能攻击地面单位和树木。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Unit
    },
    "ucry": {
        code: "ucry",
        name: "穴居恶魔",
        tip: "远程攻击单位。能学习到蛛网和钻地技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Unit
    },
    "ugar": {
        code: "ugar",
        name: "石像鬼",
        tip: "飞行单位。能学习到石像形态技能。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Unit
    },
    "uban": {
        code: "uban",
        name: "女妖",
        tip: "魔法单位，一开始能施放诅咒技能，从而让敌人有一定的概率击空。随后还能学习到反魔法外壳和占据魔法。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Unit
    },
    "unec": {
        code: "unec",
        name: "不死族巫师",
        tip: "一种魔法单位。一开始能施放复活死尸技能。随后还能学习到邪恶狂热和残废技能。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Unit
    },
    "uobs": {
        code: "uobs",
        name: "十胜石雕像",
        tip: "一种坚固的雕像，能帮助你恢复自己部队的生命值和魔法值。具有灵魂触摸，枯萎精髓技能，还可以学习到破坏者形态技能。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Unit
    },
    "ufro": {
        code: "ufro",
        name: "冰霜巨龙",
        tip: "重型的飞行单位，能学习到冰冻喷吐技能。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Unit
    },

    "unpl": {
        code: "unpl",
        name: "大墓地",
        tip: "不死族的基本建筑物。能训练出侍僧和存贮采集到木材资源。在升级到了亡者大厅和黑色城堡之后能让玩家建造许多新的建筑物和单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Architecture
    },
    "unp1": {
        code: "unp1",
        name: "亡者大厅",
        tip: "升级到了亡者大厅之后能让玩家建造许多新的建筑物和单位。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Architecture
    },
    "unp2": {
        code: "unp2",
        name: "黑色城堡",
        tip: "升级到了亡者大厅之后能让玩家建造许多新的建筑物和单位。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Architecture
    },
    "uzig": {
        code: "uzig",
        name: "通灵塔",
        tip: "能提供人口，从而增加可造单位数量的最大值。在经过升级以后能变成一个可以攻击地面单位和空中单位的建筑物。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Architecture
    },
    "uzg1": {
        code: "uzg1",
        name: "幽魂之塔",
        tip: "防御性建筑物。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Architecture
    },
    "uzg2": {
        code: "uzg2",
        name: "蛛网怪塔",
        tip: "升级到防御建筑，造成冰冻伤害，减慢敌人单位速度。攻击地面和空中单位",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Architecture
    },
    "uaod": {
        code: "uaod",
        name: "黑暗禁坛",
        tip: "能召唤新的英雄和复活阵亡的英雄。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Architecture
    },
    "usep": {
        code: "usep",
        name: "地穴",
        tip: "主要的产兵建筑物，能训练出食尸鬼，穴居恶魔和石像鬼。还包括对食尸鬼狂热，吞食尸体，石像形态，蛛网和钻地的研究。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Architecture
    },
    "usap": {
        code: "usap",
        name: "牺牲深渊",
        tip: "能将侍僧转化成阴影。阴影是一种能看见敌方隐形单位的隐形单位。自己本身也不能攻击敌人。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Architecture
    },
    "ugrv": {
        code: "ugrv",
        name: "坟场",
        tip: "能对不死族单位的攻防进行升级。也能产生尸体和存放收集到木材资源。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Architecture
    },
    "uslh": {
        code: "uslh",
        name: "屠宰场",
        tip: "能生产出憎恶、绞肉车和十胜石雕像。还包括对疾病云雾，破坏者形态的研究。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Architecture
    },
    "utod": {
        code: "utod",
        name: "诅咒神庙",
        tip: "能训练出不死族巫师和女妖。还包括对不死族巫师和女妖的升级，骨质增强术和骷髅法术也是在这里研究的。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Architecture
    },
    "ubon": {
        code: "ubon",
        name: "埋骨地",
        tip: "能生产出霜冻巨龙。还包括对冰冻喷吐的研究。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Architecture
    },
    "ugol": {
        code: "ugol",
        name: "闹鬼金矿",
        tip: "在金矿被闹鬼了之后侍僧才可以从中采集黄金资源。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Architecture
    },
    "utom": {
        code: "utom",
        name: "古墓废墟",
        tip: "建造出一个能出售物品的商店。商店内的物品种类取决于你的大墓地的升级情况(大墓地, 亡者大厅, 黑色城堡)以及你所拥有的建筑物种类。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Architecture
    },

    "Udea": {
        code: "Udea",
        name: "死亡骑士",
        tip: "是人族圣骑士的邪恶对手。能学习到死亡缠绕，死亡契约，邪恶光环和操纵死尸这四种技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Hero
    },
    "Ulic": {
        code: "Ulic",
        name: "巫妖",
        tip: "一种神秘的英雄，能学习到霜冻护甲，霜冻新星，黑暗仪式和死亡凋零技能。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Hero
    },
    "Udre": {
        code: "Udre",
        name: "恐惧魔王",
        tip: "一种狡猾的英雄，能学习到腐臭蜂群，睡眠，吸血光环和地狱火技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Hero
    },
    "Ucrl": {
        code: "Ucrl",
        name: "地穴领主",
        tip: "战士型英雄，擅长于控制昆虫进行攻击。能学习到穿刺，尖刺外壳, 腐尸甲虫和蝗虫群这四个技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Hero
    },

    "uloc": {code: "uloc", name: "蝗虫", tip: "", kind: Kind.Unit, race: Race.Undead, type: Type.Special},
    "uplg": {code: "uplg", name: "疾病云雾", tip: "", kind: Kind.Unit, race: Race.Undead, type: Type.Special},
    "ucrm": {
        code: "ucrm",
        name: "钻入地下的穴居恶魔",
        tip: "远程攻击单位。能学习到蛛网和钻地技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Special
    },
    "ugrm": {
        code: "ugrm",
        name: "石像形态下的石像鬼",
        tip: "飞行单位。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Special
    },
    "uske": {code: "uske", name: "骷髅战士", tip: "", kind: Kind.Unit, race: Race.Undead, type: Type.Special},
    "uskm": {code: "uskm", name: "骷髅魔法师", tip: "", kind: Kind.Unit, race: Race.Undead, type: Type.Special},
    "ubsp": {
        code: "ubsp",
        name: "破坏者",
        tip: "巨大飞行单位，必须吞噬魔法才能保持其自己的魔法能量。特别擅长于伤害敌人的魔法单位和聚集在一起的敌军。具有魔法免疫，吞噬魔法，吸收魔法和毁灭之球技能。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Special
    },
    "ucs1": {code: "ucs1", name: "腐尸甲虫(等级1)", tip: "", kind: Kind.Unit, race: Race.Undead, type: Type.Special},
    "ucs2": {code: "ucs2", name: "腐尸甲虫(等级2)", tip: "", kind: Kind.Unit, race: Race.Undead, type: Type.Special},
    "ucsB": {
        code: "ucsB",
        name: "钻入地下的腐尸甲虫(等级2)",
        tip: "",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Special
    },
    "ucs3": {code: "ucs3", name: "腐尸甲虫(等级3)", tip: "", kind: Kind.Unit, race: Race.Undead, type: Type.Special},
    "UcsC": {
        code: "UcsC",
        name: "钻入地下的腐户甲虫(等级3)",
        tip: "",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Special
    },

    "uarb": {
        code: "uarb",
        name: "飞艇",
        tip: "一种大批量的运输机。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Unit
    },
    "uktn": {
        code: "uktn",
        name: "克尔苏加德(不死族巫师)",
        tip: "",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Unit
    },
    "uktg": {code: "uktg", name: "克尔苏加德(幽灵)", tip: "", kind: Kind.Unit, race: Race.Undead, type: Type.Unit},
    "uswb": {
        code: "uswb",
        name: "追风之西尔瓦娜斯(女妖)",
        tip: "",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Unit
    },
    "ubdd": {code: "ubdd", name: "萨皮洛恩(不死族的)", tip: "", kind: Kind.Unit, race: Race.Undead, type: Type.Unit},
    "ubdr": {code: "ubdr", name: "萨皮洛恩(活着的)", tip: "", kind: Kind.Unit, race: Race.Undead, type: Type.Unit},
    "ubot": {
        code: "ubot",
        name: "不死族运输船",
        tip: "能够运送单位的运输船。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Unit
    },
    "udes": {
        code: "udes",
        name: "不死族族护卫舰",
        tip: "多功能的战斗舰船，擅长于攻击空中单位。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Unit
    },
    "uubs": {
        code: "uubs",
        name: "不死族战舰",
        tip: "强大的攻城舰船能够很好地攻击地面建筑物和敌人的船只。攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Unit
    },
    "uzom": {
        code: "uzom",
        name: "僵尸",
        tip: "轻型的近战单位。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Unit
    },

    "ushp": {
        code: "ushp",
        name: "不死族船坞",
        tip: "造船工厂，能制造出不死族的运输船，护卫舰和战舰。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Architecture
    },
    "ushr": {code: "ushr", name: "神殿", tip: "", kind: Kind.Unit, race: Race.Undead, type: Type.Architecture},
    "udmg": {code: "udmg", name: "恶魔之门", tip: "", kind: Kind.Unit, race: Race.Undead, type: Type.Architecture},
    "ugni": {
        code: "ugni",
        name: "腐烂谷仓",
        tip: "里面都是糜烂的谷物。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Architecture
    },
    "ufrm": {code: "ufrm", name: "霜之哀伤底座", tip: "", kind: Kind.Unit, race: Race.Undead, type: Type.Architecture},
    "ubsm": {code: "ubsm", name: "召唤底座之书", tip: "", kind: Kind.Unit, race: Race.Undead, type: Type.Architecture},

    "Uear": {
        code: "Uear",
        name: "阿尔塞斯(邪恶的)",
        tip: "战士型英雄，是人族圣骑士的邪恶对手。能学习到死亡缠绕、死亡契约、邪恶光环和操纵死尸这四种技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Hero
    },
    "Uanb": {
        code: "Uanb",
        name: "阿诺拉克",
        tip: "战士型英雄，擅长于控制昆虫进行攻击。能学习到穿刺、尖刺外壳、腐尸甲虫和蝗虫群这四个技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Hero
    },
    "Ubal": {
        code: "Ubal",
        name: "巴那泽尔",
        tip: "一种狡猾的英雄，善于控制战场。能学习到腐臭蜂群、睡眠、吸血光环和地狱火技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Hero
    },
    "Uvng": {
        code: "Uvng",
        name: "戴尔维恩格尔",
        tip: "一种狡猾的英雄，善于控制战场。能学习到腐臭蜂群、睡眠、吸血光环和地狱火技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Hero
    },
    "Udth": {
        code: "Udth",
        name: "德赛洛克",
        tip: "一种狡猾的英雄，善于控制战场。能学习到腐臭蜂群、睡眠、吸血光环和地狱火技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Hero
    },
    "Uvar": {
        code: "Uvar",
        name: "法理玛瑟斯",
        tip: "一种狡猾的英雄，善于控制战场。能学习到腐臭蜂群、睡眠、吸血光环和地狱火技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Hero
    },
    "Uktl": {
        code: "Uktl",
        name: "克尔苏加德(巫妖)",
        tip: "一种神秘的英雄，特别擅长于冰系魔法。能学习到霜冻护甲、霜冻新星、黑暗仪式和死亡凋零技能。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Hero
    },
    "Umal": {
        code: "Umal",
        name: "麦尔盖尼斯",
        tip: "一种狡猾的英雄，善于控制战场。能学习到腐臭蜂群、睡眠、吸血光环和地狱火技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Hero
    },
    "Utic": {
        code: "Utic",
        name: "提克迪奥斯",
        tip: "一种狡猾的英雄，善于控制战场。能学习到腐臭蜂群、睡眠、吸血光环和地狱火技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Hero
    },
    "Usyl": {
        code: "Usyl",
        name: "西尔瓦娜斯",
        tip: "灵巧型的英雄，擅长于与对手周旋。能学习到沉默魔法、黑暗之箭、生命汲取和符咒这四项技能。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Hero
    },
    "Uman": {code: "Uman", name: "玛诺洛斯", tip: "", kind: Kind.Unit, race: Race.Undead, type: Type.Hero},
    "Uwar": {code: "Uwar", name: "阿克蒙德", tip: "", kind: Kind.Unit, race: Race.Undead, type: Type.Hero},
    "Upld": {code: "Upld", name: "阿哥勒尔", tip: "", kind: Kind.Unit, race: Race.Undead, type: Type.Hero},
    "Uklj": {code: "Uklj", name: "基尔加丹", tip: "", kind: Kind.Unit, race: Race.Undead, type: Type.Hero},
    "Umag": {
        code: "Umag",
        name: "麦哥瑟里登",
        tip: "战士型英雄，善于恐吓敌人。能学习火焰雨、恐怖嚎叫、分裂攻击和魔鬼缠身。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Hero
    },

    "nzlc": {
        code: "nzlc",
        name: "巫妖王(过场动画战役单位)",
        tip: "这就是巫妖王，事实的确是如此的，难道你不相信我么？",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Special
    },
    "uabc": {
        code: "uabc",
        name: "憎恶(过场动画)",
        tip: "重型近战单位。可以学习疾病云雾技能。能攻击地面单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Special
    },
    "Uclc": {
        code: "Uclc",
        name: "克尔苏加德(巫妖，过场动画)",
        tip: "一种神秘的英雄，特别擅长于冰系魔法。能学习到霜冻护甲、霜冻新星、黑暗仪式和死亡凋零技能。能攻击地面和空中单位。",
        kind: Kind.Unit,
        race: Race.Undead,
        type: Type.Special
    },
    "Nkjx": {code: "Nkjx", name: "基尔加丹(过场动画)", tip: "", kind: Kind.Unit, race: Race.Undead, type: Type.Special},
};

const unitNaga = {
    "nmpe": {code: "nmpe", name: "穆格尔奴隶", tip: "", kind: Kind.Unit, race: Race.Naga, type: Type.Unit},
    "nwgs": {code: "nwgs", name: "飞蛇", tip: "", kind: Kind.Unit, race: Race.Naga, type: Type.Unit},
    "nnmg": {code: "nnmg", name: "穆格尔掠夺者", tip: "", kind: Kind.Unit, race: Race.Naga, type: Type.Unit},
    "nnsw": {code: "nnsw", name: "娜迦海妖", tip: "", kind: Kind.Unit, race: Race.Naga, type: Type.Unit},
    "nsnp": {code: "nsnp", name: "飞龙", tip: "", kind: Kind.Unit, race: Race.Naga, type: Type.Unit},
    "nmyr": {code: "nmyr", name: "娜迦暴徒", tip: "", kind: Kind.Unit, race: Race.Naga, type: Type.Unit},
    "nnrg": {code: "nnrg", name: "娜迦皇家卫兵", tip: "", kind: Kind.Unit, race: Race.Naga, type: Type.Unit},
    "nhyc": {code: "nhyc", name: "龙龟", tip: "", kind: Kind.Unit, race: Race.Naga, type: Type.Unit},

    "nnsa": {code: "nnsa", name: "艾萨拉女王神殿", tip: "", kind: Kind.Unit, race: Race.Naga, type: Type.Architecture},
    "nnsg": {code: "nnsg", name: "产卵之地", tip: "", kind: Kind.Unit, race: Race.Naga, type: Type.Architecture},
    "nntt": {code: "nntt", name: "朝汐神庙", tip: "", kind: Kind.Unit, race: Race.Naga, type: Type.Architecture},
    "nnfm": {code: "nnfm", name: "珊瑚礁", tip: "", kind: Kind.Unit, race: Race.Naga, type: Type.Architecture},
    "nnad": {code: "nnad", name: "深渊祭坛", tip: "", kind: Kind.Unit, race: Race.Naga, type: Type.Architecture},
    "nntg": {code: "nntg", name: "守护者", tip: "", kind: Kind.Unit, race: Race.Naga, type: Type.Architecture},

    "Hvsh": {code: "Hvsh", name: "法斯琪", tip: "", kind: Kind.Unit, race: Race.Naga, type: Type.Hero},

    "nnsu": {code: "nnsu", name: "召唤者", tip: "", kind: Kind.Unit, race: Race.Naga, type: Type.Special},
    "nsbs": {code: "nsbs", name: "潜水的飞龙", tip: "", kind: Kind.Unit, race: Race.Naga, type: Type.Special},
    "nmys": {code: "nmys", name: "潜水的娜迦暴徒", tip: "", kind: Kind.Unit, race: Race.Naga, type: Type.Special},
    "nnrs": {code: "nnrs", name: "潜水的娜迦皇家卫兵", tip: "", kind: Kind.Unit, race: Race.Naga, type: Type.Special},
};

const unitNeutralHostile = {
    "ndrj": {
        code: "ndrj",
        name: "达拉然之孤胆怪物",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ndmu": {
        code: "ndmu",
        name: "达拉然之变种怪物",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "njg1": {code: "njg1", name: "丛林漫步者", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nskg": {code: "nskg", name: "巨型骷髅战士", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "njga": {
        code: "njga",
        name: "丛林漫步者长老",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "njgb": {
        code: "njgb",
        name: "怒之丛林漫步者",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "nanb": {
        code: "nanb",
        name: "阿卡那瑟德刺人",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "nanm": {
        code: "nanm",
        name: "阿卡那瑟德刺人",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "nanc": {
        code: "nanc",
        name: "水晶阿卡那瑟德",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "nanw": {
        code: "nanw",
        name: "阿卡那瑟德战士",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "nane": {
        code: "nane",
        name: "阿卡那瑟德掘地者",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "nano": {
        code: "nano",
        name: "阿卡那瑟德领主",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "nabn": {code: "nabn", name: "强盗", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nbrg": {code: "nbrg", name: "土匪", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nrog": {code: "nrog", name: "流氓", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nass": {code: "nass", name: "刺客", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nenf": {code: "nenf", name: "强制者", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nbld": {code: "nbld", name: "强盗领主", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nbdm": {code: "nbdm", name: "龙卵盗贼", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nbda": {code: "nbda", name: "龙卵学徒", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nbdw": {code: "nbdw", name: "龙卵战士", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nbds": {code: "nbds", name: "龙之男巫", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nbdo": {code: "nbdo", name: "龙卵领主", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ncea": {code: "ncea", name: "半人马弓箭手", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ncer": {code: "ncer", name: "半人马苦工", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ncim": {code: "ncim", name: "半人马刺客", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ncen": {code: "ncen", name: "半人马先行者", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ncks": {code: "ncks", name: "半人马巫师", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ncnk": {code: "ncnk", name: "半人马可汗", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nscb": {code: "nscb", name: "蜘蛛螃蟹", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nsc2": {
        code: "nsc2",
        name: "蜘蛛螃蟹肢体斯裂者",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "nsc3": {code: "nsc3", name: "蜘蛛螃蟹巨兽", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ndtr": {code: "ndtr", name: "黑暗巨魔", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ndtp": {code: "ndtp", name: "黑魔影仔牧师", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ndtt": {code: "ndtt", name: "黑魔猎手", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ndth": {code: "ndth", name: "黑魔高级牧师", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ndtb": {code: "ndtb", name: "黑魔狂战士", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ndtw": {code: "ndtw", name: "黑魔首领", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ndrf": {code: "ndrf", name: "达拉内尔守卫", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ndrp": {code: "ndrp", name: "达拉内尔护卫", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ndrm": {code: "ndrm", name: "达拉内尔信徒", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ndrw": {code: "ndrw", name: "达拉内尔哨兵", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ndrh": {code: "ndrh", name: "达拉内尔先驱", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ndrd": {
        code: "ndrd",
        name: "达拉内尔暗黑屠杀者",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ndrs": {code: "ndrs", name: "达拉内尔先知", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nrdk": {code: "nrdk", name: "红幼龙", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nrdr": {code: "nrdr", name: "红蜉蝣", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nrwm": {code: "nrwm", name: "红龙", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nbdr": {code: "nbdr", name: "红幼龙", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nbdk": {code: "nbdk", name: "黑蜉蝣", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nbwm": {code: "nbwm", name: "黑龙", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nbzw": {code: "nbzw", name: "青幼龙", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nbzk": {code: "nbzk", name: "青蜉蝣", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nbzd": {code: "nbzd", name: "青龙", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ngrw": {code: "ngrw", name: "绿幼龙", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ngdk": {code: "ngdk", name: "绿蜉蝣", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ngrd": {code: "ngrd", name: "绿龙", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nadw": {code: "nadw", name: "蓝幼龙", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nadk": {code: "nadk", name: "蓝蜉蝣", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nadr": {code: "nadr", name: "蓝龙", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nnht": {code: "nnht", name: "耐瑟幼龙", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nndk": {code: "nndk", name: "耐瑟蜉蝣", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nndr": {code: "nndr", name: "耐瑟龙", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nrel": {code: "nrel", name: "暗礁元素", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nele": {code: "nele", name: "狂怒元素", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nsel": {code: "nsel", name: "海元素", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nelb": {code: "nelb", name: "狂暴元素", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nenc": {code: "nenc", name: "堕落树人", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nenp": {code: "nenp", name: "毒性树人", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nepl": {code: "nepl", name: "灾祸树人", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ners": {code: "ners", name: "埃瑞达男巫", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nerd": {code: "nerd", name: "埃瑞达信魔者", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nerw": {code: "nerw", name: "埃瑞达法师", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nfor": {code: "nfor", name: "无名骗士", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nfot": {code: "nfot", name: "无名恐怖者", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nfod": {code: "nfod", name: "无名死灵", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nfgu": {code: "nfgu", name: "狂暴守卫", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nfgb": {code: "nfgb", name: "血恶魔", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nfov": {code: "nfov", name: "领主", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "npfl": {code: "npfl", name: "狂暴野兽", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nfel": {code: "nfel", name: "邪恶漫步者", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "npfm": {code: "npfm", name: "狂暴洗劫者", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nftr": {code: "nftr", name: "森林巨魔", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nfsp": {code: "nfsp", name: "树魔影子牧师", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nftt": {code: "nftt", name: "树魔猎手", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nfsh": {code: "nfsh", name: "树魔高级牧师", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nftb": {code: "nftb", name: "树魔狂战士", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nftk": {code: "nftk", name: "树魔首领", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nfrl": {code: "nfrl", name: "熊怪", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nfrs": {code: "nfrs", name: "熊怪萨满", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nfrp": {code: "nfrp", name: "熊猫", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nfrb": {code: "nfrb", name: "熊怪追踪者", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nfre": {code: "nfre", name: "熊怪萨满长者", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nfrg": {code: "nfrg", name: "熊怪战士", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nfra": {code: "nfra", name: "熊怪乌萨战士", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ngh1": {code: "ngh1", name: "幽灵", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ngh2": {code: "ngh2", name: "幽魂", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nsgn": {code: "nsgn", name: "海巨人", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nsgh": {code: "nsgh", name: "深海巨猎人", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nsgb": {code: "nsgb", name: "深海巨兽", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nspb": {code: "nspb", name: "黑蜘蛛", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nspg": {code: "nspg", name: "森林蜘蛛", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nspr": {code: "nspr", name: "蜘蛛", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nssp": {code: "nssp", name: "毒液蜘蛛", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nsgt": {code: "nsgt", name: "巨型蜘蛛", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nsbm": {code: "nsbm", name: "血浴之母", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ngna": {code: "ngna", name: "豺狼偷猎者", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ngns": {code: "ngns", name: "豺狼刺客", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ngno": {code: "ngno", name: "豺狼", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ngnw": {code: "ngnw", name: "豺狼守望者", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ngnb": {code: "ngnb", name: "豺狼野兽", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ngnv": {code: "ngnv", name: "豺狼首领", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ngrk": {code: "ngrk", name: "泥潭傀儡", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ngst": {code: "ngst", name: "岩石傀儡", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nggr": {code: "nggr", name: "花岗岩愧倡", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "narg": {code: "narg", name: "傀偶战士", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nwrg": {code: "nwrg", name: "战争傀儡", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nsgg": {code: "nsgg", name: "攻城傀儡", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nhar": {code: "nhar", name: "女妖侦察者", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nhrr": {code: "nhrr", name: "鹰身女妖流氓", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nhrw": {code: "nhrw", name: "女妖风暴巫师", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nhrh": {code: "nhrh", name: "女妖风暴巫师", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nhrq": {code: "nhrq", name: "女妖女皇", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nhfp": {code: "nhfp", name: "堕落牧师", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nhdc": {code: "nhdc", name: "欺骗者", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nhhr": {code: "nhhr", name: "异教徒", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nhyh": {code: "nhyh", name: "小九头怪蛇", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nhyd": {code: "nhyd", name: "九头怪蛇", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nehy": {code: "nehy", name: "九头怪蛇长者", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nahy": {code: "nahy", name: "远古九头怪蛇", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nitp": {code: "nitp", name: "水魔牧师", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nitr": {code: "nitr", name: "冰之巨魔", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nitt": {code: "nitt", name: "冰魔猎手", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nith": {code: "nith", name: "冰魔高级牧师", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nits": {code: "nits", name: "水魔狂战士", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nitw": {code: "nitw", name: "冰魔首领", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ninc": {code: "ninc", name: "地狱火机关人", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ninm": {code: "ninm", name: "地狱火机械人", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nina": {code: "nina", name: "地狱战舰", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nkob": {code: "nkob", name: "狗头人", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nkot": {code: "nkot", name: "地穴狗头人", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nkog": {code: "nkog", name: "狗头人占卜者", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nkol": {code: "nkol", name: "狗头人首领", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nltl": {code: "nltl", name: "闪电蜥蜴", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nthl": {code: "nthl", name: "雷霆蜥蜴", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nstw": {code: "nstw", name: "风暴巨龙", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nlpr": {code: "nlpr", name: "巨虾", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nltc": {
        code: "nltc",
        name: "马库拉朝汐召唤者",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "nlpd": {code: "nlpd", name: "马库拉池人", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nlsn": {code: "nlsn", name: "马库拉甲鱼", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nlds": {code: "nlds", name: "马库拉先知", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nlkl": {
        code: "nlkl",
        name: "马库拉朝汐领主",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "nwiz": {code: "nwiz", name: "巫师学徒", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nwzr": {code: "nwzr", name: "流氓巫师", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nwzg": {code: "nwzg", name: "巫师变节者", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nwzd": {code: "nwzd", name: "黑暗巫师", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nmgw": {code: "nmgw", name: "玛格娜托战士", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nmgr": {
        code: "nmgr",
        name: "玛格娜托撕裂者",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "nmgd": {
        code: "nmgd",
        name: "玛格娜托破坏者",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "nmam": {code: "nmam", name: "猛犸", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nmit": {code: "nmit", name: "冰牙猛犸", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nmdr": {code: "nmdr", name: "恐怖猛犸", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nmcf": {code: "nmcf", name: "穆格尔岩人", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nmbg": {code: "nmbg", name: "穆格尔血女巫", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nmtw": {
        code: "nmtw",
        name: "穆格尔潮汐战士",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "nmsn": {code: "nmsn", name: "穆格尔猎人", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nmrv": {code: "nmrv", name: "穆格尔掠夺者", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nmsc": {
        code: "nmsc",
        name: "穆格尔影子法师",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "nmrl": {code: "nmrl", name: "两栖追随者", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nmpg": {code: "nmpg", name: "两栖苦难者", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nmrr": {code: "nmrr", name: "两栖人猎手", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nmfs": {code: "nmfs", name: "两栖食肉者", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nmrm": {code: "nmrm", name: "两栖夜行者", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nmmu": {code: "nmmu", name: "变异两栖人", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nspd": {code: "nspd", name: "小蜘蛛", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nnwa": {code: "nnwa", name: "蛛网怪战士", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nnwl": {code: "nnwl", name: "蛛网怪织网者", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nnws": {code: "nnws", name: "蛛网怪首领", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nnwr": {code: "nnwr", name: "蛛网怪预言者", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nnwq": {code: "nnwq", name: "蛛网怪女皇", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nogr": {code: "nogr", name: "食人鬼战士", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nomg": {code: "nomg", name: "食人鬼意法师", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nogm": {code: "nogm", name: "食人鬼拳手", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nogl": {code: "nogl", name: "食人鬼首领", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nowb": {code: "nowb", name: "迅猛野兽", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nowe": {code: "nowe", name: "暴怒野兽", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nowk": {code: "nowk", name: "狂性野兽", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nplb": {code: "nplb", name: "北极熊", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "bplg": {code: "bplg", name: "巨型北极熊", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "bfpl": {code: "bfpl", name: "北极熊怪", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nfps": {code: "nfps", name: "北极熊怪萨满", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nfpt": {
        code: "nfpt",
        name: "北极熊怪追踪者",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "nfpc": {code: "nfpc", name: "北极熊怪战士", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nfpe": {
        code: "nfpe",
        name: "北极熊怪萨满长者",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "nfpu": {
        code: "nfpu",
        name: "北极熊怪乌萨战士",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "nrzt": {code: "nrzt", name: "豪猪", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nrzs": {code: "nrzs", name: "尖毛兽侦察兵", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nqbh": {code: "nqbh", name: "豪猪猎手", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nrzb": {code: "nrzb", name: "尖毛兽野蛮人", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nrzm": {code: "nrzm", name: "尖毛兽医生", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nrzg": {code: "nrzg", name: "尖毛兽酋长", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ntrv": {code: "ntrv", name: "潮汐幽灵", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nrvf": {code: "nrvf", name: "火焰幽魂", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nrvs": {code: "nrvs", name: "霜冻幽魂", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nsrv": {code: "nsrv", name: "海之幽灵", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nrvl": {code: "nrvl", name: "闪电幽魂", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nrvi": {code: "nrvi", name: "冰之幽魂", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ndrv": {code: "ndrv", name: "深渊幽灵", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nrvd": {code: "nrvd", name: "死亡幽魂", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nlrv": {code: "nlrv", name: "深渊领主幽灵", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nslh": {code: "nslh", name: "小蜥蜴", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nslr": {code: "nslr", name: "蜥蜴怪物", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nslv": {code: "nslv", name: "大型蜥蜴怪物", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nsll": {code: "nsll", name: "蜥蜴领主", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nsqt": {code: "nsqt", name: "野人", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nsqe": {code: "nsqe", name: "野人长者", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nsqo": {code: "nsqo", name: "野人神使", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nsqa": {code: "nsqa", name: "古代野人", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nsty": {code: "nsty", name: "赛特斯", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nsat": {
        code: "nsat",
        name: "赛特斯之魔法师",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "nsts": {
        code: "nsts",
        name: "赛特斯之黑暗舞者",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "nstl": {
        code: "nstl",
        name: "赛特斯之灵魂盗贼",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "nsth": {
        code: "nsth",
        name: "赛特斯之地狱使者",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "nsko": {code: "nsko", name: "兽族骷髅", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nsog": {code: "nsog", name: "兽族步兵骷髅", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nsoc": {code: "nsoc", name: "兽族战士骷髅", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nslm": {code: "nslm", name: "淤泥战士", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nslf": {code: "nslf", name: "淤泥投手", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nsln": {code: "nsln", name: "淤泥怪物", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nsra": {
        code: "nsra",
        name: "风暴斯裂者学徒",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "nsrh": {
        code: "nsrh",
        name: "风暴撕裂者隐士",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "nsrn": {
        code: "nsrn",
        name: "风暴斯裂者术士",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "nsrw": {
        code: "nsrw",
        name: "风暴撕裂者巫师",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ndqn": {code: "ndqn", name: "女妖精", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ndqv": {code: "ndqv", name: "恶男", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ndqt": {code: "ndqt", name: "恶妇", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ndqp": {code: "ndqp", name: "痛苦少女", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ndqs": {code: "ndqs", name: "苦难女王", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ntrh": {code: "ntrh", name: "小海龟", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ntrs": {code: "ntrs", name: "海龟", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ntrt": {code: "ntrt", name: "大海龟", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ntrg": {code: "ntrg", name: "大海龟", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ntrd": {code: "ntrd", name: "龙龟", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ntkf": {code: "ntkf", name: "图斯尔格斗者", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ntka": {code: "ntka", name: "图斯卡尔枪兵", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ntkh": {code: "ntkh", name: "图斯卡尔巫师", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ntkt": {code: "ntkt", name: "图斯卡尔猎人", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ntkw": {code: "ntkw", name: "图斯尔战士", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ntks": {code: "ntks", name: "图斯卡尔男巫", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ntkc": {code: "ntkc", name: "图斯尔酋长", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nubk": {code: "nubk", name: "无敌黑暗猎人", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nubr": {code: "nubr", name: "无敌狂暴者", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nubw": {code: "nubw", name: "无敌黑暗舞者", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nvdl": {code: "nvdl", name: "小型虚无行者", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nvdw": {code: "nvdw", name: "虚无行者", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nvdg": {
        code: "nvdg",
        name: "巨大虚无行者长老",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "nvde": {code: "nvde", name: "虚无行者长老", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nwen": {code: "nwen", name: "雪怪", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nwnr": {code: "nwnr", name: "雪怪长者", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nwns": {code: "nwns", name: "雪怪萨满祭司", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nwna": {code: "nwna", name: "远古雪怪", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nwlt": {code: "nwlt", name: "大灰狼", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nwwf": {code: "nwwf", name: "霜冻之狼", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nwlg": {code: "nwlg", name: "巨狼", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nwwg": {code: "nwwg", name: "巨型霜冻之狼", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nwwd": {code: "nwwd", name: "恐怖霜冻之狼", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nwld": {code: "nwld", name: "恐怖之狼", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nska": {code: "nska", name: "骷髅弓箭手", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nskf": {code: "nskf", name: "火焰弓箭手", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nskm": {code: "nskm", name: "骷髅射手", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ninf": {code: "ninf", name: "地狱火", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nbal": {
        code: "nbal",
        name: "毁灭守卫(标准)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },

    "nfgo": {
        code: "nfgo",
        name: "遗忘者",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Architecture
    },

    "nspp": {code: "nspp", name: "灵魂之猪", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Special},
    "nlps": {
        code: "nlps",
        name: "召唤出来的巨虾",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Special
    },
    "ncfs": {code: "ncfs", name: "水奴", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Special},
    "ntws": {code: "ntws", name: "水奴", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Special},
    "nsns": {code: "nsns", name: "水奴", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Special},
    "nsca": {code: "nsca", name: "骷髅弓箭手", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Special},
    "nba2": {
        code: "nba2",
        name: "毁灭守卫(召唤的)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Special
    },

    "nglm": {code: "nglm", name: "地精地雷", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nfgl": {code: "nfgl", name: "灵肉傀儡", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ndrl": {code: "ndrl", name: "达拉内尔工人", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ndrn": {
        code: "ndrn",
        name: "达拉内尔辩护者",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ndrt": {
        code: "ndrt",
        name: "达拉内尔漫步者",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "nogo": {code: "nogo", name: "石槌食人魔", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "nogn": {code: "nogn", name: "石槌法师", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "noga": {code: "noga", name: "石槌酋长", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},
    "ndsa": {code: "ndsa", name: "火断蜴", tip: "", kind: Kind.Unit, race: Race.NeutralHostile, type: Type.Unit},

    "nsw1": {
        code: "nsw1",
        name: "小型灵兽(等级1)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Special
    },
    "nsw2": {
        code: "nsw2",
        name: "灵兽(等级2)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Special
    },
    "nsw3": {
        code: "nsw3",
        name: "大型灵兽(等级3)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralHostile,
        type: Type.Special
    },
};

const unitNeutralPassive = {
    "nske": {code: "nske", name: "骷髅战士", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Unit},
    "nsea": {code: "nsea", name: "海豹", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Unit},
    "nrac": {code: "nrac", name: "浣熊", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Unit},
    "nrat": {code: "nrat", name: "老鼠", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Unit},
    "nshe": {code: "nshe", name: "绵羊", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Unit},
    "ncrb": {code: "ncrb", name: "螃蟹", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Unit},
    "nhmc": {code: "nhmc", name: "螃蟹隐士", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Unit},
    "npng": {code: "npng", name: "企鹅", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Unit},
    "nfro": {code: "nfro", name: "青蛙", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Unit},
    "ndwm": {code: "ndwm", name: "沙丘之虫", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Unit},
    "nvul": {code: "nvul", name: "秃鹰", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Unit},
    "necr": {code: "necr", name: "兔子", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Unit},
    "nech": {code: "nech", name: "小鸡", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Unit},
    "nskk": {code: "nskk", name: "小蜥蜴", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Unit},
    "nalb": {code: "nalb", name: "信天翁", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Unit},
    "nder": {code: "nder", name: "雄鹿", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Unit},
    "nsno": {code: "nsno", name: "雪鹰", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Unit},
    "ndog": {code: "ndog", name: "野狗", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Unit},
    "nfbr": {code: "nfbr", name: "野猪", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Unit},
    "npig": {code: "npig", name: "野猪", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Unit},

    "ngol": {code: "ngol", name: "金矿", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Architecture},
    "ngme": {
        code: "ngme",
        name: "地精商店",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "nfoh": {
        code: "nfoh",
        name: "生命之泉",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "nmoo": {
        code: "nmoo",
        name: "魔法之泉",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "ngad": {
        code: "ngad",
        name: "地精实验室",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "nwgt": {
        code: "nwgt",
        name: "传送门",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "ndrk": {
        code: "ndrk",
        name: "黑龙巢穴",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "ndrr": {
        code: "ndrr",
        name: "红龙巢穴",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "ndru": {
        code: "ndru",
        name: "蓝龙巢穴",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "ndrg": {
        code: "ndrg",
        name: "绿龙巢穴",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "ndro": {
        code: "ndro",
        name: "耐瑟龙栖木",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "ndrz": {
        code: "ndrz",
        name: "青龙巢穴",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "nmer": {
        code: "nmer",
        name: "雇佣兵营地(洛丹伦的夏天)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "nmr2": {
        code: "nmr2",
        name: "雇佣兵营地(洛丹伦的秋天)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "nmr3": {
        code: "nmr3",
        name: "雇佣兵营地(洛丹伦的冬日)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "nmr4": {
        code: "nmr4",
        name: "雇佣兵营地(荒地)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "nmr5": {
        code: "nmr5",
        name: "雇佣兵营地(白杨谷)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "nmr6": {
        code: "nmr6",
        name: "雇佣兵营地(费尔伍德)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "nmr7": {
        code: "nmr7",
        name: "雇佣兵营地(诺森德)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "nmr8": {
        code: "nmr8",
        name: "雇佣兵营地(城邦)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "nmr9": {
        code: "nmr9",
        name: "雇佣兵营地(达拉然)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "nmr0": {
        code: "nmr0",
        name: "雇佣兵营地(村庄)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "nmra": {
        code: "nmra",
        name: "雇佣兵营地(地牢)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "nmrb": {
        code: "nmrb",
        name: "雇佣兵营地(地下)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "ntav": {
        code: "ntav",
        name: "小酒馆",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "ntak": {code: "ntak", name: "市场", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Architecture},
    "nmrc": {
        code: "nmrc",
        name: "雇佣兵营地(下沉的废墟)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "nmrd": {
        code: "nmrd",
        name: "雇佣兵营地(寒冰皇冠水川)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "nshp": {
        code: "nshp",
        name: "地精船坞",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "nmre": {
        code: "nmre",
        name: "雇佣兵营地(边缘之地)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },


    "Nbrn": {code: "Nbrn", name: "黑暗游侠", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Hero},
    "Nfir": {code: "Nfir", name: "伙焰巨魔", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Hero},
    "Nplh": {code: "Nplh", name: "深渊魔王", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Hero},
    "Npbm": {code: "Npbm", name: "熊猫酒仙", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Hero},
    "Nbst": {code: "Nbst", name: "驯兽师", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Hero},
    "Nalc": {code: "Nalc", name: "炼金术士", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Hero},
    "Nngs": {code: "Nngs", name: "娜迦女海巫", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Hero},
    "Ntin": {code: "Ntin", name: "修补匠", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Hero},

    "nlur": {
        code: "nlur",
        name: "怪兽诱捕守卫",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "nsce": {code: "nsce", name: "骷髅战士", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Special},
    "ntor": {code: "ntor", name: "龙卷风", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Special},
    "Nalm": {
        code: "Nalm",
        name: "炼金术士(Morph level 1)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "Nal2": {
        code: "Nal2",
        name: "炼金术士(Morph level 2)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "Nal3": {
        code: "Nal3",
        name: "炼金术士(Morph level 3)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "nsha": {
        code: "nsha",
        name: "绵羊(两栖的)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "nshw": {
        code: "nshw",
        name: "绵羊(水生的)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "npnw": {
        code: "npnw",
        name: "企鹅(水生的)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "nshf": {code: "nshf", name: "乳羊", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Special},
    "nbnb": {
        code: "nbnb",
        name: "钻地的阿卡那瑟德刺人",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "ngzc": {
        code: "ngzc",
        name: "米纱(等级1)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "ngz1": {code: "ngz1", name: "熊(等级1)", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Special},
    "ngzd": {
        code: "ngzd",
        name: "米纱(等级2)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "ngz2": {
        code: "ngz2",
        name: "恕熊(等级2)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "ngz3": {
        code: "ngz3",
        name: "灵魂之熊(等级3)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "ngza": {
        code: "ngza",
        name: "米纱(等级3)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "ngz4": {
        code: "ngz4",
        name: "米纱(等级4)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "nbot": {code: "nbot", name: "运输船", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Special},
    "ncg1": {code: "ncg1", name: "人工地精", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Special},
    "ncgb": {code: "ncgb", name: "人工地精", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Special},
    "ncg2": {code: "ncg2", name: "人工地精", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Special},
    "ncg3": {code: "ncg3", name: "人工地精", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Special},
    "nfac": {
        code: "nfac",
        name: "口袋工厂(Level 1)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "nfa1": {
        code: "nfa1",
        name: "口袋工厂(Level 2)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "nfa2": {
        code: "nfa2",
        name: "口袋工厂(Level 3)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "nwe1": {
        code: "nwe1",
        name: "战鹰(等级1)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "nwe2": {
        code: "nwe2",
        name: "雷霆战鹰(等级2)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "nwe3": {
        code: "nwe3",
        name: "影子战鹰(等级3)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "nfgt": {code: "nfgt", name: "触须", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Special},
    "nzep": {code: "nzep", name: "地精飞艇", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Special},
    "ngsp": {code: "ngsp", name: "地精工兵", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Special},
    "ngir": {code: "ngir", name: "地精斯裂者", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Special},
    "nlv1": {
        code: "nlv1",
        name: "炎魔(等级1)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "nlv2": {
        code: "nlv2",
        name: "炎魔(等级2)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "nlv3": {
        code: "nlv3",
        name: "炎魔(等级3)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "ncnt": {code: "ncnt", name: "半人马帐篷", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Special},
    "nct1": {
        code: "nct1",
        name: "半人马帐篷(2)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "nct2": {
        code: "nct2",
        name: "半人马帐篷(3)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "nth0": {
        code: "nth0",
        name: "水之巨魔小屋",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "nth1": {
        code: "nth1",
        name: "水之巨魔小屋",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "ngnh": {code: "ngnh", name: "豺狼人小屋", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Special},
    "ngt2": {
        code: "ngt2",
        name: "豺狼人小屋2",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "ndch": {
        code: "ndch",
        name: "达拉内尔酋长之屋",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "ndh1": {
        code: "ndh1",
        name: "达拉内尔小屋",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "ndh0": {
        code: "ndh0",
        name: "达拉内尔小屋",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "nmh0": {
        code: "nmh0",
        name: "两栖鱼人小屋0",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "nmh1": {
        code: "nmh1",
        name: "两栖鱼人小屋1",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "nmg0": {
        code: "nmg0",
        name: "穆格尔小屋0",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "nmg1": {
        code: "nmg1",
        name: "穆格尔小屋1",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "ntnt": {code: "ntnt", name: "牛头人帐篷", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Special},
    "ntt2": {code: "ntt2", name: "牛头人帐篷", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Special},
    "ngns": {code: "ngns", name: "女妖巢穴", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Special},
    "nfh1": {
        code: "nfh1",
        name: "森林巨魔小屋",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "nfh0": {
        code: "nfh0",
        name: "森林巨魔小屋",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "nnzg": {code: "nnzg", name: "通灵塔", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Special},
    "nfr1": {code: "nfr1", name: "熊怪小屋", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Special},
    "nfr2": {code: "nfr2", name: "熊怪小屋", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Special},
    "nten": {code: "nten", name: "帐篷", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Special},
    "ntn2": {code: "ntn2", name: "帐篷2", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Special},
    "npn3": {code: "npn3", name: "大地", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Special},
    "npn2": {code: "npn2", name: "风暴", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Special},
    "npn1": {code: "npn1", name: "火焰", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Special},
    "npn6": {
        code: "npn6",
        name: "地之熊猫战士",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "npn5": {
        code: "npn5",
        name: "风之能猫战士",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "npn4": {
        code: "npn4",
        name: "火之熊猫战士",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "nqb1": {
        code: "nqb1",
        name: "豪猪(等级1)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "nqb2": {
        code: "nqb2",
        name: "必恶豪猪(等级2)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "nqb3": {
        code: "nqb3",
        name: "(影子豪猪(等级3)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "nqb4": {
        code: "nqb4",
        name: "狂暴豪猪(等级4)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "ndr1": {code: "ndr1", name: "小黑暗之奴", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Special},
    "ndr2": {code: "ndr2", name: "黑暗之奴", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Special},
    "ndr3": {code: "ndr3", name: "大黑暗之奴", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Special},
    "Nrob": {code: "Nrob", name: "修补匠", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Special},

    "ncat": {
        code: "ncat",
        name: "达拉内尔粉碎者",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Unit
    },
    "nvl2": {code: "nvl2", name: "村民(男性2)", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Unit},
    "nvi1": {code: "nvi1", name: "村民(男性)", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Unit},
    "nvlw": {code: "nvlw", name: "村民(女性)", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Unit},
    "nvlk": {code: "nvlk", name: "小孩", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Unit},
    "nvk2": {code: "nvk2", name: "小孩(2)", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Unit},
    "zcso": {code: "zcso", name: "空间邪恶兽族", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Unit},
    "zhyd": {code: "zhyd", name: "刺蛇", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Unit},
    "zmar": {code: "zmar", name: "马里恩", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Unit},
    "zjug": {
        code: "zjug",
        name: "兽族魔力战舰(过场动画)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Unit
    },
    "zzrg": {code: "zzrg", name: "小狗", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Unit},

    "nzin": {
        code: "nzin",
        name: "地区显示(自定义战役)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "nbse": {
        code: "nbse",
        name: "复活石(面向东南的)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "nbsw": {
        code: "nbsw",
        name: "复活石(面向西南的)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "nico": {
        code: "nico",
        name: "寒水王座方尖塔",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "ndke": {
        code: "ndke",
        name: "异次元大门(面向最南方)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "ndkw": {
        code: "ndkw",
        name: "异次元大门(面向最南方)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "ncb0": {
        code: "ncb0",
        name: "城市建筑物0",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "ncb1": {
        code: "ncb1",
        name: "城市建筑物1",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "ncb2": {
        code: "ncb2",
        name: "城市建筑物2",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "ncb3": {
        code: "ncb3",
        name: "城市建筑物3",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "ncb4": {
        code: "ncb4",
        name: "城市建筑物4",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "ncb5": {
        code: "ncb5",
        name: "城市建筑物5",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "ncb6": {
        code: "ncb6",
        name: "城市建筑物6",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "ncb7": {
        code: "ncb7",
        name: "城市建筑物7",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "ncb8": {
        code: "ncb8",
        name: "城市建筑物8",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "ncb9": {
        code: "ncb9",
        name: "城市建筑物9",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "ncba": {
        code: "ncba",
        name: "城市建筑物10",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "ncbb": {
        code: "ncbb",
        name: "城市建筑物11",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "ncbc": {
        code: "ncbc",
        name: "城市建筑物12",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "ncbd": {
        code: "ncbd",
        name: "城市建筑物13",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "ncbe": {
        code: "ncbe",
        name: "城市建筑物14",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "ncbf": {
        code: "ncbf",
        name: "城市建筑物15",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "ncmw": {
        code: "ncmw",
        name: "月高井",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "ncop": {
        code: "ncop",
        name: "能里圈",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "ncp2": {
        code: "ncp2",
        name: "能里圈(中型)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },
    "ncp3": {
        code: "ncp3",
        name: "能里圈(大型的)",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Architecture
    },


    "Naka": {code: "Naka", name: "阿卡玛", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Hero},

    "nbsp": {code: "nbsp", name: "船只", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Special},
    "ndh3": {
        code: "ndh3",
        name: "达拉内尔兵营",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "ndh2": {
        code: "ndh2",
        name: "达拉内尔港口",
        tip: "",
        kind: Kind.Unit,
        race: Race.NeutralPassive,
        type: Type.Special
    },
    "ndh4": {code: "ndh4", name: "先知洞穴", tip: "", kind: Kind.Unit, race: Race.NeutralPassive, type: Type.Special},

};

//*******************************************************************技能 */
const abilityHuman = {
    "Sch4": {
        code: "Sch4",
        name: "保持原位(罐)",
        tip: "吞噬货物使单位能够容纳别的单位，可以配合装载类技能和卸载类技能的使用。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Unit
    },
    "Aply": {
        code: "Aply",
        name: "变形术",
        tip: "使得敌人的一个单位变成一头小绵羊，保有原有的生命值和防御，但是会使其丧失攻击力。|n不能被用在英雄身上。|n持续<Aply,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Unit
    },
    "Aroc": {
        code: "Aroc",
        name: "弹幕攻击",
        tip: "对周围的敌方空中单位进行强有力的弹幕攻击。每次发射能造成<hrtt,mindmg2> - <hrtt,maxdmg2>点的伤害。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Unit
    },
    "Adef": {
        code: "Adef",
        name: "防御",
        tip: "激活以拥有<Adef,DataF1>%的概率反弹穿刺攻击。对于没有被反弹的攻击，也只会受到<Adef,DataA1,%>%的伤害。如果防御状态被激活，移动速度会变成<Adef,DataC1,%>%的常规速度。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Unit
    },
    "Atdp": {code: "Atdp", name: "放下驾驶员", tip: "", kind: Kind.Ability, race: Race.Human, type: Type.Unit},
    "Agyb": {
        code: "Agyb",
        name: "飞行机器炸弹",
        tip: "使得飞行机器能攻击地面单位。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Unit
    },
    "Asth": {
        code: "Asth",
        name: "风暴战锤",
        tip: "让狮鹫骑士的战锤能进行弹射，从而对多个敌人造成伤害。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Unit
    },
    "Apxf": {
        code: "Apxf",
        name: "凤凰火焰",
        tip: "火焰流淌，灼烧附近的敌单位。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Unit
    },
    "Aflk": {
        code: "Aflk",
        name: "高射炮火",
        tip: "强大的加农炮对空将会造成区域性伤害。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Unit
    },
    "Srtt": {code: "Srtt", name: "混乱的", tip: "", kind: Kind.Ability, race: Race.Human, type: Type.Unit},
    "Aphx": {
        code: "Aphx",
        name: "火凤凰变形(和凤凰蛋有关的",
        tip: "",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Unit
    },
    "Aslo": {
        code: "Aslo",
        name: "减速",
        tip: "减慢目标单位<Aslo,DataB1,%>%的攻击速度和<Aslo,DataA1,%>%的移动速度。|n持续<Aslo,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Unit
    },
    "AHbu": {code: "AHbu", name: "建造人族", tip: "", kind: Kind.Ability, race: Race.Human, type: Type.Unit},
    "Afih": {code: "Afih", name: "开火人族", tip: "", kind: Kind.Ability, race: Race.Human, type: Type.Unit},
    "Amls": {
        code: "Amls",
        name: "空中锁镣",
        tip: "以魔力禁锢一个目标敌空中单位，使其不能移动或攻击，并每秒受到<Amls,DataA1>伤害力。|n持续<Amls,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Unit
    },
    "Acmg": {
        code: "Acmg",
        name: "控制魔法",
        tip: "控制一个敌军的召唤单位。消耗的魔法值基为召唤单位生命值的<Acmg,DataB1,%>%。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Unit
    },
    "Asps": {
        code: "Asps",
        name: "魔法盗取",
        tip: "从敌人身上盗取正面效果的魔法并将其运用到附近的友军单位身上。或者是将友军单位身上的一个负面效果魔法应用到敌方单位身上。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Unit
    },
    "Amdf": {
        code: "Amdf",
        name: "魔法防御",
        tip: "激活该技能来获得魔法免疫，但是会减慢<Adef,DataC1,%>%的移动速度。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Unit
    },
    "Adts": {
        code: "Adts",
        name: "魔法岗哨人族的防御塔",
        tip: "显示周围的隐形单位。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Unit
    },
    "Afbk": {
        code: "Afbk",
        name: "魔法回应(魔法破坏者)",
        tip: "魔法破坏者每次攻击消耗目标<Afbk,DataA1>点魔法值。魔法燃烧后将会对攻击对象造成伤害。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Unit
    },
    "Afbt": {
        code: "Afbt",
        name: "魔法回应(神秘之塔)",
        tip: "塔的每次攻击消耗目标<Afbt,DataA1>点魔法值，同时还对于目标造成相同数值的伤害。|n|n这种塔的攻击对于召唤出来的单位还能造成<Afbt,DataE1>点的附加伤害。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Unit
    },
    "Asph": {
        code: "Asph",
        name: "球体",
        tip: "该技能能够给单位绑定模型，该模型会在单位攻击或施法时播放死亡动画，魔法施放冷却时间过后才会重新创建，并播放该模型的诞生动画。单位死亡则特效消失。另外，该技能能在单位施放技能至发动技能期间，向目标释放投射物，投射物到达时间等同于单位的施法前摇。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Unit
    },
    "Adis": {
        code: "Adis",
        name: "驱逐魔法",
        tip: "驱散目标区域内的所有魔法效果。|n|cffffcc00能对召唤出来的单位造成<Adis,DataB1>的伤害。|r",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Unit
    },
    "Afsh": {
        code: "Afsh",
        name: "碎片攻击",
        tip: "迫击炮小队使用碎片攻击的迫击炮，将会增加其对无护甲和中型护甲单位的伤害。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Unit
    },
    "Aclf": {
        code: "Aclf",
        name: "乌云技能",
        tip: "施放在具有远程攻击能力的敌方建筑物上使其丧失攻击力。|n持续<Aclf,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Unit
    },
    "AHta": {
        code: "AHta",
        name: "显示",
        tip: "在地图上显示一块区域。|n探测到隐形的单位。|n持续<AHta,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Unit
    },
    "attu": {code: "attu", name: "小塔", tip: "", kind: Kind.Ability, race: Race.Human, type: Type.Unit},
    "Ainf": {
        code: "Ainf",
        name: "心灵之火",
        tip: "增加目标友军单位<Ainf,DataA1,%>%的攻击力和<Ainf,DataB1>的防御力。|n持续<Ainf,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Unit
    },
    "Ahrp": {
        code: "Ahrp",
        name: "修理(人族)",
        tip: "修理建筑物和机械单位，需要消耗资源。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Unit
    },
    "Ahea": {
        code: "Ahea",
        name: "医疗",
        tip: "医疗一个友军的非机械受伤单位，恢复其<Ahea,DataA1>的生命值。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Unit
    },
    "Aivs": {
        code: "Aivs",
        name: "隐形术",
        tip: "使目标单位处于隐形，但是一旦其攻击或者使用魔法则会显露原形。|n持续 <Aivs,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Unit
    },
    "Amic": {
        code: "Amic",
        name: "战斗号召(城镇大厅)",
        tip: "让附近的农民过来从而让其变成民兵。|n持续<Amil,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Unit
    },
    "Amil": {
        code: "Amil",
        name: "战斗号召(农民)",
        tip: "让农民跑到最近的一个城镇大厅从而转变成民兵。|n持续<Amil,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Unit
    },
    "Afla": {
        code: "Afla",
        name: "照明弹",
        tip: "在目标区域内投射一颗矮人族的照明弹，从而在<Afla,Dur1>秒的时间内驱散那里的战争迷雾。|n也能探测到隐形单位。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Unit
    },
    "Agyv": {
        code: "Agyv",
        name: "真实视域(飞行机器)",
        tip: "显示周围的隐形单位。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Unit
    },
    "Atlp": {code: "Atlp", name: "装载驾驶员", tip: "", kind: Kind.Ability, race: Race.Human, type: Type.Unit},

    "AHbz": {
        code: "AHbz",
        name: "暴风雪",
        tip: "能召唤出若干次冰片攻击，对目标区域内的单位造成一定的伤害。|n|n|cffffcc00等级 1|r -<AHbz,DataA1>次攻击，每次造成<AHbz,DataB1>点的伤害。|n|cffffcc00等级 2|r -<AHbz,DataA2>次攻击，每次造成<AHbz,DataB2>点的伤害。|n|cffffcc00等级 3|r -<AHbz,DataA3>次攻击，每次造成<AHbz,DataB3>点的伤害。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Hero
    },
    "AHtb": {
        code: "AHtb",
        name: "风暴之锤",
        tip: "向目标投掷一巨大的魔法锤，对其造成一定伤害并使其处于眩晕状态。|n|n|cffffcc00等级 1|r - <AHtb,DataA1>点伤害，<AHtb,Dur1>秒眩晕状态。|n|cffffcc00等级 2|r - <AHtb,DataA2>点伤害，<AHtb,Dur2>秒眩晕状态。|n|cffffcc00等级 3|r - <AHtb,DataA3>点伤害，<AHtb,Dur3>秒眩晕状态。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Hero
    },
    "AHre": {
        code: "AHre",
        name: "复活",
        tip: "复活周围<AHre,DataA1>个友军单位。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Hero
    },
    "AHab": {
        code: "AHab",
        name: "辉煌光环",
        tip: "能加快周围友军单位的魔法值恢复速度。|n|n|cffffcc00等级 1|r -能缓慢地加快周围友军的魔法值恢复速度。|n|cffffcc00等级 2|r -能稍快地加快周围友军的魔法值恢复速度。|n|cffffcc00等级 3|r -能迅速地加快周围友军的魔法值恢复速度。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Hero
    },
    "AHpx": {
        code: "AHpx",
        name: "火凤凰",
        tip: "召唤一只强大的火凤凰。火凤凰全身燃烧剧烈的火焰，烧伤附近的空中敌人。具有魔法免疫、抗性皮肤。当火凤凰死后，会变成一只蛋，可以再次孵化成火凤凰。|n|n|cffffcc00能攻击地面和空中单位。|r",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Hero
    },
    "AHtc": {
        code: "AHtc",
        name: "雷霆一击",
        tip: "重击地面，对周围的地面单位造成伤害并减慢其移动速度和攻击速度。|n|n|cffffcc00等级 1|r - <AHtc,DataA1>点伤害，<AHtc,DataC1,%>%的移动速度，<AHtc,DataD1,%>%的攻击速度。|n|cffffcc00等级 2|r - <AHtc,DataA2>点伤害，<AHtc,DataC2,%>%的移动速度，<AHtc,DataD2,%>%的攻击速度。|n|cffffcc00等级 3|r - <AHtc,DataA3>点伤害，<AHtc,DataC3,%>%的移动速度，<AHtc,DataD3,%>%的攻击速度。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Hero
    },
    "AHfs": {
        code: "AHfs",
        name: "烈焰风暴",
        tip: "召唤出一道巨大的火焰，对目标区域内的敌方步兵造成长时间的伤害。|n|n|cffffcc00等级 1|r -持续3秒，每秒45点的伤害，在接下来的6秒时间内持续造成极度轻微的伤害。|n|cffffcc00等级 2|r -持续3秒，每秒80点的伤害，在接下来的6秒时间内持续造成轻微的伤害。|n|cffffcc00等级 3|r -持续3秒，每秒110点的伤害，在接下来的6秒时间内持续造成中等程度的伤害。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Hero
    },
    "AHdr": {
        code: "AHdr",
        name: "魔法吸吮",
        tip: "让魔法能量在血魔法师和目标单位之间转移。能每秒吸取敌人一定点数的魔法值。或者是每秒向己方单位转移一定点数的魔法值。|n|n吸吮魔法能让血魔法师的魔法值超过它自己的最大值。但是如果你不是尽快使用超量的魔法值的话，那么这些魔法值会很快地消失。|n持续<AHdr,Dur1>秒。|n|n|cffffcc00等级 1|r - 每秒吸取点<AHdr,DataB1>魔法值。|n|cffffcc00等级 2|r - 每秒吸取<AHdr,DataB2>点魔法值。 |n|cffffcc00等级 3|r - 每秒吸取<AHdr,DataB3>点魔法值。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Hero
    },
    "AHbn": {
        code: "AHbn",
        name: "驱散",
        tip: "使一个非机械单位的重量变轻，并通过 <AHbn,DataA1,%>% 在较短时期降低其移动速度。 变轻的单位不能攻击，但是他们能够施放魔法，几个魔法可以形成更强大的攻击。 |n|n|cffffcc00等级 1|r - <AHbn,Cost1> 魔法, 持续 <AHbn,Dur1> 秒。 |n|cffffcc00等级 2|r - <AHbn,Cost2> 魔法, 持续 <AHbn,Dur2> 秒。 |n|cffffcc00等级 3|r - <AHbn,Cost3> 魔法, 持续 <AHbn,Dur3> 秒。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Hero
    },
    "AHmt": {
        code: "AHmt",
        name: "群体传送",
        tip: "将<AHmt,DataA1>个单位（包括大魔法师在内）传送到一个友军单位或者建筑物旁边。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Hero
    },
    "AHds": {
        code: "AHds",
        name: "神圣护甲",
        tip: "在一定的时间内使得圣骑士对所有的攻击免疫。|n|n|cffffcc00等级 1|r - 持续<AHds,Dur1>秒。|n|cffffcc00等级 2|r - 持续<AHds,Dur2>秒。|n|cffffcc00等级 3|r - 持续<AHds,Dur3>秒。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Hero
    },
    "AHhb": {
        code: "AHhb",
        name: "神圣之光",
        tip: "神圣之光能治愈友军单位或者对敌军的不死单位造成一定的伤害。|n|n|cffffcc00等级 1|r - 恢复友军单位<AHhb,DataA1>点的生命值。|n|cffffcc00等级 2|r - 恢复友军单位<AHhb,DataA2>点的生命值。|n|cffffcc00等级 3|r - 恢复友军单位<AHhb,DataA3>点的生命值。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Hero
    },
    "AHav": {
        code: "AHav",
        name: "天神下凡",
        tip: "激活了该技能以后能提高山丘之王<AHav,DataA1>点的护甲, <AHav,DataB1>点的生命值,<AHav,DataC1> 点的攻击力并使其对魔法免疫。|n持续<AHav,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Hero
    },
    "AHwe": {
        code: "AHwe",
        name: "召唤水元素",
        tip: "召唤出一个水元素来帮大魔法师进行战斗。|n持续<AHwe,Dur1>秒。|n|n|cffffcc00能攻击地面和空中单位。|r|n|n|cffffcc00等级 1|r - <hwat,realHP>点生命值，<hwat,mindmg1>-<hwat,maxdmg1>点的伤害。|n|cffffcc00等级 2|r - <hwt2,realHP>点生命值，<hwt2,mindmg1>-<hwt2,maxdmg1>点的伤害。|n|cffffcc00等级 3|r - <hwt3,realHP>点生命值，<hwt3,mindmg1>-<hwt3,maxdmg1>点的伤害。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Hero
    },
    "AHbh": {
        code: "AHbh",
        name: "重击",
        tip: "给予一定的概率使得山丘之王的常规攻击能附带<AHbh,DataC1>点的附加伤害值并在<AHbh,Dur1>秒内使得对手处于眩晕状态。|n|n|cffffcc00等级 1|r - 每次攻击<AHbh,DataA1>%的概率。|n|cffffcc00等级 2|r - 每次攻击<AHbh,DataA2>%的概率。|n|cffffcc00等级 3|r - 每次攻击<AHbh,DataA3>%的概率。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Hero
    },
    "AHad": {
        code: "AHad",
        name: "专注光环",
        tip: "为周围友军提供一定额外的护甲。|n|n|cffffcc00等级 1|r - 增加<AHad,DataA1>点的护甲。|n|cffffcc00等级 2|r - 增加<AHad,DataA2>点的护甲。|n|cffffcc00等级 3|r - 增加<AHad,DataA3>点的护甲。",
        kind: Kind.Ability,
        race: Race.Human,
        type: Type.Hero
    },
};

const abilityOrc = {
    "Auco": {
        code: "Auco",
        name: "不稳定化合物",
        tip: "制造出一次强力爆炸，对目标敌方空中单位造成<Auco,DataB1>点伤害，对周围敌空中单位造成<Auco,DataD1>点伤害。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Unit
    },
    "Awar": {
        code: "Awar",
        name: "粉碎",
        tip: "给予<Awar,DataA1>%的概率使得攻击能对周围的单位造成<Awar,DataB1>点的伤害。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Unit
    },
    "Aeye": {
        code: "Aeye",
        name: "岗哨守卫",
        tip: "能召唤出一个固定隐形的守卫来监视一定的区域。|n能看见隐形单位。|n持续<Aeye,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Unit
    },
    "Apak": {
        code: "Apak",
        name: "行囊技能",
        tip: "让该单位能为英雄携带物品。物品在处于该单位物品栏里的时候不能被使用。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Unit
    },
    "Sca6": {code: "Sca6", name: "混乱的(格罗姆)", tip: "", kind: Kind.Ability, race: Race.Orc, type: Type.Unit},
    "Sca4": {code: "Sca4", name: "混乱的(科多兽)", tip: "", kind: Kind.Ability, race: Race.Orc, type: Type.Unit},
    "Sca5": {code: "Sca5", name: "混乱的(苦工)", tip: "", kind: Kind.Ability, race: Race.Orc, type: Type.Unit},
    "Sca2": {code: "Sca2", name: "混乱的(掠夺者)", tip: "", kind: Kind.Ability, race: Race.Orc, type: Type.Unit},
    "Sca3": {code: "Sca3", name: "混乱的(萨满祭司)", tip: "", kind: Kind.Ability, race: Race.Orc, type: Type.Unit},
    "Sca1": {code: "Sca1", name: "混乱的(兽族步兵)", tip: "", kind: Kind.Ability, race: Race.Orc, type: Type.Unit},
    "Abun": {
        code: "Abun",
        name: "货物保持(兽 族地洞)",
        tip: "吞噬货物使单位能够容纳别的单位，可以配合装载类技能和卸载类技能的使用。该技能能使单位失去攻击能力直到装载其他单位",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Unit
    },
    "Arbr": {code: "Arbr", name: "加强型地洞升级", tip: "", kind: Kind.Ability, race: Race.Orc, type: Type.Unit},
    "Aspi": {code: "Aspi", name: "尖形路障", tip: "", kind: Kind.Ability, race: Race.Orc, type: Type.Unit},
    "AObu": {code: "AObu", name: "建造(兽族)", tip: "", kind: Kind.Ability, race: Race.Orc, type: Type.Unit},
    "Aven": {
        code: "Aven",
        name: "浸毒武器",
        tip: "能造成每秒<Aven,DataA1>点的毒性伤害。|n持续<Aven,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Unit
    },
    "Aprg": {
        code: "Aprg",
        name: "净化",
        tip: "去除目标单位上的所有魔法效果，并以<Aprg,DataA1>分之1的速度来减慢其移动速度。目标单位会在<Aprg,Dur1>秒内慢慢恢复自己的速度。|n|cffffcc00对召唤出来的单位造成<Aprg,DataC1>点的伤害。|r",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Unit
    },
    "Apg2": {
        code: "Apg2",
        name: "净化",
        tip: "去除目标单位身上所有的魔法效果。敌方单位会被固定住,持续时间为<Apg2,DataD1>秒。并且他们的移动速度也会以<Apg2,DataA1>的一个因子值来被减慢。不过在<Apg2,Dur1>秒的时间内，他们的移动速度会慢慢地恢复过来。|n|cffffcc00对召唤出来地单位造成<Apg2,DataC1>点的伤害。|r",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Unit
    },
    "Asta": {
        code: "Asta",
        name: "静止陷阱",
        tip: "召唤出一个固定隐形的陷阱来击晕靠近的敌方地面单位。当有敌方的地点单位靠近陷阱的时候会自动激活守卫。|n持续<Asta,Dur1>秒。|n眩晕效果持续<Asta,DataD1>秒。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Unit
    },
    "Afio": {code: "Afio", name: "开火(兽族)", tip: "", kind: Kind.Ability, race: Race.Orc, type: Type.Unit},
    "Sbsk": {code: "Sbsk", name: "狂暴愤怒升级", tip: "", kind: Kind.Ability, race: Race.Orc, type: Type.Unit},
    "Absk": {
        code: "Absk",
        name: "狂战士",
        tip: "让该单位增加<Absk,DataB1,%>%的攻击速度，但是同时会受到额外<Absk,DataC1,%>%的伤害。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Unit
    },
    "Aspl": {
        code: "Aspl",
        name: "灵魂锁链",
        tip: "链接<Aspl,DataB1>个单位在一起。所有被灵魂锁链作用的单位都可以将其<Aspl,DataA1,%>%受到的伤害转移到其他单位身上。|n持续<Aspl,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Unit
    },
    "Acpf": {
        code: "Acpf",
        name: "灵肉形态",
        tip: "让灵魂行者处于灵肉形态，从而能进行攻击也会遭到敌方物理攻击的伤害。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Unit
    },
    "Asal": {
        code: "Asal",
        name: "掠夺",
        tip: "能使对敌方建筑物的攻击带来一定的资源。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Unit
    },
    "Abof": {
        code: "Abof",
        name: "燃烧之油",
        tip: "用凝固汽油浇在粉碎者的弹药上，使它们能够点燃地面，烧伤敌人。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Unit
    },
    "Alsh": {
        code: "Alsh",
        name: "闪电护盾",
        tip: "在目标单位周围形成一个带电护罩，能对其周围的单位造成每秒<Alsh,DataA1>点的伤害。|n持续<Alsh,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Unit
    },
    "Ablo": {
        code: "Ablo",
        name: "嗜血术",
        tip: "增加一个友军单位<Ablo,DataA1,%>%的攻击速度和<Ablo,DataB1,%>%的移动速度。|n持续<Ablo,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Unit
    },
    "Adt1": {code: "Adt1", name: "探测者(岗哨守卫)", tip: "", kind: Kind.Ability, race: Race.Orc, type: Type.Unit},
    "Adev": {
        code: "Adev",
        name: "吞噬",
        tip: "吞噬敌方目标单位，将其慢慢咀嚼，每秒对其造成<Advc,DataC1>点的伤害。在咀嚼目标的过程中，如果科多兽遭到杀害，那么它肚中的被吞噬单位就会从中跳出来。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Unit
    },
    "Advc": {
        code: "Advc",
        name: "吞噬货物",
        tip: "吞噬货物使单位能够容纳别的单位，可以配合装载类技能和卸载类技能的使用。造成法术攻击，酸性伤害(加强伤害)",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Unit
    },
    "Aast": {
        code: "Aast",
        name: "先祖幽灵",
        tip: "将一个死亡的非英雄牛头人重新复活。复活的牛头人具有先前<Aast,DataA1,%>%的生命值。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Unit
    },
    "Adcn": {
        code: "Adcn",
        name: "消魔",
        tip: "驱散目标区域上的所有的魔法效果。|n|cffffcc00对敌对召唤单位造成<Adcn,DataB1>点的伤害。|r",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Unit
    },
    "Adch": {
        code: "Adch",
        name: "消魔(年长的)",
        tip: "驱散目标区域单位身上所有的魔法效果。|n|cffffcc00对召唤出来的单位造成<Adch,DataB1>点的伤害。|r",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Unit
    },
    "Astd": {
        code: "Astd",
        name: "卸载苦工",
        tip: "使得地洞内的苦工重新回到自己的工作岗位上。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Unit
    },
    "Arep": {
        code: "Arep",
        name: "修理",
        tip: "修理建筑物和机械单位，需要消耗资源。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Unit
    },
    "Aetf": {
        code: "Aetf",
        name: "虚无形态",
        tip: "让灵魂行者处于虚无形态，从而对物理攻击免疫，但是自己也会丧失物理进攻能力。此外灵魂行者能施放魔法，但是敌人的魔法也会对其造成额外的伤害。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Unit
    },
    "Aliq": {
        code: "Aliq",
        name: "液体炸弹",
        tip: "对建筑物投掷出液体炸弹从而对其造成持续性的伤害。正在受到液体炸弹作用的建筑物不能被修复，并将其攻击速率下降<Aliq,DataC1,%>%。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Unit
    },
    "Aens": {
        code: "Aens",
        name: "诱捕",
        tip: "能将一个目标空中单位固定在地面上，使其在<Aens,Dur1>秒内不能移动。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Unit
    },
    "Sbtl": {
        code: "Sbtl",
        name: "战备状态(混乱的兽族地洞)",
        tip: "使得附近的苦工跑入地洞从而对来犯的敌人进行反击。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Unit
    },
    "Abtl": {
        code: "Abtl",
        name: "战斗位置",
        tip: "使得附近的苦工跑入地洞从而对来犯的敌人进行反击。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Unit
    },
    "Aakb": {
        code: "Aakb",
        name: "战鼓",
        tip: "能增加周围友军单位的攻击力。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Unit
    },
    "Ahwd": {
        code: "Ahwd",
        name: "治疗守卫(巨魔巫医)",
        tip: "召唤出一个固定的守卫，该守卫能以每秒<Aoar,DataA1,%>%的速度来恢复周围友军非机械单位的生命值。|n持续<Ahwd,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Unit
    },
    "Aoar": {
        code: "Aoar",
        name: "治疗守卫光环(治疗守卫)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Unit
    },
    "Achl": {code: "Achl", name: "装载", tip: "", kind: Kind.Ability, race: Race.Orc, type: Type.Unit},
    "Sloa": {
        code: "Sloa",
        name: "装载(兽族地洞)",
        tip: "装载一个指定的友方地面单位。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Unit
    },

    "AOeq": {
        code: "AOeq",
        name: "地震",
        tip: "使得大地发生颤抖，对有效范围内的建筑物造成每秒<AOeq,DataB1>点的伤害，并使该范围内的单位减速<AOeq,DataC1,%>%。持续<AOeq,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Hero
    },
    "AOsw": {
        code: "AOsw",
        name: "毒蛇守卫",
        tip: "召唤出一个固定不动的毒蛇守卫来为暗影猎手攻击。并对魔法免疫。|n持续<AOsw,Dur1>秒。|n|n|cffffcc00能攻击地面和空中单位。|r|n|n|cffffcc00等级 1|r - <osp1,realHP>点生命值，<osp1,mindmg1> - <osp1,maxdmg1>点攻击力。|n|cffffcc00等级 2|r - <osp2,realHP>点生命值，<osp2,mindmg1> - <osp2,maxdmg1>点攻击力。|n|cffffcc00等级 3|r - <osp3,realHP>点生命值，<osp3,mindmg1> - <osp3,maxdmg1>点攻击力。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Hero
    },
    "Arsw": {
        code: "Arsw",
        name: "毒蛇守卫(洛克汗)",
        tip: "召唤出一个固定不动的毒蛇守卫来为暗影猎手攻击。守卫对魔法免疫。|n持续<Arsw,Dur1>秒。|n|n|cffffcc00能攻击地面和空中单位。|r|n|n|cffffcc00等级 1|r -<osp1,realHP>点生命值，<osp1,mindmg1>-<osp1,maxdmg1>点攻击力。|n|cffffcc00等级 2|r -<osp2,realHP>点生命值，<osp2,mindmg1>-<osp2,maxdmg1>点攻击力。|n|cffffcc00等级 3|r -<osp3,realHP>点生命值，<osp3,mindmg1>-<osp3,maxdmg1>点攻击力。|n|cffffcc00等级 4|r -<osp4,realHP>点生命值，<osp4,mindmg1>-<osp4,maxdmg1>点溅射攻击力。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Hero
    },
    "AOwk": {
        code: "AOwk",
        name: "疾步风",
        tip: "使得剑圣在一定时间内隐形并加快移动速度，如果此时进行攻击的话，那么就不再隐形但会造成更多的伤害。|n|n|cffffcc00等级 1|r -消耗<AOwk,Cost1>点魔法，加快<AOwk,DataB1,%>%的移动速度，增加<AOwk,DataC1>点的伤害，持续<AOwk,Dur1>秒。|n|cffffcc00等级 2|r -消耗<AOwk,Cost2>点魔法，加快<AOwk,DataB2,%>%的移动速度，增加<AOwk,DataC2>点的伤害，持续<AOwk,Dur2>秒。|n|cffffcc00等级 3|r -消耗<AOwk,Cost3>点魔法，加快<AOwk,DataB3,%>%的移动速度，增加<AOwk,DataC3>点的伤害，持续<AOwk,Dur3>秒。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Hero
    },
    "AOww": {
        code: "AOww",
        name: "剑刃风暴",
        tip: "使得剑圣周围能形成一股具有极强攻击力的剑刃风暴。对周围敌方的地面单位造成每秒<AOww,DataA1>点的伤害。|n持续<AOww,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Hero
    },
    "AOmi": {
        code: "AOmi",
        name: "镜像",
        tip: "制造出一定数量的幻象来迷惑敌人。同时也会驱逐掉剑圣身上所有的魔法效果。|n|n|cffffcc00等级 1|r - 创造出<AOmi,DataA1>个幻象。|n|cffffcc00等级 2|r - 创造出<AOmi,DataA2>个幻象。|n|cffffcc00等级 3|r - 创造出<AOmi,DataA3>个幻象。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Hero
    },
    "AOae": {
        code: "AOae",
        name: "耐久光环",
        tip: "能增加周围单位的移动速度和攻击速度。|n|n|cffffcc00等级 1|r - 提高<AOae,DataA1,%>%的移动速度和<AOae,DataB1,%>%的攻击速度。|n|cffffcc00等级 2|r - 提高<AOae,DataA2,%>%的移动速度和<AOae,DataB2,%>%的攻击速度。|n|cffffcc00等级 3|r - 提高<AOae,DataA3,%>%的移动速度和<AOae,DataB3,%>%的攻击速度。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Hero
    },
    "AOr2": {
        code: "AOr2",
        name: "耐久光环(卡林)",
        tip: "增加周围单位的移动和攻击速度。|n|n|cffffcc00等级 1|r - <AOr2,DataA1,%>%的移动速度和<AOr2,DataB1,%>%的攻击速度。|n|cffffcc00等级 2|r - <AOr2,DataA2,%>%的移动速度和<AOr2,DataB2,%>%的攻击速度。|n|cffffcc00等级 3|r - <AOr2,DataA3,%>%的移动速度和<AOr2,DataB3,%>%的攻击速度。|n|cffffcc00等级 4|r - <AOr2,DataA4,%>%的移动速度和<AOr2,DataB4,%>%的攻击速度。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Hero
    },
    "AOcl": {
        code: "AOcl",
        name: "闪电链",
        tip: "投掷出一道能进行跳跃的闪电。每次跳跃都会减小闪电的攻击力。|n|n|cffffcc00等级 1|r - <AOcl,DataA1>点伤害，跳跃<AOcl,DataB1>次。|n|cffffcc00等级 2|r - <AOcl,DataA2>点伤害，跳跃<AOcl,DataB2>次。|n|cffffcc00等级 3|r - <AOcl,DataA3>点伤害，跳跃<AOcl,DataB3>次。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Hero
    },
    "AOfs": {
        code: "AOfs",
        name: "透视",
        tip: "能在一定时间内驱散目标区域内的战争迷雾。还能看见敌方的隐形单位。|n|n|cffffcc00等级 1|r - 消耗<AOfs,Cost1>点魔法。|n|cffffcc00等级 2|r - 消耗<AOfs,Cost2>点魔法。|n|cffffcc00等级 3|r - 消耗<AOfs,Cost3>点魔法。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Hero
    },
    "AOvd": {
        code: "AOvd",
        name: "巫毒",
        tip: "将在暗影猎手附近一定区域内的所有友军单位都变为无敌。|n但是暗影猎手自己不会变为无敌。|n持续<AOvd,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Hero
    },
    "AOls": {
        code: "AOls",
        name: "巫毒幽魂",
        tip: "召唤出愤怒的幽灵来汲取敌人的生命值，幽灵能将汲取到的生命值补充到洛克汗的身上。|n|n|cffffcc00等级 1|r — <AOls,DataA1> 个幽灵。 |n|cffffcc00等级 2|r — <AOls,DataA2>幽灵。|n|n持续<AOls,HeroDur1>秒。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Hero
    },
    "AOhx": {
        code: "AOhx",
        name: "妖术",
        tip: "让目标单位在<AOhx,Dur1>秒内变成一只随机的小动物, 废除其特殊技能的使用。|n|n|cffffcc00等级 1|r - 持续<AOhx,Dur1>秒。|n|cffffcc00等级 2|r - 持续<AOhx,Dur2>秒。|n|cffffcc00等级 3|r - 持续<AOhx,Dur3>秒。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Hero
    },
    "ANhx": {
        code: "ANhx",
        name: "妖术(洛克汗)",
        tip: "将敌方某个单位变成一种随机的小动物。|n|n|cffffcc00等级 1|r - 消耗<ANhx,Cost1>点魔法，持续<ANhx,Dur1>秒。|n|cffffcc00等级 2|r - 消耗<ANhx,Cost2>点魔法，持续<ANhx,Dur2>秒。|n|cffffcc00等级 3|r - 消耗<ANhx,Cost3>点魔法，持续<ANhx,Dur3>秒。|n|cffffcc00等级 4|r - 消耗<ANhx,Cost4>点魔法，持续<ANhx,Dur4>秒。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Hero
    },
    "AOsf": {
        code: "AOsf",
        name: "野兽幽魂",
        tip: "召唤出<AOsf,DataB1>头幽狼来为你战斗。|n持续<AOsf,Dur1>秒。|n|n|cffffcc00等级 1|r -<osw1,realHP>点生命值，<osw1,mindmg1>-<osw1,maxdmg1>点的攻击力。|n|cffffcc00等级 2|r -<osw2,realHP>点生命值，<osw2,mindmg1>-<osw2,maxdmg1>点攻击力，且具有致命一击技能。|n|cffffcc00等级 3|r -<osw3,realHP>点生命值，<osw3,mindmg1>-<osw3,maxdmg1>点攻击力，且具有致命一击和隐形技能。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Hero
    },
    "AOhw": {
        code: "AOhw",
        name: "医疗波",
        tip: "召唤出一道能进行跳跃的医疗能量波，每次跳跃都会削弱医疗波的医疗能力。|n|n|cffffcc00等级 1|r - 恢复<AOhw,DataA1>点生命值，跳跃<AOhw,DataB1>次。|n|cffffcc00等级 2|r - 恢复<AOhw,DataA2>点生命值，跳跃<AOhw,DataB2>次。|n|cffffcc00等级 3|r - 恢复<AOhw,DataA3>点生命值，跳跃<AOhw,DataB3>次。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Hero
    },
    "ANhw": {
        code: "ANhw",
        name: "医疗波(洛克汗)",
        tip: "召唤出一道能进行跳跃的医疗能量波，每次跳跃都会削弱医疗波的医疗能力。|n|n|cffffcc00等级 1|r - 恢复<ANhw,DataA1>点生命值，跳跃<ANhw,DataB1>次。|n|cffffcc00等级 2|r - 恢复<ANhw,DataA2>点生命值，跳跃<ANhw,DataB2>次。|n|cffffcc00等级 3|r - 恢复<ANhw,DataA3>点生命值，跳跃<ANhw,DataB3>次。|n|cffffcc00等级 4|r - 恢复<ANhw,DataA4>点生命值，跳跃<ANhw,DataB4>次。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Hero
    },
    "AOw2": {
        code: "AOw2",
        name: "战争践踏",
        tip: "震击地面，击晕周围的地面单位。|n|n|cffffcc00等级 1|r - <AOw2,DataA1>点伤害，昏晕状态持续<AOw2,Dur1>秒。|n|n|cffffcc00等级 2|r - <AOw2,DataA2>点伤害，昏晕状态持续<AOw2,Dur2>秒。|n|n|cffffcc00等级 3|r - <AOw2,DataA3>点伤害，昏晕状态持续<AOw2,Dur3>秒。|n|n|cffffcc00等级 4|r - <AOw2,DataA4>点伤害，昏晕状态持续<AOw2,Dur4>秒。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Hero
    },
    "AOws": {
        code: "AOws",
        name: "战争践踏",
        tip: "重击地面，对周围的地面单位造成一定的伤害。|n|n|cffffcc00等级 1|r - <AOws,DataA1>点伤害，<AOws,Dur1>秒眩晕效果。|n|cffffcc00等级 2|r - <AOws,DataA2>点伤害，<AOws,Dur2>秒眩晕效果。|n|cffffcc00等级 3|r - <AOws,DataA3>点伤害，<AOws,Dur3>秒眩晕效果。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Hero
    },
    "AOsh": {
        code: "AOsh",
        name: "震荡波",
        tip: "能发出一道向前的能量波，对一条线上的敌方地面单位造成一定的伤害。|n|n|cffffcc00等级 1|r - <AOsh,DataA1>点的伤害。|n|cffffcc00等级 2|r - <AOsh,DataA2>点的伤害。|n|cffffcc00等级 3|r - <AOsh,DataA3>点的伤害。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Hero
    },
    "AOs2": {
        code: "AOs2",
        name: "震荡波(卡林)",
        tip: "发射出一道向前的能量波，对一直线上的敌人造成一定的伤害。|n|n|cffffcc00等级 1|r - <AOs2,DataA1>点伤害。|n|cffffcc00等级 2|r - <AOs2,DataA2>点伤害。|n|cffffcc00等级 3|r - <AOs2,DataA3>点伤害。|n|cffffcc00等级 4|r - <AOs2,DataA4>点伤害。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Hero
    },
    "AOcr": {
        code: "AOcr",
        name: "致命一击",
        tip: "给予一定的概率使得攻击力能大大增强。|n|n|cffffcc00等级 1|r -<AOcr,DataA1>%的概率，<AOcr,DataB1>倍于一般攻击的伤害值。|n|cffffcc00等级 2|r -<AOcr,DataA2>%的概率，<AOcr,DataB2>倍于一般攻击的伤害值。|n|cffffcc00等级 3|r -<AOcr,DataA1>%的概率，<AOcr,DataB3>倍于一般攻击的伤害值。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Hero
    },
    "AOre": {
        code: "AOre",
        name: "重生",
        tip: "使当牛头人酋长被杀时，它就会自动复活。重生技能有<AOre,Cool1>秒的魔法施放间隔时间。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Hero
    },
    "AOr3": {
        code: "AOr3",
        name: "重生(卡林)",
        tip: "当被杀害的时候，酋长会自动复活。|n|n|cffffcc00等级 1|r - <AOr3,Cool1>秒的魔法施放间隔时间。|n|cffffcc00等级 2|r - <AOr3,Cool2>秒的魔法施放间隔时间。",
        kind: Kind.Ability,
        race: Race.Orc,
        type: Type.Hero
    },
};

const abilityNightElf = {
    "Aegr": {
        code: "Aegr",
        name: "艾鲁尼之优雅",
        tip: "减少来自穿刺攻击的伤害到原来的<Aegr,DataA1,%>%，并减少来自魔法攻击的伤害到原来的<Aegr,DataE1,%>%。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Adtn": {
        code: "Adtn",
        name: "爆炸",
        tip: "会毁灭掉小精灵，但可以消除一定范围内所有的魔法效果并会吸收周围每个单位<Adtn,DataA1>点的魔法值。|n|cffffcc00对召唤出来的单位造成<Adtn,DataB1>点的伤害。|r",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Apsh": {
        code: "Apsh",
        name: "变相移动",
        tip: "让该单位一旦遭到攻击就处于消失的状态之中。在短时间内不再受到任何的伤害。|n持续<Apsh,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Abrf": {
        code: "Abrf",
        name: "变熊",
        tip: "将德鲁伊变成一头威力巨大的熊，但是其魔法恢复速度会变慢。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Ambt": {
        code: "Ambt",
        name: "补充魔法和生命值",
        tip: "恢复一个目标单位的魔法和生命值。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Awha": {
        code: "Awha",
        name: "采集(小精灵能采集黄金和木材)",
        tip: "你可以从缠绕金矿中采集黄金，从树木中采集木材。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Aent": {
        code: "Aent",
        name: "缠绕金矿",
        tip: "在小精灵采集金矿之前，你必须先将金矿缠绕。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Aagm": {code: "Aagm", name: "缠绕金矿技能", tip: "", kind: Kind.Ability, race: Race.NightElf, type: Type.Unit},
    "Atau": {
        code: "Atau",
        name: "嘲讽",
        tip: "最近的<ANta,DataA1>个单位会强迫攻击这个单位。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Aimp": {
        code: "Aimp",
        name: "穿刺剑刃",
        tip: "使得投刃车发射出去的剑刃能刺穿敌人而伤害到站在后面的其他单位。同时使得投刃车能攻击树木。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Aco3": {
        code: "Aco3",
        name: "搭载弓箭手",
        tip: "搭载一个弓箭手使其能在空中对敌人进行攻击。|n|n|cffffcc00能攻击地面和空中单位。|r",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Acoh": {
        code: "Acoh",
        name: "搭载弓箭手(年长的)",
        tip: "搭载一个弓箭手使其能在空中对敌人进行攻击。|n|n|cffffcc00能攻击地面和空中单位。|r",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Arav": {
        code: "Arav",
        name: "风暴之鸦",
        tip: "让德鲁伊变为风暴乌鸦，从而可以飞翔在天空中。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Acor": {
        code: "Acor",
        name: "腐蚀喷吐",
        tip: "能喷出一团腐蚀性液体，对破坏建筑物特别的有效。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Avng": {
        code: "Avng",
        name: "复仇之魂",
        tip: "从倒下的友军尸体身上召唤出不可伤害的野兽幽魂。持续<Avng,Dur1>秒或直到化身死亡。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Aren": {
        code: "Aren",
        name: "更新",
        tip: "让友方的暗夜精灵建筑物、联盟建筑物与友方的机械单位焕然一新。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "AEbu": {code: "AEbu", name: "建造(暗夜精灵族)", tip: "", kind: Kind.Ability, race: Race.NightElf, type: Type.Unit},
    "Afae": {
        code: "Afae",
        name: "精灵之火",
        tip: "减少目标单位<Afae,DataA1>点的护甲，并能拥有该单位的视野。|n持续<Afae,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Afa2": {
        code: "Afa2",
        name: "精灵之火(变形)",
        tip: "减少目标单位<Afae,DataA1>点的护甲，并能拥有该单位的视野。|n持续<Afae,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Acyc": {
        code: "Acyc",
        name: "飓风",
        tip: "将目标单位投掷到空中，使其不能移动、攻击和施放任何的魔法技能.而且其他单位也不能在这期间攻击它。|n持续<Acyc,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Afin": {code: "Afin", name: "开火(暗夜精灵族)", tip: "", kind: Kind.Ability, race: Race.NightElf, type: Type.Unit},
    "Arsk": {
        code: "Arsk",
        name: "抗性皮肤",
        tip: "降低负性魔法的持续时间，并让山岭巨人对某些特定魔法免疫。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Aspo": {
        code: "Aspo",
        name: "慢性毒药",
        tip: "慢性毒药攻击能造成每秒<Aspo,DataA1>点的伤害，并在<Aspo,Dur1>秒内减慢敌人<Aspo,DataB1,%>%的移动速度和<Aspo,DataC1,%>%的攻击速度。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Amim": {
        code: "Amim",
        name: "魔法免疫",
        tip: "让目标单位对所有魔法免疫。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Amfl": {
        code: "Amfl",
        name: "魔力之焰",
        tip: "在周围敌方单位施放魔法的时候，让精灵龙对其造成伤害。同时增加精灵龙<Amfl,DataE1>点的护甲。|n持续<Amfl,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Aroa": {
        code: "Aroa",
        name: "咆哮",
        tip: "增加周围友军单位<Aroa,DataA1,%>%的攻击力。|n持续<Aroa,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Ara2": {
        code: "Ara2",
        name: "咆哮(变形)",
        tip: "增加周围友军单位<Ara2,DataA1,%>%的攻击力。|n持续<Ara2,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Aco2": {
        code: "Aco2",
        name: "骑乘角鹰兽",
        tip: "骑在角鹰兽身上以后，弓箭手可以从空中进行攻击。|n|n|cffffcc00能攻击地面和空中单位。|r",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Acoa": {
        code: "Acoa",
        name: "骑乘角鹰兽(年长的)",
        tip: "骑在角鹰兽身上以后，弓箭手可以从空中进行攻击。|n|n|cffffcc00能攻击地面和空中单位。|r",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Asp1": {
        code: "Asp1",
        name: "球体(复仇之魂 等级1)",
        tip: "该技能能够给单位绑定模型，该模型会在单位攻击或施法时播放死亡动画，魔法施放冷却时间过后才会重新创建，并播放该模型的诞生动画。单位死亡则特效消失。另外，该技能能在单位施放技能至发动技能期间，向目标释放投射物，投射物到达时间等同于单位的施法前摇。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Asp2": {
        code: "Asp2",
        name: "球体(复仇之魂等级2)",
        tip: "该技能能够给单位绑定模型，该模型会在单位攻击或施法时播放死亡动画，魔法施放冷却时间过后才会重新创建，并播放该模型的诞生动画。单位死亡则特效消失。另外，该技能能在单位施放技能至发动技能期间，向目标释放投射物，投射物到达时间等同于单位的施法前摇。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Asp3": {
        code: "Asp3",
        name: "球体(复仇之魂等级3)",
        tip: "该技能能够给单位绑定模型，该模型会在单位攻击或施法时播放死亡动画，魔法施放冷却时间过后才会重新创建，并播放该模型的诞生动画。单位死亡则特效消失。另外，该技能能在单位施放技能至发动技能期间，向目标释放投射物，投射物到达时间等同于单位的施法前摇。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Asp4": {
        code: "Asp4",
        name: "球体(复仇之魂等级4)",
        tip: "该技能能够给单位绑定模型，该模型会在单位攻击或施法时播放死亡动画，魔法施放冷却时间过后才会重新创建，并播放该模型的诞生动画。单位死亡则特效消失。另外，该技能能在单位施放技能至发动技能期间，向目标释放投射物，投射物到达时间等同于单位的施法前摇。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Asp5": {
        code: "Asp5",
        name: "球体(复仇之魂等级5)",
        tip: "该技能能够给单位绑定模型，该模型会在单位攻击或施法时播放死亡动画，魔法施放冷却时间过后才会重新创建，并播放该模型的诞生动画。单位死亡则特效消失。另外，该技能能在单位施放技能至发动技能期间，向目标释放投射物，投射物到达时间等同于单位的施法前摇。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Asp6": {
        code: "Asp6",
        name: "球体(复仇之魂等级6)",
        tip: "该技能能够给单位绑定模型，该模型会在单位攻击或施法时播放死亡动画，魔法施放冷却时间过后才会重新创建，并播放该模型的诞生动画。单位死亡则特效消失。另外，该技能能在单位施放技能至发动技能期间，向目标释放投射物，投射物到达时间等同于单位的施法前摇。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Aadm": {
        code: "Aadm",
        name: "驱逐魔法",
        tip: "能去除敌方单位身上有利的魔法效果和友军单位身上不利的魔法效果。|n|cffffcc00对召唤出来的单位造成<Aadm,DataB1>点的伤害。|r",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Alit": {
        code: "Alit",
        name: "闪电攻击",
        tip: "能使单位的攻击变成瞬间的闪电效果。5级空法球效果+类攻击特效，被更高级的攻击特效覆盖。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Aesn": {
        code: "Aesn",
        name: "哨兵",
        tip: "能召唤出一头用来侦察地图的猫头鹰。|n能看见隐形单位。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Aesr": {
        code: "Aesr",
        name: "哨兵(娴萨)",
        tip: "能召唤出一头用来侦察地图的猫头鹰。|n能看见隐形单位。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Arej": {
        code: "Arej",
        name: "生命恢复",
        tip: "在<Arej,Dur1>秒内恢复目标友军单位<Arej,DataA1>点的生命值。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Atol": {
        code: "Atol",
        name: "生命之树升级技能",
        tip: "该技能能够给单位绑定模型,单位死亡模型消失",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Aeat": {
        code: "Aeat",
        name: "吞食树木",
        tip: "吞食一棵树木以在<Aeat,Dur1>秒内恢复<Aeat,DataC1>点的生命值。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Adec": {
        code: "Adec",
        name: "卸载",
        tip: "将弓箭手从角鹰兽身上卸载下来。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Aetl": {
        code: "Aetl",
        name: "虚无状态",
        tip: "处于虚无形态的单位不能攻击，但是能施放魔法，敌方的魔法能对其造成额外的伤害。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Ault": {code: "Ault", name: "夜视能力", tip: "", kind: Kind.Ability, race: Race.NightElf, type: Type.Unit},
    "Ashm": {
        code: "Ashm",
        name: "影遁",
        tip: "让单位停止自动攻击敌人，可以使其影遁，在夜间变的隐形。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Sshm": {
        code: "Sshm",
        name: "影遁(立刻的)",
        tip: "让单位停止自动攻击敌人，可以使其影遁，在夜间变的隐形。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Assk": {
        code: "Assk",
        name: "硬化皮肤",
        tip: "降低所有施加在山岭巨人身上的伤害<Assk,DataC1>点。攻击不能低于<Assk,DataB1>点。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Amgl": {
        code: "Amgl",
        name: "月刃",
        tip: "使得女猎手的月刃剑能在攻击的时候进行弹射，从而伤害到敌人其他的单位。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Amgr": {
        code: "Amgr",
        name: "月刃(娴萨)",
        tip: "使得女猎手的月刃剑能在攻击的时候进行弹射，从而伤害到敌人其他的单位。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Aro1": {
        code: "Aro1",
        name: "扎根(估树)",
        tip: "使得暗夜精灵族的古树固定在地上，从而能生产各种单位。对远古保护者来说，这就意味着它能向空中投掷大量的岩石以攻击来犯的敌人。同时使古树变成加强型护甲。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Aro2": {
        code: "Aro2",
        name: "扎根(远古守护者)",
        tip: "使得暗夜精灵族的古树固定在地上，从而能生产各种单位。对远古保护者来说，这就意味着它能向空中投掷大量的岩石以攻击来犯的敌人。同时使古树变成加强型护甲。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Agra": {
        code: "Agra",
        name: "战棍",
        tip: "让山岭巨人拔起一棵树木从而拥有攻城能力，并且增加远程攻击范围。|n持续<Agra,DataE1>次攻击。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Aenc": {
        code: "Aenc",
        name: "装载(缠绕金矿)",
        tip: "让某个小精灵进入金矿。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },
    "Slo2": {
        code: "Slo2",
        name: "装载小精灵",
        tip: "装载一个小精灵。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Unit
    },

    "AEsh": {
        code: "AEsh",
        name: "暗影突袭",
        tip: "投掷出一把毒性的匕首，能对敌方的地面单位造成巨大的伤害。最初造成很大的伤害，随后每秒造成一定的伤害。匕首上的毒素能在短时间内减慢目标单位的攻击速度和移动速度。|n|n|cffffcc00等级 1|r - <AEsh,DataE1> 点初始伤害，<AEsh,DataA1> 点持续伤害。 |n|cffffcc00等级 2|r - <AEsh,DataE2>点初始伤害，<AEsh,DataA2>点持续伤害。 |n|cffffcc00等级 3|r - <AEsh,DataE3>点初始伤害，<AEsh,DataA3>点持续伤害。.",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Hero
    },
    "AEme": {
        code: "AEme",
        name: "变身",
        tip: "让恶魔猎手变身为一个威力巨大的恶魔。该恶魔具有远程攻击能力并会增加<AEme,DataE1>点的生命值。|n持续<AEme,HeroDur1>秒。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Hero
    },
    "AEfk": {
        code: "AEfk",
        name: "刀阵旋风",
        tip: "守望者对周围的敌人发射出锋利的尖刀进行伤害。|n|n|cffffcc00等级 1|r - 对每个目标造成<AEfk,DataA1>点伤害。|n|cffffcc00等级 2|r - 对每个目标造成<AEfk,DataA2>点伤害。|n|cffffcc00等级 3|r - 对每个目标造成<AEfk,DataA3>点伤害。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Hero
    },
    "AEmb": {
        code: "AEmb",
        name: "法力燃烧",
        tip: "射出一道能量波来消耗掉目标单位一定的魔法值，目标单位的魔法值在燃烧的过程中,也会对其造成同等数量的伤害值。|n|n|cffffcc00等级 1|r - 消耗掉目标<AEmb,DataA1>点魔法。|n|cffffcc00等级 2|r - 消耗掉目标<AEmb,DataA2>点魔法。|n|cffffcc00等级 3|r - 消耗掉目标<AEmb,DataA3>点魔法。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Hero
    },
    "AEsv": {
        code: "AEsv",
        name: "复仇之魂",
        tip: "召唤出一个强大的复仇天神，复仇天神能从周围的尸体中复活许多无敌的幽灵来为你战斗。当复仇天神死掉的时候，那些幽灵也会自动消失。|n持续<AEsv,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Hero
    },
    "AEah": {
        code: "AEah",
        name: "荆棘光环",
        tip: "该光环能给予周围的友军单位一个具有攻击力的护盾保护，敌人对这些单位进行一次近战攻击就会受到一定的伤害。|n|n|cffffcc00等级 1|r - 返回<AEah,DataA1,%>%的伤害。|n|cffffcc00等级 2|r - 返回<AEah,DataA2,%>%的伤害。|n|cffffcc00等级 3|r - 返回<AEah,DataA3,%>%的伤害。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Hero
    },
    "AEer": {
        code: "AEer",
        name: "纠缠根须",
        tip: "从地下伸出缠绕的根须将目标暂时固定，并造成持续伤害。|n|n|cffffcc00等级 1|r - <AEer,DataA1>伤害/秒，持续<AEer,Dur1>秒。|n|cffffcc00等级 2|r - <AEer,DataA2>伤害/秒，持续<AEer,Dur2>秒。|n|cffffcc00等级 3|r - <AEer,DataA3>伤害/秒，持续<AEer,Dur3>秒。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Hero
    },
    "AEtq": {
        code: "AEtq",
        name: "宁静",
        tip: "在一大片范围内召唤出一阵强大的能量雨，能以每秒<AEtq,DataA1>点的速度恢复其中友军单位的生命值。|n持续<AEtq,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Hero
    },
    "AEar": {
        code: "AEar",
        name: "强击光环",
        tip: "一种能增加周围友军单位远程攻击力的光环。|n|n|cffffcc00等级 1|r - 增加<AEar,DataA1,%>%的远程攻击力。|n|cffffcc00等级 2|r - 增加<AEar,DataA2,%>%的远程攻击力。|n|cffffcc00等级 3|r - 增加<AEar,DataA3,%>%的远程攻击力。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Hero
    },
    "AEsf": {
        code: "AEsf",
        name: "群星坠落",
        tip: "召唤出一阵阵的流星雨，每阵流星雨对敌人造成<AEsf,DataA1>点的伤害。|n持续<AEsf,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Hero
    },
    "AEev": {
        code: "AEev",
        name: "闪避",
        tip: "给予一定的概率使得恶魔猎手躲避掉敌人的攻击。|n|n|cffffcc00等级 1|r - <AEev,DataA1,%>%的概率躲避掉敌人的攻击。|n|cffffcc00等级 2|r - <AEev,DataA2,%>%的概率躲避掉敌人的攻击。|n|cffffcc00等级 3|r - <AEev,DataA3,%>%的概率躲避掉敌人的攻击。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Hero
    },
    "AEbl": {
        code: "AEbl",
        name: "闪烁",
        tip: "能让守望者瞬间移动一段距离，从而逃离战场或者快速加入战斗。|n|n|cffffcc00等级 1|r -<AEbl,Cool1>秒魔法施放间隔时间，消耗<AEbl,Cost1>点魔法。|n|cffffcc00等级 2|r -<AEbl,Cool2>秒魔法施放间隔时间，消耗<AEbl,Cost2>点魔法。|n|cffffcc00等级 3|r -<AEbl,Cool3>秒魔法施放间隔时间，消耗<AEbl,Cost3>点魔法。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Hero
    },
    "ANbl": {
        code: "ANbl",
        name: "闪烁(中立)",
        tip: "能让守望者瞬间移动一段距离，从而逃离战场或者快速加入战斗。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Hero
    },
    "AEim": {
        code: "AEim",
        name: "献祭",
        tip: "让恶魔猎手处于火焰的包围之中，并对周围的敌方地面单位造成一定的伤害。|n该技能会持续地消耗魔法值。|n|n|cffffcc00等级 1|r - 每秒<AEim,DataA1>点的伤害。|n|cffffcc00等级 2|r - 每秒<AEim,DataA2>点的伤害。|n|cffffcc00等级 3|r - 每秒<AEim,DataA3>点的伤害。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Hero
    },
    "AEst": {
        code: "AEst",
        name: "侦察",
        tip: "能召唤出一头用来侦察地图的猫头鹰。|n能看见隐形单位。|n|n|cffffcc00等级 1|r -消耗<AEst,Cost1>点魔法值来召唤出一头猫头鹰。|n|cffffcc00等级 2|r -消耗<AEst,Cost2>点魔法值来召唤出一头猫头鹰。|n|cffffcc00等级 3|r -消耗<AEst,Cost3>点魔法值来召唤出一头猫头鹰。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Hero
    },
    "AEfa": {
        code: "AEfa",
        name: "灼热之箭",
        tip: "通过附加的火焰伤害来增加女祭司的攻击力。|n|n|cffffcc00等级 1|r - 增加<AHfa,DataA1>点的伤害。|n|cffffcc00等级 2|r - 增加<AHfa,DataA2>点的伤害。|n|cffffcc00等级 3|r - 增加<AHfa,DataA3>点的伤害。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Hero
    },
    "AEfn": {
        code: "AEfn",
        name: "自然之力",
        tip: "将一定范围内的树木转化成树人，每个树人具有<efon,realHP>点的生命值和<efon,mindmg1>-<efon,maxdmg1>点的攻击力。可以学会自然之祝福能力。|n|n|cffffcc00能攻击地面单位。|r|n|n|cffffcc00等级 1|r - 召唤<AEfn,DataA1>个树人，持续时间<AEfn,Dur1>秒。|n|cffffcc00等级 2|r - 召唤<AEfn,DataA2>个树人，持续时间<AEfn,Dur2>秒。|n|cffffcc00等级 3|r - 召唤<AEfn,DataA3>个树人，持续时间<AEfn,Dur3>秒。",
        kind: Kind.Ability,
        race: Race.NightElf,
        type: Type.Hero
    },
};

const abilityUndead = {
    "Sch2": {
        code: "Sch2",
        name: "保持原位(绞肉车)",
        tip: "吞噬货物使单位能够容纳别的单位，可以配合装载类技能和卸载类技能的使用。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Afrz": {
        code: "Afrz",
        name: "冰冻喷吐",
        tip: "用在建筑物上时，能在段时间内使其失去应有的功效。|n持续<Afrz,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Arpb": {
        code: "Arpb",
        name: "补充意法和生命值",
        tip: "恢复一个目标单位的魔法和生命值。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Ahrl": {
        code: "Ahrl",
        name: "采集(采集木材)",
        tip: "从树上采集所需的木材。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Aaha": {
        code: "Aaha",
        name: "采集(侍僧采集黄金)",
        tip: "从缠绕金矿那里采集黄金。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Acri": {
        code: "Acri",
        name: "残废",
        tip: "减慢目标单位<Acri,DataA1,%>%的移动速度和<Acri,DataB1,%>%攻击速度，并减弱其<Acri,DataC1,%>%的攻击力。|n持续<Acri,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Scri": {
        code: "Scri",
        name: "残废(巫师)",
        tip: "减慢目标单位<Acri,DataA1,%>%的移动速度和<Acri,DataB1,%>%攻击速度，并减弱其<Acri,DataC1,%>%的攻击力。|n持续<Acri,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Agyd": {code: "Agyd", name: "创建尸体", tip: "", kind: Kind.Ability, race: Race.Undead, type: Type.Unit},
    "Abgl": {
        code: "Abgl",
        name: "大型荒芜之地蔓延",
        tip: "只在获得技能时进行一次地表改变",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Amel": {
        code: "Amel",
        name: "得到尸体",
        tip: "捡起附近的一个尸体来做备用。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Aams": {
        code: "Aams",
        name: "反魔法外壳",
        tip: "使得目标单位对所有的魔法免疫。|n持续<Aams,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Aam2": {
        code: "Aam2",
        name: "反魔法外壳(魔法抗性)",
        tip: "建立一道屏障，使得目标单位能少受<Aam2,DataC1>点的魔法伤害。|n持续<Aam2,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Auns": {
        code: "Auns",
        name: "反召唤建筑",
        tip: "反召唤建筑物可以取回<Auns,DataA1,%>%的花费资源。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Arai": {code: "Arai", name: "复活死尸", tip: "", kind: Kind.Ability, race: Race.Undead, type: Type.Unit},
    "Aabr": {
        code: "Aabr",
        name: "荒芜光环",
        tip: "让周围不死族友军单位加快其生命值恢复速度。不能和荒芜光环一起发挥作用。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Aloc": {
        code: "Aloc",
        name: "蝗虫",
        tip: "使得侍僧能修复建筑物和机械单位。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Arst": {code: "Arst", name: "恢复", tip: "", kind: Kind.Ability, race: Race.Undead, type: Type.Unit},
    "Amb2": {
        code: "Amb2",
        name: "恢复魔法",
        tip: "恢复一个目标单位的魔法值。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Afak": {
        code: "Afak",
        name: "毁灭之球",
        tip: "增加破坏者<Afak,DataA1>点的攻击力并让其攻击具有范围伤害效果。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Apts": {
        code: "Apts",
        name: "疾病云雾(绞肉车)",
        tip: "在每次攻击的时候都能释放出疾病云雾。疾病云雾每秒能对敌人造成<Aap1,DataB1>点的伤害。|n持续<Aap1,DataA1>秒。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Aap2": {code: "Aap2", name: "疾病云雾(瘟疫守卫)", tip: "", kind: Kind.Ability, race: Race.Undead, type: Type.Unit},
    "Aap1": {
        code: "Aap1",
        name: "疾病云雾(憎恶)",
        tip: "用疾病来感染周围的敌人。疾病云雾每秒能对敌人造成<Aap1,DataB1>点的伤害。|n持续<Aap1,DataA1>秒。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "AUbu": {code: "AUbu", name: "建造(不死族)", tip: "", kind: Kind.Ability, race: Race.Undead, type: Type.Unit},
    "Afiu": {code: "Afiu", name: "开火(不死族)", tip: "", kind: Kind.Ability, race: Race.Undead, type: Type.Unit},
    "Arpl": {
        code: "Arpl",
        name: "枯萎精髓",
        tip: "恢复附近友军<Arpl,DataA1>点生命值。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Arpm": {
        code: "Arpm",
        name: "灵魂触摸",
        tip: "恢复附近友军<Arpm,DataB1>点魔法值。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Abgm": {code: "Abgm", name: "闹鬼金矿技能", tip: "", kind: Kind.Ability, race: Race.Undead, type: Type.Unit},
    "Aave": {code: "Aave", name: "破坏者形态", tip: "", kind: Kind.Ability, race: Race.Undead, type: Type.Unit},
    "Astn": {
        code: "Astn",
        name: "石像形态",
        tip: "将石像鬼变成一尊雕像。雕像对所有魔法免疫，护甲也会增强，而且还能以每秒<Astn,DataE1>点的速度来恢复自己的生命值。|n石像鬼在这种状态下不能攻击敌人。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Afr2": {
        code: "Afr2",
        name: "霜冻攻击",
        tip: "在单位攻击的基础上增加冰冻效果，能减慢敌人的移动速度。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Afrb": {code: "Afrb", name: "霜冻呼吸", tip: "", kind: Kind.Ability, race: Race.Undead, type: Type.Unit},
    "Afra": {
        code: "Afra",
        name: "霜之攻击",
        tip: "给单位的攻击增加冰冻效果，可以减慢敌单位的移动速度。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Acan": {
        code: "Acan",
        name: "吞食尸体",
        tip: "消耗周围的某个尸体来以每秒<Acan,DataA1>点的速度恢复自己的生命值。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Acn2": {
        code: "Acn2",
        name: "吞食尸体",
        tip: "吞食一个附近的尸体，每秒治疗<Acn2,DataA1>点生命值。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Advm": {
        code: "Advm",
        name: "吞噬魔法",
        tip: "吸收一定范围内所有单位身上的魔法效果。每个单位给予破坏者<Advm,DataA1>点的生命值和<Advm,DataB1>点魔法值。|n|cffffcc00对召唤出来的单位造成<Advm,DataE1>点的伤害。|r",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Aexh": {
        code: "Aexh",
        name: "挖掘尸体",
        tip: "每<Aexh,Dur1>秒让绞肉车制造出一具尸体。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Aabs": {
        code: "Aabs",
        name: "吸收魔法",
        tip: "将你某个单位的魔法值全部给予破坏者。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Alam": {
        code: "Alam",
        name: "牺牲(侍僧)",
        tip: "将一个侍僧送入牺牲深渊将其变成阴影。阴影是一种隐形单位，本身也能看到敌方的隐形单位。|n阴影不能攻击敌人。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Asac": {
        code: "Asac",
        name: "牺牲(牺牲 深渊)",
        tip: "将一个侍僧送入牺牲深渊将其变成阴影。阴影是一种隐形单位，本身也能看到敌方的隐形单位。|n阴影不能攻击敌人。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Abgs": {
        code: "Abgs",
        name: "小型荒芜之地薆延",
        tip: "只在获得技能时进行一次地表改变",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Auhf": {
        code: "Auhf",
        name: "邪恶狂热",
        tip: "增加目标单位<Auhf,DataA1,%>%的攻击速度，但是每秒也会消耗目标<Auhf,DataB1>点的生命值。|n持续<Auhf,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Amed": {
        code: "Amed",
        name: "卸载尸体",
        tip: "将所有尸体都卸载下来以立刻使用它们。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Agho": {code: "Agho", name: "幽灵", tip: "", kind: Kind.Ability, race: Race.Undead, type: Type.Unit},
    "Aeth": {code: "Aeth", name: "幽灵(可见的)", tip: "", kind: Kind.Ability, race: Race.Undead, type: Type.Unit},
    "Apos": {
        code: "Apos",
        name: "占据",
        tip: "占据敌方目标单位的灵魂，从而让您能永久性地控制该单位。|n占据魔法不能用在飞行单位，英雄和高于<Apos,DataA1>级的野生单位身上。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Aps2": {
        code: "Aps2",
        name: "占据(引导)",
        tip: "将目标单位和女妖震晕<Aps2,Dur1>秒，在这个期间，女妖将受到额外的伤害。女妖会将永久地控制目标单位，但是与此同时，施法者的身体也将会被毁掉。|n占据魔法不能被使用在飞行单位，英雄和级别高于<Aps2,DataA1>的野生单位身上。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Atru": {code: "Atru", name: "真实视域(阴影)", tip: "", kind: Kind.Ability, race: Race.Undead, type: Type.Unit},
    "Aspa": {code: "Aspa", name: "蜘蛛攻击", tip: "", kind: Kind.Ability, race: Race.Undead, type: Type.Unit},
    "Aweb": {
        code: "Aweb",
        name: "蛛网",
        tip: "将目标单位用一张网来捕获到地面，从而地面上的单位可以对其进行攻击。|n持续<Aweb,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Acrs": {
        code: "Acrs",
        name: "诅咒",
        tip: "诅咒敌人的某个单位使其有 <Acrs,DataA1,%>%的概率不能击中自己的目标。|n持续<Acrs,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Abu2": {
        code: "Abu2",
        name: "钻地(圣甲虫等级2)",
        tip: "让腐尸甲虫钻入地下从而变为隐形的。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Abu3": {
        code: "Abu3",
        name: "钻地(圣甲虫等级3)",
        tip: "让腐尸甲虫钻入地下从而变为隐形的。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },
    "Abur": {
        code: "Abur",
        name: "钻地(穴居恶魔)",
        tip: "穴居恶魔钻入地下从而变为隐形的，在此期间它能以每秒<ucrm,regenHP>点的速度来恢复自己的生命值。|n穴居恶魔在此期间也不能进行攻击。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Unit
    },

    "AUan": {
        code: "AUan",
        name: "操纵死尸",
        tip: "复活<AUan,DataA1>个阵亡单位，持续时间为<AUan,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Hero
    },
    "AUim": {
        code: "AUim",
        name: "穿刺",
        tip: "以地穴领主的巨爪震击地面，射出一道直线形尖刺蔓藤，造成极大伤害并将其轨迹上的敌地面单位抛入空中。|n|n|cffffcc00等级 1|r - <AUim,DataC1>伤害力，<AUim,Dur1>秒晕眩。|n|cffffcc00等级 2|r - <AUim,DataC2> 伤害力，<AUim,Dur2>秒晕眩。|n|cffffcc00等级 3|r - <AUim,DataC3>伤害力，<AUim,Dur3>秒晕眩。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Hero
    },
    "AUin": {
        code: "AUin",
        name: "地狱火",
        tip: "召唤出一地狱火恶魔从天而降，对地面上的敌人造成<AUin,DataA1>点的伤害，并在<AUin,Dur1>秒内使其处于昏晕状态。地狱火恶魔持续<AUin,DataB1>秒。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Hero
    },
    "AUcs": {
        code: "AUcs",
        name: "腐臭蜂群",
        tip: "放出一群蝙蝠和昆虫对一线上的敌人造成一定的伤害。|n|n|cffffcc00等级 1|r - 对每个单位造成<AUcs,DataA1>点的伤害。|n|cffffcc00等级 2|r - 对每个单位造成<AUcs,DataA2>点的伤害。|n|cffffcc00等级 3|r - 对每个单位造成<AUcs,DataA3>点的伤害。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Hero
    },
    "AUcb": {
        code: "AUcb",
        name: "腐尸甲虫",
        tip: "从目标尸体中召唤出<AUcb,DataA1>条甲虫来。但是每次你只能控制<AUcb,DataE1> 条甲虫。|n|n|cffffcc00等级 1|r - <ucs1,realHP>点生命值，<ucs1,mindmg1> - <ucs1,maxdmg1>点攻击力。|n|cffffcc00等级 2|r - <ucs2,realHP>点生命值，<ucs2,mindmg1> - <ucs2,maxdmg1>点攻击力，甲虫且具有钻地技能。|n|cffffcc00等级 3|r - <ucs3,realHP>点生命值，<ucs3,mindmg1> - <ucs3,maxdmg1>点攻击力，甲虫且具有钻地技能。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Hero
    },
    "AUdr": {
        code: "AUdr",
        name: "黑暗仪式",
        tip: "牺牲一个友军单位来将其一定百分比的生命值转化成巫妖的魔法值。|n|n|cffffcc00等级 1|r - 转化<AUdr,DataA1,%>%的生命值。|n|cffffcc00等级 2|r - 转化<AUdr,DataA2,%>%的生命值。|n|cffffcc00等级 3|r - 转化<AUdr,DataA3,%>%的生命值。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Hero
    },
    "AUls": {
        code: "AUls",
        name: "蝗虫群",
        tip: "召唤出一群蝗虫来攻击敌人。在它们啃咬敌人的血肉的时候，会将其转化为一种能量物质，在蝗虫返回到地穴领主身边的时候该物质能恢复地穴领主的生命值。|n持续 <AUls,HeroDur1> 秒。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Hero
    },
    "AUts": {
        code: "AUts",
        name: "尖刺外壳",
        tip: "在地穴领主的身上形成一层带有尖刺的保护壳，增加其防御能力并能弹射敌人的近战攻击。|n|n|cffffcc00等级 1|r - 弹射<AUts,DataA1,%>%的伤害，增加<AUts,DataC1>点护甲。|n|cffffcc00等级 2|r -  弹射<AUts,DataA2,%>%的伤害，增加<AUts,DataC2>点护甲。|n|cffffcc00等级 3|r -  弹射<AUts,DataA3,%>%点的伤害，增加<AUts,DataC3>点护甲。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Hero
    },
    "AUfa": {
        code: "AUfa",
        name: "霜冻护甲",
        tip: "使目标身上具有一层霜冻保护。这保护层能增加一定的护甲并使近战攻击该目标的敌人在一定时间内减速。|n|n|cffffcc00等级 1|r - 增加<AUfa,DataB1>点护甲。|n|cffffcc00等级 2|r - 增加<AUfa,DataB2>点护甲。|n|cffffcc00等级 3|r - 增加<AUfa,DataB3>点护甲。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Hero
    },
    "AUfu": {
        code: "AUfu",
        name: "霜冻护甲(自动施放)",
        tip: "使目标身上具有一层霜冻保护。这保护层能增加一定的护甲并使近战攻击该目标的敌人在一定时间内减速。|n|n|cffffcc00等级 1|r - 增加<AUfu,DataB1>点护甲。|n|cffffcc00等级 2|r - 增加<AUfu,DataB2>点护甲。|n|cffffcc00等级 3|r - 增加<AUfu,DataB3>点护甲。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Hero
    },
    "AUfn": {
        code: "AUfn",
        name: "霜冻新星",
        tip: "能对敌人进行一轮冰冻攻击，对其造成一定伤害并使其减速。|n|n|cffffcc00等级 1|r -<AUfn,DataB1>点常规伤害，<AUfn,DataA1>点新星伤害。|n|cffffcc00等级 2|r -<AUfn,DataB2>点常规伤害，<AUfn,DataA2>点新星伤害。|n|cffffcc00等级 3|r -<AUfn,DataB3>点常规伤害，<AUfn,DataA3>点新星伤害。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Hero
    },
    "AUsl": {
        code: "AUsl",
        name: "睡眠",
        tip: "使目标单位处于睡眠状态。该单位被攻击以后会自动醒来。|n|n|cffffcc00等级 1|r -<AUsl,Dur1>秒的睡眠时间，消耗<AUsl,Cost1>点魔法。|n|cffffcc00等级 2|r -<AUsl,Dur2>秒的睡眠时间，消耗<AUsl,Cost2>点魔法。|n|cffffcc00等级 3|r -<AUsl,Dur3>秒的睡眠时间，消耗<AUsl,Cost3>点魔法。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Hero
    },
    "AUdc": {
        code: "AUdc",
        name: "死亡缠绕",
        tip: "能治疗友军的某个不死单位或者伤害敌人的某个单位。|n|n|cffffcc00等级 1|r - 恢复<AUdc,DataA1>点生命值。|n|cffffcc00等级 2|r - 恢复<AUdc,DataA2>点生命值。|n|cffffcc00等级 3|r - 恢复<AUdc,DataA3>点生命值。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Hero
    },
    "AUdd": {
        code: "AUdd",
        name: "死亡凋零",
        tip: "能以每秒<AUdd,DataA1,%>%的速度来消耗有效范围内一切单位和建筑物的生命值。也能摧毁树木。|n持续<AUdd,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Hero
    },
    "AUdp": {
        code: "AUdp",
        name: "死亡契约",
        tip: "杀死一个友军单位，将其一定百分比的生命值转成死亡骑士的生命值。|n|n|cffffcc00等级 1|r - 转化<AUdp,DataB1,%>%。|n|cffffcc00等级 2|r -转化 <AUdp,DataB2,%>%。|n|cffffcc00等级 3|r - 转化<AUdp,DataB3,%>%。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Hero
    },
    "AUav": {
        code: "AUav",
        name: "吸血光环",
        tip: "能对敌人进行一轮冰冻攻击，对其造成一定伤害并使其减速。|n|n|cffffcc00等级 1|r -<AUfn,DataB1>点常规伤害，<AUfn,DataA1>点新星伤害。|n|cffffcc00等级 2|r -<AUfn,DataB2>点常规伤害，<AUfn,DataA2>点新星伤害。|n|cffffcc00等级 3|r -<AUfn,DataB3>点常规伤害，<AUfn,DataA3>点新星伤害。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Hero
    },
    "AUau": {
        code: "AUau",
        name: "邪恶光环",
        tip: "增加周围友军单位的移动速度和生命恢复速度。|n|n|cffffcc00等级 1|r - 增加<AUau,DataA1,%>%的移动速度和小幅度的生命恢复速度。|n|cffffcc00等级 2|r - 增加<AUau,DataA2,%>%的移动速度和中等幅度的生命恢复速度。|n|cffffcc00等级 3|r - 增加<AUau,DataA3,%>%的移动速度和大幅度的生命恢复速度。",
        kind: Kind.Ability,
        race: Race.Undead,
        type: Type.Hero
    },
};

const abilityNeutralHostile = {
    "ACmo": {
        code: "ACmo",
        name: "季风",
        tip: "在一小块区域内召唤出闪电风暴对敌人造成<ACmo,DataA1>伤害力。|n持续<ACmo,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACbn": {
        code: "ACbn",
        name: "驱散(中立敌对)",
        tip: "将一个非机械单位变为气态并减缓其移动速度<ACbn,DataA1,%>%，<ACbn,Dur1>秒。气态生物无法攻击，但他们可以施放魔法，而某些魔法也可以对他们产生极大的作用。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACwe": {
        code: "ACwe",
        name: "召唤海元素",
        tip: "召唤一个强大的有<nsel,realHP>点生命值的海元素，具有<nsel,mindmg1> - <nsel,maxdmg1>的伤害值。|n持续<ACwe,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACss": {
        code: "ACss",
        name: "暗实袭(中立敌对)",
        tip: "投掷出一把毒性的匕首，能对敌方单位造成巨大的伤害。最初造成<ACss,DataE1>点的伤害，随后每<ACss,Cast1>秒造成<ACss,DataA1>点的伤害。持续<ACss,Dur1>秒。在短时间内匕首上的毒性效果能减慢目标单位的攻击速度和移动速度。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACbz": {
        code: "ACbz",
        name: "暴风雪(中立敌对)",
        tip: "召唤出<ACbz,DataA1>阵冰片波从天而降，每阵冰片波能造成<ACbz,DataB1>点的伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACpy": {
        code: "ACpy",
        name: "变形术(中立敌对)",
        tip: "使得敌人的一个单位变成一头小绵羊，保有原有的生命值和防御，但是会使其丧失攻击力。|n不能被用在英雄身上。|n持续<ACpy,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACcw": {
        code: "ACcw",
        name: "冰东冷箭(中立敌对)",
        tip: "增加额外的攻击力，并能使目标减速，但是冰冻冷箭也会消耗一定的魔法值。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Ahr2": {
        code: "Ahr2",
        name: "采集(阿克蒙德的食尸鬼在采伐木材)",
        tip: "从树木上采集木材资源。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Ahr3": {
        code: "Ahr3",
        name: "采集(地精正在采集木材)",
        tip: "从树木上采集木材资源。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Awh2": {
        code: "Awh2",
        name: "采集(小精灵可以采集黄金和木材一远古灵魂)",
        tip: "你可以从缠绕金矿中采集黄金，从树木中采集木材。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACcr": {
        code: "ACcr",
        name: "残废(中立敌对)",
        tip: "减慢目标单位<ACcr,DataC1,%>%的攻击力并减慢其<ACcr,DataA1,%>%的移动速度和<ACcr,DataB1,%>%的攻击速度。|n持续<ACcr,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACad": {
        code: "ACad",
        name: "操纵死尸(中立敌对)",
        tip: "复活<ACad,DataA1>个阵亡单位。持续时间为<ACad,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACfl": {
        code: "ACfl",
        name: "仅状闪电(中立敌对)",
        tip: "召唤一道锥形闪电伤害女海巫面前的多个敌人，至多<ACfl,DataB1>个敌单位，<ACfl,DataA1>点伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACtn": {
        code: "ACtn",
        name: "产卵触角",
        tip: "在敌人头上召唤出一巨大的触角。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Asod": {
        code: "Asod",
        name: "产卵之骨(黑暗之箭)",
        tip: "",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ANta": {
        code: "ANta",
        name: "嘲讽(中立敌对)",
        tip: "最近的<ANta,DataA1>个单位会强迫攻击这个单位。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACsi": {
        code: "ACsi",
        name: "沉默魔法(中立敌对)",
        tip: "在<ACsi,Dur1>秒内阻止一定区域内所有敌人施放魔法。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACcv": {
        code: "ACcv",
        name: "冲击波",
        tip: "发射出一道巨大的能量波，对一线上的敌人造成<ACcv,DataA1>点的伤害，总共能造成<ACcv,DataB1>点的伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACc3": {
        code: "ACc3",
        name: "冲击波(较小的)",
        tip: "发射出一道巨大的能量波，对一直线上的每个敌方地面单位造成<ACc2,DataA1>点的伤害。总共会造成<ACc2,DataB1>点的伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACc2": {
        code: "ACc2",
        name: "冲击波(较小的)",
        tip: "发射出一道巨大的能量波，对一直线上的每个敌方地面单位造成<ACc3,DataA1>点的伤害。总共会造成<ACc3,DataB1>点的伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACmp": {
        code: "ACmp",
        name: "穿刺(中立敌对)",
        tip: "震击地面，发出一道直线力量之波，造成<ACmp,DataA1>点伤害力，并将敌地面单位抛入空中，使其晕眩<ACmp,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ANb2": {
        code: "ANb2",
        name: "大锤(中立敌对3)",
        tip: "使得有<ANb2,DataA1>%的概率让一次进攻能施放出<ANb2,DataC1>点的额外伤害，并能在<ANb2,Dur1>秒内让对手处于昏晕状态。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Aspy": {code: "Aspy", name: "诞生刺蛇", tip: "", kind: Kind.Ability, race: Race.NeutralHostile, type: Type.Unit},
    "Aspt": {
        code: "Aspt",
        name: "诞生刺蛇幼虫",
        tip: "",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Ambd": {
        code: "Ambd",
        name: "法力燃烧(中立敌对1)",
        tip: "射出一道能量波从而消耗掉目标单位<Ambb,DataA1>点的魔法值。目标单位的魔法值在燃烧的过程中，也会对其造成同等数量的伤害值。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Amnb": {
        code: "Amnb",
        name: "法力燃烧(中立敌对2)",
        tip: "射出一道能量波从而消耗掉目标单位<Ambb,DataA1>点的魔法值。目标单位的魔法值在燃烧的过程中，也会对其造成同等数量的伤害值。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Ambb": {
        code: "Ambb",
        name: "法力燃烧(中立敌对3)",
        tip: "射出一道能量波从而消耗掉目标单位<Ambb,DataA1>点的魔法值。目标单位的魔法值在燃烧的过程中，也会对其造成同等数量的伤害值。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Afbb": {
        code: "Afbb",
        name: "反馈",
        tip: "灵兽每次攻击抵消<Afbb,DataA1>点魔力。这些魔力值燃烧，对被攻击单位造成伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACam": {
        code: "ACam",
        name: "反魔法外壳(中立敌对)",
        tip: "使目标单位对所有魔法免疫。|n持续<ACam,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACce": {
        code: "ACce",
        name: "分裂攻击(中立敌对)",
        tip: "该生物的攻击力量对主目标附近的敌人都造成<ACce,DataA1,%>%的伤害力。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACpv": {
        code: "ACpv",
        name: "粉碎(中立敌对)",
        tip: "给予<ACpv,DataA1>%的概率能对周围的单位造成<ACpv,DataB1>点的伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACch": {
        code: "ACch",
        name: "符咒(中立敌对)",
        tip: "控制某个敌方单位。|n符咒不能被用在英雄和等级高于<ACch,DataA1>的中立单位上。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACca": {
        code: "ACca",
        name: "腐臭蜂群(中立敌对)",
        tip: "释放出一群怪异的生物对一条线上的敌人造成<ACca,DataA1>点的伤害。最大伤害值能达到<ACca,DataB1>点。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACrd": {
        code: "ACrd",
        name: "复活死尸(中立敌对)",
        tip: "从一具尸体中召唤出<ACrd,DataA1>个骷髅战士。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ANak": {
        code: "ANak",
        name: "刚毛飞射",
        tip: "增加豪猪 <ANak,DataA1>点伤害力并使其造成区域性伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ANfy": {code: "ANfy", name: "工厂", tip: "工厂", kind: Kind.Ability, race: Race.NeutralHostile, type: Type.Unit},
    "ACbk": {
        code: "ACbk",
        name: "黑暗之箭(中立敌对)",
        tip: "增加<ACbk,DataA1>点伤害力。被黑暗之箭杀死的单位会变成骷髅。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACba": {
        code: "ACba",
        name: "辉煌光环(中立敌对)",
        tip: "增加周围单位每秒<ACba,DataA1>点的魔法恢复速度。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACbc": {
        code: "ACbc",
        name: "火焰呼吸(中立敌对)",
        tip: "对敌人呼出带有攻击力的火焰，造成<ACbc,DataA1>点伤害力。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACrg": {
        code: "ACrg",
        name: "火焰雨(中立敌对1)",
        tip: "召唤出一阵阵的火焰雨来对一定区域内的敌人造成伤害。每阵火焰雨能造成<ACrg,DataB1>点的初始伤害。随后在<ACrg,Dur1>秒内能造成每秒<ACrg,DataE1>点的伤害。|n持续<ACrg,DataA1>阵。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACrf": {
        code: "ACrf",
        name: "火焰雨(中立敌对2)",
        tip: "召唤出一阵阵的火焰雨来对一定区域内的敌人造成伤害。每阵火焰雨能造成<ACrg,DataB1>点的初始伤害。随后在<ACrg,Dur1>秒内能造成每秒<ACrg,DataE1>点的伤害。|n持续<ACrg,DataA1>阵。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Aap4": {
        code: "Aap4",
        name: "疾病云雾(中立敌对无伤害)",
        tip: "用疾病来感染周围的敌人。疾病云雾每秒能对敌人造成<Aap3,DataB1>点的伤害。|n持续<Aap3,DataA1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Aap3": {
        code: "Aap3",
        name: "疾病云雾(中立敌对)",
        tip: "用疾病来感染周围的敌人。疾病云雾每秒能对敌人造成<Aap3,DataB1>点的伤害。|n持续<Aap3,DataA1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACpa": {
        code: "ACpa",
        name: "寄生虫",
        tip: "用一个致命的寄生虫折磨目标单位，使它每秒受到<ANpa,DataA1>的伤害，持续<ANpa,Dur1>秒。如果命中单位在寄生虫仍有效果的时候死亡，一个战士将会从尸体上诞生。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ANth": {
        code: "ANth",
        name: "尖刺外壳",
        tip: "海龟身上的尖刺能将敌人<ANth,DataA1,%>%的攻击力化为对敌人的伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ANt2": {
        code: "ANt2",
        name: "尖刺外壳(2,2 按钮)",
        tip: "海龟身上的尖刺能将敌人<ANth,DataA1,%>%的攻击力化为对敌人的伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Ansp": {code: "Ansp", name: "间谍", tip: "", kind: Kind.Ability, race: Race.NeutralHostile, type: Type.Unit},
    "ACsw": {
        code: "ACsw",
        name: "减速(中立敌对)",
        tip: "减慢<ACsw,DataB1,%>%的攻击速度和<ACsw,DataA1,%>%的移动速度。持续<ACsw,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACvs": {
        code: "ACvs",
        name: "浸毒武器(中立敌对)",
        tip: "每秒能造成<ACvs,DataA1>点的毒性伤害。|n持续<ACvs,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACah": {
        code: "ACah",
        name: "荆棘光环(中立敌对)",
        tip: "给周围单位提供荆棘光环的保护，如果近战型的敌人来攻击它们就会受到每次相当于自身<ACah,DataA1,%>%攻击力的伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACff": {
        code: "ACff",
        name: "精灵之火(中立敌对)",
        tip: "降低敌目标单位的防御力<ACff,DataA1>点并得到该单位的视野。|n持续<ACff,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACpu": {
        code: "ACpu",
        name: "净化(中立敌对)",
        tip: "去除目标单位上的所有魔法效果，并以<ACpu,DataA1>分之1的速度来减慢其移动速度。目标单位会在<ACpu,Dur1>秒内慢慢恢复自己的速度。|n|cffffcc00对召唤出来的单位造成<ACpu,DataC1>点的伤害。|r",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Aenr": {
        code: "Aenr",
        name: "纠缠根须(中立敌对1)",
        tip: "从地面冒出根须使目标在<Aenr,Dur1>秒内不能动弹，并对其造成每秒<Aenr,DataA1>点的伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Aenw": {
        code: "Aenw",
        name: "纠缠根须(中立敌对2)",
        tip: "从地面冒出根须使目标在<Aenr,Dur1>秒内不能动弹，并对其造成每秒<Aenr,DataA1>点的伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "SCcl": {
        code: "SCcl",
        name: "飓风(赛纳留斯)",
        tip: "将目标单位投掷到空中，使其不能移动，攻击和施放任何的魔法技能。而且其他单位也不能在这期间攻击它。|n持续<SCc1,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACcy": {
        code: "ACcy",
        name: "飓风(中立敌对)",
        tip: "将目标单位投掷到空中，使其不能移动，攻击和施放任何的魔法技能。而且其他单位也不能在这期间攻击它。|n持续<SCc1,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Asds": {
        code: "Asds",
        name: "卡布恩(地精工兵)",
        tip: "对一定区域造成<Asds,DataB1>点伤害。对付建筑物和数目特别地有效。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Asdg": {
        code: "Asdg",
        name: "卡布恩(时钟地精等级1)",
        tip: "对一定区域造成<Asds,DataB1>点伤害。对付建筑物和数目特别地有效。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Asd2": {
        code: "Asd2",
        name: "卡布恩(时钟地精等级2)",
        tip: "对一定区域造成<Asds,DataB1>点伤害。对付建筑物和数目特别地有效。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Asd3": {
        code: "Asd3",
        name: "卡布恩(时钟地精等级3)",
        tip: "对一定区域造成<Asds,DataB1>点伤害。对付建筑物和数目特别地有效。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACrk": {
        code: "ACrk",
        name: "抗性皮肤(中立敌对1)",
        tip: "减少负面魔法的持续时间，使单位对某些魔法免疫。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACsk": {
        code: "ACsk",
        name: "抗性皮肤(中立敌对2)",
        tip: "减少负面魔法的持续时间，使单位对某些魔法免疫。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Acht": {
        code: "Acht",
        name: "恐怖嚎叫(中立敌对)",
        tip: "发出恐怖的嚎叫，降低周围敌单位的攻击力<Acht,DataA1,%>%，<Acht,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Afzy": {
        code: "Afzy",
        name: "狂热",
        tip: "增加<Afzy,DataA1,%>%的攻击速度，<Afzy,DataB1,%>%的移动速度。持续<Afzy,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACt2": {
        code: "ACt2",
        name: "雷霆一击(雷霆蜥蜴)",
        tip: "震击地面，对周围的敌方地面单位造成<ACt2,DataA1>点的伤害。并减慢其移动和攻击速度。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACtc": {
        code: "ACtc",
        name: "雷霆一击(中立敌对)",
        tip: "震击地面，对周围的敌方地面单位造成<ACt2,DataA1>点的伤害。并减慢其移动和攻击速度。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ANfs": {
        code: "ANfs",
        name: "烈焰风暴(中立敌对2)",
        tip: "召唤出一道巨大的火焰，持续时间为3秒，每秒对敌方的地面单位造成75点的伤害。在火焰慢慢熄灭的过程中，敌方单位将持续受到极度轻微的伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACfs": {
        code: "ACfs",
        name: "烈焰风暴(中立敌对)",
        tip: "召唤出一道巨大的火焰，持续时间为3秒，每秒对敌方的地面单位造成75点的伤害。在火焰慢慢熄灭的过程中，敌方单位将持续受到极度轻微的伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACac": {
        code: "ACac",
        name: "命令光环",
        tip: "增加附近单位的攻击力。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACmf": {
        code: "ACmf",
        name: "魔法护盾(中立敌对)",
        tip: "激活可以每点魔力可以吸收<ACmf,DataA1>伤害力的护盾。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACm2": {
        code: "ACm2",
        name: "魔法免疫(阿克蒙德)",
        tip: "让目标单位对所有魔法免疫。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACm3": {
        code: "ACm3",
        name: "魔法免疫(龙)",
        tip: "让目标单位对所有魔法免疫。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACmi": {
        code: "ACmi",
        name: "魔法免疫(中立敌对)",
        tip: "让目标单位对所有魔法免疫。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACsm": {
        code: "ACsm",
        name: "魔法吸吮(中立敌对)",
        tip: "从一个敌人身上吸收魔法能量给血魔法师，每秒吸取<ACsm,DataB1>点魔法值。|n持续<ACsm,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "SCae": {
        code: "SCae",
        name: "耐久光环(中立敌对)",
        tip: "增加周围单位<SCae,DataA1,%>%的移动速度和<SCae,DataB1,%>%的攻击速度。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACr1": {
        code: "ACr1",
        name: "咆哮(兽族战士骷髅)",
        tip: "增加周围友军单位<ACr1,DataA1,%>%的攻击力。|n持续<ACr1,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACro": {
        code: "ACro",
        name: "咆哮(中立敌对)",
        tip: "增加周围友军单位<ACro,DataA1,%>%的攻击力。|n持续<ACro,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Awfb": {
        code: "Awfb",
        name: "霹雳闪电(巫师)",
        tip: "能将敌人击晕。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACfb": {
        code: "ACfb",
        name: "霹雳闪电(中立敌对)",
        tip: "对敌人投掷出一道霹雳闪电将其击晕。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Asb1": {
        code: "Asb1",
        name: "潜水(暴徒)",
        tip: "使单位可以潜入水下，隐去行踪。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Asb3": {
        code: "Asb3",
        name: "潜水(飞龙)",
        tip: "使单位可以潜入水下，隐去行踪。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Asb2": {
        code: "Asb2",
        name: "潜水(皇家卫兵)",
        tip: "使单位可以潜入水下，隐去行踪。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACat": {
        code: "ACat",
        name: "强击光环(中立敌对)",
        tip: "提高周围友军单位<ACat,DataA1,%>%的远程攻击力。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "SCva": {
        code: "SCva",
        name: "窃取生命(霜之哀伤)",
        tip: "",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACd2": {
        code: "ACd2",
        name: "驱逐魔法(中立敌对2)",
        tip: "驱散敌人身上的正面效果魔法和友军单位身上的负面效果魔法。|n|cffffcc00对召唤出来的单位造成<ACdm,DataB1>点的伤害。|r",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Adsm": {
        code: "Adsm",
        name: "驱逐魔法(中立敌对)",
        tip: "驱散敌人身上的正面效果魔法和友军单位身上的负面效果魔法。|n|cffffcc00对召唤出来的单位造成<ACdm,DataB1>点的伤害。|r",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACdm": {
        code: "ACdm",
        name: "驱逐魔法(中立敌对)",
        tip: "驱散敌人身上的正面效果魔法和友军单位身上的负面效果魔法。|n|cffffcc00对召唤出来的单位造成<ACdm,DataB1>点的伤害。|r",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACes": {
        code: "ACes",
        name: "闪避(中立敌对100%)",
        tip: "给予<ACes,DataA1,%>%的概率来躲避掉敌人的攻击。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACev": {
        code: "ACev",
        name: "闪避(中立敌对)",
        tip: "给予<ACev,DataA1,%>%的概率来躲避掉敌人的攻击",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACls": {
        code: "ACls",
        name: "闪电护盾(中立敌对)",
        tip: "在目标单位周围形成一个带电护罩，能对其周围的单位造成每秒<ACls,DataA1>点的伤害。|n持续<ACls,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACcl": {
        code: "ACcl",
        name: "闪电链(中立敌对)",
        tip: "投掷出一道闪电对第一个敌人造成<ACcl,DataA1>点的伤害，闪电一共跳跃<ACcl,DataB1>次。每次闪电的攻击力会随着跳跃次数增加而递减。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACds": {
        code: "ACds",
        name: "神圣护甲(中立敌对)",
        tip: "能在<ACds,Dur1>秒内使得该单位对所有的攻击和魔法免疫。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACr2": {
        code: "ACr2",
        name: "生命恢复(熊怪)",
        tip: "在<ACr2,Dur1>秒内恢复目标单位<ACr2,DataA1>点的生命值。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACrj": {
        code: "ACrj",
        name: "生命恢复(中立敌对)",
        tip: "在<ACrj,Dur1>秒内治疗目标友方单位<ACrj,DataA1>生命值。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACnr": {
        code: "ACnr",
        name: "生命恢复光环(中立)",
        tip: "",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ANre": {
        code: "ANre",
        name: "生命恢复光环(中立)",
        tip: "",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACdr": {
        code: "ACdr",
        name: "生命汲取(中立敌对)",
        tip: "汲取目标单位一定点数的生命值并将其给予黑暗游侠<ACdr,DataA1>生命值/秒。|n持续<ACdr,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACbl": {
        code: "ACbl",
        name: "嗜血术(中立敌对1)",
        tip: "在<ACbl,Dur1>秒内增加目标单位<ACbl,DataA1,%>%的攻击速度和<ACbl,DataB1,%>%的移动速度。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACbb": {
        code: "ACbb",
        name: "嗜血术(中立敌对2)",
        tip: "在<ACbb,Dur1>秒内增加目标单位<ACbb,DataA1,%>%的攻击速度和<ACbb,DataB1,%>%的移动速度。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "AAns": {
        code: "AAns",
        name: "收费",
        tip: "向某个玩家收取固定数额的金子和木材。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACfa": {
        code: "ACfa",
        name: "霜冻护甲(中立敌对)",
        tip: "霜冻护甲能增加目标单位<ACfa,DataB1>点的护甲防御，攻击该单位的近战型敌人也会在<ACfa,Dur1>秒内减速。|n持续<ACfa,DataA1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACf2": {
        code: "ACf2",
        name: "霜冻护甲(自动施放) (中立敌对)",
        tip: "霜冻护甲能增加目标单位<ACfa,DataB1>点的护甲防御，攻击该单位的近战型敌人也会在<ACfa,Dur1>秒内减速。|n持续<ACfa,DataA1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACcb": {
        code: "ACcb",
        name: "霜冻闪电",
        tip: "向敌人投掷出一冰块碎片，对其造成<ACcb,DataA1>点的伤害并使其在<ACcb,Dur1>秒内处于昏晕状态。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACbf": {
        code: "ACbf",
        name: "霜冻闪电",
        tip: "吐出带有攻击力的冰霜，最初造成<ACbf,DataA1>点的伤害，随后在<ACbf,Dur1>秒内对目标单位造成每秒<ACbf,DataE1>点的伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACfn": {
        code: "ACfn",
        name: "霜冻新星(中立敌对)",
        tip: "用一阵霜冻来攻击目标单位，造成<ACfn,DataB1>点的常规伤害和<ACfn,DataA1>点的霜冻新星伤害。并在<ACfn,Dur1>秒内减慢被攻击单位的速度。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACsp": {code: "ACsp", name: "睡眠", tip: "", kind: Kind.Ability, race: Race.NeutralHostile, type: Type.Unit},
    "ACsl": {
        code: "ACsl",
        name: "睡眠(中立敌对)",
        tip: "让目标单位在<ACsl,Dur1>秒内处于睡眠状态。如果该单位遭到攻击就会自动醒来。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACdc": {
        code: "ACdc",
        name: "死亡缠绕(中立敌对)",
        tip: "能治愈某个友军单位<ACdc,DataA1>点生命值，并对某个敌方单位造成一半数值的伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Afod": {
        code: "Afod",
        name: "死亡之指(中立敌对)",
        tip: "能立刻杀死某个生物或者摧毁某个建筑物。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACf3": {
        code: "ACf3",
        name: "痛苦之指(中立敌对)",
        tip: "能残忍地杀害敌人的单位或者猛烈地破坏敌人的建筑物。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACfd": {
        code: "ACfd",
        name: "痛苦之指(中立敌对)",
        tip: "能残忍地杀害敌人的单位或者猛烈地破坏敌人的建筑物。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACtb": {
        code: "ACtb",
        name: "投石",
        tip: "一块巨石被投向敌人，对其造成<ACtb,DataA1>点的伤害并在<ACtb,Dur1>秒内使其处于昏晕状态。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACcn": {
        code: "ACcn",
        name: "吞食尸体(中立敌对)",
        tip: "吞食一个附近的尸体，每秒治疗<ACcn,DataA1>生命值。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACdv": {
        code: "ACdv",
        name: "吞噬(中立敌对)",
        tip: "吞噬某个敌方单位，对其造成每秒<Advc,DataB1>点的伤害。如果吞噬者在咀嚼目标单位的过程中被杀，那么被吞噬的单位会从其口中跳出来。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACde": {
        code: "ACde",
        name: "吞噬魔法(中立敌对)",
        tip: "吸收一定范围内所有单位身上的魔法效果。每个单位给予破坏者<Advm,DataA1>点的生命值和<Advm,DataB1>点魔法值。|n|cffffcc00对召唤出来的单位造成<Advm,DataE1>点的伤害。|r",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Ache": {
        code: "Ache",
        name: "瓦解光线",
        tip: "召唤一道压制魔法能量流，可以弹跳<Ache,DataC1>次，在其轨迹上驱散敌单位。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Amrf": {
        code: "Amrf",
        name: "乌鸦形态",
        tip: "变为一只乌鸦。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACvp": {
        code: "ACvp",
        name: "吸血光环(中立敌对)",
        tip: "周围的单位能将他们自己对敌人<ACvp,DataA1,%>%的伤害值转化成自己的生命值。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Andt": {
        code: "Andt",
        name: "显示",
        tip: "显示地图上的某块区域。|n能看到隐形单位。|n持续<Andt,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACim": {
        code: "ACim",
        name: "献祭(中立敌对)",
        tip: "激活献祭将会让该单位处于火焰的包围之中，对周围的地面单位能造成每秒<ACim,DataA1>点的伤害。|n该技能会持续地消耗魔法值。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Assp": {
        code: "Assp",
        name: "小蜘蛛(中立敌对)",
        tip: "",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Aspd": {
        code: "Aspd",
        name: "小蜘蛛(中立敌对)",
        tip: "",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACua": {
        code: "ACua",
        name: "邪恶光环(中立敌对)",
        tip: "提高周围单位<ACua,DataA1,%>%的移动速度和<ACua,DataB1,%>%的生命值恢复速度。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Suhf": {
        code: "Suhf",
        name: "邪恶狂热(巫师)",
        tip: "增加目标单位<Suhf,DataA1,%>%的攻击速度，但是每秒也会消耗目标<Suhf,DataB1>点的生命值。|n持续<Suhf,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACuf": {
        code: "ACuf",
        name: "邪恶狂热(中立敌对)",
        tip: "增加目标单位<Auhf,DataA1,%>%的攻击速度，但是每秒也会消耗目标<ACuf,DataB1>点的生命值。|n持续<ACuf,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ANmr": {
        code: "ANmr",
        name: "心灵腐烂",
        tip: "在<ANmr,Dur1>秒消耗目标单位<ANmr,DataA1>点的魔法值。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACif": {
        code: "ACif",
        name: "心灵之火(中立敌对)",
        tip: "增加目标友军单位<ACif,DataA1,%>%的攻击力和<ACif,DataB1>的防御力。|n持续<ACif,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "AChx": {
        code: "AChx",
        name: "妖术(中立敌对)",
        tip: "在<AChx,Dur1>秒内将敌方的某个单位变成某种小动物。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACs9": {
        code: "ACs9",
        name: "野兽幽魂(中立敌对野猪)",
        tip: "能召唤出<ACs9,DataB1>个野猪幽灵来。|n持续<ACs9,Dur1>秒。|n|n|cffffcc00能攻击地面单位。|r",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACsf": {
        code: "ACsf",
        name: "野兽幽魂(中立敌对)",
        tip: "能召唤出<ACsf,DataB1>条幽灵狼来。|n持续<ACsf,Dur1>秒。|n|n|cffffcc00能攻击地面单位。|r",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Asla": {
        code: "Asla",
        name: "一直睡眠",
        tip: "催眠单位，直到被唤醒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Anhe": {
        code: "Anhe",
        name: "医疗(中立敌对1)",
        tip: "医疗一个非机械友军单位。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Anh1": {
        code: "Anh1",
        name: "医疗(中立敌对2)",
        tip: "医疗一个非机械友军单位。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Anh2": {
        code: "Anh2",
        name: "医疗(中立敌对3)",
        tip: "医疗一个非机械友军单位。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "AChv": {
        code: "AChv",
        name: "医疗波(中立敌对)",
        tip: "召唤出一道能跳跃<AChv,DataB1>次的医疗能量波。增加第一个目标<AChv,DataA1> 点的生命值，每次跳跃都将削弱这道能量波的医疗能力。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Ahid": {
        code: "Ahid",
        name: "影遁(阿卡玛)",
        tip: "让单位停止自动攻击敌人，可以使其影遁，在夜间变的隐形。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACen": {
        code: "ACen",
        name: "诱捕(中立敌对)",
        tip: "将敌方的某个空中单位捕获到地面能动弹。被诱捕的空中单位能像地面单位一样遭到攻击。|n持续<ACen,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACps": {
        code: "ACps",
        name: "占据(中立敌对)",
        tip: "占据目标单位的灵魂，但是同时也会摧毁施放者的身体。|n占据魔法不能用在飞行单位，英雄和高于<ACps,DataA1>级的野生单位身上。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Awrs": {
        code: "Awrs",
        name: "战争践踏(中立敌对1)",
        tip: "重击地面，对周围的地面单位造成<Awrs,DataA1>点的伤害并使其在<Awrs,Dur1>秒内保持眩晕状态。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Awrh": {
        code: "Awrh",
        name: "战争践踏(中立敌对2)",
        tip: "重击地面，对周围的地面单位造成<Awrh,DataA1点的伤害并使其在<Awrh,Dur1>秒内保持眩晕状态。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Awrg": {
        code: "Awrg",
        name: "战争践踏(中立敌对3)",
        tip: "重击地面，对周围的地面单位造成<Awrg,DataA1>点的伤害并使其在<Awrg,Dur1>秒内保持眩晕状态。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACst": {
        code: "ACst",
        name: "震荡波(陷阱)",
        tip: "一道强劲的震荡波能对一直线上的敌人造成<ACst,DataA1>点的伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACsh": {
        code: "ACsh",
        name: "震荡波(中立敌对)",
        tip: "一道强劲的震荡波能对一直线上的敌人造成<ACsh,DataA1>点的伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "AChw": {
        code: "AChw",
        name: "治疗守卫(中立敌对)",
        tip: "召唤出一个不能移动的治疗守卫。能以每秒<Aoar,DataA1,%>%的速度来恢复周围非机械单位的生命值。|n持续<AChw,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACct": {
        code: "ACct",
        name: "致命一击(中立敌对)",
        tip: "给予<ACct,DataA1>%的概率使得该单位能施放出常规攻击<ACct,DataB1>倍的伤害值。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACbh": {
        code: "ACbh",
        name: "重击(中立敌对1)",
        tip: "给予<ACbh,DataA1>%的概率能造成<ACbh,DataC1>点的额外伤害，并在<ACbh,Dur1>秒内击晕敌人。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ANbh": {
        code: "ANbh",
        name: "重击(中立敌对2)",
        tip: "给予<ANbh,DataA1>%的概率能造成<ANbh,DataC1>点的额外伤害并在<ANbh,Dur1>秒内击晕敌人。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACrn": {
        code: "ACrn",
        name: "重生(中立敌对)",
        tip: "当被杀时，该单位自动会复活。重生有<ACrn,Cool1>秒的施放/攻击间隔时间。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACwb": {
        code: "ACwb",
        name: "蛛网(中立敌对)",
        tip: "将目标单位用一张网来捕获到地面，从而地面上的单位可以对其进行攻击。|n持续<ACwb,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACav": {
        code: "ACav",
        name: "专注光环(中立敌对)",
        tip: "提高周围单位<ACav,DataA1>点的护甲。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACsa": {
        code: "ACsa",
        name: "灼热之箭(中立敌对)",
        tip: "能增加<ACsa,DataA1>点的火焰伤害，但是会消耗魔法。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACfr": {
        code: "ACfr",
        name: "自然之力(中立敌对)",
        tip: "将一小块区域内的树木转化成<ACfr,DataA1>个树人。|n持续<ACfr,Dur1>秒。|n|n|cffffcc00能攻击地面单位。|r",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "ACcs": {
        code: "ACcs",
        name: "诅咒(中立敌对)",
        tip: "诅咒敌人的某个单位使其有<ACcs,DataA1,%>%的概率不能击中自己的目标。|n持续<ACcs,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },
    "Abu5": {
        code: "Abu5",
        name: "钻地(中立敌对)",
        tip: "阿卡那瑟德钻入地面而消失不见。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Unit
    },

    "AEvi": {
        code: "AEvi",
        name: "变身(邪恶的尤迪安)",
        tip: "让恶魔猎手变身为一个威力巨大的恶魔，该恶魔具有远程攻击能力。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "AEIl": {
        code: "AEIl",
        name: "变身(尤迪安)",
        tip: "让恶魔猎手变身为一个威力巨大的恶魔，该恶魔具有远程攻击能力。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "AHca": {
        code: "AHca",
        name: "冰冻冷箭",
        tip: "每次攻击带有冰冻效果，使敌人单位减慢攻击和移动。|n|n|cffffcc00等级 1|r - <AHca,DataB1,%>%攻击速度，<AHca,DataC1,%>%移动速度，持续<AHca,Dur1>秒。|n|cffffcc00等级 2|r - <AHca,DataB2,%>%攻击速度，<AHca,DataC2,%>%移动速度，持续<AHca,Dur2>秒。|n|cffffcc00等级 3|r - <AHca,DataB3,%>%攻击速度，<AHca,DataC3,%>%移动速度，持续<AHca,Dur3>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANfl": {
        code: "ANfl",
        name: "叉状闪电",
        tip: "召唤一道锥形闪电伤害女海巫面前的多个敌人。|n|n|cffffcc00等级 1|r - <ANfl,DataA1>伤害/单位。|n|cffffcc00等级 2|r - <ANfl,DataA2>伤害/单位。|n|cffffcc00等级 3|r - <ANfl,DataA3>伤害力/单位。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANsi": {
        code: "ANsi",
        name: "沉默魔法",
        tip: "阻止一定范围内的所有敌人施放魔法。魔法的效果范围和持续时间会随着等级的增加而增加。|n|n|cffffcc00等级 1|r - 小范围，持续<ANsi,Dur1>秒。|n|cffffcc00等级 2|r - 中等范围，持续<ANsi,Dur2>秒。|n|cffffcc00等级 3|r - 大型范围，持续<ANsi,Dur3>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "SNin": {
        code: "SNin",
        name: "地狱火(提科恩迪斯)",
        tip: "召唤出一个地狱火恶魔从天而降，对一定区域内敌方的地面单位造成<SNin,DataA1>点的伤害并使其在<SNin,Dur1>秒内处于昏晕状态。地狱火恶魔持续<SNin,DataB1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANin": {
        code: "ANin",
        name: "地狱火(中立敌对)",
        tip: "召唤出一地狱火恶魔从天而降，对一定区域内的敌人造成伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "SNeq": {
        code: "SNeq",
        name: "地震(中立敌对)",
        tip: "使大地摇动，对建筑物造成每秒<SNeq,DataB1>点的伤害并能让处于有效范围内的单位减速<SNeq,DataC1,%>%。持续<SNeq,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANtm": {
        code: "ANtm",
        name: "点金术",
        tip: "立刻杀死某个单位，然后将其变成金币，补充到你的国库中。|n点金术不能被用在英雄和高于等级<ANtm,DataC1>的野外生物上。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "AEpa": {
        code: "AEpa",
        name: "毒箭",
        tip: "通过附加的火焰伤害来增加女祭司的攻击力。|n|n|cffffcc00等级 1|r -增加<AHfa,DataA1>点伤害。|n|cffffcc00等级 2|r –增加 <AHfa,DataA2>点伤害。 |n|cffffcc00等级 3|r – 增加<AHfa,DataA3>点伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANca": {
        code: "ANca",
        name: "分裂攻击",
        tip: "深渊魔王同时对多个敌人单位造成伤害。|n|n|cffffcc00等级 1|r - <ANca,DataA1,%>%溅射伤害。|n|cffffcc00等级 2|r - <ANca,DataA2,%>%溅射伤害。|n|cffffcc00等级 3|r - <ANca,DataA3,%>%溅射伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANde": {
        code: "ANde",
        name: "粉碎",
        tip: "使得对于建筑物的攻击加<ANde,DataB1>倍的伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANd1": {
        code: "ANd1",
        name: "粉碎(Uprade Level 1)",
        tip: "使得对于建筑物的攻击加<ANd1,DataB1>倍的伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANd2": {
        code: "ANd2",
        name: "粉碎(Upgrade Level 2)",
        tip: "使得对于建筑物的攻击加<ANd2,DataB1>倍的伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANd3": {
        code: "ANd3",
        name: "粉碎(Uperade Level 3)",
        tip: "使得对于建筑物的攻击加<ANd3,DataB1>倍的伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANsb": {
        code: "ANsb",
        name: "风暴之锤",
        tip: "向目标投掷一巨大的魔法斧，对其造成一定伤害并使其处于眩晕状态。|n|n|cffffcc00等级 1|r - <ANsb,DataA1>点伤害, <ANsb,Dur1>秒眩晕状态。|n|cffffcc00等级 2|r - <ANsb,DataA2>点伤害, <ANsb,Dur2>秒眩晕状态。|n|cffffcc00等级 3|r - <ANsb,DataA3>点伤害, <ANsb,Dur3>秒眩晕状态。|n|cffffcc00等级 4|r - <ANsb,DataA4>点伤害, <ANsb,Dur4>秒眩晕状态。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANch": {
        code: "ANch",
        name: "符咒",
        tip: "控制某个敌方单位。|n符咒不能被用在英雄和等级高于<ANch,DataA1>的中立单位上。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANeg": {
        code: "ANeg",
        name: "工程升级",
        tip: "提高修补匠的技能。|n|n|cffffcc00火箭群|r - 大区域|n|cffffcc00口袋工厂|r – 能更快地建造出人工地精。|n|cffffcc00机器人地精|r – 增加护甲和力量。 |n|n同时提高攻击力和加快修补匠的移动速度。|n|n|cffffcc00等级 1|r - +<ANeg,DataB1> 攻击力, +<ANeg,DataA1,%>% 移动速度。|n|cffffcc00等级 2|r - +<ANeg,DataB2> 攻击力, +<ANeg,DataA2,%>% 移动速度。|n|cffffcc00等级 3|r - +<ANeg,DataB3> 攻击力, +<ANeg,DataA3,%>% 移动速度。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANba": {
        code: "ANba",
        name: "黑暗之箭",
        tip: "增加额外的攻击力。被黑暗之箭射死的单位会变成骷髅兵。|n|n|cffffcc00等级 1|r - 增加<ANba,DataA1>点攻击力，骷髅兵具有<ndr1,RealHP>点生命值。|n|cffffcc00等级 2|r - 增加<ANba,DataA2>点攻击力，骷髅兵具有<ndr2,RealHP>点生命值。|n|cffffcc00等级 3|r - 增加<ANba,DataA3>点攻击力，骷髅兵具有<ndr3,RealHP>点生命值。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANdp": {
        code: "ANdp",
        name: "黑暗之门(啊克蒙德)",
        tip: "开启一扇黑暗之门，从中会走出各种各样的恶魔来为阿克蒙德效力。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANdc": {
        code: "ANdc",
        name: "黑暗转换(马哥尼斯)",
        tip: "让一个村民陷入睡眠，并将其变成僵尸。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "SNdc": {
        code: "SNdc",
        name: "黑暗转换(马哥尼斯，快的)",
        tip: "让一个村民陷入睡眠，并将其变成僵尸。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANcr": {
        code: "ANcr",
        name: "化学风暴",
        tip: "炼金术士让其食人魔进入了一种狂暴的状态，从而提高了<ANcr,DataE1,%>%的移动速度和一定的攻击速度。|n持续<ANcr,HeroDur1> 秒。|n|n|cffffcc00等级 1|r – 提高<ANcr,DataF1,%>%的攻击速度。|n|cffffcc00等级 2|r – 提高<ANcr,DataF2,%>% 的攻击速度。|n|cffffcc00等级 3|r – 提高<ANcr,DataF3,%>% 的攻击速度。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANrc": {
        code: "ANrc",
        name: "混乱之雨(啊克蒙德)",
        tip: "召唤出几个地狱火恶魔从天而降。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANr3": {
        code: "ANr3",
        name: "混乱之雨(巴那泽尔)",
        tip: "召唤出几个地狱火恶魔从天而降。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANcs": {
        code: "ANcs",
        name: "火箭群",
        tip: "对某个区域用火箭进行攻击，使目标在<ANcs,Dur1> 秒内处于昏晕状态，并对其造成一定程度的伤害。|n|n|cffffcc00等级 1|r - 35 攻击力。|n|cffffcc00等级 2|r - 65 攻击力。|n|cffffcc00等级 3|r - 100 攻击力。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANc1": {
        code: "ANc1",
        name: "火箭群(Uperade Level 1)",
        tip: "对某个区域用火箭进行攻击，使目标在<ANc1,Dur1> 秒内处于昏晕状态，并对其造成一定程度的伤害。|n|n|cffffcc00等级 1|r - 35 攻击力。|n|cffffcc00等级 2|r - 65 攻击力。|n|cffffcc00等级 3|r - 100 攻击力。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANc2": {
        code: "ANc2",
        name: "火箭群(Uperade Level 2)",
        tip: "对某个区域用火箭进行攻击，使目标在<ANc2,Dur1> 秒内处于昏晕状态，并对其造成一定程度的伤害。|n|n|cffffcc00等级 1|r - 35 攻击力。|n|cffffcc00等级 2|r - 65 攻击力。|n|cffffcc00等级 3|r - 100 攻击力。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANc3": {
        code: "ANc3",
        name: "火箭群(Uperade Level 3)",
        tip: "对某个区域用火箭进行攻击，使目标在<ANc3,Dur1> 秒内处于昏晕状态，并对其造成一定程度的伤害。|n|n|cffffcc00等级 1|r - 35 攻击力。|n|cffffcc00等级 2|r - 65 攻击力。|n|cffffcc00等级 3|r - 100 攻击力。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANvc": {
        code: "ANvc",
        name: "火山爆发",
        tip: "让大地陷入火山爆发的状态。在<ANvc,DataC1>秒内，一共<ANvc,DataA1>个灼热的熔岩会喷向周围的单位，对每个目标造成<ANvc,DataE1> 的伤害，并在<ANvc,Dur1> 秒内让其处于昏晕状态。对于建筑物来说，他们受到的伤害将是正常单位的<ANvc,DataD1>倍。|n持续35 秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANef": {
        code: "ANef",
        name: "火土风暴",
        tip: "熊猫酒仙分身成3元素形体，制造出3个特殊的战士。他们中任何一个在召唤时限内还活着，熊猫酒仙就会再生。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "Acef": {
        code: "Acef",
        name: "火土风暴(陈)",
        tip: "熊猫酒仙分身成3元素形体，制造出3个特殊的战士。他们中任何一个在召唤时限内还活着，熊猫酒仙就会再生。|n|n|cffffcc00等级 1|r - 制造出3个巨大的熊猫战士。|n|cffffcc00等级 2|r - 制造出3个更加巨大的熊猫战士。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANbf": {
        code: "ANbf",
        name: "火焰呼吸",
        tip: "对敌人吐出一道火焰，在一开始对其就造成伤害之后，如果对方身上有醉酒云雾的话那还能在一定时间内持续地对其造成伤害。|n持续<ANbf,Dur1>秒。 |n|n|cffffcc00等级 1|r -最初造成<ANbf,DataA1>点的伤害，随后造成每秒<ANbf,DataE1>点的伤害。|n|cffffcc00等级 2|r -最初造成<ANbf,DataA2>点的伤害，随后造成每秒<ANbf,DataE2>点的伤害。|n|cffffcc00等级 3|r -最初造成<ANbf,DataA3>点的伤害，随后造成每秒<ANbf,DataE3>点的伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANcf": {
        code: "ANcf",
        name: "火焰呼吸(陈)",
        tip: "对敌人吐出一道火焰，在一开始对其就造成伤害之后，如果对方身上有醉酒云雾的话那还能在一定时间内持续地对其造成伤害。|n持续<ANcf,Dur1>秒。|n|n|cffffcc00等级 1|r - 最初造成<ANcf,DataA1>点的伤害随后造成每秒<ANcf,DataE1>点的伤害。|n|cffffcc00等级 2|r - 最初造成<ANcf,DataA2>点的伤害随后造成每秒<ANcf,DataE2>点的伤害。|n|cffffcc00等级 3|r - 最初造成<ANcf,DataA3>点的伤害随后造成每秒<ANcf,DataE3>点的伤害。|n|cffffcc00等级 4|r - 最初造成<ANcf,DataA4>点的伤害随后造成每秒<ANcf,DataE4>点的伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANrf": {
        code: "ANrf",
        name: "火焰雨",
        tip: "召唤来一阵阵的火焰雨从天而降从而对一定范围内的敌人造成伤害，每阵火焰雨在对敌人造成初始伤害之后，在随后的<ANrf,Dur1>秒内还会对其造成持续性的伤害。|n|n|cffffcc00等级 1|r -<ANrf,DataB1>点伤害，<ANrf,DataA1>阵火焰雨，每秒<ANrf,DataE1>点伤害。|n|cffffcc00等级 2|r -<ANrf,DataB2>点伤害，<ANrf,DataA2>阵火焰雨，每秒<ANrf,DataE2>点伤害。|n|cffffcc00等级 3|r -<ANrf,DataB3>点伤害，<ANrf,DataA3>阵火焰雨，每秒<ANrf,DataE1>点伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANrg": {
        code: "ANrg",
        name: "机器人地精",
        tip: "让修补匠变成一个机器人地精，具有以下的一些属性。|n|n- 额外力量属性和额外护甲。|n-使用恶魔技能，能对建筑物造成额外的伤害。|n-修补匠变成机器人了，这个会让他对于大多数的进攻魔法和少数有益魔法免疫。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANg1": {
        code: "ANg1",
        name: "机器人地精(Uprade Level 1)",
        tip: "让修补匠变成一个机器人地精，具有以下的一些属性。|n|n- 额外力量属性和额外护甲。|n-使用恶魔技能，能对建筑物造成额外的伤害。|n-修补匠变成机器人了，这个会让他对于大多数的进攻魔法和少数有益魔法免疫。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANg2": {
        code: "ANg2",
        name: "机器人地精(Uperade Level 2)",
        tip: "让修补匠变成一个机器人地精，具有以下的一些属性。|n|n- 额外力量属性和额外护甲。|n-使用恶魔技能，能对建筑物造成额外的伤害。|n-修补匠变成机器人了，这个会让他对于大多数的进攻魔法和少数有益魔法免疫。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANg3": {
        code: "ANg3",
        name: "机器人地精(Uperade Level 3)",
        tip: "让修补匠变成一个机器人地精，具有以下的一些属性。|n|n- 额外力量属性和额外护甲。|n-使用恶魔技能，能对建筑物造成额外的伤害。|n-修补匠变成机器人了，这个会让他对于大多数的进攻魔法和少数有益魔法免疫。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANmo": {
        code: "ANmo",
        name: "季风",
        tip: "在一小块区域内召唤出闪电风暴对敌人造成<ANmo,DataA1>点的伤害。|n持续<ANmo,Dur1>秒。|n|n|cffffcc00等级 1|r - 小型的区域。|n|cffffcc00等级 2|r - 中等大小的区域。|n|cffffcc00等级 3|r - 大型的区域。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANst": {
        code: "ANst",
        name: "惊吓",
        tip: "召唤成群的狂暴雷蜥蜴轰炸驯兽师的敌人。每个轰炸的蜥蜴造成<ANst,DataC1>伤害，持续<ANst,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "Arsp": {
        code: "Arsp",
        name: "惊吓(雷克萨)",
        tip: "唤出雷霆蜥蜴来爆炸在敌方单位的头上。|n|n|cffffcc00等级 1|r -每个爆炸的雷霆蜥蜴能造成<Arsp,DataC1>点伤害。|n|cffffcc00等级 2|r -每个爆炸的雷霆蜥蜴能造成<Arsp,DataC2>点伤害。|n|n持续<Arsp,Dur2>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANht": {
        code: "ANht",
        name: "恐怖嚎叫",
        tip: "深渊魔王发出恐怖的嚎叫，使周围敌人在恐惧中战栗，丢失当前的魔法效果，减少他们的伤害力。|n持续<ANht,Dur1>秒。|n|n|cffffcc00等级 1|r - 攻击减少<ANht,DataA1,%>%。|n|cffffcc00等级 2|r - 攻击减少<ANht,DataA2,%>%。|n|cffffcc00等级 3|r - 攻击减少<ANht,DataA3,%>%。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANsy": {
        code: "ANsy",
        name: "口袋工厂",
        tip: "建造一座能自动生成地精的工厂。这些地精都是人工地精。它们是强大的攻击者，在阵亡之后还能发生爆炸从而对周围的造成一定的伤害。|n|n|cffffcc00等级 1|r – 爆炸具有<Asdg,DataB1> 攻击力。|n|cffffcc00等级 2|r – 爆炸具有<Asd2,DataB1> 攻击力。|n|cffffcc00等级 3|r – 爆炸具有<Asd3,DataB1> 攻击力。|n工厂持续<ANsy,Dur3> 秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANs1": {
        code: "ANs1",
        name: "口袋工厂(Uperade 1)",
        tip: "建造一座能自动生成地精的工厂。这些地精都是人工地精。它们是强大的攻击者，在阵亡之后还能发生爆炸从而对周围的造成一定的伤害。|n|n|cffffcc00等级 1|r – 爆炸具有<Asdg,DataB1> 攻击力。|n|cffffcc00等级 2|r – 爆炸具有<Asd2,DataB1> 攻击力。|n|cffffcc00等级 3|r – 爆炸具有<Asd3,DataB1> 攻击力。|n工厂持续<ANs1,Dur3> 秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANs2": {
        code: "ANs2",
        name: "(口袋工厂(Upgrade 2)",
        tip: "建造一座能自动生成地精的工厂。这些地精都是人工地精。它们是强大的攻击者，在阵亡之后还能发生爆炸从而对周围的造成一定的伤害。|n|n|cffffcc00等级 1|r – 爆炸具有<Asdg,DataB1> 攻击力。|n|cffffcc00等级 2|r – 爆炸具有<Asd2,DataB1> 攻击力。|n|cffffcc00等级 3|r – 爆炸具有<Asd3,DataB1> 攻击力。|n工厂持续<ANs2,Dur3> 秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANs3": {
        code: "ANs3",
        name: "口袋工厂(Upsrade 3)",
        tip: "建造一座能自动生成地精的工厂。这些地精都是人工的地精。它们是强大的攻击者，在阵亡之后还能发生爆炸从而对周围的造成一定的伤害。|n|n|cffffcc00等级 1|r – 爆炸具有<Asdg,DataB1> 攻击力。|n|cffffcc00等级 2|r – 爆炸具有<Asd2,DataB1> 攻击力。|n|cffffcc00等级 3|r – 爆炸具有<Asd3,DataB1> 攻击力。|n工厂持续<ANs3,Dur3> 秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANsl": {
        code: "ANsl",
        name: "灵魂保存(马哥尼斯)",
        tip: "将一个僵尸放入下面的地域以备后用。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANso": {
        code: "ANso",
        name: "灵魂燃烧",
        tip: "让火焰包围敌人，让其在一段时间之内持续受到伤害，并阻止其施放任何魔法和减少其<ANso,DataC1,%>%的攻击力。 |n|n|cffffcc00等级 1|r - 100 点伤害， 持续<ANso,Dur1>秒。|n|cffffcc00等级 2|r - 225 点伤害， 持续 <ANso,Dur2>秒。|n|cffffcc00等级 3|r - 375 点伤害， 持续<ANso,Dur3>秒。|n|n灵魂燃烧在英雄身上持续的时间会减半。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ACs8": {
        code: "ACs8",
        name: "灵兽",
        tip: "召唤<ACs8,DataB1>只灵兽攻击阿卡玛的敌人。|n持续 <ACs8,Dur1> 秒。|n|n|cffffcc00等级 1|r - <nsw1,realHP>生命值，<nsw1,mindmg1> - <nsw1,maxdmg1>伤害力。|n|cffffcc00等级 2|r - <nsw2,realHP>生命值，<nsw2,mindmg1> - <nsw2,maxdmg1>伤害力及反馈。|n|cffffcc00等级 3|r - <nsw3,realHP>生命值，<nsw3,mindmg1> - <nsw3,maxdmg1>伤害力，反馈和法力燃烧。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANto": {
        code: "ANto",
        name: "龙卷风",
        tip: "召唤一股可控制的强劲龙卷风，可以减慢敌人单位移动速度，随机将敌地面单位抛入空中，并对敌建筑造成伤害。|n持续<ANto,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANms": {
        code: "ANms",
        name: "魔法护盾",
        tip: "建立一个护盾，用女海巫的魔法能量来吸收伤害。|n|n|cffffcc00等级 1|r - 每一点魔法能量能吸收1点的伤害。|n|cffffcc00等级 2|r -每一点魔法能量能吸收1.5点的伤害。|n|cffffcc00等级 3|r - 每一点魔法能量能吸收2点的伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANdo": {
        code: "ANdo",
        name: "魔鬼缠身",
        tip: "使一个目标遭到魔鬼缠身。被折磨的单位不能施放任何魔法并且每秒受到<ANdo,DataA1>点伤害直到他死去。在他死亡时，一个巨大的魔鬼将会从他的尸体上诞生。魔鬼缠身不能被驱散或取消。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANfb": {
        code: "ANfb",
        name: "霹雳闪电(中立敌对)",
        tip: "",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "AEsb": {
        code: "AEsb",
        name: "群星坠落(更加强大的)",
        tip: "召唤出一阵阵的流星雨，每阵流星雨对敌人造成<AEsb,DataA1>点的伤害。|n持续<AEsb,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANic": {
        code: "ANic",
        name: "燃灰",
        tip: "每次攻击都带有火焰伤害。第一次攻击将带有一定的附加伤害，第二次攻击的附加伤害会是第一次的两倍，第三次为三倍，以此类推。|n|n如果某个单位是遭到这个攻击而死去的，那么他的燃灰会对周围的单位造成一定程度的伤害。|n|n|cffffcc00等级 1|r - <ANic,DataA1> 附加伤害，<ANic,DataB1> 燃灰伤害。|n|cffffcc00等级 2|r - <ANic,DataA2> 附加伤害， <ANic,DataB2>燃灰伤害。|n|cffffcc00等级 3|r - <ANic,DataA3>附加伤害，<ANic,DataB3>燃灰伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANia": {
        code: "ANia",
        name: "燃灰(箭矢)",
        tip: "每次攻击都带有火焰伤害。第一次攻击将带有一定的附加伤害，第二次攻击的附加伤害会是第一次的两倍，第三次为三倍，以此类推。|n|n如果某个单位是遭到这个攻击而死去的，那么他的燃灰会对周围的单位造成一定程度的伤害。|n|n|cffffcc00等级 1|r - <ANia,DataA1> 附加伤害，<ANia,DataB1> 燃灰伤害。|n|cffffcc00等级 2|r - <ANia,DataA2> 附加伤害， <ANia,DataB2>燃灰伤害。|n|cffffcc00等级 3|r - <ANia,DataA3>附加伤害，<ANia,DataB3>燃灰伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANdr": {
        code: "ANdr",
        name: "生命汲取",
        tip: "汲取目标单位一定点数的生命值并将其给予黑暗游侠。|n持续<ANdr,Dur1>秒。|n|n|cffffcc00等级 1|r - 每秒汲取<ANdr,DataA1>点。|n|cffffcc00等级 2|r - 每秒汲取<ANdr,DataA2>点。|n|cffffcc00等级 3|r - 每秒汲取<ANdr,DataA3>点。 ",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "Aamk": {
        code: "Aamk",
        name: "属性附加",
        tip: "永久性地增加智力，敏捷度和力量。 |n|n|cffffcc00等级 1|r - 对所有属性增加3点。|n|cffffcc00等级 2|r - 增加额外的3点。|n|cffffcc00等级 3|r - 增加额外的3点。|n|cffffcc00等级 4|r - 增加额外的3点。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANfa": {
        code: "ANfa",
        name: "霜冻之箭",
        tip: "每次攻击带有冰冻效果，造成额外的伤害。使敌人单位减慢攻击和移动速度。 |n|n|cffffcc00等级 1|r - <ANfa,DataB1,%>% 攻击速度, <ANfa,DataC1,%>% 移动速度, <ANfa,DataA1> 点额外伤害。 |n|cffffcc00等级 2|r - <ANfa,DataB2,%>% 攻击速度， <ANfa,DataC2,%>% 移动速度，<ANfa,DataA2>点额外伤害。 |n|cffffcc00等级 3|r - <ANfa,DataB3,%>% 攻击速度， <ANfa,DataC3,%>% 移动速度，<ANfa,DataA3>点额外伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANwm": {code: "ANwm", name: "水奴", tip: "", kind: Kind.Ability, race: Race.NeutralHostile, type: Type.Hero},
    "SNdd": {
        code: "SNdd",
        name: "死亡凋零(中立敌对)",
        tip: "对有效范围内的单位每秒造成相当于<SNdd,DataA1,%>%生命值的伤害，也能摧毁树木。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANfd": {
        code: "ANfd",
        name: "死亡之指(啊克蒙德)",
        tip: "能立刻杀死某个生物或者摧毁某个建筑物。完全地摧毁它。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANab": {
        code: "ANab",
        name: "酸性炸弹",
        tip: "向目标扔出一瓶酸液。在冲击之下，酸液瓶会被打碎，对周围的敌人造成一定程度的伤害。|n|n减少护甲，对于首个目标造成持续高伤害。对于周围的目标造成的伤害会稍小一些。|n持续 <ANab,Dur1>秒。|n|n|cffffcc00等级 1|r - 每秒最大<ANab,DataD1>点伤害。减少<ANab,DataC1>点护甲。|n|cffffcc00等级 2|r - 每秒最大<ANab,DataD2>点伤害。减少<ANab,DataC2>点护甲。|n|cffffcc00Level 3|r - 每秒最大<ANab,DataD3>点伤害。减少<ANab,DataC3>点护甲。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANcl": {
        code: "ANcl",
        name: "通魔",
        tip: "可作为大多数主动技能的模板，可以被魔法护盾护身符抵挡",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ACs7": {
        code: "ACs7",
        name: "野兽幽魂",
        tip: "召唤出<ACs7",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANhs": {
        code: "ANhs",
        name: "医疗气雾",
        tip: "喷出迷雾对一定区域的单位进行治疗。|n|n|cffffcc00等级 1|r - <ANhs,DataF1> 阵迷雾，每阵迷雾能医治<ANhs,DataA1>点伤害。|n|cffffcc00等级 2|r - <ANhs,DataF2>阵迷雾，每阵迷雾能医治<ANhs,DataA2>点伤害。 |n|cffffcc00等级 3|r - <ANhs,DataF3>阵迷雾，每阵迷雾能医治<ANhs,DataA3>点伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANbr": {
        code: "ANbr",
        name: "战争咆哮",
        tip: "增加周围单位的攻击力。|n持续 <ANbr,Dur1>秒。|n|n|cffffcc00等级 1|r - <ANbr,DataA1>点攻击力。|n|cffffcc00等级 2|r - <ANbr,DataA2>点攻击力。|n|cffffcc00等级 3|r - <ANbr,DataA3>点攻击力。|n|cffffcc00等级 4|r - <ANbr,DataA4>点攻击力。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANsq": {
        code: "ANsq",
        name: "召唤豪猪",
        tip: "召唤一只愤怒的豪猪来为你作战。|n持续<ANsq,Dur1>秒。|n|n|cffffcc00等级 1|r - <nqb1,realHP>点生命值, <nqb1,mindmg1>到<nqb1,maxdmg1>点攻击力。|n|n|cffffcc00等级 2|r - <nqb2,realHP>点生命值，<nqb2,mindmg1>到 <nqb2,maxdmg1>点攻击力，有狂热技能。|n|n|cffffcc00等级 3|r - <nqb3,realHP>点生命值，<nqb3,mindmg1>到<nqb3,maxdmg1>点区域伤害，有狂热技能。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "Arsq": {
        code: "Arsq",
        name: "召唤豪猪(雷克萨)",
        tip: "召唤出一头愤怒的豪猪来为你战斗。|n持续<Arsq,Dur1>秒。|n|n|cffffcc00等级 1|r -<nqb1,realHP>点生命值，<nqb1,mindmg1>-<nqb1,maxdmg1>点攻击力。|n|cffffcc00等级 2|r -<nqb2,realHP>点生命值，<nqb2,mindmg1>-<nqb2,maxdmg1>点攻击力，具有狂热技能。|n|cffffcc00等级 3|r -<nqb3,realHP>点生命值，<nqb3,mindmg1>-<nqb3,maxdmg1>点攻击力，具有范围伤害效果。同时具有狂热技能。|n|cffffcc00等级 4|r -<nqb4,realHP>点生命值，<nqb4,mindmg1>-<nqb4,maxdmg1>点攻击力，具有范围伤害效果。同时具有狂热技能。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "Aslp": {
        code: "Aslp",
        name: "召唤巨虾",
        tip: "召唤<Aslp,DataA1>只马库拉巨虾去执行主人的意愿。|n持续<Aslp,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "Arsg": {
        code: "Arsg",
        name: "召唤米纱(雷克萨)",
        tip: "召唤出米纱，一头强大的野熊来为你战斗。|n|n|cffffcc00等级 1|r -<ngz1,realHP>点生命值，<ngz1,mindmg1>-<ngz1,maxdmg1>点攻击力。|n|cffffcc00等级 2|r -<ngz2,realHP>点生命值，<ngz2,mindmg1>-<ngz2,maxdmg1>点攻击力，具有重击技能。 |n|cffffcc00等级 3|r -<ngz3,realHP>点生命值，<ngz3,mindmg1>-<ngz3,maxdmg1>点攻击力，具有大锤技能。|n|cffffcc00等级 4|r -<ngz4,realHP>点生命值，<ngz4,mindmg1>-<ngz4,maxdmg1>点攻击力，具有大锤技能。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANsg": {
        code: "ANsg",
        name: "召唤熊",
        tip: "召唤一头威力强大的熊来攻击你的敌人。|n持续<ANsg,Dur1>秒。|n|n|cffffcc00等级 1|r - <ngz1,realHP>点生命值，<ngz1,mindmg1>到<ngz1,maxdmg1>点攻击力。|n|n|cffffcc00等级 2|r - <ngz2,realHP>点生命值，<ngz2,mindmg1>到<ngz2,maxdmg1>点攻击力，具有重击技能。|n|n|cffffcc00等级 3|r - <ngz3,realHP>点生命值，<ngz3,mindmg1>到<ngz3,maxdmg1>点攻击力，具有重击和闪烁的技能。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANlm": {
        code: "ANlm",
        name: "召唤炎魔",
        tip: "召唤出一个炎魔。在炎魔攻击的时候，它能吸收目标的生命，并将其转换成自己的能量，最终裂变成两个炎魔。|n持续<ANlm,Dur1> 秒。|n|n|cffffcc00等级 1|r - <nlv1,realHP> 生命值，<nlv1,mindmg1> - <nlv1,maxdmg1> 攻击力。|n|cffffcc00等级 2|r - <nlv2,realHP> 生命值，<nlv2,mindmg1> - <nlv2,maxdmg1> 攻击力。|n|cffffcc00等级 3|r - <nlv3,realHP> 生命值，<nlv3,mindmg1> - <nlv3,maxdmg1> 攻击力。|n|n|cffffcc00能攻击地面和空中单位。|r",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANsw": {
        code: "ANsw",
        name: "召唤战鹰",
        tip: "召唤一只骄傲的战鹰来侦察敌人|n持续<ANsw,Dur1>秒。|n|n|cffffcc00等级 1|r - <nwe1,realHP>点生命值，有真实视域技能。|n|cffffcc00等级 2|r - <nwe2,realHP>点生命值，<nwe2,mindmg1>到<nwe2,maxdmg1>点攻击力，有真实视域技能。|n|cffffcc00等级 3|r - <nwe3,realHP>点生命值，<nwe3,mindmg1>到<nwe3,maxdmg1>点攻击力，有真实视域技能并且隐形。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANr2": {
        code: "ANr2",
        name: "重生",
        tip: "当被杀时，该英雄自动会复活。重生有<ANr2,Cool1>秒的间隔时间。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANrn": {
        code: "ANrn",
        name: "重生(玛诺洛斯)",
        tip: "当被杀时，恶魔自动会复活。重生有<ANrn,Cool1>秒的施放/攻击间隔时间。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANdh": {
        code: "ANdh",
        name: "醉酒云雾",
        tip: "使敌方单位被酒精溅湿，造成其移动速度减慢，并使其攻击容易落空。当单位被施以醉酒云雾后再被火焰吐息积中，他们会被点燃并随着时间的流逝而受到伤害。|n持续<ANdh,Dur1>秒钟 |n|n|cffffcc00等级1|r - <ANdh,DataC1,%>%移动速度减缓，<ANdh,DataB1,%>%落空机率。|n|cffffcc00等级2|r - <ANdh,DataC2,%>%移动速度减缓，<ANdh,DataB2,%>%落空机率。|n|cffffcc00等级3|r - <ANdh,DataC3,%>%移动速度减缓，<ANdh,DataB3,%>%落空机率。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "Acdh": {
        code: "Acdh",
        name: "醉酒云雾(陈)",
        tip: "用酒精浸透目标单位，减慢其移送速度，并使其有一定的概率不能击中其他单位。带有醉酒云雾的单位遭到火焰呼吸攻击的话，那么就会自动引燃身上的酒精从而持续受到火焰的伤害。|n持续<Acdh,Dur1>秒。|n|n|cffffcc00等级 1|r - 减慢<Acdh,DataC1,%>%的移动速度，<Acdh,DataB1,%>%的概率不能击中其他单位。|n|cffffcc00等级 2|r - 减慢<Acdh,DataC2,%>%的移动速度，<Acdh,DataB2,%>%的概率不能击中其他单位。|n|cffffcc00等级 3|r - 减慢<Acdh,DataC3,%>%的移动速度，<Acdh,DataB3,%>%的概率不能击中其他单位。|n|cffffcc00等级 4|r - 减慢<Acdh,DataC4,%>%的移动速度，<Acdh,DataB4,%>%的概率不能击中其他单位。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANdb": {
        code: "ANdb",
        name: "醉拳",
        tip: "给予一定的概率来躲避来自敌人的攻击和<ANdb,DataA1>%的概率来施放额外的攻击伤害。|n|n|cffffcc00等级 1|r - <ANdb,DataD1,%>%的概率躲避攻击，施放<ANdb,DataB1>倍于普通伤害的攻击。|n|cffffcc00等级 2|r - <ANdb,DataD2,%>%的概率躲避攻击，施放<ANdb,DataB2>倍于普通伤害的攻击。|n|cffffcc00等级 3|r - <ANdb,DataD3,%>%的概率躲避攻击，施放<ANdb,DataB3>倍于普通伤害的攻击。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "Acdb": {
        code: "Acdb",
        name: "醉拳(陈)",
        tip: "给予一定的概率来躲避攻击和<Acdb,DataA1>%的概率来对敌人造成额外的伤害。|n|n|cffffcc00等级 1|r -<Acdb,DataD1,%>%的概率来躲避攻击，<Acdb,DataB1>倍于常规攻击的额外伤害。|n|cffffcc00等级 2|r -<Acdb,DataD2,%>%的概率来躲避攻击，<Acdb,DataB2>倍于常规攻击的额外伤害。|n|cffffcc00等级 3|r -<Acdb,DataD3,%>%的概率来躲避攻击，<Acdb,DataB3>倍于常规攻击的额外伤害。|n|cffffcc00等级 4|r -<Acdb,DataD4,%>%的概率来躲避攻击，<Acdb,DataB4>倍于常规攻击的额外伤害。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
    "ANwk": {
        code: "ANwk",
        name: "疾风步(中立敌对)",
        tip: "允许熊猫人隐形，移动速度快<ANwk,DataB1,%>%。如果熊猫人攻击某单位它就会显形，这次攻击将会增加<ANwk,DataC1> 。",
        kind: Kind.Ability,
        race: Race.NeutralHostile,
        type: Type.Hero
    },
};

const abilityNeutralPassive = {
    "ANpa": {
        code: "ANpa",
        name: "寄生虫",
        tip: "用一个致命的寄生虫折磨目标单位,使它每秒受到<ANpa,DataA1>的伤害，持续<ANpa,Dur1>秒。如果命中单位在寄生虫仍有效果的时候死亡，一个战士将会从尸体上诞生。",
        kind: Kind.Ability,
        race: Race.NeutralPassive,
        type: Type.Unit
    },
    "Aasl": {
        code: "Aasl",
        name: "减速光环(龙卷风)",
        tip: "被该光环影响的单位在获得光环效果时会受到0点伤害。多个减速光环的buff可以叠加",
        kind: Kind.Ability,
        race: Race.NeutralPassive,
        type: Type.Unit
    },
    "Atdg": {
        code: "Atdg",
        name: "建筑物破坏光环(龙卷风)",
        tip: "造成法术攻击，力量伤害(魔法伤害)",
        kind: Kind.Ability,
        race: Race.NeutralPassive,
        type: Type.Unit
    },
    "Acny": {
        code: "Acny",
        name: "飓风",
        tip: "将目标单位投掷到空中,使其不能移动，攻击和施放任何的魔法技能。而且其他单位也不能在这期间攻击它。|n持续<Acny,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralPassive,
        type: Type.Unit
    },
    "Atwa": {
        code: "Atwa",
        name: "龙卷风漫步者(龙卷风)",
        tip: "有这个技能的单位能比一般单位更加贴身地跟随目标。一旦离开影响区域就会死亡",
        kind: Kind.Ability,
        race: Race.NeutralPassive,
        type: Type.Unit
    },
    "Atsp": {
        code: "Atsp",
        name: "龙卷旋风(龙卷风)",
        tip: "该技能能吹起附近的单位",
        kind: Kind.Ability,
        race: Race.NeutralPassive,
        type: Type.Unit
    },
    "Andm": {
        code: "Andm",
        name: "驱逐魔法",
        tip: "能去除敌方单位身上那些有利的魔法效果和友军单位身上那些不利的魔法效果。|n|cffffcc00对召唤单位造成<Aadm,DataB1>点伤害。|r",
        kind: Kind.Ability,
        race: Race.NeutralPassive,
        type: Type.Unit
    },
    "ACfu": {
        code: "ACfu",
        name: "霜冻护甲(自动施放) (中立敌对)",
        tip: "霜冻护甲能增加目标单位<ACfu,DataB1>点的护甲防御，攻击该单位的近战型敌人也会在<ACfu,Dur1>秒内减速。|n持续<ACfu,DataA1>秒。",
        kind: Kind.Ability,
        race: Race.NeutralPassive,
        type: Type.Unit
    },
    "Ansk": {
        code: "Ansk",
        name: "硬化皮肤",
        tip: "减少所有对此单位的伤害<Ansk,DataC1>。伤害值不能低于<Ansk,DataB1>。",
        kind: Kind.Ability,
        race: Race.NeutralPassive,
        type: Type.Unit
    },
    "ANen": {
        code: "ANen",
        name: "诱捕",
        tip: "能将一个目标空中单位固定在地面上，使其在<Aens,Dur1>秒内不能移动。被诱捕的空中单位可以当作地面单位进行攻击。",
        kind: Kind.Ability,
        race: Race.NeutralPassive,
        type: Type.Unit
    },
    "Ahnl": {
        code: "Ahnl",
        name: "召唤仪式",
        tip: "从扭曲的地狱召唤能量。",
        kind: Kind.Ability,
        race: Race.NeutralPassive,
        type: Type.Unit
    },
};

const abilitySpecial = {
    "Sch5": {
        code: "Sch5",
        name: "保持原位(船)",
        tip: "吞噬货物使单位能够容纳别的单位，可以配合装载类技能和卸载类技能的使用。",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Unit
    },
    "Sch3": {
        code: "Sch3",
        name: "保持原位(地精飞艇)",
        tip: "吞噬货物使单位能够容纳别的单位，可以配合装载类技能和卸载类技能的使用。",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Unit
    },
    "ANha": {
        code: "ANha",
        name: "采集(Neutral)",
        tip: "从金矿处采集黄金资源，从树木上砍伐木材资源。",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Unit
    },
    "Ahar": {
        code: "Ahar",
        name: "采集(黄金和木材)",
        tip: "从金矿处采集黄金资源，从树木上砍伐木材资源。",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Unit
    },
    "Asud": {
        code: "Asud",
        name: "出售单位",
        tip: "能卖出你自己的单位。",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Unit
    },
    "Asid": {
        code: "Asid",
        name: "出售物品",
        tip: "能卖出你所拥有的物品。",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Unit
    },
    "Awrp": {
        code: "Awrp",
        name: "传送门技能",
        tip: "传送门技能始终无视敌我都可以使用。",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Unit
    },
    "Abdl": {
        code: "Abdl",
        name: "大型荒芜之地驱散",
        tip: "只在获得技能时进行一次地表改变",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Unit
    },
    "Aien": {
        code: "Aien",
        name: "单位物品栏(暗夜精灵族)",
        tip: "让该单位能为英雄携带物品。物品在处于该单位物品栏里的时候不能被使用。",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Unit
    },
    "Aiun": {
        code: "Aiun",
        name: "单位物品栏(不死族)",
        tip: "让该单位能为英雄携带物品。物品在处于该单位物品栏里的时候不能被使用。",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Unit
    },
    "Aihn": {
        code: "Aihn",
        name: "单位物品栏(人族)",
        tip: "让该单位能为英雄携带物品。物品在处于该单位物品栏里的时候不能被使用。",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Unit
    },
    "Aion": {
        code: "Aion",
        name: "单位物品栏(兽 族)",
        tip: "让该单位能为英雄携带物品。物品在处于该单位物品栏里的时候不能被使用。",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Unit
    },
    "Abdt": {
        code: "Abdt",
        name: "地洞探则(飞行单位，废弃的)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Unit
    },
    "Apio": {code: "Apio", name: "毒刺", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Unit},
    "Amnz": {
        code: "Amnz",
        name: "范围性攻击伤害(大矿)",
        tip: "造成法术攻击，普通伤害",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Unit
    },
    "Amnx": {
        code: "Amnx",
        name: "范围性攻击伤害(地精地雷)",
        tip: "造成法术攻击，普通伤害。",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Unit
    },
    "Adda": {
        code: "Adda",
        name: "范围性攻击伤害(工兵)",
        tip: "造成法术攻击，普通伤害",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Unit
    },
    "Apmf": {
        code: "Apmf",
        name: "凤凰火焰(行单位)",
        tip: "对周围敌方的飞行单位造成每秒<Apmf,DataA1>点的伤害。",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Unit
    },
    "Arng": {code: "Arng", name: "复仇", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Unit},
    "Arev": {code: "Arev", name: "复活英雄", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Unit},
    "Aatk": {code: "Aatk", name: "攻击", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Unit},
    "Aall": {
        code: "Aall",
        name: "共享商店，联盟建筑物。",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Unit
    },
    "ARal": {code: "ARal", name: "集结", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Unit},
    "AGbu": {code: "AGbu", name: "建造(娜迦)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Unit},
    "ANbu": {code: "ANbu", name: "建造(中立)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Unit},
    "Amin": {
        code: "Amin",
        name: "金矿-爆炸了(地精地雷)",
        tip: "该技能使得单位可以隐身，但是该单位即使是飞行单位也会有地面碰撞，且无论如何不能通过不可建造地面",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Unit
    },
    "Agld": {code: "Agld", name: "金矿能力", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Unit},
    "Aalr": {code: "Aalr", name: "警报", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Unit},
    "Afir": {code: "Afir", name: "开火", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Unit},
    "Aawa": {code: "Aawa", name: "立刻复活英雄", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Unit},
    "Adri": {
        code: "Adri",
        name: "立刻卸载(被缠绕的金矿)",
        tip: "卸载全部单位。",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Unit
    },
    "Apit": {
        code: "Apit",
        name: "商店购买物品",
        tip: "商店购买物品",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Unit
    },
    "Aagd": {code: "Aagd", name: "送回黄金", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Unit},
    "Argl": {code: "Argl", name: "送回黄金和木材", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Unit},
    "Arlm": {code: "Arlm", name: "送回木材", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Unit},
    "Avul": {code: "Avul", name: "无敌的(中立)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Unit},
    "AInv": {code: "AInv", name: "物品栏(英雄)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Unit},
    "Abds": {
        code: "Abds",
        name: "小型荒芜之地驱散",
        tip: "只在获得技能时进行一次地表改变",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Unit
    },
    "Adro": {
        code: "Adro",
        name: "卸载(地精飞艇) ",
        tip: "在指定区域卸载全部单位。",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Unit
    },
    "Sdro": {
        code: "Sdro",
        name: "卸载(海上运输船)",
        tip: "在指定区域卸载全部单位。",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Unit
    },
    "Ane2": {code: "Ane2", name: "选择单位", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Unit},
    "Aneu": {code: "Aneu", name: "选择英雄", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Unit},
    "Amov": {code: "Amov", name: "移动", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Unit},
    "AHer": {code: "AHer", name: "英雄", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Unit},
    "ANpi": {
        code: "ANpi",
        name: "永久的献祭(中立敌对1)",
        tip: "对周围的敌人每秒造成<ANpi,DataA1>点伤害。",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Unit
    },
    "Apig": {
        code: "Apig",
        name: "永久的献祭(中立敌对2)",
        tip: "烧伤附近的敌人，造成每秒<Apig,DataA1>点伤害。",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Unit
    },
    "Apiv": {code: "Apiv", name: "永久的隐形", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Unit},
    "Awan": {code: "Awan", name: "游荡者(中立)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Unit},
    "Achd": {
        code: "Achd",
        name: "运输船保持原位(中 立敌对)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Unit
    },
    "Adtg": {
        code: "Adtg",
        name: "真实视域(中立1)",
        tip: "显示周围的隐形单位。",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Unit
    },
    "ANtr": {
        code: "ANtr",
        name: "真实视域(中立2)",
        tip: "显示周围的隐形单位。",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Unit
    },
    "Slo3": {
        code: "Slo3",
        name: "装载(船只)",
        tip: "装载一个指定的友方地面单位。",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Unit
    },
    "Aloa": {
        code: "Aloa",
        name: "装载(地精飞艇)",
        tip: "装载一个指定的友方地面单位。",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Unit
    },

    "ANav": {
        code: "ANav",
        name: "天神下凡(中立的)",
        tip: "激活天神下凡之后给予加理瑟斯<ANav,DataA1>点额外的护甲，<ANav,DataB1>点额外的生命值，<AHav,DataC1>点额外的攻击力和魔法免疫技能。|n持续<ANav,Dur1>秒。",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Hero
    },
    "ANsh": {
        code: "ANsh",
        name: "震荡波",
        tip: "从英雄身上发射出一道威力巨大的能量波，从而对一直线上的敌人地面单位造成一定的伤害。|n|n|cffffcc00等级 1|r - <AOsh,DataA1>点伤害。|n|cffffcc00等级 2|r - <AOsh,DataA2>点伤害。|n|cffffcc00等级 3|r - <AOsh,DataA3>点伤害。",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Hero
    },
};

const abilityItem = {
    "AIaa": {
        code: "AIaa",
        name: "Item Fermanent Damage Gain",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "ANpr": {code: "ANpr", name: "保存权杖", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "ANsa": {code: "ANsa", name: "避难权杖", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AItb": {code: "AItb", name: "尘土之影", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AImt": {code: "AImt", name: "传送权杖", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "APrr": {code: "APrr", name: "大型复活神符", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIzb": {
        code: "AIzb",
        name: "带有水冻攻击伤害的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIpb": {
        code: "AIpb",
        name: "带有毒药效果的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIcb": {
        code: "AIcb",
        name: "带有腐蚀攻击效果的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIlp": {
        code: "AIlp",
        name: "带有净化效果的物品(1) (法球施放)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIpg": {
        code: "AIpg",
        name: "带有净化效果的物品(2)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIps": {
        code: "AIps",
        name: "带有净化效果的物品(3)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIob": {
        code: "AIob",
        name: "带有霜冻攻击效果的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIdc": {
        code: "AIdc",
        name: "带有锁链驱逐效果的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIwb": {
        code: "AIwb",
        name: "带有蛛网技能的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "Aste": {code: "Aste", name: "盜取", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIin": {code: "AIin", name: "地狱火(物品)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "Apo2": {code: "Apo2", name: "毒刺(毒液之球)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIdd": {code: "AIdd", name: "防御(物品)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIgf": {code: "AIgf", name: "防御浮雕", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIgu": {code: "AIgu", name: "防御浮雕", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIrd": {code: "AIrd", name: "复活死尸(物品)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIct": {code: "AIct", name: "改变一天的时间", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "APwt": {code: "APwt", name: "岗哨神符", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIsw": {code: "AIsw", name: "岗哨守卫(物品)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AInd": {
        code: "AInd",
        name: "鼓舞(特别战役物品)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AImo": {code: "AImo", name: "怪兽诱捕守卫", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AUds": {code: "AUds", name: "黑暗召唤", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "ANbs": {code: "ANbs", name: "黑暗之球", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIil": {code: "AIil", name: "幻象物品", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "Ablp": {code: "Ablp", name: "荒芜之地的置放", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIgx": {code: "AIgx", name: "恢复光环(物品)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIsl": {code: "AIsl", name: "恢复卷轴", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIba": {code: "AIba", name: "辉煌光环(物品)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AItp": {code: "AItp", name: "回城卷轴物品", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "Amec": {code: "Amec", name: "机械类的小玩艺", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIsa": {code: "AIsa", name: "加速卷轴", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIos": {code: "AIos", name: "减速(法球施放)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIsb": {code: "AIsb", name: "减速之球", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIbs": {code: "AIbs", name: "建造微型兵营", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIbr": {code: "AIbr", name: "建造微型伐木场", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIbh": {code: "AIbh", name: "建造微型国王祭坛", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIbf": {code: "AIbf", name: "建造微型农场", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIbb": {code: "AIbb", name: "建造微型铁匠铺", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIbl": {code: "AIbl", name: "建造小型的城堡", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIbg": {code: "AIbg", name: "建造小型的大厅", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIbt": {code: "AIbt", name: "建造小型的哨塔", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIgo": {code: "AIgo", name: "金箱子", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIft": {
        code: "AIft",
        name: "近战攻击带有冰冻伤害",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIfw": {
        code: "AIfw",
        name: "近战攻击带有火焰伤害",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIlx": {
        code: "AIlx",
        name: "近战攻击带有闪电伤害",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIpr": {code: "AIpr", name: "净化药水", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIxs": {
        code: "AIxs",
        name: "具有反魔法盾的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIrs": {
        code: "AIrs",
        name: "具有复活效果的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIrx": {
        code: "AIrx",
        name: "具有复活效果的物品(魔法施放间隔时间)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIdi": {
        code: "AIdi",
        name: "具有驱逐魔法效果的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIds": {
        code: "AIds",
        name: "(具有驱逐魔法效果的物品(有使用间隔)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIcf": {
        code: "AIcf",
        name: "具有献祭效果的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIh2": {
        code: "AIh2",
        name: "具有医疗效果的物品(较大的)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIh1": {
        code: "AIh1",
        name: "具有医疗效果的物品(较小的)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIhx": {
        code: "AIhx",
        name: "具有医疗效果的物品(最小的)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIrc": {
        code: "AIrc",
        name: "具有重生效果的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIcy": {code: "AIcy", name: "飓风(物品)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIcm": {code: "AIcm", name: "控制魔法(物品)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIxk": {code: "AIxk", name: "狂暴愤怒(物品)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "APdi": {code: "APdi", name: "力量上升驱散", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "APh2": {code: "APh2", name: "力量上升治疗区域", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "APh1": {
        code: "APh1",
        name: "力量上升治疗区域减小",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "APh3": {
        code: "APh3",
        name: "力量上升治疗区域增强",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "Aspp": {code: "Aspp", name: "灵魂锁链(地区)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIsz": {code: "AIsz", name: "慢性毒药(物品)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIcd": {code: "AIcd", name: "命令光环(物品)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIco": {code: "AIco", name: "命令物品", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "ANss": {code: "ANss", name: "魔法护盾(护身符)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "ANse": {code: "ANse", name: "魔法护盾(神符)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AImx": {code: "AImx", name: "魔法免疫(物品)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIsr": {code: "AIsr", name: "魔法伤害减少", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "Aspb": {code: "Aspb", name: "魔法书", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIlu": {code: "AIlu", name: "木材堆", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIae": {code: "AIae", name: "耐久光环(物品)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIan": {code: "AIan", name: "能操纵死尸的物品", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIdf": {
        code: "AIdf",
        name: "能带有黑箭攻击伤害的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIfb": {
        code: "AIfb",
        name: "能带有火焰伤害的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIgd": {
        code: "AIgd",
        name: "能带有火焰伤害的物品(古尔丹)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIlb": {
        code: "AIlb",
        name: "能带有闪电伤害的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIso": {
        code: "AIso",
        name: "能盗取单位灵魂的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIva": {
        code: "AIva",
        name: "能盗取生命值的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIdm": {
        code: "AIdm",
        name: "能对范围内的树木/墙壁造成伤害的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIem": {
        code: "AIem",
        name: "能获取经验值的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIe2": {
        code: "AIe2",
        name: "能获取经验值的物品(大型)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AId7": {
        code: "AId7",
        name: "能加强护甲的物品(+7)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIha": {
        code: "AIha",
        name: "能进行范围医疗的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIhb": {
        code: "AIhb",
        name: "能进行范围医疗的物品(大型)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIre": {
        code: "AIre",
        name: "能进行医疗和增加魔法值的单位",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIvu": {
        code: "AIvu",
        name: "能让单位暂时无敌的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIvl": {
        code: "AIvl",
        name: "能让单位暂时无敌的物品小型)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIv2": {
        code: "AIv2",
        name: "能让单位暂时隐身的物品(较大的)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIv1": {
        code: "AIv1",
        name: "能让单位暂时隐身的物品(较小的)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIta": {
        code: "AIta",
        name: "能探测一定区域的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIlm": {code: "AIlm", name: "能提高等级的物品", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIsx": {
        code: "AIsx",
        name: "能提高攻击速度的物品(加速手套)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AId1": {
        code: "AId1",
        name: "能提高护甲的物品(+1)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AId0": {
        code: "AId0",
        name: "(能提高护甲的物品(+10)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AId2": {
        code: "AId2",
        name: "能提高护甲的物品(+2)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AId3": {
        code: "AId3",
        name: "能提高护甲的物品(+3)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AId4": {
        code: "AId4",
        name: "能提高护甲的物品(+4)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AId5": {
        code: "AId5",
        name: "能提高护甲的物品(+5)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AId8": {
        code: "AId8",
        name: "能提高护甲的物品(+6)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIs2": {
        code: "AIs2",
        name: "能提高进攻速度的物品(较大的)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIsi": {
        code: "AIsi",
        name: "能提高视野范围的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AImr": {
        code: "AImr",
        name: "能提高一定范围内所有 单位魔法值的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIra": {
        code: "AIra",
        name: "能提高一定范围内所有 单位魔法值和生命值的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIms": {
        code: "AIms",
        name: "能提高移动速度的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIxm": {
        code: "AIxm",
        name: "能提高英雄三个属性的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIx3": {
        code: "AIx3",
        name: "能提高英雄属性的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIx4": {
        code: "AIx4",
        name: "能提高英雄属性的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIs1": {
        code: "AIs1",
        name: "能提高英雄属性的物品(+1 力量)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIa1": {
        code: "AIa1",
        name: "能提高英雄属性的物品(+1 敏捷度)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIx1": {
        code: "AIx1",
        name: "能提高英雄属性的物品(+1 所有属性)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIi1": {
        code: "AIi1",
        name: "能提高英雄属性的物品(+1 智力)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIaz": {
        code: "AIaz",
        name: "能提高英雄属性的物品(+10 敏捷度)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIx2": {
        code: "AIx2",
        name: "能提高英雄属性的物品(+2 所有属性)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIs3": {
        code: "AIs3",
        name: "能提高英雄属性的物品(+3 力量)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIa3": {
        code: "AIa3",
        name: "能提高英雄属性的物品(+3 敏捷度)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIi3": {
        code: "AIi3",
        name: "能提高英雄属性的物品(+3 智力)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIs4": {
        code: "AIs4",
        name: "能提高英雄属性的物品(+4 力量)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIa4": {
        code: "AIa4",
        name: "(能提高英雄属性的物品(+4 敏捷度)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIi4": {
        code: "AIi4",
        name: "能提高英雄属性的物品(+4 智力)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIx5": {
        code: "AIx5",
        name: "能提高英雄属性的物品(+5 所有属性)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIs6": {
        code: "AIs6",
        name: "能提高英雄属性的物品(+6 力里)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIa6": {
        code: "AIa6",
        name: "能提高英雄属性的物品(+6 力里)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIi6": {
        code: "AIi6",
        name: "能提高英雄属性的物品(+6 敏捷度)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIim": {code: "AIim", name: "能提高智力的物品", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AItm": {
        code: "AItm",
        name: "能提高智力的物品(+2)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIrv": {
        code: "AIrv",
        name: "能显示整个地图的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AImh": {
        code: "AImh",
        name: "能永久增加生命值的物品(+50)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIpx": {
        code: "AIpx",
        name: "能永久增加生命值的物品(较小的)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIsp": {
        code: "AIsp",
        name: "能暂时加快移动速度的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIdb": {
        code: "AIdb",
        name: "能暂时加强范围内所有单位护甲的物品(具有生命与魔法恢复技能)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIda": {
        code: "AIda",
        name: "能暂时提高一定范围内所有单位护甲的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIsm": {code: "AIsm", name: "能增加力量的物品", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AInm": {
        code: "AInm",
        name: "能增加力量的物品(+2)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIam": {
        code: "AIam",
        name: "能增加敏捷度的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIgm": {
        code: "AIgm",
        name: "能增加敏捷度的物品(+2)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIrm": {
        code: "AIrm",
        name: "能增加魔法恢复速度的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIm2": {
        code: "AIm2",
        name: "能增加魔法恢复速度的物品(较大的)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIm1": {
        code: "AIm1",
        name: "能增加魔法恢复速 度的物品(较小的)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIrn": {
        code: "AIrn",
        name: "能增加魔法恢复速度的物品(较小的)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIbm": {
        code: "AIbm",
        name: "能增加魔法值的物品(较大的)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AImb": {
        code: "AImb",
        name: "能增加魔法值的物品(最小的)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AImz": {
        code: "AImz",
        name: "能增加魔法值的物品(100)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AI2m": {
        code: "AI2m",
        name: "能增加魔法值的物品(200)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AImv": {
        code: "AImv",
        name: "能增加魔法值的物品(75)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIl2": {
        code: "AIl2",
        name: "能增加生命值的物品(较大的)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIl1": {
        code: "AIl1",
        name: "(能增加生命值的物品(较小的)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIlz": {
        code: "AIlz",
        name: "能增加生命值的物品(最小的)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIlf": {
        code: "AIlf",
        name: "能增加生命值的物品(最小的)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "Asou": {
        code: "Asou",
        name: "能占据单位灵魂的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIir": {
        code: "AIir",
        name: "能召唤水冻幽灵的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIfh": {
        code: "AIfh",
        name: "能召唤地狱犬的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIfd": {code: "AIfd", name: "能召唤红龙的物品", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIfu": {
        code: "AIfu",
        name: "能召唤毁灭守卫的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIfs": {
        code: "AIfs",
        name: "能召唤骷髅战士的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIff": {code: "AIff", name: "能召唤熊怪的物品", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIuw": {
        code: "AIuw",
        name: "能召唤熊怪战士的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIfr": {
        code: "AIfr",
        name: "能召唤岩石傀儡的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIpm": {
        code: "AIpm",
        name: "能置放地精地雷的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIrr": {code: "AIrr", name: "咆哮(物品)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIp1": {code: "AIp1", name: "普通物品-回复效果", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIp2": {
        code: "AIp2",
        name: "普通物品-回复效果(II)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIp3": {
        code: "AIp3",
        name: "普通物品-回复效果(III)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIp4": {
        code: "AIp4",
        name: "普通物品-回复效果(IV)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIp5": {
        code: "AIp5",
        name: "普通物品-回复效果(V)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIp6": {
        code: "AIp6",
        name: "普通物品回复效果(VI)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIpz": {code: "AIpz", name: "企鹅怪兽", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIar": {code: "AIar", name: "强击光环(物品)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIfl": {code: "AIfl", name: "抢夺旗帜", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIfn": {
        code: "AIfn",
        name: "抢夺旗帜(暗夜精灵族)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIfe": {code: "AIfe", name: "抢夺旗帜(不死族)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIfm": {code: "AIfm", name: "抢夺旗帜(人族)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIfo": {code: "AIfo", name: "抢夺旗帜(兽族)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIev": {code: "AIev", name: "闪避(物品)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIls": {code: "AIls", name: "闪电护盾(物品)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIcl": {code: "AIcl", name: "闪电链(物品)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIll": {code: "AIll", name: "闪电之球(新的)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIbk": {code: "AIbk", name: "闪烁(物品等级)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "APmr": {code: "APmr", name: "神秘区域魔法恢复", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "APmg": {
        code: "APmg",
        name: "神秘区域魔法恢复增强",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "APra": {
        code: "APra",
        name: "神秘区域生命/魔法恢复",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIhl": {code: "AIhl", name: "神圣之光(物品)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIwm": {code: "AIwm", name: "水奴(物品)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIdp": {code: "AIdp", name: "死亡契约(物品)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIfz": {code: "AIfz", name: "死亡之指(物品)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "APsa": {code: "APsa", name: "速度神符", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIri": {code: "AIri", name: "随机物品", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "Arel": {
        code: "Arel",
        name: "提高英雄生命值恢夏速度的物品",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "Arll": {
        code: "Arll",
        name: "提高英雄生命值恢复速度的物品(较小的)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIfg": {code: "AIfg", name: "乌云技能", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIse": {code: "AIse", name: "物品沉默", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIdv": {code: "AIdv", name: "物品神圣护甲", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIfx": {code: "AIfx", name: "物品兽族战斗标准", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIav": {code: "AIav", name: "吸血光环(物品)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "APpv": {code: "APpv", name: "吸血药水", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIpl": {code: "AIpl", name: "小净化药水", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "APrl": {code: "APrl", name: "小型复活神符", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIau": {code: "AIau", name: "邪恶光环(物品)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIuf": {code: "AIuf", name: "邪恶狂热(物品)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIfa": {code: "AIfa", name: "信号枪", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIuv": {code: "AIuv", name: "夜视能力(物品)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIrl": {code: "AIrl", name: "医疗剂", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "Ashs": {code: "Ashs", name: "影子权杖", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIdn": {code: "AIdn", name: "影子之球 技能", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "Aret": {code: "Aret", name: "再训练之书", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AItg": {
        code: "AItg",
        name: "增加攻击力的物品 (+1)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AItn": {
        code: "AItn",
        name: "增加攻击力的物品 (+10)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AItc": {
        code: "AItc",
        name: "增加攻击力的物品 (+12)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AItf": {
        code: "AItf",
        name: "增加攻击力的物品 (+15)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIth": {
        code: "AIth",
        name: "增加攻击力的物品 (+2)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AItx": {
        code: "AItx",
        name: "增加攻击力的物品 (+20)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIat": {
        code: "AIat",
        name: "增加攻击力的物品 (+3)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIti": {
        code: "AIti",
        name: "增加攻击力的物品 (+4)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AItj": {
        code: "AItj",
        name: "增加攻击力的物品 (+5)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIt6": {
        code: "AIt6",
        name: "增加攻击力的物品 (+6)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AItk": {
        code: "AItk",
        name: "增加攻击力的物品 (+7)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AItl": {
        code: "AItl",
        name: "增加攻击力的物品 (+8)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIt9": {
        code: "AIt9",
        name: "增加攻击力的物品 (+9)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIsh": {
        code: "AIsh",
        name: "召唤巨魔猎头者 (物品)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
    "AIrt": {code: "AIrt", name: "召唤物品", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIhw": {code: "AIhw", name: "治疗守卫 (物品)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIcs": {code: "AIcs", name: "致命一击(物品)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIbx": {code: "AIbx", name: "重击(物品)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIrb": {code: "AIrb", name: "重生", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIad": {code: "AIad", name: "专注光环(物品)", tip: "", kind: Kind.Ability, race: Race.Special, type: Type.Item},
    "AIh3": {
        code: "AIh3",
        name: "最小的医疗能力(增加魔法施放间隔时间)",
        tip: "",
        kind: Kind.Ability,
        race: Race.Special,
        type: Type.Item
    },
};

const item = {
    // 永久
    "afac": {
        code: "",
        name: "阿利亚之笛",
        tip: "增加附近远程攻击型单位 <AIar,DataA1,%>%的攻击力。|n不能和强击光环同时使用。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "ssil": {
        code: "",
        name: "沉默权杖",
        tip: "阻止一定区域内所有敌人施放魔法。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "stel": {
        code: "",
        name: "传送权杖",
        tip: "将英雄传送到目标地面单位或者建筑物。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "ciri": {
        code: "",
        name: "法师长袍+6",
        tip: "增加英雄6点的智力。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "lhst": {
        code: "",
        name: "风暴狮角",
        tip: "使得英雄和周围的单位增加<AIad,DataA1>点的护甲。|n不能和专注光环同时使用。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "ratc": {
        code: "",
        name: "攻击之爪+12",
        tip: "增加英雄12点的攻击力。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rat6": {
        code: "",
        name: "攻击之爪+6",
        tip: "能增加英雄6点的攻击力。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rat9": {
        code: "",
        name: "攻击之爪+9",
        tip: "增加英雄9点的攻击力。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "ajen": {
        code: "",
        name: "估之忍耐姜歌",
        tip: "增加英雄和附近单位的攻击速度和移动速度。|n不能和耐久光环同时使用。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "cnob": {
        code: "",
        name: "贵族圆环",
        tip: "增加英雄2点的智力，敏捷度和力量。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "odef": {
        code: "",
        name: "黑暗之球",
        tip: "增加英雄<AIdf,DataA1>点的攻击力。英雄的攻击也会在攻击空中单位的时候具有远程能力，而且如果一下子就杀死敌方某个单位的话，那么还会出现一个为你作战的黑暗之奴。黑暗之奴持续<ANbs,DataC1>秒。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rlif": {
        code: "",
        name: "恢复指环",
        tip: "提高英雄每秒 <Arel,DataA1> 点的生命值恢复速度。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "lgdh": {
        code: "",
        name: "毁灭之角",
        tip: "增加英雄和附近单位的生命值恢复速度和移动速度。|n不能和邪恶光环同时使用。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "clfm": {
        code: "",
        name: "火焰风衣",
        tip: "使得英雄处于火焰的包围之中，每秒对周围的地面单位造成  <AIcf,DataA1> 点的伤害。|n不能和献祭一起使用。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "gcel": {
        code: "",
        name: "加速手套",
        tip: "增加英雄<AIsx,DataA1,%>%的攻击速度。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "bgst": {
        code: "",
        name: "巨人力量腰带+6",
        tip: "能增加英雄6点的力量。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rhth": {
        code: "",
        name: "卡嘉医疗宝石",
        tip: "增加<AIl2,DataA1>点的生命值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "kpin": {
        code: "",
        name: "卡嘉长萧",
        tip: "使得英雄和周围单位的魔法值恢复速度加快 。|n不能和辉煌光环同时使用。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "belv": {
        code: "",
        name: "奎尔萨拉斯之靴+6",
        tip: "能增加英雄6点的敏捷度。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "bcun": {
        code: "",
        name: "灵巧头巾",
        tip: "增加英雄4点的敏捷度和智力。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rag1": {
        code: "",
        name: "敏捷便鞋+3",
        tip: "增加英雄3点的敏捷度。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "pmna": {
        code: "",
        name: "魔法垂饰",
        tip: "增加<AIbm,DataA1>点的魔法最大值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "spsh": {
        code: "",
        name: "魔法护盾护身符",
        tip: "每隔<ANss,Cool1>秒就阻止敌人向自己的英雄施放魔法。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "penr": {
        code: "",
        name: "能里垂饰",
        tip: "增加英雄<AImb,DataA1>点的魔法最大值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "evtl": {
        code: "",
        name: "闪避护符",
        tip: "能让英雄有<AIev,DataA1,%>% 的概率躲避掉敌人的攻击。|n不能和闪避以及醉拳技能一起使用。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "brac": {
        code: "",
        name: "神秘腰带",
        tip: "减少<AIsr,DataB1,%>%英雄受到的魔法伤害。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "prvt": {
        code: "",
        name: "生命护身符",
        tip: "增加英雄<AIlf,DataA1>点的生命值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rst1": {
        code: "",
        name: "食人鬼手套+3",
        tip: "增加英雄3点的力量。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rde1": {
        code: "",
        name: "守护指环+2",
        tip: "增加英雄2点的护甲。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rde2": {
        code: "",
        name: "守护指环+3",
        tip: "增加英雄3点的护甲。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rde3": {
        code: "",
        name: "守护指环+4",
        tip: "增加英雄4点的护甲。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "crys": {
        code: "",
        name: "水晶球",
        tip: "驱散一定区域内的战争迷雾，也能看到隐形单位。|n持续<AIta,Dur1>秒。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "bspd": {
        code: "",
        name: "速度之靴",
        tip: "能增加英雄的移动速度。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "sbch": {
        code: "",
        name: "天灾骨钟",
        tip: "使得近战型英雄和附近的近战型单位能将他们自己<AIav,DataA1,%>%的攻击力转换成生命值。|n不能和吸血光环同时使用。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rwiz": {
        code: "",
        name: "艺人面罩",
        tip: "提高英雄 <AIrm,DataA1,%>% 的魔法值恢复速度。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "hval": {
        code: "",
        name: "英勇面具",
        tip: "增加英雄4点的力量和敏捷度。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "clsd": {
        code: "",
        name: "影子风衣",
        tip: "能在夜间让英雄隐形， 但是当英雄移动，攻击或者使用某种技能的话，隐形效果就会消失。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "mcou": {
        code: "",
        name: "勇气勋章",
        tip: "增加英雄4点力量和智力。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "ward": {
        code: "",
        name: "战歌之鼓",
        tip: "能增加周围单位 <AIcd,DataA1,%>%的攻击力。|n不能和命令光环同时使用。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "dsum": {
        code: "",
        name: "召唤钻石",
        tip: "使用后传送目标区域内<AUds,DataA1>个玩家的单位到英雄所在的位置。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rinl": {
        code: "",
        name: "智力斗篷+3",
        tip: "增加英雄3点的智力。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    // 可充
    "shar": {
        code: "",
        name: "水冻碎片",
        tip: "召唤出一个冰冻幽灵。冰冻幽灵持续<AIir,Dur1>秒。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "sand": {
        code: "",
        name: "操作死尸卷轴",
        tip: "复活周围<AIan,DataA1>个单位来为你战斗。持续时间为<AIan,Dur1>秒。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "pgma": {
        code: "",
        name: "大魔法药水",
        tip: "恢复<AIm2,DataA1>点的魔法值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "pghe": {
        code: "",
        name: "大生命药水",
        tip: "能恢复<AIh2,DataA1> 点的生命值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "fgdg": {
        code: "",
        name: "恶魔雕像",
        tip: "召唤出一毁灭守卫来为你战斗。|n持续<AIfu,Dur1>秒。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "infs": {
        code: "",
        name: "恶魔岩石",
        tip: "召唤一个地狱火从天而降，造成<AIin,DataA1>点的伤害，并让敌方地面单位在<AIin,Dur1>秒内处于昏晕状态。地狱火持续<AIin,DataB1>秒。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "srrc": {
        code: "",
        name: "复活卷轴",
        tip: "能复活你<AIrs,DataA1>个死去的单位。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "wswd": {
        code: "",
        name: "岗哨守卫",
        tip: "在<AIsw,Dur1>秒内放置一个哨兵守卫来监视一定的区域。|n一共可以使用<wswd,uses>次。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "fgrd": {
        code: "",
        name: "红龙之卵",
        tip: "召唤强大的红龙来为你战斗。|n持续<AIfd,Dur1>秒。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "will": {
        code: "",
        name: "幻象权杖",
        tip: "能制造目标单位的一个幻象。幻象不具备任何的攻击力，遭受敌人进攻的伤害值也会翻成原有的<AIil,DataB1> 倍。在<AIil,Dur1>秒之后或者生命值达到零之后幻象会自动消失。|n一共可以使用<will,uses> 次。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "sres": {
        code: "",
        name: "恢复卷轴",
        tip: "能恢复英雄周围非机械单位<AIra,DataA1>点的生命值和<AIra,DataB1>点的魔法值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "pres": {
        code: "",
        name: "恢复药水",
        tip: "能恢复<AIre,DataA1>点生命值和<AIre,DataB1>点的魔法值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rej3": {
        code: "",
        name: "恢复药水",
        tip: "|cff87ceeb非战斗类一次性物品|r|n在<AIp3,Dur1>秒内恢复英雄<AIp3,DataA1>点的生命值和<AIp3,DataB1>点的魔法值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "wcyc": {
        code: "",
        name: "飓风权杖",
        tip: "允许英雄施放飓风。飓风将目标单位投掷到空中，使其不能移动，攻击和施放任何的魔法技能。而且其他单位也不能在这期间攻击它。|n持续<Alcy,Dur1>秒。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "woms": {
        code: "",
        name: "魔法盗取权杖",
        tip: "盗取目标单位身上的魔法值。|n一共可以使用<woms,uses>次。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "mnst": {
        code: "",
        name: "魔法石",
        tip: "加快英雄<AIrn,DataA1,%>%的魔法恢复速度。也可以一次使用掉来增加<AIm2,DataA1>点的魔法。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "pomn": {
        code: "",
        name: "全知药水",
        tip: "使用后显示整个地图<Alrv,Dur1>秒。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "wlsd": {
        code: "",
        name: "闪电护盾权杖",
        tip: "使得英雄能在某个单位身上施放闪电护盾魔法，围绕在该单位身上的护盾能对周围的单位造成每秒<AIls,DataA1>的伤害。|n一共可以使用<wlsd,uses>次。|n持续<AIls,Dur1>秒。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "pdiv": {
        code: "",
        name: "神圣药水",
        tip: "在<AIdv,Dur1>秒内让英雄变为无敌。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "fgsk": {
        code: "",
        name: "死亡之书",
        tip: "召唤出 <AIfs,DataA1>个骷髅战士和<AIfs,DataB1>个骷髅弓箭手。|n持续<AIfs,Dur1>秒。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "pnvu": {
        code: "",
        name: "无敌药水",
        tip: "在<AIvu,Dur1>秒内使得英雄无敌。任何魔法都不能攻击一个处于无敌状态的英雄。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "fgrg": {
        code: "",
        name: "岩石印记",
        tip: "召唤岩石傀儡来为你战斗。|n持续<AIfr,Dur1>秒。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "sror": {
        code: "",
        name: "野兽卷轴",
        tip: "在<AIrr,Dur1>秒内提高附近友军单位<AIrr,DataA1,%>%的攻击力。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "totw": {
        code: "",
        name: "野性护符",
        tip: "这块神秘的石头能召唤出一两栖鱼人来为你战斗。|n一共可以召唤<totw,uses>次。|n持续<AIff,Dur1>秒。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "wild": {
        code: "",
        name: "野性护身符",
        tip: "召唤出一个熊怪战士。熊怪持续<AIuw,Dur1>秒。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "hlst": {
        code: "",
        name: "医疗石",
        tip: "提高英雄每秒<Arll,DataA1>点的生命值恢复速度。也能一次性地使用掉从而增加<AIh2,DataA1>点的生命值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "wshs": {
        code: "",
        name: "影子权杖",
        tip: "能让玩家拥有敌方目标单位的视野直到该单位身上的魔法被驱逐。|n可使用<wshs,uses>次。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "fgfh": {
        code: "",
        name: "长钉衣领",
        tip: "召唤一名邪恶漫步者为你作战。|n持续<AIfh,Dur1>秒。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "whwd": {
        code: "",
        name: "治疗守卫",
        tip: "放置一个守卫来治疗周围的单位持续时间为 <Ahwd,Dur1>秒。|n一共可以使用<whwd,uses>次。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "ankh": {
        code: "",
        name: "重生十字章",
        tip: "在英雄死后自动让其复活，并让其拥有<AIrc,DataB1>点的生命值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    // 力量提升
    "rre2": {
        code: "",
        name: "大型复活神符",
        tip: "恢复你附近死亡的单位<APrl,DataA1>点生命值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rma2": {
        code: "",
        name: "大型魔法神符",
        tip: "给附近所有友军单位恢复<APmg,DataA1>点魔法值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rhe3": {
        code: "",
        name: "大型治疗神符",
        tip: "给附近所有非机械友军单位治疗<APh3,DataA1>点生命值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "gfor": {
        code: "",
        name: "防御浮雕",
        tip: "增强你的建筑物的装甲和耐久度。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rwat": {
        code: "",
        name: "岗哨神符",
        tip: "在激活后建立一个无敌的岗哨守卫。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rsps": {
        code: "",
        name: "护盾神符",
        tip: "给附近友军单位一个魔法护盾，能够抵御下一次敌人施在他们身上的负面魔法。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rres": {
        code: "",
        name: "恢复神符",
        tip: "恢复英雄周围区域内非机械单位 <APra,DataA1> 点生命值和<APra,DataB1> 魔法值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "gold": {
        code: "",
        name: "金币",
        tip: "给予玩家<AIgo,DataA1>个单位的黄金。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "texp": {
        code: "",
        name: "经验之书",
        tip: "给予英雄 <AIem,DataA1>点的经验值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "tstr": {
        code: "",
        name: "力量之书",
        tip: "能永久性地提高英雄<AIsm,DataC1>点的力量。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "tst2": {code: "", name: "力量之书+2", tip: "增加2点的力量。", kind: Kind.Item, race: Race.Special, type: Type.Item},
    "rspl": {
        code: "",
        name: "灵魂锁链神符",
        tip: "将几个单位的灵魂联系在一起，使得<Aspp,DataA1,%>%某个单位受到的伤害被分配到其他灵魂连在一起的单位身上。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "tdex": {
        code: "",
        name: "敏捷之书",
        tip: "永久性地提高英雄<AIam,DataA1>点的敏捷度。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "tdx2": {
        code: "",
        name: "敏捷之书+2",
        tip: "能永久地增加英雄2点的敏捷度。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rman": {
        code: "",
        name: "魔法神符",
        tip: "周围的友军单位恢复<Apmr,DataA1>点魔法值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "lmbr": {
        code: "",
        name: "木材堆",
        tip: "给予玩家<AIlu,DataA1>个单位的木材。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rdis": {
        code: "",
        name: "驱魔神符",
        tip: "驱散所有附近的魔法效果。|n|cffffcc00给召唤单位造成<APdi,DataB1>的伤害。|r",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "gomn": {
        code: "",
        name: "全知浮雕",
        tip: "使用后显示整个地图<Alrv,Dur1>秒。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "manh": {
        code: "",
        name: "生命手册",
        tip: "增加英雄<AImh,DataA1>点的生命值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rspd": {
        code: "",
        name: "速度神符",
        tip: "增加附近所有联盟单位移动速度到最大移动速度。|n持续 <APsa,Dur1>秒。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rre1": {
        code: "",
        name: "小型复活神符",
        tip: "恢复你附近死亡的单位<APrl,DataA1>点生命值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rhe1": {
        code: "",
        name: "小型治疗神符",
        tip: "治疗所有附近友方非机械单位<APh1,DataA1>点生命值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "guvi": {
        code: "",
        name: "夜视浮雕",
        tip: "给予你所有的单位有和白天视野等同的夜间视力。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "tpow": {
        code: "",
        name: "知识之书",
        tip: "增加英雄1点的智力，敏捷度和力量。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rhe2": {
        code: "",
        name: "治疗神符",
        tip: "治疗所有附近友方非机械单位<APh2,DataA2>点生命值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "tint": {
        code: "",
        name: "智力之书",
        tip: "能永久地增加英雄<AIim,DataB1>点的智力。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "tin2": {
        code: "",
        name: "智力之书+2",
        tip: "能永久地增加英雄2点的智力。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rreb": {
        code: "",
        name: "重生神符",
        tip: "把拥有这个神符的怪物置于控制之下。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    // 人造
    "ralf": {
        code: "",
        name: "攻击之爪+15",
        tip: "增加英雄15点的攻击力。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "ckng": {
        code: "",
        name: "国王之冠+5",
        tip: "能增加英雄5点的力量，智力和敏捷度。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "desc": {
        code: "",
        name: "科勒恩的逃脱匕首",
        tip: "允许英雄传送一小段距离。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "khno": {
        code: "",
        name: "能里之书",
        tip: "能提高英雄<AIlm,DataA1>个等级。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rde4": {
        code: "",
        name: "守护指环+5",
        tip: "能增加英雄5点的护甲",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "ofro": {
        code: "",
        name: "霜冻之球",
        tip: "能让英雄的攻击带有<AIob,DataA1>点的冷冻伤害。而且这种攻击在攻击空中单位的时候会变成远程攻击，还能在<AIob,Dur1>秒内减慢敌人的进攻和移动速度。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "modt": {
        code: "",
        name: "死亡面罩",
        tip: "能使英雄的攻击将<AIva,DataA1,%>%对敌人造成的伤害转换成自己的生命值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    // 可购买
    "ssan": {
        code: "",
        name: "避难权杖",
        tip: "T将目标单位传送到你最高等级的主基地,让其处于昏晕状态并以每秒<ANsa,DataE1>点的速度来恢复其生命值直到该单位补满生命值为止。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "wneg": {
        code: "",
        name: "否决权杖",
        tip: "能驱散一定范围内所有的魔法效果。|n可使用<wneg,uses>次。|n|cffffcc00对召唤出来的单位能造成 <AIdi,DataB1>点的伤害。|r",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "sneg": {
        code: "",
        name: "否决权杖",
        tip: "能驱散一定范围内所有的魔法效果。|n|cffffcc00对召唤出来的单位能造成<AIdi,DataB1>点的伤害。|r",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "sreg": {
        code: "",
        name: "恢复卷轴",
        tip: "|cff87ceeb非战斗类一次性物品|r|n在<AIsl,Dur1>秒内恢复英雄周围所有非机械单位<AIsl,DataA1>点的生命值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "stwp": {
        code: "",
        name: "回城卷轴",
        tip: "将英雄和英雄周围的单位传送到指定的一个己方或者友军城镇。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "mcri": {
        code: "",
        name: "机械类的小玩艺",
        tip: "能召唤出一个玩家所能控制的小玩艺来进行侦察。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "pnvl": {
        code: "",
        name: "较小的无敌药水",
        tip: "在<AIvl,Dur1>秒内使得英雄无敌。任何魔法都不能攻击一个处于无敌状态的英雄。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "pcrl": {
        code: "",
        name: "净化药水",
        tip: "|cff87ceeb非战斗类一次性物品|r|n在<AIpr,Dur1>秒内恢复英雄<AIpr,DataB1>点的魔法值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "sman": {
        code: "",
        name: "魔法卷轴",
        tip: "能恢复英雄周围单位 <AImr,DataA1>点的魔法值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "pman": {
        code: "",
        name: "魔法药水",
        tip: "恢复<AIm1,DataA1>点的魔法值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "phea": {
        code: "",
        name: "生命药水",
        tip: "恢复<AIh1,DataA1>点的生命值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "spro": {
        code: "",
        name: "守护卷轴",
        tip: "在<AIda,Dur1>秒内提高英雄周围单位<AIda,DataA1>点的护甲。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "shas": {
        code: "",
        name: "速度卷轴",
        tip: "让英雄和周围的单位拥有最快的移动速度。|n持续<AIsa,Dur1>秒。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rnec": {
        code: "",
        name: "巫术妖棍",
        tip: "从一具死尸中召唤出两个骷髅战士。|n可使用<rnec,uses>次。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "vamp": {
        code: "",
        name: "吸血药水",
        tip: "增加英雄<AIpv,DataA1>点的攻击力，且让英雄在攻击的同时能增加自己的生命值。|n持续<AIpv,dur1>秒。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "skul": {
        code: "",
        name: "献祭头骨",
        tip: "在指定的区域创造出一片荒芜之地来。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "tscl": {
        code: "",
        name: "象牙塔",
        tip: "能在指定的区域内创建出一座哨塔来。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "tcas": {
        code: "",
        name: "小城堡",
        tip: "能在目标区域内创建出一座城堡来。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "plcl": {
        code: "",
        name: "小净化药水",
        tip: "|cff87ceeb非战斗类一次性物品|r|n在<AIpl,Dur1>秒内恢复英雄<AIpl,DataB1>点的魔法值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "tgrh": {
        code: "",
        name: "小型的大厅",
        tip: "在目标区域创建出一座大厅。对于人族， 暗夜精灵族和不死族来讲则分别会创建出城镇大厅，生命之树和大墓地。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "hslv": {
        code: "",
        name: "医疗剂",
        tip: "|cff87ceeb非战斗类消耗型物品|r|n使用后在<AIrl,Dur1>秒内恢复目标单位的生命值<AIrl,DataA1>点。|n可使用<hslv,uses>次。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "shea": {
        code: "",
        name: "医疗卷轴",
        tip: "能恢复英雄周围非机械单位<AIha,DataA1>点的生命值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "pinv": {
        code: "",
        name: "隐形药水",
        tip: "|cff87ceeb非战斗类一次性物品|r|n在<AIv1,Dur1>秒内使得英雄处于隐形状态，但是当英雄攻击或者使用某项技能和魔法的时候，隐形效果就会消失。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "moon": {
        code: "",
        name: "月亮石",
        tip: "制造日蚀，阻挡阳光，以创造人造夜晚。|n持续<AIct,Dur1>秒。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "tret": {
        code: "",
        name: "再训练之书",
        tip: "取消英雄所学的所有魔法，让英雄能重新选择技能。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "silk": {
        code: "",
        name: "蜘蛛丝饰针",
        tip: "将敌人的空中单位捕获到地面，被捕获到地面的空中单位能被地面单位攻击。|n可使用<silk,uses>次。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "wneu": {
        code: "",
        name: "中和权杖",
        tip: "投掷出一道魔法能量波，在不同的单位间跳跃<AIdc,DataC1>次从而驱散各类的魔法效果。|n可使用<wneu,uses>次。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    // 战役
    "azhr": {
        code: "",
        name: "埃苏尼之心",
        tip: "传说被囚禁的埃苏尼灵魂一直在寻找着她的这颗心。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "gmfr": {code: "", name: "宝石碎片", tip: "戒指宝石的碎片", kind: Kind.Item, race: Race.Special, type: Type.Item},
    "jpnt": {
        code: "",
        name: "给吉安娜·普罗德摩尔的便条",
        tip: "萨尔给吉安娜-普罗德摩尔的便条。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "glsk": {
        code: "",
        name: "古尔丹之颅",
        tip: "古尔丹曾是一个恶魔魔法的使用者，不幸的是召唤出来的恶魔反而杀害了他。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "skrt": {
        code: "",
        name: "骸骨宝物",
        tip: "这件古老的人工制品能够诱陷那些死于暴力的不死族，迫使他们为了永恒的生命重新体验生命的最后瞬间。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "wolg": {
        code: "",
        name: "怀特的另一条腿",
        tip: "也许过分热心的冒险者在他的旅途结束之前窥视到了这个，以为它能给予他在屠杀中的最后机会。但他并不知道这能将他领向何处。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "wtlg": {
        code: "",
        name: "怀特之腿",
        tip: "是否这个打开的空间门释放我们在暗黑破坏神世界的亲爱的朋友们？如果是这样, 那是个玩家,还是个恶魔？燃烧军团到底征服了多少个世界？是否燃烧军团的恶魔们和那些避难所中的是同一类呢？思维已经混乱。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "ledg": {
        code: "",
        name: "吉拉德的帐本",
        tip: "里面似乎充满着无聊的数字和事实记载。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "gopr": {
        code: "",
        name: "净化浮雕",
        tip: "由古代的德鲁伊所造，有着无穷的医疗力量。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "bzbe": {
        code: "",
        name: "空瓶",
        tip: "能盛放生命之泉泉水的一个魔法容器。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "dthb": {
        code: "",
        name: "雷电花芯",
        tip: "一种奇异的植物，以其不稳定性和危险性而著称。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "dphe": {
        code: "",
        name: "雷霆凤凰蛋",
        tip: "一个稀有的雷电之鹰蛋。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "dkfw": {
        code: "",
        name: "雷霆水桶",
        tip: "一个小桶，里面装着卡兹莫丹大陆上最烈性的酒。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "thle": {
        code: "",
        name: "雷霆蜥蜴之蛋",
        tip: "这只巨大的蛋如果没有母体的温度是不会孵化的。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "phlt": {code: "", name: "李维特", tip: "神秘的物品。", kind: Kind.Item, race: Race.Special, type: Type.Item},
    "sclp": {
        code: "",
        name: "秘密关卡激活",
        tip: "开启一个秘密关卡！",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "engs": {
        code: "",
        name: "魔法宝石",
        tip: "这件宝物据说有着凯尔爱尼的神秘力量，能给建筑物增加完美的防御。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "mgtk": {
        code: "",
        name: "魔法钥匙串",
        tip: "这串钥匙能打开所有的大门。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "tygh": {
        code: "",
        name: "魔鬼钥匙",
        tip: "这钥匙带着一股神秘的色彩。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "mort": {
        code: "",
        name: "莫哥林的报告",
        tip: "这信被魔法力量给封住了。信的前面潦草地写着萨尔这两个字。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "ches": {code: "", name: "奶酪", tip: "这只是奶酪而已!", kind: Kind.Item, race: Race.Special, type: Type.Item},
    "cnhn": {
        code: "",
        name: "赛纳留斯的号角",
        tip: "这个暗夜精灵族的神器据说能召唤来所有暗夜精灵的灵魂，它能赋予英雄<AIl1,DataA1>点生命值和每秒<Arel,DataA1>点的生命值恢复速度。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "sehr": {
        code: "",
        name: "赛瑞诺克斯之心",
        tip: "赛瑞诺克斯之心能赋予圆球龙的力量。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "k3m3": {
        code: "",
        name: "三月之钥",
        tip: "来自艾奴莱的蓝色身躯，能打开大门守护者的心灵。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "k3m2": {
        code: "",
        name: "三月之钥的另外一个部分",
        tip: "来自哈尼尔的紫色岩石能打开大门守护者的心灵。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "bzbf": {
        code: "",
        name: "盛满泉水的瓶子",
        tip: "能盛放生命之泉泉水的一个魔法容器。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "kysn": {
        code: "",
        name: "太阳钥匙",
        tip: "这钥匙散发着炫耀的光芒。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "ktrm": {
        code: "",
        name: "泰瑞纳斯国王的骨灰瓮",
        tip: "里面盛放着泰瑞纳斯国王的骨灰，现在它却被恶魔提克迪奥斯挑选来存放克尔苏加德的残骸。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "kybl": {
        code: "",
        name: "鲜血钥匙",
        tip: "这钥匙沾满了鲜血。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "shwd": {
        code: "",
        name: "荧光草",
        tip: "令人惊奇的植物，据说能够奇迹般地增强智力。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "sorf": {
        code: "",
        name: "影子之球碎片",
        tip: "一件宝物的碎片",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "k3m1": {
        code: "",
        name: "月亮水晶",
        tip: "来自杰那拉的翠绿眼睛，能打开大门守护者的心灵。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "kymn": {
        code: "",
        name: "月之钥匙",
        tip: "这钥匙散发着一种昏暗的色彩。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    //混杂
    "esaz": {
        code: "",
        name: "埃苏尼之精髓",
        tip: "传说中有一个兽族发现了神奇的埃苏尼之心。现在这个就是埃苏尼之心的一部分。它具有医疗英雄的能力。这是一个永久性的物品。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "nflg": {
        code: "",
        name: "暗夜精灵族旗帜",
        tip: "特殊的物品，常被用来当作某些场景内获胜的条件。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "spre": {
        code: "",
        name: "保存权杖",
        tip: "将一个目标单位传送到最高等级的主基地。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "fwss": {
        code: "",
        name: "冰霜巨龙头骨护盾",
        tip: "这个冰霜巨龙的头骨已经被改装成了一块坚固的护盾。能增加英雄2点的护甲并减少<AIsr,DataB1,%>%英雄所受到的魔法攻击。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "uflg": {
        code: "",
        name: "不死族旗帜",
        tip: "特殊的物品，常被用来当作某些场景内获胜的条件。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "tgxp": {
        code: "",
        name: "超级经验之书",
        tip: "给予英雄<AIe2,DataA1>点的经验值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "dust": {
        code: "",
        name: "尘土之影",
        tip: "显示英雄周围的隐形单位。|n一共可以使用<dust,uses>次。|n持续<AItb,Dur1>秒。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "asbl": {
        code: "",
        name: "刺客佩刀",
        tip: "当携带的时候，提高英雄<AItj,DataA1>点的攻击力。英雄的攻击在一定的时间内也能对敌人造成持续性的伤害，每秒<AIsz,DataA1>点。还能减慢敌人的移动和攻击速度。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "ram4": {
        code: "",
        name: "大魔法师指环",
        tip: "一件强有力的宝物，上面还装饰有碎宝石。增加英雄3点的智力，敏捷度和力量。还能加快英雄周围单位的魔法恢复速度。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "ram3": {
        code: "",
        name: "大魔法师指环",
        tip: "一件强有力的宝物，上面还装饰有碎宝石。增加英雄3点的智力，敏捷度和力量。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "ram2": {
        code: "",
        name: "大魔法师指环",
        tip: "一件强有力的宝物，上面还装饰有碎宝石。增加英雄2点的智力，敏捷度和力量。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "ram1": {
        code: "",
        name: "大魔法师指环",
        tip: "一件强有力的宝物，上面还装饰有碎宝石。增加英雄1点的智力，敏捷度和力量。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rej6": {
        code: "",
        name: "大型恢复卷轴",
        tip: "|cff87ceeb非战斗类一次性物品|r|n在<AIp6,Dur1>秒内恢复英雄以及周围单位<AIp6,DataA1>点的生命值和<AIp6,DataB1>点的魔法值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rej4": {
        code: "",
        name: "大型恢复药水",
        tip: "|cff87ceeb非战斗类一次性物品|r|n在<AIp4,Dur1>秒内恢复英雄<AIp4,DataA1>点的生命值和<AIp4,DataB1>点的魔法值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "pgin": {
        code: "",
        name: "大隐形药水",
        tip: "|cff87ceeb非战斗类一次性物品|r|n在<AIv2,Dur1>秒内使得英雄处于隐形状态，但是当英雄攻击或者使用某项技能和魔法的时候，隐形效果就会消失。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "dtsb": {
        code: "",
        name: "德雷克萨尔魔法书",
        tip: "|cffff8c00神器|r|n能让你传送回自己的基地。并能减少<AIsr,DataB1,%>%受到的魔法伤害和增加英雄<AImv,DataA1>点的魔法值。|n|cffffcc00历史|r|n|cffffdead这本魔法书里面很多页都是来自肯瑞托魔法师的作品。他们都阵亡在了古代的战场上。|r",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "drph": {
        code: "",
        name: "德魯伊布袋",
        tip: "增加英雄1点的智力。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "gobm": {
        code: "",
        name: "地精地雷",
        tip: "在地上放置一个地精地雷以后，如果有敌人靠近地雷，则地雷就会自动爆炸从而对一定范围内的单位都造成伤害。|n可使用<gobm,uses>次。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "tels": {
        code: "",
        name: "地精夜视镜",
        tip: "能提高英雄在夜间的视野范围。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "oven": {
        code: "",
        name: "毒液之球",
        tip: "增加英雄<AIpb,DataA1>点的攻击力。英雄的攻击也会在攻击空中单位的时候具有远程能力并能在<Apo2,Dur1>秒内对目标造成中毒效果。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "gvsm": {
        code: "",
        name: "法术大师手套",
        tip: "|cff8b00ff特有的|r|n能控制召唤出来的单位。同时能增加英雄<AIa6,DataA1>点的智力。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "sksh": {
        code: "",
        name: "防护面具",
        tip: "增加英雄1点的力量。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "ocor": {
        code: "",
        name: "腐蚀之球",
        tip: "增加英雄<AIcb,DataA1>点的攻击力。英雄的攻击在攻击空中单位的时候也变为远程，而且能在<AIcb,Dur1>秒内削弱敌人的护甲。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rat3": {
        code: "",
        name: "攻击之爪+3",
        tip: "增加英雄3点的攻击力。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "stre": {
        code: "",
        name: "鼓舞权杖",
        tip: "复活附近几个尸体来为你战斗。持续<AInd,Dur1>秒。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "lure": {
        code: "",
        name: "怪兽诱捕守卫",
        tip: "召唤出一个能吸引中立单位的守卫。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rots": {
        code: "",
        name: "海之权杖",
        tip: "|cff87ceeb特有的消耗性物品|r|n能召唤<AIwm,DataA1>个两栖鱼人人来为你战斗。同时能增加英雄2点的智力，力量和敏捷度。|n包含<rots,uses>次使用次数。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "frhg": {
        code: "",
        name: "火焰手套",
        tip: "增加英雄<AId5,DataA1>点的护甲和<AIs2,DataA1,%>%的进攻速度。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "ofir": {
        code: "",
        name: "火焰之球",
        tip: "能让英雄的攻击带有<AIfb,DataA1>点的火焰伤害，而且英雄的攻击在攻击空中单位的时候会变成远程攻击，还有一定的溅射效果。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "gldo": {
        code: "",
        name: "基尔加丹之球",
        tip: "让英雄的攻击带有<AIgd,DataA1>点的火焰伤害。而且英雄在攻击空中单位的时候会变成远程攻击，还有一定的溅射效果。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "oslo": {
        code: "",
        name: "减速之球",
        tip: "增加英雄<AIsb,DataA1>点的攻击力。英雄的攻击在攻击空中单位的时候也变为远程攻击并能在<AIos,Dur1>秒内减慢敌方单位 <AIos,DataA1,%>%的攻击速度和<AIos,DataB1,%>%的移动速度。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "blba": {
        code: "",
        name: "剑刃护甲",
        tip: "提高周围单位<AIad,DataA1>点的防御。增加英雄<AId7,DataA1>点的护甲。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "pams": {
        code: "",
        name: "抗体药水",
        tip: "使英雄在<AIxs,Dur1>秒内对所有的魔法免疫。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "shrs": {
        code: "",
        name: "烤肉",
        tip: "一块散发着微光的烤肉。在吃了之后能恢复<AIhx,DataA1>点的生命值 。|n包含<shrs,uses>次使用次数。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "thdm": {
        code: "",
        name: "雷霆蜥蜴钻石",
        tip: "|cff32cd32特有的|r|n能射出闪电之箭对多个敌人造成伤害。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "tmmt": {
        code: "",
        name: "力量图腾",
        tip: "增加英雄1点的力量。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "mlst": {
        code: "",
        name: "力量之锤",
        tip: "增加英雄1点的力量。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "soul": {
        code: "",
        name: "灵魂",
        tip: "一个被灵魂宝石所俘获的灵魂。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "gsou": {
        code: "",
        name: "灵魂宝石",
        tip: "能俘获敌人英雄的灵魂，但是你自己拥有宝石的英雄被杀死之后，宝石里的敌方英雄灵魂就会重新被释放出来。而且，当你的英雄用灵魂宝石俘获了敌方英雄之后，你的这个英雄就会处于敌人的视野之下。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "grsl": {
        code: "",
        name: "灵魂宝物",
        tip: "|cff87ceeb特有的消耗性物品|r|n这本强有力的书在使用一次之后能永久地增加英雄<AIpx,DataA1>点的生命值。|n包含<grsl,uses>次使用次数。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "cosl": {
        code: "",
        name: "灵魂之球",
        tip: "|cffff8c00神器|r|n能将阵亡的<AIrx,DataA1>个非英雄单位复活。|n|cffffcc00历史|r|n|cffffdead这个神器由古代的泰坦巨人所造。神灵的灵魂之球从上天带来了伟大的力量来复活那些在战场上英雄牺牲的勇士。|r",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "jdrn": {
        code: "",
        name: "灵巧指环",
        tip: "增加英雄1点的敏捷度。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "kgal": {
        code: "",
        name: "麦酒桶",
        tip: "提高生命值和魔法值恢复速度。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "arsh": {
        code: "",
        name: "芒硝护盾",
        tip: "减少<AIdd,DataA1,%>%受到的远程攻击伤害。并增加英雄<AId5,DataA1>点的护甲。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "brag": {
        code: "",
        name: "敏捷腰带",
        tip: "增加英雄1点的敏捷度。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "nspi": {
        code: "",
        name: "魔法免疫项链",
        tip: "让英雄对魔法免疫。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "sbok": {
        code: "",
        name: "魔法书",
        tip: "书中所包含的魔法技能是随机出现的。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "envl": {
        code: "",
        name: "魔法小瓶",
        tip: "恢复<AIp3,DataA1>点的生命值和<AIp3,DataB1>点的魔法值。持续<AIp3,Dur1>秒。|n包含<envl,uses>次使用次数。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "flag": {
        code: "",
        name: "人族旗帜",
        tip: "特殊的物品，常被用来当作某些场景内获胜的条件。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "shhn": {
        code: "",
        name: "荣誉护盾",
        tip: "|cff8b00ff特有的|r|n增加周围单位<AIcd,DataA1,%>%的攻击力。同时增加英雄<AId8,DataA1>点的护甲。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "shcw": {
        code: "",
        name: "萨满利爪",
        tip: "|cff8b00ff特有的|r|n这装备是在萨满学完所有技能之后得到的。能增加<AIlx,DataA1>点的攻击力。并使得英雄有一定的概率来驱散魔法和在 <AIpg,Dur1> 秒内减慢敌人的移动速度。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "shtm": {
        code: "",
        name: "萨满图腾",
        tip: "萨满图腾中蕴含着萨满祭司强大的魔法力量。能让携带者施放净化魔法。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "srtl": {
        code: "",
        name: "瑟拉思尔",
        tip: "|cffff8c00神器|r|n增加英雄<AIsx,DataA1,%>%的攻击速度和<AItf,DataA1>点的攻击力。|n|cffffcc00历史|r|n|cffffdead这把巨大的战斧是为了卡斯德拉克所造。并在血河战争中被是使用。随着黑疤部落的灭亡，这把战斧也最终不知了去向。那滋盖尔是卡斯德拉克唯一一个还健在的亲戚。|r",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "olig": {
        code: "",
        name: "闪电之球",
        tip: "能增加英雄<AIlb,DataA1>点的攻击力。也使得英雄的攻击在攻击空中单位的时候会变为远程攻击，还能驱逐魔法和在<AIlp,Dur1>秒内减慢敌人的移动速度。|n|cffffcc00对召唤出来的单位能造成 <AIlp,DataC1>点的伤害。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "oli2": {
        code: "",
        name: "闪电之球",
        tip: "能增加英雄<AIlb,DataA1>点的攻击力。也使得英雄的攻击在攻击空中单位的时候会变为远程攻击，还能驱逐魔法和在<AIlp,Dur1>秒内减慢敌人的移动速度。|n|cffffcc00对召唤出来的单位能造成 <AIpg,DataC1>点的伤害。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "arsc": {
        code: "",
        name: "神秘卷轴",
        tip: "一种强大的卷轴。能恢复<AIha,DataA1>点的生命值，<AImr,DataA1>点的魔法值。并能增加周围单位<AIda,DataA1>点的护甲。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rugt": {
        code: "",
        name: "神秘手套",
        tip: "当携带的时候增加英雄3点的力量和护甲。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rump": {
        code: "",
        name: "生锈的矿铲",
        tip: "这把笨重的铲子有着巨大的力量。增加英雄<AItg,DataA1>点的攻击力并给予其<AIbx,DataA1>%的概率来击晕对手。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "shen": {
        code: "",
        name: "施魔护盾",
        tip: "增加英雄<AId2,DataA1>点的护甲和<AIlz,DataA1>点的生命值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "stpg": {
        code: "",
        name: "时钟企鹅",
        tip: "这个可爱的企鹅玩具最初由地精工人萨拉哈尔为半人马所造。由于半人马从来都没有见过企鹅的样子，所以他们对其充满着敬畏之情并将它们放在祭坛里进行膜拜。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "red0": {
        code: "",
        name: "守护指环+1",
        tip: "增加英雄1点的护甲。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "oflg": {
        code: "",
        name: "兽族旗帜",
        tip: "特殊的物品，常被用来当作某些场景内获胜的条件。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "frgd": {
        code: "",
        name: "霜冻守卫",
        tip: "携带的时候增加英雄<AIft,DataA1>点的霜冻攻击伤害和<AId5,DataA1>点的护甲。英雄的攻击也能减慢敌人的移动和攻击速度。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "shdt": {
        code: "",
        name: "死亡领主护盾",
        tip: "|cffff8c00神器|r|n使得英雄陷于火焰的包围之中，对周围的单位造成每秒<AIpi,DataA1>的伤害。同时增加英雄<AId0,DataA1>点的护甲，<AIlf,DataA1>点的生命值，<AImz,DataA1>点的魔法值。|n|cffffcc00历史|r|n|cffffdead当阿尔塞斯开始屠杀自己的子民的时候，死亡领主在洛旦伦大陆许多其他的地方也实行着同样的罪行。|r",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "crdt": {
        code: "",
        name: "死亡领主皇冠",
        tip: "|cffff8c00神器|r|n使得能射出痛苦之箭来对敌人造成<AIfz,DataC1>点的伤害。同时能增加<AIlf,DataA1>点的生命值和<AImz,DataA1>点的魔法值。|n|cffffcc00历史|r|n|cffffdead据说死亡领主曾经是一个光荣的圣骑士。在他弃明投暗之后残忍地杀害了自己的家人。|r",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "pspd": {
        code: "",
        name: "速度药水",
        tip: "在<AIsp,Dur1>秒内提高 <AIsp,DataA1,%>%的移动速度。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "iwbr": {
        code: "",
        name: "铁树枝干",
        tip: "增加英雄1点的力量。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "ccmd": {
        code: "",
        name: "统治权杖",
        tip: "能将敌方非英雄单位占为己有。这种控制权的改变而且是永久性的。|n不能被用在英雄和级别高于<AIco,DataA1>的中立单位上。|n可使用<ccmd,uses>次。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "tbar": {
        code: "",
        name: "微型兵营",
        tip: "在目标地点建造一个兵营。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "tlum": {
        code: "",
        name: "微型伐木场",
        tip: "在目标地点建造一座伐木场。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "tbak": {
        code: "",
        name: "微型国王祭坛",
        tip: "在目标地点建造一个国王祭坛。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "tfar": {
        code: "",
        name: "微型农场",
        tip: "在目标地点建造一个农场。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "tbsm": {
        code: "",
        name: "微型铁匠铺",
        tip: "在目标地点建造一个铁匠铺。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "sfog": {
        code: "",
        name: "乌云号角",
        tip: "能让英雄施放乌云技能，从而可以使得一定范围内敌人所有的防御塔在<AIfg,Dur1>秒内都失去攻击能力。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "vddl": {
        code: "",
        name: "巫毒玩偶",
        tip: "增加英雄1点的智力。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "tmsc": {
        code: "",
        name: "牺牲之书",
        tip: "|cff8b00ff特有的|r|n牺牲附近的一个非英雄单位来补充英雄的生命值。在装备之后也能增加英雄<AImz,DataA1>点的魔法值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "horl": {
        code: "",
        name: "稀有神器",
        tip: "一种威力巨大的神器，由古代的兽族萨满祭司所造。|n提高英雄和周围单位的进攻速度和移动速度。|n不能和耐久光环一起使用。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "axas": {
        code: "",
        name: "先祖权杖",
        tip: "|cffff8c00神器|r|n召唤出<AIsh,DataB1>个巨魔狂暴战士来为你战斗。并且使得英雄和其周围的单位加快攻击和移动速度。|n|cffffcc00历史|r|n|cffffdead巫医几代人的名字都被刻在了这个做工精细的权杖上。持有这个权杖的人能在危急的时刻求助于来自他们的伟大魔法力量。|r",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "gemt": {
        code: "",
        name: "显形宝石",
        tip: "能让英雄看到敌方的隐形单位。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rej5": {
        code: "",
        name: "小型恢复卷轴",
        tip: "|cff87ceeb非战斗类一次性物品|r|n在<AIp5,Dur1>秒内恢复英雄以及周围单位<AIp5,DataA1>点的生命值和<AIp5,DataB1>点的魔法值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rej2": {
        code: "",
        name: "小型恢复药水",
        tip: "|cff87ceeb非战斗类一次性物品|r|n在<AIp2,Dur1>秒内恢复英雄<AIp2,DataA1>点的生命值和<AIp2,DataB1>点的魔法值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rej1": {
        code: "",
        name: "小型恢复药水",
        tip: "|cff87ceeb非战斗类一次性物品|r|n在<AIp1,Dur1>秒内恢复英雄<AIp1,DataA1>点的生命值和<AIp1,DataB1>点的魔法值。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "scul": {
        code: "",
        name: "邪恶军团卷轴",
        tip: "复活附近<AIan,DataA1>具尸体来为你战斗。持续<AIan,Dur1>秒。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "musf": {
        code: "",
        name: "心灵权杖",
        tip: "增加英雄<AI2m,DataA1>点的魔法值。并给予英雄和其周围的单位更快的魔法恢复速度。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "fgun": {
        code: "",
        name: "信号枪",
        tip: "显示地图上的某块区域。|n可使用<fgun,uses>次。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "lnrn": {
        code: "",
        name: "雄狮之戒",
        tip: "增加英雄1点的敏捷度。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "bfhr": {
        code: "",
        name: "血羽之心",
        tip: "|cff8b00ff特有的|r|n当携带的时候增加英雄<AIaz,DataA1>点的敏捷度。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "schl": {
        code: "",
        name: "医疗权杖",
        tip: "能治愈一个友军单位。同时也能加快英雄和周围单位<AIgx,DataA1,%>%的生命值恢复速度。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "sor1": {
        code: "",
        name: "影子之球+1",
        tip: "这个宝物被注入了兽族古代影子议会的力量，从而能增加你1点的攻击力。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "sora": {
        code: "",
        name: "影子之球+10",
        tip: "这个宝物被注入了兽族古代影子议会的力量，从而能增加你10点的攻击力和3点的护甲，并能加快生命值恢复速度。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "sor2": {
        code: "",
        name: "影子之球+2",
        tip: "这个宝物被注入了兽族古代影子议会的力量，从而能增加你2点的攻击力。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "sor3": {
        code: "",
        name: "影子之球+3",
        tip: "这个宝物被注入了兽族古代影子议会的力量，从而能增加你3点的攻击力。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "sor4": {
        code: "",
        name: "影子之球+4",
        tip: "这个宝物被注入了兽族古代影子议会的力量，从而能增加你4点的攻击力和1点的护甲。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "sor5": {
        code: "",
        name: "影子之球+5",
        tip: "这个宝物被注入了兽族古代影子议会的力量，从而能增加你5点的攻击力和1点的护甲。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "sor6": {
        code: "",
        name: "影子之球+6",
        tip: "这个宝物被注入了兽族古代影子议会的力量，从而能增加你6点的攻击力和1点的护甲。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "sor7": {
        code: "",
        name: "影子之球+7",
        tip: "这个宝物被注入了兽族古代影子议会的力量，从而能增加你7点的攻击力和2点的护甲。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "sor8": {
        code: "",
        name: "影子之球+8",
        tip: "这个宝物被注入了兽族古代影子议会的力量，从而能增加你8点的攻击力和2点的护甲。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "sor9": {
        code: "",
        name: "影子之球+9",
        tip: "这个宝物被注入了兽族古代影子议会的力量，从而能增加你9点的攻击力和2点的护甲，并能加快生命值恢复速度。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "rnsp": {
        code: "",
        name: "优越之戒",
        tip: "增加英雄1点的智力，敏捷度和力量。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "anfg": {
        code: "",
        name: "远古雕像",
        tip: "增加英雄1点的智力。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "klmm": {
        code: "",
        name: "远古战斧",
        tip: "|cffff8c00神器|r|n增加英雄<AItx,DataA1>点的攻击力。并使英雄的攻击能汲取生命值。|n|cffffcc00历史|r|n|cffffdead当德瑟林发现他的爱人阿鲁娜投进了别人的怀抱。他前去荒地好好地痛苦了一场。结果从沙子里面飞出了一把巨大的战斧。德瑟林拿着这把从天而降的斧子杀了阿鲁娜和她的情人。随后他用自己最大的力气把这把神奇的战斧投向了大海的最深处。|r",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "btst": {
        code: "",
        name: "战斗标准",
        tip: "萨尔兽族氏族的战斗标准，骄傲地带上它吧。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "stwa": {
        code: "",
        name: "战斧",
        tip: "增加英雄<AItj,DataA1>点的攻击力。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "hbth": {
        code: "",
        name: "战舰之舵",
        tip: "|cff8b00ff特有的|r|n让英雄处于狂暴愤怒的状态，从而增加其<AIxk,DataB1,%>%的攻击速度。但是同时也会对自身造成每秒<AIxk,DataC1>点的伤害。还能增加其4点的力量和敏捷度属性。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "amrc": {
        code: "",
        name: "召唤护身符",
        tip: "将目标区域内<AIrt,DataA1>个玩家的单位传送到英雄的旁边。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "sprn": {
        code: "",
        name: "蜘蛛戒指",
        tip: "增加英雄1点的敏捷度。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
    "srbd": {
        code: "",
        name: "灼热之刀",
        tip: "增加英雄<AIfw,DataA1>点的火焰攻击力。英雄的攻击也带有溅射效果，能对目标周围的单位同时造成伤害。同时英雄有<AIcs,DataA1>%的概率能对目标造成<AIcs,DataB1>倍于普通攻击的伤害。",
        kind: Kind.Item,
        race: Race.Special,
        type: Type.Item
    },
};

const buffHuman = {
    "BHbd": {code: "", name: "暴风雪", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Hero},
    "BHbz": {code: "", name: "暴风雪(施法者)", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Hero},
    "BHab": {code: "", name: "辉煌光环", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Hero},
    "Bdtm": {code: "", name: "汲取魔法值(目标)", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Unit},
    "Bdcm": {code: "", name: "汲取魔法值(施法者)", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Unit},
    "Bdtl": {code: "", name: "汲取生命值(目标)", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Unit},
    "Bdcl": {code: "", name: "汲取生命值(施法者)", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Unit},
    "Bdtb": {code: "", name: "汲职生命值和魔法值(目标)", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Unit},
    "Bdcb": {code: "", name: "汲取生命值和魔法值(施法者)", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Unit},
    "BHtc": {code: "", name: "雷霆一击", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Hero},
    "BHfs": {code: "", name: "烈焰风暴", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Hero},
    "BHbn": {code: "", name: "驱散", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Hero},
    "BHds": {code: "", name: "神圣护甲", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Hero},
    "BHwe": {code: "", name: "冰元素", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Hero},
    "BHav": {code: "", name: "天神下凡", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Hero},
    "Bdbm": {code: "", name: "吸取魔法", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Unit},
    "Bdbl": {code: "", name: "吸取生命", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Unit},
    "Bdbb": {code: "", name: "吸取生命值和魔法值", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Unit},
    "BHad": {code: "", name: "专注光环", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Hero},
    "Bply": {code: "", name: "变形术", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Unit},
    "Bpxf": {code: "", name: "凤凰火焰", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Unit},
    "Bphx": {code: "", name: "火凤凰", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Unit},
    "Bslo": {code: "", name: "减速", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Unit},
    "Bmlt": {code: "", name: "空中锁镣", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Unit},
    "Bmlc": {code: "", name: "空中锁镣(施法者)", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Unit},
    "Bcmg": {code: "", name: "控制魔法", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Unit},
    "Bmil": {code: "", name: "民兵", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Unit},
    "Bclf": {code: "", name: "乌云技能", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Unit},
    "Binf": {code: "", name: "心灵之火", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Unit},
    "Bhea": {code: "", name: "医疗", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Unit},
    "Bivs": {code: "", name: "隐形(额外的)", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Unit},
    "Binv": {code: "", name: "隐形术", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Unit},

    "XHbz": {code: "", name: "暴风雪(效果)", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Hero},
    "XHfs": {code: "", name: "烈焰风暴(效果)", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Hero},
    "Xfhl": {code: "", name: "建筑物伤害-人族大", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Unit},
    "Xfhs": {code: "", name: "健筑物伤害-人族小", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Unit},
    "Xfhm": {code: "", name: "建筑物伤害-人族中", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Unit},
    "Xclf": {code: "", name: "乌云 (效果)", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Unit},
    "Xfla": {code: "", name: "照明弹 (效果)", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Unit},
};


const MarkCode = {
    ...unitHuman,
    ...unitOrc,
    ...unitNightElf,
    ...unitUndead,
    ...unitNaga,
    ...unitNeutralHostile,
    ...unitNeutralPassive,
    ...abilityHuman,
    ...abilityOrc,
    ...abilityNightElf,
    ...abilityUndead,
    ...abilityNeutralHostile,
    ...abilityNeutralPassive,
    ...abilityItem,
    ...item,
    ...buffHuman
};

const MarkCodes = [...Object.values(unitHuman),
    ...Object.values(unitOrc),
    ...Object.values(unitNightElf),
    ...Object.values(unitUndead),
    ...Object.values(unitNaga),
    ...Object.values(unitNeutralHostile),
    ...Object.values(unitNeutralPassive),
    ...Object.values(abilityHuman),
    ...Object.values(abilityOrc),
    ...Object.values(abilityNightElf),
    ...Object.values(abilityUndead),
    ...Object.values(abilityNeutralHostile),
    ...Object.values(abilityNeutralPassive),
    ...Object.values(abilityItem),
    ...Object.values(item),
    ...Object.values(buffHuman)];

export {
    MarkCode, Kind, Race, Type, kindToString, raceToString, typeToString, MarkCodes
};

