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

