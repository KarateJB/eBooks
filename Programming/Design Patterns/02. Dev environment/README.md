# 準備開發環境

我們將在[Visual Studio Code](https://code.visualstudio.com/)進行程式碼編輯及執行。程式碼將放[Github](https://github.com/KarateJB/DesignPattern.Sample)。

## C#

使用[.NET Core](https://www.microsoft.com/net/download/windows)的Class library及xUnit Test Project專案。

1. 安裝 .NET Core [here](https://www.microsoft.com/net/download/windows)

2. 在VSCODE安裝以下建議擴充功能

   * [C#](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp)
   * [C# Extensions](https://marketplace.visualstudio.com/items?itemName=jchannon.csharpextensions)
   * [C# XML Documentation Comments](https://marketplace.visualstudio.com/items?itemName=k--kato.docomment)

3. 熟悉DONET Core CLI指令

   可參考[官方文件](https://docs.microsoft.com/zh-tw/dotnet/core/tools/?tabs=netcore2x)或我的Blog:[[.Net Core] dotnet commands](http://karatejb.blogspot.tw/2017/06/net-core-dotnet-commands.html)

   針對某個Unit test執行測試的指令：

   ```
   dotnet test --filter "FullyQualifiedName=MyNamespace.MyTestClass.MyTest"
   ```

   輸出xUnit [ITestOutputHelper](https://xunit.github.io/docs/capturing-output.html)的結果到TRX file:

   ```
   dotnet test --logger "trx;LogFileName=xxxx.trx
   ```



## Python 3.6.2

1. 安裝[Python](https://www.python.org/downloads/)
   <bPS. 寫文章時我的環境是 3.6.2

2. 安裝Python相關套件
   
   * [Pylint](https://github.com/PyCQA/pylint): source code analyzer
     
     ```
     $ python –m pip install pylint
     ```

   * [autopep8](https://github.com/hhatto/autopep8): formats Python code to conform to the PEP 8 style guide

     ```
     $ python –m pip install autopep8
     ```

3. 在VSCODE安裝以下建議擴充功能
   - [Python](https://marketplace.visualstudio.com/items?itemName=donjayamanne.python)
   - [Code Runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner)

4. 可參考我的Blog: [[Python] Hello world in VSCODE](http://karatejb.blogspot.tw/2017/08/python-hello-world-in-vscode.html)


