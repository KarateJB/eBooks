# Ctags

## Install

### Ubuntu

```s
$ sudo apt-get install exuberant-ctags
# Or
# sudo apt-get install ctags
$ ctags --version
Exuberant Ctags 5.9~svn20110310, Copyright (C) 1996-2009 Darren Hiebert
  Addresses: <dhiebert@users.sourceforge.net>, http://ctags.sourceforge.net
```


We can install the maintained impementation of ctags: [Unerversal Ctags](https://github.com/universal-ctags/ctags).


### Windows 

We can use [chocolatey](https://community.chocolatey.org/) to install [emacs](https://community.chocolatey.org/packages/Emacs)

```s
$ choco install emacs
```


Set the path to environment variable:

```s
$ setx path "%PATH%; C:\ProgramData\chocolatey\lib\Emacs\tools\emacs\bin" /m
$ ctags --version
ctags (GNU Emacs 27.2)
Copyright (C) 2021 Free Software Foundation, Inc.
```
