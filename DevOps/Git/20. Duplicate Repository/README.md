# Clone a repository to another new repository

> Here is an example for cloning "my-old-repository" to "my-new-repository" with history(commits, branches ...)

1. First create the new remote repository 

2. Create a bare clone of the old repository

```
$ git clone --bare https://github.com/KarateJB/my-old-repository.git "my-new-repository"
```

The "bare clone" command will clone the old repository's **Local Repository** without cloneing **Working Directory**.

3. Mirror-push the new repository 

```
$ cd "my-new-repository"
$ git push --mirror https://github.com/KarateJB/my-new-repository.git
```

Now we have two remote repositories with the same history.

4. (Optional) Clone the Working Directory from new repository

Simply remove the folder and clone it from remote,

```
$ rm "my-new-repository",
$ git clone https://github.com/KarateJB/my-new-repository.git
```


Or add the remote as following,

```
$ git remote add origin https://github.com/KarateJB/my-new-repository.git
$ git checkout <branch_name>
```




# Reference

- [GitHub Help: Duplicating a repository](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/duplicating-a-repository)