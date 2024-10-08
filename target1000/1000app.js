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
    const ans1 = document.querySelector('.ans1');
    const ans2 = document.querySelector('.ans2');
    const ans3 = document.querySelector('.ans3');
    const ans4 = document.querySelector('.ans4');
    let bn = 1;
    let cn = 1000;
    let currentword;
    let maxnumber = 999;
    let minnumber = 0;
    let currentnumbers = 0;
    let OneToFour;
    let fake1;
    let fake2;
    let fake3;
    let result = [];
    let list = []; //現在までで出た単語のリスト
    let nameText = document.getElementById('nameText');
    let msg = document.getElementById('msg');
    let wrong = [];


    //アニメーション用

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
        });
        //=====ここまで背景が伸びた後に動かしたいJSをまとめる

    });
    //-----------------



    //単語はresult[番号][1],日本語はresult[番号][2]で取得

    nameText.addEventListener('input', butotnClick);
    //ワードリストを配列に代入
    convertCSVtoArray(str);
    function convertCSVtoArray(str) {
        var tmp = str.split("\n");

        for (var i = 0; i < tmp.length; ++i) {
            result[i] = tmp[i].split(',');
        }
        keysAfter = ['番号', '単語', '意味'];

        result = result.map(e =>
            Object.fromEntries(
                Object.entries(e).map(([k, v]) => [keysAfter[k], v])
            )
        );

        console.log(result);
    }
    //最大値、最小値の取得 初期化も兼ねてる
    const getrange = () => {
        localStorage.setItem('1000max_strage', max.value);
        localStorage.setItem('1000min_strage', min.value);
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
        //console.log(maxnumber);
        //console.log(minnumber);
        random();
        check.checked = false;
    }

    // 〇〇/〇〇〇 の処理
    const view = () => {
        bn = currentnumbers;
        cn = maxnumber - minnumber + 1;
        b.innerText = currentnumbers;
        c.innerText = maxnumber - minnumber + 1;
    }

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

    ans1.addEventListener('click', () => {
        console.log("ans1:clicked");
        let ansnumber = 1;
        checkans(ansnumber);
    });

    ans2.addEventListener('click', () => {
        console.log("ans2:clicked");
        let ansnumber = 2;
        checkans(ansnumber);
    });

    ans3.addEventListener('click', () => {
        console.log("ans3:clicked");
        let ansnumber = 3;
        checkans(ansnumber);
    });

    ans4.addEventListener('click', () => {
        console.log("ans4:clicked");
        let ansnumber = 4;
        checkans(ansnumber);
    });

    //正誤判定
    const checkans = (ansnumber) => {
        if (ansnumber == OneToFour) {
            random();
        } else {
            console.log("間違い")
            wrong[currentword] = result[currentword];
            if (ansnumber == 1) ans1.style.color = "#ff9900";
            else if (ansnumber == 2) ans2.style.color = "#ff9900ed";
            else if (ansnumber == 3) ans3.style.color = "#ff9900";
            else if (ansnumber == 4) ans4.style.color = "#ff9900";
        }
    }

    //ランダム処理

    const random = () => {
        let ranmax = maxnumber - minnumber + 1;
        let randomize = Math.floor(Math.random() * ranmax) + minnumber;
        // fake1 = Math.floor(Math.random() * ranmax) + minnumber;
        // fake2 = Math.floor(Math.random() * ranmax) + minnumber;
        // fake3 = Math.floor(Math.random() * ranmax) + minnumber;
        fake1 = Math.floor(Math.random() * 1000) + 0;
        fake2 = Math.floor(Math.random() * 1000) + 0;
        fake3 = Math.floor(Math.random() * 1000) + 0;
        console.log(fake1);
        console.log(fake2);
        console.log(fake3);
        OneToFour = Math.floor(Math.random() * 4) + 1;
        if (list.includes(result[randomize]) == false && bn != cn) {
            if (OneToFour == 1) {
                msg.innerText = result[randomize]['意味'];
                ans1.innerText = result[randomize]['単語'];
                ans2.innerText = result[fake1]['単語'];
                ans3.innerText = result[fake2]['単語'];
                ans4.innerText = result[fake3]['単語'];
            } else if (OneToFour == 2) {
                msg.innerText = result[randomize]['意味'];
                ans2.innerText = result[randomize]['単語'];
                ans1.innerText = result[fake1]['単語'];
                ans3.innerText = result[fake2]['単語'];
                ans4.innerText = result[fake3]['単語'];
            } else if (OneToFour == 3) {
                msg.innerText = result[randomize]['意味'];
                ans3.innerText = result[randomize]['単語'];
                ans1.innerText = result[fake1]['単語'];
                ans2.innerText = result[fake2]['単語'];
                ans4.innerText = result[fake3]['単語'];
            } else {
                msg.innerText = result[randomize]['意味'];
                ans4.innerText = result[randomize]['単語'];
                ans1.innerText = result[fake1]['単語'];
                ans2.innerText = result[fake2]['単語'];
                ans3.innerText = result[fake3]['単語'];
            }
            currentword = randomize;//現在のワードの番号を保存
            console.log(result[randomize]);
            currentnumbers += 1;//今何問目？
            list[currentnumbers] = result[randomize];//出た単語をリストに代入
            view();
            ans.innerText = '';
            ans1.style.color = "black";
            ans2.style.color = "black";
            ans3.style.color = "black";
            ans4.style.color = "black";
        } else if (bn == cn) {
            console.log("上限"); //ここでリセットしてくれ
            console.log(wrong);
            for (var i = 0; i < wrong.length; ++i) {
                console.log(wrong[i]);
            }
            if (wrong.length != 0) {
                missedword.innerText = "▼間違えた単語▼";
                TableMaker.make({ tableId: 'resultTable', json: wrong, headers: [] });//表作成
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


    window.addEventListener('DOMContentLoaded', () => {
        max.value = localStorage.getItem('1000max_strage');
        min.value = localStorage.getItem('1000min_strage');
        fake1 = Math.floor(Math.random() * 1000) + 0;
        fake2 = Math.floor(Math.random() * 1000) + 0;
        fake3 = Math.floor(Math.random() * 1000) + 0;
        getrange();
        view();
    });


    //正誤判定
    function butotnClick() {
        if (result[currentword]['単語'] == nameText.value) {
            random();
            nameText.value = '';
            nametext.style.border = '2px solid #0ada58';
        } else {
            //nameText.value = '';
            nametext.style.border = '2px solid #ff9900';
        }
    }

}
app();