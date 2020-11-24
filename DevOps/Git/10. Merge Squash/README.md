
**Merge Squash** allows us to squash(壓縮) all commits of a branch into one while merging into the current branch.


```
$ git merge --squash <branch_name>
```


## Example

Assume that our current branches are as following,
and we would like to merge SourceBranch to master branch.

![](assets/001.png)


We can use `merge --squash` to merge into master with only one commit,

```
$ git checkout master
$ git merge --squash SourceBranch
```

or 

```
$ git merge --squash SourceBranch master
```

If conflict happens, we have to solve it and stage the changed files manually.
Then we can make a commit to squash all the commits(changes) into one commit.


```
$ git commit -m "Merge commits from SourceBranch"
```

![](assets/002.png)

