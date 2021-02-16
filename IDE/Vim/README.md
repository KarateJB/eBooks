# Vim

> <CTRL-r> means press `CTRL` and `r` keys in the same time. 


## Setup

- `:set rnu` or `:set relativenumber`: Set relative number
- `:history`


*** Help

- `:help text-object` Text object selection




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


## To Indent

- `>>` or `<<` 縮排
- `>` or `<` 選取縮排


## To Search

- 單行搜尋字元  `f`/`F` 字元，再按 `;` 或 `,` 重複往後/前找
- 單行搜尋字元到前一個字元  `t`/`T`字元，再按 `;` 或 `,` 重複往後/前找
-  `o`/`O` 往下/上插一行 

- `/` Search next in document, `?` Search previous in document.
- `*` Search current word.

## To Replace

- `r` replace a character.
- `R` replace multiple characters.
- `gR` virtual replace mode. See the difference here: [R and gR difference in Vim](https://superuser.com/a/705074/1140629). 


### Replace in command mode

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



- `<CTRL-h>` Delete previous character, equals to backspace.
- `<CTRL-w>` Delete from the cursor to the beginning of the previous word.
- `<CTRL-u>` Delete everything to the left of the cursor on that line.

## Insert

- `<CTRL-r>=` Insert the computed result, e.q. `<CTRL-r>=11*2<Enter>` will insert 22.

- `<CTRL-v>{code}` Insert a character by Unicode decimal(十進位)  or hexadecimal(十六進位).
   - Decimal code: `<CTRL-v>065` will output `A`.
   - Hex code: `<CTRL-v>u0042` will output `B`.
   - To see the Decimal & Hex code of a char, use `ga` on the char in Normal Mode. 
     E.q. an `A` will show `<A> 65, Hex 41, Octal 101`. 
   - See [List of Unicode characters](https://en.wikipedia.org/wiki/List_of_Unicode_characters).


- `<CTRL-k>{char1}{char2}` to enter a digraph, which is a method of entering a more extensive range of Unicode characters using pairs of keystrokes. 1
  e.q. `<CTRL-k>cr` will output `^M`.

  - Use command: `:h digraph-table` or `:digraphs` to see the list of digraph.



## Paste Register

- `<CTRL-r>{register}`  Paste a register.
- `<CTRL-r><CTRL-p>{register}` Paster a register without shift-block format.


***
# Visual Mode

## Selection Mode

> In Selection Mode, any input key will immediatly overwrite current selected block.

- `<CTRL-g>` Switch between Visual Mode and Selection Mode.



## Basic

- `v` Start Visual Mode (by character).
- `V` Start Visual line (by line).
- `<CTRL-v>` Start Visual Mode blockwise. (Use `A` to append and `I` to insert).
- `o` The selection cursor will be put to other end of highlighted text. It is useful to change the beginning position. 
- `gv` In Normal Mode, highlight exactly the same area of the last time in Visual Mode.




## Select

- `vaw` Select a word, including blank.
- `viw` Select a word, excluding blank.
- `ve` Select from current position to end of a word.
- `vb` Select back.
- `viB` Select block.
- `vat` Select tag block.
- `vit` Select inner tag block.


> We can combine the last command, such as `vawaw`, `vebbbb`...


## Tips

### To indent(縮排) 2 times for 3 lines

- `v3j` -> `>` -> `.` for 2 times, or
- `v3j` -> `3>`



### Use blockwist to append at the last position of multiple lines

We wanna to put "!" at the last postion of the three sentences.

```
▍
Hello world
Hi, kid
Vim is awesome
```

To become

```

Hello world!
Hi, kid!
Vim is awesome!
```

Use `j` -> `<CTRL-v>jj$` -> `A` -> `!`.



### Visual Model blockwist sample 

Assume cursor is on line 1, to make

```
Key  ▍ Value
xxx       111
yyy       222
```

To

```
Key   Value
-----------
xxx     111
yyy     222
``
```

Use `<CTRL-v>2j` -> `x..` -> `yyP` -> `Vr-`.





***
# Command Mode

## Common Ex command

- `:edit` or `:e` Open file to edit.
- `:write` or `:w` Save file.
- `:tabnew` Create a new tab.
- `:split` Split current file to another window.
- `:bprev`/`bnext` Go to previous/next buffer in the buffer list.

For more Ex cmd, see `:h ex-cmd-index`.


## Range/Line Ex command

- `:[range]d` Delete range.
- `:[range]y` Yank range.
- `:[line #]put` Put yanked at the next line of line #.
- `:[range]copy {address}` Copy the range to the next line of {address}. Short as `t` (copy **T**o).
- `:[range]move {address}` Move the range to the next line of {address}. Short as `m`.
- `:[range]join` Join all the lines in the range.
- `:[range]normal {commands}` Execute normal-mode command on every line in the range.
  - e.q. `2,3normal A,` will append , to the end of lines on line 2 ~ 3.
  - e.q. `'<,'>normal .` will repeat the last edit on highlighted lines.
- `:[range]s/{pattern}/{string}/{flags}` Substitute what matchs {pattern} to {string} in the range.
- `:[range]global/{pattern}/{cmd}` Execute Ex command on each line that matchs {pattern}.
  - e.q. `:%g/AAA/move $` will move all the lines that contain AAA to the end of the file.


## Special Symbols

| Symbol | Address |
|:------:|:--------|
| 1 | The 1st line. |
| 0 | Virtual line number, which is located above the 1st line. e.q. When we want to move one line to the beginning of a document. |
| $ | The last line. |
| . | The line of current cursor. |
| % | The whole document (All lines). |
| 'm | The line with bookmark name: `m`. |
| '< | The beginning line of highlighted selected text. |  
| '> | The end line of highlighted selected text. |


## AutoCompleted in Command Mode

- `:<CTRL+d>` shows all autocompleted words list. e.q. `:cop<CTRL+d>` shows `copen copy`.
- Options (see `:h 'wildmode'`)
  - For bash user

    ```
    set wildmode=longest,list
    ```

  - For zsh
    
    ```
    set wildmenu
    set wildmode=list:full
    ```

