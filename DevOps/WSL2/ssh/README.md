# ssh into WSL2

## 1.Reinstall SSH Server

```s
$ sudo apt-get purge openssh-server
$ sudo apt-get install openssh-server
```

## 2.Update/Enable the values in `/etc/ssh/sshd_config`

First change the owner of `sshd_config`, (and change it back to root after everything is done)

```s
$ sudo chown <current_user> /etc/ssh/sshd_config
```

| Key | Value | Note |
|:---:|:------|:-----|
| PermitRootLogin | yes | The value can be `yes`, `prohibit-password`, `forced-commands-only`, or `no`. |
| PasswordAuthentication | yes | |


You can also change the following values for ssh into it from remote machine,

| Key | Sample Value | Note |
|:---:|:-------------|:-----|
| ListenAddress | 0.0.0.0 | |
| Port | 2222 | Notice that Windows 10/Server had used port 22 for its own SSH server. |


## 3.Restart SSH-Server service

```s
$ sudo service ssh --full-restart
```


## Reference

- [How can I SSH into ¡§Bash on Ubuntu on Windows 10¡¨?](https://superuser.com/a/1114162/1140629)
- [How to SSH into WSL](https://superuser.com/questions/1123552/how-to-ssh-into-wsl)
