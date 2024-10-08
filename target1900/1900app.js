const app = () => {
    const word = document.querySelector('.word');
　  const wordList = document.querySelector('.wordlist');
    const input = document.querySelector('.input');
    const str = wordList.getAttribute('data-word');
    const nametext = document.querySelector('.nameText');
    const ans = document.querySelector('.ans');
    const max = document.querySelector('.max');
    const min = document.querySelector('.min');
    //const submit = document.querySelector('.submit');
    const skip = document.querySelector('.btn04');
    const b = document.querySelector('.b');
    const c = document.querySelector('.c');
    const ReTable = document.querySelector('.resultTable');
    const cerebrate = document.querySelector('.cerebrate');
    const missedword = document.querySelector('.missedword');
    const btn03 = document.querySelector('.btn03');
    const btn05 = document.querySelector('.btn05');
    const check = document.getElementById('popup');
    let bn = 1;
    let cn = 1900;
    let currentword;
　  let maxnumber = 1899;
    let minnumber = 0;
    let currentnumbers = 0;
    let result = []; 
    let list = []; //現在までで出た単語のリスト
    let nameText = document.getElementById('nameText');
    let msg = document.getElementById('msg');
    let wrong=[];
    let currentwrong = 0;


    //画面遷移アニメーション用


    $(window).on('load',function(){
$("#splash-logo").delay(100).fadeOut('slow');//ロゴを1.2秒でフェードアウトする記述

//=====ここからローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる
$("#splash").delay(100).fadeOut('slow',function(){//ローディングエリア（splashエリア）を1.5秒でフェードアウトする記述

$('body').addClass('appear');//フェードアウト後bodyにappearクラス付与

});
//=====ここまでローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる

//=====ここから背景が伸びた後に動かしたいJSをまとめたい場合は
$('.splashbg').on('animationend', function() { 


//この中に動かしたいJSを記載
});
//=====ここまで背景が伸びた後に動かしたいJSをまとめる

});

    //-----------------------

    //単語はresult[番号][1],日本語はresult[番号][2]で取得

    nameText.addEventListener('input', butotnClick);
    //ワードリストを配列に代入
  convertCSVtoArray(str);
  function convertCSVtoArray(str){ 
     var tmp = str.split("\n"); 
 
     for(var i=0;i<tmp.length;++i){
        result[i] = tmp[i].split(',');
     }
      keysAfter = [ '番号', '単語','意味'];

        result = result.map(e => 
            Object.fromEntries(                      
                Object.entries(e).map(([k, v]) => [keysAfter[k], v])
            )
        );

      console.log(result);
    }

    //最大値、最小値の取得 初期化も兼ねてる
    const getrange = () =>{
        localStorage.setItem('max_strage', max.value);
        localStorage.setItem('min_strage', min.value);
        maxnumber = max.value - 1;
        minnumber = min.value - 1;
        currentnumbers = 0;
        list = [];
        wrong = [];
        ReTable.innerText = '';
        nameText.value = '';
        cerebrate.innerText = '';
        ans.innerText = '';
        missedword.innerText = '';
        view();
        console.log(maxnumber);
        console.log(minnumber);
        random();
        check.checked = false;
    }

    // 〇〇/〇〇〇 の処理
    const view = () => {
        bn = currentnumbers;
        cn = maxnumber -minnumber + 1;
        b.innerText = currentnumbers;
        c.innerText = maxnumber -minnumber + 1;
    }

    // submit.addEventListener('click', () => {
    //     getrange();
    // });

    btn03.addEventListener('click', () => {
        getrange();
    });

    btn05.addEventListener('click', () => {
        getrange();
    });

    skip.addEventListener('click', () => {
        ans.innerText = result[currentword]['単語'];
        wrong[currentword] = result[currentword];
    });

    nameText.addEventListener('change', changeshadow);

    //ランダム処理

    const random = () =>{
    　let ranmax = maxnumber - minnumber + 1;
      let randomize = Math.floor( Math.random() * ranmax) + minnumber;
    　if (list.includes(result[randomize]) == false && bn != cn){
        msg.innerText = result[randomize]['意味'];
        currentword = randomize;
        //sconsole.log(currentword);
        console.log(result[randomize]);
        currentnumbers += 1;
        //console.log(currentnumbers);
        list[currentnumbers] =  result[randomize];
        view();
        ans.innerText = '';
      }else if(bn == cn){
         console.log("上限"); //ここでリセットしてくれ
         console.log(wrong); 
         for(var i=0;i<wrong.length;++i){
             console.log(wrong[i]);
        }
            if (wrong.length != 0){
                missedword.innerText = "▼間違えた単語▼";
                TableMaker.make({tableId: 'resultTable', json: wrong, headers: []}); //表作りましたhyou
                check.checked = true;
             }else{
                cerebrate.innerText = "congraturations!!全問正解!";
                console.log("congraturations!!");
                check.checked = true;
             }
      }else{
         random();
         console.log("重複");
      }
    }

    //間違えた単語でもう一度

    // const random_wrong = (wrong) =>{
    //     if (list.includes(wrong[currentwrong]) == false && bn != cn){
    //     msg.innerText = wrong[currentwrong]['意味'];
    //     currentwrong += 1;
    //     console.log(wrong[currentwrong]);
    //     list[currentwrong] =  wrong[currentwrong];
    //     view();
    //     ans.innerText = '';
    //   }else if(bn == cn){
    //      console.log("上限"); //ここでリセットしてくれ
    //      console.log(wrong); 
    //      for(var i=0;i<wrong.length;++i){
    //          console.log(wrong[i]);
    //     }
    //         if (wrong.length != 0){
    //             missedword.innerText = "▼間違えた単語▼";
    //             TableMaker.make({tableId: 'resultTable', json: wrong, headers: []}); //表作りました
    //             check.checked = true;
    //          }else{
    //             cerebrate.innerText = "congraturations!!全問正解!";
    //             console.log("congraturations!!");
    //             check.checked = true;
    //          }
    //   }else{
    //      random();
    //      console.log("重複");
    //   }
        
    // }

    //ここまで
    
    //表の作成
    class TableMaker{
        // jsonはオブジェクトの配列
        static make({tableId = null, json = null, headers = []} = {}){
        const table = document.getElementById(tableId);
        if(typeof json === 'string') json = JSON.parse(json);
        table.innerHTML = this.build(json, headers);
        }

        static build(json, headers){
            const rows = json.map(row => {
                if(headers.length === 0) headers = Object.keys(row);
                const tdsStr = headers.map(h => {
                let v = row[h];
                if(h === 'THUMBNAIL') v = `<img src="${v}">`;
                return `<td class="${h}">${v}</td>`;
            }).join('')
            return `<tr>${tdsStr}</tr>`;
            });
        const thsStr = headers.map(h => `<th class="${h}">${h}</th>`).join('');
        const rowsStr = rows.join('');
        return `<thead><tr>${thsStr}</tr></thead><tbody>${rowsStr}</tbody>`;
        }
    }

    
    window.addEventListener('DOMContentLoaded', () => {
        max.value = localStorage.getItem('max_strage');
        min.value = localStorage.getItem('min_strage');
        getrange();
        //console.log(result.length);
        view();
    });


    //入力時の処理
    function butotnClick(){
        if(result[currentword]['単語'] == nameText.value){
            random();
            nameText.value = '';
            nameText.style.boxShadow= 'inset 3px 2px 3px 0 #0ada58, 3px 2px 3px 0 #0ada58';
        }else{
            nameText.style.boxShadow= 'inset 3px 2px 3px 0 #ff9900, 1px 1px 2px 0 #ff9900';
        }
　　}
    
    function changeshadow(){
        nameText.style.boxShadow = 'inset 1px 1px 2px 0 #333';
    }


    //埋め込みAI

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

        // チャットボックスのヘッダーを作成する関数
        function createChatboxHeader() {
            const header = document.createElement('div');
            header.id = 'chatbot-header';
            header.style.background = '#333';
            const logo = document.createElement('div');
            logo.id = 'chatbot-logo';
            logo.innerText = '単語マン';
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


    
}
app();