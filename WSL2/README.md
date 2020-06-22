
## Export and Import

```s
$ wsl --list --all
Windows Subsystem for Linux Distributions:
docker-desktop-data (Default)
docker-desktop
Ubuntu-18.04
```


## Export

```s
$ wsl --export Ubuntu-18.04 D:\Works\Docker\My\WSL2\Backup\wsl2-ubuntu-18.04.tar
```


## Import

```s
$ wsl --import Ubuntu-18.04 D:\Works\Docker\My\WSL2\Backup\wsl2-ubuntu-18.04.tar
```