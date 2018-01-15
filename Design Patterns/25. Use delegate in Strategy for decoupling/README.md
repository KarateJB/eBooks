# Use delegate in Strategy for decoupling

在設計程式時，我們通常會不希望業務邏輯相依於實際UI元件、外部資料存取或任何業務邏輯以外的資源。
BUT... 如果我們確實會在邏輯裡面用到這些我們定義和邏輯無關的程式碼怎麼辦？

例如以下的例子...



## Scenario

設計上傳檔案並在Server side讀取後轉入資料庫的功能；
但依據上傳檔案種類的不同，在更新資料庫前，讀取已存在資料庫裡面資料的欄位與上傳檔案新的資料做計算後，再更新。

我們會將**用不同檔案，更新資料庫"這一件事用策略模式來設計，因為每一種檔案代表必須執行不同的策略來計算新的欄位值。
但是策略裡面如何讀取和更新資料庫不該是這個策略關心的點，也不應該依賴於資料存取的細節。

所以我們加入委派(delegate or Func or Action)到策略模式中來解耦合。



## Why use delegate in Strategy?

我們透過在建立策略實體時，一併提供包裝好的方法給策略裡面的委派，讓策略模式裡面只需要使用這些委派的方法來存取資料，不需要知道細節。




## Sample Codes

- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/CSharp/DP.Website)




### MVC: View

先建立以下Demo用的View和ViewModel。

* [\Views\Upload\Index.cshtml](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.Website/Views/Upload/Index.cshtml)
* [\Models\Strategy\FreightOrder.cs](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.Website/Models/Strategy/FreightOrder.cs)





### Strategy

建立一個策略介面並實作兩個策略類別：
1. 上傳的託運單檔案已在資料庫中有舊資料時，兩者數量相加為新數量
2. 上傳的託運單檔案已在資料庫中有舊資料時，以上傳檔案為主覆蓋

並將"查詢資料庫"和"更新資料庫"皆宣告為委派。

* \Domain\Strategy\
```
public interface IFoStrategy
{
        Func<int, FreightOrder> Query {get;set;}
        Action<FreightOrder> Update {get; set;}
        void Upload(FreightOrder so);
    
}

///1. 上傳的託運單檔案已在資料庫中有舊資料時，兩者數量相加為新數量
public class FoStrategyAppend : IFoStrategy
{
    public Func<int, FreightOrder> Query { get; set; }
    public Action<FreightOrder> Update { get; set; }
    public void Upload(FreightOrder fo)
    {
        var existFo = this.Query(fo.Id);
        fo.NewAmount = existFo.Amount + fo.Amount;

        //Implement other logic here

        this.Update(fo);
    }
}

///2. 上傳的託運單檔案已在資料庫中有舊資料時，以上傳檔案為主覆蓋
public class FoStrategyReplace: IFoStrategy
{
        public Func<int, FreightOrder> Query {get;set;}
        public Action<FreightOrder> Update {get; set;}
        public void Upload(FreightOrder fo)
        {
            var existFo = this.Query(fo.Id);
            fo.NewAmount = fo.Amount;

            //Implement other logic here

            this.Update(fo);
        }
}
```



### Data access service

在主程式(或DAL層)實作資料存取的方法：

* \Domain\Strategy\DataAccessService.cs
```
public class DataAccessService
{
    public static FreightOrder Query(int id)
    {
        Trace.WriteLine("==>查詢資料庫");
        return new FreightOrder{
            Id = 1,
            Customer = "供應商A",
            Product = "塑膠原料",
            Amount = 1000
        };
    }


    public static void Update(FreightOrder fo)
    {
        Trace.WriteLine("==>更新資料庫...");             
    }
}
```



### MVC: Controller

最後我們在Controller裡，依據檔案類型(累加或覆蓋元託運單數項)設定對應策略，並指定策略裡委派的方法。

* \Controllers\UploadController.cs
```
[HttpPost]
public IActionResult Index(string fileType, FreightOrder fo)
{
    ModelState.Clear();

    IFoStrategy stg = new FoStrategyAppend(); //採用策略：累加原單之數量
    IFoStrategy stg = new FoStrategyReplace(); //採用策略：覆蓋原單之數量
    stg.Query = DataAccessService.Query;
    stg.Update = DataAccessService.Update;
    updateFreightOrder(fo, stg);

    return View(fo);
}
```


執行畫面如下：

假設原始已存在資料庫的託運單資料如下：

![](https://2.bp.blogspot.com/-jgG-h5hESSY/Wls--IDR69I/AAAAAAAAFss/BEcaxnJeEJEPZ1huCFQAlEXfMaqtQm9xgCLcBGAs/s640/26-01.png)


當我們上傳一份以"累加數量"為策略的檔案時並假設該筆託運單在檔案中的數量為2,000時，所得到最後的新數量為1,000+2,000=3,000。

![](https://3.bp.blogspot.com/-qCoxTEyE1mo/Wls--IBc68I/AAAAAAAAFsw/Pn9zgMDzVL8hWUjDlcON0FBH9FPlYmFgACLcBGAs/s640/26-02.png)


而當上傳一份以"覆蓋數量"為策略的檔案時並假設該筆託運單在檔案中的數量為2,000時，所得到最後的新數量即為2,000。

![](https://3.bp.blogspot.com/-Y3K-M-gA6qA/Wls--PScEAI/AAAAAAAAFs0/Y-iTtF2WsbgNjtpWVJNJMPVpdKV2MVayACLcBGAs/s640/26-03.png)



## Reference
- [[Domain Driven Design] Use delegate for decoupling](http://karatejb.blogspot.tw/2016/05/domain-driven-design-use-delegate-for.html)
