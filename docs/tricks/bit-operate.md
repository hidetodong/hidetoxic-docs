# Javascript位操作以及实际用例探索

## Javascript位操作

[MDN相关解释](https://developer.mozilla.org/zh-CN/docs/conflicting/Web/JavaScript/Reference/Operators_7c8eb9475d97a4a734c5991857698560#Unsigned_right_shift)

按位操作符（Bitwise operators） 将其操作数（operands）当作32位的比特序列（由0和1组成），而不是十进制、十六进制或八进制数值。例如，十进制数9，用二进制表示则为1001。按位操作符操作数字的二进制形式，但是返回值依然是标准的JavaScript数值。

表格中Javascript中的按位操作符

|运算符|用法|描述|
|-|-|-|
|按位与（AND）|a & b|结果：同1为1，有0为0|
|按位或（OR）|a \|  b|结果：有1为1，其余为0|
|按位异或（XOR）|a \^  b|结果：相同为0，相反为1|
|按位非（NOT）|~a|结果：每一位取反|
|-|-|-|
|左移|a \<\< b|将a的二进制数左移b位（b<32），右边填0|
|有符号右移|a >> b|将a的二进制数右移b位（b<32），丢弃移出位|
|无符号右移|a >> b|将a的二进制数右移b位（b<32），丢弃移出位，并在左侧填0|

## 位操作使用

### 从基础开始

我们定义一个操作数```status```，以四位为例。
```javascript
let status = 0b0000
```
我们可以通过上述的操作符对status进行位操作

```javascript
// 目标位置1
status = status | 0b0010 // status = 0b0010
// 目标位检测
status = status & 0b0110 // status = 0b0000
// 目标位置反
status = status ^ 0b0110 // status = 0b0110
// 目标位取反
status = ~status         // status = -0b1011

```

### 操作规范化

为了让上面的操作更加具有可读性，我们可以封装几个处理函数
```javascript

//校验状态包上是否存在目标状态
function hasStatus(status,key){
    return status & key
}
//对状态包设置目标状态
function setStatus(status,key){
    return status | key
}
//反转状态包上的目标状态
function reverseStatus(status,key){
    return status ^ key
}
//清除状态包上的目标状态
function clearStatus(status,key){
    return status & (~key)
}

```
这样我们就完成了对目标位的读（```hasStatus```）、写(```setStatus```、```reverseStatus```、```clearStatus·```)操作

于是我们可以改写上述的操作得到

```javascript
let status = 0b0010

// 校验
if(hasStatus(status,0b1111)){ // true
    // do something
}
// 置位
status = setStatus(status,0b0001) // status = 0b0011

// 置反
status = reverseStatus(status,0b0010) // status = 0b0000

// 清除
status = clearStatus(status,0b0010) // status = 0b0000

```


## 实际用例探索
<!-- 


我们可以使用位操作来操作权限
```javascript
const statusEnum = {
    FRESHMAN:/** 大一 */0b0001,
    SOPHOMORE:/** 大二*/0b0010,
    JUNIOR:/**大三*/0b0100,
    SENIOR:/**大四*/0b1000
}

``` -->




