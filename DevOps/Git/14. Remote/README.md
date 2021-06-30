# Authentication

Take Github for example, we can use [PAT(Personal Access Token)](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token) or [SSH key](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account) to access it.


# Clone

## Add remote end-point then clone

- Add remote end-point

```s
$ git remote add origin https://github.com/KarateJB/Test.git
```

or

```s
$ git remote add origin git@github.com:KarateJB/Test.git
```

- Clone
```
$ git clone 
```

## Clone

We can simply the above steps by

```s
$ git clone https://github.com/KarateJB/Test.git [<Local Directory Name>]
```

or

```s
$ git clone git@github.com:KarateJB/Test.git [<Local Directory Name>]
```

## Check remote

```s
$ git remote -v

```

If you want to switch remote URLs from HTTPS to SSH or from SSH to HTTPS:

```s
# From HTTPS to SSH
$ git remote set-url origin git@github.com:KarateJB/Test.git
# From SSH to HTTPS
$ git remote set-url origin https://github.com/KarateJB/Test.git
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


## See remote push logs

```
$ git reflog --date=local origin/<branch_name>
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


# Show remote information

```
$ git remote show origin
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



# Collaboration with remote repository

Here are 2 ways to collaborate with others in a remote repository.

## 1.Fork and sync a remote repository

To show how to do it, I forked a repository from [KarateJB/GitPractice](https://github.com/KarateJB/GitPractice) to [TheForceJB/GitPractice](https://github.com/TheForceJB/GitPractice).

### Add new remote repository

```s
$ git remote add <name> <repository_url>
```

E.q. 

```s
$ git remote add karatejb https://github.com/KarateJB/GitPractice.git
```

To see the remote repositories' information:

```s
$ git remote -v
karatejb        https://github.com/KarateJB/GitPractice.git (fetch)
karatejb        https://github.com/KarateJB/GitPractice.git (push)
origin  https://github.com/TheForceJB/GitPractice.git (fetch)
origin  https://github.com/TheForceJB/GitPractice.git (push)
```



### Fetch and merge original repository

```s
$ git fetch <name>
$ git checkout <branch_name>
$ git merge <name>/<branch_name>
```


E.q.

```s
$ git fetch karatejb
$ git checkout master # Checkout master branch of your repository
$ git merge karatejb/master # or rebase, this will merge/rebase the remote repository to your repository
```



## 2.Clone and set fetch/push on different remote

If we clone the remote repository of others, we will find that we do not have the permission to push commit to the remote repository.

```s
$ git clone https://github.com/KarateJB/GitPractice.git 
$ git remote -v
origin  https://github.com/KarateJB/GitPractice.git (fetch)
origin  https://github.com/KarateJB/GitPractice.git (push)
$ git checkout -b test
$ git push --set-upstream origin test
remote: Permission to KarateJB/GitPractice.git denied to TheForceJB.
fatal: unable to access 'https://github.com/KarateJB/GitPractice.git/': The requested URL returned error: 403
```

We can add a push remote url as following,

```s
$ git remote set-url [--add] --push origin <repository_url>
```


I set the push url to the remote repository that I have permission.

```s
$ git remote set-url --push origin git@github.com:TheForceJB/GitPractice.git
$ git remote -v
origin  https://github.com/KarateJB/GitPractice.git (fetch)
origin  git@github.com:TheForceJB/GitPractice.git (push)
```

Then I can push my commits to my repository and fetch the changes from the original remote repository.
E.q.
```s
$ git checkout master
$ git pull --rebase
Updating 2ef8e2a..e237227
Fast-forward
 default.html | 1 +
 1 file changed, 1 insertion(+)
$ git checkout test
$ git rebase master
```





