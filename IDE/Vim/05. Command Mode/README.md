# Command Mode

## Common Ex command

- `q[uit]` Quit.
  - `qa[ll]!` Discard all changes on buffers and quit. 
- `:e[dit] {file_path}` Open file to edit.
- `:e[dit]!` Reload file and ignore change. 
- `:w[rite]` Save file, the command will change the timestamp of the file even if the buffer was not be modified.
  - `:wa[ll]` Save all buffers to files.
- `:update` or `up` Save file, the command will only change the timestamp of the file if the buffer was modified. 
- `:sav[eas] {file_path}`
- `:tabnew` Create a new tab.
- `:split`, `vsplit` Split current buffer to another window.
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


### Replace in command mode

- `:%s/<search_word>/<replace_as_word>/g` Replace all
- `:%s/<search_word>/<replace_as_word>/gc` Replace all with confirmation
- `:%s/<search_word>/<replace_as_word>/gi` Replace all without case sensitive
- `:s/<search_word>/<replace_as_word>/g` Replace only at current line

#### Put serial number at the start of exist lines

For all lines in the file:

```
:%s/^/\=line('.').". "
```

If you want to put SN from line 38 to 40:

```
:38,40s/^/\=line('.')-37.". "
```




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

## Copy current word to command

- `<CTRL-r><CTRL-w>` will copy current word to command.

For example, we would like to replace `Test` with `TestCase`, while the cursor is located at `Test1`.

```
My Test1
My Test2
My Test3
```

Use `*` to highlight all `Test` words, then `cwTestCase<ESC>`.

```
My Test1
My TestCase2
My Test3
```

Now we can use substitute like this: `:%s//<CTRL-r><CTRL-w>/g` (which will be `:%s//TestCase/g`) to replace other `Test` to `TestCase`.