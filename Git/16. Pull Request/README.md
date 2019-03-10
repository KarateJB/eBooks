# Pull Request


## PR to other branches

Assume that we would like to merge branch `dev` to branch: `master`

1. Pull latest commits from `master`

```
$ git checkout master
$ git pull --rebase
```

2. Rebase master

```
$ git rebase master dev
```

or 

```
$ git checkout dev
$ git rebase master
```

3. Kickoff a PR