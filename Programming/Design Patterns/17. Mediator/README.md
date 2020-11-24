# Mediator 中介者模式

## 需求描述

Amy(PO):
> As a 銀行行員<br>
> I want 計算客戶評分時，可採用: <br>
> 1. 各金融商品之評分模型但分別給與權重
> 2. 各金融商品之評分模型，加總後作平均
>
> So that 參考各模組之評分，達到KYC客戶風險評估之目的<br>


## 思考設計

Hachi:<br>
我們已經有各金融商品之評分模型，我們只要在每個金融商品建立一個評分方法，然後利用這些評分模組來計算分數即可。

JB:<br>
聽起來我們需要在每一個金融商品再多加兩個方法，一個是權重計分，一個是平均總分! 那可得花一些時間!

Lily:<br>;
而且會太依賴於其他金融商品的評分模型，我們來建立一個中介者來幫所有金融產品計算客戶分數如何？

JB:<br>
讓一個人負責當窗口的概念嗎，聽起來不錯! 如果分數不正確的話，至少我們可以先找那個負責的窗口(笑)。



## 定義

> 定義一個封裝了各組互動的對象的中介者，使這些對象避免明確直接引用來解除耦合度，並且可以獨立地改變他們的互動的方式。([WIKI]())

以這個案例來說，如果讓每個金融商品去引用其他金融商品的評分模型，其關係會像下圖一的網絡圖。 而採用中介者模式後，他們的關係會如圖二的星狀圖，以讓他們之間形成低耦合的關係。

### 圖一
![](https://4.bp.blogspot.com/-F7zjjZU-9uI/Wk29xB1-7YI/AAAAAAAAFo0/6xqmucNSuVkVMOXmG5PoaL8WIUiUuVmsgCLcBGAs/s1600/Mediator_network.png
)

