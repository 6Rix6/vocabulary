const word = document.querySelector('.word');
const wordList = document.querySelector('.wordlist');
const input = document.querySelector('.input');
const str = wordList.getAttribute('data-word');
const nametext = document.querySelector('.nameText');
const ans = document.querySelector('.ans');
const speaker = document.querySelector('.material-symbols-outlined');
const max = document.querySelector('.max');
const min = document.querySelector('.min');
const skip = document.querySelector('.btn04');
const b = document.querySelector('.b');
const c = document.querySelector('.c');
const ReTable = document.querySelector('.resultTable');
const cerebrate = document.querySelector('.cerebrate');
const missedword = document.querySelector('.missedword');
const btn03 = document.querySelector('.btn03');
const btn05 = document.querySelector('.btn05');
const btn06 = document.querySelector('.btn06');
const check = document.getElementById('popup');
const mode = document.getElementById('mode');
const target = document.getElementById("list");
const choicelist = document.querySelector('.choicelist');
let bn = 1; 
let cn = 500;
let currentword;
let maxnumber = 499;
let minnumber = 0;
let currentnumbers = 0;
let result = [];
let list = []; //現在までで出た単語のリスト
let nameText = document.getElementById('nameText');
let msg = document.getElementById('msg');
let choice = document.getElementById('choice');
let wrong = [];
let currentwrong = 0;



//画面遷移アニメーション用
$(window).on('load', function() {
    $("#splash-logo").delay(100).fadeOut('slow');//ロゴを1.2秒でフェードアウトする記述

    //=====ここからローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる
    $("#splash").delay(100).fadeOut('slow', function() {//ローディングエリア（splashエリア）を1.5秒でフェードアウトする記述

        $('body').addClass('appear');//フェードアウト後bodyにappearクラス付与

    });
    //=====ここまでローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる

    //=====ここから背景が伸びた後に動かしたいJSをまとめたい場合は
    $('.splashbg').on('animationend', function() {
        //この中に動かしたいJSを記載
        //=====ここまで背景が伸びた後に動かしたいJSをまとめる
    });
});


//ワードリストを配列に代入
convertCSVtoArray(str);
function convertCSVtoArray(str) {
    var tmp = str.split("\n");

    for (var i = 0; i < tmp.length; ++i) {
        result[i] = tmp[i].split('@');
    }
    keysAfter = ['番号', '文章', '訳'];

    result = result.map(e =>
        Object.fromEntries(
            Object.entries(e).map(([k, v]) => [keysAfter[k], v])
        )
    );

    console.log(result);
}

function makechoice(sentence) { //センテンスをスペースでsplitして単語に分割
    var sentence = sentence.split(' ');
    var sorted_choices = "";
    target.innerHTML = "";
    sentence = arrayShuffle(sentence);
    for (var i = 0; i < sentence.length; ++i) {
        sorted_choices += sentence[i];
        if (i == sentence.length - 1) break;
        sorted_choices += " / ";
    }
    for (var i = 0; i < sentence.length; ++i) {
        const word_item = document.createElement("li");
        word_item.innerHTML = sentence[i];
        //word_item.className = "word_item"
        word_item.draggable = true;
        target.appendChild(word_item);
    }
    const items = target.getElementsByTagName("li");

    return sorted_choices;
}

function arrayShuffle(array) { //センテンスの単語listをシャッフル
    for (let i = (array.length - 1); 0 < i; i--) {

        // 0〜(i+1)の範囲で値を取得
        let r = Math.floor(Math.random() * (i + 1));

        // 要素の並び替えを実行
        let tmp = array[i];
        array[i] = array[r];
        array[r] = tmp;
    }
    return array;
}


//最大値、最小値の取得 初期化も兼ねてる
const getrange = () => {
    localStorage.setItem('mdmax_strage', max.value);
    localStorage.setItem('mdmin_strage', min.value);
    maxnumber = max.value - 1;
    minnumber = min.value - 1;
    currentnumbers = 0;
    list = [];
    wrong = [];
    ReTable.innerText = '';
    nameText.value = '';
    cerebrate.innerText = '';
    ans.innerText = '';
    document.getElementById("speaker").hidden = true;
    missedword.innerText = '';
    view();
    //console.log(maxnumber);
    //console.log(minnumber);
    random();
    check.checked = false;
    drag();
}

