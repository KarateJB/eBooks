# Environment

2.16.2



## Initialize

```
$ git init
```


## Commit

- Track all files in this repository

```
$ git add --all
```

- Track only all files in current path, including of sub-directories

```
$ git add .
```


- Remove the file and track it 

```
git rm xxx.file
```
  Which equals to 

```
del xxx.file
git add xxx.file
```

- Rename the file and track it

```
git mv xxx.file yyy.file
```

  Which equals to 

```
mv xxx.file yyy.file
git add --all
```

- Untrack the file already committed

```
git rm xxx.file --cached
```


- Amend the last commit’s message 
```
git commit --amend -m “Refine message"
```


- Add tracked file to the last commit
```
git add zzz.html
git commit --amend --no-edit
```

## Diff


![](assets/010.png)

- Compare working tree to index
```
git diff
```
  
- Compare index to HEAD  
```
git diff --cached
```

- Compare working tree to HEAD
```
git diff HEAD
```

## Reset

- Checkout file for latest commit
```
$ git checkout xxx.file
```

- Reset to relative commit (^: previous commit)
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

- Reset modes example

  Commit 3 times as following,

  ![](assets/001.png)

  ![](assets/002.png)


  Then make changes and add to index. The diff results ...

  `git diff` (Compare working tree to index)
  
  No difference

  `git diff --cached` (Compare index to HEAD)

  ![](assets/003.png)

  `git diff HEAD` (Compare working tree to HEAD)

  ![](assets/004.png)


  Now reset the the 1st commit and see the differences between 3 modes

  * mixed 

    ```
    $ git reset --mixed af01615
    ```
    
    ![](assets/005.png)

    ![](assets/006.png)

    ps. `git diff --cached` will get nothing.


  * soft 

    ```
    $ git reset --soft af01615
    ```

    ![](assets/007.png)

    ![](assets/008.png)
    
    ps. `git diff` will get nothing. 


  * hard

    ```
    $ git reset --hard af01615
    ```

    ![](assets/009.png)
    
    ps. `git diff`,  `git diff --cached`,  `git diff HEAD` will all get nothing. 

## Log

```
git log --oneline --graph
```

```
git log --author="JB" 
```

```
Git log --after="2018-03-02" --since="10am" --until="18pm"
```

- Search commit messages
```
Git log --grep="Fix bugs"
```

- See commit logs for every line in a file
```
$ git blame xxx.file
```

- See commit logs for certain lines in a file
```
$ git blame -L 10,20 xxx.file
```

- reflog: show commit and head moving logs
```
$ git reflog
```


## .gitignore

- Ignore single file

`xxx.log`

- Ignore ./Logs/xxx.log

`Logs/xxx.log`

- Ignore all *.log in any folder named Logs

`/Logs/*.log`

- Ignore all .log files

`*.log`


