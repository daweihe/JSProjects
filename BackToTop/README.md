`scrollTop/scrollLeft`是可读可写属性。这两个属性代表的是滚动条卷去的高度/宽度。

`box.scrollTop = 0`  直接回到容器的顶部。

`scrollTop`存在边界值。
```
box.scrollTop = -1000;
console.log(box.scrollTop);  // 0
```
可见最小值为0。

最大值是真实的高度减去当前容器一屏幕的高度：`box.scrollHeight-box.clientHeight`。

这个属性一个很好的示例就是网页中经常出现的回到顶部功能。

回到顶部功能实战
回到顶部功能除了上面需要的`scrollTop/scrollLeft`之外，还需要以下几个要素：
- 总时间（duration）：规定滚动条回到顶部总共需要的时间(ms)
- 频率(interval):多长时间走一步
- 总距离(target)：当前位置(scrollTop)-目标位置(0)
- 步长(step)：走一次的距离-> (target/duration)*interval