// 〇〇/〇〇〇 の処理
const view = () => {
    bn = currentnumbers;
    cn = maxnumber - minnumber + 1;
    b.innerText = currentnumbers;
    c.innerText = maxnumber - minnumber + 1;
}

window.addEventListener('DOMContentLoaded', () => {
    if(!localStorage.hasOwnProperty("mdmax_strage")){
        localStorage.setItem('mdmax_strage',500);
        localStorage.setItem('mdmin_strage',1);
    };
    max.value = localStorage.getItem('mdmax_strage');
    min.value = localStorage.getItem('mdmin_strage');
    choicelist.hidden = true;
    getrange();
    //console.log(result.length);
    view();
});

nameText.addEventListener('input', butotnClick);

nameText.addEventListener('change', changeshadow);

btn03.addEventListener('click', () => {
    getrange();
});

btn05.addEventListener('click', () => {
    getrange();
});

btn06.addEventListener('click', () => {
    toggleChatbox(result[currentword]['文章'] + "という文章の文法を解説して");
    wrong[currentword] = result[currentword];
});

skip.addEventListener('click', () => {
    console.log(target);
    ans.innerText = result[currentword]['文章'];
    wrong[currentword] = result[currentword];
    document.getElementById("speaker").hidden = false;
});

speaker.addEventListener('click', () => {
    console.log("speaker");
    if ('speechSynthesis' in window) {
        const uttr = new SpeechSynthesisUtterance(); // 発言を設定 (必須)
        uttr.text = result[currentword]['文章']; // テキストを設定 (必須)
        uttr.lang = "en-US"; // 言語を設定
        uttr.rate = 0.8; // 速度を設定
        uttr.pitch = 1; // 高さを設定
        uttr.volume = 1; // 音量を設定
        window.speechSynthesis.speak(uttr); // 発言を再生 (必須)

    } else {
        alert('大変申し訳ありません。このブラウザは音声合成に対応していません。');
    }
});

//ランダム処理

const random = () => {
    let ranmax = maxnumber - minnumber + 1;
    let randomize = Math.floor(Math.random() * ranmax) + minnumber;
    if (list.includes(result[randomize]) == false && bn != cn) {
        msg.innerText = result[randomize]['訳'];
        choice.innerText = makechoice(result[randomize]['文章']);
        currentword = randomize;
        //sconsole.log(currentword);
        console.log(result[randomize]);
        currentnumbers += 1;
        //console.log(currentnumbers);
        list[currentnumbers] = result[randomize];
        view();
        ans.innerText = '';
        document.getElementById("speaker").hidden = true;
        drag();
    } else if (bn == cn) {
        console.log("上限"); //ここでリセットしてくれ
        console.log(wrong);
        for (var i = 0; i < wrong.length; ++i) {
            console.log(wrong[i]);
        }
        if (wrong.length != 0) {
            missedword.innerText = "▼間違えた文章▼";
            TableMaker.make({ tableId: 'resultTable', json: wrong, headers: [] }); //表作りました
            check.checked = true;
        } else {
            cerebrate.innerText = "congraturations!!全問正解!";
            console.log("congraturations!!");
            check.checked = true;
        }
    } else {
        random();
        console.log("重複");
    }
}


//表の作成
class TableMaker {
    // jsonはオブジェクトの配列
    static make({ tableId = null, json = null, headers = [] } = {}) {
        const table = document.getElementById(tableId);
        if (typeof json === 'string') json = JSON.parse(json);
        table.innerHTML = this.build(json, headers);
    }

