# Adapter 適配器模式

## 需求描述

Amy(PO):
> As a 匯入訂單的秘書<br>
> I want 在系統可以同一個上傳功能提供匯入多種格式的訂單Excel<br>
> So that 提升上傳訂單的效率


## 思考設計

JB:<br> 
我們已經有既定格式的匯入API了，現在該如何處理這些不同格式的訂單檔案？

Hachi:<br>
或許我們只要讓這些訂單變的和我們目前可以匯入的格式相同就行了!
好，我們應該使用Adapter來進行這件事。

JB:<br>
對! 就像萬用轉接頭一樣。


## 定義

> 通過轉換已經存在類別的接口以適應而不改變它。([WIKI](https://en.wikipedia.org/wiki/Adapter_pattern))<br>
> Adapter分成兩種：
> 1. 繼承 (Class way)
> 2. 組合 (Object way)



