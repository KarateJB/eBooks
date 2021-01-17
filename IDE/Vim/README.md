# Vim

> <CTRL-r> means press `CTRL` and `r` keys in the same time. 



## Setup

- `:set rnu` 設定相對行號, or `:set relativenumber`
- `:history`


***
# Normal Mode


## Moving

- `<number>H` Go left
- `<number>J` Go down
- `<number>K` Go up 
- `<number>L` Go right
- `<number>G` Go with line number

- `zz` 將目前選取行置中顯示
- `zt` 將目前選取行顯示到最上面
- `zb` 將目前選取行顯示到最下面



## Delete, Copy, Paste

- `s` Delete current char, equals to `cl`
- `S` Delete line, equals to `cc`, `^C`
- `dd` Delete line
- `yy` Copy line

- `dw` Delete any chars from current cursor and stops at next word.
- `diw` Delete a word (exclude blank), often used on removing a word.
- `daw` Delete a word (include blank), ofter used on removing and insert a new word.
- `dd` Delete row and move up the next row

- `"0p` 貼上前一個複製的內容 
- `"+y` 複製vim yanked到系統剪貼簿
- `"+p` 從系統剪貼簿貼上複製的內容到vim
- `<CTRL-r>"` 在Command mode貼上yanked  

- `"_` Prefix for black hole, such as `"_d`, `"_c`


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


## To Select

- `V` select a line
- `viB` select block
- `gv` Select back

- `>>` or `<<` 縮排
- `>` or `<` 選取縮排


## To Search

- 單行搜尋字元  `f`/`F` 字元，再按 `;` 或 `,` 重複往後/前找
- 單行搜尋字元到前一個字元  `t`/`T`字元，再按 `;` 或 `,` 重複往後/前找
-  `o`/`O` 往下/上插一行 

- `/` Search next in document, `?` Search previous in document.
- `*` Search current word.

## To Replace

Replace in command mode,

- `:%s/<search_word>/<replace_as_word>/g` Replace all
- `:%s/<search_word>/<replace_as_word>/gc` Replace all with confirmation
- `:%s/<search_word>/<replace_as_word>/gi` Replace all without case sensitive
- `:s/<search_word>/<replace_as_word>/g` Replace only at current line


## Repeat

- `.` Repeat the last change.
- `@:` Repeat the last command(which comes from command mode).




***
# Insert Mode

## Back to Normal Mode

- `<CTRL-[>`   or `<ESC>`. 
- `<CTRL-o>`: Switch to Insert-Normal mode. When you back to Normal mode by this way, it will be back to Insert Mode after you execute an action on Normal Mode. This will reduce the times of switching modes. 

   E.q. When inserting something and you want to centerize the current line, use `<CTRL-o>zz`. 

## Delete

- `<CTRL-h>` Delete previous character, equals to backspace.
- `<CTRL-w>` Delete from the cursor to the beginning of the previous word.
- `<CTRL-u>` Delete everything to the left of the cursor on that line.





