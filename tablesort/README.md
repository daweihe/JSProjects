最近在学习js的表格排序，没想到看不起眼的表格排序实际上却暗含了众多JS知识点。在这里记录一下此次学习过程。希望对大家也有所帮助。

完整的表格排序涉及了下列这些知识点：
- call方法使用
- sort方法深入
- 数据绑定
- DOM映射


下面详细的总结一下这些知识点，最后结合这些知识点实现下面这样一个表格排序案例。
![表格排序](http://chuantu.biz/t6/167/1512474980x-1566657547.gif)

## 一、知识点总结
### 1、call方法使用
call方法的作用是改变方法中的this指向。

call这个方法是定义在`Function.prototype`的方法。我们定义的任何一个函数都可以认为它是`Function`这个类的一个实例。那么就可以通过实例的`__proto__`属性找到所属类的原型。任何一个函数都可以调用`call`和`apply`等方法。

先来看一个例子：
```
var obj = {
    name : 'JS'
}

function testCall () {
    console.log(this);
}

testCall.call( obj );     // {name: "JS"}
```

首先函数`testCall`通过原型链查找机制找到call方法执行，call方法在执行过程中把调用call方法这个函数实例中的this都改变成call的第一个参数，接下来调用call方法的这个实例函数执行。

看两个题目：
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
fn1.call.call(fn2);   //这里的call是改变function.__proto__.call的call方法中的this，相当于执行参数
```


call方法在执行的时候，call方法的第一个参数是用来改变this的，而从第二个参数开始都是传给调用call的函数的参数。

在非严格模式下，给call方法不传递参数、或者传递null、undefined后，this都是指向`window`。
```
sum.call(); //window
sum.call(null); //window
sum.call(undefined); //window
```

严格模式下call执行的时候和非严格模式不同：
```
sum.call(); //undefined
sum.call(null); //null
sum.call(undefined); //undefined
```

下面使用call方法实现一个类数组转换为数组的方法：
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

和call类似的方法还有apply和bind方法，这里简单总结一下。

apply方法的作用和call方法一模一样，只是传参的形式不太一样，apply将函数的参数用数组包裹起来：
```
function sum(num1, num2) {
    console.log(num2 + num1);
    console.log(this);
}

sum.apply(null,[100,200]);
```

bind方法同样也是用来改变this关键字的，但是它只是仅仅改变this指向，不立即执行调用this的函数。
```
function sum(num1, num2) {
    console.log(num2 + num1);
    console.log(this);
}

var obj = {name : 'zx'}

var temp = sum.bind(obj);   //temp已经是被改变了this的函数
temp(100,200);              //当我们需要的时候才执行


//或者像这样处理
var temp = sum.bind(null, 100, 200);
temp();
```

bind方法体现了js中的预处理思想。

### 2、 sort排序深入
我们知道数组的`sort`方法只能排序10以内的数组。如果需要排序的数组中存在大于10的数字，我们就需要向`sort`方法中传入回调函数，常见的是这样：
```
ary.sort(function (a,b) {
    return a - b;
}); 
```
这样就能实现数组的升序排序。那么这样排序的原理到底是什么呢？

对于传入的两个参数：`a`代表的是找到的数组中的当前项，`b`代表的是当前项的后一项。

- `return a -b` ： 如果a大于b，返回结果，a与b交换位置。如果a小于b，那么a和b位置不变。 这是升序排序
- `return b -a` ： 如果b大于a，返回结果，a与b交换位置。如果a小于b，那么a和b位置不变。 这是降序排序


了解了基本原理后，对于这样一个二维数组，如何实现按年龄排序？
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
其实很简单：
```
ary.sort(function(a,b){
    return a.age - b.age;
});
```

如果按姓名排序，则要涉及字符串的`localeCompare()`方法：
```
ary.sort(function(a,b){
    return a.name.localeCompare(b.name);
});
```

`name.localeCompare()`这个方法会根据两个字符串的字母进行比较，如果前一个字符串的第一个字母在24个英文字母中出现的位置比后一个字符串的第一个字符出现的位置靠前，则认定第一个字符串小，返回`-1`。如果出现的位置靠后，则认定第一个字符串大，返回1。如果所比较的字符相等。则比较下一个字符。

这个方法很实用，常用于按姓氏排序，对于汉字，该方法会自动将汉字转换为汉语拼音进行比较。

### 3、数据绑定
在js中一般使用动态绑定或者拼接字符串的方式实现数据绑定。

动态绑定：
```
//ary为需要添加到页面中的数据数组
var oDiv = document.getElementById("box");//获取容器
var myUl = oDiv.getElementsByTagName("ul")[0];//获取列表

var arrLength = ary.length;
for (var i = 0;i < arrLength ; i ++)
{  //动态创建元素
	var oli = document.createElement("li");
	oli.innerHTML = '<span>' + (i + 5) + '</span>' + ary[i].title;
	myUl.appendChild(oli);//动态添加元素
}
```
每添加一次就会引起一次DOM回流，如果数据量过大，这样则会严重影响性能。

关于DOM的回流与重绘，推荐大家看一下这篇文章：http://www.css88.com/archives/4996

拼接字符串：
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
这种方式虽然只引起一次回流，但是它会去除原来存在的元素中所有的事件和属性。如果我们为列表中的li标签添加鼠标移入，背景变色的事件，那么这种方法会使这个事件失效。

为了解决上面的两种数据绑定方法带来的问题，我们使用文档碎片来添加数据。

```
var frg = document.createDocumentFragment();//创建文档碎片
for (var i =0; i <ary.length ;i ++ ){
	var li = document.createElement("li");
	li.innerHTML = '<span>' + ( i + 5 ) + '</span>' + ary[i].title;
	frg.appendChild(li);//将数据动态添加至文档碎片中
}
myUl.appendChild(frg); //将数据一次性添加到页面中
frg = null;  //释放内存
```
这样即只引起一次DOM回流，又会保留原来存在的事件。

### 4、DOM映射
DOM映射机制：所谓映射，就是指两个元素集之间元素相互“对应”的关系。页面中的标签集合和在JS中获取到的元素对象（元素集合）就是这样的关系。如果页面中的HTML标签结构发送变化，那么集合中对应的内容也会跟着自动改变。

```
<ul id="myul">
	<li>1</li>
	<li>2</li>
	<li>3</li>
	<li>4</li>
	<li>5</li>
</ul>
```

对于这样一个列表使用下列脚本：
```
var myul = document.getElementById("myul");
var mylis = myul.getElementsByTagName('li');
	for (var i = mylis.length - 1 ; i >= 0; i --) {
	    myul.appendChild(mylis[i]);
	}
console.log(mylis.length);   // 5
```
将获取到的列表元素反序重新插入ul中，那么ul列表会变成下面这样：
```
<ul id="myul">
    <li>5</li>
    <li>4</li>
    <li>3</li>
    <li>2</li>
    <li>1</li>
</ul>
```
我们看到列表的长度依然是5，只是位置颠倒了。这是因为每个li标签和JS中获取的标签对象存在一个对应关系，当某个标签被重新插入到页面中时，页面中对应的标签会移动到插入的位置。这就是DOM映射。

## 二、实现表格排序
### 1、使用ajax获取数据
之所以使用动态获取数据，是为了使用文档碎片绑定数据。
```
var res = ''; //声明一个全局变量，接收数据
var xhr = new XMLHttpRequest();
xhr.open('get', 'date.txt', false);
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        res = JSON.parse(xhr.responseText);
    }
}
xhr.send(null);
```
此时数据就保存在了`res`这个全局变量之中。

### 2、使用文档碎片绑定数据
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

### 3、对表格进行排序
这里涉及的点较多
```
//为两列添加点击事件
for (let i = 0; i < ths.length; i++) {
    let curTh = ths[i];
    curTh.sortFlag = -1; //用于对列进行升降序排列
    curTh.index = i; //记录当前点击列的索引，便于排序操作
    if (curTh.className == 'sort') {
        curTh.onclick = function() {
            sort.call(this); //改变排序函数内this的指向，让其指向当前点击列
        }
    }
}


//排序方法
function sort() {
    //对数组元素进行排序
    let target = this; //这里将this取出，因为在sort方法里需要使用该this，但是sort方法里的this是调用方法的数组
    this.sortFlag *= -1; //1 代表升序   -1代表降序
    let ary = listToArray(bodyTrs); //获取body数据
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
    //把排好序的数组重新写入页面
    let frg = document.createDocumentFragment();
    for (let i = 0; i < ary.length; i++) {
        rg.appendChild(ary[i]);
    }
    tbody.appendChild(frg);
    frg = null;

    //点击某列时，要将其他列的排序标志恢复为-1，让下次再点击任意一个标签时都是默认是升序排列
    for (let i = 0; i < ths.length; i++) {
        if (ths[i] != this) {
            ths[i].sortFlag = -1;
        }
    }
}
```
