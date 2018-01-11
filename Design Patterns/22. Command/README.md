# Command 命令模式


> 1944年，在第二次世界大戰中，同盟國聯軍進攻歐洲北部-法國諾曼第地區的登陸戰役，代號**Operation Overlord**。這次作戰由美國陸軍上將杜懷特‧艾森豪(Dwight D. Eisenhower)擔任最高指揮官，，作戰時間原訂為6月5日，但惡劣氣候迫使登陸行動推遲至6月6日。這是歷史上最著名的D-Day，也就是**諾曼第登陸**。


假設你現在是這場作戰總指揮官，你必須先設定計畫(Planning is everything. Plans are nothing!) - 也就是部隊要執行的命令。
但是你不太可能鉅細靡遺的下命令去指揮所有部隊 (如下圖一):
1. 身為總指揮官的你不應該知道部隊執行任務的細節，你需要命令他們"進攻"，但是如何各部隊如何進攻他們自己知道就可以了
2. 將整個作戰的計劃(命令)直接告訴部隊，除了增加被洩密的風險，實際執行時，因為人多口雜，大家可能會搞混命令的順序


#### 圖一
![](https://2.bp.blogspot.com/-AcIuWP_VJK0/WlRTHOZTQRI/AAAAAAAAFrY/6EOWzkWhC0oyL4LzYnch9li7UspM5M7CACLcBGAs/s1600/Command_1.png)
[Photo from kknews.cc](https://kknews.cc/history/mga2l69.html)

比較好的做法如下圖(圖二)
1. 設定各部隊的指揮官
2. 依各作戰計畫建立命令，而且每個命令將負責的部隊指揮官關連起來
3. 當執行某個作戰計畫時，你只要下達"執行"，讓每個命令都將直接下達各部隊指揮官，由各指揮官去執行任務的細節即可

#### 圖二
![](https://4.bp.blogspot.com/-GfLPQfYJqgQ/WlRTG7u3o1I/AAAAAAAAFrU/cGmbMV7P6a0SH5MhU59oAc7YIkP7cRJAwCLcBGAs/s1600/Command_2.png)
[Photo from kknews.cc](https://kknews.cc/history/mga2l69.html)


接下來我們開始用命令模式(Command)來實作這個需求。


## 定義

> 將請求封裝為物件，允許使用不同的請求來參數化客戶端，駐列或記錄這些請求，並支持可撤銷的操作 ((WIKI)[https://en.wikipedia.org/wiki/Command_pattern])


### UML
![](https://1.bp.blogspot.com/-PwJnLP-qQnA/WlRcYxlbT6I/AAAAAAAAFrs/Gfj9MF8hetYPH3uwel3U43B1JebjsN9tQCLcBGAs/s1600/Command_uml.png)


命令模式的UML有點複雜，我們用這個登陸作戰需求來說明各角色的職責和關係(圖三)：

* Client: 總指揮官，負責
  1. 建立命令
  2. 將命令放到作戰計畫，或從作戰計畫移除
  3. 執行作戰計畫

* Command: 命令
  1. 每個命令對應一個Receiver(部隊指揮官)
  2. 命令被執行時，觸發Receiver裡面的執行細節

* Receiver: 部隊指揮官
  1. 負責提供命令如何執行的細節
  2. 沒有主動執行細節的能力，而是藉由命令被執行才觸發

* Invoker: 作戰計畫，提供
  1. 儲放或取消命令
  2. 當收到Client(總指揮官)執行的通知，執行所有內部的命令

#### 圖三
![](https://1.bp.blogspot.com/-zs-HWeJ0tPI/WlRTHghKusI/AAAAAAAAFrc/NNtj4hHfDiU7PVEma38LMs2lays3HVzhwCLcBGAs/s1600/Command_3.png)
[Photo from kknews.cc](https://kknews.cc/history/mga2l69.html)  


我們開始來實作吧!


### Receiver

我們定義部隊的指揮官為三種：
1. ReceiverArmy : 陸軍 
2. ReceiverNavy : 海軍 
3. ReceiverAirForce : 空軍 

他們各自實作了`IReceiver`的細節，也就是各種部隊作戰的細節。

* C#
```
public interface IReceiver
{
    /// 集合部隊
    void GatherArmy(); 
    /// 開火
    void Fire();
    /// 設定制高點=有利之位置
    void SetHighGround();
    /// 等待開火指示
    void Hold();
    /// 支援
    void Support();
}
public class ReceiverArmy : IReceiver
{
    public void Fire()
    {
        Trace.WriteLine("[Army] 坦克及路面部隊開始前進突破敵方防線!");
    }

    public void GatherArmy()
    {
        Trace.WriteLine("[Army] 集合裝甲部隊和部兵!");
    }

    public void Hold()
    {
        Trace.WriteLine("[Army] 子彈上膛!等待開火指令!");
    }

    public void SetHighGround()
    {
        Trace.WriteLine("[Army] 不要跑到有沙的地方!");
    }
    public void Support()
    {
        Trace.WriteLine("[Army] 以50機槍掃射掩護!");
    }
}
//ReceiverNavy和ReceiverAirForce類別請參考ReceiverArmy自行建立或參考Github之原始碼
```

* Python
```
from abc import ABC, abstractmethod

class Receiver(ABC):
    @abstractmethod
    def gatherArmy(self):
        """集合部隊"""
        pass

    @abstractmethod
    def fire(self):
        """開火"""
        pass

    @abstractmethod
    def setHighGround(self):
        """設定制高點=有利之位置"""
        pass

    @abstractmethod
    def hold(self):
        """等待開火指示"""
        pass

    @abstractmethod
    def support(self):
        """支援"""
        pass

class ReceiverAirForce(Receiver):

    def fire(self):
        print('[AirForce] 自由開火!')

    def gatherArmy(self):
        print('[AirForce] 集合戰鬥機飛官!')

    def hold(self):
        print('[AirForce] 組織巡邏隊形進行觀察!')    

    def setHighGround(self):
        print('[AirForce] 飛高高!')

    def support(self):
        print('[AirForce] 以機槍掃射掩護!')

        
# ReceiverNavy和ReceiverAirForce類別請參考ReceiverArmy自行建立或參考Github之原始碼
```




### Command

每個命令必須有一個部隊(Receiver)來執行細節。
這裡我們讓總指揮官的命令包含：
1. Breakthrough：突破
2. Defense: 防禦
3. Support: 支援


* C#
```
public abstract class Command
{
    protected IReceiver _receiver = null;
    public Command(IReceiver receiver)
    {
        this._receiver = receiver;
    }
    public abstract void Execute();
}
///Breakthrough：突破
public class CmdBreakthrough:Command
{
    public CmdBreakthrough(IReceiver receiver):base(receiver)
    {
    }

    public override void Execute()
    {
        this._receiver.GatherArmy();
        this._receiver.Fire();
    }
}
///Defense: 防禦
public class CmdDefense : Command
{
    public CmdDefense(IReceiver receiver):base(receiver)
    {
    }

    public override void Execute()
    {
        this._receiver.SetHighGround();
        this._receiver.Hold();
    }
}
///Support: 支援
public class CmdSupport : Command
{
    public CmdSupport(IReceiver receiver):base(receiver)
    {
    }

    public override void Execute()
    {
        this._receiver.Support();
    }
}
```

* Python
```
from abc import ABC, abstractmethod
from Receivers import Receiver

class Command(ABC):
    def __init__(self, receiver:Receiver):
        self.receiver = receiver
     
    @abstractmethod
    def execute(self):
        pass

class CmdSupport(Command):
    """Support: 支援"""
    def __init__(self, receiver:Receiver):
        super().__init__(receiver)
    
    def execute(self):
        self.receiver.support()

class CmdDefense(Command):
    """Defense: 防禦"""    
    def __init__(self, receiver:Receiver):
        super().__init__(receiver)
    
    def execute(self):
        self.receiver.setHighGround()
        self.receiver.hold()
        

class CmdBreakthrough(Command):
    """Breakthrough: 突破"""        
    def __init__(self, receiver:Receiver):
        super().__init__(receiver)
    
    def execute(self):
        self.receiver.gatherArmy()
        self.receiver.fire()
```


### Invoker

* C#
```
public class Invoker
{
    private IList<Command> _commands = null;

    public Invoker()
    {
        this._commands = new List<Command>();
    }

    public void AddCommand(Command command)
    {
        this._commands.Add(command);
    }

    public void CancelCommand(Command command)
    {
        this._commands.Remove(command);
    }

    public void Invoke()
    {
        foreach(var cmd in this._commands)
        {
            cmd.Execute();
        }
    }
}
```

* Python
```
from Commands import Command

class Invoker:
    def __init__(self):
        self.commands=[]
    
    def addCommand(self, cmd:Command):
        self.commands.append(cmd)

    def cancelCommand(self, cmd:Command):
        self.commands.remove(cmd)

    def invoke(self):
        for cmd in self.commands:
            cmd.execute()
```

Now is the time! 總指揮官! 請開始利用命令模式來執行兩階段的D-Day登陸作戰吧! 
1. 搶灘作戰
2. 陸地作戰

* C#
```
//準備海陸空軍
IReceiver navy = new ReceiverNavy();
IReceiver army = new ReceiverArmy();
IReceiver airForce = new ReceiverAirForce();

#region D-Day前:指揮官建立作戰計畫
    
//登陸作戰命令
Invoker invokerLanding = new Invoker();
Command[] commands4Landing = new Command[]{
    new CmdBreakthrough(navy),  //海軍突破
    new CmdDefense(army), //陸軍
    new CmdSupport(airForce) //空軍支援
};
commands4Landing.ToList().ForEach( cmd =>{
    invokerLanding.AddCommand(cmd);
});

//登陸後作戰命令
Invoker invokerLanded = new Invoker();
Command[] commandsLanded = new Command[]{
    new CmdBreakthrough(army), //陸軍突破
    new CmdSupport(navy), //海軍支援
    new CmdDefense(airForce) //空軍防禦
};
commandsLanded.ToList().ForEach( cmd =>{
    invokerLanded.AddCommand(cmd);
});
#endregion


#region D-Day:開始執行作戰計畫

Trace.WriteLine("搶灘作戰開始!-----------------");
invokerLanding.Invoke();


var isEnemyTough = true;
if(isEnemyTough)//敵方砲火猛烈=>更新命令
{
    //取消空軍支援
    invokerLanded.CancelCommand(commandsLanded[2]);
    //改加入空軍突破
    invokerLanded.AddCommand(new CmdBreakthrough(airForce));
}

Trace.WriteLine("陸地作戰開始!-----------------");            
invokerLanded.Invoke();

#endregion
```

* Python
```
# 準備海陸空軍
        navy = ReceiverNavy()
        army = ReceiverArmy()
        airForce = ReceiverAirForce()
            
        """D-Day前:指揮官建立作戰計畫"""
                
        # 登陸作戰命令
        invokerLanding = Invoker()
        commands4Landing = [
                CmdBreakthrough(navy),  #海軍突破
                CmdDefense(army), #陸軍防禦
                CmdSupport(airForce) #空軍支援
        ]
        
        for cmd in commands4Landing:
            invokerLanding.addCommand(cmd)

        # 登陸後作戰命令
        invokerLanded = Invoker()
        commandsLanded = [
            CmdBreakthrough(army), # 陸軍突破
            CmdSupport(navy), # 海軍支援
            CmdDefense(airForce) # 空軍防禦
        ]
        for cmd in commandsLanded:
            invokerLanded.addCommand(cmd)


        """D-Day:開始執行作戰計畫"""

        print("搶灘作戰開始!-----------------")
        invokerLanding.invoke()

        isEnemyTough = True
        if(isEnemyTough): #敵方砲火猛烈=>更新命令
            # 取消空軍支援
            invokerLanded.cancelCommand(commandsLanded[2])
            # 改加入空軍突破
            invokerLanded.addCommand(CmdBreakthrough(airForce))

        print("陸地作戰開始!-----------------")            
        invokerLanded.invoke()
```

注意在主程式刻意模擬在搶灘成功後、陸地作戰前，更改了陸地作戰的命令。
執行作戰結果如下：

*搶灘作戰開始!-----------------*
*[Navy] 集合艦艇!*
*[Navy] 射出所有魚雷和對空飛彈!*
*[Army] 不要跑到有沙的地方!*
*[Army] 子彈上膛!等待開火指令!*
*[AirForce] 以機槍掃射掩護!*
*陸地作戰開始!-----------------*
*[Army] 集合裝甲部隊和部兵!*
*[Army] 坦克及路面部隊開始前進突破敵方防線!*
*[Navy] 砲彈支援友軍!*
*[AirForce] 集合戰鬥機飛官!*
*[AirForce] 自由開火!*


恭喜指揮官! 登陸作戰成功!

那麼何時適合用命令模式呢？
- 當需要執行多個對象
- 且對象需要抽換策略和抽換執行策略的邏輯


命令模式在Behavioral design patterns是其中一個相對複雜的模式，但是也是用來解釋Behavioral design patterns最好的模式；
它解除了高階模組與低階模組的耦合關係，讓兩者都依賴於抽象，大大的增加了程式碼的彈性與可擴充性!



## Sample Codes

1. C#
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/CSharp/DP.Domain/Samples/Command)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.UnitTest/UtCommand.cs)

2. Python
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/Python/Samples/Command)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/Python/Samples/Command/UtCommand.py)

