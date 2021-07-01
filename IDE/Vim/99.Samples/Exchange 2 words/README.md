# Exchange 2 words

## Sample 1


| Input keys | Result text | Note |
|:-----------|:------------|:-----|
| ``0fP`` | I like **P**eter and Mary. | |
| ``"ade`` | I like and Mary. | |
| ``mm`` | I like and Mary. | |
| ``fM`` | I like and **M**ary. | |
| ``ciw<CTRL-r>a`` | I like and Peter. | |
| ``<CTRL-o>`m<CTRL-r>"``| I like Mary and Peter. | Jump back and yank from unnamed register. |


## Sample 2

| Input keys | Result text | Note |
|:-----------|:------------|:-----|
| ``0fP`` | I like **P**eter and Mary. | |
| ``de`` | I like  and Mary. | |
| ``mm`` | I like  and Mary. | |
| ``ww`` | I like  and **M**ary. | |
| ``ve`` | I like  and **Mary**. | |
| ``p`` | I like  and Peter. | Paste `Peter` to replace the word: `Mary`. Notice the word `Mary` will be put into the unnamed register (in Visual Mode). |
| ```mP`` | I like Mary and Peter. | Jump back and paste what in unamed register, and that will be `Mary`. |


## Sample 3

| Input keys | Result text | Note |
|:-----------|:------------|:-----|
| `/\v(Peter) and (Mary)` | I like Peter and Mary. | Search and keep "Peter" to register 1 and "Mary" to register 2 in next step. |
| `:s//\2 and \1/g` | I like Mary and Peter. | Replace the search result with `{register 2} and {register 1}`. |


## Sample 4

| Input keys | Result text | Note |
|:-----------|:------------|:-----|
|            | I like JB and Amy. |
| `/\v(JB|Amy)` | Search "JB" or "Amy". |
| `s//\={"JB":"Amy","Amy":"JB"}[submatch(0)]/g` | Use swapper to replace "JB" with "Amy", "Amy" with "JB". |

Here we can learn how to use swapper:

```
:let swapper={"JB":"Father","Amy":"My girl"}
:echo swapper["JB"]
Father
:echo swapper["Amy"]
My girl
```



