# Tag

## Create lightweight tag (for private or temporary purpose)

```
$ git tag <tag_name> <sha-1_code>
``` 

## Create annotated tag (for release or milestones)

```
$ git tag <tag_name> <sha-1_code> -a -m "some comments for annotated tag..."
```

## List tags

```
$ git tag -l
```

## Delete tag

```
$ git tag -d <tag_name>
```

## Use alias to create tag

```
$ git config alias.XXXX '!git tag MyTag-$(date +"%Y-%m-%d_%H-%M-%S")'
$ git XXXX <sha-1_code>
```


