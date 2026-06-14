const fs = require("fs");

const KEY =
"24e82ce9a38787e898c38ec088a805d56eebb8576582d4c0924f1be9621be521";

async function main() {

    const url =
        "https://gitee.com/Myn_1/Mao_Yuna/raw/MYN_update/lx-music/lx-%E7%8E%89%E5%AE%81%E7%86%99.js";

    const response = await fetch(url);

    let text = await response.text();

    // 注入 KEY
    text = text.replace(
        /const\s+YuNingXi\s*=\s*'[^']*';\s*\/\/\s*音乐解析KEY/,
        `const YuNingXi = '${KEY}'; // 音乐解析KEY`
    );

    // 提取版本号
    let version = "unknown";

    const match = text.match(
        /version\s*[:=]\s*['"]?([\d.]+)['"]?/i
    );

    if (match)
        version = match[1];

    const filename = `lx-玉宁熙-v${version}.js`;

    fs.writeFileSync(filename, text);

    // 生成最新版入口
    fs.writeFileSync("lx-玉宁熙.js", text);

    console.log(filename);
}

main();
