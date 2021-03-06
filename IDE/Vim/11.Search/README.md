# Search (By Pattern)

## Search options

- `:set wrapscan` Searches wrap around the end of the file.
  - Turn off `wrapscan` to stop search at the end of file.
- `:set hlsearch`/`:set hls` highlights the found word.
- `:set nohlsearch`/`:set hlsearch!`/`:set hls!` disable highlighting the found word.  - `:nohlsearch`/`:nohls` will temporarily disable highlighting the found word until next search.
- `:set incsearch`/`:set is` Progressive search mode, which will highlight what you type before really start searching.
  - `:set noincsearch`\`set nois` to disable it.



## Search history

- `q/` opens search history. Move on an search pattern to edit or <ENTER> to make a search.

## Special patterns

| Pattern | Description |
|:-------:|:------------|
| `\n`  | A newline character (line ending). |
| `\_s` | A whitespace (space or tab) or newline character. |
| `\_^` | The beginning of a line (zero width). |
| `\_$` | The end of a line (zero width). |
| `\_.` | Any character including a newline. |


## Get search result's count

### Use substitute

| Input keys | Note |
|:-----------|:-----|
| `/\v<the>\C` | First search for "the". |
| `:%s///gn` | `n` will skip substitute and the command will show the statistics, e.q. "32 matches on 25 lines". |


### Use vimgrep

> Also see [05.Command Mode >> vimgrep].

- `:vimgrep /{pattern}/[g][j] {file} ...` : Search in the files.


| Input keys | Note |
|:-----------|:-----|
| `/\v<the>\C` | First search for "the". |
| `:vimgrep //g %` | It will show (1 of 32). We can use `:cnext` or `:cprev` to navigate the quickfix list after vimgrep. |




## Case-sensitive searching

### Configuration

To search without case-sensitive,

```
:set ignorecase
```

After enable "ignorecase" option, we can enable "smartcase" option to do

- None-case-sensitive searching: when there is no uppercase character in the keyword.
- Case-sensitive searching: when there is one or more uppercase character in the keyword.

For example, I enable "ignorecase" and "smartcase" options and then search:

| Keyword | Results |
|:--------|:--------|
| the | Both `the` and `The` will be highlighted. |
| The | Only `The` will be highlighted. |



### Force ignoring (non-)case-sesentive in a pattern search

We can bypass the settings of "ignorecase" or "smartcase" by using "\c" and "\C". 

- `\c` Force non-case-sensititve search.
  - e.q. `/\cthe` will find both `the` and `The`.
- `\C` Force case-sensitive search.
  - e.q. `/\Cthe` will only find `the`.


## Very Magic mode

> "\v" means that all ASCII chars except "0-9,a-z,A-Z" and "_" have special meaning.

We can search with regression expression.

For example, we want to search the first 2 line of below document,

```
01) Red
02) Blue
3) Hello
```

> See [regiex101 sample](https://regex101.com/r/ngtdBv/1)

Then we have to escape some chars in our search (the original regex is `([0-9]*)\d{2}\).+`):

```
/\([0-9]*\)\d\{2\}).\+
```

In the above regex pattern, we have to escape the special chars.

We can use "Very Magic"(`\v`) to ease the regex-pattern and use regex in the normal way:

```
/\v([0-9]*)\d{2}\).+
```


## Very Nomagic mode

> "\V" means only a blckslash `\` and terminating char (usually / or ?) have special meaning.

Use this mode to skip regex pattern searching.


## Search with boundary

Take the following document for example:

```
Tommy, Amy and Jimmy said they will beat other teams.
They really beat other teams and won the game.
Their team "Tricker" will be remembered.
```

### Zero-width matching

When we want to search only "the" and ignore "they" or "other"... etc, we can search like this:

```
/\v<the>
```

- `\<`: Matches the beginning of a word.
- `\>`: Matches the end of a word.


Furthermore, we can use `\zs` and `\ze` in a regex-pattern search.

```
/\v"\zs[^"]\ze"
```

Whcih will hightlight **Tricker** without `"`.



### Search by contains-in matching

To find "Tommy", "Amy", "Jimmy":

```
/\v(Tom|A|Jim)my
```


## Search and then substitute

For example, we can mask the names in these steps.

| Input keys | Result text | Note |
|:-----------|:------------|:-----|
| `/\v(Tom|A|Jim)(my)` | Tommy, Amy and Jimmy | The brackets: `()` are must. |
| `:%s//\1**\2/g` | Tom**my, A**my and Jim**my | `\1` means the matched value in first `()`, and `\2` means the matched value in second `()`. |



## Use ? to search a URL

When we want to search a URL in a document:

```
https://localhost:3001/Books/1
Https://sit:3002/Books/1
https://localhost:3001/Books/2
```

We can use

```
?https://localhost:3001/Books
```

Which is better than

```
/https:\/\/localhost:3001\/Books
```


Or use "escape({string}, {chars})":

```
/<CTRL-r>=escape('https://localhost:3001/Books', getcmdtype().'\')
```
which equals to `/<CTRL-r>=escape('...', '/\')`.

or 

```
?<CTRL-r>=escape('https://localhost:3001/Books', getcmdtype().'\')
```

which equals to `?<CTRL-r>=escape('...', '?\')`.



> Notice that "getcmdtype()" will return current command's type.
> See `:h getcmdtype()` for more details.



or yank the URL to register `a` and do

```
/<CTRL-r>=escape(@a, getcmdtype().'\')
```





