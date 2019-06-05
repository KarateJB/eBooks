# Commit

## Track all files in this repository

```
$ git add --all
```

## Track only all files in current path, including of sub-directories

```
$ git add .
```

## Rename a file

```
$ git mv <old_file_name> <new_file_name>
```


## Remove the file and track it

```
$ git rm xxx.file
```
  
Which equals to 

```
$ del xxx.file
$ git add xxx.file
```

## Remove the file and untrack it


Stage a file for removal, but it won't be removed from the working dir. The file will be shown as **untracked**.

```
$ git rm --cached xxx.file
```
  


## Rename the file and track it

```
$ git mv xxx.file yyy.file
```

  Which equals to 

```
mv xxx.file yyy.file
git add --all
```

## Untrack the file already committed

```
$ git rm xxx.file --cached
```

Ex. Untrack all files under `myfolder`

```
$ git rm -r --cached path\myfolder
```


## Amend the last commit’s message

```
$ git commit --amend -m "Refine message"
```

if you don't want to change the original message,

```
$ git commit --amend -m --no-edit
```


## Add tracked file to the last commit

```
$ git add zzz.html
$ git commit --amend --no-edit
```

## Update the commit history

```
$ git rebase -i <begin_sha-1_code>
```

  which will open the default git editor

  ![](assets/001.png)
