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
