# Autocomplete

When in Insert Mode, use the following hotkeys to autocomplete what we type.

> See `:h ins-completion` for more details.



| Input keys | Description |
|:-----------|:------------|
| `<CTRL-n>` | Show autocompletion list and stay in the first one. |
| `<CTRL-p>` | Show autocompletion list and stay in the last one. |
| `<CTRL-x><CTRL-n>` | Show keywords in current buffer. |
| `<CTRL-x><CTRL-i>` | Show keywords in the current buffer and included files. Use `:set include?` to see the pattern for finding an include command. | 
| `<CTRL-x><CTRL-f>` | Show file names. |
| `<CTRL-x><CTRL-l>` | Show whole lines with matched keywords. |
| `<CTRL-x><CTRL-]` | Show tags that are in the tag file. |
| | |
| | |
| | |
| | |
| | |


Notice that we can use "<Up>" and "<Down>" to navigate the autocomplete list. But it is suggested to use `<CTRL-n>`/`<CTRL-p>` to navigate because it will fill the selected item to the buffer without pressing `<ENTER>` or `<CTRL-y>` and you can press any key to continue your typing.


Here are how to use the autocompetion list:

- `<CTRL-n>`/`<CTRL-p>` navigate next/previous item.
- `<CTRL-y>` confirms the selected item. i.e. "yes".
- `<CTRL-e>` exit the autocompletion list. i.e. "exit".

Rebuild

## Samples

*test1.txt*

```
```


*test2.txt*

```
```

### Autocomplete by keywords

- `<CTRL-n>`/`<CTRL-p>` shows the autocompletion list that can be chosen.

Notice that in default, the autocompletion list contains

* buffer list
* included files
* tags

If you want to include/exclude the type of file to be in the normal completion list, set the "complete" option. (See `:h 'complete'`)

```
:set complete?
complete=.,w,b,u,t,i
:set complete-=t
:set complete+=t
```

The flags list can be found in `:h 'complete'`. I listed the ones of default settings.

| Flag | Description |
|:----:|:------------|
| . | scan the current buffer ('wrapscan' is ignored). |
| w | scan buffers from other windows. |
| b | scan other loaded buffers that are in the buffer list. |
| u | scan the unloaded buffers that are in the buffer list. |
| i | scan current and included files. |
| t | tag completion. same as "]". |


#### When ":set noignorecase":

![](assets/ac-kws-noignorecase.jpg)


#### When ":set ignorecase":

![](assets/ac-kws-ignorecase.gif)

However, since we typed "re" and it's useless to autocomplete with "Red", "Retry" or "Rebuild". So we have to enable "ignorecase" and "infercase" options in the same time.

```
:set infercase

# Or
:set inf
```

![](assets/ac-kws-ignorecase-infercase.jpg)


For more details, see `:h 'infercase'`.


#### Only show the keywords in current buffer

When using `<CTRL-n>`, autocomplete will show every matched keywords in buffer lists as below,

![](assets/ac-kws-buffers.jpg)

If we want to show keywords ONLY in current buffer:

- `<CTRL-x><CTRL-n>` 

![](assets/ac-kws-current-buffer.jpg)



### Autocomplete file name

- `<CTRL-x><CTRL-f>` shows the file names.

![](assets/ac-filename.jpg)


### Show lines with matched keyword

- `<CTRL-x><CTRL-l>` shows the match lines that STARTS WITH what you typed.

![](assets/ac-line.jpg)


### Show keywords in tag file

Take the sample codes in "14.Ctags/sample" for example.
We can create the tag file by `:!ctags -R` and then we can find the keywords within the tag file:

- `<CTRL-x><CTRL-]>` shows the tags.

![](assets/ac-tags.jpg)






