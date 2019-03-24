# Clone

- Add remote end-point
```
$ git remote add origin https://github.com/KarateJB/Test.git
```

- Clone
```
git clone 
```

# Push

- Push with setting remote upstream branch (To track)
```
$ git push -u origin <brach_name_for_remote>
```

which equals to 

```
$ git push --set-upstream origin <brach_name_for_remote>
```



# Pull

`git pull` equals to 
1. `git fetch`
2. `git merger`


## Pull remote branch


First do a sync from remote to local,

```
$ git fetch origin
```

List all remote branches,

```
$ git branch -r
```

Then CHECKOUT the remote branch and sync to local,

```
$ git checkout -b <my_branch> origin/<my_branch>
```

or in git1.6.2+, use `--track` to simplify the above commands,

```
$ git checkout --track origin/<my_branch>
```

## Pull by rebase (Which will not create a new commit for merging)

```
$ git pull --rebase
```


## Delete remote branch

```
$ git push origin --delete <branch_name>
```


# Prune/Cleanup the local references to remote branch

### To see what references will be removed

```
$ git remote prune origin --dry-run
 * [would prune] origin/no_use_branch1
 * [would prune] origin/no_use_branch2
```

> `--dry-on`: Do not remove anything; just report what will be removed.


### Do the real removing

```bash
$ git remote prune origin
 * [pruned] origin/no_use_branch1
 * [pruned] origin/no_use_branch2
```

We can also do the same thing in fetching,

```
$ git fetch --prune
- [deleted]         (none)     -> origin/no_user_branch1
- [deleted]         (none)     -> origin/no_user_branch2
```


### (Optional) Remove the local useless branches

```bash
$ git branch -d no_use_branch1
```



# Syncing a fork

```
$ git fetch upstream
$ git checkout master
$ git merge upstream/master
```