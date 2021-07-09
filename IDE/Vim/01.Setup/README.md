# Setup

## How to set options

- `:h option-list` shows short explanation of each option.
- `:set <option>` enable the option (when the option is boolean-type).
  - `:set no<option>` disable the option.
  - `:set <option>!` revert the option.
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



原文網址：https://kknews.cc/code/gp46ae8.html


## Useful commands

- `:set rnu` or `:set relativenumber` : Set relative number.
- `:set paste` : Put Vim in Paste mode.  This is useful if you want to cut or copy some text from one window and paste it in Vim.  This will avoid unexpected effects.
  - `:set pastetoggle=<f5>`
- `:history` : Show history.
- `:ter[minal]` : Open terminal, the terminal path can be specified by `:set shell=`.  

To disalble an option, type `!` at the end of it. E.q. `set rnu!`.


## Help

- `:help text-object` Text object selection
- `:help paste` Paste mode, which is useful when using Vim in a terminal.

## vimrc

