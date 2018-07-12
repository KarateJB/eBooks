# Diff

![](../assets/010.png)

## Compare working tree to index

```
git diff
```
  
## Compare index to HEAD  

```
git diff --cached
```

## Compare working tree to HEAD

```
git diff HEAD
```


## Comapare 2 commits

```
$ git diff <old_sha1_code> <new_sha1_code>
```

On certain file,
```
$ git diff <old_sha1_code> <new_sha1_code> xxx.file
```

Output a file
```
$ git diff <old_sha1_code> <new_sha1_code> xxx.file > xxx.diff
```
