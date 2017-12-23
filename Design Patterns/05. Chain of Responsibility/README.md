# Chain of Responsibility 職責鍊模式

## 需求描述

Amy(PO):
> As a 產品經理
> I want 多國語系介面
> So that 顯示使用者對應的語系內容。


## 思考設計

Hachi:<br> 
我看了一下DoD(Definition of Done)，系統需要支援繁、簡中和英文。 所以只要前端能丟給我一個語系的參數，我就能從資料庫抓出對應的語系內容。 我只是對於這段Switch判斷有些疑問... (指了以下程式碼)

```
var content = new Content();
switch(localization)
{
    case "zh-TW":
       content.City = DataFactory.CityZh;
       content.Country = DataFactory.CountryZh;
       break;
    case "zh-CN":
       content.City = DataFactory.CityCn;
       content.Country = DataFactory.CountryCn;
       break;
    default:
       content.City = DataFactory.CityEn;
       content.Country = DataFactory.CountryEn;
       break;
}
```

JB:<br>
恩，我看不出來有什麼問題耶？

Hachi:<br>
程式碼太長了；而且未來如果我們需要支援更多語系，這個Switch會越來越龐大。

JB:<br>
我很想幫你，可是我現在得去開一個EPR的會議。天啊! 他們總是搞不清楚職責，ERP不是我們Team負責的，他們應該丟給...

Hachi:<br>
等等! 你提到了"職責"？ 感謝你! 我想可以用職責鍊模式來重構這段程式碼! 


## 定義

> 根據條件來定義一個有責任的接收者，以處理一個請求或將其轉發給鏈上的下一個接收者（如果有的話）([WIKI](https://en.wikipedia.org/wiki/Chain-of-responsibility_pattern))

Chain of Responsibility(職責鍊)大概是我們最容易理解的設計模式，因為我們每天都想盡辦法在實現它。
例如：


老闆交代了一件工作給PM =>
PM`判斷此事優先權極高`，立即跟資深工程師說有插件，做吧! =>
資深工程師`判斷此事不急且快下班了`，說我有事，菜鳥做吧! =>
菜鳥工程師`看了一下沒人可以往後丟了`，摸摸鼻子做事去了 => 結束


開玩笑地，相信大家的團隊應該是這樣：

老闆交代了一件工作給PM =>
PM`整理了一些資訊`，再交給資深工程師 =>
資深工程師`判斷此事極容易`所以直接`寫完程式碼並做單元測試` => 結束


也就是說在每個Chain上的接收者可以選擇直接做事，或是判斷條件後選擇**做事**或**往後丟**。
我們要練習的多國語系案例比較偏向**不符合我的職責就往後丟**的情況。


建立`IHandler`介面和職責鍊的頭(大家有事先找PM處理的概念)：`Handler`。
注意PM的職責是什麼？把東西往後丟嘛，不過丟給誰我們等下再來決定。


* C#

```
public interface IHandler
{
    IHandler Next { get; }
    Content Action(string localization);
}

public class Handler : IHandler
{
    public IHandler Next { get; set; }

    public Content Action(string localization)
    {
        return this.Next.Action(localization);
    }
}
```



* Python


