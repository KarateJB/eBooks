# Prototype 原型模式

## 需求描述

Amy(PO):
> As a 系統使用者<br>
> I want 降低查詢線上交易報表的回應時間<br>
> So that 提高作業效率<br>


## 思考設計

JB:
我們有個不算小的麻煩，PO在昨天的Iteration review提到我們的交易報表非常的慢，老闆希望我們盡快改善。
所以我們得優先處理這個Backlog!

Lily:
DoD(Definition of Done)有提到驗收的標準嗎？恩，我沒看到，我得知道要在幾秒內顯示資料才能提出我們的限制和假設條件。
你可以幫忙去找PO refine這個User Story嗎？ 在那之前... 我們有什麼已經知道的資訊嗎？

Hachi:
有的，我正在查詢報表模組是否支援部分資料顯示(Partial Rendering)。
另外交易系統查詢出來的每一筆資料都要回主檔資料庫查詢店家資訊，我想這是查詢緩慢的原因。

Lily:
不同交易但是店家的資訊是一樣的，幾萬筆查詢應該可以減少到十幾筆，畢竟我們的特店只有十幾家。
讓我們使用Prototype模式來複製這些重複的資訊吧!


## 定義

> Prototype屬於為Creational design patterns，