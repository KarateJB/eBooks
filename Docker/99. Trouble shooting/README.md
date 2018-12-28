
## apt-get: Temporary failure in name resolution

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