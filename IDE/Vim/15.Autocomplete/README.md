# Autocomplete

When in Insert Mode, use the following hotkeys to autocomplete what we type.

| Input keys | Description |
|:-----------|:------------|
| `<CTRL-n>` | Show keywords within the buffer list. |
| `<CTRL-x><CTRL-n>` | Show keywords in current buffer. |
| `<CTRL-x><CTRL-i>` | Show keywords in the current buffer and included files. |
| `<CTRL-x><CTRL-f>` | Show file names. |
| `<CTRL-x><CTRL-l>` | Show whole lines with matched keywords. |
| `<CTRL-x><CTRL-]` | Show tags |
| | |
| | |
| | |
| | |
| | |
| | |


## Samples

*test1.txt*

```
```


*test2.txt*

```
```

### Autocomplete by keywords

- `<CTRL-n>` shows the keywords that can be choosed.

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
