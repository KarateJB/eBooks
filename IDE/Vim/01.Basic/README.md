# Basic

***
## Glossary

| Name | Description |
|:------:|:------------|
| buffer | A buffer is the text in memory that you are editing. |
| window | A window in Vim is just a way to view a buffer. A window can view any buffer, and a buffer can be viewed and edited by more than one windows. For example , `vsp` will split current buffer to the new window. |
| tab | A tab is a collection of windows. |



***
## Setup

## How to set options

- `:h option-list` shows short explanation of each option.
- `:set <option>` enable the option (when the option is boolean-type).
  - `:set no<option>` disable the option.
  - `:set <option>!` revert the option.
  - Not all options have a global value. If the option does not have a global value the local value is set.
- `:set <option>={value}` set the option with {value} (when the option is non-boolean-type.
- `:set <option>&` set the option to default value.
- `:setlocal <option>[={value}]` Like ":set" but set only the value local to the current buffer or window.  Not all options have a local value.  If the option does not have a local value the global value is set.


### Set multiple option

We can set multiple options in one command separated with blank:

```
:setlocal tabstop=4 expandtab
```

> See how to use "tabstop", "expandtab" and "softtabstop":<br />
> - [Tab settings in Vim](https://arisweedler.medium.com/tab-settings-in-vim-1ea0863c5990)
> - [vim技巧：詳解tabstop、softtabstop、expandtab三個選項的區別](https://kknews.cc/code/gp46ae8.html)


### Set option on every buffer/window

Some options can only be applied to current buffer/window but not globally.
* e.q. `tabstop` is for current buffer.
* e.q. `number` is for current window.


We can apply the configuration to each buffer by,

```
:bufdo setlocal tabstop=4
```

or apply the configuration to each window by,

```
:windo setlocal number
```


***
## Useful commands

- `:set rnu` or `:set relativenumber` : Set relative number.
- `:set paste` : Put Vim in Paste mode.  This is useful if you want to cut or copy some text from one window and paste it in Vim.  This will avoid unexpected effects.
  - `:set pastetoggle=<f5>`
- `:history` : Show history.
- `:ter[minal]` : Open terminal, the terminal path can be specified by `:set shell=`.  


***
## Default vimrc or load from file

We can put the options' setting in the **vimrc** file as the default options.
See `:h vimrc` for more details.

Further more, we can load the options from a file to configure current buffer.

```
:source {file}
```

For example, `:source options/markdown.vim` to apply the options in "./options/markdown.vim".
  


### Load custom vimrc file by a URL

We can put the vimrc file to [Gist](gist.github.com) and write a function to load it by curl.

```
" Get custom vimrc file with a url
function! GetAndSource(url)

  execute '!curl -k ' . a:url . ' -o vimrc.vim'
  source vimrc.vim
  execute '!rm vimrc.vim'

endfunction
```

Now we can load the remote vimrc file like this:

```
:call GetAndSource("https://url")
```

> Reference: [Source a vimrc from a webpage?](https://vi.stackexchange.com/a/10073/34886)

***
## Help

- `:help text-object` Text object selection
- `:help paste` Paste mode, which is useful when using Vim in a terminal.
- `:help user-functions` How to write user function.




