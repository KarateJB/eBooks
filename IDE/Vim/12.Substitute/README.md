# Substitute

## Command

```
:[range]s/{pattern}/{string}/[flags]
```

Here are some useful flags, see `:h s_flags` for more details.

| Flag | Description |
|:----:|:------------|
| `c` | Confirm each substitute. When doing substitute, type <br />`y`: yes<br />`n`: no<br />`l`:substitute current one then quit<br />`a`:substitute current and remaining matches<br />`q`:quit |
| `g` | Replace all matched texts in the line, not just the first one. |
| `i` | Force ignoring case for the pattern. The "ignorecase" and "smartcase" options will be skipped. |
| `I` | Force case-sensitive for the pattern. The "ignorecase" and "smartcase" options will be skipped. |
| `e` | Do not issue an error message when the search pattern fails. |
| `&` | Keep the flags from the previous substitute. Must be put before other flag. |


## Special chars(symbols) in substitute

See more details by `:h sub-replace-special`.
Here are some common ones.

| Special symbols | Description |
|:---------------:|:------------|
| `\r`(*nix)/`\n`(windows) | "new-line" symbol. |
| `\t` | "Tab" |
| `\\` | "\" |
| `\0` | Replaced with the whole matched pattern. |
| `\1` | Replaced with the matched pattern in the first pair of (). |
| `\2` | Replaced with the matched pattern in the second pair of (). Same usage from `\3` to `\9`. |
| `&`  | Replaced with the whole matched pattern. |
| `~`  | Replaced with the {string} of the previous substitute. |
| `\={Vim script} | Replaced the {string} by the result of Vim script. |


## Basic samples

### "%s" and "/g"

We have a document like this,

```
AAA, AAA.
AAA, AAA.
```

Assume that the cursor is on line 1.

#### Substitute the first match on current line

`:s/AAA/XXX` results in

```
XXX, AAA.
AAA, AAA.
```

#### Substitute all the matches on current line

`:s/AAA/XXX/g` results in

```
XXX, XXX.
AAA, AAA.
```

#### Substitute all matches in doc

`:%s/AAA/XXX/g` results in

```
XXX, XXX.
XXX, XXX.
```

#### Substitute after search

We can do substitute by using the search pattern like this:

| Input keys | Note |
|:-----------|:-----|
| `/AAA` | |
| `:%s//XXX/g` | We can skip {pattern}. |

or

| Input keys | Note |
|:-----------|:-----|
| `/AAA` | |
| `:%s/<CTRL-r>//XXX/g` | The `<CTRL-r>/` will convert to "AAA" in the command line. |

or

| Input keys | Note |
|:-----------|:-----|
| `yaw` | Yank "AAA". |
| `:%s/<CTRL-r>"/XXX/g` | The `<CTRL-r>"` will paster the yanked text to the command line. |

