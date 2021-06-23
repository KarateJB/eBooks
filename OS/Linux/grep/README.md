# grep

> The grep used Regular Expression

## Search keyword in file(s)

```s
$ grep <keyword> <file1_path> <file2_path> ...
```

e.q.

```s
$ grep "^[#-]" README.md
```

Which will list those lines started with `#` or `-`.



## Search keyword recursively

```s
$ grep -r <keyword> <directory_path>
```

## Search with pipe

```s
$ ls /tutorials | grep README 
```

Which will show the file names contains `README`.




## Popular Arguments

| Argument | Description |
|:--------:|:------------|
| `-n` | Show the row number. |
| `-i` | Ignore case sensitive. |
| `-v` | Reversed searching result, i.e. Search those that NOT matchs the keyword. |
| `-A {number} | Show the {number} lines AFTER the matched line. |
| `-B {number} | Show the {number} lines BEFORE the matched line. |
| `-C {number} | Show the {number} lines BEFORE and AFTER the matched line. |
| `-color=[always|auto|never] | Show the result with color. |


