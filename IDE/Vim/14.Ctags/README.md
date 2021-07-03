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


## Use Ctags to build index of codes

### Command

```s
$ ctags [options] <source file(s)>
```

See more details about the options and usage [here](https://docs.ctags.io/en/latest/man/ctags.1.html). I listed a few of the them.


| Option | Default value | Description | Example |
|:------:|:-------------:|:------------|:--------|
| `o`, `-f` | ./tags | Specify the path and file name of the tag file. | `ctag -f tag/tags` |
| `-a[=(yes|mo)]`, `--append[=(yes|no)]` | no | This option used to append the tags to an existing tag file. | |
| `-R[=(yes|no)]`, `--recurse[=(yes|no)]` | Current directory: . | Recurse into directories encountered in the list of supplied files. | |
| `--sort=(yes|no|foldcase)` | yes | Indicates whether the tag file should be sorted on the tag name. The foldcase value specifies case insensitive (or case-folded) sorting. | |
| `-u` | | This option is Equivalent to –sort=no (i.e. “unsorted”). | |



### Build the tag file

I put a JS sample codes in "14.Ctags/sample".

```
├── index.js<br />
├── modules<br />
|  ├── match.js<br />
|  └── match_reverse.js<br />
└── package.json
```

We can build index for the code by the following commands, notice 

```s
$ cd sample/

# single file
$ ctags index.js

# multiple files
$ ctags *.js

# recursivly for the directory
$ ctages -R .
```


## Use Ctags in Vim
