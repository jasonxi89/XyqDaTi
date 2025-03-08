// 梦幻西游答题器 - 题库和OCR API配置
// 版本: 3.0 OCR.space API版本

// 完整题库数据
const QUESTION_DATABASE = [
    {
        question: "下列哪种中控低目标治疗能力的高?",
        correctOption: "C",
        optionText: "紫蜜芯",
        allOptions: [
            { label: "A", text: "椰头瘴气" },
            { label: "B", text: "银腰带" },
            { label: "C", text: "紫蜜芯" },
            { label: "D", text: "满天花雨" }
        ],
        category: "技能",
        difficulty: 2
    },
    {
        question: "水路为患是哪个地图的特色？",
        correctOption: "C",
        optionText: "东海湾",
        allOptions: [
            { label: "A", text: "大唐境内" },
            { label: "B", text: "阴曹地府" },
            { label: "C", text: "东海湾" },
            { label: "D", text: "普陀山" }
        ],
        category: "地图",
        difficulty: 1
    },
    {
        question: "以下哪个NPC不是大唐国境的?",
        correctOption: "B",
        optionText: "火焰山土地",
        allOptions: [
            { label: "A", text: "钟馗" },
            { label: "B", text: "火焰山土地" },
            { label: "C", text: "袁天罡" },
            { label: "D", text: "程咬金" }
        ],
        category: "NPC",
        difficulty: 2
    },
    {
        question: "以下宝宝中哪个不能变身?",
        correctOption: "B",
        optionText: "周杰伦",
        allOptions: [
            { label: "A", text: "赛太岁" },
            { label: "B", text: "周杰伦" },
            { label: "C", text: "大鹏" },
            { label: "D", text: "啸天犬" }
        ],
        category: "宠物",
        difficulty: 1
    },
    {
        question: "哪种武器不能被魔王怪掉落?",
        correctOption: "A", 
        optionText: "伏魔棍",
        allOptions: [
            { label: "A", text: "伏魔棍" },
            { label: "B", text: "破魔刀" },
            { label: "C", text: "双魂剑" },
            { label: "D", text: "偃月刀" }
        ],
        category: "装备",
        difficulty: 3
    },
    {
        question: "哪位NPC不在长安城?",
        correctOption: "D",
        optionText: "李世民",
        allOptions: [
            { label: "A", text: "佛门弟子" },
            { label: "B", text: "红娘" },
            { label: "C", text: "店小二" },
            { label: "D", text: "李世民" }
        ],
        category: "NPC",
        difficulty: 1
    },
    {
        question: "哪个门派掉血最快?",
        correctOption: "A",
        optionText: "魔王寨",
        allOptions: [
            { label: "A", text: "魔王寨" },
            { label: "B", text: "化生寺" },
            { label: "C", text: "大唐官府" },
            { label: "D", text: "阴曹地府" }
        ],
        category: "门派",
        difficulty: 2
    },
    {
        question: "以下哪种药品无法在药店购买?",
        correctOption: "D",
        optionText: "洗髓丹",
        allOptions: [
            { label: "A", text: "金创药" },
            { label: "B", text: "红药" },
            { label: "C", text: "蓝药" },
            { label: "D", text: "洗髓丹" }
        ],
        category: "物品",
        difficulty: 1
    },
    {
        question: "以下哪种宝宝技能是物理系的?",
        correctOption: "C",
        optionText: "连环击",
        allOptions: [
            { label: "A", text: "雷击" },
            { label: "B", text: "落岩" },
            { label: "C", text: "连环击" },
            { label: "D", text: "飞沙走石" }
        ],
        category: "技能",
        difficulty: 2
    },
    {
        question: "以下哪个任务可以获得天眼通技能?",
        correctOption: "B",
        optionText: "珍珑棋局",
        allOptions: [
            { label: "A", text: "宝象国" },
            { label: "B", text: "珍珑棋局" },
            { label: "C", text: "龙宫探宝" },
            { label: "D", text: "天庭护法" }
        ],
        category: "任务",
        difficulty: 3
    },
    {
        question: "青龙，白虎，朱雀，玄武中谁代表东方?",
        correctOption: "A",
        optionText: "青龙",
        allOptions: [
            { label: "A", text: "青龙" },
            { label: "B", text: "白虎" },
            { label: "C", text: "朱雀" },
            { label: "D", text: "玄武" }
        ],
        category: "知识",
        difficulty: 1
    },
    {
        question: "花果山在哪个城市附近?",
        correctOption: "C",
        optionText: "傲来国",
        allOptions: [
            { label: "A", text: "长安城" },
            { label: "B", text: "建邺城" },
            { label: "C", text: "傲来国" },
            { label: "D", text: "朱紫国" }
        ],
        category: "地图",
        difficulty: 1
    }
];

// OCR.space API配置
const OCR_CONFIG = {
    apiVersion: "3.0",
    endpoint: "https://api.ocr.space/parse/image",
    apiKey: "K84971696288957", // 生产环境应保护此密钥
    language: "chs", // 中文简体
    detectOrientation: true,
    scale: true,
    isOverlayRequired: false,
    confidentThreshold: 0.75, // 低于此置信度将使用备用方法
    imageTreatments: {
        preProcessing: true,
        enhanceContrast: true,
        sharpening: true
    }
};

// 服务状态监测
class OcrServiceMonitor {
    constructor() {
        this.status = 'unknown';
        this.lastCheckTime = 0;
        this.checkInterval = 60000; // 每分钟检查一次
        this.endpoint = OCR_CONFIG.endpoint;
        this.apiKey = OCR_CONFIG.apiKey;
    }
    
    async checkService() {
        const now = Date.now();
        if (now - this.lastCheckTime < this.checkInterval) {
            return this.status;
        }
        
        this.lastCheckTime = now;
        
        // 检查网络连接状态
        if (navigator.onLine) {
            try {
                // 发送小型测试请求
                const response = await fetch(this.endpoint, {
                    method: 'OPTIONS',
                    headers: {
                        'apikey': this.apiKey
                    }
                });
                
                if (response.ok) {
                    this.status = 'online';
                    return 'online';
                } else {
                    this.status = 'error';
                    return 'error';
                }
            } catch (error) {
                console.error("API检查失败:", error);
                this.status = 'error';
                return 'error';
            }
        } else {
            this.status = 'offline';
            return 'offline';
        }
    }
    
    // 获取当前服务状态的中文描述
    getStatusText() {
        switch (this.status) {
            case 'online':
                return "OCR服务在线";
            case 'offline':
                return "OCR服务离线";
            case 'error':
                return "OCR服务异常";
            default:
                return "OCR服务状态未知";
        }
    }
}

// 导出数据和功能供主脚本使用
window.quizData = {
    questions: QUESTION_DATABASE,
    ocrConfig: OCR_CONFIG,
    serviceMonitor: new OcrServiceMonitor()
}; 