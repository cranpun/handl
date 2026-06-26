// ランダムな数値を生成する関数
function makeAnswer(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ヒントを提供する関数
function hintHL(answer, input) {
    if (answer > input) {
        return "もっと大きい";
    } else {
        return "もっと小さい";
    }
}

function hintUnit1(answer) {
    const hint = answer % 10;
    return `1の位は${hint}`;
}

function hintOddEven(answer) {
    const hint = answer % 2 === 0 ? "偶数" : "奇数";
    return hint;
}

function hintSumUnit(answer) {
    let sum = 0;
    let num = answer;
    while (num > 0) {
        sum += num % 10;
        num = Math.floor(num / 10);
    }
    return `各位の和は${sum}`;
}

// ゲームのメイン関数
function main() {
    const max = 100;
    const min = 1;
    const answer = makeAnswer(min, max);
    
    const hintfuncs = [
        hintOddEven(answer),
        hintSumUnit(answer),
        hintUnit1(answer),
        `残念！正解は${answer}でした`
    ];
    
    let attempt = 0;
    const inputElement = document.getElementById('input');
    const logElement = document.getElementById('log');
    
    // ゲームの処理
    window.checkNumber = function() {
        const input = parseInt(inputElement.value);
        
        if (isNaN(input) || input < min || input > max) {
            if (logElement) {
                const logEntry = document.createElement('div');
                logEntry.className = 'log-entry';
                logEntry.textContent = `入力: ${input} → 1から100の間の数字を入力してください`;
                logElement.appendChild(logEntry);
            }
            return;
        }
        
        if (input === answer) {
            if (logElement) {
                const logEntry = document.createElement('div');
                logEntry.className = 'log-entry';
                logEntry.textContent = `入力: ${input} → 正解です！`;
                logElement.appendChild(logEntry);
            }
            // 入力欄をクリア
            inputElement.value = '';
            return;
        }
        
        attempt++;
        if (attempt >= hintfuncs.length) {
            if (logElement) {
                const logEntry = document.createElement('div');
                logEntry.className = 'log-entry';
                logEntry.textContent = `入力: ${input} → ${hintfuncs[hintfuncs.length - 1]}`;
                logElement.appendChild(logEntry);
            }
            // 入力欄をクリア
            inputElement.value = '';
            return;
        }
        
        const hint = [
            hintHL(answer, input),
            hintfuncs[attempt - 1]
        ];
        
        if (logElement) {
            const logEntry = document.createElement('div');
            logEntry.className = 'log-entry';
            logEntry.textContent = `入力: ${input} → ${hint.join("：")}`;
            logElement.appendChild(logEntry);
        }
        // 入力欄をクリア
        inputElement.value = '';
    }
    
    // 入力ボタンのクリックイベント
    if (inputElement) {
        inputElement.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                window.checkNumber();
            }
        });
    }
}

// ページ読み込み後にゲームを開始
window.onload = main;