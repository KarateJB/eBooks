# Adapter 適配器模式

## 需求描述

Amy(PO):
> As a 資料分析者
> I want 系統可以介接XX店家二代卡機傳回來的EDI並整理資料後存放在資料庫
> So that 我們可以在資料庫做進一步客戶分析


## 思考設計

Hachi:<br> 
(看了一下先前已完成的[User Story](https://ithelp.ithome.com.tw/articles/10193177))
疑，這個新的User Story是表示現在店家同時有一代和二代卡機嗎？ 所以我們必須同時處理兩種EDI格式？

JB:<br>
是的，但是我們之前已經建立該店家EDI的Interpreter，而且新的卡機只是在交易資料後面加上幾個和我們無關的字元。
難道沒辦法直接使用嗎？

Hachi:<br>
我不太確定這樣做是否符合SRP(單一職責原則)，我想應該建立一個新的Interpreter?

Lily:<br>
Hachi的考慮是對的，不過既然我們有現成的Interpreter可以共用，何不試著用Adapter模式將新卡機的資料轉換後再丟給舊的interface處理，應該可以解決這個問題。


JB:<br>
對! 就像萬用轉接頭一樣。


## 定義

> 通過轉換已經存在類別的接口以適應而不改變它。([WIKI](https://en.wikipedia.org/wiki/Adapter_pattern))<br>
> Adapter分成兩種：<br>
> 1. 繼承 (Class way)
> 2. 組合 (Object way)



