
# apt-get: Temporary failure in name resolution

### Error

```
Err:1 http://security.ubuntu.com/ubuntu xenial-security InRelease
  Temporary failure resolving 'security.ubuntu.com'
Err:2 http://dl.google.com/linux/mod-pagespeed/deb stable InRelease
  Temporary failure resolving 'dl.google.com'
```

The problem is caused by DNS name resolving failure.


### Solution

1. Make sure your DNS Resolver config file is writable:

```
sudo chmod o+r /etc/resolv.conf
```

2. Use Google's nameservers instead of DigitalOcean's:

```
echo "nameserver 8.8.8.8" >> /etc/resolv.conf
```

> Reference: 
> - [How to resolve "Temporary failure in name resolution" issue](https://www.digitalocean.com/community/questions/how-to-resolve-temporary-failure-in-name-resolution-issue)








# docker startup crash on Windows 10 but ok after restart machine


### Solution

Change the power plan as following,

1. Go to [Power Options] -> [ Choose what the power buttons do]
2. Find **Shutdown settings** and uncheck the option: **[Turn on fast startup (recommended)]**

![](assets/001.png)


> Reference:
> - [Docker crash on windows 10 Startup #953](https://github.com/docker/for-win/issues/953?fbclid=IwAR0gxu7w5OI172Snh64oj-9FajBXt0mdlZuRBZKZ1XYPD_FpOjv57NK0OEQ#issuecomment-342498223)


