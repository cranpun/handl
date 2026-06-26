import readline from "readline";

function makeAnswer(min: number, max: number): number {
    // minからmaxの間のランダムな整数を返す
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function typeInput(): Promise<number> {
    // win11のpowershellでキーボードからの入力を受け取る
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    console.log("入力：");
    return new Promise((resolve) => {
        rl.question("", (input: string) => {
            rl.close();
            if (input === null) {
                resolve(0);
            } else {
                resolve(Number(input));
            }
        });
    });
}

function hintHL(answer: number, input: number): string {
    // 大きいか小さいかのヒント
    if (answer > input) {
        return "もっと大きい";
    } else { // (answer < input)
        return "もっと小さい";
    }
}
function hintUnit1(answer: number): string {
    // 1の位の数値
    const hint = answer % 10;
    return `1の位は${hint}`;
}
function hintOddEven(answer: number): string {
    // 奇数か偶数かのヒント
    const hint = answer % 2 === 0 ? "偶数" : "奇数";
    return hint;
}
function hintSumUnit(answer: number): string {
    let sum = 0;
    let num = answer;
    while (num > 0) {
        sum += num % 10;
        num = Math.floor(num / 10);
    }
    return `各位の和は${sum}`;
}

async function main(): Promise<void> {
    const max: number = 100;
    const min: number = 1;
    const answer: number = makeAnswer(min, max);
    const hintfuncs: string[] = [
        hintOddEven(answer),
        hintSumUnit(answer),
        hintUnit1(answer),
        `残念！正解は${answer}でした`
    ];

    //　プレイヤーから入力を受け取り、それがanswerと一致するか確認
    // 一致すれば終了、しなければ継続
    // 順番にヒントを出す
    console.log(`${min}から${max}までの数字を当てるゲームです。`);

    for (let i = 0; i < hintfuncs.length; i++) {
        // nodeでターミナルからキーボード入力を受け取る
        const input: number | null = await typeInput();

        if (input === answer) {
            console.log("正解です！");
            return;
        }

        const hint: string[] = [
            hintHL(answer, input),
        ];

        // 追加ヒント
        hint.push(hintfuncs[i]);

        console.log(hint.join("："));
    }
}

main();