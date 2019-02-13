

## Environment

- Windows Server 2016
- IIS 8
- Visual Studio 2017 

## Requirement


### Install IIS Management Scripts and Tools

![](assets/001.png)


### Install remote tools (For Visual Studio 2017)

[Download](https://visualstudio.microsoft.com/downloads/?q=remote+tools#remote-tools-for-visual-studio-2017)

![](assets/002.png)


## Remote Debugger Configuration

Search `Remote Debugger Configuration Wizard`() or `rdbgwiz` to open the **Remote Debugger Configuration** 

![](assets/003.png)



Enable the bellow option to run the Remote Debugger as a service named "Visual Studio 2017 Remote Debugger".

![](assets/004.png)


> However you have to enable the service manually later.
> ![](assets/005.png)


Or leave it unchecked to run the Remote Debugger as APP.

![](assets/006.png)


Finally, select the target network(s) for firewall.

![](assets/008.png)


> Remote Debugger uses port 4022 in default.


## Open Remote Debugger

### Run as service

```
$ net start msvsmon150
The Visual Studio 2017 Remote Debugger service is starting.
The Visual Studio 2017 Remote Debugger service was started successfully.
```

To stop the service,

```
$ net stop msvsmon150
``` 

### Run as app

Search `Remote Debugger` and run it as administrator.

![](assets/008.png)

Notice that it use `4022` as the default port.


### Attach Process by Visual Studio

Back to our development environment which had installed Visual Studio 2017.
Open **[Debug]** -> **[Attach to Process...]** (Ctrl+Alt+P) 

> Reattach to the same process you previously attached to by using **[Debug]** -> **[Reattach to Process...]** (Shift+Alt+P)





