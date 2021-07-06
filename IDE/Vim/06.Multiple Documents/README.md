# Mutiple documents

## Buffer list and Argument list

- Buffer list: files in vim buffers. A buffer is a file loaded into memory for editing. All opened files are associated with a buffer.
- Args list: files open from the vim command line using `:args`.


> The argument list and buffer list complement each other. We can think of it this way: the argument list is a subset of the buffer list. That can be useful if you want to run an Ex command across a set of files, but not all of them. <br />
> For more detais, see [Buffer list vs Arguments list](https://www.reddit.com/r/vim/comments/u3nv6/buffer_list_vs_arguments_list/c4s6gml?utm_source=share&utm_medium=web2x&context=3).


## List buffers

- `:ls` list all buffers from files.
  - `:h :ls` To show details of each indicators, e.q.
    - **%**: the buffer in the current window
    - **a**: active buffer
    - **h**: hidden buffer
    - **=**: readonly buffer


## Switch/Manage buffer

- `:bn[ext]` Switch to next buffer.
- `:bp[revious]` Switch to previous buffer.
- `:b[uffer] {buffer_sn}` Quick switch to certain buffer.
- `:bf[irst]` Switch to the first buffer.
- `:bl[ast]` Switch to the last buffer.
- `:bd[elete] {buffer_sn1} [{buffer_sn2}]` Delete buffer(s).
- `:bufdo {command}` Execute command on all buffers.
  - e.q. `bufdo w` Save all buffers to files.
  - e.q. `bufdo normal @a` Execute marco in register "a for all buffers.


## Split Window

- `sp[lit]` or `<CTRL-w>s` Split horizontally. The current window will be split with a new vertical window.
  - `sp[lit] {file_path}`
- `vsp[lit]` or `<CTRL-w>v` Split vertically. The current window will be split with a new horizontal window.
  - `vsp[lit] {file_path}`
- `clo[se]` Close active window.
- `on[ly]` Close other windows(s) except active one.


### Hotkeys

| Hotkey | Description |
|:------:|:------------|
| `<CTRL-w>w` or `<CTRL-w><CTRL-w>` | Switch window |
| `<CTRL-w>h` | Switch to left-sidewindow |
| `<CTRL-w>j` | Switch to down-side window |
| `<CTRL-w>k` | Switch to up-side window |
| `<CTRL-w>l` | Switch to right-side window |
| `<CTRL-w>c` | Close active window |
| `<CTRL-w>=` | Resize all windows with same height and width |
| `<CTRL-w>_` | Resize active windows with max height |
| `{N}<CTRL-w>_` | Resize active windows with N-rows height, e.q. `20<CTRL-W>_` |
| `<CTRL-w>|` | Resize active windows with max width |
| `{N}<CTRL-w>|` | Resize active windows with N-columns width |


## Tab

> A Tab in Vim is like a virtual window. 

- `:tabs` List all tabs and its SN.
- `:tabnew` Create a new Tab without any file.
- `:tabe[dit] {file_path}` Create a new Tab with a file.
- `<CTRL-w>T` Send active window to a new Tab.
- `:tabc[lose]` Close current Tab and its window(s).
- `:tabo[nly]` Close other Tabs but keep active one.
- `:tabn[ext]` or `gt` Go to next Tab.
  - `:tabn[ext] {tab_sn}` or `{tab_sn}gt` Go to certain Tab. 
- `:tabp[revious]` or `gT` Go to previous Tab.
- `:tabf[irst]` Go to first Tab.
- `:tabl[ast]` Go to last Tab.
- `:tabm[ove] {N}` Move current Tab to index N. e.q.
  - `tabm 0` Move current Tab to the first position.
  - `tabm` Move current Tab to the last position.
  

## Args

- `ar[gs] {arglist}[!]` Define {arglist} as the new argument list and edit the first one. If `!` is appended, Vim will discard any changes to current buffer.
- `arga[dd]` Add current buffer name to the argument list.
- `arga[dd] {file_name}` Add the {name}s to the argument list.
- `argd[elete] {file_pattern}` Delete files from the argument list that match the {file_pattern}.
- `argdo {Ex command}` Execute command on each one in the argument list.
  - e.q. `argdo normal @a` execute marco in register "a" for all arguments in the list.

