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

- Push with setting remote upstream branch
```
$ git push -u origin {brach_name_for_remote}
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


# Syncing a fork

```
$ git fetch upstream
$ git checkout master
$ git merge upstream/master
```