# Interpreter 解議器模式

> Interpreter的中文也被稱為`翻譯者`或`解釋器`。


## 需求描述

Amy(PO):
> As a 資料分析者
> I want 系統可以介接店家傳回來的EDI並整理資料後存放在資料庫
> So that 我們可以在資料庫做進一步客戶分析



## 思考設計

JB:<br> 
`我們目前手上有三家特店，他們的EDI格式都不相同。Amy已經嘗試說服他們使用相同的格式但是沒有成功；我想這會造成我們的系統複雜而且很難維護! 真是一場災難!`

Lily: <br>
`我想透過Interpreter應該可以簡化這個問題。`

JB: <br>
`Interpreter? 你是指翻譯機還是一個翻議員?`

Lily: <br>
`你去買杯咖啡，然後我來告訴你。`



## Definition of Interpreter

> 定義一個表示法，使用表示法來解釋(翻譯)語言中的句子