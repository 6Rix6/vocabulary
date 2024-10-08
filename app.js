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
    const btn03 = document.querySelector('.btn03');
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
        maxnumber = max.value - 1;
        minnumber = min.value - 1;
        currentnumbers = 0;
        list = [];
        wrong = [];
        ReTable.innerText = '';
        nameText.value = '';
        cerebrate.innerText = '';
        ans.innerText = '';
        view();
        console.log(maxnumber);
        console.log(minnumber);
        random();
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

    skip.addEventListener('click', () => {
        ans.innerText = result[currentword]['単語'];
        wrong[currentword] = result[currentword];
    });

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
                TableMaker.make({tableId: 'resultTable', json: wrong, headers: []}); //表作りました
             }else{
                cerebrate.innerText = "congraturations!!";
                console.log("congraturations!!");
             }
      }else{
         random();
         console.log("重複");
      }
    }


    
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
        max.value = "1900";
        min.value = "1"
        getrange();
        //console.log(result.length);
        view();
    });


    //入力時の処理
    function butotnClick(){
        if(result[currentword]['単語'] == nameText.value){
            random();
            nameText.value = '';
            nametext.style.border= '2px solid #0ada58';
        }else{
            //nameText.value = '';
            nametext.style.border= '2px solid #ff9900';
        }
　　}
    
}
app();