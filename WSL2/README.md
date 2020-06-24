

## Enter the distro

You can enter the default distro by,

```s
$ wsl
```

Or specify the distro,

```s
$ wsl --distribution[-d] <distro_name> 
```



## Export and Import

```s
$ wsl --list[-l] --all [-v]
Windows Subsystem for Linux Distributions:
docker-desktop-data (Default)
docker-desktop
Ubuntu-18.04
```


## Export

```s
$ wsl --export <distro_name> D:\Works\Docker\My\WSL2\Backup\wsl2-ubuntu-18.04.tar
```


## Import

The default install directory is at `C:\Users\<user>\AppData\Local\Packages\`.

E.q. My Ubuntu 18.04 is at `C:\Users\<user>\AppData\Local\Packages\CanonicalGroupLimited.Ubuntu18.04onWindows_79rhkp1fndgsc`.


When you import the tar file, it will create the new Distro at the specified path, 

```s
$ wsl --import <distro_name> "C:\Users\<user>\AppData\Local\Packages\Ubuntu" "D:\Backup\wsl2-ubuntu-18.04.tar"
```

You can see current running WSL distros at `\\wsl$` like followig,

![](assets/001.jpg)


## Remove a distro

```s
$ wsl --unregister <distro_name>
```