# Singleton 單例模式

> 僅將此篇文章獻給我的致友、導師，Charles，此篇文章參考了大部分他的知識和文章，原文：[程湘之間](http://charlesbc.blogspot.tw/2009/04/design-pattern-singleton.html)

## 需求描述

Amy(PO):
> As a 業務副總<br>
> I want 在明天的新產品線上預購活動，讓預購客戶取得一個唯一的預購號碼，而且要在產品發表會螢幕上打上線上預購的數目。<br>
> So that 由這個成功的產品發表會來增加產品曝光率<br>


## 思考設計

Hachi:<br>
「在產品發表會螢幕上打上線上預購的數目」？ 
我突然想到購物節電商即時顯示的即時交易數據!

JB:<br>
你說的沒錯! 這次就是這樣搞! 
不過我比較擔心如果預購的人很零星，那個螢幕上的預購數字動很慢...或跟本不動...不就太瞎了...

Lily:<br>
別替他們擔心! 業務部的人已經評估一個預購量，讓我們在預購開始時，直接逐筆累加在螢幕上的預購數! 讓現場看起來幾秒之內我們就收到了幾萬筆預購!! 然後螢幕放個綵帶的動畫...副總上台致詞轉移焦點...結束完美的發表會!

Hachi:<br>
寫個迴圈，每秒累加一個亂數就完成這個需求了 XD

Lily:<br>
哈哈! 你學的很快! 不過我們重點是在於真正線上客戶的預購! 畢竟他們收到的預購號碼不能重複!
所以我們加上單例模式(Singleton)來滿足這個需求!


## 定義

> 確保類別只有一個實例(instance)，並提供所有對象訪問這個實例的方法。([WIKI](https://en.wikipedia.org/wiki/Singleton_pattern))


> 注意Singleton class和Static class最大的不同是它可以被實例成物件


## Singleton in C#

在C#中，我們可以將 Singleton分成以下幾種：
1. Non thread-safe
2. Thread-safe using double-check locking
3. Thread-safe, eager singleton
4. Thread-safe, lazy singleton


在實作Singleton類別前，我們先建立一個提供預購號碼的父類別：

```
public class NumberProvider
{
    protected int Counter = 0;
    public int GetNumber()
    {
        Counter++;
        return Counter;
    }
}
```

接著我們直接讓Singleton類別繼承`NumberProvider`以在主程式可以使用`GetNumber()`。
讓我們可以專注在如何確保Singleton類別永遠只有產生一個實例。



### Non thread-safe

```
public sealed class NonThreadSafeSingleton: NumberProvider
{
    private static NonThreadSafeSingleton INSTANCE = null;
    public static NonThreadSafeSingleton Instance 
    {
        get
        {
            if (INSTANCE == null)
                INSTANCE = new NonThreadSafeSingleton();

            return INSTANCE;
        }
    }
}
```

在多執行緒環境，有可能在取得實體時：`NonThreadSafeSingleton.Instance`造成在各執行緒同時判斷`INSTANCE == null`成立，而重複建立`INSTANCE`的情況。

例如在單元測試程式模擬同時有十位客戶(10 Threads)作線上預購，結果使用Non thread-safe Singleton造成其中五位客戶產生了重複的預購號碼： 1 和 2 。

(19)陳 先生預購2組: *1* *2* 
(21)施 先生預購2組: *1* *2* 
(20)謝 先生預購2組: *1* *2* 
(22)林 先生預購2組: *1* *2* 
(8)林 先生預購2組: *1* *2* 
(8)李 先生預購2組: *11* *12* 
....

PS. 以上輸出格式為 (執行緒ID) XXX預購N組: 預購號碼


### Thread-safe using double-check locking

我們改採用`lock(object)`來確保同時只有一條thread可以建立instance。

```
public sealed class DoubleCheckSingleton: NumberProvider
{
    private static DoubleCheckSingleton INSTANCE = null;
    static readonly object padlock = new object(); //用來LOCK建立instance的程序。
    public static DoubleCheckSingleton Instance
    {
        get
        {
            if (INSTANCE == null)
            {
                lock (padlock) //lock此區段程式碼，讓其它thread無法進入。
                {
                    if (INSTANCE == null)
                    {
                        INSTANCE = new DoubleCheckSingleton();
                    }
                }
            }
            return INSTANCE;
        }
    }
}
```

### Thread-safe, eager singleton

比較簡潔的Singleton寫法，在宣告`INSTANCE`時即建立實體，所以加載此類別時實體會立即被建立。

```
public sealed class EagerSingleton: NumberProvider
{
    private static EagerSingleton INSTANCE = new EagerSingleton();
    public static EagerSingleton Instance 
    {
        get
        {
            return INSTANCE;
        }
    }
}
```

### Thread-safe, lazy singleton

不同於Eager Singleton，Lazy Singleton只會在真正使用到實體時才建立。

```
public sealed class LazySingleton : NumberProvider
{
    public static LazySingleton Instance
    {
        get
        {
            return InnerClass.instance;
        }
    }
    class InnerClass
    {
        static InnerClass()
        {
        }
        internal static readonly LazySingleton instance = new LazySingleton();
    }
}
```

以上除了Non thread-safe Singleton，其他皆可確保在多執行緒環境下建立單例實體。
但是要注意在操作這些單例類別裡面的變數時，也需要確保它的存取是Thread safe的。
所以我們更新`NumberProvider`裡面的`GetNumber()`方法如下：

```
public class NumberProvider
{
    private static readonly object numberBlock = new object();
    protected int Counter = 0;
    public int GetNumber()
    {

        lock (numberBlock)
        {
            Counter++;
            return Counter;

        }
    }
}
```

這樣就可以確保在多個客戶同時線上預購時，不會取到相同的號碼。


## Singleton in Python

https://stackoverflow.com/questions/31875/is-there-a-simple-elegant-way-to-define-singletons
https://stackoverflow.com/questions/6760685/creating-a-singleton-in-python



## Sample Codes

1. C#
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/CSharp/DP.Domain/Samples/Singleton)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.UnitTest/UtSingleton.cs)

2. Python
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/Python/Samples/Singleton)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/Python/Samples/Singleton/UtSingleton.py)

## Reference
- [程湘之間 - Design Pattern: Singleton 的型式](http://charlesbc.blogspot.tw/2009/04/design-pattern-singleton.html)
- [Implementing the Singleton Pattern in C# (C# in Depth)](http://csharpindepth.com/Articles/General/Singleton.aspx)
