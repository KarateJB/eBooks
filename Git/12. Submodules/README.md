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



The content inside `.gitmodules`

```
[submodule "GitPracticeSub"]
path = GitPracticeSub
url = https://github.com/KarateJB/GitPracticeSub.git
```



Add the second line and push the changes to the remote repository. 

```markdown
### Test
### Test from GitPractice
```


## Remove Submodule

> Reference : [myusuf3/delete_git_submodule.md](https://gist.github.com/myusuf3/7f645819ded92bda6677)


1. Delete the relevant section from the .gitmodules file.

```
$ mv <path_to_submodule>
```

2. 

```
$ git rm --cached <path_to_submodule>
```


3. Remove files in `.git/modules/<submodule>`


```
$ rm -rf .git/modules/<path_to_submodule>
```




Stage the .gitmodules changes git add .gitmodules
Delete the relevant section from .git/config.
Run git rm --cached path_to_submodule (no trailing slash).
Run rm -rf .git/modules/path_to_submodule (no trailing slash).
Commit git commit -m "Removed submodule "
Delete the now untracked submodule files rm -rf path_to_submodule
