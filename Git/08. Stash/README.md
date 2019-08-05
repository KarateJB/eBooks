
> While we would like to switch our job to other branch and save current codes immediatly

## Use reset

```
$ git add --all
$ git commit -m "Temporaryly commit, but not completed..."
``` 

then after doing something... we discard the last commit by rest.

```
$ git reset HEAD^ --hard
```


## Use Stash

While we have not staged current modified codes, use `stash` to save them temporaryly.

```
$ git stash
```

> If you want to stash the untracked files as well

``` 
$ git stash -u
```

## List stash

### List stash

```
$ git stash list
```


## Show stash

### Show the file list of latest stash

```
$ git stash show
```


### Show the file contents of the latest stash

```
$ git stash show -p
```


### Show the file contents of certain stash

```
$ git stash show -p stash@{1}
```



## Pop/Apply stash

POP the stash (Which will remove the stash after apply it on the same branch)

```
$ git stash pop stash@{1}
```


Apply the stash(Which will not remove the stash after apply it)

```
$ git stash apply stash@{1}
```

> If the specified name of stash is not given, the latest stash will be applied


## Remove stash

```
$ git stash drop stash@{1}
```

