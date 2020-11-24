# Adapter 適配器模式

## 需求描述

Amy(PO):
> As a 資料分析者<br>
> I want 系統可以介接XX店家二代卡機傳回來的EDI並整理資料後存放在資料庫<br>
> So that 我們可以在資料庫做進一步客戶分析<br>


## 思考設計

Hachi:<br> 
(看了一下先前已完成的[User Story](https://ithelp.ithome.com.tw/articles/10193177))
疑，這個新的User Story是表示現在店家同時有一代和二代卡機嗎？ 所以我們必須同時處理兩種EDI格式？

JB:<br>
是的，但是我們之前已經建立該店家EDI的Interpreter，而且新的卡機只是在交易資料後面加上幾個和我們無關的欄位值。
難道沒辦法直接使用嗎？

Hachi:<br>
我不太確定這樣做是否符合SRP(單一職責原則)，我想應該建立一個新的Interpreter?

Lily:<br>
Hachi的考慮是對的，不過既然我們有現成的Interpreter可以用，何不試著用Adapter模式將新卡機的資料轉換後再丟給舊的interface處理。 畢竟卡機的資料格式這五年只更改過一次，而且只會將新欄位加到最後面的位置。

Hachi:<br>
當然了，卡機的資料一改，很多廠商可要跳腳了。 好的，我們就這樣做吧!


## 定義

> 通過轉換已經存在類別的接口以適應而不改變它。([WIKI](https://en.wikipedia.org/wiki/Adapter_pattern))<br>
> Adapter分成兩種：<br>
> 1. 繼承 (Class way)<br>
> 2. 組合 (Object way)

Adapter就像出國旅行用的萬用轉接頭，負責將電器的插頭(來源)轉換成插座(Adaptee)可以用的模式。 來源只統一用Adapter這個接口，而不管細節。

在[Day4](https://ithelp.ithome.com.tw/articles/10193177)我們建立了幾個Intepreter，我們先將它們封裝在Adaptee。

* C#
```
public class Adapee
{
    public virtual void Interpret(Context context)
    {
        var expressions = new List<IExpression>(){
            new PayExpression(),
            new VipExpression(),
            new StoreExpression()
        };

        expressions.ForEach(exp =>
        {
            exp.Interpret(context);
        });
    }
}
```

* Python
```
class Adaptee():
    def interpret(self, context=Context):
        expressions = [PayExpression(), VipExpression(), StoreExpression()]
        for exp in expressions:
            exp.interpret(context)
```

接下來，我們可以選擇利用以下兩種方式建立Adapter:
1. 繼承 (Class way)
2. 組合 (Object way)

在這個例子，Adapter的責任就是將來源EDI的格式整理成Adaptee適用的格式。

* C#
```
/// <summary>
/// Class way
/// </summary>
public class AdapterCls: Adapee
{
    public override void Interpret(Context context)
    {
        if(context.Input.Length>85)
            context.Input = context.Input.Substring(0,85);

        base.Interpret(context);
    }
}

/// <summary>
/// Object way
/// </summary>
public class AdapterObj
{
    private Adapee _adapee = null;

    public AdapterObj()
    {
        this._adapee = new Adapee();
    }

    public void Interpret(Context context)
    {
        if(context.Input.Length>85)
            context.Input = context.Input.Substring(0,85);

        this._adapee.Interpret(context);
    }
}
```

* Python
```
"""Class way
"""
class AdapterCls(Adaptee):
    def interpret(self, context=Context):
        if(len(context.input)>85):
                context.input = context.input[0:85]

        super().interpret(context)

"""Object way
"""
class  AdapterObj():
    _adaptee = None

    def __init__(self):
        self._adaptee = Adaptee();
        
    def interpret(self, context=Context):
        if(len(context.input)>85):
                context.input = context.input[0:85]
                
        self._adaptee.interpret(context)
```


主程式:

* C#
```
var context = new Context("EDI Data blabla ....");
var adapter = new AdapterCls();
//var adapter = new AdapterObj();
adapter.Interpret(context);

```

* Python
```
context = Context("EDI Data blabla ....")
adapter = AdapterCls()
#adapter = AdapterObj()
adapter.interpret(context)
```



## Sample Codes

1. C#
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/CSharp/DP.Domain/Samples/Adapter)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.UnitTest/UtAdapter.cs)

2. Python
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/Python/Samples/Adapter)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/Python/Samples/Adapter/UtAdapter.py)





