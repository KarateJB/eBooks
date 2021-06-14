# Normal Mode

## Moving

- `<number>h` Go {number} chars leftside.
- `<number>j` Go {number} lines downward.
- `<number>k` Go {number} lines upward.
- `<number>l` Go {number} chars right.
- `<number>G` Go with line number.

- `gj` Display line downward.
- `gk` Display line upward.

- `0` To the first char of current line.
- `g0` To the first char of current display line.
- `$` To the last char of current line.
- `g$` To the last char of current display line.
- `^` To the first non-blank char of current line.   
- `g^` To the first non-blank char of current display line.   

- `zz` Centerize active line.
- `zt` Put active line to the top of window.
- `zb` Put active line to the bottom of window.
- `<CTRL+u>` Moving viewport up.
- `<CTRL+d>` Moving viewport down.


> See the definitions of **word** and **WORD** by `:h word` or `:h WORD`.
 
- `{number}w` {number} words forward, exclusive motion.
- `{number}W` {number} WORDS forward, exclusive motion.
- `{number}b` {number} words backward, exclusive motion.
- `{number}B` {number} WORDS backward, exclusive motion.
- `e` Forward to the end of {number} words inclusive.
- `E` Forward to the end of {number} WORDS inclusive.
- `ge` Backward to the end of {number} words inclusive.
- `gE` Backward to the end of {number} WORDS inclusive.

E.q. 

| Input keys | Result text |
|:-----------|:-----|
| `0` | **W**e're |
| `cwYou` | You're |

| Input keys | Result text |
|:-----------|:-----|
| `0` | **W**e're |
| `cWIt's` | It's |



## Delete, Copy, Paste

- `s` Delete current char, equals to `cl`
- `S` Delete line, equals to `cc`, `^C`
- `dd` Delete line
- `yy` Copy line

- `dw` Delete any chars from current cursor and stops at next word.
- `diw` Delete a word (exclude blank), often used on removing a word.
  - `ciw` Delete and start edit mode.
- `daw` Delete a word (include blank), ofter used on removing and insert a new word.
  - `caw` Delete and start edit mode.
- `dd` Delete row and move up the next row

- `"0p` 貼上前一個複製的內容 
- `"+y` 複製vim yanked到系統剪貼簿
- `"+p` 從系統剪貼簿貼上複製的內容到vim
- `<CTRL-r>"` 在Command mode貼上yanked  


### Registers 寄存器

- `"{register}` prefix for using registers.
  - Notice that the register:`0`, will be defaultly be set when doing a unnamed yank, such as `yy`, `yaw`.  
  - Using register [a-z] will overwrite the content within it, using [A-Z] will append new content to existed one within it.
- `"_` Prefix for black hole, such as `"_d`, `"_c`



There are ten types of registers: (From `:h registers`)

1. The unnamed register `""`
2. 10 numbered registers "0 to "9
3. The small delete register "-
4. 26 named registers "a to "z or "A to "Z
5. Three read-only registers ":, "., "%
6. Alternate buffer register "#
7. The expression register "=
8. The selection and drop registers "*, "+ and "~ 
9. The black hole register "_
10. Last search pattern register "/



## To Edit

- `i` insert
- `a` append
- `J` Join lines
- `I` Go to the start of a line and start edit
- `A` Go to the end of a line and start edit

- `cs"'` 換成對符號

- `gu` Convert to lowercase. For example...
   - `gul` Convert current selected char to lowercase.
   - `guaw` Convert current word to lowercase.
   - `guu` convert current line to lowercase.
- `gU` Convert to uppercase, it's usage is the same as above.

- `gc` Comment out.
   - `gcc` Comment out current line.
   - `gcap` Comment out current block.

- `u` Undo
- `<CTRL+r>` Redo (Undo undo)

## To Indent

- `>` or `<` Select the line to shift
- `>>` or `<<` Shift line right or left


## To Search

- 單行搜尋字元  `f`/`F` 字元，再按 `;` 或 `,` 重複往後/前找
- 單行搜尋字元到前一個字元  `t`/`T`字元，再按 `;` 或 `,` 重複往後/前找
-  `o`/`O` 往下/上插一行 

- `/` Search next in document, `?` Search previous in document.
- `*` Search current word.
- To search on current line, `<shift+v>` -> `/\%V{pattern}`.


### Advanced combination with Searching

| Input keys | Result text |
|:-----------|:------------|
| `0` | Advanced combination with Searching. |
| `dtS` | Searching. |
| `u0` | Advanced combination with Searching. |
| `c3f Keep `| Keep Searching. |
| `u0/com` | Advanced combination with Searching. |
| `d/Sea` | Advanced Searching. |


## To Replace

- `r` replace a character.
- `R` replace multiple characters.
- `gR` virtual replace mode. See the difference here: [R and gR difference in Vim](https://superuser.com/a/705074/1140629). 



## Repeat

- `.` Repeat the last change.
- `@:` Repeat the last command(which comes from command mode).

## Show file information

- `<CTRL+g>`: file information.
