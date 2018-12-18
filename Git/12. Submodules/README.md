# Submodules

## Add Submodule

```
$ git submodule add <git path> <directory name for submodule>
```


For example, 

```
$ git submodule add https://github.com/TheForceJB/GitPracticeSub.git GitPracticeSub
```

![](../assets/012.png)


In `.gitmodules`, we will find the following content,

```
[submodule "GitPracticeSub"]
path = GitPracticeSub
url = https://github.com/TheForceJB/GitPracticeSub.git
```


## Creating Pull Request

However, if you would like to create some PRs for the submodule.
Instead of adding the target repository as submodule directly, we fork it and add the one in our repository as submodule.

For example, there are 2 repositories in my Github: 

1. `KarateJB/GitPractice`
2. `KarateJB/GitPracticeSub` which is forked from `TheForceJB/GitPracticeSub`

Add `KarateJB/GitPracticeSub` as sub-module into `KarateJB/GitPractice`.
Modify and create PR at `KarateJB/GitPracticeSub`.


## Clone a repository with Submodule

```
$ git clone <repository_url>
$ cd <repository_name> 
$ git submodule init
$ git submodule update
```

The above commands equals to

```
$ git clone <repository_url> --recursive
```


## Remove Submodule

> Reference : [myusuf3/delete_git_submodule.md](https://gist.github.com/myusuf3/7f645819ded92bda6677)


1. Stage for removal and untrack submodule files 

```
$ git rm --cached <path_to_submodule>
```

2. Remove files in `.git/modules/<submodule>`

```
$ rm -rf .git/modules/<path_to_submodule>
```

3. Commit

```
$ git commit -m "Removed submodule"
```

4. Delete the untracked submodule files

```
$ rm -rf <path_to_submodule>
```


### Reference

- [Git Tools - Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
- [Git submodule & pull request ! 让我们啃下这块骨头！](http://xtutu.me/git-submodule-and-pull-request/)