### 圖二
![](https://3.bp.blogspot.com/-WoQHVD9Jdv0/Wk29wxc0BgI/AAAAAAAAFow/udYSki2LaogZW7w7nVJ-lssFcnqEuZltACLcBGAs/s1600/Mediator_star.png)


在中介者模式(Mediator)中定義兩種角色(各自需建立抽象及實作類別):
1. Colleague : 合作的對象，並且透過Mediator與其他對像溝通
2. Mediator : 中介者，他知道所有合作的對象，並且協調這些對像協同作業

### UML
![](https://1.bp.blogspot.com/-9TaM1bPBIs4/Wk3JD4bfIsI/AAAAAAAAFpQ/CbksJR_aDBcPB1wFG7nj4Q8X_Ehdl9QUACLcBGAs/s640/Mediator.png)

我們開始來實作這個需求。

## Colleague

* C#
```
public interface IColleague
{
    //產品名稱
    string Prod { get; set; }
    //評分
    decimal Score();

    IMediator Mediator { get;set; }
}

/// 選擇權評分模型
public class OptionColleague : IColleague
{
    public string Prod { get; set; } = "期貨/選擇權";
    public IMediator Mediator { get; set; }

    public OptionColleague(IMediator mediator=null)
    {
        this.Mediator = mediator;
    }
    public decimal Score()
    {
        //Implement the real score model here.
        return 10;
    }
}

///信貸評分模型(CreditColleague)及房貸評分模型(LoanColleague)請參考選擇權評分模型(OptionColleague)實作。
```

* Python
```
from abc import ABC, abstractmethod
from Mediator import Mediator


class Colleague(ABC):
    @property
    @abstractmethod
    def mediator(self):
        pass

    @mediator.setter
    @abstractmethod
    def mediator(self, val=Mediator):
        pass

    @abstractmethod
    def score(self):
        pass


class OptionColleague(Colleague):
    """選擇權評分模型"""
    
    _mediator = None

    def __init__(self):
        self.prod = "期貨/選擇權"

    @property
    def mediator(self):
        return self._mediator

    @mediator.setter
    def mediator(self, val=Mediator):
        self._mediator = val

    def score(self):
        # Implement the real score model here.
        return 10


# 信貸評分模型(CreditColleague)及房貸評分模型(LoanColleague)請參考選擇權評分模型(OptionColleague)實作。
```


### Mediator

* C#
```
public interface IMediator
{
    IColleague Option { get; set; }
    IColleague Credit { get; set; }
    IColleague Loan { get; set; }

    decimal Score();
}

public class MediatorWeight : IMediator
{
    public IColleague Option {get;set;}
    public IColleague Credit {get;set;}
    public IColleague Loan {get;set;}

    private decimal _weightOption = 0;
    private decimal _weightCredit = 0;
    private decimal _weightLoan = 0;

    public MediatorWeight(decimal weightOption, decimal weightCredit, decimal weightLoan)
    {
        this._weightOption = weightOption;
        this._weightCredit = weightCredit;
        this._weightLoan = weightLoan;

        this.Option = new OptionColleague();
        this.Credit = new CreditColleague();
        this.Loan = new LoanColleague();
    }
    public decimal Score()
    {
        decimal scoreOption = this.Option.Score()* this._weightOption;
        decimal scoreCredit = this.Credit.Score()* this._weightCredit;
        decimal scoreLoan = this.Loan.Score()* this._weightLoan;

        return  scoreOption + scoreCredit + scoreLoan; 
    }
}
```

* Pyhton
```
from abc import ABC, abstractmethod

class Mediator(ABC):

    def __init__(self):
        self.option = None
        self.credit = None
        self.loan = None

    @abstractmethod
    def score(self):
        pass


class MediatorWeight(Mediator):

    def __init__(self, weightOption, weightCredit, weightLoan):
        self.option = OptionColleague()
        self.credit = CreditColleague()
        self.loan = LoanColleague()

        self.weightOption = weightOption
        self.weightCredit = weightCredit
        self.weightLoan = weightLoan

    def score(self):
        scoreOption = self.option.score() * self.weightOption
        scoreCredit = self.credit.score() * self.weightCredit
        scoreLoan = self.loan.score() * self.weightLoan

        return scoreOption + scoreCredit + scoreLoan
```


我們來看主程式如何應用中介者模式：
1. 找到該對像的中介者 (需要很多人幫忙時，先找這個專案負責人)
2. 請中介者發出執行的命令，協調大家開始作業 (專案負責人知道這件事需要哪些人幫忙，請他們一起進來協助作業)

* C#
```
var weightsForOption = new decimal[] { 0.2M, 0.5M, 0.8M };

 //Create Mediator for Option
IMediator mediatorForOption = 
     new MediatorWeight(weightsForOption[0], weightsForOption[1], weightsForOption[2]);
IColleague option = new OptionColleague(mediatorForOption);
//Score!
var score = option.Mediator.Score();

Trace.WriteLine($"{option.Prod} 權重計分結果={score.ToString()}");
```
執行結果： *期貨/選擇權 權重計分結果=36.0*


* Python
```
mediatorForOption = MediatorWeight(
            weightsForOption[0], weightsForOption[1], weightsForOption[2])
option = OptionColleague()
option.mediator = mediatorForOption
score = option.mediator.score()  # Score!
print("{0} 權重計分結果={1}".format(option.prod, score))

```
執行結果： *期貨/選擇權 權重計分結果=36.0*


考慮如果我們要抽換某種產品的計分方式，例如取自己和其他評分模型的平均值。
作法如下：

* C#

1. 定義新的Mediator
```
public class MediatorAverage : IMediator
{
    public IColleague Option { get; set; }
    public IColleague Credit { get; set; }
    public IColleague Loan { get; set; }

    private decimal _weightOption = 0;
    private decimal _weightCredit = 0;
    private decimal _weightLoan = 0;

    public MediatorAverage()
    {
        this.Option = new OptionColleague();
        this.Credit = new CreditColleague();
        this.Loan = new LoanColleague();
    }
    public decimal Score()
    {
        decimal scoreOption = this.Option.Score();
        decimal scoreCredit = this.Credit.Score();
        decimal scoreLoan = this.Loan.Score();
        decimal totalScore = (scoreOption + scoreCredit + scoreLoan) / 3;
        Trace.WriteLine($"平均計分結果={totalScore.ToString()}");

        return totalScore;
    }
}
```

2. 主程式抽換中介者
```
IMediator mediator = new MediatorAverage();
IColleague loan = new LoanColleague(mediator);
//Score!
decimal actualLoanScore = loan.Mediator.Score();
```

執行結果： *房貸 平均計分結果=20*


* Python

1. 定義新的Mediator
```
class MediatorAverage(Mediator):

    def __init__(self):
        self.option = OptionColleague()
        self.credit = CreditColleague()
        self.loan = LoanColleague()

    def score(self):
        scoreOption = self.option.score()
        scoreCredit = self.credit.score()
        scoreLoan = self.loan.score()

        return (scoreOption + scoreCredit + scoreLoan) / 3

```

2. 主程式抽換中介者
```
mediator = MediatorAverage()
loan = LoanColleague()
loan.mediator = mediator
score = loan.mediator.score()

print("{0} 平均計分結果={1}".format(loan.prod, score))
```

執行結果： *房貸 平均計分結果=20*




## Sample Codes

1. C#
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/CSharp/DP.Domain/Samples/Mediator)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.UnitTest/UtMediator.cs)

2. Python
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/Python/Samples/Mediator)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/Python/Samples/Mediator/UtMediator.py)

