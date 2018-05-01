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

- Untrack the file

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
$ git reset {sha1-code}~2
```


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


## .gitignore

- Ignore single file

`xxx.log`

- Ignore ./Logs/xxx.log

`Logs/xxx.log`

- Ignore all *.log in any folder named Logs

`/Logs/*.log`

- Ignore all .log files

`*.log`


