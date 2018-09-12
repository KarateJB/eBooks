# Implemetation on kernel

## Base

- [Linux Container(LXC)](https://linuxcontainers.org/)
- [libcontainer]

> [Difference between LXC and libcontainer](https://stackoverflow.com/a/34155329/7045253)


## Docker Daemon

```
$ docker daemon -H 0.0.0.0:1234 
```


## namespace

### PID(程序命名空間)

### Network namespace(網路命名空間)

### IPC(Interprocesses Communication)

### Mount

### UTS(UNIX Time-sharing System)

### User


## CGroups

Control group 


### Create virtual network

When Docker create a container, it

1. Creates a [veth pair]()
2. The virtual inteface on local will connect to the default Docker() bridge or the one assigned
3. The other virtual interface will be put into the created container
4. Assign a IP to the container's eth0 and internal interface: docker0's IP from docker0 網卡

When running a container, we can modify the settings thru `--net`.

`--net=bridge`

Default value, create new 網卡 for a new container in Docker bridge: docker0

`--net=none`

Isolate the container and set the network later by user.

`--net=host`

Bind the new container with an exist network-setting container, they will share the IP address and Ports.
They can connect to each other by `lo`(Loopback)

`--net=user_defined_network`

Use `network` commands to create the network, usaually bind it with exist virtual network.