    static build(json, headers) {
        const rows = json.map(row => {
            if (headers.length === 0) headers = Object.keys(row);
            const tdsStr = headers.map(h => {
                let v = row[h];
                if (h === 'THUMBNAIL') v = `<img src="${v}">`;
                return `<td class="${h}">${v}</td>`;
            }).join('')
            return `<tr>${tdsStr}</tr>`;
        });
        const thsStr = headers.map(h => `<th class="${h}">${h}</th>`).join('');
        const rowsStr = rows.join('');
        return `<thead><tr>${thsStr}</tr></thead><tbody>${rowsStr}</tbody>`;
    }
}


//入力時の処理
function butotnClick() {
    if (result[currentword]['文章'] == nameText.value) {
        random();
        nameText.value = '';
        nameText.style.boxShadow = 'inset 3px 2px 3px 0 #0ada58, 3px 2px 3px 0 #0ada58';
    } else {
        nameText.style.boxShadow = 'inset 3px 2px 3px 0 #ff9900, 1px 1px 2px 0 #ff9900';
    }
}

function changeshadow() {
    nameText.style.boxShadow = 'inset 1px 1px 2px 0 #333';
}



//ーーーーーーーーーーーーーーーーーーーー埋め込みAIーーーーーーーーーーーーーーーーーーーーーーーーー

const toggleBtn = document.getElementById('chatbot-toggle_button');
const anchor = document.getElementById('chat-button');

function addStylesheet(href) {
    let link = document.createElement('link');
    link.href = href;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
}

anchor.addEventListener('click', event => {
    event.preventDefault();
    toggleChatbox();
});

// トグルボタンを作成し、追加する関数
// function createToggleButton() {
//     const toggleBtn = document.createElement('div');
//     toggleBtn.id = 'chatbot-toggle_button';
//     const anchor = document.createElement('a');
//     anchor.id = 'chat-button';
//     anchor.href = '#';
//     anchor.addEventListener('click', event => {
//       event.preventDefault();
//       toggleChatbox();
//     });
//     const img = document.createElement('img');
//     img.src = 'img/chaticon.png';
//     img.width = '100';
//     img.height = '100';
//     anchor.appendChild(img);
//     toggleBtn.appendChild(anchor);
//     document.body.appendChild(toggleBtn);
// }

// チャットボックスのヘッダーを作成する関数
function createChatboxHeader() {
    const header = document.createElement('div');
    header.id = 'chatbot-header';
    header.style.background = '#333';
    const logo = document.createElement('div');
    logo.id = 'chatbot-logo';
    logo.innerText = '金内亮';
    const closeIcon = document.createElement('i');
    closeIcon.id = 'chatbot-close-icon';
    closeIcon.className = 'material-icons material-symbols-outlined waves-light';
    closeIcon.innerText = 'close';
    closeIcon.addEventListener('click', event => {
        event.preventDefault();
        toggleChatbox();
    });
    header.appendChild(logo);
    header.appendChild(closeIcon);
    return header;
}

// チャットボックスを作成し、追加する関数
function createChatbox() {
    const chatbox = document.createElement('div');
    chatbox.id = 'chatbot';
    chatbox.style.display = 'none';

    const header = createChatboxHeader();
    const body = document.createElement('div');
    body.id = 'chatbot-body';
    const iframe = document.createElement('iframe');
    iframe.id = 'inline-frame';
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.dataSrc = 'https://miibo.jp/chat/666b61c5-834e-4f83-81ec-b7908bdbdba5192385f02cc181?name=%E5%8D%98%E8%AA%9E%E3%83%9E%E3%83%B3';
    iframe.scrolling = 'no';
    iframe.frameBorder = 'no';
    body.appendChild(iframe);
    chatbox.appendChild(header);
    chatbox.appendChild(body);
    document.body.appendChild(chatbox);
}

