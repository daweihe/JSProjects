�����ѧϰjs�ı������û�뵽�������۵ı������ʵ����ȴ�������ڶ�JS֪ʶ�㡣�������¼һ�´˴�ѧϰ���̡�ϣ���Դ��Ҳ����������

�����ı�������漰��������Щ֪ʶ�㣺
- call����ʹ��
- sort��������
- ���ݰ�
- DOMӳ��


������ϸ���ܽ�һ����Щ֪ʶ�㣬�������Щ֪ʶ��ʵ����������һ�������������
![�������](http://chuantu.biz/t6/167/1512474980x-1566657547.gif)

## һ��֪ʶ���ܽ�
### 1��call����ʹ��
call�����������Ǹı䷽���е�thisָ��

call��������Ƕ�����`Function.prototype`�ķ��������Ƕ�����κ�һ��������������Ϊ����`Function`������һ��ʵ������ô�Ϳ���ͨ��ʵ����`__proto__`�����ҵ��������ԭ�͡��κ�һ�����������Ե���`call`��`apply`�ȷ�����

������һ�����ӣ�
```
var obj = {
    name : 'JS'
}

function testCall () {
    console.log(this);
}

testCall.call( obj );     // {name: "JS"}
```

���Ⱥ���`testCall`ͨ��ԭ�������һ����ҵ�call����ִ�У�call������ִ�й����аѵ���call�����������ʵ���е�this���ı��call�ĵ�һ������������������call���������ʵ������ִ�С�

��������Ŀ��
```
function fn1() {
    console.log(1);
    console.log(this);
}

function fn2() {
    console.log(2);
    console.log(this);
}

fn1.call(fn2);   //this -> fn2
fn1.call.call(fn2);   //�����call�Ǹı�function.__proto__.call��call�����е�this���൱��ִ�в���
```


call������ִ�е�ʱ��call�����ĵ�һ�������������ı�this�ģ����ӵڶ���������ʼ���Ǵ�������call�ĺ����Ĳ�����

�ڷ��ϸ�ģʽ�£���call���������ݲ��������ߴ���null��undefined��this����ָ��`window`��
```
sum.call(); //window
sum.call(null); //window
sum.call(undefined); //window
```

�ϸ�ģʽ��callִ�е�ʱ��ͷ��ϸ�ģʽ��ͬ��
```
sum.call(); //undefined
sum.call(null); //null
sum.call(undefined); //undefined
```

����ʹ��call����ʵ��һ��������ת��Ϊ����ķ�����
```
function listToArray (likeAry) {
    var ary = [];
    try {
        ary = Array.prototype.slice.call(likeAry);
    } catch (e) {
        for (var i = 0; i < likeAry.length; i ++) {
            ary[ary.length] = likeAry[i];
        }
    }
    return ary;
}
```

��call���Ƶķ�������apply��bind������������ܽ�һ�¡�

apply���������ú�call����һģһ����ֻ�Ǵ��ε���ʽ��̫һ����apply�������Ĳ������������������
```
function sum(num1, num2) {
    console.log(num2 + num1);
    console.log(this);
}

sum.apply(null,[100,200]);
```

bind����ͬ��Ҳ�������ı�this�ؼ��ֵģ�������ֻ�ǽ����ı�thisָ�򣬲�����ִ�е���this�ĺ�����
```
function sum(num1, num2) {
    console.log(num2 + num1);
    console.log(this);
}

var obj = {name : 'zx'}

var temp = sum.bind(obj);   //temp�Ѿ��Ǳ��ı���this�ĺ���
temp(100,200);              //��������Ҫ��ʱ���ִ��


//��������������
var temp = sum.bind(null, 100, 200);
temp();
```

bind����������js�е�Ԥ����˼�롣

### 2�� sort��������
����֪�������`sort`����ֻ������10���ڵ����顣�����Ҫ����������д��ڴ���10�����֣����Ǿ���Ҫ��`sort`�����д���ص���������������������
```
ary.sort(function (a,b) {
    return a - b;
}); 
```
��������ʵ�����������������ô���������ԭ������ʲô�أ�

���ڴ��������������`a`��������ҵ��������еĵ�ǰ�`b`������ǵ�ǰ��ĺ�һ�

- `return a -b` �� ���a����b�����ؽ����a��b����λ�á����aС��b����ôa��bλ�ò��䡣 ������������
- `return b -a` �� ���b����a�����ؽ����a��b����λ�á����aС��b����ôa��bλ�ò��䡣 ���ǽ�������


�˽��˻���ԭ��󣬶�������һ����ά���飬���ʵ�ְ���������
```
var persons = [{
    name:'dawei',
    age:55
},{
    name:'ahung',
    age:3
},{
    name:'maomi',
    age:2
},{
    name:'heizi',
    age:78
},{
    name:'afu',
    age:32
}];
```
��ʵ�ܼ򵥣�
```
ary.sort(function(a,b){
    return a.age - b.age;
});
```

���������������Ҫ�漰�ַ�����`localeCompare()`������
```
ary.sort(function(a,b){
    return a.name.localeCompare(b.name);
});
```

`name.localeCompare()`�����������������ַ�������ĸ���бȽϣ����ǰһ���ַ����ĵ�һ����ĸ��24��Ӣ����ĸ�г��ֵ�λ�ñȺ�һ���ַ����ĵ�һ���ַ����ֵ�λ�ÿ�ǰ�����϶���һ���ַ���С������`-1`��������ֵ�λ�ÿ������϶���һ���ַ����󣬷���1��������Ƚϵ��ַ���ȡ���Ƚ���һ���ַ���

���������ʵ�ã������ڰ��������򣬶��ں��֣��÷������Զ�������ת��Ϊ����ƴ�����бȽϡ�

### 3�����ݰ�
��js��һ��ʹ�ö�̬�󶨻���ƴ���ַ����ķ�ʽʵ�����ݰ󶨡�

��̬�󶨣�
```
//aryΪ��Ҫ��ӵ�ҳ���е���������
var oDiv = document.getElementById("box");//��ȡ����
var myUl = oDiv.getElementsByTagName("ul")[0];//��ȡ�б�

var arrLength = ary.length;
for (var i = 0;i < arrLength ; i ++)
{  //��̬����Ԫ��
	var oli = document.createElement("li");
	oli.innerHTML = '<span>' + (i + 5) + '</span>' + ary[i].title;
	myUl.appendChild(oli);//��̬���Ԫ��
}
```
ÿ���һ�ξͻ�����һ��DOM������������������������������Ӱ�����ܡ�

����DOM�Ļ������ػ棬�Ƽ���ҿ�һ����ƪ���£�http://www.css88.com/archives/4996

ƴ���ַ�����
```
var str = "";
for(var i=0; i<ary.length; i++){
    str += '<li>';
    str += '<span>';
    str += (i+5);
    str += '</span>';
    str += ary[i].title;
    str += '</li>';
}

myUl.innerHTML += str;
```
���ַ�ʽ��Ȼֻ����һ�λ�������������ȥ��ԭ�����ڵ�Ԫ�������е��¼������ԡ��������Ϊ�б��е�li��ǩ���������룬������ɫ���¼�����ô���ַ�����ʹ����¼�ʧЧ��

Ϊ�˽��������������ݰ󶨷������������⣬����ʹ���ĵ���Ƭ��������ݡ�

```
var frg = document.createDocumentFragment();//�����ĵ���Ƭ
for (var i =0; i <ary.length ;i ++ ){
	var li = document.createElement("li");
	li.innerHTML = '<span>' + ( i + 5 ) + '</span>' + ary[i].title;
	frg.appendChild(li);//�����ݶ�̬������ĵ���Ƭ��
}
myUl.appendChild(frg); //������һ������ӵ�ҳ����
frg = null;  //�ͷ��ڴ�
```
������ֻ����һ��DOM�������ֻᱣ��ԭ�����ڵ��¼���

### 4��DOMӳ��
DOMӳ����ƣ���νӳ�䣬����ָ����Ԫ�ؼ�֮��Ԫ���໥����Ӧ���Ĺ�ϵ��ҳ���еı�ǩ���Ϻ���JS�л�ȡ����Ԫ�ض���Ԫ�ؼ��ϣ����������Ĺ�ϵ�����ҳ���е�HTML��ǩ�ṹ���ͱ仯����ô�����ж�Ӧ������Ҳ������Զ��ı䡣

```
<ul id="myul">
	<li>1</li>
	<li>2</li>
	<li>3</li>
	<li>4</li>
	<li>5</li>
</ul>
```

��������һ���б�ʹ�����нű���
```
var myul = document.getElementById("myul");
var mylis = myul.getElementsByTagName('li');
	for (var i = mylis.length - 1 ; i >= 0; i --) {
	    myul.appendChild(mylis[i]);
	}
console.log(mylis.length);   // 5
```
����ȡ�����б�Ԫ�ط������²���ul�У���ôul�б��������������
```
<ul id="myul">
    <li>5</li>
    <li>4</li>
    <li>3</li>
    <li>2</li>
    <li>1</li>
</ul>
```
���ǿ����б�ĳ�����Ȼ��5��ֻ��λ�õߵ��ˡ�������Ϊÿ��li��ǩ��JS�л�ȡ�ı�ǩ�������һ����Ӧ��ϵ����ĳ����ǩ�����²��뵽ҳ����ʱ��ҳ���ж�Ӧ�ı�ǩ���ƶ��������λ�á������DOMӳ�䡣

## ����ʵ�ֱ������
### 1��ʹ��ajax��ȡ����
֮����ʹ�ö�̬��ȡ���ݣ���Ϊ��ʹ���ĵ���Ƭ�����ݡ�
```
var res = ''; //����һ��ȫ�ֱ�������������
var xhr = new XMLHttpRequest();
xhr.open('get', 'date.txt', false);
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        res = JSON.parse(xhr.responseText);
    }
}
xhr.send(null);
```
��ʱ���ݾͱ�������`res`���ȫ�ֱ���֮�С�

### 2��ʹ���ĵ���Ƭ������
```
var frg = document.createDocumentFragment();
for (let i = 0; i < res.length; i++) {
    var tr = document.createElement("tr");
    for (key in res[i]) {
        var td = document.createElement("td");
        td.innerHTML = res[i][key];
        tr.appendChild(td);
    }
    frg.appendChild(tr);
}
tbody.appendChild(frg);
```

### 3���Ա���������
�����漰�ĵ�϶�
```
//Ϊ������ӵ���¼�
for (let i = 0; i < ths.length; i++) {
    let curTh = ths[i];
    curTh.sortFlag = -1; //���ڶ��н�������������
    curTh.index = i; //��¼��ǰ����е������������������
    if (curTh.className == 'sort') {
        curTh.onclick = function() {
            sort.call(this); //�ı���������this��ָ������ָ��ǰ�����
        }
    }
}


//���򷽷�
function sort() {
    //������Ԫ�ؽ�������
    let target = this; //���ｫthisȡ������Ϊ��sort��������Ҫʹ�ø�this������sort�������this�ǵ��÷���������
    this.sortFlag *= -1; //1 ��������   -1������
    let ary = listToArray(bodyTrs); //��ȡbody����
    ary = ary.sort(function(a, b) {
        let one = a.cells[target.index].innerHTML;
        let two = b.cells[target.index].innerHTML;
        let oneNum = parseFloat(one);
        let twoNum = parseFloat(two);

        if (isNaN(oneNum) || isNaN(two)) {
            return one.localeCompare(two) * target.sortFlag;
        } else {
            return (oneNum - twoNum) * target.sortFlag;
        }
    });
    //���ź������������д��ҳ��
    let frg = document.createDocumentFragment();
    for (let i = 0; i < ary.length; i++) {
        rg.appendChild(ary[i]);
    }
    tbody.appendChild(frg);
    frg = null;

    //���ĳ��ʱ��Ҫ�������е������־�ָ�Ϊ-1�����´��ٵ������һ����ǩʱ����Ĭ������������
    for (let i = 0; i < ths.length; i++) {
        if (ths[i] != this) {
            ths[i].sortFlag = -1;
        }
    }
}
```