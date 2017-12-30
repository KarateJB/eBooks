# Composite 組合模式

## 需求描述

Amy(PO):
> As a 人資經理<br>
> I want 系統可以帶出任一單位的組織圖<br>
> So that 可以讓老闆容易了解目前組織架構及迅速作出人事調整<br>


## 思考設計

JB:<br> 
組織圖讓我想到樹狀結構... 問題是我們怎麼實作這一顆樹呢？

Hachi:<br>
這次我來回答吧! 設計模式裡面有一個組合模式(Composite)最適合來表示樹狀結構了!

Lily:<br>
沒錯! Composite可以讓我們快速長出一顆樹! 然後...我們可以提早結束跨年去囉! 



## 定義

> 組合模式可以表示單一和群體階層(Part-whole hierarchy)的關係，而群體為這單一物件的相同型別集合，他們有著相同的行為。

一個適合使用組合模式最明顯的例子為組織圖：

![](https://4.bp.blogspot.com/-rui5PMJ4MaY/Wkf-C0pZr7I/AAAAAAAAFnw/JQoW7hPKFygSGurLVmcGqYdFwKsjraUzQCLcBGAs/s1600/Composite.PNG)

每一個員工(node)底下可能還會有多個直屬員工(node)，讓我們用組合模式來表示這種階層關係。


