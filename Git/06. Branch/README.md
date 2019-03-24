# Branch

## List branches

```
$ git branch
```

|        Parameter        | in short | Value | Description |
|:------------------------|:--------:|:-----:|:------------|
| (no parameters) |  | | List local branches |
| --remote | -r | | List remote branches |
| --all | -a | | List local and remote branches |


## Create new branch

```
$ git checkout <from_branch_name>
$ git branch <new_branch_name>
```

or

```
$ git branch <new_branch_name> <from_branch_name>
```

## Checkout branch or create new branch if not exist

```
$ git checkout -b <branch_name> [<from_branch_name>]
```

## Push and set the upstream to remote

```
$ git push --set-upstream origin <new_branch_name>
```

## Rename branch

```
$ git branch -m <old_branch_name> <new_branch_name>
```

## Delete branch

```
$ git branch -d <branch_name>
```

## Delete branch (force)

```
$ git branch -D <branch_name>
```

## Delete remote branch

```
$ git push origin --delete <branch_name>
```


## Checkout certain commit and create branch from it

```
$ git checkout <sha-1 code>
$ git branch <new_branch_name>
```

or one line like this 

```
$ git branch <new_branch_name> <sha-1 code>
```   



# Merge branches

```
$ git checkout <source_branch>
$ git merge <target_branch>
```

if conflict...

- Apply source ones
```
$ git checkout --ours xxx.file
$ git add xxx.file
$ git commit -m "...."
``` 

- Apply target ones
```
$ git checkout --theirs xxx.file
$ git add xxx.file
$ git commit -m "...."
``` 

- Merge certain commit from other branch
```
$ git cherry-pick <sha-1 code 1> <sha-1 code 2>
```

- Pick certain commit to index
```
$ git cherry-pick <sha-1 code> --no-commit
```




# Rebase branches

```
$ git checkout <source_branch>
$ git rebase <target_branch>
```

if conflict, use the same commands on *Merge Branch* and then 

```
$ git rebase --continue
```