// チャットボックスの表示/非表示を切り替える関数
function toggleChatbox(utterance, ...states) {
    var chatbox = document.getElementById('chatbot');
    var iframe = document.getElementById('inline-frame');

    // ここでイベントオブジェクトではなく、文字列または未定義の値が渡されることを確認します。
    if (typeof utterance !== 'string') {
        utterance = null;
    }

    if (chatbox.style.display === 'none' || utterance) {
        chatbox.style.display = 'block';
        var src = 'https://miibo.jp/chat/666b61c5-834e-4f83-81ec-b7908bdbdba5192385f02cc181?name=%E5%8D%98%E8%AA%9E%E3%83%9E%E3%83%B3';
        // 可変引数からクエリパラメータを生成
        states.forEach(state => {
            if (state.key && state.value) {
                src += src.includes('?') ? '&' : '?';
                src += `${encodeURIComponent(state.key)}=${encodeURIComponent(state.value)}`;
            }
        });

        // 以下の条件を追加して、再読み込みの必要性をチェック
        if (!iframeLoaded || (utterance && lastUtterance !== utterance)) {
            if (utterance) {
                src += src.includes('?') ? '&' : '?';
                src += "utterance=" + encodeURIComponent(utterance);
            }
            iframe.src = src;
            iframeLoaded = true;
            lastUtterance = utterance;
        }
    } else {
        chatbox.style.display = 'none';
    }
}
// イベントリスナーを設定する関数
function setupEventListeners() {
    document.querySelectorAll('.chatButton').forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            const utterance = button.getAttribute('data-utterance');
            const statesData = button.getAttribute('data-states');
            let states = [];
            try {
                // JSON 形式の文字列をオブジェクトに変換
                const statesObj = JSON.parse(statesData);
                // オブジェクトから key-value ペアの配列を生成
                states = Object.keys(statesObj).map(key => ({ key, value: statesObj[key] }));
            } catch (e) {
                console.error("Error parsing states data", e);
            }

            toggleChatbox(utterance, ...states);
        });
    });
}

// メイン実行部
addStylesheet('https://fonts.googleapis.com/icon?family=Material+Icons');
addStylesheet('./chat3.css');
//createToggleButton();
createChatbox();
setupEventListeners();

var iframeLoaded = false; // iframeがロードされたかどうかを追跡するフラグ
var lastUtterance = ""; // 最後に発話した内容を追跡するフラグ

//--------------------------------------ドラッグで並び替える関数----------------------------------
function drag() {
    const items = target.getElementsByTagName("li");
    let current;

    for (let item of items) {
        item.draggable = true;
        item.ondragstart = () => {
            current = item;
            for (let i = 0; i < items.length; i++) {
                if (items[i] !== current) {
                    items[i].classList.add("hint");
                }
            }
        };
        item.ondragenter = () => {
            if (item !== current) {
                item.classList.add("active");
            }
        };
        item.ondragleave = () => {
            item.classList.remove("active");
        };
        item.ondragend = () => {
            for (let i = 0; i < items.length; i++) {
                items[i].classList.remove("hint", "active");
            }
        };
        item.ondragover = (ev) => {
            ev.preventDefault();
        };
        item.ondrop = (ev) => {
            ev.preventDefault();
            if (item !== current) {
                let currentPosition = 0;
                let droppedPosition = 0;
                for (let i = 0; i < items.length; i++) {
                    if (current === items[i]) {
                        currentPosition = i;
                    }
                    if (item === items[i]) {
                        droppedPosition = i;
                    }
                }
                if (currentPosition < droppedPosition) {
                    item.parentNode.insertBefore(current, item.nextElementSibling);
                } else {
                    item.parentNode.insertBefore(current, item);
                }
            }
            dragCheck();
        };
    }
}

//現在の並びが正しいか判別
function dragCheck(){
    var seqence = [...document.querySelectorAll("ul li")].map(e => e.innerText);
    var seqence_str = "";
    for (var i = 0; i < seqence.length; ++i) {
        seqence_str += seqence[i];
        if (i == seqence.length - 1) break;
        seqence_str += " ";
    }
    
    if(seqence_str == result[currentword]['文章']){
        random();
        nameText.value = '';
    }
}

//モード切替チェックボックス
mode.addEventListener('click', () => {
    if(mode.checked == true){
        console.log("checked");
        choice.hidden = true;
        nameText.hidden = true;
        choicelist.hidden = false;
    }else{
        console.log("unchecked");
        choice.hidden = false;
        nameText.hidden = false;
        choicelist.hidden = true;
    }
});
