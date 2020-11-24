![](https://2.bp.blogspot.com/-QvYTkYFGy6Y/WHg-K0hBdVI/AAAAAAAAENE/JN02qMzhIfgcWh5HCQ-JRQZ9NG_rLepjgCLcB/s320/github.png)

## Introduction

[Github Pages](https://pages.github.com/) is a quick and popular website hosting service for the [Github](https://github.com/) repositories. We are going to deploy our website to Github Pages with `Angular CLI`.


## Environment

* Angular CLI 1.0.0-beta.19.3


## How to deploy


#### Create Github Repository

Of course we should have a Github repository and push our project codes.


#### Build and Deploy

You can quickly deploy the website in `Angular CLI` by this command.

```
ng github-pages:deploy --message "Commit message"
```

The command will create a new branch: `gh-pages`, which will store the build output files.

But before your deploy, notice that

1. The project’s name should as same as the name of the Github repository.

![](https://1.bp.blogspot.com/-jknt-K9RNUM/WDlLBtc8gLI/AAAAAAAAD-8/GTHmagYJAVE5BDHSyn-O5ln7smPNPTE5wCLcB/s1600/image001.png)

2. We have to commit and push current changes on the project codes.



After successfully deploying the project, now we can browse it on
{Github_id}.github.io/{repository_name}


## Reference

1. [Deploying the app via GitHub Pages](https://github.com/angular/angular-cli#deploying-the-app-via-github-pages) 

