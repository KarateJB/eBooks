# Jump

> See `:h jumps`.


## Set Mark

- `m{a-zA-Z}` Set mark, notice that the lowercase mark (a-z) is for current file only, while the uppercase mark (A-Z) is globally set.
- `'{mark}` Jump to the mark, the cursor will be on the first non-blank char.
- ``{mark}` Jump to the mark, the cursor will be on the char when setting the mark. (Recommended)
- To quickly use mark, `mm` to set, ``m` to jump.

## Automatic Mark

| Key for mark | Description |
|:------------:|:------------|
| ```` | To the position before the latest jump. |
| ``.` | To the postition where the last change was made. |
| ``^` | To the position where the last Inser Mode was stopped. |
| ``[` | To the first character of previously changed or yanked text. |
| ``]` | To the last character of the previously changed or yanked text. |
| ``<` | To the first line or char of the last selected Visual area. |
| ``>` | To the last line or char of the last selected Visual area. |


An example to replace the matched **()**, **[]** or **{}**.

| Input keys | Result text |
|:-----------|:------------|
| `0f[` | item[xxxxx] |
| `%r)` | item[xxxxx) |
| ` ``r( ` | item(xxxxx) |


## Jump list

- `:jumps` See jump list.
- `<CTRL+i>` Jump to next.
- `<CTRL+o>` Jump to previous.

The jump list includes:

| Command/Input key(s) | Description |
|:---------------------|:------------|
| `{line number}G` | Go to {line number}. |
| `%` | |
| `'{mark}` or ``{mark}` | Go to mark. |
| `{number}H`, `M`, `{number}L` | Go to top/medium/bottom of the screen. |


## Change list

- `:changes` See change list.
- `{count}g;` Go to {count} older position in change list. 
- `{count}g,` Go to {count} newer cursor position in change list. 