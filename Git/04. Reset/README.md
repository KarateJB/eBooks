# Reset

## Checkout file for latest commit

```
$ git checkout xxx.file
```

## Reset to relative commit (^: previous commit)

```
$ git reset {sha1-code}^
``` 

or

```
$ git reset {sha1-code}~1
```

> *Git reset modes*
> 
> * mixed (Default)
>
>   Revert current changes index, but keep them on working tree
>
> * soft
>
>   Revert current changes index, but keep them on working tree
>
> * hard
>
>   Revert current changes on working tree and index
>

##  Reset modes example

Commit 3 times as following,

![](../assets/001.png)

![](../assets/002.png)


Then make changes and add to index. The diff results ...

`git diff` (Compare working tree to index)

No difference

`git diff --cached` (Compare index to HEAD)

![](../assets/003.png)

`git diff HEAD` (Compare working tree to HEAD)

![](../assets/004.png)


Now reset the the 1st commit and see the differences between 3 modes

* mixed 

```
$ git reset --mixed af01615
```

![](../assets/005.png)

![](../assets/006.png)

ps. `git diff --cached` will get nothing.


* soft 

```
$ git reset --soft af01615
```

![](../assets/007.png)

![](../assets/008.png)

ps. `git diff` will get nothing. 


* hard

```
$ git reset --hard af01615
```

![](../assets/009.png)

ps. `git diff`,  `git diff --cached`,  `git diff HEAD` will all get nothing. 
