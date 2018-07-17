# Log


```
$ git log --oneline --graph
```

```
$ git log --author="JB" 
```

```
$ git log --after="2018-03-02" --since="10am" --until="18pm"
```

```
$ git log --pretty=format:"%H %an %ad"
$ git log --pretty=format:"%h %an %ad"
```

```
$ git log --after="2018-07-11" --pretty=format:"%h %an %ad"
```

## Search commit messages

```
$ git log --grep="Fix bugs"
```

## See commit logs for every line in a file

```
$ git blame xxx.file
```

## See commit logs for certain lines in a file

```
$ git blame -L 10,20 xxx.file
```

## Verifies the connectivity and validity of the objects

```
$ git fsck
```
  
and for unreachable objects

```
$ git fsck --unreachable
```


## reflog: show commit and head moving logs

```
$ git reflog
```

## reflog: clean logs (nake forbidden objects to unreachable)

```
$ git reflog expire --all --expire=now
```

## list files

```
$ git ls-files -s
```


