## Introduction

One of the MOST IMPORTANT parts on the way to happy coding: **Unit Test**!
Let us see how to use [xUnit.net](https://github.com/xunit/xunit) in .NET Core.


## Environment

* Visual Studio 2015 Update 3  
* .Net Core 1.0.0
* xunit 2.1.0
* dotnet-test-xunit 1.0.0-rc2


## Implement


#### Create a new .NET Core Class Library project

![](https://3.bp.blogspot.com/-McX9lJOg52E/WG-3FfO6lMI/AAAAAAAAEJU/OdkF48qnFH4LWigrco7aNPPx05aIrGf7wCLcB/s1600/image001.png)

![](https://3.bp.blogspot.com/-xWQs11jkBFg/WG-3FUMF7ZI/AAAAAAAAEJQ/vFaFCOBlncMX8zN7hSq15wqXkX4pAsptgCLcB/s1600/image002.png)

#### Install packages

1. [dotnet-test-xunit](https://www.nuget.org/packages/dotnet-test-xunit/)
2. [xunit](https://www.nuget.org/packages/xunit/)


#### Create a simple unit test

```
public class UnitTestDemo
{
        [Fact]
        public void TestSplitCount()
        {
            var input = "Luke Skywalker, Leia Skywalker, Anakin Skywalker";
            var actual = input.Split(',').Count();

            Assert.True(actual.Equals(3), $"Expected:3, Actual:{actual}");
        }
}
```

Build the VStudio solution, and we can see that the unit test is on the `Test Explorer`.

![](https://4.bp.blogspot.com/-Iqj71Jkf-KY/WG-3SLGRYcI/AAAAAAAAEJY/w2lcOzU9l-sNakB102ZbrrHu5syc9ceegCLcB/s1600/image003.png)

Or use the following command to run all tests.

`dotnet test`

Or run a single one.

`dotnet test -method Angular2.Mvc.xUnitTest.UnitTestDemo.TestSplitCount`


#### Use [Theory] to test multiple cases(data)

Here is a sample,

```
[Theory]
[InlineData("A,B,C")]
[InlineData("AA,BB,CC")]
[InlineData("1,2,3")]
[InlineData("#,^,*")]
public void TestSplitCountComplexInput(string input)
{
    var actual = input.Split(',').Count();
    Assert.True(actual.Equals(3), $"Expected:3, Actual:{actual}");
}
```

Test result:

![](https://4.bp.blogspot.com/-_1vvr0-IiuI/WG-3ZXzhZZI/AAAAAAAAEJc/b_t1IXhgUw8BJINZxrlmHaE2VSnbIebNwCLcB/s1600/image004.jpg)


#### Use [Theory] and [MemberData] to test with expected values

We will refactor the previous unit test and let every test has its own **expected value**.

First, create a `TestCase` class with test cases,

* Testcase.cs

```
public class TestCase
{
        public static readonly List<object[]> Data = new List<object[]>
           {
              new object[]{"A,B,C",3},  //The last value is the expected value
              new object[]{"AA,BB,CC,DD",4},
new object[]{"1,2,3,4,5",5},
              new object[]{"(,&,*,#,!,?",6}
           };

        public static IEnumerable<object[]> TestCaseIndex
        {
            get
            {
                List<object[]> tmp = new List<object[]>();
                for (int i = 0; i < Data.Count; i++)
                    tmp.Add(new object[] { i });
                return tmp;
            }
        }
}
```

* UnitTest

```
[Theory]
[MemberData("TestCaseIndex", MemberType = typeof(TestCase))]
public void TestSplitCountComplexInput(int index)
{
    var input = TestCase.Data[index];
    var value = (string)input[0];
    var expected = (int)input[1];

    var actual = value.Split(',').Count();

    Assert.True(actual.Equals(expected), $"Expected:{expected}, Actual:{actual}");
}
```

Test Result:

![](https://1.bp.blogspot.com/-IU6KDBb55wc/WG-27bCHYaI/AAAAAAAAEJM/EVzmLQAWdcIMkDBVT_GKeCBVUuCZdkTjQCLcB/s1600/image005.jpg)


### Whaz next?

We will talk about `MSTest` and decoupling with `NSubstitute` in the next day-sharing.



## Reference

1. [Getting started with xUnit.net (.NET Core / ASP.NET Core)](https://xunit.github.io/docs/getting-started-dotnet-core.html)
2. [Stackoverflow : Pass complex parameters to [Theory]](http://stackoverflow.com/questions/22093843/pass-complex-parameters-to-theory)

