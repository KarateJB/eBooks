# Introduction

[smbclient](https://www.samba.org/samba/docs/current/man-html/smbclient.1.html) is a ftp-like client to access SMB/CIFS resources on servers.


# Usage

## (Optional) Turn off history substitution 

```
set +H
```

## Login with user/pwd and get file

```shell
smbclient //10.xxx.0.x/Share -U <user_name>%<pwd>
smb: \> ls
smb: \> get test.txt
smb: \> exit
```

## Get file in one line

```shell
smbclient //10.140.0.2/share -U <user_name>%<pwd> -c 'get "test.txt"'
```

