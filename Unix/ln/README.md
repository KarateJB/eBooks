# ln

## Description

Create a [hard link](https://en.wikipedia.org/wiki/Hard_link) or a [symbolic link(symlink)](https://en.wikipedia.org/wiki/Symbolic_link) to an existing file.

## Usage

Create a `target dir` which links to `source dir` as followoing,

```
$ ln [<options>] <source> <target>
```

> `ln` will create a hard link in default without `-s`.

## Options

| Parameter | in short | Value | Description |
|:----------|:--------:|:-----:|:------------|
| –symbolic | -s | | Create symlink |
| -force | -f | | Force existing pathnames to be removed to allow the link |
| -interactive | -i | | Ask if overwriting an exist link |
| -no-clobber | -n | | Wont overwrite |
