## Clone

- Add remote end-point
```
$ git remote add origin https://github.com/KarateJB/Test.git
```

-- Clone
```
git clone 
```

## Push

- Push with setting remote upstream branch
```
$ git push -u origin {brach_name_for_remote}
```


## Pull

`git pull` equals to 
1. `git fetch`
2. `git merger`

- pull by rebase (Which will not create a new commit for merging)
```
$ git pull --rebase
```

