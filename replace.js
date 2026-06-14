const fs = require("fs");

const KEY = "24e82ce9a38787e898c38ec088a805d56eebb8576582d4c0924f1be9621be521";

async function main() {

    const url =
        "https://gitee.com/Myn_1/Mao_Yuna/raw/MYN_update/lx-music/lx-%E7%8E%89%E5%AE%81%E7%86%99.js";

    const response = await fetch(url);

    if (!response.ok)
        throw new Error("下载失败");

    let text = await response.text();

    text = text.replace(
        /const\s+YuNingXi\s*=\s*'[^']*';\s*\/\/\s*音乐解析KEY/,
        `const YuNingXi = '${KEY}'; // 音乐解析KEY`
    );

    fs.writeFileSync("lx-玉宁熙.js", text);

    console.log("success");
}

main();
