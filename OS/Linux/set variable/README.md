# Set variable

For current shell:

```
# <variable>="<value>"
```

To set it for current shell and all processes started from current shell:

```
export <varibale>="<value>"
```

To set it permanently **for all future bash sessions**, add it to `.bashrc` file in the `$HOME` directory.

To set it permanently for **all users, all processes**, add it to `/etc/environment`.

For example, 

```
sudo -H gedit /etc/environment
```

Decalre the variable like this:

```
MyVariable="MyValue"
```